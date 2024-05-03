---
tags:
  - Compression
  - RFC
---

# zlib

- 参考
  - [rfc1950](https://www.rfc-editor.org/rfc/rfc1950) ZLIB Compressed Data Format Specification version 3.3
  - [rfc1951](https://www.rfc-editor.org/rfc/rfc1951) DEFLATE Compressed Data Format Specification version 1.3
  - https://en.wikipedia.org/wiki/DEFLATE

![](https://kroki.io/bytefield/svg/eNptkcFuwjAMhu97Csu7gLROBQpsvbGWTkjsMu2GOKTUgWoprZJUgBDvPhdYSzcOnyI5X_7YSSchKazVBvx47aw10RaOvkyVAnwUrpTCxVP3odPSDqRUvms8Ke97Rbr9vrVi9561Ooj2nUKKO1mlLhQ1HnnxUI4r7yzCKldltnWUiEkZWKCLT9hj-syA8ZghM2LGzAvzykyYNyZgQmbKRLi8XA9xvifjFKQdzQP3Rk3Z2aWJ3YDnViUtds61gQ2JhLT5rbIJGHxECIujbwqetHe6eeoltMRo_v5PvDx2W-xY2lvAcBZ8zUI-4WfCbpa8mjIGTCVw0HNUbfMkdaB3qn-lirvmrUUBuMqzQpMxlEAirMB699zWJJxPPwd9_JvUtFbb1uZZ9wfuMrPJ)

<!--
(defattrs :bg-green {:fill "#a0ffa0"})
(defattrs :bg-yellow {:fill "#ffffa0"})
(defattrs :bg-pink {:fill "#ffb0a0"})
(defattrs :bg-cyan {:fill "#a0fafa"})
(defattrs :bg-purple {:fill "#e4b5f7"})

(def column-labels ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"])
(def boxes-per-row 16)
(def box-width 40)
(draw-column-headers)
(draw-box "CMF" [{:span 1} :bg-green ] )
(draw-box "FLG" [{:span 1} :bg-yellow] )
(draw-box (text "DICTID" [:math] [:sub "if FLG.FDICT"]) [{:span 4} :bg-pink] )

(draw-gap "compressed data")

(draw-box "ADLER32" [{:span 4} :bg-yellow] )

(draw-bottom)
-->

- CMF
  - 0-3 CM Compression method
    - 8 -> deflate
  - 4-7 CINFO Compression info
    - CM=8 LZ77 window size, CINFO=7 -> 32K window size
- FLG
  - 0-4 - FCHECK (check bits for CMF and FLG)
  - 5 - FDICT (preset dictionary)
  - 6-7 - FLEVEL (compression level)
    - 0 - fastest
    - 1 - fast
    - 2 - default
    - 3 - maximum compression, slowest algorithm

---

```bash
file /tmp/data
# /tmp/data: zlib compressed data
printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" | cat - /tmp/data | gzip -dc > /tmp/out
cat /tmp/out

# pigz 并行压缩
brew install pigz
pigz -z test
pigz -d -z test.zz

# openssl zlib -d -in /tmp/data

# qpdf
zlib-flate -uncompress < FILE
```

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

```
 +---+---+
 |CMF|FLG| (2 bytes - Defines the compression mode - More details below)
 +---+---+
 +---+---+---+---+
 |     DICTID    | (4 bytes. Present only when FLG.FDICT is set.) - Mostly not set
 +---+---+---+---+
 +=====================+
 |...compressed data...| (variable size of data)
 +=====================+
 +---+---+---+---+
 |     ADLER32   |  (4 bytes of checksum)
 +---+---+---+---+
```
