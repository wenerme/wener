"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["50854"],{7914:function(n,e,s){s.r(e),s.d(e,{metadata:()=>c,contentTitle:()=>a,default:()=>d,assets:()=>l,toc:()=>o,frontMatter:()=>r});var c=JSON.parse('{"id":"devops/service/consul-connect","title":"Consule Connect Mesh","description":"- \u4F18\u52BF","source":"@site/../notes/devops/service/consul-connect.md","sourceDirName":"devops/service","slug":"/devops/service/consul-connect","permalink":"/notes/devops/service/consul-connect","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/service/consul-connect.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1655970411000,"frontMatter":{"title":"Consule Connect Mesh"},"sidebar":"docs","previous":{"title":"Consul \u914D\u7F6E","permalink":"/notes/devops/service/consul-conf"},"next":{"title":"Consul FAQ","permalink":"/notes/devops/service/consul-faq"}}'),i=s("52676"),t=s("79938");let r={title:"Consule Connect Mesh"},a="Consule Connect Mesh",l={},o=[{value:"annotations",id:"annotations",level:2},{value:"k8s",id:"k8s",level:2},{value:"whomai",id:"whomai",level:2}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"consule-connect-mesh",children:"Consule Connect Mesh"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u4F18\u52BF\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"mesh gateway \u6253\u901A\u96C6\u7FA4"}),"\n",(0,i.jsx)(e.li,{children:"ingress gateway \u5141\u8BB8\u5916\u90E8\u8BBF\u95EE\u5185\u90E8\u670D\u52A1"}),"\n",(0,i.jsx)(e.li,{children:"terminating gateway \u5141\u8BB8\u5185\u90E8 mtls \u8BBF\u95EE\u5916\u90E8\u670D\u52A1"}),"\n",(0,i.jsx)(e.li,{children:"\u652F\u6301\u4EE3\u7801\u5C42\u96C6\u6210 - \u63D0\u4F9B Go SDK"}),"\n",(0,i.jsx)(e.li,{children:"\u8FDE\u901A\u6027\u597D"}),"\n",(0,i.jsx)(e.li,{children:"\u652F\u6301 7 \u5C42\u8DEF\u7531"}),"\n",(0,i.jsx)(e.li,{children:"\u6CA1\u6709\u96C6\u6210 prometheus \u548C grafana - \u66F4\u9002\u5408\u5229\u7528\u73B0\u6709\u5B9E\u4F8B"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u52A3\u52BF\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u9700\u8981\u4E24\u4E2A sidecard\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"consul-connect-inject-init"}),"\n",(0,i.jsx)(e.li,{children:"consul-connect-envoy-sidecar"}),"\n",(0,i.jsx)(e.li,{children:"consul-connect-lifecycle-sidecar"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"connect \u4E3B\u8981 \u652F\u6301\u8FDE\u901A\u6027\uFF0C\u8DDF\u8E2A\u548C\u6307\u6807\u90FD\u6CA1\u6709\u652F\u6301"}),"\n",(0,i.jsx)(e.li,{children:"\u754C\u9762\u529F\u80FD\u8F83\u5F31"}),"\n",(0,i.jsx)(e.li,{children:"\u6D41\u91CF\u5207\u5206\u5B9E\u4F8B\u5206\u7EC4\u9700\u8981\u914D\u7F6E\uFF0C\u6CA1\u6709\u754C\u9762"}),"\n",(0,i.jsx)(e.li,{children:"observability \u548C \u6307\u6807\u90FD\u4F9D\u8D56 envoy - \u6CA1\u6709\u9ED8\u8BA4\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u7279\u6027\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"mtls"}),"\n",(0,i.jsxs)(e.li,{children:["intention - Service-to-Service \u6743\u9650\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"consul intention create -deny web '*'"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u81EA\u52A8\u6CE8\u5165\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"consul.hashicorp.com/connect-inject: 'true'"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Control Plane\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Consul UI"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Data Plane\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5185\u5EFA - \u4E3B\u8981\u7528\u4E8E\u5F00\u53D1"}),"\n",(0,i.jsx)(e.li,{children:"envoy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u6CE8\u610F\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5FC5\u987B\u914D\u5408 consule \u4F7F\u7528"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Mesh Gateway\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u7F51\u5173\u4E92\u901A - \u8DE8\u96C6\u7FA4/\u533A\u57DF"}),"\n",(0,i.jsx)(e.li,{children:"\u670D\u52A1\u5230\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Ingress Gateway\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u63A5\u53D7\u5916\u90E8\u6D41\u91CF"}),"\n",(0,i.jsx)(e.li,{children:"\u5916\u90E8\u8BBF\u95EE\u5185\u90E8\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Terminating Gateway\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5185\u90E8\u8BBF\u95EE\u5916\u90E8"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"Intention - ACL \u63A7\u5236"}),"\n",(0,i.jsxs)(e.li,{children:["\u4EE3\u7406\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5185\u5EFA - \u4E0D\u9002\u7528\u4E8E\u751F\u4EA7"}),"\n",(0,i.jsx)(e.li,{children:"Envoy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u8BC1\u4E66\u7BA1\u7406\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5185\u5EFA CA"}),"\n",(0,i.jsx)(e.li,{children:"Vault"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/hashicorp/consul-k8s-prometheus-grafana-hashicups-demoapp",children:"hashicorp/consul-k8s-prometheus-grafana-hashicups-demoapp"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'kubectl port-forward service/consul-server 8500:8500\n# tls\n# kubectl port-forward service/consul-server 8501:8501\n\n# token\nexport CONSUL_HTTP_TOKEN=$(kubectl get secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d)\nconsul info\n\n# in pod\nexport CONSUL_HTTP_ADDR="${HOST_IP}:8500"\n\n# \u547D\u4EE4\u884C\u542F\u52A8\n# -- -l trace - envoy \u7684 trace \u65E5\u5FD7\nconsul connect envoy \\\n  -sidecar-for echo -http-addr http://127.0.0.1:8500 \\\n  -grpc-addr http://127.0.0.1:8502 \\\n  -admin-bind 127.0.0.1:0\n'})}),"\n",(0,i.jsx)(e.h2,{id:"annotations",children:"annotations"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/connect-inject\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"bool"}),"\n",(0,i.jsx)(e.li,{children:"\u662F\u5426\u6CE8\u5165 sidecard"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/connect-service\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u670D\u52A1\u7684\u540D\u5B57"}),"\n",(0,i.jsx)(e.li,{children:"\u9ED8\u8BA4\u4E3A\u7B2C\u4E00\u4E2A container \u7684\u540D\u5B57"}),"\n",(0,i.jsx)(e.li,{children:"\u5982\u679C\u542F\u7528\u4E86 acl\uFF0C\u540D\u5B57\u5FC5\u987B\u4E0E ServiceAccount \u76F8\u540C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/connect-service-port\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u63A5\u53D7\u8BF7\u6C42\u7684\u7AEF\u53E3"}),"\n",(0,i.jsx)(e.li,{children:"\u9ED8\u8BA4\u4E3A\u7B2C\u4E00\u4E2A\u66B4\u9732\u7AEF\u53E3"}),"\n",(0,i.jsx)(e.li,{children:"\u53EF\u4EE5\u662F\u540D\u5B57\u4E5F\u53EF\u4EE5\u662F\u7AEF\u53E3\u53F7"}),"\n",(0,i.jsx)(e.li,{children:"proxy \u76D1\u542C\u52A8\u6001\u7AEF\u53E3"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/connect-service-upstreams\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8FDE\u63A5\u5230\u7684\u4E0A\u6E38\u670D\u52A1"}),"\n",(0,i.jsx)(e.li,{children:"\u9017\u53F7\u5206\u5272\u6307\u5B9A\u591A\u4E2A"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"[service-name]:[port]:[optional datacenter]"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"prepared_query:[query name]:[port]"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/connect-service-protocol\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u6CE8\u518C\u534F\u8BAE"}),"\n",(0,i.jsxs)(e.li,{children:["helm \u5B89\u88C5\u65F6\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"defaultProtocol"})," \u6307\u5B9A\u9ED8\u8BA4\u534F\u8BAE\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5EFA\u8BAE\u6307\u5B9A\u4E3A http"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["consul.hashicorp.com/service-tags\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u9017\u53F7\u5206\u5272\u6307\u5B9A\u591A\u4E2A"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"consul.hashicorp.com/service-meta-<KEY>"})}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"consul.hashicorp.com/sidecar-proxy-"})," - proxy \u914D\u7F6E\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"cpu/memory-limit/request"}),"\n",(0,i.jsxs)(e.li,{children:["helm \u9ED8\u8BA4\u914D\u7F6E ",(0,i.jsx)(e.code,{children:"connectInject.sidecarProxy.resources"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"k8s",children:"k8s"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: alpine-connect\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: alpine-connect\n  annotations:\n    consul.hashicorp.com/connect-inject: 'true'\n    consul.hashicorp.com/connect-service-upstreams: consul:8500,static-server:1234,web-test:2019,whoami-v1:1992\nspec:\n  serviceAccountName: alpine-connect\n  containers:\n    - name: alpine-connect\n      image: wener/base\n      command:\n        - tail\n      args:\n        - -f\n        - /dev/null\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"kubectl exec alpine-connect -it -c alpine-connect -- sh\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: static-server\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: static-server\n  annotations:\n    consul.hashicorp.com/connect-inject: 'true'\nspec:\n  containers:\n    # consule \u4E2D\u7684\u670D\u52A1\u540D\n    - name: static-server\n      image: hashicorp/http-echo:latest\n      args:\n        - -text=\"hello world\"\n        - -listen=:8080\n      ports:\n        - containerPort: 8080\n          name: http\n  # \u5982\u679C\u542F\u7528\u4E86 ACL\uFF0C serviceAccountName \u5FC5\u987B\u8981\u5339\u914D Consil \u4E2D\u7684\u670D\u52A1\u540D\n  serviceAccountName: static-server\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: static-client\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: static-client\n  annotations:\n    'consul.hashicorp.com/connect-inject': 'true'\n    'consul.hashicorp.com/connect-service-upstreams': 'static-server:1234'\nspec:\n  containers:\n    # \u670D\u52A1\u540D\n    - name: static-client\n      image: tutum/curl:latest\n      # \u4FDD\u6301\u8FD0\u884C\n      command: ['/bin/sh', '-c', '--']\n      args: ['while true; do sleep 30; done;']\n  # ACL \u8981\u6C42\n  serviceAccountName: static-client\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: web-test\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-test\n  labels:\n    app: web-test\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web-test\n  template:\n    metadata:\n      name: web-test\n      labels:\n        app: web-test\n      annotations:\n        consul.hashicorp.com/connect-service-upstreams: 'static-server:1234'\n        consul.hashicorp.com/connect-inject: 'true'\n    spec:\n      containers:\n        - name: web-test\n          image: nginx:alpine\n          ports:\n            - containerPort: 80\n      serviceAccountName: web-test\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: static-server-next\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: static-server-next\n  annotations:\n    consul.hashicorp.com/connect-inject: 'true'\nspec:\n  containers:\n    - name: static-server-next\n      image: hashicorp/http-echo:latest\n      args:\n        - -text=\"hello world\"\n        - -listen=:8080\n      ports:\n        - containerPort: 8080\n          name: http\n  serviceAccountName: static-server-next\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'cat << HCL | consul config write -\nKind      = "service-defaults"\nName      = "static-server"\nProtocol  = "http"\nHCL\ncat << HCL | consul config write -\nKind      = "service-defaults"\nName      = "static-server-next"\nProtocol  = "http"\nHCL\ncat << HCL | consul config write -\nKind = "service-router"\nName = "static-server"\nRoutes = [\n  {\n    Match {\n      HTTP {\n        PathPrefix = "/next"\n      }\n    }\n\n    Destination {\n      Service = "static-server-next"\n    }\n  },\n]\nHCL\n'})}),"\n",(0,i.jsx)(e.h2,{id:"whomai",children:"whomai"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-yaml",children:"apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: whoami\n---\nkind: Deployment\napiVersion: apps/v1\nmetadata:\n  name: whoami-v1\n  labels:\n    app: whoami-v1\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: whoami-v1\n  template:\n    metadata:\n      labels:\n        app: whoami-v1\n      annotations:\n        consul.hashicorp.com/connect-inject: 'true'\n        consul.hashicorp.com/connect-service-protocol: http\n        consul.hashicorp.com/service-tags: app=whoami\n        consul.hashicorp.com/service-meta-version: v1\n    spec:\n      serviceAccountName: whoami\n      containers:\n        - name: whoami\n          image: containous/whoami\n          # diff\n          env:\n            - name: WHOAMI_NAME\n              value: V1\n          ports:\n            - containerPort: 80\n          livenessProbe:\n            httpGet:\n              path: /health\n              port: 80\n            initialDelaySeconds: 3\n            periodSeconds: 3\n---\nkind: Deployment\napiVersion: apps/v1\nmetadata:\n  name: whoami-v2\n  labels:\n    app: whoami-v2\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: whoami-v2\n  template:\n    metadata:\n      labels:\n        app: whoami-v2\n      annotations:\n        consul.hashicorp.com/connect-inject: 'true'\n        consul.hashicorp.com/connect-service-protocol: http\n        consul.hashicorp.com/service-tags: app=whoami\n        consul.hashicorp.com/service-meta-version: v2\n    spec:\n      # same service\n      serviceAccountName: whoami\n      containers:\n        - name: whoami\n          image: containous/whoami\n          # diff\n          env:\n            - name: WHOAMI_NAME\n              value: V2\n          ports:\n            - containerPort: 80\n          livenessProbe:\n            httpGet:\n              path: /health\n              port: 80\n            initialDelaySeconds: 3\n            periodSeconds: 3\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'cat << HCL | consul config write -\nKind      = "service-defaults"\nName      = "whoami"\nProtocol  = "http"\nExpose    = {\n  Checks = true\n  Paths = [{\n    Path = "/health"\n  }]\n}\nHCL\ncat << HCL | consul config write -\nKind          = "service-resolver"\nName          = "whoami"\nDefaultSubset = "v2"\nSubsets = {\n  "v1" = {\n    Filter = "Service.Meta.version == v1"\n  }\n  "v2" = {\n    Filter = "Service.Meta.version == v2"\n  }\n}\nHCL\n\ncat << HCL | consul config write -\nKind = "service-router"\nName = "whoami"\nRoutes = [\n  {\n    Match {\n      HTTP {\n        Header = [\n          {\n            Name  = "x-version"\n            Exact = "2"\n          },\n        ]\n      }\n    }\n    Destination {\n      Service       = "whoami"\n      ServiceSubset = "v2"\n    }\n  },\n  {\n    Match {\n      HTTP {\n        PathPrefix = "/v2"\n      }\n    }\n    Destination {\n      Service       = "whoami"\n      ServiceSubset = "v2"\n    }\n  },\n\n    {\n    Match {\n      HTTP {\n        Header = [\n          {\n            Name  = "x-version"\n            Exact = "1"\n          },\n        ]\n      }\n    }\n    Destination {\n      Service       = "whoami"\n      ServiceSubset = "v1"\n    }\n  },\n    {\n    Match {\n      HTTP {\n        PathPrefix = "/v1"\n      }\n    }\n    Destination {\n      Service       = "whoami"\n      ServiceSubset = "v1"\n    }\n  },\n]\nHCL\n'})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u5206\u7EC4"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-hcl",children:'Kind          = "service-resolver"\nName          = "whoami"\nDefaultSubset = "v1"\nSubsets = {\n  "v1" = {\n    Filter = "Service.Meta.version == v1"\n  }\n  "v2" = {\n    Filter = "Service.Meta.version == v2"\n  }\n}\n'})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u6D41\u91CF\u5207\u5206"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-hcl",children:'Kind = "service-splitter"\nName = "web"\nSplits = [\n  {\n    Weight        = 90\n    ServiceSubset = "v1"\n  },\n  {\n    Weight        = 10\n    ServiceSubset = "v2"\n  },\n]\n'})})]})}function d(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return a},a:function(){return r}});var c=s(75271);let i={},t=c.createContext(i);function r(n){let e=c.useContext(t);return c.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),c.createElement(t.Provider,{value:e},n.children)}}}]);