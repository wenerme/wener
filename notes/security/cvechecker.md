---
title: cvechecker
---

# cvechecker

- [sjvermeu/cvechecker](https://github.com/sjvermeu/cvechecker)

```bash
apk add cvechecker
nano /etc/cvechecker.conf # 移除 MySQL 相关配置 - DB 数据较多，经常使用建议使用 外部 DB - 可共享
cvechecker -i             # 初始化 DB
# 下载缓存  /var/cvechecker/cache
pullcves pull # 更新 DB - 建议设置 cron 定时更新

tempfile=/tmp/cvecheck.tmp
find / -type f -perm -o+x > $tempfile
cat /proc/version >> $tempfile
cvechecker -b $tempfile > /dev/null 2>&1   # Run cvechecker against the software list
cvechecker -r > $tempfile > /dev/null 2>&1 # Create a report
```

- https://wiki.alpinelinux.org/wiki/Cvechecker
