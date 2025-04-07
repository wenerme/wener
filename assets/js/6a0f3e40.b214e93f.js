"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["14617"],{89399:function(n,e,l){l.r(e),l.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>o,assets:()=>t,toc:()=>E,frontMatter:()=>c});var s=JSON.parse('{"id":"db/relational/postgresql/postgresql-plpgsql","title":"PL/pgSQL","description":"- plpgsql","source":"@site/../notes/db/relational/postgresql/postgresql-plpgsql.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/plpgsql","permalink":"/notes/db/relational/postgresql/plpgsql","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/postgresql-plpgsql.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693133627000,"frontMatter":{"title":"PL/pgSQL"},"sidebar":"docs","previous":{"title":"PostgreSQL Plan","permalink":"/notes/db/relational/postgresql/plan"},"next":{"title":"PostgreSQL \u94FE\u63A5\u6C60","permalink":"/notes/db/relational/postgresql/pool"}}'),i=l("52676"),r=l("79938");let c={title:"PL/pgSQL"},d="PL/pgSQL",t={},E=[];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"plpgsql",children:"PL/pgSQL"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/plpgsql.html",children:"plpgsql"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/plpgsql-declarations.html",children:"declarations"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"%TYPE"}),"\n",(0,i.jsx)(e.li,{children:"%ROWTYPE"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["raise\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"DEBUG, LOG, INFO, NOTICE, WARNING, EXCEPTION"}),"\n",(0,i.jsx)(e.li,{children:"\u9ED8\u8BA4 EXCEPTION"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.admonition,{type:"caution",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5C3D\u91CF\u907F\u514D EXCEPTION - \u8FC7\u591A\u5F71\u54CD\u6027\u80FD"}),"\n"]})}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u4E0D\u60F3\u8981\u7ED3\u679C\u4F7F\u7528 PERFORM"}),"\n",(0,i.jsxs)(e.li,{children:["\u5185\u90E8\u903B\u8F91\u5BF9\u6BD4\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"IF expression THEN ..."})," -> ",(0,i.jsx)(e.code,{children:"SELECT expression"})]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"IF x < y THEN ..."})," -> ",(0,i.jsx)(e.code,{children:"PREPARE statement_name(integer, integer) AS SELECT $1 < $2"})]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u8BED\u53E5\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"SELECT, INSERT, UPDATE, DELETE + INTO"}),"\n",(0,i.jsx)(e.li,{children:"PERFORM - \u6267\u884C\u4E0D\u8FD4\u56DE\u7ED3\u679C\u8BED\u53E5"}),"\n",(0,i.jsx)(e.li,{children:"EXECUTE - \u6267\u884C\u52A8\u6001\u6784\u5EFA\u7684\u8BED\u53E5"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"GET [ CURRENT ] DIAGNOSTICS variable { = | := } item [ , ... ]"}),"\n\u83B7\u53D6\u7ED3\u679C\u72B6\u6001\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"ROW_COUNT"}),"\n",(0,i.jsx)(e.li,{children:"PG_CONTEXT"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"NULL - noop"}),"\n",(0,i.jsx)(e.li,{children:"COMMIT"}),"\n",(0,i.jsx)(e.li,{children:"ROLLBACK"}),"\n",(0,i.jsx)(e.li,{children:"RAISE"}),"\n",(0,i.jsx)(e.li,{children:"ASSERT"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u63A7\u5236\u6D41\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"RETURN"}),"\n",(0,i.jsxs)(e.li,{children:["RETURN NEXT, RETURN QUERY, RETURN QUERY EXECUTE\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5B9A\u4E49\u8FD4\u56DE\u7ED3\u679C\uFF0C\u8FD8\u9700\u8981\u6267\u884C RETURN \u624D\u4F1A\u8FD4\u56DE"}),"\n",(0,i.jsx)(e.li,{children:"\u8FD4\u56DE\u524D\u7ED3\u679C\u4F1A\u5168\u90E8\u5B58\u50A8 - \u56E0\u6B64\u4E0D\u8981\u8FD4\u56DE\u5927\u91CF\u7684\u6570\u636E"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"EXIT [ label ] [ WHEN boolean-expression ]"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8DF3\u51FA BLOCK - \u7C7B\u4F3C break"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"CONTINUE [ label ] [ WHEN boolean-expression ]"})}),"\n",(0,i.jsx)(e.li,{children:"IF/THEN/ELSE/ELSIF/END IF"}),"\n",(0,i.jsx)(e.li,{children:"CASE/WHEN/ELSE/END CASE"}),"\n",(0,i.jsx)(e.li,{children:"LOOP/END LOOP"}),"\n",(0,i.jsx)(e.li,{children:"WHILE/LOOP/END LOOP"}),"\n",(0,i.jsx)(e.li,{children:"FOR/IN/LOOP/END LOOP - \u4FBF\u5229\u7ED3\u679C\u3001\u6570\u5B57"}),"\n",(0,i.jsx)(e.li,{children:"FOREACH/IN ARRYAY/LOOP/END LOOP - \u4FBF\u5229\u6570\u7EC4"}),"\n",(0,i.jsxs)(e.li,{children:["EXCEPTION/WHEN/THEN\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"GET STACKED DIAGNOSTICS variable { = | := } item [ , ... ]"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u83B7\u53D6\u5F02\u5E38\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["cursor\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5B9A\u4E49\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"refcursor"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"CURSOR FOR SELECT * FROM tenk1"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"CURSOR (key integer) FOR SELECT * FROM tenk1 WHERE unique1 = key"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"OPEN/FOR"}),"\n",(0,i.jsx)(e.li,{children:"OPEN/FOR EXECUTE"}),"\n",(0,i.jsx)(e.li,{children:"FETCH/INTO"}),"\n",(0,i.jsx)(e.li,{children:"MOVE - \u7C7B\u4F3C FETCH \u4F46\u4E0D\u8FD4\u56DE\u7ED3\u679C"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"UPDATE table SET ... WHERE CURRENT OF cursor"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8981\u6C42 cursor \u6CA1\u6709 \u805A\u5408"}),"\n",(0,i.jsx)(e.li,{children:"\u5EFA\u8BAE\u6DFB\u52A0 FOR UPDATE"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"DELETE FROM table WHERE CURRENT OF cursor"})}),"\n",(0,i.jsx)(e.li,{children:"CLOSE"}),"\n",(0,i.jsx)(e.li,{children:"FOR/IN/LOOP/END LOOP"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"/notes/db/relational/postgresql/trigger",children:"trigger"})}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",metastring:'title="\u6574\u4F53\u7ED3\u6784"',children:"[ <<label>> ]\n[ DECLARE\n    declarations ]\nBEGIN\n    statements\nEND [ label ];\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",metastring:'title="print_strict_params \u8F85\u52A9\u8C03\u8BD5"',children:"CREATE FUNCTION get_userid(username text) RETURNS int\nAS $$\n#print_strict_params on\nDECLARE\nuserid int;\nBEGIN\n    SELECT users.userid INTO STRICT userid\n        FROM users WHERE users.username = get_userid.username;\n    RETURN userid;\nEND;\n$$ LANGUAGE plpgsql;\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",metastring:'title="FOR \u652F\u6301 REVERSE \u548C BY"',children:"FOR i IN REVERSE 10..1 BY 2 LOOP\n    -- i will take on the values 10,8,6,4,2 within the loop\nEND LOOP;\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u51FD\u6570\u9690\u542B\u6700\u5916\u5C42 block - label \u4E3A\u51FD\u6570\u540D\u5B57\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5305\u542B DIAGNOSTICS \u4FE1\u606F"}),"\n",(0,i.jsxs)(e.li,{children:["\u9690\u542B FOUND \u53D8\u91CF - \u5F53\u8BED\u53E5\u6709\u503C\u65F6\u4F1A\u8BBE\u7F6E\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"SELECT INTO"}),"\n",(0,i.jsx)(e.li,{children:"PERFORM"}),"\n",(0,i.jsx)(e.li,{children:"UPDATE, INSERT, DELETE"}),"\n",(0,i.jsx)(e.li,{children:"FETCH"}),"\n",(0,i.jsx)(e.li,{children:"MOVE"}),"\n",(0,i.jsx)(e.li,{children:"FOR, FOREACH"}),"\n",(0,i.jsx)(e.li,{children:"RETURN QUERY, RETURN QUERY EXECUTE"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",metastring:'title="\u4F7F\u7528\u9690\u542B\u7684 FOUND \u53D8\u91CF"',children:"SELECT * INTO STRICT myrec FROM emp WHERE empname = myname;\nIF NOT FOUND THEN\n    RAISE EXCEPTION 'employee % not found', myname;\nEND IF;\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["select into STRICT \u5355\u4E2A record \u53EF\u80FD\u7684\u5F02\u5E38 code\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"NO_DATA_FOUND"}),"\n",(0,i.jsx)(e.li,{children:"TOO_MANY_ROWS"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"\u6CA1\u6709 STRICT \u76F4\u63A5\u8FD4\u56DE\u7B2C\u4E00\u6761\uFF0C\u6CA1\u6709\u5219\u662F NULL"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"-- strict_multi_assignment\n-- too_many_rows\nSET plpgsql.extra_warnings TO 'shadowed_variables';\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"#variable_conflict error\n#variable_conflict use_variable\n#variable_conflict use_column\n"})})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return d},a:function(){return c}});var s=l(75271);let i={},r=s.createContext(i);function c(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:c(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);