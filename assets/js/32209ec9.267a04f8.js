"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66886"],{38567:function(n,e,i){i.r(e),i.d(e,{metadata:()=>r,contentTitle:()=>c,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>t});var r=JSON.parse('{"id":"dev/pattern/sidecar","title":"Sidecar","description":"- \u597D\u5904","source":"@site/../notes/dev/pattern/sidecar.md","sourceDirName":"dev/pattern","slug":"/dev/pattern/sidecar","permalink":"/notes/dev/pattern/sidecar","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/pattern/sidecar.md","tags":[{"inline":true,"label":"Pattern","permalink":"/notes/tags/pattern"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"Sidecar","tags":["Pattern"]},"sidebar":"docs","previous":{"title":"SEGA Pattern","permalink":"/notes/dev/pattern/sega"},"next":{"title":"semver","permalink":"/notes/dev/practice/semver"}}'),l=i("52676"),s=i("79938");let t={title:"Sidecar",tags:["Pattern"]},c="Sidecar",d={},a=[];function h(n){let e={a:"a",blockquote:"blockquote",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"sidecar",children:"Sidecar"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u597D\u5904\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8DE8\u8BED\u8A00"}),"\n",(0,l.jsx)(e.li,{children:"\u57FA\u7840\u8BBE\u65BD\u7EA7\u522B - \u72EC\u7ACB\u4E8E\u9879\u76EE"}),"\n",(0,l.jsx)(e.li,{children:"\u4E2D\u95F4\u4EF6 -> \u516C\u5171\u670D\u52A1\u7EC4\u4EF6"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u4EE5\u5B9E\u73B0\u975E\u5E38\u590D\u6742\u7684\u4E8B\u60C5 - mTLS, \u8DE8\u96C6\u7FA4, Gateway, \u63D0\u4F9B\u5E94\u7528\u989D\u5916\u529F\u80FD"}),"\n",(0,l.jsx)(e.li,{children:"DP, CP \u5206\u79BB"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u574F\u5904\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u989D\u5916\u7684\u6027\u80FD\u5F00\u9500\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6BCF\u4E2A\u5BB9\u5668\u90FD\u4F1A\u90E8\u7F72\u4E00\u4E2A Sidecar"}),"\n",(0,l.jsx)(e.li,{children:"\u89E3\u6790\u6D41\u91CF"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u5185\u90E8\u6D41\u91CF\u8DEF\u5F84\u590D\u6742"}),"\n",(0,l.jsx)(e.li,{children:"DP+CP - \u7ED3\u6784\u590D\u6742"}),"\n",(0,l.jsx)(e.li,{children:"\u65E0\u6CD5\u7BA1\u7406\u751F\u547D\u5468\u671F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.blockquote,{children:["\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"Note"})," Sidecar \u5E94\u7528"]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53EF\u89C2\u5BDF\u6027 - thanos"}),"\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u540C\u6B65 - litestream, wall-e"}),"\n",(0,l.jsx)(e.li,{children:"\u5FAE\u670D\u52A1/\u7F51\u7EDC/Mesh - linkerd, consul-connect, envoy"}),"\n",(0,l.jsx)(e.li,{children:"\u5FAE\u670D\u52A1/\u5E94\u7528 - dapr"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u63A7\u5236\u5DF2\u6709\u7A0B\u5E8F\u7684\u914D\u7F6E\u3001\u73AF\u5883"}),"\n",(0,l.jsx)(e.li,{children:"\u901A\u8FC7\u63A5\u53E3\u7684\u65B9\u5F0F\u66B4\u9732\u5DF2\u6709\u7A0B\u5E8F\u7684\u63A7\u5236\u80FD\u529B"}),"\n",(0,l.jsx)(e.li,{children:"\u4E3B\u8981\u7528\u4E8E\u4E92\u8054"}),"\n",(0,l.jsx)(e.li,{children:"\u4E00\u822C\u4E0E\u76EE\u6807\u662F\u4E00\u5BF9\u4E00\u5173\u7CFB - \u5982\u679C\u4E00\u5BF9\u591A\u5219\u662F\u7C7B\u4F3C\u670D\u52A1\u6982\u5FF5"}),"\n",(0,l.jsxs)(e.li,{children:["\u6709\u4E9B\u662F\u5C06\u88AB\u63A7\u5236\u5E94\u7528\u4E00\u8D77\u6253\u5305\u7684\uFF0C\u8FD9\u6837\u7684\u4E0D\u7B97 sidecar\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F8B\u5982 kong"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5E38\u89C1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u914D\u7F6E\u6587\u4EF6 - \u751F\u6210\u914D\u7F6E\u3001\u7A0B\u5E8F\u91CD\u542F\u3001\u914D\u7F6E\u4E0B\u53D1"}),"\n",(0,l.jsx)(e.li,{children:"\u53CD\u5411\u4EE3\u7406 - \u7A7F\u900F\u3001\u52A0\u5BC6\u3001\u7194\u65AD"}),"\n",(0,l.jsx)(e.li,{children:"\u73AF\u5883\u4FE1\u606F - \u6CE8\u518C\u3001\u76D1\u63A7"}),"\n",(0,l.jsx)(e.li,{children:"\u65E5\u5FD7\u4E0A\u62A5"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u793A\u4F8B\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/haproxytech/dataplaneapi",children:"haproxytech/dataplaneapi"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7ED9 haproxy \u6DFB\u52A0\u914D\u7F6E\u63A5\u53E3\u80FD\u529B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/hashicorp/consul-template",children:"hashicorp/consul-template"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u57FA\u4E8E\u7ED3\u6784\u6027\u6570\u636E\u751F\u6210\u914D\u7F6E\u6587\u4EF6"}),"\n",(0,l.jsx)(e.li,{children:"\u89E6\u53D1\u5F15\u7528\u91CD\u542F\u6216\u91CD\u8F7D"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["prometheus \u7684 exporter\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66B4\u9732\u5E94\u7528\u76D1\u63A7\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["consul \u7684 connect \u4EE3\u7406\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7F51\u7EDC\u7A7F\u900F\u3001\u52A0\u5BC6\u3001\u53CD\u5411\u4EE3\u7406"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return t}});var r=i(75271);let l={},s=r.createContext(l);function t(n){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),r.createElement(s.Provider,{value:e},n.children)}}}]);