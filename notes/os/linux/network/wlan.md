---
tags:
  - Wireless
---

# WLAN

```bash
# Link Quality=65/70  Signal level=-45 dBm
sudo iwconfig wlan0

iwconfig wlan0 power off

iw dev wlan0 link

wpa_cli -i wlan0 status
```

# wireless-tools

```bash
apk add wireless-tools
```

- [Wireless Tools for Linux](https://hewlettpackard.github.io/wireless-tools/Tools.html)
- iwconfig manipulate the basic wireless parameters
- iwlist allow to initiate scanning and list frequencies, bit-rates, encryption keys...
- iwspy allow to get per node link quality
- iwpriv allow to manipulate the Wireless Extensions specific to a driver (private)
- ifrename allow to name interfaces based on various static criteria
