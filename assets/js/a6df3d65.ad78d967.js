"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["65760"],{16887:function(n,e,a){a.r(e),a.d(e,{metadata:()=>s,contentTitle:()=>i,default:()=>u,assets:()=>o,toc:()=>c,frontMatter:()=>l});var s=JSON.parse('{"id":"devops/kubernetes/app/argocd/argocd-vault-plugin","title":"argocd-vault-plugin","description":"- argoproj-labs/argocd-vault-plugin","source":"@site/../notes/devops/kubernetes/app/argocd/argocd-vault-plugin.md","sourceDirName":"devops/kubernetes/app/argocd","slug":"/devops/kubernetes/app/argocd/vault-plugin","permalink":"/notes/devops/kubernetes/app/argocd/vault-plugin","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/app/argocd/argocd-vault-plugin.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689238697000,"frontMatter":{"title":"argocd-vault-plugin"},"sidebar":"docs","previous":{"title":"Secrets","permalink":"/notes/devops/kubernetes/app/argocd/secrets"},"next":{"title":"ArgoCD \u7248\u672C","permalink":"/notes/devops/kubernetes/app/argocd/version"}}'),r=a("52676"),t=a("79938");let l={title:"argocd-vault-plugin"},i="argocd-vault-plugin",o={},c=[{value:"SOPS",id:"sops",level:2},{value:"\u63D2\u4EF6\u5DE5\u4F5C\u539F\u7406",id:"\u63D2\u4EF6\u5DE5\u4F5C\u539F\u7406",level:2}];function d(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"argocd-vault-plugin",children:"argocd-vault-plugin"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/argoproj-labs/argocd-vault-plugin",children:"argoproj-labs/argocd-vault-plugin"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"ArgoCD \u5BC6\u94A5\u7BA1\u7406"}),"\n",(0,r.jsxs)(e.li,{children:["\u652F\u6301\u540E\u7AEF\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"HashiCorp Vault"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/mozilla/sops",children:"SOPS"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"AVP -> argocd-vault-plugin"}),"\n",(0,r.jsxs)(e.li,{children:["\u5B89\u88C5\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/argoproj-labs/argocd-vault-plugin/tree/main/manifests",children:"https://github.com/argoproj-labs/argocd-vault-plugin/tree/main/manifests"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://argocd-vault-plugin.readthedocs.io/en/stable/config/#multitenancy",children:"Multitenancy"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"kind: Secret\napiVersion: v1\nmetadata:\n  name: example-secret\n  annotations:\n    # \u8DEF\u5F84\n    avp.kubernetes.io/path: 'path/to/secret'\ntype: Opaque\ndata:\n  password: <password-vault-key>\n  # postgres://<username>:<password>@<host>:<port>/<database>?sslmode=require\n  # \u4F1A\u5148 decode \u7136\u540E\u66FF\u6362\uFF0C\u7136\u540E encode\n  POSTGRES_URL: cG9zdGdyZXM6Ly88dXNlcm5hbWU+OjxwYXNzd29yZD5APGhvc3Q+Ojxwb3J0Pi88ZGF0YWJhc2U+P3NzbG1vZGU9cmVxdWlyZQ==\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"annotations:\n  # <path:some/path#secret-key>\n  # <path:some/path#secret-key#version>\n  avp.kubernetes.io/path: 'path/to/secret'\n  # \u9ED8\u8BA4 latest\n  avp.kubernetes.io/secret-version: '1'\n  avp.kubernetes.io/kv-version: '2'\n  # \u662F\u5426\u5FFD\u7565\u6587\u4EF6\n  avp.kubernetes.io/ignore: 'false'\n  # \u5982\u679C\u503C\u4E0D\u5B58\u5728\u79FB\u9664 key\n  avp.kubernetes.io/remove-missing: 'true'\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Modifiers\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"base64encode"}),"\n",(0,r.jsx)(e.li,{children:"base64decode"}),"\n",(0,r.jsx)(e.li,{children:"jsonPath {.username}"}),"\n",(0,r.jsx)(e.li,{children:"jsonParse"}),"\n",(0,r.jsx)(e.li,{children:"yamlParse"}),"\n",(0,r.jsx)(e.li,{children:"indent"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u914D\u7F6E"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"kind: Secret\napiVersion: v1\ntype: Opaque\nmetadata:\n  name: vault-configuration\n  namespace: argocd\nstringData:\n  VAULT_ADDR: http://vault\n  # vault, sops, ibmsecretsmanager, awssecretsmanager, gcpsecretmanager, yandexcloudlockbox, 1passwordconnect\n  # sops \u6700\u7B80\u5355\n  # vault \u9002\u5408\u5C0F\u56E2\u961F selfhost\n  AVP_TYPE: vault\n  # approle, github, k8s, token\n  AVP_AUTH_TYPE:\n  # approle\n  AVP_ROLE_ID:\n  AVP_SECRET_ID:\n  # k8s\n  AVP_K8S_MOUNT_PATH:\n  AVP_K8S_ROLE:\n  AVP_K8S_TOKEN_PATH: /var/run/secrets/kubernetes.io/serviceaccount/token\n\n  # auth/approle, auth/github, auth/kubernetes\n  AVP_MOUNT_PATH:\n\n  # avp.kubernetes.io/kv-version\n  AVP_KV_VERSION: '2'\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["ArgoCD 2.4 \u4F1A\u6DFB\u52A0\u73AF\u5883\u53D8\u91CF\u524D\u7F00 ",(0,r.jsx)(e.code,{children:"ARGOCD_ENV_"})]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"sops",children:"SOPS"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"AVP_TYPE: sops"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"# \u901A\u8FC7 annotation \u914D\u7F6E\nkind: Secret\napiVersion: v1\nmetadata:\n  name: test-secret\n  annotations:\n    avp.kubernetes.io/path: 'example.yaml'\ntype: Opaque\ndata:\n  password: <test-secret>\n\n---\n# Inline\nkind: Secret\napiVersion: v1\nmetadata:\n  name: test-secret\ntype: Opaque\ndata:\n  password: <path:example.yaml#test-secret>\n---\n# \u83B7\u53D6\u5B50\u5B57\u6BB5\nkind: Secret\napiVersion: v1\nmetadata:\n  name: test-secret\n  annotations:\n    avp.kubernetes.io/path: 'example.yaml'\ntype: Opaque\nstringData:\n  password: <parent | jsonPath {.child}>\n"})}),"\n",(0,r.jsx)(e.h2,{id:"\u63D2\u4EF6\u5DE5\u4F5C\u539F\u7406",children:"\u63D2\u4EF6\u5DE5\u4F5C\u539F\u7406"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"Patch argocd-repo-server"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6302\u8F7D ConfigMap/cmp-plugin"}),"\n",(0,r.jsx)(e.li,{children:"\u6302\u8F7D empty-dir custom-tools"}),"\n",(0,r.jsxs)(e.li,{children:["initContainers\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u901A\u8FC7 curl github \u4E0B\u4E0D\u52A8 - \u5EFA\u8BAE\u505A\u955C\u50CF\u6216\u8005\u81EA\u5DF1\u955C\u50CF\u6587\u4EF6"}),"\n",(0,r.jsxs)(e.li,{children:["\u4E0B\u8F7D argocd-vault-plugin \u5230 custom-tools\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"curl -L https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v$(AVP_VERSION)/argocd-vault-plugin_$(AVP_VERSION)_linux_amd64 -o argocd-vault-plugin \\\n  && chmod +x argocd-vault-plugin \\\n  && mv argocd-vault-plugin /custom-tools/\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsxs)(e.p,{children:["ConfigMap/cmp-plugin \u914D\u7F6E argocd - \u901A\u8FC7 ",(0,r.jsx)(e.code,{children:"argocd-vault-plugin generate"})," \u751F\u6210"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"avp-kustomize.yaml"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"ConfigManagementPlugin"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# discover.find.command\nfind . -name kustomization.yaml\n# generate.command\nkustomize build . | argocd-vault-plugin generate -\n"})}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\n",(0,r.jsx)(e.p,{children:"avp-helm.yaml"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"find . -name 'Chart.yaml' && find . -name 'values.yaml'\n\nhelm template $ARGOCD_APP_NAME -n $ARGOCD_APP_NAMESPACE ${ARGOCD_ENV_HELM_ARGS} . | argocd-vault-plugin generate -\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"AVP_VERSION=1.15.0\ncurl -LO https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v${AVP_VERSION}/argocd-vault-plugin_${AVP_VERSION}_linux_amd64\n"})})]})}function u(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},79938:function(n,e,a){a.d(e,{Z:function(){return i},a:function(){return l}});var s=a(75271);let r={},t=s.createContext(r);function l(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);