"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["95517"],{56207:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>t,default:()=>x,assets:()=>d,toc:()=>h,frontMatter:()=>c});var s=JSON.parse('{"id":"service/api/soap","title":"SOAP","description":"- SOAP - Simple Object Access Protocol - \u7B80\u5355\u5BF9\u8C61\u8BBF\u95EE\u534F\u8BAE","source":"@site/../notes/service/api/soap.md","sourceDirName":"service/api","slug":"/service/api/soap","permalink":"/notes/service/api/soap","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/soap.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1732517778000,"frontMatter":{"title":"SOAP"},"sidebar":"docs","previous":{"title":"smithy","permalink":"/notes/service/api/smithy"},"next":{"title":"twirp","permalink":"/notes/service/api/twirp"}}'),l=i("52676"),r=i("79938");let c={title:"SOAP"},t="SOAP",d={},h=[];function o(n){let e={a:"a",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"soap",children:"SOAP"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["SOAP - Simple Object Access Protocol - \u7B80\u5355\u5BF9\u8C61\u8BBF\u95EE\u534F\u8BAE\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"by W3C"}),"\n",(0,l.jsx)(e.li,{children:"\u57FA\u4E8E XML"}),"\n",(0,l.jsxs)(e.li,{children:["\u6D88\u606F\u7ED3\u6784\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Envelope - \u6D88\u606F\u5305\u88F9"}),"\n",(0,l.jsx)(e.li,{children:"Header - \u6D88\u606F\u5934"}),"\n",(0,l.jsx)(e.li,{children:"Body - \u6D88\u606F\u4F53"}),"\n",(0,l.jsx)(e.li,{children:"Fault - \u9519\u8BEF\u4FE1\u606F\u90E8\u5206"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u6700\u5E38\u4F7F\u7528 HTTP \u6216 HTTPS \u4F5C\u4E3A\u4F20\u8F93\u534F\u8BAE\uFF0C\u4F46\u4E5F\u652F\u6301 SMTP\u3001JMS \u7B49"}),"\n",(0,l.jsx)(e.li,{children:"\u652F\u6301 WS-Security"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["WSDL - Web Services Description Language - Web \u670D\u52A1\u63CF\u8FF0\u8BED\u8A00\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u63CF\u8FF0\u4E86 Web \u670D\u52A1\u7684\u63A5\u53E3\u3001\u65B9\u6CD5\u3001\u8F93\u5165/\u8F93\u51FA\u53C2\u6570"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<definitions>"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<types>"})," - \u5B9A\u4E49\u6570\u636E\u7C7B\u578B\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"XML Schema\uFF08XSD\uFF09"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<message>"})," - \u5B9A\u4E49\u6D88\u606F\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<part>"})," - \u5B9A\u4E49\u6D88\u606F\u90E8\u5206"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<portType>"})," - \u5B9A\u4E49\u63A5\u53E3"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<binding>"})," - \u5B9A\u4E49\u7ED1\u5B9A"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<service>"})," - \u5B9A\u4E49\u670D\u52A1"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u64CD\u4F5C\u6A21\u5F0F\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5355\u5411"}),"\n",(0,l.jsx)(e.li,{children:"\u8BF7\u6C42-\u54CD\u5E94"}),"\n",(0,l.jsx)(e.li,{children:"\u901A\u77E5"}),"\n",(0,l.jsx)(e.li,{children:"\u8BF7\u6C42-\u591A\u54CD\u5E94"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["WADL - Web Application Description Language - Web \u5E94\u7528\u63CF\u8FF0\u8BED\u8A00\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u63CF\u8FF0 Web \u5E94\u7528\u7684\u8D44\u6E90\u3001\u65B9\u6CD5\u3001\u8F93\u5165/\u8F93\u51FA\u53C2\u6570"}),"\n",(0,l.jsx)(e.li,{children:"RESTful"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["UDDI - Universal Description, Discovery, and Integration - \u901A\u7528\u63CF\u8FF0\u3001\u53D1\u73B0\u548C\u96C6\u6210\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7528\u4E8E\u6CE8\u518C\u548C\u67E5\u627E Web \u670D\u52A1"}),"\n",(0,l.jsxs)(e.li,{children:["\u4E09\u4E2A\u90E8\u5206\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"White Pages - \u670D\u52A1\u5730\u5740\u3001\u8054\u7CFB\u4EBA"}),"\n",(0,l.jsx)(e.li,{children:"Yellow Pages - \u670D\u52A1\u7C7B\u578B\u3001\u5206\u7C7B"}),"\n",(0,l.jsx)(e.li,{children:"Green Pages - \u670D\u52A1\u8BE6\u7EC6\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["WSDL \u751F\u6210\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Java wsimport"}),"\n",(0,l.jsx)(e.li,{children:"Python zeep"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://www.dneonline.com/calculator.asmx?wsdl",children:"http://www.dneonline.com/calculator.asmx?wsdl"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["types\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["element\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["complexType ~= object/class\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["sequence\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["element\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:".name"}),"\n",(0,l.jsx)(e.li,{children:".type"}),"\n",(0,l.jsx)(e.li,{children:".minOccurs"}),"\n",(0,l.jsx)(e.li,{children:".maxOccurs"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function x(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return t},a:function(){return c}});var s=i(75271);let l={},r=s.createContext(l);function c(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:c(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);