---
title: Trusted Platform Module
---

# Trusted Platform Module

- [tpm2-software](https://github.com/tpm2-software)
  - tpm2-tool
  - tpm2-tss - tss->TPM2 Software Stack
- [stefanberger/swtpm](https://github.com/stefanberger/swtpm)
  TPM emulator
  - swtpm - software tpm
- [Trusted Platform Module](https://wiki.archlinux.org/title/Trusted_Platform_Module)
- [latchset/clevis](https://github.com/latchset/clevis)
  Automated Encryption Framework
- [QEMU TPM Device](https://qemu-project.gitlab.io/qemu/specs/tpm.html)

```bash
# 内核支持
cat /boot/config-lts | grep CONFIG_TCG_TPM

# 检测是否有 tpm 设备
dmesg | grep -i tpm
ls /sys/kernel/security/tpm*
# linux 5.6+
cat /sys/class/tpm/tpm*/tpm_version_major

[ -c /dev/tpmrm0 ] && echo "TPM 2.0" # since v4.12-rc1
[ -c /dev/tpm0 ] && echo "TPM 1.2 or 2.0"

modprobe tpm
# modprobe -a tpm_{atmel,infineon,nsc,tis,crb}
```

## QEMU
- [Tpm2 Device Emulation With Qemu](https://tpm2-software.github.io/2020/10/19/TPM2-Device-Emulation-With-QEMU.html)

```bash
mkdir /tmp/emulated_tpm
swtpm socket --tpmstate dir=/tmp/emulated_tpm --ctrl type=unixio,path=/tmp/emulated_tpm/swtpm-sock --log level=20 --tpm2

qemu-system-x86_64 -hda ~/qemu-images/ubuntu-20.04-amd64.img -boot d -m 2048 -enable-kvm \
  -chardev socket,id=chrtpm,path=/tmp/emulated_tpm/swtpm-sock \
  -tpmdev emulator,id=tpm0,chardev=chrtpm -device tpm-tis,tpmdev=tpm0
```
