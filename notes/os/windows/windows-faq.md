---
id: windows-faq
title: Windows FAQ
---

# Windows FAQ

## Ports

| service  | port | protocol |
| -------- | ---- | -------- |
| Kerboros | 88   | TCP,UDP  |
| LDAP     | 389  | UDP      |
| LDAP     | 636  | TCP      |
| LDAP     | 3268 | TCP      |

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

