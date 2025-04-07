"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66525"],{42858:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>o,assets:()=>a,toc:()=>d,frontMatter:()=>c});var r=JSON.parse('{"id":"devops/kubernetes/ops/rbac","title":"RBAC","description":"- UserAccount","source":"@site/../notes/devops/kubernetes/ops/rbac.md","sourceDirName":"devops/kubernetes/ops","slug":"/devops/kubernetes/ops/rbac","permalink":"/notes/devops/kubernetes/ops/rbac","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/ops/rbac.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1677583228000,"frontMatter":{"title":"RBAC"},"sidebar":"docs","previous":{"title":"kustomize","permalink":"/notes/devops/kubernetes/ops/kustomize"},"next":{"title":"RKE - \u5B89\u88C5\u5668","permalink":"/notes/devops/kubernetes/ops/rke"}}'),t=s("52676"),i=s("79938");let c={title:"RBAC"},l="RBAC",a={},d=[{value:"ServiceAccount",id:"serviceaccount",level:2},{value:"API discovery roles",id:"api-discovery-roles",level:2}];function u(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"rbac",children:"RBAC"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["UserAccount\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u591A\u79CD\u8BA4\u8BC1\u65B9\u5F0F\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"x509"}),"\n",(0,t.jsx)(n.li,{children:"bearer token -  JWT"}),"\n",(0,t.jsx)(n.li,{children:"basic-auth"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["ServiceAccount\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u76F4\u63A5\u521B\u5EFA\uFF0C\u751F\u6210\u5305\u542B Token \u7684 Secret"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl get clusterroles\nkubectl get ClusterRoleBinding\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u9762\u5411\u7528\u6237\u5185\u7F6E\u89D2\u8272\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"view - \u6392\u9664 secret \u7684 get"}),"\n",(0,t.jsx)(n.li,{children:"edit -  view + \u6392\u9664 role, rolebinding \u7684 create, delete, update"}),"\n",(0,t.jsx)(n.li,{children:"admin - edit + namespace \u7EA7\u522B role, rolebinding"}),"\n",(0,t.jsx)(n.li,{children:"cluster-admin"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u6838\u5FC3\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"system:kube-scheduler"}),"\n",(0,t.jsx)(n.li,{children:"system:volume-scheduler"}),"\n",(0,t.jsx)(n.li,{children:"system:kube-controller-manager"}),"\n",(0,t.jsx)(n.li,{children:"system:node"}),"\n",(0,t.jsx)(n.li,{children:"system:node-proxier"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["verbs\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"create, get, delete, list, update"}),"\n",(0,t.jsx)(n.li,{children:"exec"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u4E3B\u8981\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Role, RoleBinding, Subjects"}),"\n",(0,t.jsx)(n.li,{children:"ClusterRole, ClusterRoleBinding"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsx)(n.tr,{children:(0,t.jsx)(n.th,{children:"ClusterRole"})})}),(0,t.jsx)(n.tbody,{children:(0,t.jsx)(n.tr,{children:(0,t.jsx)(n.td,{children:"cluster-admin"})})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# username\n(umask 077;openssl genrsa -out username.key 2048)\n\n# O=group\n# \u53EF\u4EE5\u591A group - CN=username/O=group1/O=group2\nopenssl req -new -key username.key -out username.csr -subj "/O=dev/CN=username"\n\n\n# \u76F4\u63A5\u670D\u52A1\u7AEF\u4F7F\u7528 CA Approve CSR\n# -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key\nopenssl x509 -req -in username.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out username.crt -days 365\n\nkubectl config set-credentials username --client-certificate=username.crt --client-key=username.key\n\n# \u5224\u65AD\u6743\u9650\nkubectl auth can-i list pods --as username\n\n# rakkess\n# ==========\n# https://github.com/corneliusweig/rakkess\nkubectl krew install access_matrix\n# \u67E5\u770B\u6240\u6709\u6743\u9650\nkubectl access-matrix -n my-project-dev --as username\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/FairwindsOps/rbac-manager",children:"https://github.com/FairwindsOps/rbac-manager"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/aquasecurity/kubectl-who-can",children:"https://github.com/aquasecurity/kubectl-who-can"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/FairwindsOps/rbac-lookup",children:"https://github.com/FairwindsOps/rbac-lookup"})}),"\n",(0,t.jsxs)(n.li,{children:["Kubectl Approve CSR\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/",children:"https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"serviceaccount",children:"ServiceAccount"}),"\n",(0,t.jsx)(n.h2,{id:"api-discovery-roles",children:"API discovery roles"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl get clusterroles system:discovery -o yaml\n\nkubectl get clusterroles system:discovery -o json | jq '.rules[0].nonResourceURLs | join(\", \")' -r\n"})}),"\n",(0,t.jsx)(n.p,{children:"| ClusterRole               | verbs  |\n| ------------------------- | ------ | ------------------------------------------------ |\n| system:basic-user         | create | selfsubjectaccessreviews,selfsubjectrulesreviews |\n| system:public-info-viewer | get    | /healthz, /livez, /readyz, /version, /version/   |\n| system:discovery          | get    | public-info-viewer + /openapi,/api,/apis         |"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["ClusterRoleBinding\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"system:authenticated"}),"\n",(0,t.jsx)(n.li,{children:"system:unauthenticated"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["subjects\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["system:\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"system:serviceaccount: - service account usernames"}),"\n",(0,t.jsx)(n.li,{children:"system:serviceaccounts: - service account groups"}),"\n",(0,t.jsx)(n.li,{children:"system:controller:"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"cluster-admin"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl get clusterroles system:discovery -o yaml\n"})})]})}function o(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return c}});var r=s(75271);let t={},i=r.createContext(t);function c(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);