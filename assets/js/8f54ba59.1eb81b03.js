"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["13435"],{79855:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>l});var s=JSON.parse('{"id":"languages/parser/parsing","title":"\u8BED\u6CD5\u89E3\u6790","description":"- Parsing - \u89E3\u6790","source":"@site/../notes/languages/parser/parsing.md","sourceDirName":"languages/parser","slug":"/languages/parser/parsing","permalink":"/notes/languages/parser/parsing","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/parser/parsing.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1661163540000,"frontMatter":{"title":"\u8BED\u6CD5\u89E3\u6790"},"sidebar":"docs","previous":{"title":"Parser Glossary","permalink":"/notes/languages/parser/glossary"},"next":{"title":"PEG","permalink":"/notes/languages/parser/peg/"}}'),i=r("52676"),t=r("79938");let l={title:"\u8BED\u6CD5\u89E3\u6790"},a="\u89E3\u6790",o={},c=[];function d(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u89E3\u6790",children:"\u89E3\u6790"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Parsing - \u89E3\u6790\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5E38\u7528\u7B97\u6CD5\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"LL - Left to right, Leftmost dervation - \u4E0A\u4E0B\u6587\u65E0\u5173\uFF0C\u81EA\u4E0A\u5411\u4E0B"}),"\n",(0,i.jsx)(n.li,{children:"LR - Left to right, Rightmost dervation - \u4E0A\u4E0B\u6587\u65E0\u5173\uFF0C\u81EA\u5E95\u5411\u4E0A"}),"\n",(0,i.jsx)(n.li,{children:"PEG + Packrat parsing"}),"\n",(0,i.jsx)(n.li,{children:"Earley Parsing"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u540C\u7684\u65B9\u5F0F\u51B3\u5B9A\u4E86\u5185\u90E8\u6570\u636E\u7ED3\u6784\u4E0D\u540C\uFF0C\u89E3\u51B3\u5206\u6B67\u7684\u65B9\u5F0F\u4E0D\u540C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0A\u4E0B\u6587\u65E0\u5173 - Context Free\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4F8B\u5982 ",(0,i.jsx)(n.code,{children:"int int = 10;"})," - \u8FD9\u91CC\u5728\u505A lexing \u7684\u65F6\u5019\u4F1A\u6210\u529F\uFF0C\u4F46\u8BED\u6CD5\u5C42\u9762\u4F1A\u5931\u8D25\uFF1B\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u56E0\u4E3A\u4E0A\u4E0B\u6587\u65E0\u5173\uFF0C\u5148\u505A lexing\uFF0C\u7B2C\u4E8C\u4E2A int \u4E5F\u4F1A\u88AB\u8BC6\u522B\u6210\u7C7B\u578B\u7684 token\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5DE6\u9012\u5F52 - Left Recursion"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-antlr4",children:"exp\n  : exp '+' exp\n  | integer\n  ;\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["LALR - LookAhead Left Recursion\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u524D\u5411\u73AF\u89C6\u5DE6\u9012\u5F52"}),"\n",(0,i.jsx)(n.li,{children:"\u4F7F\u7528 LA \u6765\u89E3\u51B3\u5206\u6B67"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"Parser Combinator - \u7EC4\u5408\u89E3\u6790"}),"\n",(0,i.jsxs)(n.li,{children:["Parser Generator - \u751F\u6210\u89E3\u6790\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Comparison_of_parser_generators",children:"Comparison of parser generators"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Lexing - \u8BCD\u6CD5\u89E3\u6790 - \u8BCD\u6CD5\u5206\u6790\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"lexical analysis, tokenization"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"Grammar - \u8BED\u6CD5\u89E3\u6790"}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/sap/chevrotain",children:"https://github.com/sap/chevrotain"})," - Parser Building Toolkit for JavaScript"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://softwareengineering.stackexchange.com/questions/338665",children:"When to use a Parser Combinator? When to use a Parser Generator?"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return a},a:function(){return l}});var s=r(75271);let i={},t=s.createContext(i);function l(e){let n=s.useContext(t);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);