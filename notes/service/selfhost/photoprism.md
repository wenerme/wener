# photoprism

- [docker-compose.yml](https://dl.photoprism.org/docker/docker-compose.yml)
  - mariadb + photoprism
  - 端口 2342
  - /photoprism/originals - 照片
  - /photoprism/import - 导入 - 可选
  - /photoprism/storage - 存储
  - /home/photoprism/.cache/photoprism - 缓存
- [配置项](https://docs.photoprism.org/getting-started/config-options/)
- sidecar 文件
  - json - exif
  - yaml - 元信息备份
  - xmp

| env                           | val                      | desc                                                               |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------ |
| PHOTOPRISM_ADMIN_PASSWORD     | "insecure"               | PLEASE CHANGE , Your initial admin password (min 4 characters)     |
| PHOTOPRISM_HTTP_PORT          | 2342                     | Built-in Web server port                                           |
| PHOTOPRISM_HTTP_COMPRESSION   | "gzip"                   | Improves transfer speed and bandwidth utilization (none or gzip)   |
| PHOTOPRISM_DEBUG              | "false"                  | Run in debug mode (shows additional log messages)                  |
| PHOTOPRISM_PUBLIC             | "false"                  | No authentication required (disables password protection)          |
| PHOTOPRISM_READONLY           | "false"                  | Don't modify originals directory (reduced functionality)           |
| PHOTOPRISM_EXPERIMENTAL       | "false"                  | Enables experimental features                                      |
| PHOTOPRISM_DISABLE_WEBDAV     | "false"                  | Disables built-in WebDAV server                                    |
| PHOTOPRISM_DISABLE_SETTINGS   | "false"                  | Disables Settings in Web UI                                        |
| PHOTOPRISM_DISABLE_TENSORFLOW | "false"                  | Disables using TensorFlow for image classification                 |
| PHOTOPRISM_DARKTABLE_PRESETS  | "false"                  | Enables Darktable presets and disables concurrent RAW conversion   |
| PHOTOPRISM_DETECT_NSFW        | "false"                  | Flag photos as private that MAY be offensive (requires TensorFlow) |
| PHOTOPRISM_UPLOAD_NSFW        | "true"                   | Allow uploads that MAY be offensive                                |
| PHOTOPRISM_DATABASE_DRIVER    | "sqlite"                 | SQLite is an embedded database that doesn't require a server       |
| PHOTOPRISM_DATABASE_DRIVER    | "mysql"                  | Use MariaDB (or MySQL) instead of SQLite for improved performance  |
| PHOTOPRISM_DATABASE_SERVER    | "mariadb:3306"           | , MariaDB database server (hostname:port)                          |
| PHOTOPRISM_DATABASE_NAME      | "photoprism"             | MariaDB database schema name                                       |
| PHOTOPRISM_DATABASE_USER      | "photoprism"             | MariaDB database user name                                         |
| PHOTOPRISM_DATABASE_PASSWORD  | "insecure"               | MariaDB database user password                                     |
| PHOTOPRISM_SITE_URL           | "http://localhost:2342/" | Public PhotoPrism URL                                              |
| PHOTOPRISM_SITE_TITLE         | "PhotoPrism"             |
| PHOTOPRISM_SITE_CAPTION       | "Browse Your Life"       |
| PHOTOPRISM_SITE_DESCRIPTION   | ""                       |
| PHOTOPRISM_SITE_AUTHOR        | ""                       |

```bash
docker run --rm -it \
  -p 2342:2342 \
  -e PHOTOPRISM_DATABASE_DRIVER=sqlite \
  -e PHOTOPRISM_ADMIN_PASSWORD=password \
  -v $PWD/photos:/photoprism/originals \
  -v $PWD/data/photoprism/import:/photoprism/import \
  -v $PWD/data/photoprism/storage:/photoprism/storage \
  --name photoprism photoprism/photoprism:latest
```

