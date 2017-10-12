# DNS





## Tips
* [Comparison of DNS server software](https://en.wikipedia.org/wiki/Comparison_of_DNS_server_software)
* [rfc2136](https://tools.ietf.org/html/rfc2136) - Dynamic Updates in the Domain Name System (DNS UPDATE)
  * [Dynamic DNS:wiki](https://en.wikipedia.org/wiki/Dynamic_DNS)
  * caddy [tls.dns.rfc2136](https://caddyserver.com/docs/tls.dns.rfc2136)


```
server localhost 53
debug yes
key some_key some_base64_secret_here
zone mkaczanowski.com.
update delete router.mkaczanowski.com. A
update delete router.mkaczanowski.com. AAAA
update add router.mkaczanowski.com. 120 A 88.71.73.131
update add router.mkaczanowski.com. 120 AAAA 2001:41a0:52:a00:0:0:0:212
show
send
```

```
server localhost 53
debug yes
key key QUJDREVGR0hUSUpIR0ZERFMK
zone wener.me.
update delete home.wener.me. A
update add home.wener.me. 120 A 88.71.73.131

update delete router.mkaczanowski.com. AAAA
update add router.mkaczanowski.com. 120 AAAA 2001:41a0:52:a00:0:0:0:212
show
send
```
