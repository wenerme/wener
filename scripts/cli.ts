#!/usr/bin/env tsx

import { Command } from 'commander';
import { scanLinks } from './scan-link.ts';

const program = new Command();

program.name('wener-cli').description("Wener's note management CLI tools").version('1.0.0');

program
  .command('scan-links')
  .description('Scan markdown files for links and generate JSON output')
  .option('-s, --scan-dir <dir...>', 'Directory to scan for markdown files (can be used multiple times)', [
    'notes',
    'story',
  ])
  .option('-o, --output <file>', 'Output file for links.json', 'local/links.json')
  .option('-m, --output-meta <file>', 'Output file for links.meta.json', 'local/links.meta.json')
  .option('-c, --check', 'Check if referenced local markdown files exist', true)
  .option('--no-check', 'Disable checking for missing local markdown files')
  .action(async (options) => {
    try {
      // Handle multiple scan directories - commander collects multiple values into an array
      let scanDirs = options.scanDir;
      if (!Array.isArray(scanDirs)) {
        scanDirs = scanDirs ? [scanDirs] : [];
      }

      console.log(`🔍 Scanning directories: ${scanDirs.join(', ')}`);
      console.log(`📄 Output files:`);
      console.log(`   - Links: ${options.output}`);
      console.log(`   - Meta: ${options.outputMeta}`);
      console.log(`🔍 Check local files: ${options.check ? 'enabled' : 'disabled'}`);

      await scanLinks({
        scanDirs,
        outputFile: options.output,
        outputMetaFile: options.outputMeta,
        checkLocalFiles: options.check,
      });
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();
