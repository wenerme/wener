"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["7551"],{91415:function(e,n,t){t.r(n),t.d(n,{metadata:()=>l,contentTitle:()=>o,default:()=>p,assets:()=>a,toc:()=>c,frontMatter:()=>s});var l=JSON.parse('{"id":"db/relational/postgresql/postgresql-replication","title":"PostgreSQL Replicate","description":"- PostgreSQL Replication and Automatic Failover Tutorial","source":"@site/../notes/db/relational/postgresql/postgresql-replication.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/replication","permalink":"/notes/db/relational/postgresql/replication","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/postgresql-replication.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1655510210000,"frontMatter":{"title":"PostgreSQL Replicate"},"sidebar":"docs","previous":{"title":"PostgreSQL \u94FE\u63A5\u6C60","permalink":"/notes/db/relational/postgresql/pool"},"next":{"title":"Postgresql Scale","permalink":"/notes/db/relational/postgresql/scale"}}'),i=t("52676"),r=t("79938");let s={title:"PostgreSQL Replicate"},o="PostgreSQL Replication",a={},c=[{value:"Logical Replication",id:"logical-replication",level:2},{value:"Streaming Replication",id:"streaming-replication",level:2},{value:"Backup",id:"backup",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"postgresql-replication",children:"PostgreSQL Replication"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.enterprisedb.com/postgres-tutorials/postgresql-replication-and-automatic-failover-tutorial",children:"PostgreSQL Replication and Automatic Failover Tutorial"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"logical-replication",children:"Logical Replication"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u903B\u8F91\u590D\u5236 - v10+"}),"\n",(0,i.jsx)(n.li,{children:"SQL \u8BED\u53E5\u7EF4\u5EA6"}),"\n",(0,i.jsx)(n.li,{children:"PUBLICATION/SUBSCRIPTION"}),"\n",(0,i.jsx)(n.li,{children:"\u7B80\u5355\u6613\u7528\u3001\u5185\u7F6E"}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.postgresql.org/docs/current/logicaldecoding.html",children:"Logical Decoding"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B9E\u73B0\u7684\u5185\u90E8\u903B\u8F91"}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u81EA\u884C\u5BF9\u63A5\u534F\u8BAE\uFF0C\u7136\u540E\u5B9E\u73B0\u4FEE\u6539 SQL \u7684\u80FD\u529B"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{title:"\u9650\u5236",type:"caution",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E0D\u80FD\u590D\u5236 DDL - schema \u4FEE\u6539"}),"\n",(0,i.jsx)(n.li,{children:"sequences \u4E0D\u4F1A\u88AB\u590D\u5236"}),"\n",(0,i.jsx)(n.li,{children:"\u8981\u6C42\u552F\u4E00\u4E3B\u952E - \u590D\u5236\u4E3B\u952E - \u6CA1\u6709\u5219\u4F7F\u7528\u6574\u884C\u5BF9\u6BD4\uFF08\u4E0D\u5EFA\u8BAE\uFF09 - REPLICA IDENTITY"}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0D\u80FD\u4FEE\u6539\u590D\u5236\u5185\u5BB9\u8DEF\u5F84\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Schema \u540D\u5B57\u3001\u5217\u540D \u5FC5\u987B\u4E00\u81F4"}),"\n",(0,i.jsx)(n.li,{children:"\u5206\u7247\u8868\u540D\u5B57\u5FC5\u987B\u4E00\u81F4"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u652F\u6301 Large Object"}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ALTER SUBSCRIPTION mysub DISABLE;\nALTER SUBSCRIPTION mysub ENABLE;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"streaming-replication",children:"Streaming Replication"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION",children:"https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"backup",children:"Backup"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.postgresql.org/docs/current/backup.html",children:"https://www.postgresql.org/docs/current/backup.html"})}),"\n"]})]})}function p(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return s}});var l=t(75271);let i={},r=l.createContext(i);function s(e){let n=l.useContext(r);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);