---
title: Avahi
---

# Avahi

- archlinux [Avahi](https://wiki.archlinux.org/index.php/Avahi)
- Alpine 没有 nsswitch
  - [gliderlabs/docker-alpine#367](https://github.com/gliderlabs/docker-alpine/issues/367)
  - musl 不支持 nsswitch
- https://linux.die.net/man/5/avahi.service

```bash
# tools https://pkgs.alpinelinux.org/contents?branch=edge&name=avahi-tools&arch=x86_64&repo=main
apk add avahi avahi-tools

# avahi-daemon
# avahi-dnsconfd
service avahi-daemon start

avahi-browse --all --ignore-local --resolve --terminate
# 只搜索 ssh 且显示 ip
avahi-browse _ssh._tcp -tr

# 新增服务定义
cat << XML > /etc/avahi/services/node-exporter.service
<service-group>
  <name replace-wildcards="yes">%h</name>

  <service protocol="ipv4">
    <type>_prometheus-http._tcp</type>
    <port>9100</port>
  </service>
</service-group>
XML

# 直接查找并打印
ippfind _ipp._tcp --print
# 获取 hostname
ippfind _ipp._tcp,_universal --exec echo '{service_hostname}' \;
# 查找 airprint
avahi-browse -rt _universal._sub._ipp._tcp
```

```xml
<!-- 一个服务分组 - {name,service:[]} -->
<service-group>
  <!-- 服务名 -->
  <!-- replace-wildcards 替换 %h 为 hostname -->
  <name replace-wildcards="yes">%h</name>

  <!-- {type,port, domain-name?, host-name?, subtype:[], txt-record:[] -->
  <!-- protocol="ipv4|ipv6|any" - 默认 any -->
  <service protocol="ipv4">
    <!-- 例如 _http._tcp -->
    <type>_prometheus-http._tcp</type>
    <port>9090</port>

    <!-- 子类型 -->
    <subtype>_anon._sub._metrics._tcp</subtype>
    <!-- 注册到的类型 -->
    <!-- 默认 .local -->
    <domain-name>.local</domain-name>
    <!-- 主机名 FQDN -->
    <host-name>my.host.test<host-name>
    <!-- TXT -->
    <txt-record>path=/metrics</txt-record>
  </service>
</service-group>
```

## services

### prometheus

```xml title="prometheus.service"
<service-group>
  <name replace-wildcards="yes">%h</name>

  <service protocol="ipv4">
    <type>_prometheus-http._tcp</type>
    <port>9100</port>
    <txt-record>path=/metrics</txt-record>
  </service>
</service-group>
```

## afpd

```xml title="afpd.service"
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name replace-wildcards="yes">%h</name>
  <service>
    <type>_afpovertcp._tcp</type>
    <port>548</port>
  </service>
  <service>
    <type>_device-info._tcp</type>
    <port>0</port>
    <txt-record>model=Xserve</txt-record>
  </service>
</service-group>
```

- model - /System/Library/CoreServices/CoreTypes.bundle/Contents/Info.plist
  - Xserve
  - PowerBook
  - PowerMac
  - Macmini
  - iMac
  - MacBook
  - MacBookPro
  - MacBookAir
  - MacPro
  - AppleTV1,1
  - AirPort
  - iPhone

**howl**

```
"ServerName" _device-info._tcp local. 1 "TXTVersion=1.0" "model=Xserve"
"ServerName" _afpovertcp._tcp  local. 548
```

### SMB

```xml title="smb.service"
<service-group>
 <name replace-wildcards="yes">SMB on %h</name>
 <service>
   <type>_smb._tcp</type>
   <port>445</port>
 </service>
</service-group>
```

### Misc

```xml
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name replace-wildcards="yes">%h</name>
  <service>
    <type>_afpovertcp._tcp</type>
    <port>548</port>
  </service>
  <service>
    <type>_smb._tcp</type>
    <port>139</port>
  </service>
  <service>
    <type>_rfb._tcp</type>
    <port>5901</port>
  </service>
  <service>
    <type>_device-info._tcp</type>
    <port>0</port>
    <txt-record>model=RackMac</txt-record>
  </service>
  <service>
    <type>_http._tcp</type>
    <port>80</port>
  </service>
  <service>
    <type>_ssh._tcp</type>
    <port>22</port>
  </service>
  <service>
    <type>_sftp-ssh._tcp</type>
    <port>22</port>
  </service>
</service-group>
```

# FAQ

## dbus_bus_request_name(): Connection ":1.3" is not allowed to own the service "org.freedesktop.Avahi" due to security policies in the configuration file
