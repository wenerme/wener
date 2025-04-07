"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["60349"],{59322:function(e,n,l){l.r(n),l.d(n,{metadata:()=>i,contentTitle:()=>s,default:()=>u,assets:()=>d,toc:()=>c,frontMatter:()=>t});var i=JSON.parse('{"id":"dev/build/makefile","title":"Makefile","description":"\u5E73\u53F0\u76F8\u5173","source":"@site/../notes/dev/build/makefile.md","sourceDirName":"dev/build","slug":"/dev/build/makefile","permalink":"/notes/dev/build/makefile","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/build/makefile.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1727602505000,"frontMatter":{"title":"Makefile"},"sidebar":"docs","previous":{"title":"make","permalink":"/notes/dev/build/make"},"next":{"title":"pants","permalink":"/notes/dev/build/pants"}}'),r=l("52676"),a=l("79938");let t={title:"Makefile"},s="Makefile",d={},c=[{value:"\u5E73\u53F0\u76F8\u5173",id:"\u5E73\u53F0\u76F8\u5173",level:2},{value:"warning: overriding commands for target",id:"warning-overriding-commands-for-target",level:2},{value:"\u9ED8\u8BA4\u503C",id:"\u9ED8\u8BA4\u503C",level:2},{value:"ONESHELL",id:"oneshell",level:2}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"makefile",children:"Makefile"})}),"\n",(0,r.jsx)(n.h2,{id:"\u5E73\u53F0\u76F8\u5173",children:"\u5E73\u53F0\u76F8\u5173"}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["\u5982\u679C\u6709 Go \u73AF\u5883\u63A8\u8350\u4F7F\u7528 ",(0,r.jsx)(n.code,{children:"go env GOOS"})]})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-makefile",children:"accel_Darwin	:=hvf\naccel_Linux		:=kvm\nplatform		  :=$(shell uname -s)\naccel			    ?=$(accel_$(platform))\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["msys2\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"-s \u8F93\u51FA MSYS_NT-10.0-17763"}),"\n",(0,r.jsx)(n.li,{children:"-o \u8F93\u51FA Msys"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"warning-overriding-commands-for-target",children:"warning: overriding commands for target"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u65E0\u6CD5\u5173\u95ED\u9519\u8BEF\u4FE1\u606F"}),"\n",(0,r.jsxs)(n.li,{children:["\u53EF\u4EE5\u8003\u8651 base \u4F7F\u7528 ",(0,r.jsx)(n.code,{children:"<xxx>-default"})," \u7684\u547D\u540D\u65B9\u5F0F"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.gnu.org/software/make/manual/html_node/Overriding-Makefiles.html",children:"Overriding Part of Another Makefile"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u63A8\u8350 ",(0,r.jsx)(n.code,{children:"$(MAKE) -f base.Makefile"}),", \u4F46\u662F\u4F1A\u4EA7\u751F\u989D\u5916\u7684 \u8FDB\u7A0B"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-makefile",metastring:"title='base.mk'",children:"build-default:\n        echo  'build default'\n%:  %-default # \u8BA9 build \u9690\u542B\u6267\u884C build-default\n        @true\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-makefile",children:"build: # \u5FC5\u987B\u8981\u5B9A\u4E49 target\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u9ED8\u8BA4\u503C",children:"\u9ED8\u8BA4\u503C"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-makefile",children:"NAMESPACE := $(or $(NAMESPACE), $(shell basename $(shell pwd)))\n"})}),"\n",(0,r.jsx)(n.h2,{id:"oneshell",children:"ONESHELL"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"3.8.2+"}),"\n",(0,r.jsx)(n.li,{children:"macOS \u9ED8\u8BA4 make \u4E3A 3.8.1"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-makefile",children:".ONESHELL:\nlogo:\n	cd build\n	ls\n"})})]})}function u(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return s},a:function(){return t}});var i=l(75271);let r={},a=i.createContext(r);function t(e){let n=i.useContext(a);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);