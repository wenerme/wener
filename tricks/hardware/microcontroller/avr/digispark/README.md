# Digispark USB Development Board

## Tips

- [digistump/DigistumpArduino](https://github.com/digistump/DigistumpArduino)
- http://digistump.com/package_digistump_index.json
  - https://github.com/digistump/arduino-boards-index/raw/master/package_digistump_index.json
- https://digistump.com/wiki/digispark/tutorials/connecting
- https://github.com/jaromaz/DigiOS
- https://github.com/SpenceKonde/ATTinyCore
- https://github.com/J-Rios/Digispark_DigiUSB-SoftSerial
- idVendor=16d0, idProduct=0753
- https://digistump.com/wiki/digispark/tutorials/linuxtroubleshooting
- 注意
  - 插上后 5s 会启动 - 启动后没有 tty

## Spec

- [Digispark USB Development Board](http://digistump.com/products/1)
- Arduino IDE 1.0+ (OSX/Win/Linux)
- Power via USB or External Source - 5v or 7-35v (12v or less recommended, automatic selection)
- On-board 500ma 5V Regulator
- Built-in USB
- 6 I/O Pins (2 are used for USB only if your program actively communicates over USB, otherwise you can use all 6 even if you are programming via USB)
- 8k Flash Memory (about 6k after bootloader)
- I2C and SPI (vis USI)
- PWM on 3 pins (more possible with Software PWM)
- ADC on 4 pins
- Power LED and Test/Status LED

| PIN | Function                                     | Port | Arduino | Peripherals |
| --- | -------------------------------------------- | ---- | ------- | ----------- |
| 1   | (PCINT5/RESET/ADC0/dW) PB5                   | PB5  | 5/A0    |
| 2   | (PCINT3/XTAL1/CLKI/OC1B/ADC3) PB3            | PB3  | 3/A3    | USB M       |
| 3   | (PCINT4/XTAL2/CLKO/OC1B/ADC2) PB4            | PB4  | 4/A2    | USB P       |
| 4   | GND                                          |      |         |
| 5   | PB0 (MOSI/DI/SDA/AIN0/OC0A/OC1A/AREF/PCINT0) | PB0  | 0       | SDA         |
| 6   | PB1 (MISO/DO/AIN1/OC0B/OC1A/PCINT1)          | PB1  | 1       |
| 7   | PB2 (SCK/USCK/SCL/ADC1/T0/INT0/PCINT2)       | PB2  | 2/A1    | SCL         |
| 8   | VCC                                          |      |

## Digispark Pro

## Impl

- [](https://hamprojects.wordpress.com/2018/12/27/digispark-microcontrollers-implementation)

## Linux USB

```
usb 1-1: new low-speed USB device number 8 using xhci_hcd
usb 1-1: device descriptor read/64, error -71
usb 1-1: device descriptor read/64, error -71
usb 1-1: new low-speed USB device number 9 using xhci_hcd
usb 1-1: device descriptor read/64, error -71
usb 1-1: device descriptor read/64, error -71
usb usb1-port1: attempt power cycle
usb 1-1: new low-speed USB device number 10 using xhci_hcd
usb 1-1: Device not responding to setup address.
usb 1-1: Device not responding to setup address.
usb 1-1: device not accepting address 10, error -71
usb 1-1: new low-speed USB device number 11 using xhci_hcd
usb 1-1: Device not responding to setup address.
usb 1-1: Device not responding to setup address.
usb 1-1: device not accepting address 11, error -71
usb usb1-port1: unable to enumerate USB device
```
