"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["2902"],{28334:function(n,e,i){i.r(e),i.d(e,{assets:function(){return d},contentTitle:function(){return c},default:function(){return u},frontMatter:function(){return l},metadata:function(){return t},toc:function(){return a}});var t=i(9319),s=i(52676),r=i(79938);let l={slug:"fix-init-script",title:"\u8BB0\u5F55\u4E00\u6B21\u4FEE\u590D init \u811A\u672C\u7684\u7ECF\u5386",tags:["AlpineLinux","\u8FD0\u7EF4"]},c="\u8BB0\u5F55\u4E00\u6B21\u4FEE\u590D init \u811A\u672C\u7684\u7ECF\u5386",d={authorsImageUrls:[]},a=[{value:"\u95EE\u9898\u4EA7\u751F\u8FC7\u7A0B",id:"\u95EE\u9898\u4EA7\u751F\u8FC7\u7A0B",level:2},{value:"\u96BE\u70B9",id:"\u96BE\u70B9",level:2},{value:"\u64CD\u4F5C\u8FC7\u7A0B",id:"\u64CD\u4F5C\u8FC7\u7A0B",level:2},{value:"\u51C6\u5907\u865A\u62DF\u673A\u548C\u73AF\u5883",id:"\u51C6\u5907\u865A\u62DF\u673A\u548C\u73AF\u5883",level:3},{value:"\u542F\u52A8\u7CFB\u7EDF",id:"\u542F\u52A8\u7CFB\u7EDF",level:3},{value:"\u4FEE\u590D init \u811A\u672C",id:"\u4FEE\u590D-init-\u811A\u672C",level:3},{value:"\u907F\u514D\u518D\u6B21\u51FA\u73B0\u95EE\u9898",id:"\u907F\u514D\u518D\u6B21\u51FA\u73B0\u95EE\u9898",level:3},{value:"\u603B\u7ED3",id:"\u603B\u7ED3",level:2}];function o(n){let e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"\u95EE\u9898\u4EA7\u751F\u8FC7\u7A0B",children:"\u95EE\u9898\u4EA7\u751F\u8FC7\u7A0B"}),"\n",(0,s.jsxs)(e.p,{children:["\u7531\u4E8E\u5B9A\u5236\u5316\u8FC7 ",(0,s.jsx)(e.code,{children:"/usr/share/mkinitfs/initramfs-init"})," \u811A\u672C\uFF0C\u5728\u5347\u7EA7\u5927\u7248\u672C\u540E\uFF0C\u8BE5\u6587\u4EF6\u88AB\u8986\u76D6\uFF0C\u5BFC\u81F4\u751F\u6210\u7684 initramfs \u65E0\u6CD5\u542F\u52A8\u7CFB\u7EDF\u3002"]}),"\n",(0,s.jsxs)(e.p,{children:["\u6B63\u5E38\u60C5\u51B5\u5347\u7EA7 ",(0,s.jsx)(e.code,{children:"/etc"})," \u4E0B\u4F1A\u4EA7\u751F ",(0,s.jsx)(e.code,{children:".apk-new"})," \u540E\u7F00\u6587\u4EF6\u907F\u514D\u5347\u7EA7\u8986\u76D6\uFF0C\u4F46\u7531\u4E8E\u662F ",(0,s.jsx)(e.code,{children:"/usr/share"})," \u4E0B\u6587\u4EF6\uFF0C\u56E0\u6B64\u5BFC\u81F4\u8986\u76D6\u3002"]}),"\n",(0,s.jsx)(e.h2,{id:"\u96BE\u70B9",children:"\u96BE\u70B9"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u7CFB\u7EDF\u4F7F\u7528\u9759\u6001 IP\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u9700\u8981\u63D0\u4F9B\u76F8\u540C IP \u6BB5\u5730\u5740\u624D\u80FD\u8FDB\u884C SSH"}),"\n",(0,s.jsx)(e.li,{children:"\u5047\u8BBE IP \u4E3A 192.168.66.99/22"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u7CFB\u7EDF\u5728\u786C\u76D8\u4E0A - M2\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u65E0\u6CD5\u76F4\u63A5\u5728\u5176\u4ED6\u7CFB\u7EDF\u4E0A\u8FDB\u884C\u4FEE\u590D"}),"\n",(0,s.jsx)(e.li,{children:"\u901A\u8FC7\u63D0\u4F9B U \u76D8 \u7CFB\u7EDF\u5728\u539F\u5730\u6062\u590D"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["root \u76D8\u6709 luks \u52A0\u5BC6\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u4F9D\u8D56\u786C\u4EF6\u73AF\u5883"}),"\n",(0,s.jsx)(e.li,{children:"QEMU \u542F\u52A8\u65E0\u6CD5\u6A21\u62DF\u76F8\u540C\u73AF\u5883"}),"\n",(0,s.jsx)(e.li,{children:"\u9700\u8981\u624B\u52A8\u8F93\u5165\u5BC6\u94A5\u8FDB\u884C\u6302\u8F7D"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["root \u5BC6\u7801\u4E3A UUID\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u6781\u5176\u96BE\u8F93\u5165"}),"\n",(0,s.jsx)(e.li,{children:"\u4E14\u9700\u8981\u8F93\u5165\u591A\u6B21\uFF0C\u56E0\u6B64\u9009\u62E9\u7F51\u7EDC\u6253\u901A\u901A\u8FC7 SSH \u767B\u9646"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"\u64CD\u4F5C\u8FC7\u7A0B",children:"\u64CD\u4F5C\u8FC7\u7A0B"}),"\n",(0,s.jsx)(e.h3,{id:"\u51C6\u5907\u865A\u62DF\u673A\u548C\u73AF\u5883",children:"\u51C6\u5907\u865A\u62DF\u673A\u548C\u73AF\u5883"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# QEMU \u865A\u62DF\u673A\napk add qemu-system-x86_64\n\n# \u6865\u63A5\u6A21\u62DF\u7F51\u7EDC\u73AF\u5883 - \u4F7F\u7528\u76F8\u540C IP \u6BB5\u8BBF\u95EE\nip li add vmbr0 type bridge\nip li set vmbr0 up\n# \u6865\u63A5\u4EE5\u4FBF\u4E8E\u8BBF\u95EE 192.168.66.99/22\nip addr add 192.168.66.1/22 dev vmbr0\n\n# \u5141\u8BB8 qemu \u6865\u63A5\u7F51\u5361\necho 'allow vmbr0' >> /etc/qemu/bridge.conf\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u542F\u52A8\u7CFB\u7EDF",children:"\u542F\u52A8\u7CFB\u7EDF"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u63D0\u4F9B vnc \u65B9\u4FBF\u67E5\u770B\n# -curses \u65B9\u4FBF\u8F93\u5165 luks \u5BC6\u94A5\n# \u6865\u63A5 vmbr0\nqemu-system-x86_64 -accel kvm -m 2G \\\n  -vnc 0.0.0.0:1 /dev/sda \\\n  -netdev bridge,br=vmbr0,id=n1 -device virtio-net,netdev=n1 \\\n  -curses\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u542F\u52A8\u540E\u65E0\u6CD5\u8FDB\u5165\u7CFB\u7EDF\uFF0C/sysroot \u6302\u8F7D\u5931\u8D25\uFF0C\u51FA\u73B0\u4FEE\u590D shell"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"mount: mounting /dev/sda2 on /sysroot failed: Invalid argument\nMounting root failed.\ninitramfs emergency recovery shell launched. Type 'exit' to continue boot\nsh: can't access tty; job control turned off\n/ #\n"})}),"\n",(0,s.jsx)(e.p,{children:"\u6B64\u65F6\u624B\u52A8\u6302\u8F7D /sysroot"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"cryptsetup open /dev/sda2 cryptroot\n# \u7C98\u8D34\u5BC6\u94A5\n\n# \u6302\u8F7D sysroot\nmount /dev/mapper/cryptroot /sysroot\n\n# \u9000\u51FA shell \u6B63\u5E38\u8FDB\u5165\u7CFB\u7EDF\nexit\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u4FEE\u590D-init-\u811A\u672C",children:"\u4FEE\u590D init \u811A\u672C"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"# \u5C06\u51C6\u5907\u597D\u7684 init \u811A\u672C\u76F4\u63A5\u8986\u76D6\nrsync --rsync-path='sudo rsync' --no-owner initramfs-init admin@192.168.66.99:/usr/share/mkinitfs/initramfs-init\n\n# \u8FDB\u5165\u865A\u62DF\u673A\nssh admin@192.168.66.99\n\n# \u4ECE\u65B0\u751F\u6210 initramfs\nmkinitfs\n\n# \u4E3A\u5B89\u5168\u8D77\u89C1\uFF0C\u9A8C\u8BC1\u811A\u672C\u6B63\u786E\nmkdir -p /tmp/init\ncd /tmp/init\n# \u89E3\u538B\u5230\u5F53\u524D\u76EE\u5F55\nzcat < /boot/initramfs-lts | cpio -idmv\n# \u786E\u4FDD\u662F\u6B63\u786E\u7684\u811A\u672C\ncat init\n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u907F\u514D\u518D\u6B21\u51FA\u73B0\u95EE\u9898",children:"\u907F\u514D\u518D\u6B21\u51FA\u73B0\u95EE\u9898"}),"\n",(0,s.jsx)(e.p,{children:"/etc \u4E0B\u914D\u7F6E\u4E0D\u4F1A\u88AB\u8986\u76D6\uFF0Clbu \u8FD8\u80FD\u5907\u4EFD\uFF0C\u56E0\u6B64\u5C06 init \u811A\u672C\u653E\u5230 etc\uFF0C\u4FEE\u6539 mkinitfs \u914D\u7F6E\u6307\u5411\u671F\u671B\u7684\u811A\u672C\u3002"}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.a,{href:"https://github.com/alpinelinux/mkinitfs/blob/master/mkinitfs.in",children:"mkinitfs"})," \u7684\u914D\u7F6E\u6587\u4EF6\u4F4D\u4E8E ",(0,s.jsx)(e.code,{children:"/etc/mkinitfs/mkinitfs.conf"}),", \u9ED8\u8BA4\u914D\u7F6E features, \u8BE5\u6587\u4EF6\u4F1A\u88AB\u811A\u672C\u76F4\u63A5 source (",(0,s.jsx)(e.a,{href:"https://github.com/alpinelinux/mkinitfs/blob/a4d6120aa949cdb6d18eb8241c4706f96685a359/mkinitfs.in#L237",children:"mkinitfs.in#L237"}),"), \u4ECE\u811A\u672C\u53EF\u770B\u51FA\u914D\u7F6E\u53D8\u91CF\u4E3A init."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'cp /usr/share/mkinitfs/initramfs-init /etc/mkinitfs/initramfs-init\necho "init=/etc/mkinitfs/initramfs-init" >> /etc/mkinitfs/mkinitfs.conf\n'})}),"\n",(0,s.jsx)(e.h2,{id:"\u603B\u7ED3",children:"\u603B\u7ED3"}),"\n",(0,s.jsxs)(e.p,{children:["\u4E0D\u8981\u4FEE\u6539 ",(0,s.jsx)(e.code,{children:"/usr/share"})," \u4E0B\u7684\u9ED8\u8BA4\u914D\u7F6E\uFF0C\u5C06\u914D\u7F6E\u653E\u5230 ",(0,s.jsx)(e.code,{children:"/etc"})," \u4E0B\uFF0C\u5B89\u5168\u53EF\u9760\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528 lbu \u5907\u4EFD\u3002"]})]})}function u(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return l}});var t=i(75271);let s={},r=t.createContext(s);function l(n){let e=t.useContext(r);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:l(n.components),t.createElement(r.Provider,{value:e},n.children)}},9319:function(n){n.exports=JSON.parse('{"permalink":"/story/fix-init-script","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2021/2021-02-27-fix-init-script.md","source":"@site/../story/2021/2021-02-27-fix-init-script.md","title":"\u8BB0\u5F55\u4E00\u6B21\u4FEE\u590D init \u811A\u672C\u7684\u7ECF\u5386","description":"\u95EE\u9898\u4EA7\u751F\u8FC7\u7A0B","date":"2021-02-27T00:00:00.000Z","tags":[{"inline":true,"label":"AlpineLinux","permalink":"/story/tags/alpine-linux"},{"inline":true,"label":"\u8FD0\u7EF4","permalink":"/story/tags/\u8FD0\u7EF4"}],"readingTime":3.15,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"fix-init-script","title":"\u8BB0\u5F55\u4E00\u6B21\u4FEE\u590D init \u811A\u672C\u7684\u7ECF\u5386","tags":["AlpineLinux","\u8FD0\u7EF4"]},"unlisted":false,"prevItem":{"title":"OpenVox VoxStack \u7F51\u5173\u5206\u6790","permalink":"/story/openvox-gw-inside"},"nextItem":{"title":"AlpineLinux \u5B89\u88C5 Xfce \u684C\u9762","permalink":"/story/alpinelinux-setup-xfce"}}')}}]);