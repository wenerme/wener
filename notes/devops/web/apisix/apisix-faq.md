---
tags:
  - FAQ
---

# APISIX FAQ

## failed to process entries: 20: unable to get local issuer certificate, context: ngx.timer

```yaml
ssl_verify: false
```

**配置 CA**

```yaml
apisix:
  ssl:
    ssl_trusted_certificate: /path/to/certs/ca-certificates.crt
```

- elasticsearch-logger
- https://apisix.apache.org/docs/apisix/FAQ/#how-do-i-fix-the-error-unable-to-get-local-issuer-certificate-in-apache-apisix
- https://github.com/apache/apisix/issues/4370

## removing batch processor stale object

- 不会丢失数据，只是清理过期的 processor
- remove stale objects from the memory after timer expires
- 30min
- ngx.timer.at
  - https://moonbingbing.gitbooks.io/openresty-best-practices/content/ngx_lua/timer.html
  - https://github.com/openresty/lua-nginx-module
- https://github.com/apache/apisix/blob/b024f683ef6f5310a180cdb6f792365e4c78f33a/apisix/utils/batch-processor-manager.lua#L52-L67

## an upstream response is buffered to a temporary file

超出 proxy_buffer_size 后写入临时文件

没问题

```
proxy_buffer_size 4k; # 默认 4k or 8k
# proxy_buffers number size;
proxy_buffers 8 4k;  # 默认 4k or 8k

proxy_max_temp_file_size 1024m
```

- http://nginx.org/en/docs/http/ngx_http_proxy_module.html

## tls: failed to verify certificate: x509: certificate signed by unknown authority

```
2023-12-21T18:50:39Z	error	apisix/route.go:90	failed to list routes: Get "https://apisix-control-plane:9180/apisix/admin/routes": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
2023-12-21T18:50:39Z	error	apisix/cluster.go:298	failed to list routes in APISIX: Get "https://apisix-control-plane:9180/apisix/admin/routes": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
2023-12-21T18:50:39Z	error	apisix/plugin.go:46	failed to list plugins' names: Get "https://apisix-control-plane:9180/apisix/admin/plugins?all=true": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
2023-12-21T18:50:39Z	error	apisix/cluster.go:483	failed to list plugin names in APISIX: Get "https://apisix-control-plane:9180/apisix/admin/plugins?all=true": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
2023-12-21T18:50:39Z	error	apisix/cluster.go:446	failed to sync schema: Get "https://apisix-control-plane:9180/apisix/admin/plugins?all=true": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
2023-12-21T18:50:41Z	error	apisix/route.go:90	failed to list routes: Get "https://apisix-control-plane:9180/apisix/admin/routes": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "apisix-ca")
```
