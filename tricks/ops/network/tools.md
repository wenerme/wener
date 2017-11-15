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

## ngrep

[ngrep usage](http://ngrep.sourceforge.net/usage.html)

```
ngrep -q -d eth1 -W byline host stackoverflow.com and port 80
       ^  ^       ^         ^        
       |  |       |         |
       |  |       |         |
       |  |       |         v
       |  |       |         filter expression
       |  |       |         
       |  |       +-->  -W  is set the dump format ("normal", "byline", "single", "none")
       |  |
       |  +---------->  -d  is use specified device instead of the pcap default
       |
       +------------->  -q  is be quiet ("don't print packet reception hash marks")
```


## socat

* [man page](http://www.dest-unreach.org/socat/doc/socat.html)

```bash
# 转发本地的 8080 到 百度
# -d 用于打开日志
socat -d -d -d -d TCP-LISTEN:8080,fork TCP:baidu.com:80

# 测试
curl -H 'Host: baidu.com' 127.0.0.1:8080

# 转发本地 1053 到阿里公网 dns
socat TCP-LISTEN:1053,fork,reuseaddr TCP:223.5.5.5:53
socat UDP-RECVFROM:1053,fork,reuseaddr UDP:223.5.5.5:53

# 测试
dig -p 1053 baidu.com @127.0.0.1

# 转发本地到谷歌 DNS
socat TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53
socat UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53

# 常用命令
# 避免后面 SUDO 要求密码
sudo ls
sudo `which socat` TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53 > socat.tcp.53.log &
sudo `which socat` UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53 > socat.udp.53.log &

# 但 "防火墙" 会检测出来,一会儿转发的 DNS 就不能用了
```

* http://www.dest-unreach.org/socat/doc/socat-openssltunnel.html
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
* `-e robots=off`
  * 忽略 robot.txt

```bash
wget -rN --no-parent -e robots=off -P /some/where http://some.site
```

## httpie
* https://daniel.haxx.se/docs/curl-vs-httpie.html
* https://github.com/jakubroztocil/httpie
* http://curl2httpie.online/
* https://httpie.org/

