---
tags:
  - Shell
commands:
  - tar
---

# tar

- 没有统一的 table
- 顺序读取写入 - 适合 archive
- 参考
  - wikipedia [tar](<https://en.wikipedia.org/wiki/Tar_(computing)>)
  - https://www.gnu.org/software/tar/manual/html_node/Standard.html

```bash
# for zstd
apk add zstd
tar -I zstd -xvf archive.tar.zst

# Gnu tar 可以不要 -a
# gz, bz2, Z, zstd
tar -acf archive.tar.zst dir/

# https://www.gnu.org/software/tar/manual/html_section/verbose.html
tar -c -f archive.tar --totals /home

# 单个文件进度
tar cf - /dir -P | pv -s $(du -sb /dir | awk '{print $1}') | gzip > dir.tar.gz


# list
tar -tf archive.tar
tar -tvf archive.tar # verbose
```
