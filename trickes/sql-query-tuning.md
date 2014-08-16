SQL Tuning/SQL Optimization Techniques
------------------------------------
http://beginner-sql-tutorial.com/sql-query-tuning.htm

1. The sql query becomes faster if you use the actual columns names in SELECT statement instead of than '*'.
	使用具体的列名, 而不是 `*`
2. HAVING clause is used to filter the rows after all the rows are selected. It is just like a filter. Do not use HAVING clause for any other purposes. 
	`HAVING` 语句只应该用来做查询后的过滤, 而不应该用于其他用途.例如: 替代 `WHERE`. 也就是说能用 `WHERE` 的时候尽量用 `WHERE`
3. Sometimes you may have more than one subqueries in your main query. Try to minimize the number of subquery block in your query. 
	尽量减少子查询.
4. Use operator EXISTS, IN and table joins appropriately in your query. 
	在连接表时, 慎重的使用 `EXISTS`, `IN`
	- Usually IN has the slowest performance. 
		通常 `IN` 的效率最低
	- IN is efficient when most of the filter criteria is in the sub-query. 
		当大部分结果都在__子查询__中时, `IN` 的效率较高
	- EXISTS is efficient when most of the filter criteria is in the main query.
		当大部分结果都在__主查询__中时, `EXISTS` 的效率较高
5. Use EXISTS instead of DISTINCT when using joins which involves tables having one-to-many relationship. 
	在使用表连接时, 使用 `EXISTS` 来替代 `DISTINCT` 判断表之间的 一对多关系
6. Try to use UNION ALL in place of UNION. 
	尽量使用 `UNION ALL` 来替代 `UNION`
7. Be careful while using conditions in WHERE clause. 
8. Use DECODE to avoid the scanning of same rows or joining the same table repetitively. DECODE can also be made used in place of GROUP BY or ORDER BY clause. 
9. To store large binary objects, first place them in the file system and add the file path in the database.
	存储大的二进制文件时, 将文件存入到文件系统, 只在数据库中存储路径.
10. To write queries which provide efficient performance follow the general SQL standard rules.
	- Use single case for all SQL verbs
	- Begin all SQL verbs on a new line
	- Separate all words with a single space 
	- Right or left aligning verbs within the initial SQL verb

MySQL 如何使用索引
==================
http://dev.mysql.com/doc/refman/5.0/en/mysql-indexes.html

大多数索引 (`PRIMARY KEY`, `UNIQUE`, `INDEX`, 和 `FULLTEXT`) 都是以 B-trees 存储的. 有一些特殊数据的索引是使用 R-trees 存储的, 内存表使用的Hash索引.

B-Tree 索引的特征
---------------
使用 B-Tree 的索引,可以支持  `=, >, >=, <, <=, BETWEEN` 比较操作.索引也可以作为`LIKE`比较,但需要不是以通配符开始的字符串.

Hash 索引的特征
-------------
* 只可以使用`= , <=>`操作
* 优化器不能使用Hash索引来加速`ORDER BY`操作.
* MySQL 不能估计两个值之间有多少行
* 只有全键能用来搜索行 
	
其他
----
http://jaxenter.com/yet-another-10-common-mistakes-java-developers-make-when-writing-sql-you-won-t-believe-the-last-one-50824.html
http://blog.jooq.org/2013/07/30/10-common-mistakes-java-developers-make-when-writing-sql/
在查询使用 `NOT IN` 时需要注意,例如:
```
SELECT * FROM table
WHERE value NOT IN (
  SELECT nullable_column FROM ...
)
```
在这个例子中很可能没有返回值,如果子查询中包含`NULL`, 则所有`NOT IN`都失败.在能够添加`NOT NULL`限制时尽量添加.

关于窗口函数的介绍,非常漂亮
http://blog.jooq.org/2013/11/03/probably-the-coolest-sql-feature-window-functions/
支持的数据库 CUBRID, DB2, Oracle, PostgreSQL, SQL Server, or Sybase SQL

* 在写SQL的时候要想想针对`NULL`值该查询是否有效,使用的函数是否被`NULL`影响
* 尽量不要在Java内存中处理数据
* 使用尽量`UNION ALL`来替代`UNION`
	* `UNION` 会移除重复行,意味着会进行很多额外的扫描重复行的工作
* 不要使用JDBC来对数据分页,使用数据库的分页机制
* 不要在Java中链接数据.
* 使用 DISTINCT 或 UNION来移除重复数据
	在发现有重复数据的时候,检查下语句中的Join
* 使用`MERGE`语句.
* 在可能的时候,尽量使用窗口函数而不是聚合函数.
	* 窗口函数的可读性更高(子查询中GROUP BY更少)
	* 性能更好,RDBMS对窗口函数优化更加容易
	* 当在子查询中使用`GROUP BY`时,想想能否用窗口函数完成.
* 不要在内存中排序,在数据库中操作
* 在插入多条数据的时候,使用批量插入



参考
----
* http://beginner-sql-tutorial.com/sql-query-tuning.htm
* http://beginner-sql-tutorial.com/sql-tutorial-tips.htm
* http://msdn.microsoft.com/en-us/library/ff650689.aspx
* PART 1 http://www.codeproject.com/KB/database/OptimizeDBUseIndexing.aspx
* PART 2 http://www.codeproject.com/Articles/35665/Top-steps-to-optimize-data-access-in-SQL-Serv
* http://en.wikipedia.org/wiki/Query_optimization
* http://www.sommarskog.se/dyn-search.html
* http://blog.jooq.org/2013/07/07/high-complexity-and-low-throughput-reasons-for-using-an-orm/