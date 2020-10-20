# KVM
## Tips
* [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine)
* [Linux KVM](https://www.linux-kvm.org)
  * [FAQ](https://www.linux-kvm.org/page/FAQ)


## KVM internal error. Suberror: 3
* 确认参数是否正确
  * 例如 `-m` 是不是没有给单位导致给的太小

```
KVM internal error. Suberror: 3
extra data[0]: 80000306
extra data[1]: 31
extra data[2]: 182
extra data[3]: 32efe0
EAX=fffffffb EBX=00000000 ECX=00000000 EDX=00000000
ESI=00000000 EDI=00000000 EBP=00000000 ESP=0032efe4
EIP=00000007 EFL=00010287 [--S--PC] CPL=0 II=0 A20=1 SMM=0 HLT=0
ES =0028 00000000 ffffffff 00c09300 DPL=0 DS   [-WA]
CS =0020 00000000 ffffffff 00c09b00 DPL=0 CS32 [-RA]
SS =0028 00000000 ffffffff 00c09300 DPL=0 DS   [-WA]
DS =0028 00000000 ffffffff 00c09300 DPL=0 DS   [-WA]
FS =0000 00000000 ffffffff 00c00000
GS =0000 00000000 ffffffff 00c00000
LDT=0000 00000000 ffffffff 00c00000
TR =0008 00000580 00000067 00008b00 DPL=0 TSS32-busy
GDT=     00009400 0000002f
IDT=     00003008 000007ff
CR0=00000011 CR2=00000000 CR3=00000000 CR4=00000000
DR0=0000000000000000 DR1=0000000000000000 DR2=0000000000000000 DR3=0000000000000000
DR6=00000000ffff0ff0 DR7=0000000000000400
EFER=0000000000000000
Code=00 00 00 00 53 ff 00 <f0> c3 e2 00 f0 53 ff 00 f0 53 ff 00 f0 54 ff 00 f0 53 ff 00 f0 53 ff 00 f0 a5 fe 00 f0 87 e9 00 f0 70 d4 00 f0 70 d4 00 f0 70 d4
```

egrep -c '(vmx|svm)' /proc/cpuinfo

```bash
sudo apk add qemu qemu-system-x86_64 qemu-ui-curses qemu-block-ssh qemu-img

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


```
[83370.391485] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x1c9
[83370.391491] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x1a6
[83370.391493] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x1a7
[83370.391495] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x3f6
[83370.391496] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x3f7
[83370.718134] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x64e
[83370.718143] kvm [13452]: vcpu0, guest rIP: 0xffffffff8105e183 unhandled rdmsr: 0x34
```

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


qemu-img create base.raw 10g

qemu-system-x86_64 -m 4g -net nic -net user,hostfwd=tcp::2223-:22 -accel hax -hda alp.raw

wget https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.10/releases/x86_64/alpine-virt-3.10.0-x86_64.iso
qemu-system-x86_64 -smp 4 -m 8G -accel kvm -net nic -net user,hostfwd=tcp::2223-:22 -vnc :1 -hda base.raw -cdrom alpine-virt-3.10.0-x86_64.iso -nographic

qemu -nographic -serial mon:stdio -append 'console=ttyS0' binary.img

qemu-system-x86_64 -smp 4 -m 8G -accel kvm -net nic -net user,hostfwd=tcp::2223-:22 -vnc :1 -hda base.raw 
qemu-system-x86_64 -smp 4 -m 8G -accel kvm -net nic -net user,hostfwd=tcp::2223-:22 -hda virt.qcow2 -nographic

-monitor stdio
-nographic
-curses

brew cask install vnc-viewer



