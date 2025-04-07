"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43258"],{25001:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>c,default:()=>a,assets:()=>o,toc:()=>d,frontMatter:()=>l});var i=JSON.parse('{"id":"service/observability/tracing/signoz","title":"Signoz","description":"- SigNoz/signoz","source":"@site/../notes/service/observability/tracing/signoz.md","sourceDirName":"service/observability/tracing","slug":"/service/observability/tracing/signoz","permalink":"/notes/service/observability/tracing/signoz","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/tracing/signoz.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1676530464000,"frontMatter":{"title":"Signoz"},"sidebar":"docs","previous":{"title":"Sentry","permalink":"/notes/service/observability/tracing/sentry"},"next":{"title":"SkyWalking","permalink":"/notes/service/observability/tracing/skywalking/"}}'),t=s("52676"),r=s("79938");let l={title:"Signoz"},c="Signoz",o={},d=[{value:"Notes",id:"notes",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"signoz",children:"Signoz"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/SigNoz/signoz",children:"SigNoz/signoz"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"MIT+EE, Golang, React"}),"\n",(0,t.jsx)(e.li,{children:"APM, ClickHouse"}),"\n",(0,t.jsxs)(e.li,{children:["\u5E94\u7528\u4FE1\u606F\u5B58\u50A8\u5728 SQLite ",(0,t.jsx)(e.a,{href:"https://github.com/SigNoz/signoz/issues/941",children:"#941"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"dashboards layout, alert config"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"signoz/alertmanager"}),"\n",(0,t.jsx)(e.li,{children:"signoz/query-service"}),"\n",(0,t.jsx)(e.li,{children:"signoz/frontend"}),"\n",(0,t.jsx)(e.li,{children:"signoz/signoz-otel-collector"}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://signoz.io/docs/tutorial/kubernetes-infra-metrics",children:"export K8s metrics"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"port"}),(0,t.jsx)(e.th,{children:"for"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"1777"}),(0,t.jsx)(e.td,{children:"pprof extension"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"4317"}),(0,t.jsx)(e.td,{children:"OTLP gRPC receiver"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"4318"}),(0,t.jsx)(e.td,{children:"OTLP HTTP receiver"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"8888"}),(0,t.jsx)(e.td,{children:"OtelCollector internal metrics"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"8889"}),(0,t.jsx)(e.td,{children:"signoz spanmetrics exposed by the agent"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"9411"}),(0,t.jsx)(e.td,{children:"Zipkin port"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"13133"}),(0,t.jsx)(e.td,{children:"health check extension"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"14250"}),(0,t.jsx)(e.td,{children:"Jaeger gRPC"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"14268"}),(0,t.jsx)(e.td,{children:"Jaeger thrift HTTP"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"55678"}),(0,t.jsx)(e.td,{children:"OpenCensus receiver"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"55679"}),(0,t.jsx)(e.td,{children:"zPages extension"})]})]})]}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["OpenID Connect/OAuth2 support ",(0,t.jsx)(e.a,{href:"https://github.com/SigNoz/signoz/issues/1188",children:"#1188"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u4E0D\u6253\u7B97\u652F\u6301 SSO"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["LDAP ",(0,t.jsx)(e.a,{href:"https://github.com/SigNoz/signoz/issues/1162",children:"#1162"})]}),"\n"]})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://charts.signoz.io",children:"https://charts.signoz.io"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://signoz.io/docs/install/kubernetes/others/",children:"https://signoz.io/docs/install/kubernetes/others/"})}),"\n",(0,t.jsxs)(e.li,{children:["Docker Compose\n",(0,t.jsx)(e.a,{href:"https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/docker-compose.yaml",children:"https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/docker-compose.yaml"})]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u9ED8\u8BA4\u5E93\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"signoz_traces"}),"\n",(0,t.jsx)(e.li,{children:"signoz_metrics"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash"})})]})}function a(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return c},a:function(){return l}});var i=s(75271);let t={},r=i.createContext(t);function l(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);