"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["42447"],{49422:function(n,e,s){s.r(e),s.d(e,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>i});var t=JSON.parse('{"id":"service/api/protobuf/protobuf-web","title":"protobuf-web","description":"- bufbuild/protobuf-es","source":"@site/../notes/service/api/protobuf/protobuf-web.md","sourceDirName":"service/api/protobuf","slug":"/service/api/protobuf/web","permalink":"/notes/service/api/protobuf/web","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/protobuf/protobuf-web.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725936322000,"frontMatter":{"title":"protobuf-web"},"sidebar":"docs","previous":{"title":"Protobuf Go","permalink":"/notes/service/api/protobuf/go"},"next":{"title":"protoc-gen-validate","permalink":"/notes/service/api/protobuf/protoc-gen-validate"}}'),r=s("52676"),d=s("79938");let i={title:"protobuf-web"},l="protobuf-web",o={},c=[{value:"ts-proto",id:"ts-proto",level:2},{value:"protobufjs",id:"protobufjs",level:2}];function j(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"protobuf-web",children:"protobuf-web"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/bufbuild/protobuf-es",children:"bufbuild/protobuf-es"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Apache-2.0, TS"}),"\n",(0,r.jsx)(e.li,{children:"\u4E0E protobuf-ts \u76F8\u540C\u4F5C\u8005"}),"\n",(0,r.jsx)(e.li,{children:"@bufbuild/protoc-gen-es"}),"\n",(0,r.jsxs)(e.li,{children:["used by ",(0,r.jsx)(e.a,{href:"https://github.com/connectrpc/connect-es",children:"connectrpc/connect-es"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/timostamm/protobuf-ts",children:"timostamm/protobuf-ts"})}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/protobufjs/protobuf.js",children:"protobufjs/protobuf.js"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:".proto, JSON descriptors, reflectiom, custom class"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://protobufjs.github.io/protobuf.js/",children:"https://protobufjs.github.io/protobuf.js/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/protocolbuffers/protobuf-javascript",children:"protocolbuffers/protobuf-javascript"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"BSD-2, Apache-2.0, JS"}),"\n",(0,r.jsx)(e.li,{children:"\u76EE\u524D\u7EF4\u62A4\u4E0D\u8DB3"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/stephenh/ts-proto",children:"stephenh/ts-proto"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4E0D\u751F\u6210 index.ts ",(0,r.jsx)(e.a,{href:"https://github.com/stephenh/ts-proto/issues/212",children:"#212"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"ts-proto",children:"ts-proto"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"nice-grpc \u4F7F\u7528"}),"\n",(0,r.jsx)(e.li,{children:"\u751F\u6210\u5355\u72EC\u6587\u4EF6"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"opt"}),(0,r.jsx)(e.th,{children:"default"}),(0,r.jsx)(e.th,{children:"notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"context"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"forceLong"}),(0,r.jsx)(e.td,{children:"number"}),(0,r.jsx)(e.td,{children:"long,string"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"esModuleInterop"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"env"}),(0,r.jsx)(e.td,{children:"both"}),(0,r.jsx)(e.td,{children:"node,browser"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useOptionals"}),(0,r.jsx)(e.td,{children:"none"}),(0,r.jsx)(e.td,{children:"message,all"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"exportCommonSymbols"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"oneof"}),(0,r.jsx)(e.td,{children:"unions"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"unrecognizedEnum"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{children:"\u662F\u5426\u5305\u542B UNRECOGNIZED=-1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"lowerCaseServiceMethods"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"snakeToCamel"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputEncodeMethods"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"encode,decode"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputJsonMethods"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"fromJSON,toJSON"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"stringEnums"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsxs)(e.td,{children:["\u8981\u6C42 ",(0,r.jsx)(e.code,{children:"outputEncodeMethods=false"})]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputClientImpl"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"grpc-web"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"returnObservable"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Observable<T>"})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"addGrpcMetadata"}),(0,r.jsx)(e.td,{}),(0,r.jsxs)(e.td,{children:["\u8981\u6C42 ",(0,r.jsx)(e.code,{children:"nestJs=true"})]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"addNestjsRestParameter"}),(0,r.jsx)(e.td,{}),(0,r.jsxs)(e.td,{children:["\u8981\u6C42 ",(0,r.jsx)(e.code,{children:"nestJs=true"})]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"nestJs"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useDate"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"google.protobuf.Timestamp"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useObjectId"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{children:"mongodb.ObjectId"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputSchema"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputTypeRegistry"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"$type"})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"outputServices"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"grpc-js,nice-grpc,generic-definitions,none,false"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"metadataType"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Foo@./some-file"})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useAsyncIterable"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"emitImportedFiles"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"fileSuffix"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"importSuffix"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"enumsAsLiterals"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"as const"})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useExactTypes"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"fromPartial"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"unknownFields"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"onlyTypes"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{children:"\u53EA\u751F\u6210\u7C7B\u578B"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"usePrototypeForDefaults"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"Object.create"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useJsonWireFormat"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"useNumericEnumForJson"}),(0,r.jsx)(e.td,{children:"false"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["useOptionals - ",(0,r.jsx)(e.code,{children:"field: Message | undefined"}),", ",(0,r.jsx)(e.code,{children:"field?: Message"})]}),"\n",(0,r.jsx)(e.li,{children:"exportCommonSymbols - export DeepPartial"}),"\n",(0,r.jsx)(e.li,{children:"fromJSON - \u4F1A\u8BBE\u7F6E\u9ED8\u8BA4\u503C"}),"\n",(0,r.jsx)(e.li,{children:"toJSON - \u4E0D\u4F1A\u5FFD\u7565\u9ED8\u8BA4\u503C - \u672A\u6765\u53EF\u80FD\u4F1A"}),"\n",(0,r.jsx)(e.li,{children:"outputClientImpl - grpc-web, twirp, grpc-js, nextjs"}),"\n",(0,r.jsx)(e.li,{children:"useContext - \u6DFB\u52A0\u4E00\u4E2A\u989D\u5916\u7684 context \u53C2\u6570"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false,esModuleInterop=true,forceLong=long,outputTypeRegistry=true\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Basic gRPC\ninterface Rpc {\n  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;\n}\n"})}),"\n",(0,r.jsx)(e.h2,{id:"protobufjs",children:"protobufjs"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5F00\u53D1\u4E0D\u6D3B\u8DC3"}),"\n"]}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 ESM ",(0,r.jsx)(e.a,{href:"https://github.com/protobufjs/protobuf.js/issues/1230",children:"#1230"})]}),"\n",(0,r.jsxs)(e.li,{children:["protobufjs \u751F\u6210\u7684 JSON \u7F3A\u5C11\u4FE1\u606F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u65E0 comment"}),"\n",(0,r.jsxs)(e.li,{children:["option \u53EA\u80FD\u8BB0\u5F55 1 \u4E2A\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u65E0\u6CD5\u8BB0\u5F55 repeated option"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u65E0\u6CD5\u8BB0\u5F55\u5D4C\u5957 option"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["option \u4E3A\u5BF9\u8C61\u4F1A\u5931\u8D25 ",(0,r.jsx)(e.a,{href:"https://github.com/protobufjs/protobuf.js/issues/1788",children:"#1788"})]}),"\n"]})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"npm add -D protobufjs-cli\n\n# -t,--target - json, json-module, proto2, proto3, static, static-module\npbjs -t json file1.proto file2.proto > bundle.json\npbjs -t json-module -w commonjs -o bundle.js file1.proto file2.proto\n\npbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto\n\npbts -o compiled.d.ts compiled.js\npbjs -t static-module file1.proto file2.proto | pbts -o bundle.d.ts -\n\n#\npbjs -t json -p ./protos/bundles/ ./protos/core/**/*.proto -o src/protos/pb.json\npbjs -t static-module -p ./protos/bundles/ ./protos/core/**/*.proto -w es6 -o src/protos/pb.js\npbts -o src/protos/pb.d.ts src/protos/pb.js\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"source"}),(0,r.jsx)(e.th,{children:"lib"}),(0,r.jsx)(e.th,{children:"pros"}),(0,r.jsx)(e.th,{children:"cons"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:".proto"}),(0,r.jsx)(e.td,{children:"full"}),(0,r.jsx)(e.td,{children:"\u7B80\u5355\uFF0C\u4E0D\u9700\u8981\u7F16\u8BD1"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"json"}),(0,r.jsx)(e.td,{children:"light"}),(0,r.jsx)(e.td,{children:"\u5355 bundle\uFF0C\u4E0D\u9700\u8981 parse"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"static"}),(0,r.jsx)(e.td,{children:"minimal"}),(0,r.jsx)(e.td,{children:"\u4E0D\u9700\u8981 eval, \u6709 comment"}),(0,r.jsx)(e.td,{children:"\u4EE3\u7801\u975E\u5E38\u957F"})]})]})]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 root \u4E3A default"}),"\n",(0,r.jsxs)(e.li,{children:["static \u4EE3\u7801\u5F88\u957F - 1000 loc json -> 10,000 loc js\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5F88\u591A\u7A7A\u884C\u548C\u6CE8\u91CA"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md",children:"https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md"})}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"| pbjs          |\n| ------------- | ------------------ |\n| --alt-comment | \u89E3\u6790\u51FA\u66F4\u591A comment |\n| -w            | es6                |"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"import * as $protobuf from 'protobufjs/light';\n\n// \u53EF\u4EE5\u6709\u591A\u4E2A ROOT\n$protobuf.roots['default'] = new $protobuf.Root();\n"})})]})}function h(n={}){let{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(j,{...n})}):j(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return l},a:function(){return i}});var t=s(75271);let r={},d=t.createContext(r);function i(n){let e=t.useContext(d);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),t.createElement(d.Provider,{value:e},n.children)}}}]);