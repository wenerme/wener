import path from 'path';
import fs from 'fs-extra';
import YAML from 'yaml';

export function parseFrontMatter(s: string): { meta: any; content: string } {
  const m = s.match(/^---\n(?<content>.*?)\n---\n/s);
  if (m?.groups?.content) {
    return {
      meta: YAML.parse(m.groups?.['content']),
      content: s.substr(m[0].length),
    };
  }
  return { meta: null, content: s };
}
export function buildFrontMatter(f: { meta: any; content: any }): string {
  return `---\n${YAML.stringify(f.meta).trim()}\n---\n${f.content}\n`;
}
export type DocType = 'blog' | 'doc';
export interface FileSpec {
  content: string;
  context: Record<string, any>;
  filename: string;
  id: string;
  meta: Record<string, any>;
  path: string;
  raw: string;
  changed?: boolean;
  title: string;
  type: string;

  // for doc
  refId?: string;
}

export function buildContent(f: { meta: any; content: any }): string {
  return `---\n${YAML.stringify(f.meta).trim()}\n---\n${f.content}\n`;
}

export function createSpec(f: string): FileSpec {
  const raw = fs.readFileSync(f).toString();
  const spec: FileSpec = {
    raw,
    path: f,
    content: raw,
    meta: {},
    context: {},
    filename: path.basename(f),
    id: '',
    title: '',
    type: '',
  };
  const { meta, content } = parseFrontMatter(raw);
  if (meta) {
    Object.assign(spec.meta, meta);
    spec.content = content;
  }

  spec.id ||= spec.meta['id'] ?? spec.meta['slug'];
  spec.id ||= spec.filename.substr(0, spec.filename.length - path.extname(spec.filename).length);

  const regTitle = /#\s*(?<title>[^\n]+)/s;
  spec.title = spec.meta['title'] ?? spec.content.match(regTitle)?.groups?.title ?? '';

  if (spec.meta['slug']) {
    spec.type = 'blog';
  }

  return spec;
}

export interface Argo {
  _: string[];
  [s: string]: any;
}
export function argo(s: string[] = process.argv.slice(2)): Argo {
  const o: Argo = {
    _: [],
  };
  s.forEach((v) => {
    const m = v.match(/^--?(?<name>[^-][^=]*)(=(?<value>.*))?/);
    if (m?.groups?.name) {
      let val: any = o[m.groups['name']];
      o[m.groups['name']] = Array.isArray(val) ? [...val, m.groups['value'] || true] : m.groups['value'] || true;
    } else {
      o._.push(v);
    }
  });
  return o;
}
