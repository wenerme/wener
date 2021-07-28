---
title: OS Awesome
---

# OS Awesome

**Cross OS Components Compare**

| vs.                 | Windows    | macOS   | AlpineLinux | Debian  | RHEL  | OpenWRT | FreeBSD |
| ------------------- | ---------- | ------- | ----------- | ------- | ----- | ------- | ------- |
| Kernel              | Windows NT | XUN     | Linux       | Linux   | Linux | Linux   | BSD     |
| Package Manager     | nuget      | brew    | apk         | apt     | yum   | opkg    | pkg     |
| init                |            | launchd | openrc/bbox | systemd |
| Service Management  |            | launchd | openrc      | systemd |
| Desktop Environment |            | Aqua    |             |         |
| Firewall            |            | pf      | iptables    |         |       |         | pf,ipfw |
| Virtualization      | hyperv/hax | hvf/hax | kvm         | kvm     | kvm   | -       | bhyve   |

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
  - fuchsia [source](https://fuchsia.googlesource.com/)
  - 中文 [文档](https://github.com/FuchsiaOS/FuchsiaOS-docs-zh_CN)
  - [dahliaOS](https://github.com/dahliaOS)
    - FuchsiaOS on Linux/Zircon
    - Emulator, Prebuild Image
- [SerenityOS/serenity](https://github.com/SerenityOS/serenity)
  - BSD-3, C++
  - Unix-like, 90 年代风格, x86_32
- [haiku/haiku](https://github.com/haiku/haiku)
  - MIT
- [reactos/reactos](https://github.com/reactos/reactos)
  兼容 Windows 的 Linux
  - GPL-2

## 不活跃

- [mit-pdos/biscuit](https://github.com/mit-pdos/biscuit)

## Linux Distro

- [lakka.tv](http://www.lakka.tv/)
  - 电视、复古游戏
  - 基于 LibreELEC, RetroArch
  - [libretro/Lakka-LibreELEC](https://github.com/libretro/Lakka-LibreELEC)
  - [libretro/RetroArch](https://github.com/libretro/RetroArch)
- [reactos](https://github.com/reactos/reactos)
  - 兼容 Windows™ NT - Windows NT4, 2000, XP, 2003, Vista, 7

## Kernel

- [jjyr/bootgo](https://github.com/jjyr/bootgo)
  barebones OS kernel
  - MIT, Go

## Emulator

- [pokemium/magia](https://github.com/pokemium/magia)
  GBA emulator
  - MIT, Golang
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

## 开发

- https://wiki.osdev.org
