"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36159"],{55444:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>p,assets:()=>a,toc:()=>d,frontMatter:()=>l});var r=JSON.parse('{"id":"os/virt/hyperv","title":"HyperV","description":"Tips","source":"@site/../notes/os/virt/hyperv.md","sourceDirName":"os/virt","slug":"/os/virt/hyperv","permalink":"/notes/os/virt/hyperv","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/hyperv.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1605179031000,"frontMatter":{"id":"hyperv","title":"HyperV"},"sidebar":"docs","previous":{"title":"HAXM","permalink":"/notes/os/virt/haxm"},"next":{"title":"ignite","permalink":"/notes/os/virt/ignite"}}'),i=t("52676"),s=t("79938");let l={id:"hyperv",title:"HyperV"},o="HyperV",a={},d=[{value:"Tips",id:"tips",level:2},{value:"\u542F\u52A8",id:"\u542F\u52A8",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"hyperv",children:"HyperV"})}),"\n",(0,i.jsx)(n.h2,{id:"tips",children:"Tips"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u73AF\u5883\u8981\u6C42\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Windows 10 \u4F01\u4E1A\u7248\u3001Pro\u3001\u6559\u80B2\u7248"}),"\n",(0,i.jsx)(n.li,{children:"64 bit \u5904\u7406\u5668\uFF0C\u652F\u6301 Second Level Address Translation (SLAT)"}),"\n",(0,i.jsx)(n.li,{children:"CPU \u652F\u6301 VM Monitor Mode Extension (VT-c on Intel CPUs)"}),"\n",(0,i.jsx)(n.li,{children:"4 GB \u5185\u5B58+"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u542F\u52A8",children:"\u542F\u52A8"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v",children:"Install Hyper-V on Windows 10"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Install-WindowsFeature-Name Hyper-V-Restart\n\n# \u542F\u7528 HyperV\nEnable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All\n"})})]})}function p(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return l}});var r=t(75271);let i={},s=r.createContext(i);function l(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);