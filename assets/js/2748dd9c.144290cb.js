"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["75803"],{60125:function(n,e,s){s.r(e),s.d(e,{metadata:()=>t,contentTitle:()=>i,default:()=>j,assets:()=>l,toc:()=>h,frontMatter:()=>c});var t=JSON.parse('{"id":"java/java-observe","title":"Observe","description":"jps","source":"@site/../notes/java/java-observe.md","sourceDirName":"java","slug":"/java/observe","permalink":"/notes/java/observe","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/java-observe.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689578517000,"frontMatter":{"title":"Observe"},"sidebar":"docs","previous":{"title":"Java Native","permalink":"/notes/java/native"},"next":{"title":"Tuning","permalink":"/notes/java/tuning"}}'),r=s("52676"),d=s("79938");let c={title:"Observe"},i="Observe",l={},h=[{value:"jps",id:"jps",level:2},{value:"jstat",id:"jstat",level:2}];function a(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"observe",children:"Observe"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"java -XX:+PrintFlagsFinal -version | grep HeapSize\n\njcmd 1 VM.flags\n"})}),"\n",(0,r.jsx)(e.h2,{id:"jps",children:"jps"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"[protocol:][[//]hostname][:port][/servername]"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"jps -lvm\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"flag"}),(0,r.jsx)(e.th,{children:"for"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"-q"}),(0,r.jsx)(e.td,{children:"\u4E0D\u8F93\u51FA ClassName"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"-m"}),(0,r.jsx)(e.td,{children:"\u663E\u793A\u53C2\u6570"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"-l"}),(0,r.jsx)(e.td,{children:"\u5B8C\u6574\u5305\u540D"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"-v"}),(0,r.jsx)(e.td,{children:"\u865A\u62DF\u673A\u53C2\u6570"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"-J<option>"})}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"jstat",children:"jstat"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# Garbage-collected heap statistics.\njstat -gc 1\n# Summary of garbage collection statistics.\njstat -gcutil 1\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# Memory pool generation and space capacities.\njstat -gccapacity 1\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"NGCMN"}),(0,r.jsx)(e.th,{children:"NGCMX"}),(0,r.jsx)(e.th,{children:"NGC"}),(0,r.jsx)(e.th,{children:"S0C"}),(0,r.jsx)(e.th,{children:"S1C"}),(0,r.jsx)(e.th,{children:"EC"}),(0,r.jsx)(e.th,{children:"OGCMN"}),(0,r.jsx)(e.th,{children:"OGCMX"}),(0,r.jsx)(e.th,{children:"OGC"}),(0,r.jsx)(e.th,{children:"OC"}),(0,r.jsx)(e.th,{children:"MCMN"}),(0,r.jsx)(e.th,{children:"MCMX"}),(0,r.jsx)(e.th,{children:"MC"}),(0,r.jsx)(e.th,{children:"CCSMN"}),(0,r.jsx)(e.th,{children:"CCSMX"}),(0,r.jsx)(e.th,{children:"CCSC"}),(0,r.jsx)(e.th,{children:"YGC"}),(0,r.jsx)(e.th,{children:"FGC"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"81920.0"}),(0,r.jsx)(e.td,{children:"1302528.0"}),(0,r.jsx)(e.td,{children:"50176.0"}),(0,r.jsx)(e.td,{children:"3072.0"}),(0,r.jsx)(e.td,{children:"2560.0"}),(0,r.jsx)(e.td,{children:"44032.0"}),(0,r.jsx)(e.td,{children:"163840.0"}),(0,r.jsx)(e.td,{children:"2605056.0"}),(0,r.jsx)(e.td,{children:"220672.0"}),(0,r.jsx)(e.td,{children:"220672.0"}),(0,r.jsx)(e.td,{children:"0.0"}),(0,r.jsx)(e.td,{children:"1130496.0"}),(0,r.jsx)(e.td,{children:"92888.0"}),(0,r.jsx)(e.td,{children:"0.0"}),(0,r.jsx)(e.td,{children:"1048576.0"}),(0,r.jsx)(e.td,{children:"11776.0"}),(0,r.jsx)(e.td,{children:"751"}),(0,r.jsx)(e.td,{children:"3"})]})})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"col"}),(0,r.jsx)(e.th,{children:"for"}),(0,r.jsx)(e.th,{children:"mean"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"NGCMN"}),(0,r.jsx)(e.td,{children:"Minimum new generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u65B0\u751F\u4EE3\u6700\u5C0F\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"NGCMX"}),(0,r.jsx)(e.td,{children:"Maximum new generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u65B0\u751F\u4EE3\u6700\u5927\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"NGC"}),(0,r.jsx)(e.td,{children:"Current new generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D\u65B0\u751F\u4EE3\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"S0C"}),(0,r.jsx)(e.td,{children:"Current survivor space 0 capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D survivor space 0 \u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"S1C"}),(0,r.jsx)(e.td,{children:"Current survivor space 1 capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D survivor space 1 \u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"EC"}),(0,r.jsx)(e.td,{children:"Current eden space capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D eden \u7A7A\u95F4\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"OGCMN"}),(0,r.jsx)(e.td,{children:"Minimum old generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u8001\u5E74\u4EE3\u6700\u5C0F\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"OGCMX"}),(0,r.jsx)(e.td,{children:"Maximum old generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u8001\u5E74\u4EE3\u6700\u5927\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"OGC"}),(0,r.jsx)(e.td,{children:"Current old generation capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D\u8001\u5E74\u4EE3\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"OC"}),(0,r.jsx)(e.td,{children:"Current old space capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D\u8001\u5E74\u4EE3\u7A7A\u95F4\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"MCMN"}),(0,r.jsx)(e.td,{children:"Minimum metaspace capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5143\u6570\u636E\u7A7A\u95F4\u6700\u5C0F\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"MCMX"}),(0,r.jsx)(e.td,{children:"Maximum metaspace capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5143\u6570\u636E\u7A7A\u95F4\u6700\u5927\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"MC"}),(0,r.jsx)(e.td,{children:"Metaspace capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u5143\u6570\u636E\u7A7A\u95F4\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CCSMN"}),(0,r.jsx)(e.td,{children:"Compressed class space minimum capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u538B\u7F29 class \u7A7A\u95F4\u6700\u5C0F\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CCSMX"}),(0,r.jsx)(e.td,{children:"Compressed class space maximum capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u538B\u7F29 class \u7A7A\u95F4\u6700\u5927\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CCSC"}),(0,r.jsx)(e.td,{children:"Compressed class space capacity (kB)"}),(0,r.jsx)(e.td,{children:"\u538B\u7F29 class \u7A7A\u95F4\u5BB9\u91CF (kB)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"YGC"}),(0,r.jsx)(e.td,{children:"Number of young generation GC events"}),(0,r.jsx)(e.td,{children:"\u5E74\u8F7B\u4EE3 GC \u6B21\u6570"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"FGC"}),(0,r.jsx)(e.td,{children:"Number of full GC events"}),(0,r.jsx)(e.td,{children:"\u5B8C\u5168 GC \u6B21\u6570"})]})]})]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jstat.html",children:"https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jstat.html"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return i},a:function(){return c}});var t=s(75271);let r={},d=t.createContext(r);function c(n){let e=t.useContext(d);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),t.createElement(d.Provider,{value:e},n.children)}}}]);