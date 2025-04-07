"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["32524"],{90381:function(e,t,n){n.r(t),n.d(t,{metadata:()=>s,contentTitle:()=>d,default:()=>u,assets:()=>o,toc:()=>c,frontMatter:()=>i});var s=JSON.parse('{"id":"dev/compression/zstd","title":"zstd","description":"- zstd -> Zstandard","source":"@site/../notes/dev/compression/zstd.md","sourceDirName":"dev/compression","slug":"/dev/compression/zstd","permalink":"/notes/dev/compression/zstd","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/compression/zstd.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1729056347000,"frontMatter":{"title":"zstd"},"sidebar":"docs","previous":{"title":"zlib","permalink":"/notes/dev/compression/zlib"},"next":{"title":"\u6570\u636E\u5B57\u5178","permalink":"/notes/dev/data-dict"}}'),r=n("52676"),l=n("79938");let i={title:"zstd"},d="zstd",o={},c=[];function a(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"zstd",children:"zstd"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"zstd -> Zstandard"}),"\n",(0,r.jsxs)(t.li,{children:["compression level\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"1-22"}),"\n",(0,r.jsx)(t.li,{children:"-1 \u6700\u5FEB"}),"\n",(0,r.jsx)(t.li,{children:"0 = \u9ED8\u8BA4 3"}),"\n",(0,r.jsxs)(t.li,{children:["--ultra - levels >= 20\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"\u9700\u8981\u66F4\u591A\u5185\u5B58"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/facebook/zstd/blob/dev/lib/compress/clevels.h",children:"https://github.com/facebook/zstd/blob/dev/lib/compress/clevels.h"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.li,{children:".zst"}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"tar -I zstd --exclude='.DS_Store' -cvf pgsql.tar.zst pgsql\n# \u538B\u7F29\u7EA7\u522B\ntar -I 'zstd -10' --exclude='.DS_Store' -cvf pgsql.tar.zst pgsql\n"})})]})}function u(e={}){let{wrapper:t}={...(0,l.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return d},a:function(){return i}});var s=n(75271);let r={},l=s.createContext(r);function i(e){let t=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(l.Provider,{value:t},e.children)}}}]);