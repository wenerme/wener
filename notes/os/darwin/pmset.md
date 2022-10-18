---
title: pmset
---

## pmset

- 参考
  - wiki [Pmset](https://en.wikipedia.org/wiki/Pmset)
  - [pmset](https://www.dssw.co.uk/reference/pmset.html) man
  - https://www.freebsd.org/cgi/man.cgi?query=pmset&sektion=1&manpath=Darwin
  - https://opensource.apple.com/source/PowerManagement/PowerManagement-321.5.3/pmset/

```bash
# 避免待机
caffeinate
# 或
pmset noidel

# 查看当前配置 - 基于情况显示 AC 或 电池
pmset -g
# 所有配置
pmset -g custom

pmset restoredefaults # 电源配置恢复系统设置
pmset sleepnow        # 立即休眠

# 一次修改多个设置
pmset -a displaysleep 10 disksleep 10 sleep 30 womp 1
# standby https://support.apple.com/zh-cn/HT202124
pmset -a hibernatemode 3 standby 1 standbydelayhigh 150 standbydelaylow 0
```

| flag | for                           |
| ---- | ----------------------------- |
| -a   | all                           |
| -b   | bettery                       |
| -c   | charger, wall power, ac power |
| -u   | UPS                           |
| -g   | -> -g live 显示当前配置       |

- -g live - 当前配置
  - disk
  - cap - 支持的特性
  - shed - scheduled startup/wake and shutdown/sleep events
  - ups - UPS emergency thresholds
  - ps - status of batteries and UPSs
  - pslog - 监听日志
  - batt

| conf                 | default            | for                                                                                                        |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| acwake               | 0                  | 充电时唤醒                                                                                                 |
| autopoweroff         | 1                  | 是否自动停止电源                                                                                           |
| autopoweroffdelay    | 14400              | 进入自动停止电源模式的延迟,秒                                                                              |
| lowpowermode         | 1                  | 低电量模式                                                                                                 |
| disksleep            | 10                 | 磁盘睡眠定时器                                                                                             |
| displaysleep         | 10                 | 显示器睡眠定时器,分钟,0 禁用                                                                               |
| gpuswitch            | 2                  | GUP 切换                                                                                                   |
| halfdim              | 1                  | 显示器休眠使用更暗的亮度，而不是直接关                                                                     |
| hibernatefile        | /var/vm/sleepimage | 休眠时转储的文件                                                                                           |
| hibernatemode        | 3                  | 休眠模式,分钟,0 禁用                                                                                       |
| highstandbythreshold | 50                 |
| lidwake              | 1                  | 笔记本开盖时唤醒                                                                                           |
| networkoversleep     | 0                  |
| powernap             | 1                  | 是否启用 Power Nap                                                                                         |
| proximitywake        | 1                  | 相同 iCloud ID 设备接近时唤醒                                                                              |
| sleep                | 1                  | 系统睡眠定时器,分钟,0 禁用                                                                                 |
| standby              | 1                  | 是否让电源管理器自动休眠系统.                                                                              |
| ~~standbydelay~~     | 10800              | 写入休眠镜像到磁盘之前和停止给内存供电的延迟,秒                                                            |
| standbydelayhigh     | 150                | 写休眠镜像的延时，秒                                                                                       |
| standbydelaylow      | 0                  | 写休眠镜像的延时，秒                                                                                       |
| ttyskeepawake        | 1                  | 当任何 tty 处于'激活'的时候都使系统不会进入睡眠.当 tty 的空闲时间超过系统睡眠时间后便不再处于 '激活' 状态. |
| womp                 | 1                  | 是否启用网络唤醒                                                                                           |
| tcpkeepalive         | 1                  |

> **Note**
>
> default 根据 mac 型号不同而不同

- autorestart 是否在断电后自动重启
- ring - wake on modem ring
- lessbright - slightly turn down display brightness when switching to this power source
- sms - use Sudden Motion Sensor to park disk heads on sudden changes in G force
- networkoversleep - this setting affects how OS X networking presents shared network services during system sleep. This setting is not used by all platforms; changing its value is unsupported.
- destroyfvkeyonstandby - Destroy File Vault Key when going to standby mode. By default File vault keys are retained even when system goes to standby. If the keys are destroyed, user will be prompted to enter the password while coming out of standby mode.(value: 1 - Destroy, 0 - Retain)
- womp - wake on ethernet magic packet
- reduce - CPU 降速
- lessbright
- sms - Sudden Motion Sensor
- hibernatemode
- 配置
  - 系统 /Library/Preferences/SystemConfiguration/com.apple.PowerManagement.plist
  - Scheduled /Library/Preferences/SystemConfiguration/com.apple.AutoWake.plist

```bash
# 其他参数
#  boot 重启系统
#  force 强制 PM(Power Management) 立即激活设置.不讲设置写到磁盘,可以使设置能够很容易被重写.当在特殊场景下 PM 未运行时很有帮助.
#  touch PM 从新从磁盘读取现有配置
#  noidle 避免空闲时进入睡眠模式,该命令已被废弃,使用 caffeinate 替代
#  sleepnow 立即使系统进入睡眠
#  restoredefaults 恢复节能程序到默认值
#  displaysleepnow 使显示器立即进入睡眠
#  resetdisplayambientparams 重置指定显示器的环境光参数

# 修改时指定范围
#		-b 电池
#		-c 链接了电源, UPS ( -u )
#		-u UPS
#		-a 所有
```

- 休眠模式
  - 0 - Legacy sleep mode - 不会将内存持久化到存储.在断电时内存数据会丢失.
  - 1 - Legacy Safe Sleep
  - 3 - Default - 会将内存拷贝到存储,当睡眠时也会给内存供电,系统会尝试从内存启动,如果断电会强制从磁盘恢复.
    - 默认为该选项
  - 25 会将内存拷贝到存储,并且停止给内存供电,启动时会从磁盘恢复内存.
    - 省电,电池寿命更久
    - 但睡眠和唤醒更慢
- 如果系统支持 standby, 则在超过 standbydely 后就会写一个休眠镜像
- 如果要完全禁止休眠,可将 hibernatemode, standby 和 autopoweroff 设置为 0

## Unable to sleep system: error 0xe00002e2

```bash
sudo pmset -a disablesleep 0
```
