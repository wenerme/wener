---
tags:
  - Structure
---

# Filesystem Hierarchy Standard

- [fhs-3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.html)
- [Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
- /usr - Unix System Resources
- /srv - Site-specific data
- /sbin - System binaries

| /           | for                                                                                     |
| ----------- | --------------------------------------------------------------------------------------- |
| /bin        | -> /usr/bin 存放基本命令的可执行文件                                                    |
| /boot       | 存放启动引导程序相关的文件，例如内核、引导加载器配置文件等                              |
| /dev        | 存放设备文件，表示系统中的各种设备                                                      |
| /etc        | 存放系统配置文件和子目录                                                                |
| /home       | 用户主目录，每个用户都有一个以用户名命名的子目录                                        |
| /lib        | 存放基本系统程序和内核模块所需的共享库文件                                              |
| /media      | 挂载点目录，用于挂载可移动媒体设备，如CD-ROM、USB设备等                                 |
| /mnt        | 挂载点目录，通常用于临时挂载文件系统                                                    |
| /opt        | 用于安装附加的应用软件包                                                                |
| /proc       | 虚拟文件系统，存放内核和进程信息                                                        |
| /root       | 超级用户（root）的主目录                                                                |
| /run        | 存放应用程序运行时产生的临时文件和进程信息                                              |
| /sbin       | 存放系统管理员使用的系统命令                                                            |
| /srv        | 存放系统提供的服务相关的数据                                                            |
| /sys        | 虚拟文件系统，存放设备和内核信息                                                        |
| /tmp        | 存放临时文件，系统重新启动后该目录下的文件可能会被删除                                  |
| /usr        | 存放用户程序和数据，包含许多子目录，如bin（用户命令）、lib（库文件）、local（本地软件） |
| /var        | 存放经常变化的数据文件，如日志文件、邮件队列、缓存等                                    |
| /lib32      |
| /lib64      |
| /libx32     |
| /lost+found | ext2/ext3/ext4 文件系统的恢复目录                                                       |

| /     | /usr       | /usr/local       |
| ----- | ---------- | ---------------- |
| /sbin | /usr/sbin  | /usr/local/sbin  |
| /bin  | /usr/bin   | /usr/local/bin   |
| /etc  |            | /usr/local/etc   |
| /lib  | /usr/lib   | /usr/local/lib   |
|       | /usr/share | /usr/local/share |

| dev      | for        | mod         |
| -------- | ---------- | ----------- |
| /dev/ppp | IPsec/L2TP | ppp_generic |

**procfs**

| path           | for |
| -------------- | --- |
| /proc/consoles |

```bash
# skeleton
# /etc/default/useradd
useradd -m -k /etc/skel

# PPP - Point-to-Point Protocol
modprobe ppp_generic
zcat /proc/config.gz | grep PPP
cat /boot/config-virt | grep PPP
```

## FHS

- /boot

---

- /dev - devfs
- /proc - procfs
- /sys - sysfs

---

- /bin
- /lib
- /lib64
- /sbin
- /etc
  - opt/

---

- /home
  - $USER
- /opt
- /usr
  - bin/
  - local/

---

- /media
- /mnt
- /run - tmpfs
- /srv
- /var
  - cache/
  - lib/
  - lock/
  - log/
  - mail/
  - opt/
  - run/ -> /run
  - spool/
    - mail/ -> /var/mail
  - tmp/

## Debian

| from               | to        |
| ------------------ | --------- |
| /dev/.\*           | /run/\*   |
| /dev/shm           | /run/shm  |
| /dev/shm/\*        | /run/\*   |
| /etc/\* - writable | /run/\*   |
| /lib/init/rw       | /run      |
| /var/lock          | /run/lock |
| /var/run           | /run      |
| /tmp               | /run/tmp  |

- https://wiki.debian.org/ReleaseGoals/RunDirectory

## /etc/

- /etc/modules - 需要加载的模块 - `modprobe $MODULE`
- `/etc/modules-load.d/*.conf` - 和 /etc/modules 相同
- `/etc/modprobe.d/*.conf` - 配置 modprobe
  - `blacklist module3`
  - `options module1 param=value`
  - `alias char-major-10-200	tun`
- /etc/resolv.conf
- /etc/hosts
- /etc/hostname
- /etc/network/interfaces
- `/etc/network/if-{pre-up,up,post-up,pre-down,down,post-down}.d/*`
  - ifupdown

## /etc/passwd

```txt title="/etc/passwd"
username:password:UID:GID:GECOS:home_directory:shell
```

- password - x - 密码存储在 /etc/shadow
- GECOS - 用户的描述信息，可以包含用户全名、办公电话等

---

大部分现代 Linux 系统将密码移到 /etc/shadow 文件，以提高安全性。

- /etc/passwd
  - 所有用户可读 - 导致暴力破解问题
- /etc/shadow
  - 只有 root 可读
  - 特定权限进程可以读取
  - 支持更高级的密码算法 - SHA-512, bcrypt
  - 支持更多密码功能
    - 密码过期、锁定账户、警告时间、宽限期、最小密码长度、最大密码长度、密码历史、密码复杂度

## /etc/shadow

```txt title="/etc/shadow"
username:password:last_change:min:max:warn:inactive:expire:reserved
```

- last_change
  - tiemstamp
  - 上次修改密码时间
- min
  - 最小密码更改间隔
  - 0 不限制
  - 单位天
- max
  - 密码有效期
  - 单位天
- warn
  - 密码过期警告时间
  - 单位天
- inactive
  - 密码过期后多久锁定账户
  - -1 不锁定
- expire
  - 时间戳
  - 账户失效日期
  - -1 永不失效

```bash
# 使用加密算法
# NONE DES MD5 SHA256 SHA512 YESCRYPT
echo "username:password" | chpasswd -e -c SHA512
```

## /etc/login.defs

```
USERGROUPS_ENAB yes
```

- USERGROUPS_ENAB
  - 为每个用户创建一个同名的用户组
- ENCRYPT_METHOD
- 参考
  - shadow-utils
  - [login.defs.5](https://man7.org/linux/man-pages/man5/login.defs.5.html)

## /etc/pam.d/

## Special

- `$RECYCLE.BIN` - 回收站
  - `/$SID` - 用户 SID
    - `S-1-5-21-2520661685-4050719181-3436956139-1001`
  - Windows
- `System Volume Information` - 系统还原
  - IndexerVolumeGuid
  - MountPointManagerRemoteDatabase
  - tracking.log
- `RECYCLER` - 回收站
- ## `.Trashes`
- `.fseventsd`
