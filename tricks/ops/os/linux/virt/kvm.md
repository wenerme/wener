# KVM
## Tips
* [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine)
* [Linux KVM](https://www.linux-kvm.org)
  * [FAQ](https://www.linux-kvm.org/page/FAQ)




```bash
sudo apk add qemu-system-x86_64 libvirt 

sudo apk add libvirt-daemon dbus polkit
 modprobe kvm-intel

apk add virt-install


sudo addgroup user kvm
sudo addgroup user qemu
sudo addgroup user libvirt


sudo rc-update add libvirtd
sudo rc-update add dbus
```

Configure PolicyKit
In order to use libvirtd to remotely control KVM over ssh PolicyKit needs a .pkla informing it that this is allowed. Write the following file to /etc/polkit-1/localauthority/50-local.d/50-libvirt-ssh-remote-access-policy.pkla

[Remote libvirt SSH access]
 Identity=unix-group:libvirt
 Action=org.libvirt.unix.manage
 ResultAny=yes
 ResultInactive=yes
 ResultActive=yes


### TBD

https://wiki.debian.org/KVM
https://wiki.centos.org/HowTos/KVM
https://wiki.archlinux.org/index.php/KVM

https://pkgs.alpinelinux.org/package/v3.6/community/x86_64/virt-install



https://github.com/jeffreywildman/homebrew-virt-manager

https://github.com/kholia/OSX-KVM

https://github.com/virt-manager/virt-manager

https://www.ovirt.org
https://blog.skunkw0rks.io/blog/2017/04/01/alpine-linux-as-a-kvm-host/

https://github.com/oVirt/ovirt-engine

https://libvirt.org/
https://en.wikipedia.org/wiki/Libvirt

https://wiki.archlinux.org/index.php/Libvirt
https://wiki.archlinux.org/index.php/Libvirt_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)


https://www.contrib.andrew.cmu.edu/~somlo/OSXKVM/

https://wiki.alpinelinux.org/wiki/KVM
