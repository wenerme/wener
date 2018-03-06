# WIFI

## Tips
* Linux Kernel Wireless
  * https://wireless.wiki.kernel.org/
  * [documentation](https://wireless.wiki.kernel.org/en/users/documentation)
  * iw
  * wpa_supplicant
  * hostapd
* [Connecting to a wireless access point](https://wiki.alpinelinux.org/wiki/Connecting_to_a_wireless_access_point)
* [Linux Find Wireless Driver Chipset Information](https://www.cyberciti.biz/faq/linux-find-wireless-driver-chipset/)
* [8 Linux Commands: To Find Out Wireless Network Speed, Signal Strength And Other Information](https://www.cyberciti.biz/tips/linux-find-out-wireless-network-speed-signal-strength.html)
* NOTE
  * 博通 b43 固件需要自己编译安装

```bash
# 常用的无线工具
apk add iw wireless-tools wpa_supplicant

# 安装 pci 工具, busybox 的 lspci 信息较少
apk add pciutils
# 查看有没有无线控制器
lspci | grep -i network

# 查看无线设备
iw list

# 查看无线信息
cat /proc/net/wireless
```

## 博通 b43 固件

```bash
apk add --allow-untrusted 编译后的.apk
apk add b43-fwcutter
modprobe b43
echo b43 >> /etc/modules

# 此时应该看得到网络设备
iw list
```

## iw
* [iw](https://wireless.wiki.kernel.org/en/users/Documentation/iw)
  * 替代 wireless-tools

## wireless-tools
* [wireless-tools](http://www.hpl.hp.com/personal/Jean_Tourrilhes/Linux/Tools.html)
  * 很久没有更新了
  * [contents](https://pkgs.alpinelinux.org/contents?branch=edge&name=wireless-tools&arch=x86_64&repo=main)
  * iwconfig 基本无线参数管理
  * iwlist 列表扫描
  * iwspy 获取每个节点的信号强度
  * iwpriv 管理无线扩展相关的驱动
  * ifrename 网卡命名

```bash
# 查看无线信息
iwconfig wlan0
```


## WPA_supplicant
* [How to setup multiple WiFi networks?](https://raspberrypi.stackexchange.com/q/11631/38420)
* [WPA_supplicant](https://wiki.archlinux.org/index.php/WPA_supplicant)
  * man [wpa_supplicant](https://linux.die.net/man/8/wpa_supplicant)
  * man [wpa_supplicant.conf](https://linux.die.net/man/5/wpa_supplicant.conf)
* man [iwconfig](https://linux.die.net/man/8/iwconfig)
* man [iwlist](https://linux.die.net/man/8/iwlist)

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
wpa_supplicant -Dwext -ieth1 -c wpa.conf
dhclient -r
dhclient wlan0
```

## wavemon
* 网络信号监控
* [uoaerg/wavemon](https://github.com/uoaerg/wavemon)

```bash
apk add wavemon
wavemon
```

## 802

* [IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11)

802.11  | Mb/c  | MHz/c         | Max c | 操作频率 (MHz) |
--------|-------|---------------|-------|-------
a       | 54    | 20            | A     | 3.7/5
b       | 11    | 20            | A     | 2.4
g       | 54    | 20            | A     | 2.4
n       | 150   | 20/40         | 4     | 2.4/5
ac      | 866   | 20/40/80/160  | 8     | 5

Mb/c 单通道最大速度
MHz/c 通道宽度
