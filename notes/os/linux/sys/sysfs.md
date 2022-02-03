# sysfs

## Tips
- [/sysfs/class/net](https://www.kernel.org/doc/Documentation/ABI/testing/)
- /proc/sysrq-trigger
- /sys/block/mmcblk0/mmcblk0p2/ro
- /proc/pressure - PSI - Pressure Stall Information  - v4.20 - Facebook 2018
  - io
  - cpu
  - memory
- /sys/fs/cgroup/cg1/io.pressure

- CONFIG_PSI=y
- CONFIG_PSI_DEFAULT_DISABLED=y
  - psi=1

```
cat /boot/config-lts | grep PSI
```

```
for_each_possible_cpu(cpu)

nr_active += cpu_of(cpu)->nr_running + cpu_of(cpu)->nr_uninterruptible;

avenrun[n] = avenrun[0] * exp_n + nr_active * (1 - exp_n)
```

- avg10、avg60、avg300 分别代表 10s、60s、300s 的时间周期内的阻塞时间百分比。total 是总累计时间，以毫秒为单位。
- https://facebookmicrosites.github.io/psi/docs/overview
- https://www.kernel.org/doc/html/latest/accounting/psi.html
- https://lwn.net/Articles/759658/
- https://lwn.net/Articles/759781/

```
find /sys -type f -name power_now 2>/dev/null
sensors power_meter-acpi-0
```

/proc/acpi/battery/BAT0/state
/sys/bus/acpi/drivers/battery/PNP0C0A:00/power_supply/BAT0/power_now

tlp-stat -b
--- TLP 1.1 --------------------------------------------

+++ Battery Status
/sys/class/power_supply/BAT1/manufacturer                   = SANYO
/sys/class/power_supply/BAT1/model_name                     = L12S3F01
/sys/class/power_supply/BAT1/cycle_count                    =     16
/sys/class/power_supply/BAT1/energy_full_design             =  32560 [mWh]
/sys/class/power_supply/BAT1/energy_full                    =  16180 [mWh]
/sys/class/power_supply/BAT1/energy_now                     =  16090 [mWh]
/sys/class/power_supply/BAT1/power_now                      =      0 [mW]
/sys/class/power_supply/BAT1/status                         = Unknown

Charge                                                      =   99.4 [%]
Capacity                                                    =   49.7 [%]

modprobe i2c-dev
sensors-detect

