"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["30147"],{62938:function(e,r,n){n.r(r),n.d(r,{metadata:()=>s,contentTitle:()=>i,default:()=>h,assets:()=>l,toc:()=>o,frontMatter:()=>c});var s=JSON.parse('{"id":"devops/docker/docker-storage","title":"Docker \u5B58\u50A8","description":"- Docker storage drivers","source":"@site/../notes/devops/docker/docker-storage.md","sourceDirName":"devops/docker","slug":"/devops/docker/storage","permalink":"/notes/devops/docker/storage","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/docker/docker-storage.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1676862087000,"frontMatter":{"title":"Docker \u5B58\u50A8"},"sidebar":"docs","previous":{"title":"Docker \u4ED3\u5E93","permalink":"/notes/devops/docker/registry"},"next":{"title":"Docker Swarm","permalink":"/notes/devops/docker/swarm"}}'),t=n("52676"),d=n("79938");let c={title:"Docker \u5B58\u50A8"},i="Storage",l={},o=[{value:"devicemapper",id:"devicemapper",level:2},{value:"cleanup",id:"cleanup",level:2}];function a(e){let r={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"storage",children:"Storage"})}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.a,{href:"https://docs.docker.com/storage/storagedriver/select-storage-driver/",children:"Docker storage drivers"})}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"/var/lib/docker/"})," - \u9ED8\u8BA4\u5B58\u50A8\u76EE\u5F55\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"<\u5B58\u50A8\u9A71\u52A8>"})," - \u5B58\u50A8\u539F\u6570\u636E"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\u66F4\u6362\u5B58\u50A8\u9A71\u52A8\u4F1A\u5BFC\u81F4\u6240\u6709\u7684\u672C\u5730\u7684\u5BB9\u5668\u65E0\u6CD5\u8BBF\u95EE. \u53EF\u4EE5\u8003\u8651 ",(0,t.jsx)(r.code,{children:"docker save"})," \u7136\u540E push \u5230\u4ED3\u5E93, \u8FD9\u6837\u907F\u514D\u540E\u9762\u518D\u6B21\u521B\u5EFA"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"\u5B58\u50A8\u9A71\u52A8"}),(0,t.jsx)(r.th,{children:"\u652F\u6301\u7684\u540E\u7AEF\u6587\u4EF6\u7CFB\u7EDF"})]})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"overlay, overlay2"}),(0,t.jsx)(r.td,{children:"ext4, xfs"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"aufs"}),(0,t.jsx)(r.td,{children:"ext4, xfs"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"devicemapper"}),(0,t.jsx)(r.td,{children:"direct-lvm"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"btrfs"}),(0,t.jsx)(r.td,{children:"btrfs"})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"zfs"}),(0,t.jsx)(r.td,{children:"zfs"})]})]})]}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["aufs, overlay, overlay2\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"\u6587\u4EF6\u7EA7\u522B\u64CD\u4F5C, \u80FD\u591F\u5BF9\u5185\u5B58\u66F4\u52A0\u6709\u6548\u7684\u5229\u7528, \u4F46\u5728\u8F83\u9AD8\u7684\u5DE5\u4F5C\u538B\u529B\u4E0B, \u53EF\u80FD\u4F1A\u5BFC\u81F4\u6587\u4EF6\u589E\u957F\u7279\u522B\u5927"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["devicemapper, btrfs, zfs\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"\u5757\u7EA7\u522B\u64CD\u4F5C, \u5BF9\u4E8E\u5199\u4E3A\u4E3B\u7684\u5DE5\u4F5C\u73AF\u5883\u4F1A\u8868\u73B0\u7684\u66F4\u597D"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.li,{children:"\u5BF9\u4E8E\u5F88\u591A\u5C0F\u6587\u4EF6\u5199\u5165\u6216\u6709\u5F88\u591A\u5C42\u7684\u6587\u4EF6\u7CFB\u7EDF, overlay \u53EF\u80FD\u6BD4 overlay2 \u8868\u73B0\u7684\u66F4\u597D"}),"\n",(0,t.jsx)(r.li,{children:"btrfs \u548C zfs \u9700\u8981\u8F83\u591A\u7684\u5185\u5B58"}),"\n",(0,t.jsx)(r.li,{children:"\u5BF9\u4E8E PaaS \u8FD9\u6837\u9AD8\u5F3A\u5EA6\u7684\u5DE5\u4F5C\u73AF\u5883, zfs \u4F1A\u662F\u6BD4\u8F83\u597D\u7684\u9009\u62E9"}),"\n",(0,t.jsx)(r.li,{children:"\u5982\u679C\u5BF9\u7A33\u5B9A\u6027\u8981\u6C42\u66F4\u9AD8, \u53EF\u9009\u62E9 aufs, overlay, devicemapper"}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"devicemapper",children:"devicemapper"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"https://docs.docker.com/storage/storagedriver/device-mapper-driver/",children:"https://docs.docker.com/storage/storagedriver/device-mapper-driver/"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"/etc/docker/daemon.json"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-json",children:'{\n  "storage-driver": "devicemapper"\n}\n'})}),"\n",(0,t.jsx)(r.h2,{id:"cleanup",children:"cleanup"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.a,{href:"https://gist.github.com/bastman/5b57ddb3c11942094f8d0a97d461b430",children:"Docker - How to cleanup (unused) resources"})}),"\n"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"docker volume prune -f\ndocker system prune -a -f\n"})})]})}function h(e={}){let{wrapper:r}={...(0,d.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},79938:function(e,r,n){n.d(r,{Z:function(){return i},a:function(){return c}});var s=n(75271);let t={},d=s.createContext(t);function c(e){let r=s.useContext(d);return s.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);