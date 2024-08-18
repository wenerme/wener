---
title: curl
---

# curl

- [manpage](https://curl.se/docs/manpage.html)
- -J 使用服务端返回的名字
- --remote-name-all
  - 默认 `-O` 只影响第一个
- 支持协议
  - file
  - sftp, ftp, ftps
  - dict gopher gophers http https imap imaps ldap ldaps mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp

```bash
# 测试 SNI
# resolve 不可以指定远程 port
# connect-to 可以指定 port
curl -vik --resolve example.com:8443:127.0.0.1 https://example.com:8443
curl -vik --resolve example.com:443:127.0.0.1 https://example.com

curl -vik --connect-to example.com:443:127.0.0.1:8443 https://example.com

curl -H "Host: www.example.com" http://localhost/

# 协议限定
curl --http1.1 --no-alpn --no-npn --tlsv1.2 --tls-max 1.2 https://example.com

curl -sI https://curl.se -o/dev/null -w '%{http_version}\n'
curl -sI --http3 https://curl.se -o/dev/null -w '%{http_version}\n'
```

| flag                                   | since | for                                                       |
| -------------------------------------- | ----- | --------------------------------------------------------- |
| `-X, --request <method>`               |       |
| `-x, --proxy [protocol://]host[:port]` |       | `https?`,`socks{4,5}{a,h}`                                |
| `--json <data>`                        | 7.82  | --data+POST+Content-Type+Accept                           |
| `--output-dir <dir>`                   | 7.73  | 指定输出目录                                              |
| `--create-dirs`                        |       | 创建输出目录 mode=`0750`                                  |
| `-C, --continue-at <offset>`           |       | 继续下载                                                  |
| `--remote-name-all`                    |       | 全部使用 remote-name - URL 文件名部分 - `-O` 只影响第一个 |
| `-O, --remote-name`                    |       | 第一个使用 remote-name                                    |
| `-J, --remote-header-name`             |       | 使用 `Content-Disposition` 头里的文件名                   |
| `--create-file-mode <mode>`            | 7.75  |
| --dns-servers NS                       | 7.33  | c-ares                                                    |
| -Z, --parallel                         | 7.66  |
| `--parallel-max <num>`                 |       | 50                                                        |
| --haproxy-protocol                     |       | 测试 HAProxy 代理                                         |

- proxy
  - port=1080
  - socks5h - 使用 代理 resolve 名字而非本地 dns
  - `-p, --proxytunnel` - 使用 HTTP CONNECT

```bash
curl -LOC- https://example.com/pancakes.jpg # 继续上次下载位置

# 下载到指定目录，目录不存在则创建
curl --create-dirs -O --output-dir /tmp/receipes https://example.com/pancakes.jpg
```

## 测试 CORS

```bash
curl --head \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: X-Requested-With" \
  -X OPTIONS --verbose \
  https://www.googleapis.com/discovery/v1/apis
```

## 延时

```bash
# %{stderr} 写入到 stderr
cat << EOF > curl-format.txt
     time_namelookup:  %{time_namelookup}s\n
        time_connect:  %{time_connect}s\n
     time_appconnect:  %{time_appconnect}s\n
    time_pretransfer:  %{time_pretransfer}s\n
       time_redirect:  %{time_redirect}s\n
  time_starttransfer:  %{time_starttransfer}s\n
                      ----------\n
          time_total:  %{time_total}s\n
EOF
# https://everything.curl.dev/usingcurl/verbose/writeout
curl -o /dev/null -s -w "@curl-format.txt" https://wener.me
cat curl-format.txt | curl -o /dev/null -s -w @- https://wener.me
```

```
     time_namelookup:  0.001639s
        time_connect:  1.230475s
     time_appconnect:  1.708174s
    time_pretransfer:  1.708254s
       time_redirect:  0.000000s
  time_starttransfer:  1.962050s
                      ----------
          time_total:  1.971632s
```

# FAQ

## websocket

```bash
curl --include \
  --no-buffer \
  --header "Connection: Upgrade" \
  --header "Upgrade: websocket" \
  --header "Host: example.com:80" \
  --header "Origin: http://example.com:80" \
  --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
  --header "Sec-WebSocket-Version: 13" \
  http://example.com:80/

# https://github.com/vi/websocat
apk add websocat

websocat -vv 'wss://'
```

## Mark bundle as not supporting multiuse

- HTTP/2 检测
- [lib/http.c#L4276-L4279](https://github.com/curl/curl/blob/da973165965962a435a23ade336d9a17daf044ef/lib/http.c#L4276-L4279)

```c
if(conn->httpversion < 20) {
   conn->bundle->multiuse = BUNDLE_NO_MULTIUSE;
   infof(data, "Mark bundle as not supporting multiuse\n");
}
```

## bad range specification in URL position

- -g/--globoff

```bash
curl -g "https://wener.me/[1,2]"
```

## CApath: none

```
CAfile: /etc/ssl/certs/ca-certificates.crt
CApath: none
```

- CURL_CA_BUNDLE

```bash
# /usr/share/ca-certificates
apk add ca-certificates

# /etc/ssl/certs/ca-certificates.crt
# /etc/ssl/cert.pem
# /etc/ssl1.1/cert.pem
# /etc/ssl1.1/certs
apk add ca-certificates-bundle
```

## hang after TLS handshake, Client hello

- 可能是 MTU 问题
- docker in docker 的时候出现了，调低 mtu
  - dockerd --mtu=1400
- https://github.com/microsoft/WSL/issues/4698#issuecomment-871279847
- https://serverfault.com/questions/231036
