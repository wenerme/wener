---
title: logrotate
---

# logrotate

- [logrotate/logrotate](https://github.com/logrotate/logrotate)
- /etc/logrotate.conf
- /etc/logrotate.d/

```bash
# 配置 /etc/logrotate.conf
# 任务 /etc/periodic/daily/logrotate
apk add logrotate
```

```ini title="logrotate.conf"
include /etc/logrotate.d
```

## 配置

- 参考 [/etc/logrotate.d](https://pkgs.alpinelinux.org/contents?file=&path=%2Fetc%2Flogrotate.d&name=&branch=edge&arch=x86_64)

```conf
/var/log/apache2/* {
    weekly
    rotate 3
    size 10M
    compress
    delaycompress
}

/var/log/squid/access.log {
    monthly
    create 0644 root root
    rotate 5
    size=1M
    dateext
    dateformat -%d%m%Y
    notifempty
    # mail gabriel@mydomain.com
}

/var/log/k3s.log {
        missingok
        notifempty
        sharedscripts
        postrotate
                /etc/init.d/k3s --quiet --ifstarted restart || true
        endscript
}
```

```bash
# -d debug - 不会执行
logrotate -d /etc/logrotate.d/apache2.conf
# -v verbose - 会执行
logrotate -v /etc/logrotate.d/apache2.conf
```
