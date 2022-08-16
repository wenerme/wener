---
title: magnet
---

# magnet

磁力链接

- BEP09

```
magnet:?xt=urn:btih:<info-hash>&dn=<name>&tr=<tracker-url>&x.pe=<peer-address>
magnet:?xt=urn:btmh:<tagged-info-hash>&dn=<name>&tr=<tracker-url>&x.pe=<peer-address>
```

- xt
- info-hash = SHA-1(bencode(info))
  - 40 - hex
  - 32 - base32
- tagged-info-hash
  - [multiformats/multihash](https://github.com/multiformats/multihash)
- tr - tracker-url
- dn - display name
- x.pe - peer-address
  - `hostname:port`, `ipv4:port`, `[ipv6]:port`
