
-- 查看用户
SELECT User,host FROM mysql.user; 

-- 创建用户
CREATE USER 'wener'@'localhost' IDENTIFIED BY 'qaz';
GRANT ALL PRIVILEGES ON *.* TO 'wener'@'localhost' WITH GRANT OPTION;

-- 创建一个可以远程使用的账户
CREATE USER 'wendb'@'%' IDENTIFIED BY 'wendb';
GRANT ALL PRIVILEGES ON cbh.* TO 'wendb'@'%' identified by 'wendb' WITH GRANT OPTION;

-- 使权限生效
FLUSH PRIVILEGES;

-- 创建结构相同的表
create table name like old_tab;
create table name select * from old_tab where 1=2;