"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["55195"],{54941:function(e,n,s){s.r(n),s.d(n,{metadata:()=>a,contentTitle:()=>d,default:()=>h,assets:()=>l,toc:()=>t,frontMatter:()=>i});var a=JSON.parse('{"id":"service/dns/acme-dns","title":"acme-dns","description":"- joohoi/acme-dns \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/dns/acme-dns.md","sourceDirName":"service/dns","slug":"/service/dns/acme-dns","permalink":"/notes/service/dns/acme-dns","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/dns/acme-dns.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1739770930000,"frontMatter":{"title":"acme-dns"},"sidebar":"docs","previous":{"title":"DNS Service","permalink":"/notes/service/dns/"},"next":{"title":"AdGuard","permalink":"/notes/service/dns/adguard"}}'),c=s("52676"),r=s("79938");let i={title:"acme-dns"},d="acme-dns",l={},t=[{value:"API",id:"api",level:2},{value:"cert-manager",id:"cert-manager",level:2}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"acme-dns",children:"acme-dns"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"https://github.com/joohoi/acme-dns",children:"joohoi/acme-dns"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u4E13\u95E8\u7528\u4E8E\u8F85\u52A9\u7533\u8BF7 cert \u7684 dns \u670D\u52A1 - \u63D0\u4F9B HTTP \u63A5\u53E3"}),"\n",(0,c.jsxs)(n.li,{children:["\u5C06\u73B0\u6709 ",(0,c.jsx)(n.code,{children:"_acme-challenge.domain.tld."})," CNAME \u5230\u4ECE\u8BE5\u670D\u52A1\u7533\u8BF7\u7684\u4E8C\u7EA7\u57DF\u540D - \u4F8B\u5982 ",(0,c.jsx)(n.code,{children:"abc.auth.example.org"})]}),"\n",(0,c.jsx)(n.li,{children:"\u907F\u514D\u64CD\u4F5C\u73B0\u6709 DNS \u670D\u52A1"}),"\n",(0,c.jsxs)(n.li,{children:["\u652F\u6301 selfhost - acme-dns.io \u56FD\u5185\u4E0D\u4E00\u5B9A\u80FD\u8BBF\u95EE\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u652F\u6301 SQLite3 \u548C PostgreSQL"}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.li,{children:"\u9002\u7528\u4E8E\u5355\u4E2A\u57DF\u540D\u9700\u8981\u8BC1\u4E66\uFF0C\u57DF\u540D\u4F7F\u7528\u7684\u5916\u90E8 DNS \u670D\u52A1\u4E14\u6307\u5411\u7684\u5185\u90E8 IP"}),"\n",(0,c.jsxs)(n.li,{children:["\u9002\u7528\u4E8E\u6CDB\u57DF\u540D\u8BC1\u4E66 - ",(0,c.jsx)(n.code,{children:"domain.tld"}),", ",(0,c.jsx)(n.code,{children:"*.domain.tld"})]}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["\u652F\u6301\u5BA2\u6237\u7AEF\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/Neilpang/acme.sh",children:"acme.sh"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/webprofusion/certify",children:"Certify The Web"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/jetstack/cert-manager",children:"cert-manager"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/xenolf/lego",children:"Lego"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/rmbolger/Posh-ACME",children:"Posh-ACME"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/komuw/sewer",children:"Sewer"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://github.com/containous/traefik",children:"Traefik"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://www.win-acme.com",children:"Windows ACME Simple (WACS)"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.admonition,{title:"\u4E00\u4E2A\u8D26\u53F7\u5BF9\u5E94\u4E00\u4E2A\u57DF\u540D",type:"caution",children:(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["\u56E0\u4E3A\u4E00\u4E2A\u8D26\u53F7\u53EA\u80FD\u5904\u7406\u4E24\u4E2A record - ",(0,c.jsx)(n.code,{children:"domain.tld"}),",",(0,c.jsx)(n.code,{children:"*.domain.tld"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:"\u4E0D\u80FD"})," \u5171\u4EAB\u8D26\u53F7\u7ED9\u4E0D\u540C\u57DF\u540D"]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"https://github.com/joohoi/acme-dns/issues/110",children:"#110"})," Allow more than two records?"]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"https://github.com/joohoi/acme-dns/issues/233",children:"#233"})," Register multiple domains under single login?"]}),"\n"]})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",metastring:'title="\u6CE8\u518C\u751F\u6210\u8D26\u53F7"',children:"curl -sX POST https://auth.acme-dns.io/register | jq\n"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "username": "6f449871-18d4-4239-851c-8c221d56750f",\n  "password": "1lBTiQ5MowHC1aJ1QmAYJh9PEe5dljFTEk0zXXJv",\n  "fulldomain": "96afb9f9-93c2-4d3c-ad4a-e2ebfbf14f7b.auth.acme-dns.io",\n  "subdomain": "96afb9f9-93c2-4d3c-ad4a-e2ebfbf14f7b",\n  "allowfrom": []\n}\n'})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-pre",metastring:'title="\u6DFB\u52A0\u57DF\u540D\u6620\u5C04"',children:"_acme-challenge.domain.tld 6f449871-18d4-4239-851c-8c221d56750f.auth.acme-dns.io\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u81F3\u6B64 \u53EF\u4EE5\u914D\u7F6E\u5DE5\u5177 \u83B7\u53D6\u6CDB\u57DF\u540D\u8BC1\u4E66\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"dig CNAME _acme-challenge.domain.tld # \u68C0\u6D4B CNAME \u6B63\u786E\ndig TXT _acme-challenge.domain.tld   # \u68C0\u6D4B\u6B63\u786E\u8BBE\u7F6E challenge\n"})}),"\n",(0,c.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker run --rm --name acmedns \\\n  -p 53:53 \\\n  -p 53:53/udp \\\n  -p 80:80 \\\n  -v /path/to/your/config:/etc/acme-dns:ro \\\n  -v /path/to/your/data:/var/lib/acme-dns \\\n  -d joohoi/acme-dns\n"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-http",children:"POST /register\n"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "allowfrom": ["0.0.0.0/0"]\n}\n'})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "allowfrom": ["192.168.100.1/24", "1.2.3.4/32", "2002:c0a8:2a00::0/40"],\n  "fulldomain": "8e5700ea-a4bf-41c7-8a77-e990661dcc6a.auth.acme-dns.io",\n  "password": "htB9mR9DYgcu9bX_afHF62erXaH2TS7bg9KW3F7Z",\n  "subdomain": "8e5700ea-a4bf-41c7-8a77-e990661dcc6a",\n  "username": "c36f50e8-4632-44f0-83fe-e070fef28a10"\n}\n'})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-http",children:"POST /update\nX-Api-User:\nX-Api-Key:\n"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "subdomain": "8e5700ea-a4bf-41c7-8a77-e990661dcc6a",\n  "txt": "___validation_token_received_from_the_ca___"\n}\n'})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",children:'{\n  "txt": "___validation_token_received_from_the_ca___"\n}\n'})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-http",children:"GET /health\n"})}),"\n",(0,c.jsx)(n.h2,{id:"cert-manager",children:"cert-manager"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-yaml",children:"apiVersion: cert-manager.io/v1\nkind: Issuer\nmetadata:\n  name: example-issuer\nspec:\n  acme:\n    solvers:\n      - dns01:\n          acmeDNS:\n            host: https://acme.example.com\n            accountSecretRef:\n              name: acme-dns\n              key: acme-dns.json\n"})}),"\n",(0,c.jsx)(n.p,{children:"acme-dns.json \u652F\u6301\u914D\u7F6E\u591A\u4E2A\u57DF\u540D"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-json",metastring:'title="acme-dns.json"',children:'{\n  "dev.wener.me": {\n    "username": "00000000-0000-0000-0000-000000000000",\n    "password": "",\n    "fulldomain": "00000000-0000-0000-0000-000000000000.auth.acme-dns.io",\n    "subdomain": "00000000-0000-0000-0000-000000000000",\n    "allowfrom": []\n  },\n  "test.wener.me": {\n    "username": "00000000-0000-0000-0000-000000000000",\n    "password": "",\n    "fulldomain": "00000000-0000-0000-0000-000000000000.auth.acme-dns.io",\n    "subdomain": "00000000-0000-0000-0000-000000000000",\n    "allowfrom": []\n  }\n}\n'})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return d},a:function(){return i}});var a=s(75271);let c={},r=a.createContext(c);function i(e){let n=a.useContext(r);return a.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);