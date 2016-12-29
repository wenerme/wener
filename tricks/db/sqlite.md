# SQLite

## Tips

```sql
-- 导入 csv
create table foo(a, b);
.mode csv
.import test.csv foo
```


## .help

指令|描述|默认
----|----|----
.backup ?DB? FILE      | 备份数据库(默认为 main)到 FILE
.bail on|off           | 错误时停止 | OFF
.binary on|off         | 二进制输出 | OFF
.clone NEWDB           | 克隆现有的数据库到 NEWDB
.databases             | 例举添加的数据库名和文件
.dbinfo ?DB?           | 显示数据库状态信息
.dump ?TABLE? ...      | 以 SQL 的形式转储数据库<br>如果指定了表,则只转储匹配 LIKE 模式的表.
.echo on|off           | 命令回显
.eqp on|off            | 自动执行 EXPLAIN QUERY PLAN
.exit                  | 退出
.explain ?on|off?      | 使用适合 EXPLAIN 的输出模式<br>如果未指定参数,则为打开
.fullschema            | 显示 sqlite_stat 的 schema 和内容
.headers on|off        | 显示头
.help                  | 显示该信息
.import FILE TABLE     | 导入 FILE 内容为 TABLE
.indexes ?TABLE?       | 显示所有索引<br>如果指定了表,则只显示匹配 LIKE 模式的表.
.limit ?LIMIT? ?VAL?   | 显示或更改 SQLITE_LIMIT 的值
.log FILE|off          | 日志, FILE 可以为 stderr/stdout
.mode MODE ?TABLE?     | 设置输出模式
-                      | ascii    行列使用 0x1F 和 0x1E 分隔
-                      | csv      逗号分隔的值
-                      | column   左对齐列  (参见 .width)
-                      | html     HTML <table> 代码
-                      | insert   Insert 语句 TABLE
-                      | line     每行只有值
-                      | list     使用 .separator 分隔的值
-                      | tabs     制表符分割的值
-                      | tcl      TCL list 元素
.nullvalue STRING      | 使用 STRING 来替代 NULL 值
.once FILENAME         | 输出下一个 SQL 指令到 FILENAME
.open ?FILENAME?       | 便于现有数据库并打开 FILENAME
.output ?FILENAME?     | 发送输出到 FILENAME 或 stdout
.print STRING...       | 显示 STRING
.prompt MAIN CONTINUE  | 修改提示符
.quit                  | 退出
.read FILENAME         | 执行 FILENAME 中的 SQL
.restore ?DB? FILE     | 恢复 DB(默认 "main") 的内容到 FILE
.save FILE             | 将内存数据库写入到 FILE
.scanstats on|off      | 打开或关闭 sqlite3_stmt_scanstatus() 监测
.schema ?TABLE?        | 显示 CREATE 语句<br>如果指定了表,则只显示匹配 LIKE 模式的表.
.separator COL ?ROW?   | 修改列和行的分隔符,会影响输出和 .import
.shell CMD ARGS...     | 在系统 shell 中执行 CMD ARGS...
.show                  | 显示当前的各种设置
.stats on|off          | 统计开关
.system CMD ARGS...    | 在系统 shell 中执行 CMD ARGS...
.tables ?TABLE?        | 显示表名<br>如果指定了表,则只显示匹配 LIKE 模式的表.
.timeout MS            | 打开被锁表的超时时间
.timer on|off          | SQL 计时器开关
.trace FILE|off        | 输出每个 SQL 语句
.vfsname ?AUX?         | 输出 VFS 栈
.width NUM1 NUM2 ...   | 设置 "column" 模式的宽度,负值为右对齐
