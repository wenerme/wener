"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["1679"],{82358:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>p,assets:()=>c,toc:()=>d,frontMatter:()=>i});var r=JSON.parse('{"id":"service/observability/tracing/opentelemetry/README","title":"OpenTelemetry","description":"- OpenTelemetry \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/observability/tracing/opentelemetry/README.md","sourceDirName":"service/observability/tracing/opentelemetry","slug":"/service/observability/tracing/opentelemetry/","permalink":"/notes/service/observability/tracing/opentelemetry/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/tracing/opentelemetry/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1734410758000,"frontMatter":{"title":"OpenTelemetry"},"sidebar":"docs","previous":{"title":"Jaeger","permalink":"/notes/service/observability/tracing/jaeger"},"next":{"title":"Sentry","permalink":"/notes/service/observability/tracing/sentry"}}'),s=t("52676"),o=t("79938");let i={title:"OpenTelemetry"},l="OpenTelemetry",c={},d=[{value:"collector",id:"collector",level:2},{value:"Integration",id:"integration",level:2},{value:"NodeJS",id:"nodejs",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"opentelemetry",children:"OpenTelemetry"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["OpenTelemetry \u662F\u4EC0\u4E48\uFF1F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5B9A\u4E49 spec"}),"\n",(0,s.jsx)(n.li,{children:"OpenTracing \u548C OpenCensus \u5408\u5E76\u540E\u7684\u9879\u76EE"}),"\n",(0,s.jsx)(n.li,{children:"API -> SDK -> Processing -> Exporter -out of app-> Collector -> Backend"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-operator",children:"open-telemetry/opentelemetry-operator"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["otlp\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"/v1/traces"}),"\n",(0,s.jsx)(n.li,{children:"/v1/metrics"}),"\n",(0,s.jsx)(n.li,{children:"/v1/logs"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run --rm -it \\\n  --name opentelemetry-collector otel/opentelemetry-collector\n"})}),"\n",(0,s.jsx)(n.h2,{id:"collector",children:"collector"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-collector",children:"open-telemetry/opentelemetry-collector"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"vendor-agnostic implementation"}),"\n",(0,s.jsx)(n.li,{children:"\u5B9E\u73B0\u591A\u5957\u534F\u8BAE"}),"\n",(0,s.jsxs)(n.li,{children:["\u8FD0\u884C\u6A21\u5F0F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"agent - sidecar,\u91C7\u96C6\u5668"}),"\n",(0,s.jsx)(n.li,{children:"gateway - \u7F51\u5173\u96C6\u7FA4,\u72EC\u7ACB\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"core \u7248 - Jaeger, Prometheus, Fluent Bit"}),"\n",(0,s.jsx)(n.li,{children:"contrib \u7248 - \u5305\u542B\u6240\u6709 contrib \u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter",children:"open-telemetry/opentelemetry-collector-contrib/exporter"}),"\n\u4E0D\u540C\u540E\u7AEF\u7684 exporter"]}),"\n",(0,s.jsxs)(n.li,{children:["\u7EC4\u4EF6\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"receivers"}),"\n",(0,s.jsx)(n.li,{children:"processors"}),"\n",(0,s.jsx)(n.li,{children:"exporters"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"# \u6570\u636E\u6E90\u5B9A\u4E49 - \u5728 pipeline/service \u4E2D\u4F7F\u7528\n# push or pull\nreceivers:\n  otlp:\n    protocols:\n      grpc:\n      http:\n\nprocessors:\n  batch:\n\nexporters:\n  otlp:\n    endpoint: otelcol:55680\n\nextensions:\n  health_check:\n  pprof:\n  zpages:\n\nservice:\n  extensions: [health_check, pprof, zpages]\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [batch]\n      exporters: [otlp]\n    metrics:\n      receivers: [otlp]\n      processors: [batch]\n      exporters: [otlp]\n    logs:\n      receivers: [otlp]\n      processors: [batch]\n      exporters: [otlp]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"integration",children:"Integration"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"env"}),(0,s.jsx)(n.th,{children:"for"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"OTEL_EXPORTER_OTLP_ENDPOINT"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"OTEL_LOG_LEVEL"}),(0,s.jsx)(n.td,{})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"nodejs",children:"NodeJS"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://opentelemetry.io/docs/languages/js/getting-started/nodejs/",children:"https://opentelemetry.io/docs/languages/js/getting-started/nodejs/"})}),"\n",(0,s.jsxs)(n.li,{children:["Hono ",(0,s.jsx)(n.a,{href:"https://github.com/orgs/honojs/discussions/3215",children:"https://github.com/orgs/honojs/discussions/3215"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm add @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node\n\n# @opentelemetry/sdk-trace-web\n# @opentelemetry/sdk-metrics\nnpm add @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-proto\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="tracing.ts"',children:"'use strict';\n\nimport process from 'node:process';\nimport opentelemetry from '@opentelemetry/sdk-node';\nimport { NodeSDK } from '@opentelemetry/sdk-node';\nimport { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';\nimport { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';\nimport { Resource } from '@opentelemetry/resources';\nimport { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';\nimport { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';\n\nconst sdk = new NodeSDK({\n  traceExporter: new ConsoleSpanExporter(),\n  metricReader: new PeriodicExportingMetricReader({\n    exporter: new ConsoleMetricExporter(),\n  }),\n  resource: new Resource({\n    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',\n  }),\n  instrumentations: [getNodeAutoInstrumentations()],\n});\n\n// initialize the SDK and register with the OpenTelemetry API\n// this enables the API to record telemetry\nsdk.start();\n\n// gracefully shut down the SDK on process exit\nprocess.on('SIGTERM', () => {\n  sdk\n    .shutdown()\n    .then(() => console.log('Tracing terminated'))\n    .catch((error) => console.log('Error terminating tracing', error))\n    .finally(() => process.exit(0));\n});\n"})})]})}function p(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return i}});var r=t(75271);let s={},o=r.createContext(s);function i(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);