---
title: k0s
---

# k0s

- [k0s] 是什么？
  - 类似 k3s 的精简 k8s
    - 无系统依赖 - 静态
    - 无外部依赖
  - 支持 amd64 Windows
  - 支持 amd64, arm, arm64
  - 网络
    - kube-router - 默认
      - 资源占用更少 - 比 calico 少 15%
      - 不支持 DualStack
      - 不支持 Windows
    - calico
      - 默认 vxlan overlay
      - 不支持 armv7
      - 支持 DualStack
      - 支持 Windowss
      - IPv6 不支持 tunnal
  - etcd 层使用 k3s 的 [k3s-io/kine](https://github.com/k3s-io/kine)
  - 背后由 Mirants 公司支持
  - bin 包含了 containerd
  - 自 2020 年 - 相比 k3s 要年轻很多

[k0s]: https://github.com/k0sproject/k0s
[k0sctl]: https://github.com/k0sproject/k0sctl

## 安装

- 数据目录 /var/lib/k0s - `--data-dir`
- /etc/k0s/containerd.toml

```bash
# K0S_VERSION 控制版本
# DEBUG 开启 set -x
# 从 https://github.com/k0sproject/k0s 下载到 /usr/local/bin/k0s
# chmod 755 /usr/local/bin/k0s
curl -sSLf https://get.k0s.sh | sudo sh

k0s sysinfo
# 生成配置
k0s config create > /etc/k0s/k0s.yaml
k0s config validate --config /etc/k0s/k0s.yaml

# 服务管理
# k0s install|start|stop|reset|status
# 运维
# k0s backup|restore
# Daemon
# k0s api|controller|worker
# CLI
# k0s ctr|kubectl|etcd

containerd config default > /etc/k0s/containerd.toml

```

## k0sctl

- [k0sctl]
  - 辅助控制管理工具
  - 批量安装部署集群 - ssh
  - 备份、恢复、安装、卸载、升级

```bash
k0sctl init > k0sctl.yaml
# 修改 k0sctl.yaml
k0sctl apply --config k0sctl.yaml

k0sctl kubeconfig > kubeconfig
kubectl get pods --kubeconfig kubeconfig -A
```

# FAQ


## Control plane vs. Worker

- Control plane
  - 作为其他组建的 守护进程/supervisor - 不调度工作负载
  - 不需要容器引擎、kubelet
  - kubectl get node 看不到
  - 维护 kine/etcd, api-server, scheduler, controller-manager, konnectivity-server, k0s-api
- Worker
  - 运行 kubelet
  - 依赖 cri - 默认你 containerd+runc
  - 调度工作负载
