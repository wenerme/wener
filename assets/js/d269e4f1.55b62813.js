"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["2040"],{64570:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>l,default:()=>d,assets:()=>a,toc:()=>c,frontMatter:()=>s});var i=JSON.parse('{"id":"devops/web/haproxy/README","title":"HAProxy","description":"- haproxy.com - The #1 Open Source Software Load Balancer and Application Delivery Controller","source":"@site/../notes/devops/web/haproxy/README.md","sourceDirName":"devops/web/haproxy","slug":"/devops/web/haproxy/","permalink":"/notes/devops/web/haproxy/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/web/haproxy/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702440128000,"frontMatter":{"title":"HAProxy"},"sidebar":"docs","previous":{"title":"Caddy V1","permalink":"/notes/devops/web/caddy/v1"},"next":{"title":"HAProxy \u914D\u7F6E","permalink":"/notes/devops/web/haproxy/conf"}}'),o=r("52676"),t=r("79938");let s={title:"HAProxy"},l="HAProxy",a={},c=[{value:"metrics",id:"metrics",level:2},{value:"Runtime API",id:"runtime-api",level:2},{value:"Connect() failed for backend : no free ports",id:"connect-failed-for-backend--no-free-ports",level:2}];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"haproxy",children:"HAProxy"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://www.haproxy.com/",children:"haproxy.com"})," - The #1 Open Source Software Load Balancer and Application Delivery Controller"]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/haproxy/haproxy",children:"haproxy/haproxy"})}),"\n",(0,o.jsxs)(n.li,{children:["\u6700\u64C5\u957F ",(0,o.jsx)(n.strong,{children:"\u8D1F\u8F7D\u5747\u8861"})]}),"\n",(0,o.jsxs)(n.li,{children:["\u7279\u6027\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"L4(TCP) L7(HTTP) \u8D1F\u8F7D\u5747\u8861"}),"\n",(0,o.jsx)(n.li,{children:"URL \u91CD\u5199"}),"\n",(0,o.jsx)(n.li,{children:"\u9650\u6D41"}),"\n",(0,o.jsx)(n.li,{children:"SSL/TLS termination/offload"}),"\n",(0,o.jsx)(n.li,{children:"Gzip"}),"\n",(0,o.jsx)(n.li,{children:"\u652F\u6301 HTTP \u4EE3\u7406\u534F\u8BAE"}),"\n",(0,o.jsx)(n.li,{children:"\u76D1\u63A7\u68C0\u67E5"}),"\n",(0,o.jsx)(n.li,{children:"\u94FE\u63A5\u548C HTTP \u65E5\u5FD7"}),"\n",(0,o.jsx)(n.li,{children:"HTTP/2"}),"\n",(0,o.jsx)(n.li,{children:"\u591A\u7EBF\u7A0B"}),"\n",(0,o.jsx)(n.li,{children:"\u65E0\u7F1D\u91CD\u8F7D"}),"\n",(0,o.jsx)(n.li,{children:"gRPC"}),"\n",(0,o.jsx)(n.li,{children:"Lua \u548C SPOE \u652F\u6301"}),"\n",(0,o.jsx)(n.li,{children:"L4 \u91CD\u8BD5"}),"\n",(0,o.jsx)(n.li,{children:"\u7B80\u5355\u7194\u65AD\u673A\u5236"}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["HAproxy ",(0,o.jsx)(n.a,{href:"https://cbonte.github.io/haproxy-dconv/2.3/intro.html",children:"Starter Guide"})]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.haproxy.com/user-spotlight-series/inside-the-github-load-balancer/",children:"HAProxy at GitHub"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.haproxy.com/blog/5-ways-to-extend-haproxy-with-lua/",children:"5 Ways to Extend HAProxy with Lua"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.haproxy.com/blog/using-haproxy-as-an-api-gateway-part-3-health-checks/",children:"Using HAProxy as an API Gateway"})}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/haproxytech/client-native",children:"haproxytech/client-native"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Go client for HAProxy configuration and runtime API"}),"\n",(0,o.jsxs)(n.li,{children:["\u914D\u7F6E\u6A21\u578B ",(0,o.jsx)(n.a,{href:"https://github.com/haproxytech/client-native/tree/master/models",children:"models"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"caution",children:(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u4E0D\u80FD\u8F6C\u53D1\u4EFB\u610F UDP - Nginx \u53EF\u4EE5\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"2.3+ \u652F\u6301 syslog UDP"}),"\n",(0,o.jsx)(n.li,{children:"2.5+ \u652F\u6301 QUIC, HTTP/3"}),"\n",(0,o.jsx)(n.li,{children:"\u672A\u6765\u53EF\u80FD\u652F\u6301 DNS"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"haproxy -c -f haproxy.cfg # \u68C0\u67E5\u914D\u7F6E\u662F\u5426\u6B63\u786E\nhaproxy -f  haproxy.cfg # \u542F\u52A8\n# master-worker mode - reload\n# \u672C\u8D28\u4E5F\u662F -sf \u542F\u65B0\u7684\u8FDB\u7A0B\nkill -USR2 $(cat /var/run/haproxy.pid)\n\n# \u91CD\u542F\u65B0\u7684 haproxy - reload\nhaproxy -D -f /etc/haproxy/haproxy.cfg -p /var/run/haproxy.pid -sf $(cat /var/run/haproxy.pid)\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",metastring:'title="docker"',children:"docker run --rm -it \\\n  -v /path/to/etc/haproxy:/usr/local/etc/haproxy:ro \\\n  --sysctl net.ipv4.ip_unprivileged_port_start=0 \\\n  --name haproxy haproxy:2.5\n\n# reload\ndocker kill -s HUP haproxy\n"})}),"\n",(0,o.jsx)(n.h2,{id:"metrics",children:"metrics"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/",children:"https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/",children:"https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"runtime-api",children:"Runtime API"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-haproxy",children:"global\n  stats socket ipv4@127.0.0.1:9999 level admin\n  stats socket /run/haproxy-runtime-api.sock mode 666 level admin\n  stats timeout 2m\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'echo "help" | socat stdio tcp4-connect:127.0.0.1:9999\necho "show acl" | socat stdio /run/haproxy-runtime-api.sock\nsocat readline /run/haproxy-runtime-api.sock\nhelp\n'})}),"\n",(0,o.jsx)(n.h2,{id:"connect-failed-for-backend--no-free-ports",children:"Connect() failed for backend : no free ports"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'cat /proc/sys/net/ipv4/ip_local_port_range\n\necho "2000 60999" | sudo tee /proc/sys/net/ipv4/ip_local_port_range\n'})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u5C1D\u8BD5\u6DFB\u52A0 ",(0,o.jsx)(n.code,{children:"resolve-prefer ipv4"})]}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return s}});var i=r(75271);let o={},t=i.createContext(o);function s(e){let n=i.useContext(t);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);