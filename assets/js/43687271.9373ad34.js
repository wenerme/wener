"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["89433"],{32499:function(e,n,i){i.r(n),i.d(n,{metadata:()=>d,contentTitle:()=>l,default:()=>a,assets:()=>u,toc:()=>c,frontMatter:()=>r});var d=JSON.parse('{"id":"os/linux/dev/udev","title":"udev","description":"- udev","source":"@site/../notes/os/linux/dev/udev.md","sourceDirName":"os/linux/dev","slug":"/os/linux/dev/udev","permalink":"/notes/os/linux/dev/udev","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/dev/udev.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1623656447000,"frontMatter":{"title":"udev"},"sidebar":"docs","previous":{"title":"PCI","permalink":"/notes/os/linux/dev/pci"},"next":{"title":"USB over IP","permalink":"/notes/os/linux/dev/usbip"}}'),s=i("52676"),t=i("79938");let r={title:"udev"},l="udev",u={},c=[{value:"unable to create temporary db file &#39;/run/udev/data/c189:39.tmp&#39;: Permission denied",id:"unable-to-create-temporary-db-file-runudevdatac18939tmp-permission-denied",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"udev",children:"udev"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["udev\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"systemd \u4E00\u90E8\u5206"}),"\n",(0,s.jsxs)(n.li,{children:["wikipedia ",(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Udev",children:"udev"})]}),"\n",(0,s.jsxs)(n.li,{children:["archlinux ",(0,s.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/udev",children:"udev"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["eudev\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Gentoo's fork of udev"}),"\n",(0,s.jsxs)(n.li,{children:["gentoo wiki ",(0,s.jsx)(n.a,{href:"https://wiki.gentoo.org/wiki/Eudev",children:"eudev"})]}),"\n",(0,s.jsx)(n.li,{children:"\u975E systemd \u73AF\u5883\u4E00\u822C\u4F7F\u7528 eudev"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"busybox \u7684 mdev \u662F\u4E2A\u66F4\u52A0\u7B80\u5316\u7684\u7248\u672C"}),"\n",(0,s.jsxs)(n.li,{children:["\u529F\u80FD\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u8BBE\u5907\u7BA1\u7406\u5668"}),"\n",(0,s.jsx)(n.li,{children:"\u53D6\u4EE3 hotplug\uFF0Chwdetect"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/etc/udev/rules.d/*.rules"})}),"\n",(0,s.jsx)(n.li,{children:"/etc/udev/rules.d"}),"\n",(0,s.jsx)(n.li,{children:"/run/udev/rules.d"}),"\n",(0,s.jsx)(n.li,{children:"/lib/udev/rules.d"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/micronucleus/micronucleus/blob/master/commandline/49-micronucleus.rules",children:"https://github.com/micronucleus/micronucleus/blob/master/commandline/49-micronucleus.rules"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apk add eudev\nservice udev start\nrc-update add udev sysinit\n\nudevadm monitor\n\n# \u8BBE\u5907\u4FE1\u606F\nudevadm info -p /devices/pci0000:00/0000:00:14.0/usb1/1-1\nudevadm info -q path -n input/mouse1\nudevadm test /devices/pci0000:00/0000:00:14.0/usb1/1-1\n\nudevadm control --reload-rules\n"})}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"unable-to-create-temporary-db-file-runudevdatac18939tmp-permission-denied",children:"unable to create temporary db file '/run/udev/data/c189:39.tmp': Permission denied"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"udevadm test \u51FA\u73B0"}),"\n",(0,s.jsx)(n.li,{children:"\u4F7F\u7528 sudo \u5373\u53EF"}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return l},a:function(){return r}});var d=i(75271);let s={},t=d.createContext(s);function r(e){let n=d.useContext(t);return d.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),d.createElement(t.Provider,{value:n},e.children)}}}]);