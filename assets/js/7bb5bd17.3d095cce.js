"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["79666"],{22035:function(n,d,s){s.r(d),s.d(d,{metadata:()=>e,contentTitle:()=>c,default:()=>h,assets:()=>l,toc:()=>x,frontMatter:()=>i});var e=JSON.parse('{"id":"db/kv/redis/redis-cli","title":"redis-cli","description":"redis-cli","source":"@site/../notes/db/kv/redis/redis-cli.md","sourceDirName":"db/kv/redis","slug":"/db/kv/redis/cli","permalink":"/notes/db/kv/redis/cli","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/kv/redis/redis-cli.md","tags":[{"inline":true,"label":"Command","permalink":"/notes/tags/command"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1721277861000,"frontMatter":{"tags":["Command"]},"sidebar":"docs","previous":{"title":"ACL","permalink":"/notes/db/kv/redis/acl"},"next":{"title":"redis.conf","permalink":"/notes/db/kv/redis/conf"}}'),r=s("52676"),t=s("79938");let i={tags:["Command"]},c=void 0,l={},x=[{value:"redis-cli",id:"redis-cli",level:2}];function j(n){let d={code:"code",h2:"h2",li:"li",n:"n",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.h2,{id:"redis-cli",children:"redis-cli"}),"\n",(0,r.jsx)(d.pre,{children:(0,r.jsx)(d.code,{className:"language-bash",children:"redis-cli -u 'redis://user:pass@127.0.0.1:6379'\n# user \u90E8\u5206\u5FC5\u987B\uFF0C\u6CA1\u6709\u5219\u4F7F\u7528 default\nredis-cli -u 'redis://default:pass@127.0.0.1:6379'\n"})}),"\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsxs)(d.li,{children:["user \u9ED8\u8BA4\u4E3A default\n",(0,r.jsxs)(d.ul,{children:["\n",(0,r.jsx)(d.li,{children:"\u56E0\u4E3A\u4EE5\u524D\u6CA1\u6709 ACL \u4E5F\u5C31\u6CA1\u6709 user \u7684\u6982\u5FF5"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(d.table,{children:[(0,r.jsx)(d.thead,{children:(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.th,{children:"flag"}),(0,r.jsx)(d.th,{children:"default"}),(0,r.jsx)(d.th,{children:"for"})]})}),(0,r.jsxs)(d.tbody,{children:[(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-h ",(0,r.jsx)(d.code,{children:"<hostname>"})]}),(0,r.jsx)(d.td,{children:"127.0.0.1"}),(0,r.jsx)(d.td,{children:"\u670D\u52A1\u5668\u4E3B\u673A\u540D"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-p ",(0,r.jsx)(d.code,{children:"<port>"})]}),(0,r.jsx)(d.td,{children:"6379"}),(0,r.jsx)(d.td,{children:"\u670D\u52A1\u5668\u7AEF\u53E3"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-s ",(0,r.jsx)(d.code,{children:"<socket>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u670D\u52A1\u5668 socket\uFF08\u8986\u76D6\u4E3B\u673A\u540D\u548C\u7AEF\u53E3\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-a ",(0,r.jsx)(d.code,{children:"<password>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u8FDE\u63A5\u670D\u52A1\u5668\u65F6\u4F7F\u7528\u7684\u5BC6\u7801"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--user ",(0,r.jsx)(d.code,{children:"<username>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7528\u4E8E\u53D1\u9001 ACL \u6837\u5F0F\u7684 'AUTH username pass'"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--pass ",(0,r.jsx)(d.code,{children:"<password>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4E0E -a \u4E00\u81F4\uFF0C\u51FA\u4E8E\u4E00\u81F4\u6027\u8003\u8651"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--askpass"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5F3A\u5236\u7528\u6237\u4ECE STDIN \u8F93\u5165\u5BC6\u7801\u5E76\u52A0\u5BC6"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-u ",(0,r.jsx)(d.code,{children:"<uri>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u670D\u52A1\u5668 URI"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-r ",(0,r.jsx)(d.code,{children:"<repeat>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u6267\u884C\u6307\u5B9A\u547D\u4EE4 N \u6B21"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-i ",(0,r.jsx)(d.code,{children:"<interval>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5728\u4F7F\u7528 -r \u65F6\uFF0C\u6BCF\u4E2A\u547D\u4EE4\u4E4B\u95F4\u7B49\u5F85\u7684\u65F6\u95F4"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-n ",(0,r.jsx)(d.code,{children:"<db>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u6570\u636E\u5E93\u7F16\u53F7"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-2"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 RESP2 \u534F\u8BAE\u6A21\u5F0F\u542F\u52A8\u4F1A\u8BDD"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-3"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 RESP3 \u534F\u8BAE\u6A21\u5F0F\u542F\u52A8\u4F1A\u8BDD"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-x"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4ECE STDIN \u8BFB\u53D6\u6700\u540E\u4E00\u4E2A\u53C2\u6570"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-X"}),(0,r.jsx)(d.td,{}),(0,r.jsxs)(d.td,{children:["\u4ECE STDIN \u8BFB\u53D6 ",(0,r.jsx)(d.code,{children:"<tag>"})," \u53C2\u6570"]})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-d ",(0,r.jsx)(d.code,{children:"<delimiter>"})]}),(0,r.jsx)(d.td,{children:(0,r.jsx)(d.code,{children:"\\n"})}),(0,r.jsx)(d.td,{children:"\u539F\u59CB\u683C\u5F0F\u5316\u54CD\u5E94\u4E2D\u7684\u54CD\u5E94\u5757\u5206\u9694\u7B26"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["-D ",(0,r.jsx)(d.code,{children:"<delimiter>"})]}),(0,r.jsx)(d.td,{children:(0,r.jsx)(d.code,{children:"\\n"})}),(0,r.jsx)(d.td,{children:"\u539F\u59CB\u683C\u5F0F\u5316\u54CD\u5E94\u4E2D\u7684\u54CD\u5E94\u5206\u9694\u7B26"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-c"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u542F\u7528\u96C6\u7FA4\u6A21\u5F0F\uFF08\u8DDF\u968F -ASK \u548C -MOVED \u91CD\u5B9A\u5411\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"-e"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5F53\u547D\u4EE4\u6267\u884C\u5931\u8D25\u65F6\u8FD4\u56DE\u9000\u51FA\u9519\u8BEF\u7801"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--tls"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5EFA\u7ACB\u5B89\u5168\u7684 TLS \u8FDE\u63A5"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--sni ",(0,r.jsx)(d.code,{children:"<host>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"TLS \u7684\u670D\u52A1\u5668\u540D\u79F0\u6307\u793A"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--cacert ",(0,r.jsx)(d.code,{children:"<file>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7528\u4E8E\u9A8C\u8BC1\u7684 CA \u8BC1\u4E66\u6587\u4EF6"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--cacertdir ",(0,r.jsx)(d.code,{children:"<dir>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5B58\u50A8\u53D7\u4FE1\u4EFB\u7684 CA \u8BC1\u4E66\u7684\u76EE\u5F55"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--insecure"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u901A\u8FC7\u8DF3\u8FC7\u8BC1\u4E66\u9A8C\u8BC1\u5141\u8BB8\u4E0D\u5B89\u5168\u7684 TLS \u8FDE\u63A5"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--cert ",(0,r.jsx)(d.code,{children:"<file>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7528\u4E8E\u8EAB\u4EFD\u9A8C\u8BC1\u7684\u5BA2\u6237\u7AEF\u8BC1\u4E66"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--key ",(0,r.jsx)(d.code,{children:"<file>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7528\u4E8E\u8EAB\u4EFD\u9A8C\u8BC1\u7684\u79C1\u94A5\u6587\u4EF6"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--tls-ciphers ",(0,r.jsx)(d.code,{children:"<list>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u8BBE\u7F6E\u9996\u9009\u5BC6\u7801\u5217\u8868\uFF08TLSv1.2 \u53CA\u4EE5\u4E0B\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--tls-ciphersuites ",(0,r.jsx)(d.code,{children:"<list>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u8BBE\u7F6E\u9996\u9009\u5BC6\u7801\u5957\u4EF6\u5217\u8868\uFF08TLSv1.3\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--raw"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528\u539F\u59CB\u683C\u5F0F\u5316\u56DE\u590D"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--no-raw"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5F3A\u5236\u683C\u5F0F\u5316\u8F93\u51FA"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--quoted-input"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5F3A\u5236\u5C06\u8F93\u5165\u4F5C\u4E3A\u5F15\u7528\u5B57\u7B26\u4E32\u5904\u7406"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--csv"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4EE5 CSV \u683C\u5F0F\u8F93\u51FA"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--json"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4EE5 JSON \u683C\u5F0F\u8F93\u51FA"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--quoted-json"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4EE5 ASCII \u5B89\u5168\u7684\u5F15\u7528\u5B57\u7B26\u4E32\u751F\u6210 JSON"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--show-pushes ",(0,r.jsx)(d.code,{children:"<yn>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u662F\u5426\u6253\u5370 RESP3 PUSH \u6D88\u606F"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--stat"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u6253\u5370\u670D\u52A1\u5668\u7684\u6EDA\u52A8\u7EDF\u8BA1\u6570\u636E"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--latency"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u8FDB\u5165\u6301\u7EED\u91C7\u6837\u5EF6\u8FDF\u7684\u7279\u6B8A\u6A21\u5F0F"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--latency-history"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u50CF --latency\uFF0C\u4F46\u8DDF\u8E2A\u5EF6\u8FDF\u968F\u65F6\u95F4\u7684\u53D8\u5316"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--latency-dist"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u663E\u793A\u5EF6\u8FDF\u5149\u8C31\uFF0C\u9700\u8981 xterm 256 \u8272"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--lru-test ",(0,r.jsx)(d.code,{children:"<keys>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 80-20 \u5206\u5E03\u6A21\u62DF\u7F13\u5B58\u5DE5\u4F5C\u8D1F\u8F7D"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--replica"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u6A21\u62DF\u663E\u793A\u4ECE\u4E3B\u670D\u52A1\u5668\u63A5\u6536\u5230\u7684\u547D\u4EE4\u7684\u526F\u672C"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--rdb ",(0,r.jsx)(d.code,{children:"<filename>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5C06 RDB \u8F6C\u50A8\u4ECE\u8FDC\u7A0B\u670D\u52A1\u5668\u4F20\u8F93\u5230\u672C\u5730\u6587\u4EF6"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--functions-rdb ",(0,r.jsx)(d.code,{children:"<filename>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7C7B\u4F3C --rdb\uFF0C\u4F46\u4EC5\u83B7\u53D6\u51FD\u6570\uFF08\u4E0D\u83B7\u53D6\u952E\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--pipe"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u5C06\u539F\u59CB Redis \u534F\u8BAE\u4ECE stdin \u4F20\u8F93\u5230\u670D\u52A1\u5668"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--pipe-timeout ",(0,r.jsx)(d.code,{children:"<n>"})]}),(0,r.jsx)(d.td,{children:"30"}),(0,r.jsxs)(d.td,{children:["\u5728 --pipe \u6A21\u5F0F\u4E2D\uFF0C\u53D1\u9001\u6240\u6709\u6570\u636E\u540E\u5982\u679C\u6CA1\u6709\u5728 ",(0,r.jsx)(d.n,{children:" \u79D2\u5185\u6536\u5230\u56DE\u590D\u5219\u4E2D\u6B62"})]})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--bigkeys"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u91C7\u6837 Redis \u952E\uFF0C\u5BFB\u627E\u5177\u6709\u8BB8\u591A\u5143\u7D20\u7684\u952E"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--memkeys"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u91C7\u6837 Redis \u952E\uFF0C\u5BFB\u627E\u6D88\u8017\u5927\u91CF\u5185\u5B58\u7684\u952E"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--memkeys-samples ",(0,r.jsx)(d.code,{children:"<n>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u91C7\u6837 Redis \u952E\uFF0C\u5B9A\u4E49\u8981\u91C7\u6837\u7684\u952E\u5143\u7D20\u6570\u91CF"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--hotkeys"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u91C7\u6837 Redis \u952E\uFF0C\u5BFB\u627E\u70ED\u70B9\u952E\uFF08\u4EC5\u5728 maxmemory-policy \u4E3A *lfu \u65F6\u6709\u6548\uFF09"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--scan"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 SCAN \u547D\u4EE4\u5217\u51FA\u6240\u6709\u952E"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--pattern ",(0,r.jsx)(d.code,{children:"<pat>"})]}),(0,r.jsx)(d.td,{children:(0,r.jsx)(d.code,{children:"*"})}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 --scan, --bigkeys \u6216 --hotkeys \u65F6\u7684\u952E\u6A21\u5F0F"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--count ",(0,r.jsx)(d.code,{children:"<count>"})]}),(0,r.jsx)(d.td,{children:"10"}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 --scan, --bigkeys \u6216 --hotkeys \u65F6\u7684\u8BA1\u6570\u9009\u9879"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--quoted-pattern ",(0,r.jsx)(d.code,{children:"<pat>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4E0E --pattern \u76F8\u540C\uFF0C\u4F46\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u53EF\u4EE5\u662F\u5F15\u7528\u7684"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--intrinsic-latency ",(0,r.jsx)(d.code,{children:"<sec>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u8FD0\u884C\u6D4B\u8BD5\u4EE5\u6D4B\u91CF\u5185\u5728\u7CFB\u7EDF\u5EF6\u8FDF"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--eval ",(0,r.jsx)(d.code,{children:"<file>"})]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528 Lua \u811A\u672C\u53D1\u9001 EVAL \u547D\u4EE4"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--ldb"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4E0E --eval \u4E00\u8D77\u4F7F\u7528\u542F\u7528 Redis Lua \u8C03\u8BD5\u5668"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--ldb-sync-mode"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u50CF --ldb\uFF0C\u4F46\u4F7F\u7528\u540C\u6B65 Lua \u8C03\u8BD5\u5668"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsxs)(d.td,{children:["--cluster ",(0,r.jsx)(d.code,{children:"<command>"})," [args...]"]}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u7FA4\u96C6\u7BA1\u7406\u547D\u4EE4\u548C\u53C2\u6570"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--verbose"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u542F\u7528\u8BE6\u7EC6\u6A21\u5F0F"})]}),(0,r.jsxs)(d.tr,{children:[(0,r.jsx)(d.td,{children:"--no-auth-warning"}),(0,r.jsx)(d.td,{}),(0,r.jsx)(d.td,{children:"\u4F7F\u7528\u547D\u4EE4\u884C\u63A5\u53E3\u65F6\u4E0D\u663E\u793A\u8B66\u544A\u6D88\u606F"})]})]})]})]})}function h(n={}){let{wrapper:d}={...(0,t.a)(),...n.components};return d?(0,r.jsx)(d,{...n,children:(0,r.jsx)(j,{...n})}):j(n)}},79938:function(n,d,s){s.d(d,{Z:function(){return c},a:function(){return i}});var e=s(75271);let r={},t=e.createContext(r);function i(n){let d=e.useContext(t);return e.useMemo(function(){return"function"==typeof n?n(d):{...d,...n}},[d,n])}function c(n){let d;return d=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),e.createElement(t.Provider,{value:d},n.children)}}}]);