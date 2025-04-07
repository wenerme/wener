"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["18401"],{27573:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>h,assets:()=>c,toc:()=>d,frontMatter:()=>l});var i=JSON.parse('{"id":"languages/tex/tikz/README","title":"tikz","description":"- tikz","source":"@site/../notes/languages/tex/tikz/README.md","sourceDirName":"languages/tex/tikz","slug":"/languages/tex/tikz/","permalink":"/notes/languages/tex/tikz/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/tex/tikz/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666841756000,"frontMatter":{"title":"tikz"},"sidebar":"docs","previous":{"title":"Tex Glossary","permalink":"/notes/languages/tex/glossary"},"next":{"title":"V","permalink":"/notes/languages/v/"}}'),s=t("52676"),r=t("79938");let l={title:"tikz"},a="tikz",c={},d=[];function o(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"tikz",children:"tikz"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://tikz.net/",children:"tikz"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/pgf-tikz/pgf",children:"pgf-tikz/pgf"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Portable Graphic Format for TeX"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/PetarV-/TikZ",children:"PetarV-/TikZ"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/walmes/Tikz",children:"walmes/Tikz"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/f0nzie/tikz_favorites",children:"f0nzie/tikz_favorites"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/janosh/tikz",children:"janosh/tikz"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/xiaohanyu/awesome-tikz",children:"xiaohanyu/awesome-tikz"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://tikzit.github.io/",children:"https://tikzit.github.io/"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"editor"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://tikz.dev/",children:"https://tikz.dev/"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/kisonecat/tikzjax",children:"kisonecat/tikzjax"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"TikZ running under WebAssembly in the browser"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://tikz.net/neural_networks/",children:"https://tikz.net/neural_networks/"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tex",children:"\\documentclass{article}\n\\usepackage{tikz}\n\\usepackage{pgfplots}\n\n\\begin{document}\n\n\\begin{tikzpicture}[scale=0.7]\n\\draw [help lines] (0,-4) grid [step=1] (10,4);\n\\draw (0,0) -- (10,0);\n\\draw plot [domain=0.1:10,samples=100] (\\x,{log2(\\x)});\n\\draw plot [domain=0.1:10,samples=100] (\\x,{log2(\\x)});\n\\end{tikzpicture}\n\n\\vspace{1cm}\n\n\\begin{tikzpicture}[trim axis left]\n\\begin{axis}[domain=0:10,\n  samples=100,\n  enlarge x limits=false,\n  grid=both,\n  no markers,\n  axis equal]\n\\addplot +[thick] {ln(x)/ln(2)};\n\\end{axis}\n\\end{tikzpicture}\n\\end{document}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run --rm -it -v $PWD:/host -w /host wener/base\n# AlpineLinux\napk add texlive texmf-dist-pictures icu-data-full texmf-dist-latexextra texmf-dist-langchinese\napk add -X http://mirrors.aliyun.com/alpine/edge/testing pdf2svg\n\n# Linux GUI\n# apk add -X http://mirrors.aliyun.com/alpine/edge/community tikzit\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tex",metastring:'title="demo.tikz"',children:"\\documentclass[crop,tikz,multi=false]{standalone}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.18}\n\n\\begin{document}\n\n\\begin{tikzpicture}\n  \\fill[red!90!black]  ( 90:.6) circle (1);\n  \\fill[green!80!black](210:.6) circle (1);\n  \\fill[blue!90!black] (330:.6) circle (1);\n\\end{tikzpicture}\n\n\\end{document}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# demo.aux demo.log demo.pdf\n# -output-directory=/tmp\npdflatex -interaction=batchmode -halt-on-error demo.tikz\npdf2svg demo.pdf demo.svg 1\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Speedup\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.overleaf.com/learn/how-to/Why_do_I_keep_getting_the_compile_timeout_error_message%3F",children:"Why do I keep getting the compile timeout error message?"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["View at ",(0,s.jsx)(n.a,{href:"https://upmath.me/",children:"https://upmath.me/"})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",children:"## Minimal Axis\n\n$$\n\\begin{tikzpicture}\n\\draw[help lines, color=gray!30, dashed] (-4.9,-4.9) grid (4.9,4.9);\n\\draw[->,ultra thick] (-5,0)--(5,0) node[right]{$x$};\n\\draw[->,ultra thick] (0,-5)--(0,5) node[above]{$y$};\n\\end{tikzpicture}\n$$\n"})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return l}});var i=t(75271);let s={},r=i.createContext(s);function l(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);