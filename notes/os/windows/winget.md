---
title: winget
---

# winget

- Windows 可直接使用
- 类似于 macOS brew

```bash
# 先安装 VC++ 避免失败
Add-AppxPackage -Path https://aka.ms/Microsoft.VCLibs.x64.14.00.Desktop.appx

# Power Shell 安装 winget
# Windows 10 1809 / build 17763
Add-AppxPackage -Path https://aka.ms/getwinget

winget --version
winget --info

& "$env:LOCALAPPDATA\Microsoft\WindowsApps\winget.exe" --info

# PATH
# %LOCALAPPDATA%\Microsoft\WindowsApps
```

```bash
winget source reset --force
winget source update
winget search --id Microsoft.PowerShell --exact --source winget

winget install --id Microsoft.PowerShell --source winget

winget install Warp.Warp Zellij Git.Git bottom Casey.Just

winget install --id Python.Python.3.13 --source winget --accept-source-agreements --accept-package-agreements
winget install --id astral-sh.uv --source winget --accept-source-agreements --accept-package-agreements

winget upgrade --all --accept-source-agreements --accept-package-agreements

# for gsudo
winget install --id gerardog.gsudo --exact --source winget --scope machine
```

| id                       | cmd       | source         | notes |
| ------------------------ | --------- | -------------- | ----- |
| Tencent.WeCom            |           | winget,msstore |
| Tencent.WeChat           |           | winget,msstore |
| Tencent.WeChat.Universal |           | winget,msstore | 4.x   |
| Zellij.Zellij            | zellij    |
| Git.Git                  | git       |
| bufbuild.buf             | buf       |
| SQLite.SQLite            | sqlite    |
| zyedidia.micro           | micro     |
| Fastfetch-cli.Fastfetch  | fastfetch |
| aristocratos.btop4win    | btop      |

# FAQ

- Winget 会安装 symlink `...\WinGet\Links`, 会导致 ssh 进入可能会导致没办法访问

## 0x8a15000f : 缺少源所需的数据

```
winget install --id Microsoft.PowerShell --source winget
打开源时失败;如果问题仍然存在，请尝试"source reset"命令。
执行此命令时发生意外错误：
0x8a15000f : 缺少源所需的数据
```

OpenSSH 非交互 会话调用 Windows AppX 部署 API 时的 0x80070520
