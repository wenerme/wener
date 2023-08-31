# 树莓派架构

- RPi Zero - ARMv6Z (32-bit) - BCM2835
- RPi 3B - ARMv8-A (64/32-bit) - BCM2837
- RPi 3B+ - ARMv8-A (64/32-bit) - BCM2837B0
- RPi 4B - ARMv8-A (64/32-bit) - BCM2711
- 参考
  - [Raspberry Pi](https://en.wikipedia.org/wiki/Raspberry_Pi)
- 如果要支持树莓派 Zero 和 树莓派 3+ - 则建议选择 alpinelinux armhf
  - 但不少软件不支持 armhf
    - chromium
    - firefox
      - armv4t - 最后版本 38 - https://pkgs.alpinelinux.org/packages?name=firefox&branch=v3.3&arch=armhf
      - debian 类的 armhf 一般指 armv7l
