"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["7911"],{35443:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>u,assets:()=>o,toc:()=>h,frontMatter:()=>s});var i=JSON.parse('{"id":"os/linux/network/tcp","title":"TCP","description":"- KCM - kernel connection multiplexer","source":"@site/../notes/os/linux/network/tcp.md","sourceDirName":"os/linux/network","slug":"/os/linux/network/tcp","permalink":"/notes/os/linux/network/tcp","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/network/tcp.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1723961178000,"frontMatter":{"title":"TCP"},"sidebar":"docs","previous":{"title":"socat","permalink":"/notes/os/linux/network/socat"},"next":{"title":"tcpdump","permalink":"/notes/os/linux/network/tcpdump"}}'),r=t("52676"),l=t("79938");let s={title:"TCP"},c="TCP",o={},h=[];function d(e){let n={a:"a",h1:"h1",header:"header",li:"li",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"tcp",children:"TCP"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["KCM - kernel connection multiplexer\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.kernel.org/doc/Documentation/networking/kcm.txt",children:"https://www.kernel.org/doc/Documentation/networking/kcm.txt"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://lwn.net/Articles/657999/",children:"https://lwn.net/Articles/657999/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["MPTCP - Multipath TCP\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Linux 5.6+ MPTCP v1"}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.rfc-editor.org/rfc/rfc8684.html",children:"rfc8684"}),"\nTCP Extensions for Multipath Operation with Multiple Addresses"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.mptcp.dev/",children:"https://www.mptcp.dev/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://multipath-tcp.org/",children:"http://multipath-tcp.org/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://lwn.net/Articles/544399/",children:"https://lwn.net/Articles/544399/"})}),"\n",(0,r.jsx)(n.li,{children:"\u591A\u8DEF TCP"}),"\n",(0,r.jsx)(n.li,{children:"inverse multiplexing"}),"\n",(0,r.jsx)(n.li,{children:"\u517C\u5BB9 TCP"}),"\n",(0,r.jsxs)(n.li,{children:["wiki ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Multipath_TCP",children:"Multipath TCP"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u4F7F\u7528\u573A\u666F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u591A\u7F51\u7EDC\u65F6\u5FEB\u901F\u5207\u6362"}),"\n",(0,r.jsx)(n.li,{children:"\u805A\u5408\u591A\u7F51\u7EDC"}),"\n",(0,r.jsx)(n.li,{children:"\u5229\u7528\u591A wan \u53E3"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["TCP Brutal -  Hysteria \u81EA\u6709\u7684\u62E5\u585E\u63A7\u5236\u7B97\u6CD5\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4E0E BBR \u4E0D\u540C\uFF0CBrutal \u91C7\u7528\u56FA\u5B9A\u901F\u7387\u6A21\u578B\uFF0C\u4E22\u5305\u6216 RTT \u53D8\u5316\u4E0D\u4F1A\u964D\u4F4E\u901F\u5EA6\u3002\u76F8\u53CD\uFF0C\u5982\u679C\u65E0\u6CD5\u8FBE\u5230\u9884\u5B9A\u7684\u76EE\u6807\u901F\u7387\uFF0C\u53CD\u800C\u4F1A\u6839\u636E\u8BA1\u7B97\u7684\u4E22\u5305\u7387\u63D0\u9AD8\u53D1\u9001\u901F\u7387\u6765\u8FDB\u884C\u8865\u507F\u3002Brutal \u53EA\u5728\u4F60\u77E5\u9053\uFF08\u5E76\u6B63\u786E\u8BBE\u7F6E\u4E86\uFF09\u5F53\u524D\u7F51\u7EDC\u7684\u6700\u5927\u901F\u5EA6\u65F6\u624D\u80FD\u6B63\u5E38\u8FD0\u884C\u3002\u5176\u64C5\u957F\u5728\u62E5\u585E\u7684\u7F51\u7EDC\u4E2D\u62A2\u5360\u5E26\u5BBD\uFF0C\u56E0\u6B64\u5F97\u540D\u3002"}),"\n",(0,r.jsx)(n.li,{children:"Brutal \u5982\u679C\u5E26\u5BBD\u8BBE\u7F6E\u4F4E\u4E8E\u5B9E\u9645\u6700\u5927\u503C\u4E5F\u80FD\u6B63\u5E38\u8FD0\u884C\uFF1B\u76F8\u5F53\u4E8E\u9650\u901F\u3002\u91CD\u8981\u7684\u662F\u4E0D\u8981\u5C06\u5176\u8BBE\u7F6E\u5F97\u9AD8\u4E8E\u5B9E\u9645\u6700\u5927\u503C\uFF0C\u5426\u5219\u4F1A\u56E0\u4E3A\u8865\u507F\u673A\u5236\u5BFC\u81F4\u8FDE\u63A5\u901F\u5EA6\u6162\u3001\u4E0D\u7A33\u5B9A\uFF0C\u4E14\u6D6A\u8D39\u6D41\u91CF\u3002"}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return s}});var i=t(75271);let r={},l=i.createContext(r);function s(e){let n=i.useContext(l);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);