"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["42668"],{92618:function(e,t,n){n.r(t),n.d(t,{metadata:()=>i,contentTitle:()=>m,default:()=>u,assets:()=>c,toc:()=>l,frontMatter:()=>r});var i=JSON.parse('{"id":"service/analytics/umami","title":"umami","description":"- umami-software/umami","source":"@site/../notes/service/analytics/umami.md","sourceDirName":"service/analytics","slug":"/service/analytics/umami","permalink":"/notes/service/analytics/umami","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/analytics/umami.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1705499993000,"frontMatter":{"title":"umami"},"sidebar":"docs","previous":{"title":"Matomo JS","permalink":"/notes/service/analytics/matomo/js"},"next":{"title":"UTM","permalink":"/notes/service/analytics/utm"}}'),s=n("52676"),a=n("79938");let r={title:"umami"},m="umami",c={},l=[];function o(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"umami",children:"umami"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/umami-software/umami",children:"umami-software/umami"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"MIT, Node + PostgreSQL/MySQL/Clickhouse"}),"\n",(0,s.jsx)(t.li,{children:"\u7B26\u5408 GDPR"}),"\n",(0,s.jsxs)(t.li,{children:["\u6570\u636E\u7ED3\u6784 ",(0,s.jsx)(t.a,{href:"https://github.com/umami-software/umami/blob/master/db/postgresql/schema.prisma",children:"https://github.com/umami-software/umami/blob/master/db/postgresql/schema.prisma"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"# admin:admin\n# http://127.0.0.1:3000\ndocker run --rm -it \\\n  -e DATABASE_URL= \\\n  -e DATABASE_TYPE=postgresql \\\n  -e APP_SECRET=$UMANI_APP_SECRET \\\n  -e DISABLE_TELEMETRY=1 \\\n  -e IGNORE_IP=127.0.0.1 \\\n  -p 3000:3000 \\\n  --name umami ghcr.io/umami-software/umami:postgresql-latest\n"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://umami.is/docs/environment-variables",children:"https://umami.is/docs/environment-variables"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://umami.is/docs/api",children:"https://umami.is/docs/api"})}),"\n"]})]})}function u(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return m},a:function(){return r}});var i=n(75271);let s={},a=i.createContext(s);function r(e){let t=i.useContext(a);return i.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function m(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);