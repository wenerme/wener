# USB

## Tips

## 加密狗
* [Software protection dongle](https://en.wikipedia.org/wiki/Software_protection_dongle)
* 安全令牌/[Security token](https://en.wikipedia.org/wiki/Security_token)

## sniffing
* [Free USB Analyzer](https://freeusbanalyzer.com/)
* Wireshark [USB capture](https://wiki.wireshark.org/CaptureSetup/USB)
* Linux module [usbmon](https://www.kernel.org/doc/Documentation/usb/usbmon.txt)
* [USB Monitoring](http://tjworld.net/wiki/Linux/Ubuntu/USBmonitoring)

## usbip
* [usbip-utils](https://github.com/torvalds/linux/tree/master/tools/usb/usbip)
* [usbip_protocol](https://www.kernel.org/doc/Documentation/usb/usbip_protocol.txt)

http://web.archive.org/web/20160403200320/http://blog.3mdeb.com/2015/10/27/linux/

- usbip-vhci  
    A client side kernel module which provides a virtual USB Host Controller
    and allows to import a USB device from a remote machine.

- usbip-host (stub driver)
    A server side module which provides a USB device driver which can be
    bound to a physical USB device to make it exportable.

- usbip-vudc
    A server side module which provides a virtual USB Device Controller and allows
    to export a USB device created using USB Gadget Subsystem.

- usbip-utils
    A set of userspace tools used to handle connection and management.
    Used on both sides.
