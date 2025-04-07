"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["7075"],{7957:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>o,assets:()=>h,toc:()=>l,frontMatter:()=>i});var s=JSON.parse('{"id":"hardware/server/hpe/sdr","title":"SDR","description":"- SUM - Smart Update Manager","source":"@site/../notes/hardware/server/hpe/sdr.md","sourceDirName":"hardware/server/hpe","slug":"/hardware/server/hpe/sdr","permalink":"/notes/hardware/server/hpe/sdr","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/hardware/server/hpe/sdr.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"SDR"},"sidebar":"docs","previous":{"title":"iLO","permalink":"/notes/hardware/server/hpe/ilo"},"next":{"title":"Service Pack for ProLiant","permalink":"/notes/hardware/server/hpe/spp"}}'),r=t("52676"),d=t("79938");let i={title:"SDR"},a="SDR",h={},l=[];function c(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"sdr",children:"SDR"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"SUM - Smart Update Manager"}),"\n",(0,r.jsx)(n.li,{children:"\u60E0\u666E\u63D0\u4F9B\u5F88\u591A\u8F6F\u4EF6\u6765\u63A7\u5236\u670D\u52A1\u5668"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://downloads.linux.hpe.com/",children:"https://downloads.linux.hpe.com/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://downloads.linux.hpe.com/SDR/repo/",children:"https://downloads.linux.hpe.com/SDR/repo/"})}),"\n",(0,r.jsxs)(n.li,{children:["\u6CE8\u610F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u56FA\u4EF6\u5347\u7EA7\u53EA\u652F\u6301 RPM \u7C7B\u7684\u7CFB\u7EDF,\u4E0D\u652F\u6301 DEB \u7CFB\u5217\u7CFB\u7EDF"}),"\n",(0,r.jsx)(n.li,{children:"\u56FD\u5185\u9700\u8981\u901A\u8FC7\u4EE3\u7406\u4F7F\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"mcp"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"\u5305"}),(0,r.jsx)(n.th,{children:"\u63CF\u8FF0"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hp-health"}),(0,r.jsx)(n.td,{children:"HPE System Health Application and Command line Utilities"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hponcfg"}),(0,r.jsx)(n.td,{children:"HPE RILOE II/iLO online configuration utility"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hp-ams"}),(0,r.jsx)(n.td,{children:"HPE Agentless Management Service"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hp-snmp-agents"}),(0,r.jsx)(n.td,{children:"Insight Management SNMP Agents for HPE ProLiant Systems"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hpsmh"}),(0,r.jsx)(n.td,{children:"HPE System Management Homepage"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hp-smh-templates"}),(0,r.jsx)(n.td,{children:"HPE System Management Homepage Templates"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hpssacli"}),(0,r.jsx)(n.td,{children:"HPE Command Line Smart Storage Administration Utility"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hpssaducli"}),(0,r.jsx)(n.td,{children:"HPE Command Line Smart Storage Administration Diagnostics"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"hpssa"}),(0,r.jsx)(n.td,{children:"HPE Array Smart Storage Administration Service"})]})]})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"#########\n# DEB\n#########\n# \u6DFB\u52A0 Key\n# https://downloads.linux.hpe.com/SDR/keys.html\ncurl http://downloads.linux.hpe.com/SDR/hpPublicKey1024.pub | apt-key add -\ncurl http://downloads.linux.hpe.com/SDR/hpPublicKey2048.pub | apt-key add -\ncurl http://downloads.linux.hpe.com/SDR/hpPublicKey2048_key1.pub | apt-key add -\ncurl http://downloads.linux.hpe.com/SDR/hpePublicKey2048_key1.pub | apt-key add -\n\n# \u6DFB\u52A0\u4ED3\u5E93\n# \u80FD\u5728 DEB \u7C7B\u7CFB\u7EDF\u4E0B\u4F7F\u7528\u7684\u4E3B\u8981\u6709 mcp,minnow,stk\nwget https://downloads.linux.hpe.com/SDR/add_repo.sh\n# -n \u53C2\u6570\u53EF\u4EE5\u4E0D\u6DFB\u52A0\u4ED3\u5E93,\u800C\u8F93\u51FA\u4F1A\u6DFB\u52A0\u7684\u4ED3\u5E93\nsh ./add_repo.sh -v mcp\nsh ./add_repo.sh -v minnow\nsh ./add_repo.sh -v stk\n# \u66F4\u65B0\u7D22\u5F15\napt update\n# \u5B89\u88C5\u5305\napt install -y hp-health hpssacli hp-snmp-agents hpssa hpssacli hp-smh-templates hpsmh hponcfg\n# \u90E8\u5206\u5185\u5BB9\u4F1A\u5B89\u88C5\u5230 /opt/hp\n\n#########\n# mcp - Management Component Pack\n#########\n"})})]})}function o(e={}){let{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return i}});var s=t(75271);let r={},d=s.createContext(r);function i(e){let n=s.useContext(d);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(d.Provider,{value:n},e.children)}}}]);