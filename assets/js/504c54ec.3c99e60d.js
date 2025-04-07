"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["71711"],{62e3:function(n,e,i){i.r(e),i.d(e,{metadata:()=>l,contentTitle:()=>c,default:()=>o,assets:()=>t,toc:()=>h,frontMatter:()=>d});var l=JSON.parse('{"id":"devops/storage/block/raid","title":"RAID","description":"- RAID","source":"@site/../notes/devops/storage/block/raid.md","sourceDirName":"devops/storage/block","slug":"/devops/storage/block/raid","permalink":"/notes/devops/storage/block/raid","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/storage/block/raid.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"RAID"},"sidebar":"docs","previous":{"title":"NBD","permalink":"/notes/devops/storage/block/nbd"},"next":{"title":"Encryption","permalink":"/notes/devops/storage/encryption/"}}'),s=i("52676"),r=i("79938");let d={title:"RAID"},c="RAID",t={},h=[{value:"\u786C\u4EF6",id:"\u786C\u4EF6",level:2},{value:"\u5982\u4F55\u9009\u62E9 RAID",id:"\u5982\u4F55\u9009\u62E9-raid",level:2},{value:"\u9635\u5217\u5361 vs \u76F4\u901A\u5361",id:"\u9635\u5217\u5361-vs-\u76F4\u901A\u5361",level:2},{value:"JBOD vs HBA",id:"jbod-vs-hba",level:2},{value:"\u6545\u969C/\u635F\u574F/\u53EF\u7528",id:"\u6545\u969C\u635F\u574F\u53EF\u7528",level:2}];function a(n){let e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"raid",children:"RAID"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/RAID",children:"RAID"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Redundant Array of Independent Disks - \u72EC\u7ACB\u786C\u76D8\u5197\u4F59\u9635\u5217"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Standard_RAID_levels",children:"Standard_RAID_levels"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"RAID 0"}),"\n",(0,s.jsx)(e.li,{children:"RAID 1 - Mirror"}),"\n",(0,s.jsx)(e.li,{children:"RAID 2"}),"\n",(0,s.jsx)(e.li,{children:"RAID 3"}),"\n",(0,s.jsx)(e.li,{children:"RAID 4"}),"\n",(0,s.jsx)(e.li,{children:"RAID 5"}),"\n",(0,s.jsxs)(e.li,{children:["write hole\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"in which data and parity become inconsistent after a power loss"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"RAID 6"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Nested_RAID_levels",children:"Nested RAID levels"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"RAID 01 (RAID 0+1)"}),"\n",(0,s.jsx)(e.li,{children:"RAID 03 (RAID 0+3)"}),"\n",(0,s.jsx)(e.li,{children:"RAID 10 (RAID 1+0)"}),"\n",(0,s.jsx)(e.li,{children:"RAID 50 (RAID 5+0)"}),"\n",(0,s.jsx)(e.li,{children:"RAID 60 (RAID 6+0)"}),"\n",(0,s.jsx)(e.li,{children:"RAID 100 (RAID 10+0)"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Data_striping",children:"Data striping"})," - \u6570\u636E\u5206\u6761\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"segmenting logically sequential data, such as a file, so that consecutive segments are stored on different physical storage devices."}),"\n",(0,s.jsx)(e.li,{children:"\u589E\u52A0\u541E\u5410\u91CF"}),"\n",(0,s.jsx)(e.li,{children:"IO \u8D1F\u8F7D"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["archlinux ",(0,s.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/RAID",children:"RAID"})]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u4F7F\u7528\u65F6\u95F4\n# Power_On_Hours\nsmartctl --all /dev/sdj  | command grep -i Power\n\n# RM, HOTPLUG \u4E0D\u51C6\u786E\n# HOTPLUG - removable or hotplug device (usb, pcmcia, ...)\n# ROTA - rotatable\n# RM - removable\nlsblk -d -o NAME,MAJ:MIN,RM,HOTPLUG,MODEL,ROTA,TYPE,TRAN,SUBSYSTEMS,VENDOR\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u786C\u4EF6",children:"\u786C\u4EF6"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"JBOD - Just Bunch Of Disk - RAID \u5361\u7684\u4E00\u79CD\u6A21\u5F0F"}),"\n",(0,s.jsx)(e.li,{children:"HBA - Host Bus Adapter - \u76F4\u901A\u5361 - Dell HBA"}),"\n",(0,s.jsx)(e.li,{children:"IT - Initiator Target - LSI \u56FA\u4EF6\u80FD\u529B\uFF0C\u7C7B\u4F3C HBA"}),"\n",(0,s.jsx)(e.li,{children:"\u57FA\u4E8E IOC \u7684\u4EA7\u54C1\uFF0C\u4E00\u822C\u79F0\u4E3A HBA \u5361\uFF0C\u4E5F\u5C31\u662F\u5E38\u8BF4\u7684\u76F4\u8FDE\u5361\uFF0C\u4E00\u822C\u652F\u6301 Raid0/1/10/1E"}),"\n",(0,s.jsx)(e.li,{children:"\u57FA\u4E8E ROC \u7684\u4EA7\u54C1\uFF0C\u4E00\u822C\u79F0\u4E3A Raid \u5361\uFF0C\u4E00\u822C\u5E26\u6709\u7F13\u5B58\uFF0C\u652F\u6301 Raid0/1/10/1E/5/50/6/60\uFF0C\u53EF\u9009 BBU\uFF0C\u9644\u5E26\u7684\u9AD8\u7EA7\u8F6F\u4EF6\u5305\u62EC\uFF1ACacheCade\u3001FashPath\u3001SafeStore \u7B49"}),"\n",(0,s.jsx)(e.li,{children:"1064\u30011064e\u30011068\u30011068e\u30012008\u30012308\u30013008 \u5C5E\u4E8E IOC\uFF1B2108\u30012208 \u5C5E\u4E8E ROC\uFF1B"}),"\n",(0,s.jsx)(e.li,{children:"\u535A\u901A\u6536\u8D2D\u4E86 Mega LSI"}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://raid.wiki.kernel.org/index.php/Hardware_Raid_Setup_using_MegaCli",children:"Hardware Raid Setup using MegaCli"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://hwraid.le-vert.net/wiki/LSIMegaRAIDSAS",children:"LSI MegaRAID SAS"})}),"\n",(0,s.jsxs)(e.li,{children:["\u535A\u901A ",(0,s.jsx)(e.a,{href:"https://www.broadcom.com/products/storage/raid-controllers/",children:"RAID \u63A7\u5236\u5668"})]}),"\n",(0,s.jsxs)(e.li,{children:["\u535A\u901A ",(0,s.jsx)(e.a,{href:"https://www.broadcom.com/products/storage/host-bus-adapters/",children:"HAB"})]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.cisco.com/c/en/us/support/docs/servers-unified-computing/ucs-c-series-rack-servers/115020-intro-lsi-megacli-00.html",children:"Introduction to LSI's MegaCLI Utility"})}),"\n",(0,s.jsx)(e.li,{children:"ftp://download2.boulder.ibm.com/ecc/sar/CMA/XSA/ibm_utl_sraidmr_megacli-8.00.48_linux_32-64.zip"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.thomas-krenn.com/en/wiki/StorCLI",children:"Note that MegaCLI is now called StorCLI"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.thomas-krenn.com/en/download.html?product=12190",children:"MegaRAID"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://docs.broadcom.com/docs/12352476",children:"StorCLI Reference Manual"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"http://blog.51cto.com/mofesi/1309251",children:"Storcli \u5E38\u7528\u547D\u4EE4"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"./storcli64 show\n"})}),"\n",(0,s.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(e.h2,{id:"\u5982\u4F55\u9009\u62E9-raid",children:"\u5982\u4F55\u9009\u62E9 RAID"}),"\n",(0,s.jsx)(e.p,{children:"\u505A RAID \u9996\u5148\u8981\u8003\u8651\u76EE\u7684"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u6027\u80FD\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5229\u7528\u591A\u78C1\u76D8\u5E76\u53D1 IO"}),"\n",(0,s.jsx)(e.li,{children:"RAID 10"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u7A7A\u95F4\u5229\u7528\u7387\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u526F\u672C\u6570\u91CF"}),"\n",(0,s.jsx)(e.li,{children:"RAID 5"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53EF\u7528\u6027\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5141\u8BB8\u574F\u591A\u5C11\u786C\u76D8"}),"\n",(0,s.jsx)(e.li,{children:"RAID 6 - \u76EE\u524D\u4F7F\u7528\u8F83\u591A\uFF0C\u5B58\u50A8\u6210\u672C\u4F4E"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u5176\u6B21\u8FD8\u9700\u8981\u8003\u8651\u6709\u4EC0\u4E48\u786C\u4EF6\uFF0CSSD\u3001\u5927\u5BB9\u91CF 3.5 SATA\u3001\u5927\u5BB9\u91CF 3.5 SAS\u3001\u5C0F\u5BB9\u91CF 2.5 SAS\uFF0C\u786C\u4EF6\u4E0D\u540C\u53EF\u80FD\u5BFC\u81F4\u7EC4\u5EFA RAID \u7684\u65B9\u5F0F\u548C\u7ED3\u679C\u4E0D\u540C\u3002\n\u4E00\u822C\u4E3A\u4E86\u52A0\u901F RAID \u53EF\u80FD\u4F1A\u52A0 SSD \u6765\u505A\u65E5\u5FD7\u5B58\u50A8\u3002"}),"\n",(0,s.jsx)(e.p,{children:"\u7EC4\u5EFA RAID \u53EF\u80FD\u8FD8\u9700\u8981\u989D\u5916\u7684\u5185\u5B58\u548C CPU\uFF0C\u6839\u636E\u9700\u8981\u7684\u7279\u6027\u6765\u8FDB\u884C\u9009\u62E9"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["ZFS\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5360\u7528\u8F83\u591A\u5185\u5B58\uFF0C\u81F3\u5C11 1T 1G\uFF0C\u9ED8\u8BA4\u4F7F\u7528 50%"}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u4EE5\u8FDB\u884C LZ4 \u538B\u7F29\uFF0C\u4E0D\u5360\u7528\u592A\u591A CPU"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["mdadm\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E0D\u9700\u8981\u592A\u591A\u5185\u5B58"}),"\n",(0,s.jsx)(e.li,{children:"\u6CA1\u6709\u9644\u52A0\u7279\u6027"}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u5E73\u6ED1\u8FC1\u79FB"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u786C\u4EF6 - \u73B0\u5728\u5DF2\u7ECF\u4E0D\u63A8\u8350\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u65E0\u9700\u5185\u5B58"}),"\n",(0,s.jsx)(e.li,{children:"\u90E8\u5206 RAID \u5361\u81EA\u5E26\u7F13\u5B58"}),"\n",(0,s.jsx)(e.li,{children:"\u6CA1\u6709\u9644\u52A0\u7279\u6027"}),"\n",(0,s.jsx)(e.li,{children:"\u4E0E\u786C\u4EF6\u7ED1\u5B9A\uFF0C\u96BE\u4EE5\u76D1\u63A7\u7BA1\u7406\uFF0C\u5B58\u50A8\u4E0D\u6613\u8FC1\u79FB"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"\u9664\u4E86\u57FA\u7840\u7684 RAID \u80FD\u529B\uFF0C\u5982\u679C\u8FD8\u9700\u8981\u66F4\u591A\u7684\u9644\u52A0\u80FD\u529B\uFF0C\u5219\u4E0D\u5728\u666E\u901A RAID \u7684\u8303\u7574\u5185\uFF0C\u53EF\u8003\u8651 ZFS\uFF0C\u4F8B\u5982"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u589E\u91CF\u5907\u4EFD"}),"\n",(0,s.jsx)(e.li,{children:"\u5FEB\u7167"}),"\n",(0,s.jsx)(e.li,{children:"\u53BB\u91CD"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u9635\u5217\u5361-vs-\u76F4\u901A\u5361",children:"\u9635\u5217\u5361 vs \u76F4\u901A\u5361"}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsx)(e.p,{children:"\u8F6F RAID \u63A8\u8350\u4F7F\u7528\u76F4\u901A\u5361 HBA"}),"\n"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"JBOD \u6BD4 MD RAID0 \u5FEB\u7EA6 30%"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://tobert.github.io/post/2014-06-17-jbod-vs-raid.html",children:"JOBD vs RAID"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"jbod-vs-hba",children:"JBOD vs HBA"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["JBOD\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"RAID \u5361\u529F\u80FD"}),"\n",(0,s.jsx)(e.li,{children:"\u6A21\u7CCA\u4E86 HBA \u754C\u7EBF"}),"\n",(0,s.jsx)(e.li,{children:"\u5728\u6CA1\u6709 HBA \u5361\u7684\u65F6\u5019\u4F7F\u7528 RAID \u5361\u7684 JBOD \u8FBE\u5230\u76F8\u540C\u7684\u76EE\u7684"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["HBA\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F4\u901A\u5361"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u6545\u969C\u635F\u574F\u53EF\u7528",children:"\u6545\u969C/\u635F\u574F/\u53EF\u7528"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Annualized_failure_rate",children:"AFR"})," - Annualized failure rate\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5E74\u635F\u574F\u7387"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://www.backblaze.com/b2/hard-drive-test-data.html",children:"Hard Drive Data and Stats"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.backblaze.com/blog/backblaze-drive-stats-for-q1-2022/",children:"Backblaze Drive Stats for Q1 2022"})}),"\n"]}),"\n"]}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return d}});var l=i(75271);let s={},r=l.createContext(s);function d(n){let e=l.useContext(r);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:d(n.components),l.createElement(r.Provider,{value:e},n.children)}}}]);