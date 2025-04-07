"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["40109"],{48295:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>l});var i=JSON.parse('{"id":"web/framework/knex","title":"knex","description":"- knex","source":"@site/../notes/web/framework/knex.md","sourceDirName":"web/framework","slug":"/web/framework/knex","permalink":"/notes/web/framework/knex","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/knex.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731048203000,"frontMatter":{"title":"knex"},"sidebar":"docs","previous":{"title":"Ionic","permalink":"/notes/web/framework/ionic"},"next":{"title":"Kysely","permalink":"/notes/web/framework/kysely"}}'),t=s("52676"),r=s("79938");let l={title:"knex"},a="knex",o={},c=[{value:"raw in",id:"raw-in",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"knex",children:"knex"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/knex/knex",children:"knex"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"composite - \u89E3\u8026\u6784\u5EFA\u6700\u7EC8 query \u7684\u8FC7\u7A0B"}),"\n",(0,t.jsx)(n.li,{children:"\u5BF9\u4E8E\u57FA\u7840\u7684\u8BBF\u95EE\u6A21\u5F0F\u63D0\u4F9B\u8DE8\u5E93\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"knex-types \u57FA\u4E8E db schema \u751F\u6210 ts"}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/notes/web/framework/kysely",children:"kysely"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://michaelavila.com/knex-querylab/",children:"https://michaelavila.com/knex-querylab/"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Knex to SQL"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["pool\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"\u9ED8\u8BA4"})," ",(0,t.jsx)(n.code,{children:"min: 2, max: 10"})]}),"\n",(0,t.jsx)(n.li,{children:"\u63A8\u8350 min 0"}),"\n",(0,t.jsxs)(n.li,{children:["\u4F7F\u7528 ",(0,t.jsx)(n.a,{href:"https://github.com/vincit/tarn.js",children:"vincit/tarn.js"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"const pool = new Pool({\n  // \u6700\u5C0F 2 - \u63A8\u8350 0\n  min: 2,\n\n  // \u6700\u5927 - \u6839\u636E\u573A\u666F\u6027\u80FD\u8981\u6C42\u8C03\u6574\n  max: 10,\n\n  // acquire promises are rejected after this many milliseconds\n  // if a resource cannot be acquired\n  acquireTimeoutMillis: 30000,\n\n  // create operations are cancelled after this many milliseconds\n  // if a resource cannot be acquired\n  createTimeoutMillis: 30000,\n\n  // destroy operations are awaited for at most this many milliseconds\n  // new resources will be created after this timeout\n  destroyTimeoutMillis: 5000,\n\n  // Free resources are destroyed after this many milliseconds.\n  // Note that if min > 0, some resources may be kept alive for longer.\n  // To reliably destroy all idle resources, set min to 0.\n  idleTimeoutMillis: 30000,\n\n  // how often to check for idle resources to destroy\n  reapIntervalMillis: 1000,\n\n  // how long to idle after failed create before trying again\n  createRetryIntervalMillis: 200,\n\n  // If true, when a create fails, the first pending acquire is\n  // rejected with the error. If this is false (the default) then\n  // create is retried until acquireTimeoutMillis milliseconds has\n  // passed.\n  propagateCreateError: false,\n});\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const db = knex({\n  client: 'better-sqlite3',\n  connection: {\n    filename: 'test.sqlite3',\n  },\n  useNullAsDefault: true,\n});\ndb.raw('PRAGMA journal_mode = WAL');\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"raw-in",children:"raw in"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u7528 ",(0,t.jsx)(n.code,{children:"=any(?)"})]}),"\n",(0,t.jsx)(n.li,{children:"pg \u7684 in \u4E0D\u652F\u6301 array"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/knex/knex/issues/2053#issuecomment-300523807",children:"https://github.com/knex/knex/issues/2053#issuecomment-300523807"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/knex/knex/issues/1537#issuecomment-281888969",children:"https://github.com/knex/knex/issues/1537#issuecomment-281888969"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/knex/knex/issues/1537",children:"https://github.com/knex/knex/issues/1537"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return a},a:function(){return l}});var i=s(75271);let t={},r=i.createContext(t);function l(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);