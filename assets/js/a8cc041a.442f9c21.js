"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["39623"],{35055:function(n,e,t){t.r(e),t.d(e,{metadata:()=>r,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>s});var r=JSON.parse('{"id":"dev/pattern/control-plane","title":"Control plane","description":"- \u63A7\u5236\u9762\u677F","source":"@site/../notes/dev/pattern/control-plane.md","sourceDirName":"dev/pattern","slug":"/dev/pattern/control-plane","permalink":"/notes/dev/pattern/control-plane","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/pattern/control-plane.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"Control plane"},"sidebar":"docs","previous":{"title":"Actor","permalink":"/notes/dev/pattern/actor"},"next":{"title":"Durable Function","permalink":"/notes/dev/pattern/durable-function"}}'),l=t("52676"),i=t("79938");let s={title:"Control plane"},d="Control plane",c={},o=[];function a(n){let e={a:"a",h1:"h1",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"control-plane",children:"Control plane"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u63A7\u5236\u9762\u677F"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Control_plane",children:"Control plane"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u914D\u7F6E Data plane - \u7BA1\u7406\u64CD\u4F5C\u8DEF\u5F84"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Data_plane",children:"Data plane"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5B9E\u9645\u5904\u7406\u903B\u8F91 - \u5904\u7406\u6570\u636E - \u7528\u6237\u8BBF\u95EE\u8DEF\u5F84"}),"\n",(0,l.jsxs)(e.li,{children:["\u9AD8\u6027\u80FD - \u53EF\u80FD\u662F\u786C\u4EF6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4F8B\u5982 ",(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Forwarding_plane",children:"Forwarding plane"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u76F8\u5BF9\u8F7B\u91CF"}),"\n",(0,l.jsx)(e.li,{children:"\u529F\u80FD\u5355\u4E00"}),"\n",(0,l.jsx)(e.li,{children:"\u901A\u5E38\u4E3A\u4EE3\u7406\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u53C2\u8003"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://istio.io/latest/docs/ops/deployment/architecture/",children:"Istio Architecture"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://linkerd.io/2.10/reference/architecture/",children:"Linkerd Architecture"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{children:"-"}),(0,l.jsx)(e.th,{children:"Control plane"}),(0,l.jsx)(e.th,{children:"Data plane"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Router"}),(0,l.jsx)(e.td,{children:"\u8DEF\u7531\u8868"}),(0,l.jsx)(e.td,{children:"\u5305\u8F6C\u53D1"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Ingress Nginx"}),(0,l.jsx)(e.td,{children:"Ingress Controller"}),(0,l.jsx)(e.td,{children:"Nginx"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Linkerd"}),(0,l.jsx)(e.td,{children:"controller"}),(0,l.jsx)(e.td,{children:"linkerd-proxy"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Istio"}),(0,l.jsx)(e.td,{children:"istiod"}),(0,l.jsx)(e.td,{children:"envoy+sidecar"})]})]})]})]})}function h(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return d},a:function(){return s}});var r=t(75271);let l={},i=r.createContext(l);function s(n){let e=r.useContext(i);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:s(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);