---
title: LXD
hide_title: true
---

# LXD
* 是什么
  * 对 LXC 的封装 - 管理容器运行
  * 运行 daemon 暴露 rest 接口
  * 支持 kvm
  * 能管理 LXC 和 QEMU
* [lxc/lxd](https://github.com/lxc/lxd)
* lxd package [content](https://pkgs.alpinelinux.org/contents?branch=edge&name=lxd&arch=x86_64&repo=testing)
* [images.linuxcontainers.org](https://images.linuxcontainers.org/) - Image server for LXC and LXD
* vs LXC
  * 因为有了 daemon 因此更方便管理使用
  * 使用 Go 实现
  * lxc 命令包含了很多功能而不是之前 `lxc-*` 之类的命令
  * lxd 安装后 150MB，lxc 安装后 15 MB

:::note

- lxd 的核心命令是 __lxc__
  - 集成了之前 `lxc-*` 的功能
  - 类似于 2.0

:::

```bash
# 等同于 root 权限
usermod -a -G lxd $USER

# tuna 镜像
lxc remote add tuna-images https://mirrors.tuna.tsinghua.edu.cn/lxc-images/ --protocol=simplestreams --public
lxc image list tuna-images:
```

## KVM in LXC/LXD
* 可以尝试
* 参考
  * [LXD 4.0 quick recipe: LXC and KVM coexisting](https://discourse.ubuntu.com/t/15222)
```ini
# /dev/kvm
lxc.cgroup.devices.allow = c 10:232 rwm
```

```bash
lxc config device add CONTAINER kvm unix-char path=/dev/kvm
```


