"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["6239"],{10009:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>d,frontMatter:()=>a});var t=JSON.parse('{"id":"devops/kubernetes/network/emissary-ingress","title":"emissary-ingress","description":"- emissary-ingress/emissary","source":"@site/../notes/devops/kubernetes/network/emissary-ingress.md","sourceDirName":"devops/kubernetes/network","slug":"/devops/kubernetes/network/emissary-ingress","permalink":"/notes/devops/kubernetes/network/emissary-ingress","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/network/emissary-ingress.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1637477347000,"frontMatter":{"title":"emissary-ingress"},"sidebar":"docs","previous":{"title":"cilium","permalink":"/notes/devops/kubernetes/network/cilium"},"next":{"title":"Flannel","permalink":"/notes/devops/kubernetes/network/flannel"}}'),r=s("52676"),i=s("79938");let a={title:"emissary-ingress"},l="emissary-ingress",o={},d=[{value:"CDR",id:"cdr",level:2},{value:"Module",id:"module",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"emissary-ingress",children:"emissary-ingress"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/emissary-ingress/emissary",children:"emissary-ingress/emissary"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Apache-2.0, Go+Python"}),"\n",(0,r.jsx)(n.li,{children:"API Gateway + Layer 7 LB + Kubernetes Ingress"}),"\n",(0,r.jsx)(n.li,{children:"Envoy Proxy"}),"\n",(0,r.jsx)(n.li,{children:"\u4E4B\u524D\u4E3A Ambassador API Gateway"}),"\n",(0,r.jsx)(n.li,{children:"\u652F\u6301 Kubernetest Ingress \u548C Gateway API"}),"\n",(0,r.jsx)(n.li,{children:"\u5F88\u591A CDR \u4F9B\u81EA\u5B9A\u4E49\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.getambassador.io/docs/emissary/latest/about/alternatives/",children:"vs. Others"})}),"\n",(0,r.jsxs)(n.li,{children:["vs. Ambassador Edge Stack\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Edge Stack \u7684\u6838\u5FC3 - \u4F5C\u4E3A\u4E86 CNCF \u5B75\u5316\u9879\u76EE"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u529F\u80FD\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8DEF\u7531 - Ingress, Gateway API"}),"\n",(0,r.jsx)(n.li,{children:"\u5B89\u5168 - AuthService, RateLimitService"}),"\n",(0,r.jsxs)(n.li,{children:["\u76D1\u63A7 - TracingService\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"tracing"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u7EDF\u8BA1 - statd, /metrics"}),"\n",(0,r.jsx)(n.li,{children:"\u96C6\u6210 - Knative, Istio, Linkerd2, Consul"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"cdr",children:"CDR"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"getambassador.io/v3alpha1"}),"\n",(0,r.jsx)(n.li,{children:"Host - \u53EF\u8BBF\u95EE\u5165\u53E3 Hostname"}),"\n",(0,r.jsx)(n.li,{children:"Listener - \u5B9A\u4E49\u76D1\u542C\u65B9\u5F0F"}),"\n",(0,r.jsx)(n.li,{children:"Mapping - HTTP \u6620\u5C04\u5230 Host"}),"\n",(0,r.jsx)(n.li,{children:"TCPMappings"}),"\n",(0,r.jsx)(n.li,{children:"Module - \u7CFB\u7EDF\u7EAC\u5EA6\u914D\u7F6E"}),"\n",(0,r.jsxs)(n.li,{children:["\u670D\u52A1\u53D1\u73B0\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"KubernetesServiceResolver"}),"\n",(0,r.jsx)(n.li,{children:"KubernetesEndpointResolver"}),"\n",(0,r.jsx)(n.li,{children:"ConsulResolver"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u63D2\u4EF6\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["AuthService - \u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Ambassador \u5185\u4F7F\u7528 External, Filter"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"LogService"}),"\n",(0,r.jsx)(n.li,{children:"RateLimitService"}),"\n",(0,r.jsxs)(n.li,{children:["TracingService\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"lightstep, zipkin, datadog"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"apiVersion: getambassador.io/v3alpha1\nkind: Host\nmetadata:\n  name: minimal-host\nspec:\n  # \u652F\u6301 *.example.com, host.example.*\n  hostname: host.example.com\n  # \u9009\u62E9 Mapping\n  mappingSelector:\n    matchLabels:\n      examplehost: host\n  acmeProvider:\n    authority: none\n    email: julian@example.com\n  tlsSecret:\n    name: tls-cert\n  requestPolicy:\n    insecure:\n      # Redirect, Route, Reject\n      # \u9ED8\u8BA4 HTTP \u4F1A\u8DF3\u8F6C HTTPS\n      action: Redirect\n      additionalPort: 8080\n---\napiVersion: getambassador.io/v3alpha1\nkind: TLSContext\nmetadata:\n  name: upstream-context\nspec:\n  hosts: []\n  secret: upstream-certs\n  # self-signed\n  # secret: self-signed-cert\n  min_tls_version: v1.3\n  sni: some-sni-hostname\n---\napiVersion: getambassador.io/v3alpha1\nkind: Mapping\nmetadata:\n  name: mapping-with-label-match\n  labels:\n    examplehost: host\nspec:\n  # \u53EF\u4EE5\u914D\u7F6E hostname \u9009\u62E9 Host\n  hostname: '*.example.com'\n  prefix: /httpbin/\n  service: http://httpbin.org\n  host_rewrite: httpbin.org\n  tls: upstream-context\n\n---\napiVersion: getambassador.io/v3alpha1\nkind: Listener\nmetadata:\n  name: example-listener\nspec:\n  port: 8080\n  protocol: HTTPS # HTTP, HTTPS, HTTPPROXY, HTTPSPROXY, TCP\n  protocolStack: [HTTP, TCP]\n  securityModel: XFP # XFP (for X-Forwarded-Proto), SECURE, INSECURE\n  statsPrefix: example-listener # default depends on protocol\n  l7Depth: 0\n  hostBinding:\n    namespace:\n      from: SELF # SELF, ALL\n    selector: ... # Kubernetes label selector\n\n---\napiVersion: getambassador.io/v3alpha1\nkind: AuthService\nmetadata:\n  name: authentication\nspec:\n  ambassador_id: ['ambassador-1']\n  auth_service: 'example-auth.authentication:3000'\n  tls: true\n  proto: http\n  timeout_ms: 5000\n  include_body:\n    max_bytes: 4096\n    allow_partial: true\n  status_on_error:\n    code: 403\n  failure_mode_allow: false\n\n  # proto: grpc only\n  protocol_version: v2\n\n  # proto: http only\n  path_prefix: '/path'\n  allowed_request_headers:\n    - 'x-example-header'\n  allowed_authorization_headers:\n    - 'x-qotm-session'\n  add_auth_headers:\n    x-added-auth: auth-added\n  add_linkerd_headers: false\n"})}),"\n",(0,r.jsx)(n.h2,{id:"module",children:"Module"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"apiVersion: getambassador.io/v3alpha1\nkind: Module\nmetadata:\n  name: ambassador\nspec:\n  config:\n    grpc_stats:\n      upstream_stats: true\n      services:\n        - name: <package>.<service>\n          method_names: [<method>]\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return a}});var t=s(75271);let r={},i=t.createContext(r);function a(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);