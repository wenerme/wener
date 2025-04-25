---
title: 远程桌面
---

# Remote Desktop

## RDP

- FreeRDP
  - [User manual](https://github.com/awakecoding/FreeRDP-Manuals/blob/master/User/FreeRDP-User-Manual.markdown)
  - Mac 下需要 XQuartz
- vbox [Remote virtual machines](https://www.virtualbox.org/manual/ch07.html)

```bash
xfreerdp /v:127.0.0.1:3389
xfreerdp +clipboard /u:<username> /v:<hostname> /size:<WxH> /p: <port>
```

## guacamole

- [Apache Guacamole](http://guacamole.incubator.apache.org/)
  - 支持会话记录, 可通过 guacenc 转为 mp4 等视频格式
- guacamole-protocol
  - 明文协议
- guacd
  - VNC -> guacamole-protocol
    - libguac-client-rdp
    - 支持 sftp 作为文件传输
    - 支持 UltraVNC Repeater 作为代理
    - 支持 PulseAudio 提供音频
    - 支持 Clipboard
    - VNC 服务
      - [vnc-servers](http://guacamole.incubator.apache.org/doc/gug/configuring-guacamole.html#vnc-servers)
      - RealVNC 或 TigerVNC 是最好的选择
      - TightVNC 建议禁用 JPEG 编码
        - 因为 Guacamole 均为无损的 PNG 图片
      - x11vnc
        - 性能与 RealVNC 和 TigerVNC 接近
        - 好处是在使用桌面的同时也能通过 VNC 暴露桌面控制
      - vino
        - 随 Gnome 分发, 可通过界面上的桌面共享开启.但更建议使用 x11vnc, 在测试中 x11vnc 表现的比 vino 好.
      - 如果是虚拟机,建议在虚拟机中安装 VNC 服务,而不是直接通过虚拟机管理器暴露 VNC 服务.
  - RDP -> guacamole-protocol
    - libguac-client-vnc
    - 支持 sftp 作为文件传输
    - 允许重定向 audio, printing, disk 等设备
      - audio 默认开启
      - printing 需要 guacamole 服务安装 GhostScript,当打印的时候用户会收到一个 PDF 文档
      - 虚拟 disk 可用于基于 SSH 做文件传输等
      - 预链接 Preconnection PDU
        - 如果使用了类似于 HyperV 这样的虚拟, 在同一个端口下可能对应了多个 RDP
        - 可在机器中执行 `Get-VM VirtualMachineName | Select-Object Id` 查看存在的虚拟机
        - 配置时链接可指定虚拟机
      - 最新版的 Windows 支持对单个程序进行远程
  - SSH 文本协议+终端模拟器 -> guacamole-protocol
    - 日志会话录制, 可转为视频或终端重播(scriptreplay)
  - SFTP
    - 文件传输
  - Telnet
    - libguac-client-telnet
    - 与 SSH 相似
    - 非加密
    - 不支持文件传输
- guacamole
  - Web 服务
