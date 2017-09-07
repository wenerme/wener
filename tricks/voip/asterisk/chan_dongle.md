# chan_dongle
## Tips

* IMSI https://zh.wikipedia.org/wiki/国际移动用户识别码
* IMEI https://zh.wikipedia.org/wiki/IMEI
* https://www.quora.com/What-is-the-difference-between-ICCID-IMSI-and-IMEI-numbers

* iPhone 获取方式https://support.apple.com/zh-cn/HT204073

* https://www.dc-unlocker.com/
* http://a-zgsm.com/huawei.php

* https://github.com/bg111/asterisk-chan-dongle

* http://www.modemunlock.com/huawei-modem-firmwares-download-all-huawei-firmwares


* USSD -> https://en.wikipedia.org/wiki/Unstructured_Supplementary_Service_Data

* PDU https://en.wikipedia.org/wiki/Protocol_data_unit
* http://www.smartposition.nl/resources/sms_pdu.html
* smsc Short Message Service Center（短消息服务中心）


```bash
$ blkid /dev/sr1
# /dev/sr1: UUID="2009-12-16-02-00-00-00" LABEL="Mobile Partner" TYPE="iso9660" PTTYPE="mac"
mount -t iso9660 /dev/sr1 /mnt/a

# MAC
ioreg -p IOUSB -l -b | grep -10 -i huawei
```

http://m2msupport.net/m2msupport/module-tester/
https://wiki.archlinux.org/index.php/Huawei_E1550_3G_modem

```bash
apk add screen usb-modeswitch-udev usbutils

# 插入 USB
# 可以访问到附带的存储
blkid /dev/sr1
# /dev/sr1: UUID="2009-12-16-02-00-00-00" LABEL="Mobile Partner" TYPE="iso9660" PTTYPE="mac"
# mount -t iso9660 /dev/sr1 /mnt/a
# 查看 product
lsusb.py
# 切换为 modem 模式, 替换为自己的
# lsusb.py 2>/dev/null | sed -nre 's/^.*?12d1:(\S+).*/\1/p'
PRODUCT_ID=`lsusb.py 2>/dev/null | sed -nre 's/^.*?12d1:(\S+).*/\1/p'`
/lib/udev/usb_modeswitch --vendor 0x12d1 --product=0x$PRODUCT_ID --type option-zerocd
modprobe usbserial vendor=0x12d1 product=0x$PRODUCT_ID

# 1001 的会出来三个端口, 分别为 modem,diag,pcui
# 1003 的不会有 diag, 目前猜测为语音拨号
```

* [https://zh.wikipedia.org/wiki/海斯命令集](https://zh.wikipedia.org/wiki/海斯命令集)

```bash
# http://m2msupport.net/m2msupport/atcardlock-card-lock-command/
AT^CARDLOCK?
^CARDLOCK: 1,10,0 # 锁定
^CARDLOCK: 2,10,0 # 未锁定
# ^CARDLOCK: A,B,C
# A: 1 锁定 2 未锁定, B: 剩余次数, C: 使用的次数

# 测试是否有 AT 命令
AT
# 模型号
AT+CGMM
# 制造商
AT+CGMI

# 修改工作模式
# http://m2msupport.net/m2msupport/atu2diag-set-the-device-mode/
AT^U2DIAG=$MODE
# 0 Modem, 1 modem mode + CD ROM, 255 modem mode + CD ROM + Card Reader,  256 modem mode + Card Reader

# 查看系统状态
# http://m2msupport.net/m2msupport/atsysinfo-get-the-system-mode/
AT^SYSINFO

# IMEI
AT+CGSN
ATD*#06#

```
