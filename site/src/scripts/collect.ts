import globby from 'globby';
import path from 'path';
import fs from 'fs-extra';
import YAML from 'yaml'
import { createSpec, FileSpec } from './utils';
export {};
export async function collect({paths = [], cwd=''}){
  const collected = [];
  for (const p of paths) {
    let files = await globby(p, {
      expandDirectories: {
        extensions: ['md', 'mdx'],
      },
    });

    const pre = path.relative(cwd, p);
    for (const file of files) {
      let spec = createSpec(file);
      if (!Object.keys(spec.meta).length) {
        continue;
      }
      spec = contentTitle(spec)
      fs.writeFileSync(spec.path,buildContent(spec))

      console.log(`${spec.meta['title']} - ${pre}/${spec.id}`);
    }
  }
}
async function main() {
  const args = argo();
  const cwd = args['cwd'] || path.resolve('.');
  const paths = args._
  collect({cwd,paths})
}
// yarn ts-node ./src/scripts/collect.ts ../notes/devops/container/ --cwd=../notes

function buildContent(f:{meta:any,content:any}):string{
  return `---\n${YAML.stringify(f.meta).trim()}\n---\n${f.content}\n`
}

function contentTitle(f: FileSpec):FileSpec{
  const title = f.content.match(/^\s#\s*(?<title>[^\s]+)/s)?.groups?.title

  if(title){
    f.context['ContentTitle'] = title
    f.meta['hide_title'] = true
  }
  return f
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

function argo(s: string[] = process.argv.slice(2)) {
  const o = {
    _: [],
  };
  s.forEach((v) => {
    const m = v.match(/^--?(?<name>[^-][^=]*)(=(?<value>.*))?/);
    if (m) {
      let val: any = o[m.groups['name']];
      o[m.groups['name']] = Array.isArray(val) ? [...val, m.groups['value'] || true] : m.groups['value'] || true;
    } else {
      o._.push(v);
    }
  });
  return o;
}
