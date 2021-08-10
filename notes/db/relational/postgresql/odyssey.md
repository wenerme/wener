---
title: Odyssey
---

# Odyssey

- [yandex/odyssey](https://github.com/yandex/odyssey) - BSD 3
  - 多线程
  - Transaction pooling
    - 断开链接时支持 cancel 或 rollback
    - 客户端复用上次链接
  - Database+User 纬度 pooling 控制
  - SSL/TLS、md5、clear text
  - 日志汇总 - 每个 client 一个 uuid
- [yandex/odyssey#16](https://github.com/yandex/odyssey/issues/16) - prepared statements in transaction pooling

## 配置

- [配置文档](https://github.com/yandex/odyssey/blob/master/documentation/configuration.md)

```bash
storage "postgres_server" {
	type "remote"

	host "host.docker.internal"
	port 5432
}

database default {
	user default {
		authentication "none"

		storage "postgres_server"
#		storage_db "db"
#		storage_user "user"
#		storage_password "password"

		pool "session"

		client_fwd_error yes
	}
}

unix_socket_dir "/tmp"
unix_socket_mode "0644"

log_format "%p %t %l [%i %s] (%c) %m\n"
log_debug yes
log_config yes
log_session yes
log_query yes
log_stats yes

stats_interval 60

listen {
	host "*"
	port 6432
}
```

# FAQ

## odyssey vs pgbouncer

- odyssey
  - 单进程多线程
  - 不支持 configuration file reload by signal, support for unix sockets, authentication by PAM and HBA.
- pgbouncer
  - 可以多进程同端口
- https://github.com/yandex/odyssey/issues/3
