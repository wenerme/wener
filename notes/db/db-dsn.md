---
title: DSN
---


# Connect String / DSN

## PostgreSQL

- [libpq connect](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- host, hostaddr, port, dbname, user, password, passfile
- channel_binding, connect_timeout, client_encoding
- options
- application_name, fallback_application_name
- keepalives, keepalives_idle, keepalives_interval, keepalives_count
- tcp_user_timeout, tty
- replication
- gssencmode, krbsrvname, gsslib
- sslmode - prefer,disable,allow,require,verify-ca,verify-full
- requiressl, sslcompression, sslcert, sslkey, sslpassword, sslrootcert, sslcrl
- ssl_min_protocol_version, ssl_max_protocol_version
- requirepeer
- service
- target_session_attrs

```ini
# postgres
host=localhost port=5432 dbname=mydb connect_timeout=10
# postgresql://[user[:password]@][host][:port][,...][/dbname][?param1=value1&...]
postgresql://
postgres://

postgresql://other@localhost/otherdb?connect_timeout=10&application_name=myapp
postgresql://host1:123,host2:456/somedb?target_session_attrs=any&application_name=myapp

postgresql:///dbname?host=/var/lib/postgresql

# golang 支持 search path
# https://github.com/jackc/pgx
postgresql://example.com/mydatabase?search_path=myschema
host=192.168.1.1 database=apps user=apps password=apps search_path=apps,public
```

不支持设置 schema，可服务端控制

```sql
-- 针对用户修改
ALTER ROLE username SET search_path TO a,b,c;
-- 针对 db 修改
ALTER DATABASE database_name SET search_path TO schema1,schema2;
-- 全部只允许访问自己 schema
ALTER ROLE ALL SET search_path = "$user";

SELECT pg_catalog.set_config('search_path', '', false);
```

## SQLite

- cache
  - shared
  - private
- mode=ro|rw|rwc|memory
- immutable=1
- modeof=_filename_ - 生成的 db 匹配指定文件的 mode
- DSN
  - `:memory:`
  - `file::memory:`
- PHP PDO
  - https://www.php.net/manual/en/ref.pdo-sqlite.connection.php

---

- https://www.sqlite.org/uri.html
- https://www.sqlite.org/c3ref/open.html

## JDBC

- org.postgresql.Driver
- org.sqlite.JDBC
- org.mariadb.jdbc.JDBC
- com.mysql.jdbc.Driver - MySQL 5.1
- com.mysql.cj.jdbc.Driver
- org.h2.Driver

```pre title="DataGrid URL Template"
jdbc:postgresql://[{host::localhost}[:{port::5432}]][/{database:database/[^?]+:postgres}?][\?<&,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:postgresql://\[{host:ipv6:\:\:1}\][:{port::5432}][/{database:database/[^?]+:postgres}?][\?<&,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:postgresql:{database:database/(?!//)[^?]+:postgres}[\?<&,user={user:param},password={password:param},{:identifier}={:param}>]

jdbc:sqlite:!(:memory:){file::identifier.sqlite}?
jdbc:sqlite::memory:

jdbc:mysql://{host::localhost}?[:{port::3306}][/{database}?][\?<&,user={user},password={password},{:identifier}={:param}>]
jdbc:mysql://address=\(protocol=tcp\)\(<\)\(,host={host:host_ipv6:localhost},port={port::3306},user={user},password={password},{:identifier}={:param}>\)[/{database}][\?<&,{:identifier}={:param}>]
jdbc:mysql:///{database}?[\?<&,user={user},password={password},junixsocket.file={mysql.socket::/tmp/mysqld.sock},socketFactory={socketFactory:#param:org.newsclub.net.mysql.AFUNIXDatabaseSocketFactoryCJ},{:identifier}={:param}>]

jdbc:h2:tcp://{host::localhost}[:{port::9092}]/{database::default}[;<;,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:h2:mem:{database::default}?[;<;,{:identifier}={:param}>]
jdbc:h2:!(mem:)!(tcp://)[file:]{path:h2_db_file}[;<;,user={user:param},password={password:param},MV_STORE={MV_STORE:#param},{:identifier}={:param}>]
```
