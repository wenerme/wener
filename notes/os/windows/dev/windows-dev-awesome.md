---
title: Windows Development Awesome List
tags:
  - Windows
  - Development
  - Awesome
  - Tools
---

# Windows Development Awesome List {#windows-dev-awesome-list}

- SSH
  - Windows OpenSSH Server
    - PowerShell
    - dotnet
  - MSYS2 sshd
  - Cygwin sshd
  - Git Bash sshd
  - WSL sshd
- Terminal
  - Windows Terminal
  - Warp
  - Tabby
  - WezTerm

| cmd                    | stand for                 | mean              |
| ---------------------- | ------------------------- | ----------------- |
| tscon                  | Terminal Services Connect |
| mstsc                  |
| gpedit                 | Group Policy Edit         | 组策略编辑        |
| services               | Service Manager           | 服务              |
| control                | Control Panel             | 控制面板          |
| eventvwr               | Event Viewer              | 事件查看器        |
| systeminfo             |                           | 查看系统信息      |
| qwinsta                |
| cmd                    |
| powershell             | Powershell v5.1           | Win7+, Win10 默认 |
| pwsh                   | Poershell v7+             |
| systempropertiesremote |                           | 远程桌面设置      |

| format | for                   | notes |
| ------ | --------------------- | ----- |
| msi    |
| msix   |
| appx   |                       | 商店  |
| wix    | Windows Installer XML |

| linux            | windows                                    | notes |
| ---------------- | ------------------------------------------ | ----- |
| `~/.local/bin`   | `%AppData%\..\Local\Microsoft\WindowsApps` |
| `~/.local/bin`   | `%LocalAppData%\Programs`                  |
| ~/npm            | `%AppData%\npm`                            |       |
| `~/go/bin`       | `%UserProfile%\go\bin`                     |       |
| `/usr/bin`       | `C:\Windows\System32`                      |       |
| `/usr/local/bin` | `C:\Program Files`                         |
| `.bashrc`        | `$PROFILE`                                 |

```powershell
# 安装 PowerShell v7+
# pwsh
winget install --id Microsoft.PowerShell --installer-type wix
(Get-Command pwsh).Source

# Windows 可用的比较好的 Terminal
winget install Warp.Warp
winget install Zellij.Zellij

# admin PowerShell
Start-Process powershell.exe -Verb RunAs

# https://github.com/microsoft/winget-pkgs
# https://winstall.app/
# https://winget.run/
winget source list
winget source update

winget install gerardog.gsudo

# 用户信息
whoami /all
Get-ItemProperty -Path "HKCU:\Software\Microsoft\IdentityCRL\UserExtendedProperties\*" | Select-Object -ExpandProperty Email
Get-LocalUser | Where-Object { $_.PrincipalSource -eq "MicrosoftAccount" } | Select-Object Name, FullName, Description

# 把当前 RDP 远程桌面 session 转回本机 console session, RDB 断开，桌面保持登陆、解锁、可交互状态
tscon SESSION_ID /dest:console

query session
query user %USERNAME%
qwinsta

# 连接 RDB
# /w:1920 /h:1080 /multimon /admin
mstsc /v:192.168.1.123:3389 /f

# 凭据
cmdkey /generic:TERMSRV/192.168.1.123 /user:wener /pass:PASSWORD
cmdkey /delete:TERMSRV/192.168.1.123

# 开启 RDP
# Windows Home 通常不能作为 RDP Host，需要 Pro / Enterprise / Server
Set-ItemProperty `
  -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' `
  -Name 'fDenyTSConnections' `
  -Value 0

Enable-NetFirewallRule -DisplayGroup "Remote Desktop"

Get-NetTCPConnection -LocalPort 3389 -State Listen
```

```sh
# macOS Windows App / Microsoft Remote Desktop
cat > win.rdp << 'EOF'
full address:s:192.168.1.123
username:s:wener
desktopwidth:i:1920
desktopheight:i:1080
session bpp:i:32
redirectclipboard:i:1
audiomode:i:2
EOF
open win.rdp
```

```sh
where cmd
Get-Command cmd
Set-Alias which Get-Command
```
- UI Automation
  - [g4-api/uia-peek](https://github.com/g4-api/uia-peek)
    - Windows UI Automation inspector 与 recorder，支持 REST/CLI/SignalR。

## Sysinternals

- https://live.sysinternals.com/tools

```bash
winget install --source --scope machine winget Microsoft.Sysinternals.ProcessExplorer
winget install --source winget Microsoft.Sysinternals.ProcessMonitor
winget install --source winget Microsoft.Sysinternals.TCPView
winget install --source winget Microsoft.Sysinternals.Autoruns
```

## PowerShell

- $PROFILE
- $PROFILE.CurrentUserAllHosts
- $PROFILE.AllUsersAllHosts
- Documents\PowerShell\Microsoft.PowerShell_profile.ps1
- PowerShell v7+ 给予 .NET Core, 跨平台

| 描述           | Windows/PowerShell             | Linux       |
| -------------- | ------------------------------ | ----------- |
| 当前用户       | $env:USERNAME                  | $USER       |
| 当前目录       | $PWD 或 $env:PWD               | $PWD        |
| 用户主目录     | $HOME 或 $env:USERPROFILE      | $HOME       |
| 可执行文件路径 | $env:PATH                      | $PATH       |
| 临时目录       | $env:TEMP                      | $TMPDIR     |
| 系统主机名     | $env:COMPUTERNAME              | $HOSTNAME   |
| 操作系统类型   | $IsWindows / $IsLinux (布尔值) | $OSTYPE     |
| 默认 Shell     | $ShellId                       | $SHELL      |
| 处理器架构     | $env:PROCESSOR_ARCHITECTURE    | $(uname -m) |

## Windows Native SSHd

- C:\ProgramData\ssh\administrators_authorized_keys
  - 管理员账号可能用这个
- C:\ProgramData\ssh\sshd_config

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

Start-Service sshd
Set-Service -Name sshd -StartupType Automatic

New-NetFirewallRule `
    -Name "sshd" `
    -DisplayName "OpenSSH Server" `
    -Enabled True `
    -Direction Inbound `
    -Protocol TCP `
    -Action Allow `
    -LocalPort 22

# .ssh 权限修复
icacls $env:USERPROFILE\.ssh /inheritance:r
icacls $env:USERPROFILE\.ssh /grant "$env:USERNAME:(OI)(CI)F"
icacls $env:USERPROFILE\.ssh\authorized_keys /inheritance:r
icacls $env:USERPROFILE\.ssh\authorized_keys /grant "$env:USERNAME:F"

# 重启 sshd
Restart-Service sshd
```

## Package Management

- [winget-cli](https://github.com/microsoft/winget-cli) - Windows Package Manager.
- [Scoop](https://github.com/ScoopInstaller/Scoop) - Command-line installer for Windows.
- [Chocolatey](https://chocolatey.org/) - Package Manager for Windows.

## Tools

- [PowerToys](https://github.com/microsoft/PowerToys) - Windows system utilities to maximize productivity.
- [Windows Terminal](https://github.com/microsoft/terminal) - The new Windows Terminal.
- [Sysinternals Suite](https://docs.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite) - Troubleshooting utilities.
- [Process Hacker](https://processhacker.sourceforge.io/) - Advanced task manager.
- [Wox](https://github.com/Wox-launcher/Wox) - Launcher for Windows.
- [Everything](https://www.voidtools.com/) - Locate files and folders by name instantly.

## Development

- [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) - Windows Subsystem for Linux.
- [Git for Windows](https://gitforwindows.org/)
- [Cmder](https://cmder.net/) - Portable console emulator for Windows.

## UI/UX

- [Fluent Design System](https://www.microsoft.com/design/fluent)
- [WinUI 3](https://microsoft.github.io/microsoft-ui-xaml/)

## References

- [Awesome Windows](https://github.com/Awesome-Windows/Awesome)

# FAQ

## pwsh vs PowerShell

- pwsh.exe
  - PowerShell v7+
- powershell.exe
  - PowerShell v5

---

- https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6

```powershell
winget install --id Microsoft.PowerShell --source winget

# --scope machine 需要管理员权限
# winget install --id Microsoft.PowerShell --source winget --scope machine --installer-type wix

(Get-Command pwsh).Source
# C:\Users\$USER\AppData\Local\Microsoft\WindowsApps\pwsh.exe
```

## pi Code Agent

- ~/.pi/agent/settings.json

```json
{
  "shellPath": "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
}
```

## 已在此计算机上禁用 Sudo。若要启用它，请转到“设置”应用中的 Developer Settings page

```
# 1. 开启 Sudo 功能
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Sudo" /v Enabled /t REG_DWORD /d 1 /f

# 2. 设置 Sudo 的配置模式（可选）
# 0 = 在新窗口中 (New Window)
# 1 = 禁用输入重定向 (Input Closed)
# 2 = 正常模式 (Inline) - 开发者通常最喜欢这个
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Sudo" /v SudoMode /t REG_DWORD /d 2 /f

# 开发人员模式
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /v AllowDevelopmentWithoutDevLicense /t REG_DWORD /d 1 /f

sudo --version
```

## WiX

- 构建 MSI

```bash
dotnet tool install --global wix
```

## Unable to persist credentials with the 'wincredman' credential store.

```
fatal: Unable to persist credentials with the 'wincredman' credential store.
See https://aka.ms/gcm/credstores for more information.
```
