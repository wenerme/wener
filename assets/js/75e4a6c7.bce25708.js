"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["33649"],{61248:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>d,default:()=>a,assets:()=>l,toc:()=>c,frontMatter:()=>i});var t=JSON.parse('{"id":"web/nodejs/ts-node","title":"ts-node","description":"\u63A8\u8350\u4F7F\u7528 tsx","source":"@site/../notes/web/nodejs/ts-node.md","sourceDirName":"web/nodejs","slug":"/web/nodejs/ts-node","permalink":"/notes/web/nodejs/ts-node","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/nodejs/ts-node.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1694402622000,"frontMatter":{"title":"ts-node"},"sidebar":"docs","previous":{"title":"sequelize","permalink":"/notes/web/nodejs/sequelize"},"next":{"title":"tsx","permalink":"/notes/web/nodejs/tsx"}}'),o=s("52676"),r=s("79938");let i={title:"ts-node"},d="ts-node",l={},c=[{value:"Unknown file extension &quot;.ts&quot;",id:"unknown-file-extension-ts",level:3},{value:"\u68C0\u6D4B\u5728 ts-node \u8FD0\u884C",id:"\u68C0\u6D4B\u5728-ts-node-\u8FD0\u884C",level:2},{value:"swc import assert",id:"swc-import-assert",level:2}];function h(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"ts-node",children:"ts-node"})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["\u63A8\u8350\u4F7F\u7528 ",(0,o.jsx)(n.a,{href:"/notes/web/nodejs/tsx",children:"tsx"})]}),"\n",(0,o.jsx)(n.p,{children:"ts-node \u4E0D\u652F\u6301 watch\uFF0C\u9ED8\u8BA4\u53C2\u6570\u53EF\u7528\u6027\u4F4E"}),"\n"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/TypeStrong/ts-node",children:"TypeStrong/ts-node"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"node \u76F4\u63A5\u6267\u884C ts"}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["watch\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"nodemon"}),"\n",(0,o.jsx)(n.li,{children:"ts-node-dev"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"npx ts-node main.ts # \u76F4\u63A5\u6267\u884C ts\n\nnpm i -D tsconfig-paths\nnpx ts-node -r tsconfig-paths/register main.ts              # tsconfig \u91CC\u7684 path \u80FD\u751F\u6548\nnode -r ts-node/register -r tsconfig-paths/register main.ts # \u4F7F\u7528 node\n\nnpx ts-node --showConfig\n# --swc \u9690\u542B --transpileOnly\nnpx ts-node --esm --swc --experimentalSpecifierResolution=node \\\n  run.ts # \u7EA6\u7B49\u4E8E tsx run.ts\n"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"tsconfig.json#ts-node"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",metastring:'title="tsconfig.json"',children:'{\n  "extends": "ts-node/node16/tsconfig.json",\n  // \u9488\u5BF9 ts-node \u7684\u914D\u7F6E\n  "ts-node": {\n    "transpileOnly": true, // \u5FFD\u7565\u7C7B\u578B\u68C0\u67E5\uFF0C\u66F4\u5FEB\n    "files": true, // \u4ECE tsconfig.json \u8BFB\u53D6 files, include, exclude\n    "require": ["tsconfig-paths/register"],\n    "compilerOptions": {\n      "module": "commonjs"\n    }\n  }\n}\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n  "ts-node": {\n    "transpileOnly": true,\n    "swc": true,\n    "esm": true,\n    "experimentalSpecifierResolution": "node"\n  }\n}\n'})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"env"}),(0,o.jsx)(n.th,{children:"demo"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"TS_NODE_COMPILER_OPTIONS"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:'{"module":"commonjs"}'})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"TS_NODE_PROJECT"}),(0,o.jsx)(n.td,{children:"./tsconfig.commonjs.json"})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"NODE_OPTIONS"}),(0,o.jsx)(n.td,{children:"--trace-deprecation --abort-on-uncaught-exception"})]})]})]}),"\n",(0,o.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,o.jsx)(n.h3,{id:"unknown-file-extension-ts",children:'Unknown file extension ".ts"'}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/TypeStrong/ts-node/issues/1062",children:"https://github.com/TypeStrong/ts-node/issues/1062"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"\u68C0\u6D4B\u5728-ts-node-\u8FD0\u884C",children:"\u68C0\u6D4B\u5728 ts-node \u8FD0\u884C"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'var detectTSNode = false;\n\ntry {\n    if (process[Symbol.for("ts-node.register.instance")]) {\n        detectTSNode = true;\n    }\n} catch() {\n}\n'})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/yorickdevries/detect-ts-node/blob/master/index.js",children:"https://github.com/yorickdevries/detect-ts-node/blob/master/index.js"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"swc-import-assert",children:"swc import assert"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["swc 1.3.83 \u8C03\u6574\u540E\u6709\u95EE\u9898\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"keepImportAssertions"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/TypeStrong/ts-node/issues/2056",children:"https://github.com/TypeStrong/ts-node/issues/2056"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/TypeStrong/ts-node/issues/2051",children:"https://github.com/TypeStrong/ts-node/issues/2051"})}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return d},a:function(){return i}});var t=s(75271);let o={},r=t.createContext(o);function i(e){let n=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);