"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["28656"],{22991:function(n,e,d){d.r(e),d.d(e,{metadata:()=>r,contentTitle:()=>i,default:()=>j,assets:()=>l,toc:()=>h,frontMatter:()=>c});var r=JSON.parse('{"id":"dev/format/format-scalar","title":"Scalars","description":"- \u5B57\u7B26\u4E32\u7684\u683C\u5F0F","source":"@site/../notes/dev/format/format-scalar.md","sourceDirName":"dev/format","slug":"/dev/format/scalar","permalink":"/notes/dev/format/scalar","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/format/format-scalar.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1719892411000,"frontMatter":{"title":"Scalars"},"sidebar":"docs","previous":{"title":"Format & Codec Glossary","permalink":"/notes/dev/format/glossary"},"next":{"title":"HTTP Archive format","permalink":"/notes/dev/format/har"}}'),s=d("52676"),t=d("79938");let c={title:"Scalars"},i="Scalar Formats",l={},h=[];function x(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"scalar-formats",children:"Scalar Formats"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u5B57\u7B26\u4E32\u7684\u683C\u5F0F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"stringify"}),"\n",(0,s.jsx)(e.li,{children:"parse"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"format"}),(0,s.jsx)(e.th,{children:"example"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Structure Data"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"JSON"}),(0,s.jsxs)(e.td,{children:[(0,s.jsx)(e.code,{children:"[]"}),",",(0,s.jsx)(e.code,{children:"{}"}),",",(0,s.jsx)(e.code,{children:"null"})]})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"JSONObject"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"{}"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"XML"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"<tag>value</tag>"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Primative"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"String"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:'"string"'})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Number"}),(0,s.jsxs)(e.td,{children:[(0,s.jsx)(e.code,{children:"1"}),",",(0,s.jsx)(e.code,{children:"1.1"})]})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Boolean"}),(0,s.jsxs)(e.td,{children:[(0,s.jsx)(e.code,{children:"true"}),",",(0,s.jsx)(e.code,{children:"false"})]})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"NULL"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"null"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Undefined"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"undefined"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Collection"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Array/Set/Map"}),(0,s.jsxs)(e.td,{children:[(0,s.jsx)(e.code,{children:"[]"}),", ",(0,s.jsx)(e.code,{children:"{}"})]})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Temporal"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Duration"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"1h30m"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Timestamp"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"DateTime"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"2021-01-01T00:00:00Z"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Date"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"2021-01-01"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Spec/Std"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"CountryCode"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"US"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Currency"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"USD"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"TimeZone/Offset"}),(0,s.jsxs)(e.td,{children:[(0,s.jsx)(e.code,{children:"Asia/Shanghai"}),", ",(0,s.jsx)(e.code,{children:"+08:00"}),", ",(0,s.jsx)(e.code,{children:"CST"}),", ",(0,s.jsx)(e.code,{children:"UTC+8"})]})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"ID/Key"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"CUID"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"cjo2j3n4k0000z1zj1z1z1z1z"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ULID"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"01D3XZ6Z1E4QZQZQZQZQZQZQZQ"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"UUID"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"550e8400-e29b-41d4-a716-446655440000"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"DID"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"did:example:123456"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LanguageCode"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"en"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"DeweyDecimal"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"123.456"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"HexColor"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"#ff0000"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"Hexadecimal"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"0xff0000"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ISBN"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"978-3-16-148410-0"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"MD5"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"d41d8cd98f00b204e9800998ecf8427e"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.strong,{children:"Network"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"IPV4"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"1.1.1.1"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"IPV6"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"2001:0db8:85a3:0000:0000:8a2e:0370:7334"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"CIDR"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"1.1.1.1/24"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"MAC"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"00:11:22:33:44:55"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"URL"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"https://example.com"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"URI"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"URN"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"urn:isbn:0451450523"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"UserAgent"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"})})]})]})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["CUID ",(0,s.jsx)(e.a,{href:"https://github.com/paralleldrive/cuid",children:"https://github.com/paralleldrive/cuid"})]}),"\n",(0,s.jsxs)(e.li,{children:["Currency ",(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/ISO_4217",children:"https://en.wikipedia.org/wiki/ISO_4217"})]}),"\n",(0,s.jsxs)(e.li,{children:["CountryCode ",(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2",children:"https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"})]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://the-guild.dev/graphql/scalars/docs/scalars/account-number",children:"https://the-guild.dev/graphql/scalars/docs/scalars/account-number"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/datatype.html",children:"https://www.postgresql.org/docs/current/datatype.html"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(x,{...n})}):x(n)}},79938:function(n,e,d){d.d(e,{Z:function(){return i},a:function(){return c}});var r=d(75271);let s={},t=r.createContext(s);function c(n){let e=r.useContext(t);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),r.createElement(t.Provider,{value:e},n.children)}}}]);