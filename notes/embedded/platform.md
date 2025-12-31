---
title: Open Source IoT Platforms & Protocols
tags:
  - Embedded
  - IoT
  - Platform
  - OpenSource
  - Protocols
---

# Open Source IoT Platforms & Protocols

A collection of open-source tools, resources, and platforms for building Internet of Things (IoT) solutions.

## Resources & Aggregators

- [Postscapes IoT Open Source Awards](https://www.postscapes.com/internet-of-things-award/open-source/)
- [67 Open Source Tools for IoT (TechBeacon)](https://techbeacon.com/67-open-source-tools-resources-iot)
- [Eclipse IoT Industry Working Group](https://iot.eclipse.org/)

## IoT Protocols

- **HTTP RESTful**: Standard web interface for IoT.
- **MQTT (Message Queuing Telemetry Transport)**: Lightweight publish/subscribe messaging.
- **WebSocket**: Full-duplex communication over a single TCP connection.
- **CoAP (Constrained Application Protocol)**: [Wikipedia](https://en.wikipedia.org/wiki/Constrained_Application_Protocol)
  - [Eclipse Californium](https://www.eclipse.org/californium/): Java implementation of CoAP.

## Major IoT Platforms

### IoTivity

- [iotivity/iotivity](https://github.com/iotivity/iotivity)
  - **License**: Apache 2.0 | **Language**: C++, C, Java, Python | **Tech**: OCF Standards
  - [IoTivity](https://iotivity.org/about) is an open-source framework implementing Open Connectivity Foundation (OCF) standards for secure device-to-device communication.

### Eclipse Mosquitto

- [eclipse/mosquitto](https://github.com/eclipse/mosquitto)
  - **License**: EPL 2.0 / EDL 1.0 | **Language**: C, C++ | **Tech**: MQTT Broker
  - An open-source message broker that implements the MQTT protocol (versions 5.0, 3.1.1, and 3.1).

### ThingsBoard

- [thingsboard/thingsboard](https://github.com/thingsboard/thingsboard)
  - **License**: Apache 2.0 | **Language**: Java | **Tech**: Spring Boot, NoSQL (Cassandra/PostgreSQL)
  - Device management, data collection, processing, and visualization. Supports multi-tenancy and horizontal scalability.

### Kaa IoT Platform

- [kaaproject/kaa](https://github.com/kaaproject/kaa)
  - **License**: Apache 2.0 | **Language**: Go, Java, TypeScript | **Tech**: Microservices, Digital Twins
  - A highly flexible middleware platform for developing end-to-end IoT solutions, featuring device management and data analytics.

### Mainflux (Now Magistrala)

- [mainflux/mainflux](https://github.com/mainflux/mainflux)
  - **License**: Apache 2.0 | **Language**: Go | **Tech**: Docker, Microservices
  - Industrial IoT messaging and device management server designed to be highly secure and scalable.

### Apache iota (Incubating)

- [Apache iota](https://iota.incubator.apache.org/)
  - **Language**: Python (Django), Scala (Spark) | **Tech**: Spark, Redis, Kafka, CockroachDB
  - Built to ingest, analyze, and orchestrate IoT data in a highly distributed and performant fashion.

## Specialized Tools & Frameworks

### Project Flogo

- [tibcosoftware/flogo](https://github.com/tibcosoftware/flogo)
  - **License**: BSD-3-Clause | **Language**: Go | **Tech**: Serverless, Edge computing
  - An open-source ecosystem dedicated to simplifying the creation of event-driven, serverless functions and edge microservices.

### OpenThread

- [openthread/openthread](https://github.com/openthread/openthread)
  - **License**: BSD-3-Clause | **Language**: C++ | **Tech**: Thread Networking Protocol
  - [OpenThread](https://openthread.io/) is an open-source implementation of the Thread networking protocol by Google, targeted at connected home/building products.

### Eclipse Kapua

- [Eclipse Kapua](https://www.eclipse.org/kapua/)
  - **Tech**: Java, Modular IoT Cloud
  - A modular IoT cloud platform to manage and integrate devices and their data efficiently.

### Thinger.io

- [thinger-io/thinger.io](https://github.com/thinger-io)
  - **License**: MIT | **Language**: C++ (Client lib) | **Tech**: Cloud IoT Platform
  - Helps users prototype, scale, and manage connected products with bidirectional communication tools.

## Self-Hosted / Service Categories

- Self-host: Hosting the entire platform on private infrastructure.
- Self-service: Managed platforms with self-service capabilities.
- Self-center / Self-iot: Focus on user-centric or decentralized IoT models.
