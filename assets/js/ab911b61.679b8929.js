"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["57068"],{23554:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>u,assets:()=>o,toc:()=>l,frontMatter:()=>a});var r=JSON.parse('{"id":"os/virt/qemu/qemu-arm64","title":"QEMU ARM64","description":"\x3c!--","source":"@site/../notes/os/virt/qemu/qemu-arm64.md","sourceDirName":"os/virt/qemu","slug":"/os/virt/qemu/arm64","permalink":"/notes/os/virt/qemu/arm64","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/qemu/qemu-arm64.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1685599201000,"frontMatter":{"title":"QEMU ARM64"},"sidebar":"docs","previous":{"title":"QEMU","permalink":"/notes/os/virt/qemu/"},"next":{"title":"QEMU Awesome","permalink":"/notes/os/virt/qemu/awesome"}}'),i=t("52676"),s=t("79938");let a={title:"QEMU ARM64"},c="QEMU ARM64",o={},l=[{value:"NVME",id:"nvme",level:2},{value:"x86_64 NVME",id:"x86_64-nvme",level:2}];function m(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"qemu-arm64",children:"QEMU ARM64"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# \u7CFB\u7EDF\u955C\u50CF\ncurl -Lo alpine-virt-aarch64.iso https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.17/releases/aarch64/alpine-virt-3.17.2-aarch64.iso\n# aavmf\ncurl -Lo aavmf.apk https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/community/aarch64/aavmf-0.0.202211-r0.apk\ntar zxvf aavmf.apk --strip-components 2\nls AAVMF\n\n# \u51C6\u5907\u7CFB\u7EDF\u76D8\nqemu-img create -f qcow2 alpine-aarch64.qcow2 20G\n# ISO \u542F\u52A8\u5B89\u88C5\nqemu-system-aarch64 \\\n  -M virt,gic-version=3 \\\n  -cpu cortex-a57 -m 512M \\\n  -net nic -nic user,hostfwd=tcp::2222-:22 \\\n  -drive if=pflash,format=raw,readonly=on,file="AAVMF/AAVMF_CODE.fd" \\\n  -device ramfb -device usb-ehci -device usb-kbd -device usb-mouse \\\n  -drive file=alpine-aarch64.qcow2 \\\n  -cdrom alpine-virt-aarch64.iso\n\nssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222\n\n# \u5B89\u88C5\u597D\u540E\u786E\u4FDD\u80FD\u6B63\u5E38\u542F\u52A8\nqemu-system-aarch64 \\\n  -M virt,gic-version=3 \\\n  -cpu cortex-a57 -m 512M \\\n  -net nic -nic user,hostfwd=tcp::2222-:22 \\\n  -drive if=pflash,format=raw,readonly=on,file="AAVMF/AAVMF_CODE.fd" \\\n  -device ramfb -device usb-ehci -device usb-kbd -device usb-mouse \\\n  -drive file=alpine-aarch64.qcow2\n\n# 150mb -> 60mb\n# qemu-img convert -O qcow2 alpine-aarch64.qcow2 alpine-3.17-aarch64.qcow2 -c\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.qemu.org/docs/master/system/arm/virt.html",children:"https://www.qemu.org/docs/master/system/arm/virt.html"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://unix.stackexchange.com/a/623044/47774",children:"https://unix.stackexchange.com/a/623044/47774"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"nvme",children:"NVME"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# CONFIG_BLK_DEV_NVME=m \u9700\u8981\u624B\u52A8\u914D\u7F6E\ncat /boot/config-virt | grep -i nvme | grep -v "^#"\n\n# \u6DFB\u52A0 nvme \u5230 features\ncat /etc/mkinitfs/mkinitfs.conf\n\n# \u6DFB\u52A0\u53C2\u6570 GRUB_CMDLINE_LINUX_DEFAULT\n# nvme_core.io_timeout=4294967295 nvme_core.admin_timeout=4294967295\nnano /etc/default/grub\n\nmkinitfs\ngrub-mkconfig -o /boot/grub/grub.cfg\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://help.aliyun.com/document_detail/400536.htm",children:"https://help.aliyun.com/document_detail/400536.htm"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"x86_64-nvme",children:"x86_64 NVME"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"qemu-system-x86_64 -m 2G -net nic -nic user,hostfwd=tcp::2222-:22 \\\n  -bios OVMF/OVMF.fd \\\n  -hda dist/alpine-virt-3.18.0-x86_64-efi-20G.qcow2\n\nssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222\n"})})]})}function u(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return a}});var r=t(75271);let i={},s=r.createContext(i);function a(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);