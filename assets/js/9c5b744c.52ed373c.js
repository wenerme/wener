"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["83054"],{13256:function(n,e,s){s.r(e),s.d(e,{metadata:()=>t,contentTitle:()=>d,default:()=>j,assets:()=>c,toc:()=>h,frontMatter:()=>i});var t=JSON.parse('{"id":"os/linux/init/systemd","title":"Systemd","description":"- systemd","source":"@site/../notes/os/linux/init/systemd.md","sourceDirName":"os/linux/init","slug":"/os/linux/init/systemd","permalink":"/notes/os/linux/init/systemd","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/init/systemd.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1701580433000,"frontMatter":{"title":"Systemd"},"sidebar":"docs","previous":{"title":"Supervisor","permalink":"/notes/os/linux/init/supervisor"},"next":{"title":"libc","permalink":"/notes/os/linux/libc/"}}'),r=s("52676"),l=s("79938");let i={title:"Systemd"},d="Systemd",c={},h=[{value:"Unit \u6587\u4EF6",id:"unit-\u6587\u4EF6",level:2},{value:"Target",id:"target",level:2},{value:"Target vs init/RunLevel",id:"target-vs-initrunlevel",level:2},{value:"Why archlinux migrate to systemd",id:"why-archlinux-migrate-to-systemd",level:2},{value:"\u67E5\u770B\u5F00\u542F\u7684\u670D\u52A1",id:"\u67E5\u770B\u5F00\u542F\u7684\u670D\u52A1",level:2},{value:"crontab",id:"crontab",level:2}];function x(n){let e={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"systemd",children:"Systemd"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.freedesktop.org/wiki/Software/systemd",children:"systemd"})}),"\n",(0,r.jsxs)(e.li,{children:["wikipedia ",(0,r.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Systemd",children:"systemd"})]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.freedesktop.org/software/systemd/man/systemd.unit.html",children:"systemd.unit"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.freedesktop.org/software/systemd/man/systemctl.html",children:"systemctl manpage"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units",children:"How To Use Systemctl to Manage Systemd Services and Units"})}),"\n",(0,r.jsxs)(e.li,{children:["\u914D\u7F6E\u76EE\u5F55\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"/etc/systemd/system/docker.service.d/*.conf"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"/etc/systemd/system/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"/lib/systemd/system/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/Systemd-networkd",children:"https://wiki.archlinux.org/index.php/Systemd-networkd"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html",children:"Systemd \u5165\u95E8\u6559\u7A0B\uFF1A\u547D\u4EE4\u7BC7"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u914D\u7F6E\nsystemctl show docker\n# \u4FEE\u6539 Service \u9700\u8981\u91CD\u8F7D\nsystemctl daemon-reload\n# \u67E5\u770B\u5B9A\u4E49\u7684\u914D\u7F6E\nsystemctl show --property=Environment docker\n# \u91CD\u542F\u670D\u52A1\nsystemctl restart docker\n\nsystemctl list-units --all\nsystemctl list-units --type=service\nsystemctl list-unit-files\n# \u67E5\u770B service \u6587\u4EF6\nsystemctl cat docker.service\n# \u67E5\u770B\u4F9D\u8D56\nsystemctl list-dependencies sshd.service\n# mask \u540E\u7684\u670D\u52A1\u4E0D\u80FD\u88AB\u542F\u52A8\nsystemctl mask nginx.service\nsystemctl unmask nginx.service\n# \u7F16\u8F91 service \u6587\u4EF6\nsystemctl edit nginx.service\n# \u7F16\u8F91\u5B8C\u6574\u7684\u6587\u4EF6,\u800C\u4E0D\u662F\u4E00\u4E2A\u7247\u6BB5,\u4F1A\u751F\u6210\u90E8\u5206\u5185\u5BB9\nsystemctl edit --full nginx.service\n\n# \u7CFB\u7EDF\u72B6\u6001\nsystemctl status\n# \u670D\u52A1\u72B6\u6001\nsystemctl status prometheus-node-exporter.service\n# \u8FDC\u7A0B\u670D\u52A1\u72B6\u6001\nsystemctl -H root@127.0.0.1 status httpd.service\n# is-active, is-failed, is-enabled\nsystemctl is-active prometheus-node-exporter.service\n# \u7BA1\u7406\n# start stop restart kill reload show\nsystemctl start apache.service\n# \u67E5\u770B\u5C5E\u6027\nsystemctl show -P CPUShare apache.service\n# \u8BBE\u7F6E\u5C5E\u6027\nsystemctl set-property httpd.service CPUShares=500\n#\nsystemctl daemon-reload\n\n# \u67E5\u770B\u4F9D\u8D56\n# --all - \u6240\u6709\nsystemctl list-dependencies nginx.service\n\n# enabled disabled static masked\n# static - \u65E0 [Install]\uFF0C \u53EA\u80FD\u88AB\u4F9D\u8D56\n# masked - \u88AB\u7981\u6B62\nsystemctl list-unit-files --type=service\n\n# \u67E5\u770B\u5185\u5BB9\nsystemctl cat atd.service\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"command"}),(0,r.jsx)(e.th,{children:"mean"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"\u67E5\u8BE2"}),(0,r.jsx)(e.td,{children:"-"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl list-dependencies"}),(0,r.jsx)(e.td,{children:"unit \u4F9D\u8D56"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl list-sockets"}),(0,r.jsx)(e.td,{children:"sockets \u72B6\u6001"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl list-jobs"}),(0,r.jsx)(e.td,{children:"\u6D3B\u8DC3 jobs"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl list-unit-files"}),(0,r.jsx)(e.td,{children:"unit \u6587\u4EF6\u548C\u72B6\u6001"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl list-units"}),(0,r.jsx)(e.td,{children:"units loaded/active"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl get-default"}),(0,r.jsx)(e.td,{children:"default target (like run level)"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"\u670D\u52A1"}),(0,r.jsx)(e.td,{children:"-"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl stop ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u505C\u6B62"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl start ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u542F\u52A8"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl restart ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u91CD\u542F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl reload ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u914D\u7F6E\u91CD\u8F7D"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl daemon-reload"}),(0,r.jsx)(e.td,{children:"\u91CD\u8F7D unit \u6587\u4EF6"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl status ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u670D\u52A1\u72B6\u6001"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl --failed"}),(0,r.jsx)(e.td,{children:"\u5931\u8D25\u7684\u670D\u52A1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl reset-failed"}),(0,r.jsx)(e.td,{children:"\u91CD\u7F6E\u5931\u8D25\u7684\u72B6\u6001"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl enable ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u670D\u52A1\u81EA\u542F\u52A8"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl disable ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u5173\u95ED\u81EA\u542F\u52A8"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl show ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u670D\u52A1\u4FE1\u606F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl edit ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u7F16\u8F91 unit"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl edit --full ",(0,r.jsx)(e.em,{children:"service"})]}),(0,r.jsx)(e.td,{children:"\u7F16\u8F91\u670D\u52A1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsxs)(e.td,{children:["systemctl -H ",(0,r.jsx)(e.em,{children:"host"})," status network"]}),(0,r.jsx)(e.td,{children:"\u8FDC\u7A0B\u6267\u884C"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"\u7CFB\u7EDF\u72B6\u6001"}),(0,r.jsx)(e.td,{children:"-"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl reboot"}),(0,r.jsx)(e.td,{children:"\u91CD\u542F / reboot.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl poweroff"}),(0,r.jsx)(e.td,{children:"\u5173\u673A / poweroff.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl emergency"}),(0,r.jsx)(e.td,{children:"emergency.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl default"}),(0,r.jsx)(e.td,{children:"\u6062\u590D\u5230\u9ED8\u8BA4 multi-user.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"\u65E5\u5FD7"}),(0,r.jsx)(e.td,{children:"-"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journalctl"}),(0,r.jsx)(e.td,{children:"\u6240\u6709\u65E5\u5FD7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journalctl -u network.service"}),(0,r.jsx)(e.td,{children:"\u7F51\u7EDC\u670D\u52A1\u65E5\u5FD7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journalctl -f"}),(0,r.jsx)(e.td,{children:"\u8DDF\u968F\u663E\u793A"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journalctl -k"}),(0,r.jsx)(e.td,{children:"\u5185\u6838\u65E5\u5FD7"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"util"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemctl"}),(0,r.jsx)(e.td,{children:"\u4E3B\u8981\u547D\u4EE4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journalctl"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"notify"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemd-analyze"}),(0,r.jsx)(e.td,{children:"\u67E5\u770B\u542F\u52A8\u8017\u65F6"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"cgls"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"cgtop"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"loginctl"}),(0,r.jsx)(e.td,{children:"\u5F53\u524D\u767B\u9646\u7528\u6237"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"nspwan"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"hostnamectl"}),(0,r.jsx)(e.td,{children:"\u67E5\u770B\u548C\u7BA1\u7406\u4E3B\u673A\u4FE1\u606F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"localectl"}),(0,r.jsx)(e.td,{children:"\u672C\u5730\u5316\u914D\u7F6E"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"timedatectl"}),(0,r.jsx)(e.td,{children:"\u65F6\u533A"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"daemon"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"systemd"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"journald"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"networkd"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"logind"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"user session"}),(0,r.jsx)(e.td,{})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"unit"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Service"}),(0,r.jsx)(e.td,{children:"\u7CFB\u7EDF\u670D\u52A1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Target"}),(0,r.jsx)(e.td,{children:"\u591A\u4E2A Unit \u6784\u6210\u7684\u4E00\u4E2A\u7EC4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Device"}),(0,r.jsx)(e.td,{children:"\u786C\u4EF6\u8BBE\u5907"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Mount"}),(0,r.jsx)(e.td,{children:"\u6587\u4EF6\u7CFB\u7EDF\u7684\u6302\u8F7D\u70B9"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Automount"}),(0,r.jsx)(e.td,{children:"\u81EA\u52A8\u6302\u8F7D\u70B9"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Path"}),(0,r.jsx)(e.td,{children:"\u6587\u4EF6\u6216\u8DEF\u5F84"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Scope"}),(0,r.jsx)(e.td,{children:"\u4E0D\u662F\u7531 Systemd \u542F\u52A8\u7684\u5916\u90E8\u8FDB\u7A0B"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Slice"}),(0,r.jsx)(e.td,{children:"\u8FDB\u7A0B\u7EC4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Snapshot"}),(0,r.jsx)(e.td,{children:"Systemd \u5FEB\u7167\uFF0C\u53EF\u4EE5\u5207\u56DE\u67D0\u4E2A\u5FEB\u7167"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Socket"}),(0,r.jsx)(e.td,{children:"\u8FDB\u7A0B\u95F4\u901A\u4FE1\u7684 socket"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Swap"}),(0,r.jsx)(e.td,{children:"swap \u6587\u4EF6"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Timer"}),(0,r.jsx)(e.td,{children:"\u5B9A\u65F6\u5668"})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"unit-\u6587\u4EF6",children:"Unit \u6587\u4EF6"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ini",children:"[Unit]\nDescription=\u63CF\u8FF0\nDocumentation=\u6587\u6863\u5730\u5740\n\nRequires=\u5F3A\u4F9D\u8D56 Unit\nWants=\u5F31\u4F9D\u8D56 Unit\nBindsTo=\u6DFB\u52A0\u4F9D\u8D56\u5230 Unit - \u6307\u5B9A Unit \u9000\u51FA\u5219\u5F53\u524D Unit \u4F1A\u9000\u51FA\nBefore=\nAfter=\nConflicts=\u4E0D\u80FD\u540C\u65F6\u8FD0\u884C Unit\nCondition=\nAssert=\n\n[Install]\nWantedBy=\u6307\u5B9A Target \u4F1A link \u5230 /etc/systemd/system/<Target>.wants\nRequiredBy=\u6307\u5B9A Target \u4F1A link \u5230 /etc/systemd/system/<Target>.required\nAlias=\nAlso=\u540C\u65F6\u542F\u52A8\u5176\u4ED6 Unit\n\n[Service]\n# simple - \u6267\u884C ExecStart\n# forking\n# oneshot - \u4E00\u6B21\u6027\uFF0C\u6267\u884C\u5B8C\u6210\u540E\u7EE7\u7EED\n# dbus - \u901A\u8FC7 DBus \u542F\u52A8\n# notify - \u6267\u884C\u5B8C\u6BD5\u901A\u77E5 systemd\n# idle - \u6709\u5176\u4ED6\u4EFB\u52A1\u5F53\u524D\u4EFB\u52A1\u624D\u6267\u884C\nType=simple\n\nExecStart=\nExecStartPre=\nExecStartPost=\n\nExecReload=\n\nExecStop=\nExecStopPost=\n\nRestartSec=\n# \u91CD\u542F\u60C5\u51B5 - always, on-success, on-failure, on-abnormal, on-abort, on-watchdog\nRestart=\n\nTimeoutSec=\nEnvironment=\n"})}),"\n",(0,r.jsx)(e.h2,{id:"target",children:"Target"}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsx)(e.p,{children:"Unit \u7EC4, \u7C7B\u4F3C\u4E8E\u5176\u4ED6 init \u7684 runlevel \u6982\u5FF5"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"runlevel"}),(0,r.jsx)(e.th,{children:"target name"}),(0,r.jsx)(e.th,{children:"link"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 0"}),(0,r.jsx)(e.td,{children:"runlevel0.target"}),(0,r.jsx)(e.td,{children:"poweroff.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 1"}),(0,r.jsx)(e.td,{children:"runlevel1.target"}),(0,r.jsx)(e.td,{children:"rescue.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 2"}),(0,r.jsx)(e.td,{children:"runlevel2.target"}),(0,r.jsx)(e.td,{children:"multi-user.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 3"}),(0,r.jsx)(e.td,{children:"runlevel3.target"}),(0,r.jsx)(e.td,{children:"multi-user.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 4"}),(0,r.jsx)(e.td,{children:"runlevel4.target"}),(0,r.jsx)(e.td,{children:"multi-user.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 5"}),(0,r.jsx)(e.td,{children:"runlevel5.target"}),(0,r.jsx)(e.td,{children:"graphical.target"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Runlevel 6"}),(0,r.jsx)(e.td,{children:"runlevel6.target"}),(0,r.jsx)(e.td,{children:"reboot.target"})]})]})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u5F53\u524D\u7CFB\u7EDF\u7684\u6240\u6709 Target\nsystemctl list-unit-files --type=target\n\n# \u67E5\u770B\u4E00\u4E2A Target \u5305\u542B\u7684\u6240\u6709 Unit\nsystemctl list-dependencies multi-user.target\n\n# \u67E5\u770B\u542F\u52A8\u65F6\u7684\u9ED8\u8BA4 Target\nsystemctl get-default\n\n# \u8BBE\u7F6E\u542F\u52A8\u65F6\u7684\u9ED8\u8BA4 Target\nsudo systemctl set-default multi-user.target\n\n# \u5207\u6362 Target \u65F6\uFF0C\u9ED8\u8BA4\u4E0D\u5173\u95ED\u524D\u4E00\u4E2A Target \u542F\u52A8\u7684\u8FDB\u7A0B\uFF0C\n# systemctl isolate \u547D\u4EE4\u6539\u53D8\u8FD9\u79CD\u884C\u4E3A\uFF0C\n# \u5173\u95ED\u524D\u4E00\u4E2A Target \u91CC\u9762\u6240\u6709\u4E0D\u5C5E\u4E8E\u540E\u4E00\u4E2A Target \u7684\u8FDB\u7A0B\nsudo systemctl isolate multi-user.target\n"})}),"\n",(0,r.jsx)(e.h2,{id:"target-vs-initrunlevel",children:"Target vs init/RunLevel"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["init/RunLevel\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 RunLevel /etc/inittab"}),"\n",(0,r.jsx)(e.li,{children:"\u811A\u672C\u4F4D\u4E8E /etc/init.d - \u7B49\u540C\u4E8E Unit"}),"\n",(0,r.jsx)(e.li,{children:"\u542F\u52A8\u7684\u811A\u672C link \u5230 /etc/rc.d \u6216 /etc/runlevels/"}),"\n",(0,r.jsxs)(e.li,{children:["init \u914D\u7F6E\u4F4D\u4E8E ",(0,r.jsx)(e.code,{children:"/etc/sysconfig"})," \u6216 ",(0,r.jsx)(e.code,{children:"/etc/rc.conf"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Target\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u9ED8\u8BA4 /etc/systemd/system/default.target\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"link \u5230 multi-user.target \u6216 graphical.target"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"Unit \u4F4D\u4E8E /lib/systemd/system"}),"\n",(0,r.jsx)(e.li,{children:"\u542F\u52A8\u540E\u4F4D\u4E8E /etc/systemd/system"}),"\n",(0,r.jsx)(e.li,{children:"systemd \u914D\u7F6E /lib/systemd, /etc/systemd"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h1,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/docker/docker/blob/master/contrib/init/systemd/",children:"docker systemd"})}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"/etc/systemd/system/prometheus-node-exporter.service"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ini",children:"[Unit]\nDescription=Prometheus Node Exporter\nAfter=network-online.target\n\n[Service]\n# User=prometheus\nRestart=on-failure\n\nExecStart=/opt/prometheus/bin/node_exporter\n"})}),"\n",(0,r.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h2,{id:"why-archlinux-migrate-to-systemd",children:"Why archlinux migrate to systemd"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://bbs.archlinux.org/viewtopic.php?pid=1149530#p1149530",children:"Archlinux is moving to systemd"})," - 2012-08"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"\u67E5\u770B\u5F00\u542F\u7684\u670D\u52A1",children:"\u67E5\u770B\u5F00\u542F\u7684\u670D\u52A1"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"systemctl list-unit-files --state=enabled\nsystemctl list-unit-files --state=enabled --type=service\nsystemctl list-unit-files | grep enabled\n"})}),"\n",(0,r.jsx)(e.h2,{id:"crontab",children:"crontab"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"/var/spool/cron/root - \u5168\u5C40\uFF0C\u65E0\u7528\u6237"}),"\n",(0,r.jsx)(e.li,{children:"/etc/crontab - root\uFF0C\u9700\u8981\u6307\u5B9A\u7528\u6237"}),"\n",(0,r.jsx)(e.li,{children:"/etc/cron.d/ - \u9700\u8981\u6307\u5B9A\u7528\u6237"}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(x,{...n})}):x(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return i}});var t=s(75271);let r={},l=t.createContext(r);function i(n){let e=t.useContext(l);return t.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),t.createElement(l.Provider,{value:e},n.children)}}}]);