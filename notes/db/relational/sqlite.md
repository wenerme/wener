---
id: sqlite
title: SQLite
---

# SQLite

## Tips

* [数据类型](http://sqlite.org/datatype3.html)
* 语法
  * [expr](https://www.sqlite.org/lang_expr.html)
* 注意
  * DATETIME 不会存储毫秒
  * 没有 Base64 函数
  * BLOB 作为二进制存储部分语言的 Driver 支持不太好

```bash
# macOS 安装
brew install sqlite3
# 因为系统自带 - 所以默认不会添加到 PATH
$(brew --prefix sqlite3)/bin/sqlite3
# 添加安装的 sqlite3 到 PATH
export PATH="/usr/local/opt/sqlite/bin:$PATH"
```

```sql
-- 导入 csv
create table foo(a, b);
.mode csv
.import test.csv foo

-- 日期函数
-- https://sqlite.org/lang_datefunc.html
-- 转换时间戳
select datetime( 1323648000, 'unixepoch' );
-- 获取时间戳, 带毫秒
SELECT CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER);
-- 默认值带毫秒
CREATE TABLE IF NOT EXISTS event
(
  create_at DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))
);

-- 附加其他文件到数据库
ATTACH 'cache.db' AS cache;
```

## Snippets

```sql
-- epoch to datetime
select datetime(1580000000,'unixepoch');
-- 添加时区
select datetime(1580000000,'unixepoch','localtime');
-- datetime to epoch
select strftime('%s', datetime(1580000000,'unixepoch','localtime'));
-- 当前 epoch
select strftime('%s', 'now');
```

## Notes
[The SQLite Query Optimizer Overview](https://www.sqlite.org/optoverview.html)
* WHERE 条件分析
  * 索引选择
* BETWEEN 优化
  * 转换为 >= <= 
  * 与索引判断
* OR 优化
  * 相同列语意上可转换为 IN
  * 不同列 OR 需要按 Cost 选择
* LIKE 优化
  * 前缀索引
* Skip-Scan 优化
  * 条件不以索引最左列开始
  * 尝试限定最左列条件来利用索引
  * 例如当最左列只有固定几个值的时候
* JOIN
  * JOIN 重排序
  * 基于 SQLITE_STAT 选择顺序
  * 通过 CROSS JOIN 控制查询
* 多个索引的选择
  * 基于统计
  * 使用 `+a = 4` 的方式来暗示不实用 `a` 的索引
  * 范围查询
* 覆盖索引
  * 全表扫描时选择包含 rowid 的索引
* ORDER BY 优化
  * 尝试使用符合 ORDER BY 要求的索引
* 通过索引进行部分 ORDER BY
  * 包含多个 ORDER BY 时
* 拉平子查询
  * 将子查询优化为 JOIN
* 协程执行子查询
  * 部分子查询可以与当前查询并行执行
* MIN/MAX 优化
  * 如果列是某索引的最左列可以使用索引
* 自动索引
  * 当查询没有索引时，可能会在语句执行期间自动创建一个索引。
  * 创建索引 O(NlogN) 全表扫描 O(N)
* 下推优化/Push-Down Optimization
  * 一个子查询无法被平整为外部查询，可尝试将外部查询的条件下推到子查询中。
* LEFT JOIN Strength Reduction Optimization
  * 有时一个 LEFT JOIN 可以转换为一个普通的 JOIN，只要两者结果相同。
  * if any column in the right-hand table of the LEFT JOIN must be non-NULL in order for the WHERE clause to be true, then the LEFT JOIN is demoted to an ordinary JOIN.
* 忽略 LEFT JOIN
  * 有时 LEFT JOIN 可以完全呗忽略
    * 飞聚合查询
    * DISTINC 查询或使用 ON/USING 来限制 JOIN 只匹配一列
    * LETF JOIN 右边表的列未在外部查询使用

[The Next-Generation Query Planner](https://www.sqlite.org/queryplanner-ng.html)


统计信息
https://www.sqlite.org/fileformat2.html#stat1tab
https://www.sqlite.org/lang_analyze.html
ANALYZE 会生成统计信息表

sqlite_stat1
可更新或删除，不可 alter 或创建
```sql
CREATE TABLE sqlite_stat1(tbl,idx,stat);
CREATE TABLE sqlite_stat2(tbl,idx,sampleno,sample);
CREATE TABLE sqlite_stat3(tbl,idx,nEq,nLt,nDLt,sample);
CREATE TABLE sqlite_stat4(tbl,idx,nEq,nLt,nDLt,sample);
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
.dump ?TABLE? ...      | 以 SQL 的形式转储数据库<br/>如果指定了表,则只转储匹配 LIKE 模式的表.
.echo on|off           | 命令回显
.eqp on|off            | 自动执行 EXPLAIN QUERY PLAN
.exit                  | 退出
.explain ?on|off?      | 使用适合 EXPLAIN 的输出模式<br/>如果未指定参数,则为打开
.fullschema            | 显示 sqlite_stat 的 schema 和内容
.headers on|off        | 显示头
.help                  | 显示该信息
.import FILE TABLE     | 导入 FILE 内容为 TABLE
.indexes ?TABLE?       | 显示所有索引<br/>如果指定了表,则只显示匹配 LIKE 模式的表.
.limit ?LIMIT? ?VAL?   | 显示或更改 SQLITE_LIMIT 的值
.log FILE|off          | 日志, FILE 可以为 stderr/stdout
.mode MODE ?TABLE?     | 设置输出模式
-                      | ascii    行列使用 0x1F 和 0x1E 分隔
-                      | csv      逗号分隔的值
-                      | column   左对齐列  (参见 .width)
-                      | html     HTML `<table>` 代码
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
.schema ?TABLE?        | 显示 CREATE 语句<br/>如果指定了表,则只显示匹配 LIKE 模式的表.
.separator COL ?ROW?   | 修改列和行的分隔符,会影响输出和 .import
.shell CMD ARGS...     | 在系统 shell 中执行 CMD ARGS...
.show                  | 显示当前的各种设置
.stats on|off          | 统计开关
.system CMD ARGS...    | 在系统 shell 中执行 CMD ARGS...
.tables ?TABLE?        | 显示表名<br/>如果指定了表,则只显示匹配 LIKE 模式的表.
.timeout MS            | 打开被锁表的超时时间
.timer on|off          | SQL 计时器开关
.trace FILE|off        | 输出每个 SQL 语句
.vfsname ?AUX?         | 输出 VFS 栈
.width NUM1 NUM2 ...   | 设置 "column" 模式的宽度,负值为右对齐

## Deeper

https://dzone.com/articles/how-sqlite-database-works

## 归档文件 / SQL Archive
* [sqlar](https://www.sqlite.org/sqlar.html) - 自 2014 年 3.22.0 版本
  * https://www.sqlite.org/src/tarball/sqlite.tar.gz?t=version-3.31.1
* [sqlar](https://sqlite.org/sqlar/doc/trunk/README.md) 独立程序
  * sqlarfs 支持挂载为 fuse - 只读
  * 2018-01-07 https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f
* 注意
  * 目录 data 为 null, sz=0
  * 如果 `length(sqlar.blob) < sqlar.sz` 那么数据则是压缩过
  * 如果 `length(sqlar.blob) == sqlar.sz` 那么数据则是没压缩过的
  * 符号连接 `sz = -1`, 连接目标使用明文存储在 data
  * 压缩使用 deflate - 包含头 `789c` 和结尾 4 字节的 checksum

```sql
-- 创建 sqlar 使用的表
CREATE TABLE sqlar(
  name TEXT PRIMARY KEY,  -- name of the file
  mode INT,               -- access permissions
  mtime INT,              -- last modification time
  sz INT,                 -- original file size
  data BLOB               -- compressed content
);
```

```bash
# 创建
sqlite3 alltxt.sqlar -Ac *.txt
# 更新
sqlite3 example.sqlar -Au *.md
# 显示文件
sqlite3 example.sqlar -Atv
# 提取
sqlite3 example.sqlar -Ax

# -A 等同于 .ar
sqlite3 my.sqlar -Acv file1 file2 file3
sqlite3 my.sqlar ".ar -cv file1 file2 file3"

# 类似于 -Atv
sqlite3 my.sqlar "select name,mode,sz,mtime from sqlar"
```

```sql
-- 文件 33188 = 0100644
-- 目录 16877 = 040755

-- 统一修改 mode
-- 文件
update sqlar set mode=33188 where data is not null;
-- 目录
update sqlar set mode=16877 where data is null;
```
### sqlarfs

```bash
# 使用 archive
curl https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f -o sqlar-v20180107.tar.gz

# 或者单文件
curl https://sqlite.org/sqlar/raw/sqlar.c?name=bbef7d188353c00bd2144b1d37e64991a62ef062 -o sqlar.c
curl https://sqlite.org/sqlar/raw/sqlarfs.c?name=b624195c04067a762ecf16693592d0a263140c63 -o sqlarfs.c

# 依赖 - 如果使用嵌入的 sqlite3.c 则不需要 sqlite-dev
apk add zlib-dev fuse-dev sqlite-dev

# 编译
gcc sqlarfs.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lfuse -lz -o sqlarfs
gcc sqlar.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lz -o sqlar
```

## Node

```bash
# pre gyp 默认从 s3 下载 - 可指定镜像
yarn add sqlite3 --sqlite3_binary_host_mirror=https://npm.taobao.org/mirrors/sqlite3/
```

```ts
// 获取版本
const db = new Database(':memory:');
db.serialize(() => {
  db.each('select sqlite_version() as version', (err, row) => {
    console.log(`sqlite version ${row.version}`)
  });
});
db.close();
```

## Java
* xerial sqlite-jdbc [Usage](https://github.com/xerial/sqlite-jdbc/blob/master/Usage.md)

## UDF
* [Create Or Redefine SQL Functions](http://www.sqlite.org/c3ref/create_function.html)
* PHP 支持 [SQLite3::createFunction](https://www.php.net/manual/en/sqlite3.createfunction.php)
* Java Xerial 支持 [org.sqlite.Function](https://www.javadoc.io/doc/org.xerial/sqlite-jdbc/3.30.1/org/sqlite/Function.html)
* [mapbox/node-sqlite3#140](https://github.com/mapbox/node-sqlite3/issues/140)

