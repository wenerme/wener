"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["47395"],{98470:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>l,default:()=>j,assets:()=>c,toc:()=>h,frontMatter:()=>t});var i=JSON.parse('{"id":"voip/asterisk/channel","title":"Asterisk \u901A\u9053","description":"- Channel Drivers","source":"@site/../notes/voip/asterisk/asterisk-channel.md","sourceDirName":"voip/asterisk","slug":"/voip/asterisk/channel","permalink":"/notes/voip/asterisk/channel","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/asterisk/asterisk-channel.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1623313312000,"frontMatter":{"id":"channel","title":"Asterisk \u901A\u9053"},"sidebar":"docs","previous":{"title":"Asterisk CDR","permalink":"/notes/voip/asterisk/cdr"},"next":{"title":"Asterisk \u7F16\u7801","permalink":"/notes/voip/asterisk/codec"}}'),d=s("52676"),r=s("79938");let t={id:"channel",title:"Asterisk \u901A\u9053"},l="Asterisk \u901A\u9053",c={},h=[{value:"\u901A\u9053\u7C7B\u578B",id:"\u901A\u9053\u7C7B\u578B",level:2},{value:"\u901A\u9053\u6A21\u5757",id:"\u901A\u9053\u6A21\u5757",level:2},{value:"chan_sip vs chan_pjsip",id:"chan_sip-vs-chan_pjsip",level:2}];function x(n){let e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.header,{children:(0,d.jsx)(e.h1,{id:"asterisk-\u901A\u9053",children:"Asterisk \u901A\u9053"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://wiki.asterisk.org/wiki/display/AST/Channel+Drivers",children:"Channel Drivers"})}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"# \u6240\u6709\u6CE8\u518C\u7684\u901A\u9053\u7C7B\u578B\ncore show channeltypes\n"})}),"\n",(0,d.jsx)(e.h2,{id:"\u901A\u9053\u7C7B\u578B",children:"\u901A\u9053\u7C7B\u578B"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"chan_oss\u3001chan_alsa\u3001chan_console \u53EA\u80FD\u6CE8\u518C\u4E00\u4E2A - \u56E0\u4E3A\u5728\u505A\u540C\u4E00\u4EF6\u4E8B"}),"\n",(0,d.jsx)(e.li,{children:"SIP \u529F\u80FD\u53EF\u7531 chan_sip \u548C chan_pjsip \u63D0\u4F9B - \u76EE\u524D\u5EFA\u8BAE\u4F7F\u7528 pjsip"}),"\n",(0,d.jsx)(e.li,{children:"IAX \u662F asterisk \u4E4B\u95F4\u7684\u901A\u8BAF\u534F\u8BAE - \u7528\u4E8E\u5B9E\u73B0\u591A\u5B9E\u4F8B\uFF0C\u4E92\u76F8\u53D1\u73B0\uFF0C\u5916\u90E8\u7EBF\u8DEF\u7B49"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"Type"}),(0,d.jsx)(e.th,{children:"Description"}),(0,d.jsx)(e.th,{children:"Devicestate"}),(0,d.jsx)(e.th,{children:"Presencestate"}),(0,d.jsx)(e.th,{children:"Indications"}),(0,d.jsx)(e.th,{children:"Transfer"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Announcer"}),(0,d.jsx)(e.td,{children:"Bridge Media Announcing Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"CBAnn"}),(0,d.jsx)(e.td,{children:"Conference Bridge Announcing Channel"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"CBRec"}),(0,d.jsx)(e.td,{children:"Conference Bridge Recording Channel"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Console"}),(0,d.jsx)(e.td,{children:"OSS Console Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"DAHDI"}),(0,d.jsx)(e.td,{children:"DAHDI Telephony w/PRI"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Dongle"}),(0,d.jsx)(e.td,{children:"Huawei 3G Dongle Channel Driver"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"IAX2"}),(0,d.jsx)(e.td,{children:"Inter Asterisk eXchange Driver (Ver 2)"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"yes"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Local"}),(0,d.jsx)(e.td,{children:"Local Proxy Channel Driver"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"MGCP"}),(0,d.jsx)(e.td,{children:"Media Gateway Control Protocol (MGCP)"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"MulticastRTP"}),(0,d.jsx)(e.td,{children:"Multicast RTP Paging Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"PJSIP"}),(0,d.jsx)(e.td,{children:"PJSIP Channel Driver"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"yes"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Recorder"}),(0,d.jsx)(e.td,{children:"Bridge Media Recording Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"SIP"}),(0,d.jsx)(e.td,{children:"Session Initiation Protocol (SIP)"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"yes"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Skinny"}),(0,d.jsx)(e.td,{children:"Skinny Client Control Protocol (Skinny)"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"Surrogate"}),(0,d.jsx)(e.td,{children:"Surrogate channel used to pull channel f"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"UnicastRTP"}),(0,d.jsx)(e.td,{children:"Unicast RTP Media Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"USTM"}),(0,d.jsx)(e.td,{children:"UNISTIM Channel Driver"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"no"}),(0,d.jsx)(e.td,{children:"yes"}),(0,d.jsx)(e.td,{children:"no"})]})]})]}),"\n",(0,d.jsxs)(e.blockquote,{children:["\n",(0,d.jsx)(e.p,{children:"chan_mobile \u548C chan_dongle \u6CA1\u663E\u793A - \u56E0\u4E3A\u6CE8\u518C\u5931\u8D25"}),"\n"]}),"\n",(0,d.jsx)(e.h2,{id:"\u901A\u9053\u6A21\u5757",children:"\u901A\u9053\u6A21\u5757"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"Module"}),(0,d.jsx)(e.th,{children:"Description"}),(0,d.jsx)(e.th,{style:{textAlign:"right"},children:"Support Level"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_bridge_media.so"}),(0,d.jsx)(e.td,{children:"Bridge Media Channel Driver"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"core"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_dahdi.so"}),(0,d.jsx)(e.td,{children:"DAHDI Telephony w/PRI"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"core"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_dongle.so"}),(0,d.jsx)(e.td,{children:"Huawei 3G Dongle Channel Driver"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_iax2.so"}),(0,d.jsx)(e.td,{children:"Inter Asterisk eXchange (Ver 2)"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"core"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_mgcp.so"}),(0,d.jsx)(e.td,{children:"Media Gateway Control Protocol (MGCP)"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_mobile.so"}),(0,d.jsx)(e.td,{children:"Bluetooth Mobile Device Channel Driver"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_oss.so"}),(0,d.jsx)(e.td,{children:"OSS Console Channel Driver"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"deprecated"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_pjsip.so"}),(0,d.jsx)(e.td,{children:"PJSIP Channel Driver"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"core"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_rtp.so"}),(0,d.jsx)(e.td,{children:"RTP Media Channel"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"core"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_sip.so"}),(0,d.jsx)(e.td,{children:"Session Initiation Protocol (SIP)"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_skinny.so"}),(0,d.jsx)(e.td,{children:"Skinny Client Control Protocol (Skinny)"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"chan_unistim.so"}),(0,d.jsx)(e.td,{children:"UNISTIM Protocol (USTM)"}),(0,d.jsx)(e.td,{style:{textAlign:"right"},children:"extended"})]})]})]}),"\n",(0,d.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,d.jsx)(e.h2,{id:"chan_sip-vs-chan_pjsip",children:"chan_sip vs chan_pjsip"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:["chan_sip\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"2014 \u5E74\u524D - SIP \u65E9\u671F"}),"\n",(0,d.jsx)(e.li,{children:"Asterisk <= 11"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["chan_pjsip\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"Asterisk >= 12"}),"\n",(0,d.jsx)(e.li,{children:"\u57FA\u4E8E PJSIP \u5E93 - \u72EC\u7ACB\u4E8E Asterisk"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["\u5982\u679C\u53EA\u5904\u7406 VoIP - chan_sip \u8DB3\u77E3\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"\u4F20\u7EDF\u7684\u7535\u8BDD\u7F51\u5173\u90FD\u4F7F\u7528\u975E\u5E38\u8001\u7248\u672C\u7684 asterisk - \u4F8B\u5982 1.8"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["\u5982\u679C\u9700\u8981\u5904\u7406\u73B0\u4EE3\u5316\u901A\u8BAF - \u4F7F\u7528 chan_pjsip\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"Websocket"}),"\n",(0,d.jsx)(e.li,{children:"WebRTC"}),"\n",(0,d.jsx)(e.li,{children:"\u89C6\u9891"}),"\n",(0,d.jsx)(e.li,{children:"\u65B0\u7684\u7F16\u7801 - Opus, VP8, VP9"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://wiki.asterisk.org/wiki/display/AST/Migrating+from+chan_sip+to+res_pjsip",children:"Migrating from chan_sip to res_pjsip"})}),"\n"]}),"\n"]}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,d.jsx)(e,{...n,children:(0,d.jsx)(x,{...n})}):x(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return l},a:function(){return t}});var i=s(75271);let d={},r=i.createContext(d);function t(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);