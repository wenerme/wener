"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["58519"],{80360:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>i,default:()=>x,assets:()=>l,toc:()=>o,frontMatter:()=>c});var t=JSON.parse('{"id":"service/forge/woodpecker/woodpecker-agent","title":"Agent","description":"| flag                 | env                          | default         |","source":"@site/../notes/service/forge/woodpecker/woodpecker-agent.md","sourceDirName":"service/forge/woodpecker","slug":"/service/forge/woodpecker/agent","permalink":"/notes/service/forge/woodpecker/agent","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/woodpecker/woodpecker-agent.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"Agent"},"sidebar":"docs","previous":{"title":"woodpecker","permalink":"/notes/service/forge/woodpecker/"},"next":{"title":"Woodpecker FAQ","permalink":"/notes/service/forge/woodpecker/faq"}}'),d=r("52676"),s=r("79938");let c={title:"Agent"},i="Woodpecker Agent",l={},o=[{value:"Docker",id:"docker",level:2},{value:"docker network mtu",id:"docker-network-mtu",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"woodpecker-agent",children:"Woodpecker Agent"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"flag"}),(0,d.jsx)(n.th,{children:"env"}),(0,d.jsx)(n.th,{children:"default"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--server"}),(0,d.jsx)(n.td,{children:"WOODPECKER_SERVER"}),(0,d.jsx)(n.td,{children:"woodpecker:9000"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--grpc-username"}),(0,d.jsx)(n.td,{children:"WOODPECKER_USERNAME"}),(0,d.jsx)(n.td,{children:"x-oauth-basic"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--grpc-password"}),(0,d.jsx)(n.td,{children:"WOODPECKER_AGENT_SECRET"}),(0,d.jsx)(n.td,{})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--grpc-secure"}),(0,d.jsx)(n.td,{children:"WOODPECKER_GRPC_SECURE"}),(0,d.jsx)(n.td,{children:"false"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--grpc-skip-insecure"}),(0,d.jsx)(n.td,{children:"WOODPECKER_GRPC_VERIFY"}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--log-level"}),(0,d.jsx)(n.td,{children:"WOODPECKER_LOG_LEVEL"}),(0,d.jsx)(n.td,{children:"trace"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--pretty"}),(0,d.jsx)(n.td,{children:"WOODPECKER_DEBUG_PRETTY"}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--nocolor"}),(0,d.jsx)(n.td,{children:"WOODPECKER_DEBUG_NOCOLOR"}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--hostname"}),(0,d.jsx)(n.td,{children:"WOODPECKER_HOSTNAME"}),(0,d.jsx)(n.td,{})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--filter"}),(0,d.jsx)(n.td,{children:"WOODPECKER_FILTER_LABELS"}),(0,d.jsx)(n.td,{})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--max-procs"}),(0,d.jsx)(n.td,{children:"WOODPECKER_MAX_WORKFLOWS"}),(0,d.jsx)(n.td,{children:"10"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--healthcheck"}),(0,d.jsx)(n.td,{children:"WOODPECKER_HEALTHCHECK"}),(0,d.jsx)(n.td,{children:"true"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--keepalive-time"}),(0,d.jsx)(n.td,{children:"WOODPECKER_KEEPALIVE_TIME"}),(0,d.jsx)(n.td,{children:"0s"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--keepalive-timeout"}),(0,d.jsx)(n.td,{children:"WOODPECKER_KEEPALIVE_TIMEOUT"}),(0,d.jsx)(n.td,{children:"20s"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"--backend-engine"}),(0,d.jsx)(n.td,{children:"WOODPECKER_BACKEND"}),(0,d.jsx)(n.td,{children:"auto-detect"})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"agent \u76F4\u63A5\u901A\u8FC7 sock \u8C03\u7528 docker \u8FDB\u884C\u64CD\u4F5C"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ini",children:"WOODPECKER_BACKEND_DOCKER_NETWORK=\nWOODPECKER_BACKEND_DOCKER_ENABLE_IPV6=false\nWOODPECKER_BACKEND_DOCKER_VOLUMES=/etc/ssl/certs:/etc/ssl/certs:ro,/etc/timezone:/etc/timezone\nWOODPECKER_DOCKER_CONFIG=\n# \u7528\u4E8E\u652F\u6301 podman\nDOCKER_SOCK=\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://woodpecker-ci.org/docs/next/administration/backends/docker",children:"https://woodpecker-ci.org/docs/next/administration/backends/docker"})}),"\n"]}),"\n",(0,d.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,d.jsx)(n.h2,{id:"docker-network-mtu",children:"docker network mtu"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"dind \u9700\u8981\u4FEE\u6539 mtu \u4E3A 1450"}),"\n",(0,d.jsx)(n.li,{children:"\u65E0\u6CD5\u4FEE\u6539"}),"\n",(0,d.jsx)(n.li,{children:"drone \u53EF\u4EE5 DRONE_RUNNER_NETWORK_OPTS"}),"\n",(0,d.jsxs)(n.li,{children:["workaround WOODPECKER_BACKEND_DOCKER_NETWORK=bridge\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"v0.15 \u4E0D\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://github.com/woodpecker-ci/woodpecker/issues/1579",children:"https://github.com/woodpecker-ci/woodpecker/issues/1579"})}),"\n"]})]})}function x(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return i},a:function(){return c}});var t=r(75271);let d={},s=t.createContext(d);function c(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:c(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);