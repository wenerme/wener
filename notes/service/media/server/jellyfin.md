---
title: Jellyfin
---

# Jellyfin

- [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) 是什么？
  - GPL, C#
  - 开源媒体系统
  - 类似 Plex 但更开放

:::info

- 不支持外部音轨 [#177](https://features.jellyfin.org/posts/177)
- 字幕加载延迟导致不同步 [#2547](https://github.com/jellyfin/jellyfin/issues/2547)
- [Support for OIDC](https://features.jellyfin.org/posts/230/support-for-oidc)
  - [#530](https://github.com/jellyfin/jellyfin/issues/530)
  - https://github.com/9p4/jellyfin-plugin-sso

:::

```bash
docker pull jellyfin/jellyfin:latest
mkdir -p $PWD/jellyfin/{config,cache}
# --net=host
docker run --rm -it \
  -v $PWD/jellyfin/config:/config \
  -v $PWD/jellyfin/cache:/cache \
  -v $PWD/media:/media \
  -p 8096:8096 \
  -e TZ=Asia/Shanghai \
  --name jellyfin jellyfin/jellyfin:latest
```

- https://jellyfin.org/docs/general/administration/configuration.html#data-directory

## Notes

- endpoint
  - /web/index.html
  - /socket
  - /health
  - /metrics
    - /etc/jellyfin/system.xml
      - `<EnableMetrics>true</EnableMetrics>`

## Conf

- /usr/share/jellyfin/web/config.json
- Docker
  - /jellyfin/jellyfin-web/config.json
- Google Chromecast
  - plugins/chromecastPlayer/plugin
- YouTube Trailers
  - plugins/youtubePlayer/plugin
- [Configuration](https://jellyfin.org/docs/general/administration/configuration.html)

```json
{
  "menuLinks": [
    {
      "name": "Custom Link",
      "url": "https://jellyfin.org"
    },
    {
      "name": "Custom Link w. Custom Icon",
      "icon": "attach_money",
      "url": "https://demo.jellyfin.org/stable"
    }
  ]
}
```

## HW

- https://trac.ffmpeg.org/wiki/Hardware/QuickSync
- https://wiki.archlinux.org/title/Hardware_video_acceleration
- https://jellyfin.org/docs/general/administration/hardware-acceleration.html
- [intel/intel-device-plugins-for-kubernetes](https://github.com/intel/intel-device-plugins-for-kubernetes)

```bash
apk add pciutils
lspci -nn | egrep -i "3d|display|vga"

ls /dev/dri
# VA-API
# https://github.com/intel/libva-utils
# /dev/dri/renderXX

# AlpineLinux edge/testing libva-utils
vainfo

# X11
# ==========
# apk add vdpauinfo
# vdpauinfo
grep -iE 'vdpau | dri driver' /var/log/Xorg.0.log

# ffmpeg
ffmpeg -hwaccel vaapi -vaapi_device /dev/dri/renderD128 -i "video.MP4" -vf "select=eq(pict_type\,I)" -vsync vfr -qscale:v 2 -f image2 "%08d.jpg"
```

## Server

- Movies/
  - Film (1990).mp4
  - Film (2008)
    - Film.mkv
    - Film.default.srt
    - Film.default.en.forced.ass
    - Film.en.ac3
    - Film.English Commentary.en.mp3 - 区分 Title 和 语言
    - Film - Ulimited.mp4 - 多版本
    - sample.mp4 - 附加内容
    - theme.mp3
    - trailer.mp4
    - behind the scenes/ - 附加内容目录
    - deleted scenes/
    - interviews/
    - scenes/
    - samples/
    - shorts/
    - featurettes/
    - trailers/
    - extras/ - 所有其他内容
  - `Film (2010) [imdbid-tt0106145]`/ - 辅助识别
  - `Film (2018) [tmdbid-65567]`/
- Books/
  - Audiobooks/
    - Author/
      - flac,mp3
    - Book/
      - azw, azw3, cb7, cbr, cbt, cbz, epub, mobi, pdf
  - Books/
    - Author/
      - flac,mp3,epub...
      - Book/
        - Book.epub
        - cover.{png,jpg}
        - metadata.opf,content.opf
- Comics/
  - Attack on Titan #001 (2012).cbz
  - Comic (2008)
    - ComicInfo.xml
    - Comic #001 (2008).cbr

**Internet radio**

```m3u title="m3u"
#EXTINF:0,Radio Freccia
https://streamingv2.shoutcast.com/radiofreccia
```

# Version

## Jellyfin v10.8

- Hardware Acceleration - HWA 增强
- DLNA disabled by default
- 支持 mks, mka
- 增强检测 DVD/BD ISOs and folders
- 减少内存使用
