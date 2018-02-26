# Alpine 入门

## 安装

### 系统镜像选择
官方 [下载页](https://alpinelinux.org/downloads/) 列了几种类型的镜像, 所有镜像的构建脚本位于 [alpinelinux/alpine-iso](https://github.com/alpinelinux/alpine-iso).

> TIPS:
>
> 1. 做安装盘建议选择 EXTENDED, 在不需要 setup-repository 的前提下也能够安装到硬盘.
> 2. 仓库镜像中也能下载系统镜像 [v3.7/releases](http://mirrors.aliyun.com/alpine/v3.7/releases/)

* STANDARD
  * 标准镜像
  * 镜像较少, 安装需要网络连接
* EXTENDED
  * 扩展镜像
  * 附带了常用包, 安装不需要网络连接; 适用于路由和服务器
* VANILLA
  * 未 [Hardened](./linux/grsecurity.md) 的镜像
  * 适用于调试
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

> TIPS
> 
> 推荐使用稳定版

* v3.7
  * 稳定版
* edge
  * 最新版

### 仓库选择
仓库分为三个版本, 安装包时可指定仓库.

> TIPS
>
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

镜像位于 `/etc/apk/repository`, 个人一般使用阿里云镜像(http://mirrors.aliyun.com/alpine).

### 开始安装
