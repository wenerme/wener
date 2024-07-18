---
tags:
  - Command
---

## redis-cli

```bash
redis-cli -u 'redis://user:pass@127.0.0.1:6379'
# user 部分必须，没有则使用 default
redis-cli -u 'redis://default:pass@127.0.0.1:6379'
```

- user 默认为 default
  - 因为以前没有 ACL 也就没有 user 的概念

| flag                            | default   | for                                                                |
| ------------------------------- | --------- | ------------------------------------------------------------------ |
| -h `<hostname>`                 | 127.0.0.1 | 服务器主机名                                                       |
| -p `<port>`                     | 6379      | 服务器端口                                                         |
| -s `<socket>`                   |           | 服务器 socket（覆盖主机名和端口）                                  |
| -a `<password>`                 |           | 连接服务器时使用的密码                                             |
| --user `<username>`             |           | 用于发送 ACL 样式的 'AUTH username pass'                           |
| --pass `<password>`             |           | 与 -a 一致，出于一致性考虑                                         |
| --askpass                       |           | 强制用户从 STDIN 输入密码并加密                                    |
| -u `<uri>`                      |           | 服务器 URI                                                         |
| -r `<repeat>`                   |           | 执行指定命令 N 次                                                  |
| -i `<interval>`                 |           | 在使用 -r 时，每个命令之间等待的时间                               |
| -n `<db>`                       |           | 数据库编号                                                         |
| -2                              |           | 使用 RESP2 协议模式启动会话                                        |
| -3                              |           | 使用 RESP3 协议模式启动会话                                        |
| -x                              |           | 从 STDIN 读取最后一个参数                                          |
| -X                              |           | 从 STDIN 读取 `<tag>` 参数                                         |
| -d `<delimiter>`                | `\n`      | 原始格式化响应中的响应块分隔符                                     |
| -D `<delimiter>`                | `\n`      | 原始格式化响应中的响应分隔符                                       |
| -c                              |           | 启用集群模式（跟随 -ASK 和 -MOVED 重定向）                         |
| -e                              |           | 当命令执行失败时返回退出错误码                                     |
| --tls                           |           | 建立安全的 TLS 连接                                                |
| --sni `<host>`                  |           | TLS 的服务器名称指示                                               |
| --cacert `<file>`               |           | 用于验证的 CA 证书文件                                             |
| --cacertdir `<dir>`             |           | 存储受信任的 CA 证书的目录                                         |
| --insecure                      |           | 通过跳过证书验证允许不安全的 TLS 连接                              |
| --cert `<file>`                 |           | 用于身份验证的客户端证书                                           |
| --key `<file>`                  |           | 用于身份验证的私钥文件                                             |
| --tls-ciphers `<list>`          |           | 设置首选密码列表（TLSv1.2 及以下）                                 |
| --tls-ciphersuites `<list>`     |           | 设置首选密码套件列表（TLSv1.3）                                    |
| --raw                           |           | 使用原始格式化回复                                                 |
| --no-raw                        |           | 强制格式化输出                                                     |
| --quoted-input                  |           | 强制将输入作为引用字符串处理                                       |
| --csv                           |           | 以 CSV 格式输出                                                    |
| --json                          |           | 以 JSON 格式输出                                                   |
| --quoted-json                   |           | 以 ASCII 安全的引用字符串生成 JSON                                 |
| --show-pushes `<yn>`            |           | 是否打印 RESP3 PUSH 消息                                           |
| --stat                          |           | 打印服务器的滚动统计数据                                           |
| --latency                       |           | 进入持续采样延迟的特殊模式                                         |
| --latency-history               |           | 像 --latency，但跟踪延迟随时间的变化                               |
| --latency-dist                  |           | 显示延迟光谱，需要 xterm 256 色                                    |
| --lru-test `<keys>`             |           | 使用 80-20 分布模拟缓存工作负载                                    |
| --replica                       |           | 模拟显示从主服务器接收到的命令的副本                               |
| --rdb `<filename>`              |           | 将 RDB 转储从远程服务器传输到本地文件                              |
| --functions-rdb `<filename>`    |           | 类似 --rdb，但仅获取函数（不获取键）                               |
| --pipe                          |           | 将原始 Redis 协议从 stdin 传输到服务器                             |
| --pipe-timeout `<n>`            | 30        | 在 --pipe 模式中，发送所有数据后如果没有在 <n> 秒内收到回复则中止  |
| --bigkeys                       |           | 采样 Redis 键，寻找具有许多元素的键                                |
| --memkeys                       |           | 采样 Redis 键，寻找消耗大量内存的键                                |
| --memkeys-samples `<n>`         |           | 采样 Redis 键，定义要采样的键元素数量                              |
| --hotkeys                       |           | 采样 Redis 键，寻找热点键（仅在 maxmemory-policy 为 \*lfu 时有效） |
| --scan                          |           | 使用 SCAN 命令列出所有键                                           |
| --pattern `<pat>`               | `*`       | 使用 --scan, --bigkeys 或 --hotkeys 时的键模式                     |
| --count `<count>`               | 10        | 使用 --scan, --bigkeys 或 --hotkeys 时的计数选项                   |
| --quoted-pattern `<pat>`        |           | 与 --pattern 相同，但指定的字符串可以是引用的                      |
| --intrinsic-latency `<sec>`     |           | 运行测试以测量内在系统延迟                                         |
| --eval `<file>`                 |           | 使用 Lua 脚本发送 EVAL 命令                                        |
| --ldb                           |           | 与 --eval 一起使用启用 Redis Lua 调试器                            |
| --ldb-sync-mode                 |           | 像 --ldb，但使用同步 Lua 调试器                                    |
| --cluster `<command>` [args...] |           | 群集管理命令和参数                                                 |
| --verbose                       |           | 启用详细模式                                                       |
| --no-auth-warning               |           | 使用命令行接口时不显示警告消息                                     |
