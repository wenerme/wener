"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["97686"],{49755:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>h,assets:()=>c,toc:()=>d,frontMatter:()=>l});var i=JSON.parse('{"id":"service/forge/athens","title":"athens","description":"- gomods/athens \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/forge/athens.md","sourceDirName":"service/forge","slug":"/service/forge/athens","permalink":"/notes/service/forge/athens","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/athens.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1661507210000,"frontMatter":{"title":"athens"},"sidebar":"docs","previous":{"title":"act","permalink":"/notes/service/forge/act"},"next":{"title":"CI FAQ","permalink":"/notes/service/forge/ci-faq"}}'),t=s("52676"),r=s("79938");let l={title:"athens"},o="athens",c={},d=[{value:"\u914D\u7F6E",id:"\u914D\u7F6E",level:2},{value:"\u79C1\u6709\u4ED3\u5E93",id:"\u79C1\u6709\u4ED3\u5E93",level:2}];function a(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"athens",children:"athens"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/gomods/athens",children:"gomods/athens"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Go module datastore and proxy"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301 disk, mongo, gcs, s3, minio, \u5916\u90E8\u5B58\u50A8/\u81EA\u5B9A\u4E49"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301 etcd, redis, redis-sentinel, gcp, azureblob \u9501"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u53EF\u7528\u4E8E\u5BF9\u5185\u7684 \u6A21\u5757 \u4EE3\u7406\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u907F\u514D\u5F00\u653E\u6240\u6709 git \u8BBF\u95EE"}),"\n",(0,t.jsx)(e.li,{children:"\u7531 athens \u4E2D\u8F6C\u8BF7\u6C42"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u4E0D\u652F\u6301 checksum"}),"\n",(0,t.jsxs)(e.li,{children:["\u4E0D\u652F\u6301\u8BA4\u8BC1\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/gomods/athens/issues/1166",children:"gomods/athens#1166"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/golang/go/issues/26232",children:"golang/go#26232"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# \u4F7F\u7528\u672C\u5730\u78C1\u76D8\u5B58\u50A8\ndocker run -d --restart always \\\n  -v $PWD/data:/var/lib/athens \\\n  -e ATHENS_DISK_STORAGE_ROOT=/var/lib/athens \\\n  -e ATHENS_STORAGE_TYPE=disk \\\n  -p 3000:3000 \\\n  --name athens-proxy \\\n  gomods/athens:latest\n"})}),"\n",(0,t.jsx)(e.h2,{id:"\u914D\u7F6E",children:"\u914D\u7F6E"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/gomods/athens/blob/main/config.dev.toml",children:"config.dev.toml"})}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-toml",children:'# \u907F\u514D CHECKSUM \u53D1\u9001\u5230\u4E0A\u6E38\n# ATHENS_GONOSUM_PATTERNS="github.com/mycompany/*,github.com/secret/*"\n# \u907F\u514D go sum \u5931\u8D25\n# export GONOSUMDB="github.com/mycompany/*,github.com/secret/*"\nNoSumPatterns = ["github.com/mycompany/*", "github.com/secret/*"]\n'})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"\u4E0B\u8F7D\u6A21\u5F0F\u914D\u7F6E\u6587\u4EF6"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u4F7F\u7528\u4E0B\u8F7D\u6A21\u5F0F\u914D\u7F6E\u6587\u4EF6\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u901A\u8FC7 config.toml DownloadMode \u6307\u5B9A"}),"\n",(0,t.jsx)(e.li,{children:"\u901A\u8FC7 ATHENS_DOWNLOAD_MODE \u6307\u5B9A"}),"\n",(0,t.jsx)(e.li,{children:"file:$FILE_PATH - \u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84"}),"\n",(0,t.jsx)(e.li,{children:"custom:$BASE_64 - inline \u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"sync - \u9ED8\u8BA4\u6A21\u5F0F - go mod download - \u4E0B\u8F7D\u5B8C\u6210\u8FD4\u56DE"}),"\n",(0,t.jsx)(e.li,{children:"async - \u8FD4\u56DE 404 \u5F02\u6B65\u4E0B\u8F7D"}),"\n",(0,t.jsx)(e.li,{children:"none - \u8FD4\u56DE 404 - \u53EF\u7528\u4E8E\u8BBF\u95EE\u63A7\u5236"}),"\n",(0,t.jsx)(e.li,{children:"redirect - \u91CD\u5B9A\u5411\u5230\u4E0A\u6E38 - \u53EF\u51CF\u8F7B\u5B58\u50A8\u538B\u529B"}),"\n",(0,t.jsx)(e.li,{children:"async_redirect - \u91CD\u5B9A\u5411\u5230\u4E0A\u6E38\u4E14\u5F00\u59CB\u5F02\u6B65\u4E0B\u8F7D"}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-hcl",children:'# \u4E0A\u6E38\u5730\u5740\ndownloadURL = "https://proxy.golang.org"\n\nmode = "async_redirect"\n\ndownload "github.com/gomods/*" {\n    mode = "sync"\n}\n\ndownload "golang.org/x/*" {\n    mode = "none"\n}\n\ndownload "github.com/pkg/*" {\n    mode = "redirect"\n    downloadURL = "https://gocenter.io"\n}\n'})}),"\n",(0,t.jsx)(e.h2,{id:"\u79C1\u6709\u4ED3\u5E93",children:"\u79C1\u6709\u4ED3\u5E93"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["git SSH \u5BC6\u94A5\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u6620\u5C04 /root/.ssh \u63D0\u4F9B\u5BC6\u94A5\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"config"}),"\n",(0,t.jsx)(e.li,{children:"id_rsa"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"\u6620\u5C04 /root/.gitconfig \u914D\u7F6E\u91CD\u5199\u89C4\u5219"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["git SSH Agent\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u63D0\u4F9B SSH_AUTH_SOCK"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:".ssh/config"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-config",children:"Host git.example.com\nHostname git.example.com\nStrictHostKeyChecking no\nIdentityFile /root/.ssh/id_rsa\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:".gitconfig"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ini",children:'[url "ssh://git@git.example.com:7999"]\n	insteadOf = https://git.example.com/scm\n'})})]})}function h(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return o},a:function(){return l}});var i=s(75271);let t={},r=i.createContext(t);function l(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);