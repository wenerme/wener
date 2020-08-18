# Asterisk Modules

## Tips

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
