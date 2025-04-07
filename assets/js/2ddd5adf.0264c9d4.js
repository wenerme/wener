"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["21699"],{36926:function(e,n,t){t.r(n),t.d(n,{assets:function(){return h},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return c},metadata:function(){return r},toc:function(){return a}});var r=t(39108),s=t(52676),i=t(79938);let c={slug:"migrate-aliyun-cdn-to-cf",title:"\u8FC1\u79FB\u963F\u91CC\u4E91 CDN \u5230 Cloudflare",tags:["DevOps","Aliyun"]},l="\u8FC1\u79FB\u963F\u91CC\u4E91 CDN \u5230 Cloudflare",h={authorsImageUrls:[]},a=[{value:"\u80CC\u666F",id:"\u80CC\u666F",level:2},{value:"\u8FC1\u79FB",id:"\u8FC1\u79FB",level:2}];function o(e){let n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(97547).Z+"",width:"1352",height:"1012"})}),"\n",(0,s.jsx)(n.p,{children:"\u6BCF\u6708\u8282\u7701 30\xa5 \u963F\u91CC\u4E91\u5168\u7AD9 CDN \u6D41\u91CF\u8D39\u7528\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u80CC\u666F",children:"\u80CC\u666F"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://wener.tech",children:"https://wener.tech"})," \u4E3A\u56FD\u5185\u5907\u6848\u57DF\u540D\uFF0C",(0,s.jsx)(n.a,{href:"https://wener.me",children:"https://wener.me"})," \u4E3A\u672A\u5907\u6848\u57DF\u540D\uFF0C\u4E24\u4E2A\u7AD9\u70B9\u63D0\u4F9B\u76F8\u540C\u5185\u5BB9\uFF0C\u6570\u636E\u90FD\u4E3A github pages"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["wener.me ",(0,s.jsx)(n.a,{href:"https://github.com/wenerme/wener/tree/gh-pages",children:"https://github.com/wenerme/wener/tree/gh-pages"})]}),"\n",(0,s.jsxs)(n.li,{children:["wener.tech ",(0,s.jsx)(n.a,{href:"https://github.com/wenerme/wener.tech/tree/gh-pages",children:"https://github.com/wenerme/wener.tech/tree/gh-pages"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://charts.wener.tech",children:"https://charts.wener.tech"})," ",(0,s.jsx)(n.a,{href:"https://github.com/wenerme/charts",children:"https://github.com/wenerme/charts"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u56E0\u4E3A\u4E00\u4E2A repo \u53EA\u80FD\u6709\u4E00\u4E2A CNAME\uFF0C\u6240\u4EE5\u4F7F\u7528\u4E86\u4E24\u4E2A\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u56FD\u5185\u5907\u6848\u57DF\u540D\u6700\u7701\u4E8B\u7684\u65B9\u5F0F\u662F\u653E\u5230\u56FD\u5185\u4E91\u5E73\u53F0\u89E3\u6790\uFF0C\u8FC1\u51FA\u53EF\u80FD\u5BFC\u81F4\u5907\u6848\u64A4\u9500\uFF0C\u56E0\u6B64 wener.tech \u4F7F\u7528\u4E86\u963F\u91CC\u4E91\u5168\u7AD9 CDN\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u5176\u4E2D charts.wener.tech \u6D41\u91CF\u6700\u5927\uFF0C\u56E0\u4E3A\u52A0\u5230\u4E00\u4E9B helm charts \u7684\u7D22\u5F15\u7AD9\u91CC\uFF0C\u4E14\u90E8\u7F72\u5F88\u591A\u5730\u65B9\u90FD\u7528\u5230\u4E86\u3002\n\u5176\u4E2D\u91CF\u6700\u5927\u7684\u8BF7\u6C42\u4E3A index.yaml \uFF0C \u5355\u4E2A\u6587\u4EF6\u4E0D\u5C0F\uFF0C\u8BF7\u6C42\u6B21\u6570\u9AD8\uFF0C\u6BCF\u4E2A\u6708\u7684\u5168\u7AD9 CDN \u57FA\u672C\u90FD\u82B1\u8D39\u5728\u4E86 charts.wener.tech\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u8FC1\u79FB",children:"\u8FC1\u79FB"}),"\n",(0,s.jsx)(n.p,{children:"\u6BCF\u4E2A\u6708\u4E3A charts.wener.tech \u6D41\u91CF\u4ED8\u8D39\u4E5F\u4E0D\u662F\u529E\u6CD5\uFF0C\u56E0\u6B64\u6253\u7B97\u8FC1\u79FB\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u4E4B\u524D"})}),"\n",(0,s.jsx)(n.p,{children:"import Mermaid from '@theme/Mermaid';"}),"\n",(0,s.jsxs)(n.p,{children:["<Mermaid\nchart={",(0,s.jsx)(n.code,{children:"graph TD     charts.wener.tech --CNAME--\x3e AliyunCDN     AliyunCDN --\x3e GitHubPages"}),"}\n/>"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u4E4B\u540E"})}),"\n",(0,s.jsxs)(n.p,{children:["<Mermaid\nchart={",(0,s.jsx)(n.code,{children:"graph TD     charts.wener.tech -- CNAME --\x3e fb.wener.me     fb.wener.me --\x3e ArgoTunnel --Kubernetes--\x3e Nginx     Nginx --\x3e GitHubPages"}),"}\n/>"]}),"\n",(0,s.jsx)(n.p,{children:"\u56E0\u4E3A wener.tech \u662F\u5728\u56FD\u5185\uFF0C\u56E0\u6B64\u53EA\u80FD\u4F7F\u7528 CNAME \u65B9\u5F0F\u5230 cloudflare\uFF0Ccloudflare \u652F\u6301\u4E3A\u5916\u90E8\u57DF\u540D\u914D\u7F6E ssl \uFF0C\u7136\u540E fallback \u5230\u6258\u7BA1\u57DF\u540D\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u4F7F\u7528\u4E86 Nginx \u4F5C\u4E3A\u53CD\u5411\u4EE3\u7406\u7F13\u5B58\uFF0C\u5C1D\u8BD5\u4E86 Varnish\uFF0C\u4F46\u53D1\u73B0\u8FD8\u662F Nginx \u6700\u4E3A\u7B80\u5355\u66B4\u529B\u3002"}),"\n",(0,s.jsx)(n.p,{children:"GitHub Pages \u6709\u65F6\u5019\u5728\u56FD\u5185\u4E5F\u4E0D\u4E00\u5B9A\u80FD\u8BBF\u95EE\uFF0C\u52A0\u4E86\u672C\u5730\u7F13\u5B58\u662F\u6700\u4E3A\u4FDD\u9669\u7684\u3002"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note"})," ",(0,s.jsx)(n.a,{href:"https://wener.me/notes/devops/web/proxy-cache",children:"Why choose nginx as proxy cache"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Cloudflare \u7F13\u5B58\u547D\u4E2D\u95EE\u9898"})}),"\n",(0,s.jsx)(n.p,{children:"\u4E00\u5F00\u59CB\u7F13\u5B58\u547D\u4E2D\u662F\u5F88\u4F4E\u7684"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(97547).Z+"",width:"1352",height:"1012"})}),"\n",(0,s.jsx)(n.p,{children:"\u56E0\u4E3A Cloudflare \u57FA\u4E8E extension \u7F13\u5B58\u800C\u4E0D\u662F mime\uFF0C\u4E14\u9ED8\u8BA4\u4E0D\u7F13\u5B58 html yaml \u8FD9\u79CD\uFF0C\u5728\u901A\u8FC7 Page Rule \u6DFB\u52A0\u5168\u7AD9\u7F13\u5B58\u540E\uFF0C\u7F13\u5B58\u547D\u4E2D\u7387\u4E00\u4E0B\u5B50\u5C31\u4E0A\u53BB\u4E86\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u5C31\u8FD9\u6837\u6BCF\u4E2A\u6708\u8282\u7701\u4E86\u4E00\u5C0F\u7B14\u963F\u91CC\u4E91\u5168\u7AD9 CDN \u6D41\u91CF\u8D39\u7528\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u7A7F\u900F\u5230 Nginx \u7684\u6D41\u91CF"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(91937).Z+"",width:"1172",height:"314"})})]})}function d(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},97547:function(e,n,t){t.d(n,{Z:function(){return r}});let r=t.p+"assets/images/2022-10-07-cf-stat-5b42e5f04a314944c410c5b8ae8f550d.png"},91937:function(e,n,t){t.d(n,{Z:function(){return r}});let r=t.p+"assets/images/2022-10-07-goaccess-stat-8384f4263c7f9df98596d6cf699b4e0d.png"},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return c}});var r=t(75271);let s={},i=r.createContext(s);function c(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(i.Provider,{value:n},e.children)}},39108:function(e){e.exports=JSON.parse('{"permalink":"/story/migrate-aliyun-cdn-to-cf","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2022/2022-10-07-migrate-aliyun-cdn-to-cf.md","source":"@site/../story/2022/2022-10-07-migrate-aliyun-cdn-to-cf.md","title":"\u8FC1\u79FB\u963F\u91CC\u4E91 CDN \u5230 Cloudflare","description":"\u6BCF\u6708\u8282\u7701 30\xa5 \u963F\u91CC\u4E91\u5168\u7AD9 CDN \u6D41\u91CF\u8D39\u7528\u3002","date":"2022-10-07T00:00:00.000Z","tags":[{"inline":true,"label":"DevOps","permalink":"/story/tags/dev-ops"},{"inline":true,"label":"Aliyun","permalink":"/story/tags/aliyun"}],"readingTime":2.245,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"migrate-aliyun-cdn-to-cf","title":"\u8FC1\u79FB\u963F\u91CC\u4E91 CDN \u5230 Cloudflare","tags":["DevOps","Aliyun"]},"unlisted":false,"prevItem":{"title":"\u6062\u590D\u7FA4\u6656\u6570\u636E\u76D8","permalink":"/story/recover-synology"},"nextItem":{"title":"CRM \u5B9E\u73B0\u7ECF\u5386","permalink":"/story/crm-trails"}}')}}]);