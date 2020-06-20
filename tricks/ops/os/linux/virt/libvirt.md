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

https://github.com/digitalocean/go-libvirt
https://github.com/libvirt/libvirt-go
http://www.cnblogs.com/popsuper1982/p/4056158.html


https://libvirt.org/api.html
https://libvirt.org/internals/rpc.html
https://github.com/libvirt/libvirt

https://github.com/libvirt/libvirt/blob/master/src/rpc/virnetprotocol.x
https://github.com/digitalocean/go-libvirt/blob/master/internal/lvgen/gen/main.go
https://github.com/libvirt/libvirt/blob/master/src/remote/remote_protocol.x

https://github.com/digitalocean/go-libvirt/blob/master/internal/lvgen/sunrpc.y

https://en.wikipedia.org/wiki/External_Data_Representation
https://tools.ietf.org/html/rfc4506
https://tools.ietf.org/html/rfc4506#section-6.3
https://github.com/antlr/grammars-v4/blob/master/oncrpc/xdr.g4

Open Network Computing Remote Procedure Call (ONCRPC) aka SunRPC is a remote procedure call system that uses XDR for serialization. version 2 is defined by RFC 5531

ONCRPC is the rpc mechanism that NFS (Network File System) is built on.
https://github.com/dCache/oncrpc4j

https://github.com/Kerbaya/ieee754lib
https://github.com/EMCECS/nfs-client-java/blob/master/src/main/java/com/emc/ecs/nfsclient/rpc/Xdr.java

Handling a quadruple precision floating point (128-bit) number in java
https://stackoverflow.com/a/21071907/1870054

https://libosinfo.org/
https://gitlab.com/libosinfo/libosinfo

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

## 驱动
https://pkgs.alpinelinux.org/contents?file=&path=%2Fusr%2Flib%2Flibvirt%2Fconnection-driver&name=&branch=edge&arch=x86_64

## invalid argument: Failed to parse user 'qemu'

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

virt-install \
     --connect qemu:///system \
     --virt-type qemu \
     --name demo \
     --ram 500 \
     --graphics vnc \
     --disk path=/root/alp.qcow2 \
     --cdrom /root/alpine-standard-3.8.0-x86_64.iso \
     --os-variant=generic \
     --dry-run --print-xml
     

https://wiki.debian.org/KVM

```
Usage:
  libvirtd [options]

Options:
  -h | --help            Display program help:
  -v | --verbose         Verbose messages.
  -d | --daemon          Run as a daemon & write PID file.
  -l | --listen          Listen for TCP/IP connections.
  -t | --timeout <secs>  Exit after timeout period.
  -f | --config <file>   Configuration file.
  -V | --version         Display version information.
  -p | --pid-file <file> Change name of PID file.

libvirt management daemon:

  Default paths:

    Configuration file (unless overridden by -f):
      $XDG_CONFIG_HOME/libvirt/libvirtd.conf

    Sockets:
      $XDG_RUNTIME_DIR/libvirt/libvirt-sock

    TLS:
      CA certificate:     $HOME/.pki/libvirt/cacert.pem
      Server certificate: $HOME/.pki/libvirt/servercert.pem
      Server private key: $HOME/.pki/libvirt/serverkey.pem

    PID file:
      $XDG_RUNTIME_DIR/libvirt/libvirtd.pid
```


virsh -c qemu+ssh://root@127.0.0.1:2222/system?socket=/var/run/libvirt/libvirt-sock list --all

http://rabexc.org/posts/how-to-get-started-with-libvirt-on

https://libvirt.org/formatdomain.html

```conf
listen_tls = 0
listen_tcp=1
auth_tcp="none"


unix_sock_dir = "/usr/local/var/run/libvirt"
unix_sock_ro_perms = "0777"
unix_sock_rw_perms = "0770"

auth_unix_ro = "none"
auth_unix_rw = "none"
```
