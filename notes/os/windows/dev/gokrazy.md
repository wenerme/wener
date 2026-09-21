---
title: gokrazy/rsync
---

# gokrazy/rsync

- [gokrazy/rsync](https://github.com/gokrazy/rsync)
  - BSD-3-Clause, Go
  - Windows 原生 rsync client/server，可通过 SSH 同步文件，无需常驻 daemon。
- 已有 `gokr-rsync.exe` 且在 PATH 时，可在管理员 PowerShell 创建同目录别名，省去 `--rsync-path=gokr-rsync`；不要覆盖已有 rsync。

```powershell
$Bin = Split-Path (Get-Command gokr-rsync.exe -ErrorAction Stop).Source
New-Item -ItemType SymbolicLink -Path "$Bin\rsync.exe" -Target "$Bin\gokr-rsync.exe"
```

```bash
rsync --protocol=27 -rtvn ./project/ win-node:work/project/
```

- `--protocol=27` 用于兼容 Go 实现，简单调用可省略；v0.3.7 不支持 ACL/xattrs，不能当作原版 rsync 的完整替代品。
