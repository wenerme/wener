"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48135"],{785:function(n,s,e){e.r(s),e.d(s,{metadata:()=>i,contentTitle:()=>c,default:()=>x,assets:()=>t,toc:()=>h,frontMatter:()=>d});var i=JSON.parse('{"id":"os/windows/windows-faq","title":"Windows FAQ","description":"- mmc - Microsoft Management Console","source":"@site/../notes/os/windows/windows-faq.md","sourceDirName":"os/windows","slug":"/os/windows/faq","permalink":"/notes/os/windows/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/windows/windows-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1727602505000,"frontMatter":{"title":"Windows FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Windows \u73AF\u5883","permalink":"/notes/os/windows/env"},"next":{"title":"Windows FHS","permalink":"/notes/os/windows/fhs"}}'),l=e("52676"),r=e("79938");let d={title:"Windows FAQ",tags:["FAQ"]},c="Windows FAQ",t={},h=[{value:"Windows 11 \u65E0\u8D26\u53F7\u5B89\u88C5",id:"windows-11-\u65E0\u8D26\u53F7\u5B89\u88C5",level:2},{value:"Ports",id:"ports",level:2},{value:"tuntap",id:"tuntap",level:2},{value:"AD vs LDAP",id:"ad-vs-ldap",level:2},{value:"DC vs. AD - Domain Controllers vs. Active Directory",id:"dc-vs-ad---domain-controllers-vs-active-directory",level:2},{value:"Extending Shortcut Menus",id:"extending-shortcut-menus",level:2},{value:"\u65E0 Internet \u8BBF\u95EE",id:"\u65E0-internet-\u8BBF\u95EE",level:2},{value:"\u91CD\u7F6E",id:"\u91CD\u7F6E",level:3},{value:"\u5DE5\u5177",id:"\u5DE5\u5177",level:3},{value:"Workgroups vs. Domains",id:"workgroups-vs-domains",level:2},{value:"Windows 10 MDM vs Group Policy",id:"windows-10-mdm-vs-group-policy",level:2},{value:"Windows I/O \u6162",id:"windows-io-\u6162",level:2},{value:"runas admin",id:"runas-admin",level:2},{value:"MinGW vs Cygwin vs MSYS2",id:"mingw-vs-cygwin-vs-msys2",level:2}];function o(n){let s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.header,{children:(0,l.jsx)(s.h1,{id:"windows-faq",children:"Windows FAQ"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-shell",children:"eventvwr             # \u4E8B\u4EF6\u67E5\u770B\u5668\ntaskmgr              # \u4EFB\u52A1\u7BA1\u7406\u5668\ncmd                  # \u547D\u4EE4\u884C\ncontrol firewall.cpl # \u63A7\u5236\u9762\u677F -> \u9632\u706B\u5899\nwinver               # \u7248\u672C\nmsconfig             # \u7CFB\u7EDF\u914D\u7F6E\n\nwf.msc       # \u9AD8\u7EA7\u9632\u706B\u5899\nservices.msc # \u670D\u52A1\n"})}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"mmc - Microsoft Management Console"}),"\n",(0,l.jsx)(s.li,{children:".msc - Microsoft Common Console"}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"windows-11-\u65E0\u8D26\u53F7\u5B89\u88C5",children:"Windows 11 \u65E0\u8D26\u53F7\u5B89\u88C5"}),"\n",(0,l.jsxs)(s.ol,{children:["\n",(0,l.jsxs)(s.li,{children:["\u56FD\u5BB6\u9875\u9762 ",(0,l.jsx)(s.code,{children:"Shift-F11"})]}),"\n",(0,l.jsxs)(s.li,{children:["\u8F93\u5165 ",(0,l.jsx)(s.code,{children:"oobe\\BypassNRO"})]}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"\u4E5F\u53EF\u4EE5"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{children:"reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OOBE /v BypassNRO /t REG_DWORD /d 1 /f\nshutdown /r /t 0\n"})}),"\n",(0,l.jsxs)(s.ol,{start:"3",children:["\n",(0,l.jsx)(s.li,{children:"\u91CD\u542F\u540E\u65AD\u7F51\u5B89\u88C5"}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"ports",children:"Ports"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(s.table,{children:[(0,l.jsx)(s.thead,{children:(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.th,{children:"service"}),(0,l.jsx)(s.th,{children:"port"}),(0,l.jsx)(s.th,{children:"protocol"})]})}),(0,l.jsxs)(s.tbody,{children:[(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"Kerboros"}),(0,l.jsx)(s.td,{children:"88"}),(0,l.jsx)(s.td,{children:"TCP,UDP"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"LDAP"}),(0,l.jsx)(s.td,{children:"389"}),(0,l.jsx)(s.td,{children:"UDP"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"LDAP"}),(0,l.jsx)(s.td,{children:"636"}),(0,l.jsx)(s.td,{children:"TCP"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"LDAP"}),(0,l.jsx)(s.td,{children:"3268"}),(0,l.jsx)(s.td,{children:"TCP"})]})]})]}),"\n",(0,l.jsx)(s.h2,{id:"tuntap",children:"tuntap"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["openvpn \u63D0\u4F9B tuntap \u8BBE\u5907\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://build.openvpn.net/downloads/releases/",children:"https://build.openvpn.net/downloads/releases/"})}),"\n",(0,l.jsxs)(s.li,{children:["Windows 10 x64 \u53EF\u80FD\u9700\u8981 ",(0,l.jsx)(s.a,{href:"https://github.com/slackhq/nebula/issues/9#issuecomment-761974328",children:"\u4FEE\u6539\u6CE8\u518C\u8868"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u53EF\u4EE5\u4F7F\u7528 ",(0,l.jsx)(s.a,{href:"https://github.com/WireGuard/wintun",children:"WireGuard/wintun"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"GPL, wintun.h \u53EF\u4EE5\u662F MIT"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.a,{href:"https://github.com/slackhq/nebula/pull/289",children:"#289"})," nebula \u652F\u6301 wintun"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"ad-vs-ldap",children:"AD vs LDAP"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["LDAP\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u662F\u4E00\u4E2A\u6807\u51C6\u534F\u8BAE"}),"\n",(0,l.jsx)(s.li,{children:"\u57FA\u4E8E\u76EE\u5F55\u7684\u65B9\u5F0F\u8BBF\u95EE\u5B58\u50A8\u7684\u6570\u636E"}),"\n",(0,l.jsx)(s.li,{children:"\u672C\u8D28\u540E\u7AEF\u662F\u4E00\u4E2A\u6570\u636E\u5E93"}),"\n",(0,l.jsx)(s.li,{children:"LDAP \u662F\u4E0E\u6570\u636E\u5E93\u7684\u901A\u4FE1\u534F\u8BAE"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["AD\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u662F\u4E00\u4E2A\u79C1\u6709\u8F6F\u4EF6\u5E94\u7528"}),"\n",(0,l.jsx)(s.li,{children:"\u662F\u4E00\u4E2A\u6570\u636E\u5E93\uFF0C\u63D0\u9AD8\u4E86\u8BA4\u8BC1\uFF0C\u76EE\u5F55\uFF0C\u7B56\u7565\u7B49"}),"\n",(0,l.jsx)(s.li,{children:"\u652F\u6301 LDAP \u7684\u65B9\u5F0F\u8FDB\u884C\u4EA4\u4E92"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"dc-vs-ad---domain-controllers-vs-active-directory",children:"DC vs. AD - Domain Controllers vs. Active Directory"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"DC \u63D0\u4F9B AD \u670D\u52A1"}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"extending-shortcut-menus",children:"Extending Shortcut Menus"}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.a,{href:"https://docs.microsoft.com/en-us/windows/win32/shell/context",children:"https://docs.microsoft.com/en-us/windows/win32/shell/context"})}),"\n",(0,l.jsx)(s.h2,{id:"\u65E0-internet-\u8BBF\u95EE",children:"\u65E0 Internet \u8BBF\u95EE"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"win10 \u540E\u5927\u91CF\u51FA\u73B0"}),"\n",(0,l.jsxs)(s.li,{children:["NCSI - Network Connectivity Status Indicator\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["active probing\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"dns probe"}),"\n",(0,l.jsx)(s.li,{children:"http probe"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["passive probing\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u8BF7\u6C42\u7684\u5305\u7684 TTL - 8 hops \u8BA4\u4E3A\u8FDE\u901A - MinimumInternetHopCount"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u4F7F\u7528 \\HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\NlaSvc\\Parameters\\Internet \u914D\u7F6E\u7684\u503C\u68C0\u6D4B"}),"\n",(0,l.jsxs)(s.li,{children:["\u7F51\u7EDC\u72B6\u6001 \\HKLM\\Software\\Policies\\Microsoft\\Windows\\NetworkConnectivityStatusIndicator\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"NoActiveProvbe = 0"}),"\n",(0,l.jsx)(s.li,{children:"DisablePassivePolling = 1"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:"# \u6D4B\u8BD5 DNSProbe - \u8FD9\u4E2A\u76EE\u524D\u6CA1\u95EE\u9898\nnslookup dns.msftncsi.com\n"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-cmd",children:"Get-NetConnectionProfile\n"})}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u4FEE\u6539 EnableActiveProbing \u4E3A 1"}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"\u5F02\u5E38\u503C"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(s.table,{children:[(0,l.jsx)(s.thead,{children:(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.th,{children:"key"}),(0,l.jsx)(s.th,{children:"value"})]})}),(0,l.jsxs)(s.tbody,{children:[(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeContent"}),(0,l.jsx)(s.td,{children:"Microsoft Connect Test"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeHost"}),(0,l.jsx)(s.td,{children:(0,l.jsx)(s.a,{href:"http://www.msftconnecttest.com",children:"www.msftconnecttest.com"})})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeHostV6"}),(0,l.jsx)(s.td,{children:"ipv6.msftconnecttest.com"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbePath"}),(0,l.jsx)(s.td,{children:"connecttest.txt"})]})]})]}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:"curl www.msftconnecttest.com/connecttest.txt\n"})}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"\u4FEE\u6539\u4E3A"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(s.table,{children:[(0,l.jsx)(s.thead,{children:(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.th,{children:"key"}),(0,l.jsx)(s.th,{children:"value"})]})}),(0,l.jsxs)(s.tbody,{children:[(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeContent"}),(0,l.jsx)(s.td,{children:"Microsoft NCSI"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeHost"}),(0,l.jsx)(s.td,{children:(0,l.jsx)(s.a,{href:"http://www.msftncsi.com",children:"www.msftncsi.com"})})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbeHostV6"}),(0,l.jsx)(s.td,{children:"ipv6.msftncsi.com"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"ProbePath"}),(0,l.jsx)(s.td,{children:"ncsi.txt"})]})]})]}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:"# \u786E\u8BA4\u80FD\u901A\ncurl www.msftncsi.com/ncsi.txt\n"})}),"\n",(0,l.jsx)(s.h3,{id:"\u91CD\u7F6E",children:"\u91CD\u7F6E"}),"\n",(0,l.jsxs)(s.p,{children:["\u5C1D\u8BD5 ",(0,l.jsx)(s.code,{children:"netsh winsock reset"})]}),"\n",(0,l.jsx)(s.h3,{id:"\u5DE5\u5177",children:"\u5DE5\u5177"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://github.com/crazy-max/WindowsSpyBlocker",children:"crazy-max/WindowsSpyBlocker"})}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"workgroups-vs-domains",children:"Workgroups vs. Domains"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["workgroup\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u672A\u52A0\u5165 domain \u7684\u90FD\u5C5E\u4E8E\u4E00\u4E2A workgroup"}),"\n",(0,l.jsx)(s.li,{children:"\u672C\u5730\u5C40\u57DF\u7F51\u7684\u4E00\u7EC4\u7535\u8111 - \u6CA1\u6709\u63A7\u5236\u5173\u7CFB"}),"\n",(0,l.jsx)(s.li,{children:"\u7528\u4E8E \u6587\u4EF6 \u548C \u6253\u5370\u673A \u5171\u4EAB"}),"\n",(0,l.jsx)(s.li,{children:"\u9ED8\u8BA4 WORKGROUP"}),"\n",(0,l.jsx)(s.li,{children:"\u73B0\u5728\u4E0D\u9700\u8981\u5173\u5FC3"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["doamin\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u57DF\u7528\u4E8E\u63A7\u5236\u5927\u91CF\u7684\u7535\u8111"}),"\n",(0,l.jsx)(s.li,{children:"\u67D0\u79CD\u5C42\u9762\u9690\u542B\u8D22\u4EA7\u6240\u5C5E\u5173\u7CFB"}),"\n",(0,l.jsx)(s.li,{children:"\u7C7B\u4F3C MDM"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"windows-10-mdm-vs-group-policy",children:"Windows 10 MDM vs Group Policy"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["Group Policy\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u4F20\u7EDF"}),"\n",(0,l.jsx)(s.li,{children:"\u53EA\u80FD\u63A7\u5236\u52A0\u5165\u57DF\u7684\u8282\u70B9"}),"\n",(0,l.jsx)(s.li,{children:"\u8981\u6C42 Active Directory \u73AF\u5883"}),"\n",(0,l.jsx)(s.li,{children:"\u63D0\u4F9B\u66F4\u591A\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["MDM\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"Cloud first"}),"\n",(0,l.jsx)(s.li,{children:"MDM-enrolled \u673A\u5668"}),"\n",(0,l.jsx)(s.li,{children:"\u7C7B\u4F3C\u4E91\u73AF\u5883 Microsoft Azure"}),"\n",(0,l.jsx)(s.li,{children:"\u53EF\u4EE5\u52A0\u5165\u4E5F\u53EF\u4EE5\u4E0D\u52A0\u5165\u57DF\u63A7 - Active Directory vs Azure Active Directory"}),"\n",(0,l.jsx)(s.li,{children:"Intune GUI \u529F\u80FD\u8584\u5F31 - \u9700\u8981\u81EA\u5B9A\u4E49 Profile"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"windows-io-\u6162",children:"Windows I/O \u6162"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.a,{href:"https://github.com/Microsoft/WSL/issues/873#issuecomment-425272829",children:"https://github.com/Microsoft/WSL/issues/873#issuecomment-425272829"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u8BBE\u8BA1\u5C42\u9762"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.h2,{id:"runas-admin",children:"runas admin"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'# \u542F\u52A8 \u7BA1\u7406\u5458\u6743\u9650\u8FD0\u884C\u7684 cmd\npowershell -Command "Start-Process cmd -Verb RunAs"\n'})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-batch",children:'runas /savecred /user:Administrator "cmd.exe /C %CD%\\installer.cmd %CD%"\n'})}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"\u53EF\u80FD\u9700\u8981\u6FC0\u6D3B\u8D26\u53F7"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-batch",children:"net user Administrator /active:yes\n"})}),"\n",(0,l.jsx)(s.h2,{id:"mingw-vs-cygwin-vs-msys2",children:"MinGW vs Cygwin vs MSYS2"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["MinGW\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"GCC port \u5230 windows"}),"\n",(0,l.jsx)(s.li,{children:"\u76F4\u63A5\u6784\u5EFA Win32 \u5E94\u7528"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["Cygwin\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"POSIX \u73AF\u5883"}),"\n",(0,l.jsx)(s.li,{children:"\u4E2D\u95F4\u5C42"}),"\n",(0,l.jsx)(s.li,{children:"\u7F16\u8BD1\u540E\u7684\u7A0B\u5E8F\u9700\u8981 cygwin1.dll"}),"\n",(0,l.jsxs)(s.li,{children:["\u6574\u4E2A\u73AF\u5883 - cyglsa, cygserver, cygstart\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u5305\u542B\u4E86\u670D\u52A1\u7BA1\u7406\uFF0C\u8FDB\u7A0B\u7BA1\u7406\uFF0C\u8DEF\u5F84\u8F6C\u6362\u7B49"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["MSYS2\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["MinGW-w64+Cygwin\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u53BB\u6389\u4E86 Cygwin \u7684\u670D\u52A1\u7BA1\u7406"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.li,{children:"\u5F3A\u8C03\u6784\u5EFA Native Windows \u7A0B\u5E8F - \u4E0D\u4F9D\u8D56 cygwin1.dll"}),"\n",(0,l.jsx)(s.li,{children:"\u63D0\u4F9B\u591A\u79CD runtime"}),"\n",(0,l.jsxs)(s.li,{children:["msys2 \u6709 msys-2.0.dll\uFF0C\u4F5C\u7528\u7C7B\u4F3C\u4E8E cygwin1.dll\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:"\u63D0\u4F9B POSIX \u73AF\u5883"}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://www.msys2.org/wiki/How-does-MSYS2-differ-from-Cygwin/",children:"https://www.msys2.org/wiki/How-does-MSYS2-differ-from-Cygwin/"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function x(n={}){let{wrapper:s}={...(0,r.a)(),...n.components};return s?(0,l.jsx)(s,{...n,children:(0,l.jsx)(o,{...n})}):o(n)}},79938:function(n,s,e){e.d(s,{Z:function(){return c},a:function(){return d}});var i=e(75271);let l={},r=i.createContext(l);function d(n){let s=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(s):{...s,...n}},[s,n])}function c(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:d(n.components),i.createElement(r.Provider,{value:s},n.children)}}}]);