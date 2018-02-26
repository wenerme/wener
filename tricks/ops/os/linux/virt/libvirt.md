# Libvirt

## Tips
* [libvirt/libvirt](https://github.com/libvirt/libvirt)
  * 绑定: c#, go, java, ocaml. perl, python, php, ruby
  * API 分为: common, domain, domain snapshot, error, event, host, interface, network, node device, network filter, secret, storage, stream
* [libvirt]
  * LXC – lightweight Linux container system
  * OpenVZ – lightweight Linux container system
  * Kernel-based Virtual Machine/QEMU (KVM) – open source hypervisor for Linux and SmartOS[11]
  * Xen – Bare-Metal hypervisor
  * User-mode Linux (UML) paravirtualized kernel
  * VirtualBox – hypervisor by Oracle (formerly Sun) for Windows, Linux, Mac OS X, and Solaris
  * VMware ESX and GSX – hypervisors for Intel hardware
  * VMware Workstation and Player – hypervisors for Windows and Linux
  * Hyper-V – hypervisor for Windows by Microsoft
  * PowerVM – hypervisor by IBM for AIX, Linux and IBM i
  * Parallels Workstation – hypervisor for Mac by Parallels IP Holdings GmbH
  * Bhyve – hypervisor for FreeBSD 10+.
* [QEMUSwitchToLibvirt](https://wiki.libvirt.org/page/QEMUSwitchToLibvirt)
* [UbuntuKVMWalkthrough](https://wiki.libvirt.org/page/UbuntuKVMWalkthrough)

https://github.com/libvirt/libvirt-go
http://www.cnblogs.com/popsuper1982/p/4056158.html

```bash
# macOS
# 安装 vbox
brew install libvirt

# alpine
apk add virt-install

# 启动服务进程
libvirtd -v
# 客户端连接
virsh -c vbox:///session
# 日志控制
LIBVIRT_LOG_FILTERS=1:vbox virsh -c vbox:///session


# 虚拟机列表
virsh list

# https://wiki.libvirt.org/page/SSHSetup
echo 'unix_sock_group = "libvirt"' >> /etc/libvirt/libvirtd.conf
echo 'unix_sock_rw_perms = "0770"' >> /etc/libvirt/libvirtd.conf
usermod -G libvirt -a $USER
rc-service libvirtd restart

virsh -c qemu+ssh://username@hostname/system
```

## XML

* https://libvirt.org/format.html

```
virt-xml-validate /path/to/XML/file
```

## virt-install

```bash
virt-install --virt-type kvm --name xp \
--location http://httpredir.debian.org/debian/dists/squeeze/main/installer-amd64/ \
--extra-args "console=ttyS0" -v --os-variant debiansqueeze \
--disk size=4 --memory 512 
-n xp --vcpus 2 --import winxp
```

https://wiki.debian.org/KVM
