"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["52196"],{34240:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>o,default:()=>u,assets:()=>l,toc:()=>c,frontMatter:()=>d});var t=JSON.parse('{"id":"service/bi/cubejs/cubejs-model","title":"Modeling","description":"| name             | for                          |","source":"@site/../notes/service/bi/cubejs/cubejs-model.md","sourceDirName":"service/bi/cubejs","slug":"/service/bi/cubejs/model","permalink":"/notes/service/bi/cubejs/model","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/bi/cubejs/cubejs-model.md","tags":[{"inline":true,"label":"Model","permalink":"/notes/tags/model"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731847972000,"frontMatter":{"tags":["Model"]},"sidebar":"docs","previous":{"title":"CubeJS Frontend","permalink":"/notes/service/bi/cubejs/frontend"},"next":{"title":"CubeJS Schema","permalink":"/notes/service/bi/cubejs/schema"}}'),s=r("52676"),i=r("79938");let d={tags:["Model"]},o="Modeling",l={},c=[];function a(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"modeling",children:"Modeling"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"name"}),(0,s.jsx)(n.th,{children:"for"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"cube"}),(0,s.jsx)(n.td,{children:"table"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"view"}),(0,s.jsx)(n.td,{children:"query"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"measure"}),(0,s.jsx)(n.td,{children:"aggregation over column"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"dimension"}),(0,s.jsx)(n.td,{children:"attribute of measure, column"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"join"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"segment"}),(0,s.jsx)(n.td,{children:"filter"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"pre-aggregations"}),(0,s.jsx)(n.td,{})]})]})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://cube.dev/docs/reference/data-model/cube",children:"https://cube.dev/docs/reference/data-model/cube"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://cube.dev/docs/product/apis-integrations/rest-api/query-format",children:"https://cube.dev/docs/product/apis-integrations/rest-api/query-format"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface Query {\n  measures: (Member | MemberExpression | ParsedMemberExpression)[];\n  dimensions?: (Member | TimeMember | MemberExpression | ParsedMemberExpression)[];\n  filters?: (QueryFilter | LogicalAndFilter | LogicalOrFilter)[];\n  timeDimensions?: QueryTimeDimension[];\n  segments?: (Member | MemberExpression | ParsedMemberExpression)[];\n  limit?: null | number;\n  offset?: number;\n  total?: boolean;\n  totalQuery?: boolean;\n  order?: any;\n  timezone?: string;\n  renewQuery?: boolean;\n  ungrouped?: boolean;\n  responseFormat?: ResultType;\n}\n\n/**\n * Normalized filter interface.\n */\ninterface NormalizedQueryFilter extends QueryFilter {\n  dimension?: Member;\n}\n\n/**\n * Normalized query interface.\n */\ninterface NormalizedQuery extends Query {\n  filters?: NormalizedQueryFilter[];\n  rowLimit?: null | number;\n  order?: { id: string; desc: boolean }[];\n}\n"})})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return o},a:function(){return d}});var t=r(75271);let s={},i=t.createContext(s);function d(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);