---
id: systemd
---

# Systemd

## Tips

- [systemd](https://www.freedesktop.org/wiki/Software/systemd)
- wikipedia [systemd](https://en.wikipedia.org/wiki/Systemd)
- [systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
- [systemctl manpage](https://www.freedesktop.org/software/systemd/man/systemctl.html)
- [How To Use Systemctl to Manage Systemd Services and Units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)
- 配置目录
  - `/etc/systemd/system/docker.service.d/*.conf`
  - `/etc/systemd/system/`
  - `/lib/systemd/system/`
- 参考
  - https://wiki.archlinux.org/index.php/Systemd-networkd
  - [Systemd 入门教程：命令篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)

```bash
# 查看配置
systemctl show docker
# 修改 Service 需要重载
systemctl daemon-reload
# 查看定义的配置
systemctl show --property=Environment docker
# 重启服务
systemctl restart docker

systemctl list-units --all
systemctl list-units --type=service
systemctl list-unit-files
# 查看 service 文件
systemctl cat docker.service
# 查看依赖
systemctl list-dependencies sshd.service
# mask 后的服务不能被启动
systemctl mask nginx.service
systemctl unmask nginx.service
# 编辑 service 文件
systemctl edit nginx.service
# 编辑完整的文件,而不是一个片段,会生成部分内容
systemctl edit --full nginx.service

# 系统状态
systemctl status
# 服务状态
systemctl status prometheus-node-exporter.service
# 远程服务状态
systemctl -H root@127.0.0.1 status httpd.service
# is-active, is-failed, is-enabled
systemctl is-active prometheus-node-exporter.service
# 管理
# start stop restart kill reload show
systemctl start apache.service
# 查看属性
systemctl show -P CPUShare apache.service
# 设置属性
systemctl set-property httpd.service CPUShares=500
#
systemctl daemon-reload

# 查看依赖
# --all - 所有
systemctl list-dependencies nginx.service

# enabled disabled static masked
# static - 无 [Install]， 只能被依赖
# masked - 被禁止
systemctl list-unit-files --type=service

# 查看内容
systemctl cat atd.service
```

| command                            | mean                            |
| ---------------------------------- | ------------------------------- |
| 查询                               | -                               |
| systemctl list-dependencies        | unit 依赖                       |
| systemctl list-sockets             | sockets 状态                    |
| systemctl list-jobs                | 活跃 jobs                       |
| systemctl list-unit-files          | unit 文件和状态                 |
| systemctl list-units               | units loaded/active             |
| systemctl get-default              | default target (like run level) |
| 服务                               | -                               |
| systemctl stop _service_           | 停止                            |
| systemctl start _service_          | 启动                            |
| systemctl restart _service_        | 重启                            |
| systemctl reload _service_         | 配置重载                        |
| systemctl daemon-reload            | 重载 unit 文件                  |
| systemctl status _service_         | 服务状态                        |
| systemctl --failed                 | 失败的服务                      |
| systemctl reset-failed             | 重置失败的状态                  |
| systemctl enable _service_         | 服务自启动                      |
| systemctl disable _service_        | 关闭自启动                      |
| systemctl show _service_           | 服务信息                        |
| systemctl edit _service_           | 编辑 unit                       |
| systemctl edit --full _service_    | 编辑服务                        |
| systemctl -H _host_ status network | 远程执行                        |
| 系统状态                           | -                               |
| systemctl reboot                   | 重启 / reboot.target            |
| systemctl poweroff                 | 关机 / poweroff.target          |
| systemctl emergency                | emergency.target                |
| systemctl default                  | 恢复到默认 multi-user.target    |
| 日志                               | -                               |
| journalctl                         | 所有日志                        |
| journalctl -u network.service      | 网络服务日志                    |
| journalctl -f                      | 跟随显示                        |
| journalctl -k                      | 内核日志                        |

| util            | desc               |
| --------------- | ------------------ |
| systemctl       | 主要命令           |
| journalctl      |
| notify          |
| systemd-analyze | 查看启动耗时       |
| cgls            |
| cgtop           |
| loginctl        | 当前登陆用户       |
| nspwan          |
| hostnamectl     | 查看和管理主机信息 |
| localectl       | 本地化配置         |
| timedatectl     | 时区               |

| daemon       | desc |
| ------------ | ---- |
| systemd      |
| journald     |
| networkd     |
| logind       |
| user session |

| unit      | desc                           |
| --------- | ------------------------------ |
| Service   | 系统服务                       |
| Target    | 多个 Unit 构成的一个组         |
| Device    | 硬件设备                       |
| Mount     | 文件系统的挂载点               |
| Automount | 自动挂载点                     |
| Path      | 文件或路径                     |
| Scope     | 不是由 Systemd 启动的外部进程  |
| Slice     | 进程组                         |
| Snapshot  | Systemd 快照，可以切回某个快照 |
| Socket    | 进程间通信的 socket            |
| Swap      | swap 文件                      |
| Timer     | 定时器                         |

## Unit 文件

```ini
[Unit]
Description=描述
Documentation=文档地址

Requires=强依赖 Unit
Wants=弱依赖 Unit
BindsTo=添加依赖到 Unit - 指定 Unit 退出则当前 Unit 会退出
Before=
After=
Conflicts=不能同时运行 Unit
Condition=
Assert=

[Install]
WantedBy=指定 Target 会 link 到 /etc/systemd/system/<Target>.wants
RequiredBy=指定 Target 会 link 到 /etc/systemd/system/<Target>.required
Alias=
Also=同时启动其他 Unit

[Service]
# simple - 执行 ExecStart
# forking
# oneshot - 一次性，执行完成后继续
# dbus - 通过 DBus 启动
# notify - 执行完毕通知 systemd
# idle - 有其他任务当前任务才执行
Type=simple

ExecStart=
ExecStartPre=
ExecStartPost=

ExecReload=

ExecStop=
ExecStopPost=

RestartSec=
# 重启情况 - always, on-success, on-failure, on-abnormal, on-abort, on-watchdog
Restart=

TimeoutSec=
Environment=
```

## Target

> Unit 组, 类似于其他 init 的 runlevel 概念

| runlevel   | target name      | link              |
| ---------- | ---------------- | ----------------- |
| Runlevel 0 | runlevel0.target | poweroff.target   |
| Runlevel 1 | runlevel1.target | rescue.target     |
| Runlevel 2 | runlevel2.target | multi-user.target |
| Runlevel 3 | runlevel3.target | multi-user.target |
| Runlevel 4 | runlevel4.target | multi-user.target |
| Runlevel 5 | runlevel5.target | graphical.target  |
| Runlevel 6 | runlevel6.target | reboot.target     |


```bash
# 查看当前系统的所有 Target
systemctl list-unit-files --type=target

# 查看一个 Target 包含的所有 Unit
systemctl list-dependencies multi-user.target

# 查看启动时的默认 Target
systemctl get-default

# 设置启动时的默认 Target
sudo systemctl set-default multi-user.target

# 切换 Target 时，默认不关闭前一个 Target 启动的进程，
# systemctl isolate 命令改变这种行为，
# 关闭前一个 Target 里面所有不属于后一个 Target 的进程
sudo systemctl isolate multi-user.target
```

## Target vs init/RunLevel
* init/RunLevel
  * 默认 RunLevel /etc/inittab
  * 脚本位于 /etc/init.d - 等同于 Unit
  * 启动的脚本 link 到 /etc/rc.d 或 /etc/runlevels/
  * init 配置位于 `/etc/sysconfig` 或 `/etc/rc.conf`
* Target
  * 默认 /etc/systemd/system/default.target
    * link 到 multi-user.target 或 graphical.target
  * Unit 位于 /lib/systemd/system
  * 启动后位于 /etc/systemd/system
  * systemd 配置 /lib/systemd, /etc/systemd

# Example

- [docker systemd](https://github.com/docker/docker/blob/master/contrib/init/systemd/)

**/etc/systemd/system/prometheus-node-exporter.service**

```ini
[Unit]
Description=Prometheus Node Exporter
After=network-online.target

[Service]
# User=prometheus
Restart=on-failure

ExecStart=/opt/prometheus/bin/node_exporter
```

# FAQ
## Why archlinux migrate to systemd

* [Archlinux is moving to systemd](https://bbs.archlinux.org/viewtopic.php?pid=1149530#p1149530) - 2012-08

