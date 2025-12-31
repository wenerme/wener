---
title: Linux 文件系统与设备管理
tags:
  - Linux
  - Admin
  - Filesystem
  - Device
---

# Linux 文件系统与设备管理 {#linux-filesystem-device-management}

- `/etc`
- `/usr/local/bin` 本地编译

## 最后登录信息 (Last Login) {#last-login}

- `/var/log/lastlog`
- `lastlog(8)`
- `pam_lastlog(8)`
- `last`

## 挂载与共享 (Mounts & Shares) {#mounts-shares}

- `/etc/dfs/sharetab`
- `/etc/mtab` -> `/proc/mounts`
- `/etc/motd`

```bash
# 添加最近的一条 mount 到 fstab
sudo tail -1 /etc/mtab | sudo tee -a /etc/fstab
```

## 日志文件 (Logs) {#logs}

- `/var/log/messages`
- `/var/log/dmesg`
- `/var/log/pods/NAMESPACE_POD` - kubelet/containerd Pod 日志目录

## 设备节点 (Device Nodes) {#device-nodes}

- `/dev/zram`
  - Linux 3.14+
  - 内存中的压缩块设备 (compressed block device in RAM)
  - [zram: Compressed RAM-based block devices](https://www.kernel.org/doc/html/latest/admin-guide/blockdev/zram.html)
  - [Zram - Wikipedia](https://en.wikipedia.org/wiki/Zram)

## 显卡与 GPU (GPU) {#gpu}

- `/dev/dri/by-path/`
- `/dev/dri/card0`
- `/dev/dri/renderD128`

<!-- glxinfo -->

```bash
apk add inxi
inxi -Gx
```

```bash title="aspeed"
sudo dmesg | grep AST
```

```
ast 0000:03:00.0: [drm] AST 2400 detected
```

```bash
lspci -vvv -s 03:00.0
```

```title="ASRock AST2400"
03:00.0 VGA compatible controller: ASPEED Technology, Inc. ASPEED Graphics Family (rev 30) (prog-if 00 [VGA controller])
        Subsystem: ASRock Incorporation Device 2000
        Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr+ Stepping- SERR+ FastB2B- DisINTx-
        Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=medium >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
        Latency: 0
        Interrupt: pin A routed to IRQ 17
        Region 0: Memory at de000000 (32-bit, non-prefetchable) [size=16M]
        Region 1: Memory at df000000 (32-bit, non-prefetchable) [size=128K]
        Region 2: I/O ports at d000 [size=128]
        Expansion ROM at 000c0000 [virtual] [disabled] [size=128K]
        Capabilities: [40] Power Management version 3
                Flags: PMEClk- DSI- D1+ D2+ AuxCurrent=375mA PME(D0+,D1+,D2+,D3hot+,D3cold+)
                Status: D0 NoSoftRst- PME-Enable- DSel=0 DScale=0 PME-
        Capabilities: [50] MSI: Enable- Count=1/4 Maskable- 64bit+
                Address: 0000000000000000  Data: 0000
        Kernel driver in use: ast
```

## 杂项 (Misc) {#misc}

- `~/.dircolors`
- `/etc/DIR_COLORS`
- `LS_COLORS`
