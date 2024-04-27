---
tags:
  - Compression
  - RFC
---

# zlib

- https://www.rfc-editor.org/rfc/rfc1950

**Header**

| L   | ZLIB  | GZIP  | Notes               |
| --- | ----- | ----- | ------------------- |
| 1   | 78 01 | 1F 8B | No Compression/low  |
| 2   | 78 5E | 1F 8B | Fast Compression    |
| 3   | 78 5E | 1F 8B |
| 4   | 78 5E | 1F 8B |
| 5   | 78 5E | 1F 8B |
| 6   | 78 9C | 1F 8B | Default Compression |
| 7   | 78 DA | 1F 8B | Best Compression    |
| 8   | 78 DA | 1F 8B |
| 9   | 78 DA | 1F 8B |

- CMF -Compression Method and flags

```
bits 0 to 3  CM     Compression method
bits 4 to 7  CINFO  Compression info
```

- CM = 8
  - Deflate
  - window size up to 32K
  - used by gzip and PNG
  - CINFO - base-2 logarithm of the LZ77 window size, minus eight
    - CINFO=7 indicates a 32K window size
    - 因此大多前缀都是 78
- CM = 15
  - reserved

```
bits 0 to 4  FCHECK  (check bits for CMF and FLG)
bit  5       FDICT   (preset dictionary)
bits 6 to 7  FLEVEL  (compression level)
```
