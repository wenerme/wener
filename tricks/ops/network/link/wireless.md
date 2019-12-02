---
id: wireless
title: 无线网络
---

# 无线网络

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

# 加载的驱动
readlink /sys/class/net/wlan0/device/driver

# 网络硬件
lshw -class network
# 内核模块
lsmod | grep iwlagn
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

monitor
managed [also station]
wds
mesh [also mp]
ibss [also adhoc] To see a description of these please read our modes documentation. https://wireless.wiki.kernel.org/en/users/documentation/modes

https://wireless.wiki.kernel.org/en/users/documentation/wpa_supplicant

```bash
# 物理设备
iw dev
# 链路状态
iw dev wlan0 link
# AP 信息统计
iw dev wlan0 station dump
# 省电模式
iw dev wlan0 set power_save on
# 链接到网络
iw wlan0 connect foo
# 查看设备
iw list
# 热点扫描
iw dev wlan0 scan

# 事件监听
# -t tuming
# -f frames
iw event

# 设置设备模式
iw phy phy0 interface add moni0 type monitor
```

### iw help
```
Usage:	iw [options] command
Options:
	--debug		enable netlink debugging
	--version	show version (4.9)
Commands:
	help [command]
	event [-t|-r] [-f]
	features
	commands
	phy
	list
	phy <phyname> info
	phy <phyname> channels
	dev
	dev <devname> info
	dev <devname> del
	dev <devname> interface add <name> type <type> [mesh_id <meshid>] [4addr on|off] [flags <flag>*] [addr <mac-addr>]
	phy <phyname> interface add <name> type <type> [mesh_id <meshid>] [4addr on|off] [flags <flag>*] [addr <mac-addr>]
	dev <devname> ibss join <SSID> <freq in MHz> [NOHT|HT20|HT40+|HT40-|5MHz|10MHz|80MHz] [fixed-freq] [<fixed bssid>] [beacon-interval <TU>] [basic-rates <rate in Mbps,rate2,...>] [mcast-rate <rate in Mbps>] [key d:0:abcde]
	dev <devname> ibss leave
	dev <devname> station dump [-v]
	dev <devname> station set <MAC address> mesh_power_mode <active|light|deep>
	dev <devname> station set <MAC address> vlan <ifindex>
	dev <devname> station set <MAC address> plink_action <open|block>
	dev <devname> station del <MAC address> [subtype <subtype>] [reason-code <code>]
	dev <devname> station get <MAC address>
	dev <devname> survey dump
	dev <devname> ocb leave
	dev <devname> ocb join <freq in MHz> <5MHz|10MHz>
	dev <devname> mesh leave
	dev <devname> mesh join <mesh ID> [[freq <freq in MHz> <NOHT|HT20|HT40+|HT40-|80MHz>] [basic-rates <rate in Mbps,rate2,...>]], [mcast-rate <rate in Mbps>] [beacon-interval <time in TUs>] [dtim-period <value>] [vendor_sync on|off] [<param>=<value>]*
	dev <devname> mpath dump
	dev <devname> mpath set <destination MAC address> next_hop <next hop MAC address>
	dev <devname> mpath new <destination MAC address> next_hop <next hop MAC address>
	dev <devname> mpath del <MAC address>
	dev <devname> mpath get <MAC address>
	dev <devname> mpp dump
	dev <devname> mpp get <MAC address>
	dev <devname> scan [-u] [freq <freq>*] [ies <hex as 00:11:..>] [meshid <meshid>] [lowpri,flush,ap-force] [randomise[=<addr>/<mask>]] [ssid <ssid>*|passive]
	dev <devname> scan sched_stop
	dev <devname> scan sched_start [interval <in_msecs> | scan_plans [<interval_secs:iterations>*] <interval_secs>] [delay <in_secs>] [freqs <freq>+] [matches [ssid <ssid>]+]] [active [ssid <ssid>]+|passive] [randomise[=<addr>/<mask>]]
	dev <devname> scan abort
	dev <devname> scan trigger [freq <freq>*] [ies <hex as 00:11:..>] [meshid <meshid>] [lowpri,flush,ap-force] [randomise[=<addr>/<mask>]] [ssid <ssid>*|passive]
	dev <devname> scan dump [-u]
	phy <phyname> reg get
	reg get
	reg set <ISO/IEC 3166-1 alpha2>
	dev <devname> auth <SSID> <bssid> <type:open|shared> <freq in MHz> [key 0:abcde d:1:6162636465]
	dev <devname> connect [-w] <SSID> [<freq in MHz>] [<bssid>] [key 0:abcde d:1:6162636465]
	dev <devname> disconnect
	dev <devname> link
	dev <devname> offchannel <freq> <duration>
	dev <devname> cqm rssi <threshold|off> [<hysteresis>]
	phy <phyname> wowlan show
	phy <phyname> wowlan disable
	phy <phyname> wowlan enable [any] [disconnect] [magic-packet] [gtk-rekey-failure] [eap-identity-request] [4way-handshake] [rfkill-release] [net-detect [interval <in_msecs> | scan_plans [<interval_secs:iterations>*] <interval_secs>] [delay <in_secs>] [freqs <freq>+] [matches [ssid <ssid>]+]] [active [ssid <ssid>]+|passive] [randomise[=<addr>/<mask>]]] [tcp <config-file>] [patterns [offset1+]<pattern1> ...]
	phy <phyname> coalesce show
	phy <phyname> coalesce disable
	phy <phyname> coalesce enable <config-file>
	dev <devname> roc start <freq> <time in ms>
	wdev <idx> p2p stop
	wdev <idx> p2p start
	dev <devname> vendor recvbin <oui> <subcmd> <filename|-|hex data>
	dev <devname> vendor recv <oui> <subcmd> <filename|-|hex data>
	dev <devname> vendor send <oui> <subcmd> <filename|-|hex data>
	phy <phyname> set antenna <bitmap> | all | <tx bitmap> <rx bitmap>
	dev <devname> set txpower <auto|fixed|limit> [<tx power in mBm>]
	phy <phyname> set txpower <auto|fixed|limit> [<tx power in mBm>]
	phy <phyname> set distance <auto|distance>
	phy <phyname> set coverage <coverage class>
	phy <phyname> set netns { <pid> | name <nsname> }
	phy <phyname> set retry [short <limit>] [long <limit>]
	phy <phyname> set rts <rts threshold|off>
	phy <phyname> set frag <fragmentation threshold|off>
	dev <devname> set channel <channel> [HT20|HT40+|HT40-]
	phy <phyname> set channel <channel> [HT20|HT40+|HT40-]
	dev <devname> set freq <freq> [HT20|HT40+|HT40-]
	dev <devname> set freq <control freq> [20|40|80|80+80|160] [<center freq 1>] [<center freq 2>]
	phy <phyname> set freq <freq> [HT20|HT40+|HT40-]
	phy <phyname> set name <new name>
	dev <devname> set mcast_rate <rate in Mbps>
	dev <devname> set peer <MAC address>
	dev <devname> set noack_map <map>
	dev <devname> set 4addr <on|off>
	dev <devname> set type <type>
	dev <devname> set meshid <meshid>
	dev <devname> set monitor <flag>*
	dev <devname> set mesh_param <param>=<value> [<param>=<value>]*
	dev <devname> set power_save <on|off>
	dev <devname> set bitrates [legacy-<2.4|5> <legacy rate in Mbps>*] [ht-mcs-<2.4|5> <MCS index>*] [vht-mcs-<2.4|5> <NSS:MCSx,MCSy... | NSS:MCSx-MCSy>*] [sgi-2.4|lgi-2.4] [sgi-5|lgi-5]
	dev <devname> get mesh_param [<param>]
	dev <devname> get power_save <param>

Commands that use the netdev ('dev') can also be given the
'wdev' instead to identify the device.

You can omit the 'phy' or 'dev' if the identification is unique,
e.g. "iw wlan0 info" or "iw phy0 info". (Don't when scripting.)

Do NOT screenscrape this tool, we don't consider its output stable.
```

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
wpa_supplicant -Dwext -iwlan0 -c wpa.conf
# busybox 自带了 udhcpc
udhcpc -fqi wlan0
```

## 热点
* https://wiki.archlinux.org/index.php/software_access_point
* http://wireless.kernel.org/en/users/Documentation/hostapd

```bash
# Supported interface modes:
#   AP - 支持 AP 模式
iw list

apk add hostapd

# 如果已经连接了热点，确认先关闭
service wpa_supplicant stop

# 测试配置
cat <<CONF > test-ap.conf
interface=wlan0
driver=nl80211
ssid=test-ap
channel=1
CONF
# 启动后能搜到热点
hostapd ./test-ap.conf

# 测试配置
cat <<CONF > my-ap.conf
interface=wlan0
driver=nl80211
ssid=wener-ap
hw_mode=n
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=3
wpa_passphrase=aaaaaaaa
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
CONF

ip link set wlan0 down
ip addr flush dev wlan0
ip link set wlan0 up
ip addr add 192.168.100.1/24 dev wlan0

# 启动热点
hostapd ./my-ap.conf
# 启动 DHCP
dnsmasq

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
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

## DBm
[Understanding WiFi Signal Strength](https://support.metageek.com/hc/en-us/articles/201955754-Understanding-WiFi-Signal-Strength)

## FAQ

### WiFi authentication times out
* [WiFi authentication times out](https://superuser.com/questions/911635)

```bash
echo "options iwlwifi 11n_disable=1 wd_disable=1" | sudo tee /etc/modprobe.d/iwlwifi.conf
```

### brcmfmac: brcmf_cfg80211_scan: scan error
```
brcmfmac: brcmf_run_escan: error (-52)
brcmfmac: brcmf_cfg80211_scan: scan error (-52)
brcmfmac: brcmf_escan_timeout: timer expired
```

```bash
echo 'options 8192cu rtw_power_mgnt=0 rtw_enusbss=0' >> /etc/modprobe.d/8192cu.conf
```

* [#1342](https://github.com/raspberrypi/linux/issues/1342)
