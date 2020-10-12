## $request_uri vs $uri
* `$request_uri` - 保留查询参数，`?` 部分
* `$uri` - 只有路径

## $host vs $http_host

* $host
  * 模块定义变量
  * 可能是 HTTP Host 头
    * 此时与 `$http_host` 类似
    * 小写，没有端口
  * 可能是 URL 中的 HOST
  * 可能是 第一个 server_name
  * 如果 server_name 包含正则，那么 $host 也会 - 导致出现难看的路径
  * `$server_name` 总是第一个 `server_name`
* $http_host
  * 通过 [$http_HEADER](http://nginx.org/en/docs/http/ngx_http_core_module.html#variables) 定义
  * 与 HTTP 头中信息保持一致
