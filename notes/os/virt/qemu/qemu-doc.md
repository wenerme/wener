---
title: QEMU 文档
---

# QEMU Document

- QEMU [User Guide](https://qemu.weilnetz.de/doc/7.0/)
- QEMU [Developers Guide](https://qemu.weilnetz.de/doc/devel/)
- 虚拟模式
- PC 系统模拟器
  - 标准选项
  - 块设备选项
  - USB 选项
  - 显示选项
    - `-display [type]`
      - sdl,curses,none,gtk,vnc
    - `-nographic`
    - `-alt-grab` - Ctrl-Alt-Shift
    - `-ctrl-grab` - Right-Ctrl
    - `-spice option[,option[,...]]`
      - spice 远程桌面协议
    - `-full-screen` 全屏的方式打开
    - `-g widthxheight[xdepth]`
      - 设置初始大小
    - `-vnc display[,option[,option[,...]]]`
      - 参数
  - 网络
  - 字符设备
  - 蓝牙
  - TPM 设备
  - Linux/Multiboot 启动
  - 调试和专家选项
    - `-serial [dev]`
      - 转发虚拟串口到主机的字符设备
      - `vc[:WxH]` Virtual console
      - pty, none, null, chardev:id, /dev/XXX, stdio, pipe:filename,, COMn
      - `udp:[remote_host]:remote_port[@[src_ip]:src_port]`
      - `tcp:[host]:port[,server][,nowait][,nodelay][,reconnect=seconds]`
      - `telnet:host:port[,server][,nowait][,nodelay]`
      - `unix:path[,server][,nowait][,reconnect=seconds]`
      - /dev/parportN
      - mon:dev_string
      - braille
      - msmouse
    - `-S` - 启动时不启动 CPU, 手动输入 `c`
    - `-bios file` - 指定 BIOS 文件
    - `-no-reboot` - 退出而不是重启
    - `-enable-kvm`
      - 是否启用 KVM
    - `-enable-hax`
      - 是否启用 HAX (Hardware-based Acceleration eXecution)
      - 只对 Mac 和 Windows 有效
    - `-loadvm [file]`
      - 加载保存的状态
    - `-daemonize` - 后台运行
    - `-readconfig file` - 从文件读取设备配置
    - `-writeconfig file` - 将设备配置写入到文件
  - 监控
  - 磁盘镜像
  - 网络模拟器
  - 其他设备
  - 直接 Linux 启动
  - USB 模拟器
  - VNC 安全相关
  - 平台相关选项
  - 非 PC 系统模拟器
    - PowerPC
    - Sparc32
    - Sparec64
    - MIPS
    - ARM
    - Cris
    - ClodFire
    - Cris
    - Microblaze
    - Sh4
    - Xtensa
  - 客户端调用
  - 用户空间模拟器
    - Linux
    - BSD

```bash
# 查看支持的机器
qemu-system-x86_64 -machine help
# 支持的 CPU
qemu-system-x86_64 -cpu help
# ARM 支持 raspi2
qemu-system-arm -machine help | grep rasp
# 查看日志项
qemu-system-x86_64 -d help

# Alpine virt 版, 30M 左右, alpine-standard 为 100M 左右
wget http://dl-cdn.alpinelinux.org/alpine/v3.6/releases/x86_64/alpine-virt-3.6.2-x86_64.iso

# WARNING: Image format was not specified for 'alpine-virt-3.6.2-x86_64.iso' and probing guessed raw.
#          Automatically detecting the format is dangerous for raw images, write operations on block 0 will be restricted.
#          Specify the 'raw' format explicitly to remove the restrictions.
qemu-system-x86_64 alpine-virt-3.6.2-x86_64.iso
# 这样就不会出现警告
qemu-system-x86_64 -cdrom alpine-virt-3.6.2-x86_64.iso

# 将一个目录作为虚拟的 fat 磁盘镜像, 默认只读
qemu-system-i386 linux.img -hdb fat:/my_directory
```

### Device URL Syntax

```bash
# 设备 URL 语法
# ===========
# iSCSI
# iscsi://<target-ip>[:<port>]/<target-iqn>/<lun>
# 无授权
qemu-system-i386 \
  -iscsi initiator-name=iqn.2001-04.com.example:my-initiator \
  -cdrom iscsi://192.0.2.1/iqn.2001-04.com.example/2 \
  -drive file=iscsi://192.0.2.1/iqn.2001-04.com.example/1
# 在 URL 上指定 CHAP 账号密码
qemu-system-i386 \
  -drive file=iscsi://user%password@192.0.2.1/iqn.2001-04.com.example/1
# 在环境变量中指定 CHAP 账号密码
LIBISCSI_CHAP_USERNAME="user" LIBISCSI_CHAP_PASSWORD="password" \
  qemu-system-i386 -drive file=iscsi://192.0.2.1/iqn.2001-04.com.example/1

# NBD
# nbd:<server-ip>:<port>[:exportname=<export>]
# TCP
qemu-system-i386 --drive file=nbd:192.0.2.1:30000
# Unix Domain Sockets
qemu-system-i386 --drive file=nbd:unix:/tmp/nbd-socket

# Sheepdog
# a distributed storage system for QEMU.
# supports using either local sheepdog devices or remote networked devices.
# sheepdog[+tcp|+unix]://[host:port]/vdiname[?socket=path][#snapid|#tag]
# https://sheepdog.github.io/sheepdog/
qemu-system-i386 --drive file=sheepdog://192.0.2.1:30000/MyVirtualMachine

# GlusterFS
# a user space distributed file system.
# supports the use of GlusterFS volumes for hosting VM disk images using TCP, Unix Domain Sockets and RDMA transport protocols.
# URI:
# gluster[+type]://[host[:port]]/volume/path[?socket=...][,debug=N][,logfile=...]
# JSON:
# 'json:{"driver":"qcow2","file":{"driver":"gluster","volume":"testvol","path":"a.img","debug":N,"logfile":"...",
#                                  "server":[{"type":"tcp","host":"...","port":"..."},
#                                            {"type":"unix","socket":"..."}]}}'
# URI
qemu-system-x86_64 --drive file=gluster://192.0.2.1/testvol/a.img,file.debug=9,file.logfile=/var/log/qemu-gluster.log
# JSON
qemu-system-x86_64 'json:{"driver":"qcow2",
                          "file":{"driver":"gluster",
                                   "volume":"testvol","path":"a.img",
                                   "debug":9,"logfile":"/var/log/qemu-gluster.log",
                                   "server":[{"type":"tcp","host":"1.2.3.4","port":24007},
                                             {"type":"unix","socket":"/var/run/glusterd.socket"}]}}'
qemu-system-x86_64 -drive driver=qcow2,file.driver=gluster,file.volume=testvol,file.path=/path/a.img, file.debug=9,file.logfile=/var/log/qemu-gluster.log, file.server.0.type=tcp,file.server.0.host=1.2.3.4,file.server.0.port=24007, file.server.1.type=unix,file.server.1.socket=/var/run/glusterd.socket
# HTTP/HTTPS/FTP/FTPS
# QEMU supports read-only access to files accessed over http(s) and ftp(s).
# <protocol>://[<username>[:<password>]@]<host>/<path>
```

## 镜像

- raw
  - 原始格式
  - 简单易用
  - 如果文件系统支持 `holes`(ext2,ext3,ntfs), 那会占不了多少空间
  - 选项
    - preallocation - 预分配模式
      - off, falloc, full
- qcow2
  - QEMU 镜像格式
  - 功能最多
    - COW - 只针对 btrfs 有用
    - 压缩
    - 加密 - aes,luks
- qed
  - 旧的 QEMU 镜像格式
- qcow
  - 旧的 QEMU 镜像格式
- luks
  - LUKS v1 加密格式
  - 与 Linux dm-crypt/cryptsetup 兼容
- vdi
  - vbox 1.1 兼容格式
- vmdk
  - vm 3,4 兼容格式
- vpc
  - Virtual PC 兼容格式 (VHD)
- VHDX
  - Hyper-V 兼容的镜像格式

### 只读格式

- bochs
  - growing 的 Bochs 镜像
- cloop
  - Linux Compressed Loop 镜像
- dmg
  - Apple 的磁盘格式
- parallels
  - Parallels 磁盘镜像格式

### 磁盘镜像

- qemu-img

```bash
# 创建磁盘镜像
qemu-img create demo.img 100m
# 查看基本信息
qemu-img info demo.img
# 查看映射信息
qemu-img map demo.img
# 推荐使用 qcow2 格式
qemu-img create -f qcow2 sys.qcow2 2g
```

### 网络块设备

- qemu-nbd
- 在 linux 下一般会挂载为 `/dev/ndb*`
- https://github.com/sheepdog/sheepdog/
- iSCSI LUN

```bash
# 使用 远程 NBD 协议
qemu-system-i386 linux.img -hdb nbd://my_nbd_server.mydomain.org:1024/
# 使用 unix socket
qemu-system-i386 linux.img -hdb nbd+unix://?socket=/tmp/my_socket

# 暴露为 unix socket
qemu-nbd --socket=/tmp/my_socket my_disk.qcow2
# 允许多个客户端共享
qemu-nbd --socket=/tmp/my_socket --share=2 my_disk.qcow2
# 同时使用
qemu-system-i386 linux1.img -hdb nbd+unix://?socket=/tmp/my_socket
qemu-system-i386 linux2.img -hdb nbd+unix://?socket=/tmp/my_socket
# 如果服务端指定了名字, 在客户端使用时也需要指定名字
qemu-system-i386 -cdrom nbd://localhost/debian-500-ppc-netinst
qemu-system-i386 -cdrom nbd://localhost/openSUSE-11.1-ppc-netinst
```

## 网络

- https://www.linux-kvm.org/page/Networking

```bash
# 查看支持的 NIC
qemu-system-x86_64 -net nic,model=help
# 最简单的网络
# 10.0.2.0/24 默认起始地址 x.x.x.15-13, 主机地址 x.x.x.2 dns x.x.x.3
# 主机无法访问虚拟机
qemu-system-x86_64 -hda vdisk.img -cdrom alpine-standard-3.6.2-x86_64.iso -net nic -net user

# 使用 tap 可以创建虚拟网络设备使主机互通
qemu-system-x86_64 -m 512M -net nic -net tap,script=no,downscript=no
# 使用指定的名字
qemu-system-x86_64 -m 512M -net nic -net tap,ifname=tap0,script=no,downscript=no
# -net nic,model=virtio -net tap,ifname=tap0,script=no,downscript=no
# 确保权限
# ip tuntap add dev tap0 mode tap group netdev
# 或者使用 tunctl 控制
# tunctl -p -t tap0 -u $USER
# tunctl -t tap0 -g netdev
```

## 外设

### USB

### PCI

## 用户空间虚拟

- `qemu-*`
- 只支持 Linix, BSD
- 特性
  - 系统调用转换
  - POSIX 信号处理
  - 线程

```bash
# -L / 告诉动态连接器从 / 开始搜索
qemu-i386 -L / /bin/ls
# 也可以再 qemu 中允许 qemu
qemu-i386 -L / qemu-i386 -L / /bin/ls

# 在非 x86 CPU 上运行
# 至少需要 x86 的 glibc(qemu-runtime-i386-*)
# 确保未设置 LD_LIBRARY_PATH
unset LD_LIBRARY_PATH
# 执行预编译的可执行文件
qemu-i386 tests/i386/ls

# 使用 Wine
# 确保安装 wine(qemu-*-i386-wine)
# 至少先确保有 i386
qemu-i386 /usr/local/qemu-i386/bin/ls-i386
# 配置
# 配置位于 ~/.wine, 之前的配置会被存于 ~/.wine.org
/usr/local/qemu-i386/bin/wine-conf.sh
qemu-i386 /usr/local/qemu-i386/wine/bin/wine \
  /usr/local/qemu-i386/wine/c/Program\ Files/putty.exe
```

## 显示

- https://www.spice-space.org
- vnc

```bash
brew install tiger-vnc

# 5900
qemu-system-x86_64 -vga std -nographic -vnc :0
vncviewer :0

# 5901
qemu-system-x86_64 sys.vhd-display vnc=:1
vncviewer :1
```
