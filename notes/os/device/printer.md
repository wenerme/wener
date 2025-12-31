---
title: Printer
tags:
  - OS
  - Device
  - Printer
  - CUPS
---

# Printer

- [Scanning with a Network HP all-in-one (aio)](https://news.ycombinator.com/item?id=23095405)
- [CUPS on Alpine Linux](https://pkgs.alpinelinux.org/package/edge/main/x86_64/cups)

```bash
apk add cups
apk add ipptoll cups-client
```

## Logs

```
usb 1-2: new high-speed USB device number 2 using xhci_hcd
usb 1-2: New USB device found, idVendor=17ef, idProduct=562f, bcdDevice= 1.00
usb 1-2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
usb 1-2: Product: M7208W
usb 1-2: Manufacturer: Lenovo
```

## Configuration

- `cups-filters`
- [Scanning with a Network HP all-in-one (aio)](https://wiki.debian.org/SaneOverNetwork#Scanning_with_a_Network_HP_all-in-one_.28aio.29-1)
- [OpenPrinting/cups-filters](https://github.com/OpenPrinting/cups-filters)
- [What is CUPS server and how to share a printer locally or over a network](https://askubuntu.com/questions/73367/what-is-cups-server-and-how-to-share-a-printer-locally-or-over-a-network)

```bash
cupsctl WebInterface=yes
# http://localhost:631/

cupsctl --remote-any
usermod -a -G lpadmin admin
```

`cups-browsed` is a helper daemon running in parallel to the CUPS daemon which listens to Bonjour broadcasts of shared CUPS printers on remote machines in the local network via Avahi.

```conf
<Policy default>
  JobPrivateValues none

JobPrivateAccess all
JobPrivateValues none
```
