"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66167"],{80088:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>t});var s=JSON.parse('{"id":"os/linux/desktop/x11/README","title":"X11","description":"- X Windows System - X, X11","source":"@site/../notes/os/linux/desktop/x11/README.md","sourceDirName":"os/linux/desktop/x11","slug":"/os/linux/desktop/x11/","permalink":"/notes/os/linux/desktop/x11/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/desktop/x11/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1669789233000,"frontMatter":{"title":"X11"},"sidebar":"docs","previous":{"title":"Wayland","permalink":"/notes/os/linux/desktop/wayland"},"next":{"title":"X11 FAQ","permalink":"/notes/os/linux/desktop/x11/faq"}}'),l=i("52676"),r=i("79938");let t={title:"X11"},d="X11",c={},o=[{value:"Commands",id:"commands",level:2},{value:"ssh",id:"ssh",level:2}];function x(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"x11",children:"X11"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["X Windows System - X, X11\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"MIT"}),"\n",(0,l.jsx)(e.li,{children:"by X.Org Foundation"}),"\n",(0,l.jsx)(e.li,{children:"since 1984-06"}),"\n",(0,l.jsx)(e.li,{children:"X11R7.7 6 2012-06"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"CS \u7ED3\u6784"}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.x.org/",children:"https://www.x.org/"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/X_Window_System",children:"X Window System"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://datacadamia.com/ssh/x11/x11",children:"https://datacadamia.com/ssh/x11/x11"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://linux.die.net/man/7/x",children:"https://linux.die.net/man/7/x"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/mviereck/x11docker",children:"mviereck/x11docker"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u652F\u6301 Linux & MS Windows"}),"\n",(0,l.jsx)(e.li,{children:"\u4E0D\u652F\u6301 macOS"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.admonition,{type:"caution",children:(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"X11 \u5904\u4E8E\u53EF\u7528\u72B6\u6001"}),"\n",(0,l.jsx)(e.li,{children:"\u9488\u5BF9 X11 \u7684\u5F00\u53D1\u5DF2\u7ECF\u51E0\u4E4E\u505C\u6EDE - \u4E0D\u4F1A\u6709\u65B0\u7684\u7279\u6027\uFF0C\u517C\u5BB9\u65B0\u7684\u73AF\u5883"}),"\n",(0,l.jsx)(e.li,{children:"\u5EFA\u8BAE xwayland"}),"\n"]})}),"\n",(0,l.jsx)(e.h2,{id:"commands",children:"Commands"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"xdm - X Display Manager"}),"\n",(0,l.jsxs)(e.li,{children:["xinit\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"/etc/X11/xinit/xinitrc"}),"\n",(0,l.jsx)(e.li,{children:"/etc/X11/xinit/Xsession"}),"\n",(0,l.jsx)(e.li,{children:"/etc/X11/xinit/xserverrc"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"startx"}),"\n",(0,l.jsxs)(e.li,{children:["xauth\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/X_Window_authorization#Cookie-based_access",children:"https://en.wikipedia.org/wiki/X_Window_authorization#Cookie-based_access"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"xvfb-run"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"/notes/os/linux/desktop/x11/xvfb",children:"Xvfb"})}),"\n",(0,l.jsx)(e.li,{children:"xdpyinfo"}),"\n",(0,l.jsxs)(e.li,{children:["xmessage\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7A97\u53E3\u663E\u793A\u4FE1\u606F"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"(fluxbox -v; fluxbox -info | sed 1d) | xmessage -file - -center"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"xwininfo - \u67E5\u770B\u7A97\u53E3"}),"\n",(0,l.jsxs)(e.li,{children:["wmctrl\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5207\u6362\u7A97\u53E3\u72B6\u6001"}),"\n",(0,l.jsx)(e.li,{children:"\u5173\u95ED\u7A97\u53E3"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["xdottool\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6700\u5C0F\u5316"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"xprop - \u7A97\u53E3\u719F\u6089"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'xwininfo -root -children -tree\nwmctrl -l # \u7A97\u53E3\u5217\u8868\nwmctrl -d # desktop/workspace \u5217\u8868 - DG - desktop geometry, VP viewport position, WA workarea geometry\n\n# F9 -> Insert\nxmodmap -e "keycode 75 = Insert Insert Insert"\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["iTerm2\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Preferences -> Keys -> Key Mappings -> +"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-txt",metastring:'title="$HOME/.Xresources"',children:"XTerm*selectToClipboard: true\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"xrdb -merge ~/.Xresources\n"})}),"\n",(0,l.jsx)(e.h2,{id:"ssh",children:"ssh"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"Host remote.host.name\nForwardX11 yes\n"})})]})}function h(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(x,{...n})}):x(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);