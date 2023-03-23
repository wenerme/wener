---
title: Compress
tags:
  - Awesome
---

# Compress

- [google/zopfli](https://github.com/google/zopfli)
  - Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
- [google/brotli](https://github.com/google/brotli)
  - 通用无损压缩
  - combination of a modern variant of the LZ77 algorithm, Huffman coding and 2nd order context modeling, with a compression ratio comparable to the best currently available general-purpose compression methods
  - 速度与 deflate 相似, 但压缩率更高
  - [kothar/brotli-go](https://github.com/kothar/brotli-go)
    - Go bindings for the Brotli compression library
- [google/draco](https://github.com/google/draco)
  - Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.
- [dsnet/compress](https://github.com/dsnet/compress)
  - Collection of compression related Go packages.
- [facebook/zstd](https://github.com/facebook/zstd)
  - [zstd](http://facebook.github.io/zstd/)
  - Zstandard - Fast real-time compression algorithm
- [peazip/PeaZip](https://github.com/peazip/PeaZip)
  - LGPLv3
  - 跨平台
- [mcmilk/7-Zip-zstd](https://github.com/mcmilk/7-Zip-zstd)
  - LGPL v2.1-or-later
  - 7-Zip + Brotli, Fast-LZMA2, Lizard, LZ4, LZ5, Zstandard
  - Windows
  - [p7zip-project/p7zip](https://github.com/p7zip-project/p7zip)
    - Linux, macOS
- Benchmark
  - [Squash Compression Benchmark](https://quixdb.github.io/squash-benchmark/)
  - [Large Text Compression Benchmark](http://mattmahoney.net/dc/text.html)
  - [Gzip vs Bzip2 vs LZMA vs XZ vs LZ4 vs LZO](https://catchchallenger.first-world.info/wiki/Quick_Benchmark:_Gzip_vs_Bzip2_vs_LZMA_vs_XZ_vs_LZ4_vs_LZO)
- JS
  - [nodeca/pako](https://github.com/nodeca/pako)
    - high speed zlib port to javascript, works in browser & node.js
- [pigz](https://zlib.net/pigz/) - 并行 Gzip - 命令兼容 gzip
- [MacPaw/XADMaster](https://github.com/MacPaw/XADMaster)
  - LGPL-2.1
  - Zip, Tar, Gzip, Bzip2, 7-Zip, Rar, LhA, StuffIt, CAB, LZX
  - unar
  - [MacPaw/unar](https://github.com/MacPaw/unar)
  - https://theunarchiver.com/
  - https://github.com/Homebrew/homebrew-core/blob/master/Formula/unar.rb
  - https://theunarchiver.com/command-line
- unrar
  - Alpine 3.14 有
  - https://www.rarlab.com/download.htm

```bash
curl -O https://www.rarlab.com/rar/rarlinux-x64-612.tar.gz
tar zxvf rarlinux-x64-612.tar.gz
./rar/unrar
```

- 参考
  - [Modern LZ Compression](https://glinscott.github.io/lz/index.html)
  - [MiloszKrajewski/SilesiaCorpus](https://github.com/MiloszKrajewski/SilesiaCorpus)
  - [hxhb/oodle-compression](https://github.com/hxhb/oodle-compression)
    - http://www.radgametools.com/oodle.htm
    - 压缩慢，解压快，压缩率高
  - [List of archive formats](https://en.wikipedia.org/wiki/List_of_archive_formats)
  - [Comparison of file archivers](https://en.wikipedia.org/wiki/Comparison_of_file_archivers)

:::tip

- 文件归档 区别于 压缩算法 - 归档 -> 容器
- gzip 头包含 mtime，因此压缩结果是不一致的

:::

---

- 7z
  - https://documentation.help/7-Zip/

```bash
cd staged && mytar cf - . | ssh root@localhost "cd / && tar xvf -"

# 7z
# https://github.com/p7zip-project/p7zip
apk add p7zip
7z a dir.7z -m0=zstd -mx7 dir

# bz2
# ==========
# 解压
bzip2 -d filename.bz2
# 解压并保留原始压缩包
bzip2 -dk filename.bz2

# 并行 Gzip
# http://zlib.net/pigz/
# 提亚提升不大, 因为解压的结构不适用于并发
# 支持 -11 zopfli
# 利用 pv 可以查看压缩进度
pv dict.db | pigz -vfk9 > dict.db.gz

# 可以直接替换
ln -s /usr/bin/pigz /usr/local/bin/gzip
ln -s /usr/bin/unpigz /usr/local/bin/gunzip

# 强制覆写, 暴露原始文件, 9 级压缩
gzip -vfk9 data.db > data.db.gz

# -w 0 自动选择优化的窗口大小
# -9 压缩率, 如果不指定, 默认为 -Z 即 11, 会非常慢
pv dict.db | brotli -9 -w 0 > dict.db.br

# 编码
# ====
# https://www.iana.org/assignments/character-sets/character-sets.xhtml
unzip -O cp936 -l my.zip # 使用指定的编码, 有些 unzip 不一定有该选项 - unzip-iconv
# 也可以先解压, 然后再转换
LANG=C 7za x your-zip-file.zip
convmv -f GBK -t utf8 --notest -r .
# brew install unar
unar -e gb18030 gb18030.zip

# 批量
# ====
unzip \*.zip
```

|                       | gzip      | deflate/zlib |
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

## zlib

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

## gzip

![](https://kroki.io/bytefield/svg/eNp9kktvgzAMgO_7FVF2aaUhhZY-xm3d2vu0Y9VDAAfQQkBJqtJV_Pe5j_Eq3eETkfXFxnZGEQhurTbED2In1gCKnHyRSknoM2dCcEar8dOoox1ByvzQeEIMe0WqvttWwIas8Mi7NbngA7n2upDQeOAFM7E4exeRhLncZ8qRPABpyJYy-kJdZIJMEQ-ZIXNkgSyRV-QNWSHvyAeyRjZ0dy1PgrwE4xSgHY0Nu_Mm7BzSyCbEY-eQ5gfn9gMJ8Ai0-YuiSVjpbpYrsj35psBWJ1Vr1jvSNqmQMa1Ft2pNuycmkb4Tz-PuaTbNwFieFY3sVfXUe3I5VH0gaW4eWm3ta_1J-01ft9jNN7JQWkIlKNT9jNtkh1-zD3AcKcgIl0FaeZrLMS9uiqF16VsQn4riGdDuHhgb32lhnmWg7EPz0guosFcizJW9Xmt7oQ6nk7tZD24QD8SkP_CPXevW5tn4FwytIU0=)

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
(draw-box 0x1F8B [{:span 2} :bg-green ] )
(draw-box "flg" [{:span 1} :bg-yellow] )
(draw-box "hdr" [{:span 1} :bg-pink] )
(draw-box "timestamp" [{:span 4} :bg-cyan] )
(draw-box "xflg" [{:span 1} :bg-pink] )
(draw-box "os" [{:span 1} :bg-pink] )

(draw-box "SEQ" [{:span 2} :bg-purple] )
(draw-box (text "len" [:math] [:sub "field"])  [{:span 2}] )
(draw-gap "fields")

(draw-gap "file name")
(draw-box 0x00)
(draw-gap "file comment")
(draw-box 0x00)
(draw-box "enc")

(draw-gap "content")

(draw-box "crc32" [{:span 4} :bg-yellow] )
(draw-box "raw size" [{:span 4} :bg-yellow] )

(draw-bottom)
-->

| flg | -                     |
| --- | --------------------- |
| 0   | store - 不压缩        |
| 1   | compress              |
| 2   | pack - 打包           |
| 3   | lzh 使用 lzh 算法压缩 |
| 4-7 | 保留                  |
| 8   | deflate - 常用        |

| hdr        | -                     |
| ---------- | --------------------- |
| 0b00000001 | 可能为文本格式        |
| 0b00000010 | 多压缩文件 - 存在序列 |
| 0b00000100 | 包含附加字段          |
| 0b00001000 | 包含文件名            |
| 0b00010000 | 包含文件注释          |
| 0b00100000 | 加密                  |
| 0b11000000 | 保留                  |

| os   |
| ---- | -------------------------- |
| 0x00 | Windows                    |
| 0x01 | Amiga                      |
| 0x02 | VMS/OpenVMS                |
| 0x03 | Unix/Linux/macOS           |
| 0x04 | VM/CMS                     |
| 0x05 | Atari TOS                  |
| 0x06 | HPFS filesystem (OS/2, NT) |
| 0x07 | Macintosh                  |
| 0x08 | Z-System                   |
| 0x09 | CP/M                       |
| 0x0a | TOPS-20                    |
| 0x0b | NTFS filesystem (NT)       |
| 0x0c | QDOS                       |
| 0x0d | Acorn RISCOS               |
| 0xff | unknown                    |

---

- [rfc1952](https://datatracker.ietf.org/doc/html/rfc1952) GZIP file format specification version 4.3

## tar

```bash
apk add zstd

tar -I zstd -xvf archive.tar.zst

# Gnu tar 可以不要 -a
# gz, bz2, Z, zstd
tar -acf archive.tar.zst dir/
```

# FAQ

## 解压 7z exe

```bash
ls *.exe | xargs -n 1 -d "\n" 7z x
```

## Multi part

```bash
# 1. merge
cat in.zip* > ~/in.zip
unzip in.zip

# 2. 7z
7z x in.zip.001
```

## Password

```bash
7z -mhc=on -mhe=on -pPASSWORD a out.7z in.txt

zip -P password -r encrypted.zip folderIWantToZip
unzip -P password encrypted.zip
```

## zstd level

- 默认 3
- 可以考虑 6-9
- 影响 window size
  - level 1 = 2^18 = 256KB
  - zlib 最大 32KB
- 1-22
  - https://github.com/facebook/zstd/blob/dev/lib/compress/clevels.h
