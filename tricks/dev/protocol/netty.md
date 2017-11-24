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
