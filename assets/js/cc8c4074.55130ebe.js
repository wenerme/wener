"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36960"],{13407:function(e,n,r){r.r(n),r.d(n,{metadata:()=>o,contentTitle:()=>l,default:()=>h,assets:()=>i,toc:()=>c,frontMatter:()=>a});var o=JSON.parse('{"id":"devops/kubernetes/app/argo/workflow/README","title":"Argo Workflow","description":"- argoproj/argo-workflows \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/devops/kubernetes/app/argo/workflow/README.md","sourceDirName":"devops/kubernetes/app/argo/workflow","slug":"/devops/kubernetes/app/argo/workflow/","permalink":"/notes/devops/kubernetes/app/argo/workflow/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/app/argo/workflow/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1699003495000,"frontMatter":{"title":"Argo Workflow"},"sidebar":"docs","previous":{"title":"Argo","permalink":"/notes/devops/kubernetes/app/argo/"},"next":{"title":"Executor","permalink":"/notes/devops/kubernetes/app/argo/workflow/executor"}}'),t=r("52676"),s=r("79938");let a={title:"Argo Workflow"},l="Argo Workflow",i={},c=[{value:"\u5B89\u88C5",id:"\u5B89\u88C5",level:2},{value:"Workflow",id:"workflow",level:2},{value:"\u914D\u7F6E",id:"\u914D\u7F6E",level:3}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"argo-workflow",children:"Argo Workflow"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/argoproj/argo-workflows",children:"argoproj/argo-workflows"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Cloud Native \u5DE5\u4F5C\u6D41\u5F15\u64CE"}),"\n",(0,t.jsx)(n.li,{children:"CRD \u7BA1\u7406"}),"\n",(0,t.jsx)(n.li,{children:"\u6BCF\u4E2A\u6B65\u9AA4\u90FD\u662F\u5BB9\u5668"}),"\n",(0,t.jsx)(n.li,{children:"\u9002\u7528\u8BA1\u7B97\u5BC6\u96C6\u578B\u4EFB\u52A1 - \u673A\u5668\u5B66\u4E60, \u6570\u636E\u5904\u7406"}),"\n",(0,t.jsx)(n.li,{children:"\u9002\u7528\u4E8E CI/CD \u573A\u666F"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["adopted by\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"kubeflow"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u7528\u5230\u7684\u955C\u50CF\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"argoproj/argocli"}),"\n",(0,t.jsx)(n.li,{children:"argoproj/workflow-controller"}),"\n",(0,t.jsx)(n.li,{children:"argoproj/argoexec - executor"}),"\n",(0,t.jsx)(n.li,{children:"argoproj/argosay - \u6F14\u793A\u6D41\u7A0B\u4F7F\u7528\u7684\u955C\u50CF"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://argoproj.github.io/argo-workflows/workflow-executors/",children:"workflow-executors"})}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Use Cases ",(0,t.jsx)(n.a,{href:"https://argoproj.github.io/argo-workflows/use-cases/ci-cd/",children:"https://argoproj.github.io/argo-workflows/use-cases/ci-cd/"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"CI/CD"}),"\n",(0,t.jsx)(n.li,{children:"Data Processing"}),"\n",(0,t.jsx)(n.li,{children:"Infrastructure Automation"}),"\n",(0,t.jsx)(n.li,{children:"Machine Learning"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://argoproj-labs.github.io/argo-workflows-catalog/",children:"https://argoproj-labs.github.io/argo-workflows-catalog/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u5B89\u88C5",children:"\u5B89\u88C5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5B89\u88C5\u65B9\u5F0F\n# install.yaml - \u96C6\u7FA4\u7EAC\u5EA6\uFF0C\u6240\u6709\u547D\u540D\u7A7A\u95F4\n# namespace-install.yaml - argo \u547D\u540D\u7A7A\u95F4\n# \u4F1A\u90E8\u7F72 argo-server \u548C workflow-controller\n# \u914D\u7F6E - workflow-controller-configmap\n# https://github.com/argoproj/argo-workflows/tree/stable/manifests\nkubectl create ns argo\nkubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo-workflows/stable/manifests/namespace-install.yaml\n# \u9ED8\u8BA4\u4E0D\u9700\u8981 login - \u53EF\u4EE5\u81EA\u5DF1\u6DFB\u52A0 sso \u6216\u8005\u8C03\u6574 authmode\n\n# \u547D\u4EE4\u884C\u5DE5\u5177\nbrew install argo\n# \u83B7\u53D6\u767B\u9646 token\n# argo auth token\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: argo-ingress\n  namespace: argo\nspec:\n  rules:\n    - host: argo.example.com\n      http:\n        paths:\n          - backend:\n              service:\n                name: argo-server\n                port:\n                  name: web\n            pathType: ImplementationSpecific\n"})}),"\n",(0,t.jsx)(n.h2,{id:"workflow",children:"Workflow"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"metadata:\n  name: delightful-rhino\n  labels:\n    example: 'true'\nspec:\n  arguments:\n    parameters:\n      - name: message\n        value: hello argo\n  entrypoint: argosay\n  templates:\n    - name: argosay\n      inputs:\n        parameters:\n          - name: message\n            value: '{{workflow.parameters.message}}'\n      container:\n        name: main\n        image: 'argoproj/argosay:v2'\n        command:\n          - /argosay\n        args:\n          - echo\n          - '{{inputs.parameters.message}}'\n  ttlStrategy:\n    secondsAfterCompletion: 300\n  podGC:\n    strategy: OnPodCompletion\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u914D\u7F6E",children:"\u914D\u7F6E"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://argoproj.github.io/argo-workflows/workflow-controller-configmap.yaml",children:"https://argoproj.github.io/argo-workflows/workflow-controller-configmap.yaml"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# containerRuntimeExecutor: docker\ncontainerRuntimeExecutor: kubelet\n\n# SSO Configuration for the Argo server.\n# You must also start argo server with `--auth-mode sso`.\n# https://argoproj.github.io/argo/argo-server-auth-mode/\nsso: |\n  # This is the root URL of the OIDC provider (required).\n  issuer: https://issuer.root.url/\n  # This is name of the secret and the key in it that contain OIDC client\n  # ID issued to the application by the provider (required).\n  clientId:\n    name: client-id-secret\n    key: client-id-key\n  # This is name of the secret and the key in it that contain OIDC client\n  # secret issued to the application by the provider (required).\n  clientSecret:\n    name: client-secret-secret\n    key: client-secret-key\n  # This is the redirect URL supplied to the provider (required). It must\n  # be in the form <argo-server-root-url>/oauth2/callback. It must be\n  # browser-accessible.\n  redirectUrl: https://argo-server/oauth2/callback\n  # Additional scopes to request. Typically needed for SSO RBAC. >= v2.12\n  scopes:\n    - groups\n    - email\n  # RBAC Config. >= v2.12\n  rbac:\n    enabled: false\n"})})]})}function h(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return a}});var o=r(75271);let t={},s=o.createContext(t);function a(e){let n=o.useContext(s);return o.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);