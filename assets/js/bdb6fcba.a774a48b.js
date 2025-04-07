"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87997"],{62103:function(e,n,l){l.r(n),l.d(n,{metadata:()=>t,contentTitle:()=>i,default:()=>d,assets:()=>c,toc:()=>o,frontMatter:()=>s});var t=JSON.parse('{"id":"languages/llvm/README","title":"LLVM","description":"- LLVM Language Reference Manual","source":"@site/../notes/languages/llvm/README.md","sourceDirName":"languages/llvm","slug":"/languages/llvm/","permalink":"/notes/languages/llvm/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/llvm/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725247213000,"frontMatter":{"title":"LLVM"},"sidebar":"docs","previous":{"title":"Languages FAQ","permalink":"/notes/languages/faq"},"next":{"title":"Emscripten","permalink":"/notes/languages/llvm/emscripten"}}'),r=l("52676"),a=l("79938");let s={title:"LLVM"},i="LLVM",c={},o=[];function u(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"llvm",children:"LLVM"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["LLVM ",(0,r.jsx)(n.a,{href:"https://llvm.org/docs/LangRef.html",children:"Language Reference Manual"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u5176\u4ED6\u8BED\u8A00\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Emscripten: An LLVM to JavaScript Compiler"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://mukulrathi.co.uk/create-your-own-programming-language/llvm-ir-cpp-api-tutorial/",children:"A Complete Guide to LLVM for Programming Language Creators"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# brew \u5B89\u88C5\u4F4D\u7F6E /usr/local/opt/llvm\n\n# header -> ir\nclang -cc1 SDL.h -emit-llvm -femit-all-decls -o SDL.h.ll\n# \u67E5\u770B cc1 \u7684\u5E2E\u52A9\nclang -cc1 --help\n# \u7F16\u8BD1\u4E3A\u6C47\u7F16\nllc SDL.h.ll\n# bc \u53CD\u6C47\u7F16\u4E3A ir\nllvm-dis SDL.h.bc\n"})})]})}function d(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return i},a:function(){return s}});var t=l(75271);let r={},a=t.createContext(r);function s(e){let n=t.useContext(a);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);