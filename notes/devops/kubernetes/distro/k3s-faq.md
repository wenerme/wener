---
id: k3s-faq
title: K3S 常见问题
---


# K3S 常见问题

## docker vs containerd
* 建议使用 docker
* docker
  * 操作运维熟悉
  * 可独立使用
  * docker 命令好用
  * 镜像、缓存会更加友好 - 虽然 containerd 有 docker shim
* containerd
  * docker 底层也是使用的 containerd
  * 因此使用 docker 会额外消耗一些内存
  * 没有专用的 cli - crictl 主要用于调试


## k3s 状态清理
* K3S 节点重置
* cni0 和 flannel.1 不一定存在
  * 取决于安装方式
  * /var/lib/cni

__脚本清理__

```bash
# 如果通过 get.k3s.io 安装会有该脚本
/usr/local/bin/k3s-killall.sh
```
__手动清理__

```bash
# 清理 iptables 规则
iptables-save | grep -v KUBE- | grep -v CNI- | iptables-restore
iptables-save | grep -v 10.4[2,3] | iptables-restore

# 容器镜像清理
# 停止所有 pod，清除停止容器，清除 volume，但保留下载的镜像
docker stop $(docker ps -aq)
docker system prune --volumes -f
docker system prune -f
# 如果不想保留镜像
# docker system prune -a
# 取消所有挂载
sudo umount $(mount -v | grep '/var/lib/kubelet' | awk '{print $3}')
# k3s 和 kubelet 状态
sudo rm -rf /var/lib/rancher
sudo rm -rf /var/lib/kubelet
# kubeconf
rm /etc/rancher/k3s/k3s.yaml -f
# 日志清理
sudo rm -rf /var/log/containers/*
sudo rm -rf /var/log/pods/*
sudo rm -f /var/log/k3s.log

# 如果用了数据库
echo drop table if exists kine | psql -d $DATABASE_URL

# 如果有日志文件，例如 --log k3s-server.log --alsologtostderr
rm k3s{,-server,-agent}.log -f

ip li del cni0
ip li del flannel.1
rm -rf /var/lib/cni/*
```


## K3S 部署资源使用情况分析

* AlpineLinux - 50M
  * 显存 32M
  * sshd,tincd,dbus
* dockerd - 97M + shim/8M
* containerd - 50M + shim/11M
  * docker 也依赖 containerd
* server 550M
  * `--disable=traefik，servicelb`
  * server 也会启动 agent
  * 容器
    * metrics-server
    * coredns
    * local-path-provisioner
* agent 180M
* 运行基础服务 - ingress-nginx, metallb, cert-manager, kubernetes-dashboard
  * server - 1G
  * agent - 450M
  * +linkerd
    * server 1.55G
    * agent 920M

