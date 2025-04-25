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

```bash
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

# 调试
# ===============
# 在前台运行以便调试
wpa_supplicant -Dwext -iwlan0 -c wpa.conf
# busybox 自带了 udhcpc
udhcpc -fqi wlan0
```

```txt title="wpa_supplicant.conf"
network={
	ssid="SSID"
	psk=PSD
}
```
