"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["97968"],{85401:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>c,toc:()=>a,frontMatter:()=>o});var r=JSON.parse('{"id":"service/observability/metrics/prometheus/prometheus-federation","title":"Prometheus \u8054\u90A6","description":"- \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/observability/metrics/prometheus/prometheus-federation.md","sourceDirName":"service/observability/metrics/prometheus","slug":"/service/observability/metrics/prometheus/federation","permalink":"/notes/service/observability/metrics/prometheus/federation","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/prometheus-federation.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1646642462000,"frontMatter":{"title":"Prometheus \u8054\u90A6"},"sidebar":"docs","previous":{"title":"Prometheus FAQ","permalink":"/notes/service/observability/metrics/prometheus/faq"},"next":{"title":"Prometheus K8S","permalink":"/notes/service/observability/metrics/prometheus/k8s"}}'),s=t("52676"),i=t("79938");let o={title:"Prometheus \u8054\u90A6"},l="Prometheus \u8054\u90A6",c={},a=[];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"prometheus-\u8054\u90A6",children:"Prometheus \u8054\u90A6"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u662F\u4EC0\u4E48\uFF1F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Prometheus \u91C7\u96C6 Prometheus"}),"\n",(0,s.jsx)(n.li,{children:"\u7EA7\u8054\u8054\u90A6/Hierarchical federation - \u5168\u91CF\u91C7\u96C6 - \u4F8B\u5982 \u591A\u4E2A\u96C6\u7FA4\u73AF\u5883"}),"\n",(0,s.jsx)(n.li,{children:"\u8DE8\u670D\u52A1\u8054\u90A6/Cross-service federation - \u90E8\u5206\u91C7\u96C6 - \u4F8B\u5982 \u591A\u4E2A\u96C6\u7FA4\u90E8\u7F72\u76F8\u540C\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u4F18\u52BF\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u7B80\u5355\u7684\u89E3\u51B3\u5206\u5E03\u5F0F\u6307\u6807\u91C7\u96C6\u95EE\u9898"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://prometheus.io/docs/prometheus/latest/federation/",children:"FEDERATION"})}),"\n",(0,s.jsxs)(n.li,{children:["\u5EFA\u8BAE\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5982\u679C\u6709\u66F4\u597D\u7684\u6761\u4EF6\u5219\u9009\u62E9 Thanos"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u8054\u90A6/Federation \u89E3\u51B3\u7684\u662F\u91C7\u96C6\u95EE\u9898\uFF0C\u6CA1\u6709\u89E3\u51B3\u5B58\u50A8\u548C\u67E5\u8BE2\u95EE\u9898"}),"\n",(0,s.jsx)(n.li,{children:"\u5B58\u50A8\u548C\u67E5\u8BE2\u80FD\u529B\u53D7\u5355\u673A\u6027\u80FD\u5F71\u54CD"}),"\n",(0,s.jsxs)(n.li,{children:["\u6CA1\u6709\u7F13\u5B58\u3001\u6CA1\u6709\u67E5\u8BE2\u5206\u53D1\u3001\u6CA1\u6709\u5B58\u50A8\u5207\u5206\u5E26\u6765\u7684\u95EE\u9898\u662F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u65E0\u6CD5\u89C4\u6A21\u5316"}),"\n",(0,s.jsx)(n.li,{children:"\u6570\u636E\u91C7\u96C6\u5EF6\u8FDF - \u96BE\u4EE5\u96C6\u4E2D\u544A\u8B66"}),"\n",(0,s.jsx)(n.li,{children:"\u5B58\u50A8\u5BB9\u91CF\u65E0\u6CD5\u6269\u5C55"}),"\n",(0,s.jsx)(n.li,{children:"\u5927\u91CF\u67E5\u8BE2\u6162"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"scrape_configs:\n  - job_name: 'federate'\n    scrape_interval: 15s\n    # \u4FDD\u7559\u6240\u6709\u6807\u7B7E\n    honor_labels: true\n    # \u66B4\u9732\u7684\u8054\u90A6\u63A5\u53E3\n    metrics_path: '/federate'\n    # \u9009\u62E9\u6307\u6807 -\n    params:\n      'match[]':\n        - '{job=\"prometheus\"}'\n        - '{__name__=~\"job:.*\"}'\n    # \u9700\u8981\u91C7\u96C6\u7684\u5B9E\u4F8B\n    static_configs:\n      - targets:\n          - 'source-prometheus-1:9090'\n          - 'source-prometheus-2:9090'\n          - 'source-prometheus-3:9090'\n"})})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return o}});var r=t(75271);let s={},i=r.createContext(s);function o(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);