---
title: ACL
---

# ACL

- subject
  - owner - u
  - group - g
  - other - o
  - all - a
- perm
  - read - r
  - write - w
  - execute - x
  - sticky - t - 1
    - 限定 owner 才能操作
  - setgid,setuid - s - 2,4
    - https://en.wikipedia.org/wiki/Setuid
    - exec 时使用文件的 owner 和 group
    - 例如 /usr/bin/passwd 要修改 /etc/passwd
- 2755
  - 1 - sticky bit
  - 2 - setgid
  - 4 - setuid

```bash
stat -c '%A %a %n' *

mkdir dir
chmod 0755 dir
chmod 00755 dir # 会移除 flag - sgid, suid

stat -c "%a %U:%G %n"  dir
stat -c "%U:%G %n" dir
```

---

- 参考
  - [chmod.2](https://www.man7.org/linux/man-pages/man2/chmod.2.html)
  - [chmod.1](https://www.man7.org/linux/man-pages/man1/chmod.1.html)
  - https://superkogito.github.io/blog/2020/10/25/chmod_modes.html

## acl fix

```bash
find . -type d -a -not -perm 0755 -exec chmod 0755 {} \;
find . -type f -a -not -perm 0644 -exec chmod 0644 {} \;

# 修改用户
# 目录 root -> admin
sudo find . -type d -user root -exec chown admin {} \;
# 找到非 admin
sudo find . -not -user admin -exec chown admin {} \;
```
