"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["16616"],{12505:function(n,e,s){s.r(e),s.d(e,{metadata:()=>d,contentTitle:()=>r,default:()=>j,assets:()=>c,toc:()=>h,frontMatter:()=>l});var d=JSON.parse('{"id":"devops/storage/fs/README","title":"Filesystem","description":"- \u5728 Mac \u4E0B\u53EF\u901A\u8FC7\u865A\u62DF\u673A\u6765\u683C\u5F0F\u5316\u78C1\u76D8","source":"@site/../notes/devops/storage/fs/README.md","sourceDirName":"devops/storage/fs","slug":"/devops/storage/fs/","permalink":"/notes/devops/storage/fs/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/storage/fs/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"Filesystem"},"sidebar":"docs","previous":{"title":"LUKS","permalink":"/notes/devops/storage/encryption/luks"},"next":{"title":"DFS","permalink":"/notes/devops/storage/fs/dfs"}}'),t=s("52676"),i=s("79938");let l={title:"Filesystem"},r="Filesystem",c={},h=[{value:"\u57FA\u51C6\u6D4B\u8BD5",id:"\u57FA\u51C6\u6D4B\u8BD5",level:2},{value:"\u5E38\u7528\u64CD\u4F5C",id:"\u5E38\u7528\u64CD\u4F5C",level:2},{value:"diskutil",id:"diskutil",level:2},{value:"OS X",id:"os-x",level:2},{value:"\u7279\u6B8A\u7279\u6027",id:"\u7279\u6B8A\u7279\u6027",level:2},{value:"FAQ",id:"faq",level:2},{value:"disk vs rdisk on BSD",id:"disk-vs-rdisk-on-bsd",level:3},{value:"\u6587\u4EF6\u65F6\u95F4",id:"\u6587\u4EF6\u65F6\u95F4",level:3}];function x(n){let e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"filesystem",children:"Filesystem"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5728 Mac \u4E0B\u53EF\u901A\u8FC7\u865A\u62DF\u673A\u6765\u683C\u5F0F\u5316\u78C1\u76D8"}),"\n",(0,t.jsxs)(e.li,{children:["\u4F7F\u7528 ",(0,t.jsx)(e.a,{href:"https://rufus.akeo.ie/",children:"rufus"})," \u5236\u4F5C Windows \u542F\u52A8\u76D8"]}),"\n",(0,t.jsx)(e.li,{children:"CHS - \u67F1\u9762-\u78C1\u5934-\u6247\u533A - Cylinder-head-sector"}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/Solid_State_Drives",children:"Solid State Drives"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Flash_file_system",children:"Flash file system"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://unix.stackexchange.com/questions/198590",children:"https://unix.stackexchange.com/questions/198590"})}),"\n",(0,t.jsxs)(e.li,{children:["\u9488\u5BF9\u95EA\u5B58\u4F18\u5316\u7684\u6587\u4EF6\u7CFB\u7EDF\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"APFS"}),"\n",(0,t.jsx)(e.li,{children:"exFAT"}),"\n",(0,t.jsx)(e.li,{children:"F2FS"}),"\n",(0,t.jsx)(e.li,{children:"JFFS\u3001JFFS2"}),"\n",(0,t.jsx)(e.li,{children:"ZFS - \u5229\u7528 SSD \u7F13\u5B58\u3001\u65E5\u5FD7"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u865A\u62DF\u5316\u76F8\u5173\u7279\u6027\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["COW\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"btrfs, zfs"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["holes\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"ext2, ext3"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"Snapshot"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["XFS\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6162"}),"\n",(0,t.jsx)(e.li,{children:"\u57FA\u4E8E\u65E5\u5FD7"}),"\n",(0,t.jsx)(e.li,{children:"\u8DB3\u591F\u7A33\u5B9A,\u9002\u5408\u751F\u4EA7,\u4F7F\u7528\u6700\u4E3A\u5E7F\u6CDB"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Btrfs\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6700\u5FEB"}),"\n",(0,t.jsx)(e.li,{children:"CopyOnWrite"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301\u5199\u5FEB\u7167"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301 XATTRs \u548C inline data"}),"\n",(0,t.jsx)(e.li,{children:"\u652F\u6301\u70ED fsck"}),"\n",(0,t.jsx)(e.li,{children:"Ceph \u53EF\u540C\u65F6\u5199\u65E5\u5FD7\u548C\u5BF9\u8C61\u6570\u636E"}),"\n",(0,t.jsx)(e.li,{children:"\u6B63\u5728\u8D8B\u4E8E\u7A33\u70B9\u548C\u751F\u4EA7"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Ext4\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u9002\u5408\u751F\u4EA7"}),"\n",(0,t.jsx)(e.li,{children:"\u57FA\u4E8E\u65E5\u5FD7"}),"\n",(0,t.jsx)(e.li,{children:"\u6587\u4EF6\u540D\u6709\u957F\u5EA6\u9650\u5236"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/F2FS",children:"F2FS"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Linux \u5185\u6838\u652F\u6301 - v3.8 - 2010-12-20\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"5.6+ \u652F\u6301\u538B\u7F29 - LZO\u3001LZ4"}),"\n",(0,t.jsx)(e.li,{children:"5.7+ \u652F\u6301 zstd"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"\u9488\u5BF9 \u95EA\u5B58 \u4F18\u5316 - SSD\u3001TF\u3001USB"}),"\n",(0,t.jsx)(e.li,{children:"\u4E3B\u6D41 Android \u624B\u673A\u5747\u4F7F\u7528\u8BE5\u7CFB\u7EDF"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/List_of_cryptographic_file_systems",children:"List of cryptographic file systems"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/List_of_file_systems",children:"List of file systems"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Comparison_of_file_systems",children:"Comparison of file system"})}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://www.howtogeek.com/howto/33552/htg-explains-which-linux-file-system-should-you-choose/",children:"Which Linux File System Should You Use?"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5982\u679C\u4E0D\u786E\u5B9A\u5C31\u7528 EXT4"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://github.com/mhx/dwarfs",children:"mhx/dwarfs"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"fast high compression read-only file system"}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=32216275",children:"HN"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"N/A"}),(0,t.jsx)(e.th,{children:"Minix"}),(0,t.jsx)(e.th,{children:"Ext"}),(0,t.jsx)(e.th,{children:"Ext2"}),(0,t.jsx)(e.th,{children:"Xia"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Max FS size"}),(0,t.jsx)(e.td,{children:"64 MB"}),(0,t.jsx)(e.td,{children:"2 GB 4 TB 2 GB"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Max file size"}),(0,t.jsx)(e.td,{children:"64 MB"}),(0,t.jsx)(e.td,{children:"2 GB 2 GB 64 MB"}),(0,t.jsx)(e.td,{}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Max file name"}),(0,t.jsx)(e.td,{children:"16/30 c"}),(0,t.jsx)(e.td,{children:"255 c"}),(0,t.jsx)(e.td,{children:"255 c"}),(0,t.jsx)(e.td,{children:"248 c"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"3 times support"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"Yes"}),(0,t.jsx)(e.td,{children:"Yes"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Extensible"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"Yes"}),(0,t.jsx)(e.td,{children:"No"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Var. block size"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"No"}),(0,t.jsx)(e.td,{children:"Yes"}),(0,t.jsx)(e.td,{children:"No"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"fs"}),(0,t.jsx)(e.th,{children:"create"}),(0,t.jsx)(e.th,{children:"grow"}),(0,t.jsx)(e.th,{children:"shrink"}),(0,t.jsx)(e.th,{children:"move"}),(0,t.jsx)(e.th,{children:"copy"}),(0,t.jsx)(e.th,{children:"check"}),(0,t.jsx)(e.th,{children:"label"}),(0,t.jsx)(e.th,{children:"uuid"}),(0,t.jsx)(e.th,{children:"pkgs"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"btrfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"btrfs-progs/btrfs-tools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"exfat"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ext2"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"e2fsprogs"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ext2"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"e2fsprogs"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ext2"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"e2fsprogs"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"f2fs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"f2fs-tools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"fat16"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"dosfstools, mtools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"fat32"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"dosfstools, mtools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"hfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"hfsutils"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"hfs+"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"hfsutils"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"jfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"jfsutils"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"swap"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"util-linux"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"luks"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"cryptsetup, dmsetup"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"lvm2 pv"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"lvm2"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"minix"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"util-linux"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"nilfs2"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"nilfs-utils/nilfs-tools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ntfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"ntfs-3g/ntfsprogs"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"reiser4"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"reiser4progs"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"reiserfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"reiserfsprogs/reiserfs-utils"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"udf"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"udftools"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"xfs"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u274C"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"\u2705"}),(0,t.jsx)(e.td,{children:"xfsprogs, xfsdump"})]})]})]}),"\n",(0,t.jsx)(e.h2,{id:"\u57FA\u51C6\u6D4B\u8BD5",children:"\u57FA\u51C6\u6D4B\u8BD5"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# /dev/zero \u6700\u5FEB,\u4F46\u53EF\u80FD\u4F1A\u88AB\u538B\u7F29\ntime cat /dev/zero | head -c $((1024*1024*500)) > /dev/null\nreal	0m0.439s\nuser	0m0.026s\nsys	0m0.747s\n\n# /dev/urandom \u6027\u80FD\u8F83\u6162\ntime cat /dev/urandom | head -c $((1024*1024*500)) > /dev/null\nreal	1m25.427s\nuser	0m0.097s\nsys	1m25.713s\n\n# openssl \u968F\u673A\u6570\u76F8\u5BF9\u66F4\u5FEB\ntime openssl rand $((1024*1024*500)) | head -c $((1024*1024*500)) > /dev/null\nreal	0m9.721s\nuser	0m9.024s\nsys	0m1.284s\n\n# \u76D1\u63A7 IO \u72B6\u51B5\niostat -mx -d sda 1\n\ndd bs=16M count=64 if=test of=test1 conv=fdatasync\n\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://romanrm.net/dd-benchmark",children:"dd benchmark"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"\u5E38\u7528\u64CD\u4F5C",children:"\u5E38\u7528\u64CD\u4F5C"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# \u53EF\u67E5\u770B\u901F\u5EA6\npv /home/user/bigfile.iso | md5sum\n# 8.25 \u540E\u53EF\u67E5\u770B\u8FDB\u5EA6\ndd if=/dev/urandom of=/dev/null status=progress\n# urandom \u4F1A\u9650\u5236\u901F\u5EA6,\u53EF\u4EE5\u4F7F\u7528\u6587\u4EF6\u6765\u6D4B\u8BD5\ntruncat -s 10G test.data\ndd if=test.data of=/dev/null status=progress\n# \u4F3C\u4E4E\u4F1A\u66F4\u5FEB\npv < /dev/sda > /dev/sdb\n# \u4F7F\u7528 PV \u76D1\u63A7\u901F\u5EA6\ndd if=/dev/urandom | pv | dd of=/dev/null\n# \u7B80\u5355\u4E00\u70B9\npv bigfile.iso | dd of=VirtualDisk.raw\n# \u5728 DD \u6267\u884C\u4EE5\u540E\u4E5F\u53EF\u4EE5\u67E5\u770B\u8FDB\u5EA6\nkill -USR1 $(pgrep ^dd)\nwatch -n5 'kill -USR1 $(pgrep ^dd)'\n# \u5728 BSD/MAC \u4E0B\u9700\u8981 INFO\nkill -INFO $(pgrep ^dd$)\n# \u540C\u4E0A\u7B80\u5355\u4E00\u70B9\npkill -usr1 dd\n\n# \u5C06\u78C1\u76D8\u5236\u4F5C\u4E3A\u955C\u50CF\u6587\u4EF6\ndd if=/dev/sdb of=./disk.img\n# \u4ECE\u6587\u4EF6\u6062\u590D\u5230\u78C1\u76D8\ndd if=./disk.img of=/dev/sdb\n\n# \u6302\u8F7D smb\n# Windows \u5171\u4EAB\u65E0\u5BC6\u7801\u65F6\u4F7F\u7528 guest\nmount_smbfs //guest:guest@192.168.8.1/share/ ~/mnt/share/\n# \u6216\u8005\u6302\u8F7D cifs \u4E5F\u53EF\u4EE5\nmount -t cifs -o username=guest,password=guest //192.168.8.1/share/ ~/mnt/share/\n\n# \u5982\u679C\u4F7F\u7528\u7684\u73AF\u5883\u6CA1\u6709\u76F8\u5173\u7684 linux \u5DE5\u5177,\u53EF\u4EE5\u8003\u8651\u4F7F\u7528 docker\ndocker run --rm -it --privileged -v /:/host ubuntu\n\n"})}),"\n",(0,t.jsx)(e.h2,{id:"diskutil",children:"diskutil"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/diskutil.8.html",children:"diskutil.8"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"os-x",children:"OS X"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# \u76F8\u5F53\u4E8E fdisk -l\ndiskutil list\n# umount \u7ECF\u5E38\u65E0\u6CD5\u76F4\u63A5\u64CD\u4F5C\ndiskutil unmount /Volumes/<\u6302\u8F7D\u540D>\ndiskutil unmountdisk /dev/disk2\n# \u683C\u5F0F\u5316\u78C1\u76D8\ndiskutil eraseDisk HFS+ DISK disk2\n# \u78C1\u76D8\u5206\u533A\ndiskutil partitionDisk disk4 1 GPT HFS+ newdisk R\n\n# \u6DFB\u52A0 ext \u7C7B\u78C1\u76D8\u64CD\u4F5C\u5DE5\u5177\nbrew install e2fsprogs\nls `brew --prefix e2fsprogs`/sbin\n"})}),"\n",(0,t.jsx)(e.h2,{id:"\u7279\u6B8A\u7279\u6027",children:"\u7279\u6B8A\u7279\u6027"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["rename2\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"overlay \u4F9D\u8D56"}),"\n",(0,t.jsx)(e.li,{children:"zfs \u5C1A\u4E0D\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["clone\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"zfs \u5C1A\u4E0D\u652F\u6301"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(e.h3,{id:"disk-vs-rdisk-on-bsd",children:"disk vs rdisk on BSD"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.code,{children:"man hdiutil"})}),"\n",(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsx)(e.p,{children:'/dev/rdisk nodes are character-special devices, but are "raw" in the BSD sense and force block-aligned I/O. They are closer to the physical disk than the buffer cache. /dev/disk nodes, on the other hand, are buffered block-special devices and are used primarily by the kernel\'s filesystem code.'}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u5373 rdisk \u51E0\u4E4E\u662F\u76F4\u63A5\u8BBF\u95EE\u7269\u7406\u8BBE\u5907,disk \u8FD8\u4F1A\u7ECF\u8FC7\u7CFB\u7EDF\u7F13\u5B58.\u5728\u80FD\u4F7F\u7528 rdisk \u65F6\u4E0D\u4F7F\u7528 disk."}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"http://superuser.com/questions/631592",children:"http://superuser.com/questions/631592"})}),"\n",(0,t.jsx)(e.h3,{id:"\u6587\u4EF6\u65F6\u95F4",children:"\u6587\u4EF6\u65F6\u95F4"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["HN ",(0,t.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=12555160",children:"Linus on btime: \u201CLet\u2019s wait five years\u201D (2010)"})]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"\u65F6\u95F4\u7F29\u5199"}),(0,t.jsx)(e.th,{children:"\u5168\u79F0"}),(0,t.jsx)(e.th,{children:"\u8BF4\u660E"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"atime"}),(0,t.jsx)(e.td,{children:"Access Time"}),(0,t.jsx)(e.td,{children:"\u8BBF\u95EE\u65F6\u95F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ctime"}),(0,t.jsx)(e.td,{children:"Change Time"}),(0,t.jsx)(e.td,{children:"\u5F53\u8BBF\u95EE\u6743\u9650\u7B49\u4FEE\u6539\u65F6,\u4F1A\u4FEE\u6539\u8BE5\u65F6\u95F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"mtime"}),(0,t.jsx)(e.td,{children:"Modify Time"}),(0,t.jsx)(e.td,{children:"\u5F53\u4FEE\u6539\u6587\u4EF6\u5185\u5BB9\u65F6\u4F1A\u4FEE\u6539\u8BE5\u65F6\u95F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"btime"}),(0,t.jsx)(e.td,{children:"Birth Time"}),(0,t.jsx)(e.td,{children:"\u521B\u5EFA\u65F6\u95F4"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{style:{textAlign:"center"}}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"windows"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"linux"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"solaris"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"dragonfly"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"nacl"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"freebsd"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"darwin"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"netbsd"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"openbsd"}),(0,t.jsx)(e.th,{style:{textAlign:"center"},children:"plan9"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"atime"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"mtime"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"ctime"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713*"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"}})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"btime"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"n/a"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"n/a"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"n/a"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"n/a"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"},children:"\u2713"}),(0,t.jsx)(e.td,{style:{textAlign:"center"}}),(0,t.jsx)(e.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Windows XP \u4E0D\u652F\u6301 ctime, Vista \u4EE5\u4E0A\u652F\u6301."}),"\n",(0,t.jsxs)(e.li,{children:["\u53EF\u4F7F\u7528 ",(0,t.jsx)(e.code,{children:"stat \u6587\u4EF6\u540D"})," \u67E5\u770B"]}),"\n",(0,t.jsxs)(e.li,{children:["\u8BE5\u8868\u683C\u6458\u81EA ",(0,t.jsx)(e.a,{href:"https://github.com/djherbis/times#supported-times",children:"djherbis/times"})]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"$ stat sg_store.db\n  File: 'sg_store.db'\n  Size: 45056          	Blocks: 88         IO Block: 4096   regular file\nDevice: 1000004h/16777220d     	Inode: 45296478    Links: 1\nAccess: (0644/-rw-r--r--)  Uid: (  501/   root)   Gid: (   20/   root)\nAccess: 2016-09-22 15:26:54.000000000 +0800\nModify: 2016-09-22 15:26:54.000000000 +0800\nChange: 2016-09-22 15:27:20.000000000 +0800\n Birth: 2016-09-21 23:05:30.000000000 +0800\n\n# \u4FEE\u6539 mtime \u548C ctime\n$ touch sg_store.db\n# \u4FEE\u6539 ctime\n$ chown root:root sg_store.db\n"})})]})}function j(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(x,{...n})}):x(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return r},a:function(){return l}});var d=s(75271);let t={},i=d.createContext(t);function l(n){let e=d.useContext(i);return d.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),d.createElement(i.Provider,{value:e},n.children)}}}]);