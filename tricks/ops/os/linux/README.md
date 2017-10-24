# Linux
## Tips

## cpufrequtils
* [CPU frequency scaling](https://wiki.archlinux.org/index.php/CPU_frequency_scaling)

```bash
# 查看相关模块
ls /usr/lib/modules/$(uname -r)/kernel/drivers/cpufreq/

# System Utilities Based on Sysfs
# systool 
# get_{device,driver,module}
# dlist_test
apk add sysfsutils
# A small daemon to adjust cpu speed (and indeed voltage)
# init.d: cpufreqd
# cpufreqd cpufreqd-set cpufreqd-get
apk add cpufreqd
# Userspace tools for the kernel cpufreq subsystem
# init.d: cpufrequtils
# cpufreq-{info,set,aperf}
apk add cpufrequtils


# 基于 ACPI 的 CPU 频率模块
modprobe acpi-cpufreq
# 基于 HP 的 Processor Clocking Control 跑路模块
# ProLiant 服务器上会有
modprobe pcc-cpufreq
```
