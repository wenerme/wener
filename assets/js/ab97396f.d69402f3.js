"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["22874"],{68964:function(e,r,t){t.r(r),t.d(r,{metadata:()=>n,contentTitle:()=>a,default:()=>h,assets:()=>l,toc:()=>o,frontMatter:()=>c});var n=JSON.parse('{"id":"service/observability/metrics/victoria-metrics/victoria-metrics-operator","title":"VictoriaMetrics Operator","description":"- VictoriaMetrics/operator","source":"@site/../notes/service/observability/metrics/victoria-metrics/victoria-metrics-operator.md","sourceDirName":"service/observability/metrics/victoria-metrics","slug":"/service/observability/metrics/victoria-metrics/operator","permalink":"/notes/service/observability/metrics/victoria-metrics/operator","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/victoria-metrics/victoria-metrics-operator.md","tags":[{"inline":true,"label":"Kubernetes","permalink":"/notes/tags/kubernetes"},{"inline":true,"label":"Operator","permalink":"/notes/tags/operator"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1684666307000,"frontMatter":{"title":"VictoriaMetrics Operator","tags":["Kubernetes","Operator"]},"sidebar":"docs","previous":{"title":"VictoriaMetrics","permalink":"/notes/service/observability/metrics/victoria-metrics/"},"next":{"title":"netdata","permalink":"/notes/service/observability/netdata"}}'),i=t("52676"),s=t("79938");let c={title:"VictoriaMetrics Operator",tags:["Kubernetes","Operator"]},a="VictoriaMetrics Operator",l={},o=[];function d(e){let r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"victoriametrics-operator",children:"VictoriaMetrics Operator"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.a,{href:"https://github.com/VictoriaMetrics/operator",children:"VictoriaMetrics/operator"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u7BA1\u7406\u76D1\u63A7\u914D\u7F6E"}),"\n",(0,i.jsx)(r.li,{children:"\u670D\u52A1\u90E8\u7F72"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.a,{href:"https://github.com/VictoriaMetrics/helm-charts",children:"VictoriaMetrics/helm-charts"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Helm \u90E8\u7F72 Repo - \u63A8\u8350 operator \u90E8\u7F72"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"\u76D1\u63A7"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"prometheus"}),(0,i.jsx)(r.th,{children:"vm"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"ServiceMonitor"}),(0,i.jsx)(r.td,{children:"VMServiceMonitor"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"PodMonitor"}),(0,i.jsx)(r.td,{children:"VMPodMonitor"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"PrometheusRule"}),(0,i.jsx)(r.td,{children:"VMRule"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Probe"}),(0,i.jsx)(r.td,{children:"VMProbe"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{children:"VMNodeScrape"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{children:"VMStaticScrape"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Prometheus"}),(0,i.jsx)(r.td,{children:"VMSingle"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{children:"VMCluster"})]})]})]}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsx)(r.p,{children:"VMNodeScrape \u53EF\u4EE5\u907F\u514D\u9488\u5BF9\u7CFB\u7EDF\u670D\u52A1\u521B\u5EFA service\uFF0C\u4F8B\u5982 kublet"}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"\u5E94\u7528"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://docs.victoriametrics.com/operator/api.html",children:"https://docs.victoriametrics.com/operator/api.html"})}),"\n",(0,i.jsx)(r.li,{children:"VMSingle"}),"\n",(0,i.jsx)(r.li,{children:"VMCluster - \u96C6\u7FA4\u7248 VM"}),"\n",(0,i.jsx)(r.li,{children:"VMAgent"}),"\n",(0,i.jsx)(r.li,{children:"VMAlert"}),"\n",(0,i.jsx)(r.li,{children:"VMAlertmanager"}),"\n",(0,i.jsx)(r.li,{children:"VMServiceScrape"}),"\n",(0,i.jsx)(r.li,{children:"VMPodScrape"}),"\n",(0,i.jsx)(r.li,{children:"VMStaticScrape"}),"\n",(0,i.jsxs)(r.li,{children:["VMAuth - \u90E8\u7F72 vmauth - \u901A\u8FC7\u9650\u5B9A path \u5B9E\u73B0\u6743\u9650\u548C\u79DF\u6237\u9650\u5B9A\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["VMUser - \u6DFB\u52A0 vmauth \u7528\u6237\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"bearerToken"}),"\n",(0,i.jsx)(r.li,{children:"basicAuth"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.li,{children:"\u751F\u6210\u7684\u914D\u7F6E\u4F4D\u4E8E /opt/vmauth/config.yaml"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-yaml",children:"---\n# \u90E8\u7F72 vmauth\napiVersion: operator.victoriametrics.com/v1beta1\nkind: VMAuth\nmetadata:\n  name: example\n  namespace: default\nspec:\n  ingress:\n    class_name: nginx\n    tlsHosts: []\n    tlsSecretName:\n    extraRules:\n    extraTls:\n  # false \u5219\u8981\u6C42\u914D\u7F6E userSelector, userNamespaceSelector\n  selectAllByDefault: true\n  # vmuser label \u9009\u62E9\n  userSelector:\n    matchLabels:\n      vmauth.victoriametrics.com/instance: demo\n  # ns label \u9009\u62E9\n  userNamespaceSelector:\n\n---\n# \u4E3A vmauth \u914D\u7F6E user\napiVersion: operator.victoriametrics.com/v1beta1\nkind: VMUser\nmetadata:\n  name: example\n  labels:\n    vmauth.victoriametrics.com/instance: demo\nspec:\n  username: simple-user\n  password: simple-password\n  passwordRef:\n  generatePassword: false\n  bearerToken:\n  targetRefs:\n    - crd:\n        # VMAgent,VMAlert,VMAlertmanager,VMSingle,VMCluster/vmselect,VMCluster/vminsert,VMCluster/vmstorage\n        kind: VMSingle\n        name: example\n        namespace: default\n      paths: ['/.*']\n    - static:\n        url: http://vmalert-example.default.svc:8080\n      paths: ['/api/v1/groups', '/api/v1/alerts']\n      target_path_suffix:\n      headers:\n        - X-Org-ID: xyz\n"})})]})}function h(e={}){let{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,r,t){t.d(r,{Z:function(){return a},a:function(){return c}});var n=t(75271);let i={},s=n.createContext(i);function c(e){let r=n.useContext(s);return n.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(s.Provider,{value:r},e.children)}}}]);