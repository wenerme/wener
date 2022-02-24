---
title: n2n
---

# n2n

- [ntop/n2n](https://github.com/ntop/n2n) 是什么?
- 中心节点 - supernode
- 单线程
- 参考
  - [supernode.ml](http://www.supernode.ml)
    - supernode 列表
  - [lucktu/n2n](https://github.com/lucktu/n2n)
    - 预编译
- supernode
  - 7654/udp - 主要
  - 7654/tcp - 辅助
  - 5645/udp - 管理
- edge
  - 5644/udp - 管理

:::caution

- bridge 支持有点问题
- 没有可用的 ios 应用 - [ntop/n2n#381](https://github.com/ntop/n2n/issues/381)

:::

```bash
# macOS
brew install --cash tuntap
brew install openssl cmake

# Make
./autogen.sh
# CFLAGS 可启用本地指令优化
./configure CFLAGS="-O3 -march=native"
make

# CMake
mkdir -p build && cd build
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl ../
make
# 不想安装可直接使用 - 会安装到 /usr/local/sbin
# make install

./edge --help

# -r -a dhcp:0.0.0.0
N2N_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)
sudo N2N_KEY=$N2N_KEY edge  -c community -l 127.0.0.1:7654 -f -a 10.20.1.1

# supernode mgmt
nc -u 127.0.0.1 5645
# edge mgmt
nc -u 127.0.0.1 5644
```

## 选项

**edge 3.0**

```
edge <config file>
edge  -c <community name> -l <supernode host:port>
```

| flag                     | defaul         |
| ------------------------ | -------------- | ------------------------------------------------------------- |
| -c COMMUNITY             | $N2N_COMMUNITY |
| -k KEY                   | $N2N_KEY       | encryption key                                                |
| -J PASSWORD              | $N2N_PASSWORD  |
| -l HOST:PORT             |                | supernode                                                     |
| ` -p [<ip>:]<port>`      | any            | 绑定的本地地址和端口                                          |
| -T TOS                   |                | 包 TOS                                                        |
| -D                       |                | PMTU discovery                                                |
| -e IP                    | auto           | 广播的本地地址                                                |
| -S1                      |                | 总使用 supernode UDP                                          |
| -S2                      |                | 总使用 supernode TCP                                          |
| -i REG_INTERVAL          | 20             | 注册间隔，用于 NAT                                            |
| -L REG_TTL               | 0              |
| -H                       |                | 头加密 - 要求 supernode 配置固定 community                    |
| -z,z1,z2                 |                | 包压缩 - -z1, -z = lzo1x                                      |
| --select-rtt             |                | 基于 rtt 选择 supernode - 默认基于负载                        |
| `-a [mode]<ip>[/n]`      |                | CIDR 默认 /24',mode=static,dhcp<br/>DHCP `-r -a dhcp:0.0.0.0` |
| -m MAD                   |                | 默认随机                                                      |
| -d DEVICE                |                | TAP 设备名字                                                  |
| -M MTU                   | 1290           |
| -r                       |                | packet forwarding                                             |
| -E                       |                | accept multicast MAC addresses                                |
| -I DESCRIPTION           |                | edge 描述 - 用于管理识别                                      |
| -P public_key            |                | federation public key for user-password authentication        |
| -R RULE                  |                | 自定义规则                                                    |
| -f                       |                |
| -t PORT                  | 5644           |
| --management_password PW | n2n            |
| -n CIDW:GW               |                | 路由规则                                                      |

**edge 2.8**

| flag              | param        | desc                                                      |
| ----------------- | ------------ | --------------------------------------------------------- |
| -d                | tun device   | tun 设备名字 - 否则就是 tun0 这样的名字                   |
| -a                | mode:address | 地址 - DHCP 可使用 '-r -a dhcp:0.0.0.0'                   |
| -c                | community    | community 名字                                            |
| -k                | encrypt key  | N2N_KEY                                                   |
| -s                | netmask      | 掩码 - 255.255.255.0 格式                                 |
| -l,supernode-list | host:port    | Supernode 地址:端口                                       |
| -i                | reg_interval | 注册间隔，用于 NAT 穿透 - 默认 20 秒                      |
| -L                | reg_ttl      | NAT 穿透 时 UDP 注册的 TTL - 默认 0 未设置                |
| -p                | local port   | 本地固定 UDP 端口                                         |
| -u                | UID          | 运行 UID                                                  |
| -g                | GID          | 运行 GID                                                  |
| -f                |              | 前台运行                                                  |
| -m                | MAC address  | 固定 mac 地址                                             |
| -M                | mtu          | 接口 MTU - 默认 1290                                      |
| -D                |              | 启用 PMTU 发现 - 支持场景可减少分包，不支持可能导致包延时 |
| -r                |              | 启用包转发                                                |
| -H                |              | 头加密 - 要求 supernode 配置固定 community                |
| -z,z1,z2          |              | 包压缩 - -z1 or -z = lzo1x (default=disabled).            |
| -E                |              | 支持多播 MAC - 默认丢弃                                   |
| -S                |              | 不尝试 P2P - 通过 supernode 中转                          |
| -T                | tos          | TOS for packets - 例如 SSH 为 0x48                        |
| -n                | cidr:gateway | 路由给定网络 - 可使用 0.0.0.0/0 路由默认网络              |
| -v                |              | 详细日志 - 可多次指定                                     |
| -t                | port         | 管理 UDP 端口                                             |

### 加密

- n2n 内建算法 - 也可以编译的时候 link openssl
- 通过 `-k $KEY` 或者 N2N_KEY 提供密钥
- 默认 -A3/AES
- -A1 为不加密，不提供 `-k` 时的默认

| Flag |  Cipher  | Mode | Block Size |     Key Size      | IV length | Speed | Built-In | Origin                                    |
| :--: | :------: | :--: | :--------: | :---------------: | :-------: | :---: | -------- | ----------------------------------------- |
| -A2  | Twofish  | CTS  |  128 bits  |      256 bit      |  128 bit  | -..O  | Y        | Bruce Schneier                            |
| -A3  |   AES    | CTS  |  128 bits  | 128, 192, 256 bit |  128 bit  | O..+  | Y        | Joan Daemen, Vincent Rijmen, NSA-approved |
| -A4  | ChaCha20 | CTR  |   Stream   |      256 bit      |  128 bit  | +..++ | Y        | Daniel J. Bernstein                       |
| -A5  |  SPECK   | CTR  |   Stream   |      256 bit      |  128 bit  |  ++   | Y        | NSA                                       |

## NOTES

- 多个 supernode 可组联邦 - community=\*Federation
  - 实现备份、容灾和负载均衡 - 避免 DDoS
  - edge 可以连一个或多个
  - 名字可 `-F` 指定，默认 `*Federation`
- 3.0 实现 [认证](https://github.com/ntop/n2n/blob/dev/doc/Authentication.md) - 之前使用 MAC
  - 支持基于 edge 提供的标识信息
  - 支持 user/password 模式
    - 使用 n2n-keygen 生成
    - sn 在 community.list 中添加生成的信息
  - `edge -I ${USERNAME} -J ${PASSWORD} -A5/-A4 -k ${N2N_KEY} -P ${SN_PUB_KEY}`
  - 需要用到 头 加密
- community
  - 19 byte - 不允许包含 `.*+?[]\`
  - 支持正则匹配 - 例如 `net[0-9]` 或者 `net\d`
  - 默认 **明文传输** - 除非开启 头 加密
  - 开启 头 加密后名字不能使用正则 - 只能是固定名字
    - 可以使用 `.*` 来允许任意
  - 可被认为是简单的密码 - 只有知道 community 才能加入网络

## supernode

| opt                      | default                      |
| ------------------------ | ---------------------------- | ----------------------------------------- |
| -p PORT                  | 7654                         | UDP, 本地端口                             |
| -F FEDERATION            | `*Federation`                | 联邦名字                                  |
| -l HOST:PORT             |                              | 已知的 supernode 名字或地址               |
| -M                       |                              | 禁用 MAC 和 IP 欺骗保护未授权 communities |
| -V VERSION               |                              | 发送给 edge 的版本信息 - 最长 19          |
| -c PATH                  |                              | 允许的 communities                        |
| -a                       | 10.128.255.0-10.255.255.0/24 | 子网                                      |
| -t                       | 5645                         | UDP, 管理端口                             |
| --management_password PW | n2n                          | 管理密码                                  |

# FAQ

## Supernode not responding, now trying

在重试两次后就停止了，可以尝试重启进行再次连接。
