---
tags:
  - Admin
  - WebUI
---

# nginx-proxy-manager

- [NginxProxyManager/nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
  - MIT, JS
  - NPM - nginx-proxy-manager
  - Docker container for managing Nginx proxy hosts with a simple, powerful interface

```bash
# http://127.0.0.1:81
# admin@example.com
# changeme
docker run --rm -it \
  -p 80:80 \
  -p 443:443 \
  -p 81:81 \
  -v $PWD/data:/data \
  -v $PWD/letsencrypt:/etc/letsencrypt \
  -e TZ=Asia/Shanghai \
  --name nginx-proxy-manager \
  jc21/nginx-proxy-manager
```

```
DB_POSTGRES_HOST: 'db'
DB_POSTGRES_PORT: '5432'
DB_POSTGRES_USER: 'npm'
# __FILE
DB_POSTGRES_PASSWORD: 'npmpass'
DB_POSTGRES_NAME: 'npm'

DB_MYSQL_HOST: "db"
DB_MYSQL_PORT: 3306
DB_MYSQL_USER: "user"
DB_MYSQL_PASSWORD: "pass"
DB_MYSQL_NAME: "nginx"

DB_SQLITE_FILE=/data/database.sqlite

X_FRAME_OPTIONS=deny
DISABLE_IPV6
IP_RANGES_FETCH_ENABLED=false

# 自动设置 ADMIN 用户
INITIAL_ADMIN_EMAIL: my@example.com
INITIAL_ADMIN_PASSWORD: mypassword1
```

- ./logrotate.custom:/etc/logrotate.d/nginx-proxy-manager

/data/nginx/custom/root_top.conf: Included at the top of nginx.conf
/data/nginx/custom/root.conf: Included at the very end of nginx.conf
/data/nginx/custom/http_top.conf: Included at the top of the main http block
/data/nginx/custom/http.conf: Included at the end of the main http block
/data/nginx/custom/events.conf: Included at the end of the events block
/data/nginx/custom/stream.conf: Included at the end of the main stream block
/data/nginx/custom/server_proxy.conf: Included at the end of every proxy server block
/data/nginx/custom/server_redirect.conf: Included at the end of every redirection server block
/data/nginx/custom/server_stream.conf: Included at the end of every stream server block
/data/nginx/custom/server_stream_tcp.conf: Included at the end of every TCP stream server block
/data/nginx/custom/server_stream_udp.conf: Included at the end of every UDP stream server block
/data/nginx/custom/server_dead.conf:  Included at the end of every 404 server block


/data/nginx/custom/root_top.conf

```
load_module /usr/lib/nginx/modules/ngx_http_geoip2_module.so;
load_module /usr/lib/nginx/modules/ngx_stream_geoip2_module.so;
```
