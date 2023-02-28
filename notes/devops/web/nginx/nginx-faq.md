---
title: Nginx FAQ
tags:
  - FAQ
---

# Nginx FAQ

## a client request body is buffered to a temporary file

- client_body_buffer_size

## 重定向没有端口

```conf
# 使用 http_host
proxy_set_header Host $http_host;
# 或者
proxy_set_header Host $host:$server_port;
```

## $request_uri vs $uri

- `$request_uri` - 保留查询参数，`?` 部分
- `$uri` - 只有路径

## $host vs $http_host

- $host
  - 模块定义变量
  - 可能是 HTTP Host 头
    - 此时与 `$http_host` 类似
    - 小写，没有端口
  - 可能是 URL 中的 HOST
  - 可能是 第一个 server_name
  - 如果 server_name 包含正则，那么 $host 也会 - 导致出现难看的路径
  - `$server_name` 总是第一个 `server_name`
  - 可能不包含 port
- $http_host
  - 通过 [$http_HEADER](http://nginx.org/en/docs/http/ngx_http_core_module.html#variables) 定义
  - 与 HTTP 头中信息保持一致
  - 包含 port

## ssl passthrough

**by sni**

```bash
nginx -V | grep stream_ssl_preread_module
```

```conf
stream {

  map $ssl_preread_server_name $targetBackend {
    ab.mydomain.com  upstream1.example.com:443;
    xy.mydomain.com  upstream2.example.com:443;
  }

  server {
    listen 443;

    proxy_connect_timeout 1s;
    proxy_timeout 3s;
    resolver 1.1.1.1;

    proxy_pass $targetBackend;
    ssl_preread on;
  }
}
```

- https://gist.github.com/kekru/c09dbab5e78bf76402966b13fa72b9d2

**by stream**

```conf
stream {
  server {
    listen 443;
    proxy_pass backend.example.com:443;
  }
}
```
