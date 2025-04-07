"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["76635"],{52562:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>u,assets:()=>d,toc:()=>o,frontMatter:()=>i});var r=JSON.parse('{"id":"db/olap/greenplum","title":"Greenplum","description":"- \u9879\u76EE\u95ED\u6E90","source":"@site/../notes/db/olap/greenplum.md","sourceDirName":"db/olap","slug":"/db/olap/greenplum","permalink":"/notes/db/olap/greenplum","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/olap/greenplum.md","tags":[{"inline":true,"label":"Legacy","permalink":"/notes/tags/legacy"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725936322000,"frontMatter":{"title":"Greenplum","tags":["Legacy"]},"sidebar":"docs","previous":{"title":"OLAP","permalink":"/notes/db/olap/"},"next":{"title":"\u5173\u7CFB\u578B\u6570\u636E\u5E93","permalink":"/notes/db/relational/"}}'),l=t("52676"),s=t("79938");let i={title:"Greenplum",tags:["Legacy"]},a="Greenplum",d={},o=[{value:"\u7248\u672C",id:"\u7248\u672C",level:2}];function c(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"greenplum",children:"Greenplum"})}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u9879\u76EE\u95ED\u6E90\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["-> ",(0,l.jsx)(n.a,{href:"https://github.com/cloudberrydb/cloudberrydb",children:"https://github.com/cloudberrydb/cloudberrydb"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"fork Greenplum DB 7, PostgreSQL 14.4"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"GPDB"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"http://hawq.incubator.apache.org/",children:"HAWQ"})," \u662F Hadoop \u751F\u6001\u5708\u91CC\u7684 GP"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/greenplum-db/gpdb-postgres-merge",children:"https://github.com/greenplum-db/gpdb-postgres-merge"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://gpdb.docs.pivotal.io/6-6/admin_guide/ddl/ddl-storage.html",children:"Choosing the Table Storage Model"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"apt update\napt install ca-certificates\n\ncp sources.list /etc/apt/sources.list\napt install $PWD/greenplum-db-6.0.0-beta.7-ubuntu18.04-amd64.deb -f -y\napt install python -y\n\nexport GPHOME=/usr/local/greenplum-db\nexport PATH=$GPHOME/bin/:$PATH\n\nsource $GPHOME/greenplum_path.sh\nMASTER_DATA_DIRECTORY=$PWD/data gpstart\n"})}),"\n",(0,l.jsx)(n.h2,{id:"\u7248\u672C",children:"\u7248\u672C"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["6.0\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"PostgreSQL 9.3"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["5.0 - 2017\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"PostgreSQL 8.2"}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return i}});var r=t(75271);let l={},s=r.createContext(l);function i(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);