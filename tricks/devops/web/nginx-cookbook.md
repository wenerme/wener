---
id: nginx-cookbook
title: Nginx 常用配置
---

# Nginx 常用配置

## 主机映射
* [map](http://nginx.org/en/docs/http/ngx_http_map_module.html#map)

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

## Nginx 常用配置

```nginx
location / {
  add_header Content-Type text/html;
  return 200 'Glad you are here!';
}
```
