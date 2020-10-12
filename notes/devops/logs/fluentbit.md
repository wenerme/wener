# Fluentbit
## Tips
* [fluentbit](https://fluentbit.io/)
* [fluent/fluent-bit](https://github.com/fluent/fluent-bit)
* [Build Options](https://docs.fluentbit.io/manual/installation/sources/build-and-install)
* 注意
  * 不支持 musl - https://github.com/fluent/fluent-bit/issues/1315
* 数据处理流程
  * input - `-i, --input`
  * parser - `-R, --parser`
  * fliter - `-F, --fliter`
  * buffer
    * `-b  --storage_path=PATH`
    * `-f, --flush=SECONDS`
  * router
    * 匹配
      * `-m, --match` - 等同于 `-p match=abc`
      * `-t, --tag` - 设置 tag，等同于 `-p tag=abc`
      * `-p, --prop="A=B"` - 设置插件属性
  * output - 多个

```bash
# 读取 kernel 消息，输出到 stdio
fluent-bit -i kmsg -t kernel -o stdout -m '*'
```

## 配置
* [Configuring Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit)

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
* [Input Plugins](https://github.com/fluent/fluent-bit#input-plugins)

## Fliter
* [Fliter Plugins](https://github.com/fluent/fluent-bit#filter-plugins)

## Output
* [Output Plugins](https://github.com/fluent/fluent-bit#output-plugins)
* [out_loki](https://grafana.com/docs/loki/latest/clients/fluentbit/)
* https://github.com/grafana/loki/tree/master/cmd/fluent-bit

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
  limits:
    memory: 500Mi
  requests:
    cpu: 100m
    memory: 200Mi

# fluentbit
resources:
  requests:
    cpu: 5m
    memory: 10Mi
  limits:
    cpu: 50m
    memory: 60Mi
```
