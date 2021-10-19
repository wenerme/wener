---
title: fs_cli
---

# fs_cli

- 类似 asterisk -R
- mod_commands

```bash
fs_cli -x 'global_getvar'
fsctl shutdown
```

```bash
eval $${domain}

show codec
show complete
```

| fs_cli cmd                | desc                     |
| ------------------------- | ------------------------ |
| /help                     |
| /exit,/quit,/bye,Ctrl-D   |
| ...                       | exit or shutdown console |
| /event,/noevent,/nixevent |
| /log,/nolog               |
| /uuid                     | filter by call uuid      |
| /filter                   |
| /logfilter                | filter log               |
| `/debug [0-7]`            | debug level              |

| command                                                                          | desc       |
| -------------------------------------------------------------------------------- | ---------- |
| status                                                                           |
| hupall                                                                           | hangup all |
| version                                                                          |
| show channels                                                                    |
| show calls                                                                       |
| find_user_xml key user domain                                                    |
| `list_users [group <group>] [domain <domain>] [user <user>] [context <context>]` |
| `user_data <user>@<domain> <attr\|var\|param> <name>`                            |

```xml title="event_socket.conf.xml"
<configuration name="event_socket.conf" description="Socket Client">
  <settings>
    <param name="nat-map" value="false"/>
    <!-- value 有可能默认是 :: - 需要修改为 IPv4 如果没有 IPv6 环境 -->
    <!-- <param name="listen-ip" value="::"/> -->
    <param name="listen-ip" value="0.0.0.0"/>
    <param name="listen-port" value="8021"/>
    <param name="password" value="ClueCon"/>
    <!--<param name="apply-inbound-acl" value="loopback.auto"/>-->
    <!--<param name="stop-on-bind-error" value="true"/>-->
  </settings>
</configuration>
```

# FAQ

## mod_event_socket.c:2962 Cannot get information about IP address ::

修改监听地址

## fs_cli.c:1691 main() Error Connecting

- 验证端口开放 8021
- 确保模块加载 mod_event_socket

```bash
telnet 127.0.0.1 8021
```
