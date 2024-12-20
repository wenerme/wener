---
title: ssh config
tags:
  - Configuration
---

## ssh config

- 用户 ~/.ssh/config
- 系统 /etc/ssh/ssh_config
- 参考
  - [ssh_config.5](https://man7.org/linux/man-pages/man5/ssh_config.5.html)

```bash
# 指定配置文件
ssh -F /path/to/configfile
```

- Include
  - 包含其他配置文件 - 支持 glob 和 ~ 展开

```bash
# 网关服务器
Host my-gate
User root
Hostname 1.2.3.4

# 通过 my-gate 链接 1.2.3.100
# busybox 的 nc 没有 -q, 需要
Host my-gate-110
User root
ProxyCommand ssh -q qc-sh-1 nc -q0 1.2.3.100 22
```

- Host/Match 区分段落

```ini title="通配 Host"
# 为匹配的 Host 指定默认 User
Host 10.10.*
    User root
# 可以 排除
Host !10.10.10.*
    User admin

# 设置所有默认参数
Host *
    UseKeychain yes
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_rsa
    User admin
    ExitOnForwardFailure yes

# 直到下一个 Host/Match
Match
```

- Match
  - canonical, final, exec, host, originalhost, user, localuser, all
  - all：始终匹配。在 Match 行上仅写 all，或紧接在 canonical、final 后面写时表示无条件匹配。
	-	canonical：当主机名已被 CanonicalizeHostname 选项处理并规范化（canonicalization）后，再次解析配置文件时此条件为真。这常用于那些只适用于规范化后的主机名的配置规则。
	-	final：请求在配置文件解析结束前再做一次最终解析，并在那次最终解析过程中匹配。若 CanonicalizeHostname 开启，那么 canonical 和 final 会在同一阶段匹配。
	-	exec：执行后续指定的命令，如果该命令返回退出状态码 0 则匹配为真。这可用于动态决策逻辑，如基于脚本结果调整后续配置。
	-	localnetwork：将本地主机的活动网络接口地址与给定的网络列表（CIDR 格式）匹配。如果本地网卡 IP 位于该网段中则为真。这在移动设备在不同网络间切换时很有用，但需要谨慎使用，因为网络地址信息在安全场景中并不一定可靠。
	-	host：根据最终使用的目标主机名匹配，常用的 * 通配符也可使用。
	-	originalhost：根据用户在命令行上输入的原始主机名（尚未规范化的）进行匹配。
	-	tagged：匹配由 Tag 指令设定的标签名或在 ssh 命令行中用 -P 选项指定的标签。
	-	user：匹配目标远程主机上的登录用户名。
	-	localuser：匹配本地执行 ssh 命令的用户。

> 通配 Host 需要放在后面

# FAQ

## Match 本地地址

```bash
# macOS
# grep -v 取反
ifconfig | grep 'inet ' | grep -Fv 127.0.0.1 | awk '{print $2}' | grep -qF 192.168.0.
# Linux
hostname -I | grep -qF 10.10.11.
```

```ssh_config
Match exec "ifconfig | grep 'inet ' | grep -Fv 127.0.0.1 | awk '{print $2}' | grep -vqF 192.168.0"
  # IP is not 192.168.0.*
  Include ~/.ssh/not-at-home
```

**onsubnet**

```bash
#!/usr/bin/env bash

if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]] || [[ "$1" == "" ]]; then
  printf "Usage:\n\tonsubnet [ --not ] partial-ip-address\n\n"
  printf "Example:\n\tonsubnet 10.10.\n\tonsubnet --not 192.168.0.\n\n"
  printf "Note:\n\tThe partial-ip-address must match starting at the first\n"
  printf "\tcharacter of the ip-address, therefore the first example\n"
  printf "\tabove will match 10.10.10.1 but not 110.10.10.1\n"
  exit 0
fi

on=0
off=1
if [[ "$1" == "--not" ]]; then
  shift
  on=1
  off=0
fi

regexp="^$(sed 's/\./\\./g' <<< "$1")"

if [[ "$(uname)" == "Darwin" ]]; then
  ifconfig | grep -F 'inet ' | grep -Fv 127.0.0. | cut -d ' ' -f 2 | grep -Eq "$regexp"
else
  hostname -I | tr -s " " "\012" | grep -Fv 127.0.0. | grep -Eq "$regexp"
fi

if [[ $? == 0 ]]; then
  exit $on
else
  exit $off
fi
```
