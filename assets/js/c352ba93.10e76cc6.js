"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["4991"],{23473:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>u,assets:()=>l,toc:()=>c,frontMatter:()=>o});var s=JSON.parse('{"id":"service/network/vpn/strongswan/README","title":"strongSwan","description":"- vici","source":"@site/../notes/service/network/vpn/strongswan/README.md","sourceDirName":"service/network/vpn/strongswan","slug":"/service/network/vpn/strongswan/","permalink":"/notes/service/network/vpn/strongswan/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/strongswan/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"strongSwan"},"sidebar":"docs","previous":{"title":"sshuttle","permalink":"/notes/service/network/vpn/sshuttle"},"next":{"title":"strongSwan \u914D\u7F6E","permalink":"/notes/service/network/vpn/strongswan/conf"}}'),r=t("52676"),i=t("79938");let o={title:"strongSwan"},a="strongSwan",l={},c=[{value:"Route-based VPNs",id:"route-based-vpns",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"strongswan",children:"strongSwan"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/strongswan/strongswan/blob/master/src/libcharon/plugins/vici/README.md",children:"vici"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u63A7\u5236\u534F\u8BAE"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"route-based-vpns",children:"Route-based VPNs"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://wiki.strongswan.org/projects/strongswan/wiki/RouteBasedVPN",children:"RouteBasedVPN"})}),"\n",(0,r.jsx)(n.li,{children:"VTI Linux 3.6+"}),"\n",(0,r.jsx)(n.li,{children:"Linux 4.19+ XFRM \u6BD4 VTI \u66F4\u597D - strongSwan 5.8.0+"}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://vincent.bernat.ch/en/blog/2017-route-based-vpn",children:"Route-based IPsec VPN on Linux with strongSwan"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"VTI"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# iproute2\n# ip link add <name> type xfrm dev <underlying interface> if_id <interface ID>\n# strongSwan \u5DE5\u5177\n# /usr/local/libexec/ipsec/xfrmi --name <name> --id <interface ID> --dev <underlying interface>\n# <interface ID> 32\u4F4D\u6574\u6570\uFF0C\u4F7F\u7528 0x \u5341\u516D\u8FDB\u5236\u8868\u793A\n# <underlying interface> \u76EE\u524D\u65E0\u610F\u4E49 - \u9664\u975E\u9700\u8981\u914D\u7F6E\u6D41\u51FA\u7B56\u7565\n\nip link add ipsec0 type xfrm dev eth0 if_id 42\n\n# \u7EDF\u8BA1\u4FE1\u606F\nip -s link show eth0\n"})})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return o}});var s=t(75271);let r={},i=s.createContext(r);function o(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);