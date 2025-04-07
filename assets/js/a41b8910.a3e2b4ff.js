"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["71936"],{56828:function(n,e,s){s.r(e),s.d(e,{metadata:()=>r,contentTitle:()=>a,default:()=>d,assets:()=>c,toc:()=>u,frontMatter:()=>i});var r=JSON.parse('{"id":"queue/nats/nats-conf","title":"NATS Conf","description":"- https://docs.nats.io/running-a-nats-service/configuration","source":"@site/../notes/queue/nats/nats-conf.md","sourceDirName":"queue/nats","slug":"/queue/nats/conf","permalink":"/notes/queue/nats/conf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/queue/nats/nats-conf.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"tags":["Configuration"]},"sidebar":"docs","previous":{"title":"Client","permalink":"/notes/queue/nats/client"},"next":{"title":"NATS Design","permalink":"/notes/queue/nats/design"}}'),t=s("52676"),o=s("79938");let i={tags:["Configuration"]},a="NATS Conf",c={},u=[{value:"nats-server.conf",id:"nats-serverconf",level:2},{value:"leaf",id:"leaf",level:2},{value:"Auth",id:"auth",level:2}];function l(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"nats-conf",children:"NATS Conf"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.nats.io/running-a-nats-service/configuration",children:"https://docs.nats.io/running-a-nats-service/configuration"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"nats-serverconf",children:"nats-server.conf"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-conf",children:"# Client port of 4222 on all interfaces\nport: 4222\n\n# HTTP monitoring port\nmonitor_port: 8222\n\n# NSC \u751F\u6210\u7684 Operator JWT\noperator: $HOME/.nsc/nats/O/O.jwt\n# Account Server\nresolver: URL(http://localhost:9090/jwt/v1/accounts/)\n\n# This is for clustering multiple servers together.\ncluster {\n\n  # Route connections to be received on any interface on port 6222\n  port: 6222\n\n  # Routes are protected, so need to use them with --routes flag\n  # e.g. --routes=nats-route://ruser:T0pS3cr3t@otherdockerhost:6222\n  authorization {\n    user: ruser\n    password: T0pS3cr3t\n    timeout: 2\n  }\n\n  # Routes are actively solicited and connected to from this server.\n  # This Docker image has none by default, but you can pass a\n  # flag to the gnatsd docker image to create one to an existing server.\n  routes = []\n}\n"})}),"\n",(0,t.jsx)(e.h2,{id:"leaf",children:"leaf"}),"\n",(0,t.jsx)(e.h2,{id:"auth",children:"Auth"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"nats \u901A\u8FC7 account \u5B9E\u73B0\u79DF\u6237\u9694\u79BB"}),"\n",(0,t.jsx)(e.li,{children:"\u4F7F\u7528 account \u9700\u8981\u8BBE\u7F6E auth"}),"\n",(0,t.jsxs)(e.li,{children:["\u8BA4\u8BC1\u65B9\u5F0F\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"token - \u53EF\u4EE5\u914D\u7F6E\u660E\u6587\u6216 bcrypt \u52A0\u5BC6\u7684 token"}),"\n",(0,t.jsx)(e.li,{children:"user+password - \u5BC6\u7801\u652F\u6301 bcrypt \u52A0\u5BC6"}),"\n",(0,t.jsx)(e.li,{children:"tls"}),"\n",(0,t.jsx)(e.li,{children:"nkey"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u6388\u6743\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"publish"}),"\n",(0,t.jsx)(e.li,{children:"subscribe"}),"\n",(0,t.jsx)(e.li,{children:"allow_responses - max,expires"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/jwt/resolver",children:"Account lookup using Resolver"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u5B9E\u9645\u5904\u7406\u903B\u8F91 ",(0,t.jsx)(e.a,{href:"https://github.com/nats-io/nats-account-server/blob/69cb476d18a0194c6a59866b642fdee295db6a55/server/core/jwthandler.go#L137-L139",children:"https://github.com/nats-io/nats-account-server/blob/69cb476d18a0194c6a59866b642fdee295db6a55/server/core/jwthandler.go#L137-L139"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"nats server passwd -p 123456\n"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-hcl",children:'authorization {\n  default_permissions = {\n    publish = "SANDBOX.*"\n    subscribe = ["PUBLIC.>", "_INBOX.>"]\n  }\n  ADMIN = {\n    publish = ">"\n    subscribe = ">"\n  }\n  REQUESTOR = {\n    publish = ["req.a", "req.b"]\n    subscribe = "_INBOX.>"\n  }\n  RESPONDER = {\n    subscribe = ["req.a", "req.b"]\n    publish = "_INBOX.>"\n  }\n  users = [\n    {user: admin,   password: $ADMIN_PASS, permissions: $ADMIN}\n    {user: client,  password: $CLIENT_PASS, permissions: $REQUESTOR}\n    {user: service,  password: $SERVICE_PASS, permissions: $RESPONDER}\n    {user: other, password: $OTHER_PASS}\n    {\n      user: test\n      password: test\n      permissions: {\n          publish: {\n              deny: ">"\n          },\n          subscribe: {\n              allow: "client.>"\n          }\n      }\n    }\n    { user: b, password: b, permissions: {subscribe: "q", allow_responses: true } },\n    { user: c, password: c, permissions: {subscribe: "q", allow_responses: { max: 5, expires: "1m" } } }\n  ]\n}\n\naccounts: {\n  A: {\n    users: [\n      {user: a, password: a}\n    ]\n    exports: [\n      {stream: puba.>}\n      {service: pubq.>}\n      {stream: b.>, accounts: [B]}\n      {service: q.b, accounts: [B]}\n    ]\n  },\n  B: {\n    users: [\n      {user: b, password: b}\n    ]\n    imports: [\n      {stream: {account: A, subject: b.>}}\n      {service: {account: A, subject: q.b}}\n    ]\n  },\n  C: {\n    users: [\n      {user: c, password: c}\n    ]\n    imports: [\n      {stream: {account: A, subject: puba.>}, prefix: from_a}\n      {service: {account: A, subject: pubq.C}, to: Q}\n    ]\n  }\n}\nno_auth_user: a\n'})})]})}function d(n={}){let{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return a},a:function(){return i}});var r=s(75271);let t={},o=r.createContext(t);function i(n){let e=r.useContext(o);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:i(n.components),r.createElement(o.Provider,{value:e},n.children)}}}]);