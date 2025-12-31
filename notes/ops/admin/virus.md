---
title: Virus
tags:
  - Ops
  - Admin
  - Virus
  - Security
---

# Virus

- [Linux Antivirus ClamAV](http://blog.51cto.com/jerrymin/1680777)

## ClamAV

- [ClamAV](https://www.clamav.net/)
- [ClamAV Devel](https://github.com/vrtadmin/clamav-devel)
- [Ubuntu Antivirus](https://help.ubuntu.com/community/Antivirus)

Usage:

```bash
apk add clamav
rc-service start clamd

# Update virus database, proxy might be needed
freshclam

# clamav-libunrar
```

Determine package owner:

```bash
who_own() { apk info --who-own $(which $1); }
```
