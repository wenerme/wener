"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43675"],{29309:function(n,t,e){e.r(t),e.d(t,{metadata:()=>s,contentTitle:()=>d,default:()=>j,assets:()=>h,toc:()=>c,frontMatter:()=>r});var s=JSON.parse('{"id":"std/latency","title":"\u5EF6\u8FDF\u6570","description":"| type       | range          | for                        |","source":"@site/../notes/std/latency.md","sourceDirName":"std","slug":"/std/latency","permalink":"/notes/std/latency","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/std/latency.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717644328000,"frontMatter":{"title":"\u5EF6\u8FDF\u6570"},"sidebar":"docs","previous":{"title":"ISO 8601","permalink":"/notes/std/iso/8601"},"next":{"title":"Power","permalink":"/notes/std/power"}}'),l=e("52676"),i=e("79938");let r={title:"\u5EF6\u8FDF\u6570"},d="\u5EF6\u8FDF\u6570",h={},c=[{value:"Latency Comparison Numbers ~ 2012",id:"latency-comparison-numbers--2012",level:2},{value:"Misc",id:"misc",level:2},{value:"Unit",id:"unit",level:2},{value:"datacenter vs region vs zone vs vs cluster vs rack",id:"datacenter-vs-region-vs-zone-vs-vs-cluster-vs-rack",level:2}];function x(n){let t={a:"a",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.header,{children:(0,l.jsx)(t.h1,{id:"\u5EF6\u8FDF\u6570",children:"\u5EF6\u8FDF\u6570"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:"type"}),(0,l.jsx)(t.th,{children:"range"}),(0,l.jsx)(t.th,{children:"for"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u5373\u65F6\u54CD\u5E94"}),(0,l.jsx)(t.td,{children:"< 100ms"}),(0,l.jsx)(t.td,{children:"\u641C\u7D22\u81EA\u52A8\u8865\u5168\u3001\u6309\u94AE\u70B9\u51FB"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u6D41\u7545\u54CD\u5E94"}),(0,l.jsx)(t.td,{children:"100ms - 300ms"}),(0,l.jsx)(t.td,{children:"\u62D6\u62FD\u3001\u6EDA\u52A8\u3001\u9875\u9762\u3001\u5185\u5BB9\u52A0\u8F7D"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u53EF\u63A5\u53D7\u54CD\u5E94"}),(0,l.jsx)(t.td,{children:"300ms - 1000ms"}),(0,l.jsx)(t.td,{children:"\u4EA4\u4E92\u5F0F\u5E94\u7528\u3001\u63D0\u4EA4\u8868\u5355"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u8FC7\u957F\u54CD\u5E94"}),(0,l.jsx)(t.td,{children:"> 1000ms"}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.strong,{children:"\u7528\u6237\u4F1A\u611F\u5230\u5EF6\u8FDF"})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"VoIP"}),(0,l.jsx)(t.td,{children:"150ms - 300ms"}),(0,l.jsx)(t.td,{children:"\u8BED\u97F3\u901A\u8BDD"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"debounce"}),(0,l.jsx)(t.th,{children:"for"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"100-200ms"}),(0,l.jsx)(t.td,{children:"UI\u5143\u7D20\u7684\u4EA4\u4E92 - \u6ED1\u5757\u3001\u62D6\u52A8"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"200-500ms"}),(0,l.jsx)(t.td,{children:"\u8F7B\u91CF\u7EA7\u7684\u7528\u6237\u8F93\u5165 - \u641C\u7D22\u89E6\u53D1\u8BF7\u6C42"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"500-1000ms"}),(0,l.jsx)(t.td,{children:"\u6570\u636E\u5BC6\u96C6\u578B\u7684\u64CD\u4F5C - \u5B9E\u65F6\u6570\u636E\u6821\u9A8C"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:"Metric"}),(0,l.jsx)(t.th,{children:"Estimate"}),(0,l.jsx)(t.th,{children:"Metric Impact"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Wifi \u8FDE\u63A5\u5230\u4E92\u8054\u7F51\u7684\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"1-4ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"5G \u9AD8\u9891\u6BB5\uFF08\u6BEB\u7C73\u6CE2\uFF09\u8FDE\u63A5\u5230\u4E92\u8054\u7F51\u7684\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"1-5ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u6BCF\u5E27 60 \u5E27\u6BCF\u79D2\u7684\u7528\u6237\u7A7A\u95F4\u9884\u7B97"}),(0,l.jsx)(t.td,{children:"5-10ms"}),(0,l.jsx)(t.td,{children:"\u5E73\u6ED1\u5E27\u7387"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"5G \u4E2D\u9891\u6BB5\u8FDE\u63A5\u5230\u4E92\u8054\u7F51\u7684\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"10-30ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u4E0E\u540C\u4E00\u4E91\u533A\u57DF\u5185\u670D\u52A1\u6216\u6570\u636E\u5E93\u7684\u5F80\u8FD4\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"10ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"LTE \u8FDE\u63A5\u5230\u4E92\u8054\u7F51\u7684\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"15-50ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"60 \u5E27\u6BCF\u79D2\u7684\u5E27\u6301\u7EED\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"16ms"}),(0,l.jsx)(t.td,{children:"\u5E73\u6ED1\u5E27\u7387"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u4E0E\u540C\u4E00\u5927\u9646\u5176\u4ED6\u57CE\u5E02\u7684\u5F80\u8FD4\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"33ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u4EBA\u7C7B\u611F\u77E5\u5230\u65F6\u95F4\u6D41\u901D\u7684\u6700\u77ED\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"40-80ms"}),(0,l.jsx)(t.td,{children:"INP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u89E3\u6790 1MB CSS \u7684\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"100ms"}),(0,l.jsx)(t.td,{children:"FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u89E3\u6790 1MB HTML \u7684\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"120ms"}),(0,l.jsx)(t.td,{children:"FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"3G \u8FDE\u63A5\u5230\u4E92\u8054\u7F51\u7684\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"150ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u9AD8\u8D28\u91CF\u7F51\u7EDC\u5230\u5730\u7403\u53E6\u4E00\u7AEF\u7684\u5F80\u8FD4\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"150ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u89E3\u6790 1MB JS \u7684\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"150ms"}),(0,l.jsx)(t.td,{children:"FCP, LCP, INP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u4EBA\u7C7B\u611F\u77E5\u5230\u7684\u8FDF\u7F13\u65F6\u95F4"}),(0,l.jsx)(t.td,{children:"200ms"}),(0,l.jsx)(t.td,{children:"INP"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"\u65E0\u79DF\u7528\u5149\u7EA4\u5230\u5730\u7403\u53E6\u4E00\u7AEF\u7684\u5F80\u8FD4\u5EF6\u8FDF"}),(0,l.jsx)(t.td,{children:"300ms"}),(0,l.jsx)(t.td,{children:"TTFB, FCP, LCP"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:"abbr."}),(0,l.jsx)(t.th,{children:"for"}),(0,l.jsx)(t.th,{children:"cn"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"TTFB"}),(0,l.jsx)(t.td,{children:"Time To First Byte"}),(0,l.jsx)(t.td,{children:"\u9996\u5B57\u8282\u65F6\u95F4"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"FCP"}),(0,l.jsx)(t.td,{children:"First Contentful Paint"}),(0,l.jsx)(t.td,{children:"\u9996\u6B21\u5185\u5BB9\u7ED8\u5236"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"LCP"}),(0,l.jsx)(t.td,{children:"Largest Contentful Paint"}),(0,l.jsx)(t.td,{children:"\u6700\u5927\u5185\u5BB9\u7ED8\u5236"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"INP"}),(0,l.jsx)(t.td,{children:"Input Delay"}),(0,l.jsx)(t.td,{children:"\u8F93\u5165\u5EF6\u8FDF"})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["hot potato routing - \u65E0\u79DF\u7528\u5149\u7EA4 - \u7F51\u7EDC\u8FD0\u8425\u5546\u4F1A\u5C3D\u53EF\u80FD\u5FEB\u5730\u5C06\u6570\u636E\u5305\u4ECE\u81EA\u5DF1\u7684\u7F51\u7EDC\u4E2D\u79FB\u51FA\u5E76\u4F20\u9012\u7ED9\u4E0B\u4E00\u4E2A\u7F51\u7EDC\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u7279\u70B9\uFF1A\u5FEB\u901F\u79FB\u4EA4\uFF0C\u4F4E\u6210\u672C"}),"\n",(0,l.jsx)(t.li,{children:"\u95EE\u9898\uFF1A \u5BFC\u81F4\u66F4\u9AD8\u5EF6\u8FDF\uFF0C\u53EF\u80FD\u4F1A\u9009\u62E9\u6B21\u4F18\u8DEF\u5F84\u6765\u4F20\u9012"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["cold potato routing - \u9AD8\u8D28\u91CF\u7F51\u7EDC - \u5C3D\u53EF\u80FD\u957F\u65F6\u95F4\u5730\u5728\u81EA\u5DF1\u7684\u7F51\u7EDC\u4E2D\u4FDD\u6301\u6570\u636E\u5305\uFF0C\u7136\u540E\u518D\u5C06\u5176\u4F20\u9012\u7ED9\u4E0B\u4E00\u4E2A\u7F51\u7EDC\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u7279\u70B9\uFF1A \u5EF6\u8FDF\u79FB\u4EA4\u3001\u9AD8\u8D28\u91CF"}),"\n",(0,l.jsx)(t.li,{children:"\u95EE\u9898\uFF1A\u6210\u672C\u8F83\u9AD8"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://vercel.com/blog/latency-numbers-every-web-developer-should-know",children:"Latency numbers every frontend developer should know"})}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"latency-comparison-numbers--2012",children:"Latency Comparison Numbers ~ 2012"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["Interactive ",(0,l.jsx)(t.a,{href:"https://colin-scott.github.io/personal_website/research/interactive_latency.html",children:"Latency Numbers Every Programmer Should Know"})]}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://news.ycombinator.com/item?id=13530820",children:"HN"})}),"\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.a,{href:"https://gist.github.com/jboner/2841832",children:"Gist"})," ",(0,l.jsx)(t.a,{href:"https://gist.github.com/GLMeece/b00c9c97a06a957af7426b1be5bc8be6",children:"Neo"})]}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://www.youtube.com/watch?v=JEpsKnWZrJ8",children:"Grace Hopper explains Nanoseconds"})}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://wondernetwork.com/pings/",children:"Global Ping"})}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://computers-are-fast.github.io/",children:"https://computers-are-fast.github.io/"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:"computer latency"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"nano seconds"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"micro seconds"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"milliseconds"}),(0,l.jsx)(t.th,{children:"relative"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"L1 cache reference"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"0.5 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Branch mispredict"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"5.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"L2 cache reference"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"7.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{children:"14x L1 cache"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Mutex lock/unlock"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"25.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Main memory reference"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"100.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{children:"20x L2 cache, 200x L1 cache"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Compress 1K bytes with Zippy"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"3,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"3 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Send 1K bytes over 1 Gbps network"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"10,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"10 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Read 4K randomly from SSD"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"150,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"150 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{children:"~1GB/sec SSD"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Read 1 MB sequentially from memory"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"250,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"250 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"}}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Round trip within same datacenter"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"500,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"500 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"0.5 ms"}),(0,l.jsx)(t.td,{})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Read 1 MB sequentially from SSD"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1,000,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1,000 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1 ms"}),(0,l.jsx)(t.td,{children:"~1GB/sec SSD, 4X memory"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Disk seek"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"10,000,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"10,000 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"10 ms"}),(0,l.jsx)(t.td,{children:"20x datacenter roundtrip"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Read 1 MB sequentially from disk"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"20,000,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"20,000 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"20 ms"}),(0,l.jsx)(t.td,{children:"80x memory, 20X SSD"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"Send packet CA->Netherlands->CA"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"150,000,000.0 ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"150,000 us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"150 ms"}),(0,l.jsx)(t.td,{})]})]})]}),"\n",(0,l.jsx)(t.h2,{id:"misc",children:"Misc"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"common latency"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"ms"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"s"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"120 fps"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"8 ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1/120 s"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"60 fps"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"16 ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1/60 s"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"24 fps"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"41 ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"1/24 s"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"human lantency"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"ms"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"s"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"eye blink"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"100-150 ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"0.1-0.5 s"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"human reaction time"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"250 ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"0.25 s"})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"Nerve conduction velocity/\u795E\u7ECF\u4F20\u5BFC\u901F\u5EA6 ~ 40m/s"}),"\n",(0,l.jsx)(t.li,{children:"\u97F3\u901F - 343 m/s"}),"\n",(0,l.jsx)(t.li,{children:"\u5149\u901F - 299,792,458 m / s"}),"\n"]}),"\n",(0,l.jsx)(t.h2,{id:"unit",children:"Unit"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"unit"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"stand for"}),(0,l.jsx)(t.th,{children:"n"}),(0,l.jsx)(t.th,{style:{textAlign:"right"},children:"mean"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"ns"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"nano second"}),(0,l.jsx)(t.td,{children:"10^9"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"\u7EB3\u79D2"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"us"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"micro second"}),(0,l.jsx)(t.td,{children:"10^6"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"\u5FAE\u79D2"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"ms"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"milli second"}),(0,l.jsx)(t.td,{children:"10^3"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"\u6BEB\u79D2"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"s"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"second"}),(0,l.jsx)(t.td,{children:"1"}),(0,l.jsx)(t.td,{style:{textAlign:"right"},children:"\u79D2"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:"ns"}),(0,l.jsx)(t.th,{children:"us"}),(0,l.jsx)(t.th,{children:"ms"}),(0,l.jsx)(t.th,{children:"s"})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"1"}),(0,l.jsx)(t.td,{children:"10^-3"}),(0,l.jsx)(t.td,{children:"10^-6"}),(0,l.jsx)(t.td,{children:"10^-9"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"1000"}),(0,l.jsx)(t.td,{children:"1"}),(0,l.jsx)(t.td,{children:"10^-3"}),(0,l.jsx)(t.td,{children:"10^-6"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"10^6"}),(0,l.jsx)(t.td,{children:"1000"}),(0,l.jsx)(t.td,{children:"1"}),(0,l.jsx)(t.td,{children:"10^-3"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:"10^9"}),(0,l.jsx)(t.td,{children:"10^6"}),(0,l.jsx)(t.td,{children:"1000"}),(0,l.jsx)(t.td,{children:"1"})]})]})]}),"\n",(0,l.jsx)(t.h2,{id:"datacenter-vs-region-vs-zone-vs-vs-cluster-vs-rack",children:"datacenter vs region vs zone vs vs cluster vs rack"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["datacenter - dc\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u903B\u8F91\u673A\u623F"}),"\n",(0,l.jsx)(t.li,{children:"\u53EF\u80FD\u5728\u540C\u4E00\u4E2A region"}),"\n",(0,l.jsx)(t.li,{children:"\u76F8\u540C dc \u5185 < 1ms"}),"\n",(0,l.jsx)(t.li,{children:"\u76F8\u540C region \u5185 < 10ms"}),"\n",(0,l.jsxs)(t.li,{children:["\u4E0D\u540C region \u5219\u5EF6\u65F6\u4E0D\u786E\u5B9A - \u53EF\u80FD\u8DE8\u8D8A\u534A\u4E2A\u5730\u7403\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u4F4E\u5230 < 10ms"}),"\n",(0,l.jsx)(t.li,{children:"\u9AD8\u5230 > 300ms"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["cluster\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u903B\u8F91\u6982\u5FF5"}),"\n",(0,l.jsx)(t.li,{children:"\u901A\u5E38\u5728\u4E00\u4E2A dc"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["rack\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u4E0D\u540C\u670D\u52A1\u5668\u6700\u8FD1\u63A5\u8FD1\u7684\u5B9A\u4E49"}),"\n",(0,l.jsx)(t.li,{children:"\u76F8\u540C\u4EA4\u6362\u673A\u80CC\u677F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["region - \u533A\u57DF - \u7531\u591A\u4E2A\u5730\u533A\u7EC4\u6210\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u72EC\u7ACB\u5730\u7406\u4F4D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["zone - \u5730\u533A\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"\u6545\u969C\u7F51\u57DF"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://datastudio.google.com/reporting/fc733b10-9744-4a72-a502-92290f608571/page/70YCB",children:"Google Cloud Inter-Region Latency and Throughput"})}),"\n",(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.a,{href:"https://docs.google.com/spreadsheets/d/1lCUjdT-JNoATftGshtUIPQIl0CLb2Z8DCL-k8UAMtec/pubhtml",children:"https://docs.google.com/spreadsheets/d/1lCUjdT-JNoATftGshtUIPQIl0CLb2Z8DCL-k8UAMtec/pubhtml"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://geekflare.com/google-cloud-latency/",children:"https://geekflare.com/google-cloud-latency/"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:"https://gcping.com/",children:"https://gcping.com/"})}),"\n"]})]})}function j(n={}){let{wrapper:t}={...(0,i.a)(),...n.components};return t?(0,l.jsx)(t,{...n,children:(0,l.jsx)(x,{...n})}):x(n)}},79938:function(n,t,e){e.d(t,{Z:function(){return d},a:function(){return r}});var s=e(75271);let l={},i=s.createContext(l);function r(n){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof n?n(t):{...t,...n}},[t,n])}function d(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:r(n.components),s.createElement(i.Provider,{value:t},n.children)}}}]);