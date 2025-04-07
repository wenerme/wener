"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20092"],{86260:function(n,e,t){t.r(e),t.d(e,{metadata:()=>o,contentTitle:()=>i,default:()=>p,assets:()=>a,toc:()=>l,frontMatter:()=>c});var o=JSON.parse('{"id":"service/network/vpn/strongswan/strongswan-cookbook","title":"strongSwan Cookbook","description":"- strongSwan swanctl Tests","source":"@site/../notes/service/network/vpn/strongswan/strongswan-cookbook.md","sourceDirName":"service/network/vpn/strongswan","slug":"/service/network/vpn/strongswan/cookbook","permalink":"/notes/service/network/vpn/strongswan/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/strongswan/strongswan-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"strongSwan Cookbook","tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"strongSwan \u914D\u7F6E","permalink":"/notes/service/network/vpn/strongswan/conf"},"next":{"title":"strongSwan FAQ","permalink":"/notes/service/network/vpn/strongswan/faq"}}'),s=t("52676"),r=t("79938");let c={title:"strongSwan Cookbook",tags:["Cookbook"]},i="strongSwan Cookbook",a={},l=[{value:"\u57FA\u7840 ipsec.conf",id:"\u57FA\u7840-ipsecconf",level:2},{value:"\u57FA\u7840 swanctl.conf",id:"\u57FA\u7840-swanctlconf",level:3}];function d(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"strongswan-cookbook",children:"strongSwan Cookbook"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.strongswan.org/testing/testresults/swanctl/",children:"strongSwan swanctl Tests"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u57FA\u7840-ipsecconf",children:"\u57FA\u7840 ipsec.conf"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ini",children:"config setup\n	# strictcrlpolicy=yes\n	uniqueids = no\n\nconn %default\n	ikelifetime=60m\n	keylife=20m\n	rekeymargin=3m\n	keyingtries=1\n	keyexchange=ikev2\n	authby=secret\n\nconn vpn\n  left=%any\n  leftsourceip=%config\n  # \u8FDC\u7A0B\u5730\u5740\n  right=1.2.3.4\n  rightsubnet=0.0.0.0/0\n  type=tunnel\n  auto=start\n"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"ipsec.secrets"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'# \u5BC6\u94A5\n: PSK "12345678"\n'})}),"\n",(0,s.jsx)(e.h3,{id:"\u57FA\u7840-swanctlconf",children:"\u57FA\u7840 swanctl.conf"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:'connections {\n	vpn {\n		include /etc/swanctl/conf.d/ike_sa_default.conf\n		remote_addrs=1.2.3.4\n		local_addrs=%any\n		vips=0.0.0.0\n		children {\n			vpn {\n				include /etc/swanctl/conf.d/child_sa_default.conf\n				start_action=start\n				remote_ts=0.0.0.0/0\n			}\n		}\n    remote {\n      id="vpn"\n      auth=psk\n    }\n    local {\n      id="vpn"\n      auth=psk\n    }\n	}\n}\npools {\n}\nauthorities {\n}\nsecrets {\n	ike- {\n    id="vpn"\n		secret="12345678"\n	}\n}\n'})})]})}function p(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return c}});var o=t(75271);let s={},r=o.createContext(s);function c(n){let e=o.useContext(r);return o.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),o.createElement(r.Provider,{value:e},n.children)}}}]);