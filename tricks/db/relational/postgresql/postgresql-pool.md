# PostgreSQL 链接池
## Tips
* 每个链接一个进程
* 最大链接数 max_connections
* 进程内存分为 - 默认每个链接 10M 左右
  * 本地内存
    * work_mem - 默认 4M
      * ORDER BY, DISTINCT, JOIN
    * maintenance_work_mem
      * autovacuum_work_mem
      * VACUUM
    * temp_buffers - 默认 8M
      * 临时表
  * 共享内存
    * shared_buffers
    * wal_buffers
    * Commit Log
* 参考
  * [What to Check if PostgreSQL Memory Utilization is High](https://severalnines.com/database-blog/what-check-if-postgresql-memory-utilization-high)
  * [Scaling Connections in Postgres](https://www.citusdata.com/blog/2017/05/10/scaling-connections-in-postgres)
  * https://pgtune.leopard.in.ua/
  * https://gist.github.com/rgreenjr/3637525

```sql
select * from pg_stat_activity;
select * FROM pg_stat_activity where state <> 'idle';

show max_connections;

show work_mem;
show autovacuum_work_mem;
show maintenance_work_mem;
show temp_buffers;
show shared_buffers;
show wal_buffers;
```
