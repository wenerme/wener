---
title: Serial Console & Communication
tags:
  - Embedded
  - Serial
  - UART
  - Linux
  - macOS
  - Troubleshooting
---

# Serial Console & Communication

Notes on using serial consoles, managing USB-serial devices, and troubleshooting connectivity issues.

## Documentation & Guides

- [Remote Serial Console HOWTO](http://tldp.org/HOWTO/Remote-Serial-Console-HOWTO/)
- [Serial Programming HOWTO](http://tldp.org/HOWTO/Serial-Programming-HOWTO/)
- [Modem HOWTO](http://www.tldp.org/HOWTO/Modem-HOWTO-18.html)
- [Linux USB Tools](http://www.linux-usb.org/tools.html)

## Common Tools

- `minicom`: Classic serial communication program. [Man page](https://linux.die.net/man/1/minicom).
- `screen`: Terminal multiplexer often used as a simple serial client.
- `stty`: Set or display terminal line characteristics. [Man page](https://linux.die.net/man/1/stty).
- `setserial`: Configuration tool for serial ports. [Man page](https://linux.die.net/man/1/statserial).

## Usage Examples

```bash
# Initialize minicom setup
# If characters display incorrectly, try: LANG="en_US.UTF-8"
minicom -s

# Connect using screen
screen /dev/ttyS0 115200
# To exit: press Ctrl-A then Ctrl-\

# View serial port status
setserial -g /dev/ttyUSB0
```

## Troubleshooting (FAQ)

### USB Serial Device Not Showing /dev/tty\*

If the kernel recognizes the USB device but doesn't attach it to a serial driver, you can try manual intervention.

1. **Check Logs**:
   ```bash
   dmesg | tail
   ```
2. **Force Driver Attachment**:
   If you identify the VID and PID (e.g., `067b:2303`), you can tell the generic driver to handle it:
   ```bash
   modprobe usbserial
   echo '067b 2303' > /sys/bus/usb-serial/drivers/generic/new_id
   ```
3. **Automate with Udev**:
   Create `/etc/udev/rules.d/99-ftdi.rules`:
   ```text
   ACTION=="add", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="2303", RUN+="/sbin/modprobe ftdi_sio", RUN+="/bin/sh -c 'echo 067b 2303 > /sys/bus/usb-serial/drivers/ftdi_sio/new_id'"
   ```
   Reload udev:
   ```bash
   udevadm control --reload
   ```

### cu._ vs tty._ on macOS/Unix

- **/dev/tty.\***: The "call-in" device. It blocks on `open()` until DCD (Data Carrier Detect) is asserted by hardware (e.g., a modem establishes a connection).
- **/dev/cu.\***: The "call-out" device (Call-Unit). It opens immediately regardless of DCD state.
- **Usage**: Use `cu.*` for outgoing serial communication (like connecting to an MCU) to avoid hanging on DCD.

- [StackOverflow - Difference between tty and cu devices](http://stackoverflow.com/questions/8632586)

### Resetting a USB Port

If a device becomes unresponsive, you may need to reset the USB bus or port from the command line.

- [How to reset a USB device (AskUbuntu)](https://askubuntu.com/questions/645/)
