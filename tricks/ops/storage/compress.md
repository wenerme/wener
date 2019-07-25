# Compress

## Tips
* [google/zopfli](https://github.com/google/zopfli)
  * Zopfli Compression Algorithm is a compression library programmed in C to perform very good, but slow, deflate or zlib compression.
* [google/brotli](https://github.com/google/brotli)
  * 通用无损压缩
  * combination of a modern variant of the LZ77 algorithm, Huffman coding and 2nd order context modeling, with a compression ratio comparable to the best currently available general-purpose compression methods
  * 速度与 deflate 相似, 但压缩率更高
  * [kothar/brotli-go](https://github.com/kothar/brotli-go)
    * Go bindings for the Brotli compression library
* [google/draco](https://github.com/google/draco)
  * Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics. 
* [dsnet/compress](https://github.com/dsnet/compress)
  * Collection of compression related Go packages.
* [facebook/zstd](https://github.com/facebook/zstd)
  * [zstd](http://facebook.github.io/zstd/)
  * Zstandard - Fast real-time compression algorithm
* Benchmark
  * [Squash Compression Benchmark](https://quixdb.github.io/squash-benchmark/)
  * [Large Text Compression Benchmark](http://mattmahoney.net/dc/text.html)
* JS
  * [nodeca/pako](https://github.com/nodeca/pako)
    * high speed zlib port to javascript, works in browser & node.js

```bash
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

# 强制覆写, 暴露原始文件, 9 级压缩
gzip -vfk9 data.db > data.db.gz

# -w 0 自动选择优化的窗口大小
# -9 压缩率, 如果不指定, 默认为 -Z 即 11, 会非常慢
pv dict.db | brotli -9 -w 0 > dict.db.br

# 编码
# ====
# https://www.iana.org/assignments/character-sets/character-sets.xhtml
# 使用指定的编码, 有些 unzip 不一定有该选项
unzip -O cp936 -l my.zip
# 也可以先解压, 然后再转换
LANG=C 7za x your-zip-file.zip
convmv -f GBK -t utf8 --notest -r .
# brew install unar
unar -e gb18030 gb18030.zip
```
