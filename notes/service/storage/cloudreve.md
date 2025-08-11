---
title: Cloudreve
---

# Cloudreve

- [cloudreve/Cloudreve](https://github.com/cloudreve/Cloudreve)
  - GPLv3, Go, Gin, ent, React, Redux, Material-UI
  - file management and sharing system, supports multiple storage providers
- 参考
  - 支持多种存储 https://docs.cloudreve.org/zh/usage/storage/

:::caution

- Blob 存储

:::

```bash
docker run --rm -it \
  -v $PWD/cloudreve/data:/cloudreve/data \
  -p 5212:5212 \
  --name cloudreve cloudreve/cloudreve
```

- 本地存储
  - data/uploads
- uploads/{uid}/{path}
- Blob {uuid}_{originname}
- Chunk 25M
