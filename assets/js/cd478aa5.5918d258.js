"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["68777"],{5166:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>c,default:()=>h,assets:()=>o,toc:()=>a,frontMatter:()=>l});var s=JSON.parse('{"id":"service/network/network-faq","title":"Network FAQ","description":"\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97","source":"@site/../notes/service/network/network-faq.md","sourceDirName":"service/network","slug":"/service/network/faq","permalink":"/notes/service/network/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/network-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1724402050000,"frontMatter":{"title":"Network FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Network Awesome","permalink":"/notes/service/network/awesome"},"next":{"title":"NextDNS","permalink":"/notes/service/network/nextdns"}}'),t=r("52676"),i=r("79938");let l={title:"Network FAQ",tags:["FAQ"]},c="Network FAQ",o={},a=[{value:"\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97",id:"\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97",level:2},{value:"TURN vs STUN",id:"turn-vs-stun",level:2},{value:"\u7B80\u5355\u7684\u7AEF\u53E3\u6392\u67E5",id:"\u7B80\u5355\u7684\u7AEF\u53E3\u6392\u67E5",level:2},{value:"\u4FDD\u7559\u6765\u6E90IP",id:"\u4FDD\u7559\u6765\u6E90ip",level:2},{value:"\u4FDD\u7559\u7F51\u7EDC",id:"\u4FDD\u7559\u7F51\u7EDC",level:2},{value:"latency",id:"latency",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"network-faq",children:"Network FAQ"})}),"\n",(0,t.jsx)(n.h2,{id:"\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97",children:"\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97"}),"\n",(0,t.jsx)(n.p,{children:"curl \u4E00\u4E2A\u5730\u5740\u7684\u65F6\u5019\uFF0C\u8FD4\u56DE 302 \u5230 183.192.65.101\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u76EE\u524D\u65E0\u89E3\uFF0C\u53EA\u80FD\u4EE3\u7406\u3002"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"183.192.65.101"}),"\n",(0,t.jsx)(n.li,{children:"\u4E0A\u6D77\u5E02\u53CD\u7535\u4FE1\u7F51\u7EDC\u8BC8\u9A97\u4E2D\u5FC3"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"turn-vs-stun",children:"TURN vs STUN"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["STUN\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5B9E\u73B0 NAT \u7A7F\u900F\u3001\u7AEF\u53E3\u6620\u5C04"}),"\n",(0,t.jsx)(n.li,{children:"\u5B9E\u73B0\u4FE1\u4EE4\u80FD\u529B"}),"\n",(0,t.jsx)(n.li,{children:"\u8D44\u6E90\u5360\u7528\u4F4E\uFF0C\u670D\u52A1\u5668\u6D41\u91CF\u5F88\u5C0F"}),"\n",(0,t.jsx)(n.li,{children:"\u901A\u5E38\u6709\u516C\u5171\u7684 stun \u670D\u52A1 - \u65E0\u9700\u6388\u6743"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["TURN\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E2D\u7EE7\uFF0C\u65E0\u6CD5 NAT \u7A7F\u900F\u65F6"}),"\n",(0,t.jsx)(n.li,{children:"\u5B9E\u73B0\u4E2D\u7EE7\u4EE3\u7406\u8BF7\u6C42"}),"\n",(0,t.jsx)(n.li,{children:"\u8D44\u6E90\u5360\u7528\u9AD8\uFF0C\u670D\u52A1\u5668\u6D41\u91CF\u5927"}),"\n",(0,t.jsx)(n.li,{children:"\u4E0D\u5B58\u5728\u516C\u5171\u7684 turn \u670D\u52A1 - \u901A\u5E38\u9700\u8981\u6388\u6743"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u7B80\u5355\u7684\u7AEF\u53E3\u6392\u67E5",children:"\u7B80\u5355\u7684\u7AEF\u53E3\u6392\u67E5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# nc - busybox\n# ==========\n# UDP\nnc -u -l -p 12345 -e cat\necho test | nc -u -w 2 127.0.0.1 12345\n# TCP\nnc -l -p 12345 -e cat\necho test | nc -w 2 127.0.0.1 12345\n\n# ncat - nmap\n# ==========\nncat -ulk -e /bin/cat 12345\n\n# socat\n# ==========\nsocat -u udp-l:12345,fork exec:/bin/cat\necho "test" | socat -u - udp:127.0.0.1:12345\n\nsocat -u tcp-l:12345,fork exec:/bin/cat\necho "test" | socat -u - tcp:127.0.0.1:12345\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u4FDD\u7559\u6765\u6E90ip",children:"\u4FDD\u7559\u6765\u6E90IP"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"PROXY"}),"\n",(0,t.jsxs)(n.li,{children:["mmproxy\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"remote PROXY -> mmproxy PROXY -> localhost"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/cloudflare/mmproxy",children:"cloudflare/mmproxy"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://blog.cloudflare.com/mmproxy-creative-way-of-preserving-client-ips-in-spectrum/",children:"https://blog.cloudflare.com/mmproxy-creative-way-of-preserving-client-ips-in-spectrum/"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"/notes/service/network/tproxy",children:"TPROXY"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"linux \u5185\u6838\u6A21\u5757"}),"\n",(0,t.jsxs)(n.li,{children:["HAProxy \u652F\u6301 ",(0,t.jsx)(n.a,{href:"https://gist.github.com/mhofman/a01df56480b3791d526b77dbebef43a2#haproxy-transparent-support",children:"https://gist.github.com/mhofman/a01df56480b3791d526b77dbebef43a2#haproxy-transparent-support"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"server app1-tls 192.0.2.10:3001 source * usesrc client weight 0"})}),"\n",(0,t.jsx)(n.li,{children:"usesrc"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.kernel.org/networking/tproxy.html",children:"https://docs.kernel.org/networking/tproxy.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u4FDD\u7559\u7F51\u7EDC",children:"\u4FDD\u7559\u7F51\u7EDC"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc5737",children:"RFC 5737"}),": \u201CIPv4 Address Blocks Reserved for Documentation\u201D\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"TEST-NET"}),"\n",(0,t.jsx)(n.li,{children:"192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["RFC 3849 IPv6 Address Prefix Reserved for Documentation\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"2001:DB8::/32"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u57DF\u540D\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:".test"}),"\n",(0,t.jsx)(n.li,{children:".example"}),"\n",(0,t.jsx)(n.li,{children:".invalid"}),"\n",(0,t.jsx)(n.li,{children:".localhost"}),"\n",(0,t.jsx)(n.li,{children:".internal"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"latency",children:"latency"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"ping 1.1.1.1\n\ntime ssh svr-1 exit\n\ntime nc -zv 192.168.1.1 22\n\nhping3 -S -p 22 192.168.1.1\n\nsshp user@your-server\n\n# MTR \u652F\u6301 TCP \u6A21\u5F0F\n# 'traceroute' and 'ping' in a single tool\nmtr -P 22 --tcp your-server\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"iperf3"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/Samsar4/Ethical-Hacking-Labs/blob/master/2-Scanning-Networks/1-hping3.md",children:"https://github.com/Samsar4/Ethical-Hacking-Labs/blob/master/2-Scanning-Networks/1-hping3.md"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return l}});var s=r(75271);let t={},i=s.createContext(t);function l(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);