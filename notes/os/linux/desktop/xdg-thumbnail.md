---
title: FreeDesktop Thumbnail
---

# FreeDesktop Thumbnail

- https://specifications.freedesktop.org/thumbnail-spec/thumbnail-spec-latest.html
- `$XDG_CACHE_HOME/thumbnails/`
  - normal/ - 128x128
    - $MD5.png
  - large/ - 256x256
  - x-large/ - 512x512
  - xx-large/ - 1024x1024
  - fail/
- `$HOME/.cache/thumbnails`
- .sh_thumbnails/ - 临近原始文件存储的方式 - 例如 可移动设备
- dir mod 600, png mod 700
- 文件名使用 MD5 hash - 128bit, 32char
  - 文件名为完整 URI - 例如 file:///home/wener/photos/me.png
    - 方便支持外部 - 例如 samba, http, ftp, WebDAV
- PNG, 8bit, non-interlaced, full alpha
- PNG 可存储任意文本 - https://www.w3.org/TR/PNG/#11tEXt
  - 使用 KV 机制存储额外信息
  - 建议包含文件大小信息 - 避免再访问文件

| key                    | desc |
| ---------------------- | ---- |
| Thumb::URI             |
| Thumb::MTime           |
| Thumb::Size            |
| Thumb::Mimetype        |
| Description            |
| Software               |
| Thumb::Image::Width    |
| Thumb::Image::Height   |
| Thumb::Document::Pages |
| Thumb::Movie::Length   |
