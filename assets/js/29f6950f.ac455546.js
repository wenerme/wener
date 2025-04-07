"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["32363"],{95769:function(n,e,r){r.r(e),r.d(e,{metadata:()=>t,contentTitle:()=>d,default:()=>x,assets:()=>c,toc:()=>h,frontMatter:()=>i});var t=JSON.parse('{"id":"db/relational/postgresql/postgresql-trigger","title":"Trigger","description":"- trigger \u51FD\u6570\u4E0D\u80FD\u5B9A\u4E49\u53C2\u6570\uFF0C\u901A\u8FC7 TG_ARGV \u63A5\u6536\u53C2\u6570","source":"@site/../notes/db/relational/postgresql/postgresql-trigger.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/trigger","permalink":"/notes/db/relational/postgresql/trigger","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/postgresql-trigger.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693122196000,"frontMatter":{"title":"Trigger"},"sidebar":"docs","previous":{"title":"PostgreSQL Tenant","permalink":"/notes/db/relational/postgresql/tenant"},"next":{"title":"PostgreSQL Upgrade","permalink":"/notes/db/relational/postgresql/upgrade"}}'),s=r("52676"),l=r("79938");let i={title:"Trigger"},d="Trigger",c={},h=[];function o(n){let e={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"trigger",children:"Trigger"})}),"\n",(0,s.jsx)(e.admonition,{type:"tip",children:(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"trigger \u51FD\u6570\u4E0D\u80FD\u5B9A\u4E49\u53C2\u6570\uFF0C\u901A\u8FC7 TG_ARGV \u63A5\u6536\u53C2\u6570"}),"\n"]})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"var"}),(0,s.jsx)(e.th,{children:"for"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"NEW"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"OLD"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_NAME"}),(0,s.jsx)(e.td,{children:"trigger name"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_WHEN"}),(0,s.jsx)(e.td,{children:"BEFORE/AFTER/INSTEAD OF"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_LEVEL"}),(0,s.jsx)(e.td,{children:"ROW/STATEMENT"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_OP"}),(0,s.jsx)(e.td,{children:"INSERT/UPDATE/DELETE/TRUNCATE"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_RELID"}),(0,s.jsx)(e.td,{children:"oid of table"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.del,{children:"TG_RELNAME"})}),(0,s.jsx)(e.td,{children:"name of table"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_TABLE_NAME"}),(0,s.jsx)(e.td,{children:"name of table"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_TABLE_SCHEMA"}),(0,s.jsx)(e.td,{children:"schema of table"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_NARGS"}),(0,s.jsx)(e.td,{children:"number of arguments"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_ARGV"}),(0,s.jsx)(e.td,{children:"arguments"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_EVENT"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TG_TAG"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u8FD4\u56DE\u7C7B\u578B ",(0,s.jsx)(e.code,{children:"trigger"})," - \u6570\u636E\u53D8\u5316"]}),"\n",(0,s.jsxs)(e.li,{children:["\u8FD4\u56DE\u7C7B\u578B ",(0,s.jsx)(e.code,{children:"event_trigger"})," - \u6570\u636E\u5E93\u4E8B\u4EF6"]}),"\n",(0,s.jsxs)(e.li,{children:["\u81EA\u52A8\u521B\u5EFA\u53D8\u91CF ",(0,s.jsx)(e.code,{children:"TG_<NAME>"})]}),"\n",(0,s.jsxs)(e.li,{children:["\u8FD4\u56DE ",(0,s.jsx)(e.code,{children:"NULL"})," \u6216 record/row"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"BEFORE"})," row\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u8FD4\u56DE ",(0,s.jsx)(e.code,{children:"NULL"})," \u5219\u4E0D\u4F1A\u89E6\u53D1\u5B9E\u9645\u64CD\u4F5C - INSERT/UPDATE/DELETE"]}),"\n",(0,s.jsx)(e.li,{children:"\u4FEE\u6539 NEW \u8FD4\u56DE\u4F1A\u4F7F\u7528\u65B0\u7684\u503C"}),"\n",(0,s.jsxs)(e.li,{children:["DELETE \u8FD4\u56DE\u5185\u5BB9\u65E0\u610F\u4E49\uFF0C\u4F46\u9700\u8981 \u975E NULL\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6B64\u65F6 NEW \u4E3A NULL\uFF0C\u4E00\u822C\u8FD4\u56DE OLD"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"INSTEAD OF"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u53EA\u80FD\u662F row \u7EA7\u522B\uFF0C\u53EA\u652F\u6301 view"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"event_trigger"})," - DDL \u4E8B\u4EF6\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"TG_EVENT, TG_TAG"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"ALTER|CREATE|DROP|COMMENT|GRANT|REVOKE|IMPORT FOREIGN SCHEMA|REFRESH MATERIALIZED VIEW"})}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"SECURITY LABEL"}),", ",(0,s.jsx)(e.code,{children:"SELECT INTO"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/plpgsql-trigger.html",children:"https://www.postgresql.org/docs/current/plpgsql-trigger.html"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/event-trigger-matrix.html",children:"https://www.postgresql.org/docs/current/event-trigger-matrix.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sql",children:"create or replace function insert_entity_sid() returns trigger as\n$$\nbegin\n    if NEW.sid is null then\n        NEW.sid := next_entity_sid(TG_ARGV[0], NEW.tid);\n    end if;\n    return new;\nend;\n$$ language plpgsql;\n"})})]})}function x(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return d},a:function(){return i}});var t=r(75271);let s={},l=t.createContext(s);function i(n){let e=t.useContext(l);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),t.createElement(l.Provider,{value:e},n.children)}}}]);