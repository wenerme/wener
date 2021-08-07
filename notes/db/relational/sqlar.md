---
title: sqlar
---

# sqlar

- [sqlar](https://www.sqlite.org/sqlar.html) - 自 2014 年 3.22.0 版本
  - https://www.sqlite.org/src/tarball/sqlite.tar.gz?t=version-3.31.1
- [sqlar](https://sqlite.org/sqlar/doc/trunk/README.md) 独立程序
  - sqlarfs 支持挂载为 fuse - 只读
  - 2018-01-07 https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f

:::tip

- 目录 data 为 null, sz=0
- 如果 `length(sqlar.blob) < sqlar.sz` 那么数据则是压缩过
- 如果 `length(sqlar.blob) == sqlar.sz` 那么数据则是没压缩过的
- 符号连接 `sz = -1`, 连接目标使用明文存储在 data
- 压缩使用 deflate - 包含头 `789c` 和结尾 4 字节的 checksum

:::

```sql
-- 创建 sqlar 使用的表
CREATE TABLE sqlar(
  name TEXT PRIMARY KEY,  -- name of the file
  mode INT,               -- access permissions
  mtime INT,              -- last modification time
  sz INT,                 -- original file size
  data BLOB               -- compressed content
);
```

```bash
# 创建
sqlite3 alltxt.sqlar -Ac *.txt
# 更新
sqlite3 example.sqlar -Au *.md
# 显示文件
sqlite3 example.sqlar -Atv
# 提取
sqlite3 example.sqlar -Ax

# -A 等同于 .ar
sqlite3 my.sqlar -Acv file1 file2 file3
sqlite3 my.sqlar ".ar -cv file1 file2 file3"

# 类似于 -Atv
sqlite3 my.sqlar "select name,mode,sz,mtime from sqlar"
```

```sql
-- 文件 33188 = 0100644
-- 目录 16877 = 040755

-- 统一修改 mode
-- 文件
update sqlar set mode=33188 where data is not null;
-- 目录
update sqlar set mode=16877 where data is null;
```

## sqlarfs

```bash
# 使用 archive
curl https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f -o sqlar-v20180107.tar.gz

# 或者单文件
curl https://sqlite.org/sqlar/raw/sqlar.c?name=bbef7d188353c00bd2144b1d37e64991a62ef062 -o sqlar.c
curl https://sqlite.org/sqlar/raw/sqlarfs.c?name=b624195c04067a762ecf16693592d0a263140c63 -o sqlarfs.c

# 依赖 - 如果使用嵌入的 sqlite3.c 则不需要 sqlite-dev
apk add zlib-dev fuse-dev sqlite-dev

# 编译
gcc sqlarfs.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lfuse -lz -o sqlarfs
gcc sqlar.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lz -o sqlar
```
