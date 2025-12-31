---
title: NordVPN
tags:
  - Platform
  - Provider
  - NordVPN
---

# NordVPN

- [API/files/zip](https://nordvpn.com/api/files/zip)
- [How to setup NordVPN on macOS/OpenVPN](https://china-with-nord.org/tutorials/x-mac-os-x/openvpn/)

- [简书: NordVPN](https://www.jianshu.com/p/7a99876c8f27)
- [ovpn_tblk.zip](https://downloads.china-with-nord.org/configs/archives/servers/ovpn_tblk.zip)
- [XX-net/XX-Net#7067](https://github.com/XX-net/XX-Net/issues/7067)

```bash
grep 'remote ' ovpn/*tcp* | grep -E "$(fping $(sed -rn 's/remote ([0-9.]+).*/\1/p' ovpn/jp*) | sed -rn 's/ is alive//p' | paste -sd '|' -)"

sed -r 's/remote ([0-9.]+).*/\1/p' ovpn/us*tcp* -n | sort -u

# alive
fping $(sed -r 's/remote ([0-9.]+).*/\1/p' ovpn/us*tcp* -n | sort -u) -a > us.txt

fping $(cat us.txt) -c 3 -q

fping 103.86.98.5 103.86.98.5 66.133.76.20 66.133.76.20 66.133.76.21 66.133.76.21 66.133.76.22 66.133.76.22 66.133.76.23 66.133.76.23 66.133.76.24 66.133.76.24 66.133.76.25 66.133.76.25 66.133.76.26 66.133.76.26 66.133.76.27 66.133.76.27 103.86.98.10 103.86.98.10 103.86.98.11 103.86.98.11 69.161.196.83 69.161.196.83 82.102.28.83 82.102.28.83 91.207.174.147 91.207.174.147 91.207.174.155 91.207.174.155 91.207.174.163 91.207.174.163 82.102.28.35 82.102.28.35 82.102.28.36 82.102.28.36 66.133.76.67 66.133.76.67 66.133.76.68 66.133.76.68 66.133.76.69 66.133.76.69 103.86.98.2 103.86.98.2 66.133.76.75 66.133.76.75 66.133.76.76 66.133.76.76 66.133.76.77 66.133.76.77 66.133.76.78 66.133.76.78 103.86.98.3 103.86.98.3 103.86.98.4 103.86.98.4 -c 1 -q 2>&1 | sed -re 's|([.0-9]+).*/([.0-9]+)|\1 \2|p' -n | sort -uk 2

curl -x socks5://wenermail%40gmail.com:passw@66.133.76.22 http://icanhazip.com

curl -x socks5://wenermail%40gmail.com:passw@66.133.76.22 http://icanhazip.com

#right=103.86.98.11
#  right=185.236.200.150
right=165.231.40.11 #UK
#right=209.58.184.121 #hk

apk add strongswan

nano /tmp/secrets
. /tmp/secrets
echo "$USERNAME : EAP \"$PASSWORD\"" > /etc/ipsec.secrets

echo "
conn NordVPN
  keyexchange=ikev2
  dpdaction=clear
  dpddelay=300s
  eap_identity=\"$USERNAME\"
  leftauth=eap-mschapv2
  left=%defaultroute
  leftsourceip=%config
  right=$SERVER
  rightauth=pubkey
  rightsubnet=0.0.0.0/0
  rightid=%any
  type=tunnel
  auto=add
" > /etc/ipsec.conf

# load = yes to load = no.
nano /etc/strongswan.d/charon/constraints.conf

# wget https://downloads.nordvpn.com/certificates/root.der -O /etc/ipsec.d/cacerts/NordVPN.der
curl https://downloads.nordvpn.com/certificates/root.der -o /etc/ipsec.d/cacerts/NordVPN.der

ipsec restart
ipsec up NordVPN
ipsec down NordVPN

curl http://icanhazip.com
```

- [ipsec.conf.5](https://libreswan.org/man/ipsec.conf.5.html)
- [bgpd.conf gist](https://gist.github.com/Manouchehri/de3adfb02c5b55f3edc2da9e8ee59fae)
- [root.der](https://downloads.nordvpn.com/certificates/root.der)

```
us355
us 1817

jp
HTTP
66.133.76.22 80

NordVPN DNS addresses 103.86.96.100 and 103.86.99.100

Netflix
Netflix US:
You should connect to our servers in the United States:
United States: # 2897-2898, 2460-2479, 3244-3249, 1742-1745, 3305-3322, 3129-3132, 2730-2749, 1470-1475, 2879-2881, 2573-2600, 3121-3122, 1524-1539, 1806-1905, 2920-2921, 3094-3098, 1750-1793, 2810-2825, 3153-3170, 2674-2677, 2228-2303, 1612-1671, 603-604, 2533-2536, 3203-3204, 3179-3188, 3279-3286, 2609-2616, 3217-3226, 3333-3414, 2481-2488, 1910-2029, 3118-3119, 690, 1564-1571, 3289-3290, 912-915, 2794-2805, 1604-1607, 2976-2979, 3107, 2509-2524, 2545-2548, 1322-1325, 2686-2705, 617, 2048-2139, 3109-3116, 2432-2451, 2872, 972-975, 2862-2870, 3091-3092, 2308-2371, 1734-1737, 2883-2887, 3416-3437, 3135-3150, 2758-2765, 1798-1801, 1576-1599, 2714-2717, 1284-1287, 1484-1495, 3191-3194, 1696-1707, 1309-1312, 1426-1429, 2836-2843, 3041-3067, 1074-1089, 2889-2893, 2778-2789, 1252-1255, 1260-1267, 2034-2045, 2853, 1709-1732, 3199-3200, 801-804, 3237-3238, 2144-2203, 3129-3132, 2561-2564, 2925, 1512-1515, 876-879, 2621-2632.

Japan: # 201-204, 186-187, 71-74, 177-181, 67-69, 16, 119-126.

a.split(',')
.map(v=>v.trim())
.map(v=>v.split('-').map(v=>v\*1))
.flatMap((a)=>!a[1]?a[0]:[...Array(a[1]-a[0]).keys()].map(v=>v+a[0]))
```

```bash
# Server
curl https://nordvpn.com/api/server
# Stats
https://nordvpn.com/api/server/stats
```

- [How to use public nordvpn api](https://blog.sleeplessbeastie.eu/2019/02/18/how-to-use-public-nordvpn-api/)

```bash
curl --silent "https://api.nordvpn.com/v1/servers?limit=16384"
```
