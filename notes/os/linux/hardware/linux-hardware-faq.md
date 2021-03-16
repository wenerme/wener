---
title: Linux Hardware FAQ
---

## Intel Corporation Ethernet Connection (2) I219-V notworking
* e1000e
* [I219-V](https://ark.intel.com/content/www/us/en/ark/products/82186/intel-ethernet-connection-i219-v.html)

```bash
dmesg | grep e1000e
# e1000e: Intel(R) PRO/1000 Network Driver - 3.2.6-k
# e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
# e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
# e1000e 0000:00:1f.6: The NVM Checksum Is Not Valid
# e1000e: probe of 0000:00:1f.6 failed with error -5

lspci -s 0000:00:1f.6
# 00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection (2) I219-V
```

## e1000e - The NVM Checksum Is Not Valid

* https://mynixworld.info/2012/12/05/e1000e-the-nvm-checksum-is-not-valid/
* [Intel® Ethernet Connections Boot Utility, Preboot Images, and EFI Drivers](https://downloadcenter.intel.com/download/29137)

```bash
# download preboot
curl -LO https://downloadmirror.intel.com/29137/eng/Preboot.tar.gz
tar zxvf Preboot.tar.gz
cd APPS/BootUtil/Linux_x64
chmod +x ./bootutil64e

# Alpine compact
apk add gcompat
mkdir -p /lib64
ln -s /lib/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2

# fix
./bootutil64e -NIC 1 -defcfg

# done
reboot
```
