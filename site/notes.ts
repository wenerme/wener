const YAML = require('yaml');
import fs from 'fs-extra';
import { type } from 'os';

const all: Doc[] = JSON.parse(fs.readFileSync('docs.json').toString());
all.sort((a, b) => a.refId.localeCompare(b.refId));

const verbose = process.env.verbose;

const items: Array<Item> = YAML.parse(fs.readFileSync('./notes.yaml').toString());

function resolve(item: ItemType, last?: Item): ItemType | ItemType[] {
  if (typeof item === 'string') {
    return item;
  }
  if (item.prefix?.startsWith('./')) {
    item.prefix = last.prefix + item.prefix.substr(1).replace(/[/]{2,}/g, '/');
  }

  if (item.label && item.prefix) {
    item.items ??= [];
    // prefix with trailing slash to prevent match: git -> gitlab
    const base = item.prefix.match(/([^/]+)[/]?$/)[1];
    item.items.unshift({ prefix: `${item.prefix}/${base}` });
    item.items.push({ prefix: item.prefix });
  }
  if (item.items) {
    item.type = 'category';
    item.items = item.items.flatMap((v) => resolve(v, item));
    delete item.prefix;
    return item;
  }

  // expand prefix
  if (item.prefix) {
    const r = prefix(item.prefix);
    delete item.prefix;
    return r;
  }
  console.error('invalid item', item);
}

const notes = {};
items.forEach((v) => {
  const item = resolve(v) as Item;
  notes[item.label] = item.items;
});

fs.writeJsonSync('notes.json', notes, { spaces: '  ' });

const rest = all.filter((v) => !v.refed);
console.log(`outof sidebar :`, rest.length);
fs.writeFileSync(
  'sidebar.rest.txt',
  rest
    .map((v) => v.refId)
    .sort()
    .join('\n'),
);

type ItemType = Item | string;
interface Item {
  type?: string | 'category';
  label?: string;
  items?: Array<ItemType>;
  prefix?: string;
}
interface Doc {
  id: string;
  title: string;
  path: string;
  refId: string;
  refed?: boolean;
}

function prefix(opt: string | { prefix; excludes }, opt2?): string | string[] {
  let parent;
  if (typeof opt === 'string') {
    let s: string | RegExp = (parent = opt);
    let { excludes = [] } = opt2 || {};
    excludes = excludes.map((v) => `${s}/${v}`);
    if (typeof s === 'string') {
      s = new RegExp(`^${s}(-|/|$)`);
    }
    opt = { prefix: s, excludes };
  }

  const { prefix, excludes = [] } = opt;
  parent = parent || prefix;

  let r = all.filter((v) => match(prefix, v.refId));
  for (const ex of excludes) {
    r = r.filter((v) => !v.refId.startsWith(ex));
  }
  r = r.filter((v) => {
    const ok = !v.refed;
    v.refed = v.refed || prefix;
    return ok;
  });
  (verbose || !r.length) && console.log(`items ${parent} - [${excludes.join(',')}] :`, r.length);
  return r.map((v) => v.refId);
}

function match(m, v) {
  if (m.test) {
    return m.test(v);
  }
  return v.startsWith(m);
}
export {};
