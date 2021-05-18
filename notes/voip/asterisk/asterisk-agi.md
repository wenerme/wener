---
title: Asterisk AGI
---

# Asterisk AGI

- AGI - Asterisk Gateway Interface - CGI
- Async AGI
  - Asterisk 1.6+
  - 异步 CGI 脚本 - 相对使用少 - 可以使用 AMI、ARI、WebSocket 实现
  - `agi:async`
- FastAGI
  - tcp 交互
  - 远程脚本
  - 默认端口 4573
  - `agi://host.domain[:port][/script/name]`
  - 支持 HA - DNS Lookup - 高可用
    - 前缀 `_agi._tcp.`
    - `hagi://agi.example.com/foo.agi` -> `_agi._tcp.agi.example.com`
- agi-bin
  - exec 执行 - 基于 io 交互
  - eagi 支持音频通道 - 不可以运行在挂断的通道
  - 例如 `AGI(test.bash)` -> /var/lib/asterisk/agi-bin/test.bash
- 参考
  - 1.8 [AGI Commands](https://wiki.asterisk.org/wiki/display/AST/AGI+Commands)
  - [The Asterisk Gateway Protocol: A practical introduction and tutorial to agi applications](http://marcelog.github.io/articles/agi.html)

**extensions.conf**

```conf
[default]
exten => 1000,1,AGI(agi://localhost:3000)
# 调用 PHP 处理
exten => 1,1,AGI(myApplication.php)
```

## Notes

- AGI 通过 stdin stdout 交互
- AMI AGI 事件
  - AGIExecStart
  - AGIExecEnd
  - AsyncAGIStart
  - AsyncAGIExec
  - AsyncAGIEnd

**环境变量传递配置**

| env             | desc                       |
| --------------- | -------------------------- |
| AST_CONFIG_DIR  | astetcdir                  |
| AST_CONFIG_FILE | asterisk.conf              |
| AST_MODULE_DIR  | astmoddir                  |
| AST_SPOOL_DIR   | astspooldir                |
| AST_MONITOR_DIR | 默认 AST_SPOOL_DIR/monitor |
| AST_VAR_DIR     | astvarlibdir               |
| AST_DATA_DIR    | astdbdir                   |
| AST_LOG_DIR     | astlogdir                  |
| AST_AGI_DIR     | astagidir                  |
| AST_KEY_DIR     | astkeydir                  |
| AST_RUN_DIR     | astrundir                  |

- 传递 asterisk.conf 配置的目录参数

**变量传递上下文信息**

| var              | demo              | desc                                                               |
| ---------------- | ----------------- | ------------------------------------------------------------------ |
| agi_request      | test.bash         | filename of script                                                 |
| agi_channel      | SIP/6001-00000004 | originating channel                                                |
| agi_language     | en                | language code                                                      |
| agi_type         | SIP               | originating channel type                                           |
| agi_uniqueid     | 1621099875.4      | unique ID for call                                                 |
| agi_version      | 18.2.1            | version of Asterisk (since Asterisk 1.6)                           |
| agi_callerid     | unknown           | caller ID number (or "unknown").                                   |
| agi_calleridname | unknown           | caller ID name (or "unknown").                                     |
| agi_callingpres  | 1                 | presentation of callerid.                                          |
| agi_callingani2  | 0                 | PRI Channels ani2 variable.                                        |
| agi_callington   | 0                 | The type of number used in PRI Channels.                           |
| agi_callingtns   | 0                 | An optional 4 digit number (Transit Network Selector).             |
| agi_dnid         | unknown           | The dialed number id (or "unknown").                               |
| agi_rdnis        | unknown           | The referring DNIS number (or "unknown").                          |
| agi_context      | test              | Origin context in extensions.conf.                                 |
| agi_extension    | 1                 | The called number (dnis).                                          |
| agi_priority     | 1                 | The priority it was executed as in the dial plan.                  |
| agi_enhanced     | 0.0               | The flag value is 1.0 if started as an EAGI script, 0.0 otherwise. |
| agi_accountcode  |                   | Account code of the origin channel.                                |
| agi_threadid     | 140092630592288   | Thread ID of the AGI script.                                       |

**变量格式**

- `agi_arg_<N>` 为 AGI 参数
  - 例如 `AGI(/tmp/agi.sh,arg1,arg2)`
    - agi_arg_1: arg1
    - agi_arg_2: arg2

```ini
# 接收变量
<variable_name>:<space><variable_value>
agi_context: default
agi_arg_1: abc

# FastAGI 脚本参数
# AGI(agi://192.168.0.2/CallerWantsCustomerService,${EXTEN},${UNIQUEID},${CALLERID(name)})
agi_network: yes
agi_network_script: CallerWantsCustomerService

# 发送命令
VERBOSE "message" 3
# 接收响应
<error_code><space>result=<result_data><space>[additional_data]
200 result=1
```

| resp            | desc                       |
| --------------- | -------------------------- |
| error_code      |
| result_data     |
| additional_data | result_data 之外的额外数据 |

| error_code | desc                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| 200        | Operation was completed successfully.                                         |
| 510        | Invalid or unknown command.                                                   |
| 511        | The command cant be executed on a dead (closed, terminated, hung up) channel. |
| 520        | End of proper usage, when the command returns its syntax.                     |

- AGISTATUS
  - SUCCESS
  - FAILURE
  - NOTFOUND
  - HANGUP

## res_agi.c
- [res/res_agi.c](https://github.com/asterisk/asterisk/blob/master/res/res_agi.c)
- run_agi - 实际处理流程
  - agi_handle_command - 处理读取命令，返回 cmd_status
    - find_command 匹配命令
- setup_env - 发送变量信息
- agi_command - 注册的命令
  - cmda - 命令 - 例如 `{"get","data"}`
  - `int (* const handler)(struct ast_channel *chan, AGI *agi, int argc, const char * const argv[])`
  - 每个命令内部自行解析参数
