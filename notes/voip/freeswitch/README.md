---
id: freeswitch
---

# FreeSWITCH

- [signalwire/freeswitch](https://github.com/signalwire/freeswitch)
  - **MPL**, C/C++
  - Software Defined Telecom Stack
  - 基于 Sofia SIP
  - 跨平台
- 依赖 spandsp, signalwire-c, libks
- 端口
  - 5060 sip
  - 8021 esl
- 1000-1020, 密码 1234
- 参考
  - [freeswitch/sofia-sip](https://github.com/freeswitch/sofia-sip)
    - LGPL-2.1, C

```bash
# macOS
brew install freeswitch
# -c 前台， -nc 后台， -stop 停止
# 配置 /usr/local/opt/freeswitch/etc/freeswitch/
/usr/local/opt/freeswitch/bin/freeswitch -c -nonat
```

## cmd

- &echo
- &park - hold
- &playback(/tmp/music.wav)
- &endless_playback(/tmp/music.wav)

```bash
# 停止服务
shuatdown

reload
# reload {mod_name}
reloadxml # XML Dialplan
reloadacl # acl.conf.xml
distributor_ctl reload

# 扫描 添加 gw - 不中断
# sofia profile <name> rescan
# 移除 gw - 不中断
# sofia profile <name> killgw <gateway_name>
# 重启 gw - 终端
# sofia profile <name> restart


# 内部状态
sofia status profile internal
# 注册状态
sofia status profile internal reg

originate user/1000 &echo
```

## dialplan

- /usr/local/freeswitch/conf/dialplan/default.xml
- outbound
- 400 -> localhost:8086

```xml
<extension name="socket_400_example">
  <condition field="destination_number" expression="^400\d+$">
    <action application="socket" data="localhost:8086 async full"/>
  </condition>
</extension>
```
