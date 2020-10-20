# Account

## Tips
* https://docs.ansible.com/ansible/latest/modules/user_module.html
* https://en.wikipedia.org/wiki/Linux_PAM

```bash
# 密码设置为 ! 或 * 禁止登录
usermod -p '*' admin
# 解锁用户 - 锁定的用户无法登录
passwd -u admin

# 验证密码
su -c true root

# 用户
cut -d: -f1 /etc/passwd
getent passwd
```

/etc/login.defs
UID_MIN          1000
UID_MAX         60000

getent passwd {1000..60000}

shadow
timestamp
chage -l root

adm: Group adm is used for system monitoring tasks. Members of this group can read many log files in /var/log, and can use xconsole. Historically, /var/log was /usr/adm (and later /var/adm), thus the name of the group.


FIRST_USER_NAME=pi

apk add sudo

for GRP in spi i2c gpio; do
	addgroup --system $GRP
done

adduser -s /bin/bash -D $FIRST_USER_NAME

for GRP in adm dialout cdrom audio users video games input gpio spi i2c netdev; do
  adduser $FIRST_USER_NAME $GRP
done

echo "pi:raspberry" | /usr/sbin/chpasswd
echo "pi ALL=NOPASSWD: ALL" >> /etc/sudoers

```
mark:$6$.n.:17736:0:99999:7:::
[--] [----] [---] - [---] ----
|      |      |   |   |   |||+-----------> 9. 保留
|      |      |   |   |   ||+------------> 8. 失效日期
|      |      |   |   |   |+-------------> 7. 不活跃周期
|      |      |   |   |   +--------------> 6. 警告周期
|      |      |   |   +------------------> 5. 最大密码有效期
|      |      |   +----------------------> 4. 最小密码有效期
|      |      +--------------------------> 3. 上次密码修改时间
|      +---------------------------------> 2. 加密后的密码
+----------------------------------------> 1. 用户名
```

$1$ – MD5
$2a$ – Blowfish
$2y$ – Eksblowfish
$5$ – SHA-256
$6$ – SHA-512


chage 修改信息
pwck 检查完整性

/etc/passwd – Contains one line for each user account.
/etc/shadow – Contains the password information in encrypted formatfor the system’s accounts and optional account aging information.
/etc/group – Defines the groups on the system.
/etc/default/useradd – This file contains a value for the default group, if none is specified by the useradd command.
/etc/login.defs – This file defines the site-specific configuration for the shadow password suite stored in /etc/shadow file


useradd Example – Add a new user to secondary group

You need to the useradd command to add new users to existing group (or create a new group and then add user). If group does not exist, create it. The syntax is as follows:
useradd -G {group-name} username

If you do not see any output then you need to add group developers using the groupadd command:
# groupadd developers

Next, add a user called vivek to group developers:
# useradd -G developers vivek

Setup password for user vivek:
# passwd vivek

Ensure that user added properly to group developers:
# id vivek

# useradd -G admins,ftp,www,developers jerry

useradd example – Add a new user to primary group

To add a user tony to group developers use the following command:
# useradd -g developers tony
# id tony

usermod example – Add a existing user to existing group

Add existing user tony to ftp supplementary/secondary group with the usermod command using the -a option ~ i.e. add the user to the supplemental group(s). Use only with -G option:
# usermod -a -G ftp tony

In this example, change tony user’s primary group to www, enter:
# usermod -g www tony

usermod command options summary
Option	Purpose
-a
--append	Add the user to the supplementary group(s). Use only with the -G option.
-g GROUP
--gid GROUP	Use this GROUP as the default group.
-G GRP1,GRP2
--groups GRP1,GRP2	Add the user to GRP1,GRP2 secondary group.
A note about security

If you add or delete user to existing group, you must change the owner of any crontab files or at jobs manually. You must make any changes involving NIS on the NIS server too.

A note about GUI tool

You will probably find the use of the GUI tool easy. KDE user can use KUser tool and the GNOME user can use users-admin tool called system-config-users:
# system-config-users

system-config-users





```bash

```
