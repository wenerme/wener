"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["4874"],{75342:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>o,assets:()=>c,toc:()=>h,frontMatter:()=>t});var s=JSON.parse('{"id":"service/im/signal","title":"Signal","description":"- signalapp","source":"@site/../notes/service/im/signal.md","sourceDirName":"service/im","slug":"/service/im/signal","permalink":"/notes/service/im/signal","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/im/signal.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680491916000,"frontMatter":{"title":"Signal"},"sidebar":"docs","previous":{"title":"IRC","permalink":"/notes/service/im/irc/"},"next":{"title":"Telegram","permalink":"/notes/service/im/telegram"}}'),l=i("52676"),r=i("79938");let t={title:"Signal"},a="Signal",c={},h=[{value:"Server",id:"server",level:2},{value:"proto",id:"proto",level:3}];function d(e){let n={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"signal",children:"Signal"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp",children:"signalapp"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Server",children:"Signal-Server"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Java"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Android",children:"Signal-Android"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"GPLv3, Java, Kotlin"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-iOS",children:"Signal-iOS"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Swift, ObjC"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Desktop",children:"Signal-Desktop"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Typescript, Electron"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/libsignal",children:"libsignal"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Rust, Java, Switf, TypeScript"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Signal Protocol\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"E2E \u52A0\u5BC6"}),"\n",(0,l.jsx)(n.li,{children:"\u7FA4\u7EC4\u6D88\u606F\u5355\u72EC\u52A0\u5BC6"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://signal.org/docs/specifications/doubleratchet/",children:"Double Ratchet"})}),"\n",(0,l.jsx)(n.li,{children:"used by WhatsApp, Facebook Messenger, Google Allo, Signal"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Double Ratchet\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Diffie-Hellman key exchange"}),"\n",(0,l.jsx)(n.li,{children:"out-of-order messages, message resynchronization, message authentication"}),"\n",(0,l.jsx)(n.li,{children:"used by Signal, WhatsApp, Wire"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"server",children:"Server"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Server",children:"Signal-Server"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"AGPLv3, Java"}),"\n",(0,l.jsxs)(n.li,{children:["Dropwizard, resilience4j, curve25519-java, Bouncy Castle, Jedis, Lettuce, ",(0,l.jsx)(n.del,{children:"Liquibase"}),", libphonenumber"]}),"\n",(0,l.jsx)(n.li,{children:"grpc, websocket, graphql"}),"\n",(0,l.jsx)(n.li,{children:"mockito, wiremock, assertj"}),"\n",(0,l.jsx)(n.li,{children:"com.eatthepath.pushy"}),"\n",(0,l.jsx)(n.li,{children:"Redis Pub/Sub"}),"\n",(0,l.jsx)(n.li,{children:"Redis Lua \u5B9A\u4E49\u811A\u672C"}),"\n",(0,l.jsx)(n.li,{children:"Cache - DynamoDB + Redis"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u65E7\u7684 DB ",(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Server/blob/477615fc66ed6307f3d213eff7e18e95fab17fe2/service/src/main/resources/messagedb.xml",children:"messagedb.xml"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://softwaremill.com/what-ive-learned-from-signal-server-source-code/",children:"What I've learned from Signal server source code"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Server/blob/main/service/src/main/resources/lua/insert_item.lua",children:"resources/lua/insert_item.lua"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"messageId=counter++"}),"\n",(0,l.jsx)(n.li,{children:"ZADD Queue messageId Message"}),"\n",(0,l.jsx)(n.li,{children:"HSET Meta guid messageId"}),"\n",(0,l.jsx)(n.li,{children:"EXPIRE Queue 90 days"}),"\n",(0,l.jsx)(n.li,{children:"EXPIRE Meta 90 days"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"proto",children:"proto"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/signalapp/Signal-Server/tree/main/service/src/main/proto",children:"https://github.com/signalapp/Signal-Server/tree/main/service/src/main/proto"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-proto3",children:"enum PubSubType {\n  UNKNOWN   = 0;\n  QUERY_DB  = 1;\n  DELIVER   = 2;\n  KEEPALIVE = 3;\n  CLOSE     = 4;\n  CONNECTED = 5;\n}\n"})})]})}function o(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return a},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);