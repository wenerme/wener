"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["84486"],{7820:function(n,e,r){r.r(e),r.d(e,{metadata:()=>s,contentTitle:()=>o,default:()=>p,assets:()=>c,toc:()=>l,frontMatter:()=>a});var s=JSON.parse('{"id":"service/network/vpn/strongswan/strongswan-faq","title":"strongSwan FAQ","description":"no IDi configured, fall back on IP address","source":"@site/../notes/service/network/vpn/strongswan/strongswan-faq.md","sourceDirName":"service/network/vpn/strongswan","slug":"/service/network/vpn/strongswan/faq","permalink":"/notes/service/network/vpn/strongswan/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/strongswan/strongswan-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"strongSwan FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"strongSwan Cookbook","permalink":"/notes/service/network/vpn/strongswan/cookbook"},"next":{"title":"tailscale","permalink":"/notes/service/network/vpn/tailscale"}}'),t=r("52676"),i=r("79938");let a={title:"strongSwan FAQ",tags:["FAQ"]},o="strongSwan FAQ",c={},l=[{value:"no IDi configured, fall back on IP address",id:"no-idi-configured-fall-back-on-ip-address",level:2},{value:"ipsec.conf \u81EA\u52A8\u91CD\u8FDE",id:"ipsecconf-\u81EA\u52A8\u91CD\u8FDE",level:2},{value:"peer didn&#39;t accept DH group ECP_256, it requested MODP_2048",id:"peer-didnt-accept-dh-group-ecp_256-it-requested-modp_2048",level:2},{value:"giving up after 5 retransmits",id:"giving-up-after-5-retransmits",level:2},{value:"virtual ip \u603B\u662F\u8FD4\u56DE\u540C\u4E00\u4E2A",id:"virtual-ip-\u603B\u662F\u8FD4\u56DE\u540C\u4E00\u4E2A",level:2},{value:"\u591A\u4E2A\u5BA2\u6237\u7AEF\u8BBF\u95EE\u4F1A\u6389",id:"\u591A\u4E2A\u5BA2\u6237\u7AEF\u8BBF\u95EE\u4F1A\u6389",level:2}];function d(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"strongswan-faq",children:"strongSwan FAQ"})}),"\n",(0,t.jsx)(e.h2,{id:"no-idi-configured-fall-back-on-ip-address",children:"no IDi configured, fall back on IP address"}),"\n",(0,t.jsx)(e.h2,{id:"ipsecconf-\u81EA\u52A8\u91CD\u8FDE",children:"ipsec.conf \u81EA\u52A8\u91CD\u8FDE"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ini",children:"# \u542F\u52A8\u81EA\u52A8\u542F\u52A8\nauto=start\n\ndpdaction=restart\ncloseaction=restart\nkeyingtries=%forever\n"})}),"\n",(0,t.jsx)(e.h2,{id:"peer-didnt-accept-dh-group-ecp_256-it-requested-modp_2048",children:"peer didn't accept DH group ECP_256, it requested MODP_2048"}),"\n",(0,t.jsx)(e.p,{children:"\u6CE8\u610F\u9009\u62E9 cipher suit, \u5982\u679C\u670D\u52A1\u7AEF\u4E0D\u652F\u6301\u5219\u4F1A\u51FA\u73B0\u8BE5\u5F02\u5E38"}),"\n",(0,t.jsx)(e.p,{children:"ipsec \u4F7F\u7528 aes128-sha256 AES_CBC_128/HMAC_SHA1_96, \u4F46 swanctl \u4E0D\u4F1A\u4F18\u5148\u5C1D\u8BD5\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u4E4B\u540E\u4F1A\u4ECE\u65B0\u9009\u62E9"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"selected proposal: IKE:AES_CBC_128/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_2048\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"ipsec.conf \u914D\u7F6E esp \u6216\u8005 ah"}),"\n",(0,t.jsx)(e.li,{children:"swanctl.conf \u914D\u7F6E esp_proposal"}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"giving-up-after-5-retransmits",children:"giving up after 5 retransmits"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"12[IKE] establishing IKE_SA failed, peer not responding\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"ipsec.conf"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ini",children:"dpdaction=restart\nretransmit_tries=5\n# default 3\nkeyingtries=%forever\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"swanctl.conf"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"connections {\n  conn {\n    # default 1\n    keyingtries=0\n    children {\n      child {\n        dpd_action=start\n      }\n    }\n  }\n}\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://wiki.strongswan.org/issues/2665",children:"https://wiki.strongswan.org/issues/2665"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"virtual-ip-\u603B\u662F\u8FD4\u56DE\u540C\u4E00\u4E2A",children:"virtual ip \u603B\u662F\u8FD4\u56DE\u540C\u4E00\u4E2A"}),"\n",(0,t.jsx)(e.p,{children:"\u4FEE\u6539 id \u4F1A\u8FD4\u56DE\u4E0D\u540C ip"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"connections {\n  vpn {\n    remote {\n      id=vpnx\n      auth=psk\n    }\n    local {\n      # \u4F7F\u7528\u4E0D\u540C ID\n      id=vpnx\n      auth=psk\n    }\n  }\n"})}),"\n",(0,t.jsx)(e.h2,{id:"\u591A\u4E2A\u5BA2\u6237\u7AEF\u8BBF\u95EE\u4F1A\u6389",children:"\u591A\u4E2A\u5BA2\u6237\u7AEF\u8BBF\u95EE\u4F1A\u6389"}),"\n",(0,t.jsx)(e.p,{children:"\u68C0\u67E5\u662F\u4E0D\u662F id \u76F8\u540C\uFF0C\u83B7\u53D6\u5230\u7684 vip \u76F8\u540C\uFF0C\u5BFC\u81F4\u4E00\u4E2A\u4E0A\u53E6\u5916\u4E00\u4E2A\u4F1A\u88AB\u6324\u4E0B\u53BB\u3002"})]})}function p(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return o},a:function(){return a}});var s=r(75271);let t={},i=s.createContext(t);function a(n){let e=s.useContext(i);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:a(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);