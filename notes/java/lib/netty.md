---
title: Netty
---

# Netty

## Unable to load io.netty.resolver.dns.macos.MacOSDnsServerAddressStreamProvider

```xml
<profile>
  <id>macos-m1</id>
  <activation>
    <os>
      <family>mac</family>
      <arch>aarch64</arch>
    </os>
  </activation>
  <dependencies>
    <dependency>
      <groupId>io.netty</groupId>
      <artifactId>netty-resolver-dns-native-macos</artifactId>
      <classifier>osx-aarch_64</classifier>
    </dependency>
  </dependencies>
</profile>

<profile>
  <id>macos-x86_64</id>
  <activation>
    <os>
      <family>mac</family>
      <arch>x86_64</arch>
    </os>
  </activation>
  <dependencies>
    <dependency>
      <groupId>io.netty</groupId>
      <artifactId>netty-resolver-dns-native-macos</artifactId>
      <classifier>osx-x86_64</classifier>
    </dependency>
  </dependencies>
</profile>
```
