"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["79949"],{52298:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>o,default:()=>d,assets:()=>h,toc:()=>l,frontMatter:()=>i});var r=JSON.parse('{"id":"os/linux/network/tshark","title":"tshark","description":"- tshark.dev","source":"@site/../notes/os/linux/network/tshark.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/tshark","permalink":"/notes/os/linux/network/tshark","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/tshark.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666510159000,"frontMatter":{"title":"tshark"},"sidebar":"docs","previous":{"title":"tcpdump","permalink":"/notes/os/linux/network/tcpdump"},"next":{"title":"tuntap","permalink":"/notes/os/linux/network/tuntap"}}'),s=n("52676"),a=n("79938");let i={title:"tshark"},o="tshark",h={},l=[{value:"Couldn&#39;t run /usr/bin/dumpcap in child process: Operation not permitted",id:"couldnt-run-usrbindumpcap-in-child-process-operation-not-permitted",level:2}];function c(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"tshark",children:"tshark"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://tshark.dev/",children:"tshark.dev"})}),"\n",(0,s.jsxs)(t.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.wireshark.org/docs/man-pages/tshark.html",children:"tshark.1"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.wireshark.org/docs/man-pages/wireshark-filter.html",children:"Wireshark display filter syntax and reference"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.wireshark.org/docs/dfref/h/http.html",children:"https://www.wireshark.org/docs/dfref/h/http.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:'# interfaces\ntshark -D\n\n# filter\ntshark -f "net 192.168.8.0/24"\n\n# \u53EA\u663E\u793A req header\ntshark tcp port 80 or tcp port 443 -V -R "http.request"\n# \u53EA\u663E\u793A res header\ntshark -V -Y "tcp.port == 80 && http.response"\n\n# DHCP\ntshark -i ethX -n port 68 -R \'bootp.type == 2\'\n\n# SNI\ntshark -V -Y \'tcp.port==443 && ssl.handshake.extensions_server_name=="example.com"\'\n'})}),"\n",(0,s.jsx)(t.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(t.h2,{id:"couldnt-run-usrbindumpcap-in-child-process-operation-not-permitted",children:"Couldn't run /usr/bin/dumpcap in child process: Operation not permitted"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"\u8FD0\u884C\u65F6\u6DFB\u52A0 --cap-add=NET_RAW --cap-add=NET_ADMIN"}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"getcap $(which dumpcap)\n# /usr/bin/dumpcap cap_net_admin,cap_net_raw=eip\n"})})]})}function d(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return o},a:function(){return i}});var r=n(75271);let s={},a=r.createContext(s);function i(e){let t=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);