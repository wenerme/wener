---
title: goaccess
---

# goaccess

- [allinurl/goaccess](https://github.com/allinurl/goaccess)
  - MIT, C
  - real-time web log analyzer and interactive viewer
- https://goaccess.io/man

```bash
brew install goaccess

goaccess access.log -o report.html --log-format=COMBINED
goaccess access.log -o report.html --log-format=COMBINED --real-time-html

LC_ALL=C LC_TIME=en_US.UTF-8 goaccess ac.log -p goaccess.conf -o report.html -a
```

| name                                            | log-format                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| NCSA Combined Log Format                        | `%h %^[%d:%t %^] "%r" %s %b "%R" "%u"`                                          |
| NCSA Combined Log Format with Virtual Host      | `%v:%^ %h %^[%d:%t %^] "%r" %s %b "%R" "%u"`                                    |
| Common Log Format (CLF)                         | `%h %^[%d:%t %^] "%r" %s %b`                                                    |
| Common Log Format (CLF) with Virtual Host       | `%v:%^ %h %^[%d:%t %^] "%r" %s %b`                                              |
| W3C                                             | `%d %t %h %^ %^ %^ %^ %r %^ %s %b %^ %^ %u %R`                                  |
| Squid native log format                         | `%^ %^ %^ %v %^: %x.%^ %~%L %h %^/%s %b %m %U`                                  |
| AWS / Amazon CloudFront (Download Distribution) | `%d\t%t\t%^\t%b\t%h\t%m\t%^\t%r\t%s\t%R\t%u\t%^`                                |
| Google Cloud Storage                            | `"%x","%h",%^,%^,"%m","%U","%s",%^,"%b","%D",%^,"%R","%u"`                      |
| AWS / Elastic Load Balancing                    | `%dT%t.%^ %^ %h:%^ %^ %T %^ %^ %^ %s %^ %b "%r" "%u"`                           |
| AWSS3 / Amazon Simple Storage Service (S3)      | `%^[%d:%t %^] %h %^"%r" %s %^ %b %^ %L %^ "%R" "%u"`                            |
| Virtualmin Log Format with Virtual Host         | `%h %^ %v %^[%d:%t %^] "%r" %s %b "%R" "%u"`                                    |
| Kubernetes Nginx Ingress Log Format             | `%^ %^ [%h] %^ %^ [%d:%t %^] "%r" %s %b "%R" "%u" %^ %^ [%v] %^:%^ %^ %T %^ %^` |

| name         | for                                   |
| ------------ | ------------------------------------- |
| COMBINED     | Combined Log Format                   |
| VCOMBINED    | Combined Log Format with Virtual Host |
| COMMON       | Common Log Format                     |
| VCOMMON      | Common Log Format with Virtual Host   |
| W3C          | W3C Extended Log File Format          |
| SQUID        | Native Squid Log Format               |
| CLOUDFRONT   | Amazon CloudFront Web Distribution    |
| CLOUDSTORAGE | Google Cloud Storage                  |
| AWSELB       | Amazon Elastic Load Balancing         |
| AWSS3        | Amazon Simple Storage Service (S3)    |
| AWSALB       | Amazon Application Load Balancer      |
| CADDY        | Caddy's JSON Structured format        |

- CADDY JSON Structured
  - `{ts:"%x.%^",request:{remote_ip:"%h",proto:"%H",method:"%m",host:"%v",uri:"%U",headers:{"User-Agent":["%u","%^"]},tls:{cipher_suite:"%k",proto:"%K"}},duration:"%T",size:"%b",status:"%s",resp_headers:{"Content-Type":["%M;%^"]}}`

| specifier | for                              |
| --------- | -------------------------------- |
| %^        | 忽略                             |
| %h        |
| %d        | date                             |
| %t        | time                             |
| %r        | request                          |
| %H        | protocol                         |
| %s        | status code                      |
| %q        | query string                     |
| %b        | response size                    |
| %R        | Referer                          |
| %u        | User-Agent                       |
| %T        | process time - seconds           |
| %D        | process time - ms                |
| %L        | process time - ms decimal number |
| %v        | server name - virtual host       |
| %e        | user id                          |
| %C        | cache status                     |

- 至少需要 %h %d %r

## Nginx

```
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

log_format timed_combined '$remote_addr - $remote_user [$time_local] '
    '"$request" $status $body_bytes_sent '
    '"$http_referer" "$http_user_agent" '
    '$request_time $upstream_response_time $pipe';
```

**Nginx**

```
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %^ - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%h,%^"
```

**Nginx with Cache & VHost**

```
log_format full '$remote_addr - $remote_user [$time_local] '
              '"$request" $status $body_bytes_sent '
              '"$http_referer" "$http_user_agent" '
              '"$host" $upstream_cache_status '
              '$request_time';
```

```
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %h - %^ [%d:%t %^] "%r" %s %b "%R" "%u" "%v" %C %T
```

- http://nginx.org/en/docs/http/ngx_http_log_module.html
- http://nginx.org/en/docs/http/ngx_http_upstream_module.html
  - upstream_response_time
- https://www.nginx.com/blog/using-nginx-logging-for-application-performance-monitoring/
- https://www.digitalocean.com/community/tutorials/how-to-optimize-nginx-configuration
- https://www.nginx.com/blog/10-tips-for-10x-application-performance/

# FAQ

## Token '25/Sep/2022' doesn't match specifier '%d'

```bash
LC_ALL=C LC_TIME=en_US.UTF-8 goaccess access.log -p goaccess.conf -o report.html
```

## IPv4/6 is required

%h 未匹配
