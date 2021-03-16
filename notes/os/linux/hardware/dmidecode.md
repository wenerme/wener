---
title: dmidecode
---

# dmidecode
* DMI - Destktop Management Information
  * SMBIOS 提供
* 提取硬件信息

```bash
apk add dmidecode

# 所有类型
dmidecode -t
# 所有字符串
dmidecode -s
# 显示所有字符
dmidecode -s 2>&1 | tail -n +4 | xargs -n 1 -I {} sh -c 'echo -n {}: && dmidecode -s {}'

# system-uuid
# BIOS 中指定, VMware 可修改 uuid.bios, QEMU -uuid
cat /sys/devices/virtual/dmi/id/product_uuid
```

* 类型
  * bios
  * system
  * baseboard
  * chassis
  * processor
  * memory
  * cache
  * connector
  * slot
* String
  * bios-vendor
  * bios-version
  * bios-release-date
  * bios-revision
  * firmware-revision
  * system-manufacturer
  * system-product-name
  * system-version
  * system-serial-number
  * system-uuid
  * system-sku-number
  * system-family
  * baseboard-manufacturer
  * baseboard-product-name
  * baseboard-version
  * baseboard-serial-number
  * baseboard-asset-tag
  * chassis-manufacturer
  * chassis-type
  * chassis-version
  * chassis-serial-number
  * chassis-asset-tag
  * processor-family
  * processor-manufacturer
  * processor-version
  * processor-frequency
