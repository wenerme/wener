"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["13333"],{52441:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>l,default:()=>m,assets:()=>a,toc:()=>d,frontMatter:()=>o});var s=JSON.parse('{"id":"os/virt/esxi","title":"ESXi","description":"- wikipedia VMFS","source":"@site/../notes/os/virt/esxi.md","sourceDirName":"os/virt","slug":"/os/virt/esxi","permalink":"/notes/os/virt/esxi","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/esxi.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1624798319000,"frontMatter":{"title":"ESXi"},"sidebar":"docs","previous":{"title":"edk2","permalink":"/notes/os/virt/edk2"},"next":{"title":"Firecracker","permalink":"/notes/os/virt/firecracker"}}'),r=t("52676"),i=t("79938");let o={title:"ESXi"},l="ESXi",a={},d=[{value:"esxcli",id:"esxcli",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"esxi",children:"ESXi"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["wikipedia ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/VMware_VMFS",children:"VMFS"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/VMware_ESXi",children:"VMware ESXi"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Elastic Sky X integrated"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/vsphere/vmw-feature-comparison.pdf",children:"VMware vSphere\xae Feature Comparison"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.vmware.com/reusable_content/vsphere_pricing.html",children:"Pricing"})}),"\n",(0,r.jsx)(n.li,{children:".vmx, .vmdk, .vmsd, .vmsn"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Item"}),(0,r.jsx)(n.th,{children:"Free"}),(0,r.jsx)(n.th,{children:"Paid"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"physical CPUs"}),(0,r.jsx)(n.td,{children:"2"}),(0,r.jsx)(n.td,{children:"768"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"physical memory"}),(0,r.jsx)(n.td,{children:"16TB"}),(0,r.jsx)(n.td,{children:"16TB"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"vCPUs per VM"}),(0,r.jsx)(n.td,{children:"8 vCPUs"}),(0,r.jsx)(n.td,{children:"256 vCPUs"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"vRAM per VM"}),(0,r.jsx)(n.td,{children:"6TB"}),(0,r.jsx)(n.td,{children:"6TB"})]})]})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"qemu-img convert -f qcow2 -O vmdk -o adapter_type=lsilogic,subformat=streamOptimized,compat6 SC-1.qcow2 SC-1.vmdk\n\n# https://github.com/alpinelinux/alpine-make-vm-image#creating-image-for-vmware-esxi\nqemu-img convert -f qcow2 -O vmdk -o adapter_type=lsilogic,subformat=monolithicFlat alpine.qcow2 alpine.vmdk\n"})}),"\n",(0,r.jsx)(n.h2,{id:"esxcli",children:"esxcli"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://code.vmware.com/docs/11743/esxi-7-0-esxcli-command-reference",children:"ESXi 7.0 ESXCLI Command Reference"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u670D\u52A1\u5668\u4FE1\u606F\nesxcli --server myESXi --username user1 --password 'my_password' --thumbprint\n\n# \u8F93\u51FA\u683C\u5F0F\nesxcli --formatter=csv storage filesystem list\n\nesxcli --server MyVC --vihost MyESXi storage filesystem list\n\n# \u5347\u7EA7\nesxcli software vib\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u7CFB\u7EDF\u7BA1\u7406\n# ==========\n# \u7EF4\u62A4\u6A21\u5F0F\nsystem maintenanceMode set --enable true\n\n# system module list --module=<module_name>\nsystem module list --enabled=true\nsystem module list --loaded=true\n# \u542F\u7528\nsystem module set --module=<module_name> --enabled=true\n# \u53C2\u6570\nsystem module parameters set --module=<module_name> --parameter-string=<parameter_string>\n# \u9A8C\u8BC1\nsystem module parameters list --module=<module_name>\n\n\n# \u7EC4\u4EF6\u7BA1\u7406\n# ==========\n# \u7CFB\u7EDF\u7EC4\u4EF6\nsoftware component list\n# \u7EC4\u4EF6\u4FE1\u606F <component_name>:<version>\nsoftware component get -n <component_name>\nsoftware baseimage get\nsoftware addon get\n# \u4ED3\u5E93 - index.xml \u6216\u8005 zip\nsoftware sources component list -d <depot_url_or_offline_bundle_path>\n# \u8BE6\u7EC6\u4FE1\u606F\nsoftware sources component get -n <component_name> -d <depot_url_or_offline_bundle_path>\n# \u5B89\u88C5\nsoftware component apply -n <component_name>:<version> -d <depot_url_or_offline_bundle_path>\n# \u79FB\u9664\nsoftware component remove -n <component_name>\n\n# \u7BA1\u7406 baseimage\nsoftware sources baseimage list -d <depot_url_or_offline_bundle_path>\nsoftware sources baseimage get -b <base_image_version> -d <depot_url_or_offline_bundle_path>\nsoftware sources addon list -d <depot_url_or_offline_bundle_path>\nsoftware sources addon get -a <add-on_name> -d <depot_url_or_offline_bundle_path>\n\n# \u901A\u8FC7 JSON \u914D\u7F6E\nsoftware apply -s <location_of_software_spec>.json -d <depot_url_or_offline_bundle_path>\n\n\n# \u5B58\u50A8\u7BA1\u7406\n# ==========\n# \u6302\u8F7D\u7684\u5377\nstorage filesystem list\n# \u5378\u8F7D\nstorage filesystem unmount\n# \u5FEB\u7167\nstorage vmfs\n\n# \u6302\u8F7D\nstorage filesystem volume mount --volume-label=<label>|--volume-uuid=<VMFSUUID>\n# \u5378\u8F7D\nstorage filesystem volume unmount --volume-label=<label>|--volume-uuid=<VMFSUUID>\n\n# \u5FEB\u7167\u5217\u8868\nstorage vmfs snapshot list\nstorage filesystem unmount\nstorage vmfs snapshot resignature --volume-label=<label>|--volume-uuid=<id>\n"})})]})}function m(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return o}});var s=t(75271);let r={},i=s.createContext(r);function o(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);