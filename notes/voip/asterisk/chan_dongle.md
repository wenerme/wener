---
title: chan_dongle
---

# chan_dongle

- 是什么？
  - Asterisk 支持外置 GSM 模块
- [Requirements and Limitations](https://github.com/bg111/asterisk-chan-dongle/wiki/Requirements-and-Limitations)
- 源码
  - 目前大多使用 [oleg-krv/asterisk-chan-dongle](https://github.com/oleg-krv/asterisk-chan-dongle)
    - 最近提交 fork [phcoder/asterisk-chan-dongle](https://github.com/phcoder/asterisk-chan-dongle)
- 参考
  - [OpenWRT通过3G Modem加asterisk将GSM通话转为SIP](https://zhuanlan.zhihu.com/p/100809316)

```bash
apk add asterisk-chan-dongle

# 配置
cp /etc/asterisk/dongle.conf.sample /etc/asterisk/dongle.conf

# 加载模块
asterisk -rx 'module load chan_dongle.so'
```

## dongle.conf

```ini
[general]

interval=15			; 尝试连接设备的间隔

;------------------------------ JITTER BUFFER CONFIGURATION --------------------------
;jbenable = yes			; Enables the use of a jitterbuffer on the receiving side of a
				; Dongle channel. Defaults to "no". An enabled jitterbuffer will
				; be used only if the sending side can create and the receiving
				; side can not accept jitter. The Dongle channel can't accept jitter,
				; thus an enabled jitterbuffer on the receive Dongle side will always
				; be used if the sending side can create jitter.

;jbforce = no			; Forces the use of a jitterbuffer on the receive side of a Dongle
				; channel. Defaults to "no".

;jbmaxsize = 200		; Max length of the jitterbuffer in milliseconds.

;jbresyncthreshold = 1000	; Jump in the frame timestamps over which the jitterbuffer is
				; resynchronized. Useful to improve the quality of the voice, with
				; big jumps in/broken timestamps, usually sent from exotic devices
				; and programs. Defaults to 1000.

;jbimpl = fixed			; Jitterbuffer implementation, used on the receiving side of a Dongle
				; channel. Two implementations are currently available - "fixed"
				; (with size always equals to jbmaxsize) and "adaptive" (with
				; variable size, actually the new jb of IAX2). Defaults to fixed.

;jbtargetextra = 40		; This option only affects the jb when 'jbimpl = adaptive' is set.
				; The option represents the number of milliseconds by which the new jitter buffer
				; will pad its size. the default is 40, so without modification, the new
				; jitter buffer will set its size to the jitter value plus 40 milliseconds.
				; increasing this value may help if your network normally has low jitter,
				; but occasionally has spikes.

;jblog = no			; Enables jitterbuffer frame logging. Defaults to "no".
;-----------------------------------------------------------------------------------

; 默认设置
[defaults]

context=default			; 呼入默认 context
group=0				      ; calling group
rxgain=0			      ; increase the incoming volume; may be negative
txgain=0			      ; increase the outgoint volume; may be negative
autodeletesms=yes		; 自动删除收到的短信
resetdongle=yes			; reset dongle during initialization with ATZ command
u2diag=-1			      ; set ^U2DIAG parameter on device (0 = disable everything except modem function) ; -1 not use ^U2DIAG command
usecallingpres=yes	; use the caller ID presentation or not
callingpres=allowed_passed_screen ; set caller ID presentation		by default use default network settings
disablesms=no			; disable of SMS reading from device when received
				;  chan_dongle has currently a bug with SMS reception. When a SMS gets in during a
				;  call chan_dongle might crash. Enable this option to disable sms reception.
				;  default = no

language=en			  ; 通道默认语言
smsaspdu=yes			; PDU 方式发送短信
mindtmfgap=45			; minimal interval from end of previews DTMF from begining of next in ms
mindtmfduration=80		; minimal DTMF tone duration in ms
mindtmfinterval=200		; minimal interval between ends of DTMF of same digits in ms

callwaiting=auto		; if 'yes' allow incoming calls waiting; by default use network settings
				; if 'no' waiting calls just ignored
disable=no			; OBSOLETED by initstate: if 'yes' no load this device and just ignore this section

initstate=start			; specified initial state of device, must be one of 'stop' 'start' 'remote'
				;   'remove' same as 'disable=yes'

exten=+1234567890		; exten for start incoming calls, only in case of Subscriber Number not available!, also set to CALLERID(ndid)

dtmf=relax			; control of incoming DTMF detection, possible values:
				;   off	   - off DTMF tones detection, voice data passed to asterisk unaltered
				;              use this value for gateways or if not use DTMF for AVR or inside dialplan
				;   inband - do DTMF tones detection
				;   relax  - like inband but with relaxdtmf option
				;  default is 'relax' by compatibility reason

; 设备
[dongle0]
audio=/dev/ttyUSB1		; 音频 tty 端口
data=/dev/ttyUSB2		  ; AT 命令 tty 端口

; 使用 imei, imsi 可忽略 audio, data 配置 - Linux 下能自动发现
; audio 和 data 配置优先
; 15 个数字
imei=123456789012345
imsi=123456789012345
```

## command

| cmd                                                     | desc                                      |
| ------------------------------------------------------- | ----------------------------------------- |
| dongle callwaiting                                      | Enable/Disable Call-Waiting on the dongle |
| dongle cmd                                              | Send commands to port for debugging       |
| dongle discovery                                        | Discovery devices and create config       |
| dongle pdu                                              | Send PDU of SMS from the dongle           |
| dongle reload                                           | Reload dongle                             |
| dongle remove                                           | Remove dongle                             |
| dongle reset                                            | Reset dongle now                          |
| dongle restart                                          | Restart dongle                            |
| dongle show device settings                             | Show Dongle device settings               |
| dongle show device state                                | Show Dongle device state                  |
| dongle show device statistics                           | Show Dongle device statistics             |
| dongle show devices                                     | Show Dongle devices state                 |
| dongle show version                                     | Show module version                       |
| dongle sms                                              | Send SMS from the dongle                  |
| dongle start                                            | Start dongle                              |
| `dongle stop <now|gracefully|when convenient> <device>` | Stop dongle                               |
| dongle ussd                                             | Send USSD commands to the dongle          |

- IMSI https://zh.wikipedia.org/wiki/国际移动用户识别码
- IMEI https://zh.wikipedia.org/wiki/IMEI
- https://www.quora.com/What-is-the-difference-between-ICCID-IMSI-and-IMEI-numbers

- iPhone 获取方式https://support.apple.com/zh-cn/HT204073

- https://www.dc-unlocker.com/
- http://a-zgsm.com/huawei.php
- https://github.com/bg111/asterisk-chan-dongle
- http://www.modemunlock.com/huawei-modem-firmwares-download-all-huawei-firmwares

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

- http://m2msupport.net/m2msupport/module-tester/
- https://wiki.archlinux.org/index.php/Huawei_E1550_3G_modem

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
