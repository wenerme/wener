---
title: OS Awesome
tags:
  - Awesome
---

# OS Awesome

**Cross OS Components Compare**

| vs.                 | Windows    | macOS   | AlpineLinux | Debian  | Ubuntu  | RHEL  | OpenWRT | FreeBSD |
| ------------------- | ---------- | ------- | ----------- | ------- | ------- | ----- | ------- | ------- |
| Kernel              | Windows NT | XUN     | Linux       | Linux   | Linux   | Linux | Linux   | BSD     |
| Package Manager     | nuget      | brew    | apk         | apt     | apt     | yum   | opkg    | pkg     |
| init                |            | launchd | openrc/bbox | systemd | upstart |       |         |         |
| Service Management  |            | launchd | openrc      | systemd | systemd |       |         |         |
| Desktop Environment |            | Aqua    |             |         | GNOME   |       |         |         |
| Firewall            |            | pf      | iptables    |         | ufw     |       |         | pf,ipfw |
| Virtualization      | hyperv/hax | hvf/hax | kvm         | kvm     | kvm     | kvm   | -       | bhyve   |
| Shell               | cmd,ps     | zsh     | ash         | bash    | bash    | bash  |         | csh,sh  |

---

- [redox-os/redox](https://github.com/redox-os/redox)
  - MIT, Rust
- [vlang/vinix](https://github.com/vlang/vinix)
  - GPL-3.0, Vlang
- [cloudius-systems/osv](https://github.com/cloudius-systems/osv)
  OSv - os for the cloud.
- [FuchsiaOS](https://fuchsia.dev/)
  - BSD, MIT, Apache License 2.0
  - Zircon ROTS 内核
- [SerenityOS/serenity](https://github.com/SerenityOS/serenity)
  - BSD-3, C++
  - Unix-like, 90 年代风格, x86_32
- [haiku/haiku](https://github.com/haiku/haiku)
  - MIT
- [reactos/reactos](https://github.com/reactos/reactos)
  兼容 Windows 的 Linux
  - GPL-2
- [mszoek/airyx](https://github.com/mszoek/airyx)
  - BSD, ObjC
  - 尝试兼容 macOS 并提供相同的体验
- [SerenityOS/serenity](https://github.com/SerenityOS/serenity)
  - Graphical Unix-like operating system for x86 computers
- [bottlerocket-os/bottlerocket](https://github.com/bottlerocket-os/bottlerocket)
  - designed for hosting containers
- [siderolabs/talos](https://github.com/siderolabs/talos)
  - Linux distribution built for Kubernetes
- [nakst/essence](https://gitlab.com/nakst/essence)

---

- [zriyansh/awesome-os](https://github.com/zriyansh/awesome-os)

## 不活跃

- [mit-pdos/biscuit](https://github.com/mit-pdos/biscuit)

## Embedded

- [tock/tock](https://github.com/tock/tock)
  - MIT, Apache-2.0, Rust
  - secure embedded os for microcontrollers
- [mudita/MuditaOS](https://github.com/mudita/MuditaOS)
  - Mobile operating system based on FreeRTOS™ optimized for E Ink displays

## Linux Distro

- [reactos](https://github.com/reactos/reactos)
  - 兼容 Windows™ NT - Windows NT4, 2000, XP, 2003, Vista, 7
- Media Center
  - [LibreELEC](https://libreelec.tv/)
    Libre Embedded Linux Entertainment Center
    - fork of OpenELEC at 2016
    - [LibreELEC/LibreELEC.tv](https://github.com/LibreELEC/LibreELEC.tv)
    - Just enough OS for KODI
    - RPi 4 支持 HEVC/H.265 硬解
    - RPi 2+ 支持 H.264 硬解
  - [osmc.tv](https://osmc.tv/)
  - OpenELEC
  - GeeXboX
  - Recalbox
  - LinuxMCE
  - LinHES
- Gaming
  - [lakka.tv](https://www.lakka.tv/)
    - 电视、复古游戏
    - 基于 LibreELEC, RetroArch
    - [libretro/Lakka-LibreELEC](https://github.com/libretro/Lakka-LibreELEC)
    - [libretro/RetroArch](https://github.com/libretro/RetroArch)
    - [Hardware-support](https://www.lakka.tv/doc/Hardware-support)
  - https://emulation.ninja/
- Retropie,Recalbox,Lakka,Batocera
- unRAID, LIME TECH
- [kentjhall/horizon-linux](https://github.com/kentjhall/horizon-linux)
  - arm64 Linux patched to run programs for the Nintendo Switch’s Horizon OS
  - [HN](https://news.ycombinator.com/item?id=32464955)
- [oasislinux/oasis](https://github.com/oasislinux/oasis)
  - small statically-linked linux system
  - [HN](https://news.ycombinator.com/item?id=32458744)

## Retro Game

- [MiSTer-devel/Main_MiSTer](https://github.com/MiSTer-devel/Main_MiSTer)
- [atari-2600](https://voxodyssey.com/atari-2600)
  - [HN](https://news.ycombinator.com/item?id=28931183)
- https://akedo.app/
  - https://news.ycombinator.com/item?id=31823898

## BSD

- [ravynsoft/ravynos](https://github.com/ravynsoft/ravynos)
  - experience like and some compatibility with macOS
- [OpenBSD Router Guide](https://openbsdrouterguide.net/)

## Kernel

- [jjyr/bootgo](https://github.com/jjyr/bootgo)
  barebones OS kernel
  - MIT, Go
- [vvaltchev/tilck](https://github.com/vvaltchev/tilck)
  Tiny Linux-Compatible Kernel
  - BSD-2, C
- [nuta/kerla](https://github.com/nuta/kerla)
  - MIT, Apache-2.0, Rust

## Boot

- [Ventoy](https://ventoy.net)
  - bootable USB drive for ISO/WIM/IMG/VHD(x)/EFI
  - USB/Local Disk/SSD/NVMe/SD Card
  - MBR, GPT
  - x86 Legacy BIOS, IA32 UEFI, x86_64 UEFI, ARM64 UEFI, MIPS64EL UEFI
  - Windows/WinPE/Linux/ChromeOS/Unix/VMware/Xen
  - [ventoy/Ventoy](https://github.com/ventoy/Ventoy)
    - GPL-3.0, C

## Emulator

- [pokemium/magia](https://github.com/pokemium/magia)
  GBA emulator
  - MIT, Golang
- [Zekfoo/AGZ](https://github.com/Zekfoo/AGZ)
  - circuit-level redesign of the Game Boy Advance
- [JetSetIlly/Gopher2600](https://github.com/JetSetIlly/Gopher2600)
  Atari 2600/VCS Emulator
- [POKEGB: a gameboy emulator that only plays Pokémon blue](https://binji.github.io/posts/pokegb/)
  - [pokegb.cc](https://gist.github.com/binji/395669d45e9005950232043ab4378abe)
    未混淆的原始代码
- [uxn](https://100r.co/site/uxn.html)
  portable 8-bit virtual computer
- [VitorVilela7/wide-snes](https://github.com/VitorVilela7/wide-snes)
- [Myself086/Project-Nested](https://github.com/Myself086/Project-Nested)
  - NES emulator running on SNES
- [NES Architecture](https://www.copetti.org/writings/consoles/nes/)
- [SNES Architecture](https://www.copetti.org/writings/consoles/super-nintendo/)
- [GBA Architecture](https://www.copetti.org/writings/consoles/game-boy/)
- [NMOS 6502 Opcodes](http://www.6502.org/tutorials/6502opcodes.html)
- [Statically Recompiling NES Games into Native Executables with LLVM and Go](https://andrewkelley.me/post/jamulator.html)
- wikipedia [MOS Technology 6502](https://en.wikipedia.org/wiki/MOS_Technology_6502)
- [ROM Hack](https://www.romhacking.net/)
- [The Cutting Room Floor](https://tcrf.net/)
- [C64 BASIC & KERNAL ROM Disassembly](https://www.pagetable.com/c64ref/c64disasm/)
- [aappleby/MetroBoy](https://github.com/aappleby/MetroBoy)
  - gate-level simulators and for Game Boy
  - [HN](https://news.ycombinator.com/item?id=28396927)
- [Exploring the Amiga - Part 1](https://www.thedigitalcatonline.com/blog/2018/05/28/exploring-the-amiga-1/)
- [AlexAltea/orbital](https://github.com/AlexAltea/orbital)
  - PS4
- Playstation 3 Architecture [HN](https://news.ycombinator.com/item?id=28934624)
- Famicom Party: Making NES Games in Assembly [HN](https://news.ycombinator.com/item?id=29069095)
- https://sourceforge.net/projects/vm02/
  - Java 6502
- NES 64 – Commodore 64 Kernal and Basic ROMs Ported to the NES
  - [HN](https://news.ycombinator.com/item?id=30351755)
- Playstation
  - [nkanaev/tipsy](https://github.com/nkanaev/tipsy)
    - PS1-like software renderer
    - ~500 lines of C99

## 开发

- https://wiki.osdev.org
- [tuhdo/os01](https://github.com/tuhdo/os01)
  - Bootstrap yourself to write an OS from scratch
- [isometimes/rpi4-osdev](https://github.com/isometimes/rpi4-osdev)
  - [HN](https://news.ycombinator.com/item?id=28774022)
- https://news.ycombinator.com/favorites?id=Gunax
- [klange/toaruos](https://github.com/klange/toaruos)

## Firmware

- [obdev/v-usb](https://github.com/obdev/v-usb)
  - Atmel's AVR Microcontrollers

## Forth

- http://www.forth.org/svfig/osf.html
- https://forth-standard.org/systems
- https://github.com/ForthHub/wiki/wiki/Forth-Systems

## assm

- Minias – A mini x86-64 assembler for fun and learning [HN](https://news.ycombinator.com/item?id=28884768)
- [skilldrick/easy6502](https://github.com/skilldrick/easy6502)
- http://www.projectoberon.com/

## Misc

- [marcan/takeover.sh](https://github.com/marcan/takeover.sh)

## Package manager

- [jordansissel/fpm](https://github.com/jordansissel/fpm)
