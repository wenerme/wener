"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["8769"],{40407:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>i,default:()=>d,assets:()=>l,toc:()=>o,frontMatter:()=>c});var r=JSON.parse('{"id":"web/script/lib/json-schema-faker","title":"json-schema-faker","description":"- json-schema-faker","source":"@site/../notes/web/script/lib/json-schema-faker.md","sourceDirName":"web/script/lib","slug":"/web/script/lib/json-schema-faker","permalink":"/notes/web/script/lib/json-schema-faker","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/script/lib/json-schema-faker.md","tags":[{"inline":true,"label":"JSONSchema","permalink":"/notes/tags/json-schema"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666510159000,"frontMatter":{"title":"json-schema-faker","tags":["JSONSchema"]},"sidebar":"docs","previous":{"title":"jsdom","permalink":"/notes/web/script/lib/jsdom"},"next":{"title":"json-schema-ref-parser","permalink":"/notes/web/script/lib/json-schema-ref-parser"}}'),t=s("52676"),a=s("79938");let c={title:"json-schema-faker",tags:["JSONSchema"]},i="json-schema-faker",l={},o=[];function h(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"json-schema-faker",children:"json-schema-faker"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/json-schema-faker/json-schema-faker",children:"json-schema-faker"})}),"\n",(0,t.jsx)(n.li,{children:"generate - \u540C\u6B65\u751F\u6210\uFF0C\u4E0D \u5904\u7406 ref"}),"\n",(0,t.jsxs)(n.li,{children:["resolve - \u5F02\u6B65\u751F\u6210\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4F9D\u8D56 ",(0,t.jsx)(n.a,{href:"/notes/web/script/lib/json-schema-ref-parser",children:"json-schema-ref-parser"}),", jsonpath-plus"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["schema \u5305\u542B circular \u751F\u6210\u6709\u95EE\u9898\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5185\u90E8\u662F\u4F7F\u7528 bundle\uFF0C\u56E0\u6B64\u63D0\u4F9B\u7684 schema \u4E5F\u5F97\u662F bundle \u6216\u8005\u76F4\u63A5\u63D0\u4F9B resolved kv \u5217\u8868"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"// resolve bundle schema\n$RefParser\n  .bundle(cwd, schema, {\n    resolve: {\n      file: { order: 100 },\n      http: { order: 200 },\n      fixedRefs,\n    },\n    dereference: {\n      circular: 'ignore',\n    },\n  })\n  .then((sub) => run($refs, sub, container));\n"})})]})}function d(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return i},a:function(){return c}});var r=s(75271);let t={},a=r.createContext(t);function c(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);