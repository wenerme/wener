---
title: curl
---

# curl
* [manpage](https://curl.se/docs/manpage.html)

```bash
# 测试 SNI
curl -vik --resolve example.com:8443:127.0.0.1 https://example.com:8443/
```

## 延时

```bash
cat <<EOF > curl-formt.txt
     time_namelookup:  %{time_namelookup}s\n
        time_connect:  %{time_connect}s\n
     time_appconnect:  %{time_appconnect}s\n
    time_pretransfer:  %{time_pretransfer}s\n
       time_redirect:  %{time_redirect}s\n
  time_starttransfer:  %{time_starttransfer}s\n
                     ----------\n
          time_total:  %{time_total}s\n
EOF
curl https://wener.me  -o /dev/null -s -w "@curl-format.txt"
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
