"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["31809"],{4311:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>d,default:()=>a,assets:()=>c,toc:()=>o,frontMatter:()=>l});var s=JSON.parse('{"id":"os/linux/sys/dtb","title":"dtb","description":"- dtb - Device Tree Blob - device tree binary","source":"@site/../notes/os/linux/sys/dtb.md","sourceDirName":"os/linux/sys","slug":"/os/linux/sys/dtb","permalink":"/notes/os/linux/sys/dtb","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/sys/dtb.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1674970578000,"frontMatter":{"title":"dtb"},"sidebar":"docs","previous":{"title":"Linux Kernel \u65E5\u5FD7\u5E38\u89C1\u95EE\u9898","permalink":"/notes/os/linux/sys/dmesg-faq"},"next":{"title":"IOPS","permalink":"/notes/os/linux/sys/iops"}}'),r=i("52676"),t=i("79938");let l={title:"dtb"},d="Device Tree",c={},o=[{value:"Device Tree",id:"device-tree-1",level:2},{value:"References",id:"references",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"device-tree",children:"Device Tree"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["dtb - Device Tree Blob - device tree binary\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"hardware layout description"}),"\n",(0,r.jsx)(n.li,{children:"platform identification"}),"\n",(0,r.jsx)(n.li,{children:"runtime configuration"}),"\n",(0,r.jsx)(n.li,{children:"device population"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"arch/<arch>/boot/dts/<board>"})}),"\n",(0,r.jsxs)(n.li,{children:["CONFIG_ARM_APPENDED_DTB - dtb \u5728 kernel \u4E4B\u540E\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"cat zImage board.dtb > my-zImage; mkimage ... -d my-zImage my-uImage"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["CONFIG_ARM_ATAG_DTB_COMPAT\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"read ATAGS, update DT"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Embedded Power Architecture Platform Requirements (ePAPR)"}),"\n",(0,r.jsxs)(n.li,{children:["Device Tree Source - DTS\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[".dts - board-level definitions\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u6700\u7EC8\u7684 - include \u591A\u4E2A dtsi"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:".dtsi - included files, generally containing SoC-level definitions"}),"\n",(0,r.jsxs)(n.li,{children:["e.g ",(0,r.jsx)(n.a,{href:"https://github.com/torvalds/linux/tree/master/arch/arm64/boot/dts",children:"arch/arm64/boot/dts"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Device Tree Compiler\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/torvalds/linux/tree/master/scripts/dtc",children:"scripts/dtc"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Documentation/devicetree/bindings"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"device-tree-1",children:"Device Tree"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"cpus"}),"\n",(0,r.jsx)(n.li,{children:"memory"}),"\n",(0,r.jsxs)(n.li,{children:["chosen\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"defines parameters chosen or defined by the system firmware at boot time"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"aliases"}),"\n",(0,r.jsx)(n.li,{children:"buses"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-dts",children:'/ {\nmodel = "Freescale i.MX28 Evaluation Kit";\ncompatible = "fsl,imx28-evk", "fsl,imx28";\nmemory {\n  reg = <0x40000000 0x08000000>;\n};\napb@80000000 {\n  apbh@80000000 {  };\n  apbx@80040000 {  };\n};\nahb@80080000 {  };\nsound {  };\nleds {  };\nbacklight {  };\n};\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"of_machine_is_compatible"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Device_tree",children:"Device tree"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://lonzoc.gitbooks.io/device-tree-guide/content/devicetree_basic.html",children:"https://lonzoc.gitbooks.io/device-tree-guide/content/devicetree_basic.html"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://elinux.org/Device_Tree_Reference",children:"https://elinux.org/Device_Tree_Reference"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://elinux.org/Device_Tree_Usage",children:"https://elinux.org/Device_Tree_Usage"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://docs.kernel.org/devicetree/usage-model.html",children:"https://docs.kernel.org/devicetree/usage-model.html"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.devicetree.org/",children:"https://www.devicetree.org/"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-device-tree-dummies.pdf",children:"https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-device-tree-dummies.pdf"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["bootloader\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"before device tree - r1=machine_type, r2=ptr to ATAGS"}),"\n",(0,r.jsx)(n.li,{children:"boot with device tree - r2=ptr to DTB"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return d},a:function(){return l}});var s=i(75271);let r={},t=s.createContext(r);function l(e){let n=s.useContext(t);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);