"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36168"],{96383:function(n,e,i){i.r(e),i.d(e,{metadata:()=>l,contentTitle:()=>d,default:()=>x,assets:()=>t,toc:()=>h,frontMatter:()=>c});var l=JSON.parse('{"id":"languages/go/lib/go-micro","title":"go-micro","description":"- asim/go-micro","source":"@site/../notes/languages/go/lib/go-micro.md","sourceDirName":"languages/go/lib","slug":"/languages/go/lib/go-micro","permalink":"/notes/languages/go/lib/go-micro","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/lib/go-micro.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1655100912000,"frontMatter":{"title":"go-micro"},"sidebar":"docs","previous":{"title":"Golang \u5E93\u5E38\u89C1\u95EE\u9898","permalink":"/notes/languages/go/lib/faq"},"next":{"title":"go-zero","permalink":"/notes/languages/go/lib/go-zero"}}'),r=i("52676"),s=i("79938");let c={title:"go-micro"},d="go-micro",t={},h=[{value:"Components",id:"components",level:2},{value:"RPC",id:"rpc",level:2},{value:"protoc-gen-micro",id:"protoc-gen-micro",level:2},{value:"asim/go-micro vs micro/go-micro",id:"asimgo-micro-vs-microgo-micro",level:2}];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"go-micro",children:"go-micro"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/asim/go-micro",children:"asim/go-micro"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u57FA\u672C\u63A5\u53E3\u5B9A\u4E49+Plugins \u63D0\u4F9B\u5E73\u53F0\u76F8\u5173\u5B9E\u73B0"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"Transport http :52980"}),"\n",(0,r.jsx)(e.li,{children:"Broker http :52981"}),"\n",(0,r.jsx)(e.li,{children:"GRPC server :53915"}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/m3o/m3o",children:"m3o/m3o"})}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/micro/services",children:"micro/services"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u57FA\u4E8E micro \u7684\u670D\u52A1\u793A\u4F8B"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.infoq.com/podcasts/microservices-go-micro-paas3/",children:"Asim Aslam on Microservices, go-micro, and PaaS 3.0"})}),"\n",(0,r.jsxs)(e.li,{children:["\u7C7B\u4F3C\u9879\u76EE\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/google/go-cloud",children:"google/go-cloud"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["gRPC \u4E0D\u652F\u6301 Client Stream\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/asim/go-micro/issues/2212",children:"asim/go-micro#2212"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["gRPC \u670D\u52A1\u7AEF\u65E0\u6CD5\u63A5\u6536 metadata\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/asim/go-micro/issues/574",children:"asim/go-micro#574"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:'package main\nimport "go-micro.dev/v4"\n\nfunc main()  {\n  // create a new service\n  service := micro.NewService(\n      micro.Name("helloworld"),\n  )\n\n  // initialise flags\n  service.Init()\n\n  // start the service\n  service.Run()\n}\n'})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'# micro \u5FEB\u901F\u751F\u6210\u5DE5\u5177\n# go install github.com/asim/go-micro/cmd/gomu@latest\n\ngo install go-micro.dev/v4/cmd/micro@master\nmicro generate skaffold\n\nmicro call helloworld Helloworld.Call \'{"name": "John"}\'\n'})}),"\n",(0,r.jsx)(e.h2,{id:"components",children:"Components"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u5206\u79BB New \u548C Init\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"New \u63A5\u6536 Option \u4F46\u4E0D\u4F1A\u62A5\u9519"}),"\n",(0,r.jsx)(e.li,{children:"\u56E0\u6B64\u5F88\u591A\u914D\u7F6E\u53EF\u4EE5\u8BBE\u7F6E\u4E3A\u52A8\u6001"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["api - HTTP API\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"api.Api - mux"}),"\n",(0,r.jsxs)(e.li,{children:["api.Service\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E00\u4E2A Endpoint \u548C\u591A\u4E2A registry.Service"}),"\n",(0,r.jsx)(e.li,{children:"Path -selector-> registry.Service"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["api.Endpoint\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E00\u4E2A\u5165\u53E3, Host+Method+Path"}),"\n",(0,r.jsxs)(e.li,{children:["\u5982\u679C Path \u4EE5 ",(0,r.jsx)(e.code,{children:"^"})," \u5F00\u5934\u5219\u4E3A pcre"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["handler - http.Handler - \u5B9E\u9645\u5904\u7406\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"api - http <-> registry.Service"}),"\n",(0,r.jsx)(e.li,{children:"event - http <-> client.Publish"}),"\n",(0,r.jsx)(e.li,{children:"http - http <-> api.Service"}),"\n",(0,r.jsx)(e.li,{children:"rpc - http <-proto/json-> api.Service -> registry.Service"}),"\n",(0,r.jsx)(e.li,{children:"\u5BF9 body \u548C\u670D\u52A1\u7684\u8BC6\u522B\u5904\u7406\u4E0D\u540C"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["server - API Gateway - path -> http.Handler\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"http - HTTP Server"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["router\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["router.Router\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6620\u5C04 http.Request -> api.Service"}),"\n",(0,r.jsx)(e.li,{children:"\u6CE8\u518C endpoint"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["registry\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"watch registry.Registry \u6240\u6709 Service \u7684\u6240\u6709 Endpoint"}),"\n",(0,r.jsx)(e.li,{children:"\u7F51\u5173\u6027\u8D28"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["resolver - http.Request -> resolver.Endpoint/Host+Method+Path\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u63D0\u53D6\u8BF7\u6C42\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"auth - AuthN + AuthZ - API \u8D44\u6E90\u89D2\u5EA6"}),"\n",(0,r.jsxs)(e.li,{children:["broker - PubSub\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5F02\u6B65"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["events - \u4E8B\u4EF6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Stream+Store"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301 ACK"}),"\n",(0,r.jsx)(e.li,{children:"nats, redis"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["cache - \u7F13\u5B58\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"kv+\u65F6\u6548"}),"\n",(0,r.jsx)(e.li,{children:"\u53EA\u6709 Get+Put+Delete \u64CD\u4F5C"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"client - \u5BA2\u6237\u7AEF"}),"\n",(0,r.jsxs)(e.li,{children:["cmd - \u63D0\u4F9B\u547D\u4EE4\u884C\u5165\u53E3\u5904\u7406\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6301\u6709\u6240\u6709\u670D\u52A1\u7684\u5B9E\u73B0 - \u5168\u5C40\u4E0A\u4E0B\u6587"}),"\n",(0,r.jsx)(e.li,{children:"\u521D\u59CB\u5316\u76F8\u5173\u670D\u52A1"}),"\n",(0,r.jsx)(e.li,{children:"Before - \u5E94\u7528\u914D\u7F6E\u3001Init \u670D\u52A1"}),"\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 Action \u6CA1\u6709\u4EFB\u4F55\u64CD\u4F5C"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"codec - \u7F16\u7801"}),"\n",(0,r.jsxs)(e.li,{children:["config - \u914D\u7F6E\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"encoder.Encoder - \u7F16\u7801\u89E3\u7801 - json,yaml,xml \u7B49"}),"\n",(0,r.jsxs)(e.li,{children:["source.Source - \u4E00\u4E2A ",(0,r.jsx)(e.strong,{children:"\u914D\u7F6E\u9879"})," \u6765\u6E90\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6307\u5411 path/\u8DEF\u5F84/\u6587\u4EF6/\u73AF\u5883\u53D8\u91CF/flag"}),"\n",(0,r.jsx)(e.li,{children:"source.ChangeSet - \u914D\u7F6E\u5185\u5BB9"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"loader.Loader - \u52A0\u8F7D\u5408\u5E76 source"}),"\n",(0,r.jsxs)(e.li,{children:["reader.Reader - \u5408\u5E76 source.ChangeSet\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 json \u5B9E\u73B0"}),"\n",(0,r.jsx)(e.li,{children:"format -> encoder.Encoder"}),"\n",(0,r.jsx)(e.li,{children:"reader.Values - \u652F\u6301 get/set/del/scan \u7684\u914D\u7F6E\u9879"}),"\n",(0,r.jsx)(e.li,{children:"reader.Value - \u914D\u7F6E\u9879\u503C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["debug\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"stats"}),"\n",(0,r.jsx)(e.li,{children:"trace"}),"\n",(0,r.jsx)(e.li,{children:"profile"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"errors"}),"\n",(0,r.jsx)(e.li,{children:"logger"}),"\n",(0,r.jsx)(e.li,{children:"metadata - KV \u5143\u6570\u636E - \u5176\u4ED6\u7528\u5230\u5143\u6570\u636E\u7684\u5730\u65B9\u90FD\u4F1A\u8F6C\u4E3A\u8BE5\u7C7B\u578B"}),"\n",(0,r.jsxs)(e.li,{children:["plugins - \u63D2\u4EF6\u4F53\u7CFB\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"plugins.Plugin - go plugin \u63A5\u53E3 - go build -buildmode=plugin"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u7C7B\u578B broker, client, registry, selector, server, transport"}),"\n",(0,r.jsx)(e.li,{children:"\u4F1A\u6CE8\u518C\u5230 cmd.DefaultXxx"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["registry - Service/\u670D\u52A1 \u6CE8\u518C\u4E2D\u5FC3\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["registry.Service - \u6CE8\u518C\u7684\u670D\u52A1\u4FE1\u606F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6CE8\u518C\u7684\u540D\u5B57\u4E3A server.DefaultName - \u4E5F\u5C31\u662F\u670D\u52A1\u7EF4\u5EA6 / micro.Service \u7EF4\u5EA6"}),"\n",(0,r.jsx)(e.li,{children:"\u5305\u542B\u591A\u4E2A Endpoint, Node"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["registry.Endpoint - \u7EC8\u7AEF\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["server.Handler - \u6BCF\u4E2A\u65B9\u6CD5\u4F1A\u6CE8\u518C\u4E3A\u4E00\u4E2A Endpoint\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"relfect.Type Method"}),"\n",(0,r.jsx)(e.li,{children:"name=type.method"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["server.Subscriber - \u6BCF\u4E2A Subscriber \u65B9\u6CD5 \u4F1A\u6CE8\u518C\u4E3A\u4E00\u4E2A Endpoint\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Func, reflect.Type.Name+.method.Name"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"registry.Node"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["server - RPC \u670D\u52A1\u7AEF\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"server.Server"}),"\n",(0,r.jsx)(e.li,{children:"server.Router - \u7C7B\u4F3C http.Handler+mux \u89D2\u8272"}),"\n",(0,r.jsx)(e.li,{children:"server.Request"}),"\n",(0,r.jsx)(e.li,{children:"server.Response"}),"\n",(0,r.jsx)(e.li,{children:"server.Message"}),"\n",(0,r.jsx)(e.li,{children:"server.Stream"}),"\n",(0,r.jsxs)(e.li,{children:["server.Handler - opaque handler - \u5B9E\u73B0\u76F8\u5173\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5904\u7406 Request -> Response"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["server.Subscriber - opaque subscriber - \u5B9E\u73B0\u76F8\u5173\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5904\u7406 Message"}),"\n",(0,r.jsxs)(e.li,{children:["func\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"func(context.Context,Type)"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["struct\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"func(Type)"}),"\n",(0,r.jsx)(e.li,{children:"func(context.Context,Type)"}),"\n",(0,r.jsx)(e.li,{children:"func(context.Context,requestType,responseType) - grpc - \u4EE5 responseType \u4F5C\u4E3A Request"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"selector - \u670D\u52A1\u9009\u62E9\u673A\u5236"}),"\n",(0,r.jsx)(e.li,{children:"transport - \u4F20\u8F93\u534F\u8BAE\u62BD\u8C61"}),"\n",(0,r.jsx)(e.li,{children:"runtime - \u8FD0\u884C\u65F6"}),"\n",(0,r.jsx)(e.li,{children:"selector - \u8D1F\u8F7D\u9009\u62E9"}),"\n",(0,r.jsxs)(e.li,{children:["store - \u6570\u636E\u5B58\u50A8/\u5BF9\u8C61\u5B58\u50A8/KV \u5B58\u50A8\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"redis, memcached, mysql, consul, file(bolt),cockroach"}),"\n",(0,r.jsx)(e.li,{children:"\u6709 database, table \u6982\u5FF5"}),"\n",(0,r.jsx)(e.li,{children:"\u6709 offset,limit \u6982\u5FF5"}),"\n",(0,r.jsx)(e.li,{children:"\u8BFB\u53D6\u9ED8\u8BA4\u8FD4\u56DE\u591A\u503C"}),"\n",(0,r.jsx)(e.li,{children:"\u6570\u636E\u5305\u542B key,value,metadata,expire_at"}),"\n",(0,r.jsx)(e.li,{children:"Read+Write+Delete+List \u64CD\u4F5C"}),"\n",(0,r.jsxs)(e.li,{children:["\u73B0\u5728\u5DF2\u7ECF\u6CA1\u6709 BlobStore \u4E86\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/asim/go-micro/blob/09d6d0e2d22b7d342de713b762b982afe93396c6/store/s3/s3.go",children:"s3.go"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"sync - \u5206\u5E03\u5F0F\u9501"}),"\n",(0,r.jsx)(e.li,{children:"transport - \u4F20\u8F93\u5C42\u62BD\u8C61"}),"\n",(0,r.jsxs)(e.li,{children:["web\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["web.Service - path -> http.Handler\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F1A\u6CE8\u518C"}),"\n",(0,r.jsx)(e.li,{children:"\u6301\u6709 cmd.Cmd - \u5305\u542B\u6574\u4F53\u4E0A\u4E0B\u6587"}),"\n",(0,r.jsx)(e.li,{children:"http.ServeMux"}),"\n",(0,r.jsx)(e.li,{children:"http.Client"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["micro - \u5FAE\u670D\u52A1\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["micro.Service - micro \u5E73\u53F0\u670D\u52A1\u89C4\u8303/Pattern\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F1A\u6CE8\u518C"}),"\n",(0,r.jsx)(e.li,{children:"client.Client"}),"\n",(0,r.jsx)(e.li,{children:"server.Server"}),"\n",(0,r.jsxs)(e.li,{children:["Init\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u52A0\u8F7D\u63D2\u4EF6 MICRO_PLUGIN"}),"\n",(0,r.jsx)(e.li,{children:"cmd.Cmd.Init"}),"\n",(0,r.jsx)(e.li,{children:"store.Store.Init"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Start\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Server.Start"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Run\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Client debug.Handler"}),"\n",(0,r.jsx)(e.li,{children:"Profile.Start"}),"\n",(0,r.jsx)(e.li,{children:"Start"}),"\n",(0,r.jsx)(e.li,{children:"Context.Done()"}),"\n",(0,r.jsx)(e.li,{children:"Stop"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["micro.Function\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7EE7\u627F micro.Service"}),"\n",(0,r.jsx)(e.li,{children:"\u4E00\u6B21\u6027\u8C03\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5927\u90E8\u5206\u7EC4\u4EF6\u90FD\u6709 Default"}),"\n",(0,r.jsxs)(e.li,{children:["Service\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"micro.Service - micro \u5E73\u53F0\u670D\u52A1\u89C4\u8303/Pattern"}),"\n",(0,r.jsx)(e.li,{children:"micro.Function"}),"\n",(0,r.jsx)(e.li,{children:"web.Service - path -> http.Handler"}),"\n",(0,r.jsx)(e.li,{children:"api.Service - Endpoint -> rpc Service"}),"\n",(0,r.jsx)(e.li,{children:"registry.Service - \u6CE8\u518C\u7684\u670D\u52A1\u4FE1\u606F"}),"\n",(0,r.jsx)(e.li,{children:"runtime.Service - \u8FD0\u884C\u65F6\u76F8\u5173\u670D\u52A1"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"rpc",children:"RPC"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["micro metadata \u4E0A\u4E0B\u6587\u5185\u5BB9\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Remote"}),"\n",(0,r.jsx)(e.li,{children:":authority"}),"\n",(0,r.jsx)(e.li,{children:"content-type"}),"\n",(0,r.jsx)(e.li,{children:"user-agent"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"grpc \u65F6\u5BA2\u6237\u7AEF\u4F1A\u5C06 micro metadata \u7684\u6570\u636E\u8F6C\u5230 grpc \u5934 - \u5982\u679C\u8981\u6DFB\u52A0\u6388\u6743\u5219\u4F7F\u7528 micro metadata"}),"\n",(0,r.jsxs)(e.li,{children:["client\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"WithServiceToken - authWrapper \u4F1A\u53D6 metadata \u91CC\u7684 Authorization"}),"\n",(0,r.jsx)(e.li,{children:"\u6709 Auth \u4F1A\u7528\u5230 metadata \u91CC\u7684 Micro-Namespace"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["HeaderPrefix \u9ED8\u8BA4 Micro-\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Namespace"}),"\n",(0,r.jsx)(e.li,{children:"From-Service"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"protoc-gen-micro",children:"protoc-gen-micro"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"grpc \u9002\u914D micro"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# go install github.com/asim/go-micro/cmd/protoc-gen-micro/v3@latest\ngo install go-micro.dev/v4/cmd/protoc-gen-micro@latest\n"})}),"\n",(0,r.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h2,{id:"asimgo-micro-vs-microgo-micro",children:"asim/go-micro vs micro/go-micro"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["asim/go-micro\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E2A\u4EBA\u9879\u76EE"}),"\n",(0,r.jsx)(e.li,{children:"\u63A5\u53E3\u53D8\u5316\u5F88\u5927"}),"\n",(0,r.jsx)(e.li,{children:"\u6D89\u53CA\u5230 License \u53D8\u5316"}),"\n",(0,r.jsx)(e.li,{children:"micro/go-micro -> asim/go-micro"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://pkg.go.dev/github.com/micro/go-micro/v3",children:"micro/go-micro"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u516C\u53F8\u9879\u76EE - micro.mu"}),"\n",(0,r.jsx)(e.li,{children:"\u63A5\u53E3\u548C\u5B9E\u73B0\u6EE1\u8DB3\u516C\u53F8\u9700\u8981"}),"\n"]}),"\n"]}),"\n"]})]})}function x(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return c}});var l=i(75271);let r={},s=l.createContext(r);function c(n){let e=l.useContext(s);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),l.createElement(s.Provider,{value:e},n.children)}}}]);