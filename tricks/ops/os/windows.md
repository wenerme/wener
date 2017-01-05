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


```bash
##########
# Windows
##########
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
