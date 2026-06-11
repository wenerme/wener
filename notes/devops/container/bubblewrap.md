---
title: bubblewrap
---

# bubblewrap

- [containers/bubblewrap](https://github.com/containers/bubblewrap)
  - LGPL-2.0, C, Linux namespaces, seccomp, sandbox
  - Low-level unprivileged sandboxing tool used by Flatpak and similar projects.
- 参考
  - [README](https://github.com/containers/bubblewrap/blob/main/README.md)
  - [bwrap(1)](https://man.archlinux.org/man/bwrap.1)
  - [Flatpak User namespace requirements](https://github.com/flatpak/flatpak/wiki/User-namespace-requirements)
  - https://github.com/microsoft/mxc
  - https://github.com/anthropic-experimental/sandbox-runtime

`bubblewrap` / `bwrap` 是一个底层 Linux sandbox 构造工具。它不像 Docker / containerd / runc 那样面向完整容器生命周期，也不自带固定安全策略；它只负责按命令行参数创建 namespace、mount tree、环境变量、seccomp 等隔离边界。

常见使用者：

- Flatpak
- libgnome-desktop / xdg-desktop-portal 相关组件
- sandwine 等桌面 sandbox 工具
- ad-hoc script：临时限制命令能看到的文件系统、网络、PID 等

## TL;DR

```bash
# Debian / Ubuntu
apt install bubblewrap

# Fedora / RHEL-like
dnf install bubblewrap

# Arch
pacman -S bubblewrap

# Alpine
apk add bubblewrap

# macOS 不是目标平台；bubblewrap 依赖 Linux namespaces
```

最小示例：创建一个临时 rootfs，只暴露 `/usr`、`/proc`、`/dev`，并新建 PID namespace。

```bash
bwrap \
  --ro-bind /usr /usr \
  --symlink usr/bin /bin \
  --symlink usr/lib /lib \
  --symlink usr/lib64 /lib64 \
  --proc /proc \
  --dev /dev \
  --unshare-pid \
  --new-session \
  bash
```

更实际的只读命令沙箱：

```bash
bwrap \
  --unshare-all \
  --share-net \
  --ro-bind /usr /usr \
  --ro-bind /etc/resolv.conf /etc/resolv.conf \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --dir /run \
  --setenv HOME /tmp \
  --chdir /tmp \
  --new-session \
  sh
```

## 工作模型

bubblewrap 默认总是创建新的 mount namespace，然后在一个 host 不可见、进程退出后自动清理的 tmpfs root 上构造文件系统。

可选隔离能力：

| 能力              | 参数                                   | 说明                                                           |
| ----------------- | -------------------------------------- | -------------------------------------------------------------- |
| mount namespace   | 默认                                   | 构造 sandbox 内看到的文件系统                                  |
| user namespace    | `--unshare-user`                       | 隐藏 host uid/gid，可设置 sandbox 内 uid/gid                   |
| IPC namespace     | `--unshare-ipc`                        | 隔离 SysV shared memory、semaphore 等 IPC                      |
| PID namespace     | `--unshare-pid`                        | sandbox 内看不到外部进程；bwrap 会管理最小 PID 1 以回收 zombie |
| network namespace | `--unshare-net`                        | 隔离网络，只保留 loopback                                      |
| UTS namespace     | `--unshare-uts`                        | 隔离 hostname                                                  |
| cgroup namespace  | `--unshare-cgroup`                     | 隔离 cgroup 视图                                               |
| seccomp           | `--seccomp FD` / `--add-seccomp-fd FD` | 加载 cBPF seccomp 规则限制 syscall                             |
| terminal session  | `--new-session`                        | `setsid()`，避免 TIOCSTI 等终端注入风险                        |

## 常用参数

### Namespace

| 参数                      | 说明                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `--unshare-all`           | 尽可能 unshare user/ipc/pid/net/uts/cgroup                    |
| `--share-net`             | 在 `--unshare-all` 后保留 host network namespace              |
| `--unshare-user`          | 创建 user namespace                                           |
| `--unshare-user-try`      | 尽量创建 user namespace，失败则跳过                           |
| `--disable-userns`        | 阻止 sandbox 内继续创建 user namespace；需要 `--unshare-user` |
| `--unshare-pid`           | 创建 PID namespace                                            |
| `--unshare-net`           | 创建 network namespace                                        |
| `--unshare-ipc`           | 创建 IPC namespace                                            |
| `--unshare-uts`           | 创建 UTS namespace                                            |
| `--hostname NAME`         | 设置 sandbox 内 hostname；需要 UTS namespace                  |
| `--uid UID` / `--gid GID` | 设置 sandbox 内 uid/gid；需要 user namespace                  |

### 文件系统

| 参数                           | 说明                            |
| ------------------------------ | ------------------------------- |
| `--bind SRC DEST`              | bind mount，可读写              |
| `--ro-bind SRC DEST`           | readonly bind mount             |
| `--dev-bind SRC DEST`          | bind mount 并允许 device access |
| `--bind-try` / `--ro-bind-try` | 源不存在时忽略                  |
| `--proc DEST`                  | 挂载 procfs                     |
| `--dev DEST`                   | 创建 `/dev`                     |
| `--tmpfs DEST`                 | 挂载 tmpfs                      |
| `--dir DEST`                   | 创建目录                        |
| `--file FD DEST`               | 从 FD 复制文件到 sandbox        |
| `--bind-data FD DEST`          | 从 FD 创建文件并 bind mount     |
| `--symlink SRC DEST`           | 创建 symlink                    |
| `--chmod OCTAL PATH`           | 修改权限                        |
| `--perms OCTAL`                | 影响下一次创建操作的权限        |
| `--size BYTES`                 | 影响下一次 `--tmpfs` 的大小     |

:::tip

除了 `--dev-bind`，bind 进 sandbox 的目录默认 `nodev`。能用 `--ro-bind` 就不要用 `--bind`。

:::

### 环境与进程

| 参数                  | 说明                                              |
| --------------------- | ------------------------------------------------- |
| `--chdir DIR`         | 设置工作目录                                      |
| `--setenv KEY VALUE`  | 设置环境变量                                      |
| `--unsetenv KEY`      | 删除环境变量                                      |
| `--clearenv`          | 清空环境变量，后续再显式设置                      |
| `--argv0 VALUE`       | 设置 `argv[0]`                                    |
| `--die-with-parent`   | 父进程退出时杀掉 sandbox 内进程                   |
| `--as-pid-1`          | 不额外创建用于 reap 的 PID 1 进程                 |
| `--info-fd FD`        | 输出 sandbox JSON 信息                            |
| `--json-status-fd FD` | 输出 JSON Lines 状态，包括 child pid 和 exit code |

## Recipes

### 只读运行 host 命令

```bash
bwrap \
  --unshare-all \
  --ro-bind /usr /usr \
  --ro-bind /lib /lib \
  --ro-bind /lib64 /lib64 \
  --ro-bind /etc/ld.so.cache /etc/ld.so.cache \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --new-session \
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/tmp /usr/bin/id
```

### 限制 HOME，避免读写真实用户目录

```bash
mkdir -p /tmp/bwrap-home

bwrap \
  --unshare-all \
  --share-net \
  --ro-bind /usr /usr \
  --ro-bind /etc /etc \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --bind /tmp/bwrap-home /home/user \
  --setenv HOME /home/user \
  --chdir /home/user \
  --new-session \
  sh
```

### 无网络运行

```bash
bwrap \
  --unshare-all \
  --ro-bind /usr /usr \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --setenv HOME /tmp \
  --chdir /tmp \
  --new-session \
  sh
```

`--unshare-all` 包含 network namespace；不要加 `--share-net` 就不会看到 host 网络，通常只剩 loopback。

### 基于 rootfs / chroot 运行

```bash
ROOTFS=/path/to/rootfs

bwrap \
  --unshare-all \
  --bind "$ROOTFS" / \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --setenv PATH /usr/bin:/bin \
  --chdir / \
  --new-session \
  /bin/sh
```

更安全时应把 rootfs 只读挂载，并单独给需要写的目录挂 tmpfs 或 bind：

```bash
bwrap \
  --unshare-all \
  --ro-bind "$ROOTFS" / \
  --proc /proc \
  --dev /dev \
  --tmpfs /tmp \
  --tmpfs /run \
  --new-session \
  /bin/sh
```

## 安全边界

bubblewrap 是 sandbox 构造器，不是完整安全产品。安全性完全取决于传给 `bwrap` 的参数。

MUST 注意：

- 不要把真实 `$HOME` 整体 `--bind` 进 sandbox，除非你明确允许它读写用户数据。
- 能只读就用 `--ro-bind`。
- 需要安全边界时使用 `--new-session`，否则要用 seccomp 禁止 `TIOCSTI`，避免终端注入导致逃逸命令执行。
- 小心 D-Bus socket、Wayland/X11 socket、systemd socket、Docker socket、SSH agent socket；这些都可能变成 host 控制通道。
- 如果需要暴露 D-Bus，考虑用 [flatpak/xdg-dbus-proxy](https://github.com/flatpak/xdg-dbus-proxy) 过滤。
- 不要默认暴露 `/var/run/docker.sock`、`/run/podman/podman.sock` 这类容器控制 socket。
- 浏览器等应用自带 sandbox/seccomp。过度限制 `seccomp` 或不暴露其规则文件，可能让应用自己的 sandbox 失效或降级。

## User Namespace 要求

现代系统推荐使用 unprivileged bubblewrap：

- `bwrap` 不应是 setuid root，通常权限为 `0755`。
- kernel 需要 `CONFIG_USER_NS=y`。
- `user.max_user_namespaces`、`user.max_mnt_namespaces` 等限制要足够大。
- 如果系统有 `kernel.unprivileged_userns_clone`，需要设为 `1`。

检查：

```bash
command -v bwrap
bwrap --version
ls -l "$(command -v bwrap)"

# 常见 sysctl
sysctl user.max_user_namespaces 2> /dev/null || true
sysctl user.max_mnt_namespaces 2> /dev/null || true
sysctl kernel.unprivileged_userns_clone 2> /dev/null || true
```

旧系统可能使用 setuid bubblewrap 作为 fallback，但这是安全权衡，Flatpak 官方也更推荐 unprivileged user namespace 模式。

## vs 其他工具

| 工具           | 定位                             | 差异                                                                 |
| -------------- | -------------------------------- | -------------------------------------------------------------------- |
| bubblewrap     | low-level sandbox setup          | 小而底层；由调用方定义安全策略                                       |
| Flatpak        | desktop app sandbox/distribution | Flatpak 使用 bubblewrap 作为 sandbox 基础设施之一                    |
| Firejail       | desktop-oriented sandbox         | 自带大量 profile/桌面集成；bubblewrap 更底层、更少策略               |
| runc           | OCI runtime                      | 面向 OCI container；通常由 root 或 runtime 管理生命周期              |
| systemd-nspawn | system container/chroot          | 更偏系统容器/管理员工具                                              |
| chroot         | filesystem root 切换             | 单独 chroot 不是安全边界；bubblewrap 结合 namespaces/no_new_privs 等 |

## FAQ

### bubblewrap 是容器运行时吗？

不是完整容器运行时。它可以创建类似容器的 namespace 和 mount tree，但不负责 OCI image、pull/push、network plugin、storage driver、container lifecycle 等。

### 为什么说 bubblewrap 没有固定安全策略？

同一个 `bwrap` 可以构造强隔离 sandbox，也可以构造只是改变目录布局的环境。比如你把 `/`、`$HOME`、D-Bus、Docker socket 都读写挂进去，隔离意义就很弱。

### 为什么需要 `--new-session`？

如果 sandbox 进程仍连接外部 controlling terminal，且没有 seccomp 过滤 `TIOCSTI`，恶意程序可能向终端注入输入，导致 host shell 执行命令。`--new-session` 会断开 controlling terminal。

### 为什么很多示例要显式 bind `/usr`、`/lib`、`/lib64`？

bubblewrap 的 root 是空 tmpfs。命令和动态链接器/共享库默认不可见，需要显式把运行命令所需路径挂进去。不同发行版路径不同，示例需要按系统调整。

### 为什么程序提示找不到 DNS / 证书？

常见原因是 sandbox 没有暴露：

- `/etc/resolv.conf`
- `/etc/hosts`
- CA bundle，例如 `/etc/ssl/certs` 或发行版对应路径

可以按需 `--ro-bind`，但不要无脑绑定整个 `/etc`。

### macOS 能用吗？

不能作为原生 sandbox 工具使用。bubblewrap 依赖 Linux namespaces、mount namespace、seccomp 等 Linux kernel 能力。
