---
title: imgproxy
---

# imgproxy

- [imgproxy/imgproxy](https://github.com/imgproxy/imgproxy)
  - MIT, Go
  - JPEG, PNG, WebP, AVIF, GIF, SVG, ICO, HEIC, BMP, TIFF, and animated GIF and WebP
  - Pro
    - PDF, MP4/H264
    - PDF, MP4, GIF -> MP4, Video thumbnail
    - 指定 resize 算法 linear, cubic, Lanczos3
    - 填充半透明背景
    - 图像调整 - brightness, contrast, saturation
    - resize 去锐化
    - SVG 注入 CSS
    - pipeline 处理
    - 自定义水印
    - 高级 JPEG 优化
    - SVG 最小化
    - URL 传递优化参数
    - 对象检测 - 更智能的裁剪
    - SSIM 质量评测
    - 获取图像信息
- 参考
  - HELM https://helm.imgproxy.net/

:::caution

- imgproxy 不支持缓存 - 使用网关缓存
  - next/image 默认会缓存
  - 推荐 varnish
  - [NGINX Caching](https://www.nginx.com/blog/nginx-caching-guide/)
  - [HAProxy Caching](https://www.haproxy.com/blog/accelerate-your-apis-by-using-the-haproxy-cache/)
    - 不推荐

:::

```bash
docker run --rm -it \
  -e IMGPROXY_ENABLE_WEBP_DETECTION=true \
  -e IMGPROXY_ENABLE_AVIF_DETECTION=true \
  -e IMGPROXY_USE_ETAG=true \
  -e IMGPROXY_CACHE_CONTROL_PASSTHROUGH=true \
  -e IMGPROXY_ENABLE_CLIENT_HINTS=true \
  -p 8080:8080 \
  --name imgproxy darthsim/imgproxy
```

```
/{signature}/{processing_options}/plain/{source_url}@{extension}
/{signature}/{processing_options}/{encoded_source_url}.{extension}

/insecure/pr:sharp/w:500/plain/http://example.com/images/curiosity.jpg
```

- signature - 用于避免外部修改参数
  - base64(hmac(key,salt+path))
  - 如果没设置，可以用 insecure
- processing_options
  - %option_name:%argument1:%argument2:...:argumentN
- encoded_source_url=base64(url)
  - 可以分 segment

| option                |                                                | default  |
| --------------------- | ---------------------------------------------- | -------- | ------------------------------------------ |
| resize,rs             | %resizing_type:%width:%height:%enlarge:%extend |
| size,s                | %width:%height:%enlarge:%extend                |
| resizing_type,rt      | %resizing_type                                 | fit      | fit,fill,fill-down,force,auto              |
| resizing_algorithm,ra | %algorithm                                     | lanczos3 | nearest, linear, cubic, lanczos2, lanczos3 |
| zoom,z                |
| dpr                   |
| enlarge,el            |
| extend,ex             | %extend:%gravity                               |

- {min}-{width,height}
- https://docs.imgproxy.net/generating_the_url

| env                                       |
| ----------------------------------------- | ------------------------ | ----- |
| IMGPROXY_KEY                              | hex(key)                 |
| IMGPROXY_SALT                             | hex(salt)                |
| IMGPROXY_SIGNATURE_SIZE                   | 32                       |
| IMGPROXY_READ_TIMEOUT                     | 10                       |
| IMGPROXY_WRITE_TIMEOUT                    | 10                       |
| IMGPROXY_KEEP_ALIVE_TIMEOUT               | 10                       |
| IMGPROXY_DOWNLOAD_TIMEOUT                 | 5                        |
| IMGPROXY_CONCURRENCY                      | nprc\*2                  |
| IMGPROXY_MAX_CLIENTS                      | IMGPROXY_CONCURRENCY\*10 |
| IMGPROXY_TTL                              | 3600                     |
| IMGPROXY_CACHE_CONTROL_PASSTHROUGH        | false                    |
| IMGPROXY_USE_ETAG                         | false                    |
| IMGPROXY_ENABLE_DEBUG_HEADERS             | false                    |
| IMGPROXY_MAX_SRC_RESOLUTION               | 16.8                     |
| IMGPROXY_MAX_SRC_FILE_SIZE                | 0                        |
| IMGPROXY_MAX_ANIMATION_FRAMES             | 1                        |
| IMGPROXY_MAX_SVG_CHECK_BYTES              | 32768                    |
| IMGPROXY_MAX_REDIRECTS                    |
| IMGPROXY_SECRET                           |
| IMGPROXY_ALLOW_ORIGIN                     |
| IMGPROXY_ALLOWED_SOURCES                  |
| IMGPROXY_SANITIZE_SVG                     | true                     |
| IMGPROXY_IGNORE_SSL_VERIFICATION          | false                    |
| IMGPROXY_DEVELOPMENT_ERRORS_MODE          | false                    |
| IMGPROXY_COOKIE_PASSTHROUGH               | false                    |
| IMGPROXY_COOKIE_BASE_URL                  |
| IMGPROXY_QUALITY                          | 80                       |
| IMGPROXY_FORMAT_QUALITY                   | avif=50                  |
| IMGPROXY_JPEG_PROGRESSIVE                 | false                    |
| IMGPROXY_PNG_INTERLACED                   | false                    |
| IMGPROXY_PNG_QUANTIZE                     | false                    |
| IMGPROXY_PNG_QUANTIZATION_COLORS          | 256                      | 2-256 |
| IMGPROXY_AVIF_SPEED                       | 5                        | 0-6   |
| IMGPROXY_ENABLE_WEBP_DETECTION            |
| IMGPROXY_ENFORCE_WEBP                     |
| IMGPROXY_ENABLE_AVIF_DETECTION            |
| IMGPROXY_ENFORCE_AVIF                     |
| IMGPROXY_ENABLE_CLIENT_HINTS              | false                    |
| `IMGPROXY_WATERMARK_{DATA,PATH,URL}`      |
| IMGPROXY_WATERMARK_OPACITY                |
| `IMGPROXY_FALLBACK_IMAGE_{DATA,PATH,URL}` |
| IMGPROXY_FALLBACK_IMAGE_HTTP_CODE         | 200                      |
| IMGPROXY_FALLBACK_IMAGE_TTL               | IMGPROXY_TTL             |
| IMGPROXY_SKIP_PROCESSING_FORMATS          |
| IMGPROXY_PRESETS                          |
| IMGPROXY_ONLY_PRESETS                     |
| IMGPROXY_LOCAL_FILESYSTEM_ROOT            |
| IMGPROXY_USE_S3                           |
| IMGPROXY_S3_ENDPOINT                      |
| IMGPROXY_PROMETHEUS_BIND                  |
| IMGPROXY_PROMETHEUS_NAMESPACE             |
| IMGPROXY_RETURN_ATTACHMENT                | false                    |
| IMGPROXY_AUTO_ROTATE                      | true                     |
| IMGPROXY_STRIP_COLOR_PROFILE              | true                     |
| IMGPROXY_KEEP_COPYRIGHT                   | true                     |
| IMGPROXY_STRIP_METADATA                   | true                     |

- 推荐
  - IMGPROXY_ENABLE_WEBP_DETECTION=true
  - IMGPROXY_ENABLE_AVIF_DETECTION=true
  - IMGPROXY_USE_ETAG=true
  - IMGPROXY_CACHE_CONTROL_PASSTHROUGH=true
    - 使用源图片的缓存头信息
  - IMGPROXY_ENABLE_CLIENT_HINTS
- IMGPROXY_ENABLE_CLIENT_HINTS
  - 使用 Width, Viewport-Width, DPR 头检测宽度
  - [Automating resource selection with client hints](https://developer.chrome.com/blog/automating-resource-selection-with-client-hints/)
  - DPR -> device pixel ratio
  - CH -> Client Hints
  - mdn [Accept-CH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-CH)

```html
<!-- Chrome 46+ -->
<meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
```

- IMGPROXY_ETAG_BUSTER - 修改后所有 ETag 发生变化
- IMGPROXY_ENABLE_DEBUG_HEADERS=true
  - X-Origin-Content-Length
  - X-Origin-Width
  - X-Origin-Height
  - X-Result-Width
  - X-Result-Height
- IMGPROXY_MAX_SRC_RESOLUTION - 最大像素 - 单位百万
- IMGPROXY_MAX_SRC_FILE_SIZE - 最大源文件 - 单位 字节
- IMGPROXY_MAX_ANIMATION_FRAMES - 处理的动画帧数
- IMGPROXY_SECRET - 要求客户端带 Authorization

## next.js

- https://github.com/BitPatty/next-image-s3-imgproxy-loader
- https://jamesku.cc/blog/imgproxy
