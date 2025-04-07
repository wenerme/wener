"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["1928"],{56696:function(s,n,e){e.r(n),e.d(n,{metadata:()=>i,contentTitle:()=>o,default:()=>a,assets:()=>d,toc:()=>h,frontMatter:()=>r});var i=JSON.parse('{"id":"service/network/proxy/shadowsocks","title":"Shadowsocks","description":"- 2012-04-20 by Clowwindy","source":"@site/../notes/service/network/proxy/shadowsocks.md","sourceDirName":"service/network/proxy","slug":"/service/network/proxy/shadowsocks","permalink":"/notes/service/network/proxy/shadowsocks","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/proxy/shadowsocks.md","tags":[{"inline":true,"label":"Protocol","permalink":"/notes/tags/protocol"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1741576659000,"frontMatter":{"tags":["Protocol"]},"sidebar":"docs","previous":{"title":"redir","permalink":"/notes/service/network/proxy/redir"},"next":{"title":"sing-box","permalink":"/notes/service/network/proxy/sing-box/"}}'),l=e("52676"),c=e("79938");let r={tags:["Protocol"]},o="Shadowsocks",d={},h=[{value:"Awesome",id:"awesome",level:2},{value:"\u534F\u8BAE",id:"protocol",level:2}];function t(s){let n={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...s.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"shadowsocks",children:"Shadowsocks"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"2012-04-20 by Clowwindy"}),"\n",(0,l.jsx)(n.li,{children:"very similar to SOCKS5 but encrypted and simpler"}),"\n",(0,l.jsxs)(n.li,{children:["\u63A8\u8350\u7684\u52A0\u5BC6\u65B9\u5F0F\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Blake3 \u4F5C\u4E3A\u5BC6\u94A5\u751F\u6210\u51FD\u6570\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u539F\u59CB\u9ED8\u8BA4 KDF \u4E3A MD5"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["2022-blake3-aes-128-gcm\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"openssl rand -base64 16"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["2022-blake3-aes-256-gcm\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"openssl rand -base64 32"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"2022-blake3-chacha20-poly1305"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["2022 AEAD / Authenticated Encryption with Associated Data\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u540C\u65F6\u4FDD\u8BC1\u6570\u636E\u7684\u4FDD\u5BC6\u6027\u548C\u5B8C\u6574\u6027\uFF1AAEAD \u5728\u52A0\u5BC6\u6570\u636E\u7684\u540C\u65F6\uFF0C\u8FD8\u80FD\u751F\u6210\u4E00\u4E2A\u8BA4\u8BC1\u6807\u7B7E\uFF08MAC\uFF09\uFF0C\u786E\u4FDD\u6570\u636E\u5728\u4F20\u8F93\u8FC7\u7A0B\u4E2D\u6CA1\u6709\u88AB\u7BE1\u6539\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301\u9644\u52A0\u6570\u636E\uFF1A\u9664\u4E86\u8981\u52A0\u5BC6\u7684\u6570\u636E\uFF0CAEAD \u8FD8\u53EF\u4EE5\u5BF9\u4E00\u4E9B\u4E0D\u9700\u8981\u52A0\u5BC6\u4F46\u9700\u8981\u8BA4\u8BC1\u7684\u6570\u636E\uFF08\u6BD4\u5982\u62A5\u6587\u5934\u90E8\uFF09\u8FDB\u884C\u4FDD\u62A4\uFF0C\u8FD9\u90E8\u5206\u6570\u636E\u79F0\u4E3A\u9644\u52A0\u6570\u636E\uFF08Associated Data\uFF09\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u6297\u7BE1\u6539\u80FD\u529B\uFF1A\u4F7F\u7528 AEAD \u52A0\u5BC6\u7684\u6570\u636E\uFF0C\u5982\u679C\u5728\u4F20\u8F93\u8FC7\u7A0B\u4E2D\u88AB\u4FEE\u6539\uFF0C\u89E3\u5BC6\u65F6\u4F1A\u5931\u8D25\uFF0C\u4ECE\u800C\u4FDD\u8BC1\u4E86\u6570\u636E\u7684\u771F\u5B9E\u6027\u548C\u5B8C\u6574\u6027\u3002"}),"\n",(0,l.jsx)(n.li,{children:"AES-GCM"}),"\n",(0,l.jsx)(n.li,{children:"golang.org/x/crypto/chacha20poly1305"}),"\n",(0,l.jsx)(n.li,{children:"\u907F\u514D DPI"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u5176\u4ED6\u52A0\u5BC6\u65B9\u5F0F\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"aes-256-gcm"}),"\n",(0,l.jsx)(n.li,{children:"aes-128-gcm"}),"\n",(0,l.jsx)(n.li,{children:"chacha20-poly1305 \u6216\u79F0 chacha20-ietf-poly1305"}),"\n",(0,l.jsx)(n.li,{children:"xchacha20-poly1305 \u6216\u79F0 xchacha20-ietf-poly1305"}),"\n",(0,l.jsx)(n.li,{children:"dummy, none, plain"}),"\n",(0,l.jsxs)(n.li,{children:["github.com/shadowsocks/go-shadowsocks2\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"dummy, chacha20-ietf-poly1305, aes-256-gcm, aes-128-gcm"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.del,{children:"github.com/shadowsocks/shadowsocks-go"})," - \u8FD9\u4E9B\u90FD\u5C3D\u91CF\u4E0D\u8981\u7528\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"aes-128-cfb"}),"\n",(0,l.jsx)(n.li,{children:"aes-192-cfb"}),"\n",(0,l.jsx)(n.li,{children:"aes-256-cfb"}),"\n",(0,l.jsx)(n.li,{children:"aes-128-ctr"}),"\n",(0,l.jsx)(n.li,{children:"aes-192-ctr"}),"\n",(0,l.jsx)(n.li,{children:"aes-256-ctr"}),"\n",(0,l.jsx)(n.li,{children:"des-cfb"}),"\n",(0,l.jsx)(n.li,{children:"bf-cfb"}),"\n",(0,l.jsx)(n.li,{children:"cast5-cfb"}),"\n",(0,l.jsx)(n.li,{children:"rc4-md5"}),"\n",(0,l.jsx)(n.li,{children:"rc4-md5-6"}),"\n",(0,l.jsx)(n.li,{children:"chacha20"}),"\n",(0,l.jsx)(n.li,{children:"chacha20-ietf"}),"\n",(0,l.jsx)(n.li,{children:"salsa20"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"2022 \u65B0\u534F\u8BAE\u683C\u5F0F\u63D0\u5347\u4E86\u6027\u80FD\u5E76\u5E26\u6709\u5B8C\u6574\u7684\u91CD\u653E\u4FDD\u62A4"}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u534F\u8BAE ",(0,l.jsx)(n.a,{href:"https://web.archive.org/web/20151204034044/https://shadowsocks.org/en/spec/protocol.html",children:"https://web.archive.org/web/20151204034044/https://shadowsocks.org/en/spec/protocol.html"})]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/Shadowsocks-NET/shadowsocks-specs/blob/main/2022-1-shadowsocks-2022-edition.md",children:"https://github.com/Shadowsocks-NET/shadowsocks-specs/blob/main/2022-1-shadowsocks-2022-edition.md"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"awesome",children:"Awesome"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/database64128/shadowsocks-go",children:"database64128/shadowsocks-go"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Go"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/SagerNet/sing-shadowsocks",children:"SagerNet/sing-shadowsocks"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"GPLv3, Go"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/shadowsocks/go-shadowsocks2",children:"shadowsocks/go-shadowsocks2"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u652F\u6301 2022"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/shadowsocks/shadowsocks-rust",children:"shadowsocks/shadowsocks-rust"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"MIT, Rust"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"protocol",children:"\u534F\u8BAE"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"+--------------+---------------------+------------------+----------+\n| Address Type | Destination Address | Destination Port |   Data   |\n+--------------+---------------------+------------------+----------+\n|      1       |       Variable      |         2        | Variable |\n+--------------+---------------------+------------------+----------+\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["address type\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"1 (IPv4)"}),"\n",(0,l.jsx)(n.li,{children:"4 (IPv6)"}),"\n",(0,l.jsx)(n.li,{children:"3 (hostname)"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Address\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"ipv4 - 32-bit (4-byte) big-endian integer"}),"\n",(0,l.jsx)(n.li,{children:"IPv6 - compact representation (16-byte array)"}),"\n",(0,l.jsx)(n.li,{children:"hostname - 1-byte length + hostname"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"\u7B2C\u4E00\u4E2A Client -> Server \u5305"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"+-------+----------+\n|  IV   | Payload  |\n+-------+----------+\n| Fixed | Variable |\n+-------+----------+\n"})})]})}function a(s={}){let{wrapper:n}={...(0,c.a)(),...s.components};return n?(0,l.jsx)(n,{...s,children:(0,l.jsx)(t,{...s})}):t(s)}},79938:function(s,n,e){e.d(n,{Z:function(){return o},a:function(){return r}});var i=e(75271);let l={},c=i.createContext(l);function r(s){let n=i.useContext(c);return i.useMemo(function(){return"function"==typeof s?s(n):{...n,...s}},[n,s])}function o(s){let n;return n=s.disableParentContext?"function"==typeof s.components?s.components(l):s.components||l:r(s.components),i.createElement(c.Provider,{value:n},s.children)}}}]);