---
title: vcgencmd - Raspberry Pi GPU Firmware CLI
tags:
  - Hardware
  - RaspberryPi
  - CLI
  - Diagnostics
  - GPU
  - Firmware
---

# vcgencmd

`vcgencmd` is a command-line tool for the Raspberry Pi that allows you to query the GPU firmware for various system and hardware information.

- [Official vcgencmd Documentation](https://www.raspberrypi.com/documentation/computers/os.html#vcgencmd)

## Installation

```bash
# Alpine Linux
apk add raspberrypi-utils-vcgencmd
```

## Common Commands

### System Information & Health

```bash
vcgencmd version            # Show firmware version
vcgencmd measure_temp       # Show GPU temperature
vcgencmd get_throttled      # Check for under-voltage or overheating issues (see breakdown below)
vcgencmd measure_clock arm  # Show ARM (CPU) clock frequency in Hz
vcgencmd measure_volts core # Show core voltage
```

### Memory & Display

```bash
vcgencmd get_mem arm     # Show memory allocated to ARM (CPU) in MB
vcgencmd get_mem gpu     # Show memory allocated to GPU in MB
vcgencmd display_power 1 # Turn display power ON
vcgencmd display_power 0 # Turn display power OFF
```

### Codecs & Hardware Acceleration

```bash
vcgencmd codec_enabled H264  # Check if H264 hardware codec is enabled
vcgencmd codec_enabled MJPEG # Check if MJPEG hardware codec is enabled
```

## `get_throttled` Bitmask Breakdown

The value returned by `vcgencmd get_throttled` is a bitmask where each bit represents a specific state.

| Bit    | Hex Value | Description                                                |
| :----- | :-------- | :--------------------------------------------------------- |
| **0**  | `0x1`     | **Under-voltage detected** (Lightning bolt icon).          |
| **1**  | `0x2`     | **ARM frequency capped** (Frequency limited).              |
| **2**  | `0x4\*\*  | **Currently throttled**.                                   |
| **3**  | `0x8`     | **Soft temperature limit active**.                         |
| **16** | `0x10000` | **Under-voltage has occurred** since last reboot.          |
| **17** | `0x20000` | **ARM frequency capped has occurred** since last reboot.   |
| **18** | `0x40000` | **Throttling has occurred** since last reboot.             |
| **19** | `0x80000` | **Soft temperature limit has occurred** since last reboot. |

## Raw Output Examples

### `vcgencmd measure_volts` Options

```text
volt=0.8563V (core)
volt=1.1000V (sdram_c)
volt=1.1000V (sdram_i)
volt=1.1000V (sdram_p)
```

### `vcgencmd get_config int` (Abbreviated)

```text
arm_64bit=1
arm_freq=1500
core_freq=500
total_mem=1024
```

## Resources

- [RPi vcgencmd Usage Guide (eLinux)](https://elinux.org/RPI_vcgencmd_usage)
- [Raspberry Pi Userland GitHub](https://github.com/raspberrypi/userland)
