"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["41686"],{82399:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>o,default:()=>h,assets:()=>c,toc:()=>l,frontMatter:()=>a});var s=JSON.parse('{"id":"devops/kubernetes/network/traefik-ingress","title":"Traefik Ingress","description":"- Traefik Ingress","source":"@site/../notes/devops/kubernetes/network/traefik-ingress.md","sourceDirName":"devops/kubernetes/network","slug":"/devops/kubernetes/network/traefik-ingress","permalink":"/notes/devops/kubernetes/network/traefik-ingress","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/network/traefik-ingress.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1629019137000,"frontMatter":{"title":"Traefik Ingress"},"sidebar":"docs","previous":{"title":"Nginx Ingress","permalink":"/notes/devops/kubernetes/network/nginx-ingress"},"next":{"title":"HELM \u5305\u7BA1\u7406\u5668","permalink":"/notes/devops/kubernetes/ops/helm"}}'),t=r("52676"),i=r("79938");let a={title:"Traefik Ingress"},o="Traefik Ingress",c={},l=[{value:"CRD",id:"crd",level:2},{value:"Ingress",id:"ingress",level:2},{value:"Cert Manager",id:"cert-manager",level:2},{value:"FAQ",id:"faq",level:2},{value:"Cannot create service: subset not found",id:"cannot-create-service-subset-not-found",level:3},{value:"TBD",id:"tbd",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"traefik-ingress",children:"Traefik Ingress"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://doc.traefik.io/traefik/providers/kubernetes-ingress/",children:"Traefik Ingress"})}),"\n",(0,t.jsxs)(n.li,{children:["Traefik \u7684 K8S \u5206\u4E3A CRD \u65B9\u5F0F\u548C\u6807\u51C6\u7684 IngressController\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"CRD \u652F\u6301\u66F4\u591A\u529F\u80FD - Helm \u5B89\u88C5"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Traefik \u652F\u6301\u975E\u5E38\u591A\u7684\u529F\u80FD - ACME, SNI, Dashboard, Tracing, Metrics"}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["traefik \u5185\u7F6E acme, \u4F46\u6709\u4E0D\u5C11\u95EE\u9898 - \u5B98\u65B9\u63A8\u8350\u4F7F\u7528 cert-manager\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5B98\u65B9 issues \u6392\u524D\u9762\u6709\u597D\u51E0\u4E2A\u5173\u4E8E\u8BC1\u4E66\u7684\u95EE\u9898"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53EA\u6709 repilca \u4E3A 1 \u624D\u652F\u6301 acme - \u5F00\u6E90\u7248\u4E0D\u652F\u6301\u96C6\u7FA4\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/traefik/traefik/issues/5426#issuecomment-533598163",children:"#5426"}),"\n\u5B98\u65B9\u8868\u660E \u793E\u533A\u7248 \u4E0D\u8003\u8651\u96C6\u7FA4"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Middleware \u901A\u8FC7 CRD \u5F15\u7528 - \u4F7F\u7528\u76F8\u5BF9\u9EBB\u70E6"}),"\n",(0,t.jsxs)(n.li,{children:["\u4F7F\u7528 Ingress \u65B9\u5F0F\u5F88\u591A\u529F\u80FD\u5F97\u4F7F\u7528 annotation \u975E\u5E38\u4E0D\u65B9\u4FBF\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F46\u76F4\u63A5\u4F7F\u7528 IngressRoute \u4F1A\u5BFC\u81F4 Vendor Lockin"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# \u8F6C\u53D1 9000\nkubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" -n traefik --output=name) 9000:9000 -n traefik\n'})}),"\n",(0,t.jsx)(n.h2,{id:"crd",children:"CRD"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/crd/fixtures",children:"\u793A\u4F8B\u8D44\u6E90\u914D\u7F6E"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"\u542F\u52A8\u53C2\u6570"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--global.checknewversion"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--global.sendanonymoususage"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--entryPoints.traefik.address=:9000"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--entryPoints.web.address=:8000"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--entryPoints.websecure.address=:8443"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--api.dashboard=true"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--ping=true"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--providers.kubernetescrd"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"--providers.kubernetesingress"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'helm repo add traefik https://containous.github.io/traefik-helm-chart\nhelm repo update\nhelm install traefik traefik/traefik\n\n# \u53EF\u5B89\u88C5\u5728\u72EC\u7ACB\u547D\u540D\u7A7A\u95F4\nkubectl create ns traefik\nhelm install --namespace=traefik \\\n    traefik traefik/traefik\n\n# \u8F6C\u53D1 dashboard \u5230\u672C\u5730 9000\n# \u7136\u540E\u8BBF\u95EE http://localhost:9000/dashboard/\nkubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000\n\n# \u53EF\u4EE5\u914D\u7F6E\u4E00\u4E2A Ingress \u7136\u540E\u5373\u53EF\u901A\u8FC7\u57DF\u540D\u8BBF\u95EE\ncat <<YAML\napiVersion: traefik.containo.us/v1alpha1\nkind: IngressRoute\nmetadata:\n  name: traefik-dashboard\n  namespace: traefik\nspec:\n  entryPoints:\n    - web\n    - traefik\n  routes:\n    - match: Host(`traefik.localhost`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))\n      kind: Rule\n      services:\n        - name: api@internal\n          kind: TraefikService\nYAML\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: traefik.containo.us/v1alpha1\nkind: IngressRoute\nmetadata:\n  name: foo\n  namespace: bar\nspec:\n  # \u5165\u53E3\n  entryPoints:\n    - foo\n  # \u8DEF\u7531\u914D\u7F6E\n  routes:\n    - kind: Rule\n      # \u8DEF\u7531\u5339\u914D\u89C4\u5219\n      match: Host(`test.example.com`)\n      # \u5339\u914D\u4F18\u5148\u7EA7\n      priority: 10\n      # \u5F15\u7528\u4E2D\u95F4\u4EF6\n      middlewares:\n        - name: middleware1\n          namespace: default\n      # \u540E\u7AEF\u670D\u52A1\n      services:\n        - kind: Service\n          name: foo\n          namespace: default\n          # \u900F\u4F20\u5934\u4FE1\u606F\n          passHostHeader: true\n          port: 80\n          responseForwarding:\n            flushInterval: 1ms\n          scheme: https\n          # \u7C98\u6027\u914D\u7F6E\n          sticky:\n            cookie:\n              httpOnly: true\n              name: cookie\n              secure: true\n              sameSite: none\n          # \u8D1F\u8F7D\u7B56\u7565\n          strategy: RoundRobin\n          weight: 10\n  # TLS\n  tls:\n    # \u5BC6\u94A5\u4FE1\u606F\n    secretName: supersecret\n    # TLSOption\n    options:\n      name: opt\n      namespace: default\n    certResolver: foo # CertResolver\n    domains: # TLS \u57DF\u540D\n      - main: example.net\n        sans:\n          - a.example.net\n          - b.example.net\n"})}),"\n",(0,t.jsx)(n.h2,{id:"ingress",children:"Ingress"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/containous/traefik/tree/v2.2/pkg/provider/kubernetes/ingress/fixtures",children:"\u793A\u4F8B\u8D44\u6E90\u914D\u7F6E"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.traefik.io/routing/providers/kubernetes-ingress/",children:"Kubernetes Ingress Controller"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# \u5168\u5C40\u9ED8\u8BA4\napiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  name: cheese\nspec:\n  backend:\n    serviceName: stilton\n    servicePort: 80\n\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: whoami\n  annotations:\n    # \u4FEE\u6539 schema\uFF1A http h2c https\n    traefik.ingress.kubernetes.io/service.serversscheme: https\n    # \u900F\u4F20 \u5934\n    traefik.ingress.kubernetes.io/service.passhostheader: 'true'\n    # \u7C98\u6027\u914D\u7F6E\n    traefik.ingress.kubernetes.io/service.sticky: 'true'\n    traefik.ingress.kubernetes.io/service.sticky.cookie.name: foobar\n    traefik.ingress.kubernetes.io/service.sticky.cookie.secure: 'true'\n    traefik.ingress.kubernetes.io/service.sticky.cookie.samesite: 'none'\n    traefik.ingress.kubernetes.io/service.sticky.cookie.httponly: 'true'\nspec:\n  type: LoadBalancer\n  selector:\n    app: whoami\n  ports:\n    - protocol: TCP\n      port: 80\n      name: web\n      targetPort: 80\n\n---\nkind: Ingress\napiVersion: networking.k8s.io/v1beta1\nmetadata:\n  name: myingress\n  annotations:\n    # \u7EC8\u7AEF\n    traefik.ingress.kubernetes.io/router.entrypoints: web,websecure\n    # \u4E2D\u95F4\u4EF6\n    traefik.ingress.kubernetes.io/router.middlewares: <namespace>-<name>@kubernetescrd,cb@file\n    # \u4F18\u5148\u7EA7\n    traefik.ingress.kubernetes.io/router.priority: '42'\n    # \u8DEF\u5F84\u5339\u914D\u65B9\u5F0F Path, PathPrefix\n    traefik.ingress.kubernetes.io/router.pathmatcher: PathPrefix\n\n    # \u662F\u5426 TLS\n    traefik.ingress.kubernetes.io/router.tls: 'true'\n    # \u89E3\u6790 TLS \u65B9\u5F0F\n    traefik.ingress.kubernetes.io/router.tls.certresolver: myresolver\n    # TLS \u7684 SNI \u57DF\u540D\n    traefik.ingress.kubernetes.io/router.tls.domains.0.main: example.org\n    traefik.ingress.kubernetes.io/router.tls.domains.0.sans: test.example.org,dev.example.org\n    traefik.ingress.kubernetes.io/router.tls.options: foobar\n\nspec:\n  # \u8BC1\u4E66\n  tls:\n    - secretName: supersecret\n  rules:\n    - host: example.com\n      http:\n        paths:\n          - path: /bar\n            backend:\n              serviceName: whoami\n              servicePort: 80\n"})}),"\n",(0,t.jsx)(n.h2,{id:"cert-manager",children:"Cert Manager"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/mmatur/traefik-cert-manager",children:"https://github.com/mmatur/traefik-cert-manager"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h3,{id:"cannot-create-service-subset-not-found",children:"Cannot create service: subset not found"}),"\n",(0,t.jsx)(n.h2,{id:"tbd",children:"TBD"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://docs.traefik.io/routing/providers/kubernetes-ingress/",children:"https://docs.traefik.io/routing/providers/kubernetes-ingress/"}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/rancher/k3s/issues/1141",children:"https://github.com/rancher/k3s/issues/1141"}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/containous/traefik-helm-chart",children:"https://github.com/containous/traefik-helm-chart"}),"\n",(0,t.jsx)(n.a,{href:"https://docs.traefik.io/getting-started/install-traefik/#use-the-helm-chart",children:"https://docs.traefik.io/getting-started/install-traefik/#use-the-helm-chart"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'kubectl port-forward $(kubectl get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000\n'})}),"\n",(0,t.jsx)(n.p,{children:"ClusterRoleBinding"}),"\n",(0,t.jsx)(n.p,{children:"error syncing 'traefik/traefik'\nhandler svccontroller: Operation cannot be fulfilled on \"svccontroller\": delaying object set, requeuing"}),"\n",(0,t.jsx)(n.p,{children:"INOTIFY_USR"})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return o},a:function(){return a}});var s=r(75271);let t={},i=s.createContext(t);function a(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);