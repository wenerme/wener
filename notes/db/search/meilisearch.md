---
title: Meilisearch
---

# Meilisearch

- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch)
  - MIT, Rust
  - LMDB 存储 - mmap

```bash
# https://hub.docker.com/r/getmeili/meilisearch
docker run --rm -it \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='MASTER_KEY' \
  -v $(pwd)/data:/meili_data \
  --name meilisearch getmeili/meilisearch:v1.5
```
