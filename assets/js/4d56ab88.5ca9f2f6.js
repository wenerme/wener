"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["10461"],{70101:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>l});var s=JSON.parse('{"id":"devops/web/caddy/caddy-v1","title":"Caddy V1","description":"- mholt/caddy","source":"@site/../notes/devops/web/caddy/caddy-v1.md","sourceDirName":"devops/web/caddy","slug":"/devops/web/caddy/v1","permalink":"/notes/devops/web/caddy/v1","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/web/caddy/caddy-v1.md","tags":[{"inline":true,"label":"Legacy","permalink":"/notes/tags/legacy"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1718079305000,"frontMatter":{"title":"Caddy V1","tags":["Legacy"]},"sidebar":"docs","previous":{"title":"Caddy L4","permalink":"/notes/devops/web/caddy/l4"},"next":{"title":"HAProxy","permalink":"/notes/devops/web/haproxy/"}}'),d=t("52676"),r=t("79938");let l={title:"Caddy V1",tags:["Legacy"]},i="Caddy",o={},c=[{value:"\u6982\u8FF0",id:"\u6982\u8FF0",level:2},{value:"\u4FE1\u53F7\u91CF\u5904\u7406",id:"\u4FE1\u53F7\u91CF\u5904\u7406",level:2},{value:"\u65E5\u5FD7\u914D\u7F6E",id:"\u65E5\u5FD7\u914D\u7F6E",level:2},{value:"Example",id:"example",level:2},{value:"CHANGELOG",id:"changelog",level:2},{value:"0.10.12",id:"01012",level:3},{value:"FAQ",id:"faq",level:2},{value:"\u7981\u7528\u91CD\u5B9A\u5411 http \u5230 https",id:"\u7981\u7528\u91CD\u5B9A\u5411-http-\u5230-https",level:3},{value:"\u5728\u65E5\u5FD7\u6587\u4EF6\u540D\u4E2D\u4F7F\u7528\u5360\u4F4D\u7B26",id:"\u5728\u65E5\u5FD7\u6587\u4EF6\u540D\u4E2D\u4F7F\u7528\u5360\u4F4D\u7B26",level:3}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"caddy",children:"Caddy"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.a,{href:"https://github.com/mholt/caddy",children:"mholt/caddy"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"Apache-2.0, Golang"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"\u6982\u8FF0",children:"\u6982\u8FF0"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.a,{href:"https://github.com/mholt/caddy/issues/1806",children:"#1806"})," - Watch Caddyfile for changes"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'# macOS \u5B89\u88C5\n# \u4E0D\u4F1A\u5B89\u88C5\u63D2\u4EF6\nbrew install caddy\n\n# \u76F4\u63A5\u542F\u52A8, \u4F1A\u4F7F\u7528\u5F53\u524D\u76EE\u5F55\u4E0B\u7684 Caddyfile \u4F5C\u4E3A\u914D\u7F6E\u6587\u4EF6\ncaddy\n# \u67E5\u770B\u5B89\u88C5\u7684\u63D2\u4EF6\ncaddy -plugins\n# \u9A8C\u8BC1\u914D\u7F6E\ncaddy -validate -conf Caddyfile\n\n# Docker \u542F\u52A8\n# \u914D\u7F6E /etc/Caddyfile\n# root /srv\n# cert /root/.caddy \u6216 CADDYPATH\n# \u8BE5\u955C\u50CF\u4E0D\u5305\u542B\u63D2\u4EF6, \u63D2\u4EF6\u9700\u8981\u81EA\u5DF1\u6784\u5EFA\ndocker run --rm -it -v $PWD:/srv -p 2015:2015 abiosoft/caddy\n# \u5305\u542B\u6240\u6709\u63D2\u4EF6\n# \u5176\u4ED6\u6807\u7B7E: latest \u57FA\u4E8E Alpine, php \u6DFB\u52A0\u4E86 PHP \u652F\u6301\ndocker run --rm -it -v $PWD:/srv -p 2015:2015 wener/caddy:full\n# \u9A8C\u8BC1\u914D\u7F6E\ndocker exec web caddy -validate -conf /caddy/Caddyfile\n\n# \u4ECE\u547D\u4EE4\u884C\u76F4\u63A5\u6DFB\u52A0\u914D\u7F6E\ncaddy -port 8080 browse markdown "log access.log"\n# \u91CD\u8F7D\u914D\u7F6E\nkill -USR1 PID\n# \u4F7F\u7528 Docker \u91CD\u8F7D\ndocker kill -s USR1 web\n\n# \u5E38\u7528\u7684\u914D\u7F6E\nmkdir root\ncaddy -conf Caddyfile\n'})}),"\n",(0,d.jsx)(n.h2,{id:"\u4FE1\u53F7\u91CF\u5904\u7406",children:"\u4FE1\u53F7\u91CF\u5904\u7406"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Signal"}),(0,d.jsx)(n.th,{children:"Behavior"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"TERM"}),(0,d.jsx)(n.td,{children:"Forcefully exits the process without executing shutdown hooks."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"INT"}),(0,d.jsx)(n.td,{children:'Forcefully exits the process after executing shutdown hooks. This is the only "signal" that works on Windows (Ctrl+C). A second SIGINT forces immediate termination, even if shutdown hooks are still running.'})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"HUP"}),(0,d.jsx)(n.td,{children:"Gracefully stops the server, but does not execute shutdown hooks."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"QUIT"}),(0,d.jsx)(n.td,{children:"Gracefully stops the server after executing shutdown hooks."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"USR1"}),(0,d.jsx)(n.td,{children:"Reloads the configuration file, then gracefully restarts the server. This spins up a process with a different process ID."})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"\u65E5\u5FD7\u914D\u7F6E",children:"\u65E5\u5FD7\u914D\u7F6E"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\u683C\u5F0F\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"{common}"})," - ",(0,d.jsx)(n.code,{children:'{remote} - {user} [{when}] \\"{method} {uri} {proto}\\" {status} {size}'})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"{combined}"})," - ",(0,d.jsx)(n.code,{children:'{common} \\"{>Referer}\\" \\"{>User-Agent}\\"'})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"log requests.log {\n	rotate_size 50  # Rotate after 50 MB\n	rotate_age  90  # Keep rotated files for 90 days\n	rotate_keep 20  # Keep at most 20 log files\n	rotate_compress # Compress rotated log files in gzip format\n}\n"})}),"\n",(0,d.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:'# \u5185\u90E8\u6587\u4EF6\u6587\u6863\u670D\u52A1\nlocalhost:2016 {\n  gzip\n  log internal/access-2016.log\n  errors visible\n  browse\n  hugo\n  root files\n  bind 127.0.0.1\n  ext .html .htm .md\n}\n\n:80 {\n  # startup echo started > start\n  gzip\n  internal /internal\n  log internal/access-8080.log\n\n  # \u5728 localhost:9180/metrics \u67E5\u770B\n  prometheus\n\n  tls {\n  	max_certs 10\n  }\n\n  # \u6388\u6743\n  basicauth /files wener wener\n  # \u8F6C\u53D1\u5230 /files\n  proxy /files http://localhost:2016 {\n    # policy round_robin\n    # health_check /health\n    without /files\n    # proxy_header X-Real-IP {remote}\n    proxy_header X-Forwarded-Proto {scheme}\n    proxy_header X-Forwarded-For {host}\n    proxy_header Host {host}\n  }\n\n  # \u8F6C\u53D1\u8FDC\u7A0B\u670D\u52A1\u5230\u672C\u5730\n  proxy /api api.wener.me {\n    without /api\n  }\n  header /api {\n    # Access-Control-Allow-Origin  *\n    # Access-Control-Allow-Methods "GET, POST, OPTIONS"\n    X-Do-Proxy "true"\n    -Server\n  }\n  # \u5141\u8BB8 CORS \u907F\u8FC7\u65E0\u6CD5\u76F4\u63A5\u8BBF\u95EE\u8FDC\u7A0B\u7684\u95EE\u9898\n  cors /api http://editor.swagger.io\n  jsonp /api\n\n  # \u9700\u8981\u901A\u8FC7 JWT_SECRET \u73AF\u5883\u53D8\u91CF\u8BBE\u7F6E\n  jwt {\n    path /secret.md\n    allow role user\n  }\n}\n\n'})}),"\n",(0,d.jsx)(n.h2,{id:"changelog",children:"CHANGELOG"}),"\n",(0,d.jsx)(n.h3,{id:"01012",children:"0.10.12"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://caddyserver.com/blog/caddy-0_10_12-released",children:"Caddy 0.10.12 Released with ACMEv2 and Wildcard Certificates"})}),"\n",(0,d.jsx)(n.li,{children:"ACMEv2 \u901A\u914D\u7B26"}),"\n",(0,d.jsxs)(n.li,{children:["\u652F\u6301\u5171\u4EAB\u6302\u8F7D ",(0,d.jsx)(n.code,{children:"~/.caddy/acme"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"{labelN}"})," \u5360\u4F4D\u7B26"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"// 1.\n*.example.com\ntls {\n    dns provider\n}\n\n// 2. \u4F7F\u7528 macro\n(wildcard_cert) {\n    tls {\n        dns provider\n        wildcard\n    }\n}\nsub1.example.com {\n    import wildcard_cert\n    ...\n}\n\nsub1000000.example.com {\n    import wildcard_cert\n    ...\n}\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"*.example.com\nrewrite {\n    to /{label1}{uri}\n}\n"})}),"\n",(0,d.jsx)(n.p,{children:"PDNS_API_KEY\nPDNS_API_URL \u5730\u5740\u8981\u4EE5 / \u7ED3\u5C3E"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://github.com/xenolf/lego/blob/master/providers/dns/pdns/pdns.go",children:"https://github.com/xenolf/lego/blob/master/providers/dns/pdns/pdns.go"})}),"\n",(0,d.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,d.jsx)(n.h3,{id:"\u7981\u7528\u91CD\u5B9A\u5411-http-\u5230-https",children:"\u7981\u7528\u91CD\u5B9A\u5411 http \u5230 https"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://github.com/mholt/caddy/issues/504",children:"#504"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://caddyserver.com/docs/automatic-https",children:"https://caddyserver.com/docs/automatic-https"})}),"\n",(0,d.jsx)(n.li,{children:"\u76EE\u524D\u53EA\u80FD\u7528\u914D\u7F6E\u4E24\u4E2A\u7684\u65B9\u5F0F\u6765\u907F\u514D"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"http://yousite.com {\n  log logs www.chinazs.gov.cn.log\n  proxy / upstream\n}\n\nhttps://yousite.com {\n  proxy / localhost {\n    transparent\n  }\n}\n"})}),"\n",(0,d.jsx)(n.h3,{id:"\u5728\u65E5\u5FD7\u6587\u4EF6\u540D\u4E2D\u4F7F\u7528\u5360\u4F4D\u7B26",children:"\u5728\u65E5\u5FD7\u6587\u4EF6\u540D\u4E2D\u4F7F\u7528\u5360\u4F4D\u7B26"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://github.com/mholt/caddy/issues/1396",children:"https://github.com/mholt/caddy/issues/1396"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return l}});var s=t(75271);let d={},r=s.createContext(d);function l(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);