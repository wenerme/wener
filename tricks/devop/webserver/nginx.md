# NGINX


## Tips

* `/usr/share/nginx/html` 静态文件目录
* `/etc/nginx/nginx.conf` 配置目录
* `/etc/nginx/conf.d/*.conf` 其他的配置目录
* `/var/log/nginx/access.log` 日志
* [核心变量](http://nginx.org/en/docs/http/ngx_http_core_module.html#variables)
* 可在日志中使用 `$request_time $upstream_response_time` 来记录访问使用时间
* [ngx_http_auth_request_module](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html)
  * 可将授权交由其他请求处理
  * [教程](https://developers.shopware.com/blog/2015/03/02/sso-with-nginx-authrequest-module/)

* Reference
  * [agentzh's Nginx Tutorials ](http://openresty.org/download/agentzh-nginx-tutorials-en.html)
  * [Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
  * [第三方模块列表](https://www.nginx.com/resources/wiki/modules/)
  * [Ngx PageSpeed](http://ngxpagespeed.com/)
  * [Doc](http://nginx.org/en/docs/)
  * [NGINX Reverse Proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/)
  * [NAXSI](https://github.com/nbs-system/naxsi)
     * is an open-source, high performance, low rules maintenance WAF for NGINX
     * NAXSI means Nginx Anti XSS & SQL Injection.


```bash
# Homebrew Install
brew install nginx --with-gunzip --with-debug --with-http2 --with-libressl --with-passenger --with-webdav
# 额外模块
brew tap homebrew/nginx
# 也可以使用 nginx-full 来安装模块
brew info nginx-full
```

### 常用配置

### Websocket 反向代理
```nginx
location /chat/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

也可以直接使用客户端的参数

```nginx
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        # ...

        location /chat/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
}
```

简单暴力的映射

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name $http_host;
    root /sites/$http_host;
}
```

```bash
docker run --rm -it -v $PWD:/sites -v $PWD/sites.conf:/etc/nginx/conf.d/default.conf -p 8080:80 --name web wener/nginx
```



## 主要内容
### 管理
### 代理和缓存
### 重写和访问控制
### 管理出入流
### 性能调优

## listen
http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
```
listen address[:port] [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
listen port [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
listen unix:path [default_server] [ssl] [http2 | spdy] [proxy_protocol] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
```
