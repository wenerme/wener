---
title: Alpine Image
---

# Alpine Image


```
# base
alpine-base busybox chrony dhcpcd doas e2fsprogs kbd-bkeymaps network-extras openntpd openssl openssh tzdata wget tiny-cloud-alpine

# standard + base
iw wpa_supplicant

# extended + standard
coreutils ethtool hwids doas
logrotate lsof lm_sensors lxc lxc-templates nano
pciutils strace tmux
usbutils v86d vim xtables-addons curl

acct arpon arpwatch awall bridge-utils bwm-ng
ca-certificates conntrack-tools cutter cyrus-sasl dhcp
dhcpcd dhcrelay dnsmasq fping fprobe htop
igmpproxy ip6tables iproute2 iproute2-qos
iptables iputils nftables iw kea ldns-tools links
ncurses-terminfo net-snmp net-snmp-tools nrpe nsd
opennhrp openvpn pingu ppp quagga
quagga-nhrp rng-tools sntpc socat ssmtp strongswan
sysklogd tcpdump tinyproxy unbound
wireguard-tools wireless-tools wpa_supplicant zonenotify

btrfs-progs cksfv dosfstools cryptsetup
e2fsprogs e2fsprogs-extra efibootmgr f2fs-tools
grub-bios grub-efi lvm2 lz4 mdadm mkinitfs mtools nfs-utils
parted rsync sfdisk syslinux util-linux xfsprogs zstd zfs

linux-firmware linux-firmware-none
```

- linux-lts - 110MB
- linux-virt - 50MB
- https://github.com/alpinelinux/aports/blob/master/scripts/mkimg.standard.sh
- https://github.com/wenerme/alpine-image
