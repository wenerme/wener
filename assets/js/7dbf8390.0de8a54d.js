"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["68835"],{1827:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>l,default:()=>a,assets:()=>u,toc:()=>c,frontMatter:()=>r});var s=JSON.parse('{"id":"queue/mosquitto","title":"mosquitto","description":"- mosquitto - MQTT broker","source":"@site/../notes/queue/mosquitto.md","sourceDirName":"queue","slug":"/queue/mosquitto","permalink":"/notes/queue/mosquitto","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/queue/mosquitto.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689238697000,"frontMatter":{"title":"mosquitto"},"sidebar":"docs","previous":{"title":"Kafka","permalink":"/notes/queue/kafka/"},"next":{"title":"NATS","permalink":"/notes/queue/nats/"}}'),i=t("52676"),o=t("79938");let r={title:"mosquitto"},l="mosquitto",u={},c=[];function d(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"mosquitto",children:"mosquitto"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://mosquitto.org/",children:"mosquitto"})," - MQTT broker\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/eclipse/mosquitto",children:"eclipse/mosquitto"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Topic\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["sensors/COMPUTER_NAME/temperature/HARDDRIVE_NAME\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u7EA7\u8054\u5173\u7CFB"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"sensors/+/temperature/+"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5339\u914D sensors/a/temperature/b"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"a/b/#"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5339\u914D a/b/c, a/b/c/d"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["QoS\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u8BA2\u9605\u65B9\u63A7\u5236"}),"\n",(0,i.jsx)(n.li,{children:"0 - \u53D1\u9001\u4E00\u6B21"}),"\n",(0,i.jsx)(n.li,{children:"1 - \u81F3\u5C11\u4E00\u6B21\uFF0C\u4F1A\u8BF7\u6C42\u786E\u8BA4"}),"\n",(0,i.jsx)(n.li,{children:"2 - \u51C6\u786E\u4E00\u6B21\uFF0C\u4F7F\u7528 4 \u6B21\u63E1\u624B\u4FDD\u8BC1"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u7AEF\u53E3 1883"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# macOS\nbrew install mosquitto\n# AlpineLinux\napk add mosquitto mosquitto-clients\n\n# \u542F\u52A8 broker\nmosquitto\n\n# \u8BA2\u9605\nmosquitto_sub -t 'test/topic' -v\n# \u53D1\u5E03\nmosquitto_pub -t 'test/topic' -m 'hello world'\n\n# \u8BA2\u9605\u6240\u6709\nmosquitto_sub -t '#' -v\n"})})]})}function a(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return r}});var s=t(75271);let i={},o=s.createContext(i);function r(e){let n=s.useContext(o);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);