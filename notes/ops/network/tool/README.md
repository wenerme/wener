---
id: intro
title: 网络相关工具集
---

# Tools

## iproute2
* Contents [iproute2](https://pkgs.alpinelinux.org/contents?branch=v3.6&name=iproute2&arch=x86_64&repo=main)
* [ss cheatsheet](https://www.cyberciti.biz/tips/linux-investigate-sockets-network-connections.html)
  * Display Linux TCP / UDP Network and Socket Information

## net-tools
* https://sourceforge.net/projects/net-tools/
* 已经比较老了, 不推荐使用

## ethtool
* [ethtool.8](https://linux.die.net/man/8/ethtool)
* query or control network driver and hardware settings

```bash
ethtool eth0
```

```
Settings for eth0:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full
	                        100baseT/Half 100baseT/Full
	                        1000baseT/Full
	Supported pause frame use: No
	Supports auto-negotiation: Yes
	Advertised link modes:  10baseT/Half 10baseT/Full
	                        100baseT/Half 100baseT/Full
	                        1000baseT/Full
	Advertised pause frame use: No
	Advertised auto-negotiation: Yes
	Speed: 100Mb/s
	Duplex: Full
	Port: Twisted Pair
	PHYAD: 1
	Transceiver: internal
	Auto-negotiation: on
	MDI-X: off
	Supports Wake-on: g
	Wake-on: d
	Link detected: yes
```

## aria2c

* https://aria2.github.io/manual/en/html/aria2c.html
* https://github.com/aria2/aria2

```bash
# 使用文件作为下载列表
# 最大并发 16
# 默认继续下载
# 单个服务最多 16 个链接
# 重试次数 0, 忽略 404
aria2c -i list.txt -j 16 -c -x 16 -m 0
```

* http://aria2c.com/
* http://aria2c.com/usage.html
* https://github.com/ziahamza/webui-aria2
* https://github.com/mayswind/AriaNg

```ini
dir=.
continue=true
max-connection-per-server=5
min-split-size=10M

input-file=aria2.session
save-session=aria2.session

enable-rpc=true
rpc-allow-origin-all=true
rpc-listen-all=true
rpc-listen-port=6800

```

```bash
touch aria2.session
aria2c --conf-path=$PWD/aria2.conf
```

### OpenSSL Tunnel
* [openssltunnel](http://www.dest-unreach.org/socat/doc/socat-openssltunnel.html)

```bash
# 生成服务器端签名
FILENAME=server
openssl genrsa -out $FILENAME.key 1024
openssl req -new -key $FILENAME.key -x509 -days 3653 -out $FILENAME.crt -subj "/C=CN/ST=Wener/L=ShangHai/O=None/CN=hello"
cat $FILENAME.key $FILENAME.crt >$FILENAME.pem
chmod 600 $FILENAME.key $FILENAME.pem

# 生成客户端签名
FILENAME=client
openssl genrsa -out $FILENAME.key 1024
openssl req -new -key $FILENAME.key -x509 -days 3653 -out $FILENAME.crt -subj "/C=CN/ST=Wener/L=ShangHai/O=None/CN=hello"
cat $FILENAME.key $FILENAME.crt >$FILENAME.pem
chmod 600 $FILENAME.key $FILENAME.pem

# 启动服务端
socat openssl-listen:4433,reuseaddr,cert=$PWD/server.pem,cafile=$PWD/client.crt echo

# 启动客户端
socat stdio openssl-connect:localhost:4433,cert=$PWD/client.pem,cafile=$PWD/server.crt
# 如果出现异常 2016/12/15 17:49:50 socat[8259] E certificate is valid but its commonName does not match hostname
# 可使用 verify=0 关闭验证
# 或者添加 commonname
socat stdio openssl-connect:localhost:4433,cert=$PWD/client.pem,cafile=$PWD/server.crt,commonname=hello


# 通过 SSL 转发 DNS
# 服务端监听 1053
socat openssl-listen:1053,fork,reuseaddr,cert=$PWD/server.pem,cafile=$PWD/client.crt UDP:8.8.8.8:53
# 客户端连接服务端的 1053
sudo socat UDP-RECVFROM:53,fork,reuseaddr openssl-connect:SERVER:1053,cert=$PWD/client.pem,cafile=$PWD/server.crt
```

## curl

## wget
* [GNU Wget Manual](https://www.gnu.org/software/wget/manual/wget.html)
* `-e robots=off`
  * 忽略 robot.txt
* `-np`/`--no-parent`
  * 不访问上级
* `-N`/`--timestamping`
  * 只访问更新的
* `-nc`/`--no-clobber`
  * 不要下载已存在将被覆盖的文件
* `-q`/`--quiet`
  * 安静模式

短选项 | 长选项 | 说明
------|-------|------
__2.5 下载选项__||
 || `--limit-rate=amount` | 限速
__目录选项__||
`-P`  | `--directory-prefix` | 存储文件到前缀
`-nH` | `--no-host-directories` | 不创建主机前缀目录
`-nd` | `--no-directories` | 不创建递归目录
__2.11 递归下载选项__ ||
`-r` | `--recursive` | 递归, 默认最大深度为 5
`-l depth` | `--level=depth` | 指定最大递归深度
`-m` | `--mirror` | 镜像, 等同于 `-r -N -l inf --no-remove-listing`

```bash
wget -rN --no-parent -e robots=off -P /some/where http://some.site
# 镜像站点
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent http://example.org
wget -mkEpnp http://example.org
```

## httpie
* https://daniel.haxx.se/docs/curl-vs-httpie.html
* https://github.com/jakubroztocil/httpie
* http://curl2httpie.online/
* https://httpie.org/

## kcptun
* https://github.com/xtaci/kcptun
* ssh client <---> kcptun client <---> kcptun server <----> ssh server

```bash
# Alpine
docker run -d --name tmp xtaci/kcptun
docker cp tmp:/bin/client kcptun-client
docker cp tmp:/bin/server kcptun-server
docker rm -f tmp

# App <-> Target Client(9003/tcp) <-> KCP Client <-> KCP Server(9002/udp) <-> Target Server(9001/tcp)
# 目标 9001 监听 9002
./kcptun-server -key $KEY -t "127.0.0.1:9001" -l ":9002" -mode fast2
# 目标 9002 监听 9003
./kcptun-client -key $KEY -r "127.0.0.1:9002" -l ":9003" -mode fast2
```
