---
title: infisical
---

# infisical

- [infisical](https://github.com/Infisical/infisical)
  - MIT, NextJS, **MongoDB**

:::caution

- 目前存储只能 MongoDB

:::

```bash
export TELEMETRY_ENABLED=false

# SelfHost
wget -O .env https://raw.githubusercontent.com/Infisical/infisical/main/.env.example
wget -O docker-compose.yml https://raw.githubusercontent.com/Infisical/infisical/main/docker-compose.yml
mkdir nginx && cd nginx && wget -O default.conf https://raw.githubusercontent.com/Infisical/infisical/main/nginx/default.dev.conf
cd ..

nano .env

docker-compose -f docker-compose.yml up -d

# 命令行
brew install infisical/get-cli/infisical

# 在不 login 的方式下使用
export INFISICAL_TOKEN

infisical export > .env

docker run -p 80:80 \
  -e ENCRYPTION_KEY= \
  -e JWT_SIGNUP_SECRET= \
  -e JWT_REFRESH_SECRET= \
  -e JWT_AUTH_SECRET= \
  -e JWT_SERVICE_SECRET= \
  -e MONGO_URL= \
  -e REDIS_URL= \
  infisical/infisical:latest
```
