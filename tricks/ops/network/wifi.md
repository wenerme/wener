# WIFI


## Tips

* [Linux Find Wireless Driver Chipset Information](https://www.cyberciti.biz/faq/linux-find-wireless-driver-chipset/)

8 Linux Commands: To Find Out Wireless Network Speed, Signal Strength And Other Information
https://www.cyberciti.biz/tips/linux-find-out-wireless-network-speed-signal-strength.html


* [wireless-tools](http://www.hpl.hp.com/personal/Jean_Tourrilhes/Linux/Tools.html)
  * [contents](https://pkgs.alpinelinux.org/contents?branch=edge&name=wireless-tools&arch=x86_64&repo=main)
  * iwconfig 基本无线参数管理
  * iwlist 列表扫描
  * iwspy 获取每个节点的信号强度
  * iwpriv 管理无线扩展相关的驱动
  * ifrename 网卡命名

```bash
# 查看无线信息
iwconfig wlan0

cat /proc/net/wireless

# wavemon
# =======
# https://github.com/uoaerg/wavemon
# 网络信号监控
apk add wavemon
wavemon

# UDP
# Listen
netcat -ul 2115
# 端口检测
netcat -zv -u 127.0.0.1  2115
ls /usr/local/opt/nmap/bin
# ncat  ndiff  nmap  nping  uninstall_ndiff

# https://nmap.org/ncat/guide/ncat-usage.html
man ncat

# 端口转发
ncat -l localhost 8080 --sh-exec "ncat wener.me 80"
```

### 无线
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
# 生成配置
wpa_passphrase ssid-name passphrase > wpa.conf

# 在前台运行以便调试, 可以使用 -B 参数在后台运行
wpa_supplicant -Dwext -ieth1 -c/root/wpa.conf
dhclient -r
dhclient wlan0
```

## WPA_supplicant
https://wiki.archlinux.org/index.php/WPA_supplicant

* [How to setup multiple WiFi networks?](https://raspberrypi.stackexchange.com/q/11631/38420)



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
