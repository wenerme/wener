---
title: BitTorrent
---

# BitTorrent

- [bittorrent-v2](https://newshimalaya.com/2020/09/07/bittorrent-v2)
  - SHA-256 File Hash - 之前 sha-1
  - Hash Tree - 可以用 目录 hash 找文件 - v1 文件多的时候非常慢，包含所有 hash
    - 16 kiB 块 hash
  - 文件 Hash - 相同复用，会有 Pad 补齐块
  - 磁力链接支持 v2 btmh - `magnet:?xt=urn:btmh: &dn=&tr=`
    - [multiformats/multihash](https://github.com/multiformats/multihash)
- [atomashpolskiy/bt](https://github.com/atomashpolskiy/bt)
  - [HN](https://news.ycombinator.com/item?id=14911372)
  - Java BitTorrent library with DHT, magnet links, encryption and more
- [mafintosh/peerflix](https://github.com/mafintosh/peerflix)
  - Streaming torrent client for node.js
