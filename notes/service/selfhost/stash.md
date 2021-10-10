---
title: stash
---

# stash

- [stashapp/stash](https://github.com/stashapp/stash)
  - AGPL-3.0, Go
- http://localhost:9999
- ffmpeg
- ffprobe
- [stashapp/CommunityScrapers](https://github.com/stashapp/CommunityScrapers)
  - [SCRAPERS-LIST.md](https://github.com/stashapp/CommunityScrapers/blob/master/SCRAPERS-LIST.md)
- [stashapp/stash-box](https://github.com/stashapp/stash-box)

:::tip

- 图库为 压缩包 - zip,cbz
  - [cbz](https://en.wikipedia.org/wiki/Comic_book_archive) - comic book ZIP archive file
- 目前不支持 AVIF
  - 没有 Go decoder
  - [stashapp/stash#1228](https://github.com/stashapp/stash/pull/1228)

:::

```bash
docker run --rm -it -v /etc/localtime:/etc/localtime:ro \
  -p 9999:9999 \
  -v $PWD/stash/config:/root/.stash \
  -v $PWD/stash/data:/data \
  -v $PWD/stash/metadata:/metadata \
  -v $PWD/stash/cache:/cache \
  -v $PWD/stash/generated:/generated \
  -e STASH_STASH=/data/ \
  -e STASH_GENERATED=/generated/ \
  -e STASH_METADATA=/metadata/ \
  -e STASH_CACHE=/cache/ \
  --name stash stashapp/stash:latest

cd stash/data
mkdir scenes images movies galleries studios performers tags
```
