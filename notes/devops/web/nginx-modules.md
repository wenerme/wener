---
title: Nginx Modules
---

# Nginx Modules

## ngx_http_core_module - HTTP 核心模块

- [ngx_http_core_module](http://nginx.org/en/docs/http/ngx_http_core_module.html)
- 上下文
  - main
    - http
      - server
        - location

## ngx_http_proxy_module - HTTP 代理

- [ngx_http_proxy_module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- proxy_pass
  - 默认不校验证书 - `proxy_ssl_verify on`
- 参考
  - [Nginx: Everything about proxy_pass](https://dev.to/danielkun/nginx-everything-about-proxypass-2ona)

```nginx
# 日志记录上游 - 方便排查
log_format upstream_logging '[$time_local] $remote_addr - $remote_user - $server_name to: $upstream: $request upstream_response_time $upstream_response_time msec $msec request_time $request_time';
access_log /dev/stdout upstream_logging;

# 可以在 upsteam 不可用的时候也能启动
set $upstream https://localhost:5000;
proxy_pass $upstream/api/;

# 会包含 url 参数
proxy_pass http://127.0.0.1:5000/api/webapp/;
# 等同于
proxy_pass http://localhost:5000/api$request_uri;
# 去掉参数
proxy_pass http://localhost:5000/api$uri;
```

## ngx_http_rewrite_module - HTTP 重写

- [ngx_http_rewrite_module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)
- break - 中断当前重写指令
- if - 条件控制
  - 逻辑 `=` `!=`
    - 空字符串或 `"0"` 为 false
  - 匹配 `~` `~*` `!~` `!~*`
    - 如果包含 `}` 或 `;` 使用双引号括起来
  - 文件 `-f` `!-f`
  - 目录 `-d` `!-d`
  - 文件目录符号 `-e` `!-e`
  - 可执行 `-x` `!-x`
- return - 停止处理立即返回
  - 重定向 - 301, 302, 303, 307, 308
  - 关闭链接 - 444
  - 返回内容
  - 302 应该以 `http://`, `https://`, `$scheme` 开头
- rewrite - 匹配并替换 URL
  - flag 参数
    - last - 停止处理当前重定向从新搜索匹配
    - break - 停止处理
    - redirect - 302 重定向 - 如果替换不是以 `http://`, `https://`, `$scheme` 开头
    - permanent - 301 重定向
- rewrite_log
- `set $variable value`
- 参考
  - [If is Evil... when used in location context](https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/)
  - [Converting rewrite rules](http://nginx.org/en/docs/http/converting_rewrite_rules.html)
  - [Pitfalls and Common Mistakes](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/)
  - [Creating NGINX Rewrite Rules](https://www.nginx.com/blog/creating-nginx-rewrite-rules/)

## ngx_http_map_module

- [ngx_http_map_module](http://nginx.org/en/docs/http/ngx_http_map_module.html)
  - http 上下文
  - map
    - 参数
      - `default value` - 默认值
      - `hostnames` - 主机名匹配 - 支持 `*.example.net` 这样的前缀后缀
      - `include file` - 引入文件
      - `volatile` - 不缓存变量
    - 匹配
      - `~` 大小写敏感正则
      - `~*` 大小写 _不_ 敏感正则
- 类似于 switch - 创建新的变量
- 变量在用到的时候才会求值，因此不会增加处理负担

```nginx
# 映射路径
map $request_uri $redirect_uri {
  ~/(?<lang>(en|de|fr))/oldname    /$lang/newname;
}
# 映射域名
map $http_host $served_host {
    default $http_host;
    ~(?<name>[^.]+).example.com $name.example.net;
}
```

## ngx_http_addition_module - 附加内容

- [ngx_http_addition_module](http://nginx.org/en/docs/http/ngx_http_addition_module.html)
- `add_before_body uri`
  - 在消息体之前
- `add_after_body uri`
  - 在消息体之后
- `addition_types mime-type`
  - 默认 `text/html`

```nginx
location / {
    # 请求前置和后置添加到内容
    add_before_body /before_action;
    add_after_body  /after_action;
}
```

## TODO

http://nginx.org/en/docs/stream/ngx_stream_js_module.html
http://nginx.org/en/docs/njs/index.html
http://nginx.org/en/docs/http/ngx_http_js_module.html
http://nginx.org/en/docs/njs/reference.html
