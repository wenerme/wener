---
title: clash
---

# clash

- ~~[Dreamacro/clash](https://github.com/Dreamacro/clash)~~
  - GPLv3, Golang
  - rule-based tunnel
  - 于 2023-11-02 删库, [Clash.Meta](./clash-meta.md) 只是 Archive
    - https://github.com/net4people/bbs/issues/303
- 参考
  - [juewuy/ShellClash](https://github.com/juewuy/ShellClash)
  - https://clash.gitbook.io/doc/
  - [vernesong/OpenClash](https://github.com/vernesong/OpenClash)
  - https://github.com/Loyalsoldier
    - [Loyalsoldier/geoip](https://github.com/Loyalsoldier/geoip)
  - [eycorsican/leaf](https://github.com/eycorsican/leaf)
  - [eycorsican/go-tun2socks](https://github.com/eycorsican/go-tun2socks)
  - [EAimTY/tuic](https://github.com/EAimTY/tuic)
  - [HyNetwork/hysteria](https://github.com/HyNetwork/hysteria)
- Premium - 闭源
  - [发布历史](https://github.com/Dreamacro/clash/releases/tag/premium)
  - [Premium-Core-Features](https://github.com/Dreamacro/clash/wiki/Premium-Core-Features)
  - tun,script,tracing
  - rule-providers
    - type: http,file - 指向 yaml
    - yaml 包含 `{payload:[]}`
  - ebpf - redirect-to-tun
  - auto-redir - 配合 tun 替代 redir-port

```bash
# golang build from source
go install github.com/Dreamacro/clash@latest
# macOS
brew install clash

# Docker
# https://hub.docker.com/r/dreamacro/clash
# https://github.com/Dreamacro/clash/blob/master/Dockerfile
docker run --rm -it --name clash dreamacro/clash

# Linux
# ==========
curl -LO https://github.com/Dreamacro/clash/releases/download/v1.14.0/clash-linux-amd64-v3-v1.14.0.gz
gzip -d clash-linux-amd64-v3-v1.14.0.gz
chmod +x clash-linux-amd64-v3-v1.14.0
mv clash-linux-amd64-v3-v1.14.0 clash
cp clash /usr/local/bin/clash
mkdir -p /var/lib/clash/ /etc/clash/

# https://ghproxy.com/github.com/Dreamacro/maxmind-geoip/releases/download/20230312/Country.mmdb
curl -o /var/lib/clash/Country.mmdb https://cdn.jsdelivr.net/gh/Dreamacro/maxmind-geoip@release/Country.mmdb

clash -t -d /var/lib/clash/ -f /etc/clash/config.yaml

# 同步本地到服务器
scp ~/.config/clash/config.yaml admin@server:/etc/clash/config.yaml
rsync -avP --exclude config.yaml ~/.config/clash/ admin@server:/var/lib/clash/
```

## Awesome

- [Dreamacro/clash](https://github.com/Dreamacro/clash)
- Client
  - [vernesong/OpenClash](https://github.com/vernesong/OpenClash)
    - OpenWRT Client
  - [Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg)
  - [ClashDotNetframework](https://github.com/ClashDotNetframework/ClashDotNetframework)
    - DotNet, Windows
  - [yichengchen/clashX](https://github.com/yichengchen/clashX)
    - macOS
    - [WhoJave/clashX](https://github.com/WhoJave/clashX/tree/master)
  - [Kr328/ClashForAndroid](https://github.com/Kr328/ClashForAndroid)
  - [WhoJave/ClashA](https://github.com/WhoJave/ClashA)
  - [ccg2018/ClashA](https://github.com/ccg2018/ClashA)
  - iOS
    - https://apps.apple.com/app/choc/id1582542227
      - 收费，不一定可用
  - [SpongeNobody/Clashy](https://github.com/SpongeNobody/Clashy)
- [链接转换](https://sites.google.com/view/honven/%E9%A6%96%E9%A1%B5/%E6%9C%BA%E5%9C%BA%E9%93%BE%E6%8E%A5%E8%BD%AC%E6%8D%A2)
- [Dreamacro/clash-tracing](https://github.com/Dreamacro/clash-tracing)
- Dashboard
  - [haishanh/yacd](https://github.com/haishanh/yacd)
    - MIT, Typescript
    - http://yacd.haishan.me/
  - [Dreamacro/clash-dashboard](https://github.com/Dreamacro/clash-dashboard)
    - MIT, Typescript
    - https://clash.razord.top/
    - Docker 内置

```bash
# Dreamacro/clash-dashboard
curl -LO https://github.com/Dreamacro/clash-dashboard/archive/gh-pages.zip
unzip gh-pages.zip
mv clash-dashboard-gh-pages/ ~/.config/clash/

# haishanh/yacd
curl -LO https://github.com/haishanh/yacd/archive/gh-pages.zip
unzip gh-pages.zip
mv yacd-gh-pages/ ~/.config/clash/
```

```yaml
external-controller: 0.0.0.0:9090
secret: external-controller-secret
# 默认目录 ～/.config/clash
# http://{{external-controller}}/ui
# yacd-gh-pages
external-ui: clash-dashboard-gh-pages
```

## API

```bash
# reload 重载配置
curl -X PUT 127.0.0.1:9090/configs --json "{}"
# 配置 Secret 后
curl -X PUT -H "Authorization: Bearer secret" 127.0.0.1:9090/configs --json "{}"
```

- https://github.com/Dreamacro/clash/wiki/external-controller-API-reference

## TProxy

```bash
sysctl -w net.ipv4.ip_forward=1

# 新的路由表
ip rule add fwmark 666 lookup 666
ip route add local 0.0.0.0/0 dev lo table 666

# clash
# ==================
# clash 链负责处理转发流量
iptables -t mangle -N clash

# DIRECT Private
iptables -t mangle -A clash -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A clash -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A clash -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A clash -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A clash -d 240.0.0.0/4 -j RETURN

# Proxy
iptables -t mangle -A clash -p tcp -j TPROXY --on-port 7893 --tproxy-mark 666
iptables -t mangle -A clash -p udp -j TPROXY --on-port 7893 --tproxy-mark 666

# 转发所有 DNS 查询到 1053 端口
# 此操作会导致所有 DNS 请求全部返回虚假 IP(fake ip 198.18.0.1/16)
iptables -t nat -I PREROUTING -p udp --dport 53 -j REDIRECT --to 1053

# 如果想要 dig 等命令可用, 可以只处理 DNS SERVER 设置为当前内网的 DNS 请求
#iptables -t nat -I PREROUTING -p udp --dport 53 -d 192.168.0.0/16 -j REDIRECT --to 1053

# 最后让所有流量通过 clash 链进行处理
iptables -t mangle -A PREROUTING -j clash

# clash_local
# ==================
# clash_local 链负责处理网关本身发出的流量
iptables -t mangle -N clash_local
# nerdctl 容器流量重新路由
#iptables -t mangle -A clash_local -i nerdctl2 -p udp -j MARK --set-mark 666
#iptables -t mangle -A clash_local -i nerdctl2 -p tcp -j MARK --set-mark 666

# 跳过内网流量
iptables -t mangle -A clash_local -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A clash_local -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A clash_local -d 169.254.0.0/16 -j RETURN

iptables -t mangle -A clash_local -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A clash_local -d 240.0.0.0/4 -j RETURN

# 为本机发出的流量打 mark
iptables -t mangle -A clash_local -p tcp -j MARK --set-mark 666
iptables -t mangle -A clash_local -p udp -j MARK --set-mark 666

# 跳过 clash 程序本身发出的流量, 防止死循环(clash 程序需要使用 "clash" 用户启动)
iptables -t mangle -A OUTPUT -p tcp -m owner --uid-owner clash -j RETURN
iptables -t mangle -A OUTPUT -p udp -m owner --uid-owner clash -j RETURN

# 让本机发出的流量跳转到 clash_local
# clash_local 链会为本机流量打 mark, 打过 mark 的流量会重新回到 PREROUTING 上
iptables -t mangle -A OUTPUT -j clash_local

# 修复 ICMP(ping)
# 这并不能保证 ping 结果有效(clash 等不支持转发 ICMP), 只是让它有返回结果而已
# --to-destination 设置为一个可达的地址即可
sysctl -w net.ipv4.conf.all.route_localnet=1
iptables -t nat -A PREROUTING -p icmp -d 198.18.0.0/16 -j DNAT --to-destination 127.0.0.1
```

- 参考配置
  - https://gist.github.com/phlinhng/38a141862de775b10c613f7f2c6ade99
  - https://github.com/springzfx/cgproxy/blob/aaa628a76b2911018fc93b2e3276c177e85e0861/readme.md#known-issues
    - docker 不可以 tproxy

## openrc

```bash
nano /etc/init.d/clash
chmod +x /etc/init.d/clash
service clash checkconfig
```

```bash
#!/sbin/openrc-run
supervisor=supervise-daemon

name="Clash"
description="A rule-based tunnel in Go."
description_reload="Reload configuration without exiting"

clash_config="${clash_config:-/etc/clash/config.yaml}"
command=/usr/local/bin/clash
command_args="-d /var/lib/clash/ -f ${clash_config}"
extra_commands="checkconfig"
extra_started_commands="reload"

clash_log="${clash_log:-/var/log/${RC_SVCNAME}.log}"
output_log="${clash_log}"
error_log="${clash_log}"

depend() {
  use logger dns
  need net
}

checkconfig() {
  ebegin "Checking ${clash_config}"
  if [ ! -f "${clash_config}" ]; then
    eerror "No clash config.yaml"
    return 1
  fi
  ${command} -d /var/lib/clash/ -f ${clash_config} -t
  return 0
}

reload() {
  ebegin "Reloading configuration"
  curl -X PUT -H "Authorization: Bearer $(yq .secret $clash_config)" -sf $(yq .external-controller $clash_config)/configs --json "{}"
  eend $?
}
```

## Premium

```bash
curl -OL https://release.dreamacro.workers.dev/latest/clash-linux-amd64-latest.gz
gzip -d clash-linux-amd64-latest.gz
mv clash-linux-amd64-latest clash
chmod +x clash
```

```yaml
# 出口
interface-name: eth0

tun:
  enable: true
  stack: system # gvisor
  # dns-hijack:
  #   - 8.8.8.8:53
  #   - tcp://8.8.8.8:53
  #   - any:53
  #   - tcp://any:53
  auto-route: true # 设置全局代理
  # auto-detect-interface: true # 自动检测 interface-name
```

- https://github.com/Dreamacro/clash/wiki/Clash-Premium-Features
- https://github.com/Dreamacro/clash/releases/tag/premium
- https://www.wintun.net/
  - wintun.dll

# FAQ

## Start TProxy server error: operation not permitted

```bash
sudo setcap cap_net_bind_service,cap_net_admin+ep $(which clash)
```
