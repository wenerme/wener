---
title: Mirrors
tags:
  - Mirror
---

# 镜像

:::caution

- Aliyun
  - **限速严重** - 阿里云内网使用快，外网使用非常慢
    - 不在阿里云内网推荐 TUNA 或 USTC
    - TUNA 因为使用人数太多，高峰期可能也会慢
  - 提供非常多的镜像，但质量(延迟)堪忧
  - 长期来说，阿里云是最可靠的
  - docker latest tag 可能不同步，并且没办法触发同步
  - linux os 的包可能同步延迟几天
  - npm 需要手动同步
- tuna~=aliyun ~= ustc - 大多是一样的
- 国内大学镜像 可能 特殊时期 **直接关停**
  - 偶尔出现网络维护，一维护就是 2-3 天
  - 大学的话尽量选择 TUNA 或者 USTC 相对稳定

:::

## 国内镜像站点 {#cn}

| URL                                | 地址   | 内网                 |
| ---------------------------------- | ------ | -------------------- |
| https://mirrors.aliyun.com         | 阿里云 | mirrors.aliyuncs.com |
| https://mirrors.163.com            | 网易   |
| https://mirror.azure.cn/           | Azure  |
| https://mirrors.huaweicloud.com    | 华为   |
| https://mirrors.cloud.tencent.com/ | 腾讯云 |
| https://mirrors.gitee.com/         | Gitee  |
| https://mirror.baidu.com           | 百度   |

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
| https://mirrors.sjtug.sjtu.edu.cn/    | 上海交通大学     | https://sjtug.org/tags/mirror-news/ |
| https://mirrors.sustech.edu.cn/       | 南方科技大学     |
| https://mirrors.tongji.edu.cn/        | 同济大学         |
| https://mirrors.tuna.tsinghua.edu.cn/ | 清华大学         |
| https://mirrors.ustc.edu.cn/          | 中国科学技术大学 |
| https://mirrors.xjtu.edu.cn           | 西安交大         |
| https://mirrors.ynu.edu.cn/           | 云南大学         |
| https://mirrors.zju.edu.cn/           | 浙江大学         |

- https://github.com/SUSTech-CRA/chinese-opensource-mirror-site
- https://mirrors.cernet.edu.cn/list

## 官方 {#official}

| site                                              | for                 |
| ------------------------------------------------- | ------------------- |
| https://mirrors.kernel.org/                       | Linux               |
| https://mirrors.edge.kernel.org/pub/linux/kernel/ | Linux Source        |
| https://mirrors.alpinelinux.org/                  | Alpine Linux Mirror |
| https://dl-cdn.alpinelinux.org/alpine/            | Alpine Linux Repo   |
| https://www.debian.org/mirror/list.zh-cn.html     | Debian              |

- mirrors.kernel.org = mirrors.edge.kernel.org

<!--   | Alpine                                        | [mirrors.yaml](https://git.alpinelinux.org/cgit/aports/tree/main/alpine-mirrors/mirrors.yaml)/[MIRRORS.txt](http://rsync.alpinelinux.org/alpine/MIRRORS.txt) | -->

## jsdelivr

- https://fastly.jsdelivr.net
- https://cnd.jsdelivr.net
- https://testingcf.jsdelivr.net
- https://jsdelivr.wener.cc
- https://github.com/54ayao/Chinajsdelivr
  - jsd.cdn.zzko.cn

## Github

- https://gitcode.net
  - https://gitcode.net/mirrors/protocolbuffers/protobuf/-/releases/v3.19.1
- https://ghproxy.com
  - https://github.com/hunshcn/gh-proxy

## Apache

- https://mirror.sjtu.edu.cn/apache

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

## Docker Image

- docker.io
  - docker.m.daocloud.io
    - 白名单制
    - https://github.com/DaoCloud/public-image-mirror/issues/2328
  - ~~https://fogjl973.mirror.aliyuncs.com~~
  - ~~https://8x40wsit.mirror.aliyuncs.com~~
  - https://registry-1.docker.io
    - production.cloudflare.docker.com
      - 偶尔通
  - https://hub-mirror.c.163.com
  - ~~https://docker.mirrors.ustc.edu.cn~~
  - ~~https://f1361db2.m.daocloud.io~~
  - ~~https://reg-mirror.qiniu.com~~
  - 参考
    - -> https://production.cloudflare.docker.com/registry-v2/docker/registry/v2/blobs/sha256/1c/1c4cc75be746862b262b81a1f45042849da7c12c8ba87ceb1a50fc3e90b78f79/data
- gcr.io
  - gcr.m.daocloud.io
- k8s.gcr.io -> gcr.io/google-containers
  - k8s-gcr.m.daocloud.io
  - registry.aliyuncs.com/google_containers
  - ~~googlecontainersmirror - docker hub~~
- registry.k8s.io
  - k8s.m.daocloud.io
  - https://github.com/kubernetes/registry.k8s.io
- quay.io
  - quay.m.daocloud.io
  - quay-mirror.qiniu.com
  - quay.mirrors.ustc.edu.cn
- public.ecr.aws
- 参考
  - Docker Hub 镜像加速器 https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6

```bash
docker pull nginx:alpine
# 镜像
docker pull docker.mirrors.ustc.edu.cn/library/nginx:alpine
docker pull docker.mirrors.ustc.edu.cn/wener/base
# 南京大学
docker pull docker.nju.edu.cn/wener/base:latest

tee /etc/docker/daemon.json <<- 'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockercr.wener.me",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF
```

```yaml
mirrors:
  docker.io:
    endpoint:
      - https://dockercr.wener.me
      - https://docker.m.daocloud.io
      - https://registry-1.docker.io
  ghcr.io:
    endpoint:
      - https://ghcr.wener.me
      - https://ghcr.io
  registry.k8s.io:
    endpoint:
      - https://k8scr.wener.me
      - https://registry.k8s.io
  gcr.io:
    endpoint:
      - https://gcr.wener.me
      - https://gcr.m.daocloud.io
      - https://gcr.io
  quay.io:
    endpoint:
      - https://quaycr.wener.me
      - https://quay.m.daocloud.io
      - https://quay.io
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

## Mirrorss

- https://github.com/DaoCloud/public-image-mirror

## AlpineLinux

- https://mirrors.alpinelinux.org/
- https://git.alpinelinux.org/cgit/aports/tree/main/alpine-mirrors/mirrors.yaml
- 官方
  - http://dl-cdn.alpinelinux.org
  - http://dl-cdn.alpinelinux.org/alpine/MIRRORS.txt
- aliyun
  - https://mirrors.aliyun.com/alpine/
  - https://mirrors.aliyun.com/alpine/MIRRORS.txt
- 参考
  - https://wiki.alpinelinux.org/wiki/How_to_setup_a_Alpine_Linux_mirror

```bash
# 基于更新时间排序
curl -s https://mirrors.aliyun.com/alpine/MIRRORS.txt | xargs -n1 -I {} sh -c 'echo $(curl -s {}/last-updated) {}' | sort -n

# 同步
# 建议参数 -og --chown=1000:1000 - 覆盖 uid:gid - 默认 100:101
# rsync 服务建议使用官方 rsync.alpinelinux.org - 国内镜像要嘛不支持要嘛偶尔有问题
rsync --archive --update --hard-links --timeout=600 --progress rsync://rsync.alpinelinux.org/alpine/ /alpine/mirror
```

## PIP

- Aliyun https://mirrors.aliyun.com/pypi/simple
- Baidu https://mirror.baidu.com/pypi/simple

```toml title="pyproject.toml"
[[tool.poetry.source]]
name = "aliyun"
url = "https://mirrors.aliyun.com/pypi/simple"
priority = "primary"
```
