"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["95453"],{86400:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>l,toc:()=>c,frontMatter:()=>t});var i=JSON.parse('{"id":"devops/docker/docker-faq","title":"Docker FAQ","description":"- Docker Best Practices","source":"@site/../notes/devops/docker/docker-faq.md","sourceDirName":"devops/docker","slug":"/devops/docker/faq","permalink":"/notes/devops/docker/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/docker/docker-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"Docker FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Dockerfile","permalink":"/notes/devops/docker/dockerfile"},"next":{"title":"DockerHub","permalink":"/notes/devops/docker/hub"}}'),o=r("52676"),s=r("79938");let t={title:"Docker FAQ",tags:["FAQ"]},d="Docker FAQ",l={},c=[{value:"Host IP",id:"host-ip",level:2},{value:"env",id:"env",level:2},{value:"\u5728 docker \u4E2D\u4F7F\u7528 docker",id:"\u5728-docker-\u4E2D\u4F7F\u7528-docker",level:2},{value:"\u975E root \u7ED1\u5B9A\u79C1\u6709\u7AEF\u53E3",id:"\u975E-root-\u7ED1\u5B9A\u79C1\u6709\u7AEF\u53E3",level:2},{value:"\u505C\u6B62\u6240\u6709\u5BB9\u5668",id:"\u505C\u6B62\u6240\u6709\u5BB9\u5668",level:2},{value:"\u8FC1\u79FB\u6570\u636E\u76EE\u5F55",id:"\u8FC1\u79FB\u6570\u636E\u76EE\u5F55",level:2},{value:"No swap limit support",id:"no-swap-limit-support",level:2},{value:"\u4E3A\u5DF2\u7ECF\u8FD0\u884C\u7684 Docker \u5BB9\u5668\u6DFB\u52A0\u7AEF\u53E3\u6620\u5C04",id:"\u4E3A\u5DF2\u7ECF\u8FD0\u884C\u7684-docker-\u5BB9\u5668\u6DFB\u52A0\u7AEF\u53E3\u6620\u5C04",level:2},{value:"upper fs does not support RENAME_WHITEOUT",id:"upper-fs-does-not-support-rename_whiteout",level:2},{value:"docker zfs vol",id:"docker-zfs-vol",level:2},{value:"driver &quot;zfs&quot; failed to remove root filesystem",id:"driver-zfs-failed-to-remove-root-filesystem",level:2},{value:"\u6CA1\u6743\u9650",id:"\u6CA1\u6743\u9650",level:2},{value:"bridge-nf-call-iptables",id:"bridge-nf-call-iptables",level:2},{value:"Cannot link to a non running container",id:"cannot-link-to-a-non-running-container",level:2},{value:"docker exporter does not currently support exporting manifest lists",id:"docker-exporter-does-not-currently-support-exporting-manifest-lists",level:2},{value:"could not create a builder instance with TLS data loaded from environment",id:"could-not-create-a-builder-instance-with-tls-data-loaded-from-environment",level:2},{value:"DOCKER_HOST environment variable overrides the active context. To use a context, either set the global --context flag, or unset DOCKER_HOST environment variable.",id:"docker_host-environment-variable-overrides-the-active-context-to-use-a-context-either-set-the-global---context-flag-or-unset-docker_host-environment-variable",level:2},{value:"failed to solve with frontend dockerfile.v0: failed to create LLB definition: unexpected status code [manifests latest]: 403 Forbidden",id:"failed-to-solve-with-frontend-dockerfilev0-failed-to-create-llb-definition-unexpected-status-code-manifests-latest-403-forbidden",level:2},{value:"OpenTelemetry",id:"opentelemetry",level:2},{value:"error from daemon in stream: Error grabbing logs: invalid character &#39;\\x00&#39; looking for beginning of valu",id:"error-from-daemon-in-stream-error-grabbing-logs-invalid-character-x00-looking-for-beginning-of-valu",level:2},{value:"Error running exec in container: failed to open stdout fifo: error creating fifo",id:"error-running-exec-in-container-failed-to-open-stdout-fifo-error-creating-fifo",level:2},{value:"overlayfs: upper fs does not support RENAME_WHITEOUT",id:"overlayfs-upper-fs-does-not-support-rename_whiteout",level:2},{value:"listing workers: failed to list workers: Unavailable: connection closed before server preface received",id:"listing-workers-failed-to-list-workers-unavailable-connection-closed-before-server-preface-received",level:2},{value:"multiple platforms feature is currently not supported for docker driver. Please switch to a different driver",id:"multiple-platforms-feature-is-currently-not-supported-for-docker-driver-please-switch-to-a-different-driver",level:2},{value:"Docker Image Format v1 and Docker Image manifest version 2",id:"docker-image-format-v1-and-docker-image-manifest-version-2",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"docker-faq",children:"Docker FAQ"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://gist.github.com/StevenACoffman/41fee08e8782b411a4a26b9700ad7af5",children:"Docker Best Practices"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'# Docker over SSH\ndocker context create svr --docker "host=ssh://admin@svr"\n'})}),"\n",(0,o.jsx)(n.h2,{id:"host-ip",children:"Host IP"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"host.docker.internal"}),"\n",(0,o.jsx)(n.li,{children:"docker.for.mac.localhost"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"/sbin/ip route | awk '/default/ { print $3 }'\n\ngetent host.docker.internal\ngetent hosts docker.for.mac.localhost\n\ndocker network inspect bridge -f '{{range .IPAM.Config}}{{.Gateway}}{{end}}'\n\n# Docker in AWS\n# http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-retrieval\ncurl http://169.254.169.254/latest/meta-data/local-ipv4\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"getaddrinfo ENOTFOUND host.docker.internal\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u53EA\u6709 Windows \u548C macOS \u5B9A\u4E49\u4E86 host.docker.internal"}),"\n",(0,o.jsx)(n.li,{children:"Linux \u4E0B host network \u76F4\u63A5\u4F7F\u7528 localhost"}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://docs.orbstack.dev/docker/domains",children:"https://docs.orbstack.dev/docker/domains"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"container-name.orb.local"}),"\n",(0,o.jsx)(n.li,{children:"service.project.orb.local"}),"\n",(0,o.jsxs)(n.li,{children:["\u672C\u5730\u53EF\u76F4\u63A5\u6253\u5F00 ",(0,o.jsx)(n.a,{href:"http://orb.local",children:"http://orb.local"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"env",children:"env"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["DOCKER_REGISTRY_URL\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["jenkins ",(0,o.jsx)(n.code,{children:"docker.withRegistry"})]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:"DOCKER_REGISTRY_CREDENTIALS_ID"}),"\n",(0,o.jsx)(n.li,{children:"DOCKER_CONFIG=~/.docker"}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.docker.com/engine/reference/commandline/cli/#environment-variables",children:"https://docs.docker.com/engine/reference/commandline/cli/#environment-variables"})}),"\n"]}),"\n",(0,o.jsx)(n.h1,{id:"volume-bind-\u6587\u4EF6\u4E0D\u4F1A\u66F4\u65B0",children:"volume bind \u6587\u4EF6\u4E0D\u4F1A\u66F4\u65B0"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u5C1D\u8BD5 bind \u76EE\u5F55\uFF0C\u4E0D\u8981 bind \u6587\u4EF6"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"\u5728-docker-\u4E2D\u4F7F\u7528-docker",children:"\u5728 docker \u4E2D\u4F7F\u7528 docker"}),"\n",(0,o.jsx)(n.p,{children:"\u76F4\u63A5\u6620\u5C04 /var/run/docker.sock"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name box wener/demo:test\n"})}),"\n",(0,o.jsx)(n.h2,{id:"\u975E-root-\u7ED1\u5B9A\u79C1\u6709\u7AEF\u53E3",children:"\u975E root \u7ED1\u5B9A\u79C1\u6709\u7AEF\u53E3"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u4E00\u822C\u6765\u8BF4\u6DFB\u52A0 CAP_NET_BIND_SERVICE \u5373\u53EF\uFF0C\u4F46\u662F\u5BF9\u975E root \u65E0\u6548"}),"\n",(0,o.jsxs)(n.li,{children:["\u8BBE\u7F6E sysctl ",(0,o.jsx)(n.code,{children:"net.ipv4.ip_unprivileged_port_start=0"})," \u5373\u53EF\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u9700\u8981 kernel 4.11+"}),"\n",(0,o.jsx)(n.li,{children:"ubuntu 18+"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"\u505C\u6B62\u6240\u6709\u5BB9\u5668",children:"\u505C\u6B62\u6240\u6709\u5BB9\u5668"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker stop $(docker ps -aq)\n"})}),"\n",(0,o.jsx)(n.h2,{id:"\u8FC1\u79FB\u6570\u636E\u76EE\u5F55",children:"\u8FC1\u79FB\u6570\u636E\u76EE\u5F55"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"/var/lib/docker \u5BF9 docker \u6027\u80FD\u5F71\u54CD\u8F83\u5927"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'# \u505C\u6B62\u670D\u52A1\u8FC1\u79FB\u6570\u636E\nservice docker stop\nmkdir -p /data/docker\nsudo rsync -aP /var/lib/docker/ /data/docker/\n\n# \u6DFB\u52A0 data-root \u914D\u7F6E\n# { "data-root": "/data/docker" }\nnano /etc/docker/daemon.json\n\n# \u542F\u52A8\nservice docker start\n# \u67E5\u770B\u65B0\u7684\u914D\u7F6E\ndocker info | grep \'Root Dir\'\n\n# \u786E\u8BA4\u65E7\u7684\u76EE\u5F55\u6CA1\u6709\u88AB\u4F7F\u7528\napk add lsof\nlsof +D /var/lib/docker\n'})}),"\n",(0,o.jsx)(n.h2,{id:"no-swap-limit-support",children:"No swap limit support"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u6DFB\u52A0\u5185\u6838\u53C2\u6570 ",(0,o.jsx)(n.code,{children:"cgroup_enable=memory swapaccount=1"})]}),"\n",(0,o.jsx)(n.li,{children:"\u727A\u7272 1% \u7684\u5185\u5BB9\uFF0C10% \u6027\u80FD\u6765\u652F\u6301\u5185\u5B58\u548C\u4EA4\u6362\u533A\u5BA1\u8BA1"}),"\n",(0,o.jsxs)(n.li,{children:["\u4E00\u822C ",(0,o.jsx)(n.code,{children:"cgroup_enable=memory"})," \u4F1A\u5F00\u542F\uFF0C\u4F46 ",(0,o.jsx)(n.code,{children:"swapaccount"})," \u4E0D\u5F00"]}),"\n",(0,o.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.docker.com/config/containers/resource_constraints/",children:"Runtime options with Memory, CPUs, and GPUs"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.docker.com/engine/install/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities",children:"Your kernel does not support cgroup swap limit capabilities"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"\u4E3A\u5DF2\u7ECF\u8FD0\u884C\u7684-docker-\u5BB9\u5668\u6DFB\u52A0\u7AEF\u53E3\u6620\u5C04",children:"\u4E3A\u5DF2\u7ECF\u8FD0\u884C\u7684 Docker \u5BB9\u5668\u6DFB\u52A0\u7AEF\u53E3\u6620\u5C04"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"HOSTPORT=80\nCONTAINERIP=172.16.0.2\n\niptables -t nat -A DOCKER -p tcp --dport ${HOSTPORT} -j DNAT --to-destination ${CONTAINERIP}:${HOSTPORT}\niptables -t nat -A POSTROUTING -j MASQUERADE -p tcp --source ${CONTAINERIP} --destination ${CONTAINERIP} --dport ${HOSTPORT}\niptables -A DOCKER -j ACCEPT -p tcp --destination ${CONTAINERIP} --dport ${HOSTPORT}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"upper-fs-does-not-support-rename_whiteout",children:"upper fs does not support RENAME_WHITEOUT"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"zfs \u65E0\u6CD5\u8FD0\u884C docker overlay"}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/openzfs/zfs/issues/8648",children:"openzfs/zfs#8648"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"docker-zfs-vol",children:"docker zfs vol"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"docker \u652F\u6301 zfs driver"}),"\n",(0,o.jsxs)(n.li,{children:["\u4F46\u662F\u6709\u4E9B\u95EE\u9898\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/moby/moby/issues/41055",children:"moby/moby#41055"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:"\u5B9E\u5728\u9700\u8981\u53EF\u4EE5\u8003\u8651 zvol"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'mkdir -p /data/docker\n# -s sparse volume \u4E0D\u4FDD\u7559\u7A7A\u95F4\nzfs create -s -V 100GB main/docker-vol\nmkfs.ext4 /dev/zvol/main/docker-vol\nmount /dev/zvol/main/docker-vol /data/docker\n# \u6301\u4E45\u5316 mount\ntail -1 /proc/mounts | sudo tee -a /etc/fstab\n\n# \u505C\u670D\u52A1\u8FC1\u79FB\nservice docker stop\nsudo rsync -aP /var/lib/docker/ /data/docker/\n# { "data-root": "/data/docker" }\nnano /etc/docker/daemon.json\nservice docker start\n\n# \u67E5\u770B\u65B0\u7684\u914D\u7F6E\ndocker info | grep \'Root Dir\'\n\n# \u786E\u8BA4\u65E7\u7684\u76EE\u5F55\u6CA1\u6709\u88AB\u4F7F\u7528\napk add lsof\nlsof +D /var/lib/docker\n'})}),"\n",(0,o.jsx)(n.h2,{id:"driver-zfs-failed-to-remove-root-filesystem",children:'driver "zfs" failed to remove root filesystem'}),"\n",(0,o.jsxs)(n.p,{children:["\u4E00\u8FB9\u9000\u51FA\uFF0C\u53E6\u5916\u4E00\u8FB9\u8FD8\u5728\u64CD\u4F5C\u65F6\u53EF\u80FD\u51FA\u73B0\uFF0C\u4E4B\u540E\u518D\u6267\u884C ",(0,o.jsx)(n.code,{children:"docker rm"})," \u5373\u53EF\u3002"]}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsxs)(n.p,{children:["\u5982\u679C ",(0,o.jsx)(n.code,{children:"docker rm"})," \u8FD8\u51FA\u73B0\u5F02\u5E38"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'Error response from daemon: container 2736566eac14027e7bf708c2babe894f1978249fc4a674886e158d6aa886479a: driver "zfs" failed to remove root filesystem: exit status 1: "/usr/sbin/zfs fs destroy -r main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d" => cannot open \'main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d\': dataset does not exist\n'})}),"\n",(0,o.jsx)(n.p,{children:"\u5219\u53EF\u4EE5\u5148\u521B\u5EFA\u518D\u6267\u884C"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"zfs create main/docker/9d56a9bde13e6a1d37c6af5a55057cc4a9fb8b684ff454ac25f415b70bc55d0d\ndocker rm container\n"})}),"\n",(0,o.jsx)(n.h2,{id:"\u6CA1\u6743\u9650",children:"\u6CA1\u6743\u9650"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo adduser $USER docker\n"})}),"\n",(0,o.jsx)(n.h2,{id:"bridge-nf-call-iptables",children:"bridge-nf-call-iptables"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-conf",metastring:'title="/etc/sysctl.d/99-br_netfilter.conf"',children:"net.bridge.bridge-nf-call-iptables=1\nnet.bridge.bridge-nf-call-ip6tables=1\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo sysctl -p /etc/sysctl.d/99-br_netfilter.conf\n"})}),"\n",(0,o.jsx)(n.h2,{id:"cannot-link-to-a-non-running-container",children:"Cannot link to a non running container"}),"\n",(0,o.jsx)(n.h2,{id:"docker-exporter-does-not-currently-support-exporting-manifest-lists",children:"docker exporter does not currently support exporting manifest lists"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u53EA\u80FD --push ",(0,o.jsx)(n.a,{href:"https://github.com/docker/buildx/issues/59",children:"docker/buildx#59"})]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"could-not-create-a-builder-instance-with-tls-data-loaded-from-environment",children:"could not create a builder instance with TLS data loaded from environment"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# \u53EA\u8981\u4E0D\u662F\u9ED8\u8BA4\u7684\u5C31\u884C\ndocker context create tls\ndocker buildx create --name multiarch-builder --driver docker-container --use tls\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/docker/buildx/issues/413",children:"https://github.com/docker/buildx/issues/413"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"docker_host-environment-variable-overrides-the-active-context-to-use-a-context-either-set-the-global---context-flag-or-unset-docker_host-environment-variable",children:"DOCKER_HOST environment variable overrides the active context. To use a context, either set the global --context flag, or unset DOCKER_HOST environment variable."}),"\n",(0,o.jsx)(n.h2,{id:"failed-to-solve-with-frontend-dockerfilev0-failed-to-create-llb-definition-unexpected-status-code-manifests-latest-403-forbidden",children:"failed to solve with frontend dockerfile.v0: failed to create LLB definition: unexpected status code [manifests latest]: 403 Forbidden"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"export DOCKER_BUILDKIT=0\n"})}),"\n",(0,o.jsx)(n.h2,{id:"opentelemetry",children:"OpenTelemetry"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"io.containerd.tracing.processor.v1.otlp"}),"\n"]}),"\n",(0,o.jsx)(n.h1,{id:"docker_host-\u683C\u5F0F",children:"DOCKER_HOST \u683C\u5F0F"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["DOCKER_HOST\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"tcp://1.2.3.4:2375"}),"\n",(0,o.jsx)(n.li,{children:"unix:///var/run/docker.sock"}),"\n",(0,o.jsxs)(n.li,{children:["npipe:///./pipe/docker_engine\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Named Pipe"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:"fd://1.2.3.4:5678"}),"\n",(0,o.jsx)(n.li,{children:"ssh://1.2.3.4:22"}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"//host:port"})," -> ",(0,o.jsx)(n.code,{children:"tpc://"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"error-from-daemon-in-stream-error-grabbing-logs-invalid-character-x00-looking-for-beginning-of-valu",children:"error from daemon in stream: Error grabbing logs: invalid character '\\x00' looking for beginning of valu"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"for cont in $(docker container ps | cut -f1 -d\\  | grep -v CONTAINER); do\n  sudo truncate -s0 $(docker container inspect --format='{{.LogPath}}' $cont)\ndone\n\nsudo sh -c \"grep -Pa '\\x00' /var/lib/docker/containers/**/*json.log\"\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/docker/for-linux/issues/140",children:"https://github.com/docker/for-linux/issues/140"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"error-running-exec-in-container-failed-to-open-stdout-fifo-error-creating-fifo",children:"Error running exec in container: failed to open stdout fifo: error creating fifo"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Error running exec XXX in container: failed to open stdin fifo: error creating fifo /var/run/docker/containerd/XXX/XXX-stdin: no such file or directory\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/docker/for-linux/issues/1091",children:"https://github.com/docker/for-linux/issues/1091"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"overlayfs-upper-fs-does-not-support-rename_whiteout",children:"overlayfs: upper fs does not support RENAME_WHITEOUT"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u4FEE\u6539 /var/lib/docker \u6302\u5728\u4F4D\u7F6E"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"listing-workers-failed-to-list-workers-unavailable-connection-closed-before-server-preface-received",children:"listing workers: failed to list workers: Unavailable: connection closed before server preface received"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker buildx ls\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u91CD\u542F dind \u540E\u6062\u590D"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"multiple-platforms-feature-is-currently-not-supported-for-docker-driver-please-switch-to-a-different-driver",children:"multiple platforms feature is currently not supported for docker driver. Please switch to a different driver"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'multiple platforms feature is currently not supported for docker driver. Please switch to a different driver (eg. "docker buildx create --use")\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Multi-platform build is not supported for the docker driver\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker buildx create --name multiarch-builder --driver docker-container --use\n\ndocker buildx ls\n"})}),"\n",(0,o.jsx)(n.h2,{id:"docker-image-format-v1-and-docker-image-manifest-version-2",children:"Docker Image Format v1 and Docker Image manifest version 2"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Docker Image Format v1 and Docker Image manifest version 2, schema 1 support is disabled by default and will be removed in an upcoming release\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://distribution.github.io/distribution/spec/deprecated-schema-v1/",children:"https://distribution.github.io/distribution/spec/deprecated-schema-v1/"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return d},a:function(){return t}});var i=r(75271);let o={},s=i.createContext(o);function t(e){let n=i.useContext(s);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);