"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["47504"],{36505:function(e,n,s){s.r(n),s.d(n,{metadata:()=>l,contentTitle:()=>t,default:()=>a,assets:()=>c,toc:()=>o,frontMatter:()=>d});var l=JSON.parse('{"id":"os/linux/linux-hardening","title":"Linux \u5B89\u5168\u52A0\u56FA","description":"- \u53C2\u7167 \u963F\u91CC\u4E91 ECS \u52A0\u56FA","source":"@site/../notes/os/linux/linux-hardening.md","sourceDirName":"os/linux","slug":"/os/linux/hardening","permalink":"/notes/os/linux/hardening","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/linux-hardening.md","tags":[{"inline":true,"label":"Security","permalink":"/notes/tags/security"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717310639000,"frontMatter":{"tags":["Security"]},"sidebar":"docs","previous":{"title":"Linux Glossary","permalink":"/notes/os/linux/glossary"},"next":{"title":"Linux PAM","permalink":"/notes/os/linux/pam"}}'),i=s("52676"),r=s("79938");let d={tags:["Security"]},t="Linux \u5B89\u5168\u52A0\u56FA",c={},o=[{value:"SSH\u670D\u52A1\u914D\u7F6E",id:"ssh\u670D\u52A1\u914D\u7F6E",level:2},{value:"\u4F7F\u7528\u975Eroot\u8D26\u53F7\u767B\u9646\u5B9E\u4F8B",id:"\u4F7F\u7528\u975Eroot\u8D26\u53F7\u767B\u9646\u5B9E\u4F8B",level:3},{value:"\u7981\u6B62SSH\u7A7A\u5BC6\u7801\u7528\u6237\u767B\u5F55",id:"\u7981\u6B62ssh\u7A7A\u5BC6\u7801\u7528\u6237\u767B\u5F55",level:3},{value:"\u786E\u4FDDSSH MaxAuthTries\u8BBE\u7F6E\u4E3A3\u52306\u4E4B\u95F4",id:"\u786E\u4FDDssh-maxauthtries\u8BBE\u7F6E\u4E3A3\u52306\u4E4B\u95F4",level:3},{value:"\u670D\u52A1\u914D\u7F6E",id:"\u670D\u52A1\u914D\u7F6E",level:2},{value:"\u786E\u4FDDSSH LogLevel\u8BBE\u7F6E\u4E3AINFO",id:"\u786E\u4FDDssh-loglevel\u8BBE\u7F6E\u4E3Ainfo",level:3},{value:"\u8BBE\u7F6ESSH\u7A7A\u95F2\u8D85\u65F6\u9000\u51FA\u65F6\u95F4",id:"\u8BBE\u7F6Essh\u7A7A\u95F2\u8D85\u65F6\u9000\u51FA\u65F6\u95F4",level:3},{value:"\u8EAB\u4EFD\u9274\u522B",id:"\u8EAB\u4EFD\u9274\u522B",level:2},{value:"\u68C0\u67E5\u7CFB\u7EDF\u7A7A\u5BC6\u7801\u8D26\u6237",id:"\u68C0\u67E5\u7CFB\u7EDF\u7A7A\u5BC6\u7801\u8D26\u6237",level:3},{value:"\u786E\u4FDDroot\u662F\u552F\u4E00\u7684UID\u4E3A0\u7684\u5E10\u6237",id:"\u786E\u4FDDroot\u662F\u552F\u4E00\u7684uid\u4E3A0\u7684\u5E10\u6237",level:3},{value:"\u5BC6\u7801\u590D\u6742\u5EA6\u68C0\u67E5",id:"\u5BC6\u7801\u590D\u6742\u5EA6\u68C0\u67E5",level:3},{value:"\u786E\u4FDD\u5BC6\u7801\u5230\u671F\u8B66\u544A\u5929\u6570\u4E3A7\u6216\u66F4\u591A",id:"\u786E\u4FDD\u5BC6\u7801\u5230\u671F\u8B66\u544A\u5929\u6570\u4E3A7\u6216\u66F4\u591A",level:3},{value:"\u68C0\u67E5\u5BC6\u7801\u91CD\u7528\u662F\u5426\u53D7\u9650\u5236",id:"\u68C0\u67E5\u5BC6\u7801\u91CD\u7528\u662F\u5426\u53D7\u9650\u5236",level:3},{value:"\u8BBE\u7F6E\u5BC6\u7801\u5931\u6548\u65F6\u95F4",id:"\u8BBE\u7F6E\u5BC6\u7801\u5931\u6548\u65F6\u95F4",level:3},{value:"\u8BBE\u7F6E\u5BC6\u7801\u4FEE\u6539\u6700\u5C0F\u95F4\u9694\u65F6\u95F4",id:"\u8BBE\u7F6E\u5BC6\u7801\u4FEE\u6539\u6700\u5C0F\u95F4\u9694\u65F6\u95F4",level:3},{value:"\u5B89\u5168\u5BA1\u8BA1",id:"\u5B89\u5168\u5BA1\u8BA1",level:2},{value:"\u786E\u4FDDrsyslog\u670D\u52A1\u5DF2\u542F\u7528",id:"\u786E\u4FDDrsyslog\u670D\u52A1\u5DF2\u542F\u7528",level:3},{value:"\u6587\u4EF6\u6743\u9650",id:"\u6587\u4EF6\u6743\u9650",level:2},{value:"\u8BBF\u95EE\u63A7\u5236\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650\u8BBE\u7F6E",id:"\u8BBF\u95EE\u63A7\u5236\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650\u8BBE\u7F6E",level:3},{value:"\u8BBE\u7F6E\u7528\u6237\u6743\u9650\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650",id:"\u8BBE\u7F6E\u7528\u6237\u6743\u9650\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650",level:3},{value:"\u5165\u4FB5\u9632\u8303",id:"\u5165\u4FB5\u9632\u8303",level:2},{value:"\u5F00\u542F\u5730\u5740\u7A7A\u95F4\u5E03\u5C40\u968F\u673A\u5316",id:"\u5F00\u542F\u5730\u5740\u7A7A\u95F4\u5E03\u5C40\u968F\u673A\u5316",level:3}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"linux-\u5B89\u5168\u52A0\u56FA",children:"Linux \u5B89\u5168\u52A0\u56FA"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u53C2\u7167 \u963F\u91CC\u4E91 ECS \u52A0\u56FA"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/trimstray/the-practical-linux-hardening-guide",children:"trimstray/the-practical-linux-hardening-guide"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"ssh\u670D\u52A1\u914D\u7F6E",children:"SSH\u670D\u52A1\u914D\u7F6E"}),"\n",(0,i.jsx)(n.h3,{id:"\u4F7F\u7528\u975Eroot\u8D26\u53F7\u767B\u9646\u5B9E\u4F8B",children:"\u4F7F\u7528\u975Eroot\u8D26\u53F7\u767B\u9646\u5B9E\u4F8B"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"\u521B\u5EFA\u65B0\u8D26\u53F7 ecs-user adduser ecs-user"}),"\n",(0,i.jsx)(n.li,{children:"\u4E3A\u65B0\u8D26\u6237\u8BBE\u7F6E\u5BC6\u7801 passwd ecs-user"}),"\n",(0,i.jsx)(n.li,{children:"\u786E\u8BA4ecs-user\u8D26\u6237\u53EF\u6B63\u5E38\u767B\u5F55\u4F7F\u7528"}),"\n",(0,i.jsx)(n.li,{children:"\u7ED9\u65B0\u5E10\u53F7\u6DFB\u52A0\u514D\u5BC6sudo\u6743\u9650 vim /etc/sudoers \u5728root ALL=(ALL) ALL \u4E0B\u9762\u4E00\u884C\u6DFB\u52A0\u4E00\u884C ecs-user ALL=(ALL) NOPASSWD:ALL"}),"\n",(0,i.jsx)(n.li,{children:"\u9650\u5236root \u767B\u9646 \u7F16\u8F91SSH \u7684\u914D\u7F6E\u6587\u4EF6 /etc/ssh/sshd_config \u627E\u5230 'PermitRootLogin' \u914D\u7F6E\u9879 \u8BBE\u7F6E\u4E3A 'PermitRootLogin no' \u82E5\u6CA1\u6709\u5219\u624B\u52A8\u65B0\u589E"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\u7981\u6B62ssh\u7A7A\u5BC6\u7801\u7528\u6237\u767B\u5F55",children:"\u7981\u6B62SSH\u7A7A\u5BC6\u7801\u7528\u6237\u767B\u5F55"}),"\n",(0,i.jsx)(n.p,{children:"\u7F16\u8F91\u6587\u4EF6/etc/ssh/sshd_config\uFF0C\u5C06PermitEmptyPasswords\u914D\u7F6E\u4E3Ano:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"PermitEmptyPasswords no\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u786E\u4FDDssh-maxauthtries\u8BBE\u7F6E\u4E3A3\u52306\u4E4B\u95F4",children:"\u786E\u4FDDSSH MaxAuthTries\u8BBE\u7F6E\u4E3A3\u52306\u4E4B\u95F4"}),"\n",(0,i.jsx)(n.p,{children:"\u5728/etc/ssh/sshd_config\u4E2D\u53D6\u6D88MaxAuthTries\u6CE8\u91CA\u7B26\u53F7#\uFF0C\u8BBE\u7F6E\u6700\u5927\u5BC6\u7801\u5C1D\u8BD5\u5931\u8D25\u6B21\u65703-6\uFF0C\u5EFA\u8BAE\u4E3A4\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"MaxAuthTries 4\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u670D\u52A1\u914D\u7F6E",children:"\u670D\u52A1\u914D\u7F6E"}),"\n",(0,i.jsx)(n.h3,{id:"\u786E\u4FDDssh-loglevel\u8BBE\u7F6E\u4E3Ainfo",children:"\u786E\u4FDDSSH LogLevel\u8BBE\u7F6E\u4E3AINFO"}),"\n",(0,i.jsx)(n.p,{children:"\u7F16\u8F91 /etc/ssh/sshd_config \u6587\u4EF6\u4EE5\u6309\u5982\u4E0B\u65B9\u5F0F\u8BBE\u7F6E\u53C2\u6570(\u53D6\u6D88\u6CE8\u91CA):"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"LogLevel INFO\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u8BBE\u7F6Essh\u7A7A\u95F2\u8D85\u65F6\u9000\u51FA\u65F6\u95F4",children:"\u8BBE\u7F6ESSH\u7A7A\u95F2\u8D85\u65F6\u9000\u51FA\u65F6\u95F4"}),"\n",(0,i.jsx)(n.p,{children:"\u7F16\u8F91/etc/ssh/sshd_config\uFF0C\u5C06ClientAliveInterval \u8BBE\u7F6E\u4E3A300\u5230900\uFF0C\u53735-15\u5206\u949F\uFF0C\u5C06ClientAliveCountMax\u8BBE\u7F6E\u4E3A0-3\u4E4B\u95F4\u3002"}),"\n",(0,i.jsx)(n.p,{children:"ClientAliveInterval 600\nClientAliveCountMax 2"}),"\n",(0,i.jsx)(n.h2,{id:"\u8EAB\u4EFD\u9274\u522B",children:"\u8EAB\u4EFD\u9274\u522B"}),"\n",(0,i.jsx)(n.h3,{id:"\u68C0\u67E5\u7CFB\u7EDF\u7A7A\u5BC6\u7801\u8D26\u6237",children:"\u68C0\u67E5\u7CFB\u7EDF\u7A7A\u5BC6\u7801\u8D26\u6237"}),"\n",(0,i.jsxs)(n.p,{children:["\u4E3A\u7528\u6237\u8BBE\u7F6E\u4E00\u4E2A\u975E\u7A7A\u5BC6\u7801\uFF0C\u6216\u8005\u6267\u884C",(0,i.jsx)(n.code,{children:"passwd -l <username>"}),"\u9501\u5B9A\u7528\u6237"]}),"\n",(0,i.jsx)(n.h3,{id:"\u786E\u4FDDroot\u662F\u552F\u4E00\u7684uid\u4E3A0\u7684\u5E10\u6237",children:"\u786E\u4FDDroot\u662F\u552F\u4E00\u7684UID\u4E3A0\u7684\u5E10\u6237"}),"\n",(0,i.jsxs)(n.p,{children:["\u9664root\u4EE5\u5916\u5176\u4ED6UID\u4E3A0\u7684\u7528\u6237(\u67E5\u770B\u547D\u4EE4",(0,i.jsx)(n.code,{children:"cat /etc/passwd | awk -F: '($3 == 0) { print $1 }'|grep -v '^root$'"})," )\u90FD\u5E94\u8BE5\u5220\u9664\uFF0C\u6216\u8005\u4E3A\u5176\u5206\u914D\u65B0\u7684UID"]}),"\n",(0,i.jsx)(n.h3,{id:"\u5BC6\u7801\u590D\u6742\u5EA6\u68C0\u67E5",children:"\u5BC6\u7801\u590D\u6742\u5EA6\u68C0\u67E5"}),"\n",(0,i.jsx)(n.p,{children:"\u7F16\u8F91/etc/security/pwquality.conf\uFF0C\u628Aminlen\uFF08\u5BC6\u7801\u6700\u5C0F\u957F\u5EA6\uFF09\u8BBE\u7F6E\u4E3A8-32\u4F4D\uFF0C\u628Aminclass\uFF08\u81F3\u5C11\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3001\u5927\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u5B57\u7B26\u7B494\u7C7B\u5B57\u7B26\u4E2D\u7B493\u7C7B\u62164\u7C7B\uFF09\u8BBE\u7F6E\u4E3A3\u62164\u3002\u5982\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"minlen=10\nminclass=3\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u786E\u4FDD\u5BC6\u7801\u5230\u671F\u8B66\u544A\u5929\u6570\u4E3A7\u6216\u66F4\u591A",children:"\u786E\u4FDD\u5BC6\u7801\u5230\u671F\u8B66\u544A\u5929\u6570\u4E3A7\u6216\u66F4\u591A"}),"\n",(0,i.jsx)(n.p,{children:"\u5728 /etc/login.defs \u4E2D\u5C06 PASS_WARN_AGE \u53C2\u6570\u8BBE\u7F6E\u4E3A7-14\u4E4B\u95F4\uFF0C\u5EFA\u8BAE\u4E3A7\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"PASS_WARN_AGE 7\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u540C\u65F6\u6267\u884C\u547D\u4EE4\u4F7Froot\u7528\u6237\u8BBE\u7F6E\u751F\u6548\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"chage --warndays 7 root\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u68C0\u67E5\u5BC6\u7801\u91CD\u7528\u662F\u5426\u53D7\u9650\u5236",children:"\u68C0\u67E5\u5BC6\u7801\u91CD\u7528\u662F\u5426\u53D7\u9650\u5236"}),"\n",(0,i.jsx)(n.p,{children:"\u5728/etc/pam.d/password-auth\u548C/etc/pam.d/system-auth\u4E2Dpassword sufficient pam_unix.so \u8FD9\u884C\u7684\u672B\u5C3E\u914D\u7F6Eremember\u53C2\u6570\u4E3A5-24\u4E4B\u95F4\uFF0C\u539F\u6765\u7684\u5185\u5BB9\u4E0D\u7528\u66F4\u6539\uFF0C\u53EA\u5728\u672B\u5C3E\u52A0\u4E86remember=5\u3002"}),"\n",(0,i.jsx)(n.h3,{id:"\u8BBE\u7F6E\u5BC6\u7801\u5931\u6548\u65F6\u95F4",children:"\u8BBE\u7F6E\u5BC6\u7801\u5931\u6548\u65F6\u95F4"}),"\n",(0,i.jsx)(n.p,{children:"\u4F7F\u7528\u975E\u5BC6\u7801\u767B\u9646\u65B9\u5F0F\u5982\u5BC6\u94A5\u5BF9\uFF0C\u8BF7\u5FFD\u7565\u6B64\u9879\u3002\u5728 /etc/login.defs \u4E2D\u5C06 PASS_MAX_DAYS \u53C2\u6570\u8BBE\u7F6E\u4E3A 60-180\u4E4B\u95F4\uFF0C\u5982:"}),"\n",(0,i.jsx)(n.p,{children:"PASS_MAX_DAYS 90\n\u9700\u540C\u65F6\u6267\u884C\u547D\u4EE4\u8BBE\u7F6Eroot\u5BC6\u7801\u5931\u6548\u65F6\u95F4\uFF1A"}),"\n",(0,i.jsx)(n.p,{children:"chage --maxdays 90 root"}),"\n",(0,i.jsx)(n.h3,{id:"\u8BBE\u7F6E\u5BC6\u7801\u4FEE\u6539\u6700\u5C0F\u95F4\u9694\u65F6\u95F4",children:"\u8BBE\u7F6E\u5BC6\u7801\u4FEE\u6539\u6700\u5C0F\u95F4\u9694\u65F6\u95F4"}),"\n",(0,i.jsx)(n.p,{children:"\u5728 /etc/login.defs \u4E2D\u5C06 PASS_MIN_DAYS \u53C2\u6570\u8BBE\u7F6E\u4E3A7-14\u4E4B\u95F4,\u5EFA\u8BAE\u4E3A7\uFF1A"}),"\n",(0,i.jsx)(n.p,{children:"PASS_MIN_DAYS 7\n\u9700\u540C\u65F6\u6267\u884C\u547D\u4EE4\u4E3Aroot\u7528\u6237\u8BBE\u7F6E\uFF1A"}),"\n",(0,i.jsx)(n.p,{children:"chage --mindays 7 root"}),"\n",(0,i.jsx)(n.h2,{id:"\u5B89\u5168\u5BA1\u8BA1",children:"\u5B89\u5168\u5BA1\u8BA1"}),"\n",(0,i.jsx)(n.h3,{id:"\u786E\u4FDDrsyslog\u670D\u52A1\u5DF2\u542F\u7528",children:"\u786E\u4FDDrsyslog\u670D\u52A1\u5DF2\u542F\u7528"}),"\n",(0,i.jsx)(n.p,{children:"\u8FD0\u884C\u4EE5\u4E0B\u547D\u4EE4\u542F\u7528rsyslog\u670D\u52A1\uFF1A"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"systemd"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"systemctl enable rsyslog\nsystemctl start rsyslog\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u6587\u4EF6\u6743\u9650",children:"\u6587\u4EF6\u6743\u9650"}),"\n",(0,i.jsx)(n.h3,{id:"\u8BBF\u95EE\u63A7\u5236\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650\u8BBE\u7F6E",children:"\u8BBF\u95EE\u63A7\u5236\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650\u8BBE\u7F6E"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"chown root:root /etc/hosts.allow\nchown root:root /etc/hosts.deny\nchmod 644 /etc/hosts.deny\nchmod 644 /etc/hosts.allow\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u8BBE\u7F6E\u7528\u6237\u6743\u9650\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650",children:"\u8BBE\u7F6E\u7528\u6237\u6743\u9650\u914D\u7F6E\u6587\u4EF6\u7684\u6743\u9650"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"chown root:root /etc/passwd /etc/shadow /etc/group /etc/gshadow\nchmod 0644 /etc/group\nchmod 0644 /etc/passwd\nchmod 0400 /etc/shadow\nchmod 0400 /etc/gshadow\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5165\u4FB5\u9632\u8303",children:"\u5165\u4FB5\u9632\u8303"}),"\n",(0,i.jsx)(n.h3,{id:"\u5F00\u542F\u5730\u5740\u7A7A\u95F4\u5E03\u5C40\u968F\u673A\u5316",children:"\u5F00\u542F\u5730\u5740\u7A7A\u95F4\u5E03\u5C40\u968F\u673A\u5316"}),"\n",(0,i.jsx)(n.p,{children:"\u5B83\u5C06\u8FDB\u7A0B\u7684\u5185\u5B58\u7A7A\u95F4\u5730\u5740\u968F\u673A\u5316\u6765\u589E\u5927\u5165\u4FB5\u8005\u9884\u6D4B\u76EE\u7684\u5730\u5740\u96BE\u5EA6\uFF0C\u4ECE\u800C\u964D\u4F4E\u8FDB\u7A0B\u88AB\u6210\u529F\u5165\u4FB5\u7684\u98CE\u9669"}),"\n",(0,i.jsx)(n.p,{children:"\u5728/etc/sysctl.conf\u6216/etc/sysctl.d/*\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u4EE5\u4E0B\u53C2\u6570\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"kernel.randomize_va_space = 2\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u6267\u884C\u547D\u4EE4\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"sysctl -w kernel.randomize_va_space=2\n"})})]})}function a(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return t},a:function(){return d}});var l=s(75271);let i={},r=l.createContext(i);function d(e){let n=l.useContext(r);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);