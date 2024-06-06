---
title: Sysbench
---

# Sysbench

- [akopytov/sysbench](https://github.com/akopytov/sysbench)

```bash
brew install sysbench

sysbench --test=cpu --cpu-max-prime=20000 --num-threads=2 run

USERNAME=
PASSWORD=
sysbench oltp_read_write --db-driver=mysql --time=60 --threads=32 --report-interval=3 --mysql-host=mysql \
  --mysql-port=3306 \
  --mysql-user=$USERNAME \
  --mysql-password=$PASSWORD \
  --mysql-db=sbtest --tables=10 --table_size=1000000 prepare

sysbench oltp_read_write --db-driver=mysql --time=60 --threads=32 --report-interval=3 --mysql-host=mysql \
  --mysql-port=3306 \
  --mysql-user=$USERNAME \
  --mysql-password=$PASSWORD \
  --mysql-db=sbtest --tables=10 --table_size=1000000 run
```
