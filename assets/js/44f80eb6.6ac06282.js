"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["28341"],{11817:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>d,assets:()=>a,toc:()=>c,frontMatter:()=>r});var i=JSON.parse('{"id":"os/linux/shell/ssh/ssh-config","title":"ssh config","description":"ssh config","source":"@site/../notes/os/linux/shell/ssh/ssh-config.md","sourceDirName":"os/linux/shell/ssh","slug":"/os/linux/shell/ssh/config","permalink":"/notes/os/linux/shell/ssh/config","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/shell/ssh/ssh-config.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1734683606000,"frontMatter":{"title":"ssh config","tags":["Configuration"]},"sidebar":"docs","previous":{"title":"ssh-agent","permalink":"/notes/os/linux/shell/ssh/agent"},"next":{"title":"SSH FAQ","permalink":"/notes/os/linux/shell/ssh/faq"}}'),t=s("52676"),l=s("79938");let r={title:"ssh config",tags:["Configuration"]},o=void 0,a={},c=[{value:"ssh config",id:"ssh-config",level:2},{value:"Match \u672C\u5730\u5730\u5740",id:"match-\u672C\u5730\u5730\u5740",level:2}];function h(n){let e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"ssh-config",children:"ssh config"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u7528\u6237 ~/.ssh/config"}),"\n",(0,t.jsx)(e.li,{children:"\u7CFB\u7EDF /etc/ssh/ssh_config"}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://man7.org/linux/man-pages/man5/ssh_config.5.html",children:"ssh_config.5"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# \u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\nssh -F /path/to/configfile\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Include\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5305\u542B\u5176\u4ED6\u914D\u7F6E\u6587\u4EF6 - \u652F\u6301 glob \u548C ~ \u5C55\u5F00"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# \u7F51\u5173\u670D\u52A1\u5668\nHost my-gate\nUser root\nHostname 1.2.3.4\n\n# \u901A\u8FC7 my-gate \u94FE\u63A5 1.2.3.100\n# busybox \u7684 nc \u6CA1\u6709 -q, \u9700\u8981\nHost my-gate-110\nUser root\nProxyCommand ssh -q qc-sh-1 nc -q0 1.2.3.100 22\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Host/Match \u533A\u5206\u6BB5\u843D"}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ini",metastring:'title="\u901A\u914D Host"',children:"# \u4E3A\u5339\u914D\u7684 Host \u6307\u5B9A\u9ED8\u8BA4 User\nHost 10.10.*\n    User root\n# \u53EF\u4EE5 \u6392\u9664\nHost !10.10.10.*\n    User admin\n\n# \u8BBE\u7F6E\u6240\u6709\u9ED8\u8BA4\u53C2\u6570\nHost *\n    UseKeychain yes\n    AddKeysToAgent yes\n    IdentityFile ~/.ssh/id_rsa\n    User admin\n    ExitOnForwardFailure yes\n\n# \u76F4\u5230\u4E0B\u4E00\u4E2A Host/Match\nMatch\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Match\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"canonical, final, exec, host, originalhost, user, localuser, all"}),"\n",(0,t.jsxs)(e.li,{children:["all\uFF1A\u59CB\u7EC8\u5339\u914D\u3002\u5728 Match \u884C\u4E0A\u4EC5\u5199 all\uFF0C\u6216\u7D27\u63A5\u5728 canonical\u3001final \u540E\u9762\u5199\u65F6\u8868\u793A\u65E0\u6761\u4EF6\u5339\u914D\u3002\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"canonical\uFF1A\u5F53\u4E3B\u673A\u540D\u5DF2\u88AB CanonicalizeHostname \u9009\u9879\u5904\u7406\u5E76\u89C4\u8303\u5316\uFF08canonicalization\uFF09\u540E\uFF0C\u518D\u6B21\u89E3\u6790\u914D\u7F6E\u6587\u4EF6\u65F6\u6B64\u6761\u4EF6\u4E3A\u771F\u3002\u8FD9\u5E38\u7528\u4E8E\u90A3\u4E9B\u53EA\u9002\u7528\u4E8E\u89C4\u8303\u5316\u540E\u7684\u4E3B\u673A\u540D\u7684\u914D\u7F6E\u89C4\u5219\u3002"}),"\n",(0,t.jsx)(e.li,{children:"final\uFF1A\u8BF7\u6C42\u5728\u914D\u7F6E\u6587\u4EF6\u89E3\u6790\u7ED3\u675F\u524D\u518D\u505A\u4E00\u6B21\u6700\u7EC8\u89E3\u6790\uFF0C\u5E76\u5728\u90A3\u6B21\u6700\u7EC8\u89E3\u6790\u8FC7\u7A0B\u4E2D\u5339\u914D\u3002\u82E5 CanonicalizeHostname \u5F00\u542F\uFF0C\u90A3\u4E48 canonical \u548C final \u4F1A\u5728\u540C\u4E00\u9636\u6BB5\u5339\u914D\u3002"}),"\n",(0,t.jsx)(e.li,{children:"exec\uFF1A\u6267\u884C\u540E\u7EED\u6307\u5B9A\u7684\u547D\u4EE4\uFF0C\u5982\u679C\u8BE5\u547D\u4EE4\u8FD4\u56DE\u9000\u51FA\u72B6\u6001\u7801 0 \u5219\u5339\u914D\u4E3A\u771F\u3002\u8FD9\u53EF\u7528\u4E8E\u52A8\u6001\u51B3\u7B56\u903B\u8F91\uFF0C\u5982\u57FA\u4E8E\u811A\u672C\u7ED3\u679C\u8C03\u6574\u540E\u7EED\u914D\u7F6E\u3002"}),"\n",(0,t.jsx)(e.li,{children:"localnetwork\uFF1A\u5C06\u672C\u5730\u4E3B\u673A\u7684\u6D3B\u52A8\u7F51\u7EDC\u63A5\u53E3\u5730\u5740\u4E0E\u7ED9\u5B9A\u7684\u7F51\u7EDC\u5217\u8868\uFF08CIDR \u683C\u5F0F\uFF09\u5339\u914D\u3002\u5982\u679C\u672C\u5730\u7F51\u5361 IP \u4F4D\u4E8E\u8BE5\u7F51\u6BB5\u4E2D\u5219\u4E3A\u771F\u3002\u8FD9\u5728\u79FB\u52A8\u8BBE\u5907\u5728\u4E0D\u540C\u7F51\u7EDC\u95F4\u5207\u6362\u65F6\u5F88\u6709\u7528\uFF0C\u4F46\u9700\u8981\u8C28\u614E\u4F7F\u7528\uFF0C\u56E0\u4E3A\u7F51\u7EDC\u5730\u5740\u4FE1\u606F\u5728\u5B89\u5168\u573A\u666F\u4E2D\u5E76\u4E0D\u4E00\u5B9A\u53EF\u9760\u3002"}),"\n",(0,t.jsx)(e.li,{children:"host\uFF1A\u6839\u636E\u6700\u7EC8\u4F7F\u7528\u7684\u76EE\u6807\u4E3B\u673A\u540D\u5339\u914D\uFF0C\u5E38\u7528\u7684 * \u901A\u914D\u7B26\u4E5F\u53EF\u4F7F\u7528\u3002"}),"\n",(0,t.jsx)(e.li,{children:"originalhost\uFF1A\u6839\u636E\u7528\u6237\u5728\u547D\u4EE4\u884C\u4E0A\u8F93\u5165\u7684\u539F\u59CB\u4E3B\u673A\u540D\uFF08\u5C1A\u672A\u89C4\u8303\u5316\u7684\uFF09\u8FDB\u884C\u5339\u914D\u3002"}),"\n",(0,t.jsx)(e.li,{children:"tagged\uFF1A\u5339\u914D\u7531 Tag \u6307\u4EE4\u8BBE\u5B9A\u7684\u6807\u7B7E\u540D\u6216\u5728 ssh \u547D\u4EE4\u884C\u4E2D\u7528 -P \u9009\u9879\u6307\u5B9A\u7684\u6807\u7B7E\u3002"}),"\n",(0,t.jsx)(e.li,{children:"user\uFF1A\u5339\u914D\u76EE\u6807\u8FDC\u7A0B\u4E3B\u673A\u4E0A\u7684\u767B\u5F55\u7528\u6237\u540D\u3002"}),"\n",(0,t.jsx)(e.li,{children:"localuser\uFF1A\u5339\u914D\u672C\u5730\u6267\u884C ssh \u547D\u4EE4\u7684\u7528\u6237\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsx)(e.p,{children:"\u901A\u914D Host \u9700\u8981\u653E\u5728\u540E\u9762"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(e.h2,{id:"match-\u672C\u5730\u5730\u5740",children:"Match \u672C\u5730\u5730\u5740"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# macOS\n# grep -v \u53D6\u53CD\nifconfig | grep 'inet ' | grep -Fv 127.0.0.1 | awk '{print $2}' | grep -qF 192.168.0.\n# Linux\nhostname -I | grep -qF 10.10.11.\n"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-ssh_config",children:"Match exec \"ifconfig | grep 'inet ' | grep -Fv 127.0.0.1 | awk '{print $2}' | grep -vqF 192.168.0\"\n  # IP is not 192.168.0.*\n  Include ~/.ssh/not-at-home\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"onsubnet"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:'#!/usr/bin/env bash\n\nif [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]] || [[ "$1" == "" ]]; then\n  printf "Usage:\\n\\tonsubnet [ --not ] partial-ip-address\\n\\n"\n  printf "Example:\\n\\tonsubnet 10.10.\\n\\tonsubnet --not 192.168.0.\\n\\n"\n  printf "Note:\\n\\tThe partial-ip-address must match starting at the first\\n"\n  printf "\\tcharacter of the ip-address, therefore the first example\\n"\n  printf "\\tabove will match 10.10.10.1 but not 110.10.10.1\\n"\n  exit 0\nfi\n\non=0\noff=1\nif [[ "$1" == "--not" ]]; then\n  shift\n  on=1\n  off=0\nfi\n\nregexp="^$(sed \'s/\\./\\\\./g\' <<< "$1")"\n\nif [[ "$(uname)" == "Darwin" ]]; then\n  ifconfig | grep -F \'inet \' | grep -Fv 127.0.0. | cut -d \' \' -f 2 | grep -Eq "$regexp"\nelse\n  hostname -I | tr -s " " "\\012" | grep -Fv 127.0.0. | grep -Eq "$regexp"\nfi\n\nif [[ $? == 0 ]]; then\n  exit $on\nelse\n  exit $off\nfi\n'})})]})}function d(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return o},a:function(){return r}});var i=s(75271);let t={},l=i.createContext(t);function r(n){let e=i.useContext(l);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:r(n.components),i.createElement(l.Provider,{value:e},n.children)}}}]);