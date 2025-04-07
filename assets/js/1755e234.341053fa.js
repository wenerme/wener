"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["89390"],{36576:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>u,assets:()=>s,toc:()=>c,frontMatter:()=>l});var i=JSON.parse('{"id":"network/tool/ifconfig","title":"ifconfig","description":"- socat \u53EF\u4EE5\u6307\u5B9A interface, nc \u4E0D\u53EF\u4EE5","source":"@site/../notes/network/tool/ifconfig.md","sourceDirName":"network/tool","slug":"/network/tool/ifconfig","permalink":"/notes/network/tool/ifconfig","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/network/tool/ifconfig.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"ifconfig"},"sidebar":"docs","previous":{"title":"ethtool","permalink":"/notes/network/tool/ethtool"},"next":{"title":"\u65E0\u7EBF\u7F51\u7EDC","permalink":"/notes/network/wireless/"}}'),r=t("52676"),o=t("79938");let l={title:"ifconfig"},a="ifconfig",s={},c=[{value:"\u591A\u7F51\u5361\u914D\u7F6E",id:"\u591A\u7F51\u5361\u914D\u7F6E",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"ifconfig",children:"ifconfig"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5224\u65AD\u8DEF\u7531\u4F1A\u600E\u4E48\u8D70\nip route get 192.168.8.135 from 192.168.8.140\n\nsysctl net.ipv4.ip_forward\n\nip rule add from <source>/<mask> table <name>\nip route add 1.2.3.4/24 via <router> dev eth4 table <name>\n# http://wiki.wlug.org.nz/SourceBasedRouting\n# http://lartc.org/howto/lartc.rpdb.html\n\necho 200 isp2 >> /etc/iproute2/rt_tables\nip rule add from <interface_IP> dev <interface> table isp2\nip route add default via <gateway_IP> dev <interface> table isp2\n\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"socat \u53EF\u4EE5\u6307\u5B9A interface, nc \u4E0D\u53EF\u4EE5"}),"\n",(0,r.jsx)(n.li,{children:"socat \u5728\u5404\u4E2A\u5E73\u53F0\u4E0B\u7EDF\u4E00, nc \u6709\u517C\u5BB9\u95EE\u9898"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u591A\u7F51\u5361\u914D\u7F6E",children:"\u591A\u7F51\u5361\u914D\u7F6E"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.hi-linux.com/posts/64963.html",children:"https://www.hi-linux.com/posts/64963.html"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/Network_configuration",children:"Network configuration"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/Network_configuration_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)",children:"\u7B80\u4F53\u4E2D\u6587"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5F53\u524D\u8DEF\u7531\u72B6\u6001\nip route show\n# main \u8868\u4E2D\u7684\u8DEF\u7531\nip route list table main\n\n# Linux \u652F\u6301 256 \u5F20\u8DEF\u7531\u8868\n# \u5F53\u524D\u8DEF\u7531\u8868\u522B\u540D\ncat /etc/iproute2/rt_tables\n\n# \u7B80\u5355\u7684\u8BA9\u4E00\u4E2A ip \u8D70\u5355\u4E2A\u7F51\u5361\n# \u5982\u679C\u6709\u591A\u7F51\u5361\u65F6\u53EF\u4EE5\u5229\u7528\nip route add default via 192.168.1.120 dev eth1 table 120\nip rule add from 192.168.1.120 table 120\n"})})]})}function u(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return l}});var i=t(75271);let r={},o=i.createContext(r);function l(e){let n=i.useContext(o);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);