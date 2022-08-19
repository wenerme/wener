---
title: Fluentbit
---

# Fluentbit

- [fluentbit](https://fluentbit.io/)
- [fluent/fluent-bit](https://github.com/fluent/fluent-bit)
- [Build Options](https://docs.fluentbit.io/manual/installation/sources/build-and-install)
- 数据处理流程
  - input - `-i, --input`
  - parser - `-R, --parser`
  - fliter - `-F, --fliter`
  - buffer
    - `-b --storage_path=PATH`
    - `-f, --flush=SECONDS`
  - router
    - 匹配
      - `-m, --match` - 等同于 `-p match=abc`
      - `-t, --tag` - 设置 tag，等同于 `-p tag=abc`
      - `-p, --prop="A=B"` - 设置插件属性
  - output - 多个

:::caution

- [fluent/fluent-bit#464](https://github.com/fluent/fluent-bit/issues/2464) 官方不支持 musl
  - Go 在 musl 下不支持插件

:::

```bash
# macOS
brew install fluent-bit
# AlpineLinux
apk add fluent-bit -X https://mirrors.aliyun.com/alpine/edge/testing/

# 读取 kernel 消息，输出到 stdout
fluent-bit -i kmsg -t kernel -o stdout -m '*'
# Windows Event Log 输出到 stdout
fluent-bit -i winlog -p 'channels=Setup,Windows PowerShell' -o stdout

# 监听 MQTT - 0.0.0.0:1883
fluent-bit -i mqtt -t data -o stdout -m '*'
# 发送 MQTT
mosquitto_pub  -m '{"key1": 123, "key2": 456}' -t some/topic
# Listen=0.0.0.0
# macOS /usr/local/opt/fluent-bit/etc/fluent-bit/parsers.conf
# alpinelinux
fluent-bit -R /usr/local/opt/fluent-bit/etc/fluent-bit/parsers.conf -i syslog -p path=/tmp/flb_syslog -o stdout
logger -u /tmp/flb_syslog my_ident my_message

# syslog
# rfc3164 - 废弃的 BSD syslog 协议
# rfc5424 - 新的格式
fluent-bit -R /etc/fluent-bit/parsers.conf \
  -i syslog -p mode=tcp -p listen=0.0.0.0 -p port=5140 -o stdout
# 日志
logger -T -n 127.0.0.1 -P 5140 wener
```

## 配置

- [Configuring Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit)

```ini
# 引入文件
@INCLUDE somefile.conf
@INCLUDE input_*.conf

[SERVICE]
    # 一个段落缩进 4 个空格
    # 可以存在相同名字 key

    # seconds.nanoseconds
    Flush     5
    Daemon    off
    Log_Level debug
​
[INPUT]
    Name  cpu
    Tag   my_cpu

[FILTER]
    Name  stdout
    Match *​

[OUTPUT]
    Name  stdout
    Match my*cpu

[OUTPUT]
    # 可以使用环境变量
    Name  ${MY_OUTPUT}
    Match *

# 直接设置变量
@SET KEY=VAL

# 上游配置
[UPSTREAM]
    name       forward-balancing

[NODE]
    name       node-1
    host       127.0.0.1
    port       43000

[NODE]
    name       node-2
    host       127.0.0.1
    port       44000

[NODE]
    name       node-3
    host       127.0.0.1
    port       45000
    tls        on
    tls.verify off
    shared_key secret
```

## Input

- [Input Plugins](https://github.com/fluent/fluent-bit#input-plugins)
- collectd
- dummy - 随机生成日志
- exec - 执行外部命令
- forwad
- head - 读取文件前面几行
- health - TCP 健康检查
- 系统 - cpu、disk、mem、netif、proc、thermal
- kmsg - 内核日志
- mqtt - MQTT 服务
- random - 生成随机样本
- serial - 串口
- stdin
- syslog
- systemd
- tail
- tcp
- winlog - Windows Event Log

## Fliter

- [Fliter Plugins](https://github.com/fluent/fluent-bit#filter-plugins)
- expect - 条件过滤
- grep
- kubernetes - 添加元信息
- lua
- parser - 解析记录
- record_modifier - 修改记录
- rewrite_tag - 标签重写
- stdout
- throttle
- nest - 嵌套记录
- modify

## Output

- [Output Plugins](https://github.com/fluent/fluent-bit#output-plugins)
- es - Elasticsearch
- file
- forward
- http
- influxdb
- kafka
- kafka-rest
- nats
- null
- stdout
- tcp
- postgresql
- cockroachdb - v1.6+

## 插件

- [fluent/fluent-bit-go](https://github.com/fluent/fluent-bit-go) - Golang package to build Fluentbit plugins

## Build

- https://docs.fluentbit.io/manual/installation/sources/build-and-install
- [nih-at/libzip#98](https://github.com/nih-at/libzip/issues/98) - undefined reference to `fts_read' and 'fts_close'

```bash
if [ "$CBUILD" != "$CHOST" ]; then
  CMAKE_CROSSOPTS="-DCMAKE_SYSTEM_NAME=Linux -DCMAKE_HOST_SYSTEM_NAME=Linux"
fi

# default CORE_STACK_SIZE=((3 * PTHREAD_STACK_MIN) / 2)=3072 is invalid
# based on https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file
# set default to 24576
cmake -B build \
  -DCMAKE_INSTALL_PREFIX=/usr \
  -DCMAKE_INSTALL_LIBDIR=lib \
  -DCMAKE_BUILD_TYPE=None \
  -DFLB_CORO_STACK_SIZE=24576 \
  -DFLB_TESTS_INTERNAL=Yes \
  -DFLB_TLS=On \
  -DFLB_JEMALLOC=Off \
  $CMAKE_CROSSOPTS .
make -C build
```

# FAQ

## Fluentd vs Fluentbit

- https://fluentbit.io/documentation/0.8/about/fluentd_and_fluentbit.html

| -            | Fluentd                | Fluent Bit                                                 |
| ------------ | ---------------------- | ---------------------------------------------------------- |
| Scope        | Servers                | Embedded & IoT devices                                     |
| Language     | C & Ruby               | C                                                          |
| Memory       | ~20MB                  | ~150KB                                                     |
| Performance  | High Performance       | High Performance                                           |
| Dependencies | Ruby Gem, need gems.   | no dependencies, unless some special plugin requires them. |
| Plugins      | 300+ plugins available | ~15 plugins available                                      |
| License      | Apache License v2.0    | Apache License v2.0                                        |

```yaml
# fluentd
resources:
  requests:
    cpu: 100m
    memory: 200Mi
  limits:
    memory: 500Mi

# fluentbit
resources:
  requests:
    cpu: 5m
    memory: 10Mi
  limits:
    cpu: 50m
    memory: 60Mi
```

## core stack size

- PTHREAD_STACK_MIN
  - musl 下为 2048
- `FLB_CORO_STACK_SIZE=((3 * PTHREAD_STACK_MIN) / 2)`
  - musl 下为 3072 - 是无效的 core stack size
  - 可以考虑设置为 24576

```c
// 默认
#define FLB_CORO_STACK_SIZE      ((3 * PTHREAD_STACK_MIN) / 2)
```
