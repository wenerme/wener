---
title: SMB
---

# SMB

* 是什么？
  * Server Message Block
  * 1983 IBM 创建
* 版本
  * 1983 SMBv1
    * 自 Windows Server 2003，Windows 2000
    * Windows Server 2012 R2 废弃支持
    * Windows Server 2016，Windows 10 无 SMBv1 支持
    * Samba 4.11 默认禁用
  * 2006 SMBv2
    * 自 Windows Vista in 2006，Windows Server 2008
    * Samba 3.6
    * 减少指令，支持符号链接，缓存文件属性
    * 开发协议规范
    * OS X 10.9 从 afp 迁移到 SMBv2
    * Linux 3.7 CIFS 支持 SMBv2
  * 2009 SMBv2.1
    * 自 Windows 7, Windows Server 2008 R2
    * opportunistic locking mechanism
  * 2012 SMBv3 - SMBv2.2
    * SMB Direct Protocol - SMB RDMA
    * 多通道 - 一个会话多个连接
    * 传输层 Failover
    * 端到端加密
    * 新增 AES 签名算法 - 之前是 HMAC SHA-256
  * 2013 SMB 3.0.2 - 3.02
    * 支持禁用 SMBv1
  * 2016 SMB 3.1.1
    * 在 AES-128 CCM 新增 AES-128 GCM
    * SHA-512 每次认证完整性检查
    * 强制安全协议协商

# FAQ
## CIFS vs SMB
* CIFS - Common Internet File System
  * SMB 的方言
  * SMB 由 IBM 创建
  * 1996 微软 尝试重命名为 CIFS， 对应 SMBv1，添加了新的功能
  * Linux 的 CIFS 模块支持 SMBv2
* 建议统一使用 SMB
* Windows Vista/Windows 2006 SMBv2
* Windows 8/Windows 2012 SMBv3
* [CIFS vs SMB](https://blog.varonis.com/cifs-vs-smb/)


## mounting cifs: “Operation not supported”

尝试添加 vers=3.0 选项

```bash
mount -t cifs //192.168.1.1/share /mnt -o user=username,password=passwordd,vers=3.0
```
