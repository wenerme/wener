---
title: Ghost
---

# Ghost

- 默认端口 2368
- 数据库支持 SQLite 和 MySQL 5.5, 5.6, or 5.7 (not >= 8.0)
- 主题使用 Handlebars
- 参考
  - [配置文档](https://ghost.org/docs/concepts/config/)
  - [数据模型](https://ghost.org/docs/concepts/posts/)
  - [API 文档](https://ghost.org/docs/api/v3/)

```bash
# Docker 启动
# https://hub.docker.com/_/ghost/
# 所有配置项都可以通过环境变量指定 - https://ghost.org/docs/concepts/config/#running-ghost-with-config-env-variables
# url -> url
# database__connection__host -> database.connection.host
docker run --rm -it \
  -v $PWD/ghost:/var/lib/ghost/content \
  -e url=http://localhost:2368 -p 2368:2368 \
  --name ghost ghost:alpine

# 本地安装
# https://ghost.org/docs/install/local/
npm install ghost-cli@latest -g
# https://ghost.org/docs/api/v3/ghost-cli/
# http://localhost:2368/ghosh
ghost install local
```
