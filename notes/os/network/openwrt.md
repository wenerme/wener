---
title: OpenWrt
---

# OpenWrt

- [OpenWrt] - open wireless router
  - 自 2004 年 1 月
- OpenWrt 衍生系统
  - 部分 小米路由器、TP-Link 路由器固件
  - Ubiquiti 无线路由固件
  - immortalwrt
- 组件
  - util-linux, musl, busybox, ash, opkg
- [Docker OpenWrt Image](https://wiki.openwrt.org/doc/howto/docker_openwrt_image)
- [下载](https://downloads.openwrt.org)
- 参考
  - wikipedia [OpenWrt](https://en.wikipedia.org/wiki/OpenWrt)
  - [openwrt/packages](https://github.com/openwrt/packages)
    - 包含 apk-tools
    - 官方开始支持 APK - [openwrt/openwrt#4294](https://github.com/openwrt/openwrt/pull/4294)
    - 社区仓库
      - [coolsnowwolf/packages](https://github.com/coolsnowwolf/packages)
  - [openwrt/routing](https://github.com/openwrt/routing)
    - 路由
  - [openwrt/luci](https://github.com/openwrt/luci)
    - OpenWrt Configuration Interface
  - [支持设备](https://openwrt.org/supported_devices)
    - 所有 树莓派
    - NanoPi ROS
    - [推荐路由](https://openwrt.org/toh/recommended_routers)
  - [gekmihesg/ansible-openwrt](https://github.com/gekmihesg/ansible-openwrt)
  - ansible [opkg](https://docs.ansible.com/ansible/latest/collections/community/general/opkg_module.html)
  - https://downloads.asu.aparcar.org/apkwrt/
    - apk3 仓库
    - 新的 openwrt 用 apk 替代 opkg
    - apk - alpine package manager

[openwrt]: https://github.com/openwrt/openwrt

## Mesh

- B.A.T.M.A.N.
- OLSR
- 支持 IEEE 802.11s 的 WNIC
