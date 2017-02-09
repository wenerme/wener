# Image

## Alpine

* https://github.com/smebberson/docker-alpine
* http://mirrors.aliyun.com/alpine/latest-stable/

### base
```Dockerfile
FROM        alpine:latest
MAINTAINER  wener <wener@wener.me>

RUN echo http://mirrors.aliyun.com/alpine/latest-stable/main/ > /etc/apk/repositories; \
    echo http://mirrors.aliyun.com/alpine/latest-stable/community/ >> /etc/apk/repositories

# Base tools
RUN apk add --no-cache openssh-client curl busybox

RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
```
