# Qemu Windows

## Tips


curl -LOC- https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-qemu-ga/qemu-ga-win-101.1.0-1.el7ev/qemu-ga-x86_64.msi
curl -LOC- https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso

virtio
https://www.linux-kvm.org/page/WindowsGuestDrivers/Download_Drivers

https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso

https://docs.fedoraproject.org/en-US/quick-docs/creating-windows-virtual-machines-using-virtio-drivers/index.html#virtio-win-direct-downloads
https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/latest-qemu-ga/


http://lassauge.free.fr/qemu/


[cardi/qemu-windows-10](https://github.com/cardi/qemu-windows-10)

```bash
# Installing
qemu-system-x86_64 -bios /usr/share/ovmf/ovmf_x64.bin -enable-kvm -cpu host -smp 4 -m 2048 -cdrom ~/Downloads/Win10_English_x64.iso -net nic,model=virtio -net user -drive file=~/vm/win10.hd.img.raw,format=raw,if=virtio -vga qxl -drive file=~/Downloads/virtio-win-0.1.105.iso,index=1,media=cdrom

# Running
qemu-system-x86_64 -bios /usr/share/ovmf/ovmf_x64.bin -enable-kvm -cpu host -smp 4 -m 4096 -net nic,model=virtio -net user -drive file=~/vm/win10.hd.img.raw,format=raw,if=virtio -vga qxl -usbdevice tablet -rtc base=utc
```

https://github.com/tianocore/tianocore.github.io/wiki/OVMF

https://github.com/tianocore/edk2
A modern, feature-rich, cross-platform firmware development environment for the UEFI and PI specifications from www.uefi.org.

https://www.linux-kvm.org/page/OVMF
OVMF "is a project to enable UEFI support for Virtual Machines".

https://wiki.ubuntu.com/UEFI/OVMF

获取 Windows 10 开发环境
https://developer.microsoft.com/zh-cn/windows/downloads/virtual-machines
Get a Windows 10 development environment
https://developer.microsoft.com/en-us/windows/downloads/virtual-machines

Windows 10 Fall Creators Update Enterprise Evaluation
Visual Studio 2017 (Build 15.5) with the UWP, desktop C++, and Azure workflows enabled
Windows Template Studio extension
Windows developer SDK and tools (installed as part of VS UWP workflow)
Windows UWP samples (latest)
Windows Subsystem for Linux enabled with Ubuntu installed
Developer mode, bash, and containers enabled

https://fedoraproject.org/wiki/Windows_Virtio_Drivers


## Windows
* https://fedoraproject.org/wiki/Windows_Virtio_Drivers
* https://github.com/virtio-win/kvm-guest-drivers-windows
* https://www.linux-kvm.org/page/WindowsGuestDrivers/Download_Drivers
* Windows 默认没有 virtio 驱动, 需要额外下载
* [Windows XP Guest Notes](https://pve.proxmox.com/wiki/Windows_XP_Guest_Notes)

```bash
# 其他版本可查看 https://fedorapeople.org/groups/virt/virtio-win/repo/stable/
curl -O https://fedorapeople.org/groups/virt/virtio-win/repo/stable/virtio-win-0.1.141-1.noarch.rpm

# mac 下解压需要安装 rpm
brew install rpm
rpm2cpio virtio-win-0.1.141-1.noarch.rpm | cpio -idmv
# 拷贝到当前目录
cp ./usr/share/virtio-win/virtio-win.iso .

# 启动系统
qemu-img create -f qcow2 win7.img 20g
qemu-img create -f qcow2 win7-32.img 10g
qemu-img create -f qcow2 xp.img 10g
# 检测不到硬盘, 需要在 virtio-win 光驱中找到 viostor 安装相应版本驱动
qemu-system-x86_64 -m 2048 -vga std \
  -drive file=win7.img,index=0,media=disk,if=virtio \
  -drive file=win7.iso,index=2,media=cdrom \
  -drive file=virtio-win.iso,index=3,media=cdrom

# 32 位
qemu-system-i386 -m 1024 -vga std \
  -drive file=win7-32.img,index=0,media=disk,if=virtio \
  -drive file=win7-32.iso,index=2,media=cdrom \
  -drive file=virtio-win.iso,index=3,media=cdrom

# xp
# virtio 要在系统完成后才能加载, 先使用 ide 启动
# 在没安装 virtio 之前, 网络可以使用 -net nic,model=rtl8139
qemu-system-i386 -m 512 -vga std \
  -drive file=xp.img,index=0,media=disk,if=ide \
  -drive file=xp.iso,index=2,media=cdrom \
  -drive file=virtio-win.iso,index=3,media=cdrom
# 服务器使用 vnc 远程
# 安装启动
qemu-system-i386 -m 1024 -vga std -nographic -vnc :1 \
  -drive file=xp.img,index=0,media=disk,if=ide \
  -drive file=xp.iso,index=2,media=cdrom \
  -drive file=virtio-win.iso,index=3,media=cdrom \
  -boot d

# 启动
qemu-system-i386 -m 1024 -nographic -smb 2 -vnc :1 \
  -drive file=xp.img,index=0,media=disk,if=ide \
  -drive file=virtio-win.iso,index=3,media=cdrom \
  -net bridge,br=br0

qemu linux.img -netdev tap,helper=/usr/local/libexec/qemu-bridge-helper,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1
  /usr/lib/qemu/qemu-bridge-helper

qemu-system-i386 -m 1024 -nographic -smp 2 -vnc :1 \
  -drive file=xp.img,index=0,media=disk \
  -drive file=virtio-win.iso,index=3,media=cdrom \
  -netdev bridge,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1
  -netdev tap,helper=/usr/lib/qemu/qemu-bridge-helper,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1


qemu-system-i386 -m 1024 -nographic -smp 2 -vnc :1 \
  -hda xp.img \
  -drive file=virtio-win.iso,index=3,media=cdrom \
  -net nic,model=virtio -net tap,ifname=tap0,script=no,downscript=no

# win 10

qemu-system-x86_64 -name windows -rtc clock=host,base=localtime \
-enable-kvm -cpu host,kvm=off -smp 8,sockets=1,cores=4,threads=2 -m 16G -mem-path /dev/hugepages -mem-prealloc \
-hda win10.qcow2 -cdrom cn_windows_10_multi-edition_version_1709_updated_dec_2017_x64_dvd_100406696.iso \
-drive file=virtio-win.iso,index=3,media=cdrom \
-vga none -nographic  -net nic -net user,smb=/data -vnc :1
```

virtio-net-pci

http://www.linux-kvm.org/page/Networking
https://wiki.ubuntu.com/KvmWithBridge

https://askubuntu.com/questions/179508/kvm-bridged-network-not-working


chardev

msmouse
file
wctablet
mux
udp
vc
stdio
socket
testdev
ringbuf
pipe
memory
null
