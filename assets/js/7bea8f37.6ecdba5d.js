"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["55775"],{29363:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>i});var t=JSON.parse('{"id":"db/document/ferretdb","title":"FerretDB","description":"- FerretDB/FerretDB","source":"@site/../notes/db/document/ferretdb.md","sourceDirName":"db/document","slug":"/db/document/ferretdb","permalink":"/notes/db/document/ferretdb","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/document/ferretdb.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1694402622000,"frontMatter":{"title":"FerretDB"},"sidebar":"docs","previous":{"title":"DynamoDB","permalink":"/notes/db/document/dynamodb"},"next":{"title":"MongoDB","permalink":"/notes/db/document/mongo"}}'),d=r("52676"),s=r("79938");let i={title:"FerretDB"},l="FerretDB",c={},o=[{value:"Model",id:"model",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"ferretdb",children:"FerretDB"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.a,{href:"https://github.com/FerretDB/FerretDB",children:"FerretDB/FerretDB"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n",(0,d.jsx)(n.li,{children:"Open Source MongoDB alternative"}),"\n",(0,d.jsx)(n.li,{children:"\u540E\u7AEF\u5B58\u50A8: SQLite, MongoDB"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://docs.ferretdb.io/reference/supported-commands/",children:"Supported commands"})}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.a,{href:"https://docs.ferretdb.io/diff/",children:"Known differences"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\u4E0D\u80FD\u5904\u7406 ",(0,d.jsx)(n.code,{children:"\\0"})]}),"\n",(0,d.jsx)(n.li,{children:"\u4E0D\u652F\u6301\u5D4C\u5957\u6570\u7EC4"}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"-0"})," -> ",(0,d.jsx)(n.code,{children:"0"})]}),"\n",(0,d.jsxs)(n.li,{children:["Key \u4E0D\u80FD\u5305\u542B ",(0,d.jsx)(n.code,{children:"."})]}),"\n",(0,d.jsxs)(n.li,{children:["Key \u4E0D\u80FD\u4EE5 ",(0,d.jsx)(n.code,{children:"$"})," \u5F00\u5934"]}),"\n",(0,d.jsx)(n.li,{children:"Value \u4E0D\u652F\u6301 Infinity, -Infinity, NaN"}),"\n",(0,d.jsx)(n.li,{children:"insert \u4E0D\u80FD\u5305\u542B\u91CD\u590D Key"}),"\n",(0,d.jsxs)(n.li,{children:["\u4FDD\u7559\u524D\u7F00 ",(0,d.jsx)(n.code,{children:"_ferretdb_"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["MongoDB -> PostgreSQL\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"databases -> schemas"}),"\n",(0,d.jsx)(n.li,{children:"collections -> tables"}),"\n",(0,d.jsx)(n.li,{children:"documents -> rows JSONB"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\u5BA2\u6237\u7AEF\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"authMechanism=PLAIN"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"# PostgreSQL backend\n# docker run -d --rm --name ferretdb -p 27017:27017 ghcr.io/ferretdb/all-in-one\n\n# PostgreSQL\n# FERRETDB_POSTGRESQL_URL \u53EF\u4EE5\u6CA1\u6709\u8D26\u53F7\u5BC6\u7801\uFF0C mongo \u94FE\u63A5\u65F6\u63D0\u4F9B\ndocker run -it --rm \\\n  -p 27017:27017 \\\n  -e FERRETDB_TELEMETRY=disable \\\n  -e DO_NOT_TRACK=true \\\n  -e FERRETDB_POSTGRESQL_URL=postgres://postgres:5432/ferretdb \\\n  --name ferretdb ghcr.io/ferretdb/ferretdb\n\n# mongodb://username:password@127.0.0.1/ferretdb?authMechanism=PLAIN\n\n# SQLite\ndocker run -it --rm \\\n  -p 27017:27017 \\\n  -v $PWD/data:/data/ \\\n  -e FERRETDB_TELEMETRY=disable \\\n  -e DO_NOT_TRACK=true \\\n  -e FERRETDB_HANDLER=sqlite \\\n  -e FERRETDB_SQLITE_URL=file:/data/ \\\n  --name ferretdb ghcr.io/ferretdb/all-in-one\n"})}),"\n",(0,d.jsx)(n.h2,{id:"model",children:"Model"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"_ferretdb_database_metadata"})}),"\n",(0,d.jsxs)(n.li,{children:["collection -> ",(0,d.jsx)(n.code,{children:"COLLECTION_HASH"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"_json"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return i}});var t=r(75271);let d={},s=t.createContext(d);function i(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);