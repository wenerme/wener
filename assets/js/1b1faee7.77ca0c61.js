"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91489"],{12961:function(n,e,l){l.r(e),l.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>a,assets:()=>c,toc:()=>d,frontMatter:()=>s});var i=JSON.parse('{"id":"os/linux/boot/grub","title":"GRUB","description":"- GRUB","source":"@site/../notes/os/linux/boot/grub.md","sourceDirName":"os/linux/boot","slug":"/os/linux/boot/grub","permalink":"/notes/os/linux/boot/grub","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/boot/grub.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1667482099000,"frontMatter":{"title":"GRUB"},"sidebar":"docs","previous":{"title":"dracut","permalink":"/notes/os/linux/boot/dracut"},"next":{"title":"initramfs","permalink":"/notes/os/linux/boot/initramfs"}}'),r=l("52676"),t=l("79938");let s={title:"GRUB"},o="GRUB",c={},d=[{value:"\u7ED3\u6784",id:"\u7ED3\u6784",level:2},{value:"/etc/grub.d/10_linux",id:"etcgrubd10_linux",level:2},{value:"Install",id:"install",level:2},{value:"Command Line",id:"command-line",level:2},{value:"grub-probe: error: cannot find a device for /",id:"grub-probe-error-cannot-find-a-device-for-",level:2}];function u(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"grub",children:"GRUB"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["GRUB\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u652F\u6301 boot \u5206\u533A\u52A0\u5BC6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["2.0.4 \u8FD8\u4E0D\u652F\u6301 LUKS2 - \u9700\u8981\u6307\u5B9A ",(0,r.jsx)(e.code,{children:"--type luks1"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.gnu.org/software/grub/manual/grub/",children:"grub manual"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/GNU_GRUB",children:"GNU GRUB"})}),"\n",(0,r.jsxs)(e.li,{children:["archlinux ",(0,r.jsx)(e.a,{href:"https://wiki.archlinux.org/title/GRUB",children:"GRUB"})]}),"\n",(0,r.jsxs)(e.li,{children:["ubuntu ",(0,r.jsx)(e.a,{href:"https://help.ubuntu.com/community/Grub2",children:"Grub2"})]}),"\n",(0,r.jsxs)(e.li,{children:["alpine ",(0,r.jsx)(e.a,{href:"https://gitlab.alpinelinux.org/alpine/aports/-/tree/master/main/grub",children:"main/grub"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6709\u52A0 patch \u505A\u4E00\u70B9\u8C03\u6574 - \u4F8B\u5982\u652F\u6301 /etc/update-extlinux.conf"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"\u7ED3\u6784",children:"\u7ED3\u6784"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["/boot/grub/grub.cfg - \u6700\u7EC8\u751F\u6210\u7684\u914D\u7F6E - grub-mkconfig\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u57FA\u4E8E ",(0,r.jsx)(e.code,{children:"/etc/grub.d"})," \u751F\u6210"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["/etc/default/grub - \u73AF\u5883\u914D\u7F6E\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u5F71\u54CD ",(0,r.jsx)(e.code,{children:"/etc/grub.d"})," \u811A\u672C\u751F\u6210\u7ED3\u679C"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["/etc/grub.d\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E3B\u8981\u811A\u672C /etc/grub.d/10_linux"}),"\n",(0,r.jsx)(e.li,{children:"/etc/grub.d/41_custom \u4F1A source /boot/grub/custom.cfg"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"/etc/default/grub"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-shell",children:'GRUB_TIMEOUT=2\nGRUB_DISABLE_SUBMENU=y\nGRUB_DISABLE_RECOVERY=true\nGRUB_CMDLINE_LINUX_DEFAULT="modules=sd-mod,usb-storage,ext4 quiet rootfstype=ext4"\n\n# GRUB_DISABLE_OS_PROBER=false\n# GRUB_PRELOAD_MODULES="lvm"\n# GRUB_ENABLE_CRYPTODISK=y\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["GRUB_CMDLINE_LINUX_DEFAULT\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6B63\u5E38\u6A21\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["GRUB_CMDLINE_LINUX\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6B63\u5E38\u548C\u6062\u590D\u6A21\u5F0F\u90FD\u4F1A\u7528\u5230"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://help.ubuntu.com/community/Grub2/Setup",children:"Grub2/Setup"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"etcgrubd10_linux",children:"/etc/grub.d/10_linux"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F1A source /etc/update-extlinux.conf \u5E76\u6DFB\u52A0\u914D\u7F6E"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'if [ -f /etc/update-extlinux.conf ]; then\n	. /etc/update-extlinux.conf\n	GRUB_CMDLINE_LINUX_DEFAULT="modules=${modules} ${default_kernel_opts} ${GRUB_CMDLINE_LINUX_DEFAULT}"\nfi\n'})}),"\n",(0,r.jsx)(e.h2,{id:"install",children:"Install"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'# https://github.com/alpinelinux/alpine-conf/blob/4f960a81e65c7ee1e37b5a4029e2aa47e63e654f/setup-disk.in#L281\ngrub-install --target=x86_64-efi --efi-directory="$mnt"/boot/efi --bootloader-id=alpine --boot-directory="$mnt"/boot --no-nvram\n# fallback\ninstall -D "$mnt"/boot/efi/EFI/alpine/grubx64.efi "$mnt"/boot/efi/EFI/boot/boot$fwa.efi\n\ngrub-install --target=i386-pc /dev/sdX\ngrub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB\n\ngrub-mkconfig -o /boot/grub/grub.cfg\n'})}),"\n",(0,r.jsx)(e.h2,{id:"command-line",children:"Command Line"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"search"}),"\n",(0,r.jsx)(e.li,{children:"linux"}),"\n",(0,r.jsx)(e.li,{children:"echo"}),"\n",(0,r.jsx)(e.li,{children:"insmod"}),"\n",(0,r.jsx)(e.li,{children:"linux"}),"\n",(0,r.jsx)(e.li,{children:"initrd"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u6587\u4EF6\u540D\u8BED\u6CD5 - block+path\nls -lash (hd0,gpt2)/\n\nls -lash (hd0,gpt1)/efi/boot\nls -lash (hd0,gpt2)/boot/vmlinuz-lts\n\nset root=(hd0,gpt2)\nls /\n"})}),"\n",(0,r.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h2,{id:"grub-probe-error-cannot-find-a-device-for-",children:"grub-probe: error: cannot find a device for /"}),"\n",(0,r.jsx)(e.p,{children:"\u5148 chroot \u518D mount \u4E00\u6B21"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"chroot /mnt\nmount -t ext4 /dev/loop0p2 /\n\n# \u73B0\u5728\u6267\u884C\u5C31\u6CA1\u95EE\u9898\u4E86\ngrub-mkconfig -o /boot/grub/grub.cfg.new \\\n	&& mv /boot/grub/grub.cfg.new /boot/grub/grub.cfg\n"})})]})}function a(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(u,{...n})}):u(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return o},a:function(){return s}});var i=l(75271);let r={},t=i.createContext(r);function s(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:s(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);