---
title: Raspberry Pi Emulation
tags:
  - Hardware
  - RaspberryPi
  - Simulation
  - Emulation
  - QEMU
---

# Raspberry Pi Emulation

| 方法                    | 能力                                   | 用途                                       |
| ----------------------- | -------------------------------------- | ------------------------------------------ |
| QEMU `raspi*` machine   | 板卡模型，启动 RPi kernel + DTB        | 启动/内核调试，RPi 专有外设                |
| QEMU `virt` machine     | 通用 ARM VM，virtio、PCIe、大内存      | 运行 RPi OS userland；ARM host 上 KVM/HVF  |
| qemu-user + binfmt_misc | x86 host 运行 ARM 二进制，无内核       | chroot 进镜像，arm64/armv7 容器，CI        |
| Renode                  | 确定性多节点模拟                       | MCU（如 RP2040）固件，非完整 RPi 板卡      |

- 旧版 `versatilepb` QEMU 配置见 [Raspberry Pi Guide](./raspberry-pi.md)

## QEMU raspi machines

| Machine              | CPU                    | RAM     |
| -------------------- | ---------------------- | ------- |
| `raspi0`, `raspi1ap` | ARM1176JZF-S           | 512 MiB |
| `raspi2b`            | Cortex-A7 (4 cores)    | 1 GiB   |
| `raspi3ap`           | Cortex-A53 (4 cores)   | 512 MiB |
| `raspi3b`            | Cortex-A53 (4 cores)   | 1 GiB   |
| `raspi4b`            | Cortex-A72 (4 cores)   | 2 GiB   |

- 用途：kernel / early boot 调试，免反复刷 SD 卡
- `raspi4b` - QEMU 9.0+
- `raspi2` / `raspi3` 改名为 `raspi2b` / `raspi3b`，旧名 QEMU 6.2 移除
- QEMU 文档未列出 Raspberry Pi 5 machine
- `-m` 必须与板卡 RAM 一致，否则 `Invalid RAM size, should be ...`
- 64 位 guest 用 `qemu-system-aarch64`；32 位用 `qemu-system-arm` 或 `qemu-system-aarch64`
- 已实现：CPU、interrupt controller、DMA、CPRMAN、system timer、GPIO、UART (AUX 16550 + PL011)、RNG、framebuffer、USB host (DWC2)、SD/MMC、thermal sensor、mailbox、VideoCore firmware property、SPI、I2C (BSC)
- 未实现：PWM；`raspi4b` 另缺 PCIe root port、GENET Ethernet
  - QEMU 从 BCM2711 DTB 删除 pcie、rng200、thermal、genet 节点
  - 无 PCIe → `raspi4b` 无 xHCI USB

### Boot Raspberry Pi OS on raspi3b

- Host：Ubuntu / Debian
- 依赖：qemu-system-arm、qemu-utils、xz-utils
- 镜像：[Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/)

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

- `hostfwd=tcp::2222-:22` 不写地址时监听宿主所有接口；本机调试绑定 `127.0.0.1`
- 未模拟板载 Ethernet，网络走模拟的 USB 网卡 `usb-net`
- Kernel 文件名，见 `config.txt` 文档
  - `kernel.img` Pi 1/Zero，`kernel7.img` Pi 2/3，`kernel8.img` 64 位，`kernel7l.img` Pi 4 32 位
  - `kernel_2712.img` Pi 5（无 QEMU machine）
- Bookworm+ boot 分区挂载在 `/boot/firmware`，并带 `initramfs`
- DTB：raspi3b 用 `bcm2710-rpi-3-b*.dtb`，raspi4b 用 `bcm2711-rpi-4-b.dtb`

### Boot on raspi4b

```bash
qemu-system-aarch64 -M raspi4b -m 2G -nographic \
  -kernel kernel8.img -dtb bcm2711-rpi-4-b.dtb \
  -drive file=$IMG,format=raw,if=sd \
  -append "earlycon=pl011,mmio32,0xfe201000 console=ttyAMA0,115200 root=/dev/mmcblk1p2 rootwait dwc_otg.fiq_fsm_enable=0"
```

- raspi4b 的 root 为 `mmcblk1p2`（raspi3b 为 `mmcblk0p2`），取决于所用 kernel/DTB
- cmdline 模板来自 QEMU functional test [test_raspi4.py](https://gitlab.com/qemu-project/qemu/-/blob/master/tests/functional/aarch64/test_raspi4.py)，只检查 early boot，不是完整 SD 卡启动
- 无 GENET/PCIe，默认没有网络

### Known issues

- [qemu#2351](https://gitlab.com/qemu-project/qemu/-/issues/2351) Raspberry Pi: Unable to start raspios bookworm
  - raspi3b/raspi4b 可启动 Bullseye；`2024-03-15-raspios-bookworm-arm64-lite` 只输出 `usbnet: failed control transaction`（QEMU 9.0.0）
- [Akinori-Furuta/qemu-raspberrypi](https://github.com/Akinori-Furuta/qemu-raspberrypi/)
  - 脚本 + dkms 驱动，在模拟的 raspi3b/raspi2b 上运行 Raspberry Pi OS Trixie/Bookworm，需要 QEMU 8.2.2+
- [dhruvvyas90/qemu-rpi-kernel](https://github.com/dhruvvyas90/qemu-rpi-kernel)
  - 旧版 `versatilepb` kernel，Raspbian Buster/Stretch 时期

## QEMU virt machine

- 通用 ARM 板，不模拟具体 Raspberry Pi 硬件
- PCI / PCIe、virtio、多核、大内存
- 用途
  - 运行 Linux / RPi OS userland
  - 学习 Linux、ARM 汇编，无需购买硬件
  - 多个 VM 节点组网，测试分布式系统
- RPi OS rootfs + 通用 arm64 kernel / initrd
  - 内核需要 virt / virtio 支持
  - 不直接使用 RPi `kernel8.img`
- ARM64 host：KVM / HVF

```bash
qemu-system-aarch64 -M virt -cpu cortex-a72 -smp 4 -m 4G -nographic \
  -kernel Image -initrd initrd.img \
  -append "root=/dev/vda2 console=ttyAMA0" \
  -drive file=raspios.img,format=raw,if=virtio \
  -device virtio-net-pci,netdev=net0 \
  -netdev user,id=net0,hostfwd=tcp:127.0.0.1:2222-:22
```

- AArch64 必须指定 `-cpu`（默认为 32 位 `cortex-a15`）
- arm64 host：`-accel kvm`（Linux）/ `-accel hvf`（macOS）配合 `-cpu host`

## qemu-user + binfmt

- qemu-user
  - syscall 翻译，运行 ARM Linux 二进制
  - 使用宿主内核，不模拟板卡/内核
  - chroot、容器、镜像预装包；通常比整机模拟开销小
- 用途
  - 刷写前 chroot 进镜像预装软件包
  - CI 中测试 RPi OS 镜像、构建 arm64/armv7 容器镜像

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

- binfmt_misc `F` - fix binary
  - 注册时打开解释器
  - chroot / mount namespace 内无需再复制 `qemu-*-static`
- Docker Desktop / 官方 BuildKit 已包含 QEMU
- 手动注册：kernel 4.8+、静态 QEMU、`F` 标志
- 编译/压缩等重计算仍明显慢于原生
- qemu-user 不支持 `clone` namespace flags，不能在其中运行容器运行时

## Renode

- Antmicro，开源，多节点确定性模拟，支持 CI 集成
- 自定义平台：`.repl`

:::caution

- upstream 无 Raspberry Pi (BCM2711) 板卡平台
  - renode-infrastructure 仅有 `BCM2711_AUX_UART` 外设模型
  - 不等于可启动 Raspberry Pi OS 的整板模型
- RP2040 / Pico：社区项目 [matgla/Renode_RP2040](https://github.com/matgla/Renode_RP2040)，WIP / frozen

:::

## 参考

- QEMU
  - https://www.qemu.org/docs/master/system/arm/raspi.html
  - https://www.qemu.org/docs/master/system/arm/virt.html
  - https://www.qemu.org/docs/master/system/target-arm.html
  - https://www.qemu.org/docs/master/user/main.html
- binfmt
  - https://docs.kernel.org/admin-guide/binfmt-misc.html
  - https://docs.docker.com/build/building/multi-platform/
  - https://github.com/tonistiigi/binfmt
- Renode
  - [Renode Official Site](https://renode.io/)
  - [Supported boards](https://renode.readthedocs.io/en/latest/introduction/supported-boards.html)
- 社区
  - https://interrupt.memfault.com/blog/emulating-raspberry-pi-in-qemu
