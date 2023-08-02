---
title: audit
---

# audit

- 参考
  - https://wiki.archlinux.org/index.php/Audit_framework
  - https://serverfault.com/a/336234/190601
    - log command
  - https://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html
  - https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security_guide/sec-configuring_pam_for_auditing
  - [auditd.8](https://man7.org/linux/man-pages/man8/auditd.8.html)
  - [auditctl.8](https://man7.org/linux/man-pages/man8/auditctl.8.html)
  - [audit.rules.7](https://man7.org/linux/man-pages/man7/audit.rules.7.html)
  - [linux-audit/audit-userspace](https://github.com/linux-audit/audit-userspace)
  - [Chapter 7. System Auditing](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/chap-system_auditing)

```bash
apk add audit
service auditd start

ls /usr/share/audit/sample-rules/

auditctl -R /etc/audit/audit.rules # load rules
auditctl -s                        # report status
auditctl -l                        # list rules
auditctl -D                        # flush rules
auditctl -w /var/lib -p w
auditctl -w /etc -p w

# auditctl -w /etc/hosts -p war -k hostswrap
ausearch

sudo tail -f /var/log/audit/audit.log

ausearch -f /etc/passwd
ausearch --message USER_LOGIN --success no --interpret

aureport -x
aureport -x --summary
aureport -t # 时间范围
aureport --start this-week
aureport --start this-week --key --summary
```

# auditd

- /etc/audit/rules.d/audit.rules
- /var/log/audit/audit.log

```bash
# -w file -p permissions -k key_name
auditctl -w /etc/passwd -p wa -k user-modify
# useradd testuser # 会修改 /etc/passwd
cat /var/log/audit/audit.log | grep user-modify

ausearch -i -k user-modify
aureport -x
```

> 以 root 执行的命令

```
-a exit,always -F arch=b64 -F euid=0 -S execve -k root-commands
-a exit,always -F arch=b32 -F euid=0 -S execve -k root-commands
```

> 所有 root 的 syscall

```
-a exit,always -S all -F euid=0 -F perm=awx -k root-commands
```

```bash
ausearch -k root-commands
```

## ausearch

```bash
ausearch -f /var/lib -i
```

## augenrules

```bash
# /etc/audit/rules.d -> /etc/audit/audit.rules
augenrules

augenrules --load
```

| prefix | for                                                                 |
| ------ | ------------------------------------------------------------------- |
| 10     | Kernel and auditctl configuration                                   |
| 20     | Rules that could match general rules but you want a different match |
| 30     | Main rules                                                          |
| 40     | Optional rules                                                      |
| 50     | Server-specific rules                                               |
| 70     | System local rules                                                  |
| 90     | Finalize (immutable)                                                |

## conf

- /etc/audit/audit.rules.stop.pre
- /etc/audit/audit.rules.stop.post
- /etc/audit/audit.rules
- /etc/audit/audit-stop.rules
  - stop 时设置的 rules
- /etc/audit/auditd.conf
- AUDITD_LANG=C
- /etc/audit/rules.d
  - augenrules

```txt title="audit-stop.rules"
# Disable auditing
-e 0

# Delete all rules
-D
```

## rules

**FS**

```
-w path-to-file -p permissions -k keyname
```

- permissions
  - r - read
  - w - write
  - x - execute
  - a - change attr

**syscall**

```
-a action,list -S syscall -F field=value -k keyname
```

- action - always,never
- list/filter - task, exit, user, exclude, filesystem, io_uring
  - kernel rule-matching filter

## log

```
type=SYSCALL msg=audit(1364481363.243:24287): arch=c000003e syscall=2 success=no exit=-13 a0=7fffd19c5592 a1=0 a2=7fffd19c4b50 a3=a items=1 ppid=2686 pid=3538 auid=1000 uid=1000 gid=1000 euid=1000 suid=1000 fsuid=1000 egid=1000 sgid=1000 fsgid=1000 tty=pts0 ses=1 comm="cat" exe="/bin/cat" subj=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 key="sshd_config"
type=CWD msg=audit(1364481363.243:24287):  cwd="/home/shadowman"
type=PATH msg=audit(1364481363.243:24287): item=0 name="/etc/ssh/sshd_config" inode=409248 dev=fd:00 mode=0100600 ouid=0 ogid=0 rdev=00:00 obj=system_u:object_r:etc_t:s0  objtype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0
type=PROCTITLE msg=audit(1364481363.243:24287) : proctitle=636174002F6574632F7373682F737368645F636F6E666967
```

```
type=SYSCALL msg=audit(1687705400.741:250): arch=c000003e syscall=257 success=yes exit=4 a0=ffffff9c a1=7ffe429aec10 a2=a0002 a3=0 items=1 ppid=15931 pid=13750 auid=4294967295 uid=999 gid=999 euid=999 suid=999 fsuid=999 egid=999 sgid=999 fsgid=999 tty=(none) ses=4294967295 comm="postgres" exe="/usr/lib/postgresql/15/bin/postgres" key=(null)ARCH=x86_64 SYSCALL=openat AUID="unset" UID="etcd" GID="ping" EUID="etcd" SUID="etcd" FSUID="etcd" EGID="ping" SGID="ping" FSGID="ping"
type=CWD msg=audit(1687705400.741:250): cwd="/var/lib/postgresql/data/pgdata"
type=PATH msg=audit(1687705400.741:250): item=0 name="/dev/shm/PostgreSQL.845382982" inode=3 dev=00:90 mode=0100600 ouid=999 ogid=999 rdev=00:00 nametype=NORMAL cap_fp=0 cap_fi=0 cap_fe=0 cap_fver=0 cap_frootid=0OUID="etcd" OGID="ping"
type=PROCTITLE msg=audit(1687705400.741:250): proctitle=706F7374677265733A206175746F76616375756D20776F726B657220
```

- `audit(timestamp:ID)` - `1364481363.243:24287`
  - timestamp 和 serial number 相同，同一个事件
- arch=c000003e
  - x86_64
- syscall
  - `/usr/include/asm/unistd_64.h`
  - [syscall](./syscall.md)
- SYSCALL
  - syscall=N,success=yes/no,exit=N
  - aN=参数
  - items=N 之后有多少个 PATH
  - ppid - Parent Process ID
  - pid - Process ID
  - auid - Audit user ID - loginuid
  - uid,gid
  - euid,egid - effective user/group ID
  - suid,sgid - set user/group ID - who started the analyzed process
  - fsuid,fsgid - file system user ID
  - tty
  - ses - session ID
  - comm - 命令
  - exe - 可执行文件完整路径
  - key - 用于标识事件的字符串
  - subj - SELinux
- CWD
  - cwd
- PATH
  - item - Index of items
  - name
  - inode
  - dev
  - mode
  - ouid,ogid
  - rdev - recorded device identifier
  - nametype
  - cap_fp, cap_fi, cap_fe, cap_fver - permitted, inherited, effective bit, version
  - cap_frootid
  - obj - SELinux
- PROCTITLE
  - proctitle - 编码后进程标题

| type      | attr |
| --------- | ---- |
| SYSCALL   |      |
| CWD       |
| PATH      |
| PROCTITLE |

---

- https://access.redhat.com/articles/4409591
- https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-understanding_audit_log_files

### reference

```bash
# AVC Access Vector Cache used by SELinux/Apparmor
# https://serverfault.com/a/954291/190601
auditctl -a never,exclude -F msgtype=AVC
```

```txt title="audit.rules"
# First rule - delete all
-D

# increase the buffers to survive stress events. make this bigger for busy systems.
-b 1024

# monitor unlink() and rmdir() system calls.
-a exit,always -S unlink -S rmdir

# monitor open() system call by Linux UID 1001.
-a exit,always -S open -F loginuid=1001

# monitor write-access and change in file properties (read/write/execute) of the following files.
-w /etc/group -p wa
-w /etc/passwd -p wa
-w /etc/shadow -p wa
-w /etc/sudoers -p wa

# monitor read-access of the following directory.
-w /etc/secret_directory -p r

# lock the audit configuration to prevent any modification of this file.
-e 2
```
