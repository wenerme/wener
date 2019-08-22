# PostgreSQL Reference


## How to speed up insertion performance in PostgreSQL
[How to speed up insertion performance in PostgreSQL](https://stackoverflow.com/a/12207237/1870054)

OLTP vs DW
许多单行写入        批量导入
当前数据            多年的数据
查询由用户产生       查询由大的报表产生
要求 <1s 的响应时间  查询可能会运行上小时
0.5 - 5x 内存       5x - 2000x 内存
100 - 1000 用户     1-10用户
限制                无限制或约束

Big Data Feature
大表 | 分片
大库 | 表空间
大备份 | PITR
大量更新 | Binary Replication
Big Query | Resource Control

* 扩展性
  * 从外部库添加分析函数
    * 金融分析
    * 基因序列
    * 近似查询
  * 可创建
    * 数据类型  函数
    * 聚合      操作
* DW 数据库
Vertica
● Greenplum
● Aster Data
● Infobright
● Teradata
● Hadoop/HBase
● Netezza
● HadoopDB
● LucidDB
● MonetDB
● SciDB
● Paraccel

General Setup
● Latest version of PostgreSQL
● System with lots of drives
● 6 to 48 drives
– or 2 to 12 SSDs
● High-throughput RAID
● Write ahead log (WAL) on separate disk(s)
● 10 to 50 GB space

Settings
few connections
max_connections = 10 to 40
raise those memory limits!
shared_buffers = 1/8 to ¼ of RAM
work_mem = 128MB to 1GB
maintenance_work_mem = 512MB to 1GB
temp_buffers = 128MB to 1GB
effective_cache_size = ¾ of RAM
wal_buffers = 16-32MB

No autovacuum
autovacuum = off
vacuum_cost_delay = off
● do your VACUUMs and ANALYZEs as part
of the batch load process
● usually several of them
● also maintain tables by partitioning


logical data extents
● lets you put some of your data on specific
devices / disks
CREATE TABLESPACE 'history_log'
LOCATION '/mnt/san2/history_log';
ALTER TABLE history_log TABLESPACE
history_log;

tablespace reasons
● parallelize access
● your largest “fact table” on one tablespace
● its indexes on another
– not as useful if you have a good SAN
● temp tablespace for temp tables
● move key join tables to SSD
● migrate to new storage one table at a time

ETL

Extract, Transform, Load
● how you turn external raw data into
normalized database data
● Apache logs → web analytics DB
● CSV POS files → financial reporting DB
● OLTP server → 10-year data warehouse
● also called ELT when the transformation is
done inside the database
● PostgreSQL is particularly good for ELT


L: INSERT
● batch INSERTs into 100's or 1000's per
transaction
● row-at-a-time is very slow
● create and load import tables in one
transaction
● add indexes and constraints after load
● insert several streams in parallel
● but not more than CPU cores

L: COPY
● Powerful, efficient delimited file loader
● almost bug-free - we use it for backup
● 3-5X faster than inserts
● works with most delimited files
● Not fault-tolerant
● also have to know structure in advance
● try pg_loader for better COPY

T: temporary tables
unlogged tables
● like myISAM without the risk

T: stored procedures
● multiple languages
● SQL PL/pgSQL
● PL/Perl PL/Python PL/PHP
● PL/R PL/Java
● allows you to use exernal data processing
libraries in the database
● custom aggregates, operators, more

ELT Tips
● bulk insert into a new table instead of
updating/deleting an existing table
● update all columns in one operation
instead of one at a time
● use views and custom functions to simplify
your queries
● inserting into your long-term tables should
be the very last step – no updates after!

stream processing SQL
● replace multiple queries with a single
query
● avoid scanning large tables multiple times
● replace pages of application code
● and MB of data transmission
● SQL alternative to map/reduce
● (for some data mining tasks)

Postgres partitioning
● based on table inheritance and constraint
exclusion
● partitions are also full tables
● explicit constraints define the range of the
partion
● triggers or RULEs handle insert/update 


materialized
query results as table
● calculate once, read many time
● complex/expensive queries
● frequently referenced
● not necessarily a whole query
● often part of a query
● manually maintained in PostgreSQL
● automagic support not complete yet

maintaining matviews
BEST: update matviews
at batch load time
GOOD: update matview according
to clock/calendar
BAD for DW: update matviews
using a trigger

Tune the planner for correct planning
random_page_cost = 3
cpu_tuple_cost=0.1
contraint_exclusion=on
from_collapse_limit=>12
join_collapse_limit=>12

Vacuum once a day
Check regulary if the vacuums
prevebnts data loss
prevent the database to gotof chontrol, size

Analyze once a day
default_statistics_target >= 300

Prevent bloat
Vacuum full
offline
when pk is not ava
Repack
online
orders the tables(clustered index)
needs pk on table
Reindex
  regulary

Explain
https://explain.depesz.com/

Partial Index ?
Heap Only Tuple

http://pydanny-event-notes.readthedocs.io/en/latest/DjangoConEurope2012/10-steps-to-better-postgresql-performance.html

https://www.dbrnd.com/2015/10/postgresql-fast-way-to-find-the-row-count-of-a-table/

https://www.dbrnd.com/2016/12/postgresql-increase-the-speed-of-update-query-using-hot-update-heap-only-tuple-mvcc-fill-factor-vacuum-fragmentation/

VACUUM 
command will reclaim space still used by data that had been updated. In PostgreSQL, updated key-value tuples are not removed from the tables when rows are changed, so the VACUUM command should be run occasionally to do this.

VACUUM can be run on its own, or with ANALYZE.

VACUUM(FULL, ANALYZE, VERBOSE) [tablename]

ANALYZE gathers statistics for the query planner to create the most efficient query execution paths. Per PostgreSQL documentation, accurate statistics will help the planner to choose the most appropriate query plan, and thereby improve the speed of query processing. 


The REINDEX command rebuilds one or more indices, replacing the previous version of the index. REINDEX can be used in many scenarios, including the following (from Postgres documentation):

https://wiki.postgresql.org/wiki/Using_EXPLAIN
https://www.postgresql.org/docs/current/static/using-explain.html


https://wiki.postgresql.org/wiki/Disk_Usage
