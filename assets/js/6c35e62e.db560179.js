"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["54638"],{36929:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>x,assets:()=>c,toc:()=>h,frontMatter:()=>i});var s=JSON.parse('{"id":"os/linux/stat/htop","title":"htop","description":"- htop explained","source":"@site/../notes/os/linux/stat/htop.md","sourceDirName":"os/linux/stat","slug":"/os/linux/stat/htop","permalink":"/notes/os/linux/stat/htop","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/stat/htop.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1722850468000,"frontMatter":{"title":"htop"},"sidebar":"docs","previous":{"title":"stat","permalink":"/notes/os/linux/stat/"},"next":{"title":"iostat","permalink":"/notes/os/linux/stat/iostat"}}'),r=t("52676"),l=t("79938");let i={title:"htop"},d="htop",c={},h=[];function o(n){let e={a:"a",h1:"h1",header:"header",li:"li",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"htop",children:"htop"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://peteris.rocks/blog/htop/",children:"htop explained"})}),"\n",(0,r.jsxs)(e.li,{children:["\u5185\u5B58\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["VIRT/VSZ - Virtual Image - \u865A\u62DF\u955C\u50CF\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"VIRT = SWAP + RES"}),"\n",(0,r.jsx)(e.li,{children:"\u610F\u4E49\u4E0D\u5927"}),"\n",(0,r.jsx)(e.li,{children:"\u6240\u7528\u5230\u7684\u865A\u62DF\u5185\u5B58\uFF0C\u5305\u542B\u6240\u6709\u4EE3\u7801\u3001\u6570\u636E\u3001\u5171\u4EAB\u5305\u3001\u4EA4\u6362\u533A\u9875\u3001\u6620\u5C04\u4F46\u672A\u4F7F\u7528\u9875"}),"\n",(0,r.jsx)(e.li,{children:"\u5E94\u7528\u7533\u8BF7 1GB \u4F46\u53EA\u7528 1MB \u4E5F\u4F1A\u8BA1\u7B97\u4E3A 1G\u3002"}),"\n",(0,r.jsx)(e.li,{children:"\u5982\u679C mmap 1G \u7684\u6587\u4EF6\uFF0C\u4F46\u672A\u4F7F\u7528\uFF0C\u4E5F\u7B97 1G\u3002"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["RES/RSS - Resident size - \u5E38\u9A7B\u5185\u5B58\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"RES = CODE + DATA"}),"\n",(0,r.jsx)(e.li,{children:"\u672A\u88AB\u4EA4\u6362\u7684\u7269\u7406\u5185\u5B58"}),"\n",(0,r.jsx)(e.li,{children:"\u4E0D\u5305\u542B\u5728\u4EA4\u6362\u533A\u7684\u5185\u5B58"}),"\n",(0,r.jsx)(e.li,{children:"\u90E8\u5206\u5185\u5B58\u53EF\u80FD\u4E0E\u5176\u4ED6\u8FDB\u7A0B\u5171\u4EAB"}),"\n",(0,r.jsx)(e.li,{children:"\u4F8B\u5982\u4E00\u4E2A 1GB \u7684 \u8FDB\u7A0B fork \u540E\uFF0C\u65B0\u7684\u8FDB\u7A0B\u4E5F\u4F1A\u5360\u7528 1G\uFF0C\u4F46\u5B9E\u9645\u53EA\u7528\u5230\u4E86 1G\u3002Linux \u4F1A\u5BF9\u5185\u5B58 \u5199\u65F6\u590D\u5236\u3002"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["SHR - Shared Mem size - \u5171\u4EAB\u5185\u5B58\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u8FDB\u7A0B\u7528\u5230\u7684\u5171\u4EAB\u5185\u5B58"}),"\n",(0,r.jsx)(e.li,{children:"\u5185\u5B58\u53EF\u80FD\u88AB\u5171\u4EAB\uFF0C\u4F46\u4E0D\u4E00\u5B9A\u5DF2\u7ECF\u88AB\u5176\u4ED6\u8FDB\u7A0B\u5171\u4EAB\u4F7F\u7528\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5355\u4F4D\u4E3A kb"}),"\n",(0,r.jsxs)(e.li,{children:["\u914D\u7F6E\u6587\u4EF6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"~/.config/htop/htoprc"}),"\n",(0,r.jsx)(e.li,{children:"~/.htoprc"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"key"}),(0,r.jsx)(e.th,{children:"for"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"t"}),(0,r.jsx)(e.td,{children:"tree"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"H"}),(0,r.jsx)(e.td,{children:"user process threads"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"K"}),(0,r.jsx)(e.td,{children:"kernel threads"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"p"}),(0,r.jsx)(e.td,{children:"program path"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"m"}),(0,r.jsx)(e.td,{children:"merged command"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"F"}),(0,r.jsx)(e.td,{children:"follow process"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"I"}),(0,r.jsx)(e.td,{children:"invert sort"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"e"}),(0,r.jsx)(e.td,{children:"env"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"l"}),(0,r.jsx)(e.td,{children:"lsof"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"x"}),(0,r.jsx)(e.td,{children:"file locks"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"s"}),(0,r.jsx)(e.td,{children:"strace syscall"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"w"}),(0,r.jsx)(e.td,{children:"wrap command"})]})]})]})]})}function x(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(o,{...n})}):o(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return d},a:function(){return i}});var s=t(75271);let r={},l=s.createContext(r);function i(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);