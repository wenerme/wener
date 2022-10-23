---
title: NGINX Cache
---

# NGINX Cache


```nginx
http {
    proxy_cache_path /data/nginx/cache keys_zone=mycache:10m;
    server {
        proxy_cache mycache;
        location / {
            proxy_pass http://localhost:8000;
        }
    }
}
```

- [proxy_cache](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache)
- https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/
