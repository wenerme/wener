"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["38811"],{24672:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>o,default:()=>p,assets:()=>c,toc:()=>a,frontMatter:()=>l});var t=JSON.parse('{"id":"devops/kubernetes/app/minio-operator","title":"MinIO Kubernetes Operator","description":"- \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/devops/kubernetes/app/minio-operator.md","sourceDirName":"devops/kubernetes/app","slug":"/devops/kubernetes/app/minio-operator","permalink":"/notes/devops/kubernetes/app/minio-operator","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/app/minio-operator.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693122196000,"frontMatter":{"title":"MinIO Kubernetes Operator"},"sidebar":"docs","previous":{"title":"Lens","permalink":"/notes/devops/kubernetes/app/lens"},"next":{"title":"OpenLens","permalink":"/notes/devops/kubernetes/app/openlens"}}'),i=r("52676"),s=r("79938");let l={title:"MinIO Kubernetes Operator"},o="MinIO Kubernetes Operator",c={},a=[{value:"Direct CSI",id:"direct-csi",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"minio-kubernetes-operator",children:"MinIO Kubernetes Operator"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u662F\u4EC0\u4E48\uFF1F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"AGPLv3"})," - \u57FA\u672C\u610F\u5473\u7740\u90E8\u7F72\u7684\u670D\u52A1\u4E0D\u80FD\u7ED9\u522B\u4EBA\u4F7F\u7528\uFF0C\u63D0\u4F9B\u5546\u4E1A\u6388\u6743"]}),"\n",(0,i.jsx)(n.li,{children:"minio k8s operator"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u591A\u79DF\u6237 - ns \u9694\u79BB"}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301\u6269\u5BB9\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u901A\u8FC7 Zone \u5B9E\u73B0"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u591A\u57DF\u540D\u5206\u6D41"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"\u4E0D\u652F\u6301\u7F29\u5BB9"})}),"\n",(0,i.jsx)(n.li,{children:"\u6269\u5BB9\u4F1A\u6709 down \u65F6\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"\u4F1A\u5220\u9664\u6240\u6709 StatefulSet \u8FDB\u884C\u91CD\u5EFA"}),"\n",(0,i.jsx)(n.li,{children:"\u8981\u6C42 StatefulSet \u7684 PV \u4E0D\u88AB\u56DE\u6536 - policy \u8BBE\u7F6E\u4E3A retain"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/minio/operator",children:"minio/operator"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"AGPLv3"})}),"\n",(0,i.jsxs)(n.li,{children:["\u63A8\u8350 PV \u4F7F\u7528 ",(0,i.jsx)(n.a,{href:"https://github.com/minio/operator/blob/master/docs/using-direct-csi.md",children:"direct csi"})," \u63D2\u4EF6"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6CE8\u610F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C\u4E0D\u8981\u6C42\u591A\u79DF\u6237\u96C6\u7FA4\uFF0C\u5EFA\u8BAE\u76F4\u63A5\u4F7F\u7528 Helm \u90E8\u7F72\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Minio \u662F Apache 2.0 \u534F\u8BAE"}),"\n",(0,i.jsx)(n.li,{children:"\u7B80\u5355\u76F4\u89C2\u6613\u7EF4\u62A4"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"minio \u652F\u6301\u591A\u7528\u6237"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"direct-csi",children:"Direct CSI"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u50CF\u6781\u4E86 ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/local-path-provisioner",children:"rancher/local-path-provisioner"})]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u5B89\u88C5 CSI\ncat << EOF > default.env\nDIRECT_CSI_DRIVES=data{1...4}\nDIRECT_CSI_DRIVES_DIR=/mnt\nKUBELET_DIR_PATH=/var/lib/kubelet\nEOF\n\nexport $(cat default.env)\nkubectl apply -k github.com/minio/direct-csi\n"})})]})}function p(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return o},a:function(){return l}});var t=r(75271);let i={},s=t.createContext(i);function l(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);