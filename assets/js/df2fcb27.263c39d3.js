"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["61764"],{10959:function(e,t,n){n.r(t),n.d(t,{metadata:()=>i,contentTitle:()=>c,default:()=>m,assets:()=>d,toc:()=>a,frontMatter:()=>s});var i=JSON.parse('{"id":"os/virt/microvm","title":"MicroVM","description":"* \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/os/virt/microvm.md","sourceDirName":"os/virt","slug":"/os/virt/microvm","permalink":"/notes/os/virt/microvm","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/microvm.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1614944674000,"frontMatter":{"title":"MicroVM"},"sidebar":"docs","previous":{"title":"lima","permalink":"/notes/os/virt/lima"},"next":{"title":"noVNC","permalink":"/notes/os/virt/novnc"}}'),r=n("52676"),o=n("79938");let s={title:"MicroVM"},c="MicroVM",d={},a=[];function l(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"microvm",children:"MicroVM"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\u662F\u4EC0\u4E48\uFF1F\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"QEMU \u53D7 Firecracker \u542F\u53D1\u5F00\u53D1\u7684\u4E00\u79CD\u673A\u5668\u7C7B\u578B"}),"\n",(0,r.jsx)(t.li,{children:"\u6700\u5C0F\u5316 - \u4E0D\u652F\u6301 PCI \u548C ACPI"}),"\n",(0,r.jsx)(t.li,{children:"\u9002\u7528\u4E8E\u77ED\u671F\u8FD0\u884C Guest"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["QEMU ",(0,r.jsx)(t.a,{href:"https://github.com/qemu/qemu/blob/master/docs/system/i386/microvm.rst",children:"microvm"})]}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:'# with Legacy\nqemu-system-x86_64 -M microvm \\\n   -enable-kvm -cpu host -m 512m -smp 2 \\\n   -kernel vmlinux -append "earlyprintk=ttyS0 console=ttyS0 root=/dev/vda" \\\n   -nodefaults -no-user-config -nographic \\\n   -serial stdio \\\n   -drive id=test,file=test.img,format=raw,if=none \\\n   -device virtio-blk-device,drive=test \\\n   -netdev tap,id=tap0,script=no,downscript=no \\\n   -device virtio-net-device,netdev=tap0\n\n# no Legacy\nqemu-system-x86_64 \\\n   -M microvm,x-option-roms=off,pit=off,pic=off,isa-serial=off,rtc=off \\\n   -enable-kvm -cpu host -m 512m -smp 2 \\\n   -kernel vmlinux -append "console=hvc0 root=/dev/vda" \\\n   -nodefaults -no-user-config -nographic \\\n   -chardev stdio,id=virtiocon0 \\\n   -device virtio-serial-device \\\n   -device virtconsole,chardev=virtiocon0 \\\n   -drive id=test,file=test.img,format=raw,if=none \\\n   -device virtio-blk-device,drive=test \\\n   -netdev tap,id=tap0,script=no,downscript=no \\\n   -device virtio-net-device,netdev=tap0\n'})})]})}function m(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return c},a:function(){return s}});var i=n(75271);let r={},o=i.createContext(r);function s(e){let t=i.useContext(o);return i.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);