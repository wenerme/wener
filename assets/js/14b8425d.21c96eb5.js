"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["41348"],{21615:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>h,default:()=>a,assets:()=>t,toc:()=>d,frontMatter:()=>c});var s=JSON.parse('{"id":"devops/service/servicemesh","title":"Service Mesh","description":"- Observability, Security, Reliability","source":"@site/../notes/devops/service/servicemesh.md","sourceDirName":"devops/service","slug":"/devops/service/servicemesh","permalink":"/notes/devops/service/servicemesh","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/service/servicemesh.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1633617108000,"frontMatter":{"title":"Service Mesh"},"sidebar":"docs","previous":{"title":"Service governance","permalink":"/notes/devops/service/governance"},"next":{"title":"SRE","permalink":"/notes/devops/sre"}}'),r=i("52676"),l=i("79938");let c={title:"Service Mesh"},h="Service Mesh",t={},d=[{value:"Notes",id:"notes",level:2},{value:"SMI",id:"smi",level:2}];function x(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"service-mesh",children:"Service Mesh"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Observability, Security, Reliability"}),"\n",(0,r.jsxs)(n.li,{children:["Why\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u7EDF\u4E00\u5904\u7406 \u6A2A\u5207\u5173\u6CE8\u70B9/",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Cross-cutting_concern",children:"Cross-cutting_concern"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7C7B\u4F3C\u4E8E AOP \u7684\u5207\u9762"}),"\n",(0,r.jsx)(n.li,{children:"Service Mesh \u5904\u7406\u6240\u6709\u670D\u52A1\u4E4B\u95F4\u7684\u5207\u9762"}),"\n",(0,r.jsx)(n.li,{children:"\u6D41\u91CF\u76D1\u63A7, HTTP \u5F02\u5E38\u76D1\u63A7"}),"\n",(0,r.jsx)(n.li,{children:"mTLS"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u5FEB\u901F\u8FED\u4EE3 - \u63A5\u53E3/\u670D\u52A1\u4F5C\u4E3A\u4EA7\u54C1\u5FEB\u901F\u8FDB\u5165\u5E02\u573A"}),"\n",(0,r.jsxs)(n.li,{children:["\u5904\u7406 ",(0,r.jsx)(n.strong,{children:"\u670D\u52A1\u4E4B\u95F4"})," / ",(0,r.jsx)(n.strong,{children:"\u5916\u90E8"})," \u901A\u4FE1"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Why not\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5E26\u6765\u989D\u5916\u7684\u5EF6\u8FDF"}),"\n",(0,r.jsx)(n.li,{children:"\u590D\u6742\u7684\u8FD0\u7EF4\u90E8\u7F72"}),"\n",(0,r.jsx)(n.li,{children:"sidecar \u8017\u8D39\u989D\u5916\u7684\u8D44\u6E90"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["When\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u540C\u6B65\u901A\u4FE1\u573A\u666F"}),"\n",(0,r.jsx)(n.li,{children:"\u4EA7\u54C1\u662F API/\u670D\u52A1/\u63A5\u53E3"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u529F\u80FD/\u76EE\u7684/CCC\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u8DEF\u7531\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8D1F\u8F7D\u5747\u8861"}),"\n",(0,r.jsx)(n.li,{children:"\u767E\u5206\u6BD4\u6D41\u91CF\u5207\u5206"}),"\n",(0,r.jsx)(n.li,{children:"\u57FA\u4E8E \u5934/\u8DEF\u7531 \u6D41\u91CF\u5207\u5206"}),"\n",(0,r.jsx)(n.li,{children:"\u4EE3\u7406"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u6D41\u91CF\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8BBF\u95EE\u63A7\u5236"}),"\n",(0,r.jsx)(n.li,{children:"\u6D41\u91CF\u5207\u5206"}),"\n",(0,r.jsx)(n.li,{children:"\u6D41\u91CF\u89C4\u683C\u5B9A\u4E49"}),"\n",(0,r.jsx)(n.li,{children:"\u6D41\u91CF\u6307\u6807"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u76D1\u63A7\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8BBF\u95EE\u65E5\u5FD7"}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/#xref_monitoring_golden-signals",children:"\u9EC4\u91D1\u6307\u6807"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5EF6\u8FDF\u3001\u6D41\u91CF\u3001\u9519\u8BEF\u3001\u9971\u548C"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u8DEF\u7531\u7EA7\u76D1\u63A7"}),"\n",(0,r.jsxs)(n.li,{children:["\u8DDF\u8E2A\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Jaeger, Zipkin, OpenCensus, OpenTracing"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5F39\u6027\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7194\u65AD"}),"\n",(0,r.jsx)(n.li,{children:"\u91CD\u8BD5\u548C\u8D85\u65F6"}),"\n",(0,r.jsx)(n.li,{children:"\u57FA\u4E8E\u8DEF\u5F84\u7684\u91CD\u8BD5\u548C\u8D85\u65F6"}),"\n",(0,r.jsx)(n.li,{children:"\u9519\u8BEF\u6CE8\u5165"}),"\n",(0,r.jsx)(n.li,{children:"\u5EF6\u8FDF\u6CE8\u5165"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5B89\u5168\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"mTLS"}),"\n",(0,r.jsx)(n.li,{children:"CA \u8BC1\u4E66\u7BA1\u7406/\u96C6\u6210"}),"\n",(0,r.jsx)(n.li,{children:"\u9274\u6743\u89C4\u5219"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u8FDE\u63A5\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u96C6\u7FA4\u3001VM\u3001\u5BB9\u5668"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u7EC4\u6210\u90E8\u5206\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"control plane"}),"\n",(0,r.jsx)(n.li,{children:"data plane"}),"\n",(0,r.jsx)(n.li,{children:"proxy"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Traffic Shiffting\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Istio ",(0,r.jsx)(n.a,{href:"https://istio.io/latest/docs/tasks/traffic-management/traffic-shifting/",children:"Traffic Shifting"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://layer5.io/service-mesh-landscape/",children:"Service Mesh Landscape"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://servicemesh.es/",children:"Service Mesh Comparison"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://flagger.app/",children:"flagger"})," - Progressive Delivery Operator for Kubernetes\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Canary - progressive traffic shifting"}),"\n",(0,r.jsx)(n.li,{children:"A/B Testing - HTTP headers and cookies traffic routing"}),"\n",(0,r.jsx)(n.li,{children:"Blue/Green - traffic switching and mirroring"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u6CE8\u610F \u26A0\uFE0F - \u76EE\u524D=2020\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"istio \u662F\u76EE\u524D\u529F\u80FD\u6700\u4E3A\u5B8C\u5584\u7684 service mesh\uFF0C\u4F46\u4F53\u79EF\u548C\u8D44\u6E90\u5360\u7528\u4E5F\u662F\u76F8\u5F53\u53EF\u89C2"}),"\n",(0,r.jsx)(n.li,{children:"linkerd2 \u662F\u76EE\u524D\u6781\u4E3A\u8F7B\u91CF\uFF0C\u4FB5\u5165\u6027\u6781\u5C0F\uFF0C\u529F\u80FD\u6709\u9650\u4F46\u80FD\u4E0A\u751F\u4EA7\u7684\u7684 service mesh"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5FAE\u670D\u52A1\u7684 observability, reliability, security"}),"\n",(0,r.jsx)(n.li,{children:"Service Mesh \u7684\u7ED3\u6784\u90FD\u662F CP+DP"}),"\n",(0,r.jsx)(n.li,{children:"DP \u4E3A\u5E94\u7528\u7684 Sidecar"}),"\n",(0,r.jsxs)(n.li,{children:["Service Mesh \u5C31\u662F\u5C06\u5E94\u7528\u901A\u4FE1\u7F51\u7EDC\u5C42\u7684\u57FA\u7840\u529F\u80FD\u62BD\u8C61\u4E3A DP\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u670D\u52A1\u53D1\u73B0 - \u5982\u4F55\u8BF7\u6C42 \u670D\u52A1 A"}),"\n",(0,r.jsx)(n.li,{children:"\u65E5\u5FD7"}),"\n",(0,r.jsx)(n.li,{children:"\u8DDF\u8E2A"}),"\n",(0,r.jsx)(n.li,{children:"\u670D\u52A1\u6743\u9650"}),"\n",(0,r.jsx)(n.li,{children:"\u6307\u6807\u76D1\u63A7"}),"\n",(0,r.jsx)(n.li,{children:"\u4F8B\u5982 dubbo RPC \u4E2D\u5173\u4E8E\u5BA2\u6237\u7AEF\u4E0E\u6CE8\u518C\u4E2D\u5FC3\u901A\u4FE1\u8FD9\u90E8\u5206\u529F\u80FD"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\u91CD"})," \u5BA2\u6237\u7AEF\u5230 \u8F7B\u5BA2\u6237\u7AEF\u7684\u8FC7\u7A0B"]}),"\n",(0,r.jsxs)(n.li,{children:["Service Mesh \u7684 Service \u662F\u5E94\u7528\u7EAC\u5EA6\uFF0C\u4E0D\u662F ",(0,r.jsx)(n.code,{children:"me.wener.test.PingService"})," \u8FD9\u6837\u7684\u63A5\u53E3\u7EAC\u5EA6"]}),"\n",(0,r.jsx)(n.li,{children:"\u9762\u5411 Service \u66F4\u50CF\u662F\u9762\u5411 Dataplane"}),"\n",(0,r.jsx)(n.li,{children:"\u8981\u6C42\u5E73\u5766\u7684\u7F51\u7EDC\u7ED3\u6784 - \u8282\u70B9\u4E92\u901A"}),"\n",(0,r.jsx)(n.li,{children:"Dataplane \u7C7B\u4F3C\u4E00\u4E2A\u8282\u70B9\u7684\u7F51\u5173\uFF0C\u5904\u7406\u6240\u6709\u7684\u51FA\u5165\u6D41\u91CF"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"smi",children:"SMI"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://smi-spec.io/",children:"Service Mesh Interface"})," / ",(0,r.jsx)(n.a,{href:"https://github.com/servicemeshinterface/smi-spec",children:"servicemeshinterface/smi-spec"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Traffic Access Control - \u8BBF\u95EE\u63A7\u5236"}),"\n",(0,r.jsx)(n.li,{children:"Traffic Metrics - \u6307\u6807"}),"\n",(0,r.jsx)(n.li,{children:"Traffic Specs"}),"\n",(0,r.jsx)(n.li,{children:"Traffic Split - \u6D41\u91CF\u5207\u5206"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"kind: TrafficSplit\nmetadata:\n  name: canary\nspec:\n  # The root service that clients use to connect to the destination application.\n  service: website\n  # Services inside the namespace with their own selectors, endpoints and configuration.\n  backends:\n    - service: website-v1\n      weight: 90\n    - service: website-v2\n      weight: 10\n"})})]})}function a(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return h},a:function(){return c}});var s=i(75271);let r={},l=s.createContext(r);function c(e){let n=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function h(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);