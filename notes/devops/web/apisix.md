---
title: Apache APISIX
---

# Apache APISIX

- [apache/apisix](https://github.com/apache/apisix)
  - Apache-2.0, Lua+Nginx/openresty+etcd
  - 支持 Golang 插件
- 参考
  - [Admin API](https://apisix.apache.org/docs/apisix/admin-api)
    - X-API-KEY
  - [apache/apisix-docker](https://github.com/apache/apisix-docker)
  - [apache/apisix-helm-chart](https://github.com/apache/apisix-helm-chart)

```bash
# 官方建议自行构建
# APISIX_VERSION=2.9 make build-on-alpine-cn
# apache/apisix:2.9-alpine

# make build-all-in-one
docker run -d \
  -p 9080:9080 -p 9091:9091 -p 2379:2379 \
  -v $PWD/all-in-one/apisix/config.yaml:/usr/local/apisix/conf/config.yaml \
  apache/apisix:whole

# make build-dashboard
docker run -d \
  -p 19080:9080 -p 19091:9091 -p 12379:2379 -p 19000:9000 \
  -v `pwd`/all-in-one/apisix/config.yaml:/usr/local/apisix/conf/config.yaml \
  -v `pwd`/all-in-one/apisix-dashboard/conf.yaml:/usr/local/apisix-dashboard/conf/conf.yaml \
  apache/apisix-dashboard:whole
```

```yaml title="prometheus port 9091"
plugin_attr:
  prometheus:
    export_addr:
      ip: '0.0.0.0'
      port: 9091
```
