# Grsecurity

https://grsecurity.net/
https://en.wikibooks.org/wiki/Grsecurity/The_Administration_Utility

https://en.wikipedia.org/wiki/Grsecurity

* https://github.com/moby/moby/issues/20303

```bash
grep -e PAX_MPROTECT= -e GRKERNSEC= /boot/config-hardened
sysctl kernel.grsecurity.chroot_deny_chmod

grep -e GRKERNSEC_CHROOT /boot/config-hardened
```
