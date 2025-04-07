"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["10922"],{12411:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>c,default:()=>d,assets:()=>o,toc:()=>a,frontMatter:()=>l});var i=JSON.parse('{"id":"db/search/sonic","title":"sonic","description":"- valeriansaliou/sonic","source":"@site/../notes/db/search/sonic.md","sourceDirName":"db/search","slug":"/db/search/sonic","permalink":"/notes/db/search/sonic","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/search/sonic.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1674970578000,"frontMatter":{"title":"sonic"},"sidebar":"docs","previous":{"title":"Apache Solr","permalink":"/notes/db/search/solr"},"next":{"title":"typesense","permalink":"/notes/db/search/typesense"}}'),t=s("52676"),r=s("79938");let l={title:"sonic"},c="sonic",o={},a=[{value:"config.cfg",id:"configcfg",level:2},{value:"Telnet",id:"telnet",level:2},{value:"push executor term-to-iids object too long",id:"push-executor-term-to-iids-object-too-long",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"sonic",children:"sonic"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/sonic",children:"valeriansaliou/sonic"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"MPL-2.0, Rust"}),"\n",(0,t.jsx)(e.li,{children:"schema-less search backend"}),"\n",(0,t.jsx)(e.li,{children:"\u57FA\u4E8E fs \u5B58\u50A8\u641C\u7D22"}),"\n",(0,t.jsx)(e.li,{children:"\u9AD8\u6027\u80FD\u3001\u4F4E\u5185\u5B58"}),"\n",(0,t.jsx)(e.li,{children:"\u5355\u8282\u70B9"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301\u591A\u8BED\u8A00"}),"\n",(0,t.jsx)(e.li,{children:"\u5B58\u50A8\u533A\u5206 FST \u548C KV"}),"\n",(0,t.jsx)(e.li,{children:"KV \u4E3A RocksDB - Workd <-> Index \u5173\u7CFB"}),"\n",(0,t.jsxs)(e.li,{children:["FST \u8BB0\u5F55\u51FA\u73B0\u7684\u8BCD - ",(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Finite-state_transducer",children:"Finite-State Transducer"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6BCF\u51FA\u73B0\u4E00\u4E2A\u65B0\u8BCD\u5C31\u4F1A\u4ECE\u65B0\u6784\u5EFA fst"}),"\n",(0,t.jsx)(e.li,{children:"SUGGEST \u57FA\u4E8E fst"}),"\n",(0,t.jsx)(e.li,{children:"\u4F7F\u7528 Levenshtein distance \u77EB\u6B63 typo"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"\u7D22\u5F15\u8BCD\u4F1A Hash\uFF0Cfst \u5305\u542B\u672A hash \u8BCD\u7528\u4E8E SUGGEST"}),"\n",(0,t.jsxs)(e.li,{children:["\u63A8\u8350\u4F7F\u7528\u591A bucket \u6765\u5206\u62C5 kv \u538B\u529B\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u975E\u5E38\u9002\u7528\u4E8E\u804A\u5929\u8FD9\u79CD\u6709 session \u7684\u573A\u666F"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"\u4E0D\u4F1A\u5B58\u50A8\u539F\u6587 - \u67E5\u8BE2\u8FD4\u56DE\u7ED9\u7684 ID"}),"\n",(0,t.jsx)(e.li,{children:"\u4F7F\u7528 ngram/trigrams \u5206\u8BCD"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"\u9ED8\u8BA4\u7AEF\u53E3 1491"}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://journal.valeriansaliou.name/announcing-sonic-a-super-light-alternative-to-elasticsearch/",children:"Announcing Sonic: A Super-Light Alternative to Elasticsearch"})}),"\n",(0,t.jsxs)(e.li,{children:["NodeJS SDK ",(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/node-sonic-channel",children:"valeriansaliou/node-sonic-channel"})]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/sonic/blob/master/PROTOCOL.md",children:"\u534F\u8BAE"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["SUGGEST \u4E0D\u652F\u6301\u4E2D\u6587 - ",(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/sonic/issues/203",children:"valeriansaliou/sonic#203"})]}),"\n",(0,t.jsxs)(e.li,{children:["\u7531\u4E8E\u4F1A\u8BBE\u7F6E retain_word_objects \u4E0A\u9650 - \u5BFC\u81F4\u90E8\u5206\u8FDE\u8BCD\u65E0\u6CD5\u641C\u7D22 - \u9ED8\u8BA4 1000\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u4F8B\u5982: \u6587\u513F\u79D1\u6280\uFF0C\u56E0\u4E3A\u79D1\u6280\u51FA\u73B0\u7684\u9891\u5EA6\u8FC7\u9AD8\uFF0C\u4F1A\u5BFC\u81F4\u641C\u7D22 ",(0,t.jsx)(e.code,{children:"\u6587\u513F\u79D1\u6280"})," \u65E0\u7ED3\u679C\uFF0C\u4F46\u641C\u7D22 ",(0,t.jsx)(e.code,{children:"\u6587\u513F"})," \u6709\u7ED3\u679C"]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# macOS\nbrew install sonic\n\ndocker run --rm -it \\\n  -p 1491:1491 \\\n  -v /path/to/your/sonic/config.cfg:/etc/sonic.cfg \\\n  -v /path/to/your/sonic/store/:/var/lib/sonic/store/\n  --name sonic valeriansaliou/sonic\n\ncurl -LO https://github.com/valeriansaliou/sonic/raw/master/config.cfg\nsonic -c config.cfg\n"})}),"\n",(0,t.jsx)(e.h2,{id:"configcfg",children:"config.cfg"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/sonic/blob/master/config.cfg",children:"config.cfg"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/valeriansaliou/sonic/blob/master/CONFIGURATION.md",children:"CONFIGURATION"})}),"\n",(0,t.jsxs)(e.li,{children:["\u53EF\u4EE5\u4F7F\u7528\u73AF\u5883\u53D8\u91CF ",(0,t.jsx)(e.code,{children:"${env.SECRET}"})," - \u53EA\u80FD\u7528\u4E8E\u5B57\u7B26\u4E32"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ini",children:'[server]\n# debug, info, warn, error\nlog_level = "error"\n\n\n[channel]\n\ninet = "[::1]:1491"\ntcp_timeout = 300\nauth_password=\n\n[channel.search]\n# \u9ED8\u8BA4\u67E5\u8BE2\u8FD4\u56DE\u6570\u91CF\nquery_limit_default = 10\n# \u67E5\u8BE2\u6700\u591A\u8FD4\u56DE\nquery_limit_maximum = 100\n# \u7ED3\u679C\u4E0D\u591F\u5C1D\u8BD5\u8FD1\u4F3C\u8BCD\nquery_alternates_try = 4\n# \u9ED8\u8BA4\u63A8\u8350\u8FD4\u56DE\u6570\u91CF\nsuggest_limit_default = 5\n# \u63A8\u8350\u6700\u591A\u8FD4\u56DE\nsuggest_limit_maximum = 20\n\n\n[store]\n\n[store.kv]\n# \u5B58\u50A8\u4F4D\u7F6E\npath = "./data/store/kv/"\n# World -> Index \u6570\u91CF - \u6ED1\u52A8\u7A97\u53E3\n# \u4E5F\u5C31\u662F\u8BF4\u4E00\u4E2A\u641C\u7D22\u8BCD\u6700\u591A\u5173\u8054 1000 \u6761\u8BB0\u5F55 - offset 1000 \u4E0D\u4F1A\u8FD4\u56DE\u6570\u636E\n# \u8BBE\u7F6E\u8FC7\u5927\u5F71\u54CD\u6027\u80FD https://github.com/valeriansaliou/sonic/issues/258\nretain_word_objects = 1000\n\n[store.kv.pool]\n# \u4E0D\u6D3B\u8DC3\u65F6\u95F4\u95F4\u9694 - \u5173\u95ED\u7F13\u5B58\u6570\u636E\u5E93\ninactive_after = 1800\n\n[store.kv.database]\n# \u5E94\u8BE5\u4F4E\u4E8E store.kv.pool.inactive_after\nflush_after = 900\n# \u662F\u5426\u538B\u7F29 - zstd\ncompress = true\nparallelism = 2\n# \u6700\u591A\u6253\u5F00\u6587\u4EF6\u6570\nmax_files =\nmax_compactions = 1\nmax_flushes = 1\n# \u5355\u4F4D KB - \u9ED8\u8BA4 16MB\nwrite_buffer = 16384\n# WAL \u907F\u514D\u4E22\u5931\u672A flush \u7684\u6570\u636E\nwrite_ahead_log = true\n\n[store.fst]\n\npath = "./data/store/fst/"\n\n[store.fst.pool]\n\ninactive_after = 300\n\n[store.fst.graph]\n# \u5C0F\u4E8E store.fst.pool.inactive_after\nconsolidate_after = 180\n# graph \u6587\u4EF6\u5927\u5C0F\u9650\u5236\n# \u5355\u4F4D KB - 1024 \u500D\u6570\nmax_size = 2048\n# graph \u4E2D\u7684\u8BCD\u6570\nmax_words = 250000\n'})}),"\n",(0,t.jsx)(e.h2,{id:"telnet",children:"Telnet"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"telnet localhost 1491\n"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:'CONNECTED <sonic-server v1.3.0>\nstart search SecretPassword\nsuggest foo test "wener"\nping\n'})}),"\n",(0,t.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(e.h2,{id:"push-executor-term-to-iids-object-too-long",children:"push executor term-to-iids object too long"}),"\n",(0,t.jsx)(e.p,{children:"retain_word_objects \u9ED8\u8BA4 1000\uFF0C\u8D85\u8FC7\u5219\u4E0D\u518D\u7D22\u5F15"})]})}function d(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return c},a:function(){return l}});var i=s(75271);let t={},r=i.createContext(t);function l(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);