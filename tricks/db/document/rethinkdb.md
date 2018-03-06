# RethinkDB

## Tips
* [default.conf.sample](https://github.com/rethinkdb/rethinkdb/blob/next/packaging/assets/config/default.conf.sample)
  * 带注释的配置文件例子
  * 配置项并不多,基本所有的配置都可以通过参数指定
* 默认客户端端口 28015
* 默认集群端口 29015
* 默认管理端口 8080
* 定义协议的 [ql2.proto](https://github.com/rethinkdb/rethinkdb/blob/next/src/rdb_protocol/ql2.proto)
* [限制](https://rethinkdb.com/limitations/)
  * 集群
    * 最大 64 个分片
  * 文档
    * 一个表大约在每个实例上要占用 10 MB, 一个空表大约需要 4 MB
    * 每个表至少需要 8 MB 内存
    * 每个文档建议不超过 16 MB
    * 最大的 JSON 查询时 64MB
    * RethinkDB 需要将结构记录在内存中, 大约需要数据 1% 的内存
  * 键
    * 主键最长 127 个字符
    * 二级键只会索引前 238 - 主键长度 的字节,
    * 二级索引不会索引对象或 null
    * 主键字符串不能包含 null
  * 数据类型
    * 数字为双精度浮点数, -2^53 - 2^53, 数字不能为 NaN 或无限
    * 默认数组不能超过 100,000,可通过 arrayLimit 选项修改
  * 其他
    * 索引使用字节序,而非字符顺序
    * 部分文件系统(例如加密的,压缩的)不支持 direct-io 选项
    * btrfs 的 direct-io 支持有问题
    * 默认情况下, RethinkDB 会返回还没提交到磁盘的并发写请求, 可通过 read_mode 选项控制隔离级别.
* ReQL
  * [SQL to ReQL](https://rethinkdb.com/docs/sql-to-reql/javascript/)
* 问题
  * [#6618](https://github.com/rethinkdb/rethinkdb/issues/6618) Is rethinkdb dead ?

```bash
# 启动两个示例,组成一个集群,数据会分别存储到 data-a 和 data-b
rethinkdb -d data-a -n svr_a
rethinkdb -d data-b -n svr_b -o 100 -j 127.0.0.1
```


```
$ rethinkdb --help
Running 'rethinkdb' will create a new data directory or use an existing one,
  and serve as a RethinkDB server.
File path options:
  -d [ --directory ] path                     specify directory to store data and
                                              metadata
  --io-threads n                              how many simultaneous I/O operations
                                              can happen at the same time
  --direct-io                                 use direct I/O for file access
  --cache-size mb                             total cache size (in megabytes) for
                                              the process. Can be 'auto'.

Server options:
  -n [ --server-name ] arg                    the name for this server (as will
                                              appear in the metadata).  If not
                                              specified, one will be generated from
                                              the hostname and a random
                                              alphanumeric string.
  -t [ --server-tag ] arg                     a tag for this server. Can be
                                              specified multiple times.

Network options:
  --bind {all | addr}                         add the address of a local interface
                                              to listen on when accepting
                                              connections, loopback addresses are
                                              enabled by default. Can be overridden
                                              by the following three options.
  --bind-cluster {all | addr}                 override the behavior specified by
                                              --bind for cluster connections.
  --bind-driver {all | addr}                  override the behavior specified by
                                              --bind for client driver connections.
  --bind-http {all | addr}                    override the behavior specified by
                                              --bind for web console connections.
  --no-default-bind                           disable automatic listening on
                                              loopback addresses
  --cluster-port port                         port for receiving connections from
                                              other servers
  --driver-port port                          port for rethinkdb protocol client
                                              drivers
  -o [ --port-offset ] offset                 all ports used locally will have this
                                              value added
  -j [ --join ] host[:port]                   host and port of a rethinkdb server
                                              to connect to
  --reql-http-proxy [protocol://]host[:port]  HTTP proxy to use for performing
                                              `r.http(...)` queries, default port
                                              is 1080
  --canonical-address addr                    address that other rethinkdb
                                              instances will use to connect to us,
                                              can be specified multiple times
  --join-delay seconds                        hold the TCP connection open for
                                              these many seconds before joining
                                              with another server
  --cluster-reconnect-timeout seconds         maximum number of seconds to attempt
                                              reconnecting to a server before
                                              giving up, the default is 24 hours

TLS options:
  --http-tls-key key_filename                 private key to use for web
                                              administration console TLS
  --http-tls-cert cert_filename               certificate to use for web
                                              administration console TLS
  --driver-tls-key key_filename               private key to use for client driver
                                              connection TLS
  --driver-tls-cert cert_filename             certificate to use for client driver
                                              connection TLS
  --driver-tls-ca ca_filename                 CA certificate bundle used to verify
                                              client certificates; TLS client
                                              authentication disabled if omitted
  --cluster-tls-key key_filename              private key to use for intra-cluster
                                              connection TLS
  --cluster-tls-cert cert_filename            certificate to use for intra-cluster
                                              connection TLS
  --cluster-tls-ca ca_filename                CA certificate bundle used to verify
                                              cluster peer certificates
  --tls-min-protocol protocol                 the minimum TLS protocol version that
                                              the server accepts; options are
                                              'TLSv1', 'TLSv1.1', 'TLSv1.2';
                                              default is 'TLSv1.2'
  --tls-ciphers cipher_list                   specify a list of TLS ciphers to use;
                                              default is 'EECDH+AESGCM'
  --tls-ecdh-curve curve_name                 specify a named elliptic curve to use
                                              for ECDHE; default is 'prime256v1'
  --tls-dhparams dhparams_filename            provide parameters for DHE key
                                              agreement; REQUIRED if using DHE
                                              cipher suites; at least 2048-bit
                                              recommended

Authentication options:
  --initial-password {auto | password}        sets an initial password for the
                                              "admin" user on a new server.  If set
                                              to auto, a random password will be
                                              generated.

Web options:
  --web-static-directory directory            the directory containing web
                                              resources for the http interface
  --http-port port                            port for web administration console
  --no-http-admin                             disable web administration console

CPU options:
  -c [ --cores ] n                            the number of cores to use

Service options:
  --pid-file path                             a file in which to write the process
                                              id when the process is running
  --daemon                                    daemonize this rethinkdb process

Set User/Group options:
  --runuser user                              run as the specified user
  --rungroup group                            run with the specified group

Help options:
  -h [ --help ]                               print this help
  -v [ --version ]                            print the version number of rethinkdb

Log options:
  --log-file file                             specify the file to log to, defaults
                                              to 'log_file'
  --no-update-check                           disable checking for available
                                              updates.  Also turns off anonymous
                                              usage data collection.

Configuration file options:
  --config-file                               take options from a configuration
                                              file


There are a number of subcommands for more specific tasks:
    'rethinkdb create': prepare files on disk for a new server instance
    'rethinkdb serve': use an existing data directory to host data and serve queries
    'rethinkdb proxy': serve queries from an existing cluster but don't host data
    'rethinkdb export': export data from an existing cluster into a file or directory
    'rethinkdb import': import data from from a file or directory into an existing cluster
    'rethinkdb dump': export and compress data from an existing cluster
    'rethinkdb restore': import compressed data into an existing cluster
    'rethinkdb index-rebuild': rebuild outdated secondary indexes

For more information, run 'rethinkdb help [subcommand]'.
```
