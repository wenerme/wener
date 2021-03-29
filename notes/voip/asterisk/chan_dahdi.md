---
id: chan_dahdi
title: DAHDi Channel
---

# DAHDi

## Tips

- [asterisk/dahdi-linux](https://github.com/asterisk/dahdi-linux)
  - [dahdi/linux](http://git.asterisk.org/gitweb/?p=dahdi/linux.git)
- [asterisk/libpri](https://github.com/asterisk/libpri)
  - [libpri](http://git.asterisk.org/gitweb/?p=libpri.git)

```bash
apk add dahdi-linux-lts

dahdi_genconf modules
cat /etc/dahdi/modules
modprobe <previously listed detected drivers>
dahdi_genconf system
dahdi_cfg



# 先查看所有的
lspci
# 然后可以查看单个的详情, 可以看到使用的模块
lspci -s 09:00.0 -vvvv

# 查看模块信息
modinfo dahdi
# 查看安装的模块
lsmod
less /proc/modules
# 查看可安装模块
ls -l /lib/modules/$(uname -r)/kernel/drivers/
# 模块安装
modprobe dahdi
# 移除
modprobe -r wctdm24xxp

# 如果模块是拷贝过去的, 可能要先进行该操作
depmod -a

# 查看设备信息
cat /proc/dahdi/1
ls /dev/dahdi/

# pri show spans

asterisk -rx "dahdi show version"
asterisk -rx "pri show version"
```

- modprobe dahdi
- modprobe wctdm
- /sys/bus/dahdi_devices
- dahdi -> crc_ccitt
- oct612x -> dahdi
- wct4xxp -> oct612x,dahdi

| cli                                   | desc                                        |
| ------------------------------------- | ------------------------------------------- |
| dahdi create channels                 | 创建通道                                    |
| dahdi destroy channels                | 删除通道                                    |
| dahdi restart                         | 完全重启通道                                |
| dahdi set dnd                         | 设置/重置通道 勿扰模式 DND (Do Not Disturb) |
| `dahdi set hwgain {rx|tx}`            | Set hardware gain on a channel              |
| `dahdi set swgain {rx|tx}`            | Set software gain on a channel              |
| dahdi show cadences                   | List cadences                               |
| `dahdi show channels [group|context]` | Show active DAHDI channels                  |
| dahdi show channel                    | 通道信息                                    |
| dahdi show status                     | 所有 DAHDI 卡状态                           |
| dahdi show version                    | DAHDI 版本                                  |
