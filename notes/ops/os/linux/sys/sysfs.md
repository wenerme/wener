# sysfs

## Tips
* [/sysfs/class/net](https://www.kernel.org/doc/Documentation/ABI/testing/)

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
