"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["88406"],{13520:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>a,frontMatter:()=>r});var i=JSON.parse('{"id":"os/linux/sys/audit","title":"audit","description":"- \u53C2\u8003","source":"@site/../notes/os/linux/sys/audit.md","sourceDirName":"os/linux/sys","slug":"/os/linux/sys/audit","permalink":"/notes/os/linux/sys/audit","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/sys/audit.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1690946986000,"frontMatter":{"title":"audit"},"sidebar":"docs","previous":{"title":"sysstat","permalink":"/notes/os/linux/stat/sysstat"},"next":{"title":"\u80FD\u529B\u7BA1\u7406","permalink":"/notes/os/linux/sys/capabilities"}}'),t=s("52676"),l=s("79938");let r={title:"audit"},d="audit",c={},a=[{value:"ausearch",id:"ausearch",level:2},{value:"augenrules",id:"augenrules",level:2},{value:"conf",id:"conf",level:2},{value:"rules",id:"rules",level:2},{value:"log",id:"log",level:2},{value:"reference",id:"reference",level:3}];function u(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"audit",children:"audit"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/Audit_framework",children:"https://wiki.archlinux.org/index.php/Audit_framework"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://serverfault.com/a/336234/190601",children:"https://serverfault.com/a/336234/190601"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"log command"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html",children:"https://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security_guide/sec-configuring_pam_for_auditing",children:"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security_guide/sec-configuring_pam_for_auditing"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/auditd.8.html",children:"auditd.8"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man8/auditctl.8.html",children:"auditctl.8"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://man7.org/linux/man-pages/man7/audit.rules.7.html",children:"audit.rules.7"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/linux-audit/audit-userspace",children:"linux-audit/audit-userspace"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/chap-system_auditing",children:"Chapter 7. System Auditing"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"apk add audit\nservice auditd start\n\nls /usr/share/audit/sample-rules/\n\nauditctl -R /etc/audit/audit.rules # load rules\nauditctl -s                        # report status\nauditctl -l                        # list rules\nauditctl -D                        # flush rules\nauditctl -w /var/lib -p w\nauditctl -w /etc -p w\n\n# auditctl -w /etc/hosts -p war -k hostswrap\nausearch\n\nsudo tail -f /var/log/audit/audit.log\n\nausearch -f /etc/passwd\nausearch --message USER_LOGIN --success no --interpret\n\naureport -x\naureport -x --summary\naureport -t # \u65F6\u95F4\u8303\u56F4\naureport --start this-week\naureport --start this-week --key --summary\n"})}),"\n",(0,t.jsx)(n.h1,{id:"auditd",children:"auditd"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"/etc/audit/rules.d/audit.rules"}),"\n",(0,t.jsx)(n.li,{children:"/var/log/audit/audit.log"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# -w file -p permissions -k key_name\nauditctl -w /etc/passwd -p wa -k user-modify\n# useradd testuser # \u4F1A\u4FEE\u6539 /etc/passwd\ncat /var/log/audit/audit.log | grep user-modify\n\nausearch -i -k user-modify\naureport -x\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"\u4EE5 root \u6267\u884C\u7684\u547D\u4EE4"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"-a exit,always -F arch=b64 -F euid=0 -S execve -k root-commands\n-a exit,always -F arch=b32 -F euid=0 -S execve -k root-commands\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"\u6240\u6709 root \u7684 syscall"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"-a exit,always -S all -F euid=0 -F perm=awx -k root-commands\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"ausearch -k root-commands\n"})}),"\n",(0,t.jsx)(n.h2,{id:"ausearch",children:"ausearch"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"ausearch -f /var/lib -i\n"})}),"\n",(0,t.jsx)(n.h2,{id:"augenrules",children:"augenrules"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# /etc/audit/rules.d -> /etc/audit/audit.rules\naugenrules\n\naugenrules --load\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"prefix"}),(0,t.jsx)(n.th,{children:"for"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"10"}),(0,t.jsx)(n.td,{children:"Kernel and auditctl configuration"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"20"}),(0,t.jsx)(n.td,{children:"Rules that could match general rules but you want a different match"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"30"}),(0,t.jsx)(n.td,{children:"Main rules"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"40"}),(0,t.jsx)(n.td,{children:"Optional rules"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"50"}),(0,t.jsx)(n.td,{children:"Server-specific rules"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"70"}),(0,t.jsx)(n.td,{children:"System local rules"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"90"}),(0,t.jsx)(n.td,{children:"Finalize (immutable)"})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"conf",children:"conf"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"/etc/audit/audit.rules.stop.pre"}),"\n",(0,t.jsx)(n.li,{children:"/etc/audit/audit.rules.stop.post"}),"\n",(0,t.jsx)(n.li,{children:"/etc/audit/audit.rules"}),"\n",(0,t.jsxs)(n.li,{children:["/etc/audit/audit-stop.rules\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"stop \u65F6\u8BBE\u7F6E\u7684 rules"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"/etc/audit/auditd.conf"}),"\n",(0,t.jsx)(n.li,{children:"AUDITD_LANG=C"}),"\n",(0,t.jsxs)(n.li,{children:["/etc/audit/rules.d\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"augenrules"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",metastring:'title="audit-stop.rules"',children:"# Disable auditing\n-e 0\n\n# Delete all rules\n-D\n"})}),"\n",(0,t.jsx)(n.h2,{id:"rules",children:"rules"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"FS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"-w path-to-file -p permissions -k keyname\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["permissions\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"r - read"}),"\n",(0,t.jsx)(n.li,{children:"w - write"}),"\n",(0,t.jsx)(n.li,{children:"x - execute"}),"\n",(0,t.jsx)(n.li,{children:"a - change attr"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"syscall"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"-a action,list -S syscall -F field=value -k keyname\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"action - always,never"}),"\n",(0,t.jsxs)(n.li,{children:["list/filter - task, exit, user, exclude, filesystem, io_uring\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"kernel rule-matching filter"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"log",children:"log"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'type=SYSCALL msg=audit(1364481363.243:24287): arch=c000003e syscall=2 success=no exit=-13 a0=7fffd19c5592 a1=0 a2=7fffd19c4b50 a3=a items=1 ppid=2686 pid=3538 auid=1000 uid=1000 gid=1000 euid=1000 suid=1000 fsuid=1000 egid=1000 sgid=1000 fsgid=1000 tty=pts0 ses=1 comm="cat" exe="/bin/cat" subj=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 key="sshd_config"\ntype=CWD msg=audit(1364481363.243:24287):  cwd="/home/shadowman"\ntype=PATH msg=audit(1364481363.243:24287): item=0 name="/etc/ssh/sshd_config" inode=409248 dev=fd:00 mode=0100600 ouid=0 ogid=0 rdev=00:00 obj=system_u:object_r:etc_t:s0  objtype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0\ntype=PROCTITLE msg=audit(1364481363.243:24287) : proctitle=636174002F6574632F7373682F737368645F636F6E666967\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'type=SYSCALL msg=audit(1687705400.741:250): arch=c000003e syscall=257 success=yes exit=4 a0=ffffff9c a1=7ffe429aec10 a2=a0002 a3=0 items=1 ppid=15931 pid=13750 auid=4294967295 uid=999 gid=999 euid=999 suid=999 fsuid=999 egid=999 sgid=999 fsgid=999 tty=(none) ses=4294967295 comm="postgres" exe="/usr/lib/postgresql/15/bin/postgres" key=(null)ARCH=x86_64 SYSCALL=openat AUID="unset" UID="etcd" GID="ping" EUID="etcd" SUID="etcd" FSUID="etcd" EGID="ping" SGID="ping" FSGID="ping"\ntype=CWD msg=audit(1687705400.741:250): cwd="/var/lib/postgresql/data/pgdata"\ntype=PATH msg=audit(1687705400.741:250): item=0 name="/dev/shm/PostgreSQL.845382982" inode=3 dev=00:90 mode=0100600 ouid=999 ogid=999 rdev=00:00 nametype=NORMAL cap_fp=0 cap_fi=0 cap_fe=0 cap_fver=0 cap_frootid=0OUID="etcd" OGID="ping"\ntype=PROCTITLE msg=audit(1687705400.741:250): proctitle=706F7374677265733A206175746F76616375756D20776F726B657220\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"audit(timestamp:ID)"})," - ",(0,t.jsx)(n.code,{children:"1364481363.243:24287"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"timestamp \u548C serial number \u76F8\u540C\uFF0C\u540C\u4E00\u4E2A\u4E8B\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["arch=c000003e\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"x86_64"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["syscall\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"/usr/include/asm/unistd_64.h"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/notes/os/linux/sys/syscall",children:"syscall"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["SYSCALL\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"syscall=N,success=yes/no,exit=N"}),"\n",(0,t.jsx)(n.li,{children:"aN=\u53C2\u6570"}),"\n",(0,t.jsx)(n.li,{children:"items=N \u4E4B\u540E\u6709\u591A\u5C11\u4E2A PATH"}),"\n",(0,t.jsx)(n.li,{children:"ppid - Parent Process ID"}),"\n",(0,t.jsx)(n.li,{children:"pid - Process ID"}),"\n",(0,t.jsx)(n.li,{children:"auid - Audit user ID - loginuid"}),"\n",(0,t.jsx)(n.li,{children:"uid,gid"}),"\n",(0,t.jsx)(n.li,{children:"euid,egid - effective user/group ID"}),"\n",(0,t.jsx)(n.li,{children:"suid,sgid - set user/group ID - who started the analyzed process"}),"\n",(0,t.jsx)(n.li,{children:"fsuid,fsgid - file system user ID"}),"\n",(0,t.jsx)(n.li,{children:"tty"}),"\n",(0,t.jsx)(n.li,{children:"ses - session ID"}),"\n",(0,t.jsx)(n.li,{children:"comm - \u547D\u4EE4"}),"\n",(0,t.jsx)(n.li,{children:"exe - \u53EF\u6267\u884C\u6587\u4EF6\u5B8C\u6574\u8DEF\u5F84"}),"\n",(0,t.jsx)(n.li,{children:"key - \u7528\u4E8E\u6807\u8BC6\u4E8B\u4EF6\u7684\u5B57\u7B26\u4E32"}),"\n",(0,t.jsx)(n.li,{children:"subj - SELinux"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["CWD\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"cwd"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["PATH\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"item - Index of items"}),"\n",(0,t.jsx)(n.li,{children:"name"}),"\n",(0,t.jsx)(n.li,{children:"inode"}),"\n",(0,t.jsx)(n.li,{children:"dev"}),"\n",(0,t.jsx)(n.li,{children:"mode"}),"\n",(0,t.jsx)(n.li,{children:"ouid,ogid"}),"\n",(0,t.jsx)(n.li,{children:"rdev - recorded device identifier"}),"\n",(0,t.jsx)(n.li,{children:"nametype"}),"\n",(0,t.jsx)(n.li,{children:"cap_fp, cap_fi, cap_fe, cap_fver - permitted, inherited, effective bit, version"}),"\n",(0,t.jsx)(n.li,{children:"cap_frootid"}),"\n",(0,t.jsx)(n.li,{children:"obj - SELinux"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["PROCTITLE\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"proctitle - \u7F16\u7801\u540E\u8FDB\u7A0B\u6807\u9898"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"type"}),(0,t.jsx)(n.th,{children:"attr"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"SYSCALL"}),(0,t.jsx)(n.td,{})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CWD"}),(0,t.jsx)(n.td,{})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"PATH"}),(0,t.jsx)(n.td,{})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"PROCTITLE"}),(0,t.jsx)(n.td,{})]})]})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://access.redhat.com/articles/4409591",children:"https://access.redhat.com/articles/4409591"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-understanding_audit_log_files",children:"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-understanding_audit_log_files"})}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"reference",children:"reference"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# AVC Access Vector Cache used by SELinux/Apparmor\n# https://serverfault.com/a/954291/190601\nauditctl -a never,exclude -F msgtype=AVC\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",metastring:'title="audit.rules"',children:"# First rule - delete all\n-D\n\n# increase the buffers to survive stress events. make this bigger for busy systems.\n-b 1024\n\n# monitor unlink() and rmdir() system calls.\n-a exit,always -S unlink -S rmdir\n\n# monitor open() system call by Linux UID 1001.\n-a exit,always -S open -F loginuid=1001\n\n# monitor write-access and change in file properties (read/write/execute) of the following files.\n-w /etc/group -p wa\n-w /etc/passwd -p wa\n-w /etc/shadow -p wa\n-w /etc/sudoers -p wa\n\n# monitor read-access of the following directory.\n-w /etc/secret_directory -p r\n\n# lock the audit configuration to prevent any modification of this file.\n-e 2\n"})})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return d},a:function(){return r}});var i=s(75271);let t={},l=i.createContext(t);function r(e){let n=i.useContext(l);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);