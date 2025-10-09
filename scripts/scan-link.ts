#!/usr/bin/env tsx

import { globby } from 'globby';
import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import { join, dirname, resolve, relative } from 'path';
import { URL } from 'url';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import Fuse from 'fuse.js';

export interface LinkRef {
  title: string;
  path: string;
  link?: string; // Full link including fragment, e.g., "http://a#a"
}

export interface LinkData {
  link: string;
  title: string;
  hostname?: string;
  path?: string;
  refs: LinkRef[];
}

export interface LinkMeta {
  total: number;
  refCount: number;
}

export interface ScanOptions {
  scanDirs: string[];
  outputFile: string;
  outputMetaFile: string;
  checkLocalFiles?: boolean;
}

// Regular expressions to match different markdown link formats
const LINK_PATTERNS = [
  // [text](url) format - link must start with http, ., or / and not contain newlines or spaces
  // Also ensure it's not part of a function call or code
  /\[([^\]]+)\]\(((?:https?:\/\/|\.\/|\/)[^\n\s)]+)\)/g,
  // [text][ref] format (reference links)
  /\[([^\]]+)\]\[([^\]]*)\]/g,
  // Direct URLs (http/https)
  /https?:\/\/[^\s\)]+/g,
  // Auto-links <url>
  /<([^>]+)>/g,
];

// Find the git root directory by looking for .git folder
function findGitRoot(startPath: string = process.cwd()): string {
  let currentPath = resolve(startPath);

  while (currentPath !== dirname(currentPath)) {
    if (existsSync(join(currentPath, '.git'))) {
      return currentPath;
    }
    currentPath = dirname(currentPath);
  }

  // If no .git found, fall back to current working directory
  return process.cwd();
}

function getGitTrackedFiles(): string[] {
  try {
    const output = execSync('git ls-files', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    console.warn('⚠️  Could not get git tracked files:', error);
    return [];
  }
}

function findFuzzyMatches(missingFile: string, allFiles: string[], referencingFile: string): string[] {
  // First resolve the missing file to relative path from git root
  const gitRoot = findGitRoot();
  const resolvedMissingPath = resolveToGitRoot(missingFile, referencingFile);

  // Extract filename for matching
  const filename = resolvedMissingPath.split('/').pop() || resolvedMissingPath;
  const basename = filename.replace(/\.md$/, '');

  // Create Fuse instance for fuzzy matching
  const fuse = new Fuse(allFiles, {
    keys: ['path'],
    threshold: 0.4, // Lower threshold = more strict matching
    includeScore: true,
    includeMatches: true,
  });

  // Search for matches using resolved path
  const results = fuse.search(resolvedMissingPath);

  // Also search for filename and basename
  const filenameResults = fuse.search(filename);
  const basenameResults = fuse.search(basename);

  // Combine and deduplicate results
  const allResults = [...results, ...filenameResults, ...basenameResults];
  const uniqueResults = new Map<string, any>();

  for (const result of allResults) {
    if (!uniqueResults.has(result.item)) {
      uniqueResults.set(result.item, result);
    }
  }

  // Sort by score (lower is better) and return top 3 matches
  return Array.from(uniqueResults.values())
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 3)
    .map(result => result.item);
}

// Utility function to resolve relative paths to git root
function resolveToGitRoot(relativePath: string, fromFile: string): string {
  const gitRoot = findGitRoot();
  const fromDir = dirname(fromFile);
  const resolvedPath = resolve(fromDir, relativePath);
  return relative(gitRoot, resolvedPath);
}

import * as tldts from 'tldts';

// Check if a path is a relative markdown file reference
function isRelativeMarkdownRef(path: string): boolean {
  return (
    !path.startsWith('http://') &&
    !path.startsWith('https://') &&
    !path.startsWith('mailto:') &&
    !path.startsWith('#') &&
    (path.endsWith('.md') || path.includes('.md#'))
  );
}

// Validate if a URL is actually a valid link
function isValidLink(url: string): boolean {
  // Skip empty or whitespace-only URLs
  if (url.trim() !== url || !url) return false;

  if (/^https?:\/\/.*/.test(url) && URL.canParse(url)) {
    const res = tldts.parse(url);
    if (res.isIcann) {
      return true;
    }
    if (res.isPrivate) {
      return false;
    }
    if (res.isIp) {
      //
    }
    return false;
  }

  if (/^[./].*[.]mdx?$/.test(url)) return true;
  if (/^#\S+$/.test(url)) return true;

  return false;
}

// Get hostname from URL, return undefined for non-URLs
function getHostname(url: string): string | undefined {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return undefined;
  }
}

// Extract base URL without fragment
function getBaseUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.hash = ''; // Remove fragment
    return urlObj.toString();
  } catch {
    return url;
  }
}

// Extract links from markdown content
function extractLinks(content: string, filePath: string): Array<{ url: string; title: string; isRelative: boolean }> {
  const links: Array<{ url: string; title: string; isRelative: boolean }> = [];

  // Extract reference definitions first
  const refDefs = new Map<string, string>();
  const refPattern = /^\[([^\]]+)\]:\s*(.+)$/gm;
  let match;
  while ((match = refPattern.exec(content)) !== null) {
    refDefs.set(match[1], match[2].trim());
  }

  // Process each link pattern
  for (const pattern of LINK_PATTERNS) {
    pattern.lastIndex = 0; // Reset regex state
    while ((match = pattern.exec(content)) !== null) {
      let url = '';
      let title = '';

      if (pattern === LINK_PATTERNS[0]) {
        // [text](url) format
        title = match[1];
        url = match[2];
      } else if (pattern === LINK_PATTERNS[1]) {
        // [text][ref] format
        title = match[1];
        const ref = match[2] || match[1]; // If no ref specified, use title as ref
        url = refDefs.get(ref) || '';
      } else if (pattern === LINK_PATTERNS[2]) {
        // Direct URLs
        url = match[0];
        title = '';
      } else if (pattern === LINK_PATTERNS[3]) {
        // Auto-links <url>
        url = match[1];
        title = '';
      }

      // Process all links (both URLs and relative paths)
      if (url && isValidLink(url)) {
        const isRelative = isRelativeMarkdownRef(url);
        links.push({ url, title, isRelative });
      }
    }
  }

  return links;
}

// Main scanning function
export async function scanLinks(options: ScanOptions): Promise<void> {
  const gitRoot = findGitRoot();
  console.log(`📁 Git root: ${gitRoot}`);
  console.log(`🔍 Scanning for links in directories: ${options.scanDirs.join(', ')}`);

  // Build glob patterns for each scan directory
  const globPatterns = options.scanDirs.map((dir) => `${dir}/**/*.md`);

  // Find all markdown files in specified directories
  const files = await globby(globPatterns, {
    gitignore: true,
    cwd: process.cwd(),
  });

  console.log(`📁 Found ${files.length} markdown files`);

  const linkMap = new Map<string, LinkData>();
  let totalRefs = 0;

  // Process each file
  for (const file of files) {
    try {
      const content = await readFile(file, 'utf-8');
      const links = extractLinks(content, file);

      for (const { url, title: linkTitle, isRelative } of links) {
        // For relative markdown references, resolve the path
        let resolvedPath: string | undefined;
        if (isRelative) {
          resolvedPath = resolveToGitRoot(url, file);
        }

        // Use base URL (without fragment) as key for LinkData
        const baseUrl = isRelative ? resolvedPath || url : getBaseUrl(url);
        if (!baseUrl) continue;

        // Only get hostname for external URLs
        const hostname = isRelative ? undefined : getHostname(url);

        if (!linkMap.has(baseUrl)) {
          linkMap.set(baseUrl, {
            link: baseUrl, // Base URL without fragment
            title: linkTitle, // Use the link text as title initially
            hostname,
            path: resolvedPath,
            refs: [],
          });
        } else {
          // If link already exists, update title only if current title is empty and new title is not
          const existingLinkData = linkMap.get(baseUrl)!;
          if (!existingLinkData.title && linkTitle) {
            existingLinkData.title = linkTitle;
          }
        }

        const linkData = linkMap.get(baseUrl)!;
        linkData.refs.push({
          title: file, // Use file path as title
          path: file,
          link: url, // Full link including fragment
        });
        totalRefs++;
      }
    } catch (error) {
      console.warn(`⚠️  Error processing ${file}:`, error);
    }
  }

  // Check for missing local markdown files (if enabled)
  if (options.checkLocalFiles !== false) {
    console.log('🔍 Checking for missing local markdown files...');
    const missingFilesMap = new Map<string, string[]>();

    for (const [baseUrl, linkData] of linkMap) {
      // Check if this is a local markdown reference
      if (linkData.path && !linkData.hostname) {
        const gitRoot = findGitRoot();
        const fullPath = join(gitRoot, linkData.path);

        if (!existsSync(fullPath)) {
          if (!missingFilesMap.has(linkData.path)) {
            missingFilesMap.set(linkData.path, []);
          }
          // Add all referencing files
          for (const ref of linkData.refs) {
            missingFilesMap.get(linkData.path)!.push(ref.path);
          }
        }
      }
    }

    if (missingFilesMap.size > 0) {
      console.log(`❌ Missing local markdown files (${missingFilesMap.size}):`);

      // Get all git tracked files for fuzzy matching
      const allGitFiles = getGitTrackedFiles();
      const markdownFiles = allGitFiles.filter(file => file.endsWith('.md'));

      for (const [missingFile, refFiles] of Array.from(missingFilesMap.entries()).sort()) {
        console.log(`   - ${missingFile}`);
        // Show unique referencing files
        const uniqueRefs = [...new Set(refFiles)].sort();
        for (const refFile of uniqueRefs) {
          console.log(`     ↳ Referenced by: ${refFile}`);
        }

        // Find fuzzy matches for each referencing file
        const allMatches = new Set<string>();
        for (const refFile of uniqueRefs) {
          const fuzzyMatches = findFuzzyMatches(missingFile, markdownFiles, refFile);
          fuzzyMatches.forEach(match => allMatches.add(match));
        }

        if (allMatches.size > 0) {
          console.log(`     🔍 Possible matches:`);
          const sortedMatches = Array.from(allMatches).sort();
          for (const match of sortedMatches.slice(0, 3)) {
            console.log(`       - ${match}`);
          }
        }
      }
    } else {
      console.log('✅ All local markdown references are valid');
    }
  }

  // Convert map to array and keep original link titles
  const links = Array.from(linkMap.values())
    .sort((a, b) => {
      // Sort by hostname first (if available), then by path, then by link
      const aKey = a.hostname || a.path || a.link;
      const bKey = b.hostname || b.path || b.link;
      return aKey.localeCompare(bKey);
    });

  // Generate output files
  const linksJson = JSON.stringify(links, null, 2);
  const metaJson = JSON.stringify(
    {
      total: links.length,
      refCount: totalRefs,
    },
    null,
    2,
  );

  await writeFile(options.outputFile, linksJson, 'utf-8');
  await writeFile(options.outputMetaFile, metaJson, 'utf-8');

  console.log(`✅ Scan completed!`);
  console.log(`📊 Found ${links.length} unique links with ${totalRefs} total references`);
  console.log(`📄 Output written to:`);
  console.log(`   - ${options.outputFile}`);
  console.log(`   - ${options.outputMetaFile}`);
}

// Run the scanner if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scanLinks({
    scanDirs: ['notes', 'story'],
    outputFile: 'out/links.json',
    outputMetaFile: 'out/links.meta.json',
  }).catch(console.error);
}
