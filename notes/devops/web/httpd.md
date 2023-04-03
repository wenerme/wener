---
title: Apache HTTPD
---

# Apache HTTPD

```bash
httpd -S           # -t -D DUMP_VHOSTS -D DUMP_RUN_CFG
httpd -M           # -t -D DUMP_MODULES
httpd -X           # debug, 前台运行
httpd -DFOREGROUND # 前台运行
```

- DUMP_INCLUDES
- https://github.com/docker-library/httpd/blob/master/2.4/httpd-foreground
