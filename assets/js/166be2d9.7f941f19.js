"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["33386"],{9419:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>a,toc:()=>c,frontMatter:()=>l});var i=JSON.parse('{"id":"service/network/vpn/wireguard/README","title":"WireGuard","description":"- \u652F\u6301 Userspace \u8FD0\u884C\uFF0C\u7C7B\u4F3C\u4E8E Proxy \u65B9\u5F0F","source":"@site/../notes/service/network/vpn/wireguard/README.md","sourceDirName":"service/network/vpn/wireguard","slug":"/service/network/vpn/wireguard/","permalink":"/notes/service/network/vpn/wireguard/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/wireguard/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1699268951000,"frontMatter":{"title":"WireGuard"},"sidebar":"docs","previous":{"title":"VPN Glossary","permalink":"/notes/service/network/vpn/glossary"},"next":{"title":"WireGuard Awesome","permalink":"/notes/service/network/vpn/wireguard/awesome"}}'),t=r("52676"),s=r("79938");let l={title:"WireGuard"},d="WireGuard",a={},c=[{value:"FAQ",id:"faq",level:2},{value:"\u6865\u63A5\u6216 DHCP",id:"\u6865\u63A5\u6216-dhcp",level:3}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"wireguard",children:"WireGuard"})}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u652F\u6301 Userspace \u8FD0\u884C\uFF0C\u7C7B\u4F3C\u4E8E Proxy \u65B9\u5F0F"}),"\n"]})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.wireguard.com/performance",children:"\u6027\u80FD\u5BF9\u6BD4"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/k4yt3x/wireguard-mesh-configurator",children:"WireGuard Mesh Configurator"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"mesh \u914D\u7F6E\u5DE5\u5177 - \u6279\u91CF\u751F\u6210\u914D\u7F6E"}),"\n",(0,t.jsx)(n.li,{children:"\u4E0D\u4F1A\u81EA\u52A8\u53D1\u73B0 - \u9700\u8981\u989D\u5916\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/WireGuard/wg-dynamic",children:"wg-dynamic"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Wireguard Dynamic IP Configuration Tool"}),"\n",(0,t.jsx)(n.li,{children:"\u672A\u5B8C\u6210 - \u65E0\u7EF4\u62A4"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u5E38\u89C1\u7AEF\u53E3 51820"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://www.wireguard.com/known-limitations/",children:"\u9650\u5236"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E0D\u4F1A\u5BF9\u5305\u505A\u6DF7\u6DC6"}),"\n",(0,t.jsx)(n.li,{children:"\u901A\u9053\u4F7F\u7528 UDP - TCP over UDP"}),"\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528 ChaCha20Poly1305 \u52A0\u5BC6\uFF0C\u76EE\u524D\u57FA\u672C\u4E0D\u652F\u6301\u786C\u4EF6\u52A0\u901F"}),"\n",(0,t.jsx)(n.li,{children:"Roaming Mischief - \u6F2B\u6E38\u573A\u666F\u4E0D\u592A\u53CB\u597D"}),"\n",(0,t.jsx)(n.li,{children:"Identity Hiding Forward Secrecy"}),"\n",(0,t.jsx)(n.li,{children:"Post-Quantum Secrecy - \u52A0\u5BC6\u65B9\u5F0F\u4E0D\u662F\u540E\u91CF\u5B50\u65F6\u4EE3\u5B89\u5168\u7684"}),"\n",(0,t.jsx)(n.li,{children:"Denial of Service"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://restoreprivacy.com/wireguard",children:"WireGuard VPN: What You Need to Know"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/gsliepen/tinc/issues/179",children:"gsliepen/tinc#178"})," - tinc: Wireguard backend"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5185\u6838\u6A21\u5757\napk add wireguard-$(uname -r | sed -r 's/.*?-(.*)$/\\1/')\n# \u7528\u6237\u7A7A\u95F4\u5DE5\u5177\napk add wireguard-tools\n\n# \u914D\u7F6E A \u7AEF\n# ==========\n# \u751F\u6210\u5BC6\u94A5\u548C\u516C\u94A5\nwg genkey | tee wg0.pri | wg pubkey > wg0.pub\n# \u914D\u7F6E\u7F51\u5361\nip link add wg0 type wireguard\nip addr add 10.0.0.1/24 dev wg0\nwg set wg0 listen-port 51820 private-key wg0.pri\nip link set wg0 up\n\n# \u914D\u7F6E B \u7AEF\n# ==========\n# \u751F\u6210\u5BC6\u94A5\u548C\u516C\u94A5\nwg genkey | tee wg0.pri | wg pubkey > wg0.pub\n# \u914D\u7F6E\u7F51\u5361\nip link add wg0 type wireguard\nip addr add 10.0.0.2/24 dev wg0\nwg set wg0 listen-port 51820 private-key wg0.pri\nip link set wg0 up\n\n# A -> B\n# ==========\n# \u5728 B \u6267\u884C - \u5C06\u8F93\u51FA\u7ED3\u679C\u5728 A \u6267\u884C\n# \u5982\u679C B \u6CA1\u6709 A \u80FD\u76F4\u63A5\u8BBF\u95EE\u7684\u5730\u5740 - \u5219\u5FFD\u7565 endpoint\necho wg set wg0 peer $(cat wg0.pub) persistent-keepalive 25 allowed-ips 10.0.0.2/32 endpoint <\u4E3B\u673AB\u5730\u5740>:51820\n\n# B -> A\n# ==========\n# \u5728 A \u6267\u884C - \u5C06\u8F93\u51FA\u7ED3\u679C\u5728 B \u6267\u884C\n# \u5982\u679C A \u6CA1\u6709 B \u80FD\u76F4\u63A5\u8BBF\u95EE\u7684\u5730\u5740 - \u5219\u5FFD\u7565 endpoint\necho wg set wg0 peer $(cat wg0.pub) persistent-keepalive 25 allowed-ips 10.0.0.1/32 endpoint <\u4E3B\u673AA\u5730\u5740>:51820\n\n# \u5728 B \u80FD\u8BBF\u95EE A\nping 10.0.0.1\n"})}),"\n",(0,t.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h3,{id:"\u6865\u63A5\u6216-dhcp",children:"\u6865\u63A5\u6216 DHCP"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["wg \u53EA\u652F\u6301 L3 - TCP/IP\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"DHCP \u9700\u8981 L2 \u5C42 MAC"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u6865\u63A5\u7684\u7F51\u8DEF\u53EF\u4EE5\u8003\u8651\u901A\u8FC7\u8DEF\u7531\u5B9E\u73B0 - ",(0,t.jsx)(n.a,{href:"https://lists.zx2c4.com/pipermail/wireguard/2018-January/002341.html",children:"\u4F8B\u5982"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u5982\u679C\u9700\u8981\u6865\u63A5\u53EF\u4EE5\u8003\u8651 tinc \u7684 switch \u6A21\u5F0F\u6216\u8005 ",(0,t.jsx)(n.a,{href:"https://remote-lab.net/linux-l2tp-ethernet-pseudowires",children:"l2tp"})]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return d},a:function(){return l}});var i=r(75271);let t={},s=i.createContext(t);function l(e){let n=i.useContext(s);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);