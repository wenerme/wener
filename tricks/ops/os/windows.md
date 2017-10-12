# Windows

## Tips

* 系统下载
  * [itellyou](http://msdn.itellyou.cn/)
* 工具
  * CPUID [下载](http://www.cpuid.com/softwares/cpu-z.html)
    * 硬件信息
    * 压测
  * HWMonitor [下载](http://www.cpuid.com/softwares/hwmonitor.html)
    * 硬件信息
    * 温度
  * [sysinternals](https://technet.microsoft.com/en-us/sysinternals/bb545021.aspx) [下载](https://technet.microsoft.com/en-us/sysinternals/bb842062)
    * 管理辅助工具
  * [rufus](https://rufus.akeo.ie/) [Github](https://github.com/pbatard/rufus)
    * 制作启动盘
    * 速度很快
    * 只能在 Windows 下使用
  * [etcher](https://etcher.io/)
    * 制作启动盘
    * 可以跨平台使用
* 输入法
  * http://dl.google.com/pinyin/v2/GooglePinyinInstaller.exe
  * http://dl.google.com/pinyin/v1/GooglePinyinInstaller.exe

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

## GameBox
* Win 10
* Tools
  * sysinternals
  * haozip
* Civ 4
* SC 1
* War


## 版本

* [Windows Server 2016](https://en.wikipedia.org/wiki/Windows_Server_2016)
  * NanoServer
  * 支持容器
  * 支持无界面服务
  * IIS 10 支持HTTP/2
  * Windows PowerShell 5.0
  * Hyper-V 支持网络虚拟化

## 激活

### KMS

* [py-kms](https://github.com/myanaloglife/py-kms) Python 实现的 KMS 服务器
  * py-kms 有很多 fork, 更新版本的需要找 fork 的分支,我的 fork [wenerme/py-kms](https://github.com/wenerme/py-kms)
* [vlmcsd](https://github.com/Wind4/vlmcsd) 是 C 的实现,可以直接通过 [软盘](https://github.com/Wind4/vlmcsd/tree/master/floppy) 启动
  * 使用 vbox 启动 KMS 虚拟机,网络使用桥接,确保网络互通
  * 可以使用 docker 启动 `docker run -d --name vlmcsd --net host muicoder/vlmcsd`
  * [vlmcsd.7](https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.7.html)
    * 包含了很多序列号
  * [vlmcsd.8](https://rawgit.com/Wind4/vlmcsd/master/man/vlmcsd.8.html)
  * 端口为 1688, 可使用 -P 控制


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
cd C:\Program Files\Microsoft Office\Office14\
# 修改为自己的 KMS 地址
cscript ospp.vbs /sethst:192.168.1.2
# 激活
cscript ospp.vbs /act
# 查看激活状态
cscript osbb.vbs /dstatus
```

### 密钥

版本 | 密钥
----|----
Windows Server 2016 Datacenter  | CB7KF-BWN84-R7R2Y-793K2-8XDDG
Windows Server 2016 Standard    | WC2BQ-8NRM3-FDDYY-2BFGV-KHKQY
Windows Server 2016 Essentials  | JCKRF-N37P4-C2D82-9YXRT-4M63B
Pro                             | W269N-WFGWX-YVC9B-4J6C9-T83GX
Pro N                           | MH37W-N47XK-V7XM9-C7227-GCQG9
Enterprise                      | NPPR9-FWDCX-D2C8J-H872K-2YT43
Enterprise N                    | DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4
Education                       | NW6C2-QMPVW-D7KKK-3GKT6-VCFB2
Education N                     | 2WH4N-8QGBV-H22JP-CT43Q-MDWWJ
Enterprise LSTB                 | WNMTR-4C88C-JK8YV-HQ7T2-76DF9
Enterprise LSTB N               | 2F77B-TNFGY-69QQF-B8YKP-D69TJ






https://www.facebook.com/masterincomputerapplication/posts/314665738666245
Windows 7 Ultimate Serial Numbers, Windows-7 32-bit Serial Key Free, Windows 7 Genuine
Email This
BlogThis!
Share to Twitter
Share to Facebook
7YWX9-W3C2V-D46GW-P722P-9CP4D
MM7DF-G8XWM-J2VRG-4M3C4-GR27X
KGMPT-GQ6XF-DM3VM-HW6PR-DX9G8
MVBCQ-B3VPW-CT369-VM9TB-YFGBP
KBHBX-GP9P3-KH4H4-HKJP4-9VYKQ
BCGX7-P3XWP-PPPCV-Q2H7C-FCGFR
RGQ3V-MCMTC-6HP8R-98CDK-VP3FM
Q3VMJ-TMJ3M-99RF9-CVPJ3-Q7VF3
6JQ32-Y9CGY-3Y986-HDQKT-BPFPG
P72QK-2Y3B8-YDHDV-29DQB-QKWWM
6F4BB-YCB3T-WK763-3P6YJ-BVH24
9JBBV-7Q7P7-CTDB7-KYBKG-X8HHC
C43GM-DWWV8-V6MGY-G834Y-Y8QH3
GPRG6-H3WBB-WJK6G-XX2C7-QGWQ9
MT39G-9HYXX-J3V3Q-RPXJB-RQ6D7
MVYTY-QP8R7-6G6WG-87MGT-CRH2P
GRY6B-TJ49J-X73JG-38H9K-VWJHY
C8XXQ-PQDD6-6KGP6-J8XT6-XGB2X
8XRH7-RTC6B-BJ42C-C2Q8Y-BRXMG
PTTCH-H7J6M-4XXWH-86RT3-66P6M
DLMKZ-2ILHP-7IUG9-A2QVK-A2BYX
BPVVG-7KVMM-HGRZ1-SQZ4L-USRHM
FJGCP-4DFJD-GJY49-VJBQ7-HYRR2
3YHKG-DVQ27-RYRBX-JMPVM-WG38T
MVBCQ-B3VPW-CT369-VM9TB-YFGBP
Windows 7 Ultimate Serial Keys
windows 7 ulimate - lenovo - 22TKD-F8XX6-YG69F-9M66D-PMJBM
windows 7 ulimate - dell - 342DG-6YJR8-X92GV-V7DCV-P4K27
windows 7 ulimate - acer - FJGCP-4DFJD-GJY49-VJBQ7-HYRR2
Windows 7 Professional Serial Keys
windows 7 professional - dell - 32KD2-K9CTF-M3DJT-4J3WC-733WD
windows 7 professional - acer - YKHFT-KW986-GK4PY-FDWYH-7TP9F
windows 7 professional - hp - 74T2M-DKDBC-788W3-H689G-6P6GT
windows 7 professional - samsung - GMJQF-JC7VC-76HMH-M4RKY-V4HX6
Windows 7 Home Premium Serial Keys
windows 7 Home Premium - samsung - CQBVJ-9J697-PWB9R-4K7W4-2BT4J
windows 7 Home Premium - packard bell - VQB3X-Q3KP8-WJ2H8-R6B6D-7QJB7
windows 7 Home Premium - dell - 6RBBT-F8VPQ-QCPVQ-KHRB8-RMV82
windows 7 Home Premium - asus - 7JQWQ-K6KWQ-BJD6C-K3YVH-DVQJG
Windows 7 Beta 64-bit Product Key
7XRCQ-RPY28-YY9P8-R6HD8-84GH3
JYDV8-H8VXG-74RPT-6BJPB-X42V4
482XP-6J9WR-4JXT3-VBPP6-FQF4M
JYDV8-H8VXG-74RPT-6BJPB-X42V4
~~~~~~~~~~~~~~~~~~~~~~~~~~
Windows 7 Beta 32-bit Product Key
6JKV2-QPB8H-RQ893-FW7TM-PBJ73
TQ32R-WFBDM-GFHD2-QGVMH-3P9GC
GG4MQ-MGK72-HVXFW-KHCRF-KW6KY
4HJRK-X6Q28-HWRFY-WDYHJ-K8HDH
QXV7B-K78W2-QGPR6-9FWH9-KGMM7
