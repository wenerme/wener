# PostgreSQL 链接池

## Tips
* [yandex/odyssey](https://github.com/yandex/odyssey) - BSD 3
  * 多线程
  * Transaction pooling
    * 断开链接时支持 cancel 或 rollback
    * 客户端复用上次链接
  * Database+User 纬度 pooling 控制
  * SSL/TLS、md5、clear text
  * 日志汇总 - 每个 client 一个 uuid

# FAQ
## odyssey vs pgbouncer
* odyssey
  * 单进程多线程
  * 链接断开 rollback
  * 尽量转发原本的错误
  * 支持 show stats, show servers, show clients, show lists
  * 不支持  configuration file reload by signal, support for unix sockets, authentication by PAM and HBA.
* pgbouncer
  * 可以多进程同端口

* https://github.com/yandex/odyssey/issues/3
