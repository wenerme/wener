"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["837"],{13504:function(e,t,n){n.r(t),n.d(t,{metadata:()=>a,contentTitle:()=>i,default:()=>u,assets:()=>l,toc:()=>c,frontMatter:()=>s});var a=JSON.parse('{"id":"os/linux/network/gateway","title":"gateway","description":"- gateway = forward + NAT","source":"@site/../notes/os/linux/network/gateway.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/gateway","permalink":"/notes/os/linux/network/gateway","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/gateway.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1708697175000,"frontMatter":{"title":"gateway"},"sidebar":"docs","previous":{"title":"firewalld","permalink":"/notes/os/linux/network/firewalld"},"next":{"title":"ifupdown-ng","permalink":"/notes/os/linux/network/ifupdown-ng"}}'),r=n("52676"),o=n("79938");let s={title:"gateway"},i="gateway",l={},c=[];function d(e){let t={code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"gateway",children:"gateway"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"gateway = forward + NAT"}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"# \u786E\u8BA4\u542F\u7528 forward\nsysctl net.ipv4.ip_forward\nsysctl -w net.ipv4.ip_forward=1\n\n# \u6301\u4E45\u5316\u914D\u7F6E\necho net.ipv4.ip_forward=1 | sudo tee /etc/sysctl.d/99-gateway.conf\nsysctl -p /etc/sysctl.d/99-gateway.conf\n\n# test gateway\n# ====================\nIP=$(dig +short ipv4.icanhazip.com | tail -1)\ncurl -H 'Host: icanhazip.com' $IP\n\n# add route\nip ro add $IP via 192.168.1.2\n# test again\ncurl -H 'Host: icanhazip.com' $IP\n"})})]})}function u(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return i},a:function(){return s}});var a=n(75271);let r={},o=a.createContext(r);function s(e){let t=a.useContext(o);return a.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);