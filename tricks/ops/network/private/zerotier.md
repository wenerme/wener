---
id: zerotier
title: Zerotier
---

# Zerotier
## Tips
* [Manual](https://www.zerotier.com/manual)

## controller
* zerotier-one [one.cpp](https://github.com/zerotier/ZeroTierOne/blob/master/one.cpp)
  * idtool 和 cli 是公用同一个 bin
* [EmbeddedNetworkController.cpp](https://github.com/zerotier/ZeroTierOne/blob/master/controller/EmbeddedNetworkController.cpp)
* [platformDefaultHomePath](https://github.com/zerotier/ZeroTierOne/blob/db813db7e875c257e42c41ab8091c3df1e9300a5/osdep/OSUtils.cpp#L382)
  * macOS `/Library/Application Support/ZeroTier/One`
  * linux `/var/lib/zerotier-one`
  * windows `C:\ProgramData\ZeroTier\One`

```bash
# macOS controller
# 使用 $PWD/controller 作为 HOME
sudo /Library/Application\ Support/ZeroTier/One/zerotier-one $PWD/controller


# docker controller
docker run --rm -it -p 9993:9993 wener:edge
apk update && apk add zerotier-one
# controller 默认端口 9993
zerotier-one -p9993
```

## 笔记
* V1 网络层
    * P2P
    * 通过根服务组网
    * 0 配置
    * 1 个 earth 根服务器，由 ZeroTier 运营；12 个根服务器
    * 围绕 earth 的为 moon； 用于添加用户定义的根服务；使用 moon 节点可避免依赖 ZeroTier 的基础设施；可提供更好的性能
    * 每个几点一个全局唯一的 40位（10位16进制字符） 的标识符；通过公钥和私钥计算；

## FAQ

### 跳过 ZeroTier 服务器
* [#610](https://github.com/zerotier/ZeroTierOne/issues/610)


[mkworld.cpp](https://github.com/zerotier/ZeroTierOne/blob/master/attic/world/mkworld.cpp) 初始化基础信息，包含所有的 root 服务器，需要跳过这些服务器则需要修改从新生成。
