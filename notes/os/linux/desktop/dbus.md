---
title: dbus
---

# dbus

- dbus
  - from freedesktop.org , governace RedHat
  - 用于 控制
  - IPC
    - Shared memory
    - Memory-mapped file
    - Pipe
    - Named Pipe
    - Socket
  - libdbus
  - dbus-daemon
- [dbus-specification](https://dbus.freedesktop.org/doc/dbus-specification.html)
- [Understanding DBus](https://bootlin.com/pub/conferences/2016/meetup/dbus/josserand-dbus-meetup.pdf)

## Notes

- System bus
  - 系统维度
  - 设备
- Session bus
  - 用户维度
  - 桌面服务
  - 关联 X session
- 操作对象
  - Services -> Objects -> Interfaces
  - Clients - 消费端
  - 应用将内部 服务 注册到 DBus
- [Bus 名字](https://dbus.freedesktop.org/doc/dbus-specification.html#message-protocol-names-bus)
  - `:` 开头的为唯一名字
    - 数字开头 - 例如 `1.40`
  - 非 `:` 开头为 well-known bus names
  - `.` 分割多部分 - 至少 2 部分
  - `[A-Z][a-z][0-9]_-`
    - 新名字不推荐 `-`
