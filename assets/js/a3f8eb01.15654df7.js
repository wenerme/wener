"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["3061"],{88583:function(e,n,c){c.r(n),c.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>p,assets:()=>d,toc:()=>s,frontMatter:()=>t});var r=JSON.parse('{"id":"service/forge/woodpecker/README","title":"woodpecker","description":"- 0.15 \u529F\u80FD\u592A\u5C11 - \u6CA1\u6709\u5168\u5C40 secret \u914D\u7F6E\u8D77\u6765\u5F88\u9EBB\u70E6","source":"@site/../notes/service/forge/woodpecker/README.md","sourceDirName":"service/forge/woodpecker","slug":"/service/forge/woodpecker/","permalink":"/notes/service/forge/woodpecker/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/woodpecker/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680491916000,"frontMatter":{"title":"woodpecker"},"sidebar":"docs","previous":{"title":"Verdaccio","permalink":"/notes/service/forge/verdaccio"},"next":{"title":"Agent","permalink":"/notes/service/forge/woodpecker/agent"}}'),i=c("52676"),o=c("79938");let t={title:"woodpecker"},l="woodpecker",d={},s=[{value:"agent",id:"agent",level:2},{value:"docker backend",id:"docker-backend",level:2},{value:"local backend",id:"local-backend",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"woodpecker",children:"woodpecker"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"0.15 \u529F\u80FD\u592A\u5C11 - \u6CA1\u6709\u5168\u5C40 secret \u914D\u7F6E\u8D77\u6765\u5F88\u9EBB\u70E6"}),"\n",(0,i.jsx)(n.li,{children:"1.0 \u8FD8\u6CA1\u6B63\u5F0F\u53D1\u5E03\uFF0C\u592A\u591A\u95EE\u9898"}),"\n"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/woodpecker-ci/woodpecker",children:"woodpecker-ci/woodpecker"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"community fork of the Drone CI 0.8 - Apache 2.0 \u6700\u540E\u7248\u672C"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"0.16/1.0 agent \u652F\u6301 local \u548C ssh"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"agent",children:"agent"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ini",children:"WOODPECKER_AGENT_SECRET=\n\n# key=value,key=*\nWOODPECKER_FILTER_LABELS=\n\nWOODPECKER_MAX_WORKFLOWS=1\n\n# docker, local, ssh\nWOODPECKER_BACKEND=auto-detect\n\n# ssh backend\nWOODPECKER_BACKEND_SSH_ADDRESS=\nWOODPECKER_BACKEND_SSH_USER=\nWOODPECKER_BACKEND_SSH_PASSWORD=\nWOODPECKER_BACKEND_SSH_KEY= # path to key\nWOODPECKER_BACKEND_SSH_KEY_PASSWORD=\n"})}),"\n",(0,i.jsx)(n.h2,{id:"docker-backend",children:"docker backend"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"HOME=/woodpecker"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/woodpecker/src/${GIT_REMOTE_URL}"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["e.g. ",(0,i.jsx)(n.code,{children:"/woodpecker/src/github.com/wenerme/wener"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"volume /woodpecker"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ini",children:"WOODPECKER_BACKEND_DOCKER_VOLUMES=/etc/ssl/certs:/etc/ssl/certs:ro,/etc/timezone:/etc/timezone\n"})}),"\n",(0,i.jsx)(n.h2,{id:"local-backend",children:"local backend"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"image \u4E3A shell"}),"\n",(0,i.jsx)(n.li,{children:"\u5EFA\u8BAE\u914D\u7F6E WOODPECKER_FILTER_LABELS=type=exec \u8FC7\u6EE4"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://woodpecker-ci.org/docs/next/administration/backends/local",children:"https://woodpecker-ci.org/docs/next/administration/backends/local"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"apk add curl git\n# \u8981\u4E0B next \u7248\u672C\n# curl -Lo /usr/bin/plugin-git https://ghproxy.com/github.com/woodpecker-ci/plugin-git/releases/download/v2.0.3/linux-amd64_plugin-git\n# chmod +x /usr/bin/plugin-git\n\n# woodpeckerci/plugin-git:next \u662F AlpineLinux 3.17\ndocker pull woodpeckerci/plugin-git:next\ndocker run --rm -it --entrypoint cat woodpeckerci/plugin-git:next /bin/plugin-git > plugin-git\nchmod +x plugin-git\nmv plugin-git /bin\n"})})]})}function p(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},79938:function(e,n,c){c.d(n,{Z:function(){return l},a:function(){return t}});var r=c(75271);let i={},o=r.createContext(i);function t(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);