---
title: DAHDI
---

# DAHDI

- 是什么？
  - Digium Asterisk Hardware Device Interface
  - Digium 开发的 Asterisk 硬件设备接口
- [DAHDI Telephony Interface Driver](http://docs.tzafrir.org.il/dahdi-linux/README.html)
- dahdi tools 实际操作的是 `/dev/dahdi/ctl`
- [源码下载](https://downloads.asterisk.org/pub/telephony/dahdi-linux-complete/) / [asterisk/dahdi-linux](https://github.com/asterisk/dahdi-linux)
- 版本历史
  - 3.1 - 2019-10-7
  - 3.0 - 2018-11-15
  - 2.11 - 2015-12-22
- 编译问题
  - 5.4 后 linux/pci-aspm.h 变为 linux/pci.h
  - 5.0
    - SUBDIRS=$(PWD) => M=$(shell pwd)
    - implicit declaration of function `do_gettimeofday`; did you mean 'do_settimeofday64'?
      - 以前在 `linux/timekeeping32.h` 之后被删除
      - [xpp patch](http://git.asterisk.org/gitweb/?p=dahdi/linux.git;a=blobdiff;f=drivers/dahdi/xpp/xbus-pcm.c;h=8bb2fe76c66a143242730e022cf8af3a6268b062;hp=37f9260e7ecb1c7b3e00b7bd942eac7bc95d6d05;hb=ffcd08205c71dcb0e060836359418bef20f07ffa;hpb=8468250328b607cbd2774c2209fbe5826be01098)
      - `do_gettimeofday(&di->last_lost_tick.tv);` -> `di->last_lost_tick = ktime_get();`
      - `struct timeval now` -> `const ktime_t now`;
    - implicit declaration of function `touch_softlockup_watchdog`
      - 以前 `linux/sched.h` 现在在 [linux/nmi.h](https://elixir.bootlin.com/linux/v5.4/ident/touch_softlockup_watchdog)
  - Openvox 2.11
    - include/kernel.h `#define dahdi_pci_module pci_register_driver`
  - Ubuntu 的 DAHDi 补丁可以作为参考 https://launchpad.net/ubuntu/+source/dahdi-linux/+changelog
  - Alpine 的 DAHDi 驱动带了 zaphfc 的补丁
    - https://community.asterisk.org/t/dahdi-with-hfc-s-pci-card/39320
    - https://gitlab.alpinelinux.org/alpine/aports/tree/v3.10.3/main/dahdi-linux-vanilla
    - https://www.voip-info.org/asterisk-zaphfc/
- https://wiki.asterisk.org/wiki/display/DAHDI/DAHDI
- http://git.asterisk.org/gitweb/?p=dahdi/tools.git;a=summary
- https://wiki.asterisk.org/wiki/display/DAHDI/Quick+Start+From+Source

```bash
# 中断
cat /proc/interrupts

# 端口信息
grep . /sys/bus/dahdi_spans/devices/span-*/{alarms,basechan,channels,desc,is_digital,is_sync_master,lbo,linecompat,lineconfig,local_spanno,name,spantype,syncsrc,uevent}
# 设备信息
grep . /sys/bus/dahdi_devices/devices/*/{assign_span,auto_assign,hardware_id,location,manufacturer,registration_time,span_count,spantype,type,uevent}

# 查看线路类型
grep . /sys/bus/dahdi_devices/devices/*/spantype
head -q /proc/dahdi/*
```

## OpenVox 驱动

- 源码下载
  - http://www.openvox.cn/pub/drivers/dahdi-linux-complete/releases/
  - 2.11.1 官方的有一点问题, 可以尝试使用 https://github.com/wenerme/openvox-dahdi-linux 的 myfix 分支
- NOTE
  - hardened 的内核编译会失败, 并且在编译过程中会报很多异常
    - can't find starting instruction / can't decode instruction
      - [stack-validation.txt:224](https://github.com/torvalds/linux/blob/master/tools/objtool/Documentation/stack-validation.txt#L224)
  - DAHDi 的 hardened 编译也加了不少补丁
    - https://git.alpinelinux.org/cgit/aports/tree/main/dahdi-linux-hardened/
  - vaillian 的内核能直接编译成功

```bash
wget http://www.openvox.cn/pub/drivers/dahdi-linux-complete/openvox_dahdi-linux-complete-current.tar.gz
tar zxvf openvox_dahdi-linux-complete-current.tar.gz
cd dahdi-linux-complete*

https://www.openvox.cn/pub/drivers/dahdi-linux-complete/openvox_dahdi-linux-complete-2.11.1.gz
```

```bash
apk add bison zlib{,-dev} ncurses{,-dev} libxml2{,-dev} openssl{,-dev} gnutls{,-dev} linux-headers make abuild gcc g++ perl git wget

# 要看具体使用的什么内核 uname -r
# apk add linux-hardened{,-dev}
apk add linux-vanilla{,-dev}

# 或者用 docker 编译
docker run -it --rm -v $PWD:/src wener/asterisk:builder bash

# 先编译 dahdi 驱动
make install -C linux KVERS=4.9.49 DESTDIR=$PWD/dist/4.9.49

# 如果是 hardened 那么一般是这样的
make install KVERS=4.9.32-0-hardened
# 安装到其他地方
make install KVERS=4.9.32-0-hardened DESTDIR=$PWD/dist/4.9.32-0-hardened
```

### 其他驱动

- wctdmc1k

## Digium 数字卡

- wcte43x:
  - Digium TE435: PCI express quad-port T1/E1/J1
  - Digium TE436: PCI quad-port T1/E1/J1
  - Digium TE235: PCI express dual-port T1/E1/J1
  - Digium TE236: PCI dual-port T1/E1/J1
- wcte13xp:
  - Digium TE131: PCI express single-port T1/E1/J1
  - Digium TE133: PCI express single-port T1/E1/J1 with echocan
  - Digium TE132: PCI single-port T1/E1/J1
  - Digium TE134: PCI single-port T1/E1/J1 with echocan
- wct4xxp:
  - Digium TE205P/TE207P/TE210P/TE212P: PCI dual-port T1/E1/J1
  - Digium TE405P/TE407P/TE410P/TE412P: PCI quad-port T1/E1/J1
  - Digium TE220: PCI-Express dual-port T1/E1/J1
  - Digium TE420: PCI-Express quad-port T1/E1/J1
  - Digium TE820: PCI-Express eight-port T1/E1/J1
- wcte12xp:
  - Digium TE120P: PCI single-port T1/E1/J1
  - Digium TE121: PCI-Express single-port T1/E1/J1
  - Digium TE122: PCI single-port T1/E1/J1
- wcte11xp:
  - Digium TE110P: PCI single-port T1/E1/J1
- wct1xxp:
  - Digium T100P: PCI single-port T1
  - Digium E100P: PCI single-port E1
- wcb4xxp:
  - Digium B410: PCI quad-port BRI
- tor2: Tormenta quad-span T1/E1 card from the Zapata Telephony project

## Digium 模拟卡

- wcaxx:
  - Digium A8A: PCI up to 8 mixed FXS/FXO ports
  - Digium A8B: PCI express up to 8 mixed FXS/FXO ports
  - Digium A4A: PCI up to 4 mixed FXS/FXO ports
  - Digium A4B: PCI express up to 4 mixed FXS/FXO ports
- wctdm24xxp:
  - Digium TDM2400P/AEX2400: up to 24 analog ports
  - Digium TDM800P/AEX800: up to 8 analog ports
  - Digium TDM410P/AEX410: up to 4 analog ports
  - Digium Hx8 Series: Up to 8 analog or BRI ports
- wctdm:
  - Digium TDM400P: up to 4 analog ports
- xpp: Xorcom Astribank: a USB connected unit of up to 32 ports
  - including the digital BRI and E1/T1 modules
- wcfxo: X100P, similar and clones. A simple single-port FXO card

## OpenVox

- D110
  - wcte11xp
- D130/D115
  - opvxd115
- D230/D210 D430/D410 D830
  - wct4xxp
- A400
  - modprobe wctdm opermode=CHINA
- A800 A1200
  - modprobe opvxa1200 opermode=CHINA
- A810 A2410
  - modprobe opvxa24xx opermode=CHINA
- B400 B800
  - modprobe wcb4xxp te_nt_override=0x03
- OpenVox G400P GSM/CDMA PCI
  - GSM 驱动
  - opvxg4xx
