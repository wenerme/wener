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

## 为什么

- 开源
- 轻量级
  - 最小安装 5MB
  - 大部分都是静态链接
  - musl
  - openrc
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
