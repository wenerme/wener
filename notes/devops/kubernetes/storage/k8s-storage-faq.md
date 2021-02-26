# Kubernetest 存储问题

## pv 删除不了
尝试删除 finalizer


## volume already bound to a different claim

```bash
# 如果 pvc 不存在了但是 pv 还在，新创建 pvc 不会被绑定
# 尝试清除 claimRef - 设置为 null
kubectl patch pv my-pv-name -p '{"spec":{"claimRef": null}}'
```

## driver name driver.longhorn.io not found in the list of registered CSI drivers
* csi 插件目录 /var/lib/kubelet/plugins_registry
* hostpath /var/lib/kubelet/plugins/csi-hostpath
* /var/lib/kubelet/plugins
* k3s 可能目录 /var/lib/rancher/k3s/agent/kubelet
* [kubernetes-csi/csi-driver-host-path#71](https://github.com/kubernetes-csi/csi-driver-host-path/issues/71)
