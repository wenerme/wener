"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["80892"],{23236:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>c,default:()=>u,assets:()=>a,toc:()=>o,frontMatter:()=>l});var s=JSON.parse('{"id":"devops/kubernetes/README","title":"Kubernetes","description":"- Awesome","source":"@site/../notes/devops/kubernetes/README.md","sourceDirName":"devops/kubernetes","slug":"/devops/kubernetes/","permalink":"/notes/devops/kubernetes/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1664421654000,"frontMatter":{"title":"Kubernetes"},"sidebar":"docs","previous":{"title":"terraformer","permalink":"/notes/devops/infra/terraform/terraformer"},"next":{"title":"K8S Apps","permalink":"/notes/devops/kubernetes/app/cookbook"}}'),r=t("52676"),i=t("79938");let l={title:"Kubernetes"},c="Kubernetes",a={},o=[{value:"Install",id:"install",level:2},{value:"kubeadm",id:"kubeadm",level:3},{value:"Tips",id:"tips",level:4},{value:"\u6700\u4F73\u5B9E\u8DF5",id:"\u6700\u4F73\u5B9E\u8DF5",level:2},{value:"FAQ",id:"faq",level:4},{value:"\u5B89\u88C5\u597D\u540E\u65E0\u6CD5\u4F7F\u7528 kubectl, \u63D0\u793A\u8BF4\u5730\u5740\u9519\u8BEF",id:"\u5B89\u88C5\u597D\u540E\u65E0\u6CD5\u4F7F\u7528-kubectl-\u63D0\u793A\u8BF4\u5730\u5740\u9519\u8BEF",level:5},{value:"\u963B\u585E\u5728 Waiting for &#39;control plane to become ready&#39;",id:"\u963B\u585E\u5728-waiting-for-control-plane-to-become-ready",level:5},{value:"\u9650\u5236",id:"\u9650\u5236",level:5},{value:"docker-multinode",id:"docker-multinode",level:3},{value:"kube-up - Ubuntu",id:"kube-up---ubuntu",level:3},{value:"Tips",id:"tips-1",level:2},{value:"\u5E38\u7528 Label",id:"\u5E38\u7528-label",level:3},{value:"kubectl",id:"kubectl",level:2},{value:"run",id:"run",level:3},{value:"Help",id:"help",level:3}];function d(e){let n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"kubernetes",children:"Kubernetes"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/devops/kubernetes/awesome",children:"Awesome"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/devops/kubernetes/faq",children:"\u5E38\u89C1\u95EE\u9898"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/devops/kubernetes/version",children:"\u7248\u672C"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/notes/devops/kubernetes/distro/",children:"\u53D1\u884C\u7248"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/user-guide",children:"Reference"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs",children:"Guide"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/kelseyhightower/kubernetes-the-hard-way",children:"Kubernetes the hard way"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://blog.netsil.com/kubernetes-vs-openshift-vs-tectonic-comparing-enterprise-options-e3a34dc60519",children:"Kubernetes vs Openshift vs Tectonic"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/ramitsurana/awesome-kubernetes",children:"ramitsurana/awesome-kubernetes"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"install",children:"Install"}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsx)(n.p,{children:"\u4EE5\u4E0B\u5185\u5BB9\u5DF2\u8FC7\u65F6"})}),"\n",(0,r.jsx)(n.h3,{id:"kubeadm",children:"kubeadm"}),"\n",(0,r.jsxs)(n.p,{children:["\u4ECE 1.4 \u5F00\u59CB, Kubernetes \u63D0\u4F9B\u4E86 kubeadm \u7684\u6D4B\u8BD5\u7248,\u7B80\u5355\u7684",(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/getting-started-guides/kubeadm/",children:"\u4F7F\u7528\u8BF4\u660E"})," \u63CF\u8FF0\u4E86\u5982\u4F55\u4EE5\u7C7B\u4F3C\u4E8E docker swarm \u521D\u59CB\u5316\u96C6\u7FA4\u7684\u65B9\u5F0F\u6765\u90E8\u7F72 Kubernetes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5982\u679C\u4F60\u6709\u4EE3\u7406,\u5219\u5148\u8BBE\u7F6E\u597D\u4EE3\u7406\nproxy_host=10.1.1.1\nexport https_proxy=http://$proxy_host:7777\nexport http_proxy=http://$proxy_host:7777\n\ncurl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -\ncat <<EOF > /etc/apt/sources.list.d/kubernetes.list\ndeb http://apt.kubernetes.io/ kubernetes-xenial main\nEOF\napt-get update\napt-get install -y docker.io kubelet kubeadm kubectl kubernetes-cni\n\n# \u6CE8\u610F\n# \u7531\u4E8E kubeadm \u4F7F\u7528\u7684\u5927\u591A\u670D\u52A1\u90FD\u662F\u5728\u5BB9\u5668\u4E2D\u7684,\u56E0\u6B64\u4E00\u5B9A\u8981\u8BB0\u5F97\u4E3A docker \u8BBE\u7F6E\u597D\u4EE3\u7406\n\n# \u542F\u52A8 Master \u8282\u70B9\n# \u5982\u679C\u6709\u591A\u4E2A\u7F51\u5361,\u901A\u8FC7  --api-advertise-addresses=<\u5730\u5740> \u6307\u5B9A\nkubeadm init\n# \u5141\u8BB8 Master \u8282\u70B9\u6267\u884C POD, \u4E5F\u53EF\u7528\u4E8E\u5355\u8282\u70B9\u6D4B\u8BD5\nkubelet taint nodes --all dedicated-\n\n# \u5728\u5176\u4ED6\u8282\u70B9\u4E0A\u6267\u884C,\u52A0\u5165\u5230\u96C6\u7FA4\nkubeadm join --token <\u4E0A\u9762\u751F\u6210\u7684 Token> <\u4E0A\u9762\u7ED9\u51FA\u7684\u5730\u5740>\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"\u6E05\u7406\u96C6\u7FA4"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"systemctl stop kubelet\ndocker rm -f $(docker ps -q)\nmount | grep \"/var/lib/kubelet/*\" | awk '{print $3}' | xargs umount 1> /dev/null 2> /dev/null\nrm -rf /var/lib/kubelet /etc/kubernetes /var/lib/etcd /etc/cni\nip link set cbr0 down\nip link del cbr0\nip link set cni0 down\nip link del cni0\nsystemctl start kubelet\n"})}),"\n",(0,r.jsx)(n.h4,{id:"tips",children:"Tips"}),"\n",(0,r.jsx)(n.p,{children:"\u4F7F\u7528 kubeadm \u65F6\u4F1A\u5728 /etc/systemd/system/kubelet.service.d \u751F\u6210\u76F8\u5E94\u7684\u914D\u7F6E,\u4F8B\u5982 10-kubeadm.conf."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"10-kubeadm.conf"})}),"\n",(0,r.jsxs)(n.p,{children:["kubelet \u53C2\u6570\u53EF\u53C2\u8003 ",(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/admin/kubelet/",children:"http://kubernetes.io/docs/admin/kubelet/"}),"\ncni \u53EF\u53C2\u8003 ",(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/admin/network-plugins/",children:"http://kubernetes.io/docs/admin/network-plugins/"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'[Service]\nEnvironment="KUBELET_KUBECONFIG_ARGS=--kubeconfig=/etc/kubernetes/kubelet.conf --require-kubeconfig=true"\nEnvironment="KUBELET_SYSTEM_PODS_ARGS=--pod-manifest-path=/etc/kubernetes/manifests --allow-privileged=true"\nEnvironment="KUBELET_NETWORK_ARGS=--network-plugin=cni --cni-conf-dir=/etc/cni/net.d --cni-bin-dir=/opt/cni/bin"\nEnvironment="KUBELET_DNS_ARGS=--cluster-dns=100.64.0.10 --cluster-domain=cluster.local"\nEnvironment="KUBELET_EXTRA_ARGS=--v=4"\nExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_SYSTEM_PODS_ARGS $KUBELET_NETWORK_ARGS $KUBELET_DNS_ARGS $KUBELET_EXTRA_ARGS\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\u6700\u4F73\u5B9E\u8DF5",children:"\u6700\u4F73\u5B9E\u8DF5"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://kubernetes.io/docs/setup/best-practices/",children:"https://kubernetes.io/docs/setup/best-practices/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rancher.com/blog/2019/2019-01-17-101-more-kubernetes-security-best-practices/",children:"https://rancher.com/blog/2019/2019-01-17-101-more-kubernetes-security-best-practices/"})}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(n.h5,{id:"\u5B89\u88C5\u597D\u540E\u65E0\u6CD5\u4F7F\u7528-kubectl-\u63D0\u793A\u8BF4\u5730\u5740\u9519\u8BEF",children:"\u5B89\u88C5\u597D\u540E\u65E0\u6CD5\u4F7F\u7528 kubectl, \u63D0\u793A\u8BF4\u5730\u5740\u9519\u8BEF"}),"\n",(0,r.jsxs)(n.p,{children:["\u9700\u8981\u624B\u52A8\u6307\u5B9A\u5730\u5740 ",(0,r.jsx)(n.code,{children:"kubectl --server=127.0.0.1:8080 get nodes"}),", \u56E0\u4E3A\u542F\u52A8\u65F6\u7684 API \u670D\u52A1\u5668\u5730\u5740\u4E3A ",(0,r.jsx)(n.code,{children:"127.0.0.1:8080"}),",\u5177\u4F53\u6307\u5B9A\u4F4D\u7F6E\u5728 ",(0,r.jsx)(n.code,{children:"cat /etc/kubernetes/manifests/kube-apiserver.json"}),", \u8BE5\u5730\u5740\u6682\u65F6\u65E0\u6CD5\u66F4\u6539."]}),"\n",(0,r.jsxs)(n.p,{children:["\u7531\u4E8E\u7ED1\u5B9A\u7684\u5730\u5740\u662F ",(0,r.jsx)(n.code,{children:"127.0.0.1"}),", \u6240\u4EE5\u5982\u679C\u60F3\u8981\u5728\u672C\u5730\u4F7F\u7528,\u5219\u5EFA\u8BAE\u5728\u672C\u5730\u901A\u8FC7\u8F6C\u53D1\u4F7F\u7528 ",(0,r.jsx)(n.code,{children:"ssh -vNL 8082:127.0.0.1:8080 \u4E3B\u673A\u5730\u5740"}),", \u7136\u540E\u5219\u53EF\u4EE5\u4F7F\u7528 ",(0,r.jsx)(n.code,{children:"kubectl -s 127.0.0.1:8082 get nodes"})," \u8FDB\u884C\u64CD\u4F5C\u4E86."]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["TIPS:\n\u901A\u8FC7 ",(0,r.jsx)(n.code,{children:'alias k="kubectl -s 127.0.0.1:8082"'})," \u7B80\u5316\u64CD\u4F5C"]}),"\n"]}),"\n",(0,r.jsx)(n.h5,{id:"\u963B\u585E\u5728-waiting-for-control-plane-to-become-ready",children:"\u963B\u585E\u5728 Waiting for 'control plane to become ready'"}),"\n",(0,r.jsxs)(n.p,{children:["\u4E5F\u6709\u522B\u4EBA\u9047\u5230\u8FC7\u8BE5\u95EE\u9898 ",(0,r.jsx)(n.a,{href:"https://github.com/kubernetes/kubernetes/issues/33544",children:"https://github.com/kubernetes/kubernetes/issues/33544"})," ,\u6211\u4E5F\u9047\u5230,\u4F46\u4E3A Docker \u6DFB\u52A0\u4EE3\u7406\u540E\u5C31\u6CA1\u95EE\u9898\u4E86,\u5E94\u8BE5\u662F\u62C9\u53D6\u5BB9\u5668\u9020\u6210\u7684."]}),"\n",(0,r.jsx)(n.h5,{id:"\u9650\u5236",children:"\u9650\u5236"}),"\n",(0,r.jsx)(n.p,{children:"\u7531\u4E8E kubeadm \u8FD8\u5904\u4E8E beta \u7248,\u56E0\u6B64\u8FD8\u4F1A\u6709\u5F88\u591A\u95EE\u9898"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"\u521B\u5EFA\u7684\u96C6\u7FA4\u4E0D\u80FD\u548C\u4E91\u63D0\u4F9B\u5546\u8FDB\u884C\u96C6\u6210,\u4E5F\u5C31\u662F\u8BF4\u7528\u4E0D\u4E86 GCE \u548C AWS \u7684\u8D1F\u8F7D\u5747\u8861\u548C\u6301\u4E45\u5316\u5B58\u50A8.\u5EFA\u8BAE\u4F7F\u7528 NodePort \u6765\u89C4\u907F\u6539\u95EE\u9898."}),"\n",(0,r.jsx)(n.li,{children:"\u96C6\u7FA4\u53EA\u80FD\u6709\u4E00\u4E2A Master, \u591A\u4E2A Master \u7684\u5B9E\u73B0\u8FD8\u5728\u8FDB\u884C\u4E2D.\u5EFA\u8BAE\u5B9A\u4E49\u5907\u4EFD etcd \u6570\u636E(/var/lib/etcd) \u6765\u907F\u514D\u6570\u636E\u4E22\u5931\u7684\u95EE\u9898.\u5982\u679C\u6570\u636E\u4E22\u5931,\u6574\u4E2A\u96C6\u7FA4\u5FC5\u987B\u4ECE\u5934\u5F00\u59CB\u6784\u5EFA."}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"kubectl logs"})," \u65E0\u6CD5\u4F7F\u7528,\u53EF\u8FFD\u8E2A\u8BE5\u95EE\u9898 #22770.\u53EF\u901A\u8FC7\u4F7F\u7528 ",(0,r.jsx)(n.code,{children:"docker logs"})," \u6765\u67E5\u770B\u65E5\u5FD7."]}),"\n",(0,r.jsxs)(n.li,{children:["\u76EE\u524D\u8FD8\u6CA1\u6709\u5F88\u597D\u7684\u529E\u6CD5\u751F\u6210 kubeconfig \u914D\u7F6E\u7528\u4E8E\u8FDC\u7A0B\u6388\u6743.\u53EF\u901A\u8FC7 ",(0,r.jsx)(n.code,{children:"scp root@<master>:/etc/kubernetes/admin.conf"})," \u6765\u62C9\u53D6\u4E3B\u914D\u7F6E,\u7136\u540E\u5728\u8FDC\u7A0B\u4F7F\u7528\u65F6\u901A\u8FC7 ",(0,r.jsx)(n.code,{children:"kubectl --kubeconfig ./admin.conf"})," \u7684\u5F62\u5F0F\u6765\u4F7F\u7528."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"docker-multinode",children:"docker-multinode"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git clone --depth=1 https://github.com/kubernetes/kube-deploy\ncd kube-deploy/docker-multinode/\n# \u4F7F\u7528 docker \u5B89\u88C5\u76F8\u5BF9\u6BD4\u8F83\u7B80\u5355,\u9700\u8981\u4E0B\u8F7D\u7684\u53EA\u6709\u955C\u50CF\n# \u4F7F\u7528 docker \u4E00\u5B9A\u8981\u505A\u597D\u4EE3\u7406,\u5426\u5219\u4E0B\u8F7D gcr \u7684\u5185\u5BB9\u4F1A\u4E0B\u8F7D\u5931\u8D25\n# \u505A docker \u7684\u955C\u50CF\u65F6,\u4E0D\u53EA\u662F\u5BF9\u7CFB\u7EDF\u7684 docker \u505A\u955C\u50CF,\u8FD8\u9700\u8981\u4FEE\u6539 docker-bootstrap \u4E2D, bootstrap \u4F7F\u7528\u5230\u7684 daemon \u7684\u4EE3\u7406\n\nsu root\n./master.sh\n# \u542F\u52A8\u4F7F\u7528\u7684\u955C\u50CF https://github.com/kubernetes/kubernetes/tree/master/cluster/images/hyperkube\n# \u67E5\u770B\u542F\u52A8\u8FD0\u884C\u7684\u670D\u52A1,\u53EF\u4FEE\u6539\u53C2\u6570\n# docker run --rm -it gcr.io/google_containers/hyperkube-amd64:v1.3.6 ls /etc/kubernetes/manifests-multi\n# \u53EF\u8BBE\u7F6E\u7684\u53C2\u6570\u53EF\u53C2\u8003 http://kubernetes.io/docs/admin/kube-apiserver/\n\n# \u68C0\u67E5 Bootstrap \u542F\u52A8\u7684\u7A0B\u5E8F\u662F\u5426\u6B63\u786E\ndocker -H unix:///var/run/docker-bootstrap.sock ps\n# \u68C0\u67E5\u76F8\u5173\u7684\u8FDB\u7A0B\u662F\u5426\u542F\u52A8\ndocker ps\n# \u4E3B\u8282\u70B9\u542F\u52A8\u6210\u529F\u540E\u518D\u4ECE\u8282\u70B9\u4E0A\u6267\u884C\n# MASTER_IP=\u4E3B\u8282\u70B9\u5730\u5740 ./worker.sh\n\n# \u5B89\u88C5 kubectl\n# 1.3.6\ncurl -sSL https://storage.googleapis.com/kubernetes-release/release/v[KUBECTL_VERSION]/bin/linux/amd64/kubectl > /usr/local/bin/kubectl\nchmod +x /usr/local/bin/kubectl\n\n# \u5B89\u88C5 Helm\ncurl -s https://get.helm.sh | bash\nmv $PWD/helmc /usr/local/bin/helmc\n# \u5B89\u88C5 Deis\nhelmc repo add deis https://github.com/deis/charts\n\n# \u5177\u4F53\u7248\u672C\u53EF\u67E5\u770B https://github.com/deis/charts\n# fetches the chart into a local workspace\nhelmc fetch deis/workflow-v2.4.1\n# generates various secrets\nhelmc generate -x manifests workflow-v2.4.1\n# injects resources into  your cluster\nhelmc install workflow-v2.4.1\n# \u68C0\u67E5\u5B89\u88C5\u72B6\u6001\nkubectl --namespace=deis get pods\n\n# \u5B89\u88C5 Deis \u547D\u4EE4\u884C\ncurl -sSL http://deis.io/deis-cli/install-v2.sh | bash\nmv $PWD/deis /usr/local/bin/deis\nkubectl --namespace=deis get svc deis-router\n# \u4F7F\u7528\u4E0A\u4E2A\u547D\u4EE4\u4E2D\u7684 ExternalIP\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:":8080/ui \u7BA1\u7406\u9762\u677F"}),"\n",(0,r.jsx)(n.li,{children:":4194 cAdvisor"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"kube-up---ubuntu",children:"kube-up - Ubuntu"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/getting-started-guides/ubuntu/",children:"http://kubernetes.io/docs/getting-started-guides/ubuntu/"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'git clone --depth 1 https://github.com/kubernetes/kubernetes.git\n\nexport nodes="root@10.25.30.127 root@10.25.17.232 root@10.25.24.116"\nexport role="ai i i"\nexport NUM_NODES=${NUM_NODES:-3}\nexport SERVICE_CLUSTER_IP_RANGE=192.168.3.0/24\nexport FLANNEL_NET=172.16.0.0/16\nexport PROXY_SETTING="http_proxy=10.25.30.127:7777 https_proxy=10.25.30.127:7777"\n\n# \u4E0B\u8F7D\u7684\u6587\u4EF6\u4F1A\u5B58\u653E\u4E8E kubernetes/cluster/ubuntu/binaries directory\nKUBERNETES_PROVIDER=ubuntu ./kube-up.sh\n'})}),"\n",(0,r.jsx)(n.h2,{id:"tips-1",children:"Tips"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u8BE5 PR ",(0,r.jsx)(n.a,{href:"https://github.com/kubernetes/kubernetes/pull/30360",children:"#30360"})," \u6B63\u5728\u5B9E\u73B0\u4E00\u4E2A kubeadm \u547D\u4EE4,\u4F7F\u5F97 Kubernetes \u7684\u96C6\u7FA4\u6784\u5EFA\u548C swarm \u4E00\u6837\u7B80\u5355."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5F53\u5173\u95ED k8s \u540E,\u5BF9\u5E94\u7684 pods \u4E0D\u4F1A\u88AB umount\ncat /proc/mounts | sed -nre 's#.*?(/var\\S*)\\s.*#\\1#p' | xargs -n 1 umount\n\n# \u5220\u9664 veth \u865A\u62DF\u7F51\u5361\nifconfig | sed -nre 's/(veth\\S*)\\s.*/\\1/p' | xargs -n 1 ip link delete\n\n# \u5982\u679C\u4FEE\u6539\u4E86 CNI \u7684\u5730\u5740,\u9700\u8981\u5148\u5220\u9664\u539F\u6765\u7684 cni0\nip link delete cni0\n\nkubectl run -it --rm bb --image=busybox --restart=Never\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"\u79C1\u6709 IP v4 \u5730\u5740"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"10.0.0.0/8 (255.0.0.0)\n172.16.0.0/12 (255.240.0.0)\n192.168.0.0/16 (255.255.0.0)\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u5E38\u7528-label",children:"\u5E38\u7528 Label"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["release\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"stable, canary"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["environment\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"dev, qa, production"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["tier\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"frontend, backend, cache"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["partition\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"customerA, customerB"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["track\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"daily, weekly"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["role\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"master, slave"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"kubectl",children:"kubectl"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://kubernetes.io/docs/user-guide/kubectl-overview/",children:"kubectl-overview"})}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"run",children:"run"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# Create and run a particular image, possibly replicated.\n# Creates a deployment or job to manage the created container(s).\n\n# Start a single instance of nginx.\nkubectl run nginx --image=nginx\n\n# Start a single instance of hazelcast and let the container expose port 5701 .\nkubectl run hazelcast --image=hazelcast --port=5701\n\n# Start a single instance of hazelcast and set environment variables "DNS_DOMAIN=cluster" and "POD_NAMESPACE=default" in the container.\nkubectl run hazelcast --image=hazelcast --env="DNS_DOMAIN=cluster" --env="POD_NAMESPACE=default"\n\n# Start a replicated instance of nginx.\nkubectl run nginx --image=nginx --replicas=5\n\n# Dry run. Print the corresponding API objects without creating them.\nkubectl run nginx --image=nginx --dry-run\n\n# Start a single instance of nginx, but overload the spec of the deployment with a partial set of values parsed from JSON.\nkubectl run nginx --image=nginx --overrides=\'{ "apiVersion": "v1", "spec": { ... } }\'\n\n# Start a pod of busybox and keep it in the foreground, don\'t restart it if it exits.\nkubectl run -i -t busybox --image=busybox --restart=Never\n\n# Start the nginx container using the default command, but use custom arguments (arg1 .. argN) for that command.\nkubectl run nginx --image=nginx -- <arg1> <arg2> ... <argN>\n\n# Start the nginx container using a different command and custom arguments.\nkubectl run nginx --image=nginx --command -- <cmd> <arg1> ... <argN>\n\n# Start the perl container to compute \u03C0 to 2000 places and print it out.\nkubectl run pi --image=perl --restart=OnFailure -- perl -Mbignum=bpi -wle \'print bpi(2000)\'\n'})}),"\n",(0,r.jsx)(n.h3,{id:"help",children:"Help"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'$ kubeadm init -h\nRun this in order to set up the Kubernetes master.\n\nUsage:\n  kubeadm init [flags]\n\nFlags:\n      --api-advertise-addresses value   The IP addresses to advertise, in case autodetection fails (default [])\n      --api-external-dns-names value    The DNS names to advertise, in case you have configured them yourself (default [])\n      --cloud-provider string           Enable cloud provider features (external load-balancers, storage, etc), e.g. "gce"\n      --external-etcd-cafile string     etcd certificate authority certificate file. Note: The path must be in /etc/ssl/certs\n      --external-etcd-certfile string   etcd client certificate file. Note: The path must be in /etc/ssl/certs\n      --external-etcd-endpoints value   etcd endpoints to use, in case you have an external cluster (default [])\n      --external-etcd-keyfile string    etcd client key file. Note: The path must be in /etc/ssl/certs\n      --pod-network-cidr value          Specify range of IP addresses for the pod network; if set, the control plane will automatically allocate CIDRs for every node\n      --service-cidr value              Use alterantive range of IP address for service VIPs, defaults to 100.64.0.0/12 (default 100.64.0.0/12)\n      --service-dns-domain string       Use alternative domain for services, e.g. "myorg.internal" (default "cluster.local")\n      --token string                    Shared secret used to secure cluster bootstrap; if none is provided, one will be generated for you\n      --use-kubernetes-version string   Choose a specific Kubernetes version for the control plane (default "v1.4.0")\n'})})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return l}});var s=t(75271);let r={},i=s.createContext(r);function l(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);