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
# gradm grsecurity RBAC administration and policy analysis utility
apk add gradm
```
