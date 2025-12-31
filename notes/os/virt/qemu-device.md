---
title: QEMU Devices Reference
tags:
  - Virtualization
  - QEMU
  - Device
  - Hardware
---

# QEMU Devices Reference {#qemu-devices-reference}

- [USB Redirection - SPICE](https://www.spice-space.org/usbredir.html)
- [Assign Devices with VT-d - Linux KVM](http://www.linux-kvm.org/page/How_to_assign_devices_with_VT-d_in_KVM)
- [Pass through USB Port - StackExchange](https://unix.stackexchange.com/questions/452934/can-i-pass-through-a-usb-port-via-qemu-command-line)

```bash
# List all devices
qemu-system-x86_64 -device ?
```

## Device List

```text
Controller/Bridge/Hub devices:
name "i82801b11-bridge", bus PCI
name "igd-passthrough-isa-bridge", bus PCI, desc "ISA bridge faked to support IGD PT"
```

name "ioh3420", bus PCI, desc "Intel IOH device id 3420 PCIE Root Port"
name "pci-bridge", bus PCI, desc "Standard PCI Bridge"
name "pci-bridge-seat", bus PCI, desc "Standard PCI Bridge (multiseat)"
name "pcie-pci-bridge", bus PCI
name "pcie-root-port", bus PCI, desc "PCI Express Root Port"
name "pxb", bus PCI, desc "PCI Expander Bridge"
name "pxb-pcie", bus PCI, desc "PCI Express Expander Bridge"
name "usb-host", bus usb-bus
name "usb-hub", bus usb-bus
name "vfio-pci-igd-lpc-bridge", bus PCI, desc "VFIO dummy ISA/LPC bridge for IGD assignment"
name "x3130-upstream", bus PCI, desc "TI X3130 Upstream Port of PCI Express Switch"
name "xio3130-downstream", bus PCI, desc "TI X3130 Downstream Port of PCI Express Switch"

USB devices:
name "ich9-usb-ehci1", bus PCI
name "ich9-usb-ehci2", bus PCI
name "ich9-usb-uhci1", bus PCI
name "ich9-usb-uhci2", bus PCI
name "ich9-usb-uhci3", bus PCI
name "ich9-usb-uhci4", bus PCI
name "ich9-usb-uhci5", bus PCI
name "ich9-usb-uhci6", bus PCI
name "nec-usb-xhci", bus PCI
name "pci-ohci", bus PCI, desc "Apple USB Controller"
name "piix3-usb-uhci", bus PCI
name "piix4-usb-uhci", bus PCI
name "qemu-xhci", bus PCI
name "usb-ehci", bus PCI
name "vt82c686b-usb-uhci", bus PCI

Storage devices:
name "am53c974", bus PCI, desc "AMD Am53c974 PCscsi-PCI SCSI adapter"
name "dc390", bus PCI, desc "Tekram DC-390 SCSI adapter"
name "floppy", bus floppy-bus, desc "virtual floppy drive"
name "ich9-ahci", bus PCI, alias "ahci"
name "ide-cd", bus IDE, desc "virtual IDE CD-ROM"
name "ide-drive", bus IDE, desc "virtual IDE disk or CD-ROM (legacy)"
name "ide-hd", bus IDE, desc "virtual IDE disk"
name "isa-fdc", bus ISA
name "isa-ide", bus ISA
name "lsi53c810", bus PCI
name "lsi53c895a", bus PCI, alias "lsi"
name "megasas", bus PCI, desc "LSI MegaRAID SAS 1078"
name "megasas-gen2", bus PCI, desc "LSI MegaRAID SAS 2108"
name "mptsas1068", bus PCI, desc "LSI SAS 1068"
name "nvme", bus PCI, desc "Non-Volatile Memory Express"
name "piix3-ide", bus PCI
name "piix3-ide-xen", bus PCI
name "piix4-ide", bus PCI
name "pvscsi", bus PCI
name "scsi-block", bus SCSI, desc "SCSI block device passthrough"
name "scsi-cd", bus SCSI, desc "virtual SCSI CD-ROM"
name "scsi-disk", bus SCSI, desc "virtual SCSI disk or CD-ROM (legacy)"
name "scsi-generic", bus SCSI, desc "pass through generic scsi device (/dev/sg\*)"
name "scsi-hd", bus SCSI, desc "virtual SCSI disk"
name "sd-card", bus sd-bus
name "sdhci-pci", bus PCI
name "usb-bot", bus usb-bus
name "usb-mtp", bus usb-bus, desc "USB Media Transfer Protocol device"
name "usb-storage", bus usb-bus
name "usb-uas", bus usb-bus
name "vhost-scsi", bus virtio-bus
name "vhost-scsi-pci", bus PCI
name "vhost-scsi-pci-non-transitional", bus PCI
name "vhost-scsi-pci-transitional", bus PCI
name "vhost-user-blk", bus virtio-bus
name "vhost-user-blk-pci", bus PCI
name "vhost-user-blk-pci-non-transitional", bus PCI
name "vhost-user-blk-pci-transitional", bus PCI
name "vhost-user-fs-device", bus virtio-bus
name "vhost-user-fs-pci", bus PCI
name "vhost-user-scsi", bus virtio-bus
name "vhost-user-scsi-pci", bus PCI
name "vhost-user-scsi-pci-non-transitional", bus PCI
name "vhost-user-scsi-pci-transitional", bus PCI
name "virtio-9p-device", bus virtio-bus
name "virtio-9p-pci", bus PCI, alias "virtio-9p"
name "virtio-9p-pci-non-transitional", bus PCI
name "virtio-9p-pci-transitional", bus PCI
name "virtio-blk-device", bus virtio-bus
name "virtio-blk-pci", bus PCI, alias "virtio-blk"
name "virtio-blk-pci-non-transitional", bus PCI
name "virtio-blk-pci-transitional", bus PCI
name "virtio-scsi-device", bus virtio-bus
name "virtio-scsi-pci", bus PCI, alias "virtio-scsi"
name "virtio-scsi-pci-non-transitional", bus PCI
name "virtio-scsi-pci-transitional", bus PCI

Network devices:
name "e1000", bus PCI, alias "e1000-82540em", desc "Intel Gigabit Ethernet"
name "e1000-82544gc", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000-82545em", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000e", bus PCI, desc "Intel 82574L GbE Controller"
name "i82550", bus PCI, desc "Intel i82550 Ethernet"
name "i82551", bus PCI, desc "Intel i82551 Ethernet"
name "i82557a", bus PCI, desc "Intel i82557A Ethernet"
name "i82557b", bus PCI, desc "Intel i82557B Ethernet"
name "i82557c", bus PCI, desc "Intel i82557C Ethernet"
name "i82558a", bus PCI, desc "Intel i82558A Ethernet"
name "i82558b", bus PCI, desc "Intel i82558B Ethernet"
name "i82559a", bus PCI, desc "Intel i82559A Ethernet"
name "i82559b", bus PCI, desc "Intel i82559B Ethernet"
name "i82559c", bus PCI, desc "Intel i82559C Ethernet"
name "i82559er", bus PCI, desc "Intel i82559ER Ethernet"
name "i82562", bus PCI, desc "Intel i82562 Ethernet"
name "i82801", bus PCI, desc "Intel i82801 Ethernet"
name "ne2k_isa", bus ISA
name "ne2k_pci", bus PCI
name "pcnet", bus PCI
name "rocker", bus PCI, desc "Rocker Switch"
name "rtl8139", bus PCI
name "tulip", bus PCI
name "usb-net", bus usb-bus
name "virtio-net-device", bus virtio-bus
name "virtio-net-pci", bus PCI, alias "virtio-net"
name "virtio-net-pci-non-transitional", bus PCI
name "virtio-net-pci-transitional", bus PCI
name "vmxnet3", bus PCI, desc "VMWare Paravirtualized Ethernet v3"

Input devices:
name "i8042", bus ISA
name "ipoctal232", bus IndustryPack, desc "GE IP-Octal 232 8-channel RS-232 IndustryPack"
name "isa-parallel", bus ISA
name "isa-serial", bus ISA
name "pci-serial", bus PCI
name "pci-serial-2x", bus PCI
name "pci-serial-4x", bus PCI
name "tpci200", bus PCI, desc "TEWS TPCI200 IndustryPack carrier"
name "usb-braille", bus usb-bus
name "usb-ccid", bus usb-bus, desc "CCID Rev 1.1 smartcard reader"
name "usb-kbd", bus usb-bus
name "usb-mouse", bus usb-bus
name "usb-serial", bus usb-bus
name "usb-tablet", bus usb-bus
name "usb-wacom-tablet", bus usb-bus, desc "QEMU PenPartner Tablet"
name "vhost-user-input", bus virtio-bus
name "vhost-user-input-pci", bus PCI
name "virtconsole", bus virtio-serial-bus
name "virtio-input-host-device", bus virtio-bus
name "virtio-input-host-pci", bus PCI, alias "virtio-input-host"
name "virtio-keyboard-device", bus virtio-bus
name "virtio-keyboard-pci", bus PCI, alias "virtio-keyboard"
name "virtio-mouse-device", bus virtio-bus
name "virtio-mouse-pci", bus PCI, alias "virtio-mouse"
name "virtio-serial-device", bus virtio-bus
name "virtio-serial-pci", bus PCI, alias "virtio-serial"
name "virtio-serial-pci-non-transitional", bus PCI
name "virtio-serial-pci-transitional", bus PCI
name "virtio-tablet-device", bus virtio-bus
name "virtio-tablet-pci", bus PCI, alias "virtio-tablet"
name "virtserialport", bus virtio-serial-bus

Display devices:
name "ati-vga", bus PCI
name "bochs-display", bus PCI
name "cirrus-vga", bus PCI, desc "Cirrus CLGD 54xx VGA"
name "isa-cirrus-vga", bus ISA
name "isa-vga", bus ISA
name "qxl", bus PCI, desc "Spice QXL GPU (secondary)"
name "qxl-vga", bus PCI, desc "Spice QXL GPU (primary, vga compatible)"
name "ramfb", bus System, desc "ram framebuffer standalone device"
name "secondary-vga", bus PCI
name "sga", bus ISA, desc "Serial Graphics Adapter"
name "VGA", bus PCI
name "vhost-user-gpu", bus virtio-bus
name "vhost-user-gpu-pci", bus PCI
name "vhost-user-vga", bus PCI
name "virtio-gpu-device", bus virtio-bus
name "virtio-gpu-pci", bus PCI, alias "virtio-gpu"
name "virtio-vga", bus PCI
name "vmware-svga", bus PCI

Sound devices:
name "AC97", bus PCI, desc "Intel 82801AA AC97 Audio"
name "adlib", bus ISA, desc "Yamaha YM3812 (OPL2)"
name "cs4231a", bus ISA, desc "Crystal Semiconductor CS4231A"
name "ES1370", bus PCI, desc "ENSONIQ AudioPCI ES1370"
name "gus", bus ISA, desc "Gravis Ultrasound GF1"
name "hda-duplex", bus HDA, desc "HDA Audio Codec, duplex (line-out, line-in)"
name "hda-micro", bus HDA, desc "HDA Audio Codec, duplex (speaker, microphone)"
name "hda-output", bus HDA, desc "HDA Audio Codec, output-only (line-out)"
name "ich9-intel-hda", bus PCI, desc "Intel HD Audio Controller (ich9)"
name "intel-hda", bus PCI, desc "Intel HD Audio Controller (ich6)"
name "sb16", bus ISA, desc "Creative Sound Blaster 16"
name "usb-audio", bus usb-bus

Misc devices:
name "amd-iommu", bus System, desc "AMD IOMMU (AMD-Vi) DMA Remapping device"
name "edu", bus PCI
name "hyperv-testdev", bus ISA
name "i2c-ddc", bus i2c-bus
name "i6300esb", bus PCI
name "ib700", bus ISA
name "intel-iommu", bus System, desc "Intel IOMMU (VT-d) DMA Remapping device"
name "isa-applesmc", bus ISA
name "isa-debug-exit", bus ISA
name "isa-debugcon", bus ISA
name "ivshmem-doorbell", bus PCI, desc "Inter-VM shared memory"
name "ivshmem-plain", bus PCI, desc "Inter-VM shared memory"
name "kvaser_pci", bus PCI, desc "Kvaser PCICANx"
name "loader", desc "Generic Loader"
name "mioe3680_pci", bus PCI, desc "Mioe3680 PCICANx"
name "pc-testdev", bus ISA
name "pci-testdev", bus PCI, desc "PCI Test Device"
name "pcm3680_pci", bus PCI, desc "Pcm3680i PCICANx"
name "pvpanic", bus ISA
name "smbus-ipmi", bus i2c-bus
name "tpm-crb"
name "usb-redir", bus usb-bus
name "vfio-pci", bus PCI, desc "VFIO-based PCI device assignment"
name "vfio-pci-nohotplug", bus PCI, desc "VFIO-based PCI device assignment"
name "vhost-vsock-device", bus virtio-bus
name "vhost-vsock-pci", bus PCI
name "vhost-vsock-pci-non-transitional", bus PCI
name "vhost-vsock-pci-transitional", bus PCI
name "virtio-balloon-device", bus virtio-bus
name "virtio-balloon-pci", bus PCI, alias "virtio-balloon"
name "virtio-balloon-pci-non-transitional", bus PCI
name "virtio-balloon-pci-transitional", bus PCI
name "virtio-crypto-device", bus virtio-bus
name "virtio-crypto-pci", bus PCI
name "virtio-iommu-device", bus virtio-bus
name "virtio-iommu-pci", bus PCI, alias "virtio-iommu"
name "virtio-iommu-pci-non-transitional", bus PCI
name "virtio-iommu-pci-transitional", bus PCI
name "virtio-pmem-pci", bus PCI
name "virtio-rng-device", bus virtio-bus
name "virtio-rng-pci", bus PCI, alias "virtio-rng"
name "virtio-rng-pci-non-transitional", bus PCI
name "virtio-rng-pci-transitional", bus PCI
name "vmcoreinfo"
name "vmgenid"

CPU devices:
name "486-v1-x86_64-cpu"
name "486-x86_64-cpu"
name "athlon-v1-x86_64-cpu"
name "athlon-x86_64-cpu"
name "base-x86_64-cpu"
name "Broadwell-IBRS-x86_64-cpu"
name "Broadwell-noTSX-IBRS-x86_64-cpu"
name "Broadwell-noTSX-x86_64-cpu"
name "Broadwell-v1-x86_64-cpu"
name "Broadwell-v2-x86_64-cpu"
name "Broadwell-v3-x86_64-cpu"
name "Broadwell-v4-x86_64-cpu"
name "Broadwell-x86_64-cpu"
name "Cascadelake-Server-noTSX-x86_64-cpu"
name "Cascadelake-Server-v1-x86_64-cpu"
name "Cascadelake-Server-v2-x86_64-cpu"
name "Cascadelake-Server-v3-x86_64-cpu"
name "Cascadelake-Server-x86_64-cpu"
name "Conroe-v1-x86_64-cpu"
name "Conroe-x86_64-cpu"
name "Cooperlake-v1-x86_64-cpu"
name "Cooperlake-x86_64-cpu"
name "core2duo-v1-x86_64-cpu"
name "core2duo-x86_64-cpu"
name "coreduo-v1-x86_64-cpu"
name "coreduo-x86_64-cpu"
name "Denverton-v1-x86_64-cpu"
name "Denverton-v2-x86_64-cpu"
name "Denverton-x86_64-cpu"
name "Dhyana-v1-x86_64-cpu"
name "Dhyana-x86_64-cpu"
name "EPYC-IBPB-x86_64-cpu"
name "EPYC-Rome-v1-x86_64-cpu"
name "EPYC-Rome-x86_64-cpu"
name "EPYC-v1-x86_64-cpu"
name "EPYC-v2-x86_64-cpu"
name "EPYC-v3-x86_64-cpu"
name "EPYC-x86_64-cpu"
name "Haswell-IBRS-x86_64-cpu"
name "Haswell-noTSX-IBRS-x86_64-cpu"
name "Haswell-noTSX-x86_64-cpu"
name "Haswell-v1-x86_64-cpu"
name "Haswell-v2-x86_64-cpu"
name "Haswell-v3-x86_64-cpu"
name "Haswell-v4-x86_64-cpu"
name "Haswell-x86_64-cpu"
name "host-x86_64-cpu"
name "Icelake-Client-noTSX-x86_64-cpu"
name "Icelake-Client-v1-x86_64-cpu"
name "Icelake-Client-v2-x86_64-cpu"
name "Icelake-Client-x86_64-cpu"
name "Icelake-Server-noTSX-x86_64-cpu"
name "Icelake-Server-v1-x86_64-cpu"
name "Icelake-Server-v2-x86_64-cpu"
name "Icelake-Server-v3-x86_64-cpu"
name "Icelake-Server-x86_64-cpu"
name "IvyBridge-IBRS-x86_64-cpu"
name "IvyBridge-v1-x86_64-cpu"
name "IvyBridge-v2-x86_64-cpu"
name "IvyBridge-x86_64-cpu"
name "KnightsMill-v1-x86_64-cpu"
name "KnightsMill-x86_64-cpu"
name "kvm32-v1-x86_64-cpu"
name "kvm32-x86_64-cpu"
name "kvm64-v1-x86_64-cpu"
name "kvm64-x86_64-cpu"
name "max-x86_64-cpu"
name "n270-v1-x86_64-cpu"
name "n270-x86_64-cpu"
name "Nehalem-IBRS-x86_64-cpu"
name "Nehalem-v1-x86_64-cpu"
name "Nehalem-v2-x86_64-cpu"
name "Nehalem-x86_64-cpu"
name "Opteron_G1-v1-x86_64-cpu"
name "Opteron_G1-x86_64-cpu"
name "Opteron_G2-v1-x86_64-cpu"
name "Opteron_G2-x86_64-cpu"
name "Opteron_G3-v1-x86_64-cpu"
name "Opteron_G3-x86_64-cpu"
name "Opteron_G4-v1-x86_64-cpu"
name "Opteron_G4-x86_64-cpu"
name "Opteron_G5-v1-x86_64-cpu"
name "Opteron_G5-x86_64-cpu"
name "Penryn-v1-x86_64-cpu"
name "Penryn-x86_64-cpu"
name "pentium-v1-x86_64-cpu"
name "pentium-x86_64-cpu"
name "pentium2-v1-x86_64-cpu"
name "pentium2-x86_64-cpu"
name "pentium3-v1-x86_64-cpu"
name "pentium3-x86_64-cpu"
name "phenom-v1-x86_64-cpu"
name "phenom-x86_64-cpu"
name "qemu32-v1-x86_64-cpu"
name "qemu32-x86_64-cpu"
name "qemu64-v1-x86_64-cpu"
name "qemu64-x86_64-cpu"
name "SandyBridge-IBRS-x86_64-cpu"
name "SandyBridge-v1-x86_64-cpu"
name "SandyBridge-v2-x86_64-cpu"
name "SandyBridge-x86_64-cpu"
name "Skylake-Client-IBRS-x86_64-cpu"
name "Skylake-Client-noTSX-IBRS-x86_64-cpu"
name "Skylake-Client-v1-x86_64-cpu"
name "Skylake-Client-v2-x86_64-cpu"
name "Skylake-Client-v3-x86_64-cpu"
name "Skylake-Client-x86_64-cpu"
name "Skylake-Server-IBRS-x86_64-cpu"
name "Skylake-Server-noTSX-IBRS-x86_64-cpu"
name "Skylake-Server-v1-x86_64-cpu"
name "Skylake-Server-v2-x86_64-cpu"
name "Skylake-Server-v3-x86_64-cpu"
name "Skylake-Server-x86_64-cpu"
name "Snowridge-v1-x86_64-cpu"
name "Snowridge-v2-x86_64-cpu"
name "Snowridge-x86_64-cpu"
name "Westmere-IBRS-x86_64-cpu"
name "Westmere-v1-x86_64-cpu"
name "Westmere-v2-x86_64-cpu"
name "Westmere-x86_64-cpu"

Uncategorized devices:
name "AMDVI-PCI", bus PCI
name "ipmi-bmc-extern"
name "ipmi-bmc-sim"
name "isa-ipmi-bt", bus ISA
name "isa-ipmi-kcs", bus ISA
name "mc146818rtc", bus ISA
name "nvdimm", desc "DIMM memory module"
name "pc-dimm", desc "DIMM memory module"
name "pci-ipmi-bt", bus PCI, desc "PCI IPMI BT"
name "pci-ipmi-kcs", bus PCI, desc "PCI IPMI KCS"
name "tpm-tis", bus ISA
name "virtio-pmem", bus virtio-bus
name "vmmouse", bus ISA

## aarch64

Controller/Bridge/Hub devices:
name "i82801b11-bridge", bus PCI
name "ioh3420", bus PCI, desc "Intel IOH device id 3420 PCIE Root Port"
name "pci-bridge", bus PCI, desc "Standard PCI Bridge"
name "pci-bridge-seat", bus PCI, desc "Standard PCI Bridge (multiseat)"
name "pcie-pci-bridge", bus PCI
name "pcie-root-port", bus PCI, desc "PCI Express Root Port"
name "usb-host", bus usb-bus
name "usb-hub", bus usb-bus
name "x3130-upstream", bus PCI, desc "TI X3130 Upstream Port of PCI Express Switch"
name "xio3130-downstream", bus PCI, desc "TI X3130 Downstream Port of PCI Express Switch"

USB devices:
name "ich9-usb-ehci1", bus PCI
name "ich9-usb-ehci2", bus PCI
name "ich9-usb-uhci1", bus PCI
name "ich9-usb-uhci2", bus PCI
name "ich9-usb-uhci3", bus PCI
name "ich9-usb-uhci4", bus PCI
name "ich9-usb-uhci5", bus PCI
name "ich9-usb-uhci6", bus PCI
name "nec-usb-xhci", bus PCI
name "pci-ohci", bus PCI, desc "Apple USB Controller"
name "piix3-usb-uhci", bus PCI
name "piix4-usb-uhci", bus PCI
name "qemu-xhci", bus PCI
name "usb-ehci", bus PCI
name "vt82c686b-usb-uhci", bus PCI

Storage devices:
name "am53c974", bus PCI, desc "AMD Am53c974 PCscsi-PCI SCSI adapter"
name "dc390", bus PCI, desc "Tekram DC-390 SCSI adapter"
name "ich9-ahci", bus PCI, alias "ahci"
name "ide-cd", bus IDE, desc "virtual IDE CD-ROM"
name "ide-drive", bus IDE, desc "virtual IDE disk or CD-ROM (legacy)"
name "ide-hd", bus IDE, desc "virtual IDE disk"
name "lsi53c810", bus PCI
name "lsi53c895a", bus PCI, alias "lsi"
name "megasas", bus PCI, desc "LSI MegaRAID SAS 1078"
name "megasas-gen2", bus PCI, desc "LSI MegaRAID SAS 2108"
name "mptsas1068", bus PCI, desc "LSI SAS 1068"
name "nvme", bus PCI, desc "Non-Volatile Memory Express"
name "pvscsi", bus PCI
name "scsi-block", bus SCSI, desc "SCSI block device passthrough"
name "scsi-cd", bus SCSI, desc "virtual SCSI CD-ROM"
name "scsi-disk", bus SCSI, desc "virtual SCSI disk or CD-ROM (legacy)"
name "scsi-generic", bus SCSI, desc "pass through generic scsi device (/dev/sg\*)"
name "scsi-hd", bus SCSI, desc "virtual SCSI disk"
name "sd-card", bus sd-bus
name "sdhci-pci", bus PCI
name "usb-bot", bus usb-bus
name "usb-mtp", bus usb-bus, desc "USB Media Transfer Protocol device"
name "usb-storage", bus usb-bus
name "usb-uas", bus usb-bus
name "vhost-scsi", bus virtio-bus
name "vhost-scsi-pci", bus PCI
name "vhost-scsi-pci-non-transitional", bus PCI
name "vhost-scsi-pci-transitional", bus PCI
name "vhost-user-blk", bus virtio-bus
name "vhost-user-blk-pci", bus PCI
name "vhost-user-blk-pci-non-transitional", bus PCI
name "vhost-user-blk-pci-transitional", bus PCI
name "vhost-user-fs-device", bus virtio-bus
name "vhost-user-fs-pci", bus PCI
name "vhost-user-scsi", bus virtio-bus
name "vhost-user-scsi-pci", bus PCI
name "vhost-user-scsi-pci-non-transitional", bus PCI
name "vhost-user-scsi-pci-transitional", bus PCI
name "virtio-9p-device", bus virtio-bus
name "virtio-9p-pci", bus PCI, alias "virtio-9p"
name "virtio-9p-pci-non-transitional", bus PCI
name "virtio-9p-pci-transitional", bus PCI
name "virtio-blk-device", bus virtio-bus
name "virtio-blk-pci", bus PCI, alias "virtio-blk"
name "virtio-blk-pci-non-transitional", bus PCI
name "virtio-blk-pci-transitional", bus PCI
name "virtio-scsi-device", bus virtio-bus
name "virtio-scsi-pci", bus PCI, alias "virtio-scsi"
name "virtio-scsi-pci-non-transitional", bus PCI
name "virtio-scsi-pci-transitional", bus PCI

Network devices:
name "e1000", bus PCI, alias "e1000-82540em", desc "Intel Gigabit Ethernet"
name "e1000-82544gc", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000-82545em", bus PCI, desc "Intel Gigabit Ethernet"
name "e1000e", bus PCI, desc "Intel 82574L GbE Controller"
name "i82550", bus PCI, desc "Intel i82550 Ethernet"
name "i82551", bus PCI, desc "Intel i82551 Ethernet"
name "i82557a", bus PCI, desc "Intel i82557A Ethernet"
name "i82557b", bus PCI, desc "Intel i82557B Ethernet"
name "i82557c", bus PCI, desc "Intel i82557C Ethernet"
name "i82558a", bus PCI, desc "Intel i82558A Ethernet"
name "i82558b", bus PCI, desc "Intel i82558B Ethernet"
name "i82559a", bus PCI, desc "Intel i82559A Ethernet"
name "i82559b", bus PCI, desc "Intel i82559B Ethernet"
name "i82559c", bus PCI, desc "Intel i82559C Ethernet"
name "i82559er", bus PCI, desc "Intel i82559ER Ethernet"
name "i82562", bus PCI, desc "Intel i82562 Ethernet"
name "i82801", bus PCI, desc "Intel i82801 Ethernet"
name "ne2k_pci", bus PCI
name "pcnet", bus PCI
name "rocker", bus PCI, desc "Rocker Switch"
name "rtl8139", bus PCI
name "tulip", bus PCI
name "usb-net", bus usb-bus
name "virtio-net-device", bus virtio-bus
name "virtio-net-pci", bus PCI, alias "virtio-net"
name "virtio-net-pci-non-transitional", bus PCI
name "virtio-net-pci-transitional", bus PCI
name "vmxnet3", bus PCI, desc "VMWare Paravirtualized Ethernet v3"

Input devices:
name "ipoctal232", bus IndustryPack, desc "GE IP-Octal 232 8-channel RS-232 IndustryPack"
name "pci-serial", bus PCI
name "pci-serial-2x", bus PCI
name "pci-serial-4x", bus PCI
name "tpci200", bus PCI, desc "TEWS TPCI200 IndustryPack carrier"
name "usb-braille", bus usb-bus
name "usb-ccid", bus usb-bus, desc "CCID Rev 1.1 smartcard reader"
name "usb-kbd", bus usb-bus
name "usb-mouse", bus usb-bus
name "usb-serial", bus usb-bus
name "usb-tablet", bus usb-bus
name "usb-wacom-tablet", bus usb-bus, desc "QEMU PenPartner Tablet"
name "vhost-user-input", bus virtio-bus
name "vhost-user-input-pci", bus PCI
name "virtconsole", bus virtio-serial-bus
name "virtio-input-host-device", bus virtio-bus
name "virtio-input-host-pci", bus PCI, alias "virtio-input-host"
name "virtio-keyboard-device", bus virtio-bus
name "virtio-keyboard-pci", bus PCI, alias "virtio-keyboard"
name "virtio-mouse-device", bus virtio-bus
name "virtio-mouse-pci", bus PCI, alias "virtio-mouse"
name "virtio-serial-device", bus virtio-bus
name "virtio-serial-pci", bus PCI, alias "virtio-serial"
name "virtio-serial-pci-non-transitional", bus PCI
name "virtio-serial-pci-transitional", bus PCI
name "virtio-tablet-device", bus virtio-bus
name "virtio-tablet-pci", bus PCI, alias "virtio-tablet"
name "virtserialport", bus virtio-serial-bus

Display devices:
name "ati-vga", bus PCI
name "bochs-display", bus PCI
name "cirrus-vga", bus PCI, desc "Cirrus CLGD 54xx VGA"
name "ramfb", bus System, desc "ram framebuffer standalone device"
name "secondary-vga", bus PCI
name "VGA", bus PCI
name "vhost-user-gpu", bus virtio-bus
name "vhost-user-gpu-pci", bus PCI
name "virtio-gpu-device", bus virtio-bus
name "virtio-gpu-pci", bus PCI, alias "virtio-gpu"
name "vmware-svga", bus PCI

Sound devices:
name "AC97", bus PCI, desc "Intel 82801AA AC97 Audio"
name "ES1370", bus PCI, desc "ENSONIQ AudioPCI ES1370"
name "hda-duplex", bus HDA, desc "HDA Audio Codec, duplex (line-out, line-in)"
name "hda-micro", bus HDA, desc "HDA Audio Codec, duplex (speaker, microphone)"
name "hda-output", bus HDA, desc "HDA Audio Codec, output-only (line-out)"
name "ich9-intel-hda", bus PCI, desc "Intel HD Audio Controller (ich9)"
name "intel-hda", bus PCI, desc "Intel HD Audio Controller (ich6)"
name "usb-audio", bus usb-bus

Misc devices:
name "dpcd", bus aux-bus
name "ds1338", bus i2c-bus
name "edu", bus PCI
name "i2c-ddc", bus i2c-bus
name "i6300esb", bus PCI
name "ivshmem-doorbell", bus PCI, desc "Inter-VM shared memory"
name "ivshmem-plain", bus PCI, desc "Inter-VM shared memory"
name "kvaser_pci", bus PCI, desc "Kvaser PCICANx"
name "lm8323", bus i2c-bus
name "loader", desc "Generic Loader"
name "max7310", bus i2c-bus
name "mioe3680_pci", bus PCI, desc "Mioe3680 PCICANx"
name "pca9552", bus i2c-bus
name "pci-testdev", bus PCI, desc "PCI Test Device"
name "pcm3680_pci", bus PCI, desc "Pcm3680i PCICANx"
name "pxa2xx-i2c-slave", bus i2c-bus
name "sii9022", bus i2c-bus
name "ssd0303", bus i2c-bus
name "tmp105", bus i2c-bus
name "tmp421", bus i2c-bus
name "tmp422", bus i2c-bus
name "tmp423", bus i2c-bus
name "tosa_dac", bus i2c-bus
name "twl92230", bus i2c-bus
name "usb-redir", bus usb-bus
name "vfio-amd-xgbe", bus System, desc "VFIO AMD XGBE"
name "vfio-calxeda-xgmac", bus System, desc "VFIO Calxeda XGMAC"
name "vfio-pci", bus PCI, desc "VFIO-based PCI device assignment"
name "vfio-pci-nohotplug", bus PCI, desc "VFIO-based PCI device assignment"
name "vfio-platform", bus System, desc "VFIO-based platform device assignment"
name "vhost-vsock-device", bus virtio-bus
name "vhost-vsock-pci", bus PCI
name "vhost-vsock-pci-non-transitional", bus PCI
name "vhost-vsock-pci-transitional", bus PCI
name "virtio-balloon-device", bus virtio-bus
name "virtio-balloon-pci", bus PCI, alias "virtio-balloon"
name "virtio-balloon-pci-non-transitional", bus PCI
name "virtio-balloon-pci-transitional", bus PCI
name "virtio-crypto-device", bus virtio-bus
name "virtio-crypto-pci", bus PCI
name "virtio-iommu-device", bus virtio-bus
name "virtio-iommu-pci", bus PCI, alias "virtio-iommu"
name "virtio-iommu-pci-non-transitional", bus PCI
name "virtio-iommu-pci-transitional", bus PCI
name "virtio-rng-device", bus virtio-bus
name "virtio-rng-pci", bus PCI, alias "virtio-rng"
name "virtio-rng-pci-non-transitional", bus PCI
name "virtio-rng-pci-transitional", bus PCI
name "vmcoreinfo"
name "wm8750", bus i2c-bus

Uncategorized devices:
name "160s33b", bus SSI
name "320s33b", bus SSI
name "640s33b", bus SSI
name "ads7846", bus SSI
name "at25128a-nonjedec", bus SSI
name "at25256a-nonjedec", bus SSI
name "at25df041a", bus SSI
name "at25df321a", bus SSI
name "at25df641", bus SSI
name "at25fs010", bus SSI
name "at25fs040", bus SSI
name "at26df081a", bus SSI
name "at26df161a", bus SSI
name "at26df321", bus SSI
name "at26f004", bus SSI
name "at45db081d", bus SSI
name "corgi-ssp", bus SSI
name "en25f32", bus SSI
name "en25p32", bus SSI
name "en25p64", bus SSI
name "en25q32b", bus SSI
name "en25q64", bus SSI
name "gd25q32", bus SSI
name "gd25q64", bus SSI
name "m25p05", bus SSI
name "m25p10", bus SSI
name "m25p128", bus SSI
name "m25p16", bus SSI
name "m25p20", bus SSI
name "m25p32", bus SSI
name "m25p40", bus SSI
name "m25p64", bus SSI
name "m25p80", bus SSI
name "m25pe16", bus SSI
name "m25pe20", bus SSI
name "m25pe80", bus SSI
name "m25px32", bus SSI
name "m25px32-s0", bus SSI
name "m25px32-s1", bus SSI
name "m25px64", bus SSI
name "m45pe10", bus SSI
name "m45pe16", bus SSI
name "m45pe80", bus SSI
name "max1110", bus SSI
name "max1111", bus SSI
name "mt25ql01g", bus SSI
name "mt25qu01g", bus SSI
name "mx25l12805d", bus SSI
name "mx25l12855e", bus SSI
name "mx25l1606e", bus SSI
name "mx25l2005a", bus SSI
name "mx25l25635e", bus SSI
name "mx25l25655e", bus SSI
name "mx25l3205d", bus SSI
name "mx25l4005a", bus SSI
name "mx25l6405d", bus SSI
name "mx25l8005", bus SSI
name "mx66l1g45g", bus SSI
name "mx66u1g45g", bus SSI
name "mx66u51235f", bus SSI
name "n25q00", bus SSI
name "n25q00a", bus SSI
name "n25q032", bus SSI
name "n25q032a11", bus SSI
name "n25q032a13", bus SSI
name "n25q064", bus SSI
name "n25q064a11", bus SSI
name "n25q064a13", bus SSI
name "n25q128", bus SSI
name "n25q128a11", bus SSI
name "n25q128a13", bus SSI
name "n25q256a", bus SSI
name "n25q256a11", bus SSI
name "n25q256a13", bus SSI
name "n25q512a", bus SSI
name "n25q512a11", bus SSI
name "n25q512a13", bus SSI
name "nand"
name "pc-dimm", desc "DIMM memory module"
name "s25fl016k", bus SSI
name "s25fl064k", bus SSI
name "s25fl129p0", bus SSI
name "s25fl129p1", bus SSI
name "s25fl256s0", bus SSI
name "s25fl256s1", bus SSI
name "s25fl512s", bus SSI
name "s25fs512s", bus SSI
name "s25sl004a", bus SSI
name "s25sl008a", bus SSI
name "s25sl016a", bus SSI
name "s25sl032a", bus SSI
name "s25sl032p", bus SSI
name "s25sl064a", bus SSI
name "s25sl064p", bus SSI
name "s25sl12800", bus SSI
name "s25sl12801", bus SSI
name "s70fl01gs", bus SSI
name "s70fs01gs", bus SSI
name "spitz-lcdtg", bus SSI
name "ssd0323", bus SSI
name "sst25vf016b", bus SSI
name "sst25vf032b", bus SSI
name "sst25vf040b", bus SSI
name "sst25vf080b", bus SSI
name "sst25wf010", bus SSI
name "sst25wf020", bus SSI
name "sst25wf040", bus SSI
name "sst25wf080", bus SSI
name "sst25wf512", bus SSI
name "tosa-ssp", bus SSI
name "tpm-tis-device", bus System
name "w25q256", bus SSI
name "w25q32", bus SSI
name "w25q32dw", bus SSI
name "w25q512jv", bus SSI
name "w25q64", bus SSI
name "w25q80", bus SSI
name "w25q80bl", bus SSI
name "w25x10", bus SSI
name "w25x16", bus SSI
name "w25x20", bus SSI
name "w25x32", bus SSI
name "w25x40", bus SSI
name "w25x64", bus SSI
name "w25x80", bus SSI
