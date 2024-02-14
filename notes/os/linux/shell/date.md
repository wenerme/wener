---
title: date
---

# date

- -I,--iso-8601=FMT
  - date - 默认
  - date, hours, minutes, seconds, ns
- --rfc-3339=FMT
  - date, seconds, ns
- --rfc-email=--rfc-2822
- -u - UTC

```bash
# busybox
date +%Y-%m-%dT%H:%m:%S%z # ~= --iso-8601=seconds
# busybox 不支持 %:z

apk add coreutils

date --iso-8601=ns      # 2022-05-10T05:30:48.000000000+08:00
date --iso-8601=seconds # 2022-05-10T05:30:48+08:00
date --iso-8601=minutes # 2022-05-10T05:30+08:00
date --iso-8601=hours   # 2022-05-10T05+08:00
date --iso-8601=date    # 2022-05-10
date --iso-8601         # 2022-05-10
date --rfc-3339=ns      # 2022-05-10 05:30:48.000000000+08:00
date --rfc-3339=seconds # 2022-05-10 05:30:48+08:00
date --rfc-3339=date    # 2022-05-10
date --rfc-2822         # Mon, 10 May 2022 05:30:48 +0800
```

| flag                   | for      |
| ---------------------- | -------- |
| -R, --rfc-email        | RFC 2822 |
| -u, --utc, --universal |

- https://man7.org/linux/man-pages/man1/date.1.html
