"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["75251"],{7993:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>i,default:()=>h,assets:()=>l,toc:()=>a,frontMatter:()=>d});var r=JSON.parse('{"id":"devops/web/httpd","title":"Apache HTTPD","description":"- /var/www/localhost/htdocs/index.html","source":"@site/../notes/devops/web/httpd.md","sourceDirName":"devops/web","slug":"/devops/web/httpd","permalink":"/notes/devops/web/httpd","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/web/httpd.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1682315301000,"frontMatter":{"title":"Apache HTTPD"},"sidebar":"docs","previous":{"title":"HAProxy Version","permalink":"/notes/devops/web/haproxy/version"},"next":{"title":"Kong","permalink":"/notes/devops/web/kong/"}}'),o=n("52676"),s=n("79938");let d={title:"Apache HTTPD"},i="Apache HTTPD",l={},a=[];function c(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"apache-httpd",children:"Apache HTTPD"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:"httpd -S           # -t -D DUMP_VHOSTS -D DUMP_RUN_CFG\nhttpd -M           # -t -D DUMP_MODULES\nhttpd -X           # debug, \u524D\u53F0\u8FD0\u884C\nhttpd -DFOREGROUND # \u524D\u53F0\u8FD0\u884C\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:'ServerRoot: "/var/www"\nMain DocumentRoot: "/var/www/localhost/htdocs"\nMain ErrorLog: "/var/www/logs/error.log"\n'})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["/var/www/localhost/htdocs/index.html\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"It works!"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(t.li,{children:"DUMP_INCLUDES"}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://github.com/docker-library/httpd/blob/master/2.4/httpd-foreground",children:"https://github.com/docker-library/httpd/blob/master/2.4/httpd-foreground"})}),"\n"]})]})}function h(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return i},a:function(){return d}});var r=n(75271);let o={},s=r.createContext(o);function d(e){let t=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:d(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);