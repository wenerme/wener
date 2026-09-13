---
title: Windows Debloat
tags:
  - Windows
  - Setup
  - Privacy
  - PowerShell
---

# Windows Debloat

- 减少广告、推荐内容、后台自启动，移除不需要的预装应用
- 保留 Defender、Windows Update、Store、App Installer、WebView2 和运行库
- 优先使用系统设置；批量调整再使用 PowerShell 或 Debloat 工具
- 相关：[Windows Setup](./windows-setup.md)、[WinGet](./winget.md)

## 工具

| 工具                                                                 | 用途                                           |
| -------------------------------------------------------------------- | ---------------------------------------------- |
| [Raphire/Win11Debloat](https://github.com/Raphire/Win11Debloat)      | 移除预装应用，调整搜索、任务栏、广告与隐私设置 |
| [ChrisTitusTech/winutil](https://github.com/ChrisTitusTech/winutil)  | 软件安装、系统配置与维护                       |
| [Sophia Script](https://github.com/farag2/Sophia-Script-for-Windows) | 按功能选择的 PowerShell 系统调整脚本           |

下载后按需选择功能，不必应用全部 tweaks。批量修改前备份相关设置；不建议直接运行
`irm ... | iex` 或用关闭安全防护换取性能。

## 常用调整

| 分类       | 可做的事情                                                 |
| ---------- | ---------------------------------------------------------- |
| 任务栏     | 隐藏搜索框、天气/小组件、不使用的聊天和 Copilot 入口       |
| 搜索       | 关闭 Bing 网页建议、搜索热点，保留本地应用和文件搜索       |
| 开始菜单   | 关闭应用推荐、账户通知；按需关闭最近文件                   |
| 广告与提示 | 关闭广告 ID、个性化推荐、锁屏提示、“完成设备设置”提醒      |
| 预装应用   | 移除新闻、天气、Clipchamp、Office 推广、纸牌等不需要的应用 |
| 自启动     | 在任务管理器中关闭不需要的启动应用，保留安全通知和驱动组件 |
| 后台       | 关闭 Edge 启动增强与后台运行、Game DVR 后台录制            |
| 更新       | 按需关闭传递优化的 P2P 分享，不禁用 Windows Update         |
| 资源管理器 | 显示文件扩展名、默认打开“此电脑”、关闭推荐和同步提供商通知 |
| 外观       | 按需关闭透明效果和动画                                     |

不需要为 Debloat 禁用 Windows Search、删除 WebView2、清空所有自启动，或调整
TCP、页面文件、内存压缩等系统参数。OneDrive、Xbox、Outlook 是否移除取决于实际用途。

## 搜索与小组件

在目标用户的 PowerShell 中调整；写入 `HKLM` 需要管理员权限。

```powershell
function Set-Dword([string]$Path, [string]$Name, [int]$Value) {
  if (-not (Test-Path -LiteralPath $Path)) { New-Item -Path $Path -Force | Out-Null }
  New-ItemProperty -Path $Path -Name $Name -PropertyType DWord -Value $Value -Force | Out-Null
}

# 隐藏任务栏搜索框
Set-Dword 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Search' 'SearchboxTaskbarMode' 0

# 关闭 Bing 建议和搜索热点
Set-Dword 'HKCU:\Software\Policies\Microsoft\Windows\Explorer' 'DisableSearchBoxSuggestions' 1
Set-Dword 'HKCU:\Software\Microsoft\Windows\CurrentVersion\SearchSettings' 'IsDynamicSearchBoxEnabled' 0
Set-Dword 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Windows Search' 'EnableDynamicContentInWSB' 0

# 关闭天气/小组件
Set-Dword 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced' 'TaskbarDa' 0
Set-Dword 'HKLM:\SOFTWARE\Policies\Microsoft\Dsh' 'AllowNewsAndInterests' 0
```

- 部分设置需要注销后生效，策略支持情况随 Windows 版本和 Home/Pro/Enterprise 而异
- 隐藏入口不等于删除组件；旧 Copilot 任务栏策略不一定控制新版独立 App
- 注册表键仅在不存在时创建，不对已有键执行 `New-Item -Force`，避免覆盖其他值
- 修改前保留原值；恢复时区分“原值为 0”和“原来不存在”

## 预装应用

| 类型               | 查看                                 | 移除影响                                       |
| ------------------ | ------------------------------------ | ---------------------------------------------- |
| 当前用户已安装应用 | `Get-AppxPackage`                    | 卸载当前用户应用，可能删除应用本地数据         |
| 系统预配应用       | `Get-AppxProvisionedPackage -Online` | 防止新用户自动安装，不卸载其他用户已注册的应用 |

```powershell
Get-AppxPackage | Select-Object Name, PackageFullName
Get-AppxProvisionedPackage -Online | Select-Object DisplayName, PackageName
```

候选名单，按用途删减：

```powershell
$remove = @(
  'Clipchamp.Clipchamp',
  'Microsoft.BingNews', 'Microsoft.BingWeather',
  'Microsoft.GetHelp', 'Microsoft.Getstarted',
  'Microsoft.MicrosoftOfficeHub', 'Microsoft.MicrosoftPCManager',
  'Microsoft.MicrosoftSolitaireCollection', 'Microsoft.WindowsFeedbackHub',
  'Microsoft.GamingApp', 'Microsoft.YourPhone', 'Microsoft.OutlookForWindows'
)

# 预览匹配的预配应用
$packages = Get-AppxProvisionedPackage -Online |
  Where-Object DisplayName -in $remove
$packages | Select-Object DisplayName, PackageName

# 确认名单后移除预配
$packages | ForEach-Object {
  Remove-AppxProvisionedPackage -Online -PackageName $_.PackageName
}
```

当前用户已安装的应用单独卸载，先确认不需要其本地数据：

```powershell
Get-AppxPackage -Name 'Microsoft.BingNews' | Remove-AppxPackage
```

不要按 `*Microsoft*` 批量删除。保留 Store、App Installer、VC++、Windows App Runtime、
安全中心、驱动、媒体扩展，以及需要的记事本、计算器、截图、照片等工具。
已卸载应用通常可从 Store 重新安装，但不等于恢复应用数据或系统预配状态。

## Chrome 默认浏览器

```powershell
winget install --id Google.Chrome --exact --source winget
Start-Process 'ms-settings:defaultapps'
```

在「设置 → 应用 → 默认应用 → Google Chrome」点击「设为默认值」。
不要直接修改 `UserChoice`；批量部署使用默认应用关联 XML，参见
[导出与导入默认应用关联](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/export-or-import-default-application-associations)。
DISM 导入不保证覆盖已有用户的默认选择。

## 参考

- [Win11Debloat: 恢复修改](https://github.com/Raphire/Win11Debloat/wiki/Reverting-Changes)
- [Microsoft: Search Policy CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search)
- [Microsoft: ApplicationDefaults Policy CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-applicationdefaults)
