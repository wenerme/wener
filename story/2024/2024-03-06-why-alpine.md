---
slug: why-alpine
title: 为什么选择 Alpine Linux?
tags:
  - DevOps
  - Alpine
---

# 为什么选择 Alpine Linux?

> Small. Simple. Secure.
>
> Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox.
>
> Alpine Linux 是一个基于 musl libc 和 busybox, 面向安全, 轻量级的 Linux 发布版.

<!-- more -->

## 为什么 {#why}

small footprint, non-systemd, fast enough, good community, sane defaults.

阿里云、腾讯云、物理服务器、虚拟机、容器都适用 AlpineLinux.

1. 环境都一样，使用各方面熟悉，熟练
2. 小/快 - 阿里云 ECS 只需要上传一个 几十 MB 的镜像即可，从 0 安装只需要 3 分钟
3. 简单 - 可以由内而外的了解所有 alpine 细节，对于 debian 和 centos 我都做不到，因为太复杂
4. 跟上时代 - 内核 一般是最近的 lts，能快速利用上新的内核特性，比如现在 linux 内核支持 io_uring, ntfs
5. 快速更新 - 安全问题响应非常快 - 因为使用面非常广
6. 衍生业务集成系统 - 系统预装一些软件和服务 - 例如: k3sos

**不适用场景**

1. 机器学习 - ubuntu/debian 是最好的 - 最新 Linux 开始要集成 Nvidia 驱动，情况会有所好转，目前 Nvidia 官方尚未正式支持Alpine。
2. 商务用桌面系统 - 默认 xfce - _生态_ 和体验没有 ubuntu 好
3. 定制化嵌入式设备 - alpine 支持的 arch 远没有 debian 的多，如果 arch 支持可以考虑 alpine

**Not Convinced?**

- 轻量级
  - 最小安装 5MB
  - musl
  - openrc
- 部分包提供静态编译二进制，可在非 Alpine 环境使用
- 稳定滚动升级
  - 有稳定版和最新版
  - 每半年一个稳定版
  - 稳定版会维护两年
  - 可非常简便的升级
- 简单的包管理
  - APK 本地存储逻辑和结构非常简单
  - APK 仓库逻辑结构简单 - 不同于 deb/rpm
  - 包的构建也很简单 - abuild 能够在本地构建包
- 现代化
  - 内核版本较新
    - 能够利用上很多新内核的功能
  - 包版本比较新
    - 例如 zfs, docker 等都是对应版本的最新版
- 生态圈丰富
  - 包非常多
  - 兼容良好
  - 社区活跃
- 支持较多平台
  - x86_64
  - x86
  - aarch64
  - armhf
  - ppc64le
  - s390x
  - armv7
  - riscv64
- 支持树莓派
- 很多 docker 镜像基于 AlpineLinux
  - Docker For Mac 的基础系统是 AlpineLinux

## Alpine 的缺点 {#when-not}

- 文档不够全面
  - Wiki 内容较少, 更新不多
  - 但大多文档可参考 Arch 和 Gentoo
- musl libc 可能有兼容问题, 有时候需要补丁
  - 但越来越多的开发者也都会做兼容了
  - [常见的 Musl 问题](https://wener.me/notes/os/linux/libc/musl/faq)

## 使用过程常见问题 {#faq}

```bash
# 建议安装基础包，对新人使用相对友好
apk add curl busybox-extras file nano libc6-compat gcompat bash
```

- [使用 Alpine 的常见问题](https://wener.me/notes/os/alpine/faq)
- 制作各种 Docker 可参考 [wenerme/dockerfiles](https://github.com/wenerme/dockerfiles)
- 针对 Alpine 的各种 Ansible 任务 [wenerme/ansible-collection-wenerme-alpine](https://github.com/wenerme/ansible-collection-wenerme-alpine)
