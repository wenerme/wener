"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["26178"],{29044:function(e,o,n){n.r(o),n.d(o,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>d,toc:()=>a,frontMatter:()=>s});var r=JSON.parse('{"id":"devops/kubernetes/storage/longhorn-faq","title":"Longhorn \u5E38\u89C1\u95EE\u9898","description":"Longhorn on K3S","source":"@site/../notes/devops/kubernetes/storage/longhorn-faq.md","sourceDirName":"devops/kubernetes/storage","slug":"/devops/kubernetes/storage/longhorn-faq","permalink":"/notes/devops/kubernetes/storage/longhorn-faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/storage/longhorn-faq.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1617462276000,"frontMatter":{"title":"Longhorn \u5E38\u89C1\u95EE\u9898"},"sidebar":"docs","previous":{"title":"Local PV","permalink":"/notes/devops/kubernetes/storage/local-pv"},"next":{"title":"Longhorn \u7248\u672C","permalink":"/notes/devops/kubernetes/storage/longhorn-version"}}'),t=n("52676"),i=n("79938");let s={title:"Longhorn \u5E38\u89C1\u95EE\u9898"},l="Longhorn \u5E38\u89C1\u95EE\u9898",d={},a=[{value:"Longhorn on K3S",id:"longhorn-on-k3s",level:2},{value:"Error deploying driver: failed to get kubelet root dir, no related proc for root-dir detection, error out",id:"error-deploying-driver-failed-to-get-kubelet-root-dir-no-related-proc-for-root-dir-detection-error-out",level:2},{value:"MountVolume.SetUp failed for volume &quot;registration-dir&quot; : hostPath type check failed: /var/lib/rancher/k3s/agent/kubelet/plugins_registry is not a directory",id:"mountvolumesetup-failed-for-volume-registration-dir--hostpath-type-check-failed-varlibrancherk3sagentkubeletplugins_registry-is-not-a-directory",level:2},{value:"Unable to attach or mount volumes: unmounted volumes=[registration-dir], unattached volumes=[registration-dir lib-modules socket-dir host-dev host-sys longhorn-service-account-token-7ppv2 pods-mount-dir host kubernetes-csi-dir]: timed out waiting for the condition",id:"unable-to-attach-or-mount-volumes-unmounted-volumesregistration-dir-unattached-volumesregistration-dir-lib-modules-socket-dir-host-dev-host-sys-longhorn-service-account-token-7ppv2-pods-mount-dir-host-kubernetes-csi-dir-timed-out-waiting-for-the-condition",level:2},{value:"cannot find disk config file, maybe due to a mount error",id:"cannot-find-disk-config-file-maybe-due-to-a-mount-error",level:2},{value:"\u8282\u70B9 Allocated \u4E3A\u8D1F",id:"\u8282\u70B9-allocated-\u4E3A\u8D1F",level:2},{value:"\u5378\u8F7D",id:"\u5378\u8F7D",level:2},{value:"driver name driver.longhorn.io not found in the list of registered CSI drivers",id:"driver-name-driverlonghornio-not-found-in-the-list-of-registered-csi-drivers",level:2},{value:"Still connecting to unix:///csi/csi.sock",id:"still-connecting-to-unixcsicsisock",level:2}];function c(e){let o={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.header,{children:(0,t.jsx)(o.h1,{id:"longhorn-\u5E38\u89C1\u95EE\u9898",children:"Longhorn \u5E38\u89C1\u95EE\u9898"})}),"\n",(0,t.jsx)(o.h2,{id:"longhorn-on-k3s",children:"Longhorn on K3S"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:(0,t.jsx)(o.a,{href:"https://longhorn.io/docs/1.1.0/advanced-resources/os-distro-specific/csi-on-k3s/",children:"https://longhorn.io/docs/1.1.0/advanced-resources/os-distro-specific/csi-on-k3s/"})}),"\n"]}),"\n",(0,t.jsx)(o.h2,{id:"error-deploying-driver-failed-to-get-kubelet-root-dir-no-related-proc-for-root-dir-detection-error-out",children:"Error deploying driver: failed to get kubelet root dir, no related proc for root-dir detection, error out"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-yaml",children:"csi:\n  # 1.0.2\n  # https://github.com/longhorn/longhorn/issues/1861#issuecomment-705297295\n  kubeletRootDir: /var/lib/rancher/k3s/agent/kubelet\n"})}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:(0,t.jsx)(o.a,{href:"https://github.com/longhorn/longhorn/issues/1861",children:"#1861"})}),"\n"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{children:'time="2021-02-23T16:39:59Z" level=error msg="failed to get arg root-dir. Need to specify \\"--kubelet-root-dir\\" in your Longhorn deployment yaml.: failed to get kubelet root dir, no related proc for root-dir detection, error out"\ntime="2021-02-23T16:39:59Z" level=fatal msg="Error deploying driver: failed to get arg root-dir. Need to specify \\"--kubelet-root-dir\\" in your Longhorn deployment yaml.: failed to get kubelet root dir, no related proc for root-dir detection, error out"\n'})}),"\n",(0,t.jsx)(o.h2,{id:"mountvolumesetup-failed-for-volume-registration-dir--hostpath-type-check-failed-varlibrancherk3sagentkubeletplugins_registry-is-not-a-directory",children:'MountVolume.SetUp failed for volume "registration-dir" : hostPath type check failed: /var/lib/rancher/k3s/agent/kubelet/plugins_registry is not a directory'}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"# \u5728\u6BCF\u4E2A\u8282\u70B9\u4E0A\u6267\u884C\nsudo mkdir /var/lib/rancher/k3s/agent/kubelet/plugins_registry\n"})}),"\n",(0,t.jsx)(o.h2,{id:"unable-to-attach-or-mount-volumes-unmounted-volumesregistration-dir-unattached-volumesregistration-dir-lib-modules-socket-dir-host-dev-host-sys-longhorn-service-account-token-7ppv2-pods-mount-dir-host-kubernetes-csi-dir-timed-out-waiting-for-the-condition",children:"Unable to attach or mount volumes: unmounted volumes=[registration-dir], unattached volumes=[registration-dir lib-modules socket-dir host-dev host-sys longhorn-service-account-token-7ppv2 pods-mount-dir host kubernetes-csi-dir]: timed out waiting for the condition"}),"\n",(0,t.jsx)(o.h2,{id:"cannot-find-disk-config-file-maybe-due-to-a-mount-error",children:"cannot find disk config file, maybe due to a mount error"}),"\n",(0,t.jsx)(o.p,{children:"\u8282\u70B9\u4E0A\u78C1\u76D8\u4E0D\u5B58\u5728\uFF0C\u5220\u9664\u91CD\u5EFA"}),"\n",(0,t.jsx)(o.h2,{id:"\u8282\u70B9-allocated-\u4E3A\u8D1F",children:"\u8282\u70B9 Allocated \u4E3A\u8D1F"}),"\n",(0,t.jsx)(o.p,{children:"\u5220\u9664 disk \u4ECE\u65B0\u521B\u5EFA\uFF0C\u5982\u679C\u9009\u62E9\u7684\u76EE\u5F55\u4E0D\u5B58\u5728\u53EF\u80FD\u4E5F\u4F1A\u6709\u95EE\u9898"}),"\n",(0,t.jsx)(o.h2,{id:"\u5378\u8F7D",children:"\u5378\u8F7D"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"kubectl delete -f https://raw.githubusercontent.com/longhorn/longhorn/v1.1.0/deploy/longhorn.yaml\nkubectl delete -f https://raw.githubusercontent.com/longhorn/longhorn/v1.1.0/uninstall/uninstall.yaml\n\n# \u5982\u679C CRD \u8FD8\u5728\u53EF\u4EE5\u5F3A\u5236\u5220\u9664\nfor crd in $(kubectl get crd -o jsonpath={.items[*].metadata.name} | tr ' ' '\\n' | grep longhorn.rancher.io); do\n  kubectl -n ${NAMESPACE} get $crd -o yaml | sed \"s/\\- longhorn.rancher.io//g\" | kubectl apply -f -\n  kubectl -n ${NAMESPACE} delete $crd --all\n  kubectl delete crd/$crd\ndone\n"})}),"\n",(0,t.jsx)(o.h2,{id:"driver-name-driverlonghornio-not-found-in-the-list-of-registered-csi-drivers",children:"driver name driver.longhorn.io not found in the list of registered CSI drivers"}),"\n",(0,t.jsx)(o.h2,{id:"still-connecting-to-unixcsicsisock",children:"Still connecting to unix:///csi/csi.sock"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"longhorn-csi-plugin \u542F\u52A8\u5931\u8D25"}),"\n"]})]})}function u(e={}){let{wrapper:o}={...(0,i.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},79938:function(e,o,n){n.d(o,{Z:function(){return l},a:function(){return s}});var r=n(75271);let t={},i=r.createContext(t);function s(e){let o=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(o):{...o,...e}},[o,e])}function l(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(i.Provider,{value:o},e.children)}}}]);