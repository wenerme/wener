"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["33826"],{30114:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>d,assets:()=>l,toc:()=>c,frontMatter:()=>a});var s=JSON.parse('{"id":"db/relational/postgresql/postgresql-debug","title":"PostgreSQL Troubleshooting","description":"","source":"@site/../notes/db/relational/postgresql/postgresql-debug.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/debug","permalink":"/notes/db/relational/postgresql/debug","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/postgresql-debug.md","tags":[{"inline":true,"label":"Diagnosis","permalink":"/notes/tags/diagnosis"},{"inline":true,"label":"Troubleshooting","permalink":"/notes/tags/troubleshooting"},{"inline":true,"label":"Debug","permalink":"/notes/tags/debug"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1686636573000,"frontMatter":{"tags":["Diagnosis","Troubleshooting","Debug"]},"sidebar":"docs","previous":{"title":"DDL","permalink":"/notes/db/relational/postgresql/ddl"},"next":{"title":"PostgreSQL Embeded","permalink":"/notes/db/relational/postgresql/embeded"}}'),r=t("52676"),o=t("79938");let a={tags:["Diagnosis","Troubleshooting","Debug"]},i="PostgreSQL Troubleshooting",l={},c=[];function u(e){let n={code:"code",h1:"h1",header:"header",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"postgresql-troubleshooting",children:"PostgreSQL Troubleshooting"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"-- \u603B\u8FDE\u63A5\u6570\uFF0C\u5DF2\u4F7F\u7528\uFF0Csuper \u9884\u7559\uFF0C\u666E\u901A\u7528\u6237\u53EF\u7528\nselect max_conn, used, res_for_super, max_conn - used - res_for_super res_for_normal\nfrom (select count(*) used from pg_stat_activity) t1,\n     (select setting::int res_for_super from pg_settings where name = $$superuser_reserved_connections$$) t2,\n     (select setting::int max_conn from pg_settings where name = $$max_connections$$) t3\n\n-- \u67E5\u770B\u5F53\u524D\u7684\u6700\u5927\u8FDE\u63A5\u6570\nshow max_connections;\nselect current_setting('max_connections');\nselect *\nfrom pg_settings\nwhere name = 'max_connections';\n\nshow shared_buffers;\n\n-- \u67E5\u770B\u8FDE\u63A5\u6570\u4E3B\u8981\u8C01\u5360\u7528\n-- idle \u591A\u8FD8\u662F active \u591A\nselect state, usename, application_name, datname, count(*)\nfrom pg_stat_activity\ngroup by state, usename, application_name, datname\norder by 1, 2, 3;\n\n-- \u6392\u67E5 active \u8FDE\u63A5\nselect *\nfrom pg_stat_activity\nwhere state = 'active';\n\nALTER SYSTEM SET max_connections TO '150';\nALTER SYSTEM SET shared_buffers TO '256MB';\n\nshow idle_in_transaction_session_timeout;\n\n-- \u5355\u4E2A\u7528\u6237\nalter user username SET idle_in_transaction_session_timeout to 60000;\n-- \u7CFB\u7EDF\nALTER SYSTEM SET idle_in_transaction_session_timeout to 60000; -- 1minute\n\n-- pg_terminate_backend(pid)\nSELECT *\nFROM pg_stat_activity\nWHERE datname = 'centralauth'\n  AND pid <> pg_backend_pid()\n  AND state in ('idle', 'idle in transaction', 'idle in transaction (aborted)', 'disabled')\n  AND state_change < current_timestamp - INTERVAL '15' MINUTE;\n\n-- WAL\nselect name, setting, unit\nfrom pg_settings\nwhere name in (\n               'effective_cache_size',\n               'shared_buffers',\n               'work_mem',\n               'maintenance_work_mem',\n               'wal_buffers'\n    );\n"})})]})}function d(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return a}});var s=t(75271);let r={},o=s.createContext(r);function a(e){let n=s.useContext(o);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);