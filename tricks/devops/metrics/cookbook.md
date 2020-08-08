# Metrics

## MySQL

- MySQL 监控
  - http://forums.mysql.com/read.php?24,92131,92131
  - http://www.techrepublic.com/blog/linux-and-open-source/10-mysql-variables-that-you-should-monitor/
  - https://blog.webyog.com/top-10-things-to-monitor-on-your-mysql-server/
  - https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics/

http://dev.mysql.com/doc/refman/5.7/en/server-status-variables.html

| 变量                     | 含义                                                       | 说明                                                                                                                                           |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Aborted_clients          | 由于客户没有正确关闭连接已经死掉，已经放弃的连接数量。     |
| Aborted_connects         | 尝试已经失败的 MySQL 服务器的连接的次数                    | 1.客户端不具有连接至数据库的权限<br/>2.客户端采用了不正确的密码<br/>3.连接信息包不含正确信息<br/>4.获取连接信息包的时间超过 connect_timeout 秒 |
| Connections              | 试图连接 MySQL 服务器的次数                                |
| Created_tmp_tables       | 当执行语句时，已经被创造了的隐含临时表的数量               |
| Delayed_insert_threads   | 正在使用的延迟插入处理器线程的数量                         |
| Delayed_writes           | 用 INSERT DELAYED 写入的行数。                             |
| Delayed_errors           | 用 INSERT DELAYED 写入的发生某些错误(可能重复键值)的行数。 |
| Flush_commands           | 执行 FLUSH 命令的次数                                      |
| Handler_delete           | 请求从一张表中删除行的次数。                               |
| Handler_read_first       | 请求读入表中第一行的次数。                                 |
| Handler_read_key         | 请求数字基于键读行。                                       |
| Handler_read_next        | 请求读入基于一个键的一行的次数。                           |
| Handler_read_rnd         | 请求读入基于一个固定位置的一行的次数。                     |
| Handler_update           | 请求更新表中一行的次数。                                   |
| Handler_write            | 请求向表中插入一行的次数。                                 |
| Key_blocks_used          | 用于关键字缓存的块的数量。                                 |
| Key_read_requests        | 请求从缓存读入一个键值的次数。                             |
| Key_reads                | 从磁盘物理读入一个键值的次数。                             |
| Key_write_requests       | 请求将一个关键字块写入缓存次数。                           |
| Key_writes               | 将一个键值块物理写入磁盘的次数。                           |
| Max_used_connections     | 同时使用的连接的最大数目。                                 |
| Not_flushed_key_blocks   | 在键缓存中已经改变但是还没被清空到磁盘上的键块。           |
| Not_flushed_delayed_rows | 在 INSERT                                                  | DELAY 队列中等待写入的行的数量。                                                                                                               |
| Open_tables              | 打开表的数量。                                             |
| Open_files               | 打开文件的数量。                                           |
| Open_streams             | 打开流的数量(主要用于日志记载）                            |
| Opened_tables            | 已经打开的表的数量。                                       |
| Questions                | 发往服务器的查询的数量。                                   |
| Slow_queries             | 要花超过 long_query_time 时间的查询数量。                  |
| Threads_connected        | 当前打开的连接的数量。                                     |
| Threads_running          | 不在睡眠的线程数量。                                       |
| Uptime                   | 服务器工作了多少秒。                                       |
