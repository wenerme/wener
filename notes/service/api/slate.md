---
title: Slate
---

# Slate

- [slatedocs/slate](https://github.com/slatedocs/slate)
- [widdershins](https://github.com/mermade/widdershins)
  - OpenAPI -> slate markdown

```bash
git clone https://github.com/slatedocs/slate
cd slate
docker build . -t slate
docker run --rm -it -p 4567:4567 slate

# build 为 静态
docker run --rm --name slate -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source slatedocs/slate build

# 直接 serve
docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve

# 只修改部分文件而不需要 clone 仓库
docker run --rm --name slate -p 4567:4567 \
  -v $(pwd)/source/index.html.md:/srv/slate/source/index.html.md \
  -v $(pwd)/source/includes:/srv/slate/source/includes \
  slatedocs/slate serve
```

