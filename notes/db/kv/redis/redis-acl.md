---
title: ACL
---

# Redis ACL

- Redis v6 ACLv1
- Redis v7 ACLv1
  - 读写、命令

:::caution

ACL 是配置，不是数据，因此不会同步，不会持久。 [#7988](https://github.com/redis/redis/issues/7988)

:::

- 客户端 `AUTH <username> <password>`
- 默认用户 `AUTH <password>`

```txt title="默认配置"
user default on nopass ~* &* +@all
```

```txt
# user <username> on <password> ~<pattern> &<pattern> +<command> -<command> +@<category> -@<category>
```

- 密码设置
  - `nopass`
  - `>密码`/`<密码` - 设置/移除 明文密码
  - `#<hash>`/`!<hash>` - 设置/移除 SHA-256 密码
  - resetpass 重置
- 命令权限
  - `+<command>`,`-<command>`,`+@<category>`,`-@<category>`
    - v7.0 支持禁止子命令 - 例如 `-config|set`
    - `ACL CAT` 所有分类
  - `+<command>|arg`
    - 例如: `-SELECT|1` 禁止 select 1 DB
  - `allcommands` -> `+@all`
  - `nocommands` -> `-@all`
- Key 权限限定
  - `~<pattern>`
  - `allkeys` -> `~*`
  - resetkeys - 重置
  - `%R~<pattern>`,`%W~<pattern>`,`%RW~<pattern>` - v7.0+ 限定 读写
- Pub/Sub 限定
  - `&<pattern>` - v6.2+
  - `allchannels` -> `&*`
  - resetchannels - 重置
- reset - 重置所有规则
- selector - v7.0+
  - `(<rule list>)`
  - `clearselectors`

```ini
# user default on nopass ~* &* +@all

# 为默认用户设置密码
ACL SETUSER default >PASSWD

# 客户端 测试密码是否正确
HELLO 3 AUTH default PASSWD

# 关闭默认用户 - 如果加了其他用户
ACL SETUSER default off

# 重新设置
ACL SETUSER admin reset on ~* >ADMIN &* +@all
# 重新认证为 admin
AUTH admin ADMIN
# 修改默认用户权限
ACL SETUSER default reset on nopass ~* &* +@all -@admin
```

```bash
# 输出 密码 和 sha-256
uuidgen | tee /dev/fd/2 | tr -d '[:space:]' | sha256sum
```

**sentinel**

```
ACL SETUSER sentinel-user on >somepassword allchannels +multi +slaveof +ping +exec +subscribe +config|rewrite +role +publish +info +client|setname +client|kill +script|kill
```

**replica**

```
ACL setuser replica-user on >somepassword +psync +replconf +ping
```

**命令类目**

- keyspace
- read
- write
- set
- sortedset
- list
- hash
- string
- bitmap
- hyperloglog
- geo
- stream
- pubsub
- admin
- fast - O(1)
- slow
- blocking
- dangerous - FLUSHALL, MIGRATE, RESTORE, SORT, KEYS, CLIENT, DEBUG, INFO, CONFIG, SAVE, REPLICAOF
- connection
- transaction - WATCH, MULTI, EXEC
- scripting
- replication
  - keydb
  - 命令: ping, replconf, sync, replping, psync,

---

- [ACL](https://redis.io/topics/acl)
