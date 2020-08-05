---
id: intro
title: FreePBX
---

# FreePBX
## Tips
* [FreePBX](https://www.freepbx.org) Asterisk 的 Web GUI
* http://freepbx.org.cn/
  * [中文语音包](http://freepbx.org.cn/wiki/index.php?title=Asterisk_%E7%B3%BB%E7%BB%9F%E5%AE%8C%E6%95%B4%E7%9A%84%E4%B8%AD%E8%8B%B1%E6%96%87%E8%AF%AD%E9%9F%B3%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%92%8C%E8%AF%AD%E9%9F%B3%E6%96%87%E4%BB%B6)
* 参考
  * [FreePBX architecture](https://community.freepbx.org/t/freepbx-architecture/62345/2)
    * FreePBX 将所有信息写入到 DB，当在前端点击应用配置时，生成所有配置文件然后重载 asterisk
    * 核心所有都是由模块组成 - 不同的模块可能位于不同的 GIT 仓库
    * 模块会通过[签名](https://wiki.freepbx.org/pages/viewpage.action?pageId=29753662)保证完整性
    * [Big Module Object](https://wiki.freepbx.org/pages/viewpage.action?pageId=19498386) (BMO)  - 是对模块的一个抽象 - 包含 安装、卸载、备份、恢复等
* FAQ
  * [Fwconsole not found](https://community.freepbx.org/t/fwconsole-not-found/33406)


```bash
# 一个基于 debian 的 freepbx 容器
# https://github.com/tiredofit/docker-freepbx
# Docker Compose https://github.com/tiredofit/docker-freepbx/blob/15/examples/docker-compose.yml
# https://github.com/tiredofit/docker-freepbx/issues/85
docker run --rm -it \
  -v $PWD/certs:/certs \
  -v $PWD/data:/data \
  -v $PWD/log:/var/log \
  -v $PWD/www:/var/www/html \
  -v $PWD/db:/var/lib/mysql \
  -v $PWD/custom:/assets/custom \
  -p 80:80 -p 5060:5060 -p 5160:5160 -p 18000-18100:18000-18100/udp \
  -p 4445:4445 \
  -e RTP_START=18000 -e RTP_FINISH=18100 -e DB_EMBEDDED=TRUE \
  --name freepbx tiredofit/freepbx


# Docker 启动 UCP 安装失败 - 因为 icu 安装失败
docker exec -it freepbx bash
apt update
# icu libicu-devel 
apt-get install pkg-config pkgconf
pkg-config --modversion icu-i18n
curl -O http://ftp.br.debian.org/debian/pool/main/i/icu/libicu52_52.1-8+deb8u7_amd64.deb

apt install ./libicu52_52*
```
