"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["76806"],{67026:function(n,e,a){a.r(e),a.d(e,{metadata:()=>r,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>t});var r=JSON.parse('{"id":"service/observability/grafana/grafana-conf","title":"Grafana \u914D\u7F6E","description":"- Configuration","source":"@site/../notes/service/observability/grafana/grafana-conf.md","sourceDirName":"service/observability/grafana","slug":"/service/observability/grafana/conf","permalink":"/notes/service/observability/grafana/conf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/grafana/grafana-conf.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1685087225000,"frontMatter":{"title":"Grafana \u914D\u7F6E","tags":["Configuration"]},"sidebar":"docs","previous":{"title":"Grafana","permalink":"/notes/service/observability/grafana/"},"next":{"title":"grafana-operator","permalink":"/notes/service/observability/grafana/operator"}}'),i=a("52676"),s=a("79938");let t={title:"Grafana \u914D\u7F6E",tags:["Configuration"]},l="Grafana \u914D\u7F6E",o={},c=[{value:"Provision",id:"provision",level:2},{value:"grafana-cli",id:"grafana-cli",level:2},{value:"grafana-image-renderer",id:"grafana-image-renderer",level:2},{value:"provisioning",id:"provisioning",level:2},{value:"\u8DF3\u8F6C\u5230 3000",id:"\u8DF3\u8F6C\u5230-3000",level:2}];function d(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"grafana-\u914D\u7F6E",children:"Grafana \u914D\u7F6E"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://grafana.com/docs/grafana/latest/administration/configuration/",children:"Configuration"})}),"\n",(0,i.jsxs)(e.li,{children:["\u6240\u6709\u7684\u914D\u7F6E\u90FD\u53EF\u4EE5\u901A\u8FC7\u73AF\u5883\u53D8\u91CF\u914D\u7F6E\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"GF_<SectionName>_<KeyName>"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ini",children:"[database]\n# mysql, postgres, sqlite3\ntype=postgres\n# SQLite3\npath=\nhost=\nname=\nuser=\npassword=\n# mysql://user:secret@host:port/database\n# mysql://user:secret@host:port/database\nurl=\n# pg - disable, require, verify-full\n# mysql - true, false, skip-verify\nssl_mode=\n\n[remote_cache]\n# redis, memcached, database\ntype=database\n# database, redis, memcache\nconnstr=\ndatabase=\nredis=addr=127.0.0.1:6379,pool_size=100,db=0,ssl=false\nmemcache=127.0.0.1:11211\n\n[security]\ndisable_initial_admin_creation=false\nadmin_user=admin\nadmin_password=admin\n\ndisable_gravatar=false\n"})}),"\n",(0,i.jsx)(e.h2,{id:"provision",children:"Provision"}),"\n",(0,i.jsx)(e.p,{children:"\u901A\u8FC7\u914D\u7F6E\u7684\u65B9\u5F0F\u63D0\u4F9B\u9884\u8BBE\u914D\u7F6E\uFF0C\u66FF\u4EE3 ansible\u3001operator \u4E4B\u7C7B\u7684\u5DE5\u4F5C\u3002"}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.p,{children:["Grafana Provisioning \u7684\u914D\u7F6E\u80FD\u529B\u6BD4 ",(0,i.jsx)(e.a,{href:"https://github.com/grafana-operator/grafana-operator",children:"grafana-operator"})," \u8FD8\u5F3A\uFF0C\u652F\u6301\u5173\u8054\u7EC4\u7EC7\u3002"]})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u652F\u6301\u914D\u7F6E\u5F00\u901A\u7684\u8D44\u6E90\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u6570\u636E\u6E90"}),"\n",(0,i.jsx)(e.li,{children:"\u63D2\u4EF6"}),"\n",(0,i.jsx)(e.li,{children:"\u9762\u677F"}),"\n",(0,i.jsx)(e.li,{children:"Alert Notification Channels"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u6682\u4E0D\u652F\u6301\u5F00\u901A\u7EC4\u7EC7 ",(0,i.jsx)(e.a,{href:"https://github.com/grafana/grafana/issues/12119",children:"#12119"})]}),"\n",(0,i.jsx)(e.li,{children:"\u4F01\u4E1A\u7248\u652F\u6301 Access Control Provisioning"}),"\n",(0,i.jsx)(e.li,{children:"$WORKING_DIR/conf/defaults.ini"}),"\n",(0,i.jsx)(e.li,{children:"$WORKING_DIR/conf/custom.ini"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"http://docs.grafana.org/administration/provisioning",children:"Provisioning Grafana"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"grafana-cli",children:"grafana-cli"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://grafana.com/docs/grafana/latest/administration/cli/",children:"https://grafana.com/docs/grafana/latest/administration/cli/"})}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u5B89\u88C5\u7684\u63D2\u4EF6\ngrafana-cli plugins ls\n# \u91CD\u7F6E\u5BC6\u7801\ngrafana-cli admin reset-admin-password <new password>\n"})}),"\n",(0,i.jsx)(e.h2,{id:"grafana-image-renderer",children:"grafana-image-renderer"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://github.com/grafana/grafana-image-renderer",children:"grafana/grafana-image-renderer"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://grafana.com/grafana/plugins/grafana-image-renderer/",children:"plugin"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ini",children:"[rendering]\nserver_url = http://localhost:8081/render\ncallback_url = http://localhost:3000/\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",metastring:'title="remote"',children:"export GF_RENDERING_SERVER_URL=http://renderer:8081/render\nexport GF_RENDERING_CALLBACK_URL=http://grafana:3000/\nexport GF_LOG_FILTERS=rendering:debug\n"})}),"\n",(0,i.jsx)(e.h2,{id:"provisioning",children:"provisioning"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://grafana.com/docs/grafana/latest/administration/provisioning/",children:"https://grafana.com/docs/grafana/latest/administration/provisioning/"})}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(e.h2,{id:"\u8DF3\u8F6C\u5230-3000",children:"\u8DF3\u8F6C\u5230 3000"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8BBE\u7F6E root_url"}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},79938:function(n,e,a){a.d(e,{Z:function(){return l},a:function(){return t}});var r=a(75271);let i={},s=r.createContext(i);function t(n){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:t(n.components),r.createElement(s.Provider,{value:e},n.children)}}}]);