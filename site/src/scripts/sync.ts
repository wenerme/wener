import globby from 'globby';
import fs from 'fs-extra';
import { argo } from './utils';
const arg = argo();
console.assert(arg['dir'], 'need dir');

if (arg['cwd']) {
  process.chdir(arg['cwd']);
}

async function main() {
  let paths = await globby(arg['dir'], {
    expandDirectories: {
      extensions: ['md', 'mdx', 'jpg', 'jpeg', 'png', 'gif', 'svg'],
    },
  });

  paths = paths.filter((v) => {
    if (/[.](md|mdx)$/.test(v)) {
      const c = fs.readFileSync(v).toString();
      return isValidMarkdown(c);
    }
    return true;
  });

  paths.forEach((v) => console.log(v));
}
(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

function isValidMarkdown(content: string) {
  return content.startsWith('---');
}

// 14
// node --require ts-node/register/transpile-only --experimental-repl-await

// node -r ts-node/register src/scripts/sync.ts -dir=../story/ > story.list.txt
// rsync -a --files-from=story.list.txt ../ ./contents/ -v
