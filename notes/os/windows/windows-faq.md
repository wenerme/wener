---
title: Windows FAQ
tags:
  - FAQ
---

# Windows FAQ

```shell
eventvwr             # 事件查看器
taskmgr              # 任务管理器
cmd                  # 命令行
control firewall.cpl # 控制面板 -> 防火墙
winver               # 版本
msconfig             # 系统配置

wf.msc       # 高级防火墙
services.msc # 服务

shutdown /r /t 0 # 重启
shutdown /s /t 0 # 关机

# start a cmd as administrator
runas /user:Administrator "cmd.exe"

# PS
Start-Process cmd -Verb RunAs
```

- gsudo
- mmc - Microsoft Management Console
- .msc - Microsoft Common Console

## Windows 11 无账号安装 {#bypass-nro}

> Windows 无账号进入系统
> Windows login without account

Windows 10/11 家庭版

1. 国家页面 `Shift-F11`
2. 输入 `oobe\BypassNRO`

**也可以**

```batch
reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\OOBE /v BypassNRO /t REG_DWORD /d 1 /f
shutdown /r /t 0
```

3. 重启后断网安装

## Ports

| service  | port | protocol |
| -------- | ---- | -------- |
| Kerboros | 88   | TCP,UDP  |
| LDAP     | 389  | UDP      |
| LDAP     | 636  | TCP      |
| LDAP     | 3268 | TCP      |

## Windows 11 此应用无法在你电脑上运行

> This app can't run on your PC

```batch
# 修复系统映像
dism /online /cleanup-image /restorehealth
# 修复系统文件
sfc /scannow
```

- C:\Windows\WinSxS
- /online 使用 Windows Update

## tuntap

- openvpn 提供 tuntap 设备
  - https://build.openvpn.net/downloads/releases/
  - Windows 10 x64 可能需要 [修改注册表](https://github.com/slackhq/nebula/issues/9#issuecomment-761974328)
- 可以使用 [WireGuard/wintun](https://github.com/WireGuard/wintun)
  - GPL, wintun.h 可以是 MIT
- 参考
  - [#289](https://github.com/slackhq/nebula/pull/289) nebula 支持 wintun

## AD vs LDAP

- LDAP
  - 是一个标准协议
  - 基于目录的方式访问存储的数据
  - 本质后端是一个数据库
  - LDAP 是与数据库的通信协议
- AD
  - 是一个私有软件应用
  - 是一个数据库，提高了认证，目录，策略等
  - 支持 LDAP 的方式进行交互

## DC vs. AD - Domain Controllers vs. Active Directory

- DC 提供 AD 服务

## Extending Shortcut Menus

https://docs.microsoft.com/en-us/windows/win32/shell/context

## 无 Internet 访问

- win10 后大量出现
- NCSI - Network Connectivity Status Indicator
  - active probing
    - dns probe
    - http probe
  - passive probing
    - 请求的包的 TTL - 8 hops 认为连通 - MinimumInternetHopCount

---

- 使用 \HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet 配置的值检测
- 网络状态 \HKLM\Software\Policies\Microsoft\Windows\NetworkConnectivityStatusIndicator
  - NoActiveProvbe = 0
  - DisablePassivePolling = 1

```bash
# 测试 DNSProbe - 这个目前没问题
nslookup dns.msftncsi.com
```

```cmd
Get-NetConnectionProfile
```

- 修改 EnableActiveProbing 为 1

**异常值**

| key          | value                    |
| ------------ | ------------------------ |
| ProbeContent | Microsoft Connect Test   |
| ProbeHost    | www.msftconnecttest.com  |
| ProbeHostV6  | ipv6.msftconnecttest.com |
| ProbePath    | connecttest.txt          |

```bash
curl www.msftconnecttest.com/connecttest.txt
```

**修改为**

| key          | value             |
| ------------ | ----------------- |
| ProbeContent | Microsoft NCSI    |
| ProbeHost    | www.msftncsi.com  |
| ProbeHostV6  | ipv6.msftncsi.com |
| ProbePath    | ncsi.txt          |

```bash
# 确认能通
curl www.msftncsi.com/ncsi.txt
```

### 重置

尝试 `netsh winsock reset`

### 工具

- [crazy-max/WindowsSpyBlocker](https://github.com/crazy-max/WindowsSpyBlocker)

## Workgroups vs. Domains

- workgroup
  - 未加入 domain 的都属于一个 workgroup
  - 本地局域网的一组电脑 - 没有控制关系
  - 用于 文件 和 打印机 共享
  - 默认 WORKGROUP
  - 现在不需要关心
- doamin
  - 域用于控制大量的电脑
  - 某种层面隐含财产所属关系
  - 类似 MDM

## Windows 10 MDM vs Group Policy

- Group Policy
  - 传统
  - 只能控制加入域的节点
  - 要求 Active Directory 环境
  - 提供更多配置
- MDM
  - Cloud first
  - MDM-enrolled 机器
  - 类似云环境 Microsoft Azure
  - 可以加入也可以不加入域控 - Active Directory vs Azure Active Directory
  - Intune GUI 功能薄弱 - 需要自定义 Profile

## Windows I/O 慢

- https://github.com/Microsoft/WSL/issues/873#issuecomment-425272829
  - 设计层面

## runas admin

```bash
# 启动 管理员权限运行的 cmd
powershell -Command "Start-Process cmd -Verb RunAs"
```

```batch
runas /savecred /user:Administrator "cmd.exe /C %CD%\installer.cmd %CD%"
```

**可能需要激活账号**

```batch
net user Administrator /active:yes
```

## MinGW vs Cygwin vs MSYS2

- MinGW
  - GCC port 到 windows
  - 直接构建 Win32 应用
- Cygwin
  - POSIX 环境
  - 中间层
  - 编译后的程序需要 cygwin1.dll
  - 整个环境 - cyglsa, cygserver, cygstart
    - 包含了服务管理，进程管理，路径转换等
- MSYS2
  - MinGW-w64+Cygwin
    - 去掉了 Cygwin 的服务管理
  - 强调构建 Native Windows 程序 - 不依赖 cygwin1.dll
  - 提供多种 runtime
  - msys2 有 msys-2.0.dll，作用类似于 cygwin1.dll
    - 提供 POSIX 环境
    - https://www.msys2.org/wiki/How-does-MSYS2-differ-from-Cygwin/
