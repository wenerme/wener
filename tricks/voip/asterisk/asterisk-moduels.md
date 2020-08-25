---
id: asterisk-moduls 
title: Asterisk Modules
---

# Asterisk Modules

## Tips

```bash
asterisk -x 'module show'
```

## res_statsd
* [Integrating Asterisk with StatsD](https://www.asterisk.org/integrating-asterisk-with-statsd/)
* [Utilizing the StatsD Dialplan Application](https://wiki.asterisk.org/wiki/display/AST/Utilizing+the+StatsD+Dialplan+Application)
* [res/res_endpoint_stats.c](https://github.com/asterisk/asterisk/blob/master/res/res_endpoint_stats.c)

__statsd.conf__

```ini
[general]
# 是否启用 statsd 指标
enabled = yes
# statsd 服务端地址
# server[:port] - 默认端口 8125
server = 127.0.0.1
# 指标前缀 - 如果有多个实例则建议添加
prefix = ast-1
# 添加换行
# 方便使用 nc -lu 8125 测试时
;add_newline = no
```

```
ast-1.PJSIP.contacts.1876;@47519c5004a0a52468bd2e1570095db4.rtt:19|ms
ast-1.PJSIP.contacts.states.Created:+1|g
ast-1.PJSIP.contacts.states.Created:-1|g
ast-1.PJSIP.contacts.states.Reachable:+1|g
```

[statsd_exporter](https://github.com/prometheus/statsd_exporter) 映射规则

```yaml
mappings:
- match: "([^.]+)[.]PJSIP[.]contacts[.]([^;]+)(;[^.]*)?[.]rtt"
  match_type: regex
  name: "pjsip_contacts_rtt"
  labels:
    asterisk: "$1"
    conact: "$2"
```

## res_prometheus
* [res/res_prometheus.c](https://github.com/asterisk/asterisk/blob/master/res/res_prometheus.c)

## res_snmp
* [Asterisk SNMP Support](https://wiki.asterisk.org/wiki/display/AST/Simple+Network+Management+Protocol+%28SNMP%29+Support)
* https://www.voip-info.org/asterisk-snmp/
* mibs
  * [digium-mib.txt](https://wiki.asterisk.org/wiki/display/AST/Digium+MIB+Definitions)
  * [asterisk-mib.txt](https://wiki.asterisk.org/wiki/display/AST/Asterisk+MIB+Definitions)

```bash
# 编译需要额外依赖
# ================
apk install net-snmp-dev

net-snmp-config --agent-libs

# ./configure --with-netsnmp
```
### 配置

__/etc/asterisk/res_snmp.conf__

```ini
[general]
; 运行为子系统 - 需要 snmpd 启动 agentx
; 非子系统需要 root - 绑定 161 端口
subagent = no
; 启动
enabled = yes
```

```bash
asterisk -x 'module show like snmp'
```

__/etc/snmp/snmpd.conf__

```ini
# Asterisk user
createUser asteriskUser MD5 "<your password>" DES
rwuser asteriskUser priv

master agentx
agentXSocket	/var/agentx/master
agentXPerms 0660 0550 nobody asterisk
```

```bash
# snmp v2
snmpwalk -v2c -c public 127.0.0.1 1.3.6.1.4.1.22736.1
# snmp v3
snmpwalk -v 3 -u asteriskUser -l authPriv -a MD5 -A <your password> -x DES -X <your password> 127.0.0.1 ASTERISK-MIB::astVersionString
```
