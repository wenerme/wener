---
title: Z-Wave Wireless Communication Protocol
tags:
  - Hardware
  - IoT
  - Z-Wave
  - Protocols
  - SmartHome
  - Mesh
---

# Z-Wave Wireless Communication Protocol

Z-Wave is a wireless communications protocol used primarily for residential and commercial building automation. It is a mesh network using low-energy radio waves to communicate between appliances.

- [Z-Wave (Wikipedia)](https://en.wikipedia.org/wiki/Z-Wave)

## Protocol Features

- **Frequency**: Unlike Zigbee or WiFi (2.4GHz), Z-Wave operates in the **sub-GHz** band (e.g., 908.42 MHz in the US, 868.42 MHz in Europe). This provides better range and less interference from other devices.
- **Mesh Networking**: Devices act as repeaters, allowing the signal to "hop" between nodes (up to 4 hops).
- **Interoperability**: Strict certification ensures that all Z-Wave devices work together regardless of the manufacturer.
- **Low Power**: Optimized for battery-operated devices (sensors, locks).

## Open Source Implementations

- **Z-Wave JS**: A modern, high-performance Z-Wave driver written in Node.js. It has largely succeeded OpenZWave in the Home Assistant ecosystem.
  - [Z-Wave JS Official Site](https://z-wave-js.github.io/node-zwave-js/)
- **OpenZWave**: A legacy C++ library used to interface with Z-Wave controllers.
  - [OpenZWave Project Site](http://openzwave.com/)

## Use Cases

- **Lighting Control**: Smart switches and dimmers.
- **Security**: Door locks, motion sensors, and sirens.
- **Climate**: Thermostats and TRVs.
- **Energy**: Smart plugs with power monitoring.
