"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["75193"],{70570:function(e,n,l){l.r(n),l.d(n,{metadata:()=>s,contentTitle:()=>c,default:()=>a,assets:()=>h,toc:()=>t,frontMatter:()=>d});var s=JSON.parse('{"id":"service/storage/seaweedfs","title":"seaweedfs","description":"- \u9ED8\u8BA4\u6784\u5EFA\u7684\u5355 weed volume \u53EA\u652F\u6301 30G - \u5BF9\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDF\u6765\u8BF4\u592A\u5C0F\u4E86","source":"@site/../notes/service/storage/seaweedfs.md","sourceDirName":"service/storage","slug":"/service/storage/seaweedfs","permalink":"/notes/service/storage/seaweedfs","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/storage/seaweedfs.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1723961178000,"frontMatter":{"title":"seaweedfs"},"sidebar":"docs","previous":{"title":"s3fs","permalink":"/notes/service/storage/s3/s3fs"},"next":{"title":"sftpgo","permalink":"/notes/service/storage/sftpgo"}}'),i=l("52676"),r=l("79938");let d={title:"seaweedfs"},c="seaweedfs",h={},t=[{value:"volume",id:"volume",level:2},{value:"weed shell",id:"weed-shell",level:2},{value:"\u4F18\u5316",id:"\u4F18\u5316",level:2},{value:"Kubernetes",id:"kubernetes",level:2},{value:"master service",id:"master-service",level:2},{value:"volumn service",id:"volumn-service",level:2},{value:"filer service",id:"filer-service",level:2},{value:"webdav",id:"webdav",level:2},{value:"s3 service",id:"s3-service",level:2}];function x(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"seaweedfs",children:"seaweedfs"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u6784\u5EFA\u7684\u5355 ",(0,i.jsx)(n.code,{children:"weed volume"})," \u53EA\u652F\u6301 30G - \u5BF9\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDF\u6765\u8BF4\u592A\u5C0F\u4E86"]}),"\n",(0,i.jsx)(n.li,{children:"weed \u7684 filer/s3 \u4F9D\u8D56 metadata - \u7EF4\u62A4 metadata db \u589E\u52A0\u590D\u6742\u5EA6\uFF0C\u5F71\u54CD\u7A33\u5B9A\u6027"}),"\n"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/chrislusf/seaweedfs",children:"chrislusf/seaweedfs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Apache-2.0, Go"}),"\n",(0,i.jsxs)(n.li,{children:["\u8D77\u6E90\u4E8E ",(0,i.jsx)(n.a,{href:"http://www.usenix.org/event/osdi10/tech/full_papers/Beaver.pdf",children:"Facebook's Haystack design paper"}),", f4"]}),"\n",(0,i.jsx)(n.li,{children:"\u6BCF\u4E2A\u6587\u4EF6 40byte \u5143\u6570\u636E"}),"\n",(0,i.jsx)(n.li,{children:"\u5E95\u5C42\u5BF9\u8C61\u5B58\u50A8"}),"\n",(0,i.jsxs)(n.li,{children:["\u901A\u8FC7 filer \u5B9E\u73B0 POSIX \u517C\u5BB9\u6587\u4EF6\u7CFB\u7EDF\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u66B4\u9732 S3 \u63A5\u53E3"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"REST \u63A5\u53E3 - JSON\u3001JSONP \u8FD4\u56DE"}),"\n",(0,i.jsx)(n.li,{children:"\u67B6\u6784\u7B80\u5355"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7279\u6027\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u51B7\u70ED\u6570\u636E\u5206\u79BB"}),"\n",(0,i.jsx)(n.li,{children:"\u70ED\u6570\u636E O(1) \u8BBF\u95EE\u65F6\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u9009\u62E9\u65E0\u526F\u672C\u6216\u4E0D\u540C\u526F\u672C\u7EA7\u522B - \u611F\u77E5 rack \u548C dc"}),"\n",(0,i.jsx)(n.li,{children:"\u65E0\u5355\u70B9 - \u4E3B\u8282\u70B9 failover"}),"\n",(0,i.jsx)(n.li,{children:"\u57FA\u4E8E\u6587\u4EF6 mime \u5C31\u884C gzip"}),"\n",(0,i.jsx)(n.li,{children:"\u66F4\u65B0\u6216\u5220\u9664\u540E\u5C31\u884C\u7A7A\u95F4\u56DE\u6536"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 TTL"}),"\n",(0,i.jsx)(n.li,{children:"\u53EA\u8981\u6709\u78C1\u76D8\u7A7A\u95F4\u5C31\u53EF\u4EE5\u6DFB\u52A0\u603B\u5B58\u50A8\u7A7A\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"\u6DFB\u52A0\u5220\u9664\u8282\u70B9\u4E0D\u4F1A\u5BFC\u81F4\u6570\u636E\u8FDB\u884C\u4ECE\u65B0\u5E73\u8861"}),"\n",(0,i.jsx)(n.li,{children:"\u56FE\u7247\u5927\u5C0F\u8C03\u6574 - \u53EF\u9009"}),"\n",(0,i.jsx)(n.li,{children:"Tag, Accept-Range, Last-Modified \u7B49"}),"\n",(0,i.jsx)(n.li,{children:"in-memory/leveldb/readonly mode tuning for memory/performance balance."}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u5728\u7EBF rebalancing"}),"\n",(0,i.jsx)(n.li,{children:"\u900F\u660E\u4E91\u96C6\u6210 - \u5BF9\u70ED\u6570\u636E\u5C31\u884C\u5C42\u53E0\u7ED3\u6784\u5B58\u50A8\u5B9E\u73B0\u65E0\u9650\u7A7A\u95F4"}),"\n",(0,i.jsxs)(n.li,{children:["\u70ED\u6570\u636E Erasure Coding - \u611F\u77E5 Rack\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"RS(10,4) - \u5141\u8BB8\u4E22\u5931 4 \u5206\u7247\uFF0C\u603B\u6570\u636E\u4E3A\u539F\u6765 1.4 \u500D"}),"\n",(0,i.jsx)(n.li,{children:"1GB \u8FDE\u7EED\u5757\uFF0C1MB \u5757\u5927\u5C0F\uFF0C\u63D0\u5347\u8BFB\u53D6\u6027\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u4F1A\u5C06\u7D22\u5F15\u52A0\u8F7D\u5230\u5185\u5B58 - \u8282\u7701\u5185\u5B58\uFF0C\u542F\u52A8\u5757"}),"\n",(0,i.jsx)(n.li,{children:"\u670D\u52A1\u5668\u7075\u6D3B\u5E03\u5C40\uFF0C\u6CA1\u6709\u6700\u4F4E server \u548C rack \u8981\u6C42"}),"\n",(0,i.jsx)(n.li,{children:"\u901A\u8FC7 volume \u7BA1\u7406 ec"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u5C11\u4E8E 4 volume\uFF0Cec \u53EF\u4EE5\u7528\u4FDD\u62A4\u78C1\u76D8\u635F\u574F"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u5927\u4E8E\u7B49\u4E8E 4 volume\uFF0Cec \u53EF\u4EE5\u7528\u4E8E\u4FDD\u62A4\u7CFB\u7EDF\u5931\u8D25"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u5927\u4E8E 4 rack\uFF0Cec \u53EF\u4FDD\u62A4 rack \u5931\u8D25"}),"\n",(0,i.jsxs)(n.li,{children:["\u52A3\u52BF\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E22\u5931\u5206\u7247\u5728\u8BBF\u95EE\u65F6\u4F1A\u53D8\u6162"}),"\n",(0,i.jsx)(n.li,{children:"\u91CD\u6784 ec \u9700\u8981\u4F20\u8F93\u6574\u4E2A volume - \u4F20\u8F93\u91CF\u5927\u4F46\u6548\u7387\u9AD8"}),"\n",(0,i.jsx)(n.li,{children:"\u53EA\u652F\u6301\u5220\u9664\u4E0D\u652F\u6301\u66F4\u65B0"}),"\n",(0,i.jsx)(n.li,{children:"\u538B\u7F29\u9700\u8981\u5148\u8F6C\u6362\u4E3A\u666E\u901A volume"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Filer \u7279\u6027\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 HTTP \u66B4\u9732\u6587\u4EF6\u548C\u76EE\u5F55"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u5927\u6587\u4EF6 - TB \u7EA7\u522B"}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301 FUSE \u6302\u8F7D\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"weed mount"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"HDFS \u517C\u5BB9\u63A5\u53E3"}),"\n",(0,i.jsx)(n.li,{children:"\u5F02\u6B65\u5907\u4EFD\u5230 S3, Google Cloud Storage, Azure, BackBlaze"}),"\n",(0,i.jsxs)(n.li,{children:["WebDAV \u63A5\u53E3\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"weed webdav"})}),"\n",(0,i.jsx)(n.li,{children:"\u65E0\u8BA4\u8BC1"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"AES256-GCM \u52A0\u5BC6\u5B58\u50A8"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 TTL"}),"\n",(0,i.jsx)(n.li,{children:"Kubernetes CSI \u9A71\u52A8"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u573A\u666F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u76F8\u5BF9\u5C0F\u6587\u4EF6\u9AD8\u5E76\u53D1"}),"\n",(0,i.jsx)(n.li,{children:"CDN"}),"\n",(0,i.jsx)(n.li,{children:"\u5206\u5E03\u5F0F\u6587\u4EF6\u7F13\u5B58"}),"\n",(0,i.jsx)(n.li,{children:"\u56FE\u7247\u670D\u52A1\u5668"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7AEF\u53E3\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4E3B\u8282\u70B9\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"9333"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5B58\u50A8\u8282\u70B9\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"8080"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5B58\u50A8\u5927\u5C0F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5355\u5377\u6700\u5927 32G - 32GiB or 8x2^32 bytes\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"8 bytes \u5BF9\u9F50"}),"\n",(0,i.jsx)(n.li,{children:"\u589E\u52A0\u5BF9\u9F50\u53EF\u589E\u52A0\u7A7A\u95F4\u5927\u5C0F\uFF0C\u4F46\u5BF9\u9F50\u53EF\u80FD\u9700\u8981 pad \u6D6A\u8D39\u7A7A\u95F4"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6700\u591A 4Gi / 2^32 \u5377\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u56E0\u6B64\u9ED8\u8BA4\u6700\u5927\u96C6\u7FA4 8 x 4GiB x 4GiB = 128 128EiB"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5355\u6587\u4EF6\u6700\u5927\u4E3A\u5377\u5927\u5C0F"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6587\u4EF6\u5143\u4FE1\u606F\u5B58\u50A8\u4E8E\u5185\u5B58\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key 16 bytes - ",(0,i.jsx)(n.code,{children:"<64bit key, 32bit offset, 32bit size>"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u526F\u672C\u7EA7\u522B\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"xyz -> \u4E0D\u540C DC|\u540C DC \u4E0D\u540C Rack|\u540C Rack"}),"\n",(0,i.jsx)(n.li,{children:"000 - \u65E0"}),"\n",(0,i.jsx)(n.li,{children:"001 - \u540C rack 1 \u526F\u672C"}),"\n",(0,i.jsx)(n.li,{children:"010 - \u4E0D\u540C rack \u540C dc 1 \u526F\u672C"}),"\n",(0,i.jsx)(n.li,{children:"100 - \u4E0D\u540C dc 1 \u526F\u672C"}),"\n",(0,i.jsx)(n.li,{children:"200 - \u4E0D\u540C dc 2 \u526F\u672C"}),"\n",(0,i.jsx)(n.li,{children:"110 - \u4E0D\u540C rack 1 \u526F\u672C\uFF0C\u4E0D\u540C dc 1 \u526F\u672C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Volume\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B58\u50A8\u56FA\u5B9A\u8282\u70B9 - \u4F4D\u7F6E\u53EF\u4EE5\u7F13\u5B58\uFF0C\u53EF\u8BA2\u9605\u53D8\u5316"}),"\n",(0,i.jsx)(n.li,{children:"\u7C7B\u4F3C\u4E8E\u5206\u7247/Sharding"}),"\n",(0,i.jsx)(n.li,{children:"\u5199\u5165\u5230\u6240\u6709 replica \u624D\u7B97\u6210\u529F"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u5931\u8D25\uFF0C\u5219\u6807\u8BB0 volume \u53EA\u8BFB\uFF0C\u4E0B\u6B21\u5206\u914D\u5176\u4ED6\u53EF\u5199\u5165 volume id"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Volume Server - ",(0,i.jsx)(n.code,{children:"weed volume"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6700\u591A 30G - \u6784\u5EFA\u6DFB\u52A0 tag 5BytesOffset \u652F\u6301\u53EF\u6700\u591A 8T"}),"\n",(0,i.jsxs)(n.li,{children:["\u63D0\u4F9B volume \u5B58\u50A8 - \u9ED8\u8BA4\u6700\u591A 8 \u4E2A volume id\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u76F8\u5F53\u4E8E\u5E73\u5747\u5355\u4E2A volume id \u6700\u591A 30G/8 ~ 3.75G"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Usually hot data are fresh and warm data are old\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"newly created volumes on local servers, and optionally upload the older volumes on the cloud"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["volume -fileSizeLimitMB=256 - \u9ED8\u8BA4\u5355\u6587\u4EF6\u6700\u5927 256MB\uFF0C\u914D\u7F6E\u8FC7\u5927\u53EF\u80FD\u5BFC\u81F4 OOM\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/chrislusf/seaweedfs/wiki/Large-File-Handling",children:"Large file handleing"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# \u4E0B\u8F7D https://github.com/chrislusf/seaweedfs/releases\n# \u5B89\u88C5\ngo get -u -v github.com/chrislusf/seaweedfs/weed\n# $GOPATH/src/github.com/chrislusf/seaweedfs/weed\n\n# \u751F\u6210\u914D\u7F6E\n# \u914D\u7F6E\u76EE\u5F55 ./ $HOME/.seaweedfs /etc/seaweedfs\n# config filer|notification|replication|security|master\nweed scaffold -config master -output ./\nweed scaffold -config filer -output ./\nweed scaffold -config replication -output ./\n\n# matser\n# http://localhost:9333\n# -metrics.address Prometheus gateway\nmkdir -p meta-data v1 v2 mnt-cache mnt\nweed master -mdir=./meta-data -port=9333\n\n# volumes\n# -dataCenter\n# -rack\n# -index=memory\n# -max=8 \u5377\u6570\u91CF\nweed volume -dir=$PWD/v1 -max=5  -mserver=localhost:9333 -port=8080\nweed volume -dir=$PWD/v2 -max=10 -mserver=localhost:9333 -port=8081\n\n# \u5FEB\u6377\u542F\u52A8 - \u5355 master \u5355 volumn \u5305\u542B filer\nweed server -filer=true -s3=true -master.port=9333 -volume.port=8080 -filer.port=8888 -dir="./data"\n\n# \u6027\u80FD\u6D4B\u8BD5\n# 1M 1k \u7684\u6587\u4EF6\n# \u4E24\u4E2A volume - 5808.88 #/sec 5987.44 Kbytes/sec\n# \u8FD0\u884C\u5B8C\u6210\u540E\u5220\u9664 collection - http://localhost:9333/col/delete?collection=benchmark\nweed benchmark -master=localhost:9333\n\n# \u6587\u4EF6\u7CFB\u7EDF\nweed filer -port=8888\n\n# \u672C\u5730\u6302\u8F7D\n# -filer.path\n# -replication\n# -ttl\n# -umask\nweed mount -filer=localhost:8888 -cacheDir=$PWD/mnt-cache -dir=$PWD/mnt -dirAutoCreate\n\n# \u533F\u540D\u8BFB public\n# admin \u7BA1\u7406\n# test \u8BBF\u95EE test bucket\ncat <<JSON > s3.json\n{\n  "identities": [\n    {\n      "name": "anonymous",\n      "actions": ["Read:public"]\n    },\n    {\n      "name": "admin",\n      "credentials": [\n        {\n          "accessKey": "admin",\n          "secretKey": "secret"\n        }\n      ],\n      "actions": ["Admin", "Read", "Write"]\n    },\n    {\n      "name": "test",\n      "credentials": [\n        {\n          "accessKey": "test",\n          "secretKey": "test"\n        }\n      ],\n      "actions": ["Read:test", "Read:test", "Write:test"]\n    }\n  ]\n}\nJSON\nweed s3 -port=8333 -filer=localhost:8888 -config s3.json\n'})}),"\n",(0,i.jsx)(n.h2,{id:"volume",children:"volume"}),"\n",(0,i.jsx)(n.h2,{id:"weed-shell",children:"weed shell"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/chrislusf/seaweedfs/wiki/weed-shell",children:"weed-shell"})}),"\n",(0,i.jsx)(n.li,{children:"\u547D\u4EE4\u53C2\u6570\u8981\u770B\u6E90\u7801"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B\u6240\u6709\nvolume.list\n\n# \u4FEE\u6539\u4E4B\u524D\u9700\u8981 lock\nlock\n\n# \u5C06 volume 157 \u526F\u672C\u8BBE\u7F6E\u4E3A 001 - \u540C rack 1 \u526F\u672C\nvolume.configure.replication -volumeId=157 -replication=001\n# \u4FEE\u590D\u526F\u672C\nvolume.fix.replication\n\n# \u4FEE\u6539\u4E4B\u540E unlock\nunlock\n\n# \u5220\u9664\n# volume-server volume-id\nvolume.delete 127.0.0.1:8080 157\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u4F18\u5316",children:"\u4F18\u5316"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/chrislusf/seaweedfs/wiki/Optimization",children:"https://github.com/chrislusf/seaweedfs/wiki/Optimization"})}),"\n",(0,i.jsxs)(n.li,{children:["dc \u53EF\u7528\u4E8E\u6807\u793A\u4E0D\u540C\u5B58\u50A8\u5C42\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F8B\u5982 SSD"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"assign \u65F6\u53EF\u6307\u5B9A dc"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"kubernetes",children:"Kubernetes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/seaweedfs/seaweedfs-csi-driver",children:"seaweedfs/seaweedfs-csi-driver"})," - \u521B\u5EFA sc \u6307\u5411 filer\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["storageclass - ",(0,i.jsx)(n.code,{children:"seaweedfs-storage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F1A\u88AB\u8BBE\u7F6E\u6210\u9ED8\u8BA4\uFF0C\u6309\u9700\u7F16\u8F91 yaml \u53D6\u6D88"}),"\n",(0,i.jsxs)(n.li,{children:["provisioner: ",(0,i.jsx)(n.code,{children:"com.seaweedfs.csi"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["SEAWEEDFS_FILER - \u6307\u5411 filer\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u7F16\u8F91 yaml \u4FEE\u6539"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/seaweedfs/seaweedfs-operator",children:"seaweedfs/seaweedfs-operator"})}),"\n",(0,i.jsxs)(n.li,{children:["helm ",(0,i.jsx)(n.a,{href:"https://github.com/chrislusf/seaweedfs/tree/master/k8s",children:"chart"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E0D\u63A8\u8350\u4F7F\u7528\uFF0C\u53EF\u7528\u4E8E\u53C2\u8003"}),"\n",(0,i.jsxs)(n.li,{children:["master/filer/volume\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"statefulsets"}),"\n",(0,i.jsx)(n.li,{children:"anti-affinity on hostname"}),"\n",(0,i.jsx)(n.li,{children:"memsql(mysql) filer backend"}),"\n",(0,i.jsx)(n.li,{children:"secret-seaweedfs-db.yaml - mysql password"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["host path\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["/storage/logs/seaweedfs - \u65E5\u5FD7 ",(0,i.jsx)(n.code,{children:"-logdir"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"master"}),"\n",(0,i.jsx)(n.li,{children:"volume"}),"\n",(0,i.jsx)(n.li,{children:"filer"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["/ssd/seaweed-master/ - master \u5143\u6570\u636E ",(0,i.jsx)(n.code,{children:"-mdir"})]}),"\n",(0,i.jsxs)(n.li,{children:["/storage/object_store/ - volume \u6570\u636E ",(0,i.jsx)(n.code,{children:"-dir"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u76EE\u524D\u6570\u636E\u8D26\u53F7\u5BC6\u7801\u662F\u786C\u7F16\u7801 - YourSWUser:HardCodedPassword"}),"\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u4F1A\u521B\u5EFA ingress - \u4E14\u65E0\u6CD5\u81EA\u5B9A\u4E49"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["volumn\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u526F\u672C\u3001\u5197\u4F59\u3001TTL \u7684\u6700\u5C0F\u5355\u4F4D"}),"\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4 30GB\uFF0C8 volumn\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"1.29+ \u63D0\u4F9B large_disk \u6784\u5EFA\u7684 binary - 8T"}),"\n",(0,i.jsx)(n.li,{children:"volumn \u8FC7\u591A\u4E5F\u4F1A\u5BF9 master \u9020\u6210\u538B\u529B"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u4FEE\u6539\u8F83\u591A\uFF0C\u5EFA\u8BAE volumn \u5C0F\u4E00\u70B9"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u5927\u591A\u4E3A\u53EA\u8BFB\uFF0C\u4F7F\u7528 large_disk \u53EF\u4EE5\u5C06 volumn \u8BBE\u7F6E\u5927\u4E00\u70B9"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["collection\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"volume \u96C6\u5408"}),"\n",(0,i.jsx)(n.li,{children:"s3 buckect \u5BF9\u5E94 collection"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["rpc\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u670D\u52A1\u4E4B\u95F4 rpc \u4E3A grpc"}),"\n",(0,i.jsxs)(n.li,{children:["grpc \u7AEF\u53E3\u4E3A\u9ED8\u8BA4+10000 - \u4F8B\u5982 8080 -> 18080\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u53EF\u81EA\u5B9A\u4E49 ",(0,i.jsx)(n.code,{children:"<host>:<port>.<grpcPort>"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 HTTP \u63A5\u53E3"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["vacuum\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"when garbage is more than 30%"}),"\n",(0,i.jsxs)(n.li,{children:["\u7ACB\u5373\u89E6\u53D1 weed shell ",(0,i.jsx)(n.code,{children:"volume.vacuum -garbageThreshold=0.0001"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["fid - \u6BCF\u4E2A\u88AB\u5B58\u50A8\u7684\u5BF9\u8C61\u7684\u552F\u4E00 ID - \u6587\u4EF6\u4FE1\u606F\u53EF\u7531\u5916\u90E8\u5B58\u50A8 id \u6620\u5C04\u8FDB\u884C\u8DDF\u8E2A\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"3,01637037d6"})," - \u5B57\u7B26\u4E32\u6700\u957F 33 bytes\uFF0C\u4E8C\u8FDB\u5236\u5B58\u50A8\u6700\u957F 16 bytes\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"uint32 volume id=3"}),"\n",(0,i.jsxs)(n.li,{children:["uint64 file key=0x01 - \u6587\u4EF6\u6570\u91CF - \u589E\u52A0\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5927\u6587\u4EF6 chunk \u4E5F\u4F1A\u589E\u52A0"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"uint32 file cookie=0x637037d6 - \u7528\u4E8E\u907F\u514D URL \u731C\u6D4B\u6587\u4EF6"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["ttl\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u662F volume \u7EA7\u522B\u7684"}),"\n",(0,i.jsx)(n.li,{children:"\u56E0\u6B64 assign \u6307\u5B9A ttl \u65F6\u4F1A\u5C1D\u8BD5\u627E\u5339\u914D ttl \u7684 volumn\uFF0C\u5982\u679C\u627E\u4E0D\u5230\u5219\u4F1A\u521B\u5EFA volumn"}),"\n",(0,i.jsx)(n.li,{children:"\u4F1A\u8DDF\u8E2A\u6BCF\u4E2A volumn \u91CC\u7684\u6700\u5927\u5931\u6548\u65F6\u95F4"}),"\n",(0,i.jsxs)(n.li,{children:["\u5F53\u5168\u5931\u6548\u540E\u7ECF\u8FC7 ",(0,i.jsx)(n.code,{children:"min(10%*ttl, 10m)"})," \u65F6\u95F4\u5219 volumn server \u4F1A\u5220\u9664 volumn"]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u63A8\u8350 \u9891\u7E41 ttl \u548C \u975E ttl volumn \u5728\u76F8\u540C\u96C6\u7FA4"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Erasure Coding - ",(0,i.jsx)(n.a,{href:"https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-muralidhar.pdf",children:"f4: Facebook\u2019s Warm BLOB Storage System"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"seal \u51B7\u6570\u636E\uFF0C\u5229\u7528 EC \u8282\u7701\u7A7A\u95F4\u3001\u63D0\u9AD8\u6709\u6548\u6027"}),"\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4 ",(0,i.jsx)(n.code,{children:"RS(10,4)"})]}),"\n",(0,i.jsx)(n.li,{children:"1GB chunks"}),"\n",(0,i.jsx)(n.li,{children:"ec \u540E\u4F1A\u5220\u9664\u526F\u672C"}),"\n",(0,i.jsxs)(n.li,{children:["downside\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E0D\u80FD\u66F4\u65B0\uFF0C\u53EA\u80FD\u5220\u9664"}),"\n",(0,i.jsx)(n.li,{children:"\u6062\u590D\u9700\u8981\u4F20\u8F93\u6574\u4E2A volumn"}),"\n",(0,i.jsx)(n.li,{children:"\u8BFB\u53D6\u4F1A\u66F4\u6162 - \u591A\u4E86\u7F51\u7EDC\u8DF3\u8F6C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"server"}),(0,i.jsx)(n.th,{children:"http port"}),(0,i.jsx)(n.th,{children:"gRPC port"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"master"}),(0,i.jsx)(n.td,{children:"9333"}),(0,i.jsx)(n.td,{children:"19333"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"volume"}),(0,i.jsx)(n.td,{children:"8080"}),(0,i.jsx)(n.td,{children:"18080"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"filer"}),(0,i.jsx)(n.td,{children:"8888"}),(0,i.jsx)(n.td,{children:"18888"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"s3"}),(0,i.jsx)(n.td,{children:"8333"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"webdav"}),(0,i.jsx)(n.td,{children:"7333"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"iam"}),(0,i.jsx)(n.td,{children:"8111"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"filer.debug"}),(0,i.jsx)(n.td,{children:"6060"}),(0,i.jsx)(n.td,{})]})]})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"# ec 95% 1h \u6CA1\u64CD\u4F5C\u7684 volumn\nec.encode -fullPercent=95 -quietFor=1h\n# \u4FEE\u590D ec\nec.rebuild -force\n# \u4ECE\u65B0\u5E73\u8861 ec volumn \u5206\u5E03\nec.balance -force\n"})}),"\n",(0,i.jsx)(n.h2,{id:"master-service",children:"master service"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://localhost:9333",children:"http://localhost:9333"})}),"\n",(0,i.jsx)(n.li,{children:"raft \u534F\u8BAE - \u5076\u6570\u4E2A\u8282\u70B9"}),"\n",(0,i.jsx)(n.li,{children:"\u5927\u591A\u60C5\u51B5\u4E0B\u5355\u8282\u70B9\u8DB3\u77E3"}),"\n",(0,i.jsx)(n.li,{children:"\u6DFB\u52A0\u65B0\u8282\u70B9\u9700\u8981\u91CD\u542F\u6240\u6709\u8282\u70B9 - peers"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"volumn-service",children:"volumn service"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://localhost:8080/ui/index.html",children:"http://localhost:8080/ui/index.html"})}),"\n",(0,i.jsx)(n.li,{children:"\u63D0\u4F9B\u5B58\u50A8\u7A7A\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"\u7EF4\u62A4 volumn"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u53EF\u4EE5\u5C06 index \u5B58\u50A8\u5728\u66F4\u5FEB\u7684\u5B58\u50A8\u63D0\u9AD8\u67E5\u8BE2\u6027\u80FD\nweed volume -dir.idx=/fast/disk/dir\n"})}),"\n",(0,i.jsx)(n.h2,{id:"filer-service",children:"filer service"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://localhost:8888",children:"http://localhost:8888"})}),"\n",(0,i.jsx)(n.li,{children:"\u7EC4\u7EC7\u7EF4\u62A4 fs \u4FE1\u606F"}),"\n",(0,i.jsx)(n.li,{children:"\u63D0\u4F9B fs \u63A5\u53E3"}),"\n",(0,i.jsx)(n.li,{children:"\u5143\u4FE1\u606F\u9700\u8981\u5B58\u50A8 - Cassandra, Mongodb, Redis, Elastic Search, MySql, Postgres, MemSql, TiDB, CockroachDB, Etcd"}),"\n",(0,i.jsxs)(n.li,{children:["\u4E3A\u786E\u4FDD\u539F\u5B50\u6027\u53EF\u4F7F\u7528 Postgres, MySQL\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6587\u4EF6\u91CD\u547D\u540D\u3001\u76EE\u5F55\u91CD\u547D\u540D\u9700\u8981\u539F\u5B50\u6027\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u8BA2\u9605\u6587\u4EF6\u53D8\u5316\u53D1\u9001\u6D88\u606F"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"\u4E0D\u652F\u6301\u9012\u5F52\u76EE\u5F55\u5220\u9664"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u5982\u679C filer \u5143\u4FE1\u606F\u4E22\u5931\uFF0C\u5219\u4F1A\u5BFC\u81F4\u6587\u4EF6\u7ED3\u6784\u4FE1\u606F\u4E22\u5931"})," - \u65E0\u6CD5\u6062\u590D\uFF0C\u57FA\u672C\u7B49\u540C\u4E8E\u6587\u4EF6\u4E22\u5931\uFF0C\u4E14\u65E0\u6CD5\u8BBF\u95EE"]}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u8FD0\u884C\u591A\u4E2A filer - \u591A\u79DF\u6237\u3001\u8D1F\u8F7D"}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301\u6309 path \u914D\u7F6E filer store\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u53EF\u4EE5 trim prefix - \u56E0\u6B64\u4E5F\u80FD\u63D0\u4F9B\u7C7B\u4F3C mount \u80FD\u529B"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6587\u4EF6\u5206 chunk\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"chunk info \u5927\u7EA6 40 bytes"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5927\u6587\u4EF6\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"manifest chunk to hold 1000 pieces of chunk info"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301\u52A0\u5BC6 - AES256-GCM\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6BCF\u4E2A\u6587\u4EF6\u7684 key \u4F1A\u5B58\u50A8\u5230 filer store"}),"\n",(0,i.jsx)(n.li,{children:"\u5199\u5230 volumn \u7684\u662F\u52A0\u5BC6\u540E\u7684\u6570\u636E"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301 Automatic Peer Discovery\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"filer \u542F\u52A8\u4F1A\u6CE8\u518C\u5230 master"}),"\n",(0,i.jsx)(n.li,{children:"\u4ECE master \u53D1\u73B0\u5176\u4ED6 filer"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301 \u540C\u6B65 - embedded store replay \u5176\u4ED6 filer\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u901A\u8FC7 filer.store.id \u8BC6\u522B\u4E0D\u540C filer\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u542F\u52A8\u968F\u673A\u751F\u6210 uuid"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"-saveToFilerLimit=1024"})," - \u5C0F\u4E8E 1k \u7684\u6587\u4EF6\u76F4\u63A5\u5B58\u50A8\u5230 filer store"]}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 Key-Value \u5B58\u50A8"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u76D1\u542C filer.meta.tail"}),"\n",(0,i.jsx)(n.li,{children:"metadata \u4E8B\u4EF6 /topics/.system/log/yyyy-MM-dd/hh-mm.segment"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"fs.cd /\n# \u8FC1\u79FB filer store\nfs.meta.save            # \u5907\u4EFD meta\nfs.meta.load uuid.meta  # \u6062\u590D meta\n\n# \u540C\u6B65 filer a<->b\n# \u652F\u6301\u6307\u5B9A\u8DEF\u5F84 -a.path -b.path\n# -isActivePassive a->b\nfiler.sync -a <filer1_host>:<filer1_port> -b <filer2_host>:<filer2_port>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"webdav",children:"webdav"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"weed webdav"})}),"\n",(0,i.jsx)(n.li,{children:"\u6682\u4E0D\u652F\u6301 auth"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"s3-service",children:"s3 service"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4F9D\u8D56 filer \u5B58\u50A8\u5728 ",(0,i.jsx)(n.code,{children:"/buckets/<bucket_name>"})]}),"\n",(0,i.jsx)(n.li,{children:"\u63D0\u4F9B s3 \u63A5\u53E3"}),"\n",(0,i.jsxs)(n.li,{children:["filer \u53EF\u5185\u7F6E\u542F\u52A8 ",(0,i.jsx)(n.code,{children:"-s3=true"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weed s3"})," \u542F\u52A8 Gateway"]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u652F\u6301 Policy"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weed iam"})," \u652F\u6301 IAM"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"source",children:"source"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["postgres2\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u652F\u6301\u539F\u5B50\u64CD\u4F5C"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 Fast Bucket Deletion"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:'CREATE TABLE IF NOT EXISTS "%s" (\n  dirhash   BIGINT,\n  name      VARCHAR(65535),\n  directory VARCHAR(65535),\n  meta      bytea,\n  PRIMARY KEY (dirhash, name)\n);\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/viant/ptrie",children:"https://github.com/viant/ptrie"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"prefix tree"}),"\n",(0,i.jsx)(n.li,{children:"\u5339\u914D store \u8DEF\u5F84"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"type Filer struct {\n  Store               VirtualFilerStore\n  MasterClient        *wdclient.MasterClient\n	RemoteStorage       *FilerRemoteStorage\n	UniqueFileId        uint32\n	MetaAggregator      *MetaAggregator\n  buckets             *FilerBuckets\n}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["VirtualFilerStore\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"path \u5339\u914D\u6620\u5C04\u591A\u4E2A store"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["MetaAggregator\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u805A\u5408\u591A\u4E2A filer \u5143\u6570\u636E"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weed filer -webdav -s3 -ima"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u540C\u65F6\u542F\u52A8\u591A\u4E2A\u670D\u52A1\uFF0C\u901A\u8FC7\u7AEF\u53E3\u901A\u8BAF\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u4F20\u9012\u7684\u5185\u90E8 filer \u5B9E\u73B0"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["webdav\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u57FA\u4E8E golang.org/x/net/webdav \u5B9E\u73B0\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F7F\u7528 in-memory LockSystem"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(x,{...e})}):x(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return c},a:function(){return d}});var s=l(75271);let i={},r=s.createContext(i);function d(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);