"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["99252"],{81288:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>d,assets:()=>a,toc:()=>o,frontMatter:()=>r});var s=JSON.parse('{"id":"os/linux/sys/sys-tuning","title":"Tuning","description":"Swap","source":"@site/../notes/os/linux/sys/sys-tuning.md","sourceDirName":"os/linux/sys","slug":"/os/linux/sys/tuning","permalink":"/notes/os/linux/sys/tuning","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/sys/sys-tuning.md","tags":[{"inline":true,"label":"Tuning","permalink":"/notes/tags/tuning"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1688543048000,"frontMatter":{"tags":["Tuning"]},"sidebar":"docs","previous":{"title":"Swap","permalink":"/notes/os/linux/sys/swap"},"next":{"title":"syscall","permalink":"/notes/os/linux/sys/syscall"}}'),i=t("52676"),l=t("79938");let r={tags:["Tuning"]},c="Tuning",a={},o=[{value:"Swap",id:"swap",level:2},{value:"PostgreSQL",id:"postgresql",level:2},{value:"haproxy",id:"haproxy",level:2},{value:"nginx",id:"nginx",level:2},{value:"default.conf",id:"defaultconf",level:2},{value:"limits",id:"limits",level:2}];function p(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"tuning",children:"Tuning"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"getconf PAGE_SIZE\n"})}),"\n",(0,i.jsx)(e.h2,{id:"swap",children:"Swap"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"sysctl vm.swappiness vm.overcommit_memory vm.overcommit_ratio\n\nsysctl vm.dirty_background_ratio vm.dirty_background_bytes\nsysctl vm.dirty_ratio vm.dirty_bytes\n"})}),"\n",(0,i.jsx)(e.h2,{id:"postgresql",children:"PostgreSQL"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# Shared Memory\n# =============\nipcs -l\nipcs -lm # Shared Memory Limits\n# ipcs -M # macOS\n\nsysctl kernel.shmmax kernel.shmall\n\n# HugePage\n# =============\ncat /proc/meminfo | grep -i huge\n# HugePages_Total\nsysctl vm.nr_hugepages\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",metastring:"title='hpsizeof.sh'",children:'#!/bin/bash\npid=`head -1 $PGDATA/postmaster.pid`\necho "Pid:            $pid"\npeak=`grep ^VmPeak /proc/$pid/status | awk \'{ print $2 }\'`\necho "VmPeak:            $peak kB"\nhps=`grep ^Hugepagesize /proc/meminfo | awk \'{ print $2 }\'`\necho "Hugepagesize:   $hps kB"\nhp=$((peak/hps))\necho Set Huge Pages:     $hp\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["postgresql.conf\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"huge_pages"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.percona.com/blog/tune-linux-kernel-parameters-for-postgresql-optimization/",children:"https://www.percona.com/blog/tune-linux-kernel-parameters-for-postgresql-optimization/"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.tibco.com/pub/ast/2.5.11/doc/html/tuningguide/ch04s06.html",children:"https://docs.tibco.com/pub/ast/2.5.11/doc/html/tuningguide/ch04s06.html"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"haproxy",children:"haproxy"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ini",metastring:'title="/etc/sysctl.d/30-haproxy.conf"',children:"net.ipv4.tcp_rmem             = 4096 16060 262144 # \u51CF\u5C11\u9ED8\u8BA4 receive/send buffers\nnet.ipv4.tcp_wmem             = 4096 16384 262144 #\nnet.ipv4.tcp_tw_reuse         = 1                 # early reuse of a same source port for outgoing connections\nnet.ipv4.ip_local_port_range  = 1024 65023        # \u589E\u52A0\u53EF\u7528\u7AEF\u53E3\nnet.ipv4.tcp_max_syn_backlog  = 60000             # \u589E\u52A0 syn backlog\n#net.ipv4.tcp_fin_timeout     = 30                # \u66F4\u65E9 timeout FIN_WAIT\uFF0C\u66F4\u5FEB\u91CA\u653E dead conn\nnet.ipv4.tcp_synack_retries   = 3                 # \u51CF\u5C11 SYN-ACK \u91CD\u8BD5\nnet.ipv4.ip_nonlocal_bind     = 1                 # \u5141\u8BB8 bind \u8FD8\u4E0D\u5B58\u5728\u7684 ip\nnet.core.somaxconn            = 60000             # \u81F3\u5C11 tcp_max_syn_backlog\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.haproxy.com/documentation/hapee/latest/getting-started/system-tuning/",children:"https://www.haproxy.com/documentation/hapee/latest/getting-started/system-tuning/"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"nginx",children:"nginx"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["net.core.somaxconn\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5339\u914D ",(0,i.jsx)(e.a,{href:"https://nginx.org/en/docs/http/ngx_http_core_module.html#listen",children:"listen backlog=N"})]}),"\n",(0,i.jsx)(e.li,{children:"\u7CFB\u7EDF\u9ED8\u8BA4 512\uFF0Cnginx \u9ED8\u8BA4 511"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"net.core.netdev_max_backlog"}),"\n",(0,i.jsx)(e.li,{children:"net.ipv4.ip_local_port_range"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.nginx.com/blog/tuning-nginx/",children:"https://www.nginx.com/blog/tuning-nginx/"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"defaultconf",children:"default.conf"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ini",children:"net.ipv4.tcp_rmem           =4096 87380 4194304\nnet.ipv4.tcp_wmem           =4096 87380 4194304\nnet.ipv4.tcp_tw_reuse       =0\nnet.ipv4.ip_local_port_range=32768 61000\nnet.ipv4.tcp_max_syn_backlog=1024\nnet.ipv4.tcp_fin_timeout    =60\nnet.ipv4.tcp_synack_retries =5\nnet.ipv4.ip_nonlocal_bind   =1\nnet.core.somaxconn          =128\n"})}),"\n",(0,i.jsx)(e.h2,{id:"limits",children:"limits"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"/etc/security/limits.conf"}),"\n"]})]})}function d(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(p,{...n})}):p(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return c},a:function(){return r}});var s=t(75271);let i={},l=s.createContext(i);function r(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);