---
title: borg
---

# borg

- [borgbackup/borg](https://github.com/borgbackup/borg)
  - BSD, Python
  - 去重 - content-defined chunking, sha256
  - 压缩 - LZ4, zlib, LZMA, zstd
  - 加密
  - fuse mount

```bash
export BORG_REPO=$PWD/borg
borg rcreate -e repokey-aes-ocb
```
