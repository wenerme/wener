---
title: AppWrite
---

# AppWrite

- [appwrite/appwrite](https://github.com/appwrite/appwrite)
  - BSD-3, PHP+TypeScript
  - 只支持 MySQL

```bash
# 通过 docker 启动额外服务
# https://appwrite.io/install/compose
# https://appwrite.io/install/env
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
  --entrypoint="install" \
  appwrite/appwrite:1.2.1
```

##
- _APP_CONSOLE_WHITELIST_EMAILS
- _APP_OPTIONS_ABUSE
- https://appwrite.io/docs/environment-variables

## Inside

- https://github.com/appwrite/appwrite/blob/master/Dockerfile
- https://github.com/appwrite/appwrite/blob/master/app/tasks/install.php

```bash
# entrypoint
# vars doctor maintenance install migrate sdks specs ssl usage version
alias cli="php /usr/src/code/app/cli.php"
cli version

php /usr/src/code/app/cli.php doctor
php /usr/src/code/app/cli.php vars

php /usr/src/code/app/cli.php maintenance

env | grep _APP | sort

# 默认入口
php app/http.php -dopcache.preload=opcache.preload=/usr/src/code/app/preload.php
```

- install
  - 生成 /usr/src/code/appwrite/docker-compose.yml
  - 生成 /usr/src/code/appwrite/.env

:::note

- 支持 PostgreSQL [#2541](https://github.com/appwrite/appwrite/issues/2541)
  - [utopia-php/database](https://github.com/utopia-php/database)
- Minio https://github.com/appwrite/appwrite/issues/3989

:::

# FAQ

## The current project has exceeded the maximum number of users. Please check your user limit in the Appwrite console.

- _APP_CONSOLE_WHITELIST_ROOT
