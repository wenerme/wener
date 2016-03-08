# GTID
这里主要简单描述下实现 GTID 遇到的问题

## MySQL vs MariaDB
MariaDB 10.0.2 开始支持 GTID, MySQL 5.6 开始支持GTID,因为 MariaDB 是基于 MySQL 5.5.5, 因此 MariaDB 的 GTID 与 MySQL 的 GTID 姿势并不一样.

* GTID 格式不一样
	* MySQL:
		* UUID SET
			* `3E11FA47-71CA-11E1-9E33-C80AA9429562:23`
			* `server_uuid:interval`
		* GTID SET
			* `uuid_set[, uuid_set] ... | ''`
	* MariaDB
		* `0-3306-123`
		* `DomainID-ServerID-Sequence`
* 开始 GTID 复制的流程不一样
	* MySQL
		* 使用  [COM_BINLOG_DUMP_GTID] 开始复制流程,在包中指定 GTID SET
		* COM_BINLOG_DUMP_GTID 是 5.6 支持的协议
	* MariaDB
```
-- 对于不同的复制需求,通过设置会话中的变量指定
-- 可通过抓包看到 MaraDB 开始复制的流程
-- 主要与 GTID 相关的变量
SET @mariadb_slave_capability = 4;-- 表明能接受 GTID
SET @slave_connect_state = '0-3311-90';-- 指定 GTID
-- 然后发送 REGISTER_SLAVE
-- MySQL 是发送 BINLOG_DUMP.REGISTER_SLAVE 是可选的
```
* MariaDB 的 GTID 事件包与 MySQL 的不同,目前只有通过抓包分析.
* MySQL 的协议有相对完善的文档, MariaDB 什么的协议,文档滴没有
	* MariaDB 大部分协议与 MySQL 相同, 但是这部分不同


## Reference
* [wenerme/mysql-binlog-connector-java](https://github.com/wenerme/mysql-binlog-connector-java)
	支持 Mariadb GTID 的实现
* MySQL
	* [Replication with Global Transaction Identifiers](https://dev.mysql.com/doc/refman/5.6/en/replication-gtids.html)
	* [COM_BINLOG_DUMP_GTID]
* MariaDB
	* [Global Transaction ID](https://mariadb.com/kb/en/mariadb/global-transaction-id/)
	* [MariaDB 1- GTID explain](https://mariadb.com/blog/mariadb-10-gtid-explained)
	* [Enabling GTIDs for server replication in MariaDB 10.0](https://mariadb.com/blog/enabling-gtids-server-replication-mariadb-100)


  [COM_BINLOG_DUMP_GTID]:http://dev.mysql.com/doc/internals/en/com-binlog-dump-gtid.html
