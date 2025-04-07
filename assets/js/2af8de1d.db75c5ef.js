"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["76809"],{36419:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>c});var s=JSON.parse('{"id":"web/dev/bundle/ncc","title":"ncc","description":"- vercel/ncc","source":"@site/../notes/web/dev/bundle/ncc.md","sourceDirName":"web/dev/bundle","slug":"/web/dev/bundle/ncc","permalink":"/notes/web/dev/bundle/ncc","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dev/bundle/ncc.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1663838677000,"frontMatter":{"title":"ncc"},"sidebar":"docs","previous":{"title":"ESBuild","permalink":"/notes/web/dev/bundle/esbuild"},"next":{"title":"Parcel","permalink":"/notes/web/dev/bundle/parcel"}}'),t=r("52676"),l=r("79938");let c={title:"ncc"},i="ncc",d={},a=[{value:"require is not defined",id:"require-is-not-defined",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"ncc",children:"ncc"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/vercel/ncc",children:"vercel/ncc"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Node.js \u9879\u76EE -> \u5355\u6587\u4EF6"}),"\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528 webpack bundle"}),"\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528 babel \u8F6C\u8BD1"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/acornjs/acorn",children:"acornjs/acorn"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528\u7684 JS \u89E3\u6790\u5668"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/vercel/nft",children:"@vercel/nft"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/vercel/webpack-asset-relocator-loader",children:"@vercel/webpack-asset-relocator-loader"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u9759\u6001\u4F9D\u8D56\u5206\u6790"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx -y @vercel/ncc build src/server.ts -o dist/ncc --target es2020 -s\n\n# \u76F4\u63A5\u8FD0\u884C - \u53EF\u7528\u4E8E\u6D4B\u8BD5,\u751F\u6210\u5230\u4E34\u65F6\u76EE\u5F55\nnpx -y @vercel/ncc run src/server.ts --target es2020 -s\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"flag"}),(0,t.jsx)(n.th,{children:"for"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-t"}),(0,t.jsx)(n.td,{children:"transpile-only ts \u53EA\u8F6C\u8BD1\uFF0C\u5FFD\u7565\u7C7B\u578B\u9519\u8BEF"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-m"}),(0,t.jsx)(n.td,{children:"minify"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-s"}),(0,t.jsx)(n.td,{children:"source-map"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-e"}),(0,t.jsx)(n.td,{children:"external"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"--v8-cache"}),(0,t.jsx)(n.td,{})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"require-is-not-defined",children:"require is not defined"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u56E0\u4E3A\u6CA1\u6709 bundle\uFF0C\u5BFC\u81F4 esm+cjs \u4F1A\u6709\u95EE\u9898"}),"\n",(0,t.jsx)(n.li,{children:"\u4F8B\u5982 fastify \u662F cjs"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5982\u679C external \u80FD\u907F\u514D\nncc build src/index.ts -m -s --target es2020 -e sqlite3 -e sqlite\n\n# \u5426\u5219\u53EA\u80FD bundle\nnpx esbuild --bundle --outfile=dist/esm/server.js src/server.ts --platform=node --format=esm --charset=utf8 --target=chrome90 --sourcemap --external:{sqlite,pg,pg-hstore}\n\n# rollup\nnpx rollup -e sqlite3,pg,pg-hstore --format es -m inline -o dist/es/server.js -i src/server.ts -p typescript -p node-resolve\n"})})]})}function o(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return i},a:function(){return c}});var s=r(75271);let t={},l=s.createContext(t);function c(e){let n=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);