---
title: Longhorn 常见问题
---

# Longhorn 常见问题


## Longhorn on K3S
* https://longhorn.io/docs/1.1.0/advanced-resources/os-distro-specific/csi-on-k3s/

## Error deploying driver: failed to get kubelet root dir, no related proc for root-dir detection, error out

```yaml
csi:
  # 1.0.2
  # https://github.com/longhorn/longhorn/issues/1861#issuecomment-705297295
  kubeletRootDir: /var/lib/rancher/k3s/agent/kubelet
```

* [#1861](https://github.com/longhorn/longhorn/issues/1861)

```
time="2021-02-23T16:39:59Z" level=error msg="failed to get arg root-dir. Need to specify \"--kubelet-root-dir\" in your Longhorn deployment yaml.: failed to get kubelet root dir, no related proc for root-dir detection, error out"
time="2021-02-23T16:39:59Z" level=fatal msg="Error deploying driver: failed to get arg root-dir. Need to specify \"--kubelet-root-dir\" in your Longhorn deployment yaml.: failed to get kubelet root dir, no related proc for root-dir detection, error out"
```

## MountVolume.SetUp failed for volume "registration-dir" : hostPath type check failed: /var/lib/rancher/k3s/agent/kubelet/plugins_registry is not a directory

```bash
# 在每个节点上执行
sudo mkdir /var/lib/rancher/k3s/agent/kubelet/plugins_registry
```

## Unable to attach or mount volumes: unmounted volumes=[registration-dir], unattached volumes=[registration-dir lib-modules socket-dir host-dev host-sys longhorn-service-account-token-7ppv2 pods-mount-dir host kubernetes-csi-dir]: timed out waiting for the condition

## cannot find disk config file, maybe due to a mount error
节点上磁盘不存在，删除重建

## 节点 Allocated 为负
删除 disk 从新创建，如果选择的目录不存在可能也会有问题

## 卸载

```bash
kubectl delete -f https://raw.githubusercontent.com/longhorn/longhorn/v1.1.0/deploy/longhorn.yaml
kubectl delete -f https://raw.githubusercontent.com/longhorn/longhorn/v1.1.0/uninstall/uninstall.yaml

# 如果 CRD 还在可以强制删除
for crd in $(kubectl get crd -o jsonpath={.items[*].metadata.name} | tr ' ' '\n' | grep longhorn.rancher.io); do
  kubectl -n ${NAMESPACE} get $crd -o yaml | sed "s/\- longhorn.rancher.io//g" | kubectl apply -f -
  kubectl -n ${NAMESPACE} delete $crd --all
  kubectl delete crd/$crd
done
```

## driver name driver.longhorn.io not found in the list of registered CSI drivers

## Still connecting to unix:///csi/csi.sock
* longhorn-csi-plugin 启动失败
