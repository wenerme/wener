"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["94070"],{27153:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>r,default:()=>j,assets:()=>c,toc:()=>x,frontMatter:()=>l});var i=JSON.parse('{"id":"os/linux/sys/limits","title":"limits","description":"- linux-pam \u63D0\u4F9B","source":"@site/../notes/os/linux/sys/limits.md","sourceDirName":"os/linux/sys","slug":"/os/linux/sys/limits","permalink":"/notes/os/linux/sys/limits","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/sys/limits.md","tags":[{"inline":true,"label":"Limits","permalink":"/notes/tags/limits"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1724402050000,"frontMatter":{"title":"limits","tags":["Limits"]},"sidebar":"docs","previous":{"title":"Linux Kernel","permalink":"/notes/os/linux/sys/kernel"},"next":{"title":"LSM","permalink":"/notes/os/linux/sys/lsm"}}'),d=s("52676"),t=s("79938");let l={title:"limits",tags:["Limits"]},r="LIMIT",c={},x=[{value:"limits.conf",id:"limitsconf",level:2},{value:"\u5EFA\u8BAE",id:"\u5EFA\u8BAE",level:2},{value:"\u7EDF\u8BA1",id:"\u7EDF\u8BA1",level:2},{value:"SSH limits \u4E0D\u751F\u6548",id:"ssh-limits-\u4E0D\u751F\u6548",level:2},{value:"open files",id:"open-files",level:2},{value:"debug",id:"debug",level:2}];function h(n){let e={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.header,{children:(0,d.jsx)(e.h1,{id:"limit",children:"LIMIT"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.strong,{children:"linux-pam"})," \u63D0\u4F9B\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"/etc/pam.d/su"}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.code,{children:"session required pam_limits.so"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.li,{children:"/etc/security/limits.conf - \u5168\u5C40\u914D\u7F6E"}),"\n",(0,d.jsx)(e.li,{children:"/etc/security/limits.d/ - \u901A\u5E38\u7528\u4E8E\u914D\u7F6E\u5355\u4E2A\u8FDB\u7A0B"}),"\n",(0,d.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://www.man7.org/linux/man-pages/man5/limits.conf.5.html",children:"limits.conf.5"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.admonition,{type:"tip",children:(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"limits \u9488\u5BF9\u6BCF\u4E2A\u8FDB\u7A0B\u751F\u6548 - \u8FDB\u7A0B\u53EF\u4FEE\u6539 soft \u503C\uFF0C\u4F46\u5C0F\u4E8E hard \u503C"}),"\n",(0,d.jsx)(e.li,{children:"open files \u9ED8\u8BA4 1024/4096 - \u5BF9\u4E8E\u670D\u52A1\u7AEF\u5E94\u7528\u6765\u8BF4\u592A\u5C0F\u4E86"}),"\n"]})}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u5176\u4ED6\u8FDB\u7A0B\u7684 limits\ncat /proc/1/limits\n\n# \u4FEE\u6539\u5DF2\u8FD0\u884C\u8FDB\u7A0B\n# util-linux-2.21\nprlimit --pid $(pidof prometheus) --nofile=65535:65535\n\ncat /proc/sys/fs/file-max # \u6700\u5927 fd 19778411\ncat /proc/sys/fs/nr_open  # 1048576 - 1024*1024 - nofile hard limit \u6700\u5927\u503C\ncat /proc/sys/fs/file-nr  # \u5DF2\u5206\u914D 0 \u6700\u5927\n\n# 19778411\n# 26367207\nsysctl fs.file-max\n# sysctl -w fs.file-max=19778411\n\nulimit -n  # soft limit\nulimit -Hn # hard limit\n\nulimit -n 4096 # \u4E34\u65F6\u4FEE\u6539\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"conf/item"}),(0,d.jsx)(e.th,{children:"type"}),(0,d.jsx)(e.th,{children:"unit"}),(0,d.jsx)(e.th,{children:"flag"}),(0,d.jsx)(e.th,{children:"value"}),(0,d.jsx)(e.th,{children:"flavor"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"real-time non-blocking time"}),(0,d.jsx)(e.td,{children:"microseconds"}),(0,d.jsx)(e.td,{children:"-R"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"core"}),(0,d.jsx)(e.td,{children:"core file size"}),(0,d.jsx)(e.td,{children:"blocks"}),(0,d.jsx)(e.td,{children:"-c"}),(0,d.jsx)(e.td,{children:"0"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"data"}),(0,d.jsx)(e.td,{children:"data seg size"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{children:"-d"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"nice"}),(0,d.jsx)(e.td,{children:"scheduling priority"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-e"}),(0,d.jsx)(e.td,{children:"0"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"fsize"}),(0,d.jsx)(e.td,{children:"file size"}),(0,d.jsx)(e.td,{children:"blocks"}),(0,d.jsx)(e.td,{children:"-f"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"sigpending"}),(0,d.jsx)(e.td,{children:"pending signals"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-i"}),(0,d.jsx)(e.td,{children:"63510"}),(0,d.jsx)(e.td,{children:"linux"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"memlock"}),(0,d.jsx)(e.td,{children:"max locked memory"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{children:"-l"}),(0,d.jsx)(e.td,{children:"64"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"max memory size"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{children:"-m"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"nofile"}),(0,d.jsx)(e.td,{children:"open files"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-n"}),(0,d.jsx)(e.td,{children:"1024"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"pipe size"}),(0,d.jsx)(e.td,{children:"512 bytes"}),(0,d.jsx)(e.td,{children:"-p"}),(0,d.jsx)(e.td,{children:"8"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"msgqueue"}),(0,d.jsx)(e.td,{children:"POSIX message queues"}),(0,d.jsx)(e.td,{children:"bytes"}),(0,d.jsx)(e.td,{children:"-q"}),(0,d.jsx)(e.td,{children:"819200"}),(0,d.jsx)(e.td,{children:"linux"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"rtprio"}),(0,d.jsx)(e.td,{children:"real-time priority"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-r"}),(0,d.jsx)(e.td,{children:"0"}),(0,d.jsx)(e.td,{children:"linux"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"stack"}),(0,d.jsx)(e.td,{children:"stack size"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{children:"-s"}),(0,d.jsx)(e.td,{children:"8192"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"cpu time"}),(0,d.jsx)(e.td,{children:"seconds"}),(0,d.jsx)(e.td,{children:"-t"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"nproc"}),(0,d.jsx)(e.td,{children:"max user processes"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-u"}),(0,d.jsx)(e.td,{children:"63510"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"virtual memory"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{children:"-v"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"locks"}),(0,d.jsx)(e.td,{children:"file locks"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"-x"}),(0,d.jsx)(e.td,{children:"unlimited"}),(0,d.jsx)(e.td,{children:"linux"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"maxlogins"}),(0,d.jsx)(e.td,{children:"logins for user"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"maxsyslogins"}),(0,d.jsx)(e.td,{children:"all logins on system"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"priority"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"rss"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{children:"linux < 2.4.30"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"as"}),(0,d.jsx)(e.td,{children:"address space limit"}),(0,d.jsx)(e.td,{children:"kbytes"}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{}),(0,d.jsx)(e.td,{})]})]})]}),"\n",(0,d.jsx)(e.p,{children:(0,d.jsx)(e.strong,{children:"/proc/1/limits"})}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"Limit                     Soft Limit           Hard Limit           Units\nMax cpu time              unlimited            unlimited            seconds\nMax file size             unlimited            unlimited            bytes\nMax data size             unlimited            unlimited            bytes\nMax stack size            8388608              unlimited            bytes\nMax core file size        0                    unlimited            bytes\nMax resident set          unlimited            unlimited            bytes\nMax processes             30464                30464                processes\nMax open files            1024                 4096                 files\nMax locked memory         65536                65536                bytes\nMax address space         unlimited            unlimited            bytes\nMax file locks            unlimited            unlimited            locks\nMax pending signals       30464                30464                signals\nMax msgqueue size         819200               819200               bytes\nMax nice priority         0                    0\nMax realtime priority     0                    0\nMax realtime timeout      unlimited            unlimited            us\n"})}),"\n",(0,d.jsx)(e.h2,{id:"limitsconf",children:"limits.conf"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"/etc/security/limits.conf"}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"<domain><type><item><value>\n"})}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-pre",metastring:'title="limits.conf"',children:"*               soft    core            0\n*               hard    nofile          512\n@student        hard    nproc           20\n@faculty        soft    nproc           20\n@faculty        hard    nproc           50\nftp             hard    nproc           0\n@student        -       maxlogins       4\n:123            hard    cpu             5000\n@500:           soft    cpu             10000\n600:700         hard    locks           10\n"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:["domain\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"username"}),"\n",(0,d.jsx)(e.li,{children:"@group"}),"\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.code,{children:"*"})," - \u9ED8\u8BA4"]}),"\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.code,{children:"%"})," - maxlogins"]}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.code,{children:"<min_uid>:<max_uid>"})}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.code,{children:"@<min_gid>:<max_gid>"})}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.code,{children:"%:<gid>"})}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["type\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"hard"}),"\n",(0,d.jsx)(e.li,{children:"soft"}),"\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.code,{children:"-"})," - soft+hard"]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["value\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"-1, unlimited, infinity - \u65E0\u9650\u5236"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.h2,{id:"\u5EFA\u8BAE",children:"\u5EFA\u8BAE"}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-txt",metastring:'title="/etc/security/limits.d/default.conf"',children:"* hard nofile 65536\n* soft nofile 4096\n"})}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-txt",metastring:'title="kubernetes-nobody.conf"',children:"nobody soft nofile 40960\n"})}),"\n",(0,d.jsx)(e.h2,{id:"\u7EDF\u8BA1",children:"\u7EDF\u8BA1"}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"# nproc\nps h -Led -o user | sort | uniq -c | sort -n\n"})}),"\n",(0,d.jsx)(e.h2,{id:"ssh-limits-\u4E0D\u751F\u6548",children:"SSH limits \u4E0D\u751F\u6548"}),"\n",(0,d.jsx)(e.p,{children:(0,d.jsx)(e.strong,{children:"sshd_config"})}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"UsePrivilegeSeparation no\n"})}),"\n",(0,d.jsx)(e.p,{children:"\u6216"}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"UsePAM yes\n"})}),"\n",(0,d.jsxs)(e.blockquote,{children:["\n",(0,d.jsx)(e.p,{children:"Unsupported option UsePAM"}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"apk add openssh-server-pam\nsudo service sshd restart\n"})}),"\n",(0,d.jsx)(e.h2,{id:"open-files",children:"open files"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"1073741816"}),"\n",(0,d.jsx)(e.li,{children:"1048576"}),"\n"]}),"\n",(0,d.jsx)(e.h2,{id:"debug",children:"debug"}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"strace -o loglimit su - user01\n"})})]})}function j(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,d.jsx)(e,{...n,children:(0,d.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return r},a:function(){return l}});var i=s(75271);let d={},t=i.createContext(d);function l(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:l(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);