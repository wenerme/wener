"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["28623"],{80207:function(n,e,i){i.r(e),i.d(e,{metadata:()=>r,contentTitle:()=>a,default:()=>h,assets:()=>d,toc:()=>c,frontMatter:()=>t});var r=JSON.parse('{"id":"web/framework/prisma","title":"Prisma","description":"- prisma/prisma","source":"@site/../notes/web/framework/prisma.md","sourceDirName":"web/framework","slug":"/web/framework/prisma","permalink":"/notes/web/framework/prisma","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/prisma.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1710413103000,"frontMatter":{"title":"Prisma"},"sidebar":"docs","previous":{"title":"NodeGUI","permalink":"/notes/web/framework/nodegui"},"next":{"title":"Prisma","permalink":"/notes/web/framework/prisma1"}}'),s=i("52676"),l=i("79938");let t={title:"Prisma"},a="Prisma",d={},c=[{value:"Notes",id:"notes",level:2}];function o(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"prisma",children:"Prisma"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/prisma/prisma",children:"prisma/prisma"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Apache-2.0, TS"}),"\n",(0,s.jsx)(e.li,{children:"PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, CockroachDB"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u95EE\u9898\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 yarn2 PnP ",(0,s.jsx)(e.a,{href:"https://github.com/prisma/prisma/issues/1439",children:"#1439"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u4FEE\u6539\u8F93\u51FA\u8DEF\u5F84\u4E3A ",(0,s.jsx)(e.code,{children:"../src/generated/prisma"}),"\uFF0C\u8C03\u6574 PrismaClient \u7684\u5F15\u5165\u8DEF\u5F84\u53EF\u4EE5\u4F7F\u7528"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/prisma/studio",children:"prisma/studio"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u95ED\u6E90"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://playground.prisma.io/",children:"https://playground.prisma.io/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"npm install prisma --save-dev\n# postgresql, mysql, sqlite, sqlserver, mongodb, cockroachdb\nnpx prisma init --datasource-provider postgresql\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u914D\u7F6E\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:".env"}),"\n",(0,s.jsx)(e.li,{children:".env.test"}),"\n",(0,s.jsx)(e.li,{children:".env.development"}),"\n",(0,s.jsx)(e.li,{children:".env.production - \u4E0D\u63A8\u8350"}),"\n",(0,s.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 .env.local\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/prisma/prisma/issues/3865#issuecomment-767665090",children:"#3865"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/prisma/prisma/issues/15681",children:"#15681"})}),"\n",(0,s.jsxs)(e.li,{children:["\u4FEE\u6539 script \u53EF\u4EE5\u7528 ",(0,s.jsx)(e.code,{children:"dotenv-flow -- npx prisma migrate deploy --preview-feature"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"DATABASE_URL"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'yarn add @prisma/cli --dev\nyarn add @prisma/client\n\nmkdir prisma\ncat << EOF > ./prisma/schema.prisma\ndatasource db {\n  provider = "sqlite"\n  url      = "file:./dev.db"\n}\n\ngenerator client {\n  provider      = "prisma-client-js"\n  // \u9ED8\u8BA4\u4F4D\u7F6E\n  output        = "node_modules/@prisma/client"\n  binaryTargets = ["native"]\n}\n\nmodel User {\n  id        Int      @default(autoincrement()) @id\n  createdAt DateTime @default(now())\n  email     String   @unique\n  name      String\n  // role      Role     @default(USER)\n  // posts     Post[]\n  // profile   Profile?\n}\n\nmodel Setting {\n  id        String      @default(uuid()) @id\n  key       String      @unique\n  value     Json\n}\nEOF\n\nyarn prisma generate\n'})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"npx prisma db pull\n\nnpx prisma migrate resolve --applied 0_init\n\nnpm install @prisma/client\n\nnpx prisma generate\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-hcl",children:'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n'})}),"\n",(0,s.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Query Engine - Rust \u5B9E\u73B0\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4F5C\u4E3A sidecard \u6216\u8005 n-api \u4F7F\u7528"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u67B6\u6784\u4E0D\u540C\u4E8E Prisma1 - \u5BA2\u6237\u7AEF -> \u67E5\u8BE2\u5F15\u64CE -> \u6570\u636E\u5E93\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6CA1\u6709\u989D\u5916\u7684\u670D\u52A1 - \u5185\u5D4C"}),"\n",(0,s.jsx)(e.li,{children:"cli \u96C6\u6210 db \u8FC1\u79FB\u80FD\u529B"}),"\n",(0,s.jsx)(e.li,{children:"\u5BF9\u4E0D\u540C\u7EC4\u4EF6\u8FDB\u884C\u62C6\u5206"}),"\n",(0,s.jsx)(e.li,{children:"Photon - \u751F\u6210 ORM \u4EE3\u7801"}),"\n",(0,s.jsx)(e.li,{children:"Life - \u6A21\u578B\u5B9A\u4E49\u548C\u8FC1\u79FB"}),"\n",(0,s.jsx)(e.li,{children:"Studio - \u7BA1\u7406\u754C\u9762"}),"\n",(0,s.jsx)(e.li,{children:"GrahQL \u80FD\u529B"}),"\n",(0,s.jsxs)(e.li,{children:["\u90E8\u5206\u6838\u5FC3\u80FD\u529B\u4F7F\u7528 RUST \u91CD\u5199 - \u4E4B\u524D\u4E3A Scala\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u56E0\u4E3A\u8003\u8651\u53EF\u80FD\u591A\u8BED\u8A00"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return a},a:function(){return t}});var r=i(75271);let s={},l=r.createContext(s);function t(n){let e=r.useContext(l);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:t(n.components),r.createElement(l.Provider,{value:e},n.children)}}}]);