"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["93567"],{45072:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>a,assets:()=>c,toc:()=>d,frontMatter:()=>t});var r=JSON.parse('{"id":"devops/kubernetes/storage/rook","title":"Rook","description":"Tips","source":"@site/../notes/devops/kubernetes/storage/rook.md","sourceDirName":"devops/kubernetes/storage","slug":"/devops/kubernetes/storage/rook","permalink":"/notes/devops/kubernetes/storage/rook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/storage/rook.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1606055087000,"frontMatter":{"id":"rook","title":"Rook"},"sidebar":"docs","previous":{"title":"OpenEBS","permalink":"/notes/devops/kubernetes/storage/openebs"},"next":{"title":"\u670D\u52A1","permalink":"/notes/devops/service/"}}'),l=s("52676"),i=s("79938");let t={id:"rook",title:"Rook"},o="Rook",c={},d=[{value:"Tips",id:"tips",level:2},{value:"nfs",id:"nfs",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"rook",children:"Rook"})}),"\n",(0,l.jsx)(n.h2,{id:"tips",children:"Tips"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://rook.io/",children:"rook.io"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5B58\u50A8\u7BA1\u7406\u6846\u67B6"}),"\n",(0,l.jsx)(n.li,{children:"\u4EE5 CRD \u7684\u65B9\u5F0F \u6587\u4EF6\u3001\u5757\u3001\u5BF9\u8C61\u3001NoSQL \u5B58\u50A8\u670D\u52A1"}),"\n",(0,l.jsxs)(n.li,{children:["\u652F\u6301\u7BA1\u7406\u670D\u52A1\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Ceph\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u53EF\u4EE5\u90E8\u7F72\u5230\u78C1\u76D8"}),"\n",(0,l.jsx)(n.li,{children:"\u53EF\u4EE5\u90E8\u7F72\u5230 Block PV"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"EdgeFS - \u95ED\u6E90 - \u7981\u6B62\u5546\u4E1A\u4F7F\u7528"}),"\n",(0,l.jsx)(n.li,{children:"CockroachDB"}),"\n",(0,l.jsx)(n.li,{children:"Cassandra"}),"\n",(0,l.jsxs)(n.li,{children:["NFS Server\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5C06 PVC \u66B4\u9732\u4E3A NFS \u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Yugabyte DB"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u8981\u6C42\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"k8s 1.11+"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://rook.io/docs/rook/master/ceph-prerequisites.html",children:"Ceph"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u6709\u539F\u59CB\u5757\u8BBE\u5907 - \u6CA1\u6709\u5206\u533A\u6CA1\u6709\u683C\u5F0F\u5316\u8FC7\u7684\u78C1\u76D8"}),"\n",(0,l.jsx)(n.li,{children:"\u539F\u59CB\u5206\u533A - \u6CA1\u6709\u6587\u4EF6\u7CFB\u7EDF"}),"\n",(0,l.jsx)(n.li,{children:"PV \u80FD\u4EE5 block \u7684\u6A21\u5F0F\u5DE5\u4F5C"}),"\n",(0,l.jsx)(n.li,{children:"\u5B89\u88C5 LVM"}),"\n",(0,l.jsx)(n.li,{children:"\u4F7F\u7528 CSI \u4E0D\u8981\u4F7F\u7528 FlexVolume"}),"\n",(0,l.jsxs)(n.li,{children:["RBD ",(0,l.jsx)(n.code,{children:"modprobe rbd"})]}),"\n",(0,l.jsxs)(n.li,{children:["CephFS \u5EFA\u8BAE Linux >= 4.17\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5C0F\u4E8E\u8BE5\u7248\u672C\u9650\u989D\u4E0D\u751F\u6548"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["NFS\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5B89\u88C5 nfs-utils"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"nfs",children:"nfs"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"ver=v1.5.0\ncurl -L --remote-name-all https://github.com/rook/rook/raw/$ver/cluster/examples/kubernetes/nfs/{common,operator,webhook,psp,rbac}.yaml\n"})})]})}function a(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return t}});var r=s(75271);let l={},i=r.createContext(l);function t(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);