"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["26669"],{91461:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>l,default:()=>m,assets:()=>a,toc:()=>c,frontMatter:()=>o});var s=JSON.parse('{"id":"service/observability/metrics/prometheus/prometheus-k8s","title":"Prometheus K8S","description":"- metrics-server","source":"@site/../notes/service/observability/metrics/prometheus/prometheus-k8s.md","sourceDirName":"service/observability/metrics/prometheus","slug":"/service/observability/metrics/prometheus/k8s","permalink":"/notes/service/observability/metrics/prometheus/k8s","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/prometheus-k8s.md","tags":[{"inline":true,"label":"Kubernetes","permalink":"/notes/tags/kubernetes"},{"inline":true,"label":"Operator","permalink":"/notes/tags/operator"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1705897966000,"frontMatter":{"title":"Prometheus K8S","tags":["Kubernetes","Operator"]},"sidebar":"docs","previous":{"title":"Prometheus \u8054\u90A6","permalink":"/notes/service/observability/metrics/prometheus/federation"},"next":{"title":"Prometheus \u5B58\u50A8","permalink":"/notes/service/observability/metrics/prometheus/storage"}}'),t=r("52676"),i=r("79938");let o={title:"Prometheus K8S",tags:["Kubernetes","Operator"]},l="Prometheus K8S",a={},c=[{value:"kubernetes_sd_config",id:"kubernetes_sd_config",level:2},{value:"prometheus-operator",id:"prometheus-operator",level:2},{value:"Charts",id:"charts",level:2},{value:"prometheus-operator/kube-prometheus",id:"prometheus-operatorkube-prometheus",level:2},{value:"kube-prometheus-stack",id:"kube-prometheus-stack",level:2},{value:"bitnami/kube-prometheus",id:"bitnamikube-prometheus",level:2},{value:"<del>stable/prometheus-operator</del>",id:"stableprometheus-operator",level:2},{value:"<del>stable/prometheus</del>",id:"stableprometheus",level:2},{value:"CustomResourceDefinition.apiextensions.k8s.io &quot;prometheuses.monitoring.coreos.com&quot; is invalid: metadata.annotations: Too long: must have at most 262144 bytes",id:"customresourcedefinitionapiextensionsk8sio-prometheusesmonitoringcoreoscom-is-invalid-metadataannotations-too-long-must-have-at-most-262144-bytes",level:2},{value:"spec.scrapeConfigSelector: field not declared in schema",id:"specscrapeconfigselector-field-not-declared-in-schema",level:2}];function h(e){let n={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"prometheus-k8s",children:"Prometheus K8S"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/kubernetes-sigs/metrics-server",children:"metrics-server"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/kubernetes-sigs/metrics-server/issues/7",children:"https://github.com/kubernetes-sigs/metrics-server/issues/7"})}),"\n",(0,t.jsx)(n.li,{children:"\u4E0D\u662F\u7528\u6765\u5BF9\u5916\u63D0\u4F9B\u6307\u6807\u7684\u670D\u52A1"}),"\n",(0,t.jsx)(n.li,{children:"\u4E3A\u5185\u90E8 HPA VPA \u670D\u52A1\u63D0\u4F9B Pod \u8D44\u6E90\u6307\u6807"}),"\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528\u6781\u5C11\u7684\u8D44\u6E90 - 0.5m CPU, 4 MB \u6BCF\u8282\u70B9"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/kubernetes-monitoring/kubernetes-mixin",children:"kubernetes-monitoring/kubernetes-mixin"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Grafana dashboards and Prometheus alerts for Kubernetes."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/kubernetes/kube-state-metrics",children:"kubernetes/kube-state-metrics"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Add-on agent to generate and expose cluster-level metrics."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["cadvisor \u63D0\u4F9B\u4E86\u5BB9\u5668\u6307\u6807\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md",children:"https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://runbooks.prometheus-operator.dev/",children:"https://runbooks.prometheus-operator.dev/"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"kubernetes_sd_config",children:"kubernetes_sd_config"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config",children:"kubernetes_sd_config"})}),"\n",(0,t.jsxs)(n.li,{children:["\u793A\u4F8B\u914D\u7F6E ",(0,t.jsx)(n.a,{href:"https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml",children:"prometheus-kubernetes.yml"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u652F\u6301\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"node"}),"\n",(0,t.jsx)(n.li,{children:"service"}),"\n",(0,t.jsx)(n.li,{children:"pod"}),"\n",(0,t.jsx)(n.li,{children:"endpoints"}),"\n",(0,t.jsx)(n.li,{children:"ingres"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"prometheus-operator",children:"prometheus-operator"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/prometheus-operator",children:"prometheus-operator/prometheus-operator"})}),"\n",(0,t.jsxs)(n.li,{children:["\u529F\u80FD\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u901A\u8FC7 CRD \u6765\u90E8\u7F72\u7BA1\u7406 Prometheus\uFF0CAlertmanager \u7B49\u7EC4\u4EF6"}),"\n",(0,t.jsx)(n.li,{children:"\u7B80\u5316\u914D\u7F6E - versions, persistence, retention policies, replicas"}),"\n",(0,t.jsx)(n.li,{children:"Prometheus Target \u914D\u7F6E - \u81EA\u52A8\u76D1\u63A7\u76EE\u6807\u914D\u7F6E - \u901A\u8FC7 annotation \u53D1\u73B0"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u4E4B\u524D\u662F coreos/prometheus-operator\uFF0C\u81EA 0.41 \u5F00\u59CB\u53BB coreos\uFF0C\u79FB\u5230\u72EC\u7ACB\u7EC4\u7EC7 prometheus-operator \u4E0B"}),"\n",(0,t.jsxs)(n.li,{children:["CRD\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prometheus - \u90E8\u7F72 Prometheus"}),"\n",(0,t.jsx)(n.li,{children:"Alertmanager - \u90E8\u7F72 Alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"ThanosRuler - \u90E8\u7F72 thano rule"}),"\n",(0,t.jsx)(n.li,{children:"ServiceMonitor - \u914D\u7F6E service \u76D1\u63A7"}),"\n",(0,t.jsx)(n.li,{children:"PodMonitor - \u914D\u7F6E pod \u76D1\u63A7"}),"\n",(0,t.jsxs)(n.li,{children:["Probe - \u914D\u7F6E\u9759\u6001\u76D1\u63A7\u76EE\u6807\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"blackbox_exporter"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"PrometheusRule - \u914D\u7F6E \u544A\u8B66/\u8BB0\u5F55 \u89C4\u5219"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u76D1\u63A7\u5916\u90E8\u53EF\u4F7F\u7528 Service/externalName + ServiceMonitor \u6216\u4F7F\u7528 additionalScrapeConfigs \u9759\u6001\u914D\u7F6E"}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md",children:"API"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kubectl api-resources --api-group monitoring.coreos.com\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="Pod Annotations"',children:"annotations:\n  # \u5F00\u542F\u540E\u6293\u53D6\u6240\u6709\u7AEF\u53E3\n  prometheus.io/scrape: 'true'\n  prometheus.io/path: '/metrics'\n  prometheus.io/port: '80'\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u4E4B\u6240\u4EE5\u4F1A\u751F\u6548\u662F\u56E0\u4E3A"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- job_name: 'kubernetes-pods'\n  kubernetes_sd_configs:\n  - role: pod\n  relabel_configs:\n  # prometheus.io/scrape\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n    action: keep\n    regex: true\n  # prometheus.io/path\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]\n    action: replace\n    target_label: __metrics_path__\n    regex: (.+)\n  # prometheus.io/port\n  - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]\n    action: replace\n    regex: ([^:]+)(?::\\d+)?;(\\d+)\n    replacement: $1:$2\n    target_label: __address__\n  - action: labelmap\n    regex: __meta_kubernetes_pod_label_(.+)\n  - source_labels: [__meta_kubernetes_namespace]\n    action: replace\n    target_label: kubernetes_namespace\n  - source_labels: [__meta_kubernetes_pod_name]\n    action: replace\n    target_label: kubernetes_pod_name\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/prometheus/latest/configuration/configuration/#pod",children:"https://prometheus.io/docs/prometheus/latest/configuration/configuration/#pod"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus",children:"https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"---\n# \u5B9A\u4E49\u90E8\u7F72 Prometheus\nkind: Prometheus\napiVersion: monitoring.coreos.com/v1\nmetadata:\n  name: kube-prometheus-prometheus\n  namespace: monitoring\nspec:\n  # \u989D\u5916\u7684\u6293\u53D6\u914D\u7F6E\n  additionalScrapeConfigs:\n    name: additional-scrape-configs\n    key: prometheus-additional.yaml\n  affinity: {} # \u8282\u70B9\u4EB2\u548C\n  alerting:\n    alertmanagers:\n      - name: kube-prometheus-alertmanager\n        namespace: monitoring\n        pathPrefix: /\n        port: http\n  enableAdminAPI: false\n  # \u6DFB\u52A0\u989D\u5916\u6807\u7B7E - \u591A\u96C6\u7FA4/\u79DF\u6237 \u53EF\u7528\u4E8E\u6807\u8BB0\n  externalLabels:\n    cluster: wener\n  externalUrl: 'http://kube-prometheus-prometheus.monitoring:9090/'\n  image: 'docker.io/bitnami/prometheus:2.20.1-debian-10-r12'\n  listenLocal: false\n  logFormat: logfmt\n  logLevel: info\n  paused: false\n  podMetadata:\n    labels:\n      app.kubernetes.io/component: prometheus\n      app.kubernetes.io/instance: kube-prometheus\n      app.kubernetes.io/name: kube-prometheus\n  podMonitorNamespaceSelector: {}\n  podMonitorSelector: {}\n  probeNamespaceSelector: {}\n  probeSelector: {}\n  # \u8FDC\u7A0B\u5199 - \u914D\u7F6E\u7C7B\u4F3C\u4E8E prometheus \u7684 remote_write\n  remoteWrite:\n    - name: my-remote\n      remoteTimeout: 120s\n      url: 'https://receive.example.com/api/v1/receive'\n      # proxyUrl: ''\n      # tlsConfig: {}\n      # writeRelabelConfigs: {}\n\n      # basic auth \u7684 secret\n      basicAuth:\n        password:\n          key: password\n          name: prometheus-basic-auth\n          optional: false\n        username:\n          key: username\n          name: prometheus-basic-auth\n          optional: false\n      # \u961F\u5217\u914D\u7F6E - \u8C03\u4F18\u65F6\u4F7F\u7528\n      queueConfig:\n        # \u9ED8\u8BA4 5s\n        batchSendDeadline: 10s\n        # \u9ED8\u8BA4 500\n        capacity: 2500\n\n        # \u76EE\u524D promethues \u662F\u6CA1\u6709\u5B9E\u73B0\u7684\n        maxRetries: 0\n        # \u9ED8\u8BA4 100\n        maxSamplesPerSend: 5000\n        maxShards: 1000\n        minShards: 1\n\n        minBackoff: 30ms\n        maxBackoff: 100ms\n  remoteRead: []\n  replicas: 1\n  resources: {}\n  retention: 10d\n  retentionSize: 6GB\n  routePrefix: /\n  ruleNamespaceSelector: {}\n  ruleSelector: {}\n  securityContext:\n    fsGroup: 1001\n    runAsUser: 1001\n  serviceAccountName: kube-prometheus-prometheus\n  serviceMonitorNamespaceSelector: {}\n  serviceMonitorSelector: {}\n  # Prometheus \u672C\u5730\u5B58\u50A8\n  storage:\n    volumeClaimTemplate:\n      spec:\n        accessModes:\n          - ReadWriteOnce\n        resources:\n          requests:\n            storage: 8Gi\n        storageClassName: local-path\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"additionalScrapeConfigs"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- job_name: 'prometheus'\n  static_configs:\n    - targets: ['localhost:9090']\n"})}),"\n",(0,t.jsx)(n.h2,{id:"charts",children:"Charts"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-community/helm-charts/",children:"https://github.com/prometheus-community/helm-charts/"})}),"\n",(0,t.jsx)(n.li,{children:"kube-prometheus-stack"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"prometheus-operatorkube-prometheus",children:"prometheus-operator/kube-prometheus"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u901A\u8FC7 jsonet \u5B9A\u5236\u5316\u548C\u5B89\u88C5"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/kube-prometheus",children:"prometheus-operator/kube-prometheus"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u7EC4\u4EF6\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prometheus Operator"}),"\n",(0,t.jsx)(n.li,{children:"HA Prometheus"}),"\n",(0,t.jsx)(n.li,{children:"HA Alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"node-exporter"}),"\n",(0,t.jsx)(n.li,{children:"Kubernetes Metrics APIs Prometheus Adapter"}),"\n",(0,t.jsx)(n.li,{children:"kube-state-metrics"}),"\n",(0,t.jsx)(n.li,{children:"Grafana"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"kube-prometheus-stack",children:"kube-prometheus-stack"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6709 grafana - \u4F46\u4E0D\u63A8\u8350"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bitnamikube-prometheus",children:"bitnami/kube-prometheus"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/bitnami/charts/tree/master/bitnami/kube-prometheus",children:"https://github.com/bitnami/charts/tree/master/bitnami/kube-prometheus"})}),"\n",(0,t.jsxs)(n.li,{children:["\u5305\u542B\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prometheus Operator"}),"\n",(0,t.jsxs)(n.li,{children:["Prometheus\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F1A\u901A\u8FC7 Operator \u90E8\u7F72"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"kube-state-metrics"}),"\n",(0,t.jsx)(n.li,{children:"node-exporter"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u9ED8\u8BA4 scrapeInterval: 30s\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["prometheus \u9ED8\u8BA4 1m ",(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/prometheus/latest/configuration/configuration/",children:"https://prometheus.io/docs/prometheus/latest/configuration/configuration/"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u56FD\u5185\u65E0\u6CD5\u8BBF\u95EE\u8BE5 Repo\uFF0C\u53EF\u4F7F\u7528 https://charts.wener.tech \u6216 https://wenerme.github.io/charts\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm install kube-prometheus -n monitoring bitnami/kube-prometheus\n\nkubectl -n monitoring describe svc/kube-prometheus-prometheus\n\n# http://127.0.0.1:9090\nkubectl -n monitoring port-forward svc/kube-prometheus-prometheus 9090\n"})}),"\n",(0,t.jsx)(n.h2,{id:"stableprometheus-operator",children:(0,t.jsx)(n.del,{children:"stable/prometheus-operator"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["helm ",(0,t.jsx)(n.a,{href:"https://github.com/helm/charts/tree/master/stable/prometheus-operator",children:"stable/prometheus-operator"})]}),"\n",(0,t.jsx)(n.li,{children:"\u7C7B\u4F3C\u4E8E kube-prometheus\uFF0C\u4F46\u901A\u8FC7 helm \u5B89\u88C5"}),"\n",(0,t.jsxs)(n.li,{children:["\u66F4\u65B0\u7EF4\u62A4\u8F83\u6162\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u76EE\u524D\u8FD8\u662F\u57FA\u4E8E coreos/prometheus-operator 0.38"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u5185\u5BB9\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"stable/kube-state-metrics"}),"\n",(0,t.jsx)(n.li,{children:"stable/prometheus-node-exporter"}),"\n",(0,t.jsx)(n.li,{children:"stable/grafana"}),"\n",(0,t.jsx)(n.li,{children:"prometheus-operator"}),"\n",(0,t.jsx)(n.li,{children:"prometheus"}),"\n",(0,t.jsx)(n.li,{children:"alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"node-exporter"}),"\n",(0,t.jsx)(n.li,{children:"kube-state-metrics"}),"\n",(0,t.jsxs)(n.li,{children:["service monitors\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u76D1\u63A7 kube \u7EC4\u4EF6"}),"\n",(0,t.jsx)(n.li,{children:"kube-apiserver\u3001kube-scheduler\u3001kube-controller-manager\u3001etcd\u3001kube-dns/coredns\u3001kube-proxy"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u4F1A\u914D\u7F6E dashboards \u548C alters"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u9ED8\u8BA4\u5BFC\u5165 ",(0,t.jsx)(n.a,{href:"https://github.com/kubernetes-monitoring/kubernetes-mixin",children:"kubernetes-monitoring/kubernetes-mixin"})," \u56FE\u8868"]}),"\n",(0,t.jsxs)(n.li,{children:["\u4E0E stable/prometheus \u76F8\u6BD4\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u591A\u4E86 grafana\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u9762\u677F\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u591A\u4E86 kube \u7EC4\u4EF6\u76D1\u63A7"}),"\n",(0,t.jsxs)(n.li,{children:["\u591A\u4E86 operator \u7528\u4E8E\u90E8\u7F72\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prometheus"}),"\n",(0,t.jsx)(n.li,{children:"Alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"ThanosRuler"}),"\n",(0,t.jsx)(n.li,{children:"ServiceMonitor"}),"\n",(0,t.jsx)(n.li,{children:"PodMonitor"}),"\n",(0,t.jsx)(n.li,{children:"Probe"}),"\n",(0,t.jsx)(n.li,{children:"PrometheusRule"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"stableprometheus",children:(0,t.jsx)(n.del,{children:"stable/prometheus"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5355\u7EAF\u90E8\u7F72 prometheus"}),"\n",(0,t.jsxs)(n.li,{children:["\u5305\u542B\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"alertmanager"}),"\n",(0,t.jsx)(n.li,{children:"node-exporter"}),"\n",(0,t.jsx)(n.li,{children:"pushgateway"}),"\n",(0,t.jsxs)(n.li,{children:["configmap-reload - ",(0,t.jsx)(n.a,{href:"https://github.com/jimmidyson/configmap-reload",children:"https://github.com/jimmidyson/configmap-reload"})]}),"\n",(0,t.jsx)(n.li,{children:"kube-state-metrics"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Pod \u6CE8\u89E3\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'prometheus.io/scrape: "true"'}),"\n",(0,t.jsx)(n.li,{children:"prometheus.io/path: /metrics"}),"\n",(0,t.jsx)(n.li,{children:'prometheus.io/port: "8080"'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["prometheus \u9ED8\u8BA4 ",(0,t.jsx)(n.code,{children:"--storage.tsdb.retention.time"})," 15d"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"server:\n  persistentVolume:\n    enabled: false\n  global:\n    scrape_interval: 10s\n\nalertmanager:\n  enabled: false\npushgateway:\n  enabled: false\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"customresourcedefinitionapiextensionsk8sio-prometheusesmonitoringcoreoscom-is-invalid-metadataannotations-too-long-must-have-at-most-262144-bytes",children:'CustomResourceDefinition.apiextensions.k8s.io "prometheuses.monitoring.coreos.com" is invalid: metadata.annotations: Too long: must have at most 262144 bytes'}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/prometheus-operator/issues/4355",children:"https://github.com/prometheus-operator/prometheus-operator/issues/4355"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"syncPolicy:\nsyncOptions:\n- ServerSideApply=true\n- CreateNamespace=true\n"})}),"\n",(0,t.jsx)(n.h2,{id:"specscrapeconfigselector-field-not-declared-in-schema",children:"spec.scrapeConfigSelector: field not declared in schema"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Create new CRDs, e.g.:\nkubectl create -f crd-prometheusagents.yaml\nkubectl create -f crd-scrapeconfigs.yaml\n\n# Patch existing CRDs, e.g.:\nkubectl patch crd alertmanagerconfigs.monitoring.coreos.com --patch-file crd-alertmanagerconfigs.yaml\nkubectl patch crd alertmanagers.monitoring.coreos.com --patch-file crd-alertmanagers.yaml\nkubectl patch crd podmonitors.monitoring.coreos.com --patch-file crd-podmonitors.yaml\nkubectl patch crd probes.monitoring.coreos.com --patch-file crd-probes.yaml\nkubectl patch crd prometheuses.monitoring.coreos.com --patch-file crd-prometheuses.yaml\nkubectl patch crd prometheusrules.monitoring.coreos.com --patch-file crd-prometheusrules.yaml\nkubectl patch crd servicemonitors.monitoring.coreos.com --patch-file crd-servicemonitors.yaml\nkubectl patch crd thanosrulers.monitoring.coreos.com --patch-file crd-thanosrulers.yaml\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/bitnami/charts/issues/17143",children:"https://github.com/bitnami/charts/issues/17143"})}),"\n"]})]})}function m(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return o}});var s=r(75271);let t={},i=s.createContext(t);function o(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);