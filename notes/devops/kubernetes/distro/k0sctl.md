---
title: k0sctl
---

# k0sctl

- [k0sctl]
  - 辅助控制管理工具
  - 批量安装部署集群 - ssh
  - 备份、恢复、安装、卸载、升级

```bash
# --k0s 包含完整 k0s 配置
k0sctl init --k0s > k0sctl.yaml
# 修改 k0sctl.yaml
k0sctl apply --config k0sctl.yaml

k0sctl kubeconfig > kubeconfig
kubectl get pods --kubeconfig kubeconfig -A
```

## k0sctl.yaml

```yaml title="k0sctl.yaml"
apiVersion: k0sctl.k0sproject.io/v1beta1
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ssh:
        address: 10.0.0.1
        user: admin
        port: 22
        keyPath: ~/.ssh/id_rsa
      role: controller+worker
  k0s:
    version: 1.23.3+k0s.1
    config: # k0s.yaml
```

```yaml title="spec.hosts"
# 角色
# controller, controller+worker, single, worker
role:
# 先下载到本地，再从本地上传 - 推荐开启
uploadBinary: true
k0sBinaryPath:

hostname:
installFlags: []
environment:
# 定义上传的文件
files:
  - name: image-bundle
    src: airgap-images.tgz
    dstDir: /var/lib/k0s/images/
    dst:
    dirPerm:
    user:
    group:
    perm: 0700

hooks:
  apply:
    before:
      - date > k0sctl-apply.log
    after:
      - echo "apply success" > k0sctl-apply.log
    reset:
os:
# 选择使用的私有网卡
privateInterface:
privateAddress:
ssh:
  address: 10.0.0.2
  user: ubuntu
  keyPath: ~/.ssh/id_rsa
  bastion:
    address: 10.0.0.1
    user: root
    keyPath: ~/.ssh/id_rsa2
localhost:
  enabled: false
```
