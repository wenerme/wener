"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["69640"],{63281:function(e,n,l){l.r(n),l.d(n,{metadata:()=>i,contentTitle:()=>r,default:()=>u,assets:()=>o,toc:()=>s,frontMatter:()=>a});var i=JSON.parse('{"id":"service/auth/keycloak/keycloak-config-cli","title":"keycloak-config-cli","description":"- adorsys/keycloak-config-cli \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/auth/keycloak/keycloak-config-cli.md","sourceDirName":"service/auth/keycloak","slug":"/service/auth/keycloak/config-cli","permalink":"/notes/service/auth/keycloak/config-cli","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/auth/keycloak/keycloak-config-cli.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1634945411000,"frontMatter":{"title":"keycloak-config-cli"},"sidebar":"docs","previous":{"title":"keycloak conf","permalink":"/notes/service/auth/keycloak/conf"},"next":{"title":"Keycloak \u5F00\u53D1","permalink":"/notes/service/auth/keycloak/dev"}}'),t=l("52676"),c=l("79938");let a={title:"keycloak-config-cli"},r="keycloak-config-cli",o={},s=[];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"keycloak-config-cli",children:"keycloak-config-cli"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/adorsys/keycloak-config-cli",children:"adorsys/keycloak-config-cli"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Keycloak \u547D\u4EE4\u884C\u914D\u7F6E\u5BFC\u5165"}),"\n",(0,t.jsx)(n.li,{children:"Apache-2.0, Java"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003 ",(0,t.jsx)(n.a,{href:"https://github.com/adorsys/keycloak-config-cli/tree/main/src/test/resources/import-files",children:"import-files"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u56E0\u4E3A Keycloak \u53EF\u4EE5\u7BA1\u7406\u8D26\u6237\uFF0C\u4F46\u8D26\u6237\u901A\u5E38\u4F1A\u5141\u8BB8\u4FEE\u6539\uFF0C\u4E00\u6B21\u4E0D\u9002\u5408\u4F7F\u7528\u7C7B\u4F3C terraform \u4E4B\u7C7B\u7684\u7BA1\u7406\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u5BFC\u5165\u529F\u80FD\u975E\u5E38\u9002\u5408 realm \u521D\u59CB\u5316 \u6216 \u4E00\u6B21\u6027\u5BFC\u5165"}),"\n",(0,t.jsx)(n.li,{children:"docker \u955C\u50CF\u63D0\u4F9B\u5339\u914D kc \u7684\u7248\u672C - \u4F8B\u5982 v4.2.0-15.0.1 \u6216\u8005 latest-15.0.1"}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker run \\\n  -e KEYCLOAK_AVAILABILITYCHECK_ENABLED=true \\\n  -e KEYCLOAK_AVAILABILITYCHECK_TIMEOUT=120s \\\n  -e IMPORT_PATH=/config \\\n  -e IMPORT_FORCE=false \\\n  --env-file kc.env \\\n  -v $PWD/keycloak-conf:/config \\\n  adorsys/keycloak-config-cli:latest\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"kc.env"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",children:"KEYCLOAK_URL=https://kc.example.com/auth\nKEYCLOAK_USER=admin\nKEYCLOAK_PASSWORD=password\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'#\nenabled: true\n\n# \u57DF\u57FA\u672C\u4FE1\u606F\nrealm: demo\n\ndisplayName: Demo\ndisplayNameHtml: "<h2>DemoSSO</h2>"\n\nsslRequired: "external"\nloginWithEmailAllowed: true\n\ninternationalizationEnabled: true\nsupportedLocales:\n- zh-CN\n- en\ndefaultLocale: zh-CN\n\n\n# \u89D2\u8272\nroles:\n  # \u57DF\u89D2\u8272\n  realm:\n    - name: admin\n      description: \u7BA1\u7406\n      attributes:\n        \'example.com/admin\':\n          - true\n\n# \u7528\u6237\nusers:\n  - username: wener\n    firstName: Chen\n    lastName: Wener\n    email: example@example.com\n    enabled: true\n    emailVerified: true\n    attributes:\n      jobNumber: 1000\n    credentials:\n      - type: password\n        value: 123456\n        temporary: true\n        # \u652F\u6301\u8BBE\u7F6E\u521D\u59CB\u5BC6\u7801\n        userLabel: initial\n    # \u89D2\u8272\n    realmRoles:\n      - admin\n\nclientScopes:\n\nclients:\n- clientId: demo-web\n\ndefaultDefaultClientScopes:\n- role_list\n- profile\n- email\n- roles\n- web-origins\n\n\n'})})]})}function u(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return r},a:function(){return a}});var i=l(75271);let t={},c=i.createContext(t);function a(e){let n=i.useContext(c);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);