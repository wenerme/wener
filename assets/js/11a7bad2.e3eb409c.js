"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["1884"],{14490:function(n,e,t){t.r(e),t.d(e,{metadata:()=>r,contentTitle:()=>c,default:()=>u,assets:()=>l,toc:()=>a,frontMatter:()=>s});var r=JSON.parse('{"id":"os/linux/network/bbr","title":"BBR","description":"- BBR - Bottleneck Bandwidth and Round-trip propagation time","source":"@site/../notes/os/linux/network/bbr.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/bbr","permalink":"/notes/os/linux/network/bbr","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/bbr.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1686920980000,"frontMatter":{"title":"BBR"},"sidebar":"docs","previous":{"title":"ARP","permalink":"/notes/os/linux/network/arp"},"next":{"title":"Bonding","permalink":"/notes/os/linux/network/bonding"}}'),i=t("52676"),o=t("79938");let s={title:"BBR"},c="BBR",l={},a=[];function d(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"bbr",children:"BBR"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["BBR - Bottleneck Bandwidth and Round-trip propagation time\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"RTT - Round-trip propagation time"}),"\n",(0,i.jsxs)(e.li,{children:["\u57FA\u4E8E\u6A21\u578B\u4E3B\u52A8\u63A2\u6D4B\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"TCP \u62E5\u585E\u63A7\u5236 - \u901A\u5E38 \u57FA\u4E8E\u4E22\u5305\u6765\u4F5C\u4E3A\u964D\u4F4E\u4F20\u8F93\u901F\u7387\u7684\u4FE1\u53F7"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"\u6709\u66F4\u9AD8\u7684\u541E\u5410\u91CF\u548C\u66F4\u4F4E\u7684\u5EF6\u8FDF"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"Linux 5.1 BBRv2"}),"\n",(0,i.jsx)(e.li,{children:"\u9ED8\u8BA4\u4E3A CUBIC"}),"\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://datatracker.ietf.org/meeting/104/materials/slides-104-iccrg-an-update-on-bbr-00",children:"https://datatracker.ietf.org/meeting/104/materials/slides-104-iccrg-an-update-on-bbr-00"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/google/bbr",children:"google/bbr"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"sysctl net.ipv4.tcp_available_congestion_control  # \u53EF\u7528\u7684\u62E5\u585E\u63A7\u5236\u534F\u8BAE - \u9ED8\u8BA4 reno,cubic\nsysctl net.ipv4.tcp_congestion_control            # \u5F53\u524D\u7684\u534F\u8BAE - \u9ED8\u8BA4 cubic\n\n# \u542F\u7528 BBR\nmodprobe tcp_bbr\necho tcp_bbr >> /etc/modules-load.d/bbr.conf\necho net.core.default_qdisc=fq >> /etc/sysctl.d/bbr.conf\necho net.ipv4.tcp_congestion_control=bbr >> /etc/sysctl.d/bbr.conf\nsysctl -p /etc/sysctl.d/bbr.conf\n# \u9A8C\u8BC1\nsysctl net.ipv4.tcp_available_congestion_control\nsysctl net.ipv4.tcp_congestion_control\n"})})]})}function u(n={}){let{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return c},a:function(){return s}});var r=t(75271);let i={},o=r.createContext(i);function s(n){let e=r.useContext(o);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),r.createElement(o.Provider,{value:e},n.children)}}}]);