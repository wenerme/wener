"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["94882"],{48808:function(n,e,l){l.r(e),l.d(e,{metadata:()=>r,contentTitle:()=>t,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>c});var r=JSON.parse('{"id":"service/api/graphql/urql","title":"URQL","description":"- FormidableLabs/urql","source":"@site/../notes/service/api/graphql/urql.md","sourceDirName":"service/api/graphql","slug":"/service/api/graphql/urql","permalink":"/notes/service/api/graphql/urql","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/graphql/urql.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1716536381000,"frontMatter":{"title":"URQL"},"sidebar":"docs","previous":{"title":"TypeGraphQL","permalink":"/notes/service/api/graphql/type-graphql"},"next":{"title":"gRPC","permalink":"/notes/service/api/grpc/"}}'),s=l("52676"),i=l("79938");let c={title:"URQL"},t="urql",d={},a=[{value:"Note",id:"note",level:2},{value:"@urql/exchange-graphcache",id:"urqlexchange-graphcache",level:2},{value:"relayPagination",id:"relaypagination",level:3},{value:"URQL v4",id:"urql-v4",level:2},{value:"URQL vs Apollo",id:"urql-vs-apollo",level:2},{value:"production \u6784\u5EFA\u540E urql \u8FD4\u56DE null",id:"production-\u6784\u5EFA\u540E-urql-\u8FD4\u56DE-null",level:2},{value:"Cannot update a component while rendering a different component",id:"cannot-update-a-component-while-rendering-a-different-component",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"urql",children:"urql"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/FormidableLabs/urql",children:"FormidableLabs/urql"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u6D41\u5904\u7406\u5B9E\u73B0\u57FA\u4E8E ",(0,s.jsx)(e.a,{href:"https://github.com/kitten/wonka",children:"kitten/wonka"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u4F18\u52BF\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u6CDB\u5316\u7F13\u5B58"}),"\n",(0,s.jsxs)(e.li,{children:["Schema \u611F\u77E5\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5F00\u542F\u540E\u652F\u6301\u90E8\u5206\u7ED3\u679C\u8FD4\u56DE - \u8BF7\u6C42\u7684\u5B57\u6BB5\u672A\u88AB\u7F13\u5B58\u4F46\u662F\u662F nullable \u5219\u5148\u8FD4\u56DE - \u56E0\u4E3A\u4E0D\u5F71\u54CD\u8BED\u4E49"}),"\n",(0,s.jsx)(e.li,{children:"\u9875\u9762\u5207\u6362\u6570\u636E\u663E\u793A\u66F4\u987A\u7545"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"stale \u67E5\u8BE2 - @urql/exchange-request-policy"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u591A\u6846\u67B6 - @urlql/core, urql -> react-urql, preact, next, vue, svelte"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["RFC: Fragment Suspense boundaries in React bindings ",(0,s.jsx)(e.a,{href:"https://github.com/urql-graphql/urql/issues/1408",children:"#1408"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.admonition,{type:"caution",children:(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["useQuery \u7684 context \u786E\u4FDD\u4E0D\u8981\u53D8 - useMemo\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5426\u5219\u4F1A\u5BFC\u81F4\u91CD\u65B0\u8BF7\u6C42 - \u53EF\u80FD\u65E0\u9650\u5FAA\u73AF\u6E32\u67D3"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u9ED8\u8BA4\u5168\u5C40 opt-in Suspense\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"createClient \u5F00\u542F suspense \u5219\u9ED8\u8BA4\u8BA4\u4E3A\u5728\u670D\u52A1\u7AEF - \u6240\u6709\u67E5\u8BE2\u5F00\u542F suspense"}),"\n",(0,s.jsx)(e.li,{children:"useURQL \u7684 context \u53EF\u63A7\u5236\u5173\u95ED suspense"}),"\n",(0,s.jsx)(e.li,{children:"\u5BF9\u4E8E\u53EA\u5E0C\u671B\u5355\u6B21\u67E5\u8BE2 suspense \u53EA\u80FD\u5C01\u88C5\u73B0\u6709\u63A5\u53E3"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/urql-graphql/urql/discussions/2235",children:"#2235"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u81EA\u5B9A\u4E49 scalar \u5904\u7406\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/clentfort/urql-custom-scalars-exchange",children:"clentfort/urql-custom-scalars-exchange"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["v4 deps PR ",(0,s.jsx)(e.a,{href:"https://github.com/clentfort/urql-custom-scalars-exchange/pull/27",children:"https://github.com/clentfort/urql-custom-scalars-exchange/pull/27"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 batch ",(0,s.jsx)(e.a,{href:"https://github.com/urql-graphql/urql/issues/800",children:"#800"})]}),"\n"]})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"npm add urql @urql/{core,devtools,exchange-graphcache,exchange-retry,exchange-multipart-fetch}\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",metastring:'title="\u6839\u636E\u540E\u7AEF\u5B9E\u73B0\u9009\u62E9"',children:"import { SubscriptionClient } from 'subscriptions-transport-ws';\nimport { createClient as createSubscriptionClient } from 'graphql-ws';\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"type ExchangeIO = (Source<Operation>) => Source<OperationResult>;\ntype Exchange = ExchangeInput => ExchangeIO;\n"})}),"\n",(0,s.jsx)(e.h2,{id:"note",children:"Note"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u9ED8\u8BA4\u6709 Document Caching - \u9002\u7528\u4E8E\u9AD8\u5EA6\u4F9D\u8D56\u9759\u6001\u6570\u636E\u7684\u7AD9\u70B9\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u7F13\u5B58 key \u4E3A ",(0,s.jsx)(e.code,{children:"hash(query,variables)"})]}),"\n",(0,s.jsx)(e.li,{children:"\u6839\u636E mutation \u8FD4\u56DE\u7C7B\u578B\u8FDB\u884C\u5931\u6548"}),"\n",(0,s.jsxs)(e.li,{children:["\u5982\u679C\u8FD4\u56DE\u7A7A list, \u5219\u4E0D\u4F1A\u5305\u542B ",(0,s.jsx)(e.code,{children:"__typename"}),", \u6B64\u65F6\u65E0\u6CD5\u5931\u6548 - \u53EF\u5728\u4E0A\u4E0B\u6587\u6DFB\u52A0 additionalTypenames"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["exchange - \u6269\u5C55\u70B9 - \u9ED8\u8BA4 dedupExchange, cacheExchange, fetchExchange\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u7C7B\u4F3C apollo \u7684 link - \u4F46\u66F4\u901A\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"\u8BF7\u6C42\u7B56\u7565"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"RequestPolicy"}),(0,s.jsx)(e.th,{children:"Desc"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"cache-first"}),(0,s.jsx)(e.td,{children:"\u9ED8\u8BA4 \u9ED8\u8BA4\u8FD4\u56DE cache \u7ED3\u679C\uFF0C\u4E0D\u5B58\u5728\u5219\u8BF7\u6C42"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"cache-and-network"}),(0,s.jsx)(e.td,{children:"\u5148\u8FD4\u56DE cache \u7ED3\u679C\uFF0C\u4E5F\u8BF7\u6C42\u66F4\u65B0"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"network-only"}),(0,s.jsx)(e.td,{children:"\u5FFD\u7565\u7F13\u5B58\uFF0C\u76F4\u63A5\u53D1\u8D77\u8BF7\u6C42"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"cache-only"}),(0,s.jsx)(e.td,{children:"\u8FD4\u56DE\u7F13\u5B58\u6216\u8005 null"})]})]})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"exchanges"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"exchange"}),(0,s.jsx)(e.th,{children:"desc"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-graphcache"}),(0,s.jsx)(e.td,{children:"\u63D0\u4F9B\u6CDB\u5316\u56FE\u7F13\u5B58"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-retry"}),(0,s.jsx)(e.td,{children:"\u91CD\u8BD5\u5931\u8D25\u8BF7\u6C42"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-execute"}),(0,s.jsx)(e.td,{children:"\u672C\u5730\u6A21\u62DF\u6267\u884C\uFF0C\u7528\u4E8E\u6D4B\u8BD5\u6216\u670D\u52A1\u7AEF"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-multipart-fetch"}),(0,s.jsx)(e.td,{children:"\u6587\u4EF6\u4E0A\u4F20"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-persisted-fetch"}),(0,s.jsx)(e.td,{children:"\u57FA\u4E8E hash \u67E5\u8BE2\uFF0C\u907F\u514D\u53D1\u9001 query"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-request-policy"}),(0,s.jsx)(e.td,{children:"\u7F13\u5B58\u5931\u6548\u548C\u66F4\u65B0\uFF0C\u5C06 cache-first \u548C cache-only \u4E0A\u5347\u4E3A cache-and-network"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-auth"}),(0,s.jsx)(e.td,{children:"\u8BF7\u6C42\u6DFB\u52A0\u6388\u6743\u4FE1\u606F\uFF0C\u4F8B\u5982 JWT"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"@urql/exchange-refocus"}),(0,s.jsx)(e.td,{children:"\u7A97\u53E3\u83B7\u53D6\u7126\u70B9\u65F6\u91CD\u65B0\u53D1\u8D77\u8BF7\u6C42"})]})]})]}),"\n",(0,s.jsx)(e.h2,{id:"urqlexchange-graphcache",children:"@urql/exchange-graphcache"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Normalized Caching - \u6CDB\u5316\u7F13\u5B58\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u7F13\u5B58 key \u4E3A ",(0,s.jsx)(e.code,{children:"__typename:id"})]}),"\n",(0,s.jsx)(e.li,{children:"\u4F1A\u7F13\u5B58\u5B57\u6BB5\u548C\u5173\u7CFB"}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u6839\u636E\u7C7B\u578B\u81EA\u5B9A\u4E49\u7F13\u5B58 key"}),"\n",(0,s.jsx)(e.li,{children:"\u65E0 key \u7684\u7ED3\u6784\u4F5C\u4E3A\u5D4C\u5165\u6570\u636E\u4F9D\u9644\u5728\u4E0A\u7EA7\u6587\u6863"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Local Resolver - \u672C\u5730\u89E3\u6790\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u63D0\u4F9B resolvers \u76F4\u63A5\u5728\u5BA2\u6237\u7AEF\u5904\u7406\u8BF7\u6C42"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"cache.readQuery({ query: Todos, variables: { from: 0, limit: 10 } });\n\n// readFragment \u53EA\u652F\u6301 DocumentNodes\ncache.readFragment(\n  gql`\n    fragment _ on Todo {\n      id\n      text\n    }\n  `,\n  { id: 1 },\n);\n\n// \u68C0\u6D4B\u6240\u6709\u5B57\u6BB5\ncache.inspectFields({\n  __typename: 'Todo',\n  id: args.id,\n});\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"// \u57FA\u4E8E offset \u548C limit \u5206\u9875\nimport { simplePagination } from '@urql/exchange-graphcache/extras';\n//\nimport { relayPagination } from '@urql/exchange-graphcache/extras';\n\ncacheExchange({\n  keys: {\n    // \u81EA\u5B9A\u4E49 key\n    Item: (data) => data.uuid,\n    // \u663E\u6027\u79FB\u9664 key\n    Image: () => null,\n  },\n  // \u672C\u5730 resolve\n  // \u9002\u7528\u4E8E\u8F6C\u6362\u5B57\u6BB5\u7C7B\u578B\uFF0C\u6A21\u4EFF\u670D\u52A1\u7AEF\u8BF7\u6C42\uFF0C\u51CF\u5C11\u5B9E\u9645\u8BF7\u6C42\n  resolvers: {\n    // \u7C7B\u578B\n    Query: {\n      // \u96C6\u6210\u5206\u9875\u80FD\u529B\n      // mergeMode=inwards\n      todos: relayPagination(),\n\n      // { todo(id: 1) { id } } \u8BFB\u53D6 { todos { id } } \u7684\u7F13\u5B58\n      todo(parent, args, cache, info) {\n        // \u7B49\u540C\u4E8E\u8FD4\u56DE\u7F13\u5B58 key\n        // cache.keyOfEntity({ __typename: 'Todo', id: args.id }),\n        return { __typename: 'Todo', id: args.id };\n      },\n    },\n    Todo: {\n      // \u8F6C\u6362\u5B57\u6BB5\u7C7B\u578B\n      updatedAt: (parent, args, cache, info) => {\n        // \u4E5F\u53EF\u4EE5\u8BBF\u95EE\u5F53\u524D\u5BF9\u8C61\u4E0A\u6570\u636E - cache.resolve(info.parentKey)\n        // parent.updatedAt || cache.resolve(parent, \"createdAt\")\n        // new Date(cache.resolve(parent, \"updatedAt\")),\n        return new Date(parent[info.fieldName]);\n      },\n    },\n  },\n    // \u624B\u52A8\u66F4\u65B0\n  updates: {\n    Mutation: {\n      // add \u8FC7\u540E\u5C06\u8FD4\u56DE\u7ED3\u679C\u6DFB\u52A0\u5230 \u67E5\u8BE2\u5217\u8868\n      addTodo(result, args, cache, info) {\n        const query = gql`\n          {\n            todos {\n              id\n            }\n          }\n        `;\n        cache.updateQuery({ query }, (data) => {\n          data.todos.push(result.addTodo);\n          return data;\n        });\n      },\n\n      // \u79FB\u9664 todo \u540E\u66F4\u65B0\u53D7\u5F71\u54CD\u7684 list \u67E5\u8BE2\n      removeTodo(_result, args, cache, _info) {\n        const TodoList = gql`\n          query (skip: $skip) {\n            todos(skip: $skip) { id }\n          }\n        `;\n\n        const fields = cache.inspectFields('Query')\n          .filter(field => field.fieldName === 'todos')\n          .forEach(field => {\n            cache.updateQuery(\n              {\n                query: TodoList,\n                variables: { skip: field.arguments.skip },\n              },\n              data => {\n                data.todos = data.todos.filter(todo => todo.id !== args.id);\n                return data;\n              }\n            });\n          });\n      },\n    },\n  },\n  // \u4E50\u89C2\u66F4\u65B0 - \u6A21\u4EFF\u670D\u52A1\u7AEF\u66F4\u65B0\u884C\u4E3A\n  // \u5F53\u670D\u52A1\u7AEF\u8FD4\u56DE\u540E\u66F4\u65B0\u4F1A\u4E22\u5F03\n  optimistic: {\n    favoriteTodo: (variables, cache, info) => ({\n      __typename: 'Todo',\n      id: variables.id,\n      favorite: true,\n    }),\n  },\n});\n"})}),"\n",(0,s.jsx)(e.h3,{id:"relaypagination",children:"relayPagination"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Resolver"}),"\n",(0,s.jsxs)(e.li,{children:["\u57FA\u4E8E relay \u7684 connection \u8FDB\u884C\u5206\u9875\u6570\u636E\u5408\u5E76\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 first+last"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 before, after"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["mergeMode - \u5408\u5E76\u6A21\u5F0F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"inwards - \u9ED8\u8BA4 - \u5F80\u540E\u5408\u5E76"}),"\n",(0,s.jsx)(e.li,{children:"outwards - \u5F80\u524D\u5408\u5E76"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"\u53C2\u6570\u53D8\u5316\u4F1A\u91CD\u7F6E - \u5FFD\u7565 first, last, after, before"}),"\n"]}),"\n",(0,s.jsx)(e.h1,{id:"version",children:"Version"}),"\n",(0,s.jsx)(e.h2,{id:"urql-v4",children:"URQL v4"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u6CA1\u6709 defaultExchanges\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E4B\u524D\u4E3A [dedupExchange, cacheExchange, fetchExchange]"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["fetch\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 multipart/mixed, text/event-stream"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.del,{children:"@urql/exchange-multipart-fetch"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5408\u5E76\u5230 core"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.del,{children:"dedupExchange"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u9ED8\u8BA4\u884C\u4E3A"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["core\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E0D\u518D\u4F9D\u8D56 graphql"}),"\n",(0,s.jsxs)(e.li,{children:["bundle \u90E8\u5206 graphql \u5185\u5BB9: parse, print, GraphQLError\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/0no-co/graphql.web",children:"0no-co/graphql.web"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/urql-graphql/urql/issues/3114",children:"urql v4 Major Releases"})}),"\n"]}),"\n",(0,s.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(e.h2,{id:"urql-vs-apollo",children:"URQL vs Apollo"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["URLQ\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u66F4\u5C0F\u66F4\u7075\u6D3B"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u63D0\u4F9B schema \u5B9E\u73B0\u66F4\u591A\u529F\u80FD"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 offline"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 window focus \u89E6\u53D1\u8BF7\u6C42"}),"\n",(0,s.jsx)(e.li,{children:"\u7F13\u5B58\u4E3A\u53EF\u9009\u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://formidable.com/open-source/urql/docs/comparison/",children:"vs Apollo"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"production-\u6784\u5EFA\u540E-urql-\u8FD4\u56DE-null",children:"production \u6784\u5EFA\u540E urql \u8FD4\u56DE null"}),"\n",(0,s.jsx)(e.p,{children:"\u8D77\u56E0\u662F gqlgen \u4E0D\u652F\u6301 fragment \u91CC\u5305\u542B alias\uFF0C\u4E0D\u4F1A\u8FD4\u56DE\u5B57\u6BB5\uFF0Curql \u68C0\u6D4B\u5C11\u5B57\u6BB5\u8BA4\u4E3A cache miss \u8FD4\u56DE null\u3002"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/99designs/gqlgen/issues/1271",children:"99designs/gqlgen#1271"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/FormidableLabs/urql/issues/1557",children:"FormidableLabs/urql#1557"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"cannot-update-a-component-while-rendering-a-different-component",children:"Cannot update a component while rendering a different component"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/FormidableLabs/urql/issues/1382#issuecomment-778112684",children:"https://github.com/FormidableLabs/urql/issues/1382#issuecomment-778112684"})}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(h,{...n})}):h(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return t},a:function(){return c}});var r=l(75271);let s={},i=r.createContext(s);function c(n){let e=r.useContext(i);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);