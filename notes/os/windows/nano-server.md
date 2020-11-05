---
title: Nano Server
---

# Nano Server
* 是什么？
  * Windows Server 容器镜像
  * 无界面，无远程桌面，专门用于虚拟化和云环境
  * 移除 WoW64 - 不支持 32 位
  * 移除 Windows Installer
  * 只能在容器主机中安装
  * 主要用于 .NET Core 应用
* Windows Server 版本需要匹配镜像版本

```bash
# 基础镜像
# https://hub.docker.com/_/microsoft-windows-nanoserver
docker pull mcr.microsoft.com/windows/nanoserver
```
