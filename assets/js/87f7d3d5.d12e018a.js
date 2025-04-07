"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["32724"],{90868:function(e,d,n){n.r(d),n.d(d,{metadata:()=>s,contentTitle:()=>t,default:()=>h,assets:()=>l,toc:()=>i,frontMatter:()=>a});var s=JSON.parse('{"id":"devops/web/caddy/README","title":"Caddy","description":"- mholt/caddy","source":"@site/../notes/devops/web/caddy/README.md","sourceDirName":"devops/web/caddy","slug":"/devops/web/caddy/","permalink":"/notes/devops/web/caddy/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/web/caddy/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1741576659000,"frontMatter":{"title":"Caddy"},"sidebar":"docs","previous":{"title":"APISIX FAQ","permalink":"/notes/devops/web/apisix/faq"},"next":{"title":"Caddyfile","permalink":"/notes/devops/web/caddy/conf"}}'),r=n("52676"),c=n("79938");let a={title:"Caddy"},t="Caddy",l={},i=[{value:"Docker reload",id:"docker-reload",level:2},{value:"file_server",id:"file_server",level:2},{value:"templates",id:"templates",level:2},{value:"docker proxy",id:"docker-proxy",level:2},{value:"modules",id:"modules",level:2}];function o(e){let d={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.header,{children:(0,r.jsx)(d.h1,{id:"caddy",children:"Caddy"})}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsxs)(d.li,{children:[(0,r.jsx)(d.a,{href:"https://github.com/mholt/caddy",children:"mholt/caddy"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:"Apache-2.0, Golang"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(d.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsxs)(d.li,{children:[(0,r.jsx)(d.a,{href:"https://github.com/caddy-dns/acmedns",children:"caddy-dns/acmedns"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:"ACME DNS-01 challenge solver for Caddy"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(d.li,{children:[(0,r.jsx)(d.a,{href:"https://github.com/caddyserver/ingress",children:"caddyserver/ingress"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:"WIP - not ready for production use"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(d.admonition,{type:"caution",children:(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:"Caddy \u6709\u70B9\u8017\u5185\u5B58\uFF0C\u5F88\u5BB9\u6613\u5185\u5B58\u5C31\u63A5\u8FD1 G \u7EA7\u522B"}),"\n"]})}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"brew install caddy # macOS - /usr/local/etc/Caddyfile\n\n# \u542F\u52A8 \u5E76\u76D1\u542C\u914D\u7F6E\u53D8\u5316\ncaddy run --watch --config Caddyfile --adapter caddyfile\n# caddy start # \u540E\u53F0\u542F\u52A8\n\ncaddy build-info\ncaddy list-modules\n\ncaddy reload\n\n# Caddyfile -> JSON\n# --validate --pretty\ncaddy adapt --config Caddyfile | jq\ncaddy validate Caddyfile\ncaddy fmt --overwrite Caddyfile\n\ncaddy trust # \u5B89\u88C5\u8BC1\u4E66\ncaddy untrust\n\n# \u5FEB\u901F\u542F\u52A8\u670D\u52A1\n# ==========\n# --root $PWD --listen :80 --templates\ncaddy file-server --access-log # \u6587\u4EF6\u670D\u52A1\ncaddy respond --status 401     # \u8FD4\u56DE\u76F8\u540C\u54CD\u5E94 - \u7528\u4E8E\u6D4B\u8BD5\n\ncaddy reverse-proxy --to https://wener.me --internal-certs --from :8081 --change-host-header # \u53CD\u5411\u4EE3\u7406 http://127.0.0.1:8081/\n\n# \u5305\u7BA1\u7406\n# ==========\ncaddy add-package github.com/caddy-dns/cloudflare\n# caddy remove-package\n"})}),"\n",(0,r.jsx)(d.h2,{id:"docker-reload",children:"Docker reload"}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"docker exec -w /etc/caddy caddy caddy reload\n\ndocker exec caddy curl -s http://127.0.0.1:2019/config/\n"})}),"\n",(0,r.jsx)(d.h2,{id:"file_server",children:"file_server"}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"caddy file-server export-template\n"})}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://github.com/caddyserver/website/blob/master/src/docs/index.html",children:"https://github.com/caddyserver/website/blob/master/src/docs/index.html"})}),"\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://pastebin.com/9EkfCuhu",children:"https://pastebin.com/9EkfCuhu"})}),"\n",(0,r.jsxs)(d.li,{children:["\u9875\u9762\u6A21\u677F ",(0,r.jsx)(d.a,{href:"https://github.com/caddyserver/caddy/blob/master/modules/caddyhttp/fileserver/browse.html",children:"https://github.com/caddyserver/caddy/blob/master/modules/caddyhttp/fileserver/browse.html"})]}),"\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://caddyserver.com/docs/caddyfile/directives/file_server",children:"https://caddyserver.com/docs/caddyfile/directives/file_server"})}),"\n"]}),"\n",(0,r.jsx)(d.h2,{id:"templates",children:"templates"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://github.com/caddyserver/website/blob/master/src/docs/index.html",children:"https://github.com/caddyserver/website/blob/master/src/docs/index.html"})}),"\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://caddyserver.com/docs/caddyfile/directives/templates",children:"https://caddyserver.com/docs/caddyfile/directives/templates"})}),"\n"]}),"\n",(0,r.jsx)(d.h2,{id:"docker-proxy",children:"docker proxy"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://github.com/lucaslorentz/caddy-docker-proxy",children:"lucaslorentz/caddy-docker-proxy"})}),"\n"]}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"docker exec caddy cat /config/caddy/autosave.json\ndocker exec caddy curl -s http://127.0.0.1:2019/config/\n"})}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"docker network create caddy\n"})}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-yaml",children:"services:\n  caddy:\n    image: lucaslorentz/caddy-docker-proxy:ci-alpine\n    ports:\n      - 80:80\n      - 443:443\n    environment:\n      - CADDY_INGRESS_NETWORKS=caddy\n    networks:\n      - caddy\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - caddy_data:/data\n    restart: unless-stopped\n\nnetworks:\n  caddy:\n    external: true\n\nvolumes:\n  caddy_data:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./caddy_data\n      o: bind\n"})}),"\n",(0,r.jsx)(d.h2,{id:"modules",children:"modules"}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:(0,r.jsx)(d.a,{href:"https://caddyserver.com/docs/modules/",children:"https://caddyserver.com/docs/modules/"})}),"\n"]})]})}function h(e={}){let{wrapper:d}={...(0,c.a)(),...e.components};return d?(0,r.jsx)(d,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},79938:function(e,d,n){n.d(d,{Z:function(){return t},a:function(){return a}});var s=n(75271);let r={},c=s.createContext(r);function a(e){let d=s.useContext(c);return s.useMemo(function(){return"function"==typeof e?e(d):{...d,...e}},[d,e])}function t(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(c.Provider,{value:d},e.children)}}}]);