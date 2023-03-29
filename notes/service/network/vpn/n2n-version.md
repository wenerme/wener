---
title: n2n version
tags:
  - Version
---

# n2n version

| version | date       |
| ------- | ---------- |
| n2n 3.0 | 2021-10-28 |
| n2n 2.8 | 2020-08-12 |

## 3.0

- 3.0 与 2.8 不兼容
- edge
  - -a 地址支持 cidr - 移除 -s 指定 netmask
  - 支持自动 IP - 忽略 -a
  - 移除 -d 指定 tap 设备
  - -R 支持过滤规则
  - -S2 支持 TCP
  - -I 标识信息
  - -J,-P 授权
- supernode
  - 支持 federation
  - community.list 支持正则
- [3.0 release](https://github.com/ntop/n2n/releases/tag/3.0)
