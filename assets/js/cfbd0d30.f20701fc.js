"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48191"],{92539:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>r,default:()=>j,assets:()=>h,toc:()=>c,frontMatter:()=>d});var s=JSON.parse('{"id":"algorithm/base","title":"BaseN","description":"- \u6570\u5B57 0-9 - 10 \u4E2A\u5B57\u7B26","source":"@site/../notes/algorithm/base.md","sourceDirName":"algorithm","slug":"/algorithm/base","permalink":"/notes/algorithm/base","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/algorithm/base.md","tags":[{"inline":true,"label":"Codec","permalink":"/notes/tags/codec"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1723961178000,"frontMatter":{"title":"BaseN","tags":["Codec"]},"sidebar":"docs","previous":{"title":"Algorithm Awesome","permalink":"/notes/algorithm/awesome"},"next":{"title":"BCrypt","permalink":"/notes/algorithm/bcrypt"}}'),i=t("52676"),l=t("79938");let d={title:"BaseN",tags:["Codec"]},r="BaseN",h={},c=[{value:"base64 vs base64url",id:"base64-vs-base64url",level:2}];function x(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"basen",children:"BaseN"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u6570\u5B57 0-9 - 10 \u4E2A\u5B57\u7B26"}),"\n",(0,i.jsx)(e.li,{children:"\u5B57\u6BCD a-z - 26 \u4E2A\u5B57\u7B26,\u5927\u5199 A-Z 26 \u4E2A\u5B57\u7B26"}),"\n",(0,i.jsx)(e.li,{children:"26+26+10=62 \u4E2A\u5B57\u7B26"}),"\n",(0,i.jsx)(e.li,{children:"MIME 76 \u6BCF\u884C"}),"\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://datatracker.ietf.org/doc/html/rfc4648",children:"rfc4648"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Base16, Base32, Base64"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://www.rfc-editor.org/rfc/rfc9285.html",children:"rfc9285"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"base45 for QR"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Binary-to-text_encoding",children:"Binary to text encoding"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.crockford.com/base32.html",children:"crockford base32"})}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://github.com/ilyakurdyukov/crzy64",children:"ilyakurdyukov/crzy64"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"An easy to decode base64 modification"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"BaseN"}),(0,i.jsx)(e.th,{style:{textAlign:"right"},children:"eff"}),(0,i.jsx)(e.th,{children:"chars"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base10"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~42%"}),(0,i.jsx)(e.td,{children:"0-9"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base16"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"50%"}),(0,i.jsx)(e.td,{children:"0-9A-F"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base32"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"62.5%"}),(0,i.jsxs)(e.td,{children:[(0,i.jsx)(e.code,{children:"0-9A-V"}),",",(0,i.jsx)(e.code,{children:"2-7A-Z"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base36"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~64%"}),(0,i.jsx)(e.td,{children:"0-9A-Z"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base64"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"3/4, 75%"}),(0,i.jsxs)(e.td,{children:[(0,i.jsx)(e.code,{children:"0-9A-Za-z+/"}),".",(0,i.jsx)(e.code,{children:"0-9A-Za-z-_"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"Base85"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"4/5, 80%"}),(0,i.jsx)(e.td,{})]})]})]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Base10=Decimal"}),"\n",(0,i.jsxs)(e.li,{children:["Base64 \u5E38\u89C1\u8865\u5145\u5B57\u7B26\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"+"}),",",(0,i.jsx)(e.code,{children:"/"})," - \u5927\u591A\u6570\u573A\u666F"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"-"}),",",(0,i.jsx)(e.code,{children:"_"})," - URL \u5B89\u5168"]}),"\n",(0,i.jsx)(e.li,{children:"Pad \u901A\u5E38\u4F7F\u7528 ="}),"\n",(0,i.jsx)(e.li,{children:"3/4 - \u6570\u636E\u957F\u5EA6\u4E3A 3 \u7684\u500D\u6570\u5219\u4E0D\u4F1A\u6709 Padding"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Base85=Ascii85\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"big-endian"}),"\n",(0,i.jsx)(e.li,{children:"used by ZMODEM, Adobe PostScript, PDF, Git Binary Patch"}),"\n",(0,i.jsx)(e.li,{children:"Z85 - ZeroMQ Base-85"}),"\n",(0,i.jsxs)(e.li,{children:["Base85 RFC1924 62 ",(0,i.jsx)(e.code,{children:"0\u20139A\u2013Za\u2013z"})," + 23 ",(0,i.jsx)(e.code,{children:"!#$%&()*+-;<=>?@^_`{|}~"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u5E38\u89C1\u89C6\u89C9\u6DF7\u6DC6\u5B57\u7B26\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"0,o,O"}),"\n",(0,i.jsx)(e.li,{children:"1,l,I,i,j"}),"\n",(0,i.jsx)(e.li,{children:"2,z,Z"}),"\n",(0,i.jsx)(e.li,{children:"5,s,S"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"bits"}),(0,i.jsx)(e.th,{children:"byte"}),(0,i.jsx)(e.th,{children:"hex"}),(0,i.jsx)(e.th,{style:{textAlign:"right"},children:"b32"}),(0,i.jsx)(e.th,{style:{textAlign:"right"},children:"b64"}),(0,i.jsx)(e.th,{children:"e.g."})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"32"}),(0,i.jsx)(e.td,{children:"4"}),(0,i.jsx)(e.td,{children:"8"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~7"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~7"}),(0,i.jsx)(e.td,{children:"int"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"64"}),(0,i.jsx)(e.td,{children:"8"}),(0,i.jsx)(e.td,{children:"16"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~13"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~11"}),(0,i.jsx)(e.td,{children:"timestamp,long"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"128"}),(0,i.jsx)(e.td,{children:"16"}),(0,i.jsx)(e.td,{children:"32"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"26"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~22"}),(0,i.jsx)(e.td,{children:"md5"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"160"}),(0,i.jsx)(e.td,{children:"20"}),(0,i.jsx)(e.td,{children:"40"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"32"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~27"}),(0,i.jsx)(e.td,{children:"sha1,uuid"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"224"}),(0,i.jsx)(e.td,{children:"28"}),(0,i.jsx)(e.td,{children:"56"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~45"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~38"}),(0,i.jsx)(e.td,{children:"sha2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"256"}),(0,i.jsx)(e.td,{children:"32"}),(0,i.jsx)(e.td,{children:"64"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~52"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~43"}),(0,i.jsx)(e.td,{children:"sha2-256"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"320"}),(0,i.jsx)(e.td,{}),(0,i.jsx)(e.td,{}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{children:"RIPEMD-320"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"384"}),(0,i.jsx)(e.td,{children:"48"}),(0,i.jsx)(e.td,{children:"96"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~77"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"64"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"512"}),(0,i.jsx)(e.td,{children:"64"}),(0,i.jsx)(e.td,{children:"128"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~103"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"~86"}),(0,i.jsx)(e.td,{children:"whirlpool"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"1024"}),(0,i.jsx)(e.td,{children:"128"}),(0,i.jsx)(e.td,{children:"256"}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"1280"}),(0,i.jsx)(e.td,{children:"160"}),(0,i.jsx)(e.td,{children:"320"}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"256"}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"1536"}),(0,i.jsx)(e.td,{children:"192"}),(0,i.jsx)(e.td,{children:"384"}),(0,i.jsx)(e.td,{style:{textAlign:"right"}}),(0,i.jsx)(e.td,{style:{textAlign:"right"},children:"256"}),(0,i.jsx)(e.td,{})]})]})]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"byte=bits/8"}),"\n",(0,i.jsx)(e.li,{children:"hex=bits/8/0.5=bits/4"}),"\n",(0,i.jsx)(e.li,{children:"base32=bits/8/0.625"}),"\n",(0,i.jsx)(e.li,{children:"base64=bits/8/0.75=bits/6"}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u5E38\u89C1"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"type"}),(0,i.jsx)(e.th,{children:"bits"}),(0,i.jsx)(e.th,{children:"bytes"}),(0,i.jsx)(e.th,{children:"string"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"uuid"}),(0,i.jsx)(e.td,{children:"128"}),(0,i.jsx)(e.td,{children:"16"}),(0,i.jsx)(e.td,{children:"36=32+4"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"sha1"}),(0,i.jsx)(e.td,{children:"160"}),(0,i.jsx)(e.td,{children:"20"}),(0,i.jsx)(e.td,{children:"hex 40"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"md5"}),(0,i.jsx)(e.td,{children:"128"}),(0,i.jsx)(e.td,{children:"16"}),(0,i.jsx)(e.td,{children:"hex 32"})]})]})]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"UUID - 1 million, bytes \u8282\u7701 20MB"}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(e.h2,{id:"base64-vs-base64url",children:"base64 vs base64url"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["base64 - ",(0,i.jsx)(e.code,{children:"+/,"})]}),"\n",(0,i.jsxs)(e.li,{children:["base64url - ",(0,i.jsx)(e.code,{children:"-_,"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"URL \u4E0D\u9700\u8981 escape"}),"\n"]}),"\n"]}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(x,{...n})}):x(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return r},a:function(){return d}});var s=t(75271);let i={},l=s.createContext(i);function d(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);