"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["77026"],{35774:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>a,default:()=>u,assets:()=>c,toc:()=>m,frontMatter:()=>o});var r=JSON.parse('{"id":"java/spring/spring-metrics","title":"metrics","description":"- /actuator/prometheus","source":"@site/../notes/java/spring/spring-metrics.md","sourceDirName":"java/spring","slug":"/java/spring/metrics","permalink":"/notes/java/spring/metrics","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/spring/spring-metrics.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1709694572000,"frontMatter":{"title":"metrics"},"sidebar":"docs","previous":{"title":"Spring FAQ","permalink":"/notes/java/spring/faq"},"next":{"title":"Spring Security OAuth2","permalink":"/notes/java/spring/security-oauth2"}}'),s=n("52676"),i=n("79938");let o={title:"metrics"},a="metrics",c={},m=[];function l(e){let t={code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"metrics",children:"metrics"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"/actuator/prometheus"}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"# -Xms \u7533\u8BF7\u5185\u5B58\njvm_memory_committed_bytes\n# -Xmx \u6700\u5927\u5185\u5B58\njvm_memory_max_bytes\n# \u5B9E\u9645\u4F7F\u7528\u7684\u5185\u5B58\n# area: heap, nonheap\njvm_memory_used_bytes\n# NIO Direct Memory\njvm_buffer_memory_used_bytes\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"jvm_memory_max_bytes > container_memory_working_set_bytes > jvm_memory_committed_bytes > jvm_memory_used_bytes\n"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"container_memory_working_set_bytes - \u5BB9\u5668\u5185\u5B58\u4F7F\u7528"}),"\n"]})]})}function u(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return o}});var r=n(75271);let s={},i=r.createContext(s);function o(e){let t=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);