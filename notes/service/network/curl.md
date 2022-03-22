---
title: curl
---

# curl

- [manpage](https://curl.se/docs/manpage.html)
- -C- 继续下载
- --remote-name-all
  - 默认 `-O` 只影响第一个

```bash
# 测试 SNI
# resolve 不可以指定远程 port
# connect-to 可以指定 port
curl -vik --resolve example.com:8443:127.0.0.1 https://example.com:8443
curl -vik --resolve example.com:443:127.0.0.1 https://example.com

curl -vik --connect-to example.com:443:127.0.0.1:8443 https://example.com

# 协议限定
curl --http1.1 --no-alpn --no-npn --tlsv1.2 --tls-max 1.2  https://example.com
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
cat <<EOF > curl-format.txt
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

## Mark bundle as not supporting multiuse

- HTTP/2 检测
- [lib/http.c#L4276-L4279](https://github.com/curl/curl/blob/da973165965962a435a23ade336d9a17daf044ef/lib/http.c#L4276-L4279)

```c
if(conn->httpversion < 20) {
   conn->bundle->multiuse = BUNDLE_NO_MULTIUSE;
   infof(data, "Mark bundle as not supporting multiuse\n");
}
```

## output dir

- 7.73.0+

```bash
curl --create-dirs -O --output-dir /tmp/receipes https://example.com/pancakes.jpg
```
