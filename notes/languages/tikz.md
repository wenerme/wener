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
  - online
    - https://www.overleaf.com/learn/latex/TikZ_package
    - [parpalak/upmath.me](https://github.com/parpalak/upmath.me)
      - https://upmath.me/
      - 服务端渲染
      - PHP
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
