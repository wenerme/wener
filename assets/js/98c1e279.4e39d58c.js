"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["97616"],{74657:function(e,n,r){r.r(n),r.d(n,{assets:function(){return t},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return a},metadata:function(){return s},toc:function(){return i}});var s=r(96180),d=r(52676),l=r(79938);let a={slug:"recover-synology",title:"\u6062\u590D\u7FA4\u6656\u6570\u636E\u76D8",tags:["AlpineLinux","\u8FD0\u7EF4"]},c=void 0,t={authorsImageUrls:[]},i=[{value:"Recover Synology",id:"recover-synology",level:2},{value:"\u95EE\u9898",id:"\u95EE\u9898",level:2},{value:"\u64CD\u4F5C",id:"\u64CD\u4F5C",level:2},{value:"wrong fs type, bad option, bad superblock on /dev/mapper/vg1-volume_1",id:"wrong-fs-type-bad-option-bad-superblock-on-devmappervg1-volume_1",level:2},{value:"S.M.A.T Check",id:"smat-check",level:2},{value:"LVM Check",id:"lvm-check",level:2},{value:"mdadm check",id:"mdadm-check",level:2},{value:"BTRFS critical (device dm-1): corrupt leaf",id:"btrfs-critical-device-dm-1-corrupt-leaf",level:2},{value:"btrfs backup",id:"btrfs-backup",level:2},{value:"LV Status NOT available",id:"lv-status-not-available",level:2},{value:"WARNING: PV /dev/md127 in VG vg1 is using an old PV header, modify the VG to update.",id:"warning-pv-devmd127-in-vg-vg1-is-using-an-old-pv-header-modify-the-vg-to-update",level:2},{value:"File descriptor 63 (pipe: 111755) leaked on pvck invocation.",id:"file-descriptor-63-pipe-111755-leaked-on-pvck-invocation",level:2},{value:"\u53C2\u8003",id:"\u53C2\u8003",level:2}];function o(e){let n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h2,{id:"recover-synology",children:"Recover Synology"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"Recover Synology from AlpineLinux"}),"\n",(0,d.jsx)(n.li,{children:"btrfs report I/O Error"}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"\u95EE\u9898",children:"\u95EE\u9898"}),"\n",(0,d.jsx)(n.p,{children:"\u7FA4\u6656\u7684\u76D8\u641E\u7684\u5F88\u590D\u6742"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"mdraid -> lvm -> btrfs"}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:"\u53EA\u770B\u5230 btrfs \u62A5\u9519\uFF08I/O Error\uFF09\uFF0C\u65E0\u6CD5\u4F7F\u7528\uFF0C\u6CA1\u770B\u5230\u5177\u4F53\u7684\u78C1\u76D8\u9519\u8BEF\uFF0C\u53EA\u80FD\u9010\u7EA7\u6392\u67E5\u3002"}),"\n",(0,d.jsx)(n.p,{children:"\u4E3B\u8981\u76EE\u7684\u662F\u6302\u8F7D btrfs \u6062\u590D\u6570\u636E\u3002"}),"\n",(0,d.jsx)(n.h2,{id:"\u64CD\u4F5C",children:"\u64CD\u4F5C"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"file -s /dev/sda1 # linux_raid_member\nfile -s /dev/sda2 # swap\nfile -s /dev/sda3 # \u53D1\u73B0\u662F\u7528\u7684 mdadm RAID 6\n# /dev/sda3: Linux Software RAID version 1.2 (1) UUID= name=DF:2 level=6 disks=4\n\napk add mdadm\n\nmdadm --examine --scan  # \u626B\u63CF\nmdadm --assemble --scan # \u6DFB\u52A0\ncat /proc/mdstat        # \u72B6\u6001\n\nfile -s /dev/md127 # \u53D1\u73B0\u662F LVM\n# /dev/md127: LVM2 PV (Linux Logical Volume Manager), UUID: , size: 11980386729984\n"})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.strong,{children:"\u6302\u8F7D LVM"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:'apk add lvm2\n\npvscan\n# PV /dev/md127   VG vg1             lvm2 [<10.90 TiB / 604.00 MiB free]\nvgscan\n# Found volume group "vg1" using metadata type lvm2\n\nlvdisplay\nlvs\n# /dev/vg1/syno_vg_reserved_area\n# /dev/vg1/volume_1\n\nvgchange -ay vg1 # \u6FC0\u6D3B vg1\n\nfile -s /dev/vg1/volume_1 # -> /dev/mapper/vg1-volume_1\nfile -s /dev/mapper/vg1-volume_1\n# /dev/mapper/vg1-volume_1: BTRFS Filesystem label "2022.12.04-17:42:08 v42661", sectorsize 4096, nodesize 16384, leafsize 16384, UUID=, 151894196224/11979737530368 bytes used, 1 devices\n'})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.strong,{children:"\u6302\u8F7D btrfs"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"apk add btrfs-progs btrfs-progs-extra\nmodprobe btrfs\n\nbtrfs device scan\nbtrfs filesystem show\n\nbtrfs check /dev/mapper/vg1-volume_1 # \u5C1D\u8BD5\u68C0\u6D4B\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"ERROR: errors found in fs roots\nfound 151884984320 bytes used, error(s) found\ntotal csum bytes: 2896392\ntotal tree bytes: 127860736\ntotal fs tree bytes: 99958784\ntotal extent tree bytes: 15761408\nbtree space waste bytes: 25632487\nfile data blocks allocated: 103613448192\n referenced 103061467136\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\u53D1\u73B0\u4E0D\u5C11\u95EE\u9898"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"mount /dev/mapper/vg1-volume_1 /mnt # \u5C1D\u8BD5\u6302\u8F7D\n# wrong fs type, bad option, bad superblock on /dev/mapper/vg1-volume_1\n\ndmesg # \u5185\u6838\u65E5\u5FD7\u627E\u539F\u56E0\n# BTRFS critical (device dm-1): corrupt leaf\n\nmount -t btrfs -o recovery,ro /dev/mapper/vg1-volume_1 /mnt\n\nbtrfs check /dev/mapper/vg1-volume_1 --repair # \u5C1D\u8BD5\u4FEE\u590D\uFF0C\u4F46\u662F\u5931\u8D25\n# ERROR: failed to repair root items: I/O error\n\nbtrfs scrub start -Bf /dev/mapper/vg1-volume_1\n# btrfs rescue zero-log /dev/<device_name>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"smartctl \u5C1D\u8BD5\u68C0\u6D4B\u786C\u76D8\u95EE\u9898"}),"\n",(0,d.jsx)(n.li,{children:"mdadm \u5C1D\u8BD5 resync"}),"\n"]}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"\u65E0\u89E3, TODO"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"/dev/mapper/cachedev_0 on /volume1 type btrfs (rw,nodev,relatime,ssd,synoacl,space_cache=v2,auto_reclaim_space,metadata_ratio=50,block_group_cache_tree,subvolid=256,subvol=/@syno)\n"})}),"\n",(0,d.jsx)(n.h2,{id:"wrong-fs-type-bad-option-bad-superblock-on-devmappervg1-volume_1",children:"wrong fs type, bad option, bad superblock on /dev/mapper/vg1-volume_1"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"mount -t btrfs /dev/mapper/vg1-volume_1 /mnt\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-txt",children:"BTRFS: device label 2022.12.04-17:42:08 v42661 devid 1 transid 449145 /dev/mapper/vg1-volume_1 scanned by mount (4067)\nBTRFS info (device dm-1): using crc32c (crc32c-intel) checksum algorithm\nBTRFS info (device dm-1): using free space tree\nBTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001\nBTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 1\nBTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001\nBTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2\nBTRFS error (device dm-1): open_ctree failed\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"btrfs check /dev/mapper/vg1-volume_1 --repair\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"ERROR: failed to repair root items: I/O error\n"})}),"\n",(0,d.jsx)(n.h2,{id:"smat-check",children:"S.M.A.T Check"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"apk add smartmontools\n\nsmartctl -t long /dev/sda\nsmartctl -t long /dev/sdb\nsmartctl -t long /dev/sdc\nsmartctl -t long /dev/sdd\n\n# \u5F88\u6162\nsmartctl -l selftest /dev/sda\nsmartctl -l selftest /dev/sdb\nsmartctl -l selftest /dev/sdc\nsmartctl -l selftest /dev/sdd\n\nsmartctl -a /dev/sda\n"})}),"\n",(0,d.jsx)(n.h2,{id:"lvm-check",children:"LVM Check"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"vgck vg1 -v\npvck /dev/md127\n"})}),"\n",(0,d.jsx)(n.h2,{id:"mdadm-check",children:"mdadm check"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"4*10T SAS \u9700\u8981\u8DD1 8h, iostat -> ~200MB/s"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"mdadm --detail /dev/md127\nmdadm --action=check /dev/md127\n\n# \u67E5\u770B\u6709\u95EE\u9898\u7684\u5757\nwatch cat /sys/block/md127/md/mismatch_cnt\n# \u67E5\u770B\u8FDB\u5EA6\ncat /proc/mdstat\ncat /sys/block/md127/md/sync_action\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"md127: mismatch sector in range 713232-713240\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"echo idle > /sys/block/md127/md/sync_action # \u505C\u6B62 check\nmdadm --action=repair /dev/md127            # \u5C1D\u8BD5\u4FEE\u590D - repair=resync\niostat -h                                   # write \u662F\u6709\u4FEE\u590D\n\n# K/Sec\ncat /proc/sys/dev/raid/speed_limit_max\nsysctl dev.raid.speed_limit_max # 200000\nsysctl dev.raid.speed_limit_max=2000000\n\n# \u4E0D\u662F\u5E73\u6ED1\u9650\u901F\uFF0C\u800C\u662F\u5E73\u5747 - \u56E0\u6B64 resync \u4E00\u4F1A\u513F\u6EE1\u901F\uFF0C\u4E00\u4F1A\u513F 0\nsysctl dev.raid.speed_limit_max=100000 # \u5982\u679C\u89C9\u5F97\u4FEE\u590D\u4E86\u95EE\u9898\uFF0C\u53EF\u4EE5\u964D\u4F4E\u901F\u5EA6\uFF0C\u7136\u540E\u5C1D\u8BD5\u7CFB\u7EDF\u64CD\u4F5C\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://unix.stackexchange.com/a/531230/47774",children:"https://unix.stackexchange.com/a/531230/47774"})}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"btrfs-critical-device-dm-1-corrupt-leaf",children:"BTRFS critical (device dm-1): corrupt leaf"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2\nBTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001\nBTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 1\nBTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001\nBTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2\nBTRFS error (device dm-1): open_ctree failed\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"btrfs check /dev/mapper/vg1-volume_1 --repair\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-txt",children:"[1/7] checking root items\nchecksum verify failed on 711114752 wanted 0xed010ef2 found 0xb32e10d9\nchecksum verify failed on 711114752 wanted 0xed010ef2 found 0x3a406fa5\nchecksum verify failed on 711114752 wanted 0xed010ef2 found 0xb32e10d9\nCsum didn't match\nERROR: failed to repair root items: I/O error\n"})}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"BTRFS: device label 2022.12.04-17:42:08 v42661 devid 1 transid 449145 /dev/mapper/vg1-volume_1 scanned by btrfs (22854)\n"})}),"\n",(0,d.jsx)(n.h2,{id:"btrfs-backup",children:"btrfs backup"}),"\n",(0,d.jsx)(n.p,{children:"apk add partclone"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"#btrfstune -u /dev/mapper/vg1-volume_1\n"})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.a,{href:"https://manpages.debian.org/jessie/partclone/partclone.btrfs.8",children:"https://manpages.debian.org/jessie/partclone/partclone.btrfs.8"})}),"\n",(0,d.jsx)(n.p,{children:"noerror: Instructs dd to continue operation, ignoring all read errors\nsync: Instruct dd to fill input blocks with zeroes if there were any read errors"}),"\n",(0,d.jsx)(n.p,{children:"dd if=/dev/sda of=/dev/sdb1 bs=1MB conv=noerror,sync status=progress\n| gzip -c > backup.img.gz\ngunzip -c /PATH/TO/DRIVE/backup_image.img.gz | dd of=/dev/sda"}),"\n",(0,d.jsx)(n.h2,{id:"lv-status-not-available",children:"LV Status NOT available"}),"\n",(0,d.jsx)(n.p,{children:"\u662F\u56E0\u4E3A\u6CA1\u6709 active"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"vgchange -ay vg1\n"})}),"\n",(0,d.jsx)(n.h2,{id:"warning-pv-devmd127-in-vg-vg1-is-using-an-old-pv-header-modify-the-vg-to-update",children:"WARNING: PV /dev/md127 in VG vg1 is using an old PV header, modify the VG to update."}),"\n",(0,d.jsx)(n.p,{children:"\u4E0D\u7BA1"}),"\n",(0,d.jsx)(n.h2,{id:"file-descriptor-63-pipe-111755-leaked-on-pvck-invocation",children:"File descriptor 63 (pipe: 111755) leaked on pvck invocation."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"LVM_SUPPRESS_FD_WARNINGS=1 vgck vg1\n"})}),"\n",(0,d.jsx)(n.h2,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/btrfs.8.html",children:"btrfs.8"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/btrfs-check.8.html",children:"btrfs-check.8"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/vgchange.8.html",children:"vgchange.8"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/vgck.8.html",children:"vgck.8"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man4/md.4.html",children:"md.4"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/mdadm.8.html",children:"mdadm.8"})}),"\n",(0,d.jsxs)(n.li,{children:["BTRFS: failed to read log tree\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.code,{children:"btrfs rescue zero-log /dev/<devicename>"})}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://www.suse.com/support/kb/doc/?id=000018761",children:"https://www.suse.com/support/kb/doc/?id=000018761"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.li,{children:(0,d.jsx)(n.a,{href:"https://www.cyberciti.biz/tips/linux-raid-increase-resync-rebuild-speed.html",children:"https://www.cyberciti.biz/tips/linux-raid-increase-resync-rebuild-speed.html"})}),"\n"]}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.strong,{children:"clean up"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"apk del mdadm lvm2 btrfs-progs btrfs-progs-extra\n"})})]})}function m(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return a}});var s=r(75271);let d={},l=s.createContext(d);function a(e){let n=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:a(e.components),s.createElement(l.Provider,{value:n},e.children)}},96180:function(e){e.exports=JSON.parse('{"permalink":"/story/recover-synology","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2023/2023-05-29-recover-synology.md","source":"@site/../story/2023/2023-05-29-recover-synology.md","title":"\u6062\u590D\u7FA4\u6656\u6570\u636E\u76D8","description":"Recover Synology","date":"2023-05-29T00:00:00.000Z","tags":[{"inline":true,"label":"AlpineLinux","permalink":"/story/tags/alpine-linux"},{"inline":true,"label":"\u8FD0\u7EF4","permalink":"/story/tags/\u8FD0\u7EF4"}],"readingTime":5.315,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"recover-synology","title":"\u6062\u590D\u7FA4\u6656\u6570\u636E\u76D8","tags":["AlpineLinux","\u8FD0\u7EF4"]},"unlisted":false,"prevItem":{"title":"\u57FA\u4E8E SNI \u5B9E\u73B0\u65E0\u611F\u5168\u5C40\u4EE3\u7406","permalink":"/story/sni-proxy"},"nextItem":{"title":"\u8FC1\u79FB\u963F\u91CC\u4E91 CDN \u5230 Cloudflare","permalink":"/story/migrate-aliyun-cdn-to-cf"}}')}}]);