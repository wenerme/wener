"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["1218"],{36352:function(n,e,t){t.r(e),t.d(e,{metadata:()=>r,contentTitle:()=>s,default:()=>p,assets:()=>c,toc:()=>d,frontMatter:()=>a});var r=JSON.parse('{"id":"os/alpine/alpine-chroot","title":"Alpine chroot \u73AF\u5883","description":"- Alpine Linux in a chroot","source":"@site/../notes/os/alpine/alpine-chroot.md","sourceDirName":"os/alpine","slug":"/os/alpine/chroot","permalink":"/notes/os/alpine/chroot","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/alpine/alpine-chroot.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659680046000,"frontMatter":{"title":"Alpine chroot \u73AF\u5883"},"sidebar":"docs","previous":{"title":"Alpin Boot","permalink":"/notes/os/alpine/boot"},"next":{"title":"Alpine FAQ","permalink":"/notes/os/alpine/faq"}}'),o=t("52676"),i=t("79938");let a={title:"Alpine chroot \u73AF\u5883"},s="Alpine chroot \u73AF\u5883",c={},d=[{value:"alpine 3.1 armhf",id:"alpine-31-armhf",level:2}];function l(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"alpine-chroot-\u73AF\u5883",children:"Alpine chroot \u73AF\u5883"})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"https://wiki.alpinelinux.org/wiki/Alpine_Linux_in_a_chroot",children:"Alpine Linux in a chroot"})}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:'mirror=http://mirrors.sjtug.sjtu.edu.cn/alpine/\narch=armhf\nversion=2.12.1-r0\ncurl -LO ${mirror}/latest-stable/main/${arch}/apk-tools-static-${version}.apk\n\ncurl -LO http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.10/main/armhf/apk-tools-static-2.10.4-r2.apk\n\n./sbin/apk.static -X ${mirror}/latest-stable/main -U --allow-untrusted -p ${chroot_dir} --initdb add alpine-base\nmount -o bind /dev ${chroot_dir}/dev\n\nmknod -m 666 ${chroot_dir}/dev/full c 1 7\nmknod -m 666 ${chroot_dir}/dev/ptmx c 5 2\nmknod -m 644 ${chroot_dir}/dev/random c 1 8\nmknod -m 644 ${chroot_dir}/dev/urandom c 1 9\nmknod -m 666 ${chroot_dir}/dev/zero c 1 5\nmknod -m 666 ${chroot_dir}/dev/tty c 5 0\n\n# scsi\n# mknod -m 666 ${chroot_dir}/dev/sda b 8 0\n# mknod -m 666 ${chroot_dir}/dev/sda1 b 8 1\n# mknod -m 666 ${chroot_dir}/dev/sda2 b 8 2\n# mknod -m 666 ${chroot_dir}/dev/sda3 b 8 3\n# mknod -m 666 ${chroot_dir}/dev/sdb b 8 16\n# mknod -m 666 ${chroot_dir}/dev/sdb1 b 8 17\n\nmount -t proc none ${chroot_dir}/proc\nmount -o bind /sys ${chroot_dir}/sys\ncp -L /etc/resolv.conf ${chroot_dir}/etc/\n\nmkdir -p ${chroot_dir}/etc/apk\necho "${mirror}/${branch}/main" > ${chroot_dir}/etc/apk/repositories\n\n# \u6216\u8005\u53EF\u4EE5\u4F7F\u7528 busybox\ncurl -O https://busybox.net/downloads/binaries/1.21.1/busybox-armv6l\n'})}),"\n",(0,o.jsx)(e.h2,{id:"alpine-31-armhf",children:"alpine 3.1 armhf"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"\u6700\u65E9\u7684 armhf"}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main/armhf/\ncurl -LO http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main/armhf/apk-tools-static-2.5.0_rc1-r1.apk\n\ntar -zxvf apk-tools-static-2.5.0_rc1-r1.apk sbin/apk.static --strip-components 1\nmkdir root\nsudo apk.static -X http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main -U --allow-untrusted -p root --initdb add alpine-base\n"})})]})}function p(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return s},a:function(){return a}});var r=t(75271);let o={},i=r.createContext(o);function a(n){let e=r.useContext(i);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:a(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);