---
id: mirrors
title: Mirrors
---

# 镜像

## 镜像站点

| URL                                   | 地址     | 文档                                                   |
| ------------------------------------- | -------- | ------------------------------------------------------ |
| http://mirrors.aliyun.com             | 阿里云   |
| https://mirrors.tuna.tsinghua.edu.cn/ | 清华     |
| http://mirror.lzu.edu.cn/             | 兰州大学 |
| http://mirrors.163.com                | 网易     |
| http://mirrors.ustc.edu.cn/           | 科大     | [帮助文档](http://mirrors.ustc.edu.cn/help/index.html) |
| http://mirrors.xjtu.edu.cn/           | 西安交大 |
| https://mirror.azure.cn/              | Azure    |

## 镜像列表

| 名字   | 地址                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Alpine | [mirrors.yaml](https://git.alpinelinux.org/cgit/aports/tree/main/alpine-mirrors/mirrors.yaml)/[MIRRORS.txt](http://rsync.alpinelinux.org/alpine/MIRRORS.txt) |
| Debian | https://www.debian.org/mirror/list.zh-cn.html                                                                                                                |

## Docker
- docker.io
  - https://fogjl973.mirror.aliyuncs.com
  - https://8x40wsit.mirror.aliyuncs.com
  - https://f1361db2.m.daocloud.io
  - https://docker.mirrors.ustc.edu.cn
  - https://reg-mirror.qiniu.com
  - https://registry-1.docker.io
- gcr.io
- k8s.gcr.io -> gcr.io/google-containers
  - googlecontainersmirror - docker
  - registry.aliyuncs.com/google_containers
- quay.io
  - quay-mirror.qiniu.com
  - quay.mirrors.ustc.edu.cn

```bash
docker pull nginx:alpine
# 镜像
docker pull docker.mirrors.ustc.edu.cn/library/nginx:alpine
docker pull docker.mirrors.ustc.edu.cn/wener/base
```
