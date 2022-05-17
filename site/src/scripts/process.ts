import globby from 'globby';
import fs from 'fs-extra';
import { argo, buildContent, createSpec, FileSpec } from './utils';
import path from 'path';
import { fetch } from './fetch';

const setting = {
  offline: false,
  verbose: false,
};

// 预处理
async function main() {
  const args = argo();
  setting.offline = Boolean(args.offline);
  setting.verbose = Boolean(args.verbose);

  const cwd = args['cwd'] || path.resolve('.');
  console.info(`processing on ${cwd}`);

  {
    const paths = await globby('./story/**/*.{md,mdx}');
    let files: FileSpec[] = await Promise.all(
      paths.map(async (v) => {
        return createSpec(v);
      }),
    );

    for (const file of files) {
      await processing(file);
    }

    const changed = files.filter((v) => v.changed);

    for (const v of changed) {
      await fs.writeFile(v.path, buildContent(v));
      setting.verbose && console.log(`${v.id}`);
    }
    console.log('Processed', changed.length, '/', files.length);
  }
  //
  {
    const paths = await globby('./notes/**/*.{md,mdx}');
    let files: FileSpec[] = await Promise.all(
      paths.map(async (v) => {
        return createSpec(v);
      }),
    );
    files.forEach((v) => (v.type = 'doc'));

    for (const file of files) {
      await processing(file);
    }

    for (const file of files) {
      const pre = file.path.substr('./notes/'.length);
      file.refId = `${path.dirname(pre)}/${file.id}`;
    }

    await fs.writeFile(
      'docs.json',
      JSON.stringify(
        files.map(({ id, title, path, refId }) => ({ id, title, path, refId })),
        null,
        2,
      ),
    );

    const changed = files.filter((v) => v.changed);

    for (const v of changed) {
      await fs.writeFile(v.path, buildContent(v));
      setting.verbose && console.log(`${v.id}`);
    }
    console.log('Processed', changed.length, '/', files.length);
  }
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

async function processing(data: FileSpec): Promise<FileSpec> {
  const neo = await processInstruction(data.content);
  if (neo.length !== data.content.length) {
    data.content = neo;
    data.changed = true;
  }
  removeDuplicateTitle(data);
  return data;
}

function removeDuplicateTitle(f: FileSpec) {
  const regTitle = /#\s*(?<title>[^\n]+)/s;
  const title = f.content.match(regTitle)?.groups?.title;
  if(f.meta.hide_title){
    return
  }
  if (f.meta.title === title) {
    // console.log(`${f.id}: dup title ${title}`);
    f.content = f.content.replace(regTitle, '');
    f.changed = true;
  }
}

// 替换 markdown 内的相对路径为绝对路径
function markdownResolveLink(s: string, base: string): string {
  return s.replace(/\[([^\]]*)]\(([^)]+)\)/g, (p, label, href) => {
    if (/^https?:/.test(href)) {
      return p;
    }
    if (/^#/.test(href)) {
      return p;
    }
    const target = new URL(href, base).toString();
    console.log(`resolve ${href}\n\tto ${target}\n\tbased on ${base}`);
    return `[${label}](${target})`;
  });
}

// 指令处理 - 例如 引入外部的 markdown
const imports = {};
async function processInstruction(s: string): Promise<string> {
  const a = parseInstruction(s);
  if (!a) {
    return s;
  }
  for (const v of a) {
    if (typeof v !== 'string') {
      switch (v.cmd) {
        case 'import':
          console.log('import', v.args);
          if (!setting.offline) {
            v.replace = imports[v.args] || (await fetch(v.args).then((v) => v.text()));
            v.replace = markdownResolveLink(v.replace, v.args);
          } else {
            console.log('import - offline skip');
          }
          break;

        default:
          console.warn(`ignore cmd`, v.cmd);
          break;
      }
    }
  }

  return a.join('');
}

type Instruction = { cmd: string; args: string; raw: string; replace?: string; [k: string]: any };

function parseInstruction(s: string): null | Array<string | Instruction> {
  const sp = s.split(/(<!--\s*(import)\((.*?)\)\s*-->)/);
  if (sp.length == 1) {
    return null;
  }
  const itor = sp[Symbol.iterator]();
  const o = [];
  for (let v = itor.next(); !v.done; v = itor.next()) {
    if (v.value.startsWith('<!--') && v.value.endsWith('-->')) {
      o.push({
        cmd: itor.next().value,
        args: itor.next().value,
        raw: v.value,
        toString() {
          return String(this.replace || this.raw);
        },
      });
    } else {
      o.push(v.value);
    }
  }
  return o;
}
