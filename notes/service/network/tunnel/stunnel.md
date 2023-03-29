---
title: stunnel
---

# stunnel

- TLS/SSL tunneling
- https://www.stunnel.org/static/stunnel.html

```bash
apk add stunnel      # AlpineLinux
brew install stunnel # macOS

echo -n psk: > /etc/stunnel/psk.txt
openssl rand -base64 180 | tr -d '\n' >> /etc/stunnel/psk.txt
# sed --in-place '1s/^/psk:/' /etc/stunnel/psk.txt

echo -e '\xef\xbb\xbf;BOM Here' > /etc/stunnel/stunnel.conf
# 服务端
cat << CONF >> /etc/stunnel/stunnel.conf
setuid  = stunnel
setgid  = stunnel
pid     = /run/stunnel/stunnel.pid
socket  = l:TCP_NODELAY=1
socket  = r:TCP_NODELAY=1
debug   = 5

; 配置在服务端
[test server]
client      = no
accept      = 18080
connect     = 8080
ciphers     = PSK
PSKsecrets  = /etc/stunnel/psk.txt

; 配置在客户端
[test client]
client      = yes
accept      = 8081
connect     = 127.0.0.1:18080 ; host 会变
ciphers     = PSK
PSKsecrets  = /etc/stunnel/psk.txt
CONF

socat -u tcp-l:8080,fork exec:/bin/cat # 服务端
echo Hello | nc 127.0.0.1 8080         # 本地能通

mkdir -p /run/stunnel
chown stunnel /run/stunnel

stunnel

echo Hello | nc 127.0.0.1 8081 # Tunnel 后的端口
```

- /etc/stunnel/stunnel.conf

**类似工具**

```bash
openssl s_client -connect server.com:443 -quiet

socat TCP-LISTEN:8888 OPENSSL:server.com:443,verify=0
```

SSH over TLS

```
Host server.com
    ProxyCommand openssl s_client -connect server.com:443 -quiet
```

- HAProxy 也可以 terminate TLS 然后转发到 TCP

```haproxy
backend secure_http
    reqadd X-Forwarded-Proto:\ https
    rspadd Strict-Transport-Security:\ max-age=31536000
    mode http
    option httplog
    option forwardfor
    server local_http_server 127.0.0.1:80

backend ssh
    mode tcp
    option tcplog
    server ssh 127.0.0.1:22
    timeout server 2h

frontend ssl
    bind X.X.X.X:443 ssl crt /etc/ssl/private/certs.pem no-sslv3
    mode tcp
    option tcplog
    tcp-request inspect-delay 5s
    tcp-request content accept if HTTP

    acl client_attempts_ssh payload(0,7) -m bin 5353482d322e30

    use_backend ssh if !HTTP
    use_backend ssh if client_attempts_ssh
    use_backend secure_http if HTTP
```

- 参考
  - https://blog.chmd.fr/ssh-over-ssl-episode-4-a-haproxy-based-configuration.html

## stunnel.conf

- protocol
  - socks - 监听 SOCKS - 作为 socks 代理服务
  - connect - HTTP 1.1 CONNECT - 只能 client 模式
  - cifs, capwin, capwinctrl, connect, imap, ldap, nntp, pgsql, pop3, proxy, smtp, socks
- verify
  - 1 - prefer
  - 2 - CA
  - 3 - CA+Cert
- client
  - yes - 远程服务使用 TLS
- connect - 可配置多个 - round-robin

```ini
foreground=no ; yes, quite
log=append ; overwrite
; output=
; pid=
; service= ; inetd
syslog=yes

; chroot=
; compression= ; deflate, zlib
debug= ; 1-7
; EGE= ; Entropy Gathering Daemon
engine=auto

[SERVICE NAME]
client=no ; yes
; 监听端口
; server - 服务端协议
; client - 通道后的协议
accept=
; 连接端口
; server - 上游
; client - 服务端
connect=

exec= ; inetd-type program
execArgs=
retry=no ; connect+exec
pty= ; yes, no

failover=prio; rr

PSKidentity= ; psk client
PSKsecrets= ; IDENTITY:KEY

; cifs, capwin, capwinctrl, connect, imap, ldap, nntp, pgsql, pop3, proxy, smtp, socks
protocol=
protocolAuthentication=
protocolDomain=
protocolHeader=
protocolHost=
protocolPassword=
protocolUsername=

redirect=
renegotiation=yes

reset=yes ; TCP RST

ident= ; USERNAME
include= ; DIR
config= ; openssl config
CApath=
CAfile=
cert=
key=
; server - 匹配的名字
; client - 定义名字
sni=
requireCert=no
checkEmail=
checkHots=
checkIP=
cipgers=
ciphersuites=
CRLpath=
CRLfile=
curves=
logID=
debug=
delay=no ; delay DNS lookup for connect
engineId=
engineNum=
libwrap=no ; /etc/hosts.allow, /etc/hosts.deny
local=
sslVersion=
sslVersionMax=
sslVersionMin=
stack=

OCSP=
OCSPaia=
OCSPflag=
OCSPnonce=
options= ; SSL Options

securityLevel=

setgid=
setuid=

sessionCacheSize=
sessionCacheTimeout=
sessionResume=yes
sessiond= # TLS cache server

socket=
ticketKeySecret=
ticketMacSecret=

TIMEOUTbusy=
TIMEOUTclose=
TIMEOUTconnect=
TIMEOUTidle=

transparent= ; none | source | destination | both

verify=
verifyChain=
verifyPeer=no
```

## pgsql

```ini
[pg]
client = yes
protocol = pgsql
accept = 0.0.0.0:5432
connect = pg-b:15432
options = NO_TICKET
retry = yes
```

```sql
create extension sslinfo();
select ssl_is_used()
```

## cert

```bash
# cert 和 key 也可以在同一个文件
openssl req -new -days 365 -nodes -x509 -out cert.pem -keyout key.pem

cat key.pem cert.pem >> /etc/stunnel/stunnel.pem
```

```ini
cert=cert.pem
key=key.pem
CAfile=cert.pem
verify=3
client=no
```

## sni

```bash
openssl req -new -days 365 -nodes -x509 -out cert.pem -keyout key.pem

openssl genrsa -out c1.key 1024
openssl req -new -key c1.key -out c1.csr

openssl ca -extensions v3_ca -days 365 -out c1.cer -policy policy_anything -in c1.csr
```

```ini
[virtual]
; 无 SNI 时
was not correct
accept = 443
cert = /usr/local/etc/stunnel/stunnel.pem
exec = /usr/local/bin/hello

[server s1]
sni = virtual:*.example.com
cert = /usr/local/etc/stunnel/public_cert.pem
connect = 10.10.10.11:80

[server s2]
sni = virtual:secret.net
cert = /usr/local/etc/stunnel/secret_cert.pem
connect = localhost:888
verifyPeer = yes
CAfile = /usr/local/etc/stunnel/allowed-clients.pem


[cleint]
client = yes
sni = c1.example.com
accept =  127.0.0.1:80
connect = 10.10.10.12:443
cert = stunnel.pem
verifyPeer = yes
CAfile = sni_certs.pem
```
