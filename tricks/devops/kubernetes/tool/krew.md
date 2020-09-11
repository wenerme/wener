---
id: krew
title: krew
---

# krew
## Tips
* [安装](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
* https://sigs.k8s.io/krew-index/plugins.md

```bash
(
  set -x; cd "$(mktemp -d)" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/krew.{tar.gz,yaml}" &&
  tar zxvf krew.tar.gz &&
  KREW=./krew-"$(uname | tr '[:upper:]' '[:lower:]')_amd64" &&
  "$KREW" install --manifest=krew.yaml --archive=krew.tar.gz &&
  "$KREW" update
)

# 默认目录 ~/.krew/bin/
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"

kubectl krew update
kubectl krew search whoami
kubectl krew install whoami

kubectl whoami
kubectl krew upgrade

# 服务管理
kubectl krew install ingress-nginx

# popeye - 扫描集群资源问题
# doctor - 扫描集群异常
# access-matrix - 权限检查 - https://github.com/corneliusweig/rakkess
# ctx ns - 上下文和空间切换 - 类似 kubectx
# tree - 查看资源层级
# konfig - 合并或分割配置
# oidc-login
# outdated
# rbac-lookup rbac-view
# sniff - Start a remote packet capture on pods using tcpdump and wireshark
# tail - multiple pods and containers using simple, dynamic source selection.
# view-secret
```
