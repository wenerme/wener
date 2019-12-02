import globby from 'globby';
import fs from 'fs-extra';
import fetch from 'isomorphic-fetch'


(async function () {
  const paths = await globby('../story/**/*.md')
  let files: FileData[] = await Promise.all(paths.map(async v => {
    const content = (await fs.readFile(v)).toString();
    return { content, filename: v }
  }))
  files = files.filter(v => v.content.startsWith('---'))

  files = await Promise.all(files.map(async v => ({ ...v, processed: await process(v) })))
  files = files.filter(v => v.processed && v.processed.changed)
  console.log(files.map(v => v.filename))

  for (const v of files) {
    if (v.processed) {
      await fs.writeFile(v.filename, v.processed.content)
    }
  }
})();


interface FileData {
  filename: string
  content: string
  processed?: ProcessData
}
interface ProcessData {
  changed?: boolean
  content: string
}

async function process(data: ProcessData): Promise<ProcessData> {
  return fetchImport(data)
}


/**
 * support import directive
 */
async function fetchImport(data: ProcessData, o: any = null): Promise<ProcessData> {
  const repo = o || {};
  let { content, changed } = data
  const next = content.replace(/<!--\s*import\((.*?)\)\s*-->/g, (placeholder, url) => {
    if (repo[url]) {
      changed = true
      return repo[url];
    }
    repo[url] = null;
    return placeholder;
  });

  const more = Object.entries(repo).filter(([, v]) => v === null);
  if (more.length) {
    await Promise.all(more.map(async ([k]) => {
      console.time(`fetch ${k}`);
      repo[k] = (await (await fetch(k)).text());
      console.timeEnd(`fetch ${k}`);
    }));
    return fetchImport({ ...data, content: next, changed }, repo);
  }
  return { ...data, content: next, changed };
}
