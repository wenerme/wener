"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["79774"],{87629:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>i,default:()=>a,assets:()=>c,toc:()=>o,frontMatter:()=>d});var r=JSON.parse('{"id":"service/dns/dns-over-https","title":"DNS over HTTPS","description":"- rfc8484","source":"@site/../notes/service/dns/dns-over-https.md","sourceDirName":"service/dns","slug":"/service/dns/over-https","permalink":"/notes/service/dns/over-https","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/dns/dns-over-https.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"DNS over HTTPS"},"sidebar":"docs","previous":{"title":"DNS \u8BCD\u6C47","permalink":"/notes/service/dns/glossary"},"next":{"title":"DNS Records","permalink":"/notes/service/dns/rr"}}'),t=s("52676"),l=s("79938");let d={title:"DNS over HTTPS"},i="DoH",c={},o=[{value:"Wireformat",id:"wireformat",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"doh",children:"DoH"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc8484",children:"rfc8484"})}),"\n",(0,t.jsxs)(n.li,{children:["Server\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://dns.cloudflare.com/dns-query",children:"https://dns.cloudflare.com/dns-query"})," \u88AB\u5899"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://dns.alidns.com/dns-query",children:"https://dns.alidns.com/dns-query"})," \u4E0D\u652F\u6301 application/dns+json"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://adh.avpclub.gq/dns-query",children:"https://adh.avpclub.gq/dns-query"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://dns.futa.gg/dns-query",children:"https://dns.futa.gg/dns-query"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://1.1.1.1/dns-query",children:"https://1.1.1.1/dns-query"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://1.0.0.1/dns-query",children:"https://1.0.0.1/dns-query"})}),"\n",(0,t.jsx)(n.li,{children:"dns.cloudflare.com"}),"\n",(0,t.jsx)(n.li,{children:"dns.google.com"}),"\n",(0,t.jsx)(n.li,{children:"9.9.9.9"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Client\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["macOS 11 Big Sur+\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://apple.nextdns.io",children:"https://apple.nextdns.io"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"/notes/service/dns/dnscrypt",children:"dnscrypt-proxy"})," - \u4EE3\u7406 - DoH -> DNS"]}),"\n",(0,t.jsxs)(n.li,{children:["Chrome\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"chrome://settings/security -> Use Secure DNS"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Browser ",(0,t.jsx)(n.a,{href:"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/",children:"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://dns.google",children:"https://dns.google"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/curl/curl/wiki/DNS-over-HTTPS",children:"https://github.com/curl/curl/wiki/DNS-over-HTTPS"})}),"\n",(0,t.jsxs)(n.li,{children:["wikipedia ",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/DNS_over_HTTPS",children:"DNS-over-HTTPS"})]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developers.google.com/speed/public-dns/docs/doh",children:"https://developers.google.com/speed/public-dns/docs/doh"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# curl \u4F7F\u7528 DoT \u89E3\u6790\ncurl --doh-url https://dns.cloudflare.com/dns-query https://wener.me\n# \u76F4\u63A5\u89E3\u6790\ncurl -s -H 'accept: application/dns-json' 'https://dns.cloudflare.com/dns-query?name=wener.me&type=A' | jq\ncurl -s -H 'accept: application/dns+json' 'https://dns.google.com/resolve?name=wener.me&type=A' | jq\n# \u4E0D\u652F\u6301\ncurl -s -H 'accept: application/dns-json' 'https://dns.alidns.com/dns-query?name=wener.me&type=A'\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cloudflared proxy-dns --port 5553\n\ndig +short @127.0.0.1 -p5553 cloudflare.com AAAA\n\ndnscrypt-proxy -resolve cloudflare-dns.com\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="/etc/cloudflared/config.yaml"'})}),"\n",(0,t.jsx)(n.h2,{id:"wireformat",children:"Wireformat"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6700\u5927 65535 bytes"}),"\n",(0,t.jsx)(n.li,{children:"base64url encode"}),"\n",(0,t.jsx)(n.li,{children:"binary \u540C DNS over UDP - rfc1035"}),"\n",(0,t.jsxs)(n.li,{children:["?dns\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"application/dns-message"}),"\n",(0,t.jsxs)(n.li,{children:["\u683C\u5F0F ",(0,t.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc1035",children:"https://datatracker.ietf.org/doc/html/rfc1035"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/",children:"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/"})}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return i},a:function(){return d}});var r=s(75271);let t={},l=r.createContext(t);function d(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);