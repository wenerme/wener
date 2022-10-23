---
title: tikz
---

# tikz

- [tikz](https://tikz.net/)
  - [pgf-tikz/pgf](https://github.com/pgf-tikz/pgf)
    - Portable Graphic Format for TeX
  - [PetarV-/TikZ](https://github.com/PetarV-/TikZ)
  - [walmes/Tikz](https://github.com/walmes/Tikz)
  - [f0nzie/tikz_favorites](https://github.com/f0nzie/tikz_favorites)
  - [janosh/tikz](https://github.com/janosh/tikz)
  - [xiaohanyu/awesome-tikz](https://github.com/xiaohanyu/awesome-tikz)
  - https://tikzit.github.io/
    - editor
  - https://tikz.dev/
- [kisonecat/tikzjax](https://github.com/kisonecat/tikzjax)
  - TikZ running under WebAssembly in the browser
- https://tikz.net/neural_networks/

```tex
\documentclass{article}
\usepackage{tikz}
\usepackage{pgfplots}

\begin{document}

\begin{tikzpicture}[scale=0.7]
\draw [help lines] (0,-4) grid [step=1] (10,4);
\draw (0,0) -- (10,0);
\draw plot [domain=0.1:10,samples=100] (\x,{log2(\x)});
\draw plot [domain=0.1:10,samples=100] (\x,{log2(\x)});
\end{tikzpicture}

\vspace{1cm}

\begin{tikzpicture}[trim axis left]
\begin{axis}[domain=0:10,
  samples=100,
  enlarge x limits=false,
  grid=both,
  no markers,
  axis equal]
\addplot +[thick] {ln(x)/ln(2)};
\end{axis}
\end{tikzpicture}
\end{document}
```

```bash
# AlpineLinux
apk add texlive icu-data-full texmf-dist-latexextra texmf-dist-langchinese texmf-dist-pictures
apk add -X http://mirrors.aliyun.com/alpine/edge/testing pdf2svg

# Linux GUI
# apk add -X http://mirrors.aliyun.com/alpine/edge/community tikzit
```

```tex title="demo.tikz"
\documentclass[crop,tikz,multi=false]{standalone}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}

\begin{document}

\begin{tikzpicture}
  \fill[red!90!black]  ( 90:.6) circle (1);
  \fill[green!80!black](210:.6) circle (1);
  \fill[blue!90!black] (330:.6) circle (1);
\end{tikzpicture}

\end{document}
```

```bash
# demo.aux demo.log demo.pdf
# -output-directory=/tmp
pdflatex -interaction=batchmode -halt-on-error demo.tikz
pdf2svg demo.pdf demo.svg 1
```

- Speedup
  - [Why do I keep getting the compile timeout error message?](https://www.overleaf.com/learn/how-to/Why_do_I_keep_getting_the_compile_timeout_error_message%3F)
