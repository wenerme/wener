"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["519"],{68007:function(n,e,s){s.r(e),s.d(e,{metadata:()=>r,contentTitle:()=>d,default:()=>j,assets:()=>a,toc:()=>c,frontMatter:()=>l});var r=JSON.parse('{"id":"queue/nats/nats-jetstream","title":"NATS JetStream","description":"- \u6301\u4E45\u5316\u6D88\u606F\u961F\u5217 - \u5BF9\u6807 Kafka","source":"@site/../notes/queue/nats/nats-jetstream.md","sourceDirName":"queue/nats","slug":"/queue/nats/jetstream","permalink":"/notes/queue/nats/jetstream","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/queue/nats/nats-jetstream.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702882608000,"frontMatter":{"title":"NATS JetStream"},"sidebar":"docs","previous":{"title":"NATS FAQ","permalink":"/notes/queue/nats/faq"},"next":{"title":"Nats on K8S","permalink":"/notes/queue/nats/k8s"}}'),t=s("52676"),i=s("79938");let l={title:"NATS JetStream"},d="NATS JetStream",a={},c=[{value:"Notes",id:"notes",level:2},{value:"Cannot read properties of undefined (reading ack_policy)",id:"cannot-read-properties-of-undefined-reading-ack_policy",level:2},{value:"invalid stream name - stream name cannot contain :",id:"invalid-stream-name---stream-name-cannot-contain-",level:2}];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"nats-jetstream",children:"NATS JetStream"})}),"\n",(0,t.jsx)(e.admonition,{type:"tip",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6301\u4E45\u5316\u6D88\u606F\u961F\u5217 - \u5BF9\u6807 Kafka"}),"\n",(0,t.jsx)(e.li,{children:"\u66FF\u4EE3 STAN"}),"\n"]})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/nats-io/jetstream",children:"nats-io/jetstream"})}),"\n",(0,t.jsxs)(e.li,{children:["\u89C6\u56FE - \u5185\u7F6E Service \u5B9E\u73B0\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"/notes/queue/nats/kv",children:"KV"})," - ",(0,t.jsx)(e.code,{children:"$KV"})]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"/notes/queue/nats/objectstore",children:"ObjectStore"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Stream\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.>"})}),"\n",(0,t.jsxs)(e.li,{children:["domain - \u591A\u79DF\u6237\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.<domain>.API.>"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.nats.io/running-a-nats-service/configuration/leafnodes/jetstream_leafnodes",children:"LeafNode JS"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u7279\u6027\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"At-least-once delivery; exactly once within a window"}),"\n",(0,t.jsx)(e.li,{children:"Store messages and replay by time or sequence"}),"\n",(0,t.jsx)(e.li,{children:"Wildcard support"}),"\n",(0,t.jsx)(e.li,{children:"Account aware"}),"\n",(0,t.jsx)(e.li,{children:"Data at rest encryption"}),"\n",(0,t.jsx)(e.li,{children:"Cleanse specific messages (GDPR)"}),"\n",(0,t.jsx)(e.li,{children:"Horizontal scalability"}),"\n",(0,t.jsx)(e.li,{children:"Persist Streams and replay via Consumers"}),"\n",(0,t.jsx)(e.li,{children:"WebSocket"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Replica\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Source\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u521B\u5EFA\u7684 stream \u6307\u5B9A source \u540E\u4F1A\u53BB\u6D88\u8D39\uFF0C\u53EF\u591A\u4E2A source"}),"\n",(0,t.jsx)(e.li,{children:"\u53EF\u88AB\u89C6\u4E3A\u526F\u672C - \u8BE5 stream \u591A\u8282\u70B9\u8FD0\u884C\u53EF\u5B9E\u73B0\u591A\u526F\u672C"}),"\n",(0,t.jsx)(e.li,{children:"\u914D\u7F6E\u4E0D\u540C\u7684\u6301\u4E45\u5316\u7B56\u7565"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Mirror\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u955C\u50CF\u53E6\u5916\u4E00\u4E2A stream"}),"\n",(0,t.jsx)(e.li,{children:"\u53EA\u80FD\u6D88\u8D39"}),"\n",(0,t.jsx)(e.li,{children:"\u4F8B\u5982 mirror \u4E00\u4E2A \u526F\u672C stream \u63D0\u4F9B\u8FD1\u671F\u67E5\u8BE2\u548C\u6D88\u8D39"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u96C6\u7FA4\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Raft \u5B9E\u73B0"}),"\n",(0,t.jsx)(e.li,{children:"\u6240\u6709\u8282\u70B9\u52A0\u5165 Meta Group"}),"\n",(0,t.jsx)(e.li,{children:"\u6BCF\u4E2A stream \u7EC4\u6210\u4E00\u4E2A Stream Group"}),"\n",(0,t.jsx)(e.li,{children:"\u6BCF\u4E2A consumer \u7EC4\u6210\u4E00\u4E2A Consumer Group"}),"\n",(0,t.jsxs)(e.li,{children:["\u63A8\u8350\u6DF7\u5408 JetStream \u548C\u4E00\u822C Nats\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u56E0\u4E3A JetStream \u9700\u8981\u5B58\u50A8 - \u914D\u7F6E\u540E\u53EF\u9488\u5BF9\u8282\u70B9\u4F7F\u7528 JetStream \u4F18\u5316\u5B58\u50A8"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"nats://demo.nats.io:4222"}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/nats-io/jsm.go",children:"nats-io/jsm.go"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"JetStream Management Library for Golang"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/nats-io/nats-surveyor",children:"nats-io/nats-surveyor"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"metrics, dashboard"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/nats-io/terraform-provider-jetstream/",children:"nats-io/terraform-provider-jetstream"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Terraform \u7BA1\u7406 JetStream"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/nats-io/nack",children:"nats-io/nack"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"K8S Controller"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u57FA\u4E8E jetstream \u7684\u529F\u80FD\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"kv"}),"\n",(0,t.jsx)(e.li,{children:"object store"}),"\n",(0,t.jsx)(e.li,{children:"service rpc"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.admonition,{type:"info",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5B58\u50A8\u5C1A\u4E0D\u652F\u6301\u96C6\u7FA4"}),"\n"]})}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5EFA\u8BAE\u540D\u5B57\u5C11\u4E8E 32 \u5B57\u7B26"}),"\n"]})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:'# \u542F\u52A8 jetstream\nnats-server -js\n# \u914D\u7F6E\u542F\u52A8\nnats-server -c js.conf\n\n# \u5BB9\u5668\u542F\u52A8\n# \u9ED8\u8BA4 scrach \u955C\u50CF\u53EA\u5305\u542B /nats-server\ndocker run --rm -it -p 4222:4222 --name js nats:alpine -js\n\n# nats stream\n# ==================\n# \u521B\u5EFA Stream\nnats str add ORDERS --subjects "ORDERS.*" --ack --max-msgs=-1 --max-bytes=-1 --max-age=1y --storage file --retention limits --max-msg-size=-1 --discard=old --replicas 3 --dupe-window=2m\n# \u8F93\u51FA stream \u914D\u7F6E\nnats str info ORDERS -j | jq .config\n# \u901A\u8FC7\u914D\u7F6E\u521B\u5EFA\nnats str add ORDERS --config orders.json\n\n# \u6240\u6709 stream\nnats str ls\n# stream \u4FE1\u606F\nnats str info ORDERS\n# \u590D\u5236 stream\nnats str cp ORDERS ARCHIVE --subjects "ORDERS_ARCVHIVE.*" --max-age 2y\n# \u4FEE\u6539 stream \u5355\u9879\u914D\u7F6E\nnats str edit ORDERS --subjects "ORDERS.*"\n# \u914D\u7F6E\u8986\u76D6\nnats str edit ORDERS --config orders.json\n\n# \u53D1\u5E03\u6D88\u606F\nnats pub ORDERS.scratch hello\n# \u53D1\u5E03\u5E26 ACK - \u786E\u8BA4\u6536\u5230\u6301\u4E45\u5316\nnats req ORDERS.scratch hello\n# \u6E05\u9664\u6240\u6709\u6D88\u606F\nnats str purge ORDERS -f\n# \u5220\u9664\u4E00\u6761\u6D88\u606F - SEQ\nnats str rmm ORDERS 1 -f\n\n# \u79FB\u9664 steam\nnats str rm ORDERS -f\n\n# nats consumer\n# ==================\n# \u6240\u6709 consumer\nnats con ls ORDERS\nnats con add ORDERS DISPATCH --filter ORDERS.processed --ack explicit --pull --deliver all --sample 100 --max-deliver 20 --replay instant --max-pending 0\nnats con add ORDERS NEW --filter ORDERS.received --ack explicit --pull --deliver all --max-deliver=-1 --sample 100\n# \u914D\u7F6E\nnats con info ORDERS DISPATCH -j | jq .config\n# MONITOR push\nnats con add ORDERS MONITOR --filter \'\' --ack none --target monitor.ORDERS --deliver last --replay instant\n\n# consumer \u72B6\u6001\nnats con info ORDERS DISPATCH\n\nnats pub ORDERS.processed "order 1"\nnats pub ORDERS.processed "order 2"\nnats pub ORDERS.processed "order 3"\n\n# Pull \u6D88\u8D39 ACK \u6D88\u606F\n# --no-ack \u4E0D ACK \u7EE7\u7EED\u6D88\u8D39\n# ACK \u6267\u884C\u4E00\u6B21\u6D88\u8D39\u4E00\u6761\nnats con next ORDERS DISPATCH\nnats req \'$JS.API.CONSUMER.MSG.NEXT.ORDERS.DISPATCH\' \'\'\n\nnats con info ORDERS MONITOR\n# push \u6D88\u8D39 - \u4F1A\u4E00\u6B21\u6027\u6D88\u8D39\u6240\u6709\nnats sub monitor.ORDERS\n\n# nats \u76D1\u63A7\n# ==========\nnats event --js-advisory\n\n# nats \u5176\u4ED6\n# ==========\n# \u62A5\u544A\u7EDF\u8BA1\nnats s report\n# \u53D1\u9001\u591A\u6761\u6D88\u606F\nnats req ORDERS.new "ORDER {{Count}}" --count 100\n\n# \u8F93\u51FA\u526F\u672C\u5173\u7CFB\u4E3A dot \u56FE\nnats s report --dot replication.dot\n\n# \u521B\u5EFA\u6A21\u677F - \u5728 pub \u7684\u65F6\u5019\u751F\u6210\n# \u5220\u9664 template \u4F1A\u5220\u9664 \u6240\u6709 stream\nnats str template add CLIENTS --subjects "CLIENT.*" --ack --max-msgs=-1 --max-bytes=-1 --max-age=1y --storage file --retention limits --max-msg-size 2048 --max-streams 1024 --discard old\n'})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-conf",children:"jetstream {\n   store_dir=nats\n}\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"stream.json"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-json",children:'{\n  "name": "ORDERS",\n  "subjects": ["ORDERS.*"],\n  "retention": "limits",\n  "max_consumers": -1,\n  "max_msgs": -1,\n  "max_bytes": -1,\n  "max_age": 31536000000000000,\n  "max_msg_size": -1,\n  "storage": "file",\n  "discard": "old",\n  "num_replicas": 1,\n  "duplicate_window": 120000000000\n}\n'})}),"\n",(0,t.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Stream \u5C5E\u6027"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"attr"}),(0,t.jsx)(e.th,{children:"default"}),(0,t.jsx)(e.th,{children:"mean"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Name"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Storage"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Subjects"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u6D88\u8D39\u7684\u4E3B\u9898 - \u652F\u6301\u901A\u914D\u7B26"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Replicas"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u96C6\u7FA4\u526F\u672C - \u6700\u591A 5"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MaxAge"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u6D88\u606F\u7559\u5B58\u65F6\u95F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MaxBytes"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u6D88\u606F\u6570\u636E\u91CF"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MaxMsgs"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u6D88\u606F\u6570\u91CF"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MaxMsgSize"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MaxConsumers"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"NoAck"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u7981\u7528 ACK"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Rentention"}),(0,t.jsx)(e.td,{children:"LimitsPolicy"}),(0,t.jsx)(e.td,{children:"\u7559\u5B58\u7B56\u7565 - LimitsPolicy,InterestPolicy,WorkQueuePolicy"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Discard"}),(0,t.jsx)(e.td,{children:"DiscardOld"}),(0,t.jsx)(e.td,{children:"\u4E22\u5F03\u7B56\u7565 - DiscardNew,DiscardOld"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Duplicates"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{children:"\u53BB\u91CD\u65F6\u95F4\u7A97\u53E3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Sealed"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DenyDelete"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DenyPurge"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"AllowRollup"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]})]})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\u53BB\u91CD\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u57FA\u4E8E Nats-Msg-Id"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["stream\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["name - ",(0,t.jsx)(e.code,{children:"[^\\s.*>/]"})]}),"\n",(0,t.jsx)(e.li,{children:"duration, size, interest"}),"\n",(0,t.jsxs)(e.li,{children:["subjects\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6355\u83B7\u6240\u6709\u7684\u8FD9\u4E9B\u6D88\u606F\u5E76\u5B58\u50A8"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["client\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"pull/push"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.SERVER"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.INFO"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.$KV"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.$OBJ"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.STREAM.>"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.META.>"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.ACCOUNT.>"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.CONSUMER.>"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"$JS.API.DIRECT.>"})}),"\n",(0,t.jsxs)(e.li,{children:["domain \u901A\u8FC7\u6620\u5C04\u5B9E\u73B0\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"$JS.<DOMAIN>.API"})," -> ",(0,t.jsx)(e.code,{children:"$JS.API"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(e.h2,{id:"cannot-read-properties-of-undefined-reading-ack_policy",children:"Cannot read properties of undefined (reading ack_policy)"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ts",children:"await jsc.pullSubscribe('send.*', {\n  mack: true,\n  // \u5C11\u4E86 config\n  config: {\n    durable_name: 'agent',\n    ack_policy: AckPolicy.Explicit,\n    ack_wait: 10_000_000, // 10s\n  },\n});\n"})}),"\n",(0,t.jsx)(e.h2,{id:"invalid-stream-name---stream-name-cannot-contain-",children:"invalid stream name - stream name cannot contain :"}),"\n",(0,t.jsx)(e.p,{children:"nats \u53EF\u4EE5\u521B\u5EFA\uFF0C\u4F46\u662F nats.ws \u7528\u4E0D\u4E86"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/nats-io/nats.ws/issues/186",children:"nats.ws#186"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(o,{...n})}):o(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return l}});var r=s(75271);let t={},i=r.createContext(t);function l(n){let e=r.useContext(i);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);