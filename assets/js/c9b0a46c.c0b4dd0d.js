"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66434"],{74493:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>t,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>d});var r=JSON.parse('{"id":"os/linux/fs/zfs/zfs-faq","title":"ZFS \u5E38\u89C1\u95EE\u9898","description":"- renameat2/overlayfs ZFS v2.2+","source":"@site/../notes/os/linux/fs/zfs/zfs-faq.md","sourceDirName":"os/linux/fs/zfs","slug":"/os/linux/fs/zfs/faq","permalink":"/notes/os/linux/fs/zfs/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/fs/zfs/zfs-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1714210316000,"frontMatter":{"title":"ZFS \u5E38\u89C1\u95EE\u9898","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"dRAID","permalink":"/notes/os/linux/fs/zfs/draid"},"next":{"title":"Inside","permalink":"/notes/os/linux/fs/zfs/inside"}}'),i=s("52676"),l=s("79938");let d={title:"ZFS \u5E38\u89C1\u95EE\u9898",tags:["FAQ"]},t="ZFS \u5E38\u89C1\u95EE\u9898",o={},c=[{value:"\u5982\u4F55\u9009\u62E9 RAIDZ/mirror/dRAID",id:"\u5982\u4F55\u9009\u62E9-raidzmirrordraid",level:2},{value:"\u4FEE\u590D",id:"\u4FEE\u590D",level:2},{value:"raidz1 to raidz2",id:"raidz1-to-raidz2",level:2},{value:"\u67E5\u770B\u5B9E\u9645\u5927\u5C0F",id:"\u67E5\u770B\u5B9E\u9645\u5927\u5C0F",level:2},{value:"\u76EE\u5F55\u4E0B\u5F88\u591A\u6587\u4EF6\u65F6\u975E\u5E38\u6162",id:"\u76EE\u5F55\u4E0B\u5F88\u591A\u6587\u4EF6\u65F6\u975E\u5E38\u6162",level:2},{value:"\u8BA1\u7B97\u4F7F\u7528\u7A7A\u95F4",id:"\u8BA1\u7B97\u4F7F\u7528\u7A7A\u95F4",level:2},{value:"zfs compression vs application compression",id:"zfs-compression-vs-application-compression",level:2},{value:"ZFS \u7F13\u5B58",id:"zfs-\u7F13\u5B58",level:2},{value:"ZFS \u6027\u80FD\u4F30\u7B97",id:"zfs-\u6027\u80FD\u4F30\u7B97",level:2},{value:"zfs import",id:"zfs-import",level:2},{value:"\u5173\u95ED\u6240\u6709 atime",id:"\u5173\u95ED\u6240\u6709-atime",level:2},{value:"atime=on temporary",id:"atimeon-temporary",level:2},{value:"zvol vs zfs",id:"zvol-vs-zfs",level:2},{value:"High System Usage",id:"high-system-usage",level:2},{value:"zfs list slow",id:"zfs-list-slow",level:2},{value:"ZFS vs Hard RAID",id:"zfs-vs-hard-raid",level:2},{value:"z0 is write-protected but explicit read-write mode requested",id:"z0-is-write-protected-but-explicit-read-write-mode-requested",level:2},{value:"Superblock needs_recovery flag is clear, but journal has data.",id:"superblock-needs_recovery-flag-is-clear-but-journal-has-data",level:2},{value:"is in use and contains a unknown filesystem",id:"is-in-use-and-contains-a-unknown-filesystem",level:2},{value:"zvol \u6269\u5BB9",id:"zvol-\u6269\u5BB9",level:2},{value:"cannot label &#39;sdf&#39;: failed to detect device partitions on &#39;/dev/sdf1&#39;: 19",id:"cannot-label-sdf-failed-to-detect-device-partitions-on-devsdf1-19",level:2},{value:"Missing /dev/zvol",id:"missing-devzvol",level:2},{value:"cannot trim: no devices in pool support trim operations",id:"cannot-trim-no-devices-in-pool-support-trim-operations",level:2},{value:"retry UNAVAL",id:"retry-unaval",level:2},{value:"remount zvol rw",id:"remount-zvol-rw",level:2},{value:"zfs destory container snapshots",id:"zfs-destory-container-snapshots",level:2},{value:"Feature Flags",id:"feature-flags",level:2},{value:"cannot create &#39;/data/db&#39;: pool must be upgraded to set this property or value",id:"cannot-create-datadb-pool-must-be-upgraded-to-set-this-property-or-value",level:2}];function a(e){let n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"zfs-\u5E38\u89C1\u95EE\u9898",children:"ZFS \u5E38\u89C1\u95EE\u9898"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["renameat2/overlayfs ZFS v2.2+\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/openzfs/zfs/commit/dbf6108b4df92341eea40d0b41792ac16eabc514",children:"zfs_rename: support RENAME_ flags"})}),"\n",(0,i.jsx)(n.li,{children:"feature zilsaxattr"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0D\u8981\u7528 ",(0,i.jsx)(n.code,{children:"/dev/z0"}),", \u7528 ",(0,i.jsx)(n.code,{children:"/dev/zvol/data/db"})," - zd0 \u53EF\u80FD\u4F1A\u53D8"]}),"\n"]})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"abbr."}),(0,i.jsx)(n.th,{children:"stand for"}),(0,i.jsx)(n.th,{children:"cn"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"SPA"}),(0,i.jsx)(n.td,{children:"Storage Pool Allocator"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"vdev"}),(0,i.jsx)(n.td,{children:"Virtual Device"}),(0,i.jsx)(n.td,{children:"\u865A\u62DF\u8BBE\u5907"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"ZIL"}),(0,i.jsx)(n.td,{children:"ZFS Intent Log"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"TXG"}),(0,i.jsx)(n.td,{children:"Transaction Group"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"SLOG"}),(0,i.jsx)(n.td,{children:"Sync Log"}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"ARC"}),(0,i.jsx)(n.td,{children:"Adaptive Replacement Cache"}),(0,i.jsx)(n.td,{children:"\u81EA\u9002\u5E94\u66FF\u6362\u7F13\u5B58"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"L2ARC"}),(0,i.jsx)(n.td,{children:"Level 2 ARC"}),(0,i.jsx)(n.td,{children:"\u4E8C\u7EA7 ARC"})]})]})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs get all | grep -E 'used\\b|logicalused|compression|\\bcompress'\n\nzfs get all | grep -E 'sync'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5982\u4F55\u9009\u62E9-raidzmirrordraid",children:"\u5982\u4F55\u9009\u62E9 RAIDZ/mirror/dRAID"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["RAIDZ - striped vdevs - RAID5/6/7\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["66%\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"3wide RADIZ1"}),"\n",(0,i.jsx)(n.li,{children:"6wide RADIZ2"}),"\n",(0,i.jsx)(n.li,{children:"9wide RADIZ3"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"N*W RAIDZx"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"N group"}),"\n",(0,i.jsx)(n.li,{children:"W wide"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u80FD/\u4E0D\u65B9\u4FBF \u6269\u5BB9"}),"\n",(0,i.jsx)(n.li,{children:"\u56FA\u5B9A parity"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["mirror - RAID10\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"50%"}),"\n",(0,i.jsx)(n.li,{children:"degraded \u6027\u80FD\u66F4\u597D"}),"\n",(0,i.jsx)(n.li,{children:"\u6062\u590D\u5FEB"}),"\n",(0,i.jsx)(n.li,{children:"\u6269\u5BB9\u65B9\u4FBF"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/notes/os/linux/fs/zfs/draid",children:"dRAID"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u66F4\u7075\u6D3B"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"\u53C2\u8003"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["2015 ",(0,i.jsx)(n.a,{href:"https://jrs-s.net/2015/02/06/zfs-you-should-use-mirror-vdevs-not-raidz/",children:"ZFS: You should use mirror vdevs, not RAIDZ."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["by Author of ",(0,i.jsx)(n.a,{href:"https://github.com/jimsalterjrs/sanoid",children:"jimsalterjrs/sanoid"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u4FEE\u590D",children:"\u4FEE\u590D"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# -t temporary \u91CD\u542F\u540E\u6062\u590D\nzpool offline main scsi-0000\nzpool replace main scsi-0000 scsi-1111\n\n# -e \u5982\u679C\u65B0\u7684\u786C\u76D8\u66F4\u5927\nzpool online main scsi-1111\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"resilver"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"group \u91CC\u5168\u90E8\u626B"}),"\n",(0,i.jsx)(n.li,{children:"\u4F1A\u5F88\u6162"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"raidz1-to-raidz2",children:"raidz1 to raidz2"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"\u4E0D\u53EF\u4EE5"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://serverfault.com/a/799952/190601",children:"https://serverfault.com/a/799952/190601"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u67E5\u770B\u5B9E\u9645\u5927\u5C0F",children:"\u67E5\u770B\u5B9E\u9645\u5927\u5C0F"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B\u538B\u7F29\u540E\u7684\u5927\u5C0F\ndu -h .\n# \u67E5\u770B\u5B9E\u9645\u5927\u5C0F\ndu --apparent-size -h .\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u76EE\u5F55\u4E0B\u5F88\u591A\u6587\u4EF6\u65F6\u975E\u5E38\u6162",children:"\u76EE\u5F55\u4E0B\u5F88\u591A\u6587\u4EF6\u65F6\u975E\u5E38\u6162"}),"\n",(0,i.jsx)(n.p,{children:"\u5C1D\u8BD5\u5173\u95ED atime"}),"\n",(0,i.jsx)(n.h2,{id:"\u8BA1\u7B97\u4F7F\u7528\u7A7A\u95F4",children:"\u8BA1\u7B97\u4F7F\u7528\u7A7A\u95F4"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["compressratio - \u538B\u7F29\u7387\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"1/compressratio = \u538B\u7F29\u6BD4"}),"\n",(0,i.jsx)(n.li,{children:"compressratio=logicalused/used"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"used - \u5B9E\u9645\u5360\u7528\u7A7A\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"logicalused - \u903B\u8F91\u5360\u7528\u7A7A\u95F4"}),"\n",(0,i.jsxs)(n.li,{children:["\u5360\u7528\u7A7A\u95F4\u4E5F\u548C\u4EC0\u4E48\u65F6\u5019\u5F00\u542F\u7684 compression \u6709\u5173\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5F00\u542F compression \u4E4B\u540E\u65B0\u5199\u5165\u6570\u636E\u4F1A\u538B\u7F29"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5360\u7528\u7A7A\u95F4\u4F1A\u5BF9\u9F50\uFF0C\u56E0\u6B64\u53EF\u80FD\u4F1A\u6BD4\u903B\u8F91\u66F4\u591A"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs get all | grep -E 'used\\b|logicalused|compression|\\bcompress'\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"data                 used                  884G                  -\ndata                 compressratio         1.47x                 -\ndata                 compression           lz4                   local\ndata                 logicalused           1.24T                 -\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zfs-compression-vs-application-compression",children:"zfs compression vs application compression"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["zfs \u538B\u7F29\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5168\u91CF\u538B\u7F29\uFF0C\u7B80\u5355\u6613\u7528"}),"\n",(0,i.jsx)(n.li,{children:"\u538B\u7F29\u7387\u53D7 block \u5927\u5C0F\u5F71\u54CD"}),"\n",(0,i.jsx)(n.li,{children:"\u652F\u6301 lz4\u3001zstd"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5E94\u7528 \u538B\u7F29\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6D89\u53CA\u5230\u5E94\u7528\u529F\u80FD\u662F\u5426\u652F\u6301"}),"\n",(0,i.jsxs)(n.li,{children:["\u538B\u7F29\u7684\u8303\u56F4\u548C ZFS \u538B\u7F29\u7684\u8303\u56F4\u4E0D\u540C\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E00\u822C\u5E94\u7528\u53EA\u538B\u7F29 \u6570\u636E"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u538B\u7F29\u7387 \u4E0D\u4E00\u5B9A\u5C31\u6BD4 ZFS \u538B\u7F29\u7387 \u9AD8"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["zfs vs pg\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["PostgreSQL 14 \u652F\u6301 LZ4 TOAST\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"default_toast_compression=lz4"}),"\n",(0,i.jsxs)(n.li,{children:["\u53EF\u4EE5\u5728\u5EFA\u8868\u65F6\u8BBE\u7F6E ",(0,i.jsx)(n.code,{children:"col1 text COMPRESSION lz4"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"PostgreSQL 15 \u652F\u6301 LZ4 WAL"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"zfs-\u7F13\u5B58",children:"ZFS \u7F13\u5B58"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"ZIL - ZFS Intent Log - \u7F13\u51B2 WRITE \u64CD\u4F5C"}),"\n",(0,i.jsxs)(n.li,{children:["SLOG - Separate Intent Log\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"zpool add tank log"})}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u9700\u8981\u7279\u522B\u5927\u7684\u8BBE\u5907 - \u4F8B\u5982 16G, 64G SSD \u8DB3\u77E3"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["ARC - \u7F13\u5B58 READ \u64CD\u4F5C - Adaptive Replacement Cache\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5185\u5B58"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["L2ARC\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"zpool add tank cache"})}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u9700\u8981\u7279\u522B\u5927\u7684\u8BBE\u5907 - \u4F8B\u5982 128G SSD"}),"\n",(0,i.jsx)(n.li,{children:"\u7CFB\u7EDF\u91CD\u542F\u540E\u7F13\u5B58\u4F9D\u7136\u53EF\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zpool add tank log ada3             # \u6DFB\u52A0 ZIL - \u5355\u78C1\u76D8\nzpool add tank log mirror ada3 ada4 # \u6DFB\u52A0 ZIL - RAID1 - \u574F\u4E00\u4E2A SSD \u5199\u5165\u7684\u6570\u636E\u4E5F\u4E0D\u4F1A\u4E22\nzpool add tank cache ada3           # \u6DFB\u52A0 L2ARC\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zfs-\u6027\u80FD\u4F30\u7B97",children:"ZFS \u6027\u80FD\u4F30\u7B97"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"\u8C03\u4F18\u5E94\u5148\u627E\u5230\u74F6\u9888\u5728\u54EA\u91CC\u3002"}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["RAIDZn \u987A\u5E8F 4KB \u8BFB\u53D6 - \u65E0 cache \u573A\u666F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["RAIDZ1 - ",(0,i.jsx)(n.code,{children:"N/(N-1) * IOPS"})]}),"\n",(0,i.jsxs)(n.li,{children:["RAIDZ2 - ",(0,i.jsx)(n.code,{children:"N/(N-2) * IOPS"})]}),"\n",(0,i.jsxs)(n.li,{children:["RAIDZ3 - ",(0,i.jsx)(n.code,{children:"N/(N-3) * IOPS"})]}),"\n",(0,i.jsx)(n.li,{children:"\u6709 cache \u65F6\uFF0C\u5219\u4E0A\u9650\u4E3A cache \u78C1\u76D8\u7684 IOPS"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5199\u5165\u6027\u80FD\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u65E0\u6CD5\u76F4\u63A5\u4F30\u7B97\uFF0Czfs \u5185\u90E8 zil \u4E3A\u5F02\u6B65\u5199\u5165"}),"\n",(0,i.jsx)(n.li,{children:"\u989D\u5916\u7684 ZIL \u8BBE\u5907\u53EF\u63D0\u5347 write \u6027\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u4F1A\u5728\u6BCF\u4E2A\u78C1\u76D8\u9884\u7559\u7A7A\u95F4\u5B58\u50A8 ZIL"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6027\u80FD\u5F71\u54CD\u56E0\u7D20\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"recordsize - \u9ED8\u8BA4 128k"}),"\n",(0,i.jsx)(n.li,{children:"compression"}),"\n",(0,i.jsx)(n.li,{children:"ashift"}),"\n",(0,i.jsx)(n.li,{children:"dedup - \u9ED8\u8BA4\u5173\u95ED - \u7279\u6B8A\u573A\u666F\u53BB\u91CD\u80FD\u63D0\u5347\u6027\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"atime - \u9ED8\u8BA4\u5F00\u542F - \u4E00\u822C\u4E0D\u9700\u8981\uFF0C\u53EF\u5173\u95ED\u63D0\u5347\u8BFB\u53D6\u6027\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"logbias - \u9ED8\u8BA4 latency, \u53EF\u8BBE\u7F6E\u4E3A throughput, \u51CF\u5C11\u4F7F\u7528\u989D\u5916 zil \u8BBE\u5907"}),"\n",(0,i.jsxs)(n.li,{children:["sync\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5173\u95ED\u6700\u591A\u4E22\u5931 30s \u6570\u636E - \u5982\u679C\u573A\u666F\u5141\u8BB8\u4E22\u5931\uFF0C\u5219\u4E0D\u5F71\u54CD"}),"\n",(0,i.jsx)(n.li,{children:"\u901A\u8FC7 UPS \u786E\u4FDD\u5B58\u50A8 \u6BD4 \u7F51\u7EDC\u540E\u5F02\u5E38 \u53EF\u8003\u8651\u5173\u95ED sync"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"primarycache"}),"\n",(0,i.jsx)(n.li,{children:"secondarycache"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"zfs-import",children:"zfs import"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6B63\u5E38\u7CFB\u7EDF\u542F\u52A8\u4F1A\u4ECE\u7F13\u5B58 \u5BFC\u5165 - zfs import -c /etc/zfs/zpool.cache"}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C\u7F13\u5B58\u4E22\u5931\uFF0C\u5219\u53EF\u4EE5\u76F4\u63A5\u641C\u7D22\u78C1\u76D8\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F8B\u5982: \u66F4\u6362\u4E86\u7CFB\u7EDF"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://openzfs.github.io/openzfs-docs/man/8/zpool-import.8.html",children:"zpool-import.8"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B \u53EF\u5BFC\u5165 \u7684 pool\n# \u4F7F\u7528 lsblk \u641C\u7D22\nzpool import\n# \u6267\u884C\u5BFC\u5165 - \u5BFC\u5165\u6240\u7684\nzpool import -a\n\n# \u624B\u52A8\u6307\u5B9A\u641C\u7D22\u76EE\u5F55\nzpool import -d /dev/disk/by-id\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5173\u95ED\u6240\u6709-atime",children:"\u5173\u95ED\u6240\u6709 atime"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs get atime | grep '\\son\\s' | cut -d ' ' -f 1 | xargs -n1 sudo zfs set atime=off\n"})}),"\n",(0,i.jsx)(n.h2,{id:"atimeon-temporary",children:"atime=on temporary"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://gitlab.alpinelinux.org/alpine/aports/-/issues/12382",children:"https://gitlab.alpinelinux.org/alpine/aports/-/issues/12382"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/openzfs/zfs/issues/7947",children:"https://github.com/openzfs/zfs/issues/7947"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",metastring:"title=/etc/conf.d/zfs",children:'MOUNT_EXTRA_OPTIONS="-o atime=off"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"zvol-vs-zfs",children:"zvol vs zfs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["zvol - \u5757\u8BBE\u5907\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"raidz\u3001\u538B\u7F29"}),"\n",(0,i.jsx)(n.li,{children:"\u6CA1\u6709\u6240\u6709 zfs \u4F34\u968F\u7684\u80FD\u529B"}),"\n",(0,i.jsx)(n.li,{children:"blocksize=8k"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["zfs - \u6587\u4EF6\u7CFB\u7EDF - dataset\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5FEB\u7167\u3001\u514B\u9686"}),"\n",(0,i.jsxs)(n.li,{children:["\u6587\u4EF6\u7CFB\u7EDF\u6709\u4E00\u5B9A\u7279\u6027 - \u4E5F\u6709\u7F3A\u9677\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.del,{children:"\u4E3B\u8981\u7F3A\u9677: \u4E0D\u652F\u6301 rename2/overlay"})," - ZFS v2.2+"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"recordsize=128k"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"high-system-usage",children:"High System Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"z_wr_iss"}),"\n",(0,i.jsx)(n.li,{children:"spl_dynamic_tas"}),"\n",(0,i.jsx)(n.li,{children:"z_wr_iss_h"}),"\n",(0,i.jsx)(n.li,{children:"l2arc_feed"}),"\n",(0,i.jsx)(n.li,{children:"z_wr_int_h"}),"\n",(0,i.jsx)(n.li,{children:"rcu_sched"}),"\n",(0,i.jsx)(n.li,{children:"txg_sync"}),"\n",(0,i.jsx)(n.li,{children:"z_ioctl_int"}),"\n",(0,i.jsx)(n.li,{children:"kworker/0:1-events"}),"\n",(0,i.jsx)(n.li,{children:"z_null_iss"}),"\n",(0,i.jsx)(n.li,{children:"z_null_int"}),"\n",(0,i.jsx)(n.li,{children:"dp_sync_taskq"}),"\n",(0,i.jsx)(n.li,{children:"z_wr_int"}),"\n",(0,i.jsx)(n.li,{children:"arc_reap"}),"\n",(0,i.jsx)(n.li,{children:"ksoftirqd"}),"\n",(0,i.jsx)(n.li,{children:"dbuf_evict"}),"\n",(0,i.jsx)(n.li,{children:"mmp"}),"\n",(0,i.jsx)(n.li,{children:"migration/0"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"zfs-list-slow",children:"zfs list slow"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["dataset \u591A\u4E86\u540E ",(0,i.jsx)(n.code,{children:"zfs list"})," \u975E\u5E38\u6162"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"time zfs list | wc -l\n\n# docker zfs volume \u4F7F\u7528\u7684\u547D\u4EE4\nzfs list -s name -o name,guid,available -H -p\nzfs list -r -t all -Hp -o name,origin,used,available,mountpoint,compression,type,volsize,quota,referenced,written,logicalused,usedbydataset main/docker\n\n# containerd\nzfs list -Hp -o name,origin,used,available,mountpoint,compression,type,volsize,quota,referenced,written,logicalused,usedbydataset data/var/k3s/snapshotter/60519\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"758\n\nreal    0m1.777s\nuser    0m0.177s\nsys     0m1.599s\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/openzfs/zfs/discussions/8898",children:"https://github.com/openzfs/zfs/discussions/8898"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"time zfs list -s name -o name,guid,available -H -p > zfs-list.txt\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"real    2m10.183s\nuser    0m3.016s\nsys     2m6.836s\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"wc -l zfs-list.txt\n# 20177 zfs-list.txt\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zfs-vs-hard-raid",children:"ZFS vs Hard RAID"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"ZFS \u6709\u6821\u9A8C\u548C,\u548C\u53EF\u907F\u514D\u4F4D\u7FFB\u8F6C\u7B49\u95EE\u9898,\u800C RAID \u4E3B\u8981\u7528\u4E8E\u907F\u514D\u6574\u4E2A\u78C1\u76D8\u7684\u635F\u574F"}),"\n",(0,i.jsx)(n.li,{children:"ZFS \u53EA\u9700\u8981 HBAs (host bus adapter ) \u800C\u4E0D\u9700\u8981 RAID \u63A7\u5236\u5668"}),"\n",(0,i.jsx)(n.li,{children:"\u6700\u591A\u53EA\u9700\u8981 Z2, Z3 \u5F88\u5C11\u4F7F\u7528,\u5E76\u4E14\u53EF\u80FD\u4F1A\u6709\u95EE\u9898,\u6709\u5176\u4ED6\u7684\u529E\u6CD5\u6765\u907F\u514D\u53EF\u80FD\u7684\u9519\u8BEF"}),"\n",(0,i.jsx)(n.li,{children:"ZFS \u5E76\u4E0D\u662F RAID, \u800C\u662F\u4E00\u4E2A\u8F6F\u4EF6,\u4E00\u4E2A\u6587\u4EF6\u7CFB\u7EDF"}),"\n",(0,i.jsx)(n.li,{children:"ZFS \u91CD\u5EFA\u6BD4 RAID \u66F4\u5FEB,\u4F8B\u5982 1TB \u7684\u4E91\u76D8,\u5B9E\u9645\u6570\u636E\u53EA\u6709 100MB, \u90A3\u4E48 ZFS \u53EA\u9700\u8981 100MB \u7684 IO, \u800C RAID \u9700\u8981 1TB \u7684 IO."}),"\n",(0,i.jsx)(n.li,{children:"scrub \u662F\u7528\u6765\u4FDD\u8BC1\u6570\u636E\u5B89\u5168\u7684,\u800C\u4E0D\u662F\u4FDD\u8BC1\u78C1\u76D8\u5065\u5EB7\u7684.\u4E0D\u662F\u81EA\u52A8\u7684,\u9700\u8981\u5B9A\u65F6\u8C03\u5EA6."}),"\n",(0,i.jsxs)(n.li,{children:["\u989D\u5916\u7279\u6027\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u81EA\u5B9A\u4E49\u5212\u5206\u5B58\u50A8\u7A7A\u95F4"}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u6839\u636E\u5E94\u7528\u8C03\u4F18"}),"\n",(0,i.jsx)(n.li,{children:"\u52A0\u5BC6"}),"\n",(0,i.jsx)(n.li,{children:"\u589E\u91CF\u540C\u6B65"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'"PFA"s, as in Pre-Failure Alerts'}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.reddit.com/r/storage/comments/3jcg2r/zfs_vs_raid6/",children:"ZFS vs RAID6"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"z0-is-write-protected-but-explicit-read-write-mode-requested",children:"z0 is write-protected but explicit read-write mode requested"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"umount /dev/z0\ne2fsck /dev/z0\nmount /dev/z0\n"})}),"\n",(0,i.jsx)(n.h2,{id:"superblock-needs_recovery-flag-is-clear-but-journal-has-data",children:"Superblock needs_recovery flag is clear, but journal has data."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Buffer I/O error on dev zd0, logical block 0, lost async page write\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"\u78C1\u76D8\u6EE1\u4E86"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs list -o space,mountpoint\n"})}),"\n",(0,i.jsx)(n.h2,{id:"is-in-use-and-contains-a-unknown-filesystem",children:"is in use and contains a unknown filesystem"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"mdraid, lvm, multipath"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cat /proc/mdstat\n\nmdadm --stop /dev/md127\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zvol-\u6269\u5BB9",children:"zvol \u6269\u5BB9"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs get volsize data/vol      # \u5F53\u524D\nzfs set volsize=500G data/vol # \u4FEE\u6539 Quota\nresize2fs /dev/zvol/data/vol  # \u6269\u5BB9 fs\n"})}),"\n",(0,i.jsx)(n.h2,{id:"cannot-label-sdf-failed-to-detect-device-partitions-on-devsdf1-19",children:"cannot label 'sdf': failed to detect device partitions on '/dev/sdf1': 19"}),"\n",(0,i.jsx)(n.h2,{id:"missing-devzvol",children:"Missing /dev/zvol"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"apk add zfs zfs-{scripts,udev}\n\nudevadm trigger\n"})}),"\n",(0,i.jsx)(n.h2,{id:"cannot-trim-no-devices-in-pool-support-trim-operations",children:"cannot trim: no devices in pool support trim operations"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zpool trim data\n\nhdparm -I /dev/sda | grep -i trim # \u68C0\u67E5 TRIM \u652F\u6301\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"SATA \u63A7\u5236\u5668"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/openzfs/zfs/discussions/14231",children:"https://github.com/openzfs/zfs/discussions/14231"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"L2ARC device is in use as a cache"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/openzfs/zfs/issues/13108",children:"https://github.com/openzfs/zfs/issues/13108"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"retry-unaval",children:"retry UNAVAL"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zpool online data DISK\nzpool clear data\nzpool scrube data # \u63A8\u8350\n"})}),"\n",(0,i.jsx)(n.h2,{id:"remount-zvol-rw",children:"remount zvol rw"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"mount -o remount,rw /data/docker\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"cache \u5F02\u5E38\u540E\u5BFC\u81F4 zvol \u88AB\u91CD\u65B0\u6302\u8F7D\u4E3A ro"}),"\n",(0,i.jsx)(n.li,{children:"clear cache \u7684 error \u540E\u8FD8\u662F\u65E0\u6CD5\u6302\u8F7D\uFF0C\u56E0\u4E3A fs \u635F\u574F"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ansi",children:"\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 5767264 starting block 14909936)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 14909936\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 5898267 starting block 11927556)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 11927556\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 5898258 starting block 20496389)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 20496389\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 5898266 starting block 2630818)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 2630818\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2919521 starting block 16194810)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 16194810\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 16194811\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 16194812\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 16194813\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2920494 starting block 14332529)\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493815)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 24493815\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493816)\x1b[0m\n\x1b[0;31mBuffer I/O error on device zd0, logical block 14332529\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 0, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 1, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 2, lost async page write\x1b[0m\n\x1b[0;33mEXT4-fs error (device zd0): \x1b[0;31;1mext4_check_bdev_write_error:217: comm kworker/u8:0: Error while async write back metadata\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0;31mprevious I/O error to superblock detected\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 5, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 6, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 8, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 1048588, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 1048589, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 1466067, lost async page write\x1b[0m\n\x1b[0;31mBuffer I/O error on dev zd0, logical block 1505175, lost async page write\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493838)\x1b[0m\n\x1b[0;33mEXT4-fs error (device zd0): \x1b[0;31;1mext4_check_bdev_write_error:217: comm VM Periodic Tas: Error while async write back metadata\x1b[0m\n\x1b[0;33mEXT4-fs warning (device zd0): \x1b[0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493839)\x1b[0m\n\x1b[0;31mAborting journal on device zd0-8.\x1b[0m\n\x1b[0;33mEXT4-fs error (device zd0) in ext4_convert_unwritten_io_end_vec:4859: \x1b[0;31;1mIO failure\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0mfailed to convert unwritten extents to written extents -- potential data loss!  (inode 2883634, error -5)\n\x1b[0;33mJBD2: \x1b[0;31mI/O error when updating journal superblock for zd0-8.\x1b[0m\n\x1b[0;33mEXT4-fs error (device zd0): \x1b[0;31;1mext4_journal_check_start:83: comm k3s-server: Detected aborted journal\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0;31mprevious I/O error to superblock detected\x1b[0m\n\x1b[0;33mEXT4-fs error (device zd0): \x1b[0;31;1mext4_journal_check_start:83: comm http-nio-8080-P: Detected aborted journal\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0;31mI/O error while writing superblock\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0;31;1mRemounting filesystem read-only\x1b[0m\n\x1b[0;33mEXT4-fs (zd0): \x1b[0;31mI/O error while writing superblock\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u505C\u6B62\u670D\u52A1\u81EA\u52A8\u542F\u52A8"}),"\n",(0,i.jsx)(n.li,{children:"reboot"}),"\n",(0,i.jsx)(n.li,{children:"fsck"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"umount /dev/zd0\nfsck -y /dev/zd0\nmount -a\n\n# ensure mount point working as expected\ntouch /data/docker/test\n\n# start service\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zfs-destory-container-snapshots",children:"zfs destory container snapshots"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zfs list > zfs.txt\n# main/1poezhz45yv210xqwve9vft0d\ngrep -E '^main/\\w{25}\\W' zfs.txt | cut -f 1 -d ' ' | xargs -n 1 sudo zfs destroy -r -R\n"})}),"\n",(0,i.jsx)(n.h2,{id:"feature-flags",children:"Feature Flags"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"zpool get all | grep feature@\nzpool upgrade -v\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'async_destroy                         (read-only compatible)\n     Destroy filesystems asynchronously.\nempty_bpobj                           (read-only compatible)\n     Snapshots use less space.\nlz4_compress\n     LZ4 compression algorithm support.\nmulti_vdev_crash_dump\n     Crash dumps to multiple vdev pools.\nspacemap_histogram                    (read-only compatible)\n     Spacemaps maintain space histograms.\nenabled_txg                           (read-only compatible)\n     Record txg at which a feature is enabled\nhole_birth\n     Retain hole birth txg for more precise zfs send\nextensible_dataset\n     Enhanced dataset functionality, used by other features.\nembedded_data\n     Blocks which compress very well use even less space.\nbookmarks                             (read-only compatible)\n     "zfs bookmark" command\nfilesystem_limits                     (read-only compatible)\n     Filesystem and snapshot limits.\nlarge_blocks\n     Support for blocks larger than 128KB.\nlarge_dnode\n     Variable on-disk size of dnodes.\nsha512\n     SHA-512/256 hash algorithm.\nskein\n     Skein hash algorithm.\nedonr\n     Edon-R hash algorithm.\nuserobj_accounting                    (read-only compatible)\n     User/Group object accounting.\nencryption\n     Support for dataset level encryption\nproject_quota                         (read-only compatible)\n     space/object accounting based on project ID.\ndevice_removal\n     Top-level vdevs can be removed, reducing logical pool size.\nobsolete_counts                       (read-only compatible)\n     Reduce memory used by removed devices when their blocks are freed or remapped.\nzpool_checkpoint                      (read-only compatible)\n     Pool state can be checkpointed, allowing rewind later.\nspacemap_v2                           (read-only compatible)\n     Space maps representing large segments are more efficient.\nallocation_classes                    (read-only compatible)\n     Support for separate allocation classes.\nresilver_defer                        (read-only compatible)\n     Support for deferring new resilvers when one is already running.\nbookmark_v2\n     Support for larger bookmarks\nredaction_bookmarks\n     Support for bookmarks which store redaction lists for zfs redacted send/recv.\nredacted_datasets\n     Support for redacted datasets, produced by receiving a redacted zfs send stream.\nbookmark_written\n     Additional accounting, enabling the written#<bookmark> property (space written since a bookmark), and estimates of send stream sizes for incrementals from bookmarks.\nlog_spacemap                          (read-only compatible)\n     Log metaslab changes on a single spacemap and flush them periodically.\nlivelist                              (read-only compatible)\n     Improved clone deletion performance.\ndevice_rebuild                        (read-only compatible)\n     Support for sequential mirror/dRAID device rebuilds\nzstd_compress\n     zstd compression algorithm support.\n'})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"right"},children:"flag"}),(0,i.jsx)(n.th,{children:"ver"}),(0,i.jsx)(n.th,{children:"for"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"zstd_compress"}),(0,i.jsx)(n.td,{children:"v2.1"}),(0,i.jsx)(n.td,{children:"zstd \u538B\u7F29\u7B97\u6CD5"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"draid"}),(0,i.jsx)(n.td,{children:"v2.1"}),(0,i.jsx)(n.td,{children:"\u652F\u6301\u5206\u5E03\u5F0F\u5907\u7528 RAID"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"zilsaxattr"}),(0,i.jsx)(n.td,{children:"v2.2"}),(0,i.jsx)(n.td,{children:"ZIL \u652F\u6301 xattr=sa \u6269\u5C55\u5C5E\u6027\u65E5\u5FD7"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"head_errlog"}),(0,i.jsx)(n.td,{children:"v2.2"}),(0,i.jsx)(n.td,{children:"per-dataset on-disk error logs"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"blake3"}),(0,i.jsx)(n.td,{children:"v2.2"}),(0,i.jsx)(n.td,{children:"BLAKE3 \u54C8\u5E0C\u7B97\u6CD5"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"block_cloning"}),(0,i.jsx)(n.td,{children:"v2.2"}),(0,i.jsx)(n.td,{children:"\u901A\u8FC7 Block Reference Table \u652F\u6301\u5757\u514B\u9686"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"right"},children:"vdev_zaps_v2"}),(0,i.jsx)(n.td,{children:"v2.2"}),(0,i.jsx)(n.td,{children:"\u652F\u6301 root vdev ZAP"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"cannot-create-datadb-pool-must-be-upgraded-to-set-this-property-or-value",children:"cannot create '/data/db': pool must be upgraded to set this property or value"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"sudo zpool upgrade -a\n"})})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return t},a:function(){return d}});var r=s(75271);let i={},l=r.createContext(i);function d(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);