import 'zx/globals';
import fs from 'fs-extra';
import { randomUUID } from '@wener/utils';
import os from 'node:os';

/*
\documentclass[crop,tikz,multi=false]{standalone}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}

\begin{document}

\begin{tikzpicture}
*/
export async function tikz2svg(s: string) {
  const id = randomUUID();
  const tmp = path.join(os.tmpdir(), await fs.mkdtemp('tikz2svg'), id);
  const tex = path.join(tmp, `${id}.tikz`);
  const pdf = path.join(tmp, `${id}.pdf`);
  const svg = path.join(tmp, `${id}.svg`);
  s = s.trim();
  if (!s.match(/^\s*\\begin\s*\{document\}/)) {
    s = `\\begin{document}
${s}
\\end{document}
`;
  }

  if (!s.match(/^\s*\\documentclass/)) {
    s = `\\documentclass[crop,tikz,multi=false]{standalone}
\\usepackage{amsmath}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

${s}
`;
  }

  const result = await within(async () => {
    await fs.mkdirs(tmp);
    cd(tmp);
    await fs.writeFile(tex, s);
    await $`timeout 5 pdflatex -interaction=batchmode -halt-on-error ${tex}`;
    await $`timeout 1 pdf2svg ${pdf} ${svg} 1`;
    return await fs.readFile(svg, 'utf8');
  });
  await fs.rm(tmp, { recursive: true });
  return result;
}
