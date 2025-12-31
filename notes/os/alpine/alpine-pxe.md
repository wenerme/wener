---
title: Alpine PXE
tags:
  - OS
  - Alpine
  - Netboot
  - PXE
---

# Alpine PXE

- [alpine-ipxe](https://pkgs.alpinelinux.org/package/edge/testing/x86_64/alpine-ipxe)
- [boot.alpinelinux.org](http://boot.alpinelinux.org/)
- [gdamjan/alpine-netboot](https://gist.github.com/gdamjan/3063636)

```bash
# 使用 alpine 启动脚本
# QEMU 报 imgtrust 命令找不到 http://ipxe.org/cmd/imgtrust
chain --autofree http://boot.alpinelinux.org/boot.ipxe
```

```bash
apk add qemu-system-x86_64 alpine-ipxe
qemu-system-x86_64 -m 512M -enable-kvm -kernel /usr/share/alpine-ipxe/ipxe.lkrn -curses
```

## DHCP Config

```conf
dhcp-boot=pxelinux.0
enable-tftp
tftp-root=/tftp/pxeboot
```

```bash
curl http://boot.alpinelinux.org/alpine-ipxe/x86_64/ipxe.pxe -O tftp/ipxe.pxe
```

## QEMU

```bash
/usr/bin/qemu-system-$ARCH \
  -enable-kvm \
  -m $MEM \
  -boot n \
  -net nic \
  -net tap,ifname=$TAPIF,script=no,downscript=no \
  "$@"

# BIOS
qemu-system-x86_64 -boot n -net nic

# UEFI
# BIOS="-bios OVMF.fd"
```

## boot.ipxe

```bash
#!ipxe

set os Alpine Linux
iseq ${ipxe_cloud_config} packet && set provider (Packet.net) ||
iseq ${alpine_loader} true && set img_verify enabled || set img_verify disabled
set console tty0 ||
set cmdline modules=loop,squashfs quiet nomodeset ||
set default_cmdline default ||
set start_sshd no ||
set branch v3.17 ||
set version 3.17.1 ||
set flavor virt ||
iseq ${buildarch} arm64 && goto arm64 ||
cpuid --ext 29 && goto x86_64 || goto x86

:arm64
set arch aarch64 ||
set acpi acpi=force ||
set console ttyAMA0 ||
iseq ${ipxe_cloud_config} packet && set console ttyAMA0,115200 ||
goto menu

:x86_64
set arch x86_64 ||
iseq ${ipxe_cloud_config} packet && set console ttyS1,115200n8 ||
goto menu

:x86
set arch x86 ||
goto menu

:menu
set space:hex 20:20
set space ${space:string}
menu ${os} ${provider} [ ${arch} ]
item --gap Boot options
item branch ${space} Alpine release [ ${branch} ]
iseq ${arch} x86_64 && item flavor ${space} Kernel flavor [ ${flavor} ] ||
iseq ${alpine_loader} true && item img_verify ${space} Image verification [ ${img_verify} ] ||
item cmdline ${space} Linux cmdline [ ${default_cmdline} ]
item console ${space} Set console [ ${console} ]
item start_sshd ${space} Start sshd at first boot [ ${start_sshd} ]
item --gap Booting
item boot ${space} Boot with above settings
item --gap Utilities
item shell ${space} iPXE Shell
item reboot ${space} Reboot system
choose item
goto ${item}

:branch
menu ${os} ${provider} [ ${arch} ]
item v3.17 Version 3.17.1
item edge Version 20230208
item v3.8 Version 3.8.5
item v3.9 Version 3.9.6
item v3.10 Version 3.10.9
item v3.11 Version 3.11.13
item v3.12 Version 3.12.12
choose branch || goto shell
iseq ${branch} v3.17 && set version 3.17.1 ||
iseq ${branch} edge && set version 20230208 ||
iseq ${branch} v3.8 && set version 3.8.5 ||
iseq ${branch} v3.9 && set version 3.9.6 ||
iseq ${branch} v3.10 && set version 3.10.9 ||
iseq ${branch} v3.11 && set version 3.11.13 ||
iseq ${branch} v3.12 && set version 3.12.12 ||
goto menu

:flavor
menu ${os} ${provider} [ ${arch} ]
item lts Linux lts
item vanilla Linux vanilla
item virt Linux virt
choose flavor || goto shell
goto menu

:console
menu ${os} ${provider} [ ${arch} ]
item tty0 Console on tty0
item ttyS0 Console on ttyS0
item ttyS1 Console on ttyS1
item ttyAMA0 Console on ttyAMA0
item custom Enter custom console
choose console || goto menu
iseq ${console} custom && goto custom_console ||
goto menu

:custom_console
clear console
echo -n Enter console: && read console
goto menu

:shell
echo Type "exit" to return to menu.
shell
goto menu

:img_verify
iseq ${img_verify} enabled && set img_verify disabled || set img_verify enabled
goto menu

:cmdline
echo -n Enter extra cmdline options:${space} && read cmdline
set default_cmdline modified
goto menu

:start_sshd
clear start_sshd
echo -n Enter url to ssh key:${space} && read ssh_key
isset ${ssh_key} && set start_sshd yes || set start_sshd no
iseq ${start_sshd} yes && set ssh_key ssh_key=${ssh_key} || clear ssh_key
goto menu

:boot
isset ${console} && set console console=${console} ||
set mirror http://dl-cdn.alpinelinux.org/alpine
set img-url ${mirror}/${branch}/releases/${arch}/netboot-${version}
set sig-url sigs/${branch}/${arch}/${version}
set repo-url ${mirror}/${branch}/main
set modloop-url ${img-url}/modloop-${flavor}
imgfree
kernel ${img-url}/vmlinuz-${flavor} ${cmdline} alpine_repo=${repo-url} modloop=${modloop-url} ${console} ${acpi} ${ssh_key}
initrd ${img-url}/initramfs-${flavor}
iseq ${img_verify} enabled && goto verify_img || goto no_img_verify
:verify_img
imgverify vmlinuz-${flavor} ${sig-url}/vmlinuz-${flavor}.sig
imgverify initramfs-${flavor} ${sig-url}/initramfs-${flavor}.sig
:no_img_verify
boot
goto alpine_exit

:reboot
reboot

:poweroff
poweroff

:alpine_exit
clear menu
exit 0
```

- [boot.ipxe origin](http://boot.alpinelinux.org/boot.ipxe)
