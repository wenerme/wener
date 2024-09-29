---
title: usql
---

# usql

- [xo/usql](https://github.com/xo/usql)
  - MIT, Go
  - Universal command-line interface for SQL databases
  - `usql -c '\drivers'`

```bash
usql -c '\drivers'

# e.g. MySQL
usql mysql://root:123456@localhost:3306/test
```

```
Available Drivers:
  adodb [ad, ado]
  avatica [av, phoenix]
  awsathena [s3, aws, athena]
  bigquery [bq]
  chai [ci, genji, chaisql]
  clickhouse [ch]
  cockroachdb (postgres) [cr, cdb, crdb, cockroach]
  cosmos [cm]
  cql [ca, scy, scylla, datastax, cassandra]
  csvq [cs, csv, tsv, json]
  databend [dd, bend]
  databricks [br, brick, bricks, databrick]
  exasol [ex, exa]
  firebirdsql [fb, firebird]
  flightsql [fl, flight]
  godynamo [dy, dyn, dynamo, dynamodb]
  h2
  hdb [sa, sap, hana, saphana]
  hive [hi, hive2]
  ignite [ig, gridgain]
  maxcompute [mc]
  memsql (mysql) [me]
  moderncsqlite [mq, modernsqlite]
  mymysql [zm, mymy]
  mysql [my, maria, aurora, mariadb, percona]
  n1ql [n1, couchbase]
  nzgo [nz, netezza]
  oleodbc (adodb) [oo, od, ole, odbc]
  oracle [or, ora, oci, oci8, odpi, odpi-c]
  ots [ot, tablestore]
  pgx [px]
  postgres [pg, pgsql, postgresql]
  presto [pr, prs, prestos, prestodb, prestodbs]
  ql [cznic, cznicql]
  ramsql [rm, ram]
  redshift (postgres) [rs]
  snowflake [sf]
  spanner [sp]
  sqlite3 [sq, sqlite]
  sqlserver [ms, mssql, azuresql]
  tds [ax, ase, sapase]
  tidb (mysql) [ti]
  trino [tr, trs, trinos]
  vertica [ve]
  vitess (mysql) [vt]
  voltdb [vo, vdb, volt]
  ydb [yd, yds, ydbs]
```
