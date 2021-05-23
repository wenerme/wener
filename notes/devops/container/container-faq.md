---
id: container-faq
title: 容器常见问题
hide_title: true
---

# 容器常见问题

## docker vs containerd

- docker
  - 底层使用 containerd
  - 管理 volume、网络、swarm、service 等
- containerd
  - 暴露为 unix socket
  - grpc 接口
  - 封装容器运行时为统一接口
  - Linux 底层使用 runc
- containerd-shim
  - docker 启动的每个容器的父进程
  - 不对 docker 直接依赖，允许升级 docker 守护进程
  - 维护 STDIO 和 fds
- 注意
  - 因为 docker 统一管理，退出和清理都比较方便
  - conatinerd 可能需要手动清理残余的 shim

## LXC vs LXD vs Docker

- Docker
  - 一般用于隔离运行单进程无状态应用
  - 不会考虑 init, supervisor, syslog, cron 等场景
  - 提供了特别多的管理功能
    - 打包
    - 构建
    - 网络插件
    - 存储插件
  - 有最完整的生态
  - 镜像通常围绕应用，甚至可能只是单应用可执行文件
  - 默认运行应用
- LXD
  - 类似于 Docker 通过 Daemon/守护进程 基于 liblxc 暴露 REST 接口提供管理容器功能
  - 在 liblxc 之上提供一些额外能力
  - 与 VMWare, KVM 技术竞争 - 作为 Hypervisor
- LXC
  - 内核暴露到用户空间的接口
  - 提供容器所需特性和能力
  - 提供简单的工具来创建和管理系统应用容器
  - VE - Virtual Environment - 虚拟环境 - 一个隔离的 OS 容器
  - 通过登陆进入
  - 有正常的 init, supervisor, syslog, cron
  - 更类似于 chroot 层的技术
    - 独立的进程和网络空间
  - 因为更底层，所以配置和使用会更难
  - 镜像通常是一个 OS
  - 默认运行 `/sbin/init`
- 参考
  - [lxc-vs-docker](https://archives.flockport.com/lxc-vs-docker)
  - [lxd-vs-docker](https://linuxhint.com/lxd-vs-docker)
  - [Docker vs. containerd vs. Nabla vs. Kata vs. Firecracker](https://www.inovex.de/blog/containers-docker-containerd-nabla-kata-firecracker/)
