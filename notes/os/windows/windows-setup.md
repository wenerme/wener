
---
title: Windows Setup
tags:
  - Windows
  - Development
  - OpenSSH
  - WinGet
---

# Windows Setup

- 目标
  - 将新安装的 Windows 10/11 配置为可通过 SSH 维护的开发机
  - 使用 WinGet 安装 machine scope 的基础工具
  - 保留可重复执行、可验证、重启后可继续的初始化过程
- 相关文档
  - [Get Started](./windows-get-started.md)
  - [WinGet](./winget.md)
  - [Dockur Windows](./dev/dockur.md)

> 首次登录、UAC 和桌面安装问题可以使用 RDP/noVNC 处理；SSH 可用后，日常维护应以
> SSH 和幂等 PowerShell 脚本为主。

## 安装顺序

1. 完成 Windows 首次登录并确认管理员账号可用
2. 设置 hostname、locale 和 timezone
3. 安装并验证 OpenSSH Server
4. 写入 SSH public key，确认新 SSH session 可登录
5. 安装 WinGet packages 和 Pi coding agent
6. 重启 Windows
7. 在重启后的新 session 中运行完整验证

修改 hostname、locale、OpenSSH、firewall 和 machine PATH 时，需要使用管理员
PowerShell。

```powershell
# 确认当前 session 已提升权限
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
$principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```

## 系统标识与区域

```powershell
# 替换为此 Windows 开发机的目标 hostname
$ComputerName = '<windows-hostname>'

if ($env:COMPUTERNAME -ne $ComputerName.ToUpperInvariant()) {
  Rename-Computer -NewName $ComputerName -Force
}

Set-Culture zh-CN
Set-WinSystemLocale zh-CN
Set-WinUserLanguageList zh-CN -Force
Set-TimeZone -Id 'China Standard Time'
```

这些修改通常需要重启才能完全生效。不要在配置过程中立即重启，应先建立 SSH 并写入
setup state，最后统一重启。

## 隐藏任务栏搜索和关闭内置广告

隐藏任务栏 Search，但不要禁用 `Windows Search`/`WSearch` 服务。禁用服务会破坏开始
菜单、本地应用搜索、文件索引和依赖 Windows Search 的 API；这里仅关闭入口、Web 内容
和推荐推广。

- Microsoft Learn
  - [ConfigureSearchOnTaskbarMode](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search#configuresearchontaskbarmode)
  - [Experience policies](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-experience)
  - [Policy recommendations for minimizing personalized offers](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services)

Windows 11 24H2 的任务栏策略支持 `0=Hide`。同时保留当前用户的
`SearchboxTaskbarMode=0`，用于立即收敛现有 profile：

```powershell
function Set-RegistryDword([string]$Path, [string]$Name, [int]$Value) {
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -Path $Path -Force | Out-Null
  }
  New-ItemProperty `
    -Path $Path `
    -Name $Name `
    -PropertyType DWord `
    -Value $Value `
    -Force | Out-Null
}

$settings = @(
  @{ Path = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Windows Search'; Name = 'ConfigureSearchOnTaskbarMode'; Value = 0 },
  @{ Path = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Windows Search'; Name = 'DisableWebSearch'; Value = 1 },
  @{ Path = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Windows Search'; Name = 'ConnectedSearchUseWeb'; Value = 0 },
  @{ Path = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\CloudContent'; Name = 'DisableWindowsConsumerFeatures'; Value = 1 },
  @{ Path = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AdvertisingInfo'; Name = 'Enabled'; Value = 0 },
  @{ Path = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\AdvertisingInfo'; Name = 'DisabledByGroupPolicy'; Value = 1 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Search'; Name = 'SearchboxTaskbarMode'; Value = 0 },
  @{ Path = 'HKCU:\Software\Policies\Microsoft\Windows\Explorer'; Name = 'DisableSearchBoxSuggestions'; Value = 1 },
  @{ Path = 'HKCU:\Software\Policies\Microsoft\Windows\CloudContent'; Name = 'DisableTailoredExperiencesWithDiagnosticData'; Value = 1 },
  @{ Path = 'HKCU:\Software\Policies\Microsoft\Windows\CloudContent'; Name = 'DisableThirdPartySuggestions'; Value = 1 },
  @{ Path = 'HKCU:\Software\Policies\Microsoft\Windows\CloudContent'; Name = 'DisableWindowsSpotlightFeatures'; Value = 1 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo'; Name = 'Enabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'ContentDeliveryAllowed'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SilentInstalledAppsEnabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SoftLandingEnabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SystemPaneSuggestionsEnabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SubscribedContent-310093Enabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SubscribedContent-338388Enabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SubscribedContent-338389Enabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'; Name = 'SubscribedContent-338393Enabled'; Value = 0 },
  @{ Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced'; Name = 'ShowSyncProviderNotifications'; Value = 0 }
)

foreach ($setting in $settings) {
  Set-RegistryDword $setting.Path $setting.Name $setting.Value
}
```

当前桌面可通过刷新策略和重启 Explorer 立即应用；自动化安装流程通常等待最终 reboot。
Explorer 退出时可能将旧模式写回注册表，因此应在新 Explorer 启动后再次设置
`SearchboxTaskbarMode=0`：

```powershell
gpupdate.exe /target:computer /force

$before = @(Get-Process explorer -ErrorAction SilentlyContinue | Select-Object Id, SessionId)
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue

$deadline = (Get-Date).AddSeconds(15)
do {
  Start-Sleep -Seconds 1
  $after = @(Get-Process explorer -ErrorAction SilentlyContinue |
    Select-Object Id, SessionId)
} while ($after.Count -eq 0 -and (Get-Date) -lt $deadline)

if ($after.Count -eq 0) {
  throw 'Explorer did not restart.'
}

New-ItemProperty `
  -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Search' `
  -Name SearchboxTaskbarMode `
  -PropertyType DWord `
  -Value 0 `
  -Force | Out-Null

Start-Sleep -Seconds 5
$mode = (Get-ItemProperty `
  'HKCU:\Software\Microsoft\Windows\CurrentVersion\Search' `
  -Name SearchboxTaskbarMode).SearchboxTaskbarMode
if ($mode -ne 0) { throw "Search taskbar mode reverted to $mode" }

$before
$after
```

验证配置，并确保本地 Search 未被禁用：

```powershell
(Get-ItemProperty `
  'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Windows Search' `
  -Name ConfigureSearchOnTaskbarMode).ConfigureSearchOnTaskbarMode

(Get-ItemProperty `
  'HKCU:\Software\Microsoft\Windows\CurrentVersion\Search' `
  -Name SearchboxTaskbarMode).SearchboxTaskbarMode

Get-CimInstance Win32_Service -Filter "Name='WSearch'" |
  Select-Object Name, State, StartMode
```

预期两个 Search mode 都为 `0`，且 `WSearch.StartMode` 不是 `Disabled`。

## OpenSSH Server

优先使用经过版本和 SHA-256 校验的 Microsoft Win32-OpenSSH MSI。没有固定 MSI 时，
可以使用 Windows Capability：

```powershell
$capability = Get-WindowsCapability -Online |
  Where-Object Name -eq 'OpenSSH.Server~~~~0.0.1.0'

if ($capability.State -ne 'Installed') {
  Add-WindowsCapability -Online -Name $capability.Name
}

Set-Service sshd -StartupType Automatic
Start-Service sshd
```

配置防火墙和默认 shell：

```powershell
$firewallName = 'OpenSSH-Server-In-TCP'
if (-not (Get-NetFirewallRule -Name $firewallName -ErrorAction SilentlyContinue)) {
  New-NetFirewallRule `
    -Name $firewallName `
    -DisplayName 'OpenSSH Server (sshd)' `
    -Enabled True `
    -Direction Inbound `
    -Protocol TCP `
    -Action Allow `
    -LocalPort 22 `
    -Profile Any | Out-Null
}

$openSshRegistry = 'HKLM:\SOFTWARE\OpenSSH'
New-Item -Path $openSshRegistry -Force | Out-Null
New-ItemProperty `
  -Path $openSshRegistry `
  -Name DefaultShell `
  -PropertyType String `
  -Value "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
  -Force | Out-Null
```

### Administrator Public Key

管理员账号默认使用：

```text
C:\ProgramData\ssh\administrators_authorized_keys
```

不要把 private key 或密码复制到 Windows。将 public key 写入文件后，使用 SID 设置
ACL，避免中文系统上的本地化用户组名称问题：

```powershell
$authorizedKeys = 'C:\ProgramData\ssh\administrators_authorized_keys'
New-Item -ItemType Directory -Path (Split-Path $authorizedKeys) -Force | Out-Null
Set-Content -LiteralPath $authorizedKeys -Value '<ssh-public-key>' -Encoding ascii

icacls.exe $authorizedKeys /inheritance:r
icacls.exe $authorizedKeys /grant '*S-1-5-32-544:F' '*S-1-5-18:F'

Restart-Service sshd
Get-NetTCPConnection -State Listen -LocalPort 22
```

从另一台机器建立一个全新的 session 验证 key authentication；在验证成功前，不要关闭
当前恢复通道，也不要删除已有登录方式。

```bash
ssh -o BatchMode=yes -o ConnectTimeout=10 USER@HOST whoami
```

## WinGet

先检查 WinGet 和 source：

```powershell
winget --version
winget source update --disable-interactivity
```

常用开发工具：

```powershell
$packages = @(
  'Zellij.Zellij'
  'Git.Git'
  'bufbuild.buf'
  'SQLite.SQLite'
  'Tencent.WeCom'
  'Tencent.QQ.NT'
  'Clement.bottom'
  'Casey.Just'
  'Python.Python.3.13'
  'astral-sh.uv'
  'OpenJS.NodeJS.LTS'
  'GoLang.Go'
  'Microsoft.DotNet.SDK.10'
)

foreach ($id in $packages) {
  winget install `
    --id $id `
    --exact `
    --source winget `
    --accept-source-agreements `
    --accept-package-agreements `
    --disable-interactivity

  if ($LASTEXITCODE -ne 0) {
    throw "WinGet installation failed: $id"
  }
}
```

Warp、PowerShell 和 Chrome 应明确使用 machine scope。PowerShell 还应限定 WIX，避免
非交互 SSH session 选择 MSIX/AppX 后卡在 `StagePackageAsync`：

```powershell
winget install --id Warp.Warp -e --scope machine --source winget `
  --accept-source-agreements --accept-package-agreements --disable-interactivity

winget install --id Microsoft.PowerShell -e --scope machine `
  --installer-type wix --source winget `
  --accept-source-agreements --accept-package-agreements --disable-interactivity

winget install --id Google.Chrome -e --scope machine --source winget `
  --accept-source-agreements --accept-package-agreements --disable-interactivity
```

验证 scope 时也要传入 `--scope machine`；否则同名 user-scope package 可能造成误判：

```powershell
winget list --id Warp.Warp -e --scope machine
winget list --id Microsoft.PowerShell -e --scope machine
winget list --id Google.Chrome -e --scope machine
```

升级所有 WinGet packages：

```powershell
winget upgrade --all `
  --accept-source-agreements `
  --accept-package-agreements `
  --disable-interactivity
```

## PATH

WinGet CLI shim 通常位于 `%LOCALAPPDATA%\Microsoft\WinGet\Links`。通过 SSH 登录时，
新安装 package 的 PATH 不一定立刻出现在当前进程中。

```powershell
$paths = @(
  "$env:LOCALAPPDATA\Microsoft\WinGet\Links"
  "$env:USERPROFILE\go\bin"
  'C:\Program Files\Git\bin'
)

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$entries = @($userPath -split ';' | Where-Object { $_ })
foreach ($path in $paths) {
  if ($entries -notcontains $path) { $entries += $path }
}
[Environment]::SetEnvironmentVariable('Path', ($entries -join ';'), 'User')
```

修改 PATH 后应打开新的 SSH session。不要只修改当前 `$env:PATH` 后就宣称配置完成。

## Pi Coding Agent

Pi 在 Windows 上需要 Node.js 和 Git for Windows 提供的 Bash：

```powershell
Test-Path 'C:\Program Files\Git\bin\bash.exe'
node --version
npm --version

npm.cmd install -g --ignore-scripts '@earendil-works/pi-coding-agent'
pi --version
```

如果 npm global prefix 不在 PATH：

```powershell
$npmPrefix = (npm.cmd prefix -g).Trim()
$npmPrefix
```

将该目录加入 user PATH 后，重新建立 SSH session。

## 重启与状态栅栏

需要重启的自动化流程应先写入状态文件，例如：

```powershell
$stateDirectory = 'C:\ProgramData\WindowsDevSetup\state'
New-Item -ItemType Directory -Path $stateDirectory -Force | Out-Null

@{
  configuredAt = (Get-Date).ToUniversalTime().ToString('o')
  restartRequired = $true
  computerName = $ComputerName
} | ConvertTo-Json | Set-Content `
  -LiteralPath (Join-Path $stateDirectory 'dev-environment.json') `
  -Encoding UTF8

Restart-Computer -Force
```

重启后的 verifier 应 fail closed：

- state 文件缺失时失败
- hostname 不匹配时失败
- `LastBootUpTime` 不晚于 `configuredAt` 时失败
- package、scope、PATH 或工具版本不匹配时失败
- 验证通过后才将 `restartRequired` 更新为 `false`

## 验证

```powershell
$ErrorActionPreference = 'Stop'

$expectedTools = @(
  'git.exe'
  'node.exe'
  'npm.cmd'
  'go.exe'
  'dotnet.exe'
  'buf.exe'
  'sqlite3.exe'
  'just.exe'
  'zellij.exe'
  'pwsh.exe'
  'pi.cmd'
)

foreach ($tool in $expectedTools) {
  if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
    throw "Required tool is missing from PATH: $tool"
  }
}

Get-Service sshd
Get-NetTCPConnection -State Listen -LocalPort 22
git --version
node --version
go version
dotnet --version
buf --version
sqlite3 --version
just --version
zellij --version
pwsh --version
pi --version
```

项目需要固定版本时，以项目内 `global.json`、`package.json#engines`、lockfile 和 verifier
为准，不以“命令可运行”代替版本验证。

## Source Sync

如果 Windows Guest 无法访问原 Git 域名，改用已通过组织网络与 host-key fingerprint
核验的代码托管域名。Guest 应使用独立 SSH key，不要复制其他开发机的 private key。

```powershell
$sshDirectory = Join-Path $env:USERPROFILE '.ssh'
New-Item -ItemType Directory -Path $sshDirectory -Force | Out-Null

$keyPath = Join-Path $sshDirectory 'id_ed25519_code_host'
if (-not (Test-Path -LiteralPath $keyPath)) {
  ssh-keygen.exe `
    -t ed25519 `
    -a 100 `
    -C "windows-dev@$env:COMPUTERNAME" `
    -f $keyPath
}

# 只复制这一行 public key 到代码托管平台的 SSH Keys
Get-Content -LiteralPath "${keyPath}.pub"
```

在代码托管平台为对应账号注册 public key 后，配置
`$env:USERPROFILE\.ssh\config`：

```sshconfig
Host <git-host>
  User git
  IdentityFile ~/.ssh/id_ed25519_code_host
  IdentitiesOnly yes
```

先通过独立可信渠道核对服务器 SSH host-key fingerprint，再写入 `known_hosts`。不要在
未核对 fingerprint 时使用自动接受所有 host key 的选项。

```powershell
ssh.exe -T git@<git-host>
```

至少一个域名认证成功后再切换 remote：

```powershell
git remote -v
git remote set-url origin 'git@<git-host>:<owner>/<repo>.git'
git fetch --prune origin
```

如果域名、路由或代码托管授权仍不可用，再使用 Git bundle 作为离线兜底，同时保留真实
commit 和 provenance：

```bash
# source machine
git bundle create project.bundle HEAD
```

```powershell
# Windows
git clone C:\staging\project.bundle C:\work\project
```

本地还有未提交源码时，在 clone 后单独覆盖 source overlay。不要复制：

- `.git/`
- `node_modules/`
- `bin/`、`obj/`、`dist/`、`build/`、`artifacts/`
- `.env*`、private keys、certificates、tokens
- screenshots、logs、cache 和 agent runtime session

复制后运行 `git status --short`，并通过项目自己的 build/test/provenance verifier 验证。

## 手动下载

- WeChat 4.x
  - https://dldir1v6.qq.com/weixin/Universal/Windows/WeChatWin_4.1.12.exe
- Chrome standalone installer
  - https://www.google.com/intl/en/chrome/?standalone=1

# FAQ

## SSH 中找不到刚安装的命令

重新打开 SSH session，并检查：

```powershell
[Environment]::GetEnvironmentVariable('Path', 'User')
[Environment]::GetEnvironmentVariable('Path', 'Machine')
$env:PATH
```

WinGet package 可能只创建了 `%LOCALAPPDATA%\Microsoft\WinGet\Links` 中的 shim；该目录
需要存在于 user PATH。

## PowerShell 安装一直停在 AppX staging

非交互 SSH 环境可能选择 scope-agnostic MSIX bundle。使用：

```powershell
winget install --id Microsoft.PowerShell -e `
  --scope machine --installer-type wix --source winget
```

不要只依赖 `--scope machine`。

## Public key 已写入但管理员无法登录

检查：

- 文件是否为 `C:\ProgramData\ssh\administrators_authorized_keys`
- ACL 是否只授予 Administrators SID 和 SYSTEM SID
- `sshd` 是否 Running
- TCP 22 是否监听
- 防火墙 rule 是否 Enabled
- 修改后是否执行了 `Restart-Service sshd`

## 自动化应该何时算完成

不是安装命令返回成功时，而是重启后从新的 SSH session 完成以下验证时：

- key authentication 成功
- hostname 和 locale 正确
- machine-scope packages 可查询
- 所有工具在新 PATH 中可执行
- 精确版本符合项目要求
- setup state 已清除 `restartRequired`
