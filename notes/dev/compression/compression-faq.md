---
tags:
  - FAQ
---

# Compression Format FAQ

## gzip vs zlib

| -                     | gzip      | deflate/zlib |
| --------------------- | --------- | ------------ |
| Header size           | 10 bytes  | 2 bytes      |
| Footer size           | 4 bytes   | 0            |
| Checksum              | CRC32     | Adler-32     |
| Compression algorithm | DEFLATE   | DEFLATE      |
| Specification         | [RFC1952] | [RFC1950]    |

- [rfc1951] deflate 算法

[rfc1950]: https://datatracker.ietf.org/doc/html/rfc1950
[rfc1951]: https://datatracker.ietf.org/doc/html/rfc1951
[rfc1952]: https://datatracker.ietf.org/doc/html/rfc1952

- content-encoding deflate -> zlib
  - 为什么大多数网站使用 gzip
    - 因为早期 MS Server 会直接发送 deflate 数据，而不是 zlib - deflate 在这里有一点混乱
  - https://stackoverflow.com/a/9186091/1870054
- https://stackoverflow.com/a/68538037/1870054
