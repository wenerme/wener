"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48566"],{30390:function(e,s,n){n.r(s),n.d(s,{metadata:()=>t,contentTitle:()=>i,default:()=>k,assets:()=>c,toc:()=>o,frontMatter:()=>a});var t=JSON.parse('{"id":"devops/kubernetes/distro/k0s/k0sctl","title":"k0sctl","description":"- [k0sctl]","source":"@site/../notes/devops/kubernetes/distro/k0s/k0sctl.md","sourceDirName":"devops/kubernetes/distro/k0s","slug":"/devops/kubernetes/distro/k0s/k0sctl","permalink":"/notes/devops/kubernetes/distro/k0s/k0sctl","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/distro/k0s/k0sctl.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1675953425000,"frontMatter":{"title":"k0sctl"},"sidebar":"docs","previous":{"title":"K0S FAQ","permalink":"/notes/devops/kubernetes/distro/k0s/faq"},"next":{"title":"K3S","permalink":"/notes/devops/kubernetes/distro/k3s/"}}'),r=n("52676"),l=n("79938");let a={title:"k0sctl"},i="k0sctl",c={},o=[{value:"k0sctl.yaml",id:"k0sctlyaml",level:2}];function d(e){let s={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"k0sctl",children:"k0sctl"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"https://github.com/k0sproject/k0sctl",children:"k0sctl"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"\u8F85\u52A9\u63A7\u5236\u7BA1\u7406\u5DE5\u5177"}),"\n",(0,r.jsx)(s.li,{children:"\u6279\u91CF\u5B89\u88C5\u90E8\u7F72\u96C6\u7FA4 - ssh"}),"\n",(0,r.jsx)(s.li,{children:"\u5907\u4EFD\u3001\u6062\u590D\u3001\u5B89\u88C5\u3001\u5378\u8F7D\u3001\u5347\u7EA7"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"https://github.com/k0sproject/rig",children:"k0sproject/rig"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"SSH+WinRM \u8FDC\u7A0B\u5E93"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"alpine \u9ED8\u8BA4\u4F1A\u5B89\u88C5 findutils \u548C coreutils \u6765\u6EE1\u8DB3 k0sctl \u7684\u529F\u80FD"}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"export DISABLE_TELEMETRY=true\nexport DISABLE_UPGRADE_CHECK=true\n\n# --k0s \u5305\u542B\u5B8C\u6574 k0s \u914D\u7F6E\nk0sctl init --k0s > k0sctl.yaml\n# \u4FEE\u6539 k0sctl.yaml\n# -d \u8F93\u51FA debug \u4FE1\u606F - \u5305\u542B\u6267\u884C\u7684\u547D\u4EE4\nk0sctl apply --config k0sctl.yaml\n\nk0sctl kubeconfig > kubeconfig\nkubectl get pods --kubeconfig kubeconfig -A\n"})}),"\n",(0,r.jsx)(s.h2,{id:"k0sctlyaml",children:"k0sctl.yaml"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"# k0s k0s-v1.23.3+k0s.1-amd64\ncurl -LOC- 'https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-v1.23.3+k0s.1-amd64'\n# airgap k0s-airgap-bundle-v1.23.3+k0s.1-amd64\ncurl -LOC- 'https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-airgap-bundle-v1.23.3+k0s.1-amd64'\n\n# \u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5236\u4F5C airgap \u5305\nk0s airgap list-images | xargs -I{} docker pull {}\ndocker image save $(k0s airgap list-images | xargs) -o bundle_file\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="k0sctl.yaml"',children:"apiVersion: k0sctl.k0sproject.io/v1beta1\nkind: Cluster\nmetadata:\n  name: my-cluster\nspec:\n  hosts:\n    - ssh:\n        address: 10.0.0.1\n        user: admin\n        port: 22\n        keyPath: ~/.ssh/id_rsa\n      role: controller+worker\n  k0s:\n    version: 1.23.3+k0s.1\n    config: # k0s.yaml\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="spec.hosts"',children:'# \u89D2\u8272 - \u4E0D\u63A8\u8350\u4F7F\u7528 single\n# controller, controller+worker, single, worker\nrole:\n# \u5148\u4E0B\u8F7D\u5230\u672C\u5730\uFF0C\u518D\u4ECE\u672C\u5730\u4E0A\u4F20 - \u63A8\u8350\u5F00\u542F\nuploadBinary: true\nk0sBinaryPath:\n\nhostname:\ninstallFlags: []\nenvironment:\n# \u5B9A\u4E49\u4E0A\u4F20\u7684\u6587\u4EF6\nfiles:\n  - name: image-bundle\n    src: k0s-airgap-bundle-v1.23.3+k0s.1-amd64\n    dstDir: /var/lib/k0s/images/\n    dst:\n    dirPerm:\n    user:\n    group:\n    perm: 0700\n\nhooks:\n  apply:\n    before:\n      - date > k0sctl-apply.log\n    after:\n      - echo "apply success" > k0sctl-apply.log\n    reset:\nos:\n# \u9009\u62E9\u4F7F\u7528\u7684\u79C1\u6709\u7F51\u5361\nprivateInterface:\nprivateAddress:\nssh:\n  address: 10.0.0.2\n  user: ubuntu\n  keyPath: ~/.ssh/id_rsa\n  bastion:\n    address: 10.0.0.1\n    user: root\n    keyPath: ~/.ssh/id_rsa2\nlocalhost:\n  enabled: false\n'})})]})}function k(e={}){let{wrapper:s}={...(0,l.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,s,n){n.d(s,{Z:function(){return i},a:function(){return a}});var t=n(75271);let r={},l=t.createContext(r);function a(e){let s=t.useContext(l);return t.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(l.Provider,{value:s},e.children)}}}]);