"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["69293"],{99643:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>t,default:()=>d,assets:()=>a,toc:()=>o,frontMatter:()=>c});var s=JSON.parse('{"id":"service/api/openapi/README","title":"OpenAPI","description":"- \u4E0D\u652F\u6301 path \u5305\u542B /","source":"@site/../notes/service/api/openapi/README.md","sourceDirName":"service/api/openapi","slug":"/service/api/openapi/","permalink":"/notes/service/api/openapi/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/openapi/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1732517778000,"frontMatter":{"title":"OpenAPI"},"sidebar":"docs","previous":{"title":"nacos","permalink":"/notes/service/api/nacos"},"next":{"title":"RapiDoc","permalink":"/notes/service/api/openapi/rapidoc"}}'),l=i("52676"),r=i("79938");let c={title:"OpenAPI"},t="OpenAPI",a={},o=[{value:"OpenAPI",id:"openapi-1",level:2},{value:"Schema",id:"schema",level:2},{value:"Version",id:"version",level:2},{value:"summary vs description",id:"summary-vs-description",level:2}];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"openapi",children:"OpenAPI"})}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 path \u5305\u542B ",(0,l.jsx)(n.code,{children:"/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/OAI/OpenAPI-Specification/issues/892",children:"https://github.com/OAI/OpenAPI-Specification/issues/892"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/OAI/OpenAPI-Specification",children:"OAI/OpenAPI-Specification"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/grpc-ecosystem/grpc-gateway/issues/441",children:"grpc-ecosystem/grpc-gateway#441"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OpenAPIv3"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/google/gnostic",children:"google/gnostic"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OpenAPI <-> gRPC"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301 OpenAPIv3"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/rapi-doc/RapiDoc",children:"rapi-doc/RapiDoc"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/Redocly/redoc",children:"Redocly/redoc"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/fabien0102/openapi-codegen",children:"fabien0102/openapi-codegen"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/apioo/fusio",children:"apioo/fusio"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/Swagger2Markup/swagger2markup",children:"Swagger2Markup/swagger2markup"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/zalando/zally",children:"zalando/zally"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"linter"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"openapi-1",children:"OpenAPI"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.linode.com/docs/api/openapi.yaml",children:"https://www.linode.com/docs/api/openapi.yaml"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/AdguardTeam/AdGuardHome/blob/master/openapi/openapi.yaml",children:"https://github.com/AdguardTeam/AdGuardHome/blob/master/openapi/openapi.yaml"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://api.twitter.com/2/openapi.json",children:"https://api.twitter.com/2/openapi.json"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"schema",children:"Schema"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["ComponentType\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Schema"}),"\n",(0,l.jsx)(n.li,{children:"Response"}),"\n",(0,l.jsx)(n.li,{children:"Parameter"}),"\n",(0,l.jsx)(n.li,{children:"Example"}),"\n",(0,l.jsx)(n.li,{children:"RequestBody"}),"\n",(0,l.jsx)(n.li,{children:"Header"}),"\n",(0,l.jsx)(n.li,{children:"SecurityScheme"}),"\n",(0,l.jsx)(n.li,{children:"Link"}),"\n",(0,l.jsx)(n.li,{children:"Callback"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"version",children:"Version"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"OpenAPI v3.1 - 2020-06-18"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"100% JSON Schema \u652F\u6301"}),"\n",(0,l.jsxs)(n.li,{children:["paths \u5FC5\u8981 -> \u53EF\u9009\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u66F4\u597D\u63CF\u8FF0 \u56DE\u6389\u3001\u5F02\u6B65\u4E8B\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u6CA1\u6709 null \u7C7B\u578B\uFF0C\u65B0\u589E nullable \u5C5E\u6027"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"OpenAPI v3.0 - 2017-07-26"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["v2 -> v2\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"securityDefinitions, definitions, parameters, responses -> components"}),"\n",(0,l.jsx)(n.li,{children:"body, formData -> requestBody"}),"\n",(0,l.jsxs)(n.li,{children:["oauth2\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"application -> clientCredentials"}),"\n",(0,l.jsx)(n.li,{children:"accessCode -> authorizationCode"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u66F4\u597D\u7684 JSON Schema \u652F\u6301\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"oneOf"}),"\n",(0,l.jsx)(n.li,{children:"anyOf"}),"\n",(0,l.jsx)(n.li,{children:"allOf"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"http, basic"}),"\n",(0,l.jsx)(n.li,{children:"openIdConnect - oidc discovery"}),"\n",(0,l.jsx)(n.li,{children:"cookie"}),"\n",(0,l.jsx)(n.li,{children:"callbacks"}),"\n",(0,l.jsx)(n.li,{children:"link"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"OpenAPI v2.0 - 2014-09-08"}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"https://www.openapis.org/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2",children:"https://www.openapis.org/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"https://blog.stoplight.io/difference-between-open-v2-v3-v31",children:"https://blog.stoplight.io/difference-between-open-v2-v3-v31"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(n.h2,{id:"summary-vs-description",children:"summary vs description"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"summary - \u7B80\u77ED\u63CF\u8FF0"}),"\n",(0,l.jsx)(n.li,{children:"description - \u8BE6\u7EC6\u63CF\u8FF0"}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return t},a:function(){return c}});var s=i(75271);let l={},r=s.createContext(l);function c(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);