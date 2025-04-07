"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["75698"],{58086:function(e,n,s){s.r(n),s.d(n,{metadata:()=>l,contentTitle:()=>c,default:()=>o,assets:()=>a,toc:()=>d,frontMatter:()=>r});var l=JSON.parse('{"id":"service/security/vault/vault-secret","title":"Vault \u5BC6\u94A5\u5F15\u64CE","description":"- ad - Active Directory","source":"@site/../notes/service/security/vault/vault-secret.md","sourceDirName":"service/security/vault","slug":"/service/security/vault/secret","permalink":"/notes/service/security/vault/secret","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/security/vault/vault-secret.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"Vault \u5BC6\u94A5\u5F15\u64CE"},"sidebar":"docs","previous":{"title":"Vault on Kubernetes","permalink":"/notes/service/security/vault/k8s"},"next":{"title":"SelfHost","permalink":"/notes/service/selfhost/"}}'),i=s("52676"),t=s("79938");let r={title:"Vault \u5BC6\u94A5\u5F15\u64CE"},c="Vault \u5BC6\u94A5\u5F15\u64CE",a={},d=[{value:"consul",id:"consul",level:2}];function u(e){let n={code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"vault-\u5BC6\u94A5\u5F15\u64CE",children:"Vault \u5BC6\u94A5\u5F15\u64CE"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["ad - Active Directory\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"password rotation"}),"\n",(0,i.jsx)(n.li,{children:"service account check-out"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["alicloud - \u963F\u91CC\u4E91\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u57FA\u4E8E RAM \u7B56\u7565\u751F\u6210 token\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F1A\u6709\u65F6\u95F4\u9650\u5236\uFF0C\u81EA\u52A8 revoke"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u57FA\u4E8E RAM \u89D2\u8272\u751F\u6210 STS \u6388\u6743\u4FE1\u606F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u77ED\u671F\u3001\u4E0D\u53EF\u5237\u65B0"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"cubbyhole - token \u72EC\u7ACB\u7A7A\u95F4 - \u7C7B\u4F3C\u4E8E session/cookie"}),"\n",(0,i.jsxs)(n.li,{children:["consul\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u57FA\u4E8E\u7B56\u7565\u751F\u6210 Token"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6570\u636E\u5E93 - ",(0,i.jsx)(n.code,{children:"<type>-database-plugin"})," - \u57FA\u4E8E\u914D\u7F6E\u7684\u89D2\u8272\u52A8\u6001\u751F\u6210\u6388\u6743\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"cassandra"}),"\n",(0,i.jsx)(n.li,{children:"elasticsearch"}),"\n",(0,i.jsxs)(n.li,{children:["mysql\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"mysql-database-plugin"}),"\n",(0,i.jsx)(n.li,{children:"mysql-aurora-database-plugin"}),"\n",(0,i.jsx)(n.li,{children:"mysql-rds-database-plugin"}),"\n",(0,i.jsx)(n.li,{children:"mysql-legacy-database-plugin"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"postgresql"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"kv"}),"\n",(0,i.jsx)(n.li,{children:"identity - Vault \u81EA\u8EAB\u6388\u6743"}),"\n",(0,i.jsx)(n.li,{children:"nomad"}),"\n",(0,i.jsx)(n.li,{children:"openldap - LDAP v3"}),"\n",(0,i.jsxs)(n.li,{children:["pki - \u52A8\u6001\u751F\u6210 X.509 \u8BC1\u4E66\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u51CF\u5C11\u8BC1\u4E66\u65F6\u9650\uFF0C\u6BCF\u4E2A\u5E94\u7528\u53EF\u7528\u72EC\u7ACB\u8BC1\u4E66\uFF0C\u907F\u514D\u8BC1\u4E66\u5171\u4EAB\u4EA4\u6362"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"rabbitmq"}),"\n",(0,i.jsxs)(n.li,{children:["ssh - SSH \u6388\u6743\u8BA4\u8BC1\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u8BC1\u4E66\u7B7E\u53D1"}),"\n",(0,i.jsx)(n.li,{children:"\u4E00\u6B21\u6027\u5BC6\u7801"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.del,{children:"\u52A8\u6001 Key"})," - \u5E9F\u5F03"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"totp"}),"\n",(0,i.jsxs)(n.li,{children:["transit - \u63D0\u4F9B\u52A0\u5BC6\u89E3\u5BC6\u529F\u80FD\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"cryptography as a service / encryption as a service"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"consul",children:"consul"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"vault secrets enable consul\n\nvault write consul/config/access \\\n  address=127.0.0.1:8500 \\\n  token=E2A500CD-0599-409E-949B-E321135FAAD5\n"})})]})}function o(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return r}});var l=s(75271);let i={},t=l.createContext(i);function r(e){let n=l.useContext(t);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);