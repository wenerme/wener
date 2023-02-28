---
title: Nginx 常用配置
tags:
  - Cookbook
---

# Nginx 常用配置

## 注意

- [rewrite](http://wiki.nginx.org/HttpRewriteModule#rewrite)
  - 如果替代字符串是 `http://` 打头，那么客户端会被重定向，之后的 rewrite 都会被中止
- auth
  - https://oauth2-proxy.github.io/oauth2-proxy/configuration#configuring-for-use-with-the-nginx-auth_request-directive

## 主机映射

- [map](http://nginx.org/en/docs/http/ngx_http_map_module.html#map)

```nginx
map $http_host $served_host {
    default $http_host;
    beta.example.com www.example.com;
}

server {
    # [...]

    location / {
        proxy_pass http://rubyapp.com;
        proxy_set_header Host $served_host;
    }
}
```

---

```nginx
map $request_uri $redirect_uri {
  ~/(?<lang>(en|de|fr))/oldname    /$lang/newname;
}
map $http_host $served_host {
    default $http_host;
    ~(?<name>[^.]+).example.com $name.example.net;
}
```

## 子域名重写

- `http://www.*.domain.com` -> `http://*.domain.com`

**#1**

```nginx
if ($host ~* www\.(.*)) {
  set $host_without_www $1;
  rewrite ^(.*)$ http://$host_without_www$1 permanent; # $1 contains '/foo', not 'www.mydomain.com/foo'
}
```

**#2**

```nginx
server {
  server_name www.domain.com;
  rewrite ^ http://domain.com$request_uri permanent;
}
```

## 替代域名

```nginx
server
{
  listen 80;
  server_name a.com b.com c.com;

  location ~* ^/comment/(.*) {
    proxy_set_header HOST shared.com;
    # $1 - stores capture from the location on top
    # $is_args will return ? if there are query params
    # $args stores query params
    proxy_pass http://comment/$1$is_args$args;
  }

}

server {
  listen 80;
  server shared.com;

  location / {
    # Proxy to some app handler
  }
}

upstream comment {
  server localhost; # or any other host essentially
}
```

## 基础配置

```nginx
user nginx;

worker_processes auto;
pcre_jit on;
error_log /var/log/nginx/error.log warn;
include /etc/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

# 路径重定向为参数
rewrite ^/article/(.*)$ /article.php?id=$1 last;
```

## 流配置

```nginx
stream {
    upstream quic_upstreams {
        server 10.66.2.1:443;
    }

    upstream http_upstreams {
        server 10.66.2.1:80;
    }

    upstream https_upstreams {
        server 10.66.2.1:443;
    }

    server {
        listen 443 udp;
        proxy_pass quic_upstreams;
        proxy_timeout 1s;
        proxy_responses 1;
        error_log logs/udp.log;
    }
    server {
        listen 80;
        proxy_pass http_upstreams;
        error_log logs/http.log;
    }
    server {
        listen 443;
        proxy_pass https_upstreams;
        error_log logs/https.log;
    }
}
```

## 匹配测试

```nginx
location / {
  add_header Content-Type text/html;
  return 200 'Glad you are here!';
}
```
