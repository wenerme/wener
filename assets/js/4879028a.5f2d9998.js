"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81973"],{85198:function(i,n,e){e.r(n),e.d(n,{metadata:()=>s,contentTitle:()=>t,default:()=>o,assets:()=>c,toc:()=>h,frontMatter:()=>d});var s=JSON.parse('{"id":"voip/asterisk/dahdi","title":"DAHDI","description":"- \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/voip/asterisk/dahdi.md","sourceDirName":"voip/asterisk","slug":"/voip/asterisk/dahdi","permalink":"/notes/voip/asterisk/dahdi","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/asterisk/dahdi.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1635793726000,"frontMatter":{"title":"DAHDI"},"sidebar":"docs","previous":{"title":"chan_sip","permalink":"/notes/voip/asterisk/chan_sip"},"next":{"title":"IAX","permalink":"/notes/voip/asterisk/iax"}}'),l=e("52676"),r=e("79938");let d={title:"DAHDI"},t="DAHDI",c={},h=[{value:"OpenVox \u9A71\u52A8",id:"openvox-\u9A71\u52A8",level:2},{value:"\u5176\u4ED6\u9A71\u52A8",id:"\u5176\u4ED6\u9A71\u52A8",level:3},{value:"Digium \u6570\u5B57\u5361",id:"digium-\u6570\u5B57\u5361",level:2},{value:"Digium \u6A21\u62DF\u5361",id:"digium-\u6A21\u62DF\u5361",level:2},{value:"OpenVox",id:"openvox",level:2}];function a(i){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...i.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"dahdi",children:"DAHDI"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u662F\u4EC0\u4E48\uFF1F\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium Asterisk Hardware Device Interface"}),"\n",(0,l.jsx)(n.li,{children:"Digium \u5F00\u53D1\u7684 Asterisk \u786C\u4EF6\u8BBE\u5907\u63A5\u53E3"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://docs.tzafrir.org.il/dahdi-linux/README.html",children:"DAHDI Telephony Interface Driver"})}),"\n",(0,l.jsxs)(n.li,{children:["dahdi tools \u5B9E\u9645\u64CD\u4F5C\u7684\u662F ",(0,l.jsx)(n.code,{children:"/dev/dahdi/ctl"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://downloads.asterisk.org/pub/telephony/dahdi-linux-complete/",children:"\u6E90\u7801\u4E0B\u8F7D"})," / ",(0,l.jsx)(n.a,{href:"https://github.com/asterisk/dahdi-linux",children:"asterisk/dahdi-linux"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u7248\u672C\u5386\u53F2\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"3.1 - 2019-10-7"}),"\n",(0,l.jsx)(n.li,{children:"3.0 - 2018-11-15"}),"\n",(0,l.jsx)(n.li,{children:"2.11 - 2015-12-22"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u7F16\u8BD1\u95EE\u9898\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"5.4 \u540E linux/pci-aspm.h \u53D8\u4E3A linux/pci.h"}),"\n",(0,l.jsxs)(n.li,{children:["5.0\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"SUBDIRS=$(PWD)"})," -> ",(0,l.jsx)(n.code,{children:"M=$(shell pwd)"})]}),"\n",(0,l.jsxs)(n.li,{children:["implicit declaration of function ",(0,l.jsx)(n.code,{children:"do_gettimeofday"}),"; did you mean 'do_settimeofday64'?\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u4EE5\u524D\u5728 ",(0,l.jsx)(n.code,{children:"linux/timekeeping32.h"})," \u4E4B\u540E\u88AB\u5220\u9664"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://git.asterisk.org/gitweb/?p=dahdi/linux.git;a=blobdiff;f=drivers/dahdi/xpp/xbus-pcm.c;h=8bb2fe76c66a143242730e022cf8af3a6268b062;hp=37f9260e7ecb1c7b3e00b7bd942eac7bc95d6d05;hb=ffcd08205c71dcb0e060836359418bef20f07ffa;hpb=8468250328b607cbd2774c2209fbe5826be01098",children:"xpp patch"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"do_gettimeofday(&di->last_lost_tick.tv);"})," -> ",(0,l.jsx)(n.code,{children:"di->last_lost_tick = ktime_get();"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"struct timeval now"})," -> ",(0,l.jsx)(n.code,{children:"const ktime_t now"}),";"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["implicit declaration of function ",(0,l.jsx)(n.code,{children:"touch_softlockup_watchdog"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u4EE5\u524D ",(0,l.jsx)(n.code,{children:"linux/sched.h"})," \u73B0\u5728\u5728 ",(0,l.jsx)(n.a,{href:"https://elixir.bootlin.com/linux/v5.4/ident/touch_softlockup_watchdog",children:"linux/nmi.h"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Openvox 2.11\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["include/kernel.h ",(0,l.jsx)(n.code,{children:"#define dahdi_pci_module pci_register_driver"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Ubuntu \u7684 DAHDi \u8865\u4E01\u53EF\u4EE5\u4F5C\u4E3A\u53C2\u8003 ",(0,l.jsx)(n.a,{href:"https://launchpad.net/ubuntu/+source/dahdi-linux/+changelog",children:"https://launchpad.net/ubuntu/+source/dahdi-linux/+changelog"})]}),"\n",(0,l.jsxs)(n.li,{children:["Alpine \u7684 DAHDi \u9A71\u52A8\u5E26\u4E86 zaphfc \u7684\u8865\u4E01\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://community.asterisk.org/t/dahdi-with-hfc-s-pci-card/39320",children:"https://community.asterisk.org/t/dahdi-with-hfc-s-pci-card/39320"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://gitlab.alpinelinux.org/alpine/aports/tree/v3.10.3/main/dahdi-linux-vanilla",children:"https://gitlab.alpinelinux.org/alpine/aports/tree/v3.10.3/main/dahdi-linux-vanilla"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.voip-info.org/asterisk-zaphfc/",children:"https://www.voip-info.org/asterisk-zaphfc/"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://wiki.asterisk.org/wiki/display/DAHDI/DAHDI",children:"https://wiki.asterisk.org/wiki/display/DAHDI/DAHDI"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://git.asterisk.org/gitweb/?p=dahdi/tools.git;a=summary",children:"http://git.asterisk.org/gitweb/?p=dahdi/tools.git;a=summary"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://wiki.asterisk.org/wiki/display/DAHDI/Quick+Start+From+Source",children:"https://wiki.asterisk.org/wiki/display/DAHDI/Quick+Start+From+Source"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# \u4E2D\u65AD\ncat /proc/interrupts\n\n# \u7AEF\u53E3\u4FE1\u606F\ngrep . /sys/bus/dahdi_spans/devices/span-*/{alarms,basechan,channels,desc,is_digital,is_sync_master,lbo,linecompat,lineconfig,local_spanno,name,spantype,syncsrc,uevent}\n# \u8BBE\u5907\u4FE1\u606F\ngrep . /sys/bus/dahdi_devices/devices/*/{assign_span,auto_assign,hardware_id,location,manufacturer,registration_time,span_count,spantype,type,uevent}\n\n# \u67E5\u770B\u7EBF\u8DEF\u7C7B\u578B\ngrep . /sys/bus/dahdi_devices/devices/*/spantype\nhead -q /proc/dahdi/*\n"})}),"\n",(0,l.jsx)(n.h2,{id:"openvox-\u9A71\u52A8",children:"OpenVox \u9A71\u52A8"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u6E90\u7801\u4E0B\u8F7D\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://www.openvox.cn/pub/drivers/dahdi-linux-complete/releases/",children:"http://www.openvox.cn/pub/drivers/dahdi-linux-complete/releases/"})}),"\n",(0,l.jsxs)(n.li,{children:["2.11.1 \u5B98\u65B9\u7684\u6709\u4E00\u70B9\u95EE\u9898, \u53EF\u4EE5\u5C1D\u8BD5\u4F7F\u7528 ",(0,l.jsx)(n.a,{href:"https://github.com/wenerme/openvox-dahdi-linux",children:"https://github.com/wenerme/openvox-dahdi-linux"})," \u7684 myfix \u5206\u652F"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["NOTE\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["hardened \u7684\u5185\u6838\u7F16\u8BD1\u4F1A\u5931\u8D25, \u5E76\u4E14\u5728\u7F16\u8BD1\u8FC7\u7A0B\u4E2D\u4F1A\u62A5\u5F88\u591A\u5F02\u5E38\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["can't find starting instruction / can't decode instruction\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/torvalds/linux/blob/master/tools/objtool/Documentation/stack-validation.txt#L224",children:"stack-validation.txt:224"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["DAHDi \u7684 hardened \u7F16\u8BD1\u4E5F\u52A0\u4E86\u4E0D\u5C11\u8865\u4E01\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://git.alpinelinux.org/cgit/aports/tree/main/dahdi-linux-hardened/",children:"https://git.alpinelinux.org/cgit/aports/tree/main/dahdi-linux-hardened/"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"vaillian \u7684\u5185\u6838\u80FD\u76F4\u63A5\u7F16\u8BD1\u6210\u529F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"wget http://www.openvox.cn/pub/drivers/dahdi-linux-complete/openvox_dahdi-linux-complete-current.tar.gz\ntar zxvf openvox_dahdi-linux-complete-current.tar.gz\ncd dahdi-linux-complete*\n\nhttps://www.openvox.cn/pub/drivers/dahdi-linux-complete/openvox_dahdi-linux-complete-2.11.1.gz\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"apk add bison zlib{,-dev} ncurses{,-dev} libxml2{,-dev} openssl{,-dev} gnutls{,-dev} linux-headers make abuild gcc g++ perl git wget\n\n# \u8981\u770B\u5177\u4F53\u4F7F\u7528\u7684\u4EC0\u4E48\u5185\u6838 uname -r\n# apk add linux-hardened{,-dev}\napk add linux-vanilla{,-dev}\n\n# \u6216\u8005\u7528 docker \u7F16\u8BD1\ndocker run -it --rm -v $PWD:/src wener/asterisk:builder bash\n\n# \u5148\u7F16\u8BD1 dahdi \u9A71\u52A8\nmake install -C linux KVERS=4.9.49 DESTDIR=$PWD/dist/4.9.49\n\n# \u5982\u679C\u662F hardened \u90A3\u4E48\u4E00\u822C\u662F\u8FD9\u6837\u7684\nmake install KVERS=4.9.32-0-hardened\n# \u5B89\u88C5\u5230\u5176\u4ED6\u5730\u65B9\nmake install KVERS=4.9.32-0-hardened DESTDIR=$PWD/dist/4.9.32-0-hardened\n"})}),"\n",(0,l.jsx)(n.h3,{id:"\u5176\u4ED6\u9A71\u52A8",children:"\u5176\u4ED6\u9A71\u52A8"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"wctdmc1k"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"digium-\u6570\u5B57\u5361",children:"Digium \u6570\u5B57\u5361"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["wcte43x:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TE435: PCI express quad-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE436: PCI quad-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE235: PCI express dual-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE236: PCI dual-port T1/E1/J1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wcte13xp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TE131: PCI express single-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE133: PCI express single-port T1/E1/J1 with echocan"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE132: PCI single-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE134: PCI single-port T1/E1/J1 with echocan"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wct4xxp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TE205P/TE207P/TE210P/TE212P: PCI dual-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE405P/TE407P/TE410P/TE412P: PCI quad-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE220: PCI-Express dual-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE420: PCI-Express quad-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE820: PCI-Express eight-port T1/E1/J1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wcte12xp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TE120P: PCI single-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE121: PCI-Express single-port T1/E1/J1"}),"\n",(0,l.jsx)(n.li,{children:"Digium TE122: PCI single-port T1/E1/J1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wcte11xp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TE110P: PCI single-port T1/E1/J1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wct1xxp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium T100P: PCI single-port T1"}),"\n",(0,l.jsx)(n.li,{children:"Digium E100P: PCI single-port E1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wcb4xxp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium B410: PCI quad-port BRI"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"tor2: Tormenta quad-span T1/E1 card from the Zapata Telephony project"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"digium-\u6A21\u62DF\u5361",children:"Digium \u6A21\u62DF\u5361"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["wcaxx:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium A8A: PCI up to 8 mixed FXS/FXO ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium A8B: PCI express up to 8 mixed FXS/FXO ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium A4A: PCI up to 4 mixed FXS/FXO ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium A4B: PCI express up to 4 mixed FXS/FXO ports"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wctdm24xxp:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TDM2400P/AEX2400: up to 24 analog ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium TDM800P/AEX800: up to 8 analog ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium TDM410P/AEX410: up to 4 analog ports"}),"\n",(0,l.jsx)(n.li,{children:"Digium Hx8 Series: Up to 8 analog or BRI ports"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["wctdm:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Digium TDM400P: up to 4 analog ports"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["xpp: Xorcom Astribank: a USB connected unit of up to 32 ports\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"including the digital BRI and E1/T1 modules"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"wcfxo: X100P, similar and clones. A simple single-port FXO card"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"openvox",children:"OpenVox"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["D110\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"wcte11xp"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["D130/D115\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"opvxd115"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["D230/D210 D430/D410 D830\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"wct4xxp"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["A400\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"modprobe wctdm opermode=CHINA"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["A800 A1200\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"modprobe opvxa1200 opermode=CHINA"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["A810 A2410\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"modprobe opvxa24xx opermode=CHINA"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["B400 B800\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"modprobe wcb4xxp te_nt_override=0x03"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["OpenVox G400P GSM/CDMA PCI\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"GSM \u9A71\u52A8"}),"\n",(0,l.jsx)(n.li,{children:"opvxg4xx"}),"\n"]}),"\n"]}),"\n"]})]})}function o(i={}){let{wrapper:n}={...(0,r.a)(),...i.components};return n?(0,l.jsx)(n,{...i,children:(0,l.jsx)(a,{...i})}):a(i)}},79938:function(i,n,e){e.d(n,{Z:function(){return t},a:function(){return d}});var s=e(75271);let l={},r=s.createContext(l);function d(i){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof i?i(n):{...n,...i}},[n,i])}function t(i){let n;return n=i.disableParentContext?"function"==typeof i.components?i.components(l):i.components||l:d(i.components),s.createElement(r.Provider,{value:n},i.children)}}}]);