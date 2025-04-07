"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["95017"],{92377:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>t,default:()=>o,assets:()=>d,toc:()=>h,frontMatter:()=>c});var r=JSON.parse('{"id":"devops/kubernetes/distro/k3s/README","title":"K3S","description":"- \u8282\u70B9\u7684\u540D\u5B57\u9700\u8981\u552F\u4E00","source":"@site/../notes/devops/kubernetes/distro/k3s/README.md","sourceDirName":"devops/kubernetes/distro/k3s","slug":"/devops/kubernetes/distro/k3s/","permalink":"/notes/devops/kubernetes/distro/k3s/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/distro/k3s/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717134008000,"frontMatter":{"title":"K3S"},"sidebar":"docs","previous":{"title":"k0sctl","permalink":"/notes/devops/kubernetes/distro/k0s/k0sctl"},"next":{"title":"K3S in Docker","permalink":"/notes/devops/kubernetes/distro/k3s/k3d"}}'),i=s("52676"),l=s("79938");let c={title:"K3S"},t="K3S",d={},h=[{value:"k3s server",id:"k3s-server",level:2},{value:"get.k3s.io",id:"getk3sio",level:3},{value:"\u624B\u52A8\u955C\u50CF\u5B89\u88C5",id:"\u624B\u52A8\u955C\u50CF\u5B89\u88C5",level:2},{value:"\u624B\u52A8\u5B89\u88C5\u542F\u52A8",id:"\u624B\u52A8\u5B89\u88C5\u542F\u52A8",level:2},{value:"containerd",id:"containerd",level:2},{value:"registries",id:"registries",level:2},{value:"\u7B14\u8BB0",id:"\u7B14\u8BB0",level:2},{value:"\u4EE3\u7406\u8282\u70B9\u6CE8\u518C\u903B\u8F91",id:"\u4EE3\u7406\u8282\u70B9\u6CE8\u518C\u903B\u8F91",level:3},{value:"\u5FEB\u901F\u542F\u52A8",id:"\u5FEB\u901F\u542F\u52A8",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"k3s",children:"K3S"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u8282\u70B9\u7684\u540D\u5B57\u9700\u8981\u552F\u4E00\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u4F7F\u7528 hostname"}),"\n",(0,i.jsxs)(n.li,{children:["\u53EF\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"K3S_NODE_NAME"})," \u6216 ",(0,i.jsx)(n.code,{children:"--node-name"})," \u4FEE\u6539"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["k3s \u4F1A\u8BFB\u53D6 ",(0,i.jsx)(n.code,{children:"/etc/machine-id"})," \u6216 ",(0,i.jsx)(n.code,{children:"/var/lib/dbus/machine-id"})," \u4F5C\u4E3A\u8282\u70B9 UUID"]}),"\n",(0,i.jsxs)(n.li,{children:["kubconfig \u6587\u4EF6 ",(0,i.jsx)(n.code,{children:"/etc/rancher/k3s/k3s.yaml"})]}),"\n",(0,i.jsx)(n.li,{children:"\u90E8\u7F72 traefik \u4F5C\u4E3A ingress"}),"\n"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/k3s-io/k3s",children:"k3s-io/k3s"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/installation/installation-requirements/",children:"\u73AF\u5883\u8981\u6C42"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Linux 3.10+"}),"\n",(0,i.jsx)(n.li,{children:"Server \u5185\u5B58 512 MB+"}),"\n",(0,i.jsx)(n.li,{children:"Agent \u5185\u5B58 75 MB"}),"\n",(0,i.jsx)(n.li,{children:"\u78C1\u76D8 200 MB"}),"\n",(0,i.jsx)(n.li,{children:"\u67B6\u6784 x86_64, ARMv7, ARM64"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup",children:"AlpineLinux \u989D\u5916\u914D\u7F6E"})}),"\n",(0,i.jsxs)(n.li,{children:["Production\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Small <= 10 \u8282\u70B9 - Server 2C4G - Database 1C2G"}),"\n",(0,i.jsx)(n.li,{children:"Medium <= 100 \u8282\u70B9 - Server 4C8G - Database 2C8G"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7AEF\u53E3\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"6443 - server - \u8282\u70B9\u901A\u4FE1 - Kubernetes API"}),"\n",(0,i.jsx)(n.li,{children:"6444"}),"\n",(0,i.jsx)(n.li,{children:"8472/udp - server/agent - Flannel VXLAN"}),"\n",(0,i.jsx)(n.li,{children:"10250 - server/agent - kubelet"}),"\n",(0,i.jsx)(n.li,{children:"10251"}),"\n",(0,i.jsx)(n.li,{children:"10010 - containerd"}),"\n",(0,i.jsx)(n.li,{children:"10248 - 10252"}),"\n",(0,i.jsx)(n.li,{children:"10249 - kube-prpxy"}),"\n",(0,i.jsx)(n.li,{children:"30518"}),"\n",(0,i.jsx)(n.li,{children:"30643"}),"\n",(0,i.jsx)(n.li,{children:"46517"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["K3S \u7EC4\u4EF6 - \u5B89\u88C5\u65F6\u53EF\u7981\u7528\u5185\u7F6E\u7EC4\u4EF6 ",(0,i.jsx)(n.code,{children:"--disable"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"containerd - \u53EF\u9009\u7528 docker"}),"\n",(0,i.jsx)(n.li,{children:"Flannel"}),"\n",(0,i.jsxs)(n.li,{children:["coredns - CoreDNS\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u955C\u50CF ",(0,i.jsx)(n.code,{children:"rancher/coredns-coredns"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"CNI"}),"\n",(0,i.jsxs)(n.li,{children:["traefik - Ingress \u63A7\u5236\u5668\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u955C\u50CF ",(0,i.jsx)(n.code,{children:"rancher/library-traefik"})]}),"\n",(0,i.jsxs)(n.li,{children:["Traefik 2.0 integration - ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/issues/1141",children:"#1141"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"http 80"}),"\n",(0,i.jsx)(n.li,{children:"https 443"}),"\n",(0,i.jsx)(n.li,{children:"dash 8080"}),"\n",(0,i.jsx)(n.li,{children:"metric 9100"}),"\n",(0,i.jsx)(n.li,{children:"httpn 8880"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["servicelb - \u5185\u5D4C\u8D1F\u8F7D\u5747\u8861\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/k3s-io/klipper-lb",children:"k3s-io/klipper-lb"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/rancher/klipper-lb/blob/master/entry",children:"https://github.com/rancher/klipper-lb/blob/master/entry"})}),"\n",(0,i.jsx)(n.li,{children:"This works by using a host port for each service load balancer and setting up iptables to forward the request to the cluster IP. The regular k8s scheduler will find a free host port. If there are no free host ports, the service load balancer will stay in pending."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5185\u5D4C\u7F51\u7EDC\u7B56\u7565\u63A7\u5236\u5668"}),"\n",(0,i.jsx)(n.li,{children:"local-storage"}),"\n",(0,i.jsxs)(n.li,{children:["metrics-server\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u955C\u50CF ",(0,i.jsx)(n.a,{href:"https://hub.docker.com/r/rancher/metrics-server",children:"rancher/metrics-server"})]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/kubernetes-sigs/metrics-server",children:"kubernetes-sigs/metrics-server"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://medium.com/better-programming/b0b035c291a9",children:"Using a k3s Kubernetes Cluster for Your GitLab Project"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/architecture",children:"\u67B6\u6784"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u95EE\u9898\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4F7F\u7528 Nginx \u66FF\u4EE3 Traefik - ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/pull/1466/files",children:"#1466"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5DF2\u7ECF\u88AB\u56DE\u9000"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["K3S \u6709 ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/issues/684#issuecomment-517032871",children:"server-ca \u548C client-ca"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4 CSR \u662F\u4F7F\u7528 servert-ca\uFF0C\u5BFC\u81F4\u521B\u5EFA\u7684\u8BC1\u4E66\u65E0\u6CD5\u4F7F\u7528\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"issuer \u662F k3s-server-ca"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u9700\u8981\u4ECE\u670D\u52A1\u5668\u53D6 client-ca \u521B\u5EFA\u8BC1\u4E66"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/pull/1768",children:"#1768"})," - \u9ED8\u8BA4\u4F7F\u7528 ClientCA \u800C\u4E0D\u662F ServerCA"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/issues/684#issuecomment-517501120",children:"\u81EA\u884C\u521B\u5EFA\u811A\u672C"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u76EE\u524D(1.18) admin \u9ED8\u8BA4\u662F\u5BC6\u7801 - ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/issues/1616",children:"#1616"})," - \u9ED8\u8BA4\u4F7F\u7528\u8BC1\u4E66"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"/etc/rancher/node/password"}),"\n",(0,i.jsxs)(n.li,{children:["/var/lib/rancher/k3s/server/cred/node-passwd\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"kubectl -n kube-system delete secrets <agent-node-name>.node-password.k3s"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'apk add util-linux\n[ -f /etc/machine-id ] || ( uuidgen | sudo tee -a /etc/machine-id )\n\napk add wireguard-virt wireguard-tools\n\n# INSTALL_K3S_EXEC \u9ED8\u8BA4\u4E3A agent\n# flannel wireguard - https://github.com/coreos/flannel/blob/master/dist/extension-wireguard\nK3S_NODE_NAME=k3s-server INSTALL_K3S_EXEC="server --flannel-backend=wireguard" INSTALL_K3S_SKIP_START=true INSTALL_K3S_BIN_DIR=/opt/k3s/bin curl -sfL https://get.k3s.io | sh -\n\nk3s server --flannel-backend=wireguard\n\n# \u5982\u679C\u662F root \u5B89\u88C5 - \u4FEE\u6539\u4E0B kubeconfig \u6743\u9650\nsudo chmod a+r /etc/rancher/k3s/k3s.yaml\n# k3s \u9ED8\u8BA4\u4F1A\u8BBF\u95EE\u8BE5\u6587\u4EF6\n\n# \u5176\u4ED6\u8BBF\u95EE\nexport KUBECONFIG=/etc/rancher/k3s/k3s.yaml\n'})}),"\n",(0,i.jsx)(n.h2,{id:"k3s-server",children:"k3s server"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/",children:"k3s server \u914D\u7F6E"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/advanced/",children:"Advanced Options and Configuration"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"--docker"})," - \u4F7F\u7528 docker - \u9ED8\u8BA4 ",(0,i.jsx)(n.a,{href:"https://containerd.io/",children:"containerd"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5728 ",(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s/server/manifests"})," \u4E0B\u9762\u7684\u6587\u4EF6\u4F1A\u88AB\u81EA\u52A8\u90E8\u7F72 - kubectl apply\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u5B89\u88C5\u5185\u5BB9 - ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/tree/master/manifests",children:"rancher/k3s/tree/master/manifests"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"containerd"}),", \u542F\u52A8 agent \u7684\u65F6\u5019\u6DFB\u52A0 ",(0,i.jsx)(n.code,{children:"--docker"})," \u53EF\u4F7F\u7528 docker"]}),"\n",(0,i.jsxs)(n.li,{children:["\u9488\u5BF9 ",(0,i.jsx)(n.code,{children:"containerd"})," \u751F\u6210\u7684\u914D\u7F6E\u4F4D\u4E8E ",(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s/agent/etc/containerd/config.toml"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C\u5728\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E86 ",(0,i.jsx)(n.code,{children:"config.toml.tmpl"})," \u5219\u4F1A\u88AB\u4F7F\u7528"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6A21\u677F\u53EF\u8BBF\u95EE ",(0,i.jsx)(n.code,{children:"config.Node"})," \u5BF9\u8C61 ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32",children:"https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["AlpineLinux \u9700\u8981\u989D\u5916\u7684\u914D\u7F6E ",(0,i.jsx)(n.code,{children:"/etc/update-extlinux.conf"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["default_kernel_opts \u6DFB\u52A0 ",(0,i.jsx)(n.code,{children:"cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u7136\u540E ",(0,i.jsx)(n.code,{children:"update-extlinux && reboot"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u975E root \u6570\u636E\u5B58\u653E\u4E8E ",(0,i.jsx)(n.code,{children:"~/.rancher/k3s/data"})]}),"\n",(0,i.jsxs)(n.li,{children:["root \u6570\u636E\u5B58\u653E\u4E8E ",(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s/data"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u96C6\u7FA4 cidr ",(0,i.jsx)(n.code,{children:"10.42.0.0/16"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u8282\u70B9 IP"}),"\n",(0,i.jsx)(n.li,{children:"cni0 - \u672C\u5730\u7F51\u53E3 - \u9644\u5E26 IP"}),"\n",(0,i.jsx)(n.li,{children:"flannel1.1 - \u96C6\u7FA4\u901A\u4FE1"}),"\n",(0,i.jsx)(n.li,{children:"\u4F1A\u5206\u914D\u7ED9\u6BCF\u4E2A Pod"}),"\n",(0,i.jsxs)(n.li,{children:["\u6BCF\u4E2A\u8282\u70B9\u4E00\u4E2A ",(0,i.jsx)(n.code,{children:"/24"})," \u5730\u5740 - \u4E0D\u540C\u8282\u70B9\u4E4B\u95F4\u8FDB\u884C\u8F6C\u53D1"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u670D\u52A1 cidr ",(0,i.jsx)(n.code,{children:"10.43.0.0/16"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u670D\u52A1 IP"}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u80FD ping"}),"\n",(0,i.jsx)(n.li,{children:"\u865A\u62DF\u5730\u5740\uFF0C\u901A\u8FC7 iptables \u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u96C6\u7FA4\u57DF\u540D cluster.local"}),"\n",(0,i.jsxs)(n.li,{children:["coredns ",(0,i.jsx)(n.code,{children:"10.43.0.10"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/networking/",children:"\u7F51\u7EDC"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4\u4F7F\u7528 flannel \u4F5C\u4E3A CNI\uFF0C\u4F7F\u7528 VXLAN \u540E\u7AEF"}),"\n",(0,i.jsxs)(n.li,{children:["flannel ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/blob/fe7337937155af41f1aebeb87d1acd07091b71de/pkg/agent/flannel/setup.go#L42",children:"\u914D\u7F6E"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u79C1\u6709\u4ED3\u5E93 ",(0,i.jsx)(n.code,{children:"/etc/rancher/k3s/registries.yaml"})]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/",children:"\u670D\u52A1\u914D\u7F6E"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"getk3sio",children:"get.k3s.io"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://get.k3s.io",children:"get.k3s.io"})," \u5B89\u88C5\u811A\u672C"]}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0B\u8F7D\u5730\u5740\u4E3A STORAGE_URL=",(0,i.jsx)(n.a,{href:"https://storage.googleapis.com/k3s-ci-builds",children:"https://storage.googleapis.com/k3s-ci-builds"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u4F1A\u5B89\u88C5 openrc \u670D\u52A1\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"/etc/rancher/k3s/k3s.env"}),"\n",(0,i.jsx)(n.li,{children:"/etc/rancher/k3s/k3s-agent.env"}),"\n",(0,i.jsx)(n.li,{children:"/etc/init.d/k3s"}),"\n",(0,i.jsx)(n.li,{children:"/etc/init.d/k3s-agent"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u65E5\u5FD7\u6587\u4EF6 /var/log/k3s.log"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://rancher.com/docs/k3s/latest/en/installation/install-options/",children:"\u5B89\u88C5\u9009\u9879"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u5B89\u88C5\u4E3A server \u542F\u52A8\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u8BBE\u7F6E ",(0,i.jsx)(n.code,{children:"K3S_URL"})," \u4E14\u8BBE\u7F6E ",(0,i.jsx)(n.code,{children:"K3S_TOKEN"})," \u6216 ",(0,i.jsx)(n.code,{children:"K3S_CLUSTER_SECRET"})]}),"\n",(0,i.jsx)(n.li,{children:"\u6216\u76F4\u63A5\u540E\u9762\u6307\u5B9A agent"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_SKIP_DOWNLOAD"})," - \u4E0D\u4E0B\u8F7D"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_SYMLINK"})," - \u521B\u5EFA kubectl\uFF0Ccrictl\uFF0Cctr \u7B26\u53F7\u94FE\u63A5 - \u8BBE\u7F6E\u4E3A ",(0,i.jsx)(n.code,{children:"skip"})," \u4F1A\u8C03\u8FC7\uFF0C\u8BBE\u7F6E\u4E3A force \u4F1A\u8986\u76D6"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_SKIP_ENABLE"})," - \u4E0D\u542F\u7528\u548C\u542F\u52A8 k3s - \u5373\u4E0D\u4F1A add openrc \u7684 service \u4E5F\u4E0D\u4F1A start"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_SKIP_START"})," - \u4E0D\u542F\u52A8\u670D\u52A1"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_BIN_DIR"})," - \u5B89\u88C5\u76EE\u5F55 - \u9ED8\u8BA4 ",(0,i.jsx)(n.code,{children:"/usr/local/bin"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_EXEC"})," - \u6307\u5411\u547D\u4EE4\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u9ED8\u8BA4 agent \u9664\u975E\u6709 K3S_URL"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_CHANNEL_URL"})," - \u9ED8\u8BA4 ",(0,i.jsx)(n.a,{href:"https://update.k3s.io/v1-release/channels",children:"https://update.k3s.io/v1-release/channels"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"INSTALL_K3S_CHANNEL"})," - \u9ED8\u8BA4 stable"]}),"\n",(0,i.jsxs)(n.li,{children:["\u989D\u5916\u5B89\u88C5\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/usr/local/bin/k3s-killall.sh"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u8C03\u7528 ",(0,i.jsx)(n.code,{children:"service k3s stop"})]}),"\n",(0,i.jsxs)(n.li,{children:["umount\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/run/k3s"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/var/lib/kubelet/pods"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/run/netns/cni-"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u79FB\u9664 ",(0,i.jsx)(n.code,{children:"cni0"})," \u548C ",(0,i.jsx)(n.code,{children:"flannel1.1"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5220\u9664 ",(0,i.jsx)(n.code,{children:"/var/lib/cni/"})]}),"\n",(0,i.jsx)(n.li,{children:"\u79FB\u9664 iptables \u91CC\u7684 KUBE \u548C CNI \u5185\u5BB9"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/usr/local/bin/k3s-uninstall.sh"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/etc/rancher/k3s/k3s.env"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"service \u542F\u52A8\u4F1A source \u8FD9\u4E2A\u6587\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"/etc/init.d/k3s"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B89\u88C5\u53C2\u6570\u4F1A\u76F4\u63A5\u5728\u8FD9\u91CC"}),"\n",(0,i.jsxs)(n.li,{children:["\u65E5\u5FD7\u6587\u4EF6\u4E3A ",(0,i.jsx)(n.code,{children:"/var/log/k3s.log"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:'INSTALL_K3S_EXEC="--disable=traefik" \u53EF\u7981\u7528\u5B89\u88C5\u67D0\u4E9B\u670D\u52A1'}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'curl -sfL https://get.k3s.io | sh -\n\n# \u53EF\u76F4\u63A5\u6307\u5B9A\u53C2\u6570\ncurl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644\n# \u4E5F\u53EF\u4EE5\u73AF\u5883\u53D8\u91CF\u6307\u5B9A\ncurl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -s -\n\n# INSTALL_K3S_EXEC \u6307\u5B9A\u547D\u4EE4\ncurl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--no-flannel" sh -s -\ncurl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server --no-flannel" sh -s -\ncurl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server" sh -s - --no-flannel\ncurl -sfL https://get.k3s.io | sh -s - server --no-flannel\ncurl -sfL https://get.k3s.io | sh -s - --no-flannel\ncurl -sfL https://get.k3s.io | INSTALL_K3S_SKIP_ENABLE=1 sh -s -\n'})}),"\n",(0,i.jsx)(n.h2,{id:"\u624B\u52A8\u955C\u50CF\u5B89\u88C5",children:"\u624B\u52A8\u955C\u50CF\u5B89\u88C5"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/k3s-io/k3s/blob/master/install.sh",children:"https://github.com/k3s-io/k3s/blob/master/install.sh"})}),"\n",(0,i.jsxs)(n.li,{children:["\u955C\u50CF\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh",children:"http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://rancher-mirror.rancher.cn",children:"https://rancher-mirror.rancher.cn"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"arch - k3s, k3s-arm64, k3s-armhf, k3s-s390x"}),"\n",(0,i.jsx)(n.li,{children:"sha256sum-${ARCH}.txt"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ver=$(curl -sfL https://rancher-mirror.rancher.cn/k3s/channels/stable)\ncurl -sfLO https://rancher-mirror.rancher.cn/k3s/${ver/+/-}/k3s\ncurl -sfLO https://rancher-mirror.rancher.cn/k3s/${ver/+/-}/sha256sum-amd64.txt\nsha256sum -c sha256sum-amd64.txt --ignore-missing\n\nchmod +x k3s\nmv k3s /usr/bin/k3s\nk3s check-config\n# k3s server\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"openrc"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"/etc/rancher/k3s/${SYSTEM_NAME}.env"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",metastring:'title="/etc/init.d/k3s"',children:'#!/sbin/openrc-run\n\n# Based on ...\n#   https://raw.githubusercontent.com/rancher/k3s/master/install.sh\nK3S_LOGFILE="${K3S_LOGFILE:-/var/log/${RC_SVCNAME}.log}"\n\nsupervisor=supervise-daemon\n\nname="k3s"\ncommand="/usr/bin/k3s"\ncommand_args="${K3S_EXEC} ${K3S_OPTS} >>${K3S_LOGFILE} 2>&1"\n\noutput_log=${K3S_LOGFILE}\nerror_log=${K3S_LOGFILE}\n\npidfile="/run/k3s.pid"\nrespawn_delay=5\nrespawn_max=0\n\nrc_ulimit="${K3S_ULIMIT:--c unlimited -n 1048576 -u unlimited}"\n\ndepend() {\n        want cgroups\n        after firewall\n}\n\nstart_pre() {\n        checkpath -f -m 0644 -o root:root "${K3S_LOGFILE}"\n        rm -f /tmp/k3s.*\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",metastring:'title="/etc/init.d/k3s"',children:'#!/sbin/openrc-run\n\ndepend() {\n    after network-online\n    want cgroups\n}\n\nstart_pre() {\n    rm -f /tmp/k3s.*\n}\n\nsupervisor=supervise-daemon\nname=${SYSTEM_NAME}\ncommand="${BIN_DIR}/k3s"\ncommand_args="$(escape_dq "${CMD_K3S_EXEC}")\n    >>${LOG_FILE} 2>&1"\n\noutput_log=${LOG_FILE}\nerror_log=${LOG_FILE}\n\npidfile="/var/run/${SYSTEM_NAME}.pid"\nrespawn_delay=5\nrespawn_max=0\n\nset -o allexport\nif [ -f /etc/environment ]; then source /etc/environment; fi\nif [ -f ${FILE_K3S_ENV} ]; then source ${FILE_K3S_ENV}; fi\nset +o allexport\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-pre",metastring:'title="/etc/logrotate.d/k3s"',children:"/var/log/k3s.log {\n	missingok\n	notifempty\n	copytruncate\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u624B\u52A8\u5B89\u88C5\u542F\u52A8",children:"\u624B\u52A8\u5B89\u88C5\u542F\u52A8"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"mkdir -p /opt/k3s\ncd /opt/k3s\n# https://github.com/rancher/k3s/releases\nver=$(curl -sL https://api.github.com/repos/rancher/k3s/releases/latest | jq .tag_name -r)\n\ncurl -LOC- https://github.com/rancher/k3s/releases/download/$ver/k3s\ncurl -LOC- https://github.com/rancher/k3s/releases/download/$ver/k3s-images.txt\n\nssh k3s -- \"sudo sh -c 'mkdir -p /opt/k3s && chown admin:admin /opt/k3s'\"\nscp k3s k3s:/opt/k3s\nscp k3s-images.txt k3s:/opt/k3s\n\n# ssh k3s --\ncat /opt/k3s/k3s-images.txt | xargs -n 1 docker pull\n\nk3s server --cluster-init --alsologtostderr --log $PWD/k3s-server.log --docker\n"})}),"\n",(0,i.jsx)(n.h2,{id:"containerd",children:"containerd"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4F1A\u751F\u6210\u914D\u7F6E\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"/var/lib/rancher/k3s/agent/etc/containerd/config.toml"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u6709 config.toml.tmpl \u5219\u4F1A\u4F7F\u7528"}),"\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u6A21\u677F ",(0,i.jsx)(n.a,{href:"https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L72",children:"templates.go#ContainerdConfigTemplate"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u6CA1\u6709 docker \u53EF\u4EE5\u5C11 80m \u5185\u5B58"}),"\n",(0,i.jsxs)(n.li,{children:["\u6BCF\u4E2A containerd-shim \u6BD4 containerd-shim-runc-v2 \u5C11\u51E0 m \u5185\u5B58\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"containerd-shim \u662F docker \u7684"}),"\n",(0,i.jsx)(n.li,{children:"containerd-shim-runc-v2 \u662F containerd \u7684"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"registries",children:"registries"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"/etc/rancher/k3s/registries.yaml"})}),"\n",(0,i.jsx)(n.li,{children:"\u542F\u52A8\u65F6\u68C0\u6D4B\uFF0Ccontainerd \u4F1A\u4F7F\u7528\u8FD9\u91CC\u7684\u5B9A\u4E49"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"mirrors:\n  # \u955C\u50CF DockerHub\n  docker.io:\n    endpoint:\n      - 'https://mycustomreg.com:5000'\nconfigs:\n  # \u6DFB\u52A0\u6388\u6743\u548C\u8BC1\u4E66\n  'mycustomreg:5000':\n    auth:\n      username: xxxxxx # this is the registry username\n      password: xxxxxx # this is the registry password\n    tls:\n      cert_file: # path to the cert file used in the registry\n      key_file: # path to the key file used in the registry\n      ca_file: # path to the ca file used in the registry\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u7B14\u8BB0",children:"\u7B14\u8BB0"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["kubeconfig \u4F4D\u4E8E ",(0,i.jsx)(n.code,{children:"/etc/rancher/k3s/k3s.yaml"})]}),"\n",(0,i.jsxs)(n.li,{children:["K3S_TOKEN \u4F4D\u4E8E ",(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s/server/node-token"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u8282\u70B9\u9700\u8981\u6709\u552F\u4E00\u4E3B\u673A\u540D - ",(0,i.jsx)(n.code,{children:"K3S_NODE_NAME"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\u4EE3\u7406\u8282\u70B9\u6CE8\u518C\u903B\u8F91",children:"\u4EE3\u7406\u8282\u70B9\u6CE8\u518C\u903B\u8F91"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"k3s agent \u521D\u59CB\u5316 Agent \u8282\u70B9\u7684 websocket \u94FE\u63A5\u3002\u94FE\u63A5\u4F1A\u6709\u5BA2\u6237\u7AEF\u8FDB\u884C\u8D1F\u8F7D\u5747\u8861\u3002"}),"\n",(0,i.jsxs)(n.li,{children:["Agent \u4F1A\u4F7F\u7528\u96C6\u7FA4\u7684\u5BC6\u94A5\u548C\u968F\u673A\u751F\u6210\u7684\u5BC6\u7801\u6CE8\u518C\uFF0C\u5BC6\u7801\u5B58\u50A8\u4E8E ",(0,i.jsx)(n.code,{children:"/etc/rancher/node/password"}),"\uFF0C\u670D\u52A1\u7AEF\u4F1A\u5B58\u50A8\u8282\u70B9\u7684\u5BC6\u7801\u5230 ",(0,i.jsx)(n.code,{children:"/var/lib/rancher/k3s/server/cred/node-passwd"}),"\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u8282\u70B9\u4E0A\u7684 ",(0,i.jsx)(n.code,{children:"/etc/rancher/node"})," \u76EE\u5F55\u88AB\u79FB\u9664\u540E\u5BC6\u7801\u4F1A\u88AB\u4ECE\u65B0\u751F\u6210\uFF0C\u6216\u7531\u670D\u52A1\u7AEF\u79FB\u9664\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u542F\u52A8\u65F6\u53EF\u4E3A\u8282\u70B9\u9644\u52A0\u552F\u4E00\u8282\u70B9\u6807\u793A\uFF0C",(0,i.jsx)(n.code,{children:"--with-node-id"}),"\u3002"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5FEB\u901F\u542F\u52A8",children:"\u5FEB\u901F\u542F\u52A8"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"curl -LO 'https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.24.1%2Bk3s1/k3s'\nchmod +x k3s\n./k3s server\n"})})]})}function o(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return t},a:function(){return c}});var r=s(75271);let i={},l=r.createContext(i);function c(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);