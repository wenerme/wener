"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["31634"],{38338:function(n,e,i){i.r(e),i.d(e,{metadata:()=>t,contentTitle:()=>l,default:()=>h,assets:()=>d,toc:()=>o,frontMatter:()=>c});var t=JSON.parse('{"id":"service/network/vpn/tinc/README","title":"Tinc","description":"- gsliepen/tinc \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/network/vpn/tinc/README.md","sourceDirName":"service/network/vpn/tinc","slug":"/service/network/vpn/tinc/","permalink":"/notes/service/network/vpn/tinc/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/tinc/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689238697000,"frontMatter":{"title":"Tinc"},"sidebar":"docs","previous":{"title":"tailscale","permalink":"/notes/service/network/vpn/tailscale"},"next":{"title":"tinc 1.0","permalink":"/notes/service/network/vpn/tinc/1.0"}}'),r=i("52676"),s=i("79938");let c={title:"Tinc"},l="tinc",d={},o=[{value:"\u5B8C\u6574\u7684\u7F51\u7EDC\u914D\u7F6E",id:"\u5B8C\u6574\u7684\u7F51\u7EDC\u914D\u7F6E",level:2},{value:"FAQ",id:"faq",level:2},{value:"traps: tincd[3995] general protection fault ip:7f6ad09944eb sp:7ffda3da5ea8 error:0 in ld-musl-x86_64.so.1[7f6ad098b000+46000]",id:"traps-tincd3995-general-protection-fault-ip7f6ad09944eb-sp7ffda3da5ea8-error0-in-ld-musl-x86_64so17f6ad098b00046000",level:3},{value:"Failed to verify SIG record from infra",id:"failed-to-verify-sig-record-from-infra",level:3},{value:"Got REQ_KEY from node while we already started a SPTPS session!",id:"got-req_key-from-node-while-we-already-started-a-sptps-session",level:3},{value:"\u76F8\u540C key \u6216\u76F8\u540C \u540D\u5B57\uFF1F",id:"\u76F8\u540C-key-\u6216\u76F8\u540C-\u540D\u5B57",level:3},{value:"Peer tries to roll back protocol version to 17.0",id:"peer-tries-to-roll-back-protocol-version-to-170",level:3},{value:"Could not open /dev/net/tun: No such file or directory",id:"could-not-open-devnettun-no-such-file-or-directory",level:3},{value:"route",id:"route",level:3},{value:"tinc 1.0 \u5347\u7EA7 1.1",id:"tinc-10-\u5347\u7EA7-11",level:2},{value:"tinc.netname",id:"tincnetname",level:2}];function a(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"tinc",children:"tinc"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/gsliepen/tinc",children:"gsliepen/tinc"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"GPLv2+, C"}),"\n",(0,r.jsx)(e.li,{children:"2 \u5C42\u30013 \u5C42 NAT \u7A7F\u900F\u76F4\u8FDE\u7EC4\u7F51\u7684 Mesh VPN"}),"\n",(0,r.jsx)(e.li,{children:"\u52A0\u5BC6\u3001\u8BA4\u8BC1\u3001\u538B\u7F29"}),"\n",(0,r.jsx)(e.li,{children:"\u81EA\u52A8\u5168 Mesh \u8DEF\u7531"}),"\n",(0,r.jsx)(e.li,{children:"NAT \u7A7F\u900F"}),"\n",(0,r.jsx)(e.li,{children:"bridge ethernet segments"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301 IPv6"}),"\n",(0,r.jsx)(e.li,{children:"\u5B9E\u73B0\u7B80\u6D01 - ~40k loc"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u4EC0\u4E48\u65F6\u5019\u53EF\u7528\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u57FA\u7840\u8BBE\u65BD\u7EC4\u7F51 - \u7BA1\u7406\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Tinc \u8FDE\u63A5\u6027\u597D"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u4E1A\u52A1\u5E94\u7528\u96C6\u7FA4\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Layer 2 \u65B9\u4FBF\u5E94\u7528"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u9700\u8981 2 \u5C42\u534F\u8BAE\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"mdns, upnp"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u4EC0\u4E48\u65F6\u5019\u4E0D\u7528\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u6570\u636E\u4E2D\u5FC3 - \u8003\u8651 wireguard\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6570\u636E\u91CF\u8FC7\u5927\uFF0CTinc \u4E0D\u9002\u5408 - \u5355\u7EBF\u7A0B"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u79FB\u52A8\u8BBE\u5907\u63A5\u5165 - \u8003\u8651 nebula\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u76EE\u524D\u6CA1\u6709\u79FB\u52A8\u5BA2\u6237\u7AEF\uFF0C\u9002\u7528\u4E8E\u670D\u52A1\u7AEF\u573A\u666F"}),"\n",(0,r.jsx)(e.li,{children:"\u4E0D\u80FD\u505A\u7EC6\u7C92\u5EA6\u63A7\u5236"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u591A\u79DF\u6237 - \u8003\u8651 n2n\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5168 mesh\uFF0C\u65E0\u6CD5\u63A7\u5236\u8282\u70B9\u6388\u6743"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Tiny VPN\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u652F\u6301\u8DEF\u7531\u6A21\u5F0F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"IP \u534F\u8BAE\u4EA4\u6362"}),"\n",(0,r.jsx)(e.li,{children:"\u4E0D\u652F\u6301\u5E7F\u64AD"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u652F\u6301\u4EA4\u6362\u6A21\u5F0F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Ethernet \u534F\u8BAE"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u5E7F\u64AD"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u534F\u8BAE\u52A0\u5BC6"}),"\n",(0,r.jsx)(e.li,{children:"NAT \u7A7F\u900F"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301 UDP"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u7F51\u6BB5"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u8F6C\u53D1"}),"\n",(0,r.jsx)(e.li,{children:"\u8FD0\u884C\u5728\u7528\u6237\u7A7A\u95F4"}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/platforms/",children:"\u591A\u53F0\u652F\u6301"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"iOS/Android"}),"\n",(0,r.jsx)(e.li,{children:"macOS/utun"}),"\n",(0,r.jsx)(e.li,{children:"Windows/Cygwin/tap64/i386/x86_64"}),"\n",(0,r.jsx)(e.li,{children:"Windows/MinGW/tap64/i386/x86_64"}),"\n",(0,r.jsx)(e.li,{children:"Linux"}),"\n",(0,r.jsx)(e.li,{children:"DragonFlyBSD"}),"\n",(0,r.jsx)(e.li,{children:"FreeBSD"}),"\n",(0,r.jsx)(e.li,{children:"OpenBSD"}),"\n",(0,r.jsx)(e.li,{children:"NetBSD"}),"\n",(0,r.jsx)(e.li,{children:"Solaris/sparc32"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u975E\u5E38\u5C0F\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E8C\u8FDB\u5236 150k, \u5185\u5B58\u5360\u7528 2m \u5DE6\u53F3"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u7C7B\u4F3C\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/meshbird/meshbird",children:"meshbird/meshbird"})}),"\n",(0,r.jsx)(e.li,{children:"FreeS/WAN"}),"\n",(0,r.jsx)(e.li,{children:"IPSeC"}),"\n",(0,r.jsx)(e.li,{children:"Wireguard"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Arch ",(0,r.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/Tinc",children:"Tinc"})]}),"\n",(0,r.jsxs)(e.li,{children:["1.1 \u540E\u7684\u534F\u8BAE\u548C\u4E4B\u524D\u7248\u672C\u7684\u6709\u517C\u5BB9\u95EE\u9898\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u60F3\u8981\u517C\u5BB9, \u9700\u8981\u5728\u6240\u6709 pre \u7248\u672C\u7684\u914D\u7F6E\u91CC\u6DFB\u52A0\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"ExperimentalProtocol = no"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u76EE\u524D ubuntu \u60F3\u7528\u65B0\u7248\u53EA\u80FD\u81EA\u5DF1\u7F16\u8BD1\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://nwgat.ninja/quick-easy-tinc-1-1-2/",children:"https://nwgat.ninja/quick-easy-tinc-1-1-2/"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/documentation-1.1/Simple-Peer_002dto_002dPeer-Security.html",children:"SPTPS"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Simple Peer-to-Peer Security"}),"\n",(0,r.jsx)(e.li,{children:"based on TLS 1.2, but has been simplified: there is no support for exchanging public keys, and there is no cipher suite negotiation. Instead, SPTPS always uses a very strong cipher suite: peers authenticate each other using 521 bits ECC keys, Diffie-Hellman using ephemeral 521 bits ECC keys is used to provide perfect forward secrecy (PFS), AES-256-CTR is used for encryption, and HMAC-SHA-256 for message authentication."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5E38\u7528\u7AEF\u53E3 655/tcp 655/udp"}),"\n",(0,r.jsxs)(e.li,{children:["macOS\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/pipermail/tinc/2016-January/004336.html",children:"https://www.tinc-vpn.org/pipermail/tinc/2016-January/004336.html"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"http://tuntaposx.sourceforge.net/",children:"http://tuntaposx.sourceforge.net/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5982\u679C\u6709 NAT \u95EE\u9898, \u53EF\u4EE5\u5728\u53E6\u5916\u4E00\u53F0\u4E0A\u4E0D\u76F4\u63A5\u8FDE\u63A5\u5916\u90E8\u8282\u70B9, \u5148\u8FDE\u63A5\u5185\u90E8, \u8FDE\u63A5\u4E0A\u540E, \u7F51\u7EDC\u90FD\u80FD\u4E92\u901A"}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://serverfault.com/q/640020/190601",children:"How Do I Reach Local Subnet Behind Tinc VPN"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.jianshu.com/p/e030dabafd61",children:"Tinc \u914D\u7F6E\u7B14\u8BB0"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://groverchou.com/blog/2017/07/23/%E4%BD%BF%E7%94%A8-Tinc-%E5%BB%BA%E7%AB%8B-VPN-%E8%BF%9E%E6%8E%A5%E5%B9%B6%E9%85%8D%E7%BD%AE-NAT-%E7%BD%91%E5%85%B3/",children:"\u4F7F\u7528 Tinc \u5EFA\u7ACB VPN \u8FDE\u63A5\u5E76\u914D\u7F6E NAT \u7F51\u5173"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://serverfault.com/q/418354/190601",children:"How to set up OpenVPN to let the VPN clients to access all the servers inside the server LAN?"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://unix.stackexchange.com/q/91123/47774",children:"How to use two gateways with the same IP address?"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://blog.swineson.me/use-routeros-qemu-as-tinc-tap-vpn-dhcp-server/",children:"\u7528 RouterOS/QEMU \u5728 Tinc TAP VPN \u5185\u90E8\u5B9E\u73B0 DHCP"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/faq/",children:"https://www.tinc-vpn.org/faq/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/pipermail/tinc-devel/2015-September/000790.html",children:"Large scale tinc tests"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/packages/",children:"https://www.tinc-vpn.org/packages/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/gsliepen/tinc",children:"https://github.com/gsliepen/tinc"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://git.alpinelinux.org/cgit/aports/tree/community/tinc-pre/APKBUILD",children:"https://git.alpinelinux.org/cgit/aports/tree/community/tinc-pre/APKBUILD"})}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/freifunk/icvpn",children:"freifunk/icvpn"})," - InterCity-VPN"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/documentation/tinc.conf.5",children:"https://www.tinc-vpn.org/documentation/tinc.conf.5"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/documentation-1.1/How-connections-work.html",children:"https://www.tinc-vpn.org/documentation-1.1/How-connections-work.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"tinc 1.1 \u8FD8\u4E0D\u8DB3\u591F\u7A33\u5B9A"}),"\n",(0,r.jsx)(e.li,{children:"\u5355\u7EBF\u7A0B - \u6027\u80FD\u6709\u9650"}),"\n"]})}),"\n",(0,r.jsx)(e.admonition,{type:"tip",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u8054\u901A\u6027\u5F88\u597D"}),"\n",(0,r.jsx)(e.li,{children:"Switch \u6A21\u5F0F\u652F\u6301 L2"}),"\n",(0,r.jsxs)(e.li,{children:["macOS\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u76EE\u524D\u5DF2\u7ECF\u4E0D\u652F\u6301 tuntap\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4\u4F7F\u7528 utun=tun - \u53EA\u80FD\u7528 Router \u6A21\u5F0F"}),"\n",(0,r.jsx)(e.li,{children:"\u4E0D\u652F\u6301 tap - \u4E0D\u80FD\u4F7F\u7528 Switch \u6A21\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"brew \u6CA1\u6709 tinc-pre\uFF0C\u9700\u8981\u81EA\u5DF1\u6DFB\u52A0"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u63A8\u8350\u4F7F\u7528 tinc-pre 1.1 \u7248\u672C\n# \u914D\u7F6E\u66F4\u65B9\u4FBF\u4F7F\u7528\u66F4\u7B80\u5355\napk add tinc-pre\n\nsudo modprobe tun\n# echo tun >> /etc/modules\necho tun | sudo tee /etc/modules-load.d/tinc.conf\n\n# \u57FA\u7840\u914D\u7F6E\n# NETNAME \u914D\u7F6E\u751F\u6210\u5728 /etc/tinc/first/\nNETNAME=first tinc init first\ntinc set Interface tun0\ntinc set AddressFamily ipv4\n# \u7B2C\u4E00\u4E2A\u8282\u70B9\u53EF\u8003\u8651\u4E0D\u8BBE\u7F6E\u94FE\u63A5\u8282\u70B9\ntinc set ConnectTo other\n# \u53D8\u91CF\u8BBE\u7F6E\u53EF\u4EE5\u6307\u5B9A host\ntinc set sec.Subnet=10.0.0.2/32\n\n# \u5728\u914D\u7F6E\u5355\u4E2A\u7F51\u7EDC\u65F6, \u8BBE\u7F6E\u4E2A\u522B\u540D\u4F1A\u6BD4\u8F83\u65B9\u4FBF, \u4F7F\u7528\u4E0D\u540C\u76EE\u5F55\u6216 pid \u4E5F\u53EF\u4EE5\u8FD9\u6837\u64CD\u4F5C\nalias tinc='tinc -n main'\n# \u64CD\u4F5C\u6307\u5B9A\u7F51\u7EDC\u540D\u65F6, \u53EF\u4F7F\u7528\u73AF\u5883\u53D8\u91CF\nexport NETNAME=main\ntinc dump nodes\n# \u5982\u679C\u6267\u884C\u7684\u547D\u4EE4\u6BD4\u8F83\u591A, \u4E5F\u53EF\u4EE5\u52A0\u5165\u4EA4\u4E92\u6A21\u5F0F\u64CD\u4F5C\ntinc -c .\n\nADDRESS=10.0.0.1\nNETMASK=255.255.255.0\ncat > tinc-up << SH\n#!/bin/sh\nifconfig \\$INTERFACE $ADDRESS netmask $NETMASK\nSH\ncat > tinc-down << SH\n#!/bin/sh\nifconfig \\$INTERFACE down\nSH\nchmod +x tinc-*\n\ntincd -Dd4\n\n# \u5BFC\u5165\u522B\u5904 export \u7684\u914D\u7F6E\ntinc import\n\n# \u751F\u6210\u9080\u8BF7\u7801\n# \u6700\u7B80\u4FBF\u7684\u914D\u7F6E\u65B9\u5F0F\ntinc invite \u8282\u70B9\u540D\n# \u52A0\u5165\n# \u4F1A\u5728\u8FDC\u7A0B\u6DFB\u52A0\u4E3B\u673A\u4FE1\u606F\n# \u4F1A\u4F7F\u7528\u76F8\u540C\u7684 netname\n# tinc-up \u548C tinc-down \u9700\u8981\u81EA\u5DF1\u914D\u7F6E\ntinc join \u9080\u8BF7\u7801\n\ntinc -n main invite thd\n\n# \u914D\u7F6E\u8981\u542F\u52A8\u7684\u7F51\u7EDC\n# NETWORK: main\n# \u4F1A\u4F7F\u7528 /etc/tinc/main \u914D\u7F6E\nnano /etc/conf.d/tinc.networks\nrc-service tincd start\n# \u81EA\u542F\u52A8\nrc-update add tincd\n# \u542F\u52A8\u540E\u53EF\u4EE5\u67E5\u770B\u65E5\u5FD7, 1-5\ntinc -n main log 5\n\n# Docker\n# ======\n# \u5148\u5728 docker \u4E2D\u8FDB\u884C\u914D\u7F6E\u548C\u6D4B\u8BD5\nNETNAME=name\ndocker run --rm -it -e NETNAME=$NETNAME --cap-add=NET_ADMIN --device=/dev/net/tun -v $PWD/tinc:/etc/tinc wener/tinc sh\n# \u5BFC\u5165\u914D\u7F6E\ndocker run --rm -it -e NETNAME=$NETNAME -v $PWD/tinc:/etc/tinc wener/tinc tinc import\n# \u542F\u52A8\ndocker run -d --restart always \\\n  --net host --cap-add=NET_ADMIN --device=/dev/net/tun \\\n  -e NETNAME=$NETNAME -v $PWD/tinc:/etc/tinc \\\n  --name tinc-$NETNAME wener/tinc\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'# macOS\n# http://tuntaposx.sourceforge.net/\n# \u65B0\u7248\u6CA1\u6709\u4E86 devel \u53C2\u6570\n# https://github.com/Homebrew/homebrew-core/tree/master/Formula/tinc.rb\n# curl https://raw.githubusercontent.com/wenerme/homebrew-core/tinc-pre/Formula/tinc-pre.rb > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/tinc-pre.rb\ncat << RB > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/tinc-pre.rb\nclass TincPre < Formula\n  desc "Virtual Private Network (VPN) tool"\n  homepage "https://www.tinc-vpn.org/"\n  url "https://www.tinc-vpn.org/packages/tinc-1.1pre18.tar.gz"\n  sha256 "2757ddc62cf64b411f569db2fa85c25ec846c0db110023f6befb33691f078986"\n\n  depends_on "lzo"\n  depends_on "openssl"\n\n  def install\n    system "./configure", "--prefix=#{prefix}", "--sysconfdir=#{etc}",\n                          "--with-openssl=#{Formula["openssl"].opt_prefix}"\n    system "make", "install"\n  end\n\n  test do\n    assert_match version.to_s, shell_output("#{sbin}/tincd --version")\n  end\nend\nRB\n# fetch \u4F1A\u663E\u793A sha256 - \u53EF\u80FD\u9700\u8981\u4EE3\u7406\nbrew fetch --build-from-source tinc-pre\nbrew install --build-from-source tinc-pre\n\n# utun\n# ===============\n# \u5728 mac \u4E0B, tinc \u652F\u6301 utun, \u53EF\u80FD\u9700\u8981 root \u6743\u9650\ntinc set DeviceType utun\n\n# \u786E\u4FDD\u8DEF\u5F84\u5B58\u5728, \u5426\u5219 pid \u4F1A\u5B58\u5728\u5F53\u524D\u76EE\u5F55\nmkdir -p /usr/local/Cellar/tinc/1.1pre17/var/run/\n\n# tun/tap\n# ===============\n# tuntap 10.13 \u4F1A\u5B89\u88C5\u5931\u8D25\nbrew cask install tuntap\n# /Library/Extensions/tap.kext\n# /Library/Extensions/tun.kext\n# /Library/StartupItems/tap\n# /Library/StartupItems/tun\n\n# \u624B\u52A8\u52A0\u8F7D\nsudo kextload /Library/Extensions/tun.kext\n# \u5931\u8D25\u65E5\u5FD7\nsudo dmesg\n# tun: could not register PF_INET protocol family: 17\n# Kext net.sf.tuntaposx.tun start failed (result 0x5).\n# Kext net.sf.tuntaposx.tun failed to load (0xdc008017).\n# Failed to load kext net.sf.tuntaposx.tun (error 0xdc008017).\n\n# \u67E5\u770B\u73B0\u6709\u7684\nkextstat | grep tun\n# \u5199\u5728\nsudo kextunload -b \u540D\u5B57\n\n# https://tunnelblick.net\n# \u5305\u542B\u4E86\u65B0\u7684 kext\n\n# \u67E5\u770B\u5177\u4F53\u51FA\u9519\u4FE1\u606F\nsudo kextutil /Volumes/Tunnelblick/Tunnelblick.app/Contents/Resources/tun-signed.kext\n\nsudo kextutil /Library/Extensions/tun.kext\n# Memory allocation failure.\n# Untrusted kexts are not allowed\n'})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"tinc-up"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"#!/bin/sh\nbrctl addif br0 $INTERFACE\nifconfig $INTERFACE 0.0.0.0 promisc up\n\n# \u8BE5\u8282\u70B9\u4F5C\u4E3A\u8DEF\u7531\n# iptables -I FORWARD -i $INTERFACE -j ACCEPT\n# iptables -t nat -A POSTROUTING -d 10.88.0.0/16 -o $INTERFACE -j MASQUERADE\n"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"tinc-fw"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"#!/bin/sh\niptables -I INPUT -p udp --dport 20656 -j ACCEPT\niptables -I INPUT -p tcp --dport 20656 -j ACCEPT\niptables -I INPUT -i tinc -j ACCEPT\niptables -I FORWARD -i tinc -j ACCEPT\n"})}),"\n",(0,r.jsx)(e.h2,{id:"\u5B8C\u6574\u7684\u7F51\u7EDC\u914D\u7F6E",children:"\u5B8C\u6574\u7684\u7F51\u7EDC\u914D\u7F6E"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u4E3B\u8282\u70B9\nexport NETNAME=mynet\nexport NODE=mynet\n\ntinc init $NETNAME\ncd /etc/tinc/$NETNAME\n\n# \u914D\u7F6E\u542F\u52A8\u811A\u672C\nADDRESS=10.66.1.1\nNETMASK=255.255.0.0\ncat > tinc-up <<SH\n#!/bin/sh\nifconfig \\$INTERFACE $ADDRESS netmask $NETMASK\nSH\ncat > tinc-down <<SH\n#!/bin/sh\nifconfig \\$INTERFACE down\nSH\nchmod +x tinc-*\n\n# \u914D\u7F6E\u4E3B\u8282\u70B9\u5730\u5740\n# \u7528\u4E8E\u5176\u5B83\u8282\u70B9\u8BF7\u6C42\u7684\u5730\u5740, \u5982\u679C\u6709\u5916\u7F51\u5730\u5740\ntinc set $NODE.Address=$(curl ipv4.icanhazip.com)\n# \u5982\u679C\u4E0D\u60F3\u4F7F\u7528\u9ED8\u8BA4\u7AEF\u53E3\ntinc set $NODE.Port=12345\n# \u79C1\u6709\u5B50\u7F51\ntinc set $NODE.Subnet=$ADDRESS/32\n# \u542F\u52A8\ntinc start\n\n# \u9080\u8BF7\u5176\u5B83\u8282\u70B9\ntinc invite home\n\n# home \u8282\u70B9\n# =============\nexport NETNAME=mynet\nexport NODE=home\ntinc join <INVITE>\n\ncd /etc/tinc/$NETNAME\n\n# \u914D\u7F6E\u542F\u52A8\u811A\u672C\nADDRESS=10.66.1.2\nNETMASK=255.255.0.0\ncat > tinc-up <<SH\n#!/bin/sh\nifconfig \\$INTERFACE $ADDRESS netmask $NETMASK\nSH\ncat > tinc-down <<SH\n#!/bin/sh\nifconfig \\$INTERFACE down\nSH\nchmod +x tinc-*\n\n# \u5982\u679C\u4E0D\u60F3\u4F7F\u7528\u9ED8\u8BA4\u7AEF\u53E3\ntinc set $NODE.Port=45678\n# \u79C1\u6709\u5B50\u7F51\ntinc set $NODE.Subnet=$ADDRESS/32\n\n# svr \u8282\u70B9\n# =============\n# \u5982\u679C\u4E0D\u80FD\u5B89\u88C5 tinc-1.1+ \u5219\u53EF\u4EE5\u4F7F\u7528 docker\nexport NETNAME=mynet\nexport NODE=home\ndocker run --rm -it -e NODE=$NODE -e NETNAME=$NETNAME --cap-add=NET_ADMIN --device=/dev/net/tun -v /data/tinc/$NETNAME/$NODE:/etc/tinc wener/tinc sh\n\ntinc join <INVITE>\n\ncd /etc/tinc/$NETNAME\n# \u914D\u7F6E\u542F\u52A8\u811A\u672C\nADDRESS=10.66.1.3\nNETMASK=255.255.0.0\ncat > tinc-up <<SH\n#!/bin/sh\nifconfig \\$INTERFACE $ADDRESS netmask $NETMASK\nSH\ncat > tinc-down <<SH\n#!/bin/sh\nifconfig \\$INTERFACE down\nSH\nchmod +x tinc-*\n\n# \u5982\u679C\u4E0D\u60F3\u4F7F\u7528\u9ED8\u8BA4\u7AEF\u53E3\ntinc set $NODE.Port=45678\n# \u79C1\u6709\u5B50\u7F51\ntinc set $NODE.Subnet=$ADDRESS/32\n# \u9000\u51FA\u914D\u7F6E\u5BB9\u5668\nexit\n# \u8FD0\u884C\u670D\u52A1\ndocker run -d --restart always -v /etc/localtime:/etc/localtime:ro \\\n  --cap-add=NET_ADMIN --device=/dev/net/tun \\\n  -e NETNAME=$NETNAME \\\n  -v /data/tinc/$NETNAME/$NODE:/etc/tinc \\\n  --name tinc-$NETNAME-$NODE wener/tinc\n"})}),"\n",(0,r.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h3,{id:"traps-tincd3995-general-protection-fault-ip7f6ad09944eb-sp7ffda3da5ea8-error0-in-ld-musl-x86_64so17f6ad098b00046000",children:"traps: tincd[3995] general protection fault ip:7f6ad09944eb sp:7ffda3da5ea8 error:0 in ld-musl-x86_64.so.1[7f6ad098b000+46000]"}),"\n",(0,r.jsx)(e.p,{children:"tinc pre \u8FD0\u884C\u4E0D\u7A33\u5B9A\uFF0C\u52A1\u5FC5\u914D\u7F6E openrc \u81EA\u52A8\u91CD\u542F"}),"\n",(0,r.jsx)(e.h3,{id:"failed-to-verify-sig-record-from-infra",children:"Failed to verify SIG record from infra"}),"\n",(0,r.jsx)(e.p,{children:"\u7B7E\u540D\u9A8C\u8BC1\u5931\u8D25\uFF0C\u5C1D\u8BD5\u91CD\u65B0 invite"}),"\n",(0,r.jsx)(e.h3,{id:"got-req_key-from-node-while-we-already-started-a-sptps-session",children:"Got REQ_KEY from node while we already started a SPTPS session!"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/gsliepen/tinc/issues/203",children:"#203"})}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"\u76F8\u540C-key-\u6216\u76F8\u540C-\u540D\u5B57",children:"\u76F8\u540C key \u6216\u76F8\u540C \u540D\u5B57\uFF1F"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"tinc \u5141\u8BB8\u76F8\u540C key - \u4F46\u4E0D\u5EFA\u8BAE\uFF0C\u5B58\u5728\u5B89\u5168\u9690\u60A3"}),"\n",(0,r.jsxs)(e.li,{children:["tinc \u4E0D\u5141\u8BB8\u76F8\u540C name\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"name \u5728\u8282\u70B9\u91CC\u662F\u552F\u4E00\u6807\u8BC6\u7684"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tinc-vpn.org/pipermail/tinc/2015-May/004137.html",children:"https://www.tinc-vpn.org/pipermail/tinc/2015-May/004137.html"})}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"peer-tries-to-roll-back-protocol-version-to-170",children:"Peer tries to roll back protocol version to 17.0"}),"\n",(0,r.jsx)(e.p,{children:"\u4F7F\u7528 1.0 \u534F\u8BAE"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"ExperimentalProtocol = no\n"})}),"\n",(0,r.jsx)(e.h3,{id:"could-not-open-devnettun-no-such-file-or-directory",children:"Could not open /dev/net/tun: No such file or directory"}),"\n",(0,r.jsx)(e.p,{children:"\u52A0\u8F7D tun \u5185\u6838\u6A21\u5757"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"modprobe tun\necho tun >> /etc/modules\n"})}),"\n",(0,r.jsx)(e.h3,{id:"route",children:"route"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/Network_bridge",children:"https://wiki.archlinux.org/index.php/Network_bridge"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'sysctl net.ipv4.ip_forward\nsysctl -w net.ipv4.ip_forward=1\n# 1. \u5141\u8BB8\u5305\u8F6C\u53D1, \u4F1A\u5C06 eth0 \u5B50\u7F51\u7684\u8F6C\u53D1\u5230 mynet, \u9700\u8981\u5728\u7F51\u5173\u8282\u70B9\u6DFB\u52A0 eth0 \u7684\u5B50\u7F51\u624D\u80FD\u505A\u5230\u4E92\u901A\n# iptables -L --line-number -nv\niptables -I FORWARD -i mynet -j ACCEPT\niptables -I FORWARD -i eth0 -j ACCEPT\n\n# 2. NAT \u4F7F\u5F97 eth0 \u5B50\u7F51\u80FD\u8BBF\u95EE\u79C1\u7F51\n# \u5982\u679C\u505A\u4E86\u6865\u63A5, \u8FD9\u91CC\u9700\u8981\u6362\u6210\u6865\u63A5\u7F51\u5361\n# iptables -t nat -L --line-number -nv\niptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE\n# \u5982\u679C\u6709\u591A\u4E2A\u79C1\u7F51, \u4E5F\u53EF\u4EE5\u8003\u8651\u9650\u5236\u76EE\u6807\u7F51\u6BB5\n# iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -d 10.10.0.0/16 -o mynet -j MASQUERADE\n\n# \u521B\u5EFA\u7528\u4E8E docker \u4F7F\u7528\u7684\u7F51\u7EDC\n# \u5047\u8BBE\u5F53\u524D\u8282\u70B9\u7684\u5B50\u7F51\u662F 10.10.1.0/24 \u5F53\u524D\u8282\u70B9\u7684\u5730\u5740\u662F 10.10.1.0\ndocker network create \\\n  --driver=bridge \\\n  --subnet=10.10.0.0/16 \\\n  --ip-range=10.10.1.0/24 \\\n  --gateway=10.10.1.0 \\\n  --aux-address="my-host=10.10.1.1" \\\n  -o com.docker.network.bridge.name=brmynet \\\n  brmynet\n# \u5141\u8BB8\u6865\u63A5\u7F51\u5361\u8F6C\u53D1\niptables -I FORWARD -i brmynet -j ACCEPT\n# \u5C06 tinc \u4F5C\u4E3A\u8BE5\u6865\u63A5\u7684 slave\nip li set master brmynet dev mynet\n# \u6216\u8005\u5728 tinc-up \u4E2D\u8BBE\u7F6E\ncat > tinc-up << SH\n#!/bin/sh\nip li set master br$INTERFACE dev $INTERFACE\nip li set dev $INTERFACE up\nSH\n\n# \u8C03\u8BD5\ntcpdump -nni mynet icmp\n'})}),"\n",(0,r.jsxs)(e.p,{children:["How can I set my linux box as a router to forward ip packets?\n",(0,r.jsx)(e.a,{href:"https://askubuntu.com/q/227369/267103",children:"https://askubuntu.com/q/227369/267103"})]}),"\n",(0,r.jsxs)(e.p,{children:["Linux IP Masquerade HOWTO\n",(0,r.jsx)(e.a,{href:"http://tldp.org/HOWTO/IP-Masquerade-HOWTO/",children:"http://tldp.org/HOWTO/IP-Masquerade-HOWTO/"})]}),"\n",(0,r.jsx)(e.p,{children:"iptables -I FORWARD -i brwenet -j ACCEPT"}),"\n",(0,r.jsx)(e.h2,{id:"tinc-10-\u5347\u7EA7-11",children:"tinc 1.0 \u5347\u7EA7 1.1"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"tinc -n NETNAME generate-ed25519-keys\n"})}),"\n",(0,r.jsx)(e.h2,{id:"tincnetname",children:"tinc.netname"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"sudo modprobe tun\necho tun | sudo tee /etc/modules-load.d/tinc.conf\n\nsudo nano /etc/init.d/tinc.netname\nsudo chmod +x /etc/init.d/tinc.netname\n\nsudo ln -sf /etc/init.d/tinc.netname /etc/init.d/tinc.$NETNAME\nsudo service tinc.$NETNAME start\nsudo rc-update add tinc.$NETNAME\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-sh",children:'#!/sbin/openrc-run\nsupervisor=supervise-daemon\n\nname="TincVPN Daemon"\ndescription="tinc is a Virtual Private Network (VPN) daemon that uses tunnelling and encryption to create a secure private network between hosts on the Internet."\ndescription_reload="Reload configuration without exiting"\n\n# tinc.netname -> netname\nNETNAME=${RC_SVCNAME##*.}\n: ${TINC_DEBUG:=0}\n\ncommand=/usr/sbin/tincd\ncommand_args="-n $NETNAME -d $TINC_DEBUG $TINC_OPTS"\ncommand_args_foreground="-D"\n\nTINC_LOGFILE="${TINC_LOGFILE:-/var/log/${RC_SVCNAME}.log}"\nTINC_ERRFILE="${TINC_ERRFILE:-${TINC_LOGFILE}}"\nTINC_OUTFILE="${TINC_OUTFILE:-${TINC_LOGFILE}}"\nsupervise_daemon_args="--stderr \\"${TINC_ERRFILE}\\" --stdout \\"${TINC_OUTFILE}\\""\n\nextra_started_commands="reload"\nretry="${TINC_RETRY:-TERM/60/KILL/10}"\n\ndepend() {\n  use logger dns\n  need net\n}\n\ncheckconfig() {\n  # warn this if not found\n  if [ ! -f "/etc/tinc/$NETNAME/tinc.conf" ]; then\n    eerror "No VPN network configured"\n    return 1\n  fi\n  return 0\n}\n\nreload() {\n  ebegin "Reloading configuration"\n  $supervisor $RC_SVCNAME --signal HUP\n  eend $?\n}\n'})})]})}function h(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return l},a:function(){return c}});var t=i(75271);let r={},s=t.createContext(r);function c(n){let e=t.useContext(s);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);