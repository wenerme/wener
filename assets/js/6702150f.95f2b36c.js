"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["21682"],{13928:function(n,e,s){s.r(e),s.d(e,{metadata:()=>r,contentTitle:()=>i,default:()=>h,assets:()=>l,toc:()=>a,frontMatter:()=>t});var r=JSON.parse('{"id":"service/dns/dnsmasq/README","title":"dnsmasq","description":"- dnsmasq","source":"@site/../notes/service/dns/dnsmasq/README.md","sourceDirName":"service/dns/dnsmasq","slug":"/service/dns/dnsmasq/","permalink":"/notes/service/dns/dnsmasq/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/dns/dnsmasq/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717644328000,"frontMatter":{"title":"dnsmasq"},"sidebar":"docs","previous":{"title":"DNSCrypt","permalink":"/notes/service/dns/dnscrypt"},"next":{"title":"\u914D\u7F6E","permalink":"/notes/service/dns/dnsmasq/conf"}}'),d=s("52676"),c=s("79938");let t={title:"dnsmasq"},i="dnsmasq",l={},a=[];function o(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...n.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.header,{children:(0,d.jsx)(e.h1,{id:"dnsmasq",children:"dnsmasq"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.a,{href:"http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html",children:"dnsmasq"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"\u8F7B\u91CF\u7EA7\u7684 DNS, TFTP, PXE, router advertisement \u548C DHCP \u670D\u52A1"}),"\n",(0,d.jsx)(e.li,{children:"\u652F\u6301 DNSSEC"}),"\n",(0,d.jsx)(e.li,{children:"\u53EF\u4EE5\u4F5C\u4E3A\u5C0F\u578B\u7684 DNS AS/\u6388\u6743\u670D\u52A1\u5668 - \u76F4\u63A5\u63D0\u4F9B\u57DF\u540D\u8BB0\u5F55"}),"\n",(0,d.jsx)(e.li,{children:"DNS forwarder"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["Archlinux ",(0,d.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/dnsmasq",children:"dnsmasq"}),"/",(0,d.jsx)(e.a,{href:"https://wiki.archlinux.org/index.php/Dnsmasq_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)",children:"\u7B80\u4F53\u4E2D\u6587"})]}),"\n",(0,d.jsxs)(e.li,{children:["Debian HowTo ",(0,d.jsx)(e.a,{href:"https://wiki.debian.org/HowTo/dnsmasq",children:"dnsmasq"})]}),"\n",(0,d.jsxs)(e.li,{children:["musl dns\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.a,{href:"https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns",children:"docker-alpine"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"dns domain \u641C\u7D22\u4E0D\u751F\u6548"}),"\n",(0,d.jsx)(e.li,{children:"\u5E76\u53D1 dns \u670D\u52A1\u6709\u95EE\u9898"}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"http://www.openwall.com/lists/musl/2017/09/28/1",children:"DNS resolution happenning only after timeout"})}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://wiki.musl-libc.org/functional-differences-from-glibc.html",children:"Functional differences from glibc"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.li,{children:"address=/.domain.tld/192.168.0.1 -> address=/domain.tld/192.168.0.1"}),"\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.a,{href:"https://serverfault.com/a/934681",children:"reload"})," - \u6E05\u9664\u7F13\u5B58\u91CD\u8F7D\u90E8\u5206\u914D\u7F6E\u6587\u4EF6\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"SIGHUP"}),"\n",(0,d.jsx)(e.li,{children:"/etc/hosts"}),"\n",(0,d.jsx)(e.li,{children:"/etc/ethers"}),"\n",(0,d.jsx)(e.li,{children:"--dhcp-hostsfile"}),"\n",(0,d.jsx)(e.li,{children:"--dhcp-hostsdir"}),"\n",(0,d.jsx)(e.li,{children:"--dhcp-optsfile"}),"\n",(0,d.jsx)(e.li,{children:"--dhcp-optsdir"}),"\n",(0,d.jsx)(e.li,{children:"--dhcp-optsdir"}),"\n",(0,d.jsx)(e.li,{children:"--addn-hosts"}),"\n",(0,d.jsx)(e.li,{children:"--hostsdir"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["ports\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"53 - DNS"}),"\n",(0,d.jsx)(e.li,{children:"67 - DHCP"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"# \u901F\u5EA6\u6D4B\u8BD5\ntime ping -c 1 baidu.com\ntime ping -4 -c 1 baidu.com\n# \u5982\u679C\u4E0D\u65B9\u4FBF ping \u4E5F\u53EF\u4EE5 wget\ntime wget --spider -q baidu.com\n\n# \u67E5\u770B\u5F53\u524D\u4F7F\u7528\u7684 dns\ncat /etc/resolv.conf\n# \u5B89\u88C5\napk add dnsmasq\n\n# \u914D\u7F6E\n# \u5982\u679C\u4E0D\u9700\u8981\u5176\u4ED6\u670D\u52A1\u8BBF\u95EE, \u53EF\u4EE5\u4F7F\u7528 127.0.0.1, docker \u4E2D\u4E5F\u4F1A\u65E0\u6CD5\u8BBF\u95EE\n# echo 'listen-address=127.0.0.1' >> /etc/dnsmasq.conf\necho 'resolv-file=/etc/resolv.dnsmasq.conf' >> /etc/dnsmasq.d/local.conf\n# \u6DFB\u52A0 dns\necho 'nameserver 223.5.5.5' >> /etc/resolv.dnsmasq.conf\necho 'nameserver 114.114.114.114' >> /etc/resolv.dnsmasq.conf\n# \u8FD9\u91CC\u914D\u7F6E 127.0.0.1, docker \u4E0D\u4F1A\u4F7F\u7528, \u5EFA\u8BAE\u914D\u7F6E 172.17.0.1 \u6216\u8005\u5B9E\u9645\u9759\u6001 ip\necho 'nameserver 127.0.0.1' > /etc/resolv.conf\n# \u5982\u679C\u6709 Docker \u5EFA\u8BAE\u914D\u7F6E 172.17.0.1\n# echo 'nameserver 172.17.0.1' > /etc/resolv.conf\n\n# \u6D4B\u8BD5\u914D\u7F6E\ndnsmasq --test\ndnsmasq -C /etc/dnsmasq.conf --no-daemon # \u524D\u53F0\u6D4B\u8BD5\u542F\u52A8\n\n# \u542F\u52A8\u670D\u52A1\nrc-service dnsmasq start\nrc-update add dnsmasq\n\n# \u65E5\u5FD7\u8C03\u8BD5\n# \u8FD8\u53EF\u4EE5\u5F00\u542F log-dhcp\necho 'log-queries' > /etc/dnsmasq.d/log.conf\n# \u670D\u52A1\u91CD\u542F\nrc-service dnsmasq restart\n# \u67E5\u770B\u6D88\u606F\ntail -f /var/log/message\n\n# macOS \u5B89\u88C5 - \u53EF\u4EE5\u4F7F\u7528 dnsmasq \u6765\u66FF\u4EE3 hosts\nbrew install dnsmasq\n# \u914D\u7F6E\u6587\u4EF6 /usr/local/etc/dnsmasq.\ncat << CONF > /usr/local/etc/dnsmasq.conf\n# \u4E0A\u6E38\nserver=114.114.114.114\nserver=223.5.5.5\nserver=223.6.6.6\n\n# \u7F13\u5B58\u6570\u91CF\ncache-size=655360\n# 10m \u7F13\u5B58\u65F6\u95F4\nmin-cache-ttl=600\n\n# \u81EA\u5B9A\u4E49\u89E3\u6790 - \u66FF\u4EE3 /etc/hosts\n# \u6240\u6709 *.localhost \u90FD\u4F1A\u88AB\u89E3\u6790\u5230\u8BE5\u5730\u5740\naddress=/localhost/127.0.0.1\n# \u5176\u4ED6\u6D4B\u8BD5\u670D\u52A1\u5730\u5740\naddress=/cluster.internal/192.168.1.2\naddress=/cluster.lan/192.168.1.3\nCONF\n# \u9A8C\u8BC1\u80FD\u542F\u52A8\nsudo dnsmasq -d -C /usr/local/etc/dnsmasq.conf\n# \u6CA1\u95EE\u9898\u540E\u4F7F\u7528 brew \u542F\u52A8\nbrew service start dnsmasq\n\nsudo dnsmasq -d -C /etc/dnsmasq.conf\necho 'echo \"$interface\" \"$*\"' > udhcpc.sh\nchmod +x udhcpc.sh\nsudo udhcpc -i eth0 -s $PWD/udhcpc.sh\n\nss -ln | grep '53|67'\nsudo tcpdump -i eth0 -vvv -s 1500 '((port 67 or port 68) and (udp[8:1] = 0x1))'\n"})})]})}function h(n={}){let{wrapper:e}={...(0,c.a)(),...n.components};return e?(0,d.jsx)(e,{...n,children:(0,d.jsx)(o,{...n})}):o(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return i},a:function(){return t}});var r=s(75271);let d={},c=r.createContext(d);function t(n){let e=r.useContext(c);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:t(n.components),r.createElement(c.Provider,{value:e},n.children)}}}]);