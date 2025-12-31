---
title: Ubuntu Tips & Tricks
tags:
  - Linux
  - Ubuntu
  - Tips
  - Docker
  - GUI
  - Network
---

# Ubuntu Tips & Tricks {#ubuntu-tips-tricks}

- [Releases - Ubuntu Wiki](https://wiki.ubuntu.com/Releases)
- [Ubuntu Skills - Ubuntu Chinese Wiki](http://wiki.ubuntu.org.cn/UbuntuSkills)
- [Aliyun Mirror](http://mirrors.aliyun.com/ubuntu-releases/)

## Setup & Configuration {#setup-configuration}

```bash
# Generate Locale
locale-gen zh_CN.UTF-8

# Update Repositories
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# Clean up
sudo apt-get clean
sudo apt-get autoremove
```

### Sudo Proxy

`sudo` sanitizes environment variables. To keep proxy settings:

1.  Use `visudo` and add to `Defaults env_reset`:
    ```
    Defaults env_keep = "http_proxy https_proxy ftp_proxy DISPLAY XAUTHORITY"
    ```

## Network Interface Naming {#network-interface-naming}

If `iface` is not `eth0` (e.g., `enp0s1`) and you want to revert to `eth0`:

1.  Remove `biosdevname`:
    ```bash
    sudo apt-get remove biosdevname
    sudo update-initramfs -u
    ```
2.  Or edit `/etc/default/grub`:
    ```bash
    GRUB_CMDLINE_LINUX_DEFAULT="net.ifnames=0 biosdevname=0"
    ```
    Then `sudo update-grub`.

Remember to update `/etc/network/interfaces`.

## Troubleshooting {#troubleshooting}

- Boot logs: `/var/log/boot.log`, `/var/log/dmesg`
- Journal: `journalctl -b`

## GUI & Desktop {#gui-desktop}

- [Running X - TLDP](http://www.tldp.org/HOWTO/XWindow-User-HOWTO/runningx.html)

```bash
# Minimal Desktop
sudo apt-get install --no-install-recommends ubuntu-desktop

# VNC Setup (XFCE)
sudo apt install xfce4 xfce4-goodies tightvncserver
vncserver
vncserver -kill :1

# ~/.vnc/xstartup
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &
```

### Disable GUI Boot

Edit `/etc/default/grub`:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="text"
# Previously "quiet splash"
```

Update grub: `sudo update-grub`

Systemd:

```bash
sudo systemctl set-default multi-user.target
```

## Maintenance {#maintenance}

### Password Recovery

1.  Hold `Shift` during boot to enter GRUB.
2.  Select Recovery Mode -> Root shell.
3.  Remount RW: `mount -rw -o remount /`
4.  Reset password: `passwd user`

### Remove Old Kernels

```bash
uname -r
dpkg --list | grep linux-image
# sudo apt-get purge linux-image-x.x.x.x-generic
sudo update-grub2
```

## Legacy Network Config (interfaces) {#legacy-network-config}

`/etc/network/interfaces`

```bash
auto lo eth0
iface lo inet loopback

# Static IP
iface eth0 inet static
address 192.168.1.101
netmask 255.255.255.0
gateway 192.168.1.1
```

Define nameservers in `/etc/resolv.conf`.

## FAQ {#faq}

- [Updating Firmware in Linux - fwupd.org](https://fwupd.org)
- [Remove Old Kernels - AskUbuntu](https://askubuntu.com/a/254585)
