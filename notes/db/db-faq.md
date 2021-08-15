---
title: Database FAQ
---

# Database FAQ

## Connect String / DSN

### PostgreSQL

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
```

 不支持设置 schema，可服务端控制

```sql
-- 针对用户修改
ALTER ROLE username SET search_path TO a,b,c;
-- 针对 db 修改
ALTER DATABASE database_name SET search_path TO schema1,schema2;
-- 全部只允许访问自己 schema
ALTER ROLE ALL SET search_path = "$user";

SELECT pg_catalog.set_config('search_path', '', false);
```
