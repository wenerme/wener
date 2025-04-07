"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["55639"],{9839:function(n,e,r){r.r(e),r.d(e,{metadata:()=>i,contentTitle:()=>c,default:()=>h,assets:()=>d,toc:()=>o,frontMatter:()=>l});var i=JSON.parse('{"id":"service/auth/keycloak/README","title":"Keycloak","description":"- keycloak/keycloak","source":"@site/../notes/service/auth/keycloak/README.md","sourceDirName":"service/auth/keycloak","slug":"/service/auth/keycloak/","permalink":"/notes/service/auth/keycloak/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/auth/keycloak/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1661507210000,"frontMatter":{"title":"Keycloak"},"sidebar":"docs","previous":{"title":"Kerberos Windows","permalink":"/notes/service/auth/kerberos/windows"},"next":{"title":"Keycloak Admin","permalink":"/notes/service/auth/keycloak/admin"}}'),s=r("52676"),t=r("79938");let l={title:"Keycloak"},c="Keycloak",d={},o=[];function a(n){let e={a:"a",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"keycloak",children:"Keycloak"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/keycloak/keycloak",children:"keycloak/keycloak"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Apache-2.0, Java, Quarkus"}),"\n",(0,s.jsx)(e.li,{children:"\u901A\u8FC7 jgroups \u5B9E\u73B0\u96C6\u7FA4"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://developers.redhat.com/blog/2020/10/23/use-mobile-numbers-for-user-authentication-in-keycloak",children:"Use mobile numbers for user authentication in Keycloak"})}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/mrparkers/terraform-provider-keycloak",children:"mrparkers/terraform-provider-keycloak"}),"\nTerraform \u7BA1\u7406 Keycloak"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/adorsys/keycloak-config-cli",children:"adorsys/keycloak-config-cli"}),"\n\u547D\u4EE4\u884C\u914D\u7F6E\u5BFC\u5165"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Endpoints - Keycloak 17+ \u65E0 ",(0,s.jsx)(e.code,{children:"/auth"})," \u524D\u7F00\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"/"}),"\n",(0,s.jsx)(e.li,{children:"/console"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/realms/{REALM}/protocol/openid-connect/auth"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/admin/{REALM}/console"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/realms/{REALM}/.well-known/openid-configuration"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"docker run --rm -it \\\n  -p 8080:8080 \\\n  -e KEYCLOAK_ADMIN=admin \\\n  -e KEYCLOAK_ADMIN_PASSWORD=admin \\\n  quay.io/keycloak/keycloak:19.0.1 start-dev\n"})}),"\n",(0,s.jsx)(e.p,{children:"| env                         | default  |\n| --------------------------- | -------- | ---------------------------------------- |\n| KC_DB                       | dev-file |\n| KC_DB_URL                   |\n| KC_DB_USERNAME              |\n| KC_DB_PASSWORD              |\n| KC_FEATURES                 |\n| KC_FEATURES_DISABLED        |\n| KC_HOSTNAME                 |\n| KC_HEALTH_ENABLED           | false    |\n| KC_METRICS_ENABLED          | false    |\n| KC_HTTPS_KEY_STORE_PASSWORD | password |\n| KC_HTTPS_KEY_STORE_FILE     |\n| KC_HOSTNAME_ADMIN           |\n| KC_HTTP_ENABLED             | false    | 0.0.0.0:8080                             |\n| KC_HTTP_PORT                | 8080     |\n| KC_HTTP_RELATIVE_PATH       | /        |\n| KC_HTTPS_PORT               | 8443     |\n| KC_HTTPS_PROTOCOLS          | TLSv1.3  |\n| KC_PROXY                    | none     | none, edge, reencrypt, passthrough       |\n| KC_VAULT                    |          | file, hashicorp                          |\n| KC_VAULT_DIR                |\n| KC_LOG_LEVEL                | info     |\n| KC_CACHE                    |          | ispn                                     |\n| KC_CACHE_STACK              | udp      | tcp, udp, kubernetes, ec2, azure, google |\n| KC_CACHE_CONFIG_FILE        |          | cache-ispn.xml                           |"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"bin/kc.sh start-dev\n\n# \u53EF\u5728 build \u955C\u50CF\u65F6\u6267\u884C - \u5927\u6982\u51E0\u79D2 - start \u548C start-dev \u90FD\u4F1A\u6267\u884C\nbin/kc.sh build\n\n# --optimized \u544A\u8BC9 kc \u5DF2\u7ECF build\n# \u8981\u6C42\u6240\u6709\u914D\u7F6E\u76F8\u540C\n# \u9ED8\u8BA4\u60C5\u51B5\u4F1A\u5148 build\nbin/kc.sh start --optimized\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["KC_DB_URL_HOST -> --db-url-host -> db-url-host\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u73AF\u5883\u53D8\u91CF - flag - \u914D\u7F6E\u9879"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u914D\u7F6E\u6587\u4EF6\u540C flag \u65E0 ",(0,s.jsx)(e.code,{children:"--"})," - ",(0,s.jsx)(e.code,{children:"--config-file,-cf"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"conf/keycloak.conf"}),"\n",(0,s.jsxs)(e.li,{children:["\u914D\u7F6E\u53EF\u5F15\u7528\u73AF\u5883\u53D8\u91CF ",(0,s.jsx)(e.code,{children:"db-url-host=${MY_DB_HOST:mydb}"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["KC_METRICS_ENABLED\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"/health"}),"\n",(0,s.jsx)(e.li,{children:"/health/ready"}),"\n",(0,s.jsx)(e.li,{children:"/health/live"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["KC_METRICS_ENABLED\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"/metrics"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"KC_FEATURES - authorization, account2, account-api, admin-fine-grained-authz, admin2, docker, impersonation, openshift-integration, scripts, token-exchange, web-authn, client-policies, ciba, map-storage, par, declarative-user-profile, dynamic-scopes, client-secret-rotation, step-up-authentication, recovery-codes, update-email, preview"}),"\n",(0,s.jsx)(e.li,{children:"KC_DB - dev-file, dev-mem, mariadb, mssql, mysql, oracle, postgres"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"feature"}),(0,s.jsx)(e.th,{children:"note"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"account-api"}),(0,s.jsx)(e.td,{children:"Account Management REST API"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"account2"}),(0,s.jsx)(e.td,{children:"New Account Management Console"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"admin2"}),(0,s.jsx)(e.td,{children:"New Admin Console"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"authorization"}),(0,s.jsx)(e.td,{children:"Authorization Service"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"ciba"}),(0,s.jsx)(e.td,{children:"OpenID Connect Client Initiated Backchannel Authentication (CIBA)"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"client-policies"}),(0,s.jsx)(e.td,{children:"Client configuration policies"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"impersonation"}),(0,s.jsx)(e.td,{children:"Ability for admins to impersonate users"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"par"}),(0,s.jsx)(e.td,{children:"OAuth 2.0 Pushed Authorization Requests (PAR)"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"step-up-authentication"}),(0,s.jsx)(e.td,{children:"Step-up Authentication"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"web-authn"}),(0,s.jsx)(e.td,{children:"W3C Web Authentication (WebAuthn)"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"docker"}),(0,s.jsx)(e.td,{children:"Docker Registry protocol"})]})]})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u9ED8\u8BA4\u5173\u95ED\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"docker"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"preview"}),(0,s.jsx)(e.th,{children:"note"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"admin-fine-grained-authz"}),(0,s.jsx)(e.td,{children:"Fine-Grained Admin Permissions"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"client-secret-rotation"}),(0,s.jsx)(e.td,{children:"Client Secret Rotation"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"declarative-user-profile"}),(0,s.jsx)(e.td,{children:"Configure user profiles using a declarative style"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"openshift-integration"}),(0,s.jsx)(e.td,{children:"Extension to enable securing OpenShift"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"recovery-codes"}),(0,s.jsx)(e.td,{children:"Recovery codes"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"scripts"}),(0,s.jsx)(e.td,{children:"Write custom authenticators using JavaScript"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"token-exchange"}),(0,s.jsx)(e.td,{children:"Token Exchange Service"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"update-email"}),(0,s.jsx)(e.td,{children:"Update Email Action"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"dynamic-scopes"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"map-storage"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.keycloak.org/server/features",children:"https://www.keycloak.org/server/features"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.keycloak.org/server/all-config",children:"https://www.keycloak.org/server/all-config"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.keycloak.org/server/containers",children:"https://www.keycloak.org/server/containers"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.keycloak.org/server/all-provider-config",children:"https://www.keycloak.org/server/all-provider-config"})}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return c},a:function(){return l}});var i=r(75271);let s={},t=i.createContext(s);function l(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:l(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);