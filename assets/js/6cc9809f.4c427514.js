"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["22475"],{96467:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>o,assets:()=>h,toc:()=>t,frontMatter:()=>r});var i=JSON.parse('{"id":"db/kv/keydb","title":"KeyDB","description":"- KeyDB","source":"@site/../notes/db/kv/keydb.md","sourceDirName":"db/kv","slug":"/db/kv/keydb","permalink":"/notes/db/kv/keydb","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/kv/keydb.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725936322000,"frontMatter":{"title":"KeyDB"},"sidebar":"docs","previous":{"title":"FoundationDB","permalink":"/notes/db/kv/foundationdb"},"next":{"title":"KV DB Awesome","permalink":"/notes/db/kv/awesome"}}'),l=s("52676"),d=s("79938");let r={title:"KeyDB"},c="KeyDB",h={},t=[{value:"Active Replica",id:"active-replica",level:2},{value:"Flash",id:"flash",level:2},{value:"KeyDB vs Redis",id:"keydb-vs-redis",level:2},{value:"\u914D\u7F6E",id:"\u914D\u7F6E",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"keydb",children:"KeyDB"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/Snapchat/KeyDB",children:"KeyDB"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"BSD-3, C++,C"}),"\n",(0,l.jsx)(n.li,{children:"\u26A0\uFE0F \u5F00\u53D1\u7F13\u6162"}),"\n",(0,l.jsx)(n.li,{children:"\u591A\u7EBF\u7A0B Redis - IO \u591A\u7EBF\u7A0B\uFF0C\u4E8B\u52A1\u5355\u7EBF\u7A0B"}),"\n",(0,l.jsx)(n.li,{children:"ModJS - \u53EF\u4EE5\u901A\u8FC7 V8 \u6269\u5C55"}),"\n",(0,l.jsx)(n.li,{children:"\u540C\u6B65 redis \u6E90\u7801 - \u7248\u672C\u5339\u914D"}),"\n",(0,l.jsx)(n.li,{children:"active-replication, multi-master, flash, s3 backup"}),"\n",(0,l.jsxs)(n.li,{children:["\u88AB Snapchat \u6536\u8D2D - 2022-05-11\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u5F00\u6E90\u4F01\u4E1A\u7248\u529F\u80FD v6.3.0\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Active Replication PSYNC"}),"\n",(0,l.jsx)(n.li,{children:"Async Commands - GET, MGET"}),"\n",(0,l.jsx)(n.li,{children:"Async Rehash"}),"\n",(0,l.jsx)(n.li,{children:"In Process Background Saving - fork -> snapshot - \u53EF\u63A7\u5236\u6700\u5927\u5185\u5B58\u4F7F\u7528\u91CF"}),"\n",(0,l.jsx)(n.li,{children:"IStorage Interface - \u672A\u5305\u542B FLASH \u5B58\u50A8\u5B9E\u73B0"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/coming-soon/",children:"https://docs.keydb.dev/docs/coming-soon/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Namespaces"}),"\n",(0,l.jsx)(n.li,{children:"JSON"}),"\n",(0,l.jsx)(n.li,{children:"RAFT"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"FLASH \u529F\u80FD\u5927\u7EA6\u5728 2022-09 \u53D1\u5E03"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/EQ-Alpha/ModJS",children:"EQ-Alpha/ModJS"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u57FA\u4E8E V8"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"tip",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u56E0\u4E3A\u652F\u6301\u591A\u7EBF\u7A0B\uFF0C\u56E0\u6B64\u4F5C\u4E3A\u5355\u8282\u70B9 KeyDB \u4F1A\u6BD4\u5355\u8282\u70B9 Redis Cluster \u597D\u7EF4\u62A4\u7684\u591A\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Redis 6 I/O \u90E8\u5206\u652F\u6301\u591A\u7EBF\u7A0B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Multi-Tenancy Support ",(0,l.jsx)(n.a,{href:"https://github.com/EQ-Alpha/KeyDB/issues/286",children:"#286"})]}),"\n",(0,l.jsxs)(n.li,{children:["SET \u6210\u5458, HASH KEY \u652F\u6301 TTL\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"EXPIREMEMBER <key> <subkey> <timeout-in-seconds> <OPTIONAL:unit-time-format>"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"EXPIREMEMBERAT <key> <subkey> <expiration-timestamp>"})}),"\n",(0,l.jsx)(n.li,{children:"PEXPIREMEMBERAT"}),"\n",(0,l.jsxs)(n.li,{children:["\u68C0\u67E5 TTL ",(0,l.jsx)(n.code,{children:"PTTL/TTL <key> <subkey>"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u4F1A\u4EA7\u751F expired \u4E8B\u4EF6 - ",(0,l.jsx)(n.a,{href:"https://github.com/Snapchat/KeyDB/issues/85",children:"#85"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6269\u5C55\u547D\u4EE4\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"KEYDB.CRON name [single/repeat] [optional: start] delay script numkeys [key N] [arg N]"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5468\u671F\u8FD0\u884C lua \u811A\u672C"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"KEYDB.HRENAME key [src hash key] [dst hash key]"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"KEYDB.MEXISTS key [key ...]"})}),"\n",(0,l.jsx)(n.li,{children:"KEYDB.MVCCRESTORE"}),"\n",(0,l.jsx)(n.li,{children:"keydb.nhset,keydb.nhget"}),"\n",(0,l.jsx)(n.li,{children:"stralgo"}),"\n",(0,l.jsx)(n.li,{children:"lfence,failover,reset,"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["2022 Q3 - Redis 7 ",(0,l.jsx)(n.a,{href:"https://github.com/Snapchat/KeyDB/issues/420",children:"#420"})]}),"\n",(0,l.jsxs)(n.li,{children:["WIP JSON - ",(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/coming-soon/",children:"coming-soon"})]}),"\n"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"docker run -it --rm \\\n  -p 6379:6379 -v $PWD/data:/data \\\n  --name keydb eqalpha/keydb:alpine_x86_64_v6.3.1 keydb-server /etc/keydb/keydb.conf \\\n  --appendonly yes \\\n  --server-threads 2 --requirepass password\n"})}),"\n",(0,l.jsx)(n.h2,{id:"active-replica",children:"Active Replica"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["active-replica yes\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u591A\u526F\u672C\uFF0C\u540C\u65F6\u53EF\u8BFB\u5199"}),"\n",(0,l.jsx)(n.li,{children:"\u5355\u4E2A replicaof"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["multi-master yes\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5728\u526F\u672C\u57FA\u7840\u4E0A\u540C\u65F6\u652F\u6301\u540C\u6B65\u591A\u4E2A master \u7684\u6570\u636E"}),"\n",(0,l.jsx)(n.li,{children:"\u914D\u7F6E\u591A\u4E2A replicaof"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["cluster\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u7528\u4E8E\u6570\u636E\u5206\u7247 - \u6BCF\u4E2A\u8282\u70B9\u7684\u6570\u636E\u4E0D\u5BF9\u7B49"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"# keydb-1 \u4E0A\u6267\u884C\nreplicaof keydb-0:6379\n# keydb-0 \u4E0A\u6267\u884C\nreplicaof keydb-1:6379\n"})}),"\n",(0,l.jsx)(n.h2,{id:"flash",children:"Flash"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"docker run -d -it -p 6379:6379 \\\n  --mount type=bind,dst=/flash,src=/$PWD/flash/ \\\n  --name keydb eqalpha/keydb keydb-server /etc/keydb/keydb.conf --storage-provider flash /flash --maxmemory 1G --maxmemory-policy allkeys-lfu\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["--maxmemory-policy - \u5355\u8FBE\u5230 maxmemory \u65F6\uFF0C\u5982\u4F55\u6E05\u7406\u5185\u5B58\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"noeviction"}),"\n",(0,l.jsx)(n.li,{children:"allkeys-lru"}),"\n",(0,l.jsx)(n.li,{children:"volatile-lru - \u6709\u8BBE\u7F6E expire \u7684 key"}),"\n",(0,l.jsx)(n.li,{children:"allkeys-random"}),"\n",(0,l.jsx)(n.li,{children:"volatile-random"}),"\n",(0,l.jsx)(n.li,{children:"volatile-ttl"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Flash ",(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/flash/",children:"https://docs.keydb.dev/docs/flash/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"RocksDB on SSD"}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u5168\u90E8\u5B58\u5185\u5B58"}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u518D\u9700\u8981 Redis \u7684 RDB/AOF"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"keydb-vs-redis",children:"KeyDB vs Redis"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Redis\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"IO \u591A\u7EBF\u7A0B"}),"\n",(0,l.jsx)(n.li,{children:"Redis 7 - ACL R/W \u63A7\u5236"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["KeyDB\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"IO \u591A\u7EBF\u7A0B"}),"\n",(0,l.jsxs)(n.li,{children:["\u5B9A\u671F Merge Redis \u4E0A\u6E38\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Redis 6 fork - \u76EE\u524D\u5C1A\u672A\u5408\u5E76 Redis 7 \u529F\u80FD"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u517C\u5BB9 Redis \u6269\u5C55 - \u4F46\u53EA\u80FD\u5355\u7EBF\u7A0B\u6267\u884C\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4E3B\u6D41 Redis \u6269\u5C55\u7684\u534F\u8BAE\u90FD\u4E0D\u80FD\u5546\u7528 - RedisStack \u7CFB\u5217"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u90E8\u5206\u64CD\u4F5C\u652F\u6301\u5E76\u884C - MVCC"}),"\n",(0,l.jsx)(n.li,{children:"\u90E8\u5206\u64CD\u4F5C\u652F\u6301 ASYNC"}),"\n",(0,l.jsx)(n.li,{children:"\u989D\u5916\u529F\u80FD - HASH Key \u652F\u6301 TTL, CRON"}),"\n",(0,l.jsx)(n.li,{children:"Active Replica - \u4E2A\u4EBA\u63A8\u8350"}),"\n",(0,l.jsx)(n.li,{children:"Multi Master - \u4E2A\u4EBA\u4E0D\u90A3\u4E48\u63A8\u8350"}),"\n",(0,l.jsx)(n.li,{children:"FLASH \u5B58\u50A8"}),"\n",(0,l.jsx)(n.li,{children:"S3 \u5907\u4EFD/\u52A0\u8F7D"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/migration/",children:"https://docs.keydb.dev/docs/migration/"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/faq#how-is-keydb-different-than-redis",children:"https://docs.keydb.dev/docs/faq#how-is-keydb-different-than-redis"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u914D\u7F6E",children:"\u914D\u7F6E"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.keydb.dev/docs/config-file",children:"https://docs.keydb.dev/docs/config-file"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ini",children:"# scratch-file-path /tmp/\n\n# yes - replica \u8FD8\u6CA1\u51C6\u5907\u597D\u65F6\u4E5F\u63A5\u53D7\u5BA2\u6237\u7AEF\u8BF7\u6C42\n# no - \u8FD4\u56DE\u9519\u8BEF\u4FE1\u606F\nreplica-serve-stale-data yes\n\n# \u5904\u7406\u8BF7\u6C42\u7684 worker \u7EBF\u7A0B\n# \u53D6\u51B3\u4E8E\u7F51\u7EDC\u800C\u4E0D\u662F CPU \u6838\u5FC3\u6570\n# \u5EFA\u8BAE \u6700\u5927\u4E0D\u8D85\u8FC7 16\uFF0C\u6700\u597D\u5C11\u4E8E 8\uFF0C\u4E00\u822C 1 \u6216 2 \u5C31\u53EF\u4EE5\u4E86\nserver-threads 1\n\nserver-thread-affinity false\n\nactive-replica no\n"})})]})}function o(e={}){let{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return r}});var i=s(75271);let l={},d=i.createContext(l);function r(e){let n=i.useContext(d);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),i.createElement(d.Provider,{value:n},e.children)}}}]);