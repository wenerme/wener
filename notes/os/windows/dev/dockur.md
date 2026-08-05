---
title: Dockur Windows
tags:
  - Windows
  - Docker
  - QEMU
  - KVM
---

# Dockur Windows

- [dockur/windows](https://github.com/dockur/windows)
  - MIT, Shell, Docker, QEMU/KVM
  - 在 Docker 容器内通过 QEMU/KVM 运行 Windows，支持自动下载和无人值守安装
- Image
  - `docker.io/dockurr/windows`
  - 注意镜像组织名是 `dockurr`，有两个 `r`
- 相关项目
  - [dockur/windows-arm](https://github.com/dockur/windows-arm)
  - [dockur/macos](https://github.com/dockur/macos)
  - [qemus/qemu](https://github.com/qemus/qemu)
- 官方文档
  - [Environment variables](https://github.com/dockur/windows/blob/master/docs/environment.md)
  - [Docker Compose example](https://github.com/dockur/windows/blob/master/compose.yml)

> Dockur Windows 不是 Windows Container。Docker 容器负责下载镜像、准备磁盘、
> 网络和启动 QEMU；真正的 Windows 运行在 QEMU/KVM 虚拟机中。

## 要求

- Linux host + Docker/Podman
- CPU/平台支持 Intel VT-x 或 AMD-V
- `/dev/kvm`
- `/dev/net/tun`
- 最少 4GiB available RAM
- 最少 64GiB free disk
  - Windows 11 Pro 下载内容约 7.9GB
  - 实际还需要 Docker image、ISO 构建、系统盘和临时空间
- Host 本身是 VM 时，需要启用 nested virtualization

Docker Desktop 在 Linux、macOS 和 Windows 10 上不能为容器提供 KVM，因此不支持；
Windows 11 Docker Desktop 需要 nested virtualization。

```bash
# Host 检查
test -c /dev/kvm
test -c /dev/net/tun
ls -l /dev/kvm /dev/net/tun

# Debian/Ubuntu
sudo apt install cpu-checker
sudo kvm-ok
```

正常情况下 `kvm-ok` 应输出：

```text
KVM acceleration can be used
```

## Docker Compose

```yaml
services:
  windows:
    # 生产环境建议固定完整 OCI digest
    image: docker.io/dockurr/windows@sha256:<digest>
    container_name: windows
    environment:
      VERSION: '11'
      RAM_SIZE: '8G'
      CPU_CORES: '4'
      DISK_SIZE: '128G'
      USERNAME: ${WINDOWS_USERNAME:?required}
      PASSWORD: ${WINDOWS_PASSWORD:?required}
    devices:
      - /dev/kvm
      - /dev/net/tun
    cap_add:
      - NET_ADMIN
    ports:
      # 只绑定 loopback、内网或 VPN IP，不要默认暴露到公网
      - ${BIND_IP:-127.0.0.1}:8006:8006/tcp
      - ${BIND_IP:-127.0.0.1}:3389:3389/tcp
      - ${BIND_IP:-127.0.0.1}:3389:3389/udp
    volumes:
      - ./storage:/storage
    restart: unless-stopped
    stop_grace_period: 2m

    # Docker host ceiling；需要略高于 guest RAM_SIZE
    mem_limit: 12g
    cpus: 4
```

Secret 放在不进入 Git 的本地 env 文件：

```dotenv
WINDOWS_USERNAME=<username>
WINDOWS_PASSWORD=<random-password>
BIND_IP=<private-or-vpn-ip>
```

```bash
chmod 600 .env.local

docker compose --env-file=.env.local config -q
docker compose --env-file=.env.local pull
docker compose --env-file=.env.local up -d
```

### 权限最小化

- 默认不需要 `privileged: true`
- 只传递：
  - `/dev/kvm`
  - `/dev/net/tun`
  - `NET_ADMIN`
- `privileged: true` 只能临时用于确认 device/permission 问题，不能作为长期修复
- Web/RDP 只绑定可信网络地址
- 生产环境固定 image digest，不依赖 mutable tag
- `USERNAME`、`PASSWORD` 不写入 tracked Compose

## 常用配置

| Variable    | Default   | Example                          | Notes                                       |
| ----------- | --------- | -------------------------------- | ------------------------------------------- |
| `VERSION`   | `11`      | `11`, `11l`, `11e`, `10`, `2025` | Windows release 或自定义 ISO URL            |
| `RAM_SIZE`  | `4G`      | `8G`                             | Guest 固定内存；与 Docker memory limit 不同 |
| `CPU_CORES` | `2`       | `4`                              | Guest 可见 vCPU 数量                        |
| `DISK_SIZE` | `64G`     | `128G`                           | 系统盘逻辑容量，可向上扩容                  |
| `USERNAME`  | `Docker`  | env secret                       | 无人值守安装用户                            |
| `PASSWORD`  | `admin`   | env secret                       | 不要使用默认密码                            |
| `LANGUAGE`  | `English` | `Chinese`                        | 下载/安装语言                               |
| `REGION`    | -         | `zh-CN`                          | Windows locale                              |
| `KEYBOARD`  | -         | `zh-CN`                          | Keyboard layout                             |
| `MANUAL`    | -         | `Y`                              | 手动安装，不推荐                            |
| `AUDIO`     | -         | `Y`                              | Web viewer audio；RDP 默认支持音频          |
| `COMMAND`   | -         | Windows command                  | 安装完成阶段执行一次                        |

完整配置以官方
[environment variables](https://github.com/dockur/windows/blob/master/docs/environment.md)
为准。

### Guest 资源与 Container Limit

`RAM_SIZE`、`CPU_CORES` 控制 QEMU guest；Compose 的 `mem_limit`、`cpus` 控制
container 可消耗的 host 资源。两层限制不能机械设置成完全相同：

- `mem_limit` 需要高于 `RAM_SIZE`，给 QEMU、web viewer 和管理进程留 headroom
- `cpus` 可以等于 `CPU_CORES`，防止 QEMU 超出 host 分配
- Host 还要给 Docker、文件 cache 和其他 workload 保留可用内存
- 核心节点没有 swap 时，必须同时检查 available memory 和 memory pressure
- Dynamic memory ballooning 是可选能力；启用前先阅读官方配置和 guest driver 要求

## 首次安装

首次启动不是普通 container startup，通常包含：

1. 从 Microsoft 下载 Windows release
2. 解压 Windows image
3. 注入 virtio driver
4. 生成 unattended installation answer file
5. 构建安装 ISO
6. 创建 growable raw disk
7. 启动 QEMU/UEFI
8. 执行 Windows Setup 并多次重启

日志中的高信号阶段：

```text
Requesting Windows 11
Downloading Windows 11
Extracting Windows 11 image
Adding drivers to image
Building Windows 11 image
Creating a ... growable disk image
Booting Windows using QEMU
Windows started successfully
Windows Boot Manager
```

- 首次安装可能持续 30-60 分钟
- Web 8006 可访问只表示 web viewer 可用，不表示 Windows 已安装完成
- `Windows started successfully` 表示 QEMU 已启动，也不一定表示 RDP 已 ready
- 看到 Windows desktop 或 guest 3389 可连接，才可认为系统进入可用阶段
- 不要因为安装阶段看起来停顿就反复 restart；先检查日志、CPU、disk I/O 和 QEMU

## 访问

| Port   | Protocol | Purpose                              |
| ------ | -------- | ------------------------------------ |
| `8006` | TCP/HTTP | Web viewer，主要用于安装和控制台诊断 |
| `3389` | TCP      | RDP display/control                  |
| `3389` | UDP      | RDP transport optimization           |

Web viewer 功能和响应性弱于 RDP，不支持完整 clipboard 等桌面能力；完成安装后优先
使用 Microsoft Remote Desktop、`mstsc` 或 FreeRDP。

```bash
# Web viewer
curl -fsS http:// < host > :8006/ > /dev/null

# Host listener 只能证明端口映射存在
nc -zv < host > 3389

# NAT 模式下可从 container 内检查 guest RDP
# guest IP 以实际日志/网络配置为准，常见为 172.30.0.2
docker exec windows sh -c 'timeout 5 nc -z 172.30.0.2 3389'
```

## 存储

`/storage` 是最重要的持久化边界，包含 Windows 系统盘、UEFI vars、MAC、ROM 和安装
相关文件。删除或挂载到空目录可能触发全新安装并造成数据丢失。

```bash
du -sh ./storage
find ./storage -maxdepth 1 -type f -printf '%f %s\n' | sort
```

- `DISK_SIZE` 是 guest disk 的逻辑容量；growable/raw disk 初始不会占满全部空间
- `DISK_SIZE` 可以向上扩大，Windows 内仍需手动扩展 partition/filesystem
- 不支持通过减小 `DISK_SIZE` 安全缩容
- 一致性备份应先 graceful stop Windows/VM，再复制或 snapshot storage
- 不要在 Windows Setup 完成前传入 USB mass-storage；可能被误识别并格式化为系统盘

```bash
# 给 Windows 足够时间关机
docker compose --env-file=.env.local stop -t 120 windows
```

不要使用 `docker kill` 或过短 timeout 作为常规停止方式。

## 网络模式

默认是 Docker bridge + QEMU NAT：

- Container 使用 Docker network IP
- Windows guest 使用内部 NAT IP
- 通过 host port publish 访问 Web/RDP

其他模式：

- macvlan：container 可获得 LAN IP，但 Docker host 默认不能直接访问 macvlan peer
- `DHCP=Y`：Windows guest 可向物理 router 请求地址
  - 需要 `/dev/vhost-net`
  - 需要额外 device cgroup rule
- 自定义网络前先明确 host/container/guest 三层地址和路由，不要只看 container IP

## 运维验证

```bash
docker compose --env-file=.env.local ps

docker inspect windows | jq '.[0] | {
  status: .State.Status,
  restartCount: .RestartCount,
  imageRef: .Config.Image,
  imageId: .Image,
  memory: .HostConfig.Memory,
  nanoCpus: .HostConfig.NanoCpus,
  privileged: .HostConfig.Privileged,
  devices: .HostConfig.Devices,
  capAdd: .HostConfig.CapAdd,
  ports: .NetworkSettings.Ports
}'

docker exec windows pgrep -af qemu-system
docker stats --no-stream windows
```

部署或升级后至少确认：

- container `running`，restart count 没有持续增长
- 实际 image ID 与预期 digest 对应
- guest/container CPU 和 memory bounds 生效
- `privileged=false`
- KVM/TUN/NET_ADMIN 存在
- 只发布预期的可信地址与端口
- Web viewer 可达
- guest RDP 可达
- QEMU process 存在
- storage path/size 符合预期
- Host 没有 OOM、memory pressure、disk pressure

# FAQ

## `kvm-ok` 成功，但 container 仍提示 KVM unavailable

- 检查 `/dev/kvm` 是否传入 container
- 检查 container user 对 device 的权限
- 检查宿主 SELinux/AppArmor/device cgroup policy
- 检查 host 是否本身是 VM，以及 nested virtualization 是否真的透传
- 可短暂使用 `privileged: true` 仅用于定位；确认原因后恢复最小 devices/capabilities

## Web 8006 ready，但 Windows/RDP 不可用

- Web server、QEMU、Windows guest 是不同 readiness 层
- 查看安装阶段日志和 QEMU process
- 检查 guest 3389，而不只是 host listener
- 首次安装等待 Windows Setup 完成，不要反复重启

## 修改 `USERNAME`/`PASSWORD` 后为什么登录信息没变化

这些变量主要用于无人值守安装。Windows 已安装后修改 Compose env 通常不会自动修改
guest 内已存在的账户，应从 Windows 内修改用户密码。不要通过删除 storage 强制重装。

## 扩大 `DISK_SIZE` 后 Windows 看不到新增空间

虚拟磁盘扩大后，新增空间通常是 unallocated，需要在 Windows Disk Management 中手动
扩展 partition。

## Container 删除后 Windows 数据是否还在

只要 `/storage` bind mount 或 volume 保留，重建 container 不等于删除系统盘。真正的
高风险操作是删除 storage、挂载到错误空目录，或把 USB/physical disk 错当系统盘。

## 是否包含 Windows license

不包含。项目不分发 Windows，也不提供有效 activation license；generic installation
key 不能用于正式激活。使用者需要自行确保 Microsoft license 合规。
