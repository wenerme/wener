---
title: veth
---

# veth

- Virtual Ethernet Device - 虚拟以太网设备
  - 可以理解为一条网线，有两头
  - 可用于连接不同网络命名空间，桥接不同物理设备
  - 数据从一端接收后立即传到另一端
  - 一端 down 后另一端也无法使用

```bash
# veth0 和 veth1 为网线两端
ip link add veth0 type veth peer name veth1

# 修改 veth0 到 netns
ip link set veth0 netns ns1
# 创建到 netns
ip link add veth0 netns ns1 type veth peer veth1 netns ns2
```
