"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["3989"],{32979:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>d,frontMatter:()=>a});var i=JSON.parse('{"id":"voip/asterisk/chan_iax","title":"chan_iax","description":"- IAX - Inter-Asterisk-eXchange","source":"@site/../notes/voip/asterisk/chan_iax.md","sourceDirName":"voip/asterisk","slug":"/voip/asterisk/chan_iax","permalink":"/notes/voip/asterisk/chan_iax","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/asterisk/chan_iax.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1627459974000,"frontMatter":{"title":"chan_iax"},"sidebar":"docs","previous":{"title":"chan_extra","permalink":"/notes/voip/asterisk/chan_extra"},"next":{"title":"chan_pjsip","permalink":"/notes/voip/asterisk/chan_pjsip"}}'),s=t("52676"),r=t("79938");let a={title:"chan_iax"},l="chan_iax",o={},d=[{value:"iax.conf",id:"iaxconf",level:2},{value:"general",id:"general",level:3},{value:"user/peer",id:"userpeer",level:3},{value:"Unable to support trunking on peer without a timing interface",id:"unable-to-support-trunking-on-peer-without-a-timing-interface",level:2},{value:"IAX2 Trunk",id:"iax2-trunk",level:2},{value:"unmonitored",id:"unmonitored",level:2}];function c(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"chan_iax",children:"chan_iax"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["IAX - Inter-Asterisk-eXchange\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5355 TCP \u652F\u6301\u591A\u7EBF\u8DEF"}),"\n",(0,s.jsx)(n.li,{children:"\u65E9\u671F\u7528\u4E8E\u5BA2\u670D NAT \u95EE\u9898"}),"\n",(0,s.jsx)(n.li,{children:"2015 \u5E74 \u540E\u76F8\u5173\u5F00\u53D1\u8F83\u5C11"}),"\n",(0,s.jsx)(n.li,{children:"\u9ED8\u8BA4\u7AEF\u53E3 4569/udp"}),"\n",(0,s.jsx)(n.li,{children:"AES-128"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc5456",children:"rfc5456"}),"\nIAX: Inter-Asterisk eXchange Version 2"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817138",children:"Why IAX2?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"NAT"}),"\n",(0,s.jsxs)(n.li,{children:["High performance, low overhead protocol\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"4 bytes overhead"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Internationalization - \u4F20\u8F93\u5305\u542B\u8BED\u8A00\u4FE1\u606F"}),"\n",(0,s.jsx)(n.li,{children:"Remote dialplan polling"}),"\n",(0,s.jsx)(n.li,{children:"Flexible authentication"}),"\n",(0,s.jsx)(n.li,{children:"Multimedia protocol"}),"\n",(0,s.jsx)(n.li,{children:"Call statistic gathering"}),"\n",(0,s.jsx)(n.li,{children:"Call parameter communication"}),"\n",(0,s.jsx)(n.li,{children:"Single socket design"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://community.freepbx.org/t/is-iax2-still-best-trunk-type-for-internal-calling-between-freepbx-systems-specifically-related-to-encryption/61907/7",children:"Is IAX2 still best trunk type for Internal Calling between FreePBX Systems?"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u51FA\u5C40 ",(0,s.jsx)(n.code,{children:"IAX2/[<user>[:<secret>]@]<peer>[:<port_number>][/<extension>[@<context>][/<option>]]"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u5165\u5C40 ",(0,s.jsx)(n.code,{children:"IAX2/[[<username>@]<host>]/<call_number>"})]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u548C\u8001\u8BBE\u5907\u4EA4\u4E92\u4E0D\u80FD\u76F4\u8FDE\u7684\u65F6\u5019\u53EF\u4EE5\u8003\u8651 IAX"}),"\n",(0,s.jsx)(n.li,{children:"\u5BB9\u5668\u90E8\u7F72\uFF0C\u63D0\u4F9B webrtc\uFF0C\u5BF9\u63A5\u4E0A\u6E38\u7EBF\u8DEF\u53EF\u4EE5\u8003\u8651 IAX"}),"\n"]})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["iax \u9700\u8981\u53CC\u5411\u6CE8\u518C - \u53D6\u51B3\u4E8E\u7F51\u7EDC\u60C5\u51B5\uFF0C\u53EF\u80FD\u4F1A\u6709\u70B9\u9EBB\u70E6\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"A -> B"}),"\n",(0,s.jsx)(n.li,{children:"A <- B"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"iax \u51FA\u73B0\u65E0\u6CD5\u6CE8\u518C\uFF0C\u9700\u8981\u91CD\u542F\u624D\u80FD\u6CE8\u518C\u4E0A\u7684\u95EE\u9898"}),"\n"]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-conf",children:"load => chan_iax2\n; trunk \u9700\u8981 timing interface\nload => res_timing_timerfd\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u68C0\u6D4B iax2 \u7AEF\u53E3\u662F\u5426\u5F00\u653E\nnmap -sU --script iax2-version.nse -p 4569 192.168.1.2\n"})}),"\n",(0,s.jsx)(n.h2,{id:"iaxconf",children:"iax.conf"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["type=user\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u670D\u52A1\u7AEF\u5B9A\u4E49 - \u63A5\u53D7\u5BA2\u6237\u7AEF - \u63A5\u53D7\u547C\u53EB"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["type=peer\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5BA2\u6237\u7AEF\u5B9A\u4E49 - \u6CE8\u518C\u5230\u5BF9\u65B9 - \u53D1\u8D77\u547C\u53EB"}),"\n",(0,s.jsx)(n.li,{children:"\u5982\u679C host \u4E3A dynamic \u5219\u9700\u8981 register \u6CE8\u518C"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["type=friend\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u521B\u5EFA user+peer"}),"\n",(0,s.jsx)(n.li,{children:"\u5982\u679C\u8BBE\u7F6E\u4E86 host=hostname,domain.ext \u5219\u4F1A\u9650\u5B9A\u53EF\u53D1\u8D77\u8BF7\u6C42\u7684 peer"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.voip-info.org/asterisk-iax-qualify/",children:"Asterisk iax qualify"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"iax2 reload\n"})}),"\n",(0,s.jsx)(n.h3,{id:"general",children:"general"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-conf",children:"[general]\n; \u914D\u7F6E\u9700\u8981\u5728 bindaddr \u4E4B\u524D\nbindport=4569\n\n; \u9ED8\u8BA4\u76D1\u542C\u6240\u6709\n; \u4E5F\u53EF\u4EE5\u5305\u542B\u7AEF\u53E3 192.168.0.1:4569\n;bindaddr=192.168.0.1\n\n; \u72EC\u7ACB\u7EBF\u7A0B\u5904\u7406 IAX2 DPREQ - \u4E00\u5B9A\u7684\u6027\u80FD\u6362\u53D6\u66F4\u597D\u7684\u5EF6\u65F6\n; \u9ED8\u8BA4 block \u5904\u7406\n; iaxcompat=yes\n\n; UDP checksum\n;nochecksums=yes\n\n; \u907F\u514D\u5BC6\u7801\u7206\u7834 - \u5EF6\u8FDF reject\n;delayreject=yes\n\n\n; \u5168\u5C40 iaxtel AMA flag - \u751F\u6210 cdr \u4F1A\u7528\u5230\n; default, omit, billing, documentation\n;amaflags=billing\n\n; ADSI/Analog Display Services Interface \u517C\u5BB9 CPE \u8BBE\u5907\n;adsi=yes\n\n; \u547C\u51FA\u65F6\u67E5\u8BE2 SRV\n;srvlookup=yes\n\n; \u9ED8\u8BA4 CDR \u8D26\u53F7\n;accountcode=lss0101\n\n; \u9ED8\u8BA4\u8BED\u8A00\u4EE3\u7801\n;language=en\n\n; This option specifies a preference for which music-on-hold class this channel\n; should listen to when put on hold if the music class has not been set on the\n; channel with Set(CHANNEL(musicclass)=whatever) in the dialplan, and the peer\n; channel putting this one on hold did not suggest a music class.\n;\n; If this option is set to \"passthrough\", then the hold message will always be\n; passed through as signalling instead of generating hold music locally.\n;\n; This option may be specified globally, or on a per-user or per-peer basis.\n;\n; Accepted values: passthrough, or any music-on-hold class name\n; Default value:   <empty>\n;\n;mohinterpret=default\n;\n\n;\n; The 'mohsuggest' option specifies which music on hold class to suggest to the\n; peer channel when this channel places the peer on hold. It may be specified\n; globally or on a per-user or per-peer basis.\n;\n;mohsuggest=default\n;\n\n; \u5E26\u5BBD\u60C5\u51B5\n; low, medium, high\nbandwidth=low\n\n; \u7F16\u7801\u914D\u7F6E\n;allow=all\n;disallow=g723.1\ndisallow=lpc10\n;allow=gsm\n\n\n; Jitter Buffer/\u6296\u52A8\u7F13\u51B2\u5668\n; ======================\n;\n; You can adjust several parameters relating to the jitter buffer.  The jitter\n; buffer's function is to compensate for varying network delay.\n;\n; All of the jitter buffer settings are in milliseconds.  The jitter buffer\n; works for INCOMING audio only - the outbound audio will be dejittered by the\n; jitter buffer at the other end.\n;\n; jitterbuffer=yes|no: global default as to whether you want\n; the jitter buffer at all.\n;\n; maxjitterbuffer: a maximum size for the jitter buffer.\n; Setting a reasonable maximum here will prevent the call delay\n; from rising to silly values in extreme situations; you'll hear\n; SOMETHING, even though it will be jittery.\n;\n; resyncthreshold: when the jitterbuffer notices a significant change in delay\n; that continues over a few frames, it will resync, assuming that the change in\n; delay was caused by a timestamping mix-up. The threshold for noticing a\n; change in delay is measured as twice the measured jitter plus this resync\n; threshold.\n; Resyncing can be disabled by setting this parameter to -1.\n;\n; maxjitterinterps: the maximum number of interpolation frames the jitterbuffer\n; should return in a row. Since some clients do not send CNG/DTX frames to\n; indicate silence, the jitterbuffer will assume silence has begun after\n; returning this many interpolations. This prevents interpolating throughout\n; a long silence.\n;\n; jittertargetextra: number of milliseconds by which the new jitter buffer\n; will pad its size. the default is 40, so without modification, the new\n; jitter buffer will set its size to the jitter value plus 40 milliseconds.\n; increasing this value may help if your network normally has low jitter,\n; but occasionally has spikes.\n;\n\njitterbuffer=no\n;maxjitterbuffer=1000\n;maxjitterinterps=10\n;resyncthreshold=1000\n;jittertargetextra=40\n\n\n; IAX2 Encryption\n; ===============\n; \u5F00\u542F\u52A0\u5BC6\n;encryption=yes\n\n; \u5F3A\u5236\u52A0\u5BC6 - \u9690\u542B encryption=yes\n;forceencryption=yes\n\n; IAX2 trunk \u6700\u5927 payload - \u5355\u4F4D byte\n; \u4F8B\u5982 \u6700\u5927800\u901A\u8BDD\uFF0C 20ms \u6BCF frame\uFF0C\u4F7F\u7528 ulaw\n;\n;     (8000hz / 1000ms) * 20ms * 1 byte per sample = 160 bytes per frame\n;\n; \u6700\u5927\u5E26\u5BBD\u4E3A:\n;\n;     (160 bytes per frame) * (800 calls) = 128000 bytes\n;\n; \u8D85\u8FC7\u9650\u5236\u547C\u53EB\u53EF\u80FD\u4F1A\u88AB\u5FFD\u7565\n; \u9ED8\u8BA4 128000 - 128k\n; trunkmaxsize = 128000\n\n; \u6D41\u91CF\u5927\u7684\u65F6\u5019\u7531\u7CFB\u7EDF\u5904\u7406 udp \u5206\u7247\u53EF\u80FD\u5F71\u54CD\u901A\u8BDD\u8D28\u91CF\n; \u8BBE\u7F6E mtu \u907F\u514D\u7CFB\u7EDF\u5904\u7406 udp \u5206\u7247 - \u8BBE\u7F6E\u4E3A 0 \u5219\u7531\u7CFB\u7EDF\u5904\u7406\n; trunkmtu = 1240\n\n; \u6D88\u606F\u53D1\u9001\u9891\u7387 - \u5355\u4F4D ms \u9ED8\u8BA4 20ms\uFF0C\u63A5\u53D7 10ms - 1000ms\n; \u5982\u679C\u6D88\u606F\u8FBE\u5230\u4E86 trunkmtu \u4E5F\u4F1A\u53D1\u9001\n; trunkfreq=20\n\n; Should we send timestamps for the individual sub-frames within trunk frames?\n; There is a small bandwidth use for these (less than 1kbps/call), but they\n; ensure that frame timestamps get sent end-to-end properly.  If both ends of\n; all your trunks go directly to TDM, _and_ your trunkfreq equals the frame\n; length for your codecs, you can probably suppress these.  The receiver must\n; also support this feature, although they do not also need to have it enabled.\n;\n; trunktimestamps=yes\n\n; \u6CE8\u518C\u95F4\u9694 - \u5355\u4F4D \u79D2\n; minregexpire = 60\n; maxregexpire = 60\n\n; IAX2 helper threads\n\n; Establishes the number of iax helper threads to handle I/O.\n; iaxthreadcount = 10\n\n; Establishes the number of extra dynamic threads that may be spawned to handle I/O\n; iaxmaxthreadcount = 100\n\n; \u6CE8\u518C\u5230\u53E6\u5916\u4E00\u4E2A IAX2 \u670D\u52A1\u5668 - \u53D1\u73B0 IP\n;\n;register => marko:secretpass@tormenta.linux-support.net\n;\n; \u65E0\u5BC6\u7801\n;\n;register => joe@remotehost:5656\n;\n; RSA key \u6CE8\u518C\n;\n;register => marko:[torkey]@tormenta.linux-support.net\n;\n; Sample Registration for iaxtel\n;\n; Visit http://www.iaxtel.com to register with iaxtel.  Replace \"user\"\n; and \"pass\" with your username and password for iaxtel.  Incoming\n; calls arrive at the \"s\" extension of \"default\" context.\n;\n;register => user:pass@iaxtel.com\n;\n; Sample Registration for IAX2 + FWD\n;\n; To register using IAX2 with FWD, it must be enabled by visiting the URL\n; http://www.fwdnet.net/index.php?section_id=112\n;\n; Note that you need an extension in you default context which matches\n; your free world dialup number.  Please replace \"FWDNumber\" with your\n; FWD number and \"passwd\" with your password.\n;\n;register => FWDNumber:passwd@iax.fwdnet.net\n\n\n; \u5F00\u542F res_stun_monitor \u6A21\u5757\u540E\u53EF\u8BA2\u9605\u7F51\u7EDC\u53D8\u5316\uFF0C\u7F51\u7EDC\u53D8\u5316\u540E\u91CD\u65B0\u6CE8\u518C\n; \u9ED8\u8BA4\u5F00\u542F\n; subscribe_network_change_event = yes\n\n; \u5F00\u542F\u8BA4\u8BC1\u8C03\u8BD5\u65E5\u5FD7\n;authdebug = yes\n;\n; See https://wiki.asterisk.org/wiki/display/AST/IP+Quality+of+Service for a description of these parameters.\n;tos=ef\n;cos=5\n\n; \u8BBE\u7F6E\u540E\u4F1A\u52A8\u6001\u521B\u5EFA NoOp extension\n; & \u5206\u9694\u6307\u5B9A\u591A\u4E2A\n;regcontext=iaxregistrations\n\n; NEW \u540E 2000ms \u672A\u54CD\u5E94 ACK \u5219 \u81EA\u52A8 kill - \u907F\u514D\u5F02\u5E38\u5BFC\u81F4\u5361\u6B7B\n; \u4E5F\u53EF\u4EE5\u76F4\u63A5\u6307\u5B9A \u65F6\u95F4 - \u5355\u4F4D ms\n; \u5355\u4E2A peer \u4F7F\u7528 qualify \u63A7\u5236\nautokill=yes\n\n; \u7F16\u7801\u534F\u5546\u903B\u8F91 - \u9ED8\u8BA4 host\n; caller - \u4F18\u5148 caller \u5B9A\u4E49\u7684\u7F16\u7801\n; host - host \u5B9A\u4E49\u7684\u7F16\u7801\n; disabled\n; reqonly - \u7C7B\u4F3C disabled\uFF0C\u4F46\u5982\u679C\u7F16\u7801\u4E0D\u652F\u6301\u53EF\u4EE5\u8BF7\u6C42\u65B0\u7684\u7F16\u7801\n;codecpriority=host\n;\n; allowfwdownload controls whether this host will serve out firmware to\n; IAX2 clients which request it.  This has only been used for the IAXy,\n; and it has been recently proven that this firmware distribution method\n; can be used as a source of traffic amplification attacks.  Also, the\n; IAXy firmware has not been updated for at least 18 months, so unless\n; you are provisioning IAXys in a secure network, we recommend that you\n; leave this option to the default, off.\n; IAXy \u76F8\u5173\n;allowfwdownload=yes\n\n;rtcachefriends=yes ; Cache realtime friends by adding them to the internal list\n                    ; just like friends added from the config file only on a\n                    ; as-needed basis? (yes|no)\n\n;rtsavesysname=yes  ; Save systemname in realtime database at registration\n                    ; Default = no\n\n;rtupdate=yes       ; Send registry updates to database using realtime? (yes|no)\n                    ; If set to yes, when a IAX2 peer registers successfully,\n                    ; the IP address, the origination port, the registration period,\n                    ; and the username of the peer will be set to database via realtime.\n                    ; If not present, defaults to 'yes'.\n\n;rtautoclear=yes    ; Auto-Expire friends created on the fly on the same schedule\n                    ; as if it had just registered? (yes|no|<seconds>)\n                    ; If set to yes, when the registration expires, the friend will\n                    ; vanish from the configuration until requested again.\n                    ; If set to an integer, friends expire within this number of\n                    ; seconds instead of the registration interval.\n\n;rtignoreregexpire=yes ; When reading a peer from Realtime, if the peer's registration\n                       ; has expired based on its registration interval, used the stored\n                       ; address information regardless. (yes|no)\n\n;parkinglot=edvina     ; Default parkinglot for IAX2 peers and users\n                       ; This can also be configured per device\n                       ; Parkinglots are defined in features.conf\n\n;\n; The following two options are used to disable call token validation for the\n; purposes of interoperability with IAX2 endpoints that do not yet support it.\n;\n; Call token validation can be set as optional for a single IP address or IP\n; address range by using the 'calltokenoptional' option. 'calltokenoptional' is\n; only a global option.\n;\n;calltokenoptional=209.16.236.73/255.255.255.0\n\n; \u8BBE\u7F6E\u4E3A no \u5219\u4E0D\u9700\u8981\u9A8C\u8BC1 call token - \u5728\u5B9A\u4E49 peer/user/friend \u65F6\u4F7F\u7528\n; \u9ED8\u8BA4 yes\n;requirecalltoken=no\n; \u6700\u5927 call token \u8BA4\u8BC1\u63E1\u624B\u65F6\u95F4 -  \u5355\u4F4D \u79D2\n;calltokenexpiration=10\n\n; \u6BCF\u4E2A\u8FDC\u7A0B IP \u5141\u8BB8\u7684\u62E8\u53F7\u6570\u91CF - \u8D85\u8FC7\u4E0D\u518D\u5EFA\u7ACB\u65B0\u94FE\u63A5\n;maxcallnumbers=512\n; \u8BE5\u9650\u5236\u4E0D\u533A\u5206 IP - \u8BA1\u7B97\u672A\u9A8C\u8BC1 call token \u7684\u6570\u91CF\n; \u9ED8\u8BA4 8192\n;maxcallnumbers_nonvalidated=1024\n\n; \u6839\u636E IP \u9650\u5B9A\u547C\u53EB\u6570\u91CF\n;[callnumberlimits]\n; \u8303\u56F4\u5185\u72EC\u7ACB IP \u9650\u5236\u800C\u4E0D\u662F IP \u6BB5\u603B\u6570\n;10.1.1.0/255.255.255.0 = 24\n;10.1.2.0/255.255.255.0 = 32\n\n; \u79FB\u9664 '(', ' ', ')', non-trailing '.', and '-' not in square brackets\n; \u4F8B\u5982 555.5555 -> 5555555\n; \u9ED8\u8BA4 \u5F00\u542F\n;shrinkcallerid=yes     ; on by default\n"})}),"\n",(0,s.jsx)(n.h3,{id:"userpeer",children:"user/peer"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["register \u6620\u5C04 peer - \u52A8\u6001 IP \u573A\u666F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u53CD\u5411\u6CE8\u518C\u5230\u5BF9\u65B9\uFF0C\u800C\u4E0D\u662F\u5BF9\u65B9\u901A\u8FC7 peer \u5B9A\u4E49\u94FE\u63A5"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u7528\u6237\u8BA4\u8BC1\u65B9\u5F0F - username+secret"}),"\n",(0,s.jsxs)(n.li,{children:["\u5BC6\u94A5\u65B9\u5F0F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"plaintext"}),"\n",(0,s.jsx)(n.li,{children:"md5"}),"\n",(0,s.jsxs)(n.li,{children:["rsa\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["inkeys - \u63A5\u53D7\u7684 pubkey - ",(0,s.jsx)(n.code,{children:"/var/lib/asterisk/keys/<name>.pub"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:":"})," \u5206\u5272"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["outkey - \u53D1\u8D77\u8BF7\u6C42\u7684 key - ",(0,s.jsx)(n.code,{children:"/var/lib/asterisk/keys/<name>.key"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"3DES encrypted"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u8BBF\u95EE\u63A7\u5236 - permit,deny,acl"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-conf",children:'; guest \u914D\u7F6E\u672A\u8BA4\u8BC1\u8FDE\u63A5\u8BF7\u6C42 - \u53EF\u914D\u7F6E secret\n[guest]\ntype=user\ncontext=public\ncallerid="Guest IAX User"\n\n; \u7528\u6237\u914D\u7F6E\n;[markster]\n;type=user\n;context=default\n;context=local\n;auth=md5,plaintext,rsa\n; \u53EF\u5199\u591A\u884C secret \u5B9E\u73B0\u591A\u5BC6\u7801\n;secret=markpasswd\n;setvar=ATTENDED_TRANSFER_COMPLETE_SOUND=beep   ; This channel variable will\n                                                ; cause the given audio file to\n                                                ; be played upon completion of\n                                                ; an attended transfer to the\n                                                ; target of the transfer.\n;dbsecret=mysecrets/place    ; Secrets can be stored in astdb, too\n;transfer=no                 ; Disable IAX2 native transfer\n;transfer=mediaonly          ; When doing IAX2 native transfers, transfer only\n                             ; the media stream\n;jitterbuffer=yes            ; Override the global setting and enable the jitter\n                             ; buffer for this user\n;maxauthreq=10               ; Set the maximum number of outstanding AUTHREQs\n                             ; waiting for replies. If this limit is reached,\n                             ; any further authentication will be blocked, until\n                             ; the pending requests expire or a reply is\n                             ; received.\n; \u8986\u76D6 CallerID\n;callerid="Mark Spencer" <(256) 428-6275>\n;deny=0.0.0.0/0.0.0.0\n;permit=209.16.236.73/255.255.255.0\n;accountcode=markster0101\n;language=en                 ; Use english as default language\n;encryption=yes              ; \u5F00\u542F\u52A0\u5BC6\n;keyrotate=off               ; \u9ED8\u8BA4\u5F00\u542F - \u65E7\u7248\u672C\u4E0D\u77E5\u652F\u6301 - IAX_COMMAND_RTENC\n\n;\n; \u5B9A\u4E49\u8FDC\u7A0B\u8282\u70B9 peer\n;\n;[demo]\n;type=peer\n;username=asterisk\n;secret=supersecret\n; \u4E3B\u673A\n;host=192.168.10.10\n; iax2 show peers \u63CF\u8FF0\n;description=My IAX2 Peer\n;sendani=no\n;host=asterisk.linux-support.net\n;port=5036\n;mask=255.255.255.255\n;qualify=yes                ; Make sure this peer is alive.\n;qualifysmoothing = yes     ; Use an average of the last two PONG results to\n                            ; reduce falsely detected LAGGED hosts.  The default\n                            ; is \'no.\'\n;qualifyfreqok = 60000      ; OK \u72B6\u6001 PING \u95F4\u9694 - \u5355\u4F4D ms\n;qualifyfreqnotok = 10000   ; \u975E OK\uFF08LAGGED/UNAVAILABLE\uFF09 \u72B6\u6001 PING \u95F4\u9694 - \u5355\u4F4D ms\n;jitterbuffer=no            ; Turn off jitter buffer for this peer\n;\n;encryption=yes             ; \u9ED8\u8BA4\u4E0D\u5F00\u542F\n;keyrotate=off              ; \u9ED8\u8BA4\u4E0D\u5F00\u542F\n\n; Peers can remotely register as well, so that they can be mobile.  Default\n; IPs can also optionally be given but are not required.  Caller*ID can be\n; suggested to the other side as well if it is for example a phone instead of\n; another PBX.\n; yes - \u53D1\u9001\u63A5\u53D7 connected line\n; send - \u53EA\u53D1\u9001\n; receive\n; no - Asterisk v1.4 peer \u9700\u8981\u8BBE\u7F6E no\n; \u4E0D\u517C\u5BB9\u8868\u73B0\u4E3A\u901A\u8BDD\u5F02\u5E38\u4E2D\u65AD\n;connectedline=yes\n\n\n;[dynamichost]\n;host=dynamic\n;secret=mysecret\n; Note: app_voicemail mailboxes must be in the form of mailbox@context.\n;mailbox=1234		; Notify about mailbox 1234\n;inkeys=key1:key2\n;peercontext=local	; Default context to request for calls to peer\n;defaultip=216.207.245.34\n;callerid="Some Host" <(256) 428-6011>\n\n;[biggateway]\n;type=peer\n;host=192.168.0.1\n;description=Gateway to PSTN\n;context=*\n;secret=myscret\n;trunk=yes			; Use IAX2 trunking with this host\n;timezone=America/New_York	; Set a timezone for the date/time IE\n\n;\n; Friends are a shortcut for creating a user and a peer with the same values.\n;\n\n;[marko]\n;type=friend\n;host=dynamic\n;regexten=1234\n;secret=moofoo   ; Multiple secrets may be specified. For a "user", all\n;secret=foomoo   ; specified entries will be accepted as valid. For a "peer",\n;secret=shazbot  ; only the last specified secret will be used.\n;context=default\n;permit=0.0.0.0/0.0.0.0\n;acl=example_named_acl\n\n;\n; With immediate=yes, an IAX2 phone or a phone on an IAXy acts as a hot-line\n; which goes immediately to the s extension when picked up.  Useful for\n; elevator phones, manual service, or other similar applications.\n;\n;[manual]\n;type=friend\n;host=dynamic\n;immediate=yes  ; go immediately to s extension when picked up\n;secret=moofoo	; when immediate=yes is specified, secret is required\n;context=number-please ; we start at the s extension in this context\n;\n\n; Trust Caller*ID Coming from iaxtel.com\n[iaxtel]\ntype=user\ncontext=default\nauth=rsa\ninkeys=iaxtel\n\n; Trust Caller*ID Coming from iax.fwdnet.net\n[iaxfwd]\ntype=user\ncontext=default\nauth=rsa\ninkeys=freeworlddialup\n\n; Trust Caller*ID delivered over DUNDi/e164\n;[dundi]\n;type=user\n;dbsecret=dundi/secret\n;context=dundi-e164-local\n'})}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"unable-to-support-trunking-on-peer-without-a-timing-interface",children:"Unable to support trunking on peer without a timing interface"}),"\n",(0,s.jsx)(n.p,{children:"\u52A0\u8F7D\u4E00\u4E2A timing interface \u5B9E\u73B0"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"res_timing_timerfd"}),"\n",(0,s.jsx)(n.li,{children:"res_timing_pthread"}),"\n",(0,s.jsx)(n.li,{children:"res_timing_dahdi"}),"\n",(0,s.jsx)(n.li,{children:"res_timing_kqueue"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"module load res_timing_timerfd\n"})}),"\n",(0,s.jsx)(n.h1,{id:"faq-1",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"iax2-trunk",children:"IAX2 Trunk"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4E92\u76F8 register"}),"\n",(0,s.jsx)(n.li,{children:"\u4E92\u76F8\u6DFB\u52A0 friend"}),"\n",(0,s.jsx)(n.li,{children:"\u53EF\u4EE5\u901A\u8FC7 deny+permit \u6765\u63D0\u9AD8\u5B89\u5168\u6027"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"A/iax.conf"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[general]\nregister => B:B@192.168.1.2\n\n[B]\ntype=friend\nhost=dynamic\ntrunk=yes\nsecret=B\ncontext=iaxinbound\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"B/iax.conf"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[general]\nregister => A:A@192.168.1.2\n\n[A]\ntype=friend\nhost=dynamic\ntrunk=yes\nsecret=A\ncontext=iaxinbound\n"})}),"\n",(0,s.jsx)(n.h2,{id:"unmonitored",children:"unmonitored"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"reload"}),"\n",(0,s.jsxs)(n.li,{children:["qualify\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u65E0 qualify \u4F1A\u53D8\u6210 unmonitored"}),"\n",(0,s.jsx)(n.li,{children:"qualify \u540E\u53EF\u80FD\u662F offline"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["restart\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5982\u679C\u4E00\u76F4 offline\uFF0C\u6CE8\u518C\u6709\u53D1\u9001\uFF0C\u5C1D\u8BD5\u91CD\u542F\u8FDC\u7A0B asterisk"}),"\n",(0,s.jsx)(n.li,{children:"\u9047\u5230\u8FC7\u51E0\u6B21"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u5C1D\u8BD5 reload\nmodule unload chan_iax2\nmodule load chan_iax2\n"})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return a}});var i=t(75271);let s={},r=i.createContext(s);function a(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);