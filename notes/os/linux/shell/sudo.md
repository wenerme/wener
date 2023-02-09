---
title: sudo
---

# sudo

```
<username> ALL=NOPASSWD:<path to rsync>
```

```
Cmnd_Alias SHELL = /bin/ash, /bin/sh, /bin/bash
Cmnd_Alias SU = /usr/bin/su
%wheel ALL=(ALL) NOPASSWD: ALL, !SHELL, !SU
```
