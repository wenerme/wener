"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["94177"],{63464:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>c,toc:()=>a,frontMatter:()=>o});var t=JSON.parse('{"id":"os/linux/fs/zfs/zfs-postgresql","title":"PostgreSQL & ZFS","description":"- \u4E3A\u4EC0\u4E48\uFF1F","source":"@site/../notes/os/linux/fs/zfs/zfs-postgresql.md","sourceDirName":"os/linux/fs/zfs","slug":"/os/linux/fs/zfs/postgresql","permalink":"/notes/os/linux/fs/zfs/postgresql","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/fs/zfs/zfs-postgresql.md","tags":[{"inline":true,"label":"PostgreSQL","permalink":"/notes/tags/postgre-sql"},{"inline":true,"label":"Tuning","permalink":"/notes/tags/tuning"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1679060062000,"frontMatter":{"title":"PostgreSQL & ZFS","tags":["PostgreSQL","Tuning"]},"sidebar":"docs","previous":{"title":"ZFS Ops","permalink":"/notes/os/linux/fs/zfs/ops"},"next":{"title":"ZFS Snapshot","permalink":"/notes/os/linux/fs/zfs/snapshot"}}'),r=s("52676"),i=s("79938");let o={title:"PostgreSQL & ZFS",tags:["PostgreSQL","Tuning"]},l="PostgreSQL & ZFS",c={},a=[{value:"\u5F02\u6B65\u63D0\u4EA4",id:"\u5F02\u6B65\u63D0\u4EA4",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"postgresql--zfs",children:"PostgreSQL & ZFS"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u4E3A\u4EC0\u4E48\uFF1F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5229\u7528 ZFS \u5B58\u50A8\u7279\u6027 - \u5FEB\u7167\u3001\u6062\u590D\u3001\u514B\u9686\u3001\u538B\u7F29\u3001\u4E00\u81F4"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["PostgreSQL \u914D\u7F6E\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"full_page_writes"}),"\n",(0,r.jsx)(n.li,{children:"random_page_cost"}),"\n",(0,r.jsx)(n.li,{children:"effective_io_concurrency"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.slideshare.net/SeanChittenden/postgresql-zfs-best-practices",children:"postgresql-zfs-best-practices"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://gist.github.com/artizirk/e144065165b07dff1accc608c7e83f5a",children:"PostgreSQL optimize"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://gist.github.com/saurabhnanda/5258207935bf23cd112be292d22f00d5",children:"Tuning ZFS + Postgres to outperform EXT4 + Postgres"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"zfs create -o mountpoint=/data/ns/data-system/postgres \\\n  -o atime=off \\\n  -o primarycache=metadata \\\n  -o recordsize=16k \\\n  data/kube/data-system-postgres\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"postgresql.conf"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"# ZFS \u603B\u662F\u4E00\u81F4\u7684 - 2\u500D\u6027\u80FD\nfull_page_writes=false\n\n# ZFS \u53C2\u8003\nrandom_page_cost = 1\neffective_io_concurrency = 20\n\n# pgtune https://pgtune.leopard.in.ua/\n# SSD\nrandom_page_cost = 1.1\neffective_io_concurrency = 200\n# HDD\nrandom_page_cost = 4\neffective_io_concurrency = 2\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"zfs"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"atime = off\nrelatime = on\n# 2.0 \u540E\u53EF\u4EE5\u4F7F\u7528 zstd\n# CPU \u65F6\u95F4\u6362 IO \u65F6\u95F4\ncompression = lz4\n# db \u9ED8\u8BA4 8k, \u4F46\u538B\u7F29\u7387\u4F4E\nrecordsize = 128K\n# \u53EA\u7F13\u5B58\u5143\u6570\u636E - \u907F\u514D\u53CC\u4EFD\u6570\u636E\u7F13\u5B58\nprimarycache = metadata\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u5F02\u6B65\u63D0\u4EA4",children:"\u5F02\u6B65\u63D0\u4EA4"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u63A5\u53D7\u5F02\u5E38\u4E22\u5931\u90E8\u5206\u6570\u636E"}),"\n",(0,r.jsxs)(n.li,{children:["\u6362\u53D6 ",(0,r.jsx)(n.strong,{children:"20 \u500D"})," \u7684\u6027\u80FD"]}),"\n",(0,r.jsx)(n.li,{children:"\u9002\u7528\u4E8E \u6570\u4ED3\u573A\u666F\u6216\u5927\u91CF\u5199\u5165\u573A\u666F"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# 1s \u8D85\u65F6, \u6700\u591A\u4E22\u5931 1s \u6570\u636E\necho 1 > /sys/module/zfs/parameters/zfs_txg_timeout\necho 'options zfs zfs_txg_timeout=1' >> /etc/modprobe.d/zfs.conf\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"zfs"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"logbias=throughput\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"pg"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"# \u5173\u95ED\u540C\u6B65\u63D0\u4EA4\nsynchronous_commit = off\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return o}});var t=s(75271);let r={},i=t.createContext(r);function o(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);