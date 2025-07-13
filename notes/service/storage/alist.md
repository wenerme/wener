---
title: Alist
---

# alist

:::caution

- 目前被中国公司收购，有投毒历史，谨慎使用。
  - https://github.com/AlistGo/alist/issues/9015

:::

- [AlistGo/alist](https://github.com/AlistGo/alist)
  - AGPLv3, Go

```bash
# https://hub.docker.com/r/xhofe/alist/tags
# aio - all-in-one
# ffmpeg, aria2
docker run --rm -it \
  -v $PWD/data:/opt/alist/data \
  -p 5244:5244 \
  -e PUID=0 \
  -e PGID=0 \
  -e UMASK=022 \
  --name alist xhofe/alist:v3.44.0-aio

docker exec -it alist ./alist admin
```
