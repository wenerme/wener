"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["2485"],{36093:function(n,i,e){e.r(i),e.d(i,{metadata:()=>t,contentTitle:()=>d,default:()=>u,assets:()=>o,toc:()=>c,frontMatter:()=>s});var t=JSON.parse('{"id":"devops/infra/cloud-init","title":"Cloud Init","description":"- cloud-init.io / cloud-init","source":"@site/../notes/devops/infra/cloud-init.md","sourceDirName":"devops/infra","slug":"/devops/infra/cloud-init","permalink":"/notes/devops/infra/cloud-init","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/infra/cloud-init.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"Cloud Init"},"sidebar":"docs","previous":{"title":"Boundary","permalink":"/notes/devops/infra/boundary"},"next":{"title":"elemental","permalink":"/notes/devops/infra/elemental"}}'),l=e("52676"),r=e("79938");let s={title:"Cloud Init"},d="cloud-init",o={},c=[];function a(n){let i={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.header,{children:(0,l.jsx)(i.h1,{id:"cloud-init",children:"cloud-init"})}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.a,{href:"https://cloud-init.io/",children:"cloud-init.io"})," / ",(0,l.jsx)(i.a,{href:"https://launchpad.net/cloud-init/",children:"cloud-init"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"Apply user data to your instances automatically"}),"\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"http://cloudinit.readthedocs.io/en/latest/index.html",children:"Document"})}),"\n",(0,l.jsxs)(i.li,{children:["GitHub mirror ",(0,l.jsx)(i.a,{href:"https://github.com/cloud-init/cloud-init",children:"cloud-init/cloud-init"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["AlpineLinux\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"https://pkgs.alpinelinux.org/packages?name=cloud-init&branch=edge",children:"cloud-init"})}),"\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"https://git.alpinelinux.org/cgit/aports/tree/testing/cloud-init/APKBUILD",children:"testing/cloud-init/APKBUILD"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["Ubuntu\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"https://help.ubuntu.com/community/CloudInit",children:"CloudInit"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["ArchLinux\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"https://wiki.archlinux.org/index.php/Cloud-init",children:"Cloud-init"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\u7279\u6027\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u914D\u7F6E\u81EA\u5B9A\u4E49 locale"}),"\n",(0,l.jsx)(i.li,{children:"\u914D\u7F6E hostname"}),"\n",(0,l.jsx)(i.li,{children:"\u751F\u6210 SSH \u5BC6\u94A5"}),"\n",(0,l.jsx)(i.li,{children:"\u914D\u7F6E\u4E34\u65F6\u6302\u8F7D\u70B9"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\u652F\u6301\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:["terraform-provider-libvirt ",(0,l.jsx)(i.a,{href:"https://github.com/dmacvicar/terraform-provider-libvirt/blob/master/website/docs/r/cloudinit.html.markdown",children:"libvirt_cloudinit_disk"})]}),"\n",(0,l.jsxs)(i.li,{children:["Ansible ",(0,l.jsx)(i.a,{href:"https://docs.ansible.com/ansible/latest/modules/cloud_init_data_facts_module.html",children:"cloud_init_data_facts_module"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u83B7\u53D6 cloud init \u914D\u7F6E\u4FE1\u606F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-bash",children:"# < 3.13\n# ifupdown-ng\napk add ifupdown-ng iproute2-minimal -X https://mirrors.aliyun.com/alpine/edge/main/\napk add cloud-init -X https://mirrors.aliyun.com/alpine/edge/community/\n"})}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:(0,l.jsx)(i.a,{href:"https://gist.github.com/syntaqx/9dd3ff11fb3d48b032c84f3e31af9163",children:"cloud init to install docker on ubuntu"})}),"\n"]})]})}function u(n={}){let{wrapper:i}={...(0,r.a)(),...n.components};return i?(0,l.jsx)(i,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},79938:function(n,i,e){e.d(i,{Z:function(){return d},a:function(){return s}});var t=e(75271);let l={},r=t.createContext(l);function s(n){let i=t.useContext(r);return t.useMemo(function(){return"function"==typeof n?n(i):{...i,...n}},[i,n])}function d(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:s(n.components),t.createElement(r.Provider,{value:i},n.children)}}}]);