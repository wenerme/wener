"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["82460"],{90295:function(n,e,l){l.r(e),l.d(e,{metadata:()=>i,contentTitle:()=>c,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>t});var i=JSON.parse('{"id":"db/olap/README","title":"OLAP","description":"- \u6570\u636E\u6444\u53D6 -> \u6570\u636E\u5B58\u50A8 -> \u6570\u636E\u5904\u7406 -> \u6570\u636E\u8BBF\u95EE","source":"@site/../notes/db/olap/README.md","sourceDirName":"db/olap","slug":"/db/olap/","permalink":"/notes/db/olap/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/olap/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725936322000,"frontMatter":{"title":"OLAP"},"sidebar":"docs","previous":{"title":"CockroachDB","permalink":"/notes/db/newsql/cockroachdb"},"next":{"title":"Greenplum","permalink":"/notes/db/olap/greenplum"}}'),s=l("52676"),r=l("79938");let t={title:"OLAP"},c="Online Analytical Processing",d={},a=[];function h(n){let e={a:"a",h1:"h1",header:"header",li:"li",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"online-analytical-processing",children:"Online Analytical Processing"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u6444\u53D6 -> \u6570\u636E\u5B58\u50A8 -> \u6570\u636E\u5904\u7406 -> \u6570\u636E\u8BBF\u95EE"}),"\n",(0,s.jsxs)(e.li,{children:["\u5173\u952E\u6280\u672F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u9884\u805A\u5408 - Apache Kylin\u3001Druid\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Cube"}),"\n",(0,s.jsx)(e.li,{children:"\u5DF2\u77E5\u4E1A\u52A1\u6307\u6807\u3001\u6570\u636E\u5177\u6709\u4E00\u5B9A\u7ED3\u6784\u6027"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["MPP\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5E76\u53D1\u6570\u636E\u5904\u7406"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u7D22\u5F15 - Elastic\u3001Solr\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u641C\u7D22\u4E3A\u4E3B\uFF0C\u5927\u91CF\u6570\u636E\u4E2D\u9009\u62E9\u5C0F\u90E8\u5206\u6570\u636E"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5217\u5B58\u50A8 - Impala\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u9AD8\u538B\u7F29\u6BD4\u3001\u4F4E IO\u3001\u5FEB\u901F\u8FC7\u6EE4"}),"\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u91CF\u5927\uFF0C\u4E0D\u9002\u5408\u5927 JOIN"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5185\u5B58\u5904\u7406 - Presto\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5FEB\u901F\u8BA1\u7B97\u5904\u7406"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u9009\u62E9\u51FA\u53D1\u70B9\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u91CF\u7EA7\uFF1AG\u3001T\u3001P\u3001\u5355\u8868\u91CF\u7EA7"}),"\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u7C7B\u578B\uFF1A\u65F6\u5E8F\u3001\u65E5\u5FD7\u3001\u4E8B\u4EF6\u3001\u884C\u4E3A\u3001\u6C47\u603B"}),"\n",(0,s.jsx)(e.li,{children:"\u64CD\u4F5C\u7C7B\u578B\uFF1A\u805A\u5408\u3001\u641C\u7D22\u3001\u7EDF\u8BA1\u3001\u6307\u6807\u3001JOIN"}),"\n",(0,s.jsx)(e.li,{children:"\u8BFB\u5199\u7C7B\u578B\uFF1A\u8BFB\u4E3A\u4E3B\u3001\u5199\u4E3A\u4E3B\u3001\u6D41\u5199\u5165\u3001\u662F\u5426\u66F4\u65B0"}),"\n",(0,s.jsx)(e.li,{children:"\u96C6\u6210\u80FD\u529B\uFF1A\u652F\u6301\u591A\u5C11\u5916\u90E8\u6570\u636E\u6E90\u3001\u662F\u5426\u80FD\u6D41\u5904\u7406"}),"\n",(0,s.jsx)(e.li,{children:"\u5B58\u50A8\u8BA1\u7B97\uFF1A\u504F\u5411\u5B58\u50A8\u8FD8\u662F\u8BA1\u7B97\u5206\u6790"}),"\n",(0,s.jsx)(e.li,{children:"\u662F\u5426\u9700\u8981 Hadoop \u751F\u6001"}),"\n",(0,s.jsx)(e.li,{children:"\u5B58\u50A8\u65F6\u6548"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5E38\u89C1\u7279\u6027\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u79D2\u7EA7\u54CD\u5E94"}),"\n",(0,s.jsx)(e.li,{children:"\u5E76\u53D1"}),"\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u96C6\u5927\u5C0F"}),"\n",(0,s.jsx)(e.li,{children:"SQL \u652F\u6301"}),"\n",(0,s.jsx)(e.li,{children:"\u79BB\u7EBF\u5904\u7406"}),"\n",(0,s.jsx)(e.li,{children:"\u5B9E\u65F6\u5904\u7406"}),"\n",(0,s.jsx)(e.li,{children:"\u53BB\u91CD"}),"\n",(0,s.jsx)(e.li,{children:"\u660E\u7EC6"}),"\n",(0,s.jsx)(e.li,{children:"\u6570\u636E\u7ED3\u6784\u53D8\u5316"}),"\n",(0,s.jsx)(e.li,{children:"JOIN"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.slideshare.net/welkaim/big-data-architecture-bi-and-analytics-part-2",children:"Big data architecture: BI and Analytics (Part 2)"})}),"\n"]}),"\n"]}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(h,{...n})}):h(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return c},a:function(){return t}});var i=l(75271);let s={},r=i.createContext(s);function t(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);