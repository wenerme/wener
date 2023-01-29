---
title: dtb
---

# Device Tree

- dtb - Device Tree Blob - device tree binary
  - hardware layout description
  - platform identification
  - runtime configuration
  - device population
- `arch/<arch>/boot/dts/<board>`
- CONFIG_ARM_APPENDED_DTB - dtb 在 kernel 之后
  - `cat zImage board.dtb > my-zImage; mkimage ... -d my-zImage my-uImage`
- CONFIG_ARM_ATAG_DTB_COMPAT
  - read ATAGS, update DT
- Embedded Power Architecture Platform Requirements (ePAPR)
- Device Tree Source - DTS
  - .dts - board-level definitions
    - 最终的 - include 多个 dtsi
  - .dtsi - included files, generally containing SoC-level definitions
  - e.g [arch/arm64/boot/dts](https://github.com/torvalds/linux/tree/master/arch/arm64/boot/dts)
- Device Tree Compiler
  - [scripts/dtc](https://github.com/torvalds/linux/tree/master/scripts/dtc)
- Documentation/devicetree/bindings

## Device Tree

- cpus
- memory
- chosen
  - defines parameters chosen or defined by the system firmware at boot time
- aliases
- buses

```dts
/ {
model = "Freescale i.MX28 Evaluation Kit";
compatible = "fsl,imx28-evk", "fsl,imx28";
memory {
  reg = <0x40000000 0x08000000>;
};
apb@80000000 {
  apbh@80000000 {  };
  apbx@80040000 {  };
};
ahb@80080000 {  };
sound {  };
leds {  };
backlight {  };
};
```

- of_machine_is_compatible

## References

- [Device tree](https://en.wikipedia.org/wiki/Device_tree)
- https://lonzoc.gitbooks.io/device-tree-guide/content/devicetree_basic.html
- https://elinux.org/Device_Tree_Reference
- https://elinux.org/Device_Tree_Usage
- https://docs.kernel.org/devicetree/usage-model.html
- https://www.devicetree.org/
- https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-device-tree-dummies.pdf
  - bootloader
    1. before device tree - r1=machine_type, r2=ptr to ATAGS
    1. boot with device tree - r2=ptr to DTB
