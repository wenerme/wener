"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["9475"],{49047:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>l});var r=JSON.parse('{"id":"os/virt/qemu/qemu-img","title":"Qemu Image","description":"- \u53C2\u8003","source":"@site/../notes/os/virt/qemu/qemu-img.md","sourceDirName":"os/virt/qemu","slug":"/os/virt/qemu/img","permalink":"/notes/os/virt/qemu/img","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/qemu/qemu-img.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1722850468000,"frontMatter":{"title":"Qemu Image"},"sidebar":"docs","previous":{"title":"QEMU FAQ","permalink":"/notes/os/virt/qemu/faq"},"next":{"title":"QEMU\u76D1\u89C6\u5668","permalink":"/notes/os/virt/qemu/monitor"}}'),t=s("52676"),i=s("79938");let l={title:"Qemu Image"},c="Qemu Image",d={},a=[{value:"\u78C1\u76D8\u683C\u5F0F",id:"\u78C1\u76D8\u683C\u5F0F",level:2},{value:"holes",id:"holes",level:2},{value:"\u78C1\u76D8\u538B\u7F29",id:"\u78C1\u76D8\u538B\u7F29",level:2},{value:"LUKS",id:"luks",level:2},{value:"\u5408\u5E76 backing \u6587\u4EF6",id:"\u5408\u5E76-backing-\u6587\u4EF6",level:2},{value:"ZFS",id:"zfs",level:2}];function h(e){let n={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"qemu-image",children:"Qemu Image"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://stackoverflow.com/questions/13252682",children:"Copying a 1TB sparse file"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u7ED3\u8BBA - GNU tar \u6700\u5FEB\uFF0C\u5185\u6838 3.1+ \u652F\u6301 SEEK_HOLE"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/sparse_file",children:"Sparse file"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://qemu.weilnetz.de/doc/7.0/tools/qemu-img.html",children:"qemu-img"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B\u6620\u5C04\u60C5\u51B5\nqemu-img map delta.qcow2\n\n# \u521B\u5EFA sparse \u6587\u4EF6\nqemu-img create -f raw test.raw 2G\ndd if=/dev/zero of=test.raw seek=2G bs=1 count=1\n\n# \u4F20\u8F93 sparse \u6587\u4EF6\n# \u8FD8\u662F\u76F8\u5BF9\u6162\nrsync -aS test.raw admin@server:~\n# tar \u652F\u6301 sparse\ntar cSvfz - test.raw | ssh admin@server 'tar -C ~ -zvxf -'\n# \u5982\u679C\u662F\u672C\u5730\uFF0C\u5219\u4E0D\u538B\u7F29\u66F4\u5FEB\ntar cSvf - test.raw | ssh admin@server 'tar -C ~ -vxf -'\n# \u67E5\u770B\u8FDC\u7A0B\u5927\u5C0F\nssh admin@server ls -lahs\n\n# \u538B\u7F29\ntar cSvfz test.tar.gz test.raw\n# \u89E3\u538B\nmkdir test\ntar -xvSf test.tar.gz -C test\n\n# \u590D\u5236\n# \u9ED8\u8BA4\u652F\u6301\uFF0C\u4E0D\u52A0 --sparse=always \u4E5F\u53EF\u4EE5\ncp --sparse=always test.raw tmp1.raw\n# \u5C06 sparse \u53BB\u6389\ncp --sparse=never test.raw tmp2.raw\n# \u6062\u590D\u4E3A sparse\nfallocate -d tmp2.raw\n\n# dd \u652F\u6301 sparse\n# https://man7.org/linux/man-pages/man1/dd.1.html\ndd if=test.raw of=tmp3.raw conv=sparse status=progress bs=128MB\n\n# ddrescue \u652F\u6301\u5199\u5165 sparse\nddrescue -S -b8M /dev/sda1 /mount/external/backup/sda1.raw\n\n# convert\n# convert [--object OBJECTDEF] [--image-opts] [--target-image-opts] [--target-is-zero] [--bitmaps] [-U] [-C] [-c] [-p] [-q] [-n] [-f FMT] [-t CACHE] [-T SRC_CACHE] [-O OUTPUT_FMT] [-B BACKING_FILE [-F BACKING_FMT]] [-o OPTIONS] [-l SNAPSHOT_PARAM] [-S SPARSE_SIZE] [-r RATE_LIMIT] [-m NUM_COROUTINES] [-W] [--salvage] FILENAME [FILENAME2 [...]] OUTPUT_FILENAME\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"flag"}),(0,t.jsx)(n.th,{children:"opt"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-f"}),(0,t.jsx)(n.td,{children:"\u7B2C\u4E00\u4E2A\u955C\u50CF\u683C\u5F0F"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-F"}),(0,t.jsx)(n.td,{children:"\u7B2C\u4E8C\u4E2A\u955C\u50CF\u683C\u5F0F"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"-s"}),(0,t.jsx)(n.td,{children:"\u4E25\u683C\u6A21\u5F0F - \u955C\u50CF size \u4E0D\u5339\u914D\uFF0Callocation \u5931\u8D25\u90FD\u4F1A\u9519\u8BEF"})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"\u78C1\u76D8\u683C\u5F0F",children:"\u78C1\u76D8\u683C\u5F0F"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"format"}),(0,t.jsx)(n.th,{children:"for"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"raw"}),(0,t.jsx)(n.td,{children:"\u539F\u59CB\u78C1\u76D8\u683C\u5F0F"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"bochs"}),(0,t.jsx)(n.td,{children:"Bochs"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"cloop"}),(0,t.jsx)(n.td,{children:"compressed loopback"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"cow"}),(0,t.jsx)(n.td,{children:"User Mode Linux Copy On Write image format"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"dmg"}),(0,t.jsx)(n.td,{children:"Mac"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"iso"}),(0,t.jsx)(n.td,{children:"CDROM"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.del,{children:"qcow"})}),(0,t.jsx)(n.td,{children:"QEMUv1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"qcow2"}),(0,t.jsx)(n.td,{children:"QEMUv2"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"qed"}),(0,t.jsx)(n.td,{children:"QEMU Enhanced"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"vdi"}),(0,t.jsx)(n.td,{children:"Oracle VM VirtualBox Disk Image"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"vmdk"}),(0,t.jsx)(n.td,{children:"VMware"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"nbd"}),(0,t.jsx)(n.td,{children:"Network block device"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"parallels"}),(0,t.jsx)(n.td,{children:"Parallels virtualization"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"vvfat"}),(0,t.jsx)(n.td,{children:"Virtual VFAT"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"vhd"}),(0,t.jsx)(n.td,{children:"Microsoft virtual hard disk"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"vhdx"}),(0,t.jsx)(n.td,{children:"Microsoft Hyper-V"})]})]})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["raw - \u539F\u59CB\u78C1\u76D8\u683C\u5F0F\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6027\u80FD\u6700\u597D\uFF0C\u5360\u7528\u7A7A\u95F4\u6700\u591A"}),"\n",(0,t.jsx)(n.li,{children:"fallocate \u53EF\u4EE5\u9884\u7559\u7A7A\u95F4"}),"\n",(0,t.jsxs)(n.li,{children:["Linux \u4E0B\u5982\u679C\u6587\u4EF6\u7CFB\u7EDF\u652F\u6301 holes(ext2,ext3,NTFS \u7B49) \u5219\u53EA\u6709\u4F7F\u7528\u7684\u7A7A\u95F4\u624D\u4F1A\u88AB\u5360\u7528 - ",(0,t.jsx)(n.code,{children:"ls -ls"})," \u67E5\u770B\u7B2C\u4E00\u5217 \u6216 ",(0,t.jsx)(n.code,{children:"qemu-img info"})," \u67E5\u770B"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["cloop - compressed loopback disk image format\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"useful only to reuse directly compressed CD-ROM images present for example in the Knoppix CD-ROMs."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["cow - User Mode Linux Copy On Write image format\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E3A\u4E86\u517C\u5BB9\u5B58\u5728\uFF0C\u4E0D\u652F\u6301 Windows"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["qcow2 - QEMU v2\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u529F\u80FD\u6700\u4E3A\u9F50\u5168"}),"\n",(0,t.jsx)(n.li,{children:"AES \u52A0\u5BC6"}),"\n",(0,t.jsx)(n.li,{children:"zlib \u538B\u7F29"}),"\n",(0,t.jsx)(n.li,{children:"\u652F\u6301\u5FEB\u7167"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"vpc/vhd - Windows Virtual PC / Microsoft virtual hard disk image format"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u68C0\u6D4B\u662F\u5426\u652F\u6301 holes\n# \u5982\u679C\u662F\u4E00\u77AC\u95F4\u5C31\u597D\nqemu-img create -f raw test.raw 2G\n# \u7B2C\u4E00\u5217\u4E3A\u5B9E\u9645\u5360\u7528\u5927\u5C0F\nls -lsh test.raw\n"})}),"\n",(0,t.jsx)(n.h2,{id:"holes",children:"holes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"virt-sparsify - libguestfs"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u78C1\u76D8\u538B\u7F29",children:"\u78C1\u76D8\u538B\u7F29"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://pve.proxmox.com/wiki/Shrink_Qcow2_Disk_Files",children:"Shrink Qcow2 Disk Files"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://blog.programster.org/qemu-img-cheatsheet",children:"http://blog.programster.org/qemu-img-cheatsheet"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u7F29\u5C0F\n# ==========\n# \u4E3B\u673A\u5185\u6267\u884C\nfstrim -av\n\n# \u8F6C\u6362\u540E\u4F1A\u53D8\u5C0F\nqemu-img convert -O qcow2 alpine.img shrink.qcow2\n# \u4E5F\u53EF\u4EE5\u8FDB\u884C\u538B\u7F29\uFF0C\u4F1A\u66F4\u5C0F\uFF0C\u4F46\u542F\u52A8\u65F6\u4F1A\u6062\u590D\nqemu-img convert -O qcow2 alpine.img shrink.qcow2 -c\n"})}),"\n",(0,t.jsx)(n.h2,{id:"luks",children:"LUKS"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"QCOW2 \u652F\u6301 LUKS"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.qemu.org/docs/master/system/qemu-block-drivers.html",children:"https://www.qemu.org/docs/master/system/qemu-block-drivers.html"})}),"\n",(0,t.jsx)(n.li,{children:"\u76F4\u63A5\u4F7F\u7528 LUKS \u7B49\u540C\u4E8E RAW \u52A0\u5BC6"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# \u521B\u5EFA\u65E0\u5BC6\u7801\u78C1\u76D8\nqemu-img create -f qcow2 demo.qcow2 10M\n# RAW LUKS \u52A0\u5BC6\uFF0C\u5BC6\u7801\u4E3A 123\nqemu-img create -f luks --object secret,data=123,id=sec0 -o key-secret=sec0 demo.luks 10M\n# \u5199\u5165 LUKS\nqemu-img convert --target-image-opts --object secret,data=123,id=sec0 -f qcow2 demo.qcow2 -n driver=luks,file.filename=demo.luks,key-secret=sec0\n\n# QCOW2 LUKS\nqemu-img create -f qcow2 --object secret,data=123,id=sec0 -o encrypt.format=luks -o encrypt.key-secret=sec0 demo.luks 10M\nqemu-img convert --target-image-opts --object secret,data=123,id=sec0 -f qcow2 demo.qcow2 -n driver=qcow2,file.filename=demo.luks,encrypt.key-secret=sec0\n\n# QEMU \u4F7F\u7528\n# -drive file=demo.luks,format=luks,key-secret=sec0,if=virtio -object secret,data=123,id=sec0\n\n# AES \u52A0\u5BC6\u5BC6\u94A5\nopenssl rand -base64 32 > key.b64\nKEY=$(base64 -d key.b64 | hexdump -v -e \'/1 "%02X"\')\nopenssl rand -base64 16 > iv.b64\nIV=$(base64 -d iv.b64 | hexdump -v -e \'/1 "%02X"\')\nprintf "123" | openssl enc -aes-256-cbc -a -K $KEY -iv $IV > sec.b64\n\nqemu-system-x86_64 \\\n  -object secret,id=secmaster0,format=base64,file=key.b64 \\\n  -object secret,id=sec0,keyid=secmaster0,format=base64,file=sec.b64,iv=$(< iv.b64) \\\n  -drive file=demo.luks,format=luks,key-secret=sec0,if=virtio\n\n# printf "$SECRET" | openssl enc -d -aes-256-cbc -a -K $KEY -iv $IV\n'})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"\u5408\u5E76-backing-\u6587\u4EF6",children:"\u5408\u5E76 backing \u6587\u4EF6"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://libvirt.org/kbase/backing_chains.html",children:"https://libvirt.org/kbase/backing_chains.html"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B backing\nqemu-img info --backing-chain test.qcow2\n# \u5047\u8BBE test.qcow2 \u7684 base \u662F base.qcow2\ncp base.qcow2 tmp.qcow2\n\n# \u4FEE\u6539 base\nqemu-img rebase -b tmp.qcow2 test.qcow2\n# \u63D0\u4EA4\u5230 base\nqemu-img commit test.qcow2\n# \u79FB\u9664\u65E7\u7684\u6587\u4EF6\nmv tmp.qcow2 test.qcow2\n"})}),"\n",(0,t.jsx)(n.h2,{id:"zfs",children:"ZFS"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"ZVOL \u6027\u80FD\u53EF\u80FD\u4F1A\u6BD4 QEMU2 \u597D\u4E00\u70B9\uFF0C\u4F46\u662F\u4E0D\u503C\u5F97"}),"\n",(0,t.jsx)(n.li,{children:"QEMU2 \u66F4\u597D\u7BA1\u7406\u7EF4\u62A4\uFF0C\u652F\u6301\u66F4\u591A\u529F\u80FD"}),"\n",(0,t.jsx)(n.li,{children:"\u53EF\u4EE5\u8003\u8651\u5F00\u542F zfs \u538B\u7F29 - lz4 \u89E3\u538B\u5FEB\uFF0Czstd \u538B\u7F29\u6BD4\u9AD8"}),"\n"]})]})}function o(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return l}});var r=s(75271);let t={},i=r.createContext(t);function l(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);