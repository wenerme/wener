---
title: Docker FAQ
---

# Docker FAQ

## 在 docker 中使用 docker

直接映射 /var/run/docker.sock

```bash
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name box wener/demo:test
```

## 非 root 绑定私有端口
* 一般来说添加 CAP_NET_BIND_SERVICE 即可，但是对非 root 无效
* 设置 sysctl `net.ipv4.ip_unprivileged_port_start=0` 即可
  * 需要 kernel 4.11+
  * ubuntu 18+

## 停止所有容器

```bash
docker stop $(docker ps -aq)
```

## 迁移数据目录
* /var/lib/docker 对 docker 性能影响较大

```bash
# 停止服务迁移数据
service docker stop
mkdir -p /data/docker
sudo rsync -aP /var/lib/docker/ /data/docker/

# 添加 data-root 配置
# { "data-root": "/data/docker" }
nano /etc/docker/daemon.json

# 启动
service docker start
# 查看新的配置
docker info | grep 'Root Dir'
```

## No swap limit support
* 添加内核参数 `cgroup_enable=memory swapaccount=1`
* 牺牲 1% 的内容，10% 性能来支持内存和交换区审计
* 一般 `cgroup_enable=memory` 会开启，但 `swapaccount` 不开
* 参考
  * [Runtime options with Memory, CPUs, and GPUs](https://docs.docker.com/config/containers/resource_constraints/)
  * [Your kernel does not support cgroup swap limit capabilities](https://docs.docker.com/engine/install/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities)


## 为已经运行的 Docker 容器添加端口映射

```bash
HOSTPORT=80
CONTAINERIP=172.16.0.2

iptables -t nat -A DOCKER -p tcp --dport ${HOSTPORT} -j DNAT --to-destination ${CONTAINERIP}:${HOSTPORT}
iptables -t nat -A POSTROUTING -j MASQUERADE -p tcp --source ${CONTAINERIP} --destination ${CONTAINERIP} --dport ${HOSTPORT}
iptables -A DOCKER -j ACCEPT -p tcp --destination ${CONTAINERIP} --dport ${HOSTPORT}
```
