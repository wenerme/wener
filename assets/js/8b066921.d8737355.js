"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["12619"],{89762:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>d,default:()=>x,assets:()=>c,toc:()=>o,frontMatter:()=>t});var i=JSON.parse('{"id":"os/linux/fs/f2fs","title":"f2fs","description":"- F2FS - Flash-Friendly File System","source":"@site/../notes/os/linux/fs/f2fs.md","sourceDirName":"os/linux/fs","slug":"/os/linux/fs/f2fs","permalink":"/notes/os/linux/fs/f2fs","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/fs/f2fs.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"f2fs"},"sidebar":"docs","previous":{"title":"ext4","permalink":"/notes/os/linux/fs/ext4"},"next":{"title":"file extname","permalink":"/notes/os/linux/fs/ext"}}'),l=s("52676"),r=s("79938");let t={title:"f2fs"},d="f2fs",c={},o=[];function h(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"f2fs",children:"f2fs"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["F2FS - Flash-Friendly File System\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"2012 by Samsung, Huawei, Google"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Linux 3.8+, Android 5.0+"}),"\n",(0,l.jsxs)(e.li,{children:["\u529F\u80FD\u7279\u6027\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u538B\u7F29"}),"\n",(0,l.jsx)(e.li,{children:"\u6587\u4EF6\u7EA7\u52A0\u5BC6"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u9002\u7528\u4E8E\u914D\u5907 FTL\uFF08Flash Translation Layer\uFF09\u7684 NAND \u95EA\u5B58\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u4E0E JFFS \u6216 UBIFS \u4E0D\u540C\uFF0C\u5B83\u4F9D\u8D56\u4E8E FTL \u6765\u5904\u7406\u5199\u5165\u5206\u5E03\u3002"}),"\n",(0,l.jsxs)(e.li,{children:["FTL\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4F5C\u7528\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5730\u5740\u6620\u5C04 - LBA -> PBA"}),"\n",(0,l.jsx)(e.li,{children:"\u5783\u573E\u56DE\u6536 - GC/Garbage Collection"}),"\n",(0,l.jsx)(e.li,{children:"\u78E8\u635F\u5747\u8861 - Wear Leveling"}),"\n",(0,l.jsx)(e.li,{children:"\u9519\u8BEF\u7BA1\u7406"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5E38\u89C1\u8BBE\u5907\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"SSD"}),"\n",(0,l.jsx)(e.li,{children:"eMMC"}),"\n",(0,l.jsx)(e.li,{children:"UFS"}),"\n",(0,l.jsx)(e.li,{children:"SD"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u539F\u59CB\u7684 NAND \u6CA1\u6709 FTL \u9700\u8981\u4F7F\u7528\u4E13\u95E8\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5982 JFFS2 \u6216 UBIFS\u3002"}),"\n",(0,l.jsxs)(e.li,{children:["vs ext4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["ext4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u652F\u6301 SSD \u4F18\u5316\u9009\u9879 discard, noatime"}),"\n",(0,l.jsx)(e.li,{children:"\u9002\u5408\u6DF7\u5408\u8D1F\u8F7D"}),"\n",(0,l.jsx)(e.li,{children:"\u968F\u673A\u5199\u5165\u6027\u80FD\u5728\u95EA\u5B58\u8BBE\u5907\u4E0A\u53EF\u80FD\u4E0D\u5982 f2fs"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["f2fs\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F7F\u7528 LSD/Log-structured Design \u4F18\u5316\u968F\u673A\u5199\u5165"}),"\n",(0,l.jsx)(e.li,{children:"\u51CF\u5C11\u5199\u653E\u5927\uFF0C\u63D0\u4F9B\u66F4\u597D\u7684\u5C0F\u6587\u4EF6\u5904\u7406\u80FD\u529B"}),"\n",(0,l.jsx)(e.li,{children:"\u6587\u4EF6\u788E\u7247\u66F4\u5C11"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["wikipedia ",(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/F2FS",children:"F2FS"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# MODEL SSD EMMC\nlsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT,MODEL\ndmesg | grep -i 'ftl|flash'\nsudo hdparm -I /dev/sdX\n"})})]})}function x(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return t}});var i=s(75271);let l={},r=i.createContext(l);function t(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);