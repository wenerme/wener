---
title: Windows
---

# Windows

- [Awesome](./windows-awesome.md)
- [FAQ](./windows-faq.md)
- 系统下载
  - [itellyou](http://msdn.itellyou.cn/)
- 工具
  - CPUID [下载](http://www.cpuid.com/softwares/cpu-z.html)
    - 硬件信息
    - 压测
  - HWMonitor [下载](http://www.cpuid.com/softwares/hwmonitor.html)
    - 硬件信息
    - 温度
  - [sysinternals](https://technet.microsoft.com/en-us/sysinternals/bb545021.aspx) [下载](https://technet.microsoft.com/en-us/sysinternals/bb842062)
    - 管理辅助工具
  - [rufus](https://rufus.akeo.ie/) [Github](https://github.com/pbatard/rufus)
    - 制作启动盘
    - 速度很快
    - 只能在 Windows 下使用
  - [etcher](https://etcher.io/)
    - 制作启动盘
    - 可以跨平台使用
- 输入法
  - http://dl.google.com/pinyin/v2/GooglePinyinInstaller.exe
  - http://dl.google.com/pinyin/v1/GooglePinyinInstaller.exe
- [Windows lifecycle fact sheet](https://support.microsoft.com/en-us/help/13853/windows-lifecycle-fact-sheet)
  - Windows 7, service pack 1\* January 13, 2015 January 14, 2020
  - Windows 8.1 January 9, 2018 January 10, 2023

```bash
# 获取 bios 串号
wmic bios get serialnumber
# 通过 vbox 修改串号
VBoxManage setextradata "VM name" "VBoxInternal/Devices/pcbios/0/Config/DmiSystemSerial" "System Serial"
# 如果串号为纯数字,应该再签名加 string
VBoxManage setextradata "VM name" "VBoxInternal/Devices/pcbios/0/Config/DmiSystemSerial" "string:1234"

# 获取模型名
wmic csproduct get name
# 显示网卡 GUID
gwmi win32_networkadapter -Property guid
Get-WmiObject Win32_NetworkAdapter -Filter "netenabled = true" | Select Guid
```

## 版本

- [Windows Server 2016](https://en.wikipedia.org/wiki/Windows_Server_2016)
  - NanoServer
  - 支持容器
  - 支持无界面服务
  - IIS 10 支持 HTTP/2
  - Windows PowerShell 5.0
  - Hyper-V 支持网络虚拟化

## 激活

### KMS

- [py-kms](https://github.com/myanaloglife/py-kms) Python 实现的 KMS 服务器
  - py-kms 有很多 fork, 更新版本的需要找 fork 的分支,我的 fork [wenerme/py-kms](https://github.com/wenerme/py-kms)
- [vlmcsd](https://github.com/Wind4/vlmcsd) 是 C 的实现,可以直接通过 [软盘](https://github.com/Wind4/vlmcsd/tree/master/floppy) 启动
  - 使用 vbox 启动 KMS 虚拟机,网络使用桥接,确保网络互通
  - 可以使用 docker 启动 `docker run -d --name vlmcsd --net host muicoder/vlmcsd`
  - [vlmcsd.7](https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.7.html)
    - 包含了很多序列号
  - [vlmcsd.8](https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.8.html)
  - 端口为 1688, 可使用 -P 控制

```bash
##########
# Windows
##########
# Software Licensing Management Tool. Windows Activation and Key Management Service (KMS)
# http://ss64.com/nt/slmgr.html
# 先设置一个秘钥
slmgr /ipk CB7KF-BWN84-R7R2Y-793K2-8XDDG
# 修改为自己的 KMS 服务器, 默认端口为 1688
slmgr /skms 192.168.1.2
# 激活
slmgr /ato
# 查看系统
slmgr /xpr
# 查看激活状态
slmgr /dli

##########
# Office
##########
# 切换到安装目录
cd C:\Program Files\Microsoft Office\Office14# 修改为自己的 KMS 地址
cscript ospp.vbs /sethst:192.168.1.2
# 激活
cscript ospp.vbs /act
# 查看激活状态
cscript osbb.vbs /dstatus
```
