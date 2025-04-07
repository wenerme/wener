"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["90391"],{26610:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>h,assets:()=>d,toc:()=>o,frontMatter:()=>l});var i=JSON.parse('{"id":"os/windows/README","title":"Windows","description":"- Awesome","source":"@site/../notes/os/windows/README.md","sourceDirName":"os/windows","slug":"/os/windows/","permalink":"/notes/os/windows/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/windows/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1727602505000,"frontMatter":{"title":"Windows"},"sidebar":"docs","previous":{"title":"wine","permalink":"/notes/os/virt/wine"},"next":{"title":"Batch","permalink":"/notes/os/windows/batch"}}'),r=s("52676"),t=s("79938");let l={title:"Windows"},c="Windows",d={},o=[{value:"\u7248\u672C",id:"\u7248\u672C",level:2},{value:"\u6FC0\u6D3B",id:"\u6FC0\u6D3B",level:2},{value:"KMS",id:"kms",level:3}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"windows",children:"Windows"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/os/windows/awesome",children:"Awesome"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/os/windows/faq",children:"FAQ"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://support.microsoft.com/en-us/help/13853/windows-lifecycle-fact-sheet",children:"Windows lifecycle fact sheet"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Windows 7, service pack 1* January 13, 2015 January 14, 2020"}),"\n",(0,r.jsx)(n.li,{children:"Windows 8.1 January 9, 2018 January 10, 2023"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# \u83B7\u53D6 bios \u4E32\u53F7\nwmic bios get serialnumber\n# \u901A\u8FC7 vbox \u4FEE\u6539\u4E32\u53F7\nVBoxManage setextradata "VM name" "VBoxInternal/Devices/pcbios/0/Config/DmiSystemSerial" "System Serial"\n# \u5982\u679C\u4E32\u53F7\u4E3A\u7EAF\u6570\u5B57,\u5E94\u8BE5\u518D\u7B7E\u540D\u52A0 string\nVBoxManage setextradata "VM name" "VBoxInternal/Devices/pcbios/0/Config/DmiSystemSerial" "string:1234"\n\n# \u83B7\u53D6\u6A21\u578B\u540D\nwmic csproduct get name\n# \u663E\u793A\u7F51\u5361 GUID\ngwmi win32_networkadapter -Property guid\nGet-WmiObject Win32_NetworkAdapter -Filter "netenabled = true" | Select Guid\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\u7248\u672C",children:"\u7248\u672C"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Windows_Server_2016",children:"Windows Server 2016"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"NanoServer"}),"\n",(0,r.jsx)(n.li,{children:"\u652F\u6301\u5BB9\u5668"}),"\n",(0,r.jsx)(n.li,{children:"\u652F\u6301\u65E0\u754C\u9762\u670D\u52A1"}),"\n",(0,r.jsx)(n.li,{children:"IIS 10 \u652F\u6301 HTTP/2"}),"\n",(0,r.jsx)(n.li,{children:"Windows PowerShell 5.0"}),"\n",(0,r.jsx)(n.li,{children:"Hyper-V \u652F\u6301\u7F51\u7EDC\u865A\u62DF\u5316"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u6FC0\u6D3B",children:"\u6FC0\u6D3B"}),"\n",(0,r.jsx)(n.h3,{id:"kms",children:"KMS"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/myanaloglife/py-kms",children:"py-kms"})," Python \u5B9E\u73B0\u7684 KMS \u670D\u52A1\u5668\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["py-kms \u6709\u5F88\u591A fork, \u66F4\u65B0\u7248\u672C\u7684\u9700\u8981\u627E fork \u7684\u5206\u652F,\u6211\u7684 fork ",(0,r.jsx)(n.a,{href:"https://github.com/wenerme/py-kms",children:"wenerme/py-kms"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/Wind4/vlmcsd",children:"vlmcsd"})," \u662F C \u7684\u5B9E\u73B0,\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 ",(0,r.jsx)(n.a,{href:"https://github.com/Wind4/vlmcsd/tree/master/floppy",children:"\u8F6F\u76D8"})," \u542F\u52A8\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4F7F\u7528 vbox \u542F\u52A8 KMS \u865A\u62DF\u673A,\u7F51\u7EDC\u4F7F\u7528\u6865\u63A5,\u786E\u4FDD\u7F51\u7EDC\u4E92\u901A"}),"\n",(0,r.jsxs)(n.li,{children:["\u53EF\u4EE5\u4F7F\u7528 docker \u542F\u52A8 ",(0,r.jsx)(n.code,{children:"docker run -d --name vlmcsd --net host muicoder/vlmcsd"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.7.html",children:"vlmcsd.7"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5305\u542B\u4E86\u5F88\u591A\u5E8F\u5217\u53F7"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.8.html",children:"vlmcsd.8"})}),"\n",(0,r.jsx)(n.li,{children:"\u7AEF\u53E3\u4E3A 1688, \u53EF\u4F7F\u7528 -P \u63A7\u5236"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"##########\n# Windows\n##########\n# Software Licensing Management Tool. Windows Activation and Key Management Service (KMS)\n# http://ss64.com/nt/slmgr.html\n# \u5148\u8BBE\u7F6E\u4E00\u4E2A\u79D8\u94A5\nslmgr /ipk CB7KF-BWN84-R7R2Y-793K2-8XDDG\n# \u4FEE\u6539\u4E3A\u81EA\u5DF1\u7684 KMS \u670D\u52A1\u5668, \u9ED8\u8BA4\u7AEF\u53E3\u4E3A 1688\nslmgr /skms 192.168.1.2\n# \u6FC0\u6D3B\nslmgr /ato\n# \u67E5\u770B\u7CFB\u7EDF\nslmgr /xpr\n# \u67E5\u770B\u6FC0\u6D3B\u72B6\u6001\nslmgr /dli\n\n##########\n# Office\n##########\n# \u5207\u6362\u5230\u5B89\u88C5\u76EE\u5F55\ncd C:\\Program Files\\Microsoft Office\\Office14# \u4FEE\u6539\u4E3A\u81EA\u5DF1\u7684 KMS \u5730\u5740\ncscript ospp.vbs /sethst:192.168.1.2\n# \u6FC0\u6D3B\ncscript ospp.vbs /act\n# \u67E5\u770B\u6FC0\u6D3B\u72B6\u6001\ncscript osbb.vbs /dstatus\n"})})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return l}});var i=s(75271);let r={},t=i.createContext(r);function l(e){let n=i.useContext(t);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);