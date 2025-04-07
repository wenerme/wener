"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["57191"],{63080:function(e,n,t){t.r(n),t.d(n,{metadata:()=>o,contentTitle:()=>a,default:()=>h,assets:()=>s,toc:()=>c,frontMatter:()=>l});var o=JSON.parse('{"id":"os/linux/hardware/linux-hardware-faq","title":"Linux Hardware FAQ","description":"Intel Corporation Ethernet Connection (2) I219-V notworking","source":"@site/../notes/os/linux/hardware/linux-hardware-faq.md","sourceDirName":"os/linux/hardware","slug":"/os/linux/hardware/faq","permalink":"/notes/os/linux/hardware/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/hardware/linux-hardware-faq.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1615902468000,"frontMatter":{"title":"Linux Hardware FAQ"},"sidebar":"docs","previous":{"title":"dmidecode","permalink":"/notes/os/linux/hardware/dmidecode"},"next":{"title":"NVME","permalink":"/notes/os/linux/hardware/nvme"}}'),r=t("52676"),i=t("79938");let l={title:"Linux Hardware FAQ"},a=void 0,s={},c=[{value:"Intel Corporation Ethernet Connection (2) I219-V notworking",id:"intel-corporation-ethernet-connection-2-i219-v-notworking",level:2},{value:"e1000e - The NVM Checksum Is Not Valid",id:"e1000e---the-nvm-checksum-is-not-valid",level:2}];function d(e){let n={a:"a",code:"code",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"intel-corporation-ethernet-connection-2-i219-v-notworking",children:"Intel Corporation Ethernet Connection (2) I219-V notworking"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"e1000e"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://ark.intel.com/content/www/us/en/ark/products/82186/intel-ethernet-connection-i219-v.html",children:"I219-V"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"dmesg | grep e1000e\n# e1000e: Intel(R) PRO/1000 Network Driver - 3.2.6-k\n# e1000e: Copyright(c) 1999 - 2015 Intel Corporation.\n# e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode\n# e1000e 0000:00:1f.6: The NVM Checksum Is Not Valid\n# e1000e: probe of 0000:00:1f.6 failed with error -5\n\nlspci -s 0000:00:1f.6\n# 00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection (2) I219-V\n"})}),"\n",(0,r.jsx)(n.h2,{id:"e1000e---the-nvm-checksum-is-not-valid",children:"e1000e - The NVM Checksum Is Not Valid"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://mynixworld.info/2012/12/05/e1000e-the-nvm-checksum-is-not-valid/",children:"https://mynixworld.info/2012/12/05/e1000e-the-nvm-checksum-is-not-valid/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://downloadcenter.intel.com/download/29137",children:"Intel\xae Ethernet Connections Boot Utility, Preboot Images, and EFI Drivers"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# download preboot\ncurl -LO https://downloadmirror.intel.com/29137/eng/Preboot.tar.gz\ntar zxvf Preboot.tar.gz\ncd APPS/BootUtil/Linux_x64\nchmod +x ./bootutil64e\n\n# Alpine compact\napk add gcompat\nmkdir -p /lib64\nln -s /lib/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2\n\n# fix\n./bootutil64e -NIC 1 -defcfg\n\n# done\nreboot\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return l}});var o=t(75271);let r={},i=o.createContext(r);function l(e){let n=o.useContext(i);return o.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);