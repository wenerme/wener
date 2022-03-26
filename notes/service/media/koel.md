---
title: koel
---

# koel

```bash
# https://github.com/koel/docker
docker run --rm -it \
  -p 80:80 \
  -e DB_CONNECTION=sqlite-persistent \
  -e DB_HOST=/data/db/koel.sqlite \
  -v $PWD/music:/music \
  -v $PWD/data/db:/data/db \
  -v $PWD/data/covers:/var/www/html/public/img/covers \
  -v $PWD/data/search-indexes:/var/www/html/storage/search-indexes \
  --name koel hyzual/koel
```

| env            | default          |
| -------------- | ---------------- | --------------------------------------- |
| DB_CONNECTION  | mysql            | mysql, pgsql, sqlsrv, sqlite-persistent |
| DB_HOST        | database         |
| DB_USERNAME    | koel             |
| DB_PASSWORD    |
| DB_DATABASE    | koel             |
| APP_KEY        |
| FORCE_HTTPS    |
| MEMORY_LIMIT   |
| LASTFM_API_KEY |
| APP_URL        | http://localhost |

- sqlite-persistent
  - DB_DATABASE 为文件位置 - 默认 database/koel.sqlite
- https://github.com/koel/koel/blob/master/config/database.php
- https://github.com/koel/koel/blob/v5.1.3/.env.example
