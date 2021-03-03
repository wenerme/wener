import globby from 'globby';
import fs from 'fs-extra';
import path from 'path';

export {};

/** 生成 sidebar

```
- java/maven
- type: category
  label: 版本
  items:
  - java/version/version
```
*/
async function main(opts = argo()) {
  const { base = '' } = opts;
  let docs: Array<{ refId: string; id; title,dir? }> = JSON.parse((await fs.readFile('docs.json')).toString());
  if (base) {
    docs = docs.filter((v) => v.refId.startsWith(base));
  }
  docs.forEach(v=>{
    v.dir = path.dirname(v.refId)
  })
  buildTree(docs)
}
type Item = Array<string | CategoryItem>;
interface CategoryItem {
  items: Array<Item>;
  type;
  label;
}
function buildTree(docs) {
  const byRefId = Object.fromEntries(docs.map(v=>[v.refId,v]))
  const dirs = {}
  docs.forEach(v=>{
    const dir = dirs[v.dir] ||=  []
    dir.push(v)
  })
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

function argo(s: string[] = process.argv.slice(2)): Record<string, any> {
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
