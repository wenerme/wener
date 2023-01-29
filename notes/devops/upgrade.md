---
title: 系统升级
---

# 升级

- Kubernetes 一年 3 版本，版本支持 +/- 1
  - 因此至少半年升级一次
  - 升级建议重启系统 - 因此也可以附带升级系统
- AlpineLinux
  - 一年两个版本 - 5 月左右一个，11 月左右一个
  - 每年年底的 Linux 版本一般为 LTS - 因此下半年版本一般也会更新内核版本
  - 每个版本的支持周期约为两年 - 也就是共计 4 个活跃支持版本
    - main 仓库支持两年 - 发布后以稳定为主，基本不升级
    - community 仓库支持到下一个稳定版 - 一般半年
- Debian
  - 两年 一版本, Security 更新 三年, Long-term 五年
- Ubuntu
  - LTS - 5 年 支持 - 2 年 发布 - 10 年 扩展支持
- Postgres
  - 一年一个版本 - 一般每年 Q4 发布新版本，最近大多为 10 月
- 参考
  - Alpine [Version](../os/alpine/alpine-version.md)
  - Kubernetes [Version](./kubernetes/k8s-version.md)

## 手动升级 k3s/k0s

```bash
# k0s 手动升级
# ===========
tag=$(curl -sfL https://apis.wener.me/api/github/r/k0sproject/k0s/version?range=1.25 | jq -r .name)
curl -Lo k0s-$tag https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/$tag/k0s-$tag-amd64
curl -LO https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/$tag/k0s-airgap-bundle-$tag-amd64
sudo cp k0s-airgap-bundle-$tag-amd64 /var/lib/k0s/images/bundle_file
chmod +x k0s-$tag
sudo service k0scontroller stop
sudo cp k0s-$tag $(which k0s)
sudo service k0scontroller start

# k3s 手动升级
# ===========
tag=$(curl -sfL https://apis.wener.me/api/github/r/k3s-io/k3s/version?range=1.25 | jq -r .name)
curl -Lo k3s-$tag https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.25.5+k3s2/k3s
chmod +x k3s-$tag
sudo cp k3s-$tag $(which k3s)
sudo service k3s restart
```
