"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81450"],{38755:function(e,o,n){n.r(o),n.d(o,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>a,toc:()=>c,frontMatter:()=>i});var r=JSON.parse('{"id":"service/api/protobuf/protobuf-go","title":"Protobuf Go","description":"- protocolbuffers/protobuf-go","source":"@site/../notes/service/api/protobuf/protobuf-go.md","sourceDirName":"service/api/protobuf","slug":"/service/api/protobuf/go","permalink":"/notes/service/api/protobuf/go","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/protobuf/protobuf-go.md","tags":[{"inline":true,"label":"Golang","permalink":"/notes/tags/golang"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1677222278000,"frontMatter":{"tags":["Golang"]},"sidebar":"docs","previous":{"title":"Protobuf","permalink":"/notes/service/api/protobuf/faq"},"next":{"title":"protobuf-web","permalink":"/notes/service/api/protobuf/web"}}'),t=n("52676"),s=n("79938");let i={tags:["Golang"]},l="Protobuf Go",a={},c=[{value:"APIv2",id:"apiv2",level:2},{value:"proto",id:"proto",level:2}];function p(e){let o={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.header,{children:(0,t.jsx)(o.h1,{id:"protobuf-go",children:"Protobuf Go"})}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:(0,t.jsx)(o.a,{href:"https://github.com/protocolbuffers/protobuf-go",children:"protocolbuffers/protobuf-go"})}),"\n",(0,t.jsxs)(o.li,{children:["2020-03-02 ",(0,t.jsx)(o.a,{href:"https://go.dev/blog/protobuf-apiv2",children:"A new Go API for Protocol Buffers"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsxs)(o.li,{children:["APIv1 github.com/golang/protobuf\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"github.com/golang/protobuf@v1.4.0 \u4F7F\u7528 APIv2 \u5B9E\u73B0"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(o.li,{children:["APIv2 google.golang.org/protobuf\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"google.golang.org/protobuf@v1.20.0 \u4F9D\u8D56 github.com/golang/protobuf@v1.4.0"}),"\n",(0,t.jsx)(o.li,{children:"\u52A8\u6001 pb"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(o.h2,{id:"apiv2",children:"APIv2"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"v2 protoreflect.ProtoMessage"}),"\n",(0,t.jsx)(o.li,{children:"v1 protoiface.MessageV1"}),"\n"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-go",metastring:'title="protoreflect"',children:"// \u57FA\u4E8E\u53CD\u5C04\u7684\u4E3B\u8981\u63A5\u53E3\ntype ProtoMessage interface{ ProtoReflect() Message }\n\n// v2\n// \u53CD\u5C04\u4FE1\u606F\ntype Message interface {\n	Descriptor() MessageDescriptor\n	Type() MessageType\n\n	New() Message\n	Interface() ProtoMessage\n	Range(f func(FieldDescriptor, Value) bool)\n	Has(FieldDescriptor) bool\n	Clear(FieldDescriptor)\n	Get(FieldDescriptor) Value\n	Set(FieldDescriptor, Value)\n	Mutable(FieldDescriptor) Value\n	NewField(FieldDescriptor) Value\n	WhichOneof(OneofDescriptor) FieldDescriptor\n	GetUnknown() RawFields\n	SetUnknown(RawFields)\n\n	IsValid() bool\n	ProtoMethods() *methods\n}\n\n// v1\ntype MessageV1 interface {\n	Reset()\n	String() string\n	ProtoMessage()\n}\n"})}),"\n",(0,t.jsx)(o.h2,{id:"proto",children:"proto"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"golang proto v2 \u57FA\u4E8E\u53CD\u5C04"}),"\n",(0,t.jsx)(o.li,{children:"github.com/golang/protobuf/proto"}),"\n",(0,t.jsxs)(o.li,{children:["\u53CD\u5C04\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsxs)(o.li,{children:["\u5168\u5C40\u6CE8\u518C - google.golang.org/protobuf/reflect/protoregistry\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"GlobalFiles"}),"\n",(0,t.jsx)(o.li,{children:"GlobalTypes"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){let{wrapper:o}={...(0,s.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},79938:function(e,o,n){n.d(o,{Z:function(){return l},a:function(){return i}});var r=n(75271);let t={},s=r.createContext(t);function i(e){let o=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(o):{...o,...e}},[o,e])}function l(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(s.Provider,{value:o},e.children)}}}]);