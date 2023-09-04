---
title: ipxe
---

## iPXE

- [ipxe.org](http://ipxe.org)
- [ipxe/ipxe](https://github.com/ipxe/ipxe)
- Wikipedia [IPXE](https://en.wikipedia.org/wiki/IPXE)
- [命令行](http://ipxe.org/cmd)
- 下载目录 [boot.ipxe.org](http://boot.ipxe.org/)
- 在 PXE 上新增特性
  - boot from a web server via HTTP
  - boot from an iSCSI SAN
  - boot from a Fibre Channel SAN via FCoE
  - boot from an AoE SAN
  - boot from a wireless network
  - boot from a wide-area network
  - boot from an Infiniband network
  - control the boot process with a script
- QMUE 集成了 iPXE
- 有些网卡集成了 iPXE
- 参考
  - [Custom iPXE](https://help.packet.net/technical/infrastructure/custom-ipxe)
- 注意
  - QEMU 不支持 https
  - QMEU 版本为 1.0.0 很多命令没有

```bash
# 使用 Esc+2 切换到 monitor, Esc+1 切换到控制台
qemu-system-x86_64 -net nic -net user -curses

# 或者使用官方的内核
curl http://boot.ipxe.org/ipxe.lkrn -O
qemu-system-x86_64 -net nic -net user
```

### 自定义

```bash
# http://ipxe.org/download
# http://ipxe.org/howto/chainloading
# 例如
make bin/undionly.kpxe EMBED=demo.ipxe
```

### 命令行

```bash
# 所有配置 http://ipxe.org/cfg
# 查看当前版本号
show version
# 显示构建的平台
show platform

# 自动配置网络
dhcp

# ipxe 的演示脚本
chain http://boot.ipxe.org/demo/boot.php
```

## demo

```bash
#!ipxe

kernel vmlinuz-3.16.0-rc4 bootfile=http://boot.ipxe.org/demo/boot.php fastboot initrd=initrd.img
initrd initrd.img
boot
```

- http://boot.ipxe.org/demo/boot.php

## qemu

- https://gist.github.com/mcastelino/7ab9dba51b0dbb230bd18c448d935312
- https://gist.github.com/pojntfx/1c3eb51afedf4fa9671ffd65860e6839

