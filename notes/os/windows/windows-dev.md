---
title: Windows 开发
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
