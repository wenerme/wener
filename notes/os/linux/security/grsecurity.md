---
title: Grsecurity
---

# Grsecurity

:::tips

AlpineLinux 版本演进：

- 3.6.0（2017-05-19）将 `-grsec` 相关包改名为 `-hardened`，不再使用 Grsecurity 命名
- 3.8.0（2018-05-09）彻底停止维护该 hardened kernel（unofficial Grsecurity）

- https://www.alpinelinux.org/posts/Alpine-3.6.0-released.html
- https://alpinelinux.org/posts/Alpine-3.8.0-released.html

:::

- https://grsecurity.net/
- 管理工具
  - [Grsecurity/The Administration Utility](https://en.wikibooks.org/wiki/Grsecurity/The_Administration_Utility)
- 附加工具
  - [Grsecurity/Additional Utilities](https://en.wikibooks.org/wiki/Grsecurity/Additional_Utilities)
  - paxctl
    - Controlling PaX Flags
    - 控制可执行文件的 PaX 标记
  - pspax
    - Displaying Program Capabilities
      https://en.wikibooks.org/wiki/Grsecurity/Application-specific_Settings
- 参考
  - https://en.wikipedia.org/wiki/Grsecurity
  - https://github.com/moby/moby/issues/20303

```bash
grep -e PAX_MPROTECT= -e GRKERNSEC= /boot/config-hardened
sysctl kernel.grsecurity.chroot_deny_chmod

grep -e GRKERNSEC_CHROOT /boot/config-hardened

# https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/paxctl
apk add paxctl

# https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/gradm
# https://en.wikibooks.org/wiki/Grsecurity/The_Administration_Utility
# gradm grsecurity RBAC administration and policy analysis utility
apk add gradm

# PaX soft mode - 仅对显式标记的可执行文件生效（需 PT_PAX_FLAGS / XATTR_PAX_FLAGS）
sysctl -w kernel.pax.softmode=1
echo 'kernel.pax.softmode=1' >> /etc/sysctl.conf

# chroot 中报 use of CAP_SYS_ADMIN in chroot denied 时
sysctl -w kernel.grsecurity.chroot_caps=0
sysctl -w kernel.grsecurity.chroot_deny_mount=0
```

- [PaX Quickstart - Gentoo Wiki](https://wiki.gentoo.org/wiki/Hardened/PaX_Quickstart)
- [grsec kernel full commentary](https://hardenedlinux.github.io/system-security/2016/08/10/grsec-kernel-full-commentary.html)
- [Grsecurity and PaX Configuration Options](https://en.wikibooks.org/wiki/Grsecurity/Appendix/Grsecurity_and_PaX_Configuration_Options)

| 配置项         | 作用                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PAX_MPROTECT` | 禁止程序修改内存页可执行属性：不允许将非可执行页改为可执行、重新开放只读执行页、从匿名内存创建可执行页、重新开放 RELRO 数据页。可用 `chpax`/`paxctl` 按文件控制                        |
| `PAX_SOFTMODE` | 允许 PaX 运行在软模式：默认不强制，仅对显式标记的可执行文件生效，需配合 `PT_PAX_FLAGS`/`XATTR_PAX_FLAGS`；内核命令行 `pax_softmode=1` 可开启，运行时可通过 `/proc/sys/kernel/pax` 调整 |
