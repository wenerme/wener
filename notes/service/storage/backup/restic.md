---
title: restic
---

# restic

- [restic/restic](https://github.com/restic/restic)
  - BSD-2, Go
  - fast, secure, efficient backup
  - Linux, macOS, Windows

```bash
restic -r /tmp/backup init
restic -r /tmp/backup backup ~/work

curl -LO https://github.com/restic/rest-server/releases/download/v0.12.0/rest-server_0.12.0_linux_amd64.tar.gz

rest-server --path $PWD/data --no-auth

curl -LO https://github.com/restic/restic/releases/download/v0.15.2/restic_0.15.2_linux_amd64.bz2

restic -r rest:http://host:8000/ init
restic -r rest:https://user:pass@host:8000/my_backup_repo/ init
```

## fsync is not supported by the data storage. This can lead to data loss, if the system crashes or the storage is unexpectedly disconnected.
