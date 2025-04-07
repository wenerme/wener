"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["72428"],{13584:function(e,t,n){n.r(t),n.d(t,{metadata:()=>o,contentTitle:()=>i,default:()=>g,assets:()=>s,toc:()=>c,frontMatter:()=>l});var o=JSON.parse('{"id":"os/linux/admin/logrotate","title":"logrotate","description":"- logrotate/logrotate","source":"@site/../notes/os/linux/admin/logrotate.md","sourceDirName":"os/linux/admin","slug":"/os/linux/admin/logrotate","permalink":"/notes/os/linux/admin/logrotate","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/admin/logrotate.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1690946986000,"frontMatter":{"title":"logrotate"},"sidebar":"docs","previous":{"title":"Logging","permalink":"/notes/os/linux/admin/log"},"next":{"title":"man","permalink":"/notes/os/linux/admin/man"}}'),r=n("52676"),a=n("79938");let l={title:"logrotate"},i="logrotate",s={},c=[{value:"\u914D\u7F6E",id:"\u914D\u7F6E",level:2}];function d(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"logrotate",children:"logrotate"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/logrotate/logrotate",children:"logrotate/logrotate"})}),"\n",(0,r.jsx)(t.li,{children:"/etc/logrotate.conf"}),"\n",(0,r.jsx)(t.li,{children:"/etc/logrotate.d/"}),"\n",(0,r.jsx)(t.li,{children:"\u901A\u8FC7 cron \u6267\u884C"}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"# \u914D\u7F6E /etc/logrotate.conf\n# \u4EFB\u52A1 /etc/periodic/daily/logrotate\napk add logrotate\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ini",metastring:'title="logrotate.conf"',children:"include /etc/logrotate.d\n"})}),"\n",(0,r.jsx)(t.h2,{id:"\u914D\u7F6E",children:"\u914D\u7F6E"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\u53C2\u8003 ",(0,r.jsx)(t.a,{href:"https://pkgs.alpinelinux.org/contents?file=&path=%2Fetc%2Flogrotate.d&name=&branch=edge&arch=x86_64",children:"/etc/logrotate.d"})]}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-conf",children:"/var/log/apache2/* {\n    weekly\n    rotate 3\n    size 10M\n    compress\n    delaycompress\n}\n\n/var/log/squid/access.log {\n    monthly\n    create 0644 root root\n    rotate 5\n    size=1M\n    dateext\n    dateformat -%d%m%Y\n    notifempty\n    # mail gabriel@mydomain.com\n}\n\n/var/log/k3s.log {\n        missingok\n        notifempty\n        sharedscripts\n        postrotate\n                /etc/init.d/k3s --quiet --ifstarted restart || true\n        endscript\n}\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"# -d debug - \u4E0D\u4F1A\u6267\u884C\nlogrotate -d /etc/logrotate.d/apache2.conf\n# -v verbose - \u4F1A\u6267\u884C\nlogrotate -v /etc/logrotate.d/apache2.conf\n"})})]})}function g(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return i},a:function(){return l}});var o=n(75271);let r={},a=o.createContext(r);function l(e){let t=o.useContext(a);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);