"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["96951"],{1491:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>l,default:()=>h,assets:()=>d,toc:()=>o,frontMatter:()=>i});var s=JSON.parse('{"id":"service/bi/cubejs/cubejs-store","title":"cubestore","description":"- @cubejs-backend/cubestore cube-js/cube.js/rust","source":"@site/../notes/service/bi/cubejs/cubejs-store.md","sourceDirName":"service/bi/cubejs","slug":"/service/bi/cubejs/store","permalink":"/notes/service/bi/cubejs/store","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/bi/cubejs/cubejs-store.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702440128000,"frontMatter":{"title":"cubestore"},"sidebar":"docs","previous":{"title":"CubeJS Schema","permalink":"/notes/service/bi/cubejs/schema"},"next":{"title":"echarts","permalink":"/notes/service/bi/echarts"}}'),t=r("52676"),c=r("79938");let i={title:"cubestore"},l="cubestore",d={},o=[];function u(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"cubestore",children:"cubestore"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["@cubejs-backend/cubestore ",(0,t.jsx)(n.a,{href:"https://github.com/cube-js/cube.js/tree/master/rust",children:"cube-js/cube.js/rust"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Apache-2.0, Rust"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["router\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5355\u4E2A"}),"\n",(0,t.jsx)(n.li,{children:"\u5904\u7406\u5BA2\u6237\u7AEF\u8BF7\u6C42\uFF0C\u7BA1\u7406\u6570\u636E\u5E93\u5143\u6570\u636E\uFF0C\u63D0\u4F9B\u7B80\u5355\u67E5\u8BE2"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["worker\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u591A\u4E2A"}),"\n",(0,t.jsx)(n.li,{children:"\u6267\u884C SQL"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u672C\u5730\u5B58\u50A8\u4E3A Parquet \u683C\u5F0F"}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4F1A\u4ECE github \u4E0B\u8F7D binary\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"npm config get https-proxy"}),"\n",(0,t.jsx)(n.li,{children:"npm config get proxy"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker run -p 3030:3030 -v $PWD/.cubestore:/cube/data cubejs/cubestore\n\n# \u4F7F\u7528 cubestore\n# CUBEJS_EXT_DB_TYPE=cubestore\n# CUBEJS_EXT_DB_HOST=127.0.0.1\ndocker run -p 4000:4000 \\\n  -e CUBEJS_CUBESTORE_HOST=localhost \\\n  -v ${PWD}:/cube/conf \\\n  cubejs/cube\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"env"}),(0,t.jsx)(n.th,{children:"router"}),(0,t.jsx)(n.th,{children:"worker"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CUBESTORE_SERVER_NAME"}),(0,t.jsx)(n.td,{children:"Yes"}),(0,t.jsx)(n.td,{children:"Yes"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CUBESTORE_META_PORT"}),(0,t.jsx)(n.td,{children:"Yes"}),(0,t.jsx)(n.td,{children:"-"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CUBESTORE_WORKERS"}),(0,t.jsx)(n.td,{children:"Yes"}),(0,t.jsx)(n.td,{children:"Yes"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CUBESTORE_WORKER_PORT"}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Yes"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CUBESTORE_META_ADDR"}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Yes"})]})]})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'title="router,env"',children:"CUBESTORE_SERVER_NAME=cubestore_router:9999\nCUBESTORE_META_PORT=9999\nCUBESTORE_WORKERS=cubestore_worker_1:9001,cubestore_worker_2:9001\nCUBESTORE_REMOTE_DIR=/cube/data\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'title="worker.env"',children:"CUBESTORE_SERVER_NAME=cubestore_worker_1:9001\nCUBESTORE_WORKER_PORT=9001\nCUBESTORE_META_ADDR=cubestore_router:9999\nCUBESTORE_WORKERS=cubestore_worker_1:9001,cubestore_worker_2:9001\nCUBESTORE_REMOTE_DIR=/cube/data\n"})})]})}function h(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return i}});var s=r(75271);let t={},c=s.createContext(t);function i(e){let n=s.useContext(c);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);