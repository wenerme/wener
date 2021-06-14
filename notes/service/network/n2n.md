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

## NOTES

- 多个 supernode 可组联邦 - community=\*Federation
  - 实现备份、容灾和负载均衡 - 避免 DDoS
  - edge 可以连一个或多个
  - 名字可 `-F` 指定，默认 `*Federation`
- 2.9 实现 [认证](https://github.com/ntop/n2n/blob/dev/doc/Authentication.md) - 之前使用 MAC
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

## 加密

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
