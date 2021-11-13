---
title: Init Awesome
tags:
  - Awesome
---

# Init Awesome

- [troglobit/finit](https://github.com/troglobit/finit)

## container

- docker 内置 tini - `--init`
- [Yelp/dumb-init](https://github.com/Yelp/dumb-init)
- [krallin/tini](https://github.com/krallin/tini)
- [Choosing init for multi-process containers](https://ahmet.im/blog/minimal-init-process-for-containers/)

```bash
apk add dumb-init
/usr/bin/dumb-init --

apk add tini
/sbin/tini --
```

**最简单的 多进程 init**

```bash title="entrypoint.sh"
#!/usr/bin/env bash
set -e

program1 &
program2 &
wait -n
```

```dockerfile
ENTRYPOINT ["/bin/tini", "--", "entrypoint.sh"]
```
