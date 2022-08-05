---
title: lima
---

# lima

- [lima-vm/lima](https://github.com/lima-vm/lima)
  - Lima -> Linux on Mac
  - Linux vm on macOS for running containerd
  - 基于 Qemu
- 文件共享
  - 默认 Reverse SSHFS
  - 可用 virtio-9p-pci - virtfs
- vm 内会监听 /proc/net/tcp 和 iptables 事件，自动 ssh -L
- used by Rancher Desktop, [Colima](https://github.com/abiosoft/colima)
  - Colima -> Containers on Linux on Mac
- 参考
  - https://github.com/lima-vm/lima/blob/master/docs/internal.md
  - https://github.com/lima-vm/lima/tree/master/examples
  - https://github.com/chainguard-dev/apko/blob/main/mac/lima/apko-playground.yaml
  - [lima-vm/alpine-lima](https://github.com/lima-vm/alpine-lima)
    - rd -> Rancher Desktop

:::note

- alpine-lima 暂不支持 containerd [#489](https://github.com/lima-vm/lima/issues/489)
  - installer 依赖 systemd
  - 可自己 provision
- Support Virtualization.framework on macOS 13 [#889](https://github.com/lima-vm/lima/issues/889)
- Windows [#909](https://github.com/lima-vm/lima/issues/909)
- default mount driver from reverse-sshfs to 9p [#971](https://github.com/lima-vm/lima/issues/971)

:::

```bash
brew install lima

source <(limactl completion bash) # 补全

# https://raw.githubusercontent.com/lima-vm/lima/master/examples/alpine.yaml
# /usr/local/share/lima/examples/fedora.yaml
# limactl start --name=default template://docker
limactl start

# limactl shell <INSTANCE> <COMMAND>
# LIMA_INSTANCE
lima uname -a

ls /usr/local/share/lima/examples   # 模板
limactl start --list-templates      # 模板列表
limactl list                        # 实例
limactl copy default:/etc/ dst:/etc # 跨实例复制文件
limactl stop default
limactl delete default
limactl factory-reset default
limactl edit default
```

- 模板
  - alpine, buildkit, docker, k3s, nomad, ubuntu-lts
  - default,docker,k3s -> ubuntu-lts

```yaml title="alpine.yaml"
images:
  - location: 'https://github.com/lima-vm/alpine-lima/releases/download/v0.2.18/alpine-lima-std-3.16.0-x86_64.iso'
    arch: 'x86_64'
    digest: 'sha512:234e407867a8955b9835b08e605b38583815dbd63c5690b558fbbd7b519af115c53694ddc3ff498cddb112f113e350c9f8b2a3351be038aa443399a39eff6007'
  - location: 'https://github.com/lima-vm/alpine-lima/releases/download/v0.2.18/alpine-lima-std-3.16.0-aarch64.iso'
    arch: 'aarch64'
    digest: 'sha512:4e2cb238c78910384f30fb2aba02892d5b5092d50dfb0e345de71f7f194d24b890c81d2d502a0910d150de023ae77a3dbcda76cd6b71df2dd43e4dbccfc85170'

mountType: '9p'
mounts:
  - location: '~'
  - location: '/tmp/lima'
    writable: true

firmware:
  legacyBIOS: true

# The built-in containerd installer does not support Alpine currently.
# Hint: use the "rd" ISO instead of the "std" ISO to enable containerd: https://github.com/lima-vm/alpine-lima/releases/
containerd:
  # system-wide (aka rootful)  containerd and its dependencies (BuildKit, Stargz Snapshotter)
  system: false
  # user-scoped (aka rootless) containerd and its dependencies (currently requires systemd)
  user: false
```

## lima.yaml

| env                 | default                     |
| ------------------- | --------------------------- |
| LIMA_HOME           | ~/.lima                     |
| LIMA_INSTANCE       |
| LIMA_SHELL          |
| LIMA_WORKDIR        |
| LIMA_SYSTEM_X86_64  | `which qemu-system-x86_64`  |
| QEMU_SYSTEM_AARCH64 | `which qemu-system-aarch64` |
| `LIMA_CIDATA_*`     |

- LIMA_HOME
  - `_config`
  - `<INSTANCE>`
    - lima.yaml
    - cidata.iso - [cloud-init](../../ops/infra/cloud-init.md)
    - basedisk
    - diffdisk
    - kernel
    - kernel.cmdline
    - initrd
    - qemu.{pid,sock}, serial.{log,sock}
      - `socat -,echo=0,icanon=0 unix-connect:serial.sock`
    - ssh.sock
    - ga.sock -> /run/lima-guestagent.sock
    - ha.{pid,sock,stdout.log,stderr.log} - Host agent
- ~/Library/Caches/lima
  - `~/Library/Caches/lima/download/by-url-sha256/<SHA256_OF_URL>`
    - url
    - data.tmp
- 网络
  - user-mode, slirp 192.168.5.0/24
  - guest 192.168.5.15
  - host 192.168.5.2 host.lima.internal
  - dns 192.168.5.3
    - lima.yaml useHostResolver
  - vde_vmnet 192.168.105.0/24
    - 支持为 guest 添加额外 IP

```yaml
# host 和 guest 不同运行会非常慢
arch: 'x86_64'
# arch: "aarch64"

# multi arch
# https://github.com/lima-vm/lima/blob/master/docs/multi-arch.md
images:
  - location: 'https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img'
    arch: 'x86_64'
  - location: 'https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-arm64.img'
    arch: 'aarch64'

# Disable mounts and containerd, otherwise booting up may timeout if the host is slow
mounts: []
containerd:
  system: false
  user: false
```

## mount

### 9p

- 要求高版本 kernel
- 不支持 CentOS, Rocky Linux, AlmaLinux

```yaml
mountType: '9p'
mounts:
  - location: '~'
    9p:
      # Supported security models are "passthrough", "mapped-xattr", "mapped-file" and "none".
      # 🟢 Builtin default: "mapped-xattr"
      securityModel: null
      # Select 9P protocol version. Valid options are: "9p2000" (legacy), "9p2000.u", "9p2000.L".
      # 🟢 Builtin default: "9p2000.L"
      protocolVersion: null
      # The number of bytes to use for 9p packet payload, where 4KiB is the absolute minimum.
      # 🟢 Builtin default: "128KiB"
      msize: null
      # Specifies a caching policy. Valid options are: "none", "loose", "fscache" and "mmap".
      # Try choosing "mmap" or "none" if you see a stability issue with the default "fscache".
      # See https://www.kernel.org/doc/Documentation/filesystems/9p.txt
      # 🟢 Builtin default: "fscache" for non-writable mounts, "mmap" for writable mounts
      cache: null
```

### reverse-sshfs

```yaml
mountType: 'reverse-sshfs'
mounts:
  - location: '~'
    sshfs:
      # Enabling the SSHFS cache will increase performance of the mounted filesystem, at
      # the cost of potentially not reflecting changes made on the host in a timely manner.
      # Warning: It looks like PHP filesystem access does not work correctly when
      # the cache is disabled.
      # 🟢 Builtin default: true
      cache: null
      # SSHFS has an optional flag called 'follow_symlinks'. This allows mounts
      # to be properly resolved in the guest os and allow for access to the
      # contents of the symlink. As a result, symlinked files & folders on the Host
      # system will look and feel like regular files directories in the Guest OS.
      # 🟢 Builtin default: false
      followSymlinks: null
      # SFTP driver, "builtin" or "openssh-sftp-server". "openssh-sftp-server" is recommended.
      # 🟢 Builtin default: "openssh-sftp-server" if OpenSSH SFTP Server binary is found, otherwise "builtin"
      sftpDriver: null
```
