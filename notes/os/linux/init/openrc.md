---
title: OpenRC
---

# OpenRC

- [OpenRC](https://github.com/OpenRC/openrc) 是什么？
  - BSD-2, C, Shell
  - 跨平台轻量级 init 系统
    - 支持 Linux, FreeBSD, NetBSD
    - 核心 900k
  - 脚本结构上类似于 sysvinit - 但更简单
  - 支持 supervise-daemon 0.21+
  - 支持 /sbin/init - 0.25+

## /etc/inittab

```ini
::sysinit:/sbin/openrc sysinit
::sysinit:/sbin/openrc boot
::wait:/sbin/openrc default

# Set up a couple of getty's
tty1::respawn:/sbin/getty 38400 tty1
tty2::respawn:/sbin/getty 38400 tty2
tty3::respawn:/sbin/getty 38400 tty3
tty4::respawn:/sbin/getty 38400 tty4
tty5::respawn:/sbin/getty 38400 tty5
tty6::respawn:/sbin/getty 38400 tty6

# Put a getty on the serial port
#ttyS0::respawn:/sbin/getty -L ttyS0 115200 vt100

# Stuff to do for the 3-finger salute
::ctrlaltdel:/sbin/reboot

# Stuff to do before rebooting
::shutdown:/sbin/openrc shutdown
```

## service

```sh
#!/sbin/openrc-run

command="/usr/sbin/ntpd"
pidfile="/run/${RC_SVCNAME}.pid"
command_args="-p ${pidfile}"

command_args_background="--daemon"
# start-stop-daemon --make-pidfile
command_background=true

command_user="user:group"
# ^cap_chown,!cap_setpcap
capabilities="cap-list"
procname="cancd"

# 定义依赖
depend() {
  need net
  use dns logger netmount
  want coolservice
  # provide
}

extra_started_commands="reload"

extra_commands="checkconfig"
checkconfig() {
  #
}

reload() {
  checkconfig || return $?
  ebegin "Reloading ${RC_SVCNAME}"
  start-stop-daemon --signal HUP --pidfile "${pidfile}"
  eend $?
}

# 启动停止检查配置
start_pre() {
  if [ "${RC_CMD}" != "restart" ]; then
    checkconfig || return $?
  fi
}

stop_pre() {
  if [ "${RC_CMD}" = "restart" ]; then
    checkconfig || return $?
  fi
}
```

- RC_SVCNAME
- 主要函数
  - start
  - stop
  - status
- depend
  - need - 强制依赖
  - use - soft dependency - 如果在相同 runlevel 则 start，已经 start 不关心
  - want - 尝试 start，不关心 runlevel，已经 start 不关心
  - before - 在给定服务之前启动
  - after - 在给定服务之后启动
  - provide - 提供服务 - 类似别名或相同服务
  - keyword
  - 依赖
    - 影响服务起停
    - 例如: 重启 服务 -> 会先停止 **依赖**，重启服务，然后再启动 **依赖**
  - 依赖服务 - 会 start 依赖服务
  - 被服务依赖 - 会 stop & start 依赖服务
- https://github.com/OpenRC/openrc/blob/master/service-script-guide.md

## supervise-daemon

| flag                              | for       |
| --------------------------------- | --------- |
| -u, --user `user[:group]`         |
| -D, --respawn-delay _seconds_     | 0         |
| -m, --respawn-max _count_         | 10        |
| -P, --respawn-period _seconds_    |
| -R, --retry `[signal/]timeout`    | SIGTERM/5 |
| -d, --chdir _path_                |
| -r, --chroot _path_               |
| -, --signal _signal_              |
| -g, --group _group_               |
| -k, --umask _mode_                |
| -p, --pidfile _supervisorpidfile_ |
| -1, --stdout _logfile_            |
| -2, --stderr _logfile_            |

- -K, --stop
- -s, --signal
- RC_SVCNAME
- https://wiki.gentoo.org/wiki/OpenRC/supervise-daemon
- https://github.com/OpenRC/openrc/blob/master/supervise-daemon-guide.md
- https://manpages.debian.org/testing/openrc/supervise-daemon.8.en.html

# FAQ

## failed to add service `sysfs` to `runlevel` boot': No such file or directory

```bash
for svc in $BOOT_SERVICES; do ln -fs /etc/init.d/$svc /etc/runlevels/boot; done
```

## is the name of a real and virtual service

- virtual service
  - 是 openrc 中 provide 后面的内容
- real service
  - 是 /etc/init.d 下名字

provide 的名字和实际服务名字冲突

## restart

```bash
# 默认 0
respawn_delay=5
# 默认 10
respawn_max=0
```

或

```bash
# 默认 SIGTERM/5
retry="${TINC_RETRY:-TERM/60/KILL/10}"
```

##  supervise-daemon: unable to open the logfile for stdout `/var/log/app.log': Permission denied
