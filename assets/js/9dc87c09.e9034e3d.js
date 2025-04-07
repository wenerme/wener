"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["37061"],{91226:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>d,default:()=>u,assets:()=>c,toc:()=>o,frontMatter:()=>l});var r=JSON.parse('{"id":"service/network/vpn/netbird","title":"netbird","description":"- netbirdio/netbird","source":"@site/../notes/service/network/vpn/netbird.md","sourceDirName":"service/network/vpn","slug":"/service/network/vpn/netbird","permalink":"/notes/service/network/vpn/netbird","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/netbird.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"netbird"},"sidebar":"docs","previous":{"title":"nebula","permalink":"/notes/service/network/vpn/nebula"},"next":{"title":"sshuttle","permalink":"/notes/service/network/vpn/sshuttle"}}'),t=i("52676"),s=i("79938");let l={title:"netbird"},d="netbird",c={},o=[];function a(e){let n={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"netbird",children:"netbird"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/netbirdio/netbird",children:"netbirdio/netbird"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"BSD-3, Go"}),"\n",(0,t.jsx)(n.li,{children:"\u4E4B\u524D\u53EB wiretrustee"}),"\n",(0,t.jsx)(n.li,{children:"\u57FA\u4E8E WebRTC, STUN, TURN \u7684 P2P \u7F51\u7EDC\u901A\u9053"}),"\n",(0,t.jsx)(n.li,{children:"P2P - WireGuard+WebRTC"}),"\n",(0,t.jsx)(n.li,{children:"\u652F\u6301  relay"}),"\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528 OIDC \u767B\u9646"}),"\n",(0,t.jsxs)(n.li,{children:["WebUI\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/netbirdio/dashboard",children:"netbirdio/dashboard"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"BSD-3, TS, React, AndD"}),"\n",(0,t.jsx)(n.li,{children:"WebUI"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u5E73\u53F0\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u7BA1\u7406\u670D\u52A1 - api.wiretrustee.com"}),"\n",(0,t.jsx)(n.li,{children:"Signal - signal2.wiretrustee.com"}),"\n",(0,t.jsx)(n.li,{children:"Relay/TURN - turn.netbird.io"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--disable-anonymous-metrics=true"})}),"\n",(0,t.jsxs)(n.li,{children:["\u7BA1\u7406\u670D\u52A1\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6CE8\u518C\u3001\u8BA4\u8BC1"}),"\n",(0,t.jsx)(n.li,{children:"\u7F51\u7EDC Map"}),"\n",(0,t.jsx)(n.li,{children:"\u7BA1\u7406 IP \u5730\u5740"}),"\n",(0,t.jsx)(n.li,{children:"\u540C\u6B65\u7F51\u7EDC\u5230 Peer"}),"\n",(0,t.jsx)(n.li,{children:"\u7BA1\u7406 ACLs"}),"\n",(0,t.jsx)(n.li,{children:"\u7BA1\u7406 DNS"}),"\n",(0,t.jsx)(n.li,{children:"\u76D1\u63A7"}),"\n",(0,t.jsx)(n.li,{children:"Wgireguard key rotation"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsxs)(n.del,{children:["\u76EE\u524D\u5F3A\u5236\u4F9D\u8D56 Auth0 ",(0,t.jsx)(n.a,{href:"https://github.com/netbirdio/netbird/issues/126",children:"#126"})]})}),"\n",(0,t.jsxs)(n.li,{children:["\u76EE\u524D\u6CA1\u6709 iOS & Android \u5E94\u7528 - ",(0,t.jsx)(n.a,{href:"https://github.com/netbirdio/netbird/issues/115",children:"#115"})]}),"\n",(0,t.jsx)(n.li,{children:"\u4F9D\u8D56\u5916\u90E8 STUN \u548C TURN"}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo wiretrustee init \\\n  --stunURLs stun:stun.wiretrustee.com:3468,stun:stun.l.google.com:19302 \\\n  --turnURLs <TURN User>:<TURN password>@turn:stun.wiretrustee.com:3468  \\\n  --signalAddr signal.wiretrustee.com:10000  \\\n  --wgLocalAddr 10.30.30.1/24  \\\n  --log-level info\n\nsudo wiretrustee add-peer --allowedIPs 10.30.30.2/32 --key '<REMOTE PEER WIREUARD PUBLIC KEY>'\nsudo wiretrustee up --log-level info\n\nwiretrustee signal --log-level INFO\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Docker\ndocker run -it --rm \\\n  -p 80:80 -p 443:443 \\\n  -e AUTH0_DOMAIN=<SET YOUR AUTH DOMAIN> \\\n  -e AUTH0_CLIENT_ID=<SET YOUR CLIENT ID> \\\n  -e AUTH0_AUDIENCE=<SET YOUR AUDIENCE> \\\n  -e WIRETRUSTEE_MGMT_API_ENDPOINT=<SET YOUR MANAGEMETN API URL> \\\n  --name wiretrustee-dashboard wiretrustee/dashboard:main\n"})})]})}function u(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return d},a:function(){return l}});var r=i(75271);let t={},s=r.createContext(t);function l(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);