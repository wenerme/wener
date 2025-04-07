"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["89671"],{68493:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>u,assets:()=>d,toc:()=>a,frontMatter:()=>i});var r=JSON.parse('{"id":"service/forge/rundeck","title":"Rundeck","description":"- https://docs.rundeck.com/3.0.9/manual/getting-started.html","source":"@site/../notes/service/forge/rundeck.md","sourceDirName":"service/forge","slug":"/service/forge/rundeck","permalink":"/notes/service/forge/rundeck","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/rundeck.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1676862087000,"frontMatter":{"title":"Rundeck"},"sidebar":"docs","previous":{"title":"Awesome Repository","permalink":"/notes/service/forge/repository-awesome"},"next":{"title":"Verdaccio","permalink":"/notes/service/forge/verdaccio"}}'),s=t("52676"),c=t("79938");let i={title:"Rundeck"},o="Rundeck",d={},a=[];function l(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"rundeck",children:"Rundeck"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.rundeck.com/3.0.9/manual/getting-started.html",children:"https://docs.rundeck.com/3.0.9/manual/getting-started.html"})}),"\n",(0,s.jsx)(n.li,{children:"admin:admin"}),"\n",(0,s.jsx)(n.li,{children:"RUNDECK_DATABASE_URL"}),"\n",(0,s.jsx)(n.li,{children:"RUNDECK_DATABASE_USERNAME"}),"\n",(0,s.jsx)(n.li,{children:"RUNDECK_DATABASE_PASSWORD"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# -v /home/protip/.ssh:/home/rundeck/.ssh\ndocker run --rm -it --name some-rundeck -p 4440:4440 -v $PWD/data:/home/rundeck/server/data rundeck/rundeck:3.0.9\n"})})]})}function u(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return i}});var r=t(75271);let s={},c=r.createContext(s);function i(e){let n=r.useContext(c);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);