"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["3792"],{7579:function(e,i,n){n.r(i),n.d(i,{metadata:()=>s,contentTitle:()=>c,default:()=>a,assets:()=>h,toc:()=>p,frontMatter:()=>t});var s=JSON.parse('{"id":"voip/dev/pjsip","title":"PJSIP","description":"Tips","source":"@site/../notes/voip/dev/pjsip.md","sourceDirName":"voip/dev","slug":"/voip/dev/pjsip","permalink":"/notes/voip/dev/pjsip","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/dev/pjsip.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1621311972000,"frontMatter":{"title":"PJSIP"},"sidebar":"docs","previous":{"title":"res_sorcery","permalink":"/notes/voip/asterisk/res_sorcery"},"next":{"title":"fonoster","permalink":"/notes/voip/fonoster"}}'),r=n("52676"),l=n("79938");let t={title:"PJSIP"},c="PJSIP",h={},p=[{value:"Tips",id:"tips",level:2},{value:"Versions",id:"versions",level:2},{value:"FAQ",id:"faq",level:2},{value:"How can I apply a fix from a particular ticket ?",id:"how-can-i-apply-a-fix-from-a-particular-ticket-",level:3}];function d(e){let i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"pjsip",children:"PJSIP"})}),"\n",(0,r.jsx)(i.h2,{id:"tips",children:"Tips"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"http://www.pjsip.org/",children:"pjsip.org"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Write in C"}),"\n",(0,r.jsxs)(i.li,{children:["\u652F\u6301 C++\uFF0C Pythone \u548C Java\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"http://www.pjsip.org/docs/book-latest/html/intro_pjsua2.html",children:"http://www.pjsip.org/docs/book-latest/html/intro_pjsua2.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://github.com/pjsip/pjproject",children:"pjsip/pjproject"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://git.alpinelinux.org/cgit/aports/tree/main/pjproject/APKBUILD",children:"pjproject/APKBUILD"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/wiki/PJSIP-Datasheet",children:"PJSIP-Datasheet"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/roadmap",children:"Roadmap"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"http://www.pjsip.org/links.htm",children:"Open Source SIP Stack and Media Links"})}),"\n",(0,r.jsx)(i.li,{children:"Asterisk 13 \u5F00\u59CB\u53EF\u4EE5\u9009\u62E9\u4F7F\u7528\u5C01\u88C5\u7684 pjsip"}),"\n",(0,r.jsxs)(i.li,{children:["WebRTC\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://github.com/pjsip/pjproject/tree/master/third_party/webrtc",children:"https://github.com/pjsip/pjproject/tree/master/third_party/webrtc"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["SRTP \u57FA\u4E8E ",(0,r.jsx)(i.a,{href:"https://github.com/cisco/libsrtp",children:"https://github.com/cisco/libsrtp"})]}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://github.com/pjsip/pjproject/tree/master/pjsip-apps/src/swig",children:"https://github.com/pjsip/pjproject/tree/master/pjsip-apps/src/swig"})}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"versions",children:"Versions"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://github.com/pjsip/pjproject/releases/tag/2.11",children:"2.11"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2021-03-17"}),"\n",(0,r.jsx)(i.li,{children:"Trickle ICE"}),"\n",(0,r.jsx)(i.li,{children:"iOS native SSL"}),"\n",(0,r.jsx)(i.li,{children:"Android native codecs - H264, VP8, VP9, AMR-NB, AMR-WB"}),"\n",(0,r.jsxs)(i.li,{children:["iOS Swift \u548C Android Kotlin ",(0,r.jsx)(i.a,{href:"https://github.com/pjsip/pjproject/tree/2.11/pjsip-apps",children:"\u793A\u4F8B\u5E94\u7528"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/milestone/release-2.10",children:"2.10"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2019-12-31"}),"\n",(0,r.jsx)(i.li,{children:"WebRTC \u89C6\u9891\u4EA4\u4E92 - RTCP-FB PLI, VP8 VP9 \u7F16\u7801"}),"\n",(0,r.jsxs)(i.li,{children:["\u97F3\u9891\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"\u57FA\u4E8E RTCP \u52A8\u6001\u8C03\u6574\u7801\u7387 - Opus, AMR, Speex"}),"\n",(0,r.jsx)(i.li,{children:"MacOS Voice Processing IO"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/milestone/release-2.9",children:"2.9"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2019-6-13"}),"\n",(0,r.jsx)(i.li,{children:"\u89C6\u9891\u4F1A\u8BAE"}),"\n",(0,r.jsx)(i.li,{children:"macOS & iOS native SSL backen"}),"\n",(0,r.jsx)(i.li,{children:"TURN over TLS"}),"\n",(0,r.jsx)(i.li,{children:"SIP \u591A\u8DEF\u76D1\u542C"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/milestone/release-2.8",children:"2.8"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2018-9-5"}),"\n",(0,r.jsxs)(i.li,{children:["\u4E3B\u8981\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"OPUS param on the fly"}),"\n",(0,r.jsx)(i.li,{children:"WebRTC interopability - RTP/SAVPF - SSRC"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/milestone/release-2.7",children:"2.7"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2017-9-25"}),"\n",(0,r.jsxs)(i.li,{children:["\u4E3B\u8981\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"DTLS for SRTP keying"}),"\n",(0,r.jsx)(i.li,{children:"iOS (and Mac) H.264 Native Encoder and Decoder"}),"\n",(0,r.jsx)(i.li,{children:"NAT64"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"http://trac.pjsip.org/repos/milestone/release-2.6",children:"2.6"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"2017-1-25"}),"\n",(0,r.jsxs)(i.li,{children:["\u4E3B\u8981\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"WinRT/Win10 support"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/ticket/1946",children:"#1946"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Assertion in deinitializing client auth session when dialog creation fails"}),"\n",(0,r.jsx)(i.li,{children:"\u5728\u4E4B\u524D\u7248\u672C\u4E2D\u5BFC\u81F4\u4E86\u5927\u91CF\u5F02\u5E38"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(i.h3,{id:"how-can-i-apply-a-fix-from-a-particular-ticket-",children:"How can I apply a fix from a particular ticket ?"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:"https://trac.pjsip.org/repos/wiki/FAQ#afix",children:"https://trac.pjsip.org/repos/wiki/FAQ#afix"})}),"\n",(0,r.jsx)(i.li,{children:"\u627E\u5230\u5BF9\u5E94\u7684 Ticket"}),"\n",(0,r.jsx)(i.li,{children:"\u627E\u5230\u6240\u6709 Ticket \u7684 Change Set"}),"\n",(0,r.jsxs)(i.li,{children:["\u4E0B\u8F7D Change Set \u4E3A Unified Diff\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"curl 'https://trac.pjsip.org/repos/changeset/5401?format=diff' -o changeset_r5401.patch"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\u5E94\u7528\u8865\u4E01\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"patch -p4 --dry-run < changeset_r3743.diff"})}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){let{wrapper:i}={...(0,l.a)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,i,n){n.d(i,{Z:function(){return c},a:function(){return t}});var s=n(75271);let r={},l=s.createContext(r);function t(e){let i=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(i):{...i,...e}},[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(l.Provider,{value:i},e.children)}}}]);