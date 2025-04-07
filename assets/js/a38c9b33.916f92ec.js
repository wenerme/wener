"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48730"],{45645:function(t,e,n){n.r(e),n.d(e,{metadata:()=>i,contentTitle:()=>a,default:()=>m,assets:()=>c,toc:()=>l,frontMatter:()=>s});var i=JSON.parse('{"id":"os/linux/boot/initramfs","title":"initramfs","description":"- How to unpack/uncompress and repack/re-compress an initial ramdisk (initrd/initramfs) boot image file?","source":"@site/../notes/os/linux/boot/initramfs.md","sourceDirName":"os/linux/boot","slug":"/os/linux/boot/initramfs","permalink":"/notes/os/linux/boot/initramfs","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/boot/initramfs.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659031280000,"frontMatter":{"title":"initramfs"},"sidebar":"docs","previous":{"title":"GRUB","permalink":"/notes/os/linux/boot/grub"},"next":{"title":"ipxe","permalink":"/notes/os/linux/boot/ipxe"}}'),o=n("52676"),r=n("79938");let s={title:"initramfs"},a="initramfs",c={},l=[];function d(t){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"initramfs",children:"initramfs"})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"https://access.redhat.com/solutions/24029",children:"How to unpack/uncompress and repack/re-compress an initial ramdisk (initrd/initramfs) boot image file?"})}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# \u56E0\u4E3A\u4F1A\u89E3\u538B\u5230\u5F53\u524D\u76EE\u5F55\uFF0C\u4F7F\u7528\u7A7A\u76EE\u5F55\u907F\u514D\u6E05\u7406\nmkdir -p /tmp/initrd\ncd /tmp/initrd\n\n# GZIP\nzcat < /boot/initramfs-lts | cpio -idmv\nfind . | cpio -o -c -R root:root | gzip -9 > /boot/new.img\n\n# xz/LZMA\nxz -dc < /boot/initramfs-lts | cpio -idmv\nfind . 2> /dev/null | cpio -o -c -R root:root | xz -9 --format=lzma > /boot/new.img\n"})})]})}function m(t={}){let{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}},79938:function(t,e,n){n.d(e,{Z:function(){return a},a:function(){return s}});var i=n(75271);let o={},r=i.createContext(o);function s(t){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:s(t.components),i.createElement(r.Provider,{value:e},t.children)}}}]);