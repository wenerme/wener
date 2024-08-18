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

## Metadata

- Audio/Music
  - [taglib/taglib](https://github.com/taglib/taglib)
    - https://taglib.org/
    - TagLib Audio Meta-Data Library
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

## Music Server

- [navidrome/navidrome](https://github.com/navidrome/navidrome)
  - GPLv3, Go
  - Modern Music Server and Streamer compatible with Subsonic/Airsonic
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
- [airsonic-advanced/airsonic-advanced](https://github.com/airsonic-advanced/airsonic-advanced)
  - GPL-3.0, Java
- [mpache/ampache](https://github.com/ampache/ampache)
  - PHP
- Icecast
  - Ogg Vorbis and MP3 streaming media server
- Gerbera
  - UPnP media server
- Subsonic
- Airsonic
- [ironsmile/euterpe](https://github.com/ironsmile/euterpe)
  - GPLv3, Go

## Media Server

- [jellyfin](./server/jellyfin.md)
  - C#
  - fork of Emby
  - 🌟 推荐 - 简单易用，开发活跃
- [advplyr/audiobookshelf](https://github.com/advplyr/audiobookshelf)
  - GPLv3, JS, Vue
- [Radarr/Radarr](https://github.com/Radarr/Radarr)
  - GPLv3, C#
  - fork of Sonarr
- [Red5/red5-server](https://github.com/Red5/red5-server)
  - Apache-2.0, Java
- [ant-media/Ant-Media-Server](https://github.com/ant-media/Ant-Media-Server)
  - GPL-3.0, Java
    - Red5 fork
- [midarrlabs/midarr-server](https://github.com/midarrlabs/midarr-server)
  - MIT, Elixir
- [Wizarrrr/wizarr](https://github.com/Wizarrrr/wizarr)
  - user invitation and management system for Jellyfin, Plex, Emby
- [causefx/Organizr](https://github.com/causefx/Organizr)
- [streamaserver/streama](https://github.com/streamaserver/streama)
- [Kareadita/Kavita](https://github.com/Kareadita/Kavita)
  - 漫画

## Video Server

- [ossrs/srs](https://github.com/ossrs/srs)
  - MIT, C++
  - RTMP, WebRTC, SRT, GB28181, HLS, HTTP-FLV
- [illuspas/Node-Media-Server](https://github.com/illuspas/Node-Media-Server)
- [bluenviron/mediamtx](https://github.com/bluenviron/mediamtx)

## Streaming

- Web/Client
  - [xqq/mpegts.js](https://github.com/xqq/mpegts.js)
    - Apache-2.0, JS, TS
    - HTML5 MPEG2-TS / FLV Stream Player
  - ~~[bilibili/flv.js](https://github.com/bilibili/flv.js)~~
    - Apache-2.0, JS
  - [mediaelement/mediaelement](https://github.com/mediaelement/mediaelement)
    - HTML5 audio, video
    - 支持 MP4, WebM, MP3
    - 支持 HLS, Dash, YouTube, Facebook, SoundCloud
    - http://www.mediaelementjs.com/

## Library

- [ffmpegwasm/ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [livekit/livekit](https://github.com/livekit/livekit)
  - Golang

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

- amr - Adaptive Multi-Rate
  - 专为语音编码设计的压缩格式
  - 用于移动电话和语音
    - 能够根据网络条件和通话质量自适应地调整编码速率
    - 保持相对较低的数据传输速率的同时，最大限度地提高语音质量。
  - AMR-NB（Narrowband）
  - AMR-WB（Wideband）
  - 3GPP标准化
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
- Low-Bitrate
  - [TSAC](https://bellard.org/tsac/)
    - Very Low Bitrate Audio Compression
  - [google/lyra](https://github.com/google/lyra)
    - Apache-2.0, C++
    - Very Low-Bitrate Codec for Speech
  - [MLow: Meta’s low bitrate audio codec](https://engineering.fb.com/2024/06/13/web/mlow-metas-low-bitrate-audio-codec/)

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
  - [thumbor/thumbor](https://github.com/thumbor/thumbor)
    - MIT, Python
    - photo thumbnail service
  - [imgproxy](./server/imgproxy.md)
    - MIT, Go
    - JPEG, PNG, WebP, AVIF, GIF, SVG, ICO, HEIC, BMP, TIFF, and animated GIF and WebP
  - [cshum/imagor](https://github.com/cshum/imagor)
    - Apache-2.0, Go
    - jpeg, png, gif, webp, tiff, avif, jp2, pdf
  - [cactus/go-camo](https://github.com/cactus/go-camo)
    - MIT, Go
  - [joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder)
    - 生成 blur dataURL
    - [strapi-plugin-placeholder](https://market.strapi.io/plugins/strapi-plugin-placeholder)
  - [thoas/picfit](https://github.com/thoas/picfit)
    resizing server
    - 开发停滞
  - [cshum/imagorvideo](https://github.com/cshum/imagorvideo)
    - Apache-2.0, Go
    - video thumbnail
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

## Awesome

- [CoderLine/alphaTab](https://github.com/CoderLine/alphaTab)
  - MPL-2.0, TS
  - cross platform music notation and guitar tablature rendering
