---
tags:
  - Version
---

# OpenZFS Version

| version          | date       | Linux             | FreeBSD |
| ---------------- | ---------- | ----------------- | ------- |
| [OpenZFS 2.1]    | 2021-07-03 | Kernel 3.10+      | 12.2    |
| [OpenZFS 2.0]    | 2020-10-01 | Kernel 3.10+      | 12.2    |
| [ZfsOnLinux 0.8] | 2019-05-24 | Kernel 2.6.32-5.9 |

:::tip Roadmap

- RAIDz 扩容

:::

## OpenZFS 2.1

- dRAID
- compatibility 属性
  - 控制 pool 需要什么特性
  - 让 pool 能更好支持跨平台 - BSD, Linux
- `zpool influxdb`
- https://github.com/openzfs/zfs/releases/tag/zfs-2.1.0

## OpenZFS 2.0

- ZfsOnLinux -> OpenZFS
  - 合并 BSD ZFS 和 Linux ZFS 代码
  - Linux ZFS 获得了很多新的功能
  - 后续开发迭代更快
- zstd 压缩
- TRIM, ACLMODE
- NFSv4 ACLs
- AES-GCM 加密
- Direct IO
- 持久化 L2ARC - 重启后缓存还可用
- scrub pause/resume
- https://github.com/openzfs/zfs/projects/25

## ZfsOnLinux 0.8

- 支持加密 - encryption
  - zfs send/receive -w
    - 发送接收也支持加密
- zpool remove
- zpool trim
  - 可开启 autotrim 后台自动操作
- zpool initialize
- zfs project, zfs projectspace
- zpool program - Lua 脚本管理
