"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["54262"],{89534:function(e,n,i){i.r(n),i.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>p,assets:()=>l,toc:()=>d,frontMatter:()=>o});var t=JSON.parse('{"id":"devops/kubernetes/app/k8s-minio","title":"Minio","description":"Tips","source":"@site/../notes/devops/kubernetes/app/k8s-minio.md","sourceDirName":"devops/kubernetes/app","slug":"/devops/kubernetes/app/k8s-minio","permalink":"/notes/devops/kubernetes/app/k8s-minio","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/app/k8s-minio.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1690946986000,"frontMatter":{"id":"k8s-minio","title":"Minio"},"sidebar":"docs","previous":{"title":"Consul","permalink":"/notes/devops/kubernetes/app/k8s-consul"},"next":{"title":"Kubernetes Operators","permalink":"/notes/devops/kubernetes/app/k8s-operator"}}'),s=i("52676"),r=i("79938");let o={id:"k8s-minio",title:"Minio"},c="Minio on K8S",l={},d=[{value:"Tips",id:"tips",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"minio-on-k8s",children:"Minio on K8S"})}),"\n",(0,s.jsx)(n.h2,{id:"tips",children:"Tips"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["helm \u5B89\u88C5 ",(0,s.jsx)(n.a,{href:"https://github.com/minio/charts",children:"minio/charts"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5B89\u88C5\u5355\u4E2A\u79DF\u6237"}),"\n",(0,s.jsx)(n.li,{children:"\u652F\u6301\u5206\u5E03\u5F0F\u6A21\u5F0F\u548C\u5355\u673A\u6A21\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/minio/operator",children:"minio/operator"})," \u5B89\u88C5 - \u5B98\u65B9\u4E3B\u63A8\uFF0C APGL 3.0\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u7BA1\u7406\u591A\u79DF\u6237\u3001\u591A\u5B58\u50A8"}),"\n",(0,s.jsxs)(n.li,{children:["\u63A8\u8350\u4F7F\u7528 ",(0,s.jsx)(n.a,{href:"https://github.com/minio/direct-csi",children:"minio/direct-csi"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/minio/direct-csi",children:"minio/direct-csi"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"direct.csi.min.io"}),"\n",(0,s.jsx)(n.li,{children:"Direct Volume Access"}),"\n",(0,s.jsx)(n.li,{children:"\u76F4\u63A5\u8BBF\u95EE\u6302\u8F7D\u7684\u78C1\u76D8\uFF0C\u800C\u4E0D\u662F\u901A\u8FC7\u6587\u4EF6\u7684\u65B9\u5F0F\u8BBF\u95EE"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# https://charts.wener.tech/\nhelm show chart wener/minio\n"})})]})}function p(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return o}});var t=i(75271);let s={},r=t.createContext(s);function o(e){let n=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);