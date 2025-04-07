"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48467"],{5622:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>a,default:()=>o,assets:()=>c,toc:()=>d,frontMatter:()=>r});var s=JSON.parse('{"id":"languages/c/arm-build","title":"ARM Build","description":"- alpine \u5305\u542B gcc-arm-none-eabi - \u9002\u7528\u4E8E arm \u88F8\u673A","source":"@site/../notes/languages/c/arm-build.md","sourceDirName":"languages/c","slug":"/languages/c/arm-build","permalink":"/notes/languages/c/arm-build","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/c/arm-build.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1619595507000,"frontMatter":{"title":"ARM Build"},"sidebar":"docs","previous":{"title":"\u8BED\u8A00","permalink":"/notes/languages/"},"next":{"title":"binutils","permalink":"/notes/languages/c/binutils"}}'),t=i("52676"),l=i("79938");let r={title:"ARM Build"},a="ARM Build",c={},d=[{value:"sorry, unimplemented: -mfloat-abi=hard and VFP",id:"sorry-unimplemented--mfloat-abihard-and-vfp",level:2},{value:"Source object /tmp/out.o has EABI version 0, but target test has EABI version 5",id:"source-object-tmpouto-has-eabi-version-0-but-target-test-has-eabi-version-5",level:2},{value:"cannot find libgcc_s.so.1",id:"cannot-find-libgcc_sso1",level:2}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"arm-build",children:"ARM Build"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"alpine \u5305\u542B gcc-arm-none-eabi - \u9002\u7528\u4E8E arm \u88F8\u673A"}),"\n",(0,t.jsxs)(e.li,{children:["debian ",(0,t.jsx)(e.a,{href:"https://packages.debian.org/unstable/gcc-arm-linux-gnueabi",children:"gcc-arm-linux-gnueabi"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6700\u65E9\u7248\u672C 6"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["EABI - Embedded ABI\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:'family of ABIs and one of the "subABIs" is GNU EABI'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["EABI4\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"arm v5t linux 2.4.17"}),"\n",(0,t.jsx)(e.li,{children:"gcc 3 - \u5F88\u96BE\u627E"}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"-mabi=aapcs-linux -mfloat-abi=soft -meabi=4"})}),"\n",(0,t.jsx)(e.li,{children:"arm-unknown-linux-gnueabi"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["EABI5 - \u73B0\u5728\u9ED8\u8BA4 - hf\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"armv6-alpine-linux-muslgnueabihf"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://wiki.debian.org/ArmEabiPort",children:"ArmEabiPort"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.8/",children:"https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.8/"})}),"\n",(0,t.jsxs)(e.li,{children:["gcc\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html",children:"ARM-Options"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"-mabi=aapcs-linux -marm -mthumb-interwork"}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"# EABI version\ngcc -dumpmachine\nreadelf -h libsqlite3.so | grep Flags\n\necho 'int main(){}' > test.c\ngcc -o test test.c\n# \u9ED8\u8BA4\nfile test\n\n# \u67E5\u770B\u662F\u5426 VFP\nreadelf -A test | grep VFP\n\ngcc -print-multi-lib\n\n# \u9884\u8BBE\u67B6\u6784\ngcc -Q --help=target\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"-mabi"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"http://kanj.github.io/elfs/book/armMusl/cross-tools/abi.html",children:"ABI Variables"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"Kernel"}),(0,t.jsx)(e.th,{children:"ABI"}),(0,t.jsx)(e.th,{children:"CLFS_ABI=Value"}),(0,t.jsx)(e.th,{children:"Note"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CONFIG_AEABI"}),(0,t.jsx)(e.td,{children:"aapcs-linux"}),(0,t.jsx)(e.td,{children:"aapcs-linux"}),(0,t.jsx)(e.td,{children:"EABI. Linux 32 bit (int) enums"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"-"}),(0,t.jsx)(e.td,{children:"apcs-gnu"}),(0,t.jsx)(e.td,{children:"apcs-gnu"}),(0,t.jsx)(e.td,{children:"OABI"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CONFIG_THUMB2_KERNEL"}),(0,t.jsx)(e.td,{children:"atpcs"}),(0,t.jsx)(e.td,{children:"atpcs"}),(0,t.jsx)(e.td,{children:"Thumb ABI"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"-"}),(0,t.jsx)(e.td,{children:"aapcs"}),(0,t.jsx)(e.td,{children:"aapcs"}),(0,t.jsx)(e.td,{children:"EABI w/ variable size enums"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CONFIG_IWMMXT"}),(0,t.jsx)(e.td,{children:"iwmmxt"}),(0,t.jsx)(e.td,{children:"iwmmxt"}),(0,t.jsx)(e.td,{children:"Intel XScale MMX"})]})]})]}),"\n",(0,t.jsx)(e.h2,{id:"sorry-unimplemented--mfloat-abihard-and-vfp",children:"sorry, unimplemented: -mfloat-abi=hard and VFP"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"-mfloat-abi=soft"}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"gcc -march=?\n"})}),"\n",(0,t.jsx)(e.h2,{id:"source-object-tmpouto-has-eabi-version-0-but-target-test-has-eabi-version-5",children:"Source object /tmp/out.o has EABI version 0, but target test has EABI version 5"}),"\n",(0,t.jsx)(e.p,{children:"\u6DF7\u5408\u4E86 OABI \u548C EABI"}),"\n",(0,t.jsx)(e.h2,{id:"cannot-find-libgcc_sso1",children:"cannot find libgcc_s.so.1"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"-mabi=aapcs-linux"}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"apk add libgcc\n"})})]})}function o(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return a},a:function(){return r}});var s=i(75271);let t={},l=s.createContext(t);function r(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:r(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);