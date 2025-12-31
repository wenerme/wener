---
title: GStreamer
tags:
  - GStreamer
---

# GStreamer

- [Official Site](https://gstreamer.freedesktop.org/)
- [Wikipedia: GStreamer](https://en.wikipedia.org/wiki/GStreamer)
- [GStreamer Bindings](https://gstreamer.freedesktop.org/bindings/)
- [ziutek/gst](https://github.com/ziutek/gst)
  - Go bindings for GStreamer
- Java
  - [gstreamer-java/gst1-java-core](https://github.com/gstreamer-java/gst1-java-core)
  - [gst1-java-core 0.9.3](http://mvnrepository.com/artifact/org.freedesktop.gstreamer/gst1-java-core/0.9.3)

```xml
<dependency>
    <groupId>org.freedesktop.gstreamer</groupId>
    <artifactId>gst1-java-core</artifactId>
    <version>0.9.3</version>
</dependency>
```

- [Is WebRTC Ready Yet?](http://iswebrtcreadyyet.com/)
- [centricular/gstwebrtc-demos](https://github.com/centricular/gstwebrtc-demos)
  - Demo apps for using gstreamer's webrtc implementation
- [GStreamer Phone Wiki](https://github.com/matthiasbock/gstreamer-phone/wiki)
- [plugin-webrtc](https://gstreamer.freedesktop.org/data/doc/gstreamer/head/gst-plugins-bad/html/gst-plugins-bad-plugins-plugin-webrtc.html)
- [webrtcdsp](https://gstreamer.freedesktop.org/data/doc/gstreamer/head/gst-plugins-bad/html/gst-plugins-bad-plugins-webrtcdsp.html)
- iOS 11 Jun 7, 2017
  - [Announcing WebRTC and Media Capture](https://webkit.org/blog/7726/announcing-webrtc-and-media-capture/)
- [GStreamer WebRTC Conference Video](https://gstconf.ubicast.tv/videos/gstreamer-webrtc/)
- [RideRun GstWebRTC](https://www.ridgerun.com/gstwebrtc)

```bash
brew install gstreamer
gst-inspect-1.0 gst-launch-1.0 gst-stats-1.0 gst-typefind-1.0
```

- GStreamer Editing Services
  - [gst-editing-services](https://gstreamer.freedesktop.org/modules/gst-editing-services.html)

- Plugins
  - gst-plugins-good
    - gst-editing-services gst-plugins-ugly gstreamermm
    - gst-libav gst-python logstalgia
  - gst-plugins-bad
    - gst-rtsp-server logstash
  - gst-plugins-base
    - gst-validate

## Multi-party

- Mesh
  - appear.in
- SFU - Selective Forward Unit
  - talky swritchrtc
- MCU - Multipoint Control Unit
  - blue jeans

| n          | Mesh | SFU | MCU    |
| ---------- | ---- | --- | ------ |
| 提供者带宽 | 0    | n^2 | n      |
| 单用户带宽 | n    | n   | 1      |
| 总用户带宽 | n!   | n^2 | 1      |
| 提供者处理 | 0    | n   | n - n! |
| 用户处理   | n    | n   | 1      |

## Technology

- RTC: rtpbin element
- ICE: libnice
- DTLS SRTP SCTP: dtlssrtpenc/dec elements
- An API
- SDP Parsing Generation

- webrtcbin
  - RTCP Muxing
  - RTX Retransimming
  - FEC Forward Error Correction
  - RTP bundling
  - LS groups
  - Trickle ICE
