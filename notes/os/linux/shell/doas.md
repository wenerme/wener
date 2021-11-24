---
title: doas
---

# doas

- [doas](https://github.com/openbsd/src/tree/master/usr.bin/doas)
  - 95% of the features of sudo with a fraction of the codebase
  - 约 1000 loc - sudo 约 18k loc
- /etc/doas.conf
- [doas.1](https://man.openbsd.org/doas)
- [doas.conf.5](https://man.openbsd.org/doas.conf.5)

```bash
# run as wener
doas -u wener whoami
# -s shell -> sudo su
doas -s
```

| option      | mean                                |
| ----------- | ----------------------------------- |
| -a _style_  | auth style in /etc/login.conf       |
| -C _config_ | check dose.conf                     |
| -L          | clear persisted auth                |
| -n          | non interactive mode - 要求 nopass  |
| -s          | exec $SHELL or shell in /etc/passwd |
| -u _user_   | as _user_ - 默认 root               |

## doas.conf

```pre title="配置语法"
permit|deny [options] identity [as target] [cmd command [args ...]]
```

- permit|deny
- options
  - nopass - 不需要输入密码
  - nolog - 不记录成功执行的命令到 syslogd
  - persist - 记录密码授权一段时间 - 类似 macOS 体验
  - keepenv - 保留环境变量
    - 默认环境变量 HOME, LOGNAME, PATH, SHELL, USER, DOAS_USER, DISPLAY TERM
  - `setenv { [variable ...] [variable=value ...] }` - 设置环境变量
    - 前缀 `-` 可移除
    - 值可用 `$` 引用别的环境变量
- identity - 用户名、分组 `:group`、ID
- as target
- cmd command - 限定执行命令
- args `[argument ...]` - 限定参数

```pre title="doas.conf"
permit admin as root

permit nopass wener as root cmd apk args upgrade

permit nopass setenv { -http_proxy APT_CONFIG=/etc/apt/apt.conf.d/50appstream } :updaters cmd apt args update

# group :wheel
permit nopass keepenv :wheel
```
