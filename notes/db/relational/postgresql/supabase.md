---
title: supabase/postgres
---

# supabase/postgres
- [supabase/postgres](https://github.com/supabase/postgres)
  - Docker 镜像
  - 包含大多插件
  - 版本号匹配 Postgres
  - 基础镜像为 postgres
  - 使用 ansible 构建
  - ~250MB - 300MB
  - [Dockerfile](https://github.com/supabase/postgres/blob/develop/Dockerfile)
  - Vote for more [#679](https://github.com/supabase/supabase/discussions/679)
- 扩展
- [supabase/supautils](https://github.com/supabase/supautils)

```conf
unix_socket_directories = '/var/run/postgresql'
session_preload_libraries = 'supautils'
include = '/etc/postgresql-custom/supautils.conf'
cron.database_name = 'postgres'
pljava.libjvm_location = '/usr/lib/jvm/java-11-openjdk-${TARGETARCH}/lib/server/libjvm.so'
pgsodium.getkey_script= '/usr/lib/postgresql/${postgresql_major}/bin/pgsodium_getkey.sh'
auto_explain.log_min_duration = 10s
```
