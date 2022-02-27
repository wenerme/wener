---
title: Mirrors
---

# 镜像

## 镜像站点

| URL                                  | 地址           | 文档                                                   |
| ------------------------------------ | -------------- | ------------------------------------------------------ |
| https://mirrors.aliyun.com           | 阿里云         |
| https://mirrors.tuna.tsinghua.edu.cn | 清华           |
| https://mirror.lzu.edu.cn            | 兰州大学       |
| https://mirrors.163.com              | 网易           |
| https://mirrors.ustc.edu.cn          | 科大           | [帮助文档](http://mirrors.ustc.edu.cn/help/index.html) |
| https://mirrors.xjtu.edu.cn          | 西安交大       |
| https://mirror.azure.cn/             | Azure          |
| https://mirrors.sjtug.sjtu.edu.cn    | 上海交大       |
| https://mirrors.huaweicloud.com      | 华为           |
| https://mirrors.bfsu.edu.cn/         | 北京外国语大学 |

## Github

- https://gitcode.net
  - https://gitcode.net/mirrors/protocolbuffers/protobuf/-/releases/v3.19.1
- https://ghproxy.com
  - https://github.com/hunshcn/gh-proxy

## Apache

- https://mirror.sjtu.edu.cn/apache

## 镜像列表

| 名字   | 地址                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Alpine | [mirrors.yaml](https://git.alpinelinux.org/cgit/aports/tree/main/alpine-mirrors/mirrors.yaml)/[MIRRORS.txt](http://rsync.alpinelinux.org/alpine/MIRRORS.txt) |
| Debian | https://www.debian.org/mirror/list.zh-cn.html                                                                                                                |

## NPM

- https://registry.npmjs.org
- http://r.cnpmjs.org
- http://registry.npm.taobao.org
- https://mirrors.sjtug.sjtu.edu.cn/npm-registry
- https://repo.huaweicloud.com/repository/npm
- https://mirrors.huaweicloud.com/repository/npm

```ini
chromedriver_cdnurl=https://repo.huaweicloud.com/chromedriver
disturl=https://repo.huaweicloud.com/nodejs
electron_mirror=https://repo.huaweicloud.com/electron/
operadriver_cdnurl=https://repo.huaweicloud.com/operadriver
phantomjs_cdnurl=https://repo.huaweicloud.com/phantomjs
python_mirror=https://repo.huaweicloud.com/python
sass_binary_site=https://repo.huaweicloud.com/node-sass
```

```ini
chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
disturl=https://npm.taobao.org/dist
electron_mirror=http://cdn.npm.taobao.org/dist/electron
fse_binary_host_mirror=https://npm.taobao.org/mirrors/fsevents
operadriver_cdnurl=http://cdn.npm.taobao.org/dist/operadriver
phantomjs_cdnurl=http://cdn.npm.taobao.org/dist/phantomjs
sass_binary_site=http://cdn.npm.taobao.org/dist/node-sass
```

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
