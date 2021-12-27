---
tags:
  - 目录结构
---

# Filesystem Hierarchy Standard

- [fhs-3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.html)
- [Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

---

```bash
# skeleton
# /etc/default/useradd
useradd -m -k /etc/skel
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
