---
tags:
  - Shell
---

# tar

```bash
apk add zstd

tar -I zstd -xvf archive.tar.zst

# Gnu tar 可以不要 -a
# gz, bz2, Z, zstd
tar -acf archive.tar.zst dir/
```
