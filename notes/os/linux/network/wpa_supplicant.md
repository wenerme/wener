---
tags:
  - WiFi
---

## WPA_supplicant

- [How to setup multiple WiFi networks?](https://raspberrypi.stackexchange.com/q/11631/38420)
- [WPA_supplicant](https://wiki.archlinux.org/index.php/WPA_supplicant)
  - man [wpa_supplicant](https://linux.die.net/man/8/wpa_supplicant)
  - man [wpa_supplicant.conf](https://linux.die.net/man/5/wpa_supplicant.conf)
- man [iwconfig](https://linux.die.net/man/8/iwconfig)
- man [iwlist](https://linux.die.net/man/8/iwlist)
- ifupdown-ng
  - https://github.com/ifupdown-ng/ifupdown-ng/blob/main/executor-scripts/linux/wifi
- /etc/init.d/wpa_supplicant
  - /sbin/wpa_supplicant
- /etc/init.d/wpa_cli
  - /sbin/wpa_cli
- 参考
  - https://man.archlinux.org/man/wpa_cli.8
  - https://man.archlinux.org/man/wpa_supplicant.conf.5.en
  - https://man.archlinux.org/man/wpa_supplicant.8.en

```bash
sudo apk add wireless-tools

# 启用网卡
ifconfig wlan0 up
# 扫描热点
iwlist scan
# 生成配置文件 wpa.conf
wpa_passphrase 热点名字 密码 > wpa.conf
# 可添加多个配置
wpa_passphrase 热点名字 密码 >> wpa.conf

# 将配置放到服务配置下
mkdir -p /etc/wpa_supplicant
chmod 750 /etc/wpa_supplicant
cp wpa.conf /etc/wpa_supplicant/wpa_supplicant.conf

# 启动 wpa 服务
rc-service wpa_supplicant start
# 开机启动
rc-update add wpa_supplicant boot

# 修改网络配置, 添加 wlan0
# auto wlan0
# iface wlan0 inet dhcp
nano /etc/network/interface

wpa_cli -i wlan0 reconfigure

# 调试
# ===============
# 在前台运行以便调试
wpa_supplicant -Dwext -iwlan0 -c wpa.conf
# busybox 自带了 udhcpc
udhcpc -fqi wlan0
```

| driver       | description                                                  |
| ------------ | ------------------------------------------------------------ |
| nl80211      | modern Linux nl80211/cfg80211 netlink-based interface        |
| wext         | legacy Linux ioctl-based interface (older hardware/drivers). |
| wired        | wpa_supplicant wired Ethernet driver.                        |
| macsec_linux | MACsec Ethernet driver for Linux.                            |
| roboswitch   | wpa_supplicant Broadcom switch driver.                       |
| none         | No driver (RADIUS server / WPS ER only).                     |
| bsd          | BSD 802.11 support (Atheros, etc.).                          |
| ndis         | Windows NDIS driver.                                         |

## wpa_cli

## wpa_supplicant.conf

- /etc/wpa_supplicant/wpa_supplicant.conf

```
ctrl_interface=/run/wpa_supplicant
update_config=1

network={
	ssid="SSID"
	psk="PSK"
	priority=10
}
```

```bash
chmod 600 /etc/wpa_supplicant/wpa_supplicant.conf
```

- ssid
  - 含义：目标无线网络名称（SSID）。
  - 格式：字符串；若含空格或特殊字符请用双引号（例如："My WiFi"）；大小写敏感。
- psk
  - 含义：WPA/WPA2 预共享密钥（密码）。
  - 格式：明文密码 8–63 字符（需双引号）或 64 位十六进制哈希（不加引号）。
- priority
  - 含义：网络优先级，值越大优先连接。
  - 格式：整数（正负均可），默认通常为 0。
- https://gist.github.com/penguinpowernz/ce4ed0e64ce0fa99a5e335c1a4c954b3

# FAQ

## Failed to connect to non-global ctrl_ifname: (nil) error: No error information

- 注意配置 ctrl_interface=/run/wpa_supplicant

```bash
wpa_cli -i wlan0 reconfigure
```

```
Failed to connect to non-global ctrl_ifname: wlan0  error: No such file or directory
```
