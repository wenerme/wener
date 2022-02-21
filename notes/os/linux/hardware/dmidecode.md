---
title: dmidecode
---

# dmidecode

- DMI - Destktop Management Information
  - SMBIOS 提供
- dmidecode - 提取所有硬件信息
- biosdecode - 提取 BIOS 信息
  - acpi
    - oem identifier: alaska
    - rsd table 32-bit address
    - xsd table 64-bit address
  - SMBIOS
    - structure table length: 4346
    - structure table address
    - number of structures: 86
    - maximum structure size: 420
  - pnp bios
  - pci interrupt routing
  - intel multiprocessor
- ownership - ownership tag on Compaq computers
- vpddecode - vital product data on IBM computers

```bash
apk add dmidecode

dmidecode -t        # 所有类型
dmidecode -t memory # 查看内存信息
dmidecode -s        # 所有字符串

# 显示所有字符
dmidecode -s 2>&1 | tail -n +4 | xargs -n 1 -I {} sh -c 'echo -n {}: && dmidecode -s {}'

# system-uuid
# BIOS 中指定, VMware 可修改 uuid.bios, QEMU -uuid
cat /sys/devices/virtual/dmi/id/product_uuid

# 查看访问的位置 可判断读取了那些 系统信息
sudo strace -f -e open dmidecode > /dev/nul
```

- 类型
  - bios
  - system
  - baseboard
  - chassis
  - processor
  - memory
  - cache
  - connector
  - slot
- String
  - bios-vendor
  - bios-version
  - bios-release-date
  - bios-revision
  - firmware-revision
  - system-manufacturer
  - system-product-name
  - system-version
  - system-serial-number
  - system-uuid
  - system-sku-number
  - system-family
  - baseboard-manufacturer
  - baseboard-product-name
  - baseboard-version
  - baseboard-serial-number
  - baseboard-asset-tag
  - chassis-manufacturer
  - chassis-type
  - chassis-version
  - chassis-serial-number
  - chassis-asset-tag
  - processor-family
  - processor-manufacturer
  - processor-version
  - processor-frequency
