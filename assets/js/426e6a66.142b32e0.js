"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["57741"],{4985:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>a,default:()=>u,assets:()=>d,toc:()=>l,frontMatter:()=>o});var t=JSON.parse('{"id":"os/linux/desktop/x11/xvfb","title":"Xvfb","description":"- XDMCP","source":"@site/../notes/os/linux/desktop/x11/xvfb.md","sourceDirName":"os/linux/desktop/x11","slug":"/os/linux/desktop/x11/xvfb","permalink":"/notes/os/linux/desktop/x11/xvfb","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/desktop/x11/xvfb.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1669789233000,"frontMatter":{"title":"Xvfb"},"sidebar":"docs","previous":{"title":"xset","permalink":"/notes/os/linux/desktop/x11/xset"},"next":{"title":"FreeDesktop","permalink":"/notes/os/linux/desktop/xdg/"}}'),r=s("52676"),i=s("79938");let o={title:"Xvfb"},a="Xvfb",d={},l=[{value:"chrome",id:"chrome",level:2}];function c(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"xvfb",children:"Xvfb"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# docker run --rm -it -v $PWD:/host -w /host -p 5701:5701 --name vnc wener/base\napk add xvfb xdpyinfo\nXvfb :1\n\nXvfb :1 -screen 0 1280x1024x24\nxdpyinfo -display :1 # \u5224\u65AD\u662F\u5426\u542F\u52A8\u6210\u529F\n\n#\nexport DISPLAY=:1\n\napk add fluxbox\nfluxbox -display :1 &\n\napk add glib\napk add -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing wmctrl\nwmctrl -m\n\n# \u9ED8\u8BA4\u5BC6\u7801\u6587\u4EF6\nx11vnc -storepasswd vnc ./passwd\n# https://novnc.com/noVNC/vnc.html?host=localhost&port=5901&path=&encrypt=0\nx11vnc -forever -shared -ncache 10 -display :1 -wait 20 -rfbauth passwd -rfbport 5901\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"file /tmp/.X11-unix/X1 # socket\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"XDMCP"}),"\n",(0,r.jsx)(n.li,{children:"XKB"}),"\n",(0,r.jsx)(n.li,{children:"X DAMAGE"}),"\n",(0,r.jsxs)(n.li,{children:["-shmem\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"fb in shared memory"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["-fbdir directory\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"fb in mmap"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"chrome",children:"chrome"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"dbus-uuidgen > /etc/machine-id\n\n# reset dir\nrm -rf $HOME/.cache/chromium\nrm -rf $HOME/.config/chromium\n\napk add chromium\n\n/usr/bin/chromium-browser ${EXTRA_CHROME_OPTION} \\\n  --purge-memory-button \\\n  --clear-token-service \\\n  --disable-3d-apis \\\n  --disable-accelerated-video \\\n  --disable-background-mode \\\n  --disable-gpu \\\n  --disable-infobars \\\n  --disable-metrics \\\n  --disable-preconnect \\\n  --disable-software-rasterizer \\\n  --disable-speech-api \\\n  --disable-sync \\\n  --disable-sync-app-list \\\n  --disable-translate \\\n  --disable-voice-input \\\n  --disable-webgl \\\n  --disable-web-security \\\n  --force-device-scale-factor=1 \\\n  --ignore-certificate-errors \\\n  --load-extension=/home/chrome/plugin \\\n  --no-first-run \\\n  --no-pings \\\n  --no-sandbox \\\n  --reset-variation-state \\\n  --user-data-dir \\\n  --window-position=0,0 \\\n  --window-size=1280,1024 \\\n  https://wener.me\n"})})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return a},a:function(){return o}});var t=s(75271);let r={},i=t.createContext(r);function o(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);