"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36753"],{52392:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>h,assets:()=>o,toc:()=>a,frontMatter:()=>l});var s=JSON.parse('{"id":"os/linux/shell/dd","title":"dd","description":"| opt      | default | iflag | val     | for |","source":"@site/../notes/os/linux/shell/dd.md","sourceDirName":"os/linux/shell","slug":"/os/linux/shell/dd","permalink":"/notes/os/linux/shell/dd","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/shell/dd.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666003394000,"frontMatter":{"title":"dd"},"sidebar":"docs","previous":{"title":"date","permalink":"/notes/os/linux/shell/date"},"next":{"title":"doas","permalink":"/notes/os/linux/shell/doas"}}'),d=t("52676"),r=t("79938");let l={title:"dd"},i="dd",o={},a=[];function c(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"dd",children:"dd"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"opt"}),(0,d.jsx)(n.th,{children:"default"}),(0,d.jsx)(n.th,{children:"iflag"}),(0,d.jsx)(n.th,{children:"val"}),(0,d.jsx)(n.th,{children:"for"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"bs=BYTES"}),(0,d.jsx)(n.td,{children:"512"}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{children:"ibs,obs"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"status"}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{children:"process"}),(0,d.jsx)(n.td,{})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"seek=N"}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"skip=N"}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{}),(0,d.jsx)(n.td,{})]})]})]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man1/dd.1.html",children:"https://man7.org/linux/man-pages/man1/dd.1.html"})}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"dd if=/dev/sda of=/dev/sdb bs=128k status=progress iflag=count_bytes count=600M\n\n# skip \u5230\u5206\u533A\n#dd if=/dev/sda of=/dev/sdb bs=128k status=progress iflag=count_bytes,skip_bytes,seek_bytes seek=9439232 skip=9439232 count=2G\n# \u76F4\u63A5\u4F7F\u7528\u5206\u533A IO\ndd if=/dev/sda3 of=/dev/sdb3 bs=128k status=progress\n"})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return l}});var s=t(75271);let d={},r=s.createContext(d);function l(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);