---
title: k0s
---

# k0s

- 是什么？
  - 类似 k3s 的精简 k8s
  - 网络默认 calico
  - etcd 层使用 k3s 的 [k3s-io/kine](https://github.com/k3s-io/kine)
  - 背后由 Mirants 公司支持
  - bin 包含了 containerd
  - 自 2020 年 - 相比 k3s 要年轻很多

# FAQ

## k0s vs k3s
- k0s
  - CIS security benchmark
  - FIPS 140-2
- k3s
  - CNCF 项目 - 脱离了 rancher
  - 额外默认组件
    - helm-controller - 支持部署 helm chart, CDR 控制
    - traefik v1 - 提供 ingress 能力 - 通过 helm 部署
    - local-path-provisioner - 提供基于本地目录的存储类
    - klipper-lb - 基于 iptable 转发的负载均衡

| vs.         | k0s                  | k3s                             |
| ----------- | -------------------- | ------------------------------- |
| Version     | 独立版本 例如 v1.0.0 | 版本基于 k8s - 例如 1.19.1+k3s1 |
| Default CNi | calico               | flannel                         |
| 商业公司    | Mirants              | Rancher/SUSE                    |
