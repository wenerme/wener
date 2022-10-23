---
title: ctr
---

# ctr

- [containerd/cmd/ctr](https://github.com/containerd/containerd/tree/main/cmd/ctr)

```bash
ctr images pull quay.io/quay/redis:latest
ctr images ls
# ctr images import my-app.tar

# 查看镜像内容
ctr images mount docker.io/kennethreitz/httpbin:latest /tmp/httpbin
ctr images unmount /tmp/httpbin

# 删除镜像
ctr images remove docker.io/library/nginx:1.21

# 操作 containerd
# -> ctr container create -t docker.io/library/nginx:latest nginx_1
ctr run --rm -t docker.io/library/debian:latest cont1

ctr containers ls
ctr c ls

ctr task start -d nginx_1
ctr task ls
ctr task attach nginx_1
ctr task exec -t --exec-id bash_1 nginx_1 bash
ctr task kill -9 nginx_1
ctr task rm -f nginx_1

ctr container rm nginx_1
```
