---
slug: alpine-in-firecracker
title: Firecracker 运行 AlpineLinux
---

# Firecracker 运行 AlpineLinux

Firecracker 是亚马逊 AWS 为了解决虚拟化运行 serveless 服务实现的 VMM/Virtual Machine Monitor，作为 QEMU 的替代品，专注于为云上环境提供虚拟化。

__优点__

* 启动快 < 125ms
* 内存占用少 < 5mb
* Rust 实现
* musl 静态链接
* firecracker 自身约 1.6 MB - __无依赖__

<!-- more -->

__设计目标/缺点__

* 基于 KVM 实现
  * 只有 Linux 平台
  * 只能运行相同架构
* 专注于虚拟化场景
  * 支持的虚拟设备少
    * virtio-net - 虚拟化网络
    * virtio-block - 虚拟化块设备
    * virtio-vsock - unix sock
    * 串口 - ttyS0 终端登陆
    * 最简键盘控制器
  * 没有 bios
  * 通过 vmlinux+initramfs+rootfs 启动
* 要求 Kernel 4.14+

__为什么选择 Alpine？__

* 最容易构建
* 最容易使用
* 构建 Firecracker 能使用的 CentOS, Debian, Ubuntu, Fedora 真太难了 - 如果没掌握内部启动机制不建议尝试

## 注意

一些注意事项写在前面：

:::note

- 没有电源管理，因此不支持重启，会直接退出
- 系统内 poweroff 或 halt 不会退出 - reboot 会
- 可以发送 SendCtrlAltDel 退出
- 不支持 QCOW2 格式，可以考虑配合 NDB 使用
- alpine 内核需要 boot-source.initrd_path => initramfs-virt
- alpine netboot 的 initramfs-virt 没有 ext4

:::


## 安装

Firecracker 的[发布页](https://github.com/firecracker-microvm/firecracker/releases)可直接下载每个版本。这里使用 curl 下载最新版并安装到 `/usr/loca/bin`。

```bash
# 下载安装 firecracker 到 /usr/local/bin/firecracker
latest=$(basename $(curl -fsSLI -o /dev/null -w  %{url_effective} https://github.com/firecracker-microvm/firecracker/releases/latest))
sudo curl -L -o /usr/local/bin/firecracker https://github.com/firecracker-microvm/firecracker/releases/download/${latest}/firecracker-${latest}-$(uname -m)
chmod +x /usr/local/bin/firecracker
```

## rootfs
启动 firecracker 需要 kernel 和 rootfs，实际使用的时候可能大部分时间都是在准备 rootfs。这里使用 alpinelinux，功能完善构建简单。

因为 alpine 都会提供基础的 rootfs，这里直接下载解压到 ext4 的 loopdev 中。

```bash
# 创建 root 盘
# qemu-img create -f raw alpine.rootfs.ext4 1G
fallocate -l 1G ubuntu.rootfs.ext4
# 格式化为 ext4
mkfs.ext4 ./alpine.rootfs.ext4
# 挂载到 /tmp/rootfs
mkdir /tmp/rootfs
sudo mount alpine.rootfs.ext4 /tmp/rootfs

# 下载 rootfs
curl -OJ https://mirrors.aliyun.com/alpine/v3.12/releases/x86_64/alpine-minirootfs-3.12.0-x86_64.tar.gz
# 安装到 /tmp/rootfs
sudo tar zxvf alpine-minirootfs-3.12.0-x86_64.tar.gz -C /tmp/rootfs/
```

基础 rootfs 还不足以启动系统，因为无法进行系统 init，因此还需要在 rootfs 中安装必要的包启动必要的服务。

进入 rootfs 之前需要 resolv.conf，包含了 DNS 信息。

```bash
# 拷贝 dns 配置 - 没有会无法进行 dns 解析
sudo cp /etc/resolv.conf /tmp/rootfs/etc
# 如果主机是 alpinelinux 可以从主机拷贝配镜像置文件
# 如果不是建议设置镜像
# sudo cp /etc/apk/repositories /tmp/rootfs/etc/apk/repositories

# chroot 进入 rootfs 安装环境
sudo chroot /tmp/rootfs/ /bin/sh
```

此时进入了 rootfs，因为没有挂载 procfs、sysfs 等目录，并不是一个能完整使用的 rootfs，但对于安装包来说已经足够。

* [alpine-base](https://pkgs.alpinelinux.org/package/v3.12/main/x86_64/alpine-base)
  * 基础系统
  * 依赖了 openrc，layout，busybox，apk，conf 等基础包
* linux-virt
  * virt 内核 - 不包含固件（200MB左右），默认 init 包含 virtio 等内核模块
  * 安装后能获取到内核和 initramfs
  * /boot 下 vmlinuz+initramfs+System.map 约 15MB - 启动是不需要的，拿到后可以删除
* haveged
  * 随机熵服务
  * 虚拟化环境能更快启动，否则熵初始化可能需要几分钟

```bash
apk add alpine-base linux-virt haveged
# 开机启动
rc-update add haveged
# root 账号密码
echo root:root | chpasswd
# 基础服务
for svc in devfs procfs sysfs; do ln -fs /etc/init.d/$svc /etc/runlevels/boot; done
exit

# firecracker 使用 ttyS0
ln -s agetty /etc/init.d/agetty.ttyS0
echo ttyS0 > /etc/securetty
rc-update add agetty.ttyS0 default

# 从 rootfs 获取到 vmlinuz 和 initramfs
sudo cp /tmp/rootfs/boot/initramfs-virt initramfs-virt
sudo cp /tmp/rootfs/boot/vmlinuz-virt vmlinuz-virt

# 取消挂载
sudo umount /tmp/rootfs
```

rootfs 准备完成。

## vmlinux+initrd

这里解释一下 rootfs 拿到的 Linux 内核 vmlinuz-virt 和初始内存镜像 initramfs-virt

* vmlinuz-virt
  * 压缩后的 Linux 内核 - 需要解压后 firecracker 才能识别
  * 解压后为 ELF 格式可执行文件 - 与一般 Linux 下可执行文件相同
* initramfs-virt
  * 压缩后的 cpio 格式
  * 包含了 Linux 内核需要的 virtio 和 ext4 等模块
  * 包含了 Alpine 的 init 系统
    * 加载内核模块
    * 找到并挂载 rootfs

因为内核是压缩后的，因此还需要进行解压

```bash
# 下载安装 extract-vmlinux
sudo curl -L -o /usr/local/bin/extract-vmlinux https://raw.githubusercontent.com/torvalds/linux/master/scripts/extract-vmlinux
sudo chmod +x /usr/local/bin/extract-vmlinux
# 解压 vmlinuz-virt
extract-vmlinux vmlinuz-virt > vmlinux-virt
```

## 启动
所有准备工作已完成，得到

* alpine.rootfs.ext4 - 系统盘
* vmlinux-virt - 内核
* initramfs-virt - 初始内存镜像

firecracker 有两种启动方式

1. 监听端口/socket
  * 通过调用接口配置 rootfs、内核等
  * 配置完成后请求 InstanceStart 进行启动
2. 通过配置文件配置
  * 配置文件等同于接口请求
  * 参数内容和路径与接口一致

这里使用方法 #2，因为书写可编辑简单。

```bash
# 生成 alpine.json 配置
cat <<CONF > alpine.json
{
  "boot-source": {
    "initrd_path": "initramfs-virt",
    "kernel_image_path": "vmlinux-virt",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off modules=virtio_mmio,ext4 rootfstype=ext4"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "alpine.rootfs.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 1024,
    "ht_enabled": false
  }
}
CONF

# 配置完成 - 启动
# 进入后使用 root:root 登陆
firecracker --api-sock /tmp/firecracker.socket --config-file alpine.json
```

## 停止
:::warn

firecracker 不能使用 poweroff 关机

:::

在系统之外可以请求 `Ctrl+Alt+Del` 进行关机，实质上是重启的效果，但因为 firecracker 不能重启，因此 init 退出后就关机了。

```bash
curl --unix-socket /tmp/firecracker.socket -i \
    -X PUT "http://localhost/actions" \
    -H  "accept: application/json" \
    -H  "Content-Type: application/json" \
    -d '{"action_type": "SendCtrlAltDel"}'
```


系统内可以直接 `reboot` 进行关机。

## 总结

Firecracker 使用起来蛮惊艳，能成功的快速的启动系统，启动速度会比 QEMU 快不少，因为少了 bios、bootloader、内核解压 等过程。

因为 Firecracker 优缺点非常明显，这里总结一下适用场景：

* serveless 场景 - 需要快速起停
* 处于安全考虑进行容器执行环境隔离 - 作为容器运行时
* 将应用打包为系统进行分发，使用 firecracker 屏蔽系统差异

不适用场景也很明显：

* 如果需要使用 CentOS、Debian、Ubuntu 之类系统，非常不建议
  * 构造一个可使用的 rootfs 和 initramfs 非常麻烦
* 需要用到的设备 firecracker 可能不支持
* 需要透传设备到 VM

Firecracker 相对较新，集成使用方面还有所欠缺，但在 Firecracker 擅长的领域使用起来是非常舒服的。

## 参考
* [boot-alpine-in-firecracker.sh](https://gist.github.com/wenerme/97a2f088496bb3e6492ef7e8fe23da8a) - 以上所有代码
* [firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker) - 核心仓库
* [firecracker-microvm/firectl](https://github.com/firecracker-microvm/firectl) - Golang 实现用于管理 firecracker 虚拟机的辅助工具
