---
title: Logging Format
---

# 日志格式

:::tip 学习和梳理现有的日志格式

- 用于参考设计 - 输出“友好”的日志
- 用于确定需要在日志里包含什么内容
- 用于解析日志

:::

- Apache Log
- Common Log - CLF - Common Log Format https://httpd.apache.org/docs/current/logs.html#common
  - NCSA Common Log Format
- CEF - Common Event Format
- glog - Google Logging Library
- [klog](https://github.com/kubernetes/klog) - Kubernetes Log
- syslog
  - authorization
    - /var/log/auth.log - Debian
    - /var/log/secure - RHEL
- logfmt
  - https://brandur.org/logfmt
  - https://pkg.go.dev/github.com/kr/logfmt#section-documentation
- nginx log - nginx access log
- ruby hash - `{"key" => "value"}`
- Graylog Extended Log Format - GELF
  - https://graylog.org/features/gelf/
- Windows Event Log - https://docs.microsoft.com/en-us/windows/win32/wes/windows-event-log
- IIS Log File Format - https://docs.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms525807(v=vs.90)
  - Timestamp
  - Client IP
  - Server IP
  - URI-Stem
  - HTTP Status Code
  - Bytes Sent
  - Bytes Received
  - Time Taken
  - Version
- ODBC
- W3C Extended Log File Format
- NestJS - https://github.com/nestjs/nest/blob/master/packages/common/services/console-logger.service.ts

```
[Nest] 4262  - 2023/12/03 00:20:23     DEBUG [InstanceLoader] MikroOrmModule dependencies initialized +0ms
[Nest] %PID  - %Timestamp %Level [%Context] %Message %TimeDiff
```

## 结构化 {#structured}

### APISIX

- https://apisix.apache.org/docs/apisix/plugins/elasticsearch-logger/

```json
{
  "apisix_latency": 0,
  "route_id": "1",
  "server": {
    "version": "2.15.0",
    "hostname": "apisix"
  },
  "request": {
    "size": 102,
    "uri": "/elasticsearch.do?q=hello",
    "querystring": {
      "q": "hello"
    },
    "headers": {
      "user-agent": "curl/7.29.0",
      "host": "127.0.0.1:9080",
      "accept": "*/*"
    },
    "url": "http://127.0.0.1:9080/elasticsearch.do?q=hello",
    "method": "GET"
  },
  "service_id": "",
  "latency": 0,
  "upstream": "127.0.0.1:1980",
  "upstream_latency": 1,
  "client_ip": "127.0.0.1",
  "start_time": 1661170929107,
  "response": {
    "size": 192,
    "headers": {
      "date": "Mon, 22 Aug 2022 12:22:09 GMT",
      "server": "APISIX/2.15.0",
      "content-type": "text/plain; charset=utf-8",
      "connection": "close",
      "transfer-encoding": "chunked"
    },
    "status": 200
  }
}
```

## 参考 {#reference}

- syntax
  - re2
  - kv
  - CSV
  - JSON
  - grok - https://github.com/daschl/grok/tree/master/patterns
  - xml
  - timestamp
- https://vector.dev/docs/reference/vrl/functions/#parse_syslog
  - vrl `parse_*`
- https://graylog.org/post/log-formats-a-complete-guide/
- https://www.crowdstrike.com/cybersecurity-101/observability/log-file-formats/

## UserAgent

- 浏览器 UserAgen 包含相当多的信息，格式也可以作为参考
- 如果使用相同的格式，解析工具可以复用
- 嵌入式 WebView 的时候通常也包含自己的信息
  - 例如: 微信、企业微信 等

```
Mozilla Firefox 1.0.1 Mozilla/5.0 (X11; U; Linux i686; de-DE; rv:1.7.6) Gecko/20050223 Firefox/1.0.1
```

```json
{
  "browser": {
    "family": "Internet Explorer",
    "version": "7.66"
  },
  "device": {
    "category": "pc"
  },
  "os": {
    "family": "Windows XP",
    "version": "NT 5.1"
  }
}
```

**进一步解析**

```
Opera/9.80 (J2ME/MIDP; Opera Mini/4.3.24214; iPhone; CPU iPhone OS 4_2_1 like Mac OS X; AppleWebKit/24.783; U; en) Presto/2.5.25 Version/10.54
```

```json
{
  "browser": {
    "family": "Opera Mini",
    "major": "4",
    "minor": "3",
    "patch": "24214",
    "version": "10.54"
  },
  "device": {
    "brand": "Apple",
    "category": "smartphone",
    "family": "iPhone",
    "model": "iPhone"
  },
  "os": {
    "family": "iOS",
    "major": "4",
    "minor": "2",
    "patch": "1",
    "patch_minor": null,
    "version": "4.2.1"
  }
}
```
