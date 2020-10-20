---
id: grsecurity
title: Grsecurity
---

# Grsecurity

https://grsecurity.net/

* 管理工具
  * [Grsecurity/The Administration Utility](https://en.wikibooks.org/wiki/Grsecurity/The_Administration_Utility)
* 附加工具
  * [Grsecurity/Additional Utilities](https://en.wikibooks.org/wiki/Grsecurity/Additional_Utilities)
  * paxctl
    * Controlling PaX Flags
    * 控制可执行文件的 PaX 标记
  * pspax
    * Displaying Program Capabilities

    https://en.wikibooks.org/wiki/Grsecurity/Application-specific_Settings

https://en.wikipedia.org/wiki/Grsecurity

* https://github.com/moby/moby/issues/20303

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
```

sysctl -w kernel.pax.softmode=1
echo 'kernel.pax.softmode=1' >> /etc/sysctl.conf

https://wiki.gentoo.org/wiki/Hardened/PaX_Quickstart

https://hardenedlinux.github.io/system-security/2016/08/10/grsec-kernel-full-commentary.html

use of CAP_SYS_ADMIN in chroot denied

sysctl -w kernel.grsecurity.chroot_caps=0
sysctl -w kernel.grsecurity.chroot_deny_mount=0


https://en.wikibooks.org/wiki/Grsecurity/Appendix/Grsecurity_and_PaX_Configuration_Options

PAX_MPROTECT
Enabling this option will prevent programs from
 - changing the executable status of memory pages that were
   not originally created as executable,
 - making read-only executable pages writable again,
 - creating executable pages from anonymous memory,
 - making read-only-after-relocations (RELRO) data pages writable again.

You should say Y here to complete the protection provided by
the enforcement of non-executable pages.

NOTE: you can use the 'chpax' or 'paxctl' utilities to control
this feature on a per file basis.


PAX_SOFTMODE
Enabling this option will allow you to run PaX in soft mode, that
is, PaX features will not be enforced by default, only on executables
marked explicitly.  You must also enable PT_PAX_FLAGS or XATTR_PAX_FLAGS
support as they are the only way to mark executables for soft mode use.

Soft mode can be activated by using the "pax_softmode=1" kernel command
line option on boot.  Furthermore you can control various PaX features
at runtime via the entries in /proc/sys/kernel/pax.



