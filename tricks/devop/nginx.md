# NGINX

## 主要内容
### 管理
### 代理和缓存
### 重写和访问控制
### 管理出入流
### 性能调优

## Example
```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
```

## Tips

* `/usr/share/nginx/html` 静态文件目录
* `/etc/nginx/nginx.conf` 配置目录
* `/etc/nginx/conf.d/*.conf` 其他的配置目录
* `/var/log/nginx/access.log` 日志

```bash
# Homebrew Install
brew install nginx --with-gunzip --with-debug --with-http2 --with-libressl --with-passenger --with-webdav
# 额外模块
brew tap homebrew/nginx
# 也可以使用 nginx-full 来安装模块
brew info nginx-full
```


## Reference
* [agentzh's Nginx Tutorials ](http://openresty.org/download/agentzh-nginx-tutorials-en.html)
* [Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
* [模块列表](https://www.nginx.com/resources/wiki/modules/)
* [Ngx PageSpeed](http://ngxpagespeed.com/)
* [Doc](http://nginx.org/en/docs/)
* [NGINX Reverse Proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/)
* [NAXSI](https://github.com/nbs-system/naxsi)
   * is an open-source, high performance, low rules maintenance WAF for NGINX
   * NAXSI means Nginx Anti XSS & SQL Injection.
<!-- DONE -->
