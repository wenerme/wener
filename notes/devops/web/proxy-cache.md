---
title: 反向代理缓存
---

# Reverse proxy cache

:::tip

推荐 nginx - poor man's cdn.

:::

- varnish
  - 默认内存缓存
  - 可 mmap 为文件 - 所有缓存在一起 - 重启会失效
  - pro 版本更多存储选项
- nginx
  - proxy_cache_path
  - 逐文件缓存 - 重启后还是有效
  - 文件名为 md5(cache_key)
  - 默认 levels=3
- haproxy - cache
  - 内存缓存
  - total-max-size
  - max-object-size
  - max-age
  - `http-request cache-use mycache`
  - `http-response cache-store mycache`
  - Cache 要求
    - HTTP 1.1 GET 200
  - HTTP cache improvements [haproxy#214](https://github.com/haproxy/haproxy/issues/214)
- [jiangwenyuan/nuster](https://github.com/jiangwenyuan/nuster)

## Varnish

```bash
varnishd -a 127.0.0.1:8080 -b 185.199.109.153:80 -T 127.0.0.1:6082 -d -S $PWD/varnish-secret
# 因为 -d 所以需要手动启动
varnishadm -S $PWD/varnish-secret -T 127.0.0.1:6082 start

curl -H 'Host: wener.me' 127.0.0.1:8080
```

## NGINX

```nginx
user nginx;

worker_processes auto;
pcre_jit on;
error_log /dev/stdout warn;

events {
    worker_connections 1024;
}

http {
  # https://serverfault.com/a/912897
  # HIT, MISS, BYPASS, EXPIRED
  log_format cache_st '$remote_addr - $upstream_cache_status [$time_local]  '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';
  access_log /dev/stdout cache_st;

  proxy_cache_path  /tmp/nginx-cache levels=1:2 keys_zone=static:8m max_size=1000m inactive=600m;
  proxy_temp_path /tmp/nginx-cache-tmp;


  server {
    listen 8080;

    location / {
      proxy_pass http://185.199.109.153;
      proxy_set_header Host $host;
      proxy_cache static;
      proxy_cache_valid  200 302  60m;
      proxy_cache_valid  404      1m;
    }
  }
}
```

```bash
nginx -c $PWD/nginx.conf -g 'daemon off;'
```

- https://www.sheshbabu.com/posts/nginx-caching-proxy/

## HAProxy

```haproxy
frontend http
  mode http
  bind 0.0.0.0:8080 name v4
  default_backend gh
backend gh
  http-request cache-use mycache
  http-response cache-store mycache
  server svr 185.199.109.153:80 check

cache mycache
  total-max-size 4095   # MB
  max-object-size 10000 # bytes
  max-age 30            # seconds
```

## HTTP Cache 类型 {#http-cache-types}

- Page cache - 通常为 HTML
- Browser cache - 资源
- Object cache - 数据库查询
- Bytecode cache - PHP, JS
- CDN cache - HTML, Image, CSS, JS
- Reverse proxy cache - 发生在反向代理层

## Caching

- Cloudflare
  - 基于 extension 缓存而不是 mime
    - 默认不缓存 html
  - 可通过 Page Rule 添加缓存
    - 缓存所有 - Page Rule
      - `charts.wener.tech/*`
      - Cache Level: Cache Everything
  - 默认会缓存 robots.txt
  - CF-Cache-Status
    - DYNAMIC - 认为是动态内容，不会缓存

```bash
curl -I -H 'Host: charts.wener.tech' 185.199.108.153/wener/index.yaml
curl -I https://charts.wener.tech/wener/index.yaml
```

- Github Pages
  - `CacheControl: max-age=600`
- https://gtmetrix.com/
- https://web.dev/measure/
- https://pagespeed.web.dev/
- https://developers.cloudflare.com/cache/about/default-cache-behavior/
