---
title: PostgreSQL Upgrade
---

# PostgreSQL Upgrade

- [pg_upgrade](https://www.postgresql.org/docs/current/pgupgrade.html)
  - -c,--check - 只检测
  - -k,--link - hard link, 避免复制
  - --clone - 使用 reflinks - macOS APFS, Linux 4.5+ Btrfs XFS
    - zfs support --reflink [#405](https://github.com/openzfs/zfs/issues/405)

:::tip

- 升级后注意同步 pg_hba.conf 和 postgres.conf

:::

## over docker

- [tianon/docker-postgres-upgrade](https://github.com/tianon/docker-postgres-upgrade)
- /var/lib/postgresql
  - OLD/data
  - NEW/data

```bash
# --link hard link
docker run --rm \
  -v DIR:/var/lib/postgresql \
  tianon/postgres-upgrade:OLD-to-NEW \
  --link

docker run --rm \
  -v PGDATAOLD:/var/lib/postgresql/OLD/data \
  -v PGDATANEW:/var/lib/postgresql/NEW/data \
  tianon/postgres-upgrade:OLD-to-NEW \
  --link

# 升级后
vacuumdb --all --analyze-in-stages --missing-stats-only
vacuumdb --all --analyze-only
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
docker update postgres --restart=no
docker exec -it -u postgres postgres pg_ctl stop
```

## old cluster does not use data checksums but the new one does

```
POSTGRES_INITDB_ARGS='--no-data-checksums'
```

## database user "postgres" is not the install user

supabase 使用 supabase_admin
