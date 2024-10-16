---
title: zstd
---

# zstd

- zstd -> Zstandard
- compression level
  - 1-22
  - -1 最快
  - 0 = 默认 3
  - --ultra - levels >= 20
    - 需要更多内存
  - https://github.com/facebook/zstd/blob/dev/lib/compress/clevels.h
- .zst

```bash
tar -I zstd --exclude='.DS_Store' -cvf pgsql.tar.zst pgsql
# 压缩级别
tar -I 'zstd -10' --exclude='.DS_Store' -cvf pgsql.tar.zst pgsql
```
