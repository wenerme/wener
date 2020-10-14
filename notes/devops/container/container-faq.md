---
slug: container-faq
title: 容器常见问题
---

# FAQ
## docker vs containerd
* docker
  * 底层使用 containerd
  * 管理 volume、网络、swarm、service 等
* containerd
  * 暴露为 unix socket
  * grpc 接口
  * 封装容器运行时为统一接口
  * Linux 底层使用 runc
* containerd-shim
  * docker 启动的每个容器的父进程
  * 不对 docker 直接依赖，允许升级 docker 守护进程
  * 维护 STDIO 和 fds

* 注意
  * 因为 docker 统一管理，退出和清理都比较方便
  * conatinerd 可能需要手动清理残余的 shim
