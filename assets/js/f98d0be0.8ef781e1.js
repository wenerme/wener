"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["86207"],{76426:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>j,assets:()=>d,toc:()=>a,frontMatter:()=>l});var i=JSON.parse('{"id":"service/observability/tracing/jaeger","title":"Jaeger","description":"- jaegertracing/jaeger","source":"@site/../notes/service/observability/tracing/jaeger.md","sourceDirName":"service/observability/tracing","slug":"/service/observability/tracing/jaeger","permalink":"/notes/service/observability/tracing/jaeger","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/tracing/jaeger.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"Jaeger"},"sidebar":"docs","previous":{"title":"Jaeger Operator","permalink":"/notes/service/observability/tracing/jaeger-operator"},"next":{"title":"OpenTelemetry","permalink":"/notes/service/observability/tracing/opentelemetry/"}}'),s=r("52676"),t=r("79938");let l={title:"Jaeger"},c="Jaeger",d={},a=[{value:"agent",id:"agent",level:2},{value:"collector",id:"collector",level:2},{value:"ingester",id:"ingester",level:2},{value:"query",id:"query",level:2}];function h(e){let n={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"jaeger",children:"Jaeger"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/jaegertracing/jaeger",children:"jaegertracing/jaeger"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Apache-2.0, Golang"}),"\n",(0,s.jsx)(n.li,{children:"from Uber"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u5B58\u50A8\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u9ED8\u8BA4\u5185\u5B58\u5B58\u50A8"}),"\n",(0,s.jsx)(n.li,{children:"badger - \u672C\u5730\u6587\u4EF6\u5B58\u50A8"}),"\n",(0,s.jsx)(n.li,{children:"cassandra - \u517C\u5BB9 scyllab"}),"\n",(0,s.jsx)(n.li,{children:"elasticsearch"}),"\n",(0,s.jsx)(n.li,{children:"kafka"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/jaegertracing/jaeger-clickhouse",children:"jaegertracing/jaeger-clickhouse"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# badger \u6301\u4E45\u5B58\u50A8\ndocker run -it --rm \\\n  -v $PWD/data:/badger \\\n  -e SPAN_STORAGE_TYPE=badger \\\n  -e BADGER_EPHEMERAL=false \\\n  -e BADGER_DIRECTORY_VALUE=/badger/data \\\n  -e BADGER_DIRECTORY_KEY=/badger/key \\\n  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \\\n  -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp \\\n  -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 \\\n  jaegertracing/all-in-one:latest\n"})}),"\n",(0,s.jsx)(n.h1,{id:"\u7EC4\u4EF6",children:"\u7EC4\u4EF6"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"collector - span -> \u5B58\u50A8"}),"\n",(0,s.jsx)(n.li,{children:"ingester - kafka -> \u5B58\u50A8"}),"\n",(0,s.jsx)(n.li,{children:"agent - sidecar"}),"\n",(0,s.jsx)(n.li,{children:"query - api, ui"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"agent",children:"agent"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4E0D\u4E00\u5B9A\u9700\u8981\u8FD0\u884C - \u4F46\u63A8\u8350"}),"\n",(0,s.jsx)(n.li,{children:"sidecar \u89D2\u8272 - \u8D1F\u8D23\u4E0E \u5176\u5B83\u7EC4\u4EF6\u4EA4\u4E92"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"port"}),(0,s.jsx)(n.th,{children:"protocol"}),(0,s.jsx)(n.th,{children:"function"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"6831"}),(0,s.jsx)(n.td,{children:"UDP"}),(0,s.jsx)(n.td,{children:"jaeger.thrift compact"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"6832"}),(0,s.jsx)(n.td,{children:"UDP"}),(0,s.jsx)(n.td,{children:"jaeger.thrift binary - Node.js Jaeger client"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"5778"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"serve configs, sampling strategies"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"5775"}),(0,s.jsx)(n.td,{children:"UDP"}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.del,{children:"zipkin.thrift compact"})," - 2016 \u65E9\u671F \u5BA2\u6237\u7AEF"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"14271"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"\u7BA1\u7406 - \u5065\u5EB7\u68C0\u67E5 / , \u6307\u6807 /metrics"})]})]})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run --rm \\\n  -p6831:6831/udp \\\n  -p6832:6832/udp \\\n  -p5778:5778/tcp \\\n  -p5775:5775/udp \\\n  jaegertracing/jaeger-agent:1.25\n"})}),"\n",(0,s.jsx)(n.h2,{id:"collector",children:"collector"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u65E0\u72B6\u6001"}),"\n",(0,s.jsx)(n.li,{children:"\u4E0E\u5B58\u50A8\u540E\u7AEF\u4EA4\u4E92 - \u5199\u5165\u5230\u5B58\u50A8"}),"\n",(0,s.jsxs)(n.li,{children:["SPAN_STORAGE_TYPE\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"cassandra, elasticsearch, kafka, grpc-plugin, badger, memory"}),"\n",(0,s.jsx)(n.li,{children:"\u652F\u6301\u591A\u4E2A - \u9017\u53F7\u5206\u9694 - \u67E5\u8BE2\u53EA\u4F1A\u7528\u7B2C\u4E00\u4E2A"}),"\n",(0,s.jsxs)(n.li,{children:["\u5927\u578B\u751F\u4EA7\u63A8\u8350 es\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u56E0\u4E3A es \u652F\u6301\u641C\u7D22"}),"\n",(0,s.jsx)(n.li,{children:"\u4F7F\u7528 cassandra \u9700\u8981\u5728 jeager"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.jaegertracing.io/docs/1.25/faq/#what-is-the-recommended-storage-backend",children:"What is the recommended storage backend?"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u5B58\u50A8\u63D2\u4EF6 - \u57FA\u4E8E unix-socket ",(0,s.jsx)(n.a,{href:"https://github.com/jaegertracing/jaeger/tree/master/plugin/storage/grpc",children:"grpc"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/jaegertracing/jaeger-clickhouse",children:"jaegertracing/jaeger-clickhouse"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"port"}),(0,s.jsx)(n.th,{children:"protocol"}),(0,s.jsx)(n.th,{children:"function"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"14250"}),(0,s.jsx)(n.td,{children:"gRPC"}),(0,s.jsx)(n.td,{children:"jaeger-agent send spans - model.proto"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"14268"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"spans in jaeger.thrift binary"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"9411"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"Zipkin spans in Thrift, JSON, Proto (disabled by default)"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"14269"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"\u7BA1\u7406 - \u5065\u5EB7\u68C0\u67E5 / , \u6307\u6807 /metrics"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"ingester",children:"ingester"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"kafka -> \u5176\u4ED6\u540E\u7AEF\u5B58\u50A8 - es \u6216 cassandra"}),"\n",(0,s.jsx)(n.li,{children:"\u7BA1\u7406\u7AEF\u53E3 14270"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"query",children:"query"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"UI"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Port"}),(0,s.jsx)(n.th,{children:"Protocol"}),(0,s.jsx)(n.th,{children:"Function"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"16685"}),(0,s.jsx)(n.td,{children:"gRPC"}),(0,s.jsx)(n.td,{children:"gRPC QueryService"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"16686"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:"/api/*"}),", UI /"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"16687"}),(0,s.jsx)(n.td,{children:"HTTP"}),(0,s.jsx)(n.td,{children:"\u7BA1\u7406\u7AEF\u53E3"})]})]})]})]})}function j(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return l}});var i=r(75271);let s={},t=i.createContext(s);function l(e){let n=i.useContext(t);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);