"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["42908"],{76802:function(n,e,i){i.r(e),i.d(e,{metadata:()=>t,contentTitle:()=>d,default:()=>o,assets:()=>c,toc:()=>a,frontMatter:()=>l});var t=JSON.parse('{"id":"service/auth/auth-glossary","title":"\u8BCD\u6C47","description":"| abbr. | stand for              | mean               |","source":"@site/../notes/service/auth/auth-glossary.md","sourceDirName":"service/auth","slug":"/service/auth/glossary","permalink":"/notes/service/auth/glossary","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/auth/auth-glossary.md","tags":[{"inline":true,"label":"Glossary","permalink":"/notes/tags/glossary"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1739157197000,"frontMatter":{"title":"\u8BCD\u6C47","tags":["Glossary"]},"sidebar":"docs","previous":{"title":"\u8BA4\u8BC1\u6388\u6743\u5E38\u89C1\u95EE\u9898","permalink":"/notes/service/auth/faq"},"next":{"title":"\u534F\u8BAE","permalink":"/notes/service/auth/protocol"}}'),r=i("52676"),s=i("79938");let l={title:"\u8BCD\u6C47",tags:["Glossary"]},d="Auth Glossary",c={},a=[{value:"ACL \u76F8\u5173\u5BF9\u8C61",id:"acl-\u76F8\u5173\u5BF9\u8C61",level:2},{value:"Subject vs Principal",id:"subject-vs-principal",level:2},{value:"SWT token",id:"swt-token",level:2},{value:"IdP - Identity Provider",id:"idp---identity-provider",level:2},{value:"IdM - Identity Management - \u8EAB\u4EFD\u7BA1\u7406",id:"idm---identity-management---\u8EAB\u4EFD\u7BA1\u7406",level:2},{value:"IdAM - IAM - Identity and Access Management - \u8EAB\u4EFD\u8BBF\u95EE\u7BA1\u7406",id:"idam---iam---identity-and-access-management---\u8EAB\u4EFD\u8BBF\u95EE\u7BA1\u7406",level:2},{value:"SAML - Security Assertion Markup Language - \u5B89\u5168\u65AD\u8A00\u6807\u8BB0\u8BED\u8A00",id:"saml---security-assertion-markup-language---\u5B89\u5168\u65AD\u8A00\u6807\u8BB0\u8BED\u8A00",level:2},{value:"bearer token - \u4E0D\u8BB0\u540D\u4EE4\u724C",id:"bearer-token---\u4E0D\u8BB0\u540D\u4EE4\u724C",level:2},{value:"id token - \u8EAB\u4EFD\u4EE4\u724C",id:"id-token---\u8EAB\u4EFD\u4EE4\u724C",level:2}];function h(n){let e={a:"a",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"auth-glossary",children:"Auth Glossary"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"abbr."}),(0,r.jsx)(e.th,{children:"stand for"}),(0,r.jsx)(e.th,{children:"mean"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"two-legged OAuth 2.0"}),(0,r.jsx)(e.td,{children:"client_credentials"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"three-legged OAuth 2.0"}),(0,r.jsx)(e.td,{})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"abbr."}),(0,r.jsx)(e.th,{children:"stand for"}),(0,r.jsx)(e.th,{children:"meanning"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CIAM"}),(0,r.jsx)(e.td,{children:"Customer Identity and Access Management"}),(0,r.jsx)(e.td,{children:"\u5BA2\u6237\u8EAB\u4EFD\u548C\u8BBF\u95EE\u7BA1\u7406"})]})})]}),"\n",(0,r.jsx)(e.h2,{id:"acl-\u76F8\u5173\u5BF9\u8C61",children:"ACL \u76F8\u5173\u5BF9\u8C61"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Subject - \u8BBF\u95EE\u4E3B\u4F53,\u5373\u8FDB\u884C\u8BBF\u95EE\u548C\u64CD\u4F5C\u7684\u5B9E\u4F53,\u5982\u7528\u6237\u3001\u7EC4\u7EC7\u3001\u8BBE\u5907\u7B49"}),"\n",(0,r.jsx)(e.li,{children:"Object - \u88AB\u8BBF\u95EE\u7684\u5BF9\u8C61\u6216\u8005\u8D44\u6E90,\u5982\u6570\u636E\u3001\u6587\u4EF6\u3001\u7CFB\u7EDF\u7B49"}),"\n",(0,r.jsx)(e.li,{children:"Action - \u5141\u8BB8\u6216\u8005\u62D2\u7EDD\u7684\u64CD\u4F5C,\u5982\u8BFB\u3001\u5199\u3001\u6267\u884C\u3001\u5220\u9664\u7B49"}),"\n",(0,r.jsx)(e.li,{children:"Condition - \u8BBF\u95EE\u7684\u6761\u4EF6\u6216\u8005\u4E0A\u4E0B\u6587,\u65F6\u95F4\u3001\u5730\u70B9\u3001\u65B9\u5F0F\u7B49"}),"\n",(0,r.jsx)(e.li,{children:"Effect - \u6388\u6743\u7ED3\u679C,\u662F\u5141\u8BB8\u8FD8\u662F\u5426\u8BA4\u8BBF\u95EE"}),"\n",(0,r.jsx)(e.li,{children:"Priority - ACL \u89C4\u5219\u7684\u4F18\u5148\u7EA7\u987A\u5E8F"}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"subject-vs-principal",children:"Subject vs Principal"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Subject\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7528\u4E8E ACL\u3001\u52A8\u6001\u6743\u9650\u3001\u4E34\u65F6\u6388\u6743\u3001\u4E3B\u4F53\u9694\u79BB\u3001\u4EE3\u7406\u8BBF\u95EE\u3001\u4F1A\u8BDD\u7BA1\u7406\u3001Audit"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Principal\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7528\u4E8E Auth, Permission, Audit"}),"\n",(0,r.jsx)(e.li,{children:"\u6743\u9650\u59D4\u6258\u3001\u8D23\u4EFB\u8FFD\u7A76\u3001\u957F\u4F1A\u8BDD\u3001\u8EAB\u4EFD\u9694\u79BB"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"Subject \u66F4\u5E7F\u6CDB,Principal \u66F4\u660E\u786E\u8EAB\u4EFD"}),"\n"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Subject \u662F\u4E00\u4E2A\u62BD\u8C61\u6982\u5FF5,\u8868\u793A\u6267\u884C\u52A8\u4F5C\u7684\u4E3B\u4F53,\u53EF\u4EE5\u662F\u7528\u6237\u3001\u8FDB\u7A0B\u3001\u670D\u52A1\u7B49"}),"\n",(0,r.jsxs)(e.li,{children:["Principal \u5F3A\u8C03\u662F\u4E00\u4E2A\u9A8C\u8BC1\u8FC7\u7684\u8EAB\u4EFD,\u901A\u5E38\u662F\u4E00\u4E2A\u6307\u5B9A\u7684\u7528\u6237\u3002\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5F3A\u8C03\u6B63\u5728\u8FDB\u884C Auth"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.ol,{start:"2",children:["\n",(0,r.jsx)(e.li,{children:"Subject \u4E3B\u52A8\u53D1\u8D77,Principal \u88AB\u52A8\u7ED1\u5B9A"}),"\n"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Subject \u66F4\u4FA7\u91CD\u4E3B\u52A8\u884C\u4E3A\u4E3B\u4F53,Principal \u66F4\u4FA7\u91CD\u5DF2\u7ECF\u9A8C\u8BC1\u901A\u8FC7\u7684\u8EAB\u4EFD\u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.ol,{start:"3",children:["\n",(0,r.jsx)(e.li,{children:"Subject \u5173\u6CE8\u5F53\u524D\u72B6\u6001,Principal \u5173\u6CE8\u6301\u4E45\u6807\u8BC6"}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"Subject \u901A\u5E38\u6307\u5F53\u524D\u53D1\u8D77\u8BF7\u6C42\u7684\u4E34\u65F6\u72B6\u6001\u3002Principal \u662F\u5BF9\u4E00\u4E2A\u6301\u4E45\u8EAB\u4EFD\u7684\u6807\u8BC6,\u4E0D\u4F1A\u9891\u7E41\u53D8\u66F4\u3002"}),"\n",(0,r.jsxs)(e.ol,{start:"4",children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"ACL \u4E2D\u4E3B\u8981\u4F7F\u7528 Subject\n\u5728\u8BBF\u95EE\u63A7\u5236\u5217\u8868(ACL)\u4E2D,\u901A\u5E38\u76F4\u63A5\u4F7F\u7528 Subject \u6765\u8868\u793A\u8BBF\u95EE\u548C\u64CD\u4F5C\u4E3B\u4F53\u3002Principal \u5728\u6388\u6743\u9A8C\u8BC1\u4E2D\u66F4\u5E38\u4F7F\u7528\u3002"}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"Subject \u66F4\u62BD\u8C61,Principal \u66F4\u5177\u4F53\nSubject \u53EF\u4EE5\u8868\u793A\u4E0D\u540C\u7C7B\u578B\u7684\u8BBF\u95EE\u4E3B\u4F53,Principal \u901A\u5E38\u6307\u5B9A\u552F\u4E00\u7684\u7528\u6237\u8EAB\u4EFD\u3002"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"swt-token",children:"SWT token"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Simple Web Token"}),"\n",(0,r.jsx)(e.li,{children:"OAuth 2.0 RFC6749"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.networknt.com/architecture/swt-vs-jwt/",children:"https://www.networknt.com/architecture/swt-vs-jwt/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/netlify/gotrue",children:"netlify/gotrue"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"idp---identity-provider",children:"IdP - Identity Provider"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u63D0\u4F9B\u8BA4\u8BC1\u4FE1\u606F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F8B\u5982 \u7528\u6237\u53EF\u4EE5\u4F7F\u7528\u8D26\u53F7\u5BC6\u7801\u767B\u9646"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5B9E\u9645\u5B58\u653E\u7528\u6237\u4FE1\u606F"}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"idm---identity-management---\u8EAB\u4EFD\u7BA1\u7406",children:"IdM - Identity Management - \u8EAB\u4EFD\u7BA1\u7406"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Identity_management",children:"Identity management"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"idam---iam---identity-and-access-management---\u8EAB\u4EFD\u8BBF\u95EE\u7BA1\u7406",children:"IdAM - IAM - Identity and Access Management - \u8EAB\u4EFD\u8BBF\u95EE\u7BA1\u7406"}),"\n",(0,r.jsx)(e.h2,{id:"saml---security-assertion-markup-language---\u5B89\u5168\u65AD\u8A00\u6807\u8BB0\u8BED\u8A00",children:"SAML - Security Assertion Markup Language - \u5B89\u5168\u65AD\u8A00\u6807\u8BB0\u8BED\u8A00"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u8BA4\u8BC1\u548C\u6388\u6743"}),"\n",(0,r.jsx)(e.li,{children:"principal - \u4F8B\u5982 \u7EC8\u7AEF\u7528\u6237"}),"\n",(0,r.jsx)(e.li,{children:"service provider - \u4F8B\u5982 \u7F51\u7AD9\uFF0Cprincipal \u5C1D\u8BD5\u8BBF\u95EE"}),"\n",(0,r.jsx)(e.li,{children:"identity provider - \u6301\u6709 principal \u8BA4\u8BC1\u548C\u6388\u6743\u4FE1\u606F\u7684\u670D\u52A1"}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"bearer-token---\u4E0D\u8BB0\u540D\u4EE4\u724C",children:"bearer token - \u4E0D\u8BB0\u540D\u4EE4\u724C"}),"\n",(0,r.jsx)(e.p,{children:"bearer (who hold the access token) can access authorized resources without further identification"}),"\n",(0,r.jsx)(e.p,{children:"access token \u4E3A bearer token"}),"\n",(0,r.jsx)(e.h2,{id:"id-token---\u8EAB\u4EFD\u4EE4\u724C",children:"id token - \u8EAB\u4EFD\u4EE4\u724C"}),"\n",(0,r.jsx)(e.p,{children:"contains Claims(claims are name/value pairs that contain information about a user) about the Authentication of an End-User by an Authorization Server"})]})}function o(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return l}});var t=i(75271);let r={},s=t.createContext(r);function l(n){let e=t.useContext(s);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);