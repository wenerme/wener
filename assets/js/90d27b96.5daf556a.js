"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["12602"],{31687:function(e,n,t){t.r(n),t.d(n,{metadata:()=>d,contentTitle:()=>i,default:()=>o,assets:()=>l,toc:()=>h,frontMatter:()=>a});var d=JSON.parse('{"id":"os/linux/dev/hdparam","title":"hdparam","description":"| hdparm   | for                           |","source":"@site/../notes/os/linux/dev/hdparam.md","sourceDirName":"os/linux/dev","slug":"/os/linux/dev/hdparam","permalink":"/notes/os/linux/dev/hdparam","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/dev/hdparam.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1678762178000,"frontMatter":{"title":"hdparam"},"sidebar":"docs","previous":{"title":"Dev FAQ","permalink":"/notes/os/linux/dev/faq"},"next":{"title":"mtd","permalink":"/notes/os/linux/dev/mtd"}}'),s=t("52676"),r=t("79938");let a={title:"hdparam"},i="hdparam",l={},h=[{value:"HDIO_GET_IDENTITY failed: Not a tty",id:"hdio_get_identity-failed-not-a-tty",level:2},{value:"SG_IO: bad/missing sense data",id:"sg_io-badmissing-sense-data",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"hdparam",children:"hdparam"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"hdparm -I /dev/sda  # \u78C1\u76D8\u4FE1\u606F\nhdparm -Tt /dev/sda # \u78C1\u76D8\u6027\u80FD\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"hdparm"}),(0,s.jsx)(n.th,{children:"for"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-t"}),(0,s.jsx)(n.td,{children:"device reads test"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-T"}),(0,s.jsx)(n.td,{children:"cache reads test"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-W"}),(0,s.jsx)(n.td,{children:"toggle write cache"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-B 0-255"}),(0,s.jsx)(n.td,{children:"Advanced Power Management"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-S 1-240"}),(0,s.jsx)(n.td,{children:"standby (spindown) timeout"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"-M"}),(0,s.jsx)(n.td,{children:"Automatic Acoustic Management"})]})]})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/hdparm.8.html",children:"https://man7.org/linux/man-pages/man8/hdparm.8.html"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://wiki.archlinux.org/title/hdparm",children:"https://wiki.archlinux.org/title/hdparm"})}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"hdio_get_identity-failed-not-a-tty",children:"HDIO_GET_IDENTITY failed: Not a tty"}),"\n",(0,s.jsx)(n.h2,{id:"sg_io-badmissing-sense-data",children:"SG_IO: bad/missing sense data"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"SG_IO: bad/missing sense data, sb[]:  70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sg_decode_sense 70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00\n"})})]})}function o(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return a}});var d=t(75271);let s={},r=d.createContext(s);function a(e){let n=d.useContext(r);return d.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),d.createElement(r.Provider,{value:n},e.children)}}}]);