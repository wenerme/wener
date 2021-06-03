---
title: res_http
---

# res_http

- asterisk http 核心模块
  - stasis 依赖
  - webrtc 依赖
  - ari 依赖
  - manager 可通过 http 支持 AMI
  - manager 可通过 http 上传配置
- 相关模块
  - res_http_media_cache.so
  - res_http_post.so
  - res_http_websocket.so
    - 支持 WebSocket - pjsip webrtc
- manager.conf
  - webenabled=yes 允许通过 http 访问 AMI

```bash
# 查看终端
http show status
```

| endpoint              | desc                                                     |
| --------------------- | -------------------------------------------------------- |
| /httpstatus           | Asterisk HTTP General Status                             |
| /static/...           | 静态文件                                                 |
| /amanager             | HTML Manager Event Interface w/Digest authentication     |
| /manager              | Manager Tester - 测试执行管理命令                        |
| /arawman              | Raw HTTP Manager Event Interface w/Digest authentication |
| /rawman               | Raw HTTP Manager Event Interface                         |
| /amxml                | XML Manager Event Interface w/Digest authentication      |
| /mxml                 | XML Manager Event Interface                              |
| /ws                   | Asterisk HTTP WebSocket                                  |
| /ari/...              | Asterisk RESTful API                                     |
| /phoneprov/...        | Asterisk HTTP Phone Provisioning Tool                    |
| /test_media_cache/... | HTTP Media Cache Test URI                                |
| /moh                  | HTTP POST mapping                                        |
| /backups              | HTTP POST mapping                                        |

- manager 登陆
  - http://localhost:8088/manager?action=login&username=admin&secret=admin
  - 会记录 cookie mansession_id

```bash
# 基于 cookie 登陆会话访问
curl -b cookie.txt -c cookie.txt 'http://localhost:8088/manager?action=login&username=admin&secret=admin'
# raw
curl -b cookie.txt -c cookie.txt 'http://localhost:8088/rawman?action=status'
# xml
curl -b cookie.txt -c cookie.txt 'http://localhost:8088/mxml?action=status'

# 直接使用 digest 认证访问
curl --digest -u admin:admin -k 'https://127.0.0.1:8089/arawman?action=status'
curl --digest -u admin:admin -k 'https://127.0.0.1:8089/amxml?action=status'
```

## http.conf

```conf
[general]
; 默认 Asterisk/{version}
; 可设置为空
servername=Asterisk

; 启用 HTTP/HTTPS - 影响 manager/rawman/mxml
enabled=yes

; 监听地址
bindaddr=0.0.0.0

; HTTP 端口
;bindport=8088

; 请求前缀 - 类似 base patch 或 context path
;prefix=asterisk

; 会话数量限制 - 默认 100
;sessionlimit=100
; 不活跃等待时间 - 单位 ms - 默认 30s
;session_inactivity=30000
; 等待下一个请求的时间 - 单位 ms - 默认 15s, 0 禁用
;session_keep_alive=15000

; 是否允许访问静态文件
; enablestatic=yes
;enable_static=yes
; 是否返回状态页
;enable_status=no

; 自定义重定向 from to
; 例如 asterisk Asterisk-gui
;redirect = / /static/config/index.html

; 启用 HTTPS
;tlsenable=yes
;tlsbindaddr=0.0.0.0:8089
; 证书
;tlscertfile=</path/to/certificate.pem>
;tlsprivatekey=</path/to/private.pem>
; If no path is given for tlscertfile or tlsprivatekey, default is to look in current
; directory. If no tlsprivatekey is given, default is to search tlscertfile for private key.
;
; To produce a certificate you can e.g. use openssl. This places both the cert and
; private in same .pem file.
; openssl req -new -x509 -days 365 -nodes -out /tmp/foo.pem -keyout /tmp/foo.pem
;
; tlscipher=                             ; The list of allowed ciphers
;                                        ; if none are specified the following cipher
;                                        ; list will be used instead:
; ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:
; ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:
; kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:
; ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:
; ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:
; DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:
; AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:
; AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:
; !EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA
;
; tlsdisablev1=yes                ; Disable TLSv1 support - if not set this defaults to "yes"
; tlsdisablev11=yes               ; Disable TLSv1.1 support - if not set this defaults to "no"
; tlsdisablev12=yes               ; Disable TLSv1.2 support - if not set this defaults to "no"
;
; tlsservercipherorder=yes        ; Use the server preference order instead of the client order
;                                 ; Defaults to "yes"

; 映射 url 路径到系统  - POST 会上传文件
; 需要 AMI 的 mansession_id 作为 cookie
;[post_mappings]
; 如果设置了前缀 asterisk
; 则 POST /asterisk/uploads 会上传到 /var/lib/asterisk/uploads/
;uploads = /var/lib/asterisk/uploads/
```
