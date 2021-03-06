---
id: qemu-version
title: QEMU Version
---

# QEMU Version
* https://wiki.qemu.org/Planning
* https://wiki.qemu.org/ChangeLog

## 5.1
* 2020-08-11
* RPi 支持 USB 控制器
  * guest 添加 `dwc_otg.fiq_fsm_enable=0`
* AMD X86 支持 迁移 嵌套虚拟化
* 支持 Linux keyring 传递 secret
* LUKS keyslot 管理
* qcow2 支持 zstd - `compression_type=zstd`
* AVR 架构

```bash
# 添加 keyslot
qemu-img amend \
  --object secret,id=sec0,data=current_password \
  --object secret,id=sec1,data=new_password \
  --image-opts driver=luks,file.filename=test.luks,key-secret=sec0 \ #image has to be opened with --image-opts to pass current secret
  -o state=active,new-secret=sec1,[keyslot=1] #keyslot is optional
# 移除
qemu-img amend \
  --object secret,id=sec0,data=current_password \
  --object secret,id=sec1,data=new_password \
  --image-opts driver=luks,file.filename=test.luks,key-secret=sec0 \
  -o state=inactive,old-secret=sec1 
```

## 5.0
* [5.0.0](https://www.qemu.org/2020/04/29/qemu-5-0-0/) - 2020-04-29
* virtiofsd - 映射主机目录
  * Linux 5.4 支持 VirtIO-FS 
* D-Bus QEMU 进程 Live-Migration
* block
  * 支持压缩备份镜像
  * qemu-img measure 支持 LUKS， convert 支持跳过 zero
  * qemu-storage-daemon 支持访问存储，不需要启动 VM

```bash
# ./virtiofsd -o vhost_user_socket=/tmp/vhostqemu -o source=$TESTDIR -o cache=always

qemu-system-x86_64 -M pc -cpu host --enable-kvm -smp 2 \
  -m 4G -object memory-backend-file,id=mem,size=4G,mem-path=/dev/shm,share=on -numa node,memdev=mem \
  -chardev socket,id=char0,path=/tmp/vhostqemu -device vhost-user-fs-pci,queue-size=1024,chardev=char0,tag=myfs \
  -chardev stdio,mux=on,id=mon -mon chardev=mon,mode=readline -device virtio-serial-pci -device virtconsole,chardev=mon -vga none -display none \
  -drive if=virtio,file=rootfsimage.qcow2

mount -t virtiofs myfs /mnt

# DAX
#  -device vhost-user-fs-pci,queue-size=1024,chardev=char0,tag=myfs,cache-size=2G
```

## 4.2.0
* [4.2.0](https://www.qemu.org/2019/12/13/qemu-4-2-0/) - 2019-12-13
* x86
  * VMX 可通过 `-cpu` 启用或停用
  * microvm 使用 virtio-mmio 而不是 PCI 作为性能基线优化
  * macOS `-accel hvf` 稳定

## 4.1.0
* https://www.qemu.org/2019/08/16/qemu-4-1-0/

## 4.0.0
* https://www.qemu.org/2019/04/24/qemu-4-0-0/


## 3.1.0
* https://www.qemu.org/2018/12/12/qemu-3-1-0/
* ARM
* qemu-img tool can now generate LUKS-encrypted files through ‘convert’ command

## 3.0.0
* https://www.qemu.org/2018/08/15/qemu-3-0-0/
* 完整的 ARM 7 模拟
* Sparc32
* Sparc64
* SDL 2
* GTK 3


## 2.12 - 2018-04-24
* [ChangeLog/2.12](https://wiki.qemu.org/ChangeLog/2.12)
* Initial support for Raspberry Pi 3 machine model
* Experimental support for two new virtualization accelerators: Apple's Hypervisor.framework ("-accel hvf") and Microsoft's Windows Hypervisor Platform Extensions ("-accel whpx")
* `-nic` 取代 `-net` 参数
  * `-nic user` -> `-net nic -net user`
