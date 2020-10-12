---
id: alpine-intro
title: Alpine 入门
date: 2018-02-26
---

## Alpine 的优点

> Small. Simple. Secure.
>
> Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox.
>
> Alpine Linux 是一个基于 musl libc 和 busybox, 面向安全, 轻量级的 Linux 发布版.

<!-- more -->

* 开源
* 轻量级
  * 最小安装 5MB
  * 大部分都是静态链接
  * musl
  * openrc
* 稳定滚动升级
  * 有稳定版和最新版
  * 每半年一个稳定版
  * 稳定版会维护两年
  * 可非常简便的升级
* 简单的包管理
  * Apk
  * 包的构建也很简单
* 现代化
  * 内核版本较新
    * 能够利用上很多新内核的功能
  * 包版本比较新
    * 例如 zfs, docker 等都是对应版本的最新版
* 生态圈丰富
  * 包非常多
* 支持较多平台
  * x86
  * x86_64
  * armhf
  * armv7
  * aarch64
  * ppc64le
  * s390x
* 支持树莓派
* 很多 docker 镜像基于 AlpineLinux
  * Docker For Mac 的基础系统是 AlpineLinux

<!--
3.8 之后因为授权问题移除
* 安全
  * 默认附带 Linux 安全模块
  * PaX
  * grsec
-->

## Alpine 的缺点

* 文档不够全面
  * Wiki 内容较少, 更新不多
* musl libc 可能有兼容问题, 有时候需要补丁
  * 但越来越多的开发者也都会做兼容了

## 参考资源

* [运维笔记](./alpine-ops.md)
* [下载页](https://alpinelinux.org/downloads/)
* [维基](https://wiki.alpinelinux.org/wiki/Main_Page)

## 安装

### 系统镜像选择
官方 [下载页](https://alpinelinux.org/downloads/) 列了几种类型的镜像, 所有镜像的构建脚本位于 [alpinelinux/alpine-iso](https://github.com/alpinelinux/alpine-iso).

> __TIPS__
> 1. 做安装盘建议选择 EXTENDED, 在不需要 setup-repository 的前提下也能够安装到硬盘.
> 2. 仓库镜像中也能下载系统镜像 [v3.10/releases](http://mirrors.aliyun.com/alpine/v3.10/releases/)

* STANDARD
  * 标准镜像
  * 镜像较少, 安装需要网络连接
* EXTENDED
  * 扩展镜像
  * 附带了常用包, 安装不需要网络连接; 适用于路由和服务器
* VANILLA
  * 未 [Hardened](../linux/security/grsecurity) 的镜像
  * 自 3.8 开始，已经没有 hardened 的内核了
* VIRTUAL
  * 适用于虚拟机的镜像
* XEN
  * 适用于 XEN 虚拟化的镜像
* MINI ROOT FILESYSTEM
  * 最小根目录系统
  * 适用于容器和 chroot
* RASPBERRY PI
  * 树莓派系统
* GENERIC ARM
  * 通用 ARM 系统

### 版本选择

主要分为稳定版和 edge 版, 主要区别在于内核和包版本不同. 稳定版很容易升级到下一个版本, 修改仓库中的版本号进行更新即可.

> __TIPS__
> 推荐使用稳定版

* v3.10
  * 稳定版
* edge
  * 最新版

### 仓库选择
仓库分为三个版本, 安装包时可指定仓库.

> __TIPS__
> 推荐只添加 main 和 community 仓库, testing 仓库可以添加到 @testing 标签下或安装时指定.

* main
  * 官方维护的主要仓库
* community
  * 社区维护仓库
* testing
  * 测试仓库
  * 只有 edge 版有
  * 很多不稳定的, 或最新的包在该仓库下

### 仓库镜像选择

Alpine 仓库有很多镜像, 在中国一般推荐使用国内的镜像, 而不是官方列表里的镜像.

镜像地址位于 `/etc/apk/repository`, 个人一般使用[阿里云镜像](http://mirrors.aliyun.com/alpine).

### 安装部署方式选择

* 学习阶段
  * 可以使用 VPS+Takeover 来使用 AlpineLinux
  * 虚拟机/Qemu
    * 从 CD 启动, 安装到硬盘
    * 从已安装的硬盘镜像启动
* 使用
  * 将系统盘做到 USB 从 USB 启动
    * 在服务器上使用时也可以考虑将系统做在 USB 上, 方便维护和服务器更换
    * 安装可以在虚拟机中安装, 或者做一个工具 USB 系统, 专门用来安装维护
  * 将系统盘安装到物理硬盘
    * 从工具 USB 系统进入, 直接可安装到物理硬盘
* 服务器部署
  * 网络安装

### 制作安装盘
* [wiki/Installation](https://wiki.alpinelinux.org/wiki/Installation)

将系统镜像做到 USB 以便于从 USB 启动安装.

```bash
# 使用 3.10 版本
ALP_VER=v3.10
# 下载镜像
wget http://mirrors.aliyun.com/alpine/$ALP_VER/releases/x86_64/alpine-extended-$ALP_VER.0-x86_64.iso

# 方式一 将启动盘镜像做到 USB 从 USB 启动
# ====================
# 假设 USB 盘为 /dev/sdb
dd if=alpine-extended-$ALP_VER.0-x86_64.iso of=/dev/sdb

# 方式二 将系统安装到 USB, 从 USB 启动
# ====================
# VirtualBox 可以从 iso 启动, 并添加 USB 设备, 安装到 USB
# Qemu 可以直接命令行启动然后进行安装
# 注意: macOS 下需要先将 USB 盘进行 `diskutil unmountdisk /dev/disk2` 卸载操作, 并且启动 qemu 需要 sudo
qemu-system-x86_64 -cdrom alpine-extended-$ALP_VER.0-x86_64.iso -boot b -hda /dev/sdb -net nic -net user
```

### 开始安装

```bash
# 方式一 使用完整的安装脚本安装
# ====================
# 可能会需要网络
setup-alpine

# 方式二 先启动网络和 SSH 进行远程安装
# ====================
# 配置网络
setup-interfaces
# 重启网络服务
rc-service networking restart
# 安装 OpenSSH
setup-sshd -c openssh
# 允许 root 远程登陆
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
# 重启 ssh 服务
rc-service sshd restart
# 设置密码
passwd
# 然后即可远程安装
# 主要便于粘贴复制命令

# 方式三 直接安装到磁盘
# ====================
# 使用 extended 镜像可直接离线安装到物理磁盘, standard 需要网络
# 使用询问的方式安装
setup-disk

# 直接安装
# -m 为安装模式, sys 是作为系统盘安装
# -s 指定交换区大小, 0 为不要交换区
# -v 指定安装盘
# 安装时可指定磁盘格式, 对新手不建议修改, 默认 ext4, 其他的可使用 btrfs 和 lvm 等
setup-disk -m sys -s 0 -v /dev/sdb
```

## 概括

Alpine 的安装还是非常简单的，并非十分快速简洁，因此可以多多尝试。Alpine 的使用体验也是一样的，简单易用，开始你的 Alpine 之旅吧。
