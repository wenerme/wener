---
title: Media Awesome
tags:
  - Awesome
---

# Media Awesome

## Player

- [mpv](./player/mpv.md)
- vlc
- 命令行音乐播放器
  - [cmus](./player/cmus.md)
    - cmus-remote
  - [termusic](https://github.com/tramhao/termusic)
- [MusicPlayerDaemon](./player/mpd.md)

## Music Server

- [owntone/owntone-server](./server/owntone.md)
  - GPLv2, C+Vue
  - 🌟 推荐 - WebUI, 支持较多客户端
  - DAAP (iTunes), MPD (Music Player Daemon) and RSP (Roku) media server
  - forked-daapd
  - DAAP - Digital Audio Access Protocol
- [sentriz/gonic](https://github.com/sentriz/gonic)
  - GPLv3, Golang
- [epoupon/lms](https://github.com/epoupon/lms)
  - GPLv3, C++
- [blackcandy-org/black_candy](https://github.com/blackcandy-org/black_candy)
  - MIT, Ruby
- [koel/koel](https://github.com/koel/koel)
  - MIT, PHP+Laravel+Vue
  - [koel/docker](https://github.com/koel/docker)
  - [koel/player](https://github.com/koel/player)
    - Mobile
- [mopidy/mopidy](https://github.com/mopidy/mopidy)
  - Apache-2.0, Python
- [MusicPlayerDaemon/MPD](https://github.com/MusicPlayerDaemon/MPD)
  - GPLvv2, C++
- [nukeop/nuclear](https://github.com/nukeop/nuclear)
  - AGPLv3, TS
  - Streaming music player that finds free music for you
- [navidrome/navidrome](https://github.com/navidrome/navidrome)
  - GPL-3.0, Go
- [airsonic-advanced/airsonic-advanced](https://github.com/airsonic-advanced/airsonic-advanced)
  - GPL-3.0, Java
- [mpache/ampache](https://github.com/ampache/ampache)
  - PHP
- Icecast
  - Ogg Vorbis and MP3 streaming media server
- Gerbera
  - UPnP media server

## Media Server

- [jellyfin](./server/jellyfin.md)
  - 🌟 推荐 - 简单易用，开发活跃
- [Red5/red5-server](https://github.com/Red5/red5-server)
  - Apache-2.0, Java
- [ant-media/Ant-Media-Server](https://github.com/ant-media/Ant-Media-Server)
  - GPL-3.0, Java
    - Red5 fork
- [midarrlabs/midarr-server](https://github.com/midarrlabs/midarr-server)
  - MIT, Elixir

## Container

- [Matroska](https://www.matroska.org/)
  - mkv - viedo
  - mka - audio
  - mks - subtitle
  - mk3d - stereoscopic/3d video
  - webm 的基础

# Formats

[av1]: ./format/av1.md
[jpeg-xl]: ./format/jpeg-xl.md
[avif]: ./format/avif.md
[nfo]: ./format/nfo.md

## Audio

:::tip 音乐最佳选择 AAC

- 支持广泛
- 码率支持好
- 音质优先

:::

:::tip 一般最佳选择 Opus

- 面向 low bit rate, low latency, speech 设计
- 低码率人声 优于 speedx - 适用于 VoIP, WebRTC
- Web 支持程度高, 压缩率高, 同等码率音质优于 mp3, 没有 License 问题
- 支持范围非常广

:::

- mp3
- ac3
- aac
- opus
  - since 2012
  - 非常适合人声
  - 目前主流平台都支持
  - [Rillke/opusenc.js](https://github.com/Rillke/opusenc.js)
- Ogg Vorbis
  - zero licensing costs
- .dff
  - Direct Stream Digital - DSD
  - by Sony and Philips for Super Audio CD - SACD
  - DST - Direct Stream Transfer 压缩
  - wikipedia [Direct Stream Digital](https://en.wikipedia.org/wiki/Direct_Stream_Digital)
- 音乐大多 44.1
- 48 <-> 44.1 无法很好 resample
- https://support.spotify.com/us/article/audio-quality/
  - AAC 128kbit/s
  - AAC 256kbit/s
- [Audio file formats for Spotify](https://artists.spotify.com/help/article/audio-file-formats)
  - FLAC/WAV
  - Ogg/Vorbis (96, 160, 320 kbps)
  - AAC (128, 256 kbps)
  - HE-AACv2 (24kbps)
- [Youtube Music Audio Quality](https://support.google.com/youtubemusic/answer/9076559)
  - 48kbps AAC
  - 128kbps AAC
  - 256kbps AAC
- https://superuser.com/questions/1049075

## Image

:::tip 最佳选择 AVIF

- [JPEG-XL] 短时间内 Web 还覆盖不到
- [AV1] 硬件加速会一定程度推动 AVIF 硬件加速

:::

- [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh)
  - https://squoosh.app
  - 对比不同算法
- https://storage.googleapis.com/demos.webmproject.org/webp/cmp/2021_08_10/index.html
- https://storage.googleapis.com/demos.webmproject.org/webp/cmp/2021_06_08/plots.html
  - bpp - bits per pixel
- https://web.dev/fast/#optimize-your-images
- [google/butteraugli](https://github.com/google/butteraugli)
  - HVS-aware image differences
- Tools
  - [libvips/libvips](https://github.com/libvips/libvips)
    - fast image processing library
    - [libvips/nip2](https://github.com/libvips/nip2)
      - spreadsheet-like GUI for libvips
  - [lovell/sharp](https://github.com/lovell/sharp)
    - Node.js image processing
    - 底层基于 vips
  - online [butteraugli](http://libwebpjs.hohenlimburg.org/butteraugli/)
- Service
  - [imgproxy](./server/imgproxy.md)
    - MIT, Go
    - JPEG, PNG, WebP, AVIF, GIF, SVG, ICO, HEIC, BMP, TIFF, and animated GIF and WebP
  - [cshum/imagor](https://github.com/cshum/imagor)
    - Apache-2.0, Go
  - [joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder)
    - 生成 blur dataURL
    - [strapi-plugin-placeholder](https://market.strapi.io/plugins/strapi-plugin-placeholder)
  - [thoas/picfit](https://github.com/thoas/picfit)
    resizing server
    - 开发停滞
- image difference metrics - RD - rate distortion
  - butteraugli
    - good detail retention and best color
    - slower than PSNR
    - 8b image
  - SSIM
    - better detail retention, worse color handling
    - 支持 8b, 10b, 16b
  - PSNR
  - PSNRHVS-M
  - MAE
  - FUZZ
  - NCC
  - SSIMULACRA
- [AVIF]
  - AV1 的图片格式
- WebP is superior below quality 70
- JPEG is often better than WebP at quality 90 and above
- psycho-visual quality - 心理视觉质量
- YUV/RGB 4:4:4/4:2:2 - [Chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling)
  - nearly always 4:4:4 originally
  - 4:4:4/4:2:2, RGB and lossless isn't supported by main profile HW decoders
  - no image editor works in 4:2:0
  - JPEG compression, 4:2:0 can be useful
  - modern codecs 4:2:0 is not really useful anymore from the compression point of view
  - https://twitter.com/kornelski/status/1328786564416200709
  - https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4
- compression ratio = uncompressed size / compressed size
- [Lossless Image Compression in O(n) Time](https://phoboslab.org/log/2021/11/qoi-fast-lossless-image-compression)
  - [HN](https://news.ycombinator.com/item?id=29328750)

```bash
# squoosh 可通过命令行使用
npx @squoosh/cli --wp2 '{"effort":5,"quality":100,"alpha_quality":95,"pass":1,"sns":50,"uv_mode":3,"csp_type":0,"error_diffusion":0,"use_random_matrix":false}'
```

## JPEG

目前最好的是 mozjpeg

- https://jpeg.org/
- [google/brunsli](https://github.com/google/brunsli)
  - 用于 Google Photos 节省空间
  - 无损 JPEG 重压 - 被包含到 JPEG-XL
  - lossless JPEG recompression
  - https://brunsli.dev
    - 实测 16 MB -> 14 MB
- [google/guetzli](https://github.com/google/guetzli)
  - JPEG encoder with denser packing
  - https://en.wikipedia.org/wiki/Guetzli
- [google/knusperli](https://github.com/google/knusperli)
- [google/pik](https://github.com/google/pik)
- [mozilla/mozjpeg](https://github.com/mozilla/mozjpeg)
  - patch for libjpeg-turbo
- [libjpeg-turbo/libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo)
- [danielgtaylor/jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)
- https://kornel.ski/en/faircomparison
- https://cloudinary.com/blog/time_for_next_gen_codecs_to_dethrone_jpeg
- [dropbox/lepton](https://github.com/dropbox/lepton)

## EBook

:::tip

- 书籍推荐 epub

:::

- cb? - Comic Book Archive file - 漫画
  - r - RAR
  - z - ZIP
  - 7 - 7z
  - t - tar
  - a - ACE
- .chm - Compiled HTML
- .djvu
  - scanned documents
- Kindle - .azw; .azw3 or .kf8; .kfx
- Mobipocket - .prc, .mobi

---

- [Retirement of Amazon MOBI eBook file format](https://www.microsoftpressstore.com/promotions/142421)
  - [HN](https://news.ycombinator.com/item?id=32421350)
- [janeczku/calibre-web](https://github.com/janeczku/calibre-web)
- [Comparison of e-book formats](https://en.wikipedia.org/wiki/Comparison_of_e-book_formats)

## Playlist

- [m3u8]

[m3u8]: ./format/m3u8.md

## Metadata

- [nfo]

# Misc

## Tools

- [nanozuki/dantalian](https://github.com/nanozuki/dantalian)
- [nilaoda/N_m3u8DL-CLI](https://github.com/nilaoda/N_m3u8DL-CLI)
- [yuanqing/vdx](https://github.com/yuanqing/vdx)
- [MiSTer-devel/Presets_MiSTer](https://github.com/MiSTer-devel/Presets_MiSTer)
- [exiftool](https://exiftool.org/exiftool_pod.html)
  - 不能 write mkv
- mkvtoolnix
  - https://mkvtoolnix.download/doc/mkvpropedit.html
- mediainfo

```bash
exiftool -ext mp4 -Title= /path/to/files/

# mkvtoolnix
mkvpropedit -l # 属性列表

mkvinfo input.mkv
mkvpropedit input.mkv --tags all:                   # 移除所有 tag
mkvpropedit input.mkv -d title                      # 删除 title
mkvpropedit input.mkv --edit track:v1 --delete name # 删除 track:v1 的名字

for i in *.mkv; do mkvpropedit $i -d title; done
for i in *.mkv; do mkvpropedit $i --edit track:v1 --delete name; done
```

## Metadata

- Anime
  - https://anidb.net/
    - https://anidb.net/group/15631
- Movie & Shows
  - https://www.imdb.com/interfaces/
  - openmovie
  - TMDB https://www.themoviedb.org/documentation/api
- Subtitles
  - opensubtitle
  - https://www.media.io/
- Artwork
  - Discogs https://www.discogs.com/
  - Cover Art Archive https://coverartarchive.org/

## Protocol

- DLNA
- UPnP
- HLS
- Streaming MP3

## Online

- https://bigjpg.com/
  - 图片放大
- https://jpghd.com/
  - 黑白照片上色
- https://remover.zmo.ai/
  - 去水印

## ML

- [AaronFeng753/Waifu2x-Extension-GUI](https://github.com/AaronFeng753/Waifu2x-Extension-GUI)
  - 图片放大
