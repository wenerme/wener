---
title: searxng
---

# searxng

- [searxng/searxng](https://github.com/searxng/searxng)
  - AGPLv3, Python
  - metasearch engine
- 参考
  - https://searx.space/
    - instances

```bash
# https://hub.docker.com/r/searxng/searxng/tags
# https://github.com/searxng/searxng-docker
# 默认配置 https://github.com/searxng/searxng-docker/blob/master/searxng/settings.yml

# http://127.0.0.1:8080/search?q=wenerme&format=json
docker run --rm -it \
  -v $PWD/searxng/conf:/etc/searxng:rw \
  -v $PWD/searxng/cache:/var/cache/searxng:rw \
  -p 8080:8080 \
  --name searxng docker.io/searxng/searxng:latest
```

- SEARXNG_BASE_URL=http://localhost
- https://docs.searxng.org/admin/settings/settings.html
- https://github.com/searxng/searxng/blob/master/searx/settings.yml
- doi, Digital Object Identifier, 数字对象唯一标识符
  - 用于唯一标识电子文档（如学术论文、数据集、报告等）的标准编码。
  - 格式通常类似于：10.1000/xyz123
  - 典型用途：在学术出版物、期刊文章、会议论文等中，每篇文献都分配有唯一的 DOI。
- Redis 主要用于 limiter
  - SearXNG + filtron + morty -> SearXNG core + redis
  - /etc/searxng/limiter.toml
- SEARXNG_SECRET
  - 主要用于加密
- Search API
  - GET /
  - GET /search
  - https://docs.searxng.org/dev/search_api.html
- 默认 SQLite 缓存位于 /tmp

---

- favicons.toml
  - https://github.com/searxng/searxng/blob/master/searx/favicons/favicons.toml

```yaml
outgoing:
  proxies:
    all://:
      - http://proxy1:8080
      - http://proxy2:8080
```
