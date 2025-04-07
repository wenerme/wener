"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["79327"],{98925:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>o,default:()=>h,assets:()=>l,toc:()=>c,frontMatter:()=>a});var t=JSON.parse('{"id":"devops/kubernetes/network/nginx-ingress","title":"Nginx Ingress","description":"- kubernetes/ingress-nginx","source":"@site/../notes/devops/kubernetes/network/nginx-ingress.md","sourceDirName":"devops/kubernetes/network","slug":"/devops/kubernetes/network/nginx-ingress","permalink":"/notes/devops/kubernetes/network/nginx-ingress","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/network/nginx-ingress.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1646642462000,"frontMatter":{"title":"Nginx Ingress"},"sidebar":"docs","previous":{"title":"nginx-ingress version","permalink":"/notes/devops/kubernetes/network/nginx-ingress-version"},"next":{"title":"Traefik Ingress","permalink":"/notes/devops/kubernetes/network/traefik-ingress"}}'),i=s("52676"),r=s("79938");let a={title:"Nginx Ingress"},o="Nginx Ingress",l={},c=[{value:"config",id:"config",level:2},{value:"\u7C98\u6027\u4F1A\u8BDD",id:"\u7C98\u6027\u4F1A\u8BDD",level:3},{value:"grpc",id:"grpc",level:3},{value:"cors",id:"cors",level:3},{value:"ConfigMap",id:"configmap",level:3},{value:"\u5B89\u88C5",id:"\u5B89\u88C5",level:2},{value:"Examples",id:"examples",level:2},{value:"FastCGI",id:"fastcgi",level:2},{value:"\u9ED8\u8BA4 backend",id:"\u9ED8\u8BA4-backend",level:2},{value:"auth",id:"auth",level:2},{value:"basic",id:"basic",level:3},{value:"external basic",id:"external-basic",level:3},{value:"cert",id:"cert",level:3},{value:"controller",id:"controller",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"nginx-ingress",children:"Nginx Ingress"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/kubernetes/ingress-nginx",children:"kubernetes/ingress-nginx"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u57FA\u4E8E Nginx \u5B9E\u73B0\u7684 Ingress API"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6A21\u7248\u8DEF\u5F84 ",(0,i.jsx)(n.a,{href:"https://github.com/kubernetes/ingress-nginx/blob/master/rootfs/etc/nginx/template/nginx.tmpl",children:"/etc/nginx/template/nginx.tmpl"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301\u81EA\u5B9A\u4E49 ",(0,i.jsx)(n.a,{href:"https://github.com/kubernetes/ingress-nginx/blob/master/rootfs/etc/nginx/lua/plugins/README.md",children:"Lua \u63D2\u4EF6"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u65E0\u6CD5\u5168\u5C40\u6DFB\u52A0 cert\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u53EF\u4EE5\u8BBE\u7F6E\u9ED8\u8BA4 ",(0,i.jsx)(n.code,{children:"--default-ssl-certificate"})," \u6307\u5411 secret - \u4F8B\u5982 ",(0,i.jsx)(n.code,{children:"default/foo-tls"})]}),"\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u4F7F\u7528 self-signed"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/#websockets",children:"Websocket"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"proxy-read-timeout \u548C proxy-send-timeout \u9ED8\u8BA4 60s"}),"\n",(0,i.jsx)(n.li,{children:"\u5BF9\u4E8E websocket \u5EFA\u8BAE 3600"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u63D2\u4EF6\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/kubectl-plugin/",children:"https://kubernetes.github.io/ingress-nginx/kubectl-plugin/"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/",children:"https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/"})}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4 ssl-passthrough \u672A\u5F00\u542F\uFF0C\u4E0D\u652F\u6301 SNI\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u542F\u7528\u5BF9\u6027\u80FD\u5F71\u54CD\u5F88\u5927"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 Gateway API ",(0,i.jsx)(n.a,{href:"https://github.com/kubernetes/ingress-nginx/issues/7517",children:"kubernetes/ingress-nginx#7517"})]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'POD_NAME=$(kubectl get pods --selector "app.kubernetes.io/name=ingress-nginx" --all-namespaces --output=name | head -1)\n# \u67E5\u770B Nginx \u914D\u7F6E\nkubectl exec -n ingress-nginx -it $POD_NAME -- cat /etc/nginx/nginx.conf\n'})}),"\n",(0,i.jsx)(n.h2,{id:"config",children:"config"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u524D\u7F00 ",(0,i.jsx)(n.code,{children:"nginx.ingress.kubernetes.io"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/",children:"annotations"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/",children:"configmap"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/cli-arguments/",children:"args"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"annotation"}),(0,i.jsx)(n.th,{children:"value"}),(0,i.jsx)(n.th,{children:"note"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"configuration-snippet"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"server-snippet"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"service-upstream"}),(0,i.jsx)(n.td,{children:"false"}),(0,i.jsx)(n.td,{children:"\u8BBF\u95EE service \u800C\u4E0D\u662F pod"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"upstream-vhost"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"proxy_set_header Host $host"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"proxy-body-size"}),(0,i.jsx)(n.td,{children:"1m"}),(0,i.jsx)(n.td,{children:"\u63A8\u8350\u8BBE\u7F6E\u7A0D\u5FAE\u5927\u70B9"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"whitelist-source-range"}),(0,i.jsx)(n.td,{children:"CIDR"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"proxy-buffering"}),(0,i.jsx)(n.td,{children:"off"}),(0,i.jsx)(n.td,{})]})]})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'# location \u81EA\u5B9A\u4E49\nnginx.ingress.kubernetes.io/configuration-snippet: |\n  more_set_headers "Request-Id: $req_id";\n# server \u81EA\u5B9A\u4E49\nnginx.ingress.kubernetes.io/server-snippet: |\n  set $agentflag 0;\n\n  if ($http_user_agent ~* "(Mobile)" ){\n    set $agentflag 1;\n  }\n\n  if ( $agentflag = 1 ) {\n    return 301 https://m.example.com;\n  }\n\n# \u522B\u540D\nnginx.ingress.kubernetes.io/server-alias: \'<alias 1>,<alias 2>\'\n'})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"configmap"}),(0,i.jsx)(n.th,{children:"value"}),(0,i.jsx)(n.th,{children:"note"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"use-proxy-protocol"}),(0,i.jsx)(n.td,{children:"false"}),(0,i.jsx)(n.td,{children:"HAProxy Proxy Protocol"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"enable-brotli"}),(0,i.jsx)(n.td,{children:"false"}),(0,i.jsx)(n.td,{children:"Safari >= 11"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"flag"}),(0,i.jsx)(n.th,{children:"value"}),(0,i.jsx)(n.th,{children:"note"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"--enable-ssl-passthrough"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{})]})})]}),"\n",(0,i.jsx)(n.h3,{id:"\u7C98\u6027\u4F1A\u8BDD",children:"\u7C98\u6027\u4F1A\u8BDD"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"nginx.ingress.kubernetes.io/affinity: cookie\n# \u9ED8\u8BA4 balanced \u6A21\u5F0F - \u6269\u7F29\u5BB9\u7684\u65F6\u5019\u4F1A\u53D8\nnginx.ingress.kubernetes.io/affinity-mode: persistent\n# \u9ED8\u8BA4 INGRESSCOOKIE\nnginx.ingress.kubernetes.io/session-cookie-name: _sticky\n# \u9ED8\u8BA4\u4E3A ingress match \u7684\u8DEF\u5F84\n# nginx.ingress.kubernetes.io/session-cookie-path: /\n# None, Lax, Strict\n# nginx.ingress.kubernetes.io/session-cookie-samesite: None\n\n# Will omit SameSite=None attribute for older browsers which reject the more-recently defined SameSite=None value\n# nginx.ingress.kubernetes.io/session-cookie-conditional-samesite-none: 'true'\n\n# Expires\nnginx.ingress.kubernetes.io/session-cookie-expires: '172800'\n# Max-Age\nnginx.ingress.kubernetes.io/session-cookie-max-age: '172800'\n\n# \u9ED8\u8BA4 false - \u5F53\u8BF7\u6C42\u4E0A\u6E38\u5931\u8D25\u65F6\u4FEE\u6539 cookie\nnginx.ingress.kubernetes.io/session-cookie-change-on-failure: 'true'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"grpc",children:"grpc"}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6CE8\u610F body \u9ED8\u8BA4 4MB \u9650\u5236"}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"annotations:\n  # GRPCS - \u540E\u7AEF\u81EA\u884C\u5904\u7406 TLS\n  nginx.ingress.kubernetes.io/backend-protocol: 'GRPCS'\n  # GRPC - \u7531 nginx \u5904\u7406 TLS\n  nginx.ingress.kubernetes.io/backend-protocol: 'GRPC'\n  nginx.ingress.kubernetes.io/ssl-redirect: 'true'\n\n  # \u5982\u679C\u8981\u4F7F\u7528 stream \u8003\u8651\u8BBE\u7F6E\u957F\u4E00\u70B9\u7684\u8D85\u65F6\n  nginx.ingress.kubernetes.io/server-snippet: |\n    grpc_read_timeout \"1200s\";\n    grpc_send_timeout \"1200s\";\n    client_body_timeout \"1200s\";\n"})}),"\n",(0,i.jsx)(n.h3,{id:"cors",children:"cors"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"nginx.ingress.kubernetes.io/enable-cors: 'true'\n# \u9ED8\u8BA4\u6240\u6709\nnginx.ingress.kubernetes.io/cors-allow-origin: 'https://wener.me'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"configmap",children:"ConfigMap"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap",children:"configmap"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# \u9690\u85CF Proxy \u7684\u5934\n#hide-headers: Server\n# \u9ED8\u8BA4\u4F1A\u8FD4\u56DE Server \u5934\nserver-tokens: 'false'\n# \u9ED8\u8BA4 1m\nproxy-body-size: 5m\n\n# \u751F\u6210 RequestID\ngenerate-request-id: 'true'\n\n# \u81EA\u5B9A\u4E49\u811A\u672C\nmain-snippet: ''\nhttp-snippet: ''\nserver-snippet: ''\nlocation-snippet: ''\n\n# \u6765\u6E90\u767D\u540D\u5355\nwhitelist-source-range: ''\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5B89\u88C5",children:"\u5B89\u88C5"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# HELM\nhelm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx\nhelm install my-release ingress-nginx/ingress-nginx\n\n# manifest\nver=$(curl -Ls https://api.github.com/repos/kubernetes/ingress-nginx/releases/latest | jq -r .tag_name)\ncurl -LC- https://raw.githubusercontent.com/kubernetes/ingress-nginx/$ver/deploy/static/provider/baremetal/deploy.yaml -o nginx-ingress-baremetal-$ver.yaml\nkubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/baremetal/deploy.yaml\n\n# wener helm charts\nhelm repo add wener https://charts.wener.tech\nhelm install ingress-nginx wener/ingress-nginx -n ingress-nginx -v nginx.values.yaml\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"values.yaml"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"config:\n  hide-headers: 'Server'\ncontroller:\n  image:\n    # use mirror\n    # k8s.gcr.io/ingress-nginx/controller\n    repository: registry.cn-hongkong.aliyuncs.com/cmi/ingress-nginx_controller\n    # disable digest\n    digest: ''\n  # \u4EE5 DaemonSet \u5B89\u88C5\n  kind: DaemonSet\n  # 80 \u7AEF\u53E3\n  hostPort:\n    enabled: true\n  # \u662F\u5426\u542F\u7528 /metrics\n  metrics:\n    enabled: true\n    # \u662F\u5426\u5B89\u88C5 kube-prometheus\n    serviceMonitor:\n      enabled: false\n  prometheusRule:\n    enabled: false\n  admissionWebhooks:\n    patch:\n      image:\n        repository: registry.cn-hongkong.aliyuncs.com/cmi/jettech_kube-webhook-certgen\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="Proxy Protocol"',children:"controller:\n  service:\n    annotations:\n      haproxy.org/send-proxy-protocol: proxy\n  config:\n    use-proxy-protocol: 'true'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# https://github.com/kubernetes/ingress-nginx/blob/master/docs/examples/rewrite/README.md\napiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /$2\n  name: rewrite\n  namespace: default\nspec:\n  rules:\n    - host: rewrite.bar.com\n      http:\n        paths:\n          - backend:\n              serviceName: http-svc\n              servicePort: 80\n            path: /something(/|$)(.*)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"fastcgi",children:"FastCGI"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    kubernetes.io/ingress.class: 'nginx'\n    nginx.ingress.kubernetes.io/backend-protocol: 'FCGI'\n    nginx.ingress.kubernetes.io/fastcgi-index: 'index.php'\n    # \u5B58\u653E\u989D\u5916\u53C2\u6570\n    nginx.ingress.kubernetes.io/fastcgi-params-configmap: 'example-cm'\n    # nginx.ingress.kubernetes.io/fastcgi-params-configmap: \"example-namespace/example-configmap\"\n  name: example-app\nspec:\n  rules:\n    - host: app.example.com\n      http:\n        paths:\n          - backend:\n              serviceName: example-service\n              servicePort: fastcgi\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u9ED8\u8BA4-backend",children:"\u9ED8\u8BA4 backend"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  name: no-rules-map\nspec:\n  tls:\n    - hosts:\n        - 'wener.me'\n        - '*.wener.me'\n      secretName: wener-me-cert\n  backend:\n    serviceName: def\n    servicePort: 80\n"})}),"\n",(0,i.jsx)(n.h2,{id:"auth",children:"auth"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/",children:"https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"basic",children:"basic"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\ndata:\n  auth: Zm9vOiRhcHIxJE9GRzNYeWJwJGNrTDBGSERBa29YWUlsSDkuY3lzVDAK\nkind: Secret\nmetadata:\n  name: basic-auth\n  namespace: default\ntype: Opaque\n---\napiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  name: ingress-with-auth\n  annotations:\n    # \u8BA4\u8BC1\u7C7B\u578B\n    nginx.ingress.kubernetes.io/auth-type: basic\n    # \u5B58\u50A8\u4E86 auth \u7684 secret\n    nginx.ingress.kubernetes.io/auth-secret: basic-auth\n    # \u663E\u793A\u4FE1\u606F\n    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required - foo'\nspec:\n  rules:\n    - host: foo.bar.com\n      http:\n        paths:\n          - path: /\n            backend:\n              serviceName: http-svc\n              servicePort: 80\n"})}),"\n",(0,i.jsx)(n.h3,{id:"external-basic",children:"external basic"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    nginx.ingress.kubernetes.io/auth-url: https://httpbin.org/basic-auth/user/passwd\n  name: external-auth\n  namespace: default\nspec:\n  rules:\n    - host: external-auth-01.sample.com\n      http:\n        paths:\n          - backend:\n              serviceName: http-svc\n              servicePort: 80\n            path: /\n"})}),"\n",(0,i.jsx)(n.h3,{id:"cert",children:"cert"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"apiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    # Enable client certificate authentication\n    nginx.ingress.kubernetes.io/auth-tls-verify-client: 'on'\n    # Create the secret containing the trusted ca certificates\n    nginx.ingress.kubernetes.io/auth-tls-secret: 'default/ca-secret'\n    # Specify the verification depth in the client certificates chain\n    nginx.ingress.kubernetes.io/auth-tls-verify-depth: '1'\n    # Specify an error page to be redirected to verification errors\n    nginx.ingress.kubernetes.io/auth-tls-error-page: 'http://www.mysite.com/error-cert.html'\n    # Specify if certificates are passed to upstream server\n    nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream: 'true'\n  name: nginx-test\n  namespace: default\nspec:\n  rules:\n    - host: mydomain.com\n      http:\n        paths:\n          - backend:\n              serviceName: http-svc\n              servicePort: 80\n            path: /\n  tls:\n    - hosts:\n        - mydomain.com\n      secretName: tls-secret\n"})}),"\n",(0,i.jsx)(n.h2,{id:"controller",children:"controller"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"    1 www-data  0:00 /usr/bin/dumb-init -- /nginx-ingress-controller --publish-service=ingress-nginx/ingress-nginx-controller --election-id=ingress-controller-leader --ingress-class=nginx --configmap=ingress-nginx/ingress-nginx-controller --validating-webhook=:8443 --validating-webhook-certificate=/usr/local/certificates/cert --validating-webhook-key=/usr/local/certificates/key\n    6 www-data  0:00 /nginx-ingress-controller --publish-service=ingress-nginx/ingress-nginx-controller --election-id=ingress-controller-leader --ingress-class=nginx --configmap=ingress-nginx/ingress-nginx-controller --validating-webhook=:8443 --validating-webhook-certificate=/usr/local/certificates/cert --validating-webhook-key=/usr/local/certificates/key\n   26 www-data  0:00 nginx: master process /usr/local/nginx/sbin/nginx -c /etc/nginx/nginx.conf\n   37 www-data  2:15 nginx: worker process is shutting down\n  105 www-data  0:00 /wait-shutdown\n  117 root      0:00 bash\n  136 root      0:00 ps aux\n  137 root      0:00 tee\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'/nginx-ingress-controller --help\n-------------------------------------------------------------------------------\nNGINX Ingress controller\n  Release:       v0.35.0\n  Build:         54ad65e32bcab32791ab18531a838d1c0f0811ef\n  Repository:    https://github.com/kubernetes/ingress-nginx\n  nginx version: nginx/1.19.2\n\n-------------------------------------------------------------------------------\n\nUsage of :\n      --add_dir_header                          If true, adds the file directory to the header of the log messages\n      --alsologtostderr                         log to standard error as well as files\n      --annotations-prefix string               Prefix of the Ingress annotations specific to the NGINX controller. (default "nginx.ingress.kubernetes.io")\n      --apiserver-host string                   Address of the Kubernetes API server.\n                                                Takes the form "protocol://address:port". If not specified, it is assumed the\n                                                program runs inside a Kubernetes cluster and local discovery is attempted.\n      --certificate-authority string            Path to a cert file for the certificate authority. This certificate is used\n                                                only when the flag --apiserver-host is specified.\n      --configmap string                        Name of the ConfigMap containing custom global configurations for the controller.\n      --default-backend-service string          Service used to serve HTTP requests not matching any known server name (catch-all).\n                                                Takes the form "namespace/name". The controller configures NGINX to forward\n                                                requests to the first port of this Service.\n      --default-server-port int                 Port to use for exposing the default server (catch-all). (default 8181)\n      --default-ssl-certificate string          Secret containing a SSL certificate to be used by the default HTTPS server (catch-all).\n                                                Takes the form "namespace/name".\n      --disable-catch-all                       Disable support for catch-all Ingresses\n      --election-id string                      Election id to use for Ingress status updates. (default "ingress-controller-leader")\n      --enable-metrics                          Enables the collection of NGINX metrics (default true)\n      --enable-ssl-chain-completion             Autocomplete SSL certificate chains with missing intermediate CA certificates.\n                                                Certificates uploaded to Kubernetes must have the "Authority Information Access" X.509 v3\n                                                extension for this to succeed.\n      --enable-ssl-passthrough                  Enable SSL Passthrough.\n      --health-check-path string                URL path of the health check endpoint.\n                                                Configured inside the NGINX status server. All requests received on the port\n                                                defined by the healthz-port parameter are forwarded internally to this path. (default "/healthz")\n      --health-check-timeout int                Time limit, in seconds, for a probe to health-check-path to succeed. (default 10)\n      --healthz-port int                        Port to use for the healthz endpoint. (default 10254)\n      --http-port int                           Port to use for servicing HTTP traffic. (default 80)\n      --https-port int                          Port to use for servicing HTTPS traffic. (default 443)\n      --ingress-class string                    Name of the ingress class this controller satisfies.\n                                                The class of an Ingress object is set using the field IngressClassName in Kubernetes clusters version v1.18.0 or higher or the annotation "kubernetes.io/ingress.class" (deprecated).\n                                                If this parameter is not set, or set to the default value of "nginx", it will handle ingresses with either an empty or "nginx" class name.\n      --kubeconfig string                       Path to a kubeconfig file containing authorization and API server information.\n      --log_backtrace_at traceLocation          when logging hits line file:N, emit a stack trace (default :0)\n      --log_dir string                          If non-empty, write log files in this directory\n      --log_file string                         If non-empty, use this log file\n      --log_file_max_size uint                  Defines the maximum size a log file can grow to. Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)\n      --logtostderr                             log to standard error instead of files (default true)\n      --maxmind-edition-ids string              Maxmind edition ids to download GeoLite2 Databases. (default "GeoLite2-City,GeoLite2-ASN")\n      --maxmind-license-key string              Maxmind license key to download GeoLite2 Databases.\n                                                https://blog.maxmind.com/2019/12/18/significant-changes-to-accessing-and-using-geolite2-databases\n      --metrics-per-host                        Export metrics per-host (default true)\n      --monitor-max-batch-size int              Max batch size of NGINX metrics (default 10000)\n      --profiler-port int                       Port to use for expose the ingress controller Go profiler when it is enabled. (default 10245)\n      --profiling                               Enable profiling via web interface host:port/debug/pprof/ (default true)\n      --publish-service string                  Service fronting the Ingress controller.\n                                                Takes the form "namespace/name". When used together with update-status, the\n                                                controller mirrors the address of this service\'s endpoints to the load-balancer\n                                                status of all Ingress objects it satisfies.\n      --publish-status-address string           Customized address to set as the load-balancer status of Ingress objects this controller satisfies.\n                                                Requires the update-status parameter.\n      --report-node-internal-ip-address         Set the load-balancer status of Ingress objects to internal Node addresses instead of external.\n                                                Requires the update-status parameter.\n      --skip_headers                            If true, avoid header prefixes in the log messages\n      --skip_log_headers                        If true, avoid headers when opening log files\n      --ssl-passthrough-proxy-port int          Port to use internally for SSL Passthrough. (default 442)\n      --status-port int                         Port to use for the lua HTTP endpoint configuration. (default 10246)\n      --status-update-interval int              Time interval in seconds in which the status should check if an update is required. Default is 60 seconds (default 60)\n      --stderrthreshold severity                logs at or above this threshold go to stderr (default 2)\n      --stream-port int                         Port to use for the lua TCP/UDP endpoint configuration. (default 10247)\n      --sync-period duration                    Period at which the controller forces the repopulation of its local object stores. Disabled by default.\n      --sync-rate-limit float32                 Define the sync frequency upper limit (default 0.3)\n      --tcp-services-configmap string           Name of the ConfigMap containing the definition of the TCP services to expose.\n                                                The key in the map indicates the external port to be used. The value is a\n                                                reference to a Service in the form "namespace/name:port", where "port" can\n                                                either be a port number or name. TCP ports 80 and 443 are reserved by the\n                                                controller for servicing HTTP traffic.\n      --udp-services-configmap string           Name of the ConfigMap containing the definition of the UDP services to expose.\n                                                The key in the map indicates the external port to be used. The value is a\n                                                reference to a Service in the form "namespace/name:port", where "port" can\n                                                either be a port name or number.\n      --update-status                           Update the load-balancer status of Ingress objects this controller satisfies.\n                                                Requires setting the publish-service parameter to a valid Service reference. (default true)\n      --update-status-on-shutdown               Update the load-balancer status of Ingress objects when the controller shuts down.\n                                                Requires the update-status parameter. (default true)\n  -v, --v Level                                 number for the log level verbosity\n      --validating-webhook string               The address to start an admission controller on to validate incoming ingresses.\n                                                Takes the form "<host>:port". If not provided, no admission controller is started.\n      --validating-webhook-certificate string   The path of the validating webhook certificate PEM.\n      --validating-webhook-key string           The path of the validating webhook key PEM.\n      --version                                 Show release information about the NGINX Ingress controller and exit.\n      --vmodule moduleSpec                      comma-separated list of pattern=N settings for file-filtered logging\n      --watch-namespace string                  Namespace the controller watches for updates to Kubernetes objects.\n                                                This includes Ingresses, Services and all configuration resources. All\n                                                namespaces are watched if this parameter is left empty.\npflag: help requested\n'})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return a}});var t=s(75271);let i={},r=t.createContext(i);function a(e){let n=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);