---
title: Linux PAM
---

# Linux PAM

- [linux-pam/linux-pam](https://github.com/linux-pam/linux-pam)
- https://pkgs.alpinelinux.org/contents?file=&path=&name=linux-pam&branch=edge&arch=x86_64

## pam.conf

- `/etc/pam.d/<service>`
  - `type control module-path module-arguments`
- service
  - su
  - login
  - `other` - 默认
- type
  - account
  - auth
  - password
  - session
- control
  - required
  - requisite
  - sufficient
  - optional
  - include
  - substack
  - `value1=action1 value2=action2`
- module-path
  - 完整或相对
  - `/lib/security/`, `/lib64/security/`

```txt title="/etc/pam.d/su"
# basic PAM configuration for Alpine.
auth            sufficient      pam_rootok.so
auth            include         base-auth
account         include         base-account
password        include         base-password
session         include         base-session-noninteractive
```

- https://man7.org/linux/man-pages/man5/pam.conf.5.html

## pam.d

- base-account
  ```
  account		required	pam_unix.so
  ```
- base-auth

  ```
  auth	required	pam_env.so
  auth	required	pam_unix.so	nullok_secure
  auth	required	pam_nologin.so	successok

  auth	sufficient	pam_unix.so	nullok try_first_pass

  account	required	pam_nologin.so
  account	sufficient	pam_unix.so

  password	sufficient	pam_unix.so	nullok sha512 shadow try_first_pass use_authtok

  -session	optional	pam_loginuid.so
  -session	optional	pam_elogind.so
  session	sufficient	pam_unix.so
  ```

- base-password
  ```
  password	required	pam_unix.so	nullok md5 sha512
  ```
- base-session
  ```
  session		include		base-session-noninteractive
  session		required	pam_motd.so
  -session	optional	pam_elogind.so
  ```
- base-session-noninteractive
  ```
  session		required	pam_limits.so
  session		required	pam_unix.so
  ```
- chpasswd
- groupadd
- groupdel
- groupmems
- groupmod
- newusers
- other
- polkit-1
- su
- system-local-login
- system-login
- useradd
- userdel
- usermod

## modules

- pam_access.so
- pam_cgfs.so
- pam_debug.so
- pam_deny.so
- pam_echo.so
- pam_env.so
- pam_exec.so
- pam_faildelay.so
- pam_faillock.so
- pam_filter.so
- pam_ftp.so
- pam_group.so
- pam_issue.so
- pam_keyinit.so
- pam_limits.so
- pam_listfile.so
- pam_localuser.so
- pam_loginuid.so
- pam_mail.so
- pam_mkhomedir.so
- pam_motd.so
- pam_namespace.so
- pam_nologin.so
- pam_permit.so
- pam_pwhistory.so
- pam_rootok.so
- pam_securetty.so
- pam_setquota.so
- pam_shells.so
- pam_stress.so
- pam_succeed_if.so
- pam_time.so
- pam_timestamp.so
- pam_umask.so
- pam_unix.so
- pam_usertype.so
- pam_warn.so
- pam_wheel.so
- pam_xauth.so
