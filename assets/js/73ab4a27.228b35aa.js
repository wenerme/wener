"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91017"],{73860:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>o,default:()=>a,assets:()=>d,toc:()=>c,frontMatter:()=>l});var s=JSON.parse('{"id":"os/linux/fs/bindfs","title":"bind","description":"- \u7CFB\u7EDF \u5C06\u4E00\u4E2A \u76EE\u5F55 \u6302\u8F7D \u5230\u4E00\u4E2A\u6302\u8F7D\u70B9","source":"@site/../notes/os/linux/fs/bindfs.md","sourceDirName":"os/linux/fs","slug":"/os/linux/fs/bindfs","permalink":"/notes/os/linux/fs/bindfs","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/fs/bindfs.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"bind"},"sidebar":"docs","previous":{"title":"bcachefs","permalink":"/notes/os/linux/fs/bcachefs"},"next":{"title":"Btrfs","permalink":"/notes/os/linux/fs/btrfs"}}'),i=t("52676"),r=t("79938");let l={title:"bind"},o="bind",d={},c=[];function u(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"bind",children:"bind"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u7CFB\u7EDF \u5C06\u4E00\u4E2A ",(0,i.jsx)(e.strong,{children:"\u76EE\u5F55"})," \u6302\u8F7D \u5230\u4E00\u4E2A\u6302\u8F7D\u70B9\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u4E00\u822C\u662F \u6302\u8F7D \u8BBE\u5907"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"\u7C7B\u4F3C symlink - \u4F46\u4E0D\u4F9D\u8D56\u5E94\u7528 lookup"}),"\n",(0,i.jsx)(e.li,{children:"\u7C7B\u4F3C hardlink - \u4F46\u4E0D\u4F9D\u8D56 fs"}),"\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["FUSE \u5B9E\u73B0 ",(0,i.jsx)(e.a,{href:"https://bindfs.org/",children:"https://bindfs.org/"})]}),"\n",(0,i.jsxs)(e.li,{children:["FreeBSD nullfs ",(0,i.jsx)(e.code,{children:"mount -t nullfs /a /b"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"mount --bind /a /b          # \u4E5F\u53EF\u4EE5\u4F7F\u7528 -o bind\nmount --rbind /c /b         # \u91CD\u65B0 bind\nmount -o remount,ro,bind /b # \u91CD\u65B0\u8BBE\u7F6E\u4E3A \u53EA\u8BFB\nmount --move /b /d          # \u79FB\u52A8\u6302\u8F7D\u70B9\n"})})]})}function a(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return o},a:function(){return l}});var s=t(75271);let i={},r=s.createContext(i);function l(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:l(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);