---
title: ifupdown-ng
---

# ifupdown-ng

- [ifupdown-ng/ifupdown-ng](https://github.com/ifupdown-ng/ifupdown-ng)
- [ifupdown-ng](https://pkgs.alpinelinux.org/packages?name=ifupdown-ng*&branch=edge&arch=x86_64)

## executor

- wifi - AlpineLinux 3.15+
  - wifi-ssid
  - wifi-psk

```interfaces
# 账号密码模式
iface wifi-home
	use dhcp
	wifi-ssid HomeNetwork
	wifi-psk ExamplePassphrase
# 配置文件模式
iface wifi-work
	use dhcp
	wifi-config-path /etc/network/wpa-work.conf
```
