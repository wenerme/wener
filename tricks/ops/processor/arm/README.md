

# profilee
* A - Application
* R - Realtime

https://en.wikipedia.org/wiki/ARM_architecture

## armhf
* ARM hard float
  * VFP3-D16 硬件浮点数
  * Thumb-2
* armhf 一般最小可支持 armv4t
  * Raspberry Pi Zero - ARMv6Z BCM2835
* Ubuntu、Debian 一般指 armv7

## armv7
* armv7 - 属于 armhf 和 aarch64 中间

## aarch64
* [aarch64](https://en.wikipedia.org/wiki/Aarch64)
* ARMv8-A - 64 位的 arm

http://single-boards.com/armv6-vs-armv7/



https://wiki.debian.org/ArmHardFloatPort
https://en.wikipedia.org/wiki/ARM_architecture

armel is armv4t, not armv6

https://wiki.debian.org/ArmEabiPort

Actually, armel is armv4t, not armv6. And it uses soft float instead of hard float. As you have seen, armel does work on all models of RPi, but it will run much slower because it is not taking advantage of the hardware floating point and other features of the newer ARM processors.

Raspbian uses the "armhf" identifier like official Debian armhf, but it is rebuilt for armv6 instead of armv7l.

You can pass the Raspbian archive URL http://archive.raspbian.org/raspbian as the MIRROR option of debootstrap to bootstrap your own Raspbian rootfs that will work on all models of RPi.
