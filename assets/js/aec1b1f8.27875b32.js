"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["75272"],{34290:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>x,assets:()=>d,toc:()=>h,frontMatter:()=>t});var s=JSON.parse('{"id":"languages/go/lib/go-kit","title":"go-kit","description":"- go-kit/kit","source":"@site/../notes/languages/go/lib/go-kit.md","sourceDirName":"languages/go/lib","slug":"/languages/go/lib/go-kit","permalink":"/notes/languages/go/lib/go-kit","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/lib/go-kit.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1655970411000,"frontMatter":{"title":"go-kit"},"sidebar":"docs","previous":{"title":"go-cloud","permalink":"/notes/languages/go/lib/go-cloud"},"next":{"title":"Golang \u5E93\u5E38\u89C1\u95EE\u9898","permalink":"/notes/languages/go/lib/faq"}}'),l=i("52676"),r=i("79938");let t={title:"go-kit"},c="go-kit",d={},h=[{value:"\u6A21\u5757",id:"\u6A21\u5757",level:2}];function o(n){let e={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"go-kit",children:"go-kit"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/go-kit/kit",children:"go-kit/kit"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5F00\u53D1\u4E0D\u6D3B\u8DC3\u3001\u8BBE\u8BA1\u53EF\u4F5C\u53C2\u8003"}),"\n",(0,l.jsx)(e.li,{children:"\u5FAE\u670D\u52A1\u5F00\u53D1\u5957\u4EF6/\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"Unopinioned"}),"\n",(0,l.jsxs)(e.li,{children:["\u4E09\u5C42\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Transport"}),"\n",(0,l.jsx)(e.li,{children:"Endpoint"}),"\n",(0,l.jsx)(e.li,{children:"Service"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{children:"Layer"}),(0,l.jsx)(e.th,{children:"Impl"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Transport"}),(0,l.jsxs)(e.td,{children:["http",(0,l.jsx)(e.br,{}),"nats",(0,l.jsx)(e.br,{}),"jsonrpc",(0,l.jsx)(e.br,{}),"grpc",(0,l.jsx)(e.br,{}),"thrift",(0,l.jsx)(e.br,{}),"amqp",(0,l.jsx)(e.br,{}),"httprp"]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Endpoint"}),(0,l.jsxs)(e.td,{children:["metrics",(0,l.jsx)(e.br,{}),"balance",(0,l.jsx)(e.br,{}),"limiting"]})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Service"}),(0,l.jsxs)(e.td,{children:["business analytics",(0,l.jsx)(e.br,{}),"application logging",(0,l.jsx)(e.br,{}),"service metrics",(0,l.jsx)(e.br,{}),"business login"]})]})]})]}),"\n",(0,l.jsx)(e.h2,{id:"\u6A21\u5757",children:"\u6A21\u5757"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["auth - \u8BA4\u8BC1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"basic"}),"\n",(0,l.jsxs)(e.li,{children:["casbin - ",(0,l.jsx)(e.a,{href:"https://github.com/casbin/casbin",children:"casbin/casbin"})," \u96C6\u6210"]}),"\n",(0,l.jsx)(e.li,{children:"jwt"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["circuitbreaker - \u7194\u65AD\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Gobreaker - ",(0,l.jsx)(e.a,{href:"https://github.com/sony/gobreaker",children:"sony/gobreaker"})]}),"\n",(0,l.jsxs)(e.li,{children:["HandyBreaker - ",(0,l.jsx)(e.a,{href:"https://github.com/streadway/handy",children:"streadway/handy/breaker"})]}),"\n",(0,l.jsxs)(e.li,{children:["Hystrix - ",(0,l.jsx)(e.a,{href:"https://github.com/afex/hystrix-go",children:"afex/hystrix-go"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["endpoint - \u7EC8\u7AEF\u63A5\u53E3\u5B9A\u4E49\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Endpoint - ",(0,l.jsx)(e.code,{children:"func(ctx context.Context, request interface{}) (response interface{}, err error)"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8BF7\u6C42 -> \u54CD\u5E94"}),"\n",(0,l.jsx)(e.li,{children:"\u5927\u591A\u5176\u4ED6\u529F\u80FD\u901A\u8FC7\u5C01\u88C5\u8BE5\u63A5\u53E3\u5B9E\u73B0"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u4EE5\u8868\u793A\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Middleware - ",(0,l.jsx)(e.code,{children:"func(Endpoint) Endpoint"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["log - \u65E5\u5FD7\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Logger\uFF0CLoggerFunc - \u65E5\u5FD7\u63A5\u53E3"}),"\n",(0,l.jsx)(e.li,{children:"level - \u65E5\u5FD7\u7EA7\u522B Debug Info Warn Error"}),"\n",(0,l.jsx)(e.li,{children:"logrus - logrus \u65E5\u5FD7\u96C6\u6210"}),"\n",(0,l.jsx)(e.li,{children:"syslog - syslog \u65E5\u5FD7"}),"\n",(0,l.jsx)(e.li,{children:"term - \u7EC8\u7AEF\u65E5\u5FD7\uFF0C\u652F\u6301\u989C\u8272"}),"\n",(0,l.jsxs)(e.li,{children:["zap - ",(0,l.jsx)(e.a,{href:"https://github.com/uber-go/zap",children:"uber-go/zap"})," \u7ED3\u6784\u5316\u65E5\u5FD7"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["metrics - \u6307\u6807\u76D1\u63A7\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Counter\u3001Gauge\u3001Histogram\u3001Timer - \u6307\u6807\u63A5\u53E3"}),"\n",(0,l.jsx)(e.li,{children:"expvar"}),"\n",(0,l.jsx)(e.li,{children:"prometheus"}),"\n",(0,l.jsx)(e.li,{children:"statsd"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"ratelimit - \u9650\u6D41"}),"\n",(0,l.jsxs)(e.li,{children:["sd - \u670D\u52A1\u53D1\u73B0\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Endpointer - \u8FD4\u56DE\u591A\u4E2A Endpoint\uFF0C\u53D1\u73B0\u7684\u670D\u52A1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53D1\u73B0\u7684 Endpoint"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Factory - \u5B9E\u4F8B\u5B9A\u4E49 \u4F8B\u5982 host:port -> Endpoint"}),"\n",(0,l.jsxs)(e.li,{children:["Instancer - \u5BA2\u6237\u7AEF\u53D1\u73B0\u7684\u670D\u52A1\u5B9E\u4F8B\u4FE1\u606F\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5BA2\u6237\u7AEF\u4F7F\u7528\u7684\u670D\u52A1\u53D1\u73B0"}),"\n",(0,l.jsx)(e.li,{children:"Event \u5305\u542B\u5B9E\u4F8B\u5B57\u7B26\u4E32\u548C\u5F02\u5E38\uFF0C\u5B9E\u4F8B\u5B57\u7B26\u4E32\u901A\u8FC7 Factory \u83B7\u53D6\u5230\u5B9E\u9645 Endpoint"}),"\n",(0,l.jsx)(e.li,{children:"\u542F\u52A8\u540E\u4F1A\u4E00\u822C\u4F1A\u540E\u53F0\u6301\u7EED\u5237\u65B0"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Registrar - \u670D\u52A1\u6CE8\u518C\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u670D\u52A1\u7AEF\u4F7F\u7528\u7684\u670D\u52A1\u53D1\u73B0"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["consul\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Instancer"}),"\n",(0,l.jsxs)(e.li,{children:["Registrar\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6CE8\u518C agent service"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["dnssrv\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Instancer"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"etcd"}),"\n",(0,l.jsx)(e.li,{children:"eureka"}),"\n",(0,l.jsx)(e.li,{children:"zk - Zookeeper"}),"\n",(0,l.jsxs)(e.li,{children:["lb - \u8D1F\u8F7D\u5747\u8861\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Balancer - \u8FD4\u56DE\u5355\u4E2A Endpoint\uFF0C\u8D1F\u8F7D\u5747\u8861\u9009\u62E9\u7ED3\u679C\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E00\u822C\u901A\u8FC7 sd.Endpointer \u521B\u5EFA"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u652F\u6301\u7B56\u7565\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Random"}),"\n",(0,l.jsx)(e.li,{children:"Retry"}),"\n",(0,l.jsx)(e.li,{children:"RoundRobin"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["tracing - \u8DDF\u8E2A\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"opencensus"}),"\n",(0,l.jsx)(e.li,{children:"opentracing"}),"\n",(0,l.jsx)(e.li,{children:"zipkin"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["transport - \u4F20\u8F93\u534F\u8BAE\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"amqp"}),"\n",(0,l.jsx)(e.li,{children:"grpc"}),"\n",(0,l.jsxs)(e.li,{children:["http\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"jsonrpc - JSON RPC \u5E8F\u5217\u5316"}),"\n",(0,l.jsx)(e.li,{children:"proto - Protobuf \u5E8F\u5217\u5316"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"httprp - HTTP \u53CD\u5411\u4EE3\u7406"}),"\n",(0,l.jsx)(e.li,{children:"nats"}),"\n",(0,l.jsx)(e.li,{children:"thrift"}),"\n"]}),"\n"]}),"\n"]})]})}function x(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);