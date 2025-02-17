---
tags:
  - FAQ
---

# Caddy FAQ

## 禁用自动证书 {#disable-auto-cert}

```caddyfile
{
	auto_https off
}
```

## ACME DNS Wildcard cert

- [libdns/acmedns](https://github.com/libdns/acmedns)

```caddyfile
{
	http_port 80
	https_port 443

	log {
		output stdout
		level INFO
		format console
	}

	acme_dns acmedns {
		config {
      # *.examole.com 会让匹配到的域名都使用这里的 配置
			"example.com" {
				username ""
				password ""
				subdomain ""
				fulldomain ""
				server_url "https://auth.acme-dns.io"
			}
		}
	}
}

http://:80 {
	respond / "Hello World" 200
}

*.example.com {
  @web host web.example.com
  handle @web {
    respond / "Hi from Web" 200
  }

	handle {
    respond / "Hi from Root" 200
  }
}
```

```yaml
# caddy-docker-proxy
- caddy=*.example.com
- caddy.1_@foo = host foo.example.com
- caddy.1_handle = @foo
- 'caddy.1_handle.reverse_proxy={{ upstreams 8080 }}'
```

- https://caddyserver.com/docs/caddyfile/patterns#wildcard-certificates
- https://github.com/lucaslorentz/caddy-docker-proxy/issues/581#issuecomment-1925432620

## ZeroSSL ACME

```caddyfile
{
    acme_ca https://acme.zerossl.com/v2/DV90
    email   you@yours.com
}
```

```caddyfile
{
    acme_ca https://acme.zerossl.com/v2/DV90
    acme_eab {
        key_id  $ACME_EAB_KEY_ID
        mac_key $ACME_EAB_MAC_KEY
    }
}
```

```caddyfile
tls you@yours.com {
    ca https://acme.zerossl.com/v2/DV90
}
```

```caddyfile
tls {
   ca  https://acme.zerossl.com/v2/DV90
   eab <key_id> <mac_key>
}
```

- https://caddy.community/t/using-zerossls-acme-endpoint/9406

## could not determine the zone for: unexpected response code 'SERVFAIL'

DNS 有问题
