"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["61221"],{24398:function(n,e,r){r.r(e),r.d(e,{metadata:()=>t,contentTitle:()=>l,default:()=>d,assets:()=>c,toc:()=>o,frontMatter:()=>s});var t=JSON.parse('{"id":"languages/go/lib/machinery","title":"machinery","description":"- RichardKnop/machinery \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/languages/go/lib/machinery.md","sourceDirName":"languages/go/lib","slug":"/languages/go/lib/machinery","permalink":"/notes/languages/go/lib/machinery","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/lib/machinery.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1628355009000,"frontMatter":{"title":"machinery"},"sidebar":"docs","previous":{"title":"kratos","permalink":"/notes/languages/go/lib/kratos"},"next":{"title":"mapstructure","permalink":"/notes/languages/go/lib/mapstructure"}}'),a=r("52676"),i=r("79938");let s={title:"machinery"},l="machinery",c={},o=[];function u(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"machinery",children:"machinery"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:[(0,a.jsx)(e.a,{href:"https://github.com/RichardKnop/machinery",children:"RichardKnop/machinery"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u5F02\u6B65\u4EFB\u52A1\u961F\u5217"}),"\n",(0,a.jsx)(e.li,{children:"Lock - Redis"}),"\n",(0,a.jsx)(e.li,{children:"Broker - AMQP, Redis"}),"\n",(0,a.jsx)(e.li,{children:"ResultBackend - Redis, Memcache, AMQP, MongoDB"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-go",children:'func Add(args ...int64) (int64, error) {\n  sum := int64(0)\n  for _, arg := range args {\n    sum += arg\n  }\n  return sum, nil\n}\n\nfunc Multiply(args ...int64) (int64, error) {\n  sum := int64(1)\n  for _, arg := range args {\n    sum *= arg\n  }\n  return sum, nil\n}\n\nfunc main(){\n  server.RegisterTasks(map[string]interface{}{\n    "add":      Add,\n    "multiply": Multiply,\n  })\n\n  signature := &tasks.Signature{\n    Name: "add",\n    Args: []tasks.Arg{\n      {\n        Type:  "int64",\n        Value: 1,\n      },\n      {\n        Type:  "int64",\n        Value: 1,\n      },\n    },\n  }\n  // \u89E6\u53D1\u4EFB\u52A1\n  asyncResult, err := server.SendTask(signature)\n}\n'})})]})}function d(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(u,{...n})}):u(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return l},a:function(){return s}});var t=r(75271);let a={},i=t.createContext(a);function s(n){let e=t.useContext(i);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:s(n.components),t.createElement(i.Provider,{value:e},n.children)}}}]);