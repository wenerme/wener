# Things

https://godoc.org/golang.org/x/exp/io
https://github.com/kidoman/embd
https://gobot.io/
http://dave.cheney.net/tag/i2c

http://www.i2cdevlib.com/
https://i2c.wiki.kernel.org/index.php/Main_Page

http://beagleboard.org/black
https://www.nextthing.co/pages/chip


https://github.com/dhiltgen/go-owfs
https://github.com/aqua/raspberrypi

https://github.com/deadsy/libusb
https://github.com/popons/go-libusb


https://github.com/rwaldron/johnny-five
https://github.com/Samsung/iotjs

https://www.youtube.com/channel/UCv4wLkSjErXvmDXxhi4XH5Q

## Protocols

* [网络总线类型](https://en.wikipedia.org/wiki/List_of_network_buses)

* UART  
* USI
* HSU
  * High Speed UART
* TTL
* STC
* DIP
* USB
TTL/RS485/RS232
NXP IIC
SCSI
SMBus

### I<sup>2</sup>C
* 同步串行
* 针脚
  * SDA
  * SCL
* 最大节点数 127 或 1023
* 最大长度 7.6 m
* 最大速率 5000 kbit/s

#### 参考资料
* Linux i2c 驱动[文档](https://www.kernel.org/doc/Documentation/i2c/)
* Linux i2c 驱动[源码](https://github.com/torvalds/linux/tree/master/drivers/i2c)

### SPI 串行外设接口
* 全双工
* 针脚
  * SCLK 串行时钟，由主机发出
  * MOSI 主机输出从机输入信号，由主机发出
  * MISO 主机输入从机输出信号，由从机发出
  * SS 片选信号，由主机发出，低电平有效

### 1-Wire
* 最大节点数 2<sup>48</sup>
* 最大速率 16.3 kbit/s
* 最大长度 300 m



### Docs


## Devfs
https://en.wikipedia.org/wiki/Device_file
http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/dev.html
https://en.wikipedia.org/wiki/Udev
## 名词
* SRAM
* EEPROM
* SDL
  * Serial Data Line
* SCL
  * Serial Clock Line
* SCLK
  * Serial Clock
  * SCK, CLK
* MOSI
  * Master Output, Slave Input
  * SIMO, SDI, DI, DIN, SI, MTST
* MISO
  * Master Input, Slave Output
  *  SOMI, SDO, DO, DOUT, SO, MRSR
* SS
  * Slave Selected
  * nCS, CS, CSB, CSN, EN, nSS, STE, SYNC, SSQ
* CPOL
  * Clock Polarity
* CPHA
  * Clock Phase

## Platforms

* ATMEGA
* Digispark

## Libs

https://github.com/stianeikeland/go-rpio

## USB
USB 设备可以通过 Vendor Id + Product Id 来标识具体的设备, 其定义可以在这里找到

* http://www.linux-usb.org/usb.ids
* http://pcidatabase.com/

* PL-2303
  * VID:067B
  * PID:2303

* libusb example
  * https://github.com/hjelmn/libusb-darwin/tree/master/examples
* https://github.com/jlhonora/lsusb

```bash
# 跟踪内核日志
# Linux
dmesg -wH
# Mac
watch -n 0.1 "sudo dmesg | tail -n $((LINES-6))"
```

## Platforms



### PL2303
USB 转 TTL 串口, 设备号为 vid 0x067b pid 0x2303.


* Release Number
  * 0x400
    * PL2303HX
    * 2007年

* [产品类型列表](http://www.prolific.com.tw/TW/ShowProduct.aspx?pcid=79&showlevel=0052-0076-0079)
* [驱动下载](http://prolificusa.com/pl-2303hx-drivers/)
* [Linux 驱动源码](https://github.com/torvalds/linux/blob/master/drivers/usb/serial/pl2303.c)
* [Linux 驱动源码 - free-electrons](http://lxr.free-electrons.com/source/drivers/usb/serial/pl2303.c)

https://github.com/bjarnoldus/mac-osx-pl2303

### F3461BH
0.36英寸 4位数码管 共阳数码管 3461 LED数码管


### Nodemcu
http://nodemcu.readthedocs.io/en/master/

* CH340G Driver
  * http://kig.re/2014/12/31/how-to-use-arduino-nano-mini-pro-with-CH340G-on-mac-osx-yosemite.html
* CPU 80 MHz RAM 80 kB FLASH 4096 kB
### A81 Digispark kickstarter
最小 Arduino usb 开发板 TINY85
http://digistump.com/wiki/digispark/tutorials/connecting
运行的是 https://github.com/micronucleus/micronucleus

* ATTINY85	8 MHz	0.5 kB	8 kB

### ESP8266
* 产品详情 http://espressif.com/products/hardware/esp8266ex/overview/
* 资源 http://espressif.com/en/products/hardware/esp8266ex/resources
* Arduino
* WiFi
  * 802.11 b/g/n/e/i
  * 2.4G ~ 2.5G (2400M ~ 2483.5M)
* CPU
  * Tensilica L106 32-bit micro controller
* Peripheral Interface
  * UART/SDIO/SPI/I2C/I2S/IR Remote Control
  * GPIO/ADC/PWM/LED Light & Button

* http://www.esp8266.nu/index.php/Power
* http://www.espruino.com/ESP8266
* https://github.com/Samsung/jerryscript/tree/master/targets/esp8266
* Kolban’s book on the ESP8266
* http://neilkolban.com/tech/esp8266/
* http://www.espruino.com/EspruinoESP8266
* http://www.espruino.com/ESP8266_Flashing
* Latest build http://forum.espruino.com/conversations/279176/?offset=150
* https://espressif.com/en/support/download/sdks-demos
* https://github.com/themadinventor/esptool
* http://sabaharduino.blogspot.com/2016/09/get-started-with-esp8266-using-at.html

* 官方文档下载,有中文 http://bbs.espressif.com/viewtopic.php?f=67&t=225/
* https://en.wikipedia.org/wiki/ESP8266
* https://github.com/espressif
* https://github.com/esp8266

```bash
# !一定要使用最新的 esptool
# git clone https://github.com/themadinventor/esptool
# ESP-12
esptool.py --port /dev/cu.wchusbserial1410 --baud 115200 write_flash \
  --flash_freq 80m --flash_mode qio --flash_size 32m \
  0x0000 "boot_v1.6.bin" 0x1000 espruino_esp8266_user1.bin \
  0x3FC000 esp_init_data_default.bin 0x37E000 blank.bin

# 注意要使用 115200 也要记得在 IDE 中设置
screen /dev/cu.wchusbserial1410 115200
```




### Arduino

第三方支持列表 https://github.com/arduino/Arduino/wiki/Unofficial-list-of-3rd-party-boards-support-urls
浏览器插件 https://codebender.cc/static/plugin
https://github.com/Bouni/Arduino-Pinout

### Espruino
* [参考文档](http://www.espruino.com/Reference)


```js
// 最简单的例子
var pin = NodeMCU.D3;
pin.mode('output');

var  on = false;
setInterval(function() {
  on = !on;
  pin.write(on);
}, 500);
```

```js
// ==============
// 基本操作
// ==============
// 保存,以便每次启动都自动运行
save()
// ==============
// process
// ==============
// 获取环境信息
process.env
// 获取内存信息
process.memory()
// 获取版本号
process.version
process.on('uncaughtException', function() {console.log("UncaughtException",arguments);});

// ==============
// HTTP
// ==============
var pos = 50;
function setPos(p) {
  pos = p;
  console.log("Pos changed to "+p);
}
function requestHandler(req, res) {
  if (req.method=="POST") {
    // If it's a POST, save the data
    var info = url.parse(req.url,true);
    console.log("POST ",info);
    if (info.query && "pos" in info.query)
      setPos(parseFloat(info.query.pos));
    res.writeHead(200);
    res.end("Ok.");
  } else {
    // otherwise write the page out
    console.log("GET "+req.url);
    if (req.url=="/") {
      res.writeHead(200);
      res.end("POS: "+pos);
    } else {
      res.writeHead(404);
      res.end("404: Not found");
    }
  }
}
var svr = require("http").createServer(requestHandler);
svr.listen(80)

// ==============
// WiFi
// ==============
var wifi = require("Wifi");
wifi.on('connected', function(d) {console.log('Wifi Connected: ',d.ip,d.netmask,d.gw)});
wifi.on('dhcp_timeout', function(d) {console.log('Wifi DHCP Timeout')});
wifi.on('disconnected', function(d) {console.log('Wifi Disconnected: ',d.ssid,d.mac,d.reason)});

wifi.connect("DARONG", {password:"darong62889881"}, function(ap){ console.log("connected:", ap); });
// 保存配置以便以后连接自动连接
wifi.save()

wifi.setSNTP('us.pool.ntp.org',8)
wifi.getIP(function(d) {console.log('Wifi IP: ',d.ip,d.netmask,d.gw,d.mac)});

// AP
wifi.startAP('ESP AP', {password: 'password'}, function(){console.log('Wifi AP started')})
wifi.stopAP(function(){console.log('Wifi AP stopped')})
```

### UNO r3
* Atmega328
* 16 MHz
* Flash 32 KB

### FT232H
single channel USB 2.0 HiSpeed
(480Mb/s) to UART/FIFO IC

https://learn.adafruit.com/adafruit-ft232h-breakout/overview
https://www.adafruit.com/product/2264


Typical Applications

* Single chip USB to UART (RS232, RS422 orRS485)
* USB to FIFO
* USB to FT1248
* USB to JTAG
* USB to SPI
* USB to I2C
* USB to Bit-Bang
* USB to Fast Serial Interface
* USB to CPU target interface (as memory)
* USB Instrumentation
* USB Industrial Control
* USB EPOS Control
* USB MP3 Player Interface
* USB FLASH Card Reader / Writers
* Set Top Box - USB interface
* USB Digital Camera Interface
* USB Bar Code Readers

* 支持多种协议
  * FIFO
  * FT1248
  * JTAG
  * SPI
  * I2C
  * Bit-Bang
  * Fast Serial Interface
* 可以通过 USB 控制 GPIO
  * 在 MPSSE 模式下有 7 个 GPIO


### HC-SR04
* 超声波
* PIN
  * VCC TRIG ECHO GND

### DS18B20
* 温度
* PIN
  * GND DQ Vdd
* http://datasheets.maximintegrated.com/en/ds/DS18B20.pdf
* 1 Wire Bus
* -55°C to +125°C
* DS18B20 有 64-bit 的串号作为标示
* Parasitic Power Mode 可使用 GND 和 DQ 两线
* 使用 47K 的电阻做 pullup, 只需要两线即可
http://www.hobbytronics.co.uk/ds18b20-arduino
http://www.milesburton.com/?title=Dallas_Temperature_Control_Library

### TMP36
* 温度
* 模拟信号

### ADXL335
* 三轴加速器

### VS1838B HX1838
* 红外接收

### IR
* 操作库
  * [IRLib](https://github.com/cyborg5/IRLib/)
  * [IRremote](https://github.com/z3t0/Arduino-IRremote)
* http://www.lirc.org/
* IR 原理 http://www.sbprojects.com/knowledge/ir/index.php

## L7805CV
* 三端稳压管 TO-220 三极管 LM7805

## L293D
* 电机驱动模块
* 16 Pin
* 输出电压 最大:36V
* 最大:600mA
* 通道数:4
* 驱动器数:4

## SN74HC595N

* 8位移位寄存器/锁存器
* 16 Pin

```
Qb    Vcc
Qc    Qa
Qd    SER
Qe    OE    Output Enable
Qf    RCLK
Qg    SRCLK
Qh    SRCLR
GND   Qh'
```

## OV7670
* 感光阵列：640*480
* 模拟电压：2.5-3.0V
* IO电压：1.7-3.0V

```
3V3	      GND
SIOC      SIOD
VSYNC	    HREF
PCLK      XCLK
D7        D6
D5        D4
D3        D2
D1        D0
RST	      PWDN
```

30 万像素每帧
一帧需要 300k*16=4800 kb=300k*2=600k
30fps 则需要 4800*30=144000 kbps=144mbps=18m/s

## WiFi
RT5350, MT7620 , AR9331

## SPIFFS
* SPI flash file system
* 基于 SPI 的闪存文件系统
* https://github.com/pellepl/spiffs


## Mirror
* http://mirrormirror.tech/
* http://blog.jobbole.com/97180/
* http://henson.github.io/post/magicmirror/
* https://github.com/MichMich/MagicMirror
* https://magicmirror.builders/
* https://github.com/HannahMitt/HomeMirror

## APP
https://github.com/blynkkk/blynk-library

## Door locker
http://www.safewise.com/blog/finding-the-perfect-electronic-door-lock-for-your-home/

* Kwikset Kevo

## 参考
* [Linux Device Driver](http://www.makelinux.net/ldd3/)
https://github.com/shihyu/linux_kernel_driver/tree/master/Books

Embedded Linux Wiki http://elinux.org/Main_Page
http://bellard.org/
https://github.com/levskaya/jslinux-deobfuscated
https://github.com/s-macke/jor1k
