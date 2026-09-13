---
title: Nebula on Windows
tags:
  - Nebula
  - Windows
  - VPN
  - OpenSSH
  - RDP
---

# Nebula on Windows

- 相关笔记：[Nebula](./README.md)、[Windows Setup](../../../../os/windows/windows-setup.md)
- 官方参考
  - [Quick start](https://nebula.defined.net/docs/guides/quick-start/)
  - [Releases](https://github.com/slackhq/nebula/releases)
  - [v1.11.1 示例配置](https://github.com/slackhq/nebula/blob/v1.11.1/examples/config.yml)
  - [Windows service 实现](https://github.com/slackhq/nebula/blob/v1.11.1/cmd/nebula-service/service.go)
  - [Windows TUN 实现](https://github.com/slackhq/nebula/blob/v1.11.1/overlay/tun_windows.go)
  - [Firewall](https://nebula.defined.net/docs/config/firewall/)、[PKI](https://nebula.defined.net/docs/config/pki/)、[Relay](https://nebula.defined.net/docs/config/relay/)

## 安装流程

1. 确认 Windows 架构、管理员权限，以及一个不依赖新 VPN 的维护入口。
2. 下载官方 Windows Release，核对 SHA-256，完整解压程序与 Wintun。
3. 为 Windows 节点签发独立证书，部署配置和节点私钥，收紧 NTFS ACL。
4. 执行 `nebula -test`，通过后使用 `-service install` 注册服务。
5. 验证服务、虚拟网卡、路由、双向 ping、SSH/RDP 端口和实际账号认证。
6. 调整权限后，从允许和不允许的来源分别验证；证书降权还要考虑旧证书撤销。

服务注册、TUN 创建和防火墙操作都使用**管理员 PowerShell**。已有安装先检查配置与运行态，不直接覆盖、删除服务或重复启动第二个 Nebula 进程。


| 节点       | Overlay IP     | Underlay 地址      | 角色 / 证书 groups |
| ---------- | -------------- | ------------------ | ------------------ |
| lh-1       | 192.168.100.1  | 198.51.100.10:4242 | lighthouse         |
| lh-2       | 192.168.100.2  | 203.0.113.20:4242  | lighthouse + relay |
| ops-laptop | 192.168.100.10 | 动态地址           | op, admin          |
| win-node   | 192.168.100.20 | 动态地址           | workstation, ssh   |

Lighthouse 用于发现节点，不必同时作为 relay；能通过 relay 连通也不代表已建立直连。

### 下载与目录


```powershell
$ErrorActionPreference = 'Stop'
$Version = '1.11.1'
$InstallDir = 'C:\Program Files\Nebula'
$ConfigDir = 'C:\ProgramData\Nebula'
$Nebula = Join-Path $InstallDir 'nebula.exe'
$CertTool = Join-Path $InstallDir 'nebula-cert.exe'

$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw 'Administrator privileges required'
}
if (Test-Path $InstallDir) { throw 'Existing installation: inspect before upgrading' }

$release = Invoke-RestMethod "https://api.github.com/repos/slackhq/nebula/releases/tags/v$Version"
$assets = @($release.assets | Where-Object name -eq 'nebula-windows-amd64.zip')
if ($assets.Count -ne 1) { throw 'Expected one Windows amd64 asset' }
$asset = $assets[0]
if ($asset.digest -notmatch '^sha256:[a-fA-F0-9]{64}$') {
  throw 'No SHA256 digest: obtain the official checksum before continuing'
}
$archive = Join-Path $env:TEMP ('nebula-' + [guid]::NewGuid() + '.zip')

try {
  curl.exe --fail --location --connect-timeout 15 --max-time 300 `
    --retry 2 --retry-all-errors --output $archive $asset.browser_download_url
  if ($LASTEXITCODE -ne 0) { throw 'Download failed' }
  $expected = $asset.digest.Substring(7)
  if ((Get-FileHash $archive -Algorithm SHA256).Hash -ine $expected) {
    throw 'SHA256 mismatch'
  }
  Expand-Archive -LiteralPath $archive -DestinationPath $InstallDir
} finally {
  if (Test-Path $archive) { Remove-Item -LiteralPath $archive }
}

New-Item -ItemType Directory -Path $ConfigDir -Force | Out-Null
if (-not (Test-Path "$InstallDir\dist\windows\wintun\bin\amd64\wintun.dll")) {
  throw 'Wintun DLL missing'
}
& $Nebula -version
if ($LASTEXITCODE -ne 0) { throw 'Nebula executable failed' }
```

需要代理时，分别为 `Invoke-RestMethod` 指定 `-Proxy`、为 `curl.exe` 指定 `--proxy`。跨 SSH 使用反向转发时，只绑定远端 loopback，并在下载结束后关闭转发；不要为了下载持久修改系统代理。

下载失败要区分 HTTP 错误、连接超时、文件传输中断和下载时限不足。**部分 ZIP 不能继续解压安装**；重试、ZIP 结构检查和 SHA-256 校验是不同层次的检查。

```text
C:\Program Files\Nebula\
  nebula.exe
  nebula-cert.exe
  dist\windows\wintun\bin\amd64\wintun.dll
  ...其余 Release 文件

C:\ProgramData\Nebula\
  config.yml
  ca.crt
  host.crt
  host.key
```

v1.11.1 会相对可执行文件查找 `dist/windows/wintun/bin/<arch>/wintun.dll`。只把 DLL 放到 `nebula.exe` 旁边不够，应保留 ZIP 目录结构；ARM64 等架构不能直接套用 amd64 路径。

### 节点证书与私钥

- 节点名称、Overlay IP 和 groups 写在证书中，不是 Windows 主机名或登录账户的自动映射。
- 每台机器使用独立节点证书和私钥，不复用另一台 Windows 机器的身份。
- CA 私钥只留在受控签发端，目标机器只部署 `ca.crt`、本节点证书和本节点私钥。
- 存在旧版节点时检查证书兼容性，例如 Nebula 1.9.x 不识别 v2 证书。以下显式签发 v1，使用既有兼容 CA，不重新创建 CA。

在受控签发端执行；输入、输出目录均需权限保护，已有同名文件先检查，不能覆盖其他节点材料：

```bash
umask 077
nebula-cert sign \
  -version 1 \
  -ca-crt ca.crt -ca-key ca.key \
  -name win-node -networks 192.168.100.20/24 \
  -groups workstation,ssh -duration 8760h \
  -out-crt win-node.crt -out-key win-node.key

nebula-cert verify -ca ca.crt -crt win-node.crt
nebula-cert print -path win-node.crt
```

先收紧 Windows 配置目录权限，再传输节点材料。下面是**新建、由 LocalSystem 服务独占使用的目录**示例，不直接套用到需要保留其他 ACL 的现有安装：

```powershell
icacls.exe $ConfigDir /inheritance:r /grant:r `
  '*S-1-5-18:(OI)(CI)(F)' '*S-1-5-32-544:(OI)(CI)(F)'
if ($LASTEXITCODE -ne 0) { throw 'Configuration directory ACL failed' }
```

已有可达 SSH 别名时，从签发端上传，显式指定目标文件名：

```bash
scp ca.crt win-node:C:/ProgramData/Nebula/ca.crt
scp win-node.crt win-node:C:/ProgramData/Nebula/host.crt
scp win-node.key win-node:C:/ProgramData/Nebula/host.key
```

`scp win-node.crt win-node.key win-node:.../` 会保留源文件名，**不会自动改名为 `host.crt` / `host.key`**。

```powershell
icacls.exe "$ConfigDir\host.key" /inheritance:r /grant:r `
  '*S-1-5-18:(F)' '*S-1-5-32-544:(F)'
if ($LASTEXITCODE -ne 0) { throw 'Private key ACL failed' }
icacls.exe "$ConfigDir\host.key"
```

SID `S-1-5-18` 是 SYSTEM，`S-1-5-32-544` 是 Administrators，可避免本地化组名问题。`/inheritance:r` 删除继承条目，不会删除其他账户的显式授权；已有文件仍需逐项审阅。采用非 LocalSystem 服务账户时，应精确授予该账户读取私钥的权限。

## Windows 节点配置

将下面内容保存到 `C:\ProgramData\Nebula\config.yml`。示例使用已启用 relay 的 `lh-2`；没有 relay 时删除 `relay.relays`，不要把未开启 relay 的 lighthouse 填进去。

```yaml
pki:
  ca: C:/ProgramData/Nebula/ca.crt
  cert: C:/ProgramData/Nebula/host.crt
  key: C:/ProgramData/Nebula/host.key
  disconnect_invalid: true

static_host_map:
  '192.168.100.1': ['198.51.100.10:4242']
  '192.168.100.2': ['203.0.113.20:4242']

lighthouse:
  am_lighthouse: false
  interval: 60
  hosts:
    - '192.168.100.1'
    - '192.168.100.2'

listen:
  host: '0.0.0.0'
  port: 4242
  windows_bypass_wdf: true

punchy:
  punch: true
  respond: true
  respond_delay: 5s

relay:
  am_relay: false
  use_relays: true
  relays:
    - '192.168.100.2'

tun:
  disabled: false
  dev: nebula1
  mtu: 1300
  network_category: private
  windows_bypass_wdf: true

logging:
  level: info
  format: json

firewall:
  outbound_action: drop
  inbound_action: drop
  outbound:
    - port: any
      proto: any
      host: any
  inbound:
    - port: any
      proto: any
      group: op
    - port: any
      proto: icmp
      host: any
    - port: 22
      proto: tcp
      group: admin
```

- YAML 中的 Windows 路径使用 `/`，避免双引号内反斜杠被当作转义字符。
- `static_host_map` 的 key 和 `lighthouse.hosts` 使用 Overlay IP，映射值是可路由的 Underlay 地址与 UDP 端口。
- `tun.dev` 在 Windows 可以指定名称；不要把 macOS 的 `utunN` 约束误套到 Windows。
- `tun.disabled: true` 不会提供普通节点需要的 TUN/IP 访问能力，不是修复驱动失败的方法。
- 普通漫游节点也可用 `listen.port: 0`，由系统分配 UDP 端口；固定端口便于排障与配置外层防火墙。

### 三个权限层次

| 层次                 | 决定什么                                 | 不决定什么                 |
| -------------------- | ---------------------------------------- | -------------------------- |
| Nebula 身份与 ACL    | 哪些设备证书可访问哪些 Overlay 端口      | Windows 用户是否可以登录   |
| Windows 网络与防火墙 | 服务监听地址、网卡 profile、系统过滤规则 | Nebula 证书 groups         |
| SSH / RDP 认证       | 目标账户、公钥、密码、NLA、登录权限      | 是否允许该端口通过 Overlay |

Windows v1.11.1 的两个 bypass 选项不能混为一谈：

| 字段                        | 作用域                   | v1.11.1 行为                                      |
| --------------------------- | ------------------------ | ------------------------------------------------- |
| `listen.windows_bypass_wdf` | Nebula 外层 UDP listener | 默认 true，安装对应 UDP 端口的 WFP PERMIT filter  |
| `tun.windows_bypass_wdf`    | Nebula 虚拟网卡          | 默认 true，按 adapter LUID 安装 WFP PERMIT filter |
| `tun.network_category`      | Windows network category | 默认 private；profile 分类本身不等于端口放行      |

这两个 WFP filter 可绕过相应范围的 Windows Defender Firewall 入站规则，**不等于关闭整个系统防火墙，也不绕过 Nebula ACL**。示例依赖 Nebula 的设备级 ACL 控制 Overlay 入站；若希望 Windows Defender Firewall 再做一层过滤，应显式关闭对应 bypass 并配置受限 allow rule。两个 bypass 和 network category 在该版本不可热重载，需要重启生效。

例如关闭 bypass 后，按需添加以下规则，而不是对所有接口开放所有端口：

```powershell
New-NetFirewallRule -Name 'Nebula-UDP' -DisplayName 'Nebula UDP' `
  -Direction Inbound -Action Allow -Protocol UDP -LocalPort 4242 `
  -Program $Nebula -Profile Any

New-NetFirewallRule -Name 'Nebula-RDP-Operators' -DisplayName 'Nebula RDP from operators' `
  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3389 `
  -InterfaceAlias nebula1 -RemoteAddress 192.168.100.10 -Profile Any
```

执行前检查同名及现有规则，按实际 operator IP 列表调整。Windows 防火墙不识别 Nebula 的 `op` group；IP 规则不能代替证书身份规则。RDP 可选的 UDP/3389 也需要按使用需求单独允许，TCP/3389 是基本连接检查。

### Operator 是设备，不是人

`group: op` 是运维约定，并非 Nebula 内置角色，也不会对应到 Windows 的 Administrators、某个用户或 SSH 用户名。

- 赋予某台机器 `op` 后，该机器上能使用此网络的程序和用户共享这个设备身份。
- 被管理的 Windows 工作站不需要加入 `op`，才能接受 op 设备连接。上例工作站只带 `workstation,ssh`。
- `outbound: any` 仅表示允许发起流量，不能越过目标节点的 inbound ACL。
- 上例允许任意 op 设备访问本节点全部端口；只带 `admin` 而不带 `op` 的来源仍仅获 TCP/22 权限。
- `groups: [op, admin]` 是 AND，不是 OR。多个独立 allow rule 才能表达任一组可通过。
- 若只希望运维端连接 SSH/RDP，应分别允许 TCP/22、TCP/3389，而不是授予 `port: any`。

## 注册 Windows 服务

```powershell
$Config = Join-Path $ConfigDir 'config.yml'
& $Nebula -config $Config -test
if ($LASTEXITCODE -ne 0) { throw 'Nebula configuration validation failed' }

if (Get-Service Nebula -ErrorAction SilentlyContinue) {
  throw 'Existing service: inspect its configuration before replacing'
}
& $Nebula -config $Config -service install
if ($LASTEXITCODE -ne 0) { throw 'Nebula service installation failed' }
Set-Service Nebula -StartupType Automatic
Start-Service Nebula
Start-Sleep -Seconds 3

Get-Service Nebula
sc.exe qc Nebula
```

预期服务命令类似：

```text
"C:\Program Files\Nebula\nebula.exe" -service run -config C:\ProgramData\Nebula\config.yml
```

`-service install` 负责注册，`-service run` 才是 SCM 启动时的运行模式。不能直接将普通前台命令 `nebula.exe -config ...` 当作服务命令。可执行文件路径包含空格，必须正确引用；PowerShell 中显式使用 `sc.exe`，避免与别名混淆。

`-test` 失败就停止后续操作。Windows PowerShell 5.1 的 `$ErrorActionPreference = 'Stop'` **不会自动把 native exe 非零退出码转为异常**，需要检查 `$LASTEXITCODE`。

### 修复错误注册的服务

仅适用于已确认的错误注册或计划内重装，执行前保留配置、证书和维护入口：

```powershell
$service = Get-Service Nebula -ErrorAction SilentlyContinue
if ($service -and $service.Status -ne 'Stopped') { Stop-Service Nebula }

& $Nebula -config $Config -service uninstall
$uninstallCode = $LASTEXITCODE
$service = Get-Service Nebula -ErrorAction SilentlyContinue
if ($service) { throw "Service still exists after uninstall; exit=$uninstallCode" }
if ($uninstallCode -ne 0) {
  throw 'Service removed but cleanup failed; inspect Event Log source before reinstalling'
}

& $Nebula -config $Config -service install
if ($LASTEXITCODE -ne 0) { throw 'Service installation failed' }
Set-Service Nebula -StartupType Automatic
Start-Service Nebula
```

曾用 `sc.exe create` 手动注册的服务，可能没有 Nebula 对应的 Event Log source。原生 uninstall 会出现 `RemoveEventLogSource() failed`，但 SCM 服务可能已经删除。应重新查询 `Get-Service`、`sc.exe query Nebula`，确认真实状态后再安装；不能仅凭一次退出码推断“完全没发生”或忽略所有错误继续。

## 验证与使用

### 服务、网卡与路由

```powershell
Get-Service Nebula
Get-NetAdapter -Name nebula1
Get-NetIPAddress -InterfaceAlias nebula1 -AddressFamily IPv4
Get-NetRoute -InterfaceAlias nebula1 -AddressFamily IPv4
Get-NetUDPEndpoint -LocalPort 4242
Get-CimInstance Win32_Service -Filter "Name='Nebula'" |
  Select-Object Name, State, StartMode, StartName, PathName

ping.exe -n 3 192.168.100.1
ping.exe -n 3 192.168.100.10
```

配置 `-test` 通过不证明 Wintun 已创建、服务能启动或网络可达；`Running` 也不证明业务端口可访问。必须从另一台节点反向测试。

```bash
# 在 operator 节点执行；macOS nc 使用 -G 设置连接超时
ping -c 3 192.168.100.20
nc -vz -G 5 192.168.100.20 22
nc -vz -G 5 192.168.100.20 3389
```

在另一台 Windows operator 上可以用 `Test-NetConnection 192.168.100.20 -Port 3389`。修改 ACL 后，还应从不带 op 的设备做反向对照；必要时检查目标 ACL、源 outbound 和系统防火墙，不能仅凭一次超时断定拦截发生在哪一层。

节点重启或重签证书后，首个探测可能因隧道重建超时。等待并进行有限重试，结合对端证书、服务状态和后续探测判断，不要立刻扩大全网 ACL。

### SSH 与 RDP

客户端 SSH config 示例：

```sshconfig
Host win-node
  HostName 192.168.100.20
  User OperatorUser
  Port 22
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

`ssh win-node hostname` 返回预期机器名才算完成 SSH 登录验证。切换 LAN / Overlay 地址时，先通过已信任路径核对 SSH host key；不能为解决地址变化而禁用主机密钥验证。Nebula 节点私钥不是 OpenSSH 登录密钥，两者不能互换。

RDP 不通时，在目标 Windows 检查：

```powershell
Get-Service TermService
Get-NetTCPConnection -LocalPort 3389 -State Listen
Get-ItemProperty -LiteralPath 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server' `
  -Name fDenyTSConnections
```

- Windows 服务端需要支持 RDP 的系统版本、已开启远程桌面及合法账户；保留 NLA，不用降级认证来解决网络问题。
- **ping 通、SSH 通、RDP 超时**时，先看 ACL 是否只允许了 ICMP 和 TCP/22。
- TCP/3389 成功只证明端口可达，不证明 NLA、Windows 密码、账户登录权限都正确。
- RDP 使用 Windows 账户凭据；Nebula 证书、SSH key 和其他远控软件的密码都不能代替。
- SSH 登录通常在服务会话中，不等于该用户已有交互桌面；使用 `query user` / `query session` 确认，不把另一用户的桌面当成目标用户会话。

### 诊断接口与日志

若已单独启用 Nebula 内置 SSHD，并配置只监听 loopback 的端口和授权公钥，可在对应机器上查看：

```bash
ssh -p 22222 admin@127.0.0.1 help
ssh -p 22222 admin@127.0.0.1 print-tunnel -pretty 192.168.100.20
ssh -p 22222 admin@127.0.0.1 print-relays -pretty
```

此接口不是 Windows OpenSSH Server，本文最小配置默认没有启用。对端 `print-tunnel` 可核对当前隧道使用的证书 groups，帮助区分“磁盘证书已更新”和“运行态已换证”。不要将完整证书、拓扑或诊断输出直接粘贴到公开日志。

服务启动失败先查事件查看器的 Application 日志和 System 中的 Service Control Manager 事件；前台诊断前先停止同配置服务，避免第二个进程抢占 UDP 端口或 TUN。

## 更新、降权与回滚

### 唯一入口是 Nebula SSH 时如何更新

不要只在 Overlay SSH 中直接调用 `Restart-Service Nebula` 后就假定部署完成。停网卡会影响该 SSH 连接，后续启动、回滚与验证必须独立于它存活。

1. 优先确认 LAN、控制台或其他独立管理入口；没有时准备远端 SYSTEM 计划任务。
2. 只读比较配置和证书 SHA-256，确认没有远端 drift；保存受限权限的旧文件。
3. 将新配置和证书写入独立 staging，使用现有私钥验证组合配置，禁止先覆盖 live 文件再试。
4. 计划任务激活前再次检查 live / candidate / backup 摘要，避免计划与执行间覆盖新修改。
5. 在独立任务中替换配置和证书、重启服务；失败时恢复**两者**并恢复服务。
6. 不只检查 `Running` 和 TUN 地址，还要由外部 operator 重连 SSH、测试关键端口。更稳妥的方案是在确认前保留超时回滚任务。
7. 记录不含敏感值的结果摘要，确认计划任务已结束并清理临时任务；备份按受控保留策略处理。

Nebula 支持 `-config <directory>` 合并目录内配置，可在隔离目录用主配置和后加载的 `pki.cert` 覆盖片段测试候选证书；确保实际生效顺序与该版本一致。不要把备份 YAML 混入 live 配置目录，否则可能被一起加载。

ACL / PKI 支持 reload，但 Windows 不应照搬 Unix 的 `kill -HUP`。若已安全启用内置 SSHD，可按目标版本使用 `reload`；没有可靠 reload 入口时做受控服务重启。IP 改变不能只依赖证书 reload；TUN、listener 等不可重载字段也要重启。

### 普通工作站不应携带 operator 权限

从清单删掉 `op` 不会改变已签发证书。需要重签 `host.crt`，移除 `op`；如果 `admin` 同样允许访问其他节点的管理端口，也应按目标权限一起移除。

可以使用原先保存的 **Nebula 节点公钥**重签，保持 IP 和私钥不变；不要使用 OpenSSH 的 `.pub` 文件：

```bash
nebula-cert sign \
  -version 1 -ca-crt ca.crt -ca-key ca.key \
  -name win-node -networks 192.168.100.20/24 \
  -groups workstation,ssh -duration 8760h \
  -in-pub win-node.pub -out-crt win-node.next.crt
nebula-cert verify -ca ca.crt -crt win-node.next.crt
```

没有保留原公钥时，应使用理解 Nebula 证书格式的工具从现有证书提取并核对公钥，或规划新密钥对轮换；不要手工编辑已签名证书中的 groups。

部署后验证：

- 本地与远端证书一致，服务已加载新证书；对端新建隧道看到预期 groups。
- op 设备仍能访问工作站，工作站不再能访问仅授予 operator/admin 的目标端口。
- 将旧证书指纹加入需要撤销访问的节点 `pki.blocklist`，按目标版本 reload / 重建连接并验证旧身份失效。

**重签、归档或删除旧证书不等于撤销。** 只要旧证书未过期、私钥仍可用且对端未拉黑，旧权限可能被恢复使用。Blocklist 不由 lighthouse 自动传播，全网撤销需要分发到所有相关节点；`disconnect_invalid: true` 也不能代替这一步。

## FAQ

| 现象                                                                | 判断与处理                                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Format-List` 被当作外部命令，或 `&` 产生 PowerShell background job | SSH 默认 shell 不同。显式选择 `powershell.exe` / `pwsh`，不要混用 cmd 和 PowerShell 语法                                |
| 多层引号损坏，路径出现多余反斜杠                                    | 复杂部署写成 `.ps1`，通过受控入口整体执行，避免层层拼接 SSH 命令字符串                                                  |
| 一行抛错后后续命令仍执行                                            | `-Command -` 逐句读 stdin 不能当作整体事务；用 `-File` 或将完整输入解析为一个 script block，并显式处理 native exit code |
| `Could not load client cert` / 找不到 `host.key`                    | 核对源文件名、目标文件名、`pki.*` 路径和服务账户 ACL，不先改网络规则                                                    |
| `can not load the wintun driver`                                    | 保留 ZIP 的 `dist/windows/wintun/bin/<arch>/`，确认程序与 DLL 架构一致                                                  |
| 配置测试通过但服务启动失败                                          | 检查 SCM ImagePath 是否正确引用、是否包含 `-service run`，以及 Wintun / 管理员权限                                      |
| 找不到默认 `config.yaml` / `config.yml`                             | 显式传 `-config C:\ProgramData\Nebula\config.yml`，尤其是服务管理命令                                                   |
| 私钥有 `BUILTIN\Users:(RX)`                                         | 普通用户继承了读取权限；按服务身份收紧目录和文件 ACL，检查是否还有显式授权                                              |
| ping 正常但 RDP 超时                                                | 检查目标 inbound 是否允许 TCP/3389 或 op 全端口规则，再检查 Windows 对应过滤范围                                        |
| ACL 使用 `op`，某人登录共享设备后仍有权限                           | ACL 识别设备证书，不识别操作系统用户；应调整设备身份或另做用户级访问控制                                                |
| 新证书已经降权，但旧权限仍存在                                      | 检查其他权限组、其他 allow rule、已有隧道和旧证书 blocklist，而不是只看 inventory                                       |
| LAN 连接也超时                                                      | 可能是客户端根本没有 LAN 路由，不能仅凭该结果认定 Windows 防火墙阻挡                                                    |

自动化通过 stdin 执行 PowerShell 时，可使用整体 script block，避免逐行失败后意外继续：

```bash
ssh win-node 'powershell.exe -NoProfile -NonInteractive -Command "& ([scriptblock]::Create([Console]::In.ReadToEnd()))"' < setup.ps1
```

`setup.ps1` 仍需处理 native exit code、备份与失败恢复。操作结果应分别注明配置校验、服务、网络、账号登录、重启恢复哪些已验证；未实际重启 Windows 就不能将 `Automatic` 等同于重启恢复验证通过。
