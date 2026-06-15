---
title: Sofia
---

# Sofia

- [freeswitch/sofia-sip](https://github.com/freeswitch/sofia-sip)
  - LGPL-2.1, C, SIP, RFC3261, User-Agent library
  - Sofia-SIP 是 SIP User-Agent library；FreeSWITCH 通过 `mod_sofia` 暴露 SIP endpoint。
- 参考
  - [Sofia SIP Stack](https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Configuration/Sofia-SIP-Stack/)
  - [mod_sofia](https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Modules/mod_sofia_1048707/)
  - [Sofia-SIP refdocs](https://sofia-sip.sourceforge.net/refdocs/)
  - [sofia-sip SourceForge](https://sofia-sip.sourceforge.net/)

## 是什么

在 FreeSWITCH 语境里，看到 `sofia` 基本就可以理解为 **SIP 相关**。

- `Sofia-SIP`：底层 SIP stack / SIP User-Agent library。
  - 实现 SIP signaling、transaction、dialog、registration、message parsing 等能力。
  - 遵循 IETF RFC3261。
- `mod_sofia`：FreeSWITCH 的 SIP endpoint 模块。
  - 把 Sofia-SIP 接到 FreeSWITCH core。
  - 负责 SIP profile、gateway、registration、presence、SIP tracing 等。
- `sofia` CLI/API：FreeSWITCH 控制台里管理 SIP profile/gateway/registration/debug 的命令集合。

FreeSWITCH endpoint 可以理解为一个完整 User Agent：它负责和外部世界说某种信令协议，例如 SIP、Verto，再把呼叫控制和媒体流转交给 FreeSWITCH core。

## 配置位置

常见默认配置：

```text
conf/
├── autoload_configs/
│   └── sofia.conf.xml
└── sip_profiles/
    ├── internal.xml
    ├── external.xml
    ├── internal-ipv6.xml
    ├── external-ipv6.xml
    ├── internal/
    │   └── *.xml        # internal profile gateways / includes
    └── external/
        └── *.xml        # external gateways
```

常见 profile：

| profile | default port | 用途 |
| ------- | ------------ | ---- |
| `internal` | 5060 / 5061 TLS | 内部分机、注册用户、LAN/SBC 入口 |
| `external` | 5080 / 5081 TLS | 外部运营商 trunk、公网 SIP gateway |
| `internal-ipv6` | 5060 | IPv6 internal |
| `external-ipv6` | 5080 | IPv6 external |

默认变量常在 `vars.xml` 中定义：

| variable | 说明 |
| -------- | ---- |
| `internal_sip_port` | internal SIP port，常见 5060 |
| `internal_tls_port` | internal TLS port，常见 5061 |
| `external_sip_port` | external SIP port，常见 5080 |
| `external_tls_port` | external TLS port，常见 5081 |
| `external_sip_ip` | 外部 SIP 广告地址，可用 `stun:` |
| `external_rtp_ip` | 外部 RTP 广告地址，可用 `stun:` |
| `domain` / `domain_name` | 默认 domain / SIP realm |

## 常用命令

```bash
fs_cli
```

### 查看状态

```text
sofia status
sofia status profile internal
sofia status profile external
sofia status profile internal reg
sofia status profile external reg
```

XML 输出，适合脚本或 `mod_xml_rpc`：

```text
sofia xmlstatus
sofia xmlstatus profile internal
sofia xmlstatus profile internal reg
```

### Profile 生命周期

```text
# 启动 profile
sofia profile internal start

# 停止 profile
sofia profile internal stop

# 重新扫描 profile 配置，尽量不中断现有呼叫
sofia profile internal rescan
sofia profile external rescan reloadxml

# 重启 profile，会影响该 profile 上的呼叫
sofia profile internal restart
```

`rescan` 与 `restart` 的区别：

- `rescan`：加载新增/变更配置，尽量不中断现有呼叫；部分地址/端口类配置不会热更新。
- `restart`：重启 profile，影响范围更大。

### Gateway 管理

```text
# 查看 gateway
sofia status gateway
sofia status gateway <gateway_name>

# 移除 gateway；_all_ 表示全部
sofia profile external killgw <gateway_name>
sofia profile external killgw _all_

# 变更 gateway 后重新加载
sofia profile external killgw <gateway_name>
sofia profile external rescan reloadxml

# 查看 up/down gateway
sofia profile external gwlist up
sofia profile external gwlist down
```

### Registration / Phone

```text
# 查看注册
sofia status profile internal reg

# flush 注册
sofia profile internal flush_inbound_reg <user>@<domain>

# 要求话机 check-sync / 部分话机会拉配置或重启
sofia profile internal check_sync <user>@<domain>
```

### Recover

```text
sofia recover
```

用于在 crash / failover 等情况下尝试恢复仍存在的呼叫。实际是否可用取决于 core db、ODBC/HA 设计、媒体路径和上游设备行为。

## Debug

### SIP trace

```text
# 全局 SIP trace
sofia global siptrace on
sofia global siptrace off

# profile SIP trace
sofia profile internal siptrace on
sofia profile internal siptrace off
```

常见组合：

```text
sofia global siptrace on
sofia loglevel all 9
sofia tracelevel alert
console loglevel debug
fsctl debug_level 10
```

关闭：

```text
sofia global siptrace off
sofia loglevel all 0
console loglevel info
fsctl debug_level 0
```

### Sofia-SIP debug 环境变量

Sofia-SIP 组件可用环境变量控制 debug level，范围通常为 `0..9`。

| env | 说明 |
| --- | ---- |
| `SOFIA_DEBUG` | 默认 debug level |
| `NUA_DEBUG` | User Agent engine |
| `SOA_DEBUG` | SDP Offer/Answer engine |
| `NEA_DEBUG` | Event engine |
| `NTA_DEBUG` | Transaction engine |
| `TPORT_DEBUG` | Transport event |
| `TPORT_LOG` | 输出已解析 SIP message |
| `TPORT_DUMP` | dump 未解析 transport message 到文件 |
| `IPTSEC_DEBUG` | HTTP/SIP auth module |
| `SU_DEBUG` | su module |

Debug level 大致含义：

| level | 说明 |
| ----- | ---- |
| 0 | fatal / panic |
| 1 | critical |
| 2 | non-critical errors |
| 3 | warnings / progress |
| 5 | signaling protocol actions |
| 7 | media protocol actions |
| 9 | very verbose function enter/exit |

## SIP Header 变量

`mod_sofia` 可以把 inbound SIP INVITE header 解析为 channel variables。常见变量名前缀：

| prefix | 说明 |
| ------ | ---- |
| `sip_h_` | SIP header |
| `sip_rh_` | response header |
| `sip_ph_` | profile/header 相关变量 |

例如可以在 dialplan 里读：

```xml
<action application="log" data="INFO User-Agent=${sip_user_agent}"/>
<action application="log" data="INFO X-Custom=${sip_h_X-Custom}"/>
```

## 常见问题

### `sofia status profile internal` 不工作？

先确认 `mod_sofia` 已加载、profile 已启动、SIP 端口没有被其他进程占用。

```text
module_exists mod_sofia
sofia status
```

Linux 上查 5060/5080：

```bash
ss -lunp | grep -E ':(5060|5080)\b'
# 或旧系统
netstat -lunp | grep -E ':(5060|5080)\b'
```

### internal / external 怎么区分？

- `internal`：默认给内部分机注册、内网 SIP UA、SBC 内侧。
- `external`：默认给运营商 trunk / 外部 SIP provider。

区别不只是端口，也通常包括 ACL、NAT、codec、auth、dialplan context、gateway 配置。

### 改 gateway 后为什么没生效？

新增 gateway 常用：

```text
sofia profile external rescan reloadxml
```

修改已有 gateway 常用：

```text
sofia profile external killgw <gateway_name>
sofia profile external rescan reloadxml
```

如果改的是 profile bind IP、port 这类参数，通常需要 restart profile。

### NAT 相关看哪里？

重点检查：

- `external_sip_ip`
- `external_rtp_ip`
- `sip_profiles/*.xml` 里的 `ext-sip-ip` / `ext-rtp-ip`
- `NDLB-*` 相关 profile 参数
- SIP Contact / Via / Record-Route 中暴露的地址
- RTP SDP `c=` 地址
