---
tags:
  - Configuration
---

# Nginx

```bash
# 检查配置
nginx -c nginx.conf
```

```nginx
rewrite ^(.*)/$ $1/index.html permanent;

rewrite ^(.*)/index.html$ $1 permanent;

location = /index.html {
  rewrite  ^ / permanent;
  try_files /index.html =404;
}
```

- https://www.digitalocean.com/community/tools/nginx
- [digitalocean/nginxconfig.io](https://github.com/digitalocean/nginxconfig.io)
- https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
- https://stackoverflow.com/questions/44639182/nginx-proxy-amazon-s3-resources

```nginx
# root 支持使用 http_host 实现动态站点目录
root /data/sites/$http_host;

# alias 可以修改目录 - 相当于修改 root
location /i/ {
    alias /data/w3/images/;
}

error_page 404 /dist/$http_host/404.html;
location = /404.html {
    internal;
}
```

## ngx_http_core_module

http://nginx.org/en/docs/http/ngx_http_core_module.html

- `location [ = | ~ | ~* | ^~ ] uri`
  - 默认前缀匹配
  - `=` 完全匹配
  - `~` 大小写敏感正则
  - `~*` 大小写不敏感正则
  - `^~` 不匹配
  - 会选择最长匹配规则
- `resolver address ... [valid=time] [ipv6=on|off] [status_zone=zone];`

## ngx_http_rewrite_module

http://nginx.org/en/docs/http/ngx_http_rewrite_module.html

## ngx_http_proxy_module

http://nginx.org/en/docs/http/ngx_http_proxy_module.html

## ngx_http_log_module

http://nginx.org/en/docs/http/ngx_http_log_module.html
