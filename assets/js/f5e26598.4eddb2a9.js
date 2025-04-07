"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["34120"],{49228:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>x,assets:()=>t,toc:()=>o,frontMatter:()=>c});var s=JSON.parse('{"id":"os/virt/qemu/qemu-doc","title":"QEMU \u6587\u6863","description":"- QEMU User Guide","source":"@site/../notes/os/virt/qemu/qemu-doc.md","sourceDirName":"os/virt/qemu","slug":"/os/virt/qemu/doc","permalink":"/notes/os/virt/qemu/doc","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/qemu/qemu-doc.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1709694572000,"frontMatter":{"title":"QEMU \u6587\u6863"},"sidebar":"docs","previous":{"title":"QEMU Awesome","permalink":"/notes/os/virt/qemu/awesome"},"next":{"title":"QEMU FAQ","permalink":"/notes/os/virt/qemu/faq"}}'),l=i("52676"),r=i("79938");let c={title:"QEMU \u6587\u6863"},d="QEMU Document",t={},o=[{value:"Device URL Syntax",id:"device-url-syntax",level:3},{value:"\u955C\u50CF",id:"\u955C\u50CF",level:2},{value:"\u53EA\u8BFB\u683C\u5F0F",id:"\u53EA\u8BFB\u683C\u5F0F",level:3},{value:"\u78C1\u76D8\u955C\u50CF",id:"\u78C1\u76D8\u955C\u50CF",level:3},{value:"\u7F51\u7EDC\u5757\u8BBE\u5907",id:"\u7F51\u7EDC\u5757\u8BBE\u5907",level:3},{value:"\u7F51\u7EDC",id:"\u7F51\u7EDC",level:2},{value:"\u5916\u8BBE",id:"\u5916\u8BBE",level:2},{value:"USB",id:"usb",level:3},{value:"PCI",id:"pci",level:3},{value:"\u7528\u6237\u7A7A\u95F4\u865A\u62DF",id:"\u7528\u6237\u7A7A\u95F4\u865A\u62DF",level:2},{value:"\u663E\u793A",id:"\u663E\u793A",level:2}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"qemu-document",children:"QEMU Document"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["QEMU ",(0,l.jsx)(e.a,{href:"https://qemu.weilnetz.de/doc/7.0/",children:"User Guide"})]}),"\n",(0,l.jsxs)(e.li,{children:["QEMU ",(0,l.jsx)(e.a,{href:"https://qemu.weilnetz.de/doc/devel/",children:"Developers Guide"})]}),"\n",(0,l.jsx)(e.li,{children:"\u865A\u62DF\u6A21\u5F0F"}),"\n",(0,l.jsxs)(e.li,{children:["PC \u7CFB\u7EDF\u6A21\u62DF\u5668\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6807\u51C6\u9009\u9879"}),"\n",(0,l.jsx)(e.li,{children:"\u5757\u8BBE\u5907\u9009\u9879"}),"\n",(0,l.jsx)(e.li,{children:"USB \u9009\u9879"}),"\n",(0,l.jsxs)(e.li,{children:["\u663E\u793A\u9009\u9879\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-display [type]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"sdl,curses,none,gtk,vnc"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"-nographic"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-alt-grab"})," - Ctrl-Alt-Shift"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-ctrl-grab"})," - Right-Ctrl"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-spice option[,option[,...]]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"spice \u8FDC\u7A0B\u684C\u9762\u534F\u8BAE"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-full-screen"})," \u5168\u5C4F\u7684\u65B9\u5F0F\u6253\u5F00"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-g widthxheight[xdepth]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8BBE\u7F6E\u521D\u59CB\u5927\u5C0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-vnc display[,option[,option[,...]]]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53C2\u6570"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u7F51\u7EDC"}),"\n",(0,l.jsx)(e.li,{children:"\u5B57\u7B26\u8BBE\u5907"}),"\n",(0,l.jsx)(e.li,{children:"\u84DD\u7259"}),"\n",(0,l.jsx)(e.li,{children:"TPM \u8BBE\u5907"}),"\n",(0,l.jsx)(e.li,{children:"Linux/Multiboot \u542F\u52A8"}),"\n",(0,l.jsxs)(e.li,{children:["\u8C03\u8BD5\u548C\u4E13\u5BB6\u9009\u9879\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-serial [dev]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8F6C\u53D1\u865A\u62DF\u4E32\u53E3\u5230\u4E3B\u673A\u7684\u5B57\u7B26\u8BBE\u5907"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"vc[:WxH]"})," Virtual console"]}),"\n",(0,l.jsx)(e.li,{children:"pty, none, null, chardev:id, /dev/XXX, stdio, pipe:filename,, COMn"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"udp:[remote_host]:remote_port[@[src_ip]:src_port]"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"tcp:[host]:port[,server][,nowait][,nodelay][,reconnect=seconds]"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"telnet:host:port[,server][,nowait][,nodelay]"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"unix:path[,server][,nowait][,reconnect=seconds]"})}),"\n",(0,l.jsx)(e.li,{children:"/dev/parportN"}),"\n",(0,l.jsx)(e.li,{children:"mon:dev_string"}),"\n",(0,l.jsx)(e.li,{children:"braille"}),"\n",(0,l.jsx)(e.li,{children:"msmouse"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-S"})," - \u542F\u52A8\u65F6\u4E0D\u542F\u52A8 CPU, \u624B\u52A8\u8F93\u5165 ",(0,l.jsx)(e.code,{children:"c"})]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-bios file"})," - \u6307\u5B9A BIOS \u6587\u4EF6"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-no-reboot"})," - \u9000\u51FA\u800C\u4E0D\u662F\u91CD\u542F"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-enable-kvm"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u662F\u5426\u542F\u7528 KVM"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-enable-hax"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u662F\u5426\u542F\u7528 HAX (Hardware-based Acceleration eXecution)"}),"\n",(0,l.jsx)(e.li,{children:"\u53EA\u5BF9 Mac \u548C Windows \u6709\u6548"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-loadvm [file]"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u52A0\u8F7D\u4FDD\u5B58\u7684\u72B6\u6001"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-daemonize"})," - \u540E\u53F0\u8FD0\u884C"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-readconfig file"})," - \u4ECE\u6587\u4EF6\u8BFB\u53D6\u8BBE\u5907\u914D\u7F6E"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-writeconfig file"})," - \u5C06\u8BBE\u5907\u914D\u7F6E\u5199\u5165\u5230\u6587\u4EF6"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u76D1\u63A7"}),"\n",(0,l.jsx)(e.li,{children:"\u78C1\u76D8\u955C\u50CF"}),"\n",(0,l.jsx)(e.li,{children:"\u7F51\u7EDC\u6A21\u62DF\u5668"}),"\n",(0,l.jsx)(e.li,{children:"\u5176\u4ED6\u8BBE\u5907"}),"\n",(0,l.jsx)(e.li,{children:"\u76F4\u63A5 Linux \u542F\u52A8"}),"\n",(0,l.jsx)(e.li,{children:"USB \u6A21\u62DF\u5668"}),"\n",(0,l.jsx)(e.li,{children:"VNC \u5B89\u5168\u76F8\u5173"}),"\n",(0,l.jsx)(e.li,{children:"\u5E73\u53F0\u76F8\u5173\u9009\u9879"}),"\n",(0,l.jsxs)(e.li,{children:["\u975E PC \u7CFB\u7EDF\u6A21\u62DF\u5668\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PowerPC"}),"\n",(0,l.jsx)(e.li,{children:"Sparc32"}),"\n",(0,l.jsx)(e.li,{children:"Sparec64"}),"\n",(0,l.jsx)(e.li,{children:"MIPS"}),"\n",(0,l.jsx)(e.li,{children:"ARM"}),"\n",(0,l.jsx)(e.li,{children:"Cris"}),"\n",(0,l.jsx)(e.li,{children:"ClodFire"}),"\n",(0,l.jsx)(e.li,{children:"Cris"}),"\n",(0,l.jsx)(e.li,{children:"Microblaze"}),"\n",(0,l.jsx)(e.li,{children:"Sh4"}),"\n",(0,l.jsx)(e.li,{children:"Xtensa"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u5BA2\u6237\u7AEF\u8C03\u7528"}),"\n",(0,l.jsxs)(e.li,{children:["\u7528\u6237\u7A7A\u95F4\u6A21\u62DF\u5668\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Linux"}),"\n",(0,l.jsx)(e.li,{children:"BSD"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u652F\u6301\u7684\u673A\u5668\nqemu-system-x86_64 -machine help\n# \u652F\u6301\u7684 CPU\nqemu-system-x86_64 -cpu help\n# ARM \u652F\u6301 raspi2\nqemu-system-arm -machine help | grep rasp\n# \u67E5\u770B\u65E5\u5FD7\u9879\nqemu-system-x86_64 -d help\n\n# Alpine virt \u7248, 30M \u5DE6\u53F3, alpine-standard \u4E3A 100M \u5DE6\u53F3\nwget http://dl-cdn.alpinelinux.org/alpine/v3.6/releases/x86_64/alpine-virt-3.6.2-x86_64.iso\n\n# WARNING: Image format was not specified for 'alpine-virt-3.6.2-x86_64.iso' and probing guessed raw.\n#          Automatically detecting the format is dangerous for raw images, write operations on block 0 will be restricted.\n#          Specify the 'raw' format explicitly to remove the restrictions.\nqemu-system-x86_64 alpine-virt-3.6.2-x86_64.iso\n# \u8FD9\u6837\u5C31\u4E0D\u4F1A\u51FA\u73B0\u8B66\u544A\nqemu-system-x86_64 -cdrom alpine-virt-3.6.2-x86_64.iso\n\n# \u5C06\u4E00\u4E2A\u76EE\u5F55\u4F5C\u4E3A\u865A\u62DF\u7684 fat \u78C1\u76D8\u955C\u50CF, \u9ED8\u8BA4\u53EA\u8BFB\nqemu-system-i386 linux.img -hdb fat:/my_directory\n"})}),"\n",(0,l.jsx)(e.h3,{id:"device-url-syntax",children:"Device URL Syntax"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# \u8BBE\u5907 URL \u8BED\u6CD5\n# ===========\n# iSCSI\n# iscsi://<target-ip>[:<port>]/<target-iqn>/<lun>\n# \u65E0\u6388\u6743\nqemu-system-i386 \\\n  -iscsi initiator-name=iqn.2001-04.com.example:my-initiator \\\n  -cdrom iscsi://192.0.2.1/iqn.2001-04.com.example/2 \\\n  -drive file=iscsi://192.0.2.1/iqn.2001-04.com.example/1\n# \u5728 URL \u4E0A\u6307\u5B9A CHAP \u8D26\u53F7\u5BC6\u7801\nqemu-system-i386 \\\n  -drive file=iscsi://user%password@192.0.2.1/iqn.2001-04.com.example/1\n# \u5728\u73AF\u5883\u53D8\u91CF\u4E2D\u6307\u5B9A CHAP \u8D26\u53F7\u5BC6\u7801\nLIBISCSI_CHAP_USERNAME="user" LIBISCSI_CHAP_PASSWORD="password" \\\n  qemu-system-i386 -drive file=iscsi://192.0.2.1/iqn.2001-04.com.example/1\n\n# NBD\n# nbd:<server-ip>:<port>[:exportname=<export>]\n# TCP\nqemu-system-i386 --drive file=nbd:192.0.2.1:30000\n# Unix Domain Sockets\nqemu-system-i386 --drive file=nbd:unix:/tmp/nbd-socket\n\n# Sheepdog\n# a distributed storage system for QEMU.\n# supports using either local sheepdog devices or remote networked devices.\n# sheepdog[+tcp|+unix]://[host:port]/vdiname[?socket=path][#snapid|#tag]\n# https://sheepdog.github.io/sheepdog/\nqemu-system-i386 --drive file=sheepdog://192.0.2.1:30000/MyVirtualMachine\n\n# GlusterFS\n# a user space distributed file system.\n# supports the use of GlusterFS volumes for hosting VM disk images using TCP, Unix Domain Sockets and RDMA transport protocols.\n# URI:\n# gluster[+type]://[host[:port]]/volume/path[?socket=...][,debug=N][,logfile=...]\n# JSON:\n# \'json:{"driver":"qcow2","file":{"driver":"gluster","volume":"testvol","path":"a.img","debug":N,"logfile":"...",\n#                                  "server":[{"type":"tcp","host":"...","port":"..."},\n#                                            {"type":"unix","socket":"..."}]}}\'\n# URI\nqemu-system-x86_64 --drive file=gluster://192.0.2.1/testvol/a.img,file.debug=9,file.logfile=/var/log/qemu-gluster.log\n# JSON\nqemu-system-x86_64 \'json:{"driver":"qcow2",\n                          "file":{"driver":"gluster",\n                                   "volume":"testvol","path":"a.img",\n                                   "debug":9,"logfile":"/var/log/qemu-gluster.log",\n                                   "server":[{"type":"tcp","host":"1.2.3.4","port":24007},\n                                             {"type":"unix","socket":"/var/run/glusterd.socket"}]}}\'\nqemu-system-x86_64 -drive driver=qcow2,file.driver=gluster,file.volume=testvol,file.path=/path/a.img, file.debug=9,file.logfile=/var/log/qemu-gluster.log, file.server.0.type=tcp,file.server.0.host=1.2.3.4,file.server.0.port=24007, file.server.1.type=unix,file.server.1.socket=/var/run/glusterd.socket\n# HTTP/HTTPS/FTP/FTPS\n# QEMU supports read-only access to files accessed over http(s) and ftp(s).\n# <protocol>://[<username>[:<password>]@]<host>/<path>\n'})}),"\n",(0,l.jsx)(e.h2,{id:"\u955C\u50CF",children:"\u955C\u50CF"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["raw\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u539F\u59CB\u683C\u5F0F"}),"\n",(0,l.jsx)(e.li,{children:"\u7B80\u5355\u6613\u7528"}),"\n",(0,l.jsxs)(e.li,{children:["\u5982\u679C\u6587\u4EF6\u7CFB\u7EDF\u652F\u6301 ",(0,l.jsx)(e.code,{children:"holes"}),"(ext2,ext3,ntfs), \u90A3\u4F1A\u5360\u4E0D\u4E86\u591A\u5C11\u7A7A\u95F4"]}),"\n",(0,l.jsxs)(e.li,{children:["\u9009\u9879\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["preallocation - \u9884\u5206\u914D\u6A21\u5F0F\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"off, falloc, full"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["qcow2\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"QEMU \u955C\u50CF\u683C\u5F0F"}),"\n",(0,l.jsxs)(e.li,{children:["\u529F\u80FD\u6700\u591A\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"COW - \u53EA\u9488\u5BF9 btrfs \u6709\u7528"}),"\n",(0,l.jsx)(e.li,{children:"\u538B\u7F29"}),"\n",(0,l.jsx)(e.li,{children:"\u52A0\u5BC6 - aes,luks"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["qed\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u65E7\u7684 QEMU \u955C\u50CF\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["qcow\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u65E7\u7684 QEMU \u955C\u50CF\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["luks\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"LUKS v1 \u52A0\u5BC6\u683C\u5F0F"}),"\n",(0,l.jsx)(e.li,{children:"\u4E0E Linux dm-crypt/cryptsetup \u517C\u5BB9"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["vdi\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"vbox 1.1 \u517C\u5BB9\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["vmdk\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"vm 3,4 \u517C\u5BB9\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["vpc\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Virtual PC \u517C\u5BB9\u683C\u5F0F (VHD)"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["VHDX\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Hyper-V \u517C\u5BB9\u7684\u955C\u50CF\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"\u53EA\u8BFB\u683C\u5F0F",children:"\u53EA\u8BFB\u683C\u5F0F"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["bochs\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"growing \u7684 Bochs \u955C\u50CF"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["cloop\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Linux Compressed Loop \u955C\u50CF"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["dmg\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Apple \u7684\u78C1\u76D8\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["parallels\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Parallels \u78C1\u76D8\u955C\u50CF\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"\u78C1\u76D8\u955C\u50CF",children:"\u78C1\u76D8\u955C\u50CF"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"qemu-img"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u521B\u5EFA\u78C1\u76D8\u955C\u50CF\nqemu-img create demo.img 100m\n# \u67E5\u770B\u57FA\u672C\u4FE1\u606F\nqemu-img info demo.img\n# \u67E5\u770B\u6620\u5C04\u4FE1\u606F\nqemu-img map demo.img\n# \u63A8\u8350\u4F7F\u7528 qcow2 \u683C\u5F0F\nqemu-img create -f qcow2 sys.qcow2 2g\n"})}),"\n",(0,l.jsx)(e.h3,{id:"\u7F51\u7EDC\u5757\u8BBE\u5907",children:"\u7F51\u7EDC\u5757\u8BBE\u5907"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"qemu-nbd"}),"\n",(0,l.jsxs)(e.li,{children:["\u5728 linux \u4E0B\u4E00\u822C\u4F1A\u6302\u8F7D\u4E3A ",(0,l.jsx)(e.code,{children:"/dev/ndb*"})]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/sheepdog/sheepdog/",children:"https://github.com/sheepdog/sheepdog/"})}),"\n",(0,l.jsx)(e.li,{children:"iSCSI LUN"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u4F7F\u7528 \u8FDC\u7A0B NBD \u534F\u8BAE\nqemu-system-i386 linux.img -hdb nbd://my_nbd_server.mydomain.org:1024/\n# \u4F7F\u7528 unix socket\nqemu-system-i386 linux.img -hdb nbd+unix://?socket=/tmp/my_socket\n\n# \u66B4\u9732\u4E3A unix socket\nqemu-nbd --socket=/tmp/my_socket my_disk.qcow2\n# \u5141\u8BB8\u591A\u4E2A\u5BA2\u6237\u7AEF\u5171\u4EAB\nqemu-nbd --socket=/tmp/my_socket --share=2 my_disk.qcow2\n# \u540C\u65F6\u4F7F\u7528\nqemu-system-i386 linux1.img -hdb nbd+unix://?socket=/tmp/my_socket\nqemu-system-i386 linux2.img -hdb nbd+unix://?socket=/tmp/my_socket\n# \u5982\u679C\u670D\u52A1\u7AEF\u6307\u5B9A\u4E86\u540D\u5B57, \u5728\u5BA2\u6237\u7AEF\u4F7F\u7528\u65F6\u4E5F\u9700\u8981\u6307\u5B9A\u540D\u5B57\nqemu-system-i386 -cdrom nbd://localhost/debian-500-ppc-netinst\nqemu-system-i386 -cdrom nbd://localhost/openSUSE-11.1-ppc-netinst\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u7F51\u7EDC",children:"\u7F51\u7EDC"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.linux-kvm.org/page/Networking",children:"https://www.linux-kvm.org/page/Networking"})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u652F\u6301\u7684 NIC\nqemu-system-x86_64 -net nic,model=help\n# \u6700\u7B80\u5355\u7684\u7F51\u7EDC\n# 10.0.2.0/24 \u9ED8\u8BA4\u8D77\u59CB\u5730\u5740 x.x.x.15-13, \u4E3B\u673A\u5730\u5740 x.x.x.2 dns x.x.x.3\n# \u4E3B\u673A\u65E0\u6CD5\u8BBF\u95EE\u865A\u62DF\u673A\nqemu-system-x86_64 -hda vdisk.img -cdrom alpine-standard-3.6.2-x86_64.iso -net nic -net user\n\n# \u4F7F\u7528 tap \u53EF\u4EE5\u521B\u5EFA\u865A\u62DF\u7F51\u7EDC\u8BBE\u5907\u4F7F\u4E3B\u673A\u4E92\u901A\nqemu-system-x86_64 -m 512M -net nic -net tap,script=no,downscript=no\n# \u4F7F\u7528\u6307\u5B9A\u7684\u540D\u5B57\nqemu-system-x86_64 -m 512M -net nic -net tap,ifname=tap0,script=no,downscript=no\n# -net nic,model=virtio -net tap,ifname=tap0,script=no,downscript=no\n# \u786E\u4FDD\u6743\u9650\n# ip tuntap add dev tap0 mode tap group netdev\n# \u6216\u8005\u4F7F\u7528 tunctl \u63A7\u5236\n# tunctl -p -t tap0 -u $USER\n# tunctl -t tap0 -g netdev\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u5916\u8BBE",children:"\u5916\u8BBE"}),"\n",(0,l.jsx)(e.h3,{id:"usb",children:"USB"}),"\n",(0,l.jsx)(e.h3,{id:"pci",children:"PCI"}),"\n",(0,l.jsx)(e.h2,{id:"\u7528\u6237\u7A7A\u95F4\u865A\u62DF",children:"\u7528\u6237\u7A7A\u95F4\u865A\u62DF"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"qemu-*"})}),"\n",(0,l.jsx)(e.li,{children:"\u53EA\u652F\u6301 Linix, BSD"}),"\n",(0,l.jsxs)(e.li,{children:["\u7279\u6027\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7CFB\u7EDF\u8C03\u7528\u8F6C\u6362"}),"\n",(0,l.jsx)(e.li,{children:"POSIX \u4FE1\u53F7\u5904\u7406"}),"\n",(0,l.jsx)(e.li,{children:"\u7EBF\u7A0B"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# -L / \u544A\u8BC9\u52A8\u6001\u8FDE\u63A5\u5668\u4ECE / \u5F00\u59CB\u641C\u7D22\nqemu-i386 -L / /bin/ls\n# \u4E5F\u53EF\u4EE5\u518D qemu \u4E2D\u5141\u8BB8 qemu\nqemu-i386 -L / qemu-i386 -L / /bin/ls\n\n# \u5728\u975E x86 CPU \u4E0A\u8FD0\u884C\n# \u81F3\u5C11\u9700\u8981 x86 \u7684 glibc(qemu-runtime-i386-*)\n# \u786E\u4FDD\u672A\u8BBE\u7F6E LD_LIBRARY_PATH\nunset LD_LIBRARY_PATH\n# \u6267\u884C\u9884\u7F16\u8BD1\u7684\u53EF\u6267\u884C\u6587\u4EF6\nqemu-i386 tests/i386/ls\n\n# \u4F7F\u7528 Wine\n# \u786E\u4FDD\u5B89\u88C5 wine(qemu-*-i386-wine)\n# \u81F3\u5C11\u5148\u786E\u4FDD\u6709 i386\nqemu-i386 /usr/local/qemu-i386/bin/ls-i386\n# \u914D\u7F6E\n# \u914D\u7F6E\u4F4D\u4E8E ~/.wine, \u4E4B\u524D\u7684\u914D\u7F6E\u4F1A\u88AB\u5B58\u4E8E ~/.wine.org\n/usr/local/qemu-i386/bin/wine-conf.sh\nqemu-i386 /usr/local/qemu-i386/wine/bin/wine \\\n  /usr/local/qemu-i386/wine/c/Program\\ Files/putty.exe\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u663E\u793A",children:"\u663E\u793A"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.spice-space.org",children:"https://www.spice-space.org"})}),"\n",(0,l.jsx)(e.li,{children:"vnc"}),"\n",(0,l.jsx)(e.li,{children:"SPICE\uFF08Simple Protocol for Independent Computing Environments\uFF09"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"brew install tiger-vnc\n\n# 5900\nqemu-system-x86_64 -vga std -nographic -vnc :0\nvncviewer :0\n\n# 5901\nqemu-system-x86_64 sys.vhd-display vnc=:1\nvncviewer :1\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["vga\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"std - \u6807\u51C6 VGA"}),"\n",(0,l.jsx)(e.li,{children:"cirrus"}),"\n",(0,l.jsx)(e.li,{children:"vmware"}),"\n",(0,l.jsxs)(e.li,{children:["qxl - QXL \u9A71\u52A8\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E3ASPICE\u534F\u8BAE\u4F18\u5316\u7684\u4E00\u79CD\u865A\u62DFVGA\u8BBE\u5907"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"virtio"}),"\n",(0,l.jsx)(e.li,{children:"none"}),"\n"]}),"\n"]}),"\n"]})]})}function x(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return c}});var s=i(75271);let l={},r=s.createContext(l);function c(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:c(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);