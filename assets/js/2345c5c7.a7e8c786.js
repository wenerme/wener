"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["94998"],{65010:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>c,default:()=>a,assets:()=>i,toc:()=>d,frontMatter:()=>s});var r=JSON.parse('{"id":"service/file/nextcloud/nextcloud-dev","title":"Nextcloud \u5F00\u53D1","description":"- \u63A5\u53E3\u6587\u6863","source":"@site/../notes/service/file/nextcloud/nextcloud-dev.md","sourceDirName":"service/file/nextcloud","slug":"/service/file/nextcloud/dev","permalink":"/notes/service/file/nextcloud/dev","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/file/nextcloud/nextcloud-dev.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1682624699000,"frontMatter":{"title":"Nextcloud \u5F00\u53D1"},"sidebar":"docs","previous":{"title":"Nextcloud \u914D\u7F6E","permalink":"/notes/service/file/nextcloud/conf"},"next":{"title":"Nextcloud FAQ","permalink":"/notes/service/file/nextcloud/faq"}}'),o=n("52676"),l=n("79938");let s={title:"Nextcloud \u5F00\u53D1"},c="Nextcloud \u5F00\u53D1",i={},d=[{value:"NodeJS",id:"nodejs",level:2}];function u(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"nextcloud-\u5F00\u53D1",children:"Nextcloud \u5F00\u53D1"})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/instruction_set_for_users.html",children:"\u63A5\u53E3\u6587\u6863"})}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"nodejs",children:"NodeJS"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://github.com/hobigo/nextcloud-node-client",children:"hobigo/nextcloud-node-client"})}),"\n"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"import Client, { Server } from 'nextcloud-node-client';\nconst server: Server = new Server({\n  basicAuth: { password: '<your password>', username: '<your user name>' },\n  url: 'https://<your nextcloud host>/remote.php/webdav',\n});\n\nconst client = new Client(server);\n"})})]})}function a(e={}){let{wrapper:t}={...(0,l.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return c},a:function(){return s}});var r=n(75271);let o={},l=r.createContext(o);function s(e){let t=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(l.Provider,{value:t},e.children)}}}]);