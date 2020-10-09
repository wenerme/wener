# micronucleus
## Tips
* [micronucleus/micronucleus](https://github.com/micronucleus/micronucleus) - ATTiny usb bootloader with a strong emphasis on bootloader compactness.
* [ATTiny + Micronucleus](https://gist.github.com/amcolash/b930cb9d206b75ca5fd4ab974cb78a60)

```bash
apk add libusb-dev libusb-compat-dev avr-libc

git clone https://github.com/micronucleus/micronucleus
cd micronucleus
make CONFIG=t85_default

micronucleus --run micronucleus-1.11-upgrade.hex
micronucleus --run --type intel-hex main.hex
```

