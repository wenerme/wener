"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["55951"],{50660:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>i,default:()=>d,assets:()=>c,toc:()=>a,frontMatter:()=>o});var r=JSON.parse('{"id":"queue/nats/nats-protocol","title":"NATS Protocol","description":"- Client Protocol","source":"@site/../notes/queue/nats/nats-protocol.md","sourceDirName":"queue/nats","slug":"/queue/nats/protocol","permalink":"/notes/queue/nats/protocol","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/queue/nats/nats-protocol.md","tags":[{"inline":true,"label":"Protocol","permalink":"/notes/tags/protocol"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"tags":["Protocol"]},"sidebar":"docs","previous":{"title":"Objectstore","permalink":"/notes/queue/nats/objectstore"},"next":{"title":"nats-server","permalink":"/notes/queue/nats/server"}}'),s=t("52676"),l=t("79938");let o={tags:["Protocol"]},i="NATS Protocol",c={},a=[{value:"Request-Reply",id:"request-reply",level:2},{value:"RPC vs Request-Reply",id:"rpc-vs-request-reply",level:2}];function u(e){let n={a:"a",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ul:"ul",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"nats-protocol",children:"NATS Protocol"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.nats.io/reference/reference-protocols/nats-protocol",children:"Client Protocol"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"request-reply",children:"Request-Reply"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Service API ",(0,s.jsx)(n.a,{href:"https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-32.md",children:"ADR-32"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://docs.nats.io/nats-concepts/core-nats/reqreply",children:"https://docs.nats.io/nats-concepts/core-nats/reqreply"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Reply subjects are called "inbox".'}),"\n",(0,s.jsx)(n.li,{children:"drain before exiting - \u5E94\u7528\u9000\u51FA\u524D\u4F1A\u5904\u7406\u6240\u6709\u6D88\u606F"}),"\n",(0,s.jsx)(n.li,{children:"\u6CA1\u6709\u6D88\u8D39\u8005\u8FD4\u56DE no_responders"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"rpc-vs-request-reply",children:"RPC vs Request-Reply"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Request-Reply\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u53EA\u662F\u4E00\u79CD\u6D88\u606F\u4F20\u9012 pattern"}),"\n",(0,s.jsx)(n.li,{children:"\u5BF9\u8BF7\u6C42\u5185\u5BB9\u65E0\u5B9A\u4E49"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["RPC\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u662F\u4E00\u79CD Request-Reply"}),"\n",(0,s.jsx)(n.li,{children:"\u5BF9\u8BF7\u6C42\u5185\u5BB9\u6709\u5B9A\u4E49"}),"\n",(0,s.jsx)(n.li,{children:"\u6709 \u670D\u52A1\u3001\u65B9\u6CD5\u3001\u53C2\u6570\u3001\u8FD4\u56DE\u503C \u7B49\u6982\u5FF5"}),"\n",(0,s.jsx)(n.li,{children:"\u9700\u8981\u8003\u8651\u8DE8\u8BED\u8A00 \u5E8F\u5217\u5316"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/nats-rpc/nrpc",children:"nats-rpc/nrpc"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return o}});var r=t(75271);let s={},l=r.createContext(s);function o(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);