---
title: bind
---

# bind

- 系统 将一个 **目录** 挂载 到一个挂载点
  - 一般是 挂载 设备
- 类似 symlink - 但不依赖应用 lookup
- 类似 hardlink - 但不依赖 fs
- 参考
  - FUSE 实现 https://bindfs.org/
  - FreeBSD nullfs `mount -t nullfs /a /b`

```bash
mount --bind /a /b          # 也可以使用 -o bind
mount --rbind /c /b         # 重新 bind
mount -o remount,ro,bind /b # 重新设置为 只读
mount --move /b /d          # 移动挂载点
```
