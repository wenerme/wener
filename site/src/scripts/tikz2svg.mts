import { tikz2svg } from '../tools/tikz.mjs';
import fs from 'fs-extra';

async function main() {
  const args = argo();
  for (const f of args._) {
    const out = path.join(path.dirname(f), path.basename(f, path.extname(f)) + '.svg');
    console.log(`> ${f} -> ${out}`);
    if (args['dry-run']) {
      continue;
    }
    const t = await fs.readFile(f, 'utf8');
    await fs.writeFile(out, await tikz2svg(t));
  }
}

main();

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
