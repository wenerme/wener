---
title: Tor
---

# Tor

- DNSPort 9053
- SocksPort 9050
- ControlPort 9051
- ORPort 9001
  - Onion Router Port
  - 与其他 Tor 节点通信
  - Tor Relay
  - Tor Exit Node
- DirPort 9030
  - 发布和获取 Tor 网络目录信息
  - 网络拓扑结构信息，如中继节点列表、状态信息等

```bash
apk add tor
cat /etc/tor/torrc

tor -f /etc/tor/torrc --RunAsDaemon 0

service tor start

# 代理测试 注意 IsTor
# {"IsTor":true,"IP":"185.227.1.1"}
curl -x socks5h://127.0.0.1:9050 https://check.torproject.org/api/ip
curl 4.icanhazip.com
```

```txt title='torrc'
HardwareAccel 1
Log notice stdout
DNSPort 127.0.0.1:9053
SocksPort 127.0.0.1:9050
DataDirectory /var/lib/tor
```

**关闭出口**

```txt
ORPort 0
DirPort 0
ExitPolicy reject *:*
```

- HiddenServicePort
  - redirect traffic to a specific port on your machine
- /etc/tor/torrc
- `/etc/torrc.d/*.conf`

## onion links

- Ahmia http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/
  - 搜索
- Haystak http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion/
- DDG https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion/
- The Hidden Wiki
  - http://zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion/wiki/
  - http://6nhmgdpnyoljh5uzr5kwlatx2u3diou4ldeommfxjz3wkhalzgjqxzqd.onion/
- Tor Links http://torlinksge6enmcyyuxjpjkoouw4oorgdgeo7ftnq3zodj7g2zxi3kyd.onion/
- MegaTor http://crqkllx7afomrokwx6f2sjcnl2do2i3i77hjjb4eqetlgq3cths3o6ad.onion/
- https://www.reddit.com/r/onions/
- Torch http://xmh57jrknzkhv6y3ls3ubitzfqnkrwxhopf5aygthi7d6rplyvk3noyd.onion/
- ProPublica http://p53lf57qovyuvwsc6xnrppyply3vtqm7l6pcobkmyqsiofyeznfu5uqd.onion/
- Archive Today http://archiveiya74codqgiix​o33q62qlrqtkgmcitqx5​u2oeqnmn5bpcbiyd.onion/
- The New York Times https://www.nytimesn7cgmftshazwhfgzm37qxb44r64ytbb2dj3x62d2lljsciiyd.onion/
- BBC https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/
- Facebook https://www.facebookwkhpilnemxj7asaniu7vnjjbiltxjqhye3mhbshg7kx5tfyd.onion/
- CIA http://ciadotgov4sjwlzihbbgxnqg3xiyrg7so2r2o3lt5wz5ypk4sxyjstad.onion
- Wasabi Wallet http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion
- ProtonMail https://protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion/
- Riseup http://vww6ybal4bd7szmgncyruucpgfkqahzddi37ktceo3ah7ngmcopnpyyd.onion
- Keybase http://keybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion/
- ZeroBin http://zerobinftagjpeeebbvyzjcqyjpmjvynj5qlexwyxe7l3vqejxnqv5qd.onion/
- SecureDrop http://sdolvtfhatvsysc6l34d65ymdwxcujausv7k5jk4cy5ttzhjoi6fzvyd.onion/
- Impreza Hosting https://imprezareshna326gqgmbdzwmnad2wnjmeowh45bs2buxarh5qummjad.onion/
- Just Another Library http://libraryfyuybp7oyidyya3ah5xvwgyx6weauoini7zyz555litmmumad.onion/
- Comic Book Library http://nv3x2jozywh63fkohn5mwp2d73vasusjixn3im3ueof52fmbjsigw6ad.onion/
- TGX http://galaxy3yrfbwlwo72q3v2wlyjinqr2vejgpkxb22ll5pcpuaxlnqjiid.onion/

---

- https://gist.github.com/0x00009b/8cf0c2b0e147dc0c1114fb32b5d2d7a3
- https://en.wikipedia.org/wiki/List_of_Tor_onion_services
- https://darkweblinks.com/
