---
id: mdns-service
title: mDNS 服务定义
---

# mDNS 服务定义
## Tips
- 参考
  - [Bonjour Printing Specification](https://developer.apple.com/bonjour/printing-specification/bonjourprinting-1.2.1.pdf)

## services

| type                   | port  | desc/txt                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_http._tcp`           | 80    | path=/                                                                                                                                                                                                                                                                                                                                   |
| `_ipp._tcp`            | 631   | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=30" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "rp=printer" "qtotal=1" "txtvers=1"      |
| `_printer._tcp`        | 515   | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=20" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "rp=filetype_RPS" "qtotal=1" "txtvers=1" |
| `_pdl-datastream._tcp` | 9100  | "TBCP=T" "Transparent=F" "Binary=T" "Punch=F" "Staple=F" "Sort=T" "PaperCustom=F" "Duplex=T" "Copies=T" "Collate=T" "Color=T" "Bind=T" "adminurl=http://RNP00.local/" "priority=10" "PaperMax=legal-A4" "note=" "ty=RICOH MP C2011" "product=(RICOH MP C2011 PS3)" "pdl=application/postscript" "qtotal=1" "txtvers=1"                   |
| `_rfb._tcp`            | 5900  | VNC                                                                                                                                                                                                                                                                                                                                      |
| `_raop._tcp`           | 52266 | 小米盒子<br/>"pk=xxx" "vn=65537" "vs=220.68" "sf=0x4" "txtvers=UDP" "tp=UDP" "sv=false" "ss=16" "sr=44100" "pw=false" "rhd=3.0.0.0" "md=0,1,2" "am=AppleTV3,1" "ft=0x5A7FFFF7,0x1E" "vv=2" "et=0,3,5" "da=true" "cn=1,2,3" "ch=2"                                                                                                        |
| `_airplay._tcp`        | 52266 | AirePlay,小米盒子<br/>"pk=" "pi=" "rhd=2.1.0.0" "pw=0" "flags=0x4" "model=AppleTV3,1" "vv=2" "srcvers=220.68" "features=0x5A7FFFF7,0x1E" "deviceid="                                                                                                                                                                                     |
| `_rc._tcp`             | 6091  | 小米盒子,milink<br/>"btmac=" "VC=0" "CP=[118463]" "amac=" "wol=1" "miversion=1.5.16" "operator=0" "apmac=" "rid=-1" "photoport=6089" "serverport=6088" "mac=" "server_address=media.v2.t001.ottcn.com" "scrnh=720" "scrnw=1280" "platform_id=205" "prottext=RC Ver 1.0.1.38" "protver=16777510"                                          |
| `_airkan._tcp`         | 6088  | 小米盒子,milink<br/>"mac=" "music_version=1.0" "platform_id=205" "prottext=Airkan Protocol Version 1.5.17" "protver=16777984" "scrnh=720" "scrnw=1280" "photoport=6089"                                                                                                                                                                  |
| `_afpovertcp._tcp`     | 548   | AFP                                                                                                                                                                                                                                                                                                                                      |
| `_companion-link._tcp` | 49282 | "rpBA=00:00:00:00:00:00" "rpHI=000000000000" "rpAD=000000000000" "rpHA=000000000000" "rpVr=195.2" "rpFl=0x30000" "rpHN=000000000000"                                                                                                                                                                                                     |
| `_leboremote._tcp`     | 52266 | "hstv=320.00" "hmd=HappyCast3.2" "etv=1" "atv=0" "htv=1" "vv=2" "appInfo=0" "ver=2.0" "u=" "packagename=com.xiaomi.mitv.smartshare" "lebofeature=223" "feature=223" "channel=LEBO-APK--60013-19516" "mirror=7100" "devicemac=" "lelinkport=52266" "remote=52266" "airplay=52266" "raop=52266" "h=1080" "w=1920" "version=3.2" "port=-1"  |
| `_device-info._tcp`    | 0     | `model=Xserve`                                                                                                                                                                                                                                                                                                                           |

### extra

| type                    | port | txt           |
| ----------------------- | ---- | ------------- |
| `_prometheus-http._tcp` | 9100 | path=/metrics |
