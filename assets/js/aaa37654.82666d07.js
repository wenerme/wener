"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["93458"],{74545:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>d,assets:()=>o,toc:()=>a,frontMatter:()=>s});var i=JSON.parse('{"id":"languages/cue","title":"CUE","description":"- cue-lang/cue","source":"@site/../notes/languages/cue.md","sourceDirName":"languages","slug":"/languages/cue","permalink":"/notes/languages/cue","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/cue.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659680046000,"frontMatter":{"title":"CUE"},"sidebar":"docs","previous":{"title":"Carbon","permalink":"/notes/languages/carbon/"},"next":{"title":"Diagram","permalink":"/notes/languages/diagram/"}}'),l=t("52676"),r=t("79938");let s={title:"CUE"},c="CUE",o={},a=[];function u(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"cue",children:"CUE"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/cue-lang/cue",children:"cue-lang/cue"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n",(0,l.jsx)(n.li,{children:"Configuration Language"}),"\n",(0,l.jsx)(n.li,{children:"Superset of JSON"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cue-lang/cue/blob/master/doc/ref/impl.md",children:"impl"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://storage.googleapis.com/pub-tools-public-publication-data/pdf/43438.pdf",children:"https://storage.googleapis.com/pub-tools-public-publication-data/pdf/43438.pdf"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://cuelang.org/play/",children:"https://cuelang.org/play/"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://cuetorials.com/",children:"https://cuetorials.com/"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://blog.cedriccharly.com/post/20191109-the-configuration-complexity-curse/",children:"The Configuration Complexity Curse"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://blog.cedriccharly.com/post/20210523-how-cue-wins/",children:"How CUE Wins"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html",children:"The Configuration Complexity Clock"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Hard Coded"}),"\n",(0,l.jsx)(n.li,{children:"Config Values"}),"\n",(0,l.jsx)(n.li,{children:"Rules Engine"}),"\n",(0,l.jsx)(n.li,{children:"DSL"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"used by dagger"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-cue",children:'// Go \u5B9E\u73B0\uFF0C\u5BFC\u5165\u4F9D\u8D56\nimport (\n  "strings"\n)\n\n// \u7C7B\u578B\nBob: {\n  Name: string\n  Age: int\n}\n\n\n// JSON \u8BED\u6CD5\n{\n  "Bob": {\n    "Name": "Bob Smith",\n    "Age": 42\n  }\n}\n\n// \u7B49\u540C\nBob: Name: "Bob Smith"\n\n// \u7C7B\u578B\u5B9A\u4E49\n#Person: {\n  Name: string\n  Email?: string\n  Age?: int & >0 & <140\n}\nWener: #Person & {\n  // \u4F7F\u7528\u5BFC\u5165\n  Name: strings.ToTitle("wener"),\n  Age: 18\n}\n'})})]})}function d(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return s}});var i=t(75271);let l={},r=i.createContext(l);function s(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);