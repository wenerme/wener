



-- mysql 启用慢查询
-- http://dev.mysql.com/doc/refman/5.1/en/server-system-variables.html#sysvar_slow_query_log_file
-- http://dev.mysql.com/doc/refman/5.6/en/slow-query-log.html
-- 已不再使用 SET GLOBAL log_slow_queries = 1;
-- 5.1.12
SET GLOBAL slow_query_log = 'ON';
FLUSH LOGS;
-- 5.5 以后有
FLUSH SLOW LOGS;
-- 设置慢查询日志文件 5.1.12
SET GLOBAL slow_query_log_file = 'path';
-- 查看变量
SHOW VARIABLES LIKE '%slow_query%'
-- 如果已知变量名
select @@datadir;

-- H2 中这样导出 SQL
script to 'filenam'

-- ======================================
-- === 生成测试数据
-- ======================================
DROP TABLE IF EXISTS massive;
/* 不创建索引,否则会产生大量的索引文件 */
CREATE TABLE massive (id int PRIMARY KEY AUTO_INCREMENT, n int, val varchar(40));

-- 使其在一个事务里,增加插入的速度
DROP PROCEDURE IF EXISTS prepare_data;
DELIMITER $$
CREATE PROCEDURE prepare_data (IN n INT)
BEGIN
	DECLARE i INT DEFAULT 0;
	START TRANSACTION;
	WHILE i < n DO
		INSERT INTO massive (n,val) VALUES (i % 200, uuid());
		SET i = i + 1;
	END WHILE;
	COMMIT;
END$$
DELIMITER ;

CALL prepare_data(100);

SHOW CREATE PROCEDURE prepare_data;

-- 可能需要一些权限
GRANT EXECUTE ON PROCEDURE test.* TO ''@'localhost';
flush privileges;
-- 清除 binlog
PURGE BINARY LOGS TO 'mysql-bin.010';
PURGE BINARY LOGS BEFORE '2008-04-02 22:46:26';
PURGE BINARY LOGS BEFORE now();

-- FAQ
-- how-to-shrink-purge-ibdata1-file-in-mysql http://stackoverflow.com/questions/3456159/
-- how-do-i-quickly-rename-a-mysql-database-change-schema-name http://stackoverflow.com/questions/67093/
-- 热门问题 http://stackoverflow.com/questions/tagged/mysql?sort=votes

-- Reference
-- MySQL 日期函数
-- http://dev.mysql.com/doc/refman/5.6/en/date-and-time-functions.html
-- JPQL 日期函数
-- http://www.datanucleus.org/products/accessplatform_2_2/jpa/jpql_functions.html
-- JPQL 手册
-- http://docs.oracle.com/cd/E17904_01/apirefs.1111/e13946/ejb3_langref.html
-- MySQL 日志说明 http://dev.mysql.com/doc/refman/5.6/en/server-logs.html

-- 优化表
-- http://stackoverflow.com/questions/5474662/mysql-optimize-all-tables
-- OPTIMIZE TABLE 命令
-- http://dev.mysql.com/doc/refman/5.6/en/optimize-table.html
-- 讲优化文章
-- https://www.digitalocean.com/community/tutorials/how-to-optimize-queries-and-tables-in-mysql-and-mariadb-on-a-vps
-- http://www.openlogic.com/wazi/bid/195905/Tips-and-Tricks-to-Optimize-MySQL
