---
title: UPnP (Universal Plug and Play)
tags:
  - Protocol
  - UPnP
---

# UPnP (Universal Plug and Play)

- [StackOverflow: List upnp server/renderer in command line](https://stackoverflow.com/q/18363833/1870054)
- [MiniUPnP](https://miniupnp.tuxfamily.org/)
- [Portable UPnP SDK](http://pupnp.sourceforge.net/)
- [GUPnP](https://wiki.gnome.org/action/show/Projects/GUPnP)
- [Miranda](https://tools.kali.org/information-gathering/miranda)
  - Python-based Universal Plug-N-Play client application designed to discover, query and interact with UPNP devices, particularly Internet Gateway Devices.

## Libraries

- [huin/goupnp](https://github.com/huin/goupnp)
  - UPnP library for Go (#golang)
- [NebulousLabs/go-upnp](https://github.com/NebulousLabs/go-upnp)
  - An opinionated interface to your local Internet Gateway Device.
- [prestonTao/upnp](https://github.com/prestonTao/upnp)
  - 在内网中搜索网关设备，检查网关是否支持upnp协议，若支持，添加端口映射。

## Usage

```bash
gssdp-discover -i wlan0 --timeout=3

gssdp-discover -i wlan0 --timeout=3 --target=urn:schemas-upnp-org:device:MediaRenderer:1
```
