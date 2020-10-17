---
title: HAXM
hide_title: true
---

# HAXM
## Tips
* [intel/haxm](https://github.com/intel/haxm)
* 硬件要求
  * VT-x, Intel EM64T (Intel 64), Execute Disable (XD) Bit
  * 4 GB+, 推荐至少 8 GB
* 操作系统
  * Windows 10 64-bit
  * Windows 8, 8.1 64-bit
  * Windows 7 64-bit
* 建议禁用 HyperV
* Windows Hypervisor Platform(WHPX) 和 WSL2 与 HAXM 冲突

```shell
# 安装好后检测服务
sc query intelhaxm

# 起停
sc start intelhaxm
sc stop intelhaxm
```

```shell
# 检测支持环境
checktool -v
```

```
CPU vendor          *  GenuineIntel
Intel64 supported   *  Yes
VMX supported       *  Yes
VMX enabled         *  Yes
EPT supported       *  Yes
NX supported        *  Yes
NX enabled          *  Yes
Hyper-V disabled    *  Yes
OS version          *  Windows 6.3.9600
OS architecture     *  x86_64
Guest unoccupied    *  Yes. 0 guest(s)
```
