"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["8406"],{60308:function(n,e,i){i.r(e),i.d(e,{metadata:()=>r,contentTitle:()=>c,default:()=>d,assets:()=>a,toc:()=>o,frontMatter:()=>l});var r=JSON.parse('{"id":"service/im/im-faq","title":"IM FAQ","description":"- https://docs.nats.io/nats-concepts/overview/compare-nats","source":"@site/../notes/service/im/im-faq.md","sourceDirName":"service/im","slug":"/service/im/faq","permalink":"/notes/service/im/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/im/im-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1709694572000,"frontMatter":{"tags":["FAQ"]},"sidebar":"docs","previous":{"title":"IM Awesome","permalink":"/notes/service/im/awesome"},"next":{"title":"IRC","permalink":"/notes/service/im/irc/"}}'),s=i("52676"),t=i("79938");let l={tags:["FAQ"]},c="IM FAQ",a={},o=[{value:"fan-in vs fan-out",id:"fan-in-vs-fan-out",level:2}];function u(n){let e={a:"a",h1:"h1",h2:"h2",header:"header",li:"li",mermaid:"mermaid",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"im-faq",children:"IM FAQ"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://docs.nats.io/nats-concepts/overview/compare-nats",children:"https://docs.nats.io/nats-concepts/overview/compare-nats"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"fan-in-vs-fan-out",children:"fan-in vs fan-out"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["fan in\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"N Producer -> 1 Broker"}),"\n",(0,s.jsx)(e.li,{children:"\u591A\u4E2A\u53D1\u9001\u8005\u5411\u4E00\u4E2A\u63A5\u6536\u8005\u53D1\u9001\u6D88\u606F"}),"\n",(0,s.jsx)(e.li,{children:"\u5BF9\u6027\u80FD\u5F71\u54CD\u8F83\u5C0F\uFF0C\u4F46\u9700\u8981\u786E\u4FDD\u670D\u52A1\u7AEF\u80FD\u591F\u6709\u6548\u5904\u7406\u5E76\u53D1\u8FDE\u63A5\u548C\u6570\u636E\u7684\u6C47\u603B\u3002"}),"\n",(0,s.jsx)(e.li,{children:"\u786E\u4FDD\u670D\u52A1\u5668\u80FD\u591F\u5904\u7406\u9AD8\u5E76\u53D1\u8BF7\u6C42\u5E76\u5728\u51FA\u73B0\u6545\u969C\u65F6\u5FEB\u901F\u6062\u590D"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["fan out\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"1 Broker -> N Consumer"}),"\n",(0,s.jsx)(e.li,{children:"\u4E00\u4E2A\u53D1\u9001\u8005\u5411\u591A\u4E2A\u63A5\u6536\u8005\u53D1\u9001\u6D88\u606F"}),"\n",(0,s.jsx)(e.li,{children:"\u5927\u89C4\u6A21\u804A\u5929\u5E94\u7528\u4E2D\u53EF\u80FD\u4F1A\u9047\u5230\u6027\u80FD\u74F6\u9888\uFF0C\u7279\u522B\u662F\u5728\u5B9E\u65F6\u5E7F\u64AD\u5927\u91CF\u6D88\u606F\u65F6\u3002"}),"\n",(0,s.jsx)(e.li,{children:"\u4F7F\u7528 \u6D88\u606F\u961F\u5217\u3001\u53D1\u5E03/\u8BA2\u9605\u6A21\u5F0F \u6765\u7F13\u51B2\u6D88\u606F\u5E76\u5F02\u6B65\u5206\u53D1"}),"\n",(0,s.jsx)(e.li,{children:"\u9700\u8981\u8BBE\u8BA1\u9AD8\u53EF\u7528\u7684\u6D88\u606F\u5206\u53D1\u7CFB\u7EDF\uFF0C\u907F\u514D\u5355\u70B9\u6545\u969C\u5BFC\u81F4\u7684\u6D88\u606F\u4E22\u5931\u3002"}),"\n",(0,s.jsx)(e.li,{children:"one-to-many"}),"\n",(0,s.jsx)(e.li,{children:"PubSub"}),"\n",(0,s.jsx)(e.li,{children:"PushPull"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["fan out write\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"1 Broker -> N Consumer"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["fan out read\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"1 Consumer -> N Broker"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.mermaid,{value:"flowchart LR\n    PA & PB & PC --\x3e Subject\n    Subject --\x3e SA & SB & SC\n    PA[Publisher]\n    PB[Publisher]\n    PC[Publisher]\n    SA[Subscriber]\n    SB[Subscriber]\n    SC[Subscriber]"}),"\n",(0,s.jsx)(e.mermaid,{value:"flowchart LR\n    GA & CA & GB --\x3e UA\n    GA & CA & CB --\x3e UB\n    GA[Group]\n    GB[Group]\n    CA[Chat]\n    CB[Chat]\n    UA[User]\n    UB[User]"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E00\u4E2A\u4F1A\u8BDD\u4E00\u4E2A\u961F\u5217 - \u72EC\u7ACB\u5355\u4E00"}),"\n",(0,s.jsx)(e.li,{children:"\u591A\u6D88\u8D39"}),"\n",(0,s.jsx)(e.li,{children:"\u8BA2\u9605\u65F6\u5408\u5E76 - \u903B\u8F91\u590D\u6742"}),"\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u53EF\u63A7\u6027\u9AD8"}),"\n"]}),"\n",(0,s.jsx)(e.mermaid,{value:"flowchart LR\n    GA & CA & GB --\x3e QA[Queue] --\x3e UA\n    GA & CA & CB --\x3e QB[Queue] --\x3e UB\n    GA[Group]\n    GB[Group]\n    CA[Chat]\n    CB[Chat]\n    UA[User]\n    UB[User]"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u670D\u52A1\u5668\u591A\u5B58\u3001\u591A\u5904\u7406"}),"\n",(0,s.jsx)(e.li,{children:"\u5355\u4E00\u6D88\u8D39"}),"\n",(0,s.jsx)(e.li,{children:"\u6743\u9650\u597D\u63A7\u5236"}),"\n",(0,s.jsx)(e.li,{children:"\u53D8\u52A8\u5C0F - \u53EF\u63A7\u6027\u4F4E"}),"\n"]})]})}function d(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(u,{...n})}):u(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return l}});var r=i(75271);let s={},t=r.createContext(s);function l(n){let e=r.useContext(t);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:l(n.components),r.createElement(t.Provider,{value:e},n.children)}}}]);