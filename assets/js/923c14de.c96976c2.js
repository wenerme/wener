"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["71749"],{60182:function(n,e,r){r.r(e),r.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>h,assets:()=>c,toc:()=>d,frontMatter:()=>a});var i=JSON.parse('{"id":"devops/kubernetes/app/argocd/argocd-version","title":"ArgoCD \u7248\u672C","description":"- \u955C\u50CF argoproj/argocd:v1.8.4","source":"@site/../notes/devops/kubernetes/app/argocd/argocd-version.md","sourceDirName":"devops/kubernetes/app/argocd","slug":"/devops/kubernetes/app/argocd/version","permalink":"/notes/devops/kubernetes/app/argocd/version","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/app/argocd/argocd-version.md","tags":[{"inline":true,"label":"Version","permalink":"/notes/tags/version"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1723961178000,"frontMatter":{"title":"ArgoCD \u7248\u672C","tags":["Version"]},"sidebar":"docs","previous":{"title":"argocd-vault-plugin","permalink":"/notes/devops/kubernetes/app/argocd/vault-plugin"},"next":{"title":"cert-manager version","permalink":"/notes/devops/kubernetes/app/cert-manager-version"}}'),s=r("52676"),l=r("79938");let a={title:"ArgoCD \u7248\u672C",tags:["Version"]},o="ArgoCD \u7248\u672C",c={},d=[{value:"ArgoCD 2.12",id:"argocd-212",level:2},{value:"ArgoCD 2.11",id:"argocd-211",level:2},{value:"ArgoCD 2.10",id:"argocd-210",level:2},{value:"ArgoCD 2.9",id:"argocd-29",level:2},{value:"ArgoCD 2.8",id:"argocd-28",level:2},{value:"ArgoCD 2.7",id:"argocd-27",level:2},{value:"ArgoCD 2.6",id:"argocd-26",level:2},{value:"ArgoCD 2.5",id:"argocd-25",level:2},{value:"ArgoCD 2.4",id:"argocd-24",level:2},{value:"ArgoCD 2.3",id:"argocd-23",level:2},{value:"ArgoCD 2.2",id:"argocd-22",level:2},{value:"ArgoCD 2.1",id:"argocd-21",level:2},{value:"2.0",id:"20",level:2},{value:"1.8",id:"18",level:2}];function t(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"argocd-\u7248\u672C",children:"ArgoCD \u7248\u672C"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u955C\u50CF argoproj/argocd:v1.8.4\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u53EF\u4EE5\u8003\u8651\u63D0\u524D\u62C9\u597D"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"2.0 \u955C\u50CF quay.io/argoproj/argocd"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u5B89\u88C5\u548C\u5347\u7EA7\u662F\u4E00\u6837\u7684 - \u4ED3\u5E93\u7684 stable tag \u603B\u662F\u6307\u5411\u6700\u65B0 stable \u7248\u672C\n# \u5347\u7EA7\u6CE8\u610F\u5904\u7406\u597D argocd-cm\n# \u666E\u901A\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n# HA\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"version"}),(0,s.jsx)(e.th,{children:"date"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-26",children:"ArgoCD 2.6"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-25",children:"ArgoCD 2.5"})}),(0,s.jsx)(e.td,{children:"2022-10-25"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-24",children:"ArgoCD 2.4"})}),(0,s.jsx)(e.td,{children:"2022-06-11"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-23",children:"ArgoCD 2.3"})}),(0,s.jsx)(e.td,{children:"2022-03-06"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-22",children:"ArgoCD 2.2"})}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.a,{href:"#argocd-21",children:"ArgoCD 2.1"})}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-212",children:"ArgoCD 2.12"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Multi-source application \u589E\u5F3A"}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://blog.argoproj.io/argo-cd-v2-12-release-candidate-90793368bfb5",children:"https://blog.argoproj.io/argo-cd-v2-12-release-candidate-90793368bfb5"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-211",children:"ArgoCD 2.11"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["generate-path annotation\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u544A\u8BC9 argocd \u4EC0\u4E48\u65F6\u5019\u5931\u6548\u7F13\u5B58\uFF0C\u800C\u4E0D\u662F\u6BCF\u6B21\u90FD\u5168\u91CF\u5931\u6548"}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"argocd.argoproj.io/manifest-generate-paths"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u76F8\u5BF9\u76EE\u5F55\uFF0C\u7EDD\u5BF9\u76EE\u5F55"}),"\n",(0,s.jsxs)(e.li,{children:["\u652F\u6301\u591A\u4E2A\u76EE\u5F55 ",(0,s.jsx)(e.code,{children:";"})," \u5206\u9694"]}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 glob"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: guestbook\n  namespace: argocd\n  annotations:\n    # resolves to the 'guestbook' directory\n    argocd.argoproj.io/manifest-generate-paths: .\nspec:\n  source:\n    repoURL: https://github.com/argoproj/argocd-example-apps.git\n    targetRevision: HEAD\n    path: guestbook\n# ...\n"})}),"\n",(0,s.jsx)(e.h2,{id:"argocd-210",children:"ArgoCD 2.10"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"ApplicationSet Templates"}),"\n",(0,s.jsxs)(e.li,{children:["Apps in Any Namespace & Notifications\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://argo-cd.readthedocs.io/en/stable/operator-manual/app-any-namespace/",children:"https://argo-cd.readthedocs.io/en/stable/operator-manual/app-any-namespace/"})}),"\n",(0,s.jsx)(e.li,{children:"--application-namespaces"}),"\n",(0,s.jsxs)(e.li,{children:["argocd-cm\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"application.namespaces"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"PKCE"}),"\n",(0,s.jsxs)(e.li,{children:["Server-Side Diff\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"2.5+ Server-Side Apply (SSA)"}),"\n",(0,s.jsx)(e.li,{children:"based on kube structured-merge-diff"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-29",children:"ArgoCD 2.9"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://blog.argoproj.io/argo-cd-v2-9-release-candidate-a1e256d01017",children:"https://blog.argoproj.io/argo-cd-v2-9-release-candidate-a1e256d01017"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-28",children:"ArgoCD 2.8"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"create a one-off Job"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://blog.argoproj.io/argo-cd-v2-8-release-candidate-be4443d974f",children:"https://blog.argoproj.io/argo-cd-v2-8-release-candidate-be4443d974f"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-27",children:"ArgoCD 2.7"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Proxy Extensions"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-26",children:"ArgoCD 2.6"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://argo-cd.readthedocs.io/en/latest/proposals/parameterized-config-management-plugins/",children:"Parameterized Config Management Plugins"})}),"\n",(0,s.jsxs)(e.li,{children:["managedNamespaceMetadata\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u521B\u5EFA NS \u53EF\u6DFB\u52A0\u989D\u5916\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Multiple Sources for Applications"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  namespace: test\nspec:\n  # \u591A\u6E90 - Argo CD \u4F1A\u505A\u5408\u5E76\n  sources:\n    - chart: elasticsearch\n      repoURL: https://helm.elastic.co\n      targetRevision: 7.6.0\n    - repoURL: https://github.com/argoproj/argocd-example-apps.git\n      path: guestbook\n      targetRevision: HEAD\n  syncPolicy:\n    # \u521B\u5EFA\u7684 NS \u4FE1\u606F\n    managedNamespaceMetadata:\n      labels:\n        any: label\n        you: like\n      annotations:\n        the: same\n        applies: for\n        annotations: on-the-namespace\n    syncOptions:\n      - CreateNamespace=true\n"})}),"\n",(0,s.jsx)(e.h2,{id:"argocd-25",children:"ArgoCD 2.5"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Server-Side Apply ",(0,s.jsx)(e.strong,{children:"Beta"})]}),"\n",(0,s.jsx)(e.li,{children:"API/CLI for ApplicationSets"}),"\n",(0,s.jsx)(e.li,{children:"UI extension"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-24",children:"ArgoCD 2.4"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Web Terminal"}),"\n",(0,s.jsx)(e.li,{children:"Access Control For Pod Logs & Web Terminal"}),"\n",(0,s.jsx)(e.li,{children:"OpenTelemetry Tracing Integration"}),"\n",(0,s.jsx)(e.li,{children:"ApplicationSet \u652F\u6301 Gitea"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"argocd-23",children:"ArgoCD 2.3"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5185\u7F6E ApplicationSet & Notifications"}),"\n",(0,s.jsxs)(e.li,{children:["\u65B0\u589E RespectIgnoreDifferences\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u540C\u6B65\u65F6\u4E0D\u4F1A\u4FEE\u6539\u5FFD\u7565\u5B57\u6BB5"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  #...\nspec:\n  #...\n  ignoreDifferences:\n    - group: 'apps'\n      kind: 'Deployment'\n      jsonPointers:\n        - /spec/replicas\n    - group: '*'\n      kind: '*'\n      # \u53EF\u4EE5\u901A\u8FC7 managedFieldsManagers \u544A\u8BC9 argocd \u9700\u8981\u5FFD\u7565\u7684\u5185\u5BB9\n      # \u7528\u4E8E\u7EC4\u4EF6/\u63D2\u4EF6\u96C6\u6210\n      managedFieldsManagers:\n        - rollouts-controller\n  syncPolicy:\n    syncOptions:\n      - RespectIgnoreDifferences=true\n"})}),"\n",(0,s.jsx)(e.h2,{id:"argocd-22",children:"ArgoCD 2.2"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4ED3\u5E93\u5173\u8054 Project - \u7EC6\u7C92\u5EA6\uFF0C\u4E0D\u9700\u8981\u5168\u5C40"}),"\n",(0,s.jsxs)(e.li,{children:["Config Management Plugins V2\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://argo-cd.readthedocs.io/en/stable/user-guide/config-management-plugins/",children:"https://argo-cd.readthedocs.io/en/stable/user-guide/config-management-plugins/"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u652F\u6301\u4F7F\u7528 annotation argocd.argoproj.io/tracking-id \u8DDF\u8E2A\u8D44\u6E90\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E4B\u524D\u4F7F\u7528 label app.kubernetes.io/instance \u5BB9\u6613\u51B2\u7A81"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["argocd-cmp-server\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"ArgoCD ConfigManagementPlugin Server"}),"\n",(0,s.jsx)(e.li,{children:"sidecar container in reposerver deployment"}),"\n",(0,s.jsxs)(e.li,{children:["\u63D0\u4F9B\u63D2\u4EF6\u7BA1\u7406\u80FD\u529B\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"apiVersion: argoproj.io/v1alpha1"}),"\n",(0,s.jsx)(e.li,{children:"kind: ConfigManagementPlugin"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Helm v3.7.1 - pass credentials, OCI"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u9650\u5B9A cluster,repository \u5230 project"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ConfigMap\ndata:\n  # \u9ED8\u8BA4 label - \u652F\u6301 annotation+label, annotation\n  application.resourceTrackingMethod: annotation\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Secret\nmetadata:\n  name: kube-stub-cluster-repo\n  labels:\n    argocd.argoproj.io/secret-type: repository\ntype: Opaque\nstringData:\n  # \u9650\u5B9A Project\n  project: my-project1\n  name: kube-stub-cluster\n  url: https://github.com/wenerme/kube-stub-cluster.git\n  username:\n  password:\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",metastring:'title="ConfigManagementPlugin"',children:"apiVersion: argoproj.io/v1alpha1\nkind: ConfigManagementPlugin\nmetadata:\n  name: cdk8s\nspec:\n  version: v1.0\n  init:\n    command: [cdk8s, init]\n  generate:\n    command: [sh, -c, 'cdk8s synth && cat dist/*.yaml']\n  discovery:\n    fileName: main.ts\n"})}),"\n",(0,s.jsx)(e.h2,{id:"argocd-21",children:"ArgoCD 2.1"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u62C6\u5206 Argo CD Core\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E0D\u96C6\u6210 RBAC \u548C\u6743\u9650"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"\u589E\u52A0 Repo \u7F13\u5B58\u786E\u4FDD\u4E00\u4E2A revision \u53EA\u8BF7\u6C42\u4E00\u6B21 git - \u63D0\u9AD8\u6027\u80FD\u548C\u901F\u5EA6"}),"\n",(0,s.jsxs)(e.li,{children:["argocd-cm \u652F\u6301\u5F15\u7528 secret \u8FDB\u884C\u914D\u7F6E\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://argoproj.github.io/argo-cd/operator-manual/argocd-cmd-params-cm.yaml",children:"argocd-cmd-params-cm.yaml"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"\u5BF9\u6BD4\u5FFD\u7565\u652F\u6301 jq \u8DEF\u5F84"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"# \u5355\u4E2A\u5E94\u7528\nspec:\n  ignoreDifferences:\n    - group: apps\n      kind: Deployment\n      jqPathExpressions:\n        - .spec.template.spec.initContainers[] | select(.name == \"injected-init-container\")\n# \u5168\u5C40\u914D\u7F6E\ndata:\n  resource.customizations.ignoreDifferences.admissionregistration.k8s.io_MutatingWebhookConfiguration: |\n    jqPathExpressions:\n    - '.webhooks[]?.clientConfig.caBundle'\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 Secret Repositor - \u4E0D\u518D\u9700\u8981\u4FEE\u6539 argocd-cm"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Secret\nmetadata:\n  annotations:\n    managed-by: argocd.argoproj.io\n  labels:\n    argocd.argoproj.io/secret-type: repository\n  name: my-repo-secret\nstringData:\n  username: my-username\n  password: my-password\n  type: git\n  url: https://github.com/argoproj/argocd-example-apps\n"})}),"\n",(0,s.jsx)(e.h2,{id:"20",children:"2.0"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Pods View\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u65B0\u589E Pod \u89C6\u56FE - \u53EF\u67E5\u770B Pod \u5206\u5E03\u60C5\u51B5"}),"\n",(0,s.jsx)(e.li,{children:"Pod \u975E\u5E38\u591A\u7684\u65F6\u5019\u5F88\u6709\u7528"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Logs Viewer\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u5206\u9875\u3001\u8FC7\u6EE4\u3001Dark \u6A21\u5F0F"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u805A\u5408\u591A\u4E2A Pod \u65E5\u5FD7 - Deployment\u3001ReplicaSet\u3001STS"}),"\n",(0,s.jsxs)(e.li,{children:["\u547D\u4EE4\u884C ",(0,s.jsx)(e.code,{children:"rgocd app logs"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u65B0\u589E Banner\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"ui.bannercontent"}),"\n",(0,s.jsx)(e.li,{children:"ui.bannerurl"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["PrunePropagationPolicy=background\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u540C\u6B65\u65F6\u540E\u53F0\u6E05\u9664\u81EA\u613F - \u73B0\u5728\u7684\u903B\u8F91\u53EF\u80FD\u5BFC\u81F4 delet \u5361\u6B7B"}),"\n",(0,s.jsx)(e.li,{children:"Foreground - k8s \u5FC5\u987B\u5220\u9664\u6240\u6709 child \u8D44\u6E90\u624D\u80FD\u5220\u9664\u8D44\u6E90\u672C\u8EAB"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["finalizer resources-finalizer.argocd.argoproj.io:background\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5220\u9664\u5E94\u7528\u65F6\u540E\u53F0\u5904\u7406"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["ApplyOutOfSyncOnly=true\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u53EA\u540C\u6B65\u4E0D\u540C\u6B65\u8D44\u6E90"}),"\n",(0,s.jsx)(e.li,{children:"\u9ED8\u8BA4\u662F kubectl apply \u6240\u6709 - \u6162"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["PruneLast=true\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5728\u540C\u6B65\u6700\u540E\u6E05\u9664\u8D44\u6E90"}),"\n",(0,s.jsx)(e.li,{children:"\u4F8B\u5982 \u6700\u540E\u5220\u9664\u914D\u7F6E\uFF0C\u5148\u6E05\u7406 Pod \u7B49\u8D44\u6E90"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u72EC\u7ACB\u8D44\u6E90\u914D\u7F6E - argocd.argoproj.io/sync-options"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5065\u5EB7\u68C0\u67E5\u652F\u6301\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"sealed-secrets - \u4E4B\u524D\u5982\u679C secret \u9519\u8BEF\u65E0\u6CD5\u53D1\u73B0"}),"\n",(0,s.jsx)(e.li,{children:"kubernetes-external-secrets"}),"\n",(0,s.jsx)(e.li,{children:"strimzi"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/argoproj/argo-cd/releases/tag/v2.0.0",children:"v2.0.0"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"18",children:"1.8"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["mono-repository \u5904\u7406\u6548\u7387\u589E\u5F3A\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u540C commit \u5E76\u884C\u5904\u7406 - \u4E4B\u524D\u662F\u6BCF\u4E2A\u90FD\u8981\u5904\u7406\u4E00\u904D"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"argocd.argoproj.io/manifest-generate-paths"})}),"\n",(0,s.jsxs)(e.li,{children:["argocd-application-controller \u7EC4\u4EF6\u652F\u6301\u6C34\u5E73\u6269\u5BB9\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u66F4\u597D\u7BA1\u7406\u591A\u96C6\u7FA4"}),"\n",(0,s.jsxs)(e.li,{children:["\u26A0\uFE0F depolyment -> statuefulset\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u5347\u7EA7\u540E\u9700\u8981\u624B\u52A8\u5220\u9664 ",(0,s.jsx)(e.code,{children:"kubectl -n argocd delete deploy argocd-application-controller"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"\u5B50\u5E94\u7528\u5065\u5EB7\u72B6\u6001\u4E0D\u5F71\u54CD\u7236\u5E94\u7528"}),"\n",(0,s.jsx)(e.li,{children:"\u5168\u5C40 Project"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://argoproj.github.io/argo-cd/operator-manual/upgrading/1.7-1.8/",children:"v1.7 to 1.8"})}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(t,{...n})}):t(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return o},a:function(){return a}});var i=r(75271);let s={},l=i.createContext(s);function a(n){let e=i.useContext(l);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:a(n.components),i.createElement(l.Provider,{value:e},n.children)}}}]);