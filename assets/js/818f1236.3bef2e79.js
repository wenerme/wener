"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73138"],{60755:function(n,s,e){e.r(s),e.d(s,{metadata:()=>r,contentTitle:()=>i,default:()=>d,assets:()=>o,toc:()=>a,frontMatter:()=>h});var r=JSON.parse('{"id":"os/linux/shell/ssh/README","title":"SSH","description":"- sshdconfig","source":"@site/../notes/os/linux/shell/ssh/README.md","sourceDirName":"os/linux/shell/ssh","slug":"/os/linux/shell/ssh/","permalink":"/notes/os/linux/shell/ssh/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/shell/ssh/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1696577752000,"frontMatter":{"title":"SSH"},"sidebar":"docs","previous":{"title":"Shell Reference","permalink":"/notes/os/linux/shell/ref"},"next":{"title":"ssh-agent","permalink":"/notes/os/linux/shell/ssh/agent"}}'),t=e("52676"),l=e("79938");let h={title:"SSH"},i="SSH",o={},a=[{value:"Key",id:"key",level:2},{value:"Tunnel",id:"tunnel",level:2},{value:"\u591A\u8DEF\u590D\u7528",id:"\u591A\u8DEF\u590D\u7528",level:2},{value:"\u7F51\u5173",id:"\u7F51\u5173",level:2},{value:"\u8DF3\u677F\u673A",id:"\u8DF3\u677F\u673A",level:2},{value:"HTTP + SSH \u591A\u8DEF",id:"http--ssh-\u591A\u8DEF",level:2},{value:"ForwardAgent",id:"forwardagent",level:2}];function c(n){let s={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"ssh",children:"SSH"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/sshd_config.5",children:"sshd_config"})}),"\n",(0,t.jsxs)(s.li,{children:["Host key ",(0,t.jsx)(s.code,{children:"/etc/ssh/ssh_host_*"})]}),"\n",(0,t.jsxs)(s.li,{children:["\u5C06\u6307\u5B9A\u7528\u6237\u7684\u7AEF\u53E3\u8F6C\u53D1\u4F7F\u5F97\u5916\u90E8\u90FD\u53EF\u89C1,\u53EF\u5728 ",(0,t.jsx)(s.code,{children:"/etc/ssh/sshd_config"})," \u4E2D\u6DFB\u52A0,\u7136\u540E ",(0,t.jsx)(s.code,{children:"service sshd reload"})]}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"http://quark.humbug.org.au/publications/ssh/ssh-tricks.html",children:"http://quark.humbug.org.au/publications/ssh/ssh-tricks.html"})}),"\n",(0,t.jsx)(s.li,{children:"Verify that the .pem file has permissions of 0400, not 0777"}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"ssh -G host # \u67E5\u770B Host \u914D\u7F6E\n\n# \u8C03\u6574\u6743\u9650\nchmod 400 ~/.ssh/id_*\nchmod 644 ~/.ssh/id_*.pub\n\n# \u8F6C\u53D1/\u96A7\u9053\n# ============\n# -g \u5141\u8BB8\u5916\u90E8\u8BBF\u95EE\uFF0C\u9700\u8981 GatewayPorts=no\n# -o ExitOnForwardFailure=yes \u8F6C\u53D1\u5931\u8D25\u9000\u51FA\nssh -L 3000:127.0.0.1:8080 # \u672C\u5730 3000 -> \u8FDC\u7A0B 8080\nssh -R 3000:127.0.0.1:8080 # \u8FDC\u7A0B 8080 -> \u672C\u5730 3000\n\nssh -D 1080                # SOCKS5 \u4EE3\u7406\ncurl -x socks5h://localhost:1080 icanhazip.com\n\n# \u8DF3\u677F\n# ============\n# \u9700\u8981 PortForward\nssh -J admin@jumphost admin@internal\n"})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"~/.ssh/config"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-ssh-config",children:"Include ~/.ssh/*.ssh-config\n"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u62C6\u5206\u914D\u7F6E"}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"ESCAPE"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:" ~.   - terminate connection (and any multiplexed sessions)\n ~B   - send a BREAK to the remote system\n ~C   - open a command line\n ~R   - request rekey\n ~V/v - decrease/increase verbosity (LogLevel)\n ~^Z  - suspend ssh\n ~#   - list forwarded connections\n ~&   - background ssh (when waiting for connections to terminate)\n ~?   - this message\n ~~   - send the escape character by typing it twice\n(Note that escapes are only recognized immediately after newline.)\n\nssh> help\nCommands:\n      -L[bind_address:]port:host:hostport    Request local forward\n      -R[bind_address:]port:host:hostport    Request remote forward\n      -D[bind_address:]port                  Request dynamic forward\n      -KL[bind_address:]port                 Cancel local forward\n      -KR[bind_address:]port                 Cancel remote forward\n      -KD[bind_address:]port                 Cancel dynamic forward\n"})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"flags"})}),"\n\n\n\n\n\n\n\n",(0,t.jsx)(s.table,{children:(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"flag"}),(0,t.jsx)(s.th,{children:"for"})]})})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"\u5E38\u7528\u914D\u7F6E"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"# \u914D\u7F6E\u4F7F\u7528\u7684\u7AEF\u53E3\nPort 22\n\n# \u662F\u5426\u8F6C\u53D1\u7F51\u5173\nGatewayPorts no\n# \u662F\u5426\u5141\u8BB8\u4F7F\u7528 root \u767B\u9646\nPermitRootLogin yes\n# \u662F\u5426\u5141\u8BB8\u4F7F\u7528\u5BC6\u7801\u767B\u9646\nPasswordAuthentication yes\nChallengeResponseAuthentication yes\n\n# \u8F6C\u53D1\u7684\u7AEF\u53E3\u5141\u8BB8\u5916\u90E8\u8BBF\u95EE\nMatch User dev\nGatewayPorts yes\n\n# \u53EF\u53EA\u5BF9\u6307\u5B9A\u7684\u63A5\u53E3\u5BF9\u5916\u66B4\u9732\n# -R :8000:localhost:80\n# GatewayPorts clientspecified\n\n# \u7981\u6B62\u90E8\u5206\u7528\u6237\u4F7F\u7528 TTY\nMatch User player\nPermitTTY no\n"})}),"\n",(0,t.jsx)(s.h2,{id:"key",children:"Key"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:'# \u751F\u6210 key\nssh-keygen -t rsa -b 2048 -C "email@example.com"\n\n# \u65E0\u5BC6\u7801\u4E0D\u8BE2\u95EE\nssh-keygen -t rsa -b 2048 -f /tmp/sshkey -q -N ""\n# \u65B0\u7684\u63A8\u8350 ed25519\nssh-keygen -t ed25519 -C "" -f sshkey -q -N ""\n\n# \u67E5\u770B key \u4FE1\u606F\nssh-keygen -l -f key\nopenssl pkey -in key -noout -text\n'})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["ssh-rsa\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://www.rfc-editor.org/rfc/rfc4253#section-6.6",children:"https://www.rfc-editor.org/rfc/rfc4253#section-6.6"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"rsa-sha2-256, rsa-sha2-512"}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.a,{href:"https://github.com/golang/go/issues/49952",children:"golang/go#49952"}),"\nx/crypto/ssh \u4E0D\u652F\u6301 rsa-sha2-256, rsa-sha2-512"]}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://superuser.com/a/1444343/242730",children:"https://superuser.com/a/1444343/242730"})}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"tunnel",children:"Tunnel"}),"\n",(0,t.jsxs)(s.p,{children:["\u5728\u5DE5\u4F5C\u4E2D\u5E38\u5E38\u9700\u8981\u8F83\u591A\u7684\u4EE3\u7406\u548C\u8F6C\u53D1,\u4E3A\u6BCF\u4E2A\u4EE3\u7406\u548C\u8F6C\u53D1\u90FD\u8FDB\u884C\u4E00\u6B21 SSH \u672A\u514D\u592A\u8FC7\u9EBB\u70E6,\u4F7F\u7528 ",(0,t.jsx)(s.code,{children:"~/.ssh/config"})," \u53EF\u4EE5\u5C06\u5E38\u7528\u7684\u8F6C\u53D1\u4E00\u6B21\u914D\u7F6E"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"Host tunnel\nHostname my.host.com\nUser myUser\nCompression yes\nExitOnForwardFailure yes\nForwardAgent yes\nDynamicForward 8888\nRemoteForward 2222 127.0.0.1:22\nLocalForward 16379 myInternalRedis:6379\nLocalForward 13306 myInternalMySQL:3306\n"})}),"\n",(0,t.jsx)(s.p,{children:"\u518D\u914D\u5408 autossh \u53EF\u5927\u5927\u51CF\u5C11\u5DE5\u4F5C\u91CF"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"autossh -M 8889 -vNg tunnel > ssh.log 2>&1 &\n"})}),"\n",(0,t.jsx)(s.h2,{id:"\u591A\u8DEF\u590D\u7528",children:"\u591A\u8DEF\u590D\u7528"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Multiplexing",children:"https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Multiplexing"})}),"\n",(0,t.jsxs)(s.li,{children:["\u597D\u5904\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u51CF\u5C11\u8FDE\u63A5\u65F6\u95F4 - \u7279\u522B\u662F\u673A\u5668\u591A\u3001ssh \u547D\u4EE4\u591A\u3001ack \u5EF6\u65F6\u9AD8\u7684\u65F6\u5019"}),"\n",(0,t.jsx)(s.li,{children:"\u8FDE\u63A5\u590D\u7528"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\u6CE8\u610F\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u8FDE\u63A5\u8FC7\u591A\u53EF\u80FD\u6709\u95EE\u9898"}),"\n",(0,t.jsx)(s.li,{children:"\u4E0D\u8981\u7528\u6765\u4F20\u5927\u6587\u4EF6 - \u76F4\u63A5\u8FDE\u63A5\u4F1A\u66F4\u5FEB"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"Host *\nControlPath ~/.ssh/controlmasters/%r@%h:%p\nControlMaster auto\nControlPersist 10m\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"# \u5FC5\u987B\u8981\u624B\u52A8\u521B\u5EFA\u76EE\u5F55\nmkdir ~/.ssh/controlmasters\n\n# \u68C0\u6D4B\nssh -O check myhost\n# \u81EA\u52A8\u542F\u52A8 master\nssh myhost pwd\n# \u505C\u6B62 master\nssh -O stop myhost\n\n# \u624B\u52A8\u542F\u52A8 master\nssh -MNn user@server\n"})}),"\n",(0,t.jsx)(s.h2,{id:"\u7F51\u5173",children:"\u7F51\u5173"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"ssh -t gateway ssh internal\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"Host internal\n  ProxyCommand ssh gw nc -w 1 internal 22\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"ssh internal\n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"ssh -f -nNT -R 1100:localhost:22 somehost\n\nssh localhost -p 1100\n"})}),"\n",(0,t.jsx)(s.h2,{id:"\u8DF3\u677F\u673A",children:"\u8DF3\u677F\u673A"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:'# \u9ED8\u8BA4\u652F\u6301 -J \u7528\u4E8E\u8DF3\u677F\u573A\u666F\n# \u9700\u8981 PortForward\nssh -J admin@jumphost admin@internal\n\n# \u591A\u6B21\u8DF3\u8F6C\nssh -J user1@host1:port1,user2@host2:port2 user3@host3\n\n# \u4F7F\u7528 ProxyCommand\n# -W host:port\n# \u8BF7\u6C42\u8F6C\u53D1 IO \u5230\u6307\u5B9A\u673A\u5668\u7684\u7AEF\u53E3\uFF0C\u9690\u542B\u4E86 -N, -T, ExitOnForwardFailure, ClearAllForwardings\nssh -o ProxyCommand="ssh -W %h:%p -q admin@jumphost" admin@internal\n\n# nc \u8F6C\u53D1 - \u4E0D\u9700\u8981 PortForward\n# \u53EF\u4EE5\u6DFB\u52A0 -o StrictHostKeyChecking=no \u907F\u514D\u8BE2\u95EE\u6307\u7EB9\nssh -o ProxyCommand="ssh -q admin@jumphost nc %h %p" admin@internal\n\n# \u76F4\u63A5\u4E24\u6B21 ssh \u4E5F\u884C\nssh -At admin@jumphost ssh admin@internal\n'})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"Host behindbeta\n  HostName behindbeta.example.org\n  ProxyJump betajump\n"})}),"\n",(0,t.jsx)(s.h2,{id:"http--ssh-\u591A\u8DEF",children:"HTTP + SSH \u591A\u8DEF"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://github.com/yrutschle/sslh",children:"https://github.com/yrutschle/sslh"})}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"forwardagent",children:"ForwardAgent"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://www.ssh.com/ssh/agent/",children:"https://www.ssh.com/ssh/agent/"})}),"\n",(0,t.jsx)(s.li,{children:"\u8F6C\u53D1 agent \u540E\u53EF\u4EE5\u76F4\u63A5\u5728\u8FDC\u7A0B\u8282\u70B9\u4F7F\u7528\u672C\u5730\u6DFB\u52A0\u7684 ssh \u5BC6\u94A5"}),"\n",(0,t.jsxs)(s.li,{children:["\u6CE8\u610F\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"root \u80FD\u8BBF\u95EE\u5176\u4ED6\u7528\u6237\u7684 auth sock"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"# \u4F1A\u66B4\u9732 SSH_AUTH_SOCK - \u4F8B\u5982 /tmp/ssh-abcd/agent.6379\n# \u53EF\u4EE5\u5728\u6CA1\u6709\u7684\u4F1A\u8BDD\u8BBE\u7F6E\u53D8\u91CF\u4E5F\u80FD\u76F4\u63A5\u4F7F\u7528\nssh -A user@myhost.com\n"})})]})}function d(n={}){let{wrapper:s}={...(0,l.a)(),...n.components};return s?(0,t.jsx)(s,{...n,children:(0,t.jsx)(c,{...n})}):c(n)}},79938:function(n,s,e){e.d(s,{Z:function(){return i},a:function(){return h}});var r=e(75271);let t={},l=r.createContext(t);function h(n){let s=r.useContext(l);return r.useMemo(function(){return"function"==typeof n?n(s):{...s,...n}},[s,n])}function i(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:h(n.components),r.createElement(l.Provider,{value:s},n.children)}}}]);