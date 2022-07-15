---
title: mDNS 服务定义
---

# mDNS 服务定义

- `_services._dns-sd._udp`
- Linux avahi
- 参考
  - [rfc6763](https://datatracker.ietf.org/doc/html/rfc6763) DNS-Based Service Discovery
  - [Bonjour Printing Specification](https://developer.apple.com/bonjour/printing-specification/bonjourprinting-1.2.1.pdf)
  - http://www.dns-sd.org/

## macOS

```bash
# 暴露服务
dns-sd -R "My test server with metrics-endpoint" _prometheus-http._tcp. . 9000 path=/metrics
# 扫描
dns-sd -B
# 所有服务
dns-sd -B _services._dns-sd._udp local.
# 查找打印机
dns-sd -B _ipp._tcp local.
# 查看内容里的 adminurl
dns-sd -Z _ipp._tcp local.
# 获取 IP
dns-sd -Gv4v6 LenovoAB66CD.local.

# 域名 zone 格式
# PTR SRV TXT
dns-sd -Z
```

## Linux

```bash
#
apk add avahi avahi-tools
service avahi-daemon start

avahi-browse --all --ignore-local --resolve --terminate
# 只搜索 ssh 且显示 ip
avahi-browse _ssh._tcp -tr
```

## services

| type                   | port       | desc/txt                                                                                                                                                                                                                                                                                                                                 | devices          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `_adisk`               |
| `_afpovertcp._tcp`     | 548        | AFP                                                                                                                                                                                                                                                                                                                                      |
| `_airkan._tcp`         | 6088       | 小米盒子,milink<br/>"mac=" "music_version=1.0" "platform_id=205" "prottext=Airkan Protocol Version 1.5.17" "protver=16777984" "scrnh=720" "scrnw=1280" "photoport=6089"                                                                                                                                                                  |
| `_airplay._tcp`        | 52266/7000 | AirePlay                                                                                                                                                                                                                                                                                                                                 | 小米盒子         |
| `_burn`                |
| `_CGI`                 |
| `_companion-link._tcp` | 49282      | "rpBA=00:00:00:00:00:00" "rpHI=000000000000" "rpAD=000000000000" "rpHA=000000000000" "rpVr=195.2" "rpFl=0x30000" "rpHN=000000000000"                                                                                                                                                                                                     |
| `_device-info._tcp`    | 0          | `model=Xserve`                                                                                                                                                                                                                                                                                                                           |
| `_http._tcp`           | 80         | path=/                                                                                                                                                                                                                                                                                                                                   |
| `_ipp._tcp`            | 631        | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=30" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "rp=printer" "qtotal=1" "txtvers=1"      |
| `_ipps`                |
| `_leboremote._tcp`     | 52266      | "hstv=320.00" "hmd=HappyCast3.2" "etv=1" "atv=0" "htv=1" "vv=2" "appInfo=0" "ver=2.0" "u=" "packagename=com.xiaomi.mitv.smartshare" "lebofeature=223" "feature=223" "channel=LEBO-APK--60013-19516" "mirror=7100" "devicemac=" "lelinkport=52266" "remote=52266" "airplay=52266" "raop=52266" "h=1080" "w=1920" "version=3.2" "port=-1"  |
| `_miio`                |
| `_pdl-datastream._tcp` | 9100       | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=10" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "qtotal=1" "txtvers=1"                   |
| `_pdl-datastream`      |
| `_printer._tcp`        | 515        | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=20" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "rp=filetype_RPS" "qtotal=1" "txtvers=1" |
| `_psia`                |
| `_raop._tcp`           | 52266/7000 | Remote Audio Output Protocol                                                                                                                                                                                                                                                                                                             | 小米盒子,AppleTV |
| `_rc._tcp`             | 6091       |                                                                                                                                                                                                                                                                                                                                          | 小米盒子,milink  |
| `_rfb._tcp`            | 5900       | VNC                                                                                                                                                                                                                                                                                                                                      |
| `_sleep-proxy._udp`    | 49937      | AppleTV                                                                                                                                                                                                                                                                                                                                  |
| `_touch-able._tcp`     | 3689       | AppleTV - iTunes Remote Client                                                                                                                                                                                                                                                                                                           |
| `_rdlink._tcp`         | 49155      | "rpAD=" "rpVr=350.2" "rpBA="                                                                                                                                                                                                                                                                                                             |
| `_appletv-v2._tcp`     |

- raop - Remote Audio Output Protocol
- Service Type
  - `_tcp.local.`
  - `_udp.local.`
- Instance Name
  - `_ssh`

```yaml title="_airplay._tcp"
# AppleTV
["vv=2" "osvers=8.4.4" "srcvers=220.68" "pi=00000000-0000-0000-0000-000000000000" "pk=0000" "model=AppleTV3,1" "flags=0x44" "features=0x5A7FFFF7,0xE" "deviceid=00:00:00:00:00:00"]
---
# 小米盒子
"pk=" "pi=" "rhd=2.1.0.0" "pw=0" "flags=0x4" "model=AppleTV3,1" "vv=2" "srcvers=220.68" "features=0x5A7FFFF7,0x1E" "deviceid="
```

- AppleTV 7000
- 小米盒子 52266

```json title="_sleep-proxy._udp"
["Ver=131077" "atCV=65539" "DvSv=1792" "DvTy=AppleTV" "CtlN=Apple TV" "DbId=0000000000000000" "atSV=65541" "txtvers=1"]
```

```json title="_companion-link._tcp"
["rpVr=260.3" "rpMac=0" "rpHN=000000000000" "rpFl=0x20000" "rpAD=000000000000" "rpBA=00:00:00:00:00:00"]
```

```yaml title="_raop._tcp"
"pk=xxx" "vn=65537" "vs=220.68" "sf=0x4" "txtvers=UDP" "tp=UDP" "sv=false" "ss=16" "sr=44100" "pw=false" "rhd=3.0.0.0" "md=0,1,2" "am=AppleTV3,1" "ft=0x5A7FFFF7,0x1E" "vv=2" "et=0,3,5" "da=true" "cn=1,2,3" "ch=2"
```

```json title="_rc._tcp"
"btmac=" "VC=0" "CP=[118463]" "amac=" "wol=1" "miversion=1.5.16" "operator=0" "apmac=" "rid=-1" "photoport=6089" "serverport=6088" "mac=" "server_address=media.v2.t001.ottcn.com" "scrnh=720" "scrnw=1280" "platform_id=205" "prottext=RC Ver 1.0.1.38" "protver=16777510"
```

### extra

| type                    | port | txt           |
| ----------------------- | ---- | ------------- |
| `_prometheus-http._tcp` | 9100 | path=/metrics |
