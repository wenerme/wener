---
title: Mirrors
---

# 镜像

:::caution

- Aliyun 提供非常多的镜像，但质量堪忧
  - docker latest tag 可能不同步，并且没办法触发同步
  - linux os 的包可能同步延迟几天
  - npm 需要手动同步
- 国内大学镜像 可能 特殊时期 直接关停

:::

## 镜像站点

| URL                                | 地址   |
| ---------------------------------- | ------ |
| https://mirrors.aliyun.com         | 阿里云 |
| https://mirrors.163.com            | 网易   |
| https://mirror.azure.cn/           | Azure  |
| https://mirrors.huaweicloud.com    | 华为   |
| https://mirrors.cloud.tencent.com/ | 腾讯云 |

**高校镜像**

| URL                                   | 地址             | 信息                                |
| ------------------------------------- | ---------------- | ----------------------------------- |
| https://mirror.bjtu.edu.cn/           | 北京交通大学     |
| https://mirror.cqupt.edu.cn/          | 重庆邮电大学     |
| https://mirror.dlut.edu.cn/           | 大连理工大学     |
| https://mirror.ihep.ac.cn/            | 高能物理研究所   |
| https://mirror.lzu.edu.cn             | 兰州大学         |
| https://mirror.lzu.edu.cn/            | 兰州大学         |
| https://mirror.neu.edu.cn/            | 东北大学         |
| https://mirror.nyist.edu.cn/          | 南阳理工学院     |
| https://mirrors.bfsu.edu.cn/          | 北京外国语大学   |
| https://mirrors.bfsu.edu.cn/          | 北京外国语大学   |
| https://mirrors.bit.edu.cn/web/       | 北京理工大学     |
| https://mirrors.cqu.edu.cn/           | 重庆大学         |
| https://mirrors.dgut.edu.cn/          | 东莞理工学院     |
| https://mirrors.hit.edu.cn/#/home     | 哈尔滨工业大学   |
| https://mirrors.neusoft.edu.cn/       | 大连东软信息学院 |
| https://mirrors.nju.edu.cn/           | 南京大学         |
| https://mirrors.nwafu.edu.cn/         | 西北农林科技大学 |
| https://mirrors.pku.edu.cn/           | 北京大学         |
| https://mirrors.scau.edu.cn/          | 华南农业大学     |
| https://mirrors.sdu.edu.cn/           | 山东大学         |
| https://mirrors.sjtug.sjtu.edu.cn/    | 上海交通大学     | https://sjtug.org/post/mirror-news/ |
| https://mirrors.sustech.edu.cn/       | 南方科技大学     |
| https://mirrors.tongji.edu.cn/        | 同济大学         |
| https://mirrors.tuna.tsinghua.edu.cn/ | 清华大学         |
| https://mirrors.ustc.edu.cn/          | 中国科学技术大学 |
| https://mirrors.xjtu.edu.cn           | 西安交大         |
| https://mirrors.ynu.edu.cn/           | 云南大学         |
| https://mirrors.zju.edu.cn/           | 浙江大学         |

- https://github.com/SUSTech-CRA/chinese-opensource-mirror-site
- https://mirrors.cernet.edu.cn/list

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
  - https://hub-mirror.c.163.com
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

tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://fogjl973.mirror.aliyuncs.com","https://f1361db2.m.daocloud.io","https://docker.mirrors.ustc.edu.cn"]
}
EOF
```

## HomeBrew

- brew.git - `$(brew --repo)`
  - https://github.com/Homebrew/brew.git
  - https://mirrors.aliyun.com/homebrew/brew.git
- homebrew-core.git - `$(brew --repo)/Library/Taps/homebrew/homebrew-core`
  - https://github.com/Homebrew/homebrew-core.git
  - https://mirrors.aliyun.com/homebrew/homebrew-core.git
- HOMEBREW_BOTTLE_DOMAIN
  - https://homebrew.bintray.com/bottles
  - https://mirrors.sjtug.sjtu.edu.cn/homebrew-bottles
  - https://mirrors.aliyun.com/homebrew/homebrew-bottles
- 其他
  - https://ghcr.io/v2/homebrew/core/protobuf/manifests/21.6

## GOPROXY

- 默认 proxy.golang.org
- https://proxy.golang.com.cn
- https://mirrors.aliyun.com/goproxy
