"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["57338"],{54976:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>d,assets:()=>a,toc:()=>h,frontMatter:()=>l});var r=JSON.parse('{"id":"service/observability/tracing/tracing-awesome","title":"Tracing Awesome","description":"- openzipkin/b3-propagation","source":"@site/../notes/service/observability/tracing/tracing-awesome.md","sourceDirName":"service/observability/tracing","slug":"/service/observability/tracing/awesome","permalink":"/notes/service/observability/tracing/awesome","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/tracing/tracing-awesome.md","tags":[{"inline":true,"label":"Awesome","permalink":"/notes/tags/awesome"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"Tracing Awesome","tags":["Awesome"]},"sidebar":"docs","previous":{"title":"SkyWalking","permalink":"/notes/service/observability/tracing/skywalking/"},"next":{"title":"tracing-faq","permalink":"/notes/service/observability/tracing/faq"}}'),s=i("52676"),t=i("79938");let l={title:"Tracing Awesome",tags:["Awesome"]},c="Tracing Awesome",a={},h=[{value:"Service",id:"service",level:2},{value:"Integration",id:"integration",level:2},{value:"Spec",id:"spec",level:2},{value:"Reference",id:"reference",level:2},{value:"Jaeger vs Zipkin",id:"jaeger-vs-zipkin",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"tracing-awesome",children:"Tracing Awesome"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/openzipkin/b3-propagation",children:"openzipkin/b3-propagation"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"service",children:"Service"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4E3B\u6D41 Jaeger\u3001Zipkin\u3001Apache SkyWalking\u3001CAT\u3001Pinpoint\u3001Elastic APM"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/pinpoint-apm/pinpoint",children:"pinpoint-apm/pinpoint"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://pinpoint-apm.gitbook.io/pinpoint/powered-by",children:"https://pinpoint-apm.gitbook.io/pinpoint/powered-by"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/notes/service/observability/tracing/zipkin",children:"openzipkin/zipkin"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Java"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/notes/service/observability/tracing/jaeger",children:"jaegertracing/jaeger"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Golang"}),"\n",(0,s.jsx)(n.li,{children:"Thrift"}),"\n",(0,s.jsx)(n.li,{children:"CNCF Jaeger, a Distributed Tracing System"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://jaegertracing.io/",children:"https://jaegertracing.io/"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/notes/service/observability/tracing/skywalking/",children:"apache/skywalking"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Java"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/lmangani/cLoki",children:"lmangani/cLoki"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"AGPL-3.0, JS"}),"\n",(0,s.jsx)(n.li,{children:"Loki+ClickHouse"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"integration",children:"Integration"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://spring.io/projects/spring-cloud-sleuth",children:"Spring Cloud Sleuth"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://cloud.spring.io/spring-cloud-sleuth/reference/html/",children:"\u53C2\u8003\u624B\u518C"})}),"\n",(0,s.jsxs)(n.li,{children:["spring-cloud-sleuth-zipkin \u652F\u6301\u96C6\u6210 Zipkin\uFF0C\u9ED8\u8BA4\u53D1\u9001\u5230 ",(0,s.jsx)(n.code,{children:"http://localhost:9411"}),"\uFF0C\u901A\u8FC7 ",(0,s.jsx)(n.code,{children:"spring.zipkin.baseUrl"})," \u914D\u7F6E"]}),"\n",(0,s.jsx)(n.li,{children:"\u4F1A\u8BB0\u5F55 trace \u4FE1\u606F\u5230 Slf4J MDC"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/openzipkin-contrib/brave-opentracing",children:"openzipkin-contrib/brave-opentracing"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"OpenTracing \u9002\u914D Zipkin"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"spec",children:"Spec"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"http://opentracing.io/",children:"opentracing"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Vendor-neutral APIs and instrumentation for distributed tracing"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["W3C ",(0,s.jsx)(n.a,{href:"https://github.com/w3c/trace-context",children:"trace-context"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"HTTP \u6DFB\u52A0 trace \u5934 traceparent,traceparent"}),"\n",(0,s.jsx)(n.li,{children:"\u5934\u4E2D\u4FE1\u606F\u5305\u542B version\u3001trace-id\u3001parent-id\u3001trace-flags"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Tracing_(software)",children:"Tracing"})}),"\n",(0,s.jsxs)(n.li,{children:["Google ",(0,s.jsx)(n.a,{href:"https://research.google.com/pubs/pub36356.html",children:"Dapper"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"a Large-Scale Distributed Systems Tracing Infrastructure"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"APM - application performance monitor"}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"jaeger-vs-zipkin",children:"Jaeger vs Zipkin"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Jaeger\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Golang, CNCF \u9879\u76EE"}),"\n",(0,s.jsx)(n.li,{children:"\u66F4\u9002\u7528\u4E8E Kubernates \u73AF\u5883"}),"\n",(0,s.jsx)(n.li,{children:"\u5206\u4E3A agent\u3001collector\u3001query \u7B49\u89D2\u8272"}),"\n",(0,s.jsx)(n.li,{children:"\u9ED8\u8BA4 0.1% \u91C7\u6837"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Zipkin\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Java"}),"\n",(0,s.jsx)(n.li,{children:"\u5728\u5BB9\u5668\u5316\u6F6E\u6D41\u524D\u4FBF\u5DF2\u5B58\u5728"}),"\n",(0,s.jsx)(n.li,{children:"\u5355\u670D\u52A1\uFF0C\u62A5\u8868\u3001\u91C7\u96C6"}),"\n",(0,s.jsx)(n.li,{children:"Spring Cloud Sleuth \u6709\u96C6\u6210"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"jaeger"}),"\n",(0,s.jsx)(n.a,{href:"https://www.jaegertracing.io/docs/1.12/architecture/",children:(0,s.jsx)(n.img,{src:"https://www.jaegertracing.io/img/architecture-v1.png",alt:"jaeger architecture"})})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"zipkin"}),"\n",(0,s.jsx)(n.a,{href:"https://zipkin.io/pages/architecture.html",children:(0,s.jsx)(n.img,{src:"https://zipkin.io/public/img/architecture-1.png",alt:"zipkin architecture"})})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.bizety.com/2019/01/14/distributed-tracing-for-microservices-jaeger-vs-zipkin/",children:"Distributed Tracing for Microservices: Jaeger vs. Zipkin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://logz.io/blog/zipkin-vs-jaeger/",children:"Zipkin vs Jaeger: Getting Started With Tracing"})}),"\n"]}),"\n"]}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return l}});var r=i(75271);let s={},t=r.createContext(s);function l(e){let n=r.useContext(t);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);