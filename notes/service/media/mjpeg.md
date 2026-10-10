---
title: MJPEG
tags:
  - Media
  - Video
  - JPEG
---

# MJPEG

- MJPEG / Motion JPEG / M-JPEG
  - 动态 JPEG：将视频的每一帧独立进行 JPEG 压缩，不依赖前后帧进行帧间预测。
  - 常见于 USB 摄像头、网络摄像头、嵌入式图传和实时预览。
  - 易于逐帧解码、抓拍和处理；相同视觉质量下，通常比采用帧间压缩的 H.264/H.265 占用更多带宽与存储。
- MJPEG 是视频编码方式，不是单一的容器格式或网络协议。
  - 可以封装在 AVI、MOV 等容器中，也可以通过 HTTP multipart 传输。
  - 不等同于使用 JPEG 2000 的 Motion JPEG 2000。
- 相关
  - [FFmpeg](./ffmpeg/README.md)
  - [Media Codec](./media-codec.md)

## 编码与封装

| 层次      | 示例                        | 说明                                             |
| --------- | --------------------------- | ------------------------------------------------ |
| 图像编码  | JPEG                        | 单帧压缩；分辨率、质量和色度采样影响画质与帧大小 |
| 视频编码  | MJPEG                       | 连续的 JPEG 编码帧，不进行帧间预测               |
| 文件容器  | AVI、MOV、Matroska          | 保存视频帧、时间信息，也可承载独立音轨           |
| 裸码流    | `.mjpg`、`.mjpeg`           | 连续 JPEG 帧，通常需要外部提供帧率等播放信息     |
| HTTP 传输 | `multipart/x-mixed-replace` | 一个持续的响应，每个 MIME part 承载一帧 JPEG     |

- 扩展名不能可靠地区分裸 MJPEG 与 multipart MJPEG，应检查内容、HTTP 响应头或使用 `ffprobe`。
- MJPEG 编码本身不包含音频；文件可以由容器复用音轨，常见的 HTTP MJPEG 图像流没有音轨。
- 不依赖参考帧意味着可以独立处理某一帧，不意味着任意设备输出都能直接保存为完整 JPEG 文件。
  - 部分设备或封装变体会省略解码表，需要兼容的解码器或补齐表后才能作为普通 JPEG 使用。

## 带宽与延迟

```text
码率 bit/s ≈ 平均 JPEG 帧大小 byte × 帧率 fps × 8
存储 byte ≈ 平均 JPEG 帧大小 byte × 帧率 fps × 时长 second
```

- 平均每帧 50 kB、20 fps，视频负载约为 8 Mbit/s，录制一小时约为 3.6 GB。
  - 按十进制单位估算，不包含容器、HTTP、TLS 等开销。
  - 单帧大小随场景复杂度、噪声和 JPEG 质量变化，不是固定码率。
- 10 个独立观看连接可能需要约 80 Mbit/s 的服务器下行带宽，即使编码结果可以复用。
- MJPEG 不需要等待参考帧，适合简单低延迟预览，但端到端延迟仍受采集、编码、网络和缓冲影响。
  - HTTP 基于可靠有序传输；网络拥塞或重传可能让旧帧积压。
  - 实时预览应限制客户端发送队列，必要时丢弃尚未发送的旧帧；不要在发送到一半的 JPEG 中间截断换帧。
- 高分辨率、长时间录像或大量远程观看者通常更适合 H.264/H.265/AV1；交互式音视频还需考虑 WebRTC 等传输方案。

## HTTP MJPEG

客户端发起一次 GET，服务端保持响应并持续发送 JPEG part。`multipart/x-mixed-replace` 的 `boundary` 参数是必需项，每个新图像 part 替换之前显示的图像。

以下是关闭连接定界的 HTTP/1.1 响应示意；`N1`、`N2` 表示对应 JPEG 数据的实际字节数，方括号内容不是要发送的文本：

```text
HTTP/1.1 200 OK
Content-Type: multipart/x-mixed-replace; boundary=frame
Cache-Control: no-store
Connection: close

--frame
Content-Type: image/jpeg
Content-Length: N1

[JPEG frame 1 bytes]
--frame
Content-Type: image/jpeg
Content-Length: N2

[JPEG frame 2 bytes]
--frame--
```

- 报文头、part 头和 boundary 行使用 CRLF，即 `\r\n`；头与正文间用空行分隔。
- 声明 `boundary=frame` 时，分隔行是 `--frame`；结束分隔行是 `--frame--`。
  - 前缀的两个 `-` 是分隔符语法，不是此例 boundary 参数值的一部分。
  - boundary 必须避免与 part 正文中的分隔行冲突，实际服务可使用足够长的随机值。
- 每帧发送原始 JPEG 二进制，不需要 Base64 或 `data:image/jpeg` 前缀。
- 每个 part 的 `Content-Length` 表示 JPEG 正文长度，不包含 part 头、CRLF 和 boundary。
  - RFC 2046 不要求这个字段；实际摄像头与客户端的兼容性要求可能不同，发送时建议提供准确长度。
- 不为无限图像流填写整个 HTTP 响应的固定 `Content-Length`。
  - 上例通过最终关闭连接结束响应；使用 HTTP chunked 或 HTTP/2 时，外层分帧由 HTTP 实现处理。
  - HTTP chunk、TCP 读取结果与 JPEG 帧不是一一对应关系，解析器需要跨读取缓冲并识别 MIME part。
- 连续直播过程中不发送结束分隔行；正常结束时再发送并关闭响应。

### 浏览器预览

```html
<img src="/camera/stream.mjpg" alt="摄像头实时画面" width="640" height="480" />
```

- 使用 `<img>` 消费 multipart 图像响应，不要直接当作 `<video>` 支持的视频资源。
- 不提供普通视频播放器的音轨、进度条、倍速和 seek 能力。
- 跨域显示图像与 JavaScript 读取像素不是同一权限；绘制到 Canvas 后读取或导出需满足同源/CORS 条件。
- HTTPS 页面还需检查混合内容、CSP `img-src` 和浏览器网络访问策略。
- `<img>` 不能像 `fetch` 一样任意设置 Authorization 请求头；需要鉴权时可使用同源会话和受控代理，避免在 URL 中放长期凭据。

## FFmpeg

| 参数                  | 用途                                                     |
| --------------------- | -------------------------------------------------------- |
| `-c:v mjpeg`          | 使用 MJPEG 视频编码器                                    |
| `-c:v copy`           | 复制已有压缩帧，不重新编码，也不能同时缩放或应用视频滤镜 |
| `-f mjpeg`            | 裸 MJPEG 码流                                            |
| `-f mpjpeg`           | MIME multipart JPEG 格式                                 |
| `-q:v 5`              | MJPEG 编码质量示例，通常数值越小质量越高、输出越大       |
| `-boundary_tag frame` | `mpjpeg` 输出的 boundary 参数值，不包含分隔符前缀        |

### 播放与抓拍

```bash
# 查看流信息；持续流限制读取等待时间为 5 秒
ffprobe -rw_timeout 5000000 -show_streams 'http://camera.example/stream.mjpg'

# 播放 HTTP MJPEG
ffplay 'http://camera.example/stream.mjpg'

# 抓取一帧，写入普通 JPEG 图片
ffmpeg -i 'http://camera.example/stream.mjpg' -frames:v 1 snapshot.jpg
```

### 编码与封装

```bash
# 转为 10 fps 的 MJPEG 视频，使用 AVI 容器，不保留音频
ffmpeg -i input.mp4 -an -vf 'fps=10,scale=640:-2' \
  -c:v mjpeg -q:v 5 output.avi

# 输出裸 MJPEG；播放时显式指定帧率
ffmpeg -i output.avi -an -c:v copy -f mjpeg output.mjpeg
ffplay -f mjpeg -framerate 10 output.mjpeg

# 生成 multipart 响应体，由 HTTP 服务负责发送响应头和控制发送节奏
ffmpeg -i output.avi -an -c:v copy \
  -f mpjpeg -boundary_tag frame output.multipart
```

- `mpjpeg` muxer 生成 MIME 响应体，不等于启动 HTTP 服务。
- HTTP 服务使用 `boundary=frame` 时，必须与输出的 `-boundary_tag frame` 一致；FFmpeg 当前默认值为 `ffmpeg`。
- 裸 MJPEG 和常见 multipart 流没有统一的逐帧呈现时间戳；录像或转封装时应核对输入帧率与时间戳来源，避免快放、慢放或累计漂移。

### Linux 摄像头

需要 FFmpeg 的 V4L2 输入支持，且设备提供对应的 MJPEG 分辨率与帧率组合。

```bash
# 列出设备支持的格式与尺寸
ffmpeg -f v4l2 -list_formats all -i /dev/video0

# 直接保存摄像头编码的 MJPEG，录制 10 秒，不重新编码
ffmpeg -f v4l2 -input_format mjpeg \
  -video_size 1280x720 -framerate 30 -i /dev/video0 \
  -t 10 -an -c:v copy capture.mkv
```

`-input_format mjpeg` 选择设备输出格式，`-c:v mjpeg` 选择 FFmpeg 输出编码器，两者作用不同。设备直接输出压缩帧可减少 USB 传输量，并避免主机重复进行 JPEG 编码。

## Nginx 反向代理

以下片段放在 `server` 内，上游假设为本机的 MJPEG 服务：

```nginx
location /camera/ {
    proxy_pass http://127.0.0.1:8080/;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 60s;
}
```

- `/camera/stream.mjpg` 会转发到上游 `/stream.mjpg`。
- `proxy_buffering off` 禁用响应缓冲，减少帧被攒批转发的问题；`proxy_request_buffering` 控制的是请求体，不是此处的图像响应。
- 上游也可用响应头 `X-Accel-Buffering: no` 控制 Nginx 缓冲，前提是代理没有忽略该头。
- `proxy_read_timeout` 是相邻两次上游读取之间的超时，不是整个直播连接的最长时长。
- CDN、其他代理和应用自身也可能缓冲或限制响应时长，需要逐层检查。

# FAQ

## 只有第一帧或画面一直转圈

- 检查外层 `Content-Type` 是否为 `multipart/x-mixed-replace`，以及 boundary 是否匹配。
- 检查 CRLF、part 头后的空行和 JPEG 正文长度，确认没有把二进制当文本或 Base64 发送。
- 外层 `image/jpeg` 只表示单张图片；拼接多张 JPEG 不会自动变为浏览器可播放的 multipart 流。
- 用 FFmpeg 播放成功不代表 MIME 格式严格正确，其 `mpjpeg` demuxer 默认会宽松处理 boundary；可用 `-strict_mime_boundary 1` 辅助检查。

## 延迟越来越大

- 对比直连和代理访问，检查服务端 flush、响应缓冲和客户端读取速度。
- 监控发送队列；带宽不足时降低分辨率、帧率或 JPEG 质量，而不是无限缓存待发送帧。
- 多人观看时尽量复用采集和编码结果，但仍需按客户端数量估算下行带宽。

## 长时间请求处于 Pending

- 持续发送的 MJPEG 响应不会像普通图片请求一样很快结束，Pending 本身不代表异常。
- 应观察是否持续收到新 part、画面是否更新，而不是等待整个响应下载完成。

## 参考

- [IANA: multipart/x-mixed-replace](https://www.iana.org/assignments/media-types/multipart/x-mixed-replace)
- [RFC 2046: Multipart Media Type](https://www.rfc-editor.org/rfc/rfc2046.html#section-5.1)
- [HTML Standard: Images](https://html.spec.whatwg.org/multipage/images.html)
- [FFmpeg Formats: mpjpeg](https://ffmpeg.org/ffmpeg-formats.html#mpjpeg)
- [FFmpeg Devices: video4linux2](https://ffmpeg.org/ffmpeg-devices.html#video4linux2_002c-v4l2)
- [FFmpeg Protocols](https://ffmpeg.org/ffmpeg-protocols.html)
- [FFmpeg multipart JPEG muxer 实现](https://ffmpeg.org/doxygen/trunk/mpjpeg_8c_source.html)
- [Nginx HTTP Proxy Module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
