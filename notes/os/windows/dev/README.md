---
title: Windows 开发
tags:
  - Devlopment
---

# Windows 开发

- msys2 - 提供环境
- [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
  Windows nvm

## 禁用 Antimalware Service Executable

- 在开发环境下占用大量 CPU 资源 - 扫描的文件非常多

```batch
# 以管理员身份运行
REG ADD "hklm\software\policies\microsoft\windows defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f
```

## 依赖

- http://www.dependencywalker.com/
- 常见依赖
  - [VS 2015](https://www.microsoft.com/zh-cn/download/details.aspx?id=48145)
  - [VS 2013](https://www.microsoft.com/zh-cn/download/details.aspx?id=40784)
  - [VS 2010](https://www.microsoft.com/zh-cn/download/details.aspx?id=5555)
  - [VS 2008](https://www.microsoft.com/zh-cn/download/details.aspx?id=29)
  - [VS 2008 x64](https://www.microsoft.com/zh-cn/download/details.aspx?id=15336)
  - [VS 2008 x64 SP1](https://www.microsoft.com/zh-cn/download/details.aspx?id=5582)
