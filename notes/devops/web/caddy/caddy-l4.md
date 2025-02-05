---
tags:
  - Plugin
  - Network
---

# Caddy L4

- [mholt/caddy-l4](https://github.com/mholt/caddy-l4)
  - Apache-2.0, Go
  - Layer 4 (TCP/UDP) app for Caddy
  - 支持探测 HTTP, TLS, SNI, ALPN, SSH, PostgreSQL, QUIC, Socks4, Socks5, Winbox, Wireguard, XMPP, Proxy Protocol
  - 支持 regexp 自定义探测
  - 路由支持 Socks5, TLS termination, echo, proxy protocol, tee

:::caution

- 可能有内存占用过高的问题
  - 跑一段时间后内存占用到了 1G

:::

```caddyfile
{
  servers {
    # for current 80 443
		listener_wrappers {
			layer4 {
				@ssh_l4 ssh
				route @ssh_l4 {
					proxy 127.0.0.1:22
				}

        # PG < 17 do not support TLS SNI handshakes
        # crash for now https://github.com/mholt/caddy-l4/issues/264
				@pg_l4 postgres
				route @pg_l4 {
					proxy 127.0.0.1:5432
				}

        # PG 17+ libpq/jdbc ?sslnegotiation=direct&sslmode=require
        @tls_pg_l4 tls sni pg.example.com
        route @tls_pg_l4 {
					tls {
						connection_policy {
							alpn postgresql
						}
					}
					proxy 127.0.0.1:5432
				}

        # redis-cli -u "rediss://default:$REDIS_PASSWORD@redis.example.com:443" --sni redis.example.com info
        @tls_redis_l4 tls sni redis.example.com
        route @tls_redis_l4 {
          tls
          proxy 127.0.0.1:6379
        }

				route
			}
			tls
		}
	}
}
```

# FAQ

## tls: failed to verify certificate: x509: certificate is not valid for any names, but wanted to match
