# Netty


## Tips
* [netty/netty](https://github.com/netty/netty)
  * Netty project - an event-driven asynchronous network application framework
* [Changelog](http://netty.io/news/)
* Codec
  * codec-dns
  * codec-haproxy
  * codec-http
  * codec-http2
  * codec-memcache
  * codec-mqtt
  * codec-redis
  * codec-smtp
  * codec-socks
  * codec-stomp
  * codec-xml

Netty Best Practices a.k.a Faster == Better
http://normanmaurer.me/presentations/2014-facebook-eng-netty/slides.html

```
-Dio.netty.noUnsafe: false
-Dio.netty.tmpdir: /tmp (java.io.tmpdir)
-Dio.netty.bitMode: 64 (sun.arch.data.model)
-Dio.netty.noPreferDirect: false
-Dio.netty.maxDirectMemory: 4294967296 bytes
-Dio.netty.uninitializedArrayAllocationThreshold: -1
-Dio.netty.threadLocalMap.stringBuilder.initialSize: 1024
-Dio.netty.allocator.numHeapArenas: 16
-Dio.netty.allocator.numDirectArenas: 16
-Dio.netty.allocator.pageSize: 8192
-Dio.netty.allocator.maxOrder: 11
-Dio.netty.allocator.chunkSize: 16777216
-Dio.netty.allocator.tinyCacheSize: 512
-Dio.netty.allocator.smallCacheSize: 256
-Dio.netty.allocator.normalCacheSize: 64
-Dio.netty.allocator.maxCachedBufferCapacity: 32768
-Dio.netty.allocator.cacheTrimInterval: 8192
-Dio.netty.allocator.useCacheForAllThreads: true
-Dio.netty.allocator.type: pooled
-Dio.netty.threadLocalDirectBufferSize: 65536
-Dio.netty.maxThreadLocalCharBufferSize: 16384
-Dio.netty.buffer.bytebuf.checkAccessible: true
-Dio.netty.leakDetection.level: simple
-Dio.netty.leakDetection.maxRecords: 4
-Dio.netty.leakDetection.maxSampledRecords: 40
-Dio.netty.native.workdir: /tmp (io.netty.tmpdir)
-Dio.netty.eventLoopThreads: 16
-Dio.netty.noKeySetOptimization: false
-Dio.netty.selectorAutoRebuildThreshold: 512
-Dio.netty.processId: 77671 (auto-detected)
-Djava.net.preferIPv4Stack: false
-Djava.net.preferIPv6Addresses: false
-Dio.netty.machineId: ac:00:00:00:00:00:00:22 (auto-detected)
```

Connection reset by peer 

https://github.com/netty/netty/issues/6029
https://github.com/netty/netty/issues/5936


https://netty.io/wiki/related-projects.html

Proxy
https://my.oschina.net/flashsword/blog/169361

A reactive Java framework for building fault-tolerant distributed systems
https://atomix.io/
https://github.com/atomix/atomix
part of the ONOS


https://github.com/ccheneau/Holmes
DLNA/UPnP protocol for playing videos, music and pictures to compatible devices.

https://lettuce.io/
 fully non-blocking Redis client built with netty providing Reactive, Asynchronous and Synchronous Data Access .

https://github.com/scalecube/socketio
Socket.IO Java Server based on Netty.

http://relayrides.github.io/pushy/
Java library for sending APNs (iOS/macOS/Safari) push notifications

https://github.com/termd/termd
open source terminal daemon library providing terminal handling in Java

https://github.com/Rogiel/torrent4j
Bittorrent library implemented in pure java 

https://github.com/UniversalMediaServer/UniversalMediaServer/
A DLNA-compliant UPnP Media Server.

https://github.com/RestComm/media-core
RMS - Restcomm Media Server for Real Time Cloud Communications 

Pluggable Architecture
Digital Signal Processing
RTP and RTCP Processing
SDP Parsing
ICE and DTLS capabilities
WebRTC support
Multiple codec support
Advanced Media Operations such as Play, Record, DTMF generation and recognition, Voice Activity Detection, Automatic Speech Recognition, etc.
Support for control protocols such as MGCP or JSR-309

https://github.com/RestComm/Restcomm-Connect

https://github.com/RestComm/sip-servlets
Leading SIP - IMS - WebRTC Application Server

https://github.com/scalikejdbc/scalikejdbc-async

https://github.com/wenerme/myfacility

JDBC Next: A New Asynchronous API for Connecting to a Database
https://www.slideshare.net/ypoirier/jdbc-next-a-new-asynchronous-api-for-connecting-to-a-database

## LEAK: ByteBuf.release() was not called before it's garbage-collected

* 一般是因为忘记 release 导致的，可以在启动时添加 `-Dio.netty.leakDetectionLevel=advanced` 来检测
* 也可以通过代码开启 `ResourceLeakDetector#setLevel`
  * 默认 SIMPLE 最高 PARANOID 也可以关闭 DISABLED
* 该参数会将 netty 的速度拖慢 10 倍

```
ERROR i.n.u.ResourceLeakDetector: LEAK: ByteBuf.release() was not called before it's garbage-collected. Enable advanced leak reporting to find out where the leak occurred. To enable advanced leak reporting, specify the JVM option '-Dio.netty.leakDetectionLevel=advanced' or call ResourceLeakDetector.setLevel()
```


