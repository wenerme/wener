"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43542"],{19015:function(n,t,e){e.r(t),e.d(t,{metadata:()=>s,contentTitle:()=>o,default:()=>h,assets:()=>i,toc:()=>l,frontMatter:()=>c});var s=JSON.parse('{"id":"os/linux/network/socat","title":"socat","description":"- man page","source":"@site/../notes/os/linux/network/socat.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/socat","permalink":"/notes/os/linux/network/socat","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/socat.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1742185178000,"frontMatter":{"title":"socat"},"sidebar":"docs","previous":{"title":"Port forward","permalink":"/notes/os/linux/network/port-forward"},"next":{"title":"TCP","permalink":"/notes/os/linux/network/tcp"}}'),r=e("52676"),d=e("79938");let c={title:"socat"},o="socat",i={},l=[];function a(n){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"socat",children:"socat"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"http://www.dest-unreach.org/socat/doc/socat.html",children:"man page"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/craSH/socat/blob/master/EXAMPLES",children:"EXAMPLES"})}),"\n"]}),"\n",(0,r.jsx)(t.admonition,{type:"caution",children:(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"\u4E00\u6B21\u53EA\u80FD\u4E00\u4E2A\u7AEF\u53E3"}),"\n"]})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"# \u8F6C\u53D1\u672C\u5730\u7684 8080 \u5230 \u767E\u5EA6\n# -d \u7528\u4E8E\u6253\u5F00\u65E5\u5FD7\nsocat -v -d TCP-LISTEN:8080,fork,reuseaddr TCP:baidu.com:80\n\n# \u6D4B\u8BD5\ncurl -H 'Host: baidu.com' 127.0.0.1:8080\n\n# \u8F6C\u53D1\u672C\u5730 1053 \u5230\u963F\u91CC\u516C\u7F51 dns\nsocat TCP-LISTEN:1053,fork,reuseaddr TCP:223.5.5.5:53\nsocat UDP-RECVFROM:1053,fork,reuseaddr UDP:223.5.5.5:53\n\n# \u6D4B\u8BD5\ndig -p 1053 baidu.com @127.0.0.1\n\n# \u8F6C\u53D1\u672C\u5730\u5230\u8C37\u6B4C DNS\nsocat TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53\nsocat UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53\n\n# \u5E38\u7528\u547D\u4EE4\n# \u907F\u514D\u540E\u9762 SUDO \u8981\u6C42\u5BC6\u7801\nsudo ls\nsudo `which socat` TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53 > socat.tcp.53.log &\nsudo `which socat` UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53 > socat.udp.53.log &\n\n# \u4F46 \"\u9632\u706B\u5899\" \u4F1A\u68C0\u6D4B\u51FA\u6765,\u4E00\u4F1A\u513F\u8F6C\u53D1\u7684 DNS \u5C31\u4E0D\u80FD\u7528\u4E86\n\n# \u76D1\u542C UDP, \u5C06\u5185\u5BB9\u8F93\u51FA\u5230 stdio\nsocat -u udp4-recv:8123 -\n# \u5BA2\u6237\u7AEF\u53D1\u9001\necho \"test\" | socat - udp4-sendto:127.0.0.1:8123\n\n# \u8FDE\u63A5\u540E\u542F\u52A8\u7A0B\u5E8F\nsocat -u udp-l:8123,fork exec:/bin/cat\n# tcp\nsocat -u tcp-l:80,fork exec:/bin/cat\n\n# \u8F93\u51FA\u5230\u6587\u4EF6\nsocat -u TCP-LISTEN:12456,keepalive,reuseaddr,rcvbuf=131071 STDOUT\n\n# server\nsocat exec:'bash -li',pty,stderr,setsid  tcp-listen:8999,reuseaddr\n# cli\nsocat tcp-connect:127.0.0.1:8999 file:`tty`,raw,echo=0\n\n# over socks\n# socks 10.10.1.1:1080\nsocat TCP-LISTEN:8080 SOCKS:10.10.1.1:216.58.200.238:80,socksport=1080\ncurl localhost:8080\n\n# dns udp\nsocat -v UDP-LISTEN:15353,fork,reuseaddr SOCKS:10.10.1.1:8.8.8.8:53,socksport=1080\n\n# \u914D\u5408 SSH \u4F7F\u7528\n# ProxyCommand socat - socks:127.0.0.1:%h:%p,socksport=3333\n\n# \u53EF\u4EE5\u6307\u5B9A\u672C\u5730\u5730\u5740\nSOCAT_SOCKADDR=x.y.z.t socat TCP-LISTEN:80,reuseaddr,fork,su=nobody TCP:a.b.c.d:80\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{style:{textAlign:"right"},children:"opt"}),(0,r.jsx)(t.th,{children:"desc"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-d"}),(0,r.jsx)(t.td,{children:"fatal"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-dd"}),(0,r.jsx)(t.td,{children:"notice"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-ddd"}),(0,r.jsx)(t.td,{children:"info"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-dddd"}),(0,r.jsx)(t.td,{children:"debug"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-D"}),(0,r.jsx)(t.td,{children:"log file descriptors"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-u"}),(0,r.jsx)(t.td,{children:"\u53CC\u5411\u6A21\u5F0F - \u7B2C\u4E00\u4E2A\u8BFB\uFF0C\u7B2C\u4E8C\u4E2A\u5199"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-U"}),(0,r.jsx)(t.td,{children:"\u53CC\u5411\u6A21\u5F0F - \u7B2C\u4E00\u4E2A\u5199\uFF0C\u7B2C\u4E8C\u4E2A\u8BFB"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-4"}),(0,r.jsx)(t.td,{children:"IPv4"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{style:{textAlign:"right"},children:"-6"}),(0,r.jsx)(t.td,{children:"IPv6"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"address type"}),(0,r.jsx)(t.th,{children:"short"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"tcp-connect"}),(0,r.jsx)(t.td,{children:"tcp"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"tcp-listen"}),(0,r.jsx)(t.td,{children:"tcp-l"})]})]})]})]})}function h(n={}){let{wrapper:t}={...(0,d.a)(),...n.components};return t?(0,r.jsx)(t,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},79938:function(n,t,e){e.d(t,{Z:function(){return o},a:function(){return c}});var s=e(75271);let r={},d=s.createContext(r);function c(n){let t=s.useContext(d);return s.useMemo(function(){return"function"==typeof n?n(t):{...t,...n}},[t,n])}function o(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),s.createElement(d.Provider,{value:t},n.children)}}}]);