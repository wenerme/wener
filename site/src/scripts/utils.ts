import globby from 'globby';
import path from 'path';
import fs from 'fs-extra';
import YAML from 'yaml'

export function parseFrontMatter(s: string): { meta: any, content: string } {
  const m = s.match(/^---\n(?<content>.*?)\n---\n/s)
  if (m?.groups?.content) {
    return {
      meta: YAML.parse(m.groups?.['content']),
      content: s.substr(m[0].length)
    }
  }
  return {meta: null, content: s}
}
export function buildFrontMatter(f:{meta:any,content:any}):string{
  return `---\n${YAML.stringify(f.meta).trim()}\n---\n${f.content}\n`
}

export interface FileSpec {
  content: string;
  context: Record<string, any>;
  filename: string;
  id: string;
  meta: Record<string, any>;
  path: string;
  raw: string;
}
export function createSpec(f: string): FileSpec {
  const raw = fs.readFileSync(f).toString();
  const spec = {
    raw,
    path: f,
    content: raw,
    meta: {},
    context: {},
    filename: path.basename(f),
    contentTitle: '',
    id: '',
  };
  const {meta,content} = parseFrontMatter(raw)
  if (meta) {
    Object.assign(spec.meta, meta);
    spec.content = content
  }

  spec.id ||= spec.meta['id']
  spec.id ||= spec.filename.substr(0, spec.filename.length - path.extname(spec.filename).length);
  return spec;
}
