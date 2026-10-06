---
title: Raspberry Pi Emulation
description: How to emulate a Raspberry Pi with QEMU raspi machines (raspi3b/raspi4b), the generic virt board, or qemu-user + binfmt for ARM chroots and containers, plus what Renode actually supports.
tags:
  - Hardware
  - RaspberryPi
  - Simulation
  - Emulation
  - QEMU
---

# Raspberry Pi Emulation

Simulating or emulating a Raspberry Pi allows for software development and testing without physical hardware.

| Approach                         | What you get                                | Good for                                         |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| QEMU `raspi*` machine            | Board model, boots RPi kernel + DTB         | Boot/kernel debugging, RPi-specific peripherals  |
| QEMU `virt` machine              | Generic ARM VM, virtio, PCIe, lots of RAM   | Running RPi OS userland fast, KVM/HVF on ARM hosts |
| qemu-user + binfmt_misc          | Run ARM binaries on x86 host, no kernel     | chroot into images, arm64/armv7 containers, CI   |
| Renode                           | Deterministic multi-node simulation         | MCU (e.g. RP2040) firmware, not full RPi boards  |

- See [Raspberry Pi Guide](./raspberry-pi.md) for the legacy `versatilepb` QEMU setup.

## QEMU raspi machines

| Machine              | CPU                    | RAM     |
| -------------------- | ---------------------- | ------- |
| `raspi0`, `raspi1ap` | ARM1176JZF-S           | 512 MiB |
| `raspi2b`            | Cortex-A7 (4 cores)    | 1 GiB   |
| `raspi3ap`           | Cortex-A53 (4 cores)   | 512 MiB |
| `raspi3b`            | Cortex-A53 (4 cores)   | 1 GiB   |
| `raspi4b`            | Cortex-A72 (4 cores)   | 2 GiB   |

- `raspi4b` added in QEMU 9.0
- `raspi2` / `raspi3` renamed to `raspi2b` / `raspi3b`, old names removed in QEMU 6.2
- No Raspberry Pi 5 machine is listed in the QEMU docs
- `-m` must match the board RAM, otherwise `Invalid RAM size, should be ...`
- `qemu-system-aarch64` for 64-bit guests, `qemu-system-arm` or `qemu-system-aarch64` for 32-bit
- Implemented: CPU, interrupt controller, DMA, CPRMAN, system timer, GPIO, UART (AUX 16550 + PL011), RNG, framebuffer, USB host (DWC2), SD/MMC, thermal sensor, mailbox, VideoCore firmware property, SPI, I2C (BSC)
- Missing: PWM; on `raspi4b` also PCIe root port and GENET Ethernet
  - QEMU removes the pcie, rng200, thermal and genet nodes from the BCM2711 DTB
  - no PCIe means no xHCI USB on `raspi4b`
- https://www.qemu.org/docs/master/system/arm/raspi.html

### Boot Raspberry Pi OS on raspi3b

Linux host (Ubuntu/Debian), needs `qemu-system-arm`, `qemu-utils`, `xz-utils`. Images: [Raspberry Pi OS downloads](https://www.raspberrypi.com/software/operating-systems/).

```bash
xz -d 2023-05-03-raspios-bullseye-arm64.img.xz
IMG=2023-05-03-raspios-bullseye-arm64.img

# SD image size must be a power of 2
qemu-img resize -f raw $IMG 8G

# copy kernel8.img and DTBs from the first (FAT) partition
fdisk -l $IMG # Start * 512 = offset, e.g. 8192 * 512
sudo mkdir -p /mnt/image
sudo mount -o loop,offset=4194304 $IMG /mnt/image
cp /mnt/image/kernel8.img /mnt/image/bcm2710-rpi-3-b-plus.dtb /mnt/image/bcm2711-rpi-4-b.dtb .

# headless: enable SSH + preset user
sudo touch /mnt/image/ssh
echo "pi:$(openssl passwd -6)" | sudo tee /mnt/image/userconf.txt
sudo umount /mnt/image

qemu-system-aarch64 -M raspi3b -m 1G -nographic \
  -kernel kernel8.img -dtb bcm2710-rpi-3-b-plus.dtb \
  -drive file=$IMG,format=raw,if=sd \
  -append "rw earlyprintk loglevel=8 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p2 rootdelay=1" \
  -device usb-net,netdev=net0 \
  -netdev user,id=net0,hostfwd=tcp:127.0.0.1:2222-:22

# in another host shell
ssh -p 2222 pi@localhost
```

- `hostfwd=tcp::2222-:22` without an address listens on all host interfaces; bind `127.0.0.1` for local debugging

- No on-board Ethernet is emulated, so networking goes through the emulated USB `usb-net` adapter
- Kernel file names, see `config.txt` docs
  - `kernel.img` Pi 1/Zero, `kernel7.img` Pi 2/3, `kernel8.img` 64-bit, `kernel7l.img` Pi 4 32-bit
  - `kernel_2712.img` Pi 5 (no QEMU machine)
- Bookworm+ mounts the boot partition at `/boot/firmware` and ships an `initramfs`
- DTB: `bcm2710-rpi-3-b*.dtb` for raspi3b, `bcm2711-rpi-4-b.dtb` for raspi4b
- https://interrupt.memfault.com/blog/emulating-raspberry-pi-in-qemu

### Boot on raspi4b

```bash
qemu-system-aarch64 -M raspi4b -m 2G -nographic \
  -kernel kernel8.img -dtb bcm2711-rpi-4-b.dtb \
  -drive file=$IMG,format=raw,if=sd \
  -append "earlycon=pl011,mmio32,0xfe201000 console=ttyAMA0,115200 root=/dev/mmcblk1p2 rootwait dwc_otg.fiq_fsm_enable=0"
```

- Root is `mmcblk1p2` on raspi4b (`mmcblk0p2` on raspi3b); depends on the kernel/DTB used
- Reference template: cmdline taken from QEMU's functional test [test_raspi4.py](https://gitlab.com/qemu-project/qemu/-/blob/master/tests/functional/aarch64/test_raspi4.py), which checks early boot only, not a full SD-card boot
- No GENET/PCIe, so expect no networking without extra work

### Known issues

- [qemu#2351](https://gitlab.com/qemu-project/qemu/-/issues/2351) Raspberry Pi: Unable to start raspios bookworm
  - Bullseye boots on raspi3b/raspi4b, `2024-03-15-raspios-bookworm-arm64-lite` only prints `usbnet: failed control transaction` (QEMU 9.0.0)
- [Akinori-Furuta/qemu-raspberrypi](https://github.com/Akinori-Furuta/qemu-raspberrypi/)
  - Scripts + dkms driver to run Raspberry Pi OS Trixie/Bookworm on emulated raspi3b/raspi2b, needs QEMU 8.2.2+
- [dhruvvyas90/qemu-rpi-kernel](https://github.com/dhruvvyas90/qemu-rpi-kernel)
  - legacy `versatilepb` kernels, Raspbian Buster/Stretch era

## QEMU virt machine

The `virt` board does not correspond to real hardware. It is the recommended board for just running Linux: PCI/PCIe, virtio, many CPUs, large RAM, and KVM on aarch64 hosts. It needs a kernel built for `virt` (virtio drivers), so the stock RPi `kernel8.img` is not the target here. Reuse the RPi OS rootfs with a generic arm64 kernel + initrd instead.

```bash
qemu-system-aarch64 -M virt -cpu cortex-a72 -smp 4 -m 4G -nographic \
  -kernel Image -initrd initrd.img \
  -append "root=/dev/vda2 console=ttyAMA0" \
  -drive file=raspios.img,format=raw,if=virtio \
  -device virtio-net-pci,netdev=net0 \
  -netdev user,id=net0,hostfwd=tcp::2222-:22
```

- `-cpu` is required for AArch64 (default is 32-bit `cortex-a15`)
- On arm64 hosts: `-accel kvm` (Linux) / `-accel hvf` (macOS) with `-cpu host`
- https://www.qemu.org/docs/master/system/arm/virt.html
- https://www.qemu.org/docs/master/system/target-arm.html

## qemu-user + binfmt

Runs individual ARM Linux binaries on the host kernel via syscall translation. No board, no kernel, much faster than full-system emulation.

```bash
# Debian/Ubuntu, Debian 13 qemu-user-static -> qemu-user + qemu-user-binfmt
sudo apt install qemu-user-static
ls /proc/sys/fs/binfmt_misc/ # qemu-aarch64, qemu-arm

# chroot into a Raspberry Pi OS image
LOOP=$(sudo losetup -Pf --show raspios.img) # first free device, e.g. /dev/loop3
sudo mkdir -p /mnt/rpi
sudo mount ${LOOP}p2 /mnt/rpi
sudo mount ${LOOP}p1 /mnt/rpi/boot/firmware # /mnt/rpi/boot before Bookworm
for d in dev proc sys; do sudo mount --bind /$d /mnt/rpi/$d; done
sudo chroot /mnt/rpi /bin/bash
# after exit
sudo umount -R /mnt/rpi && sudo losetup -d $LOOP
```

```bash
# containers
docker run --privileged --rm tonistiigi/binfmt --install arm64,arm
docker run --rm --platform linux/arm64 debian uname -m
docker buildx build --platform linux/arm64,linux/arm/v7 .
```

- binfmt_misc `F` (fix binary) flag opens the interpreter at registration time, so it works inside chroots and mount namespaces without copying `qemu-*-static` into the rootfs
- Docker Desktop and official BuildKit releases bundle QEMU, manual install needs kernel 4.8+ and static QEMU registered with `F`
- Emulation is much slower than native for compile/compression heavy work
- qemu-user does not support `clone` namespace flags, so container runtimes can't run inside it
- https://www.qemu.org/docs/master/user/main.html
- https://docs.kernel.org/admin-guide/binfmt-misc.html
- https://docs.docker.com/build/building/multi-platform/
- https://github.com/tonistiigi/binfmt

## Renode

Open source framework from Antmicro for deterministic, multi-node simulation with CI integration.

- No Raspberry Pi (BCM2711) board platform upstream, only a `BCM2711_AUX_UART` peripheral model in renode-infrastructure
- RP2040 (Raspberry Pi Pico): community [matgla/Renode_RP2040](https://github.com/matgla/Renode_RP2040) (WIP/frozen)
- Custom platforms can be described in `.repl` files
- [Renode Official Site](https://renode.io/)
- [Supported boards](https://renode.readthedocs.io/en/latest/introduction/supported-boards.html)

## Use Cases

- **Kernel Development**: Debugging early boot code without constant SD card flashing.
- **CI/CD Pipelines**: Automated testing of Raspberry Pi OS images in the cloud.
- **Education**: Learning Linux and ARM assembly without purchasing hardware.
- **Network Simulation**: Testing distributed systems across multiple virtualized Pi nodes.
- **Image customization**: chroot via qemu-user to preinstall packages before flashing.
