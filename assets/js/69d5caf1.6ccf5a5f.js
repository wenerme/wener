"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["70917"],{43125:function(e,n,o){o.r(n),o.d(n,{metadata:()=>t,contentTitle:()=>i,default:()=>u,assets:()=>a,toc:()=>d,frontMatter:()=>s});var t=JSON.parse('{"id":"service/collaboration/nocodb","title":"nocodb","description":"- nocodb/nocodb","source":"@site/../notes/service/collaboration/nocodb.md","sourceDirName":"service/collaboration","slug":"/service/collaboration/nocodb","permalink":"/notes/service/collaboration/nocodb","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/collaboration/nocodb.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1685296509000,"frontMatter":{"title":"nocodb"},"sidebar":"docs","previous":{"title":"Collaboration Awesome","permalink":"/notes/service/collaboration/awesome"},"next":{"title":"\u7535\u5546","permalink":"/notes/service/commerce/"}}'),r=o("52676"),c=o("79938");let s={title:"nocodb"},i="nocodb",a={},d=[];function l(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"nocodb",children:"nocodb"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/nocodb/nocodb",children:"nocodb/nocodb"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"AGPLv3, Typescript+Vue"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Group By ",(0,r.jsx)(n.a,{href:"https://github.com/nocodb/nocodb/issues/188",children:"#188"})]}),"\n",(0,r.jsxs)(n.li,{children:["Kanban ",(0,r.jsx)(n.a,{href:"https://github.com/nocodb/nocodb/issues/140",children:"#140"})]}),"\n"]})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'docker run -it --rm \\\n  -v $PWD/data:/usr/app/data/ \\\n  --name nocodb -p 8080:8080 nocodb/nocodb:latest\n\nNC_AUTH_JWT_SECRET=$(uuidgen)\n# for PostgreSQL\ndocker run -d --name nocodb-postgres \\\n  -v $PWD/data:/usr/app/data/ \\\n  -e NC_DB="pg://host.docker.internal:5432?u=root&p=password&d=d1" \\\n  -e NC_AUTH_JWT_SECRET=$NC_AUTH_JWT_SECRET \\\n  -p 8080:8080 \\\n  nocodb/nocodb:latest\n'})})]})}function u(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},79938:function(e,n,o){o.d(n,{Z:function(){return i},a:function(){return s}});var t=o(75271);let r={},c=t.createContext(r);function s(e){let n=t.useContext(c);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);