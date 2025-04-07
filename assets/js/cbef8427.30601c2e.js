"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["61397"],{15916:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>o,default:()=>h,assets:()=>l,toc:()=>d,frontMatter:()=>s});var i=JSON.parse('{"id":"languages/diagram/kroki","title":"kroki","description":"- yuzutech/kroki","source":"@site/../notes/languages/diagram/kroki.md","sourceDirName":"languages/diagram","slug":"/languages/diagram/kroki","permalink":"/notes/languages/diagram/kroki","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/diagram/kroki.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702882608000,"frontMatter":{"title":"kroki"},"sidebar":"docs","previous":{"title":"ERD","permalink":"/notes/languages/diagram/erd"},"next":{"title":"mermaid","permalink":"/notes/languages/diagram/mermaid"}}'),t=r("52676"),a=r("79938");let s={title:"kroki"},o="kroki",l={},d=[];function c(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"kroki",children:"kroki"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/yuzutech/kroki",children:"yuzutech/kroki"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"MIT, Java"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://kroki.io",children:"https://kroki.io"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://asciiflow.com/",children:"asciiflow"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u753B\u56FE\u53EF\u7528 ditaa \u6E32\u67D3"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["JS Zlib ",(0,t.jsx)(n.a,{href:"https://github.com/nodeca/pako",children:"nodeca/pako"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# GET deflate + base64\n# POST plain\nenc=$(echo 'digraph G {Hello->World}' | python -c \"import sys; import base64; import zlib; print(base64.urlsafe_b64encode(zlib.compress(sys.stdin.read(), 9)))\")\ncurl https://kroki.io/graphviz/svg/$enc\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.kroki.io/kroki/setup/encode-diagram/",children:"https://docs.kroki.io/kroki/setup/encode-diagram/"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-http",children:'### POST json\nPOST https://kroki.io\n\n{\n  "diagram_source": "digraph G {Hello->World}",\n  "diagram_type": "graphviz",\n  "output_format": "svg"\n}\n\n### POST accept\nPOST https://kroki.io/graphviz\nAccept: image/svg+xml\nContent-Type: text/plain\n\ndigraph G {\n  Hello->World\n}\n\n### POST plain\nPOST https://kroki.io/graphviz/svg\nContent-Type: text/plain\n\ndigraph G {\n  Hello->World\n}\n\n### POST json with format in path\nPOST https://kroki.io/graphviz/svg\n\n{\n  "diagram_source": "digraph G {Hello->World}"\n}\n'})})]})}function h(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return o},a:function(){return s}});var i=r(75271);let t={},a=i.createContext(t);function s(e){let n=i.useContext(a);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);