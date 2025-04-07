"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["88655"],{12162:function(n,e,r){r.r(e),r.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>a,assets:()=>t,toc:()=>h,frontMatter:()=>o});var s=JSON.parse('{"id":"os/linux/chrony","title":"chrony","description":"- \u6CE8\u610F\u914D\u7F6E minpoll - \u5426\u5219\u53EF\u80FD\u5BFC\u81F4\u7CFB\u7EDF\u65F6\u95F4\u4E0D\u51C6","source":"@site/../notes/os/linux/chrony.md","sourceDirName":"os/linux","slug":"/os/linux/chrony","permalink":"/notes/os/linux/chrony","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/chrony.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702882608000,"frontMatter":{"title":"chrony"},"sidebar":"docs","previous":{"title":"Build","permalink":"/notes/os/linux/build"},"next":{"title":"Linux cluster awesome","permalink":"/notes/os/linux/cluster/awesome"}}'),i=r("52676"),l=r("79938");let o={title:"chrony"},c="chrony",t={},h=[{value:"chrony.conf",id:"chronyconf",level:2}];function d(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"chrony",children:"chrony"})}),"\n",(0,i.jsx)(e.admonition,{type:"caution",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u6CE8\u610F\u914D\u7F6E minpoll - \u5426\u5219\u53EF\u80FD\u5BFC\u81F4\u7CFB\u7EDF\u65F6\u95F4\u4E0D\u51C6"}),"\n"]})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5982\u679C\u65F6\u95F4\u5DEE\u8DDD\u7279\u522B\u5927 chrony \u53EF\u80FD\u4E0D\u4F1A\u540C\u6B65\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u914D\u7F6E ",(0,i.jsx)(e.code,{children:"makestep 1 -1"})," \u7136\u540E\u91CD\u542F - \u5F3A\u5236\u63A5\u53D7\u540C\u6B65\u6E90"]}),"\n",(0,i.jsx)(e.li,{children:"\u6216\u8005 maxdistance"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://chrony.tuxfamily.org/",children:"chrony.tuxfamily.org"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"GPLv2"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://chrony.tuxfamily.org/doc/3.4/chrony.conf.html",children:"chrony.conf"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.fedoraproject.org/en-US/Fedora/18/html/System_Administrators_Guide/sect-Checking_if_chrony_is_synchronized.html",children:"Checking if chrony is Synchronized"})}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"chronyc tracking    # \u67E5\u770B\u5F53\u524D\u72B6\u6001\nchronyc sources     # \u67E5\u770B\u540C\u6B65\u6E90\nchronyc -a makestep # \u4E3B\u52A8\u540C\u6B65\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-conf",metastring:"title=/etc/chrony/chrony.conf",children:"# \u5F3A\u5236\u6BCF 2^8=256 \u79D2\u540C\u6B65\u4E00\u6B21\nserver pool.ntp.org minpoll 8\n"})}),"\n",(0,i.jsx)(e.h2,{id:"chronyconf",children:"chrony.conf"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"server hostname [option]"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["minpoll=6\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"-6 < 24"})}),"\n",(0,i.jsx)(e.li,{children:"2^6=64 seconds"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["maxpoll=10\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"2^10=1024 seconds"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"pool name [options]"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u7C7B\u4F3C server\uFF0C\u4F1A\u89E3\u6790\u4E3A\u591A\u4E2A server"}),"\n",(0,i.jsx)(e.li,{children:"\u6240\u6709 server \u53C2\u6570\u90FD\u53EF\u4EE5\u7528\u4E8E pool"}),"\n",(0,i.jsxs)(e.li,{children:["maxsources=4\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u9650\u5236\u53D6\u7684 source \u6570\u91CF"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u9ED8\u8BA4"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"pool pool.ntp.org iburst\ninitstepslew 10 pool.ntp.org\ndriftfile /var/lib/chrony/chrony.drift\nrtcsync\ncmdport 0\n"})})]})}function a(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return c},a:function(){return o}});var s=r(75271);let i={},l=s.createContext(i);function o(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:o(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);