---
title: Linux Container
sidebar_title: LXC
hide_title: true
---

# Linux Container

- lxc package [content](https://pkgs.alpinelinux.org/contents?branch=edge&name=lxc&arch=x86_64&repo=main)
- [lxc/lxc](https://github.com/lxc/lxc)
- `~/.config/lxc/default.conf`
- 存储
  - dir - 默认
    - /var/lib/lxc/container/rootfs
    - `~/.local/share/lxc/<name>/rootfs`
  - lvm
  - loop
  - btrfs
  - zfs
  - rbd
  - best
- man [lxc-create.1](https://linuxcontainers.org/lxc/manpages//man1/lxc-create.1.html)
- 参考
  - archlinux [lxc](https://wiki.archlinux.org/index.php/Linux_Containers)
  - [armhf lxc](https://gist.github.com/hack3d/8a3982329e1df77f380878ff7bbc7b03)

:::tip

- 可以 poweroff 退出 init
- lxc 可以嵌套

:::

```bash
# /usr/share/lxc/templates/lxc-download
# /lib/security/pam_cgfs.so
apk add lxc shadow-uidmap lxc-bridge lxc-pam lxc-download lxc-templates lxc-templates-oci

# 启动 lxcbr0 - 默认网段
service dnsmasq.lxcbr0 start

# 已安装 template
ls /usr/share/lxc/templates/
# 查看参数
/usr/share/lxc/templates/lxc-download -h

# https://images.linuxcontainers.org
# 使用 tuna 镜像
lxc-create -t download -n alpine-amd64 -- -d alpine -r 3.12 -a amd64 --server mirrors.tuna.tsinghua.edu.cn/lxc-images
# 前台启动
# -d 后台启动
lxc-start -n alpine-amd64 -F
# 启动一个 shell
lxc-attach -n alpine-amd64

# 查看运行的容器
lxc-ls --fancy
# 停止容器
lxc-stop -n alpine-amd64
```

| command           | desc                                                 |
| ----------------- | ---------------------------------------------------- |
| lxc-attach        | start a process inside a running container           |
| lxc-autostart     | start/stop/kill auto-started containers              |
| lxc-cgroup        | manage the control group associated with a container |
| lxc-checkconfig   | check the current kernel for lxc support             |
| lxc-checkpoint    | checkpoints and restores containers                  |
| lxc-config        | query LXC system configuration                       |
| lxc-console       | Launch a console for the specified container         |
| lxc-copy          | copy an existing container                           |
| lxc-create        | creates a container                                  |
| lxc-destroy       | destroy a container                                  |
| lxc-device        | manage devices of running containers                 |
| lxc-execute       | run an application inside a container                |
| lxc-freeze        | freeze all the container's processes                 |
| lxc-info          | query information about a container                  |
| lxc-ls            | list the containers existing on the system           |
| lxc-monitor       | monitor the container state                          |
| lxc-snapshot      | Snapshot an existing container                       |
| lxc-start         | run an application inside a container                |
| lxc-stop          | stop the application running inside a container      |
| lxc-top           | monitor container statistics                         |
| lxc-unfreeze      | thaw all the container's processes                   |
| lxc-unshare       | Run a task in a new set of namespaces                |
| lxc-update-config | update a legacy pre LXC 2.1 configuration file       |
| lxc-usernsexec    | Run a task as root in a new user namespace           |
| lxc-wait          | wait for a specific container state                  |

```bash
modprobe configs
lxc-checkconfig
# 检测其他 kernel 配置
CONFIG=/boot/config-lts /usr/bin/lxc-checkconfig

# 所有配置
lxc-config -l
# 默认配置
# $HOME/.config/lxc/default.conf
lxc-config lxc.default_config
# 路径位置
# $HOME/.local/share/lxc
lxc-config lxc.lxcpath

lxc-attach -n container -- /etc/init.d/cron restart
```

## 非特权 LXC 配置

```bash
# sudo usermod -v 100000-200000 -w 100000-200000 $USER
echo "session    optional   pam_cgfs.so -c freezer,memory,name=systemd,unified" >> /etc/pam.d/system-login
# echo "lxc.idmap = u 0 100000 65536" >> /etc/lxc/default.conf
# echo "lxc.idmap = g 0 100000 65536" >> /etc/lxc/default.conf

echo root:100000:65536 | sudo tee -a /etc/subuid
echo root:100000:65536 | sudo tee -a /etc/subgid

mkdir -p ~/.config/lxc

# 包含全局配置可以少配置一些
echo "lxc.include = /etc/lxc/default.conf" > ~/.config/lxc/default.conf

echo "lxc.idmap = u 0 100000 65536" > ~/.config/lxc/default.conf
echo "lxc.idmap = g 0 100000 65536" >> ~/.config/lxc/default.conf
echo "lxc.net.0.type = veth" >> ~/.config/lxc/default.conf
echo "lxc.net.0.link = lxcbr0" >> ~/.config/lxc/default.conf

echo "$USER veth lxcbr0 2" | sudo tee -a /etc/lxc/lxc-usernet
```

## 配置

- [lxc.conf.5](https://linuxcontainers.org/lxc/manpages/man5/lxc.conf.5.html)
- [lxc.container.conf.5](https://linuxcontainers.org/lxc/manpages/man5/lxc.container.conf.5.html)
- [lxc.system.conf.5](https://linuxcontainers.org/lxc/manpages//man5/lxc.system.conf.5.html)
- [lxc-usernet.5](https://linuxcontainers.org/lxc/manpages/man5/lxc-usernet.5.html)

## lxc

- [lxc.7](https://linuxcontainers.org/lxc/manpages/man7/lxc.7.html)

# FAQ

## Docker in LXC

- https://stackoverflow.com/a/25885682/1870054

```ini
lxc.apparmor.profile = lxc-container-default-with-nesting
```

## 配置错误或不存在

```bash
# 升级配置
lxc-update-config -c ~/.local/share/lxc/alpine-amd64/config
```

