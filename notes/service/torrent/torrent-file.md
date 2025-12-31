---
title: Torrent File Structure (Bencode)
tags:
  - BitTorrent
  - Bencode
  - Protocol
---

# Torrent File & Bencode

- [WebTorrent: parse-torrent](https://github.com/webtorrent/parse-torrent)
- [WebTorrent: create-torrent](https://github.com/webtorrent/create-torrent)
- [BEP 0003: The BitTorrent Protocol Specification](http://www.bittorrent.org/beps/bep_0003.html)

## Bencode

[Bencode (pronounced like B encode)](https://en.wikipedia.org/wiki/Bencoding) is the encoding used by the peer-to-peer sharing system BitTorrent for storing and transmitting loosely structured data.

It supports four different types of values:

- byte strings
- integers
- lists
- dictionaries

Bencoding is most commonly used in torrent files. These metadata files are simply bencoded dictionaries.
