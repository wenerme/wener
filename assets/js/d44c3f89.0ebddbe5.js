"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["64879"],{94702:function(n,e,i){i.r(e),i.d(e,{metadata:()=>l,contentTitle:()=>c,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>t});var l=JSON.parse('{"id":"os/linux/network/iptables","title":"IPTables","description":"- SNAT","source":"@site/../notes/os/linux/network/iptables.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/iptables","permalink":"/notes/os/linux/network/iptables","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/iptables.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1724402050000,"frontMatter":{"title":"IPTables"},"sidebar":"docs","previous":{"title":"iptables \u89C4\u5219","permalink":"/notes/os/linux/network/iptables-rule"},"next":{"title":"IPVS","permalink":"/notes/os/linux/network/ipvs"}}'),s=i("52676"),r=i("79938");let t={title:"IPTables"},c="IPTable",d={},a=[{value:"empty",id:"empty",level:2},{value:"Notes",id:"notes",level:2},{value:"How to do the port forwarding from one ip to another ip in same network?",id:"how-to-do-the-port-forwarding-from-one-ip-to-another-ip-in-same-network",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"iptable",children:"IPTable"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["SNAT\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Source NAT"}),"\n",(0,s.jsx)(e.li,{children:"\u5185\u90E8\u8BBF\u95EE\u5916\u90E8"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["NAT/DNAT\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Destination NAT"}),"\n",(0,s.jsx)(e.li,{children:"\u5916\u90E8\u8BBF\u95EE\u5185\u90E8"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u64CD\u4F5C\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"-A \u8FFD\u52A0"}),"\n",(0,s.jsx)(e.li,{children:"-C \u68C0\u67E5"}),"\n",(0,s.jsx)(e.li,{children:"-D \u5220\u9664"}),"\n",(0,s.jsx)(e.li,{children:"-I \u63D2\u5165"}),"\n",(0,s.jsx)(e.li,{children:"-R \u66FF\u6362"}),"\n",(0,s.jsx)(e.li,{children:"-L \u5217\u8868"}),"\n",(0,s.jsx)(e.li,{children:"-S \u5217\u8868 - \u8F93\u51FA\u7ED3\u679C\u7C7B\u4F3C\u4E8E iptables-save\uFF0C\u7ED3\u679C\u53EF\u4EE5\u88AB\u89E3\u6790"}),"\n",(0,s.jsx)(e.li,{children:"-F \u6E05\u7A7A"}),"\n",(0,s.jsx)(e.li,{children:"-Z \u91CD\u7F6E\u8BA1\u6570"}),"\n",(0,s.jsx)(e.li,{children:"-N \u521B\u5EFA Chain"}),"\n",(0,s.jsx)(e.li,{children:"-X \u5220\u9664 Chain"}),"\n",(0,s.jsx)(e.li,{children:"-P \u4E3A Chain \u8BBE\u7F6E\u76EE\u6807 - ACCEPT DROP REJECT"}),"\n",(0,s.jsx)(e.li,{children:"-E \u91CD\u547D\u540D Chain"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u6761\u4EF6 - \u652F\u6301 ",(0,s.jsx)(e.code,{children:"!"})," \u53D6\u53CD\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["-p \u534F\u8BAE all, tcp, udp, udplite, icmp, esp, ah, sctp \u6D3B\u7740 ",(0,s.jsx)(e.code,{children:"/etc/protocols "})," \u4E2D\u7684\u6570\u5B57"]}),"\n",(0,s.jsxs)(e.li,{children:["-s \u6765\u6E90\u5730\u5740 ",(0,s.jsx)(e.code,{children:"address[/mask]"})]}),"\n",(0,s.jsx)(e.li,{children:"-d \u76EE\u6807\u5730\u5740"}),"\n",(0,s.jsx)(e.li,{children:"-j \u8DF3\u8F6C\u5230\u76EE\u6807 - \u505C\u6B62\u5904\u7406\u5F53\u524D Chain - \u5185\u5EFA\u76EE\u6807\u6216\u8005\u6269\u5C55"}),"\n",(0,s.jsx)(e.li,{children:"-g \u524D\u5F80\u5230 Chain - \u7EE7\u7EED\u5904\u7406"}),"\n",(0,s.jsxs)(e.li,{children:["-i \u8FDB\u5165\u7684\u7F51\u53E3 - INPUT, FORWARD, PREROUTING - \u7F51\u53E3\u540D\u5B57\u5982\u679C\u4E3A ",(0,s.jsx)(e.code,{children:"eth+"})," \u5219\u4F1A\u5339\u914D eth \u524D\u7F00"]}),"\n",(0,s.jsx)(e.li,{children:"-o \u51FA\u53BB\u7684\u7F51\u53E3 - FORWARD, OUTPUT, POSTROUTING"}),"\n",(0,s.jsx)(e.li,{children:"-f \u89C4\u5219\u53EA\u4F1A\u5904\u7406\u7B2C\u4E8C\u4E2A\u548C\u4E4B\u540E\u7684 fragmented packets, \u4F8B\u5982 ICMP"}),"\n",(0,s.jsx)(e.li,{children:"--src-type \u6765\u6E90\u5730\u5740\u7C7B\u578B"}),"\n",(0,s.jsx)(e.li,{children:"--dst-type \u76EE\u6807\u5730\u5740\u7C7B\u578B"}),"\n",(0,s.jsxs)(e.li,{children:["--connbytes ",(0,s.jsx)(e.code,{children:"from[:to]"})," \u5339\u914D\u5305\u5927\u5C0F"]}),"\n",(0,s.jsx)(e.li,{children:"--ctstate \u94FE\u63A5\u72B6\u6001"}),"\n",(0,s.jsx)(e.li,{children:"--ctproto \u5339\u914D 4 \u5C42\u534F\u8BAE"}),"\n",(0,s.jsxs)(e.li,{children:["--src-range ",(0,s.jsx)(e.code,{children:"from[-to]"})," \u6765\u6E90\u5730\u5740\u8303\u56F4"]}),"\n",(0,s.jsxs)(e.li,{children:["--dst-range ",(0,s.jsx)(e.code,{children:"from[-to]"})," \u76EE\u6807\u5730\u5740\u8303\u56F4"]}),"\n",(0,s.jsx)(e.li,{children:"--ipvs \u5C5E\u4E8E IPVS \u7684\u94FE\u63A5"}),"\n",(0,s.jsx)(e.li,{children:"--vproto VIP \u534F\u8BAE"}),"\n",(0,s.jsx)(e.li,{children:"--vaddr VIP \u5730\u5740"}),"\n",(0,s.jsx)(e.li,{children:"--vport VIP \u7AEF\u53E3"}),"\n",(0,s.jsxs)(e.li,{children:["--vmethod ",(0,s.jsx)(e.code,{children:"{GATE|IPIP|MASQ}"})," IPVS \u8F6C\u53D1\u65B9\u6CD5"]}),"\n",(0,s.jsx)(e.li,{children:"--vportctl \u63A7\u5236\u7AEF\u53E3 - \u4F8B\u5982 FTP \u662F 21"}),"\n",(0,s.jsxs)(e.li,{children:["--length ",(0,s.jsx)(e.code,{children:"length[:length]"})," \u5339\u914D 3 \u5C42\u7684\u5305\u957F\u5EA6 - length \u6A21\u5757"]}),"\n",(0,s.jsxs)(e.li,{children:["--limit ",(0,s.jsx)(e.code,{children:"rate[/second|/minute|/hour|/day]"})," \u8FBE\u5230\u9650\u6D41\u540E\u4F1A\u5339\u914D - limit \u6A21\u5757"]}),"\n",(0,s.jsx)(e.li,{children:"--limit-burst \u9650\u6D41\u5CF0\u503C \u9ED8\u8BA4 5"}),"\n",(0,s.jsx)(e.li,{children:"--mac-source MAC \u5730\u5740\u5339\u914D"}),"\n",(0,s.jsxs)(e.li,{children:["--mark ",(0,s.jsx)(e.code,{children:"value[/mask]"})," \u5339\u914D netfilter \u7684 mark \u5B57\u6BB5"]}),"\n",(0,s.jsxs)(e.li,{children:["--source-ports/--sports ",(0,s.jsx)(e.code,{children:"port[,port|,port:port]"})," \u5339\u914D\u6765\u6E90\u7AEF\u53E3"]}),"\n",(0,s.jsx)(e.li,{children:"--destination-ports/--dports \u76EE\u6807\u7AEF\u53E3"}),"\n",(0,s.jsx)(e.li,{children:"--ports \u76EE\u6807\u548C\u6765\u6E90\u7AEF\u53E3"}),"\n",(0,s.jsxs)(e.li,{children:["--uid-owner ",(0,s.jsx)(e.code,{children:"username/userid[-userid]"})]}),"\n",(0,s.jsxs)(e.li,{children:["--gid-owner ",(0,s.jsx)(e.code,{children:"groupname/groupid[-groupid]"})]}),"\n",(0,s.jsx)(e.li,{children:"--socket-exists \u5305\u5173\u8054\u5230 socket"}),"\n",(0,s.jsx)(e.li,{children:"--rateest-lt \u9891\u7387\u5C0F\u4E8E"}),"\n",(0,s.jsx)(e.li,{children:"--rateest-gt \u9891\u7387\u5927\u4E8E"}),"\n",(0,s.jsx)(e.li,{children:"--probability \u6982\u7387\u5339\u914D"}),"\n",(0,s.jsx)(e.li,{children:"--every \u6BCF N \u5305\u5339\u914D"}),"\n",(0,s.jsx)(e.li,{children:"--string \u6A21\u5F0F\u5339\u914D"}),"\n",(0,s.jsx)(e.li,{children:"--hex-string \u6A21\u5F0F\u5339\u914D"}),"\n",(0,s.jsx)(e.li,{children:"--source-port,--sport \u6765\u6E90\u7AEF\u53E3"}),"\n",(0,s.jsx)(e.li,{children:"--destination-port,--dport \u76EE\u6807\u7AEF\u53E3"}),"\n",(0,s.jsx)(e.li,{children:"--tcp-flags \u5339\u914D TCP \u6807\u8BB0"}),"\n",(0,s.jsx)(e.li,{children:"--syn \u5339\u914D SYN"}),"\n",(0,s.jsx)(e.li,{children:"--tcp-option number \u5339\u914D TCP \u9009\u9879"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u52A8\u4F5C\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["--set-mark ",(0,s.jsx)(e.code,{children:"value[/mask]"})," \u8BBE\u7F6E mark"]}),"\n",(0,s.jsx)(e.li,{children:"--save-mark [--mask mask] \u4FDD\u5B58 mark"}),"\n",(0,s.jsx)(e.li,{children:"--restore-mark [--mask mask] \u6062\u590D mark"}),"\n",(0,s.jsx)(e.li,{children:"--notrack \u5173\u95ED\u94FE\u63A5\u8DDF\u8E2A"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.admonition,{type:"tip",children:(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"SDNAT \u52A1\u5FC5\u9650\u5B9A\u6765\u6E90\u5730\u5740\u6216\u7F51\u53E3"}),"\n",(0,s.jsx)(e.li,{children:"DNAT \u52A1\u5FC5\u9650\u5B9A\u76EE\u6807\u5730\u5740\u6216\u7F51\u53E3 - \u5426\u5219\u5168\u91CF\u66FF\u6362\u4E0D\u4E00\u5B9A\u662F\u671F\u671B\u7ED3\u679C"}),"\n",(0,s.jsx)(e.li,{children:"\u5904\u7406\u7684\u662F\u8FDE\u7EED\u7684\u88AB\u8DDF\u8E2A\u7684\u5305\uFF0C\u800C\u4E0D\u662F\u79BB\u6563\u7684 - conntrack"}),"\n",(0,s.jsx)(e.li,{children:"nat \u53EA\u4F1A\u5904\u7406\u8FDE\u63A5\u7684\u7B2C\u4E00\u5305"}),"\n"]})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u64CD\u4F5C\u5BF9\u8C61 Table/Chain\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["filter - \u9ED8\u8BA4\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"INPUT - \u76EE\u6807\u662F\u672C\u5730\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"FORWARD - \u8DEF\u7531\u7ECF\u8FC7\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"OUTPUT - \u672C\u5730\u751F\u6210\u7684\u5305"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["nat - \u5F53\u521B\u5EFA\u65B0\u7684\u5305\u65F6\u4F1A\u4F7F\u7528\u8BE5\u8868\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"PREROUTING - \u4FEE\u6539\u8FDB\u5165\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"OUTPUT - \u5728\u8DEF\u7531\u4E4B\u524D\u4FEE\u6539\u672C\u5730\u751F\u6210\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"POSTROUTING - \u4FEE\u6539\u51FA\u53BB\u7684\u5305"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["mangle - \u7528\u4E8E\u7279\u6B8A\u5305\u4FEE\u6539\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"PREROUTING - \u5728\u8DEF\u7531\u524D \u4FEE\u6539\u8FDB\u5165\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"OUTPUT - \u5728\u8DEF\u7531\u524D \u4FEE\u6539\u672C\u5730\u751F\u6210\u7684\u5305"}),"\n",(0,s.jsx)(e.li,{children:"INPUT - packets coming into the box itself"}),"\n",(0,s.jsx)(e.li,{children:"FORWARD - packets being routed through the box"}),"\n",(0,s.jsx)(e.li,{children:"POSTROUTING - altering packets as they are about to go out"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["raw - \u4E3B\u8981\u7528\u4E8E\u914D\u5408 NOTRACK \u4F7F\u7528\uFF0C\u5728\u6240\u6709 IP \u8868\u4E4B\u524D\u5904\u7406\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"PREROUTING - packets arriving via any network interface"}),"\n",(0,s.jsx)(e.li,{children:"OUTPUT - packets generated by local processes"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"security - \u7528\u4E8E Mandatory Access Control \u7F51\u7EDC\u89C4\u5219\uFF0CSELinux"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/Lochnair/xt_tls",children:"Lochnair/xt_tls"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301 SNI \u5339\u914D\u7684\u6269\u5C55"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"\u5904\u7406\u6D41"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"        IN                                             OUT\n         +                                              ^\n         |                                              |\n         |                                              |\n+--------v--------+                            +-----------------+\n|PREROUTING       |                            |POSTROUTING      |\n| nat             |                            | nat             |\n| mangle          |                            | raw             |\n| raw             |                            | mangle          |\n+-----------------+     +----------------+     +--------^--------+\n         |              |FORWARD         |              |\n         +--------------\x3e filter         +--------------+\n     localhost          | mangle         |              |\n+-----------------+     +----------------+     +-----------------+\n|INPUT            |                            |OUTPUT           |\n| filter          |                            | filter          |\n| mangle          +---------\x3e LOCAL +---------\x3e+ nat             |\n|                 |                            | mangle          |\n|                 |                            | raw             |\n+-----------------+                            +-----------------+\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u91CD\u7F6E iptables\n# ===============\n# \u8BBE\u7F6E\u9ED8\u8BA4\u7B56\u7565\u4E3A ACCEPT\niptables -P INPUT ACCEPT\niptables -P FORWARD ACCEPT\niptables -P OUTPUT ACCEPT\niptables -t nat -F\niptables -t mangle -F\n# \u5220\u9664\u89C4\u5219\niptables -F\n# \u5220\u9664\u989D\u5916 CHAIN\niptables -X\n# \u91CD\u7F6E counter\niptables -Z\n\n# -C --check \u68C0\u6D4B\u662F\u5426\u5B58\u5728\niptables -C FORWARD -i eth0 -j ACCEPT\n# \u4EE5\u524D\u7684\u68C0\u6D4B\u65B9\u5F0F\niptables-save | grep -- \"-A INPUT -p tcp -m tcp --dport 8080 -j ACCEPT\"\n\n# \u67E5\u770B\u72B6\u6001\niptables -nvL\n\n# \u67E5\u770B\u6240\u6709\u89C4\u5219\n# -c \u5305\u542B\u5305\u548C\u5B57\u8282\u8BA1\u6570\n# -t \u6307\u5B9A\u8868\niptables-save\n# \u7EAF\u89C4\u5219 - \u4FBF\u4E8E\u8FDB\u884C diff\niptables-save | grep -v '^#' | sed -r 's/(^:[^[]]+).*/\\1[0:0]/'\n# \u6392\u9664\u89C4\u5219 - \u6392\u9664 libvirt \u76F8\u5173\u89C4\u5219\niptables-save | grep -v LIBVIRT\n# \u5E38\u7528\nipts() { iptables-save \"$@\" | grep -v '^#' | sed -r 's/(^:[^[]]+).*/\\1[0:0]/' | grep -v LIBVIRT | grep -i -v DOCKER; }\n\n# \u67E5\u770B nat \u8DEF\u7531\u8868\niptables -t nat -v -L -n --line-number\n# \u663E\u793A PREROUTING \u8868\niptables -t nat -v -L PREROUTING -n --line-number\n# \u663E\u793A POSTROUTING \u8868\niptables -t nat -v -L POSTROUTING -n --line-number\n# \u901A\u8FC7\u884C\u53F7\u5220\u9664\u89C4\u5219\niptables -t nat -D POSTROUTING 3\n# \u89C4\u5219\u5904\u7406\u7EDF\u8BA1\niptables -t nat -L -v\niptables -t nat -A POSTROUTING -s 10.0.0.0/24 ! -d 10.0.0.0/24 -j MASQUERADE\n\n# \u8BBE\u7F6E\u5907\u6CE8\niptables -A INPUT -i eth1 -m comment --comment \"my local LAN\"\n\n# ICMP \u7684\u5E2E\u52A9 - \u652F\u6301 --icmp-type\niptables -p icmp -h\n"})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"NAT \u8868"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"NIC +----\x3e PREROUTING +-------------------\x3e Local\n              +                 ^\n              |                 |\n              |                 |\n              v                 +\nNIC <----+ POSTROUTING <----+ OUTPUT <----+ Local\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["iptables-save\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["debian\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"/etc/iptables/rules.v6"}),"\n",(0,s.jsx)(e.li,{children:"/etc/iptables/rules.v4"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"iptables-restore < /etc/iptables/rules.v4"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"netfilter-persistent save|reload"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"empty",children:"empty"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"*mangle\n:PREROUTING ACCEPT [8:584]\n:INPUT ACCEPT [8:584]\n:FORWARD ACCEPT [0:0]\n:OUTPUT ACCEPT [6:616]\n:POSTROUTING ACCEPT [6:616]\nCOMMIT\n*nat\n:PREROUTING ACCEPT [0:0]\n:INPUT ACCEPT [0:0]\n:OUTPUT ACCEPT [0:0]\n:POSTROUTING ACCEPT [0:0]\nCOMMIT\n*filter\n:INPUT ACCEPT [8:584]\n:FORWARD ACCEPT [0:0]\n:OUTPUT ACCEPT [11:1432]\nCOMMIT\n"})}),"\n",(0,s.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,s.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(e.h2,{id:"how-to-do-the-port-forwarding-from-one-ip-to-another-ip-in-same-network",children:"How to do the port forwarding from one ip to another ip in same network?"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://serverfault.com/q/586486/190601",children:"https://serverfault.com/q/586486/190601"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://torguard.net/knowledgebase.php?action=displayarticle&id=239",children:"https://torguard.net/knowledgebase.php?action=displayarticle&id=239"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://unix.stackexchange.com/questions/499791/is-there-any-way-to-view-nfmark-like-ctmark",children:"https://unix.stackexchange.com/questions/499791/is-there-any-way-to-view-nfmark-like-ctmark"})}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return t}});var l=i(75271);let s={},r=l.createContext(s);function t(n){let e=l.useContext(r);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:t(n.components),l.createElement(r.Provider,{value:e},n.children)}}}]);