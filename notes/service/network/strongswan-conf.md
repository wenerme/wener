# strongSwan 配置
* [ConfigurationFiles](https://wiki.strongswan.org/projects/strongswan/wiki/ConfigurationFiles)

### ipsec.conf
* [IKEv2 Cipher Suites](https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2CipherSuites)

```ini
# 通用配置
config setup
# 可包含外部配置
# include ipsec.*.conf

  cachecrls=no
  # dmn, mgr, ike, chd, job, cfg, knl, net, asn, enc, lib, esp, tls, tnc, imc, imv, pts
  # -1,0,1,2,3,4
  # charondebug=dmn 3, ike 1, net -1
  # IKE charon daemon
  charonstart=yes
  # yes | ifuri | no
  strictcrlpolicy=no
  # yes | no | never | replace | keep
  uniqueids = yes

  # 5.0.0 之前 IKEv1 pluto daemon 有其他配置项目

# 定义连接
# conn <name>
# 默认连接配置
conn %default

# 定义 CA
# ca <name>
# 默认 CA 配置
ca %default
```

__conn__

```ini
# IKEv2 EAP auth 时 AAA 后端标识符
# aaa_identity = <id>

# 与 esp 配置互斥 - 默认 esp
# ah = <cipher suites>

# IKEv1 Aggressive or Main Mode
aggressive=no

# 包含其他 section 配置
# also = <name>

# pubkey | rsasig | ecdsasig | psk | secret | xauthrsasig | xauthpsk | never
authby = pubkey

# ignore | add | route | start
# add - 加载不启动, route - 加载安装 trap 如果匹配 leftsubnet rightsubnet 则启动, start - 加载启动,
auto = ignore

# 远程意外关闭连接时触发动作
# none | clear | hold | restart
closeaction = none

# IPComp 内容压缩 - 在加密前
compress = no

# Dead Peer Detection
# none | clear | hold | restart
# hold - 安装 trap 匹配的时候再重新协商连接
dpdaction = none
dpddelay = 30s
dpdtimeout = 150s

# 不活跃超时后关闭连接
# inactivity = <time>

# %identity - EAP Identity method
# eap_identity = <id>
esp = aes128-sha256

# 强制 udp 封装 esp 包 - 即便没有检测到 NAT
forceencaps = no
# yes | accept | force | no
fragmentation = yes

ike = aes128-sha256-modp3072
ikedscp = 000000
# keying channel 连接 (ISAKMP , IKE SA) 生命周期 - 到期从新协商
ikelifetime = 3h
installpolicy = yes
# ike | ikev1 | ikev2
# ike 发起 ikev2 但也接受 ikev1
keyexchange = ike
# 协商重试次数
keyingtries = 3 # %forever

# lifebytes = <number>
# lifepackets = <number>
lifetime = 1h

# marginbytes = <number>
# marginpackets = <number>
margintime = 9m

# xfrm 连接 mark
# mark = <value>[/<mask>]
# mark_in = <value>[/<mask>]
# mark_our = <value>[/<mask>]

mobike = yes

# push | pull
modeconfig = pull

reauth = yes
rekey = yes
rekeyfuzz = 100%
replay_window = -1

# reqid = <number>
sha256_96 = no
# tfc = <value>

# tunnel | transport | transport_proxy | passthrough | drop
# tunnel - host-to-host, host-to-subnet, subnet-to-subnet
# transport - host-to-host
# transport_proxy - Mobile IPv6 transport proxy
# passthrough - 无 ipsec 处理
type = tunnel

# client | server
xauth = client
# xauth_identity = <id>
```

__left|right__

* 默认 left 为本地

```ini
# <ip address> | <fqdn> | %any | %any4 | %any6 | range | subnet
# %any - 协商时自动填充
# %defaultroute - 5.0 之前的 %any
# % 前缀隐含 rightallowany=yes
right=%any
rightallowany=no

# rightauth = <auth method>
# rightauth2 = <auth method>
# rightca = <issuer dn> | %same
# rightca2 = <issuer dn> | %same
# rightcert = <path>
# rightcert2 = <path>
# rightcertpolicy = <OIDs>
# rightdns = <servers>
rightfirewall = no
# rightgroups = <group list>
# rightgroups2 = <group list>
righthostaccess = no
# rightid = <id>
# rightid2 = <id>
rightikeport = <port>
rightprotoport = <protocol>/<port>
rightrsasigkey = <raw rsa public key> | <path to public key>
rightsigkey = <raw public key> | <path to public key>
# never | no | ifasked | always | yes
rightsendcert = ifasked

# 虚拟 IP
# 5.0.1 之后支持 逗号 分割多个值 - 多个 IP
# %config, %cfg, %modeconfig, %modecfg
# leftsourceip = %config4 | %config6 | <ip address>

# rightsourceip = %config | <network>/<netmask> | <from>-<to> | %poolname

# 默认 left/32|128
# 限定协议和端口 - 10.0.0.1[tcp/http],fec1::1[udp],10.0.0.0/16[/53]
# 5.1.0 - 忽略的值可使用 %any - fec1::1[udp/%any],10.0.0.0/16[%any/53]
# %opaque RFC 4301 OPAQUE 协议选择
# %dynamic 等同于忽略该配置
# rightsubnet = <ip subnet>[[<proto/port>]][,...]
# 脚本目录
# rightupdown = <path>

# Mediation Extension
mediation = no
# mediated_by = <name>
# me_peerid = <id>
```

# FAQ
## 自动重连

```ini
# 如果没用到 virtual ip
auto=route

# vip - 重建 SAs
dpdaction=restart
closeaction=restart
keyingtries=%forever
auto=start
```

> 参考 https://serverfault.com/a/970035/190601
