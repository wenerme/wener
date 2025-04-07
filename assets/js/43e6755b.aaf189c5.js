"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["70408"],{93636:function(n,e,l){l.r(e),l.d(e,{metadata:()=>i,contentTitle:()=>c,default:()=>o,assets:()=>t,toc:()=>d,frontMatter:()=>h});var i=JSON.parse('{"id":"service/api/graphql/graphql-faq","title":"GraphQL FAQ","description":"- \u9AD8\u7EA7\u7279\u6027","source":"@site/../notes/service/api/graphql/graphql-faq.md","sourceDirName":"service/api/graphql","slug":"/service/api/graphql/faq","permalink":"/notes/service/api/graphql/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/graphql/graphql-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717134008000,"frontMatter":{"title":"GraphQL FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"graphql config","permalink":"/notes/service/api/graphql/config"},"next":{"title":"graphql-mesh","permalink":"/notes/service/api/graphql/mesh"}}'),s=l("52676"),r=l("79938");let h={title:"GraphQL FAQ",tags:["FAQ"]},c="GraphQL FAQ",t={},d=[{value:"Apollo vs Relay vs URQL",id:"apollo-vs-relay-vs-urql",level:2},{value:"Fragment Masking",id:"fragment-masking",level:2}];function a(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"graphql-faq",children:"GraphQL FAQ"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u9AD8\u7EA7\u7279\u6027\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"@defer & @stream"}),"\n",(0,s.jsx)(e.li,{children:"@skip & @include"}),"\n",(0,s.jsx)(e.li,{children:"\u6279\u91CF\u67E5\u8BE2"}),"\n",(0,s.jsx)(e.li,{children:"\u4F7F\u7528 SSE \u4F5C\u4E3A Subscription - \u907F\u514D Websocket"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"#fragment-masking",children:"Fragment Masking"})}),"\n",(0,s.jsx)(e.li,{children:"Client-side schema - Apollo"}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"@client"})," Local only fields - Apollo"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"@export"})," - Apollo"]}),"\n",(0,s.jsx)(e.li,{children:"Local Resolver - URQL"}),"\n",(0,s.jsx)(e.li,{children:"Schema Awareness"}),"\n",(0,s.jsxs)(e.li,{children:["Local Directive - URQL\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"@_optional"}),"\n",(0,s.jsx)(e.li,{children:"@_required"}),"\n",(0,s.jsx)(e.li,{children:"\u81EA\u5B9A\u4E49"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Normalized Caching"}),"\n",(0,s.jsx)(e.li,{children:"Document Caching"}),"\n",(0,s.jsx)(e.li,{children:"Persisted Queries"}),"\n",(0,s.jsx)(e.li,{children:"File Uploads"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u670D\u52A1\u7AEF \u5E38\u7528\u4F9D\u8D56\npnpm add graphql graphql-scalars @graphql-tools/utils @graphql-tools/schema\n"})}),"\n",(0,s.jsx)(e.h2,{id:"apollo-vs-relay-vs-urql",children:"Apollo vs Relay vs URQL"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/FormidableLabs/urql",children:"URQL"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"~15kB"}),"\n",(0,s.jsxs)(e.li,{children:["\u2705\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u79BB\u7EBF - \u672C\u5730 resolve\u3001\u672C\u5730\u6570\u636E\u7F13\u5B58"}),"\n",(0,s.jsx)(e.li,{children:"Focus Refetching"}),"\n",(0,s.jsx)(e.li,{children:"@urql/exchange-multipart-fetch \u652F\u6301\u6587\u4EF6\u4E0A\u4F20"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\uD83D\uDD36\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4F7F\u7528\u4EBA\u6570\u5C11 - \u793E\u533A\u5C0F"}),"\n",(0,s.jsxs)(e.li,{children:["suspense ",(0,s.jsx)(e.strong,{children:"\u5168\u5C40 opt-in"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\uD83D\uDFE1\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4F7F\u7528 wonka \u505A\u6D41\u5904\u7406 - \u5185\u90E8\u5F02\u5E38\u8C03\u8BD5\u5F88\u9EBB\u70E6"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\uD83D\uDED1\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E0D\u80FD\u5728 cacheExchange \u4E4B\u5916\u64CD\u4F5C\u7F13\u5B58"}),"\n",(0,s.jsx)(e.li,{children:"\u4E0D\u652F\u6301\u672C\u5730\u72B6\u6001\u7BA1\u7406"}),"\n",(0,s.jsx)(e.li,{children:"\u4E0D\u652F\u6301 Batched Queries"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/facebook/relay",children:"Relay"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"~35kB"}),"\n",(0,s.jsx)(e.li,{children:"\u5BF9 Schema \u6709\u8981\u6C42"}),"\n",(0,s.jsxs)(e.li,{children:["\u2705\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Schema \u89C4\u8303"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u5206\u9875"}),"\n",(0,s.jsx)(e.li,{children:"Defer & Stream"}),"\n",(0,s.jsx)(e.li,{children:"Live Queries"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\uD83D\uDED1\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E0D\u80FD\u672C\u5730 Resolve"}),"\n",(0,s.jsx)(e.li,{children:"\u4E0D\u652F\u6301\u8FD4\u56DE\u90E8\u5206\u7ED3\u679C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/apollographql/apollo-client",children:"Apollo"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"~60kB"}),"\n",(0,s.jsxs)(e.li,{children:["\u2705\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 batch"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["urql ",(0,s.jsx)(e.a,{href:"https://formidable.com/open-source/urql/docs/comparison/",children:"vs Apollo vs Relay"})]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://blog.logrocket.com/why-i-finally-switched-to-urql-from-apollo-client/",children:"Why I (finally) switched to urql from Apollo Client"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Symbol"}),(0,s.jsx)(e.th,{children:"Desc"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"\u2705"}),(0,s.jsx)(e.td,{children:"Good at"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"\uD83D\uDD36"}),(0,s.jsx)(e.td,{children:"Not Good Enough"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"\uD83D\uDFE1"}),(0,s.jsx)(e.td,{children:"Bad at"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"\uD83D\uDED1"}),(0,s.jsx)(e.td,{children:"Sorry for"})]})]})]}),"\n",(0,s.jsx)(e.h2,{id:"fragment-masking",children:"Fragment Masking"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u5173\u952E\u70B9\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u901A\u8FC7GraphQL\u7247\u6BB5\u63CF\u8FF0\u7EC4\u4EF6\u6570\u636E\u9700\u6C42"}),"\n",(0,s.jsx)(e.li,{children:"\u4F7F\u7528\u7247\u6BB5\u9650\u5236\u6570\u636E\u8BBF\u95EE"}),"\n",(0,s.jsx)(e.li,{children:"\u4E3AUI\u7EC4\u4EF6\u7EC4\u5408\u7247\u6BB5"}),"\n",(0,s.jsx)(e.li,{children:"\u4E3A\u60A8\u7684\u9876\u7EA7\u8DEF\u7531\u6216\u89C6\u56FE\u7EC4\u5408\u7247\u6BB5\u7EC4\u4EF6"}),"\n",(0,s.jsx)(e.li,{children:"\u5C06\u6240\u6709\u67E5\u8BE2\u7247\u6BB5\u7EC4\u5408\u6210\u5355\u4E2A\u67E5\u8BE2\u64CD\u4F5C"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5B9E\u8DF5\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u7ED3\u6784/Fragment \u548C \u64CD\u4F5C/Query/Mutation \u5728\u4E00\u8D77 - \u66F4\u6613\u4E8E\u7EF4\u62A4"}),"\n",(0,s.jsx)(e.li,{children:"\u907F\u514D\u5168\u5C40\u5355\u4E00 Fragment - \u4E0D\u540C\u573A\u666F\u9700\u8981\u7684\u5185\u5BB9\u4E0D\u4E00\u6837\uFF0C\u5229\u7528 GraphQL \u7684\u9009\u62E9\u7279\u6027"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u6CE8\u610F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["RFC: Fragment Suspense boundaries in React bindings ",(0,s.jsx)(e.a,{href:"https://github.com/urql-graphql/urql/issues/1408",children:"#1408"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"URQL \u4E0D\u652F\u6301 Suspense Fragment - \u81EA\u52A8\u63D0\u4F9B\u8FD4\u56DE\u672A\u67E5\u8BE2\u7684\u5B57\u6BB5"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#embrace-fragment-masking-principles",children:"https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#embrace-fragment-masking-principles"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen",children:"https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen"})}),"\n"]}),"\n"]}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return c},a:function(){return h}});var i=l(75271);let s={},r=i.createContext(s);function h(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:h(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);