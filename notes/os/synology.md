---
title: Synology
---

# Synology

- /volumn1
- @eaDir
- /var/services/homes -> /volume1/@fake_home_link
- /var/services/homes -> /volume1/homes
- 用户与群组 -> 高级设置 -> 家目录 -> 启动
- 参考
- btrfs 修复
  - https://gist.github.com/bruvv/d9edd4ad6d5548b724d44896abfd9f3f
- https://www.synology.com/zh-cn/compatibility
- webdav 5005

# FAQ

## Could not chdir to home directory /var/services/homes: No such file or directory

- 用户与群组 -> 高级设置 -> 家目录 -> 启动

## rsync error: rsync service is no running
