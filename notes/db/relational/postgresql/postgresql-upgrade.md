---
title: PostgreSQL Upgrade
---

# PostgreSQL Upgrade

:::tip

- 升级后注意同步 pg_hba.conf 和 postgres.conf

:::

## over docker

- [tianon/docker-postgres-upgrade](https://github.com/tianon/docker-postgres-upgrade)
- /var/lib/postgresql
  - OLD/data
  - NEW/data

```bash
docker run --rm \
	-v DIR:/var/lib/postgresql \
	tianon/postgres-upgrade:OLD-to-NEW \
	--link

docker run --rm \
	-v PGDATAOLD:/var/lib/postgresql/OLD/data \
	-v PGDATANEW:/var/lib/postgresql/NEW/data \
	tianon/postgres-upgrade:OLD-to-NEW
```

```
Optimizer statistics are not transferred by pg_upgrade so,
once you start the new server, consider running:
    ./analyze_new_cluster.sh

Running this script will delete the old cluster's data files:
    ./delete_old_cluster.sh
```

# FAQ

## There seems to be a postmaster servicing the old cluster.

```
There seems to be a postmaster servicing the old cluster.
Please shutdown that postmaster and try again.
Failure, exiting
```

旧 server 强制关闭导致的异常。
重启服务，然后 `pg_ctl stop`

```bash
docker exec -it -u postgres postgres pg_ctl stop
```
