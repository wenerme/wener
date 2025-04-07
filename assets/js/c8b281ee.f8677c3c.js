"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["29692"],{46745:function(e,n,s){s.r(n),s.d(n,{metadata:()=>c,contentTitle:()=>i,default:()=>h,assets:()=>a,toc:()=>o,frontMatter:()=>l});var c=JSON.parse('{"id":"db/kv/kvrocks","title":"KvRocks","description":"- Apache KvRocks","source":"@site/../notes/db/kv/kvrocks.md","sourceDirName":"db/kv","slug":"/db/kv/kvrocks","permalink":"/notes/db/kv/kvrocks","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/kv/kvrocks.md","tags":[{"inline":true,"label":"Apache","permalink":"/notes/tags/apache"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1729056347000,"frontMatter":{"tags":["Apache"]},"sidebar":"docs","previous":{"title":"KV DB Awesome","permalink":"/notes/db/kv/awesome"},"next":{"title":"LevelDB","permalink":"/notes/db/kv/leveldb"}}'),r=s("52676"),t=s("79938");let l={tags:["Apache"]},i="KvRocks",a={},o=[{value:"\u914D\u7F6E",id:"config",level:2},{value:"internal",id:"internal",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"kvrocks",children:"KvRocks"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Apache ",(0,r.jsx)(n.a,{href:"https://github.com/apache/kvrocks",children:"KvRocks"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"sicne 2019"}),"\n",(0,r.jsx)(n.li,{children:"distributed, RocksDB, Redis protocol"}),"\n",(0,r.jsx)(n.li,{children:"\u652F\u6301 Namespace"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/apache/kvrocks-controller",children:"apache/kvrocks-controller"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://kvrocks.apache.org/docs/supported-commands",children:"\u652F\u6301\u7684\u547D\u4EE4"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u652F\u6301 BF, JSON, GEO, FT"}),"\n",(0,r.jsx)(n.li,{children:"MOVEX \u5728 namespace \u4E4B\u95F4\u79FB\u52A8 key"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4E0D\u63A8\u8350\u4F7F\u7528\uFF0C\u9664\u975E\u53EA\u662F\u9700\u8981\u4E00\u4E2A\u5206\u5E03\u5F0F kv \u5185\u5B58\u5B58\u50A8\u800C\u4E0D\u662F Redis"}),"\n",(0,r.jsxs)(n.li,{children:["Redis 4.0.0 \u517C\u5BB9\uFF0C\u90E8\u5206 client \u4E0D\u652F\u6301\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4F8B\u5982 bullmq \u8981\u6C42 5.0+"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"REDIS_PASSWORD=$(openssl rand -base64 32)\ndocker run -it -p 6666:6666 apache/kvrocks --bind 0.0.0.0 --port 6666 --requirepass $REDIS_PASSWORD --redis-cursor-compatible=true\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"requirepass \u5BF9\u5E94\u7684\u7528\u6237\u4E3A admin"}),"\n",(0,r.jsx)(n.li,{children:"namespace \u9700\u8981\u901A\u8FC7\u914D\u7F6E\u6301\u4E45\u5316"}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"__namespace"})," \u9ED8\u8BA4"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"namespace add ns1 my_token  # Token \u7ED1\u5B9A\u5230 Namespace\nnamespace set ns1 new_token # \u4FEE\u6539 Token\nnamespace get *             # \u5217\u51FA\u6240\u6709 Namespace\n\nauth ns1 my_token # \u5207\u6362 Namespace\n\nnamespace del ns1 # \u5220\u9664 Namespace\n\ncompact # \u6267\u884C rocksdb \u7684 compact - \u91CA\u653E\u78C1\u76D8\u7A7A\u95F4\n"})}),"\n",(0,r.jsx)(n.h2,{id:"config",children:"\u914D\u7F6E"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"# \u914D\u7F6E\u5B9A\u4E49 namespace\nnamespace.NS TOKEN_FOR_NS\n\n# \u26A0\uFE0F \u4E0D\u80FD\u4E8B\u540E\u66F4\u6539\ncluster-enabled no\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/apache/kvrocks/blob/v2.9.0/kvrocks.conf",children:"https://github.com/apache/kvrocks/blob/v2.9.0/kvrocks.conf"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"internal",children:"internal"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"+-------------+-------------+------------------------------+-----------------+------------+-------------+-----------+\n|  ns size    |  namespace  |   cluster slot               |  user key size  |  user key  |   version   |  sub key  |\n| (1byte: X)  |   (Xbyte)   | (2byte when cluster enabled) |   (4byte: Y)    |   (YByte)  |   (8byte)   |  (ZByte)  |\n+-------------+-------------+------------------------------+-----------------+------------+-------------+-----------+\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"+----------------------------------------+\n|               flags                    |\n+----------------------------------------+\n|  (1byte: | version -> <- data type |)  |\n+----------------------------------------+\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://kvrocks.apache.org/community/data-structure-on-rocksdb/",children:"https://kvrocks.apache.org/community/data-structure-on-rocksdb/"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return i},a:function(){return l}});var c=s(75271);let r={},t=c.createContext(r);function l(e){let n=c.useContext(t);return c.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),c.createElement(t.Provider,{value:n},e.children)}}}]);