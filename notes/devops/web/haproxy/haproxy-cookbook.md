---
title: HAProxy Cookbook & Useful Snippets
tags:
  - DevOps
  - Web
  - HAProxy
  - Snippets
---

# HAProxy Cookbook & Useful Snippets

Collection of useful HAProxy configuration snippets for common tasks like URL rewriting and header manipulation.

## URL Rewriting

### Map Subdomain to Path

Example: `http://sub1.example.com/a/b/c` -> `http://example.com/sub1/a/b/c`

```haproxy
# Extract subdomain
http-request set-var(req.rewrite_example) req.hdr(host),lower,regsub(\.example\.com$,) if { hdr_end(host) -i .example.com }

# Set path to /subdomain/path
http-request set-path /%[var(req.rewrite_example)]%[path] if { var(req.rewrite_example) -m found }

# Forward to main domain
http-request set-header Host example.com if { var(req.rewrite_example) -m found }
```

## Header Manipulation

### Update X-Forwarded-For

Add client IP to the top of the list:

```haproxy
acl h_xff_exists req.hdr(X-Forwarded-For) -m found
http-request replace-header X-Forwarded-For (.*) %[src],1 if h_xff_exists
```

### Strip Port from Host Header

Example: `www.domain.com:80` -> `www.domain.com`

```haproxy
http-request replace-value Host (.*):.* 1
```

## Advanced Logic

### Layer 7 Control

Refer to [HAProxy Documentation - http-request](https://www.haproxy.com/documentation/hapee/latest/onepage/#4-http-request).

```haproxy
# Replace host suffix
http-request replace-header Host (.*)[.]([^.])+[.]wode[.]co \1.incos.wode.co if { hdr_end(host) -i .wode.co }

# Set variables and headers based on host
http-request set-var(req.xRawHost) req.hdr(host) if { hdr_end(host) -i .zhensi.wode.co }
http-request set-var(req.xName) req.hdr(host),lower,regsub(([^.])\.wode\.co,\1) if { hdr_end(host) -i .zhensi.wode.co }
http-request set-header X-IncOS-Name req.xName if { var(req.xName) -m found }
http-request set-header X-IncOS-Host req.xRawHost if { var(req.xRawHost) -m found }
```

## Logging

- [Custom Log Format](https://www.haproxy.com/documentation/hapee/latest/onepage/#8.2.4)
