---
tags:
  - FAQ
---

# NFS FAQ

## Neither 'subtree_check' or 'no_subtree_check' specified for export

- 不影响，只是警告默认为了 `no_subtree_check`，之前是 `subtree_check`

```
/data0    *(rw,no_root_squash,no_subtree_check)
```

## mount.nfs: rpc.statd is not running but is required for remote locking. mount.nfs: Either use '-o nolock' to keep locks local, or start statd

- 当客户端在 NAT 后时可能会有这个问题 - 因为端口从新映射后不会是保留端口
- exports 添加 `insecure` 选项即可
  - 默认开启了 secure，要求端口 小于 1024 IPPORT_RESERVED

```
mount.nfs: rpc.statd is not running but is required for remote locking.
mount.nfs: Either use '-o nolock' to keep locks local, or start statd.
mount.nfs: Operation not permitted
```
