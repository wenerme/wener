"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["97256"],{19699:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>a,toc:()=>c,frontMatter:()=>i});var t=JSON.parse('{"id":"devops/web/nginx/nginx-cookbook","title":"Nginx \u5E38\u7528\u914D\u7F6E","description":"\u6CE8\u610F","source":"@site/../notes/devops/web/nginx/nginx-cookbook.md","sourceDirName":"devops/web/nginx","slug":"/devops/web/nginx/cookbook","permalink":"/notes/devops/web/nginx/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/web/nginx/nginx-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1677583228000,"frontMatter":{"title":"Nginx \u5E38\u7528\u914D\u7F6E","tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"Nginx","permalink":"/notes/devops/web/nginx/conf"},"next":{"title":"Nginx FAQ","permalink":"/notes/devops/web/nginx/faq"}}'),s=r("52676"),o=r("79938");let i={title:"Nginx \u5E38\u7528\u914D\u7F6E",tags:["Cookbook"]},l="Nginx \u5E38\u7528\u914D\u7F6E",a={},c=[{value:"\u6CE8\u610F",id:"\u6CE8\u610F",level:2},{value:"\u4E3B\u673A\u6620\u5C04",id:"\u4E3B\u673A\u6620\u5C04",level:2},{value:"\u5B50\u57DF\u540D\u91CD\u5199",id:"\u5B50\u57DF\u540D\u91CD\u5199",level:2},{value:"\u66FF\u4EE3\u57DF\u540D",id:"\u66FF\u4EE3\u57DF\u540D",level:2},{value:"\u57FA\u7840\u914D\u7F6E",id:"\u57FA\u7840\u914D\u7F6E",level:2},{value:"\u6D41\u914D\u7F6E",id:"\u6D41\u914D\u7F6E",level:2},{value:"\u5339\u914D\u6D4B\u8BD5",id:"\u5339\u914D\u6D4B\u8BD5",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"nginx-\u5E38\u7528\u914D\u7F6E",children:"Nginx \u5E38\u7528\u914D\u7F6E"})}),"\n",(0,s.jsx)(n.h2,{id:"\u6CE8\u610F",children:"\u6CE8\u610F"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"http://wiki.nginx.org/HttpRewriteModule#rewrite",children:"rewrite"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u5982\u679C\u66FF\u4EE3\u5B57\u7B26\u4E32\u662F ",(0,s.jsx)(n.code,{children:"http://"})," \u6253\u5934\uFF0C\u90A3\u4E48\u5BA2\u6237\u7AEF\u4F1A\u88AB\u91CD\u5B9A\u5411\uFF0C\u4E4B\u540E\u7684 rewrite \u90FD\u4F1A\u88AB\u4E2D\u6B62"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["auth\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://oauth2-proxy.github.io/oauth2-proxy/configuration#configuring-for-use-with-the-nginx-auth_request-directive",children:"https://oauth2-proxy.github.io/oauth2-proxy/configuration#configuring-for-use-with-the-nginx-auth_request-directive"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u4E3B\u673A\u6620\u5C04",children:"\u4E3B\u673A\u6620\u5C04"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"http://nginx.org/en/docs/http/ngx_http_map_module.html#map",children:"map"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"map $http_host $served_host {\n    default $http_host;\n    beta.example.com www.example.com;\n}\n\nserver {\n    # [...]\n\n    location / {\n        proxy_pass http://rubyapp.com;\n        proxy_set_header Host $served_host;\n    }\n}\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"map $request_uri $redirect_uri {\n  ~/(?<lang>(en|de|fr))/oldname    /$lang/newname;\n}\nmap $http_host $served_host {\n    default $http_host;\n    ~(?<name>[^.]+).example.com $name.example.net;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u5B50\u57DF\u540D\u91CD\u5199",children:"\u5B50\u57DF\u540D\u91CD\u5199"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"http://www.*.domain.com"})," -> ",(0,s.jsx)(n.code,{children:"http://*.domain.com"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"#1"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"if ($host ~* www\\.(.*)) {\n  set $host_without_www $1;\n  rewrite ^(.*)$ http://$host_without_www$1 permanent; # $1 contains '/foo', not 'www.mydomain.com/foo'\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"#2"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"server {\n  server_name www.domain.com;\n  rewrite ^ http://domain.com$request_uri permanent;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u66FF\u4EE3\u57DF\u540D",children:"\u66FF\u4EE3\u57DF\u540D"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"server\n{\n  listen 80;\n  server_name a.com b.com c.com;\n\n  location ~* ^/comment/(.*) {\n    proxy_set_header HOST shared.com;\n    # $1 - stores capture from the location on top\n    # $is_args will return ? if there are query params\n    # $args stores query params\n    proxy_pass http://comment/$1$is_args$args;\n  }\n\n}\n\nserver {\n  listen 80;\n  server shared.com;\n\n  location / {\n    # Proxy to some app handler\n  }\n}\n\nupstream comment {\n  server localhost; # or any other host essentially\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u57FA\u7840\u914D\u7F6E",children:"\u57FA\u7840\u914D\u7F6E"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"user nginx;\n\nworker_processes auto;\npcre_jit on;\nerror_log /var/log/nginx/error.log warn;\ninclude /etc/nginx/modules/*.conf;\n\nevents {\n    worker_connections 1024;\n}\n\n# \u8DEF\u5F84\u91CD\u5B9A\u5411\u4E3A\u53C2\u6570\nrewrite ^/article/(.*)$ /article.php?id=$1 last;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u6D41\u914D\u7F6E",children:"\u6D41\u914D\u7F6E"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"stream {\n    upstream quic_upstreams {\n        server 10.66.2.1:443;\n    }\n\n    upstream http_upstreams {\n        server 10.66.2.1:80;\n    }\n\n    upstream https_upstreams {\n        server 10.66.2.1:443;\n    }\n\n    server {\n        listen 443 udp;\n        proxy_pass quic_upstreams;\n        proxy_timeout 1s;\n        proxy_responses 1;\n        error_log logs/udp.log;\n    }\n    server {\n        listen 80;\n        proxy_pass http_upstreams;\n        error_log logs/http.log;\n    }\n    server {\n        listen 443;\n        proxy_pass https_upstreams;\n        error_log logs/https.log;\n    }\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u5339\u914D\u6D4B\u8BD5",children:"\u5339\u914D\u6D4B\u8BD5"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-nginx",children:"location / {\n  add_header Content-Type text/html;\n  return 200 'Glad you are here!';\n}\n"})})]})}function h(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return i}});var t=r(75271);let s={},o=t.createContext(s);function i(e){let n=t.useContext(o);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);