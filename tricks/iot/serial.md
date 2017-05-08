# Serial


## Tips
* [Remote-Serial-Console-HOWTO](http://tldp.org/HOWTO/Remote-Serial-Console-HOWTO/)
* [Serial-Programming-HOWTO](http://tldp.org/HOWTO/Serial-Programming-HOWTO/)
* [Modem-HOWTO](http://www.tldp.org/HOWTO/Modem-HOWTO-18.html)
* [how-do-you-reset-a-usb-device-from-the-command-line](https://askubuntu.com/questions/645/)
* [statserial](https://linux.die.net/man/1/statserial)
* [stty](https://linux.die.net/man/1/stty)
* http://www.linux-usb.org/tools.html
* man [minicom](https://linux.die.net/man/1/minicom)

```bash
# https://wiki.archlinux.org/index.php/working_with_the_serial_console#Command_line
minicom -s
# minicom 如果看起来比较奇怪,可以尝试设置 LANG="en_US.UTF-8"

screen /dev/ttyS0 115200
# <C-A><C-\> 退出
# https://www.gnu.org/software/screen/manual/html_node/Key-Binding.html#Key-Binding

# 查看串口状态
setserial -g /dev/ttyUSB0
```
## FAQ
### 连上了 USB 串口设备但看不到对应的 tty
```bash
modprobe usbserial
# 尝试断开或链接 USB 设备,查看日志
dmesg
# 如果没有, 则可以手动添加
echo '067b 2303' > /sys/bus/usb-serial/drivers/generic/new_id
# dmesg 会看到类似如下的日志,此时使用 ttyUSB0 即可
# [11330611455.720721] usbcore: registered new interface driver option
# [11330611455.720737] usbserial: USB Serial support registered for GSM modem (1-port)
# [11330611523.632066] usbserial_generic 2-2:1.0: The "generic" usb-serial driver is only for testing and one-off prototypes.
# [11330611523.632070] usbserial_generic 2-2:1.0: Tell linux-usb@vger.kernel.org to add your device to a proper driver.
# [11330611523.632072] usbserial_generic 2-2:1.0: generic converter detected
# [11330611523.632124] usb 2-2: generic converter now attached to ttyUSB0

# 自动挂载
nano /etc/udev/rules.d/99-ftdi.rules
# 添加
# ACTION=="add", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="2303", RUN+="/sbin/modprobe ftdi_sio" RUN+="/bin/sh -c 'echo 067b 2303 > /sys/bus/usb-serial/drivers/ftdi_sio/new_id'"
# 然后重新加载
udevadm control --reload
# 将设备从新插入即可
```



### cu.* vs tty.*

The idea is to supplement software in sharing a line between incoming and outgoing calls. The callin device (typically /dev/tty*) is used for incoming traffic. Any process trying to open it blocks within the open() call as long as DCD is not asserted by hardware (i.e. as long as the modem doesn't have a carrier). During this, the callout device (typically /dev/cu* -- cu stands for "calling unit") can be freely used. Opening /dev/cu* doesn't require DCD to be asserted and succeeds immediately. Once succeeded, the blocked open() on the callin device will be suspended, and cannot even complete when DCD is raised, until the cu device is closed again.

That way, you can have a getty listening on /dev/tty*, and can still use /dev/cu* without restrictions.

http://stackoverflow.com/questions/8632586
