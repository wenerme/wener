---
title: OS FAQ
---

# OS FAQ

- [Windowing system](https://en.wikipedia.org/wiki/Windowing_system)

## tmpdir

```js
os.tmpdir()
```

```java
System.getProperty("java.io.tmpdir")
```

```shell
echo $TMPDIR
```

- Windows `C:\Users\$USER\AppData\Local\Temp`
- Linux `/tmp`
- macOS `/var/folders/.../T/`
- 参考
  - [TMPDIR](https://en.wikipedia.org/wiki/TMPDIR)
  - [Temporary folder](https://en.wikipedia.org/wiki/Temporary_folder)

## AlpineLinux vs OpenWRT

**相同点**

- 都很小
- 都支持大多嵌入式架构 - ARM, MIPS

**不同点**

- AlpineLinux
  - 轻量、简单、安全 的 Linux 发行版
  - 提供标准多架构 - 官方不会根据不同网络设备构建
- OpenWRT
  - 嵌入式网络设备系统
  - 开箱即用体验 - LuCI
  - 支持更多非标准设备 - 网络设备刷机
  - 特定场景

## Debian vs Ubuntu

- Debian
  - 注重 稳定、安全
  - 发布周期 更长
  - 服务器、企业级应用程序
- Ubuntu
  - 注重 易用、方便
