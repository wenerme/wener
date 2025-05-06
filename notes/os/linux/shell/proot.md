---
title: proot
---

# proot

- 用户空间的 chroot, mount --bind, binfmt_misc
- 使用 ptrace 实现 - 拦截系统调用
- guest rootfs

:::caution

- Docker 里 ptrace 有问题, proot 没效果

:::

```bash
curl -LO https://proot.gitlab.io/proot/bin/proot
chmod +x ./proot
./proot --version

mkdir rootfs
curl -o rootfs/toybox https://landley.net/toybox/downloads/binaries/latest/toybox-x86_64
chmod +x rootfs/toybox
mkdir -p rootfs/bin
ln -s ../toybox rootfs/bin/sh

./proot -w / -r rootfs
```
