"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["42224"],{77726:function(e,n,l){l.r(n),l.d(n,{metadata:()=>t,contentTitle:()=>s,default:()=>d,assets:()=>r,toc:()=>u,frontMatter:()=>o});var t=JSON.parse('{"id":"ai/ml/nuclio","title":"nuclio","description":"- nuclio","source":"@site/../notes/ai/ml/nuclio.md","sourceDirName":"ai/ml","slug":"/ai/ml/nuclio","permalink":"/notes/ai/ml/nuclio","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/nuclio.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1719892411000,"frontMatter":{"title":"nuclio"},"sidebar":"docs","previous":{"title":"Models","permalink":"/notes/ai/ml/models"},"next":{"title":"ONNX","permalink":"/notes/ai/ml/onnx/"}}'),i=l("52676"),c=l("79938");let o={title:"nuclio"},s="nuclio",r={},u=[{value:"nuctl",id:"nuctl",level:2},{value:"Copy local file",id:"copy-local-file",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"nuclio",children:"nuclio"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/nuclio/nuclio",children:"nuclio"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n",(0,i.jsx)(n.li,{children:"Automate the Data Science Pipeline with Serverless Functions"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# https://github.com/nuclio/nuclio/releases/\ncurl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-darwin-$(uname -m)\nchmod +x nuctl\n# \u5047\u8BBE $HOME/bin \u5728 PATH \u4E2D\nmv nuctl ~/bin/\n\nnuctl get function\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp --name nuclio-dashboard quay.io/nuclio/dashboard:stable-amd64\n"})}),"\n",(0,i.jsx)(n.h2,{id:"nuctl",children:"nuctl"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["--platform local/kube\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"local -> docker"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://nuclio.io/docs/latest/reference/nuctl/",children:"https://nuclio.io/docs/latest/reference/nuctl/"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(n.h2,{id:"copy-local-file",children:"Copy local file"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u90E8\u7F72\u76EE\u5F55\u9ED8\u8BA4\u90FD\u4F1A\u5305\u542B \u5230 /opt/nuclio"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/nuclio/nuclio/issues/2333",children:"https://github.com/nuclio/nuclio/issues/2333"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return s},a:function(){return o}});var t=l(75271);let i={},c=t.createContext(i);function o(e){let n=t.useContext(c);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);