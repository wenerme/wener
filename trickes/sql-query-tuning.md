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


参考
----
* http://beginner-sql-tutorial.com/sql-query-tuning.htm
* http://beginner-sql-tutorial.com/sql-tutorial-tips.htm
* http://msdn.microsoft.com/en-us/library/ff650689.aspx
* PART 1 http://www.codeproject.com/KB/database/OptimizeDBUseIndexing.aspx
* PART 2 http://www.codeproject.com/Articles/35665/Top-steps-to-optimize-data-access-in-SQL-Serv
* http://en.wikipedia.org/wiki/Query_optimization