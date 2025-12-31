---
title: Bluetooth
tags:
  - Network
  - Bluetooth
  - Hardware
---

# Bluetooth

- [Alpine Package: bluez](https://pkgs.alpinelinux.org/contents?branch=edge&name=bluez&arch=x86_64&repo=main)
- [khvzak/bluez-tools](https://github.com/khvzak/bluez-tools)
- [Docker on Raspberry Pi](https://blog.docker.com/2019/03/happy-pi-day-docker-raspberry-pi/)

Packages:

- `bluez`
- `bluez-tools`
- `libbluetooth-dev`
- `blueman`
- `bluez-firmware` (Raspberry Pi)
- `pi-bluetooth` (Raspberry Pi)

Service:

```bash
sudo service bluetooth start
sudo service bluetooth status
```

Commands:

- `containers_check_frame_int`
- `containers_datagram_receiver`
- `containers_datagram_sender`
- `dtmerge`
- `dtoverlay`
- `dtparam`
- `raspistill`
- `raspivid`
- `tvservice`
- `vcgencmd`

Troubleshooting:

- [SAP error on bluetooth service status](https://raspberrypi.stackexchange.com/questions/40839/sap-error-on-bluetooth-service-status)
