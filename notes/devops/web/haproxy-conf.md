---
title: HAProxy Configuration Guide
tags:
  - DevOps
  - Web
  - HAProxy
  - LoadBalancer
  - SSL
---

# HAProxy Configuration Guide

Notes on configuring HAProxy for SSL termination, timeouts, and basic routing.

## Documentation

- [Official Onepage Guide](http://www.haproxy.com/documentation/hapee/latest/onepage/)
- [HAProxy 2.2 Configuration Manual](http://cbonte.github.io/haproxy-dconv/2.2/configuration.html)
- [Pre-defined ACLs](https://cbonte.github.io/haproxy-dconv/2.2/configuration.html#7.4)

## Essential Sections

- [The Four Essential Sections of an HAProxy Configuration](https://www.haproxy.com/blog/the-four-essential-sections-of-an-haproxy-configuration/)
- [Tuning Timeouts (ServerFault)](https://serverfault.com/questions/504308/by-what-criteria-do-you-tune-timeouts-in-ha-proxy-config)

## SSL Configuration

- [HAProxy SSL Termination Blog](https://www.haproxy.com/blog/haproxy-ssl-termination/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=haproxy&version=2.1&config=intermediate&openssl=1.1.1d&guideline=5.4)

### Example Front-end with SSL

```haproxy
global
    ssl-default-bind-options ssl-min-ver TLSv1.2

frontend www.mysite.com
    bind 10.0.0.3:80
    # Enforce minimum TLS version
    bind 10.0.0.3:443 ssl crt /etc/ssl/certs/mysite.pem ssl-min-ver TLSv1.2

    # Redirect HTTP to HTTPS
    http-request redirect scheme https unless { ssl_fc }
    default_backend web_servers
```

## Access Control (ACL)

### Custom Methods

[How to define allowed HTTP methods in HAProxy](https://blog.sleeplessbeastie.eu/2018/03/01/how-to-define-allowed-http-methods-on-haproxy/)

```haproxy
acl valid_method method GET HEAD
http-request deny if ! valid_method

# Routing by host
acl is-draw hdr_dom(host) -i draw.example.org
use_backend web-draw-production if is-draw
```

- `capture.req.method`: Capture request method in logs.
