---
title: Linux Init Configuration (inittab & OpenRC)
tags:
  - Linux
  - Admin
  - Init
  - OpenRC
  - SysVinit
---

# Linux Init Configuration (inittab & OpenRC) {#linux-init-configuration}

- [OpenRC - Gentoo Wiki](https://wiki.gentoo.org/wiki/OpenRC#Chroot_support)
- [SysVinit - ArchWiki](https://wiki.archlinux.org/index.php/SysVinit)
- [SysVinit: inittab - ArchWiki](https://wiki.archlinux.org/index.php/SysVinit#inittab)
- [OpenRC: openrc-init - Gentoo Wiki](https://wiki.gentoo.org/wiki/OpenRC/openrc-init)

> [!NOTE]
> Note that when using `openrc-init`, the `/etc/inittab` file is not used.
> To hide boot messages from OpenRC, you can edit `/etc/inittab` and add `--quiet` to every openrc command.

## inittab example

```ini title="/etc/inittab"
::sysinit:/sbin/openrc sysinit
::sysinit:/sbin/openrc boot
::wait:/sbin/openrc default

# Set up a couple of getty's
tty1::respawn:/sbin/getty 38400 tty1
tty2::respawn:/sbin/getty 38400 tty2
tty3::respawn:/sbin/getty 38400 tty3
tty4::respawn:/sbin/getty 38400 tty4
tty5::respawn:/sbin/getty 38400 tty5
tty6::respawn:/sbin/getty 38400 tty6

# Put a getty on the serial port
#ttyS0::respawn:/sbin/getty -L ttyS0 115200 vt100

# Stuff to do for the 3-finger salute
::ctrlaltdel:/sbin/reboot

# Stuff to do before rebooting
::shutdown:/sbin/openrc shutdown
```

## Snippets

```bash
# Add agetty for tty 1-6
for n in $(seq 1 6); do
  ln -s agetty agetty.tty$n
  rc-config add agetty.tty$n default
done
```

## Troubleshooting

- `can't open /dev/ttyS0: No such file or directory`
  - [Raspberry Pi Forums](https://www.raspberrypi.org/forums/viewtopic.php?t=224369)
