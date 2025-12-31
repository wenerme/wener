---
title: MQTT (Message Queuing Telemetry Transport) Protocol
tags:
  - Hardware
  - IoT
  - MQTT
  - Protocols
  - Networking
  - Go
---

# MQTT (Message Queuing Telemetry Transport) Protocol

MQTT is a lightweight, publish-subscribe network protocol that transports messages between devices. It is designed for connections with remote locations where a "small code footprint" is required or the network bandwidth is limited.

## Protocol Overview

- **Architecture**: Based on a Client/Broker model.
- **Transport**: Typically runs over TCP/IP, but variants like **MQTT-SN** (for Sensor Networks) can run over UDP/Bluetooth.
- **Port**: Default is `1883`, while encrypted (TLS/SSL) is `8883`.
- **Payload**: Can carry up to 256MB of data; control headers can be as small as 2 bytes.
- **QoS (Quality of Service)**:
  - **Level 0**: At most once (Fire and forget).
  - **Level 1**: At least once (Acknowledged).
  - **Level 2**: Exactly once (Four-step handshake).

## Features & Security

- **Topic System**: Uses a hierarchical structure (e.g., `home/living-room/temperature`).
- **Retained Messages**: The broker stores the last message on a topic for new subscribers.
- **Last Will and Testament (LWT)**: Notifies other clients when a client unexpectedly disconnects.
- **Security**: Basic authentication uses plain-text usernames and passwords. **TLS/SSL** is highly recommended to protect against interception and tempering.

## Recommended Implementations

### Brokers

- **Eclipse Mosquitto**: a popular lightweight open-source MQTT broker.
  - [Mosquitto Official Site](https://mosquitto.org/)
  - [Eclipse IoT Projects](https://iot.eclipse.org/projects/)
- **EMQX**: Scalable, distributed MQTT broker for IoT.

### Client Libraries

- **Eclipse Paho**: A collection of high-quality MQTT client libraries.
  - [Eclipse Paho Project Site](https://www.eclipse.org/paho/)
- - [eclipse/paho.mqtt.golang](https://github.com/eclipse/paho.mqtt.golang)
    - Go, EPL-2.0 / EDL-1.0
    - The standard MQTT client library for Go. Supports MQTT 3.1, 3.1.1, and V5. Supports TCP, TLS, and WebSockets.

## Resources

- [MQTT Official Site](https://mqtt.org/)
- [MQTT Specifications](https://mqtt.org/mqtt-specification/)
- [Comparison of MQTT Implementations (Wikipedia)](https://en.wikipedia.org/wiki/Comparison_of_MQTT_implementations)
