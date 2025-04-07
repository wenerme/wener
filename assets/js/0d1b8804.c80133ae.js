"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["64842"],{4492:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>o,toc:()=>a,frontMatter:()=>c});var i=JSON.parse('{"id":"os/linux/linux-pam","title":"Linux PAM","description":"- linux-pam/linux-pam","source":"@site/../notes/os/linux/linux-pam.md","sourceDirName":"os/linux","slug":"/os/linux/pam","permalink":"/notes/os/linux/pam","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/linux-pam.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1708697175000,"frontMatter":{"title":"Linux PAM"},"sidebar":"docs","previous":{"title":"Linux \u5B89\u5168\u52A0\u56FA","permalink":"/notes/os/linux/hardening"},"next":{"title":"Linux Releases","permalink":"/notes/os/linux/version"}}'),l=s("52676"),r=s("79938");let c={title:"Linux PAM"},d="Linux PAM",o={},a=[{value:"pam.conf",id:"pamconf",level:2},{value:"pam.d",id:"pamd",level:2},{value:"modules",id:"modules",level:2}];function t(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"linux-pam",children:"Linux PAM"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/linux-pam/linux-pam",children:"linux-pam/linux-pam"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://pkgs.alpinelinux.org/contents?file=&path=&name=linux-pam&branch=edge&arch=x86_64",children:"https://pkgs.alpinelinux.org/contents?file=&path=&name=linux-pam&branch=edge&arch=x86_64"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"pamconf",children:"pam.conf"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"/etc/pam.d/<service>"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"type control module-path module-arguments"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["service\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"su"}),"\n",(0,l.jsx)(e.li,{children:"login"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"other"})," - \u9ED8\u8BA4"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["type\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"account"}),"\n",(0,l.jsx)(e.li,{children:"auth"}),"\n",(0,l.jsx)(e.li,{children:"password"}),"\n",(0,l.jsx)(e.li,{children:"session"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["control\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"required"}),"\n",(0,l.jsx)(e.li,{children:"requisite"}),"\n",(0,l.jsx)(e.li,{children:"sufficient"}),"\n",(0,l.jsx)(e.li,{children:"optional"}),"\n",(0,l.jsx)(e.li,{children:"include"}),"\n",(0,l.jsx)(e.li,{children:"substack"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"value1=action1 value2=action2"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["module-path\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5B8C\u6574\u6216\u76F8\u5BF9"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"/lib/security/"}),", ",(0,l.jsx)(e.code,{children:"/lib64/security/"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-txt",metastring:'title="/etc/pam.d/su"',children:"# basic PAM configuration for Alpine.\nauth            sufficient      pam_rootok.so\nauth            include         base-auth\naccount         include         base-account\npassword        include         base-password\nsession         include         base-session-noninteractive\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://man7.org/linux/man-pages/man5/pam.conf.5.html",children:"https://man7.org/linux/man-pages/man5/pam.conf.5.html"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"pamd",children:"pam.d"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"base-account"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"account		required	pam_unix.so\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"base-auth"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"auth	required	pam_env.so\nauth	required	pam_unix.so	nullok_secure\nauth	required	pam_nologin.so	successok\n\nauth	sufficient	pam_unix.so	nullok try_first_pass\n\naccount	required	pam_nologin.so\naccount	sufficient	pam_unix.so\n\npassword	sufficient	pam_unix.so	nullok sha512 shadow try_first_pass use_authtok\n\n-session	optional	pam_loginuid.so\n-session	optional	pam_elogind.so\nsession	sufficient	pam_unix.so\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"base-password"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"password	required	pam_unix.so	nullok md5 sha512\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"base-session"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"session		include		base-session-noninteractive\nsession		required	pam_motd.so\n-session	optional	pam_elogind.so\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"base-session-noninteractive"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"session		required	pam_limits.so\nsession		required	pam_unix.so\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"chpasswd"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"groupadd"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"groupdel"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"groupmems"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"groupmod"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"newusers"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"other"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"polkit-1"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"su"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"system-local-login"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"system-login"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"useradd"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"userdel"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"usermod"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"modules",children:"modules"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"pam_access.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_cgfs.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_debug.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_deny.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_echo.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_env.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_exec.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_faildelay.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_faillock.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_filter.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_ftp.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_group.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_issue.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_keyinit.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_limits.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_listfile.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_localuser.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_loginuid.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_mail.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_mkhomedir.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_motd.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_namespace.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_nologin.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_permit.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_pwhistory.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_rootok.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_securetty.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_setquota.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_shells.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_stress.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_succeed_if.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_time.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_timestamp.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_umask.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_unix.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_usertype.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_warn.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_wheel.so"}),"\n",(0,l.jsx)(e.li,{children:"pam_xauth.so"}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(t,{...n})}):t(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return c}});var i=s(75271);let l={},r=i.createContext(l);function c(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:c(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);