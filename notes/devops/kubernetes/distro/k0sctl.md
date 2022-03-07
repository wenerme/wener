---
title: k0sctl
---

# k0sctl

- [k0sctl]
  - 辅助控制管理工具
  - 批量安装部署集群 - ssh
  - 备份、恢复、安装、卸载、升级
- 参考
  - [k0sproject/rig](https://github.com/k0sproject/rig)
    - SSH+WinRM 远程库
- alpine 默认会安装 findutils 和 coreutils 来满足 k0sctl 的功能

[k0sctl]: https://github.com/k0sproject/k0sctl

```bash
export DISABLE_TELEMETRY=true
export DISABLE_UPGRADE_CHECK=true

# --k0s 包含完整 k0s 配置
k0sctl init --k0s > k0sctl.yaml
# 修改 k0sctl.yaml
# -d 输出 debug 信息 - 包含执行的命令
k0sctl apply --config k0sctl.yaml

k0sctl kubeconfig > kubeconfig
kubectl get pods --kubeconfig kubeconfig -A
```

## k0sctl.yaml

```bash
# k0s k0s-v1.23.3+k0s.1-amd64
curl -LOC- 'https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-v1.23.3+k0s.1-amd64'
# airgap k0s-airgap-bundle-v1.23.3+k0s.1-amd64
curl -LOC- 'https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-airgap-bundle-v1.23.3+k0s.1-amd64'

# 也可以自己制作 airgap 包
k0s airgap list-images | xargs -I{} docker pull {}
docker image save $(k0s airgap list-images | xargs) -o bundle_file
```

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
# 角色 - 不推荐使用 single
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
    src: k0s-airgap-bundle-v1.23.3+k0s.1-amd64
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
