---
title: till
---

# till

- [DataHenHQ/till](https://github.com/DataHenHQ/till) 是什么？
  爬虫请求代理
  - Apache-2.0, Go
  - 需要从 till.datahen.com 获取 token
    - 免费 3 实例
  - 随机 User-Agent
  - Proxy IP address rotation
  - 粘性会话
    - X-DH-Session-ID
  - Cookie 管理
  - 请求日志
  - HTTP 缓存
    - 命中缓存会返回 X-Dh-Cache-Created-At
  - Global ID/GID
    - 缓存 Key
    - 会返回 X-DH-GID
    - X-DH-Cache-Freshness 缓存刷新时间
    - X-DH-Cache-Serve-Failures 是否缓存错误响应
- ~/.config/datahen/till
  - default.data/ - 缓存和数据
  - proxylist.txt - 代理列表, --proxy-file
    - 格式为 `http://<user>:<password>@<ip>:<port>`
    - 强制切换 X-DH-Cache-Freshness: now

```bash
# curl -LO https://github.com/DataHenHQ/till/releases/download/v0.8.0/till_0.8.0_Darwin_MacOS_x86_64.tar.gz

# HTTP 代理 http://localhost:2933
# Till UI http://localhost:2980
till serve -t <token>
curl -k --proxy http://localhost:2933 https://fetchtest.datahen.com/echo/request
```

## config

- 配置名字和 flag 名字基本一致

**~/.config/datahen/till/config.yaml**

```yaml
# Get your auth token for FREE at https://till.datahen.com
token: replace-with-your-token

# The Till instance name.
# This can be changed to match other instance names that you've
# created on https://till.datahen.com/instances
instance: default

# The data directory that is used by various features of Till to store data.
# It usually follows the naming convention of `<instance name>.data`
datadir: ~/.config/datahen/till/default.data

# The proxy port where your scraper codes will connect to.
port: 2930

# The port to the Till UI.
uiport: 2980

# Certificate Authority (CA) settings that Till will use to act as Man-In-The-Middle (MIITM) proxy.
# The path to the CA certificate file.
ca-cert: ~/.config/datahen/till/till-ca-cert.pem
# The path to the CA key file.
ca-key: ~/.config/datahen/till/till-ca-key.pem

# User agent settings.
# When set to true, it will override all user-agent with a randomly generated one
force-user-agent: false
# specify user agent type to generate randomly.
ua-type: desktop

# Proxy IP settings.
# Path to the text file that contains a list of proxy IPs.
# If you don't specify this, Till will use your real local IP address.
proxy-file: ~/.config/datahen/till/proxylist.txt

# Sticky Session settings
sessions:
  # Disable the sticky sessions feature.
  # Defaults to false.
  disabled: false

  # TTL (Time To Live). How long a session record will be allowed to live before it gets deleted.
  # Defaults to "week".
  ttl: 'week'

# Cache settings
cache:
  # Disable the cache feature.
  # Defaults to false.
  disabled: false

  # TTL (Time To Live). How long a cache record will be allowed to live before it gets deleted.
  # Defaults to "week".
  ttl: 'week'

  # Specifies by default on how fresh the Cache Hit will be.
  # Defaults to "any"
  freshness: 'any'

  # Specifies if Till should serve cached responses of failed HTTP requests (non 2XX statuses)
  # Defaults to false.
  serve-failures: false

# Logger settings
logger:
  # Disable the logger feature
  # Defaults to false.
  disabled: false

  # TTL (Time To Live). How long a request log record will be allowed to live before it gets deleted.
  # Defaults to "week".
  ttl: 'week'

# 请求拦截
interceptors:
  # this example intercept various image URLs and responds with a local image
  - name: replace_images
    disabled: true
    matches:
      pattern: '.+\.(jpe?g|png|tiff|bmp|gif|webp)'
      method: GET
    responds:
      code: 200
      header:
        'Content-Type': 'image/png'
      file: '/path/to/your/image.png'
  # this example intercept a certain URL and responds with a body
  - name: replace_body
    disabled: true
    matches:
      pattern: 'fetchtest\.datahen\.com\/echo\/request'
      method: GET,POST
    responds:
      code: 200
      header:
        'Content-Type': 'application/json'
      body: '{"Hello":"this has been intercepted"}'
```
