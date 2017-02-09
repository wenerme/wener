# FFMpeg

* [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg)

* 库
  * libavcodec 提供大量的编码实现
  * libavformat 实现流体协议,容器格式和基本的 IO 访问
  * libavutil 提供哈希, 解压等其他辅助工具
  * libavfilter 提供一系列过滤器用于修改编码的视频音频
  * libavdevice 提供设备捕捉和重播的访问抽象
  * libswresample 实现音频混合和重新取样
  * libswscale 实现颜色转换和缩放
* 工具
  * ffmpeg 命令行工具用于操作转换和流媒内容
  * ffplay 多媒体播放器
  * ffprobe 多媒体内容分析工具
  * ffserver 多媒体流体服务器用于实时广播
  * 其他的一些小工具例如 aviocat, ismindex 和 qt-faststart 等


## ffserver

* [ffserver](https://ffmpeg.org/ffserver.html)
* [ffserver-all](https://ffmpeg.org/ffserver-all.html)

```bash

# 启动流媒服务器
ffserver -f ffserver.conf
```

## Tips

* 常用参数
  * `-r 17` 修改帧率
  * `-an` 移除所有音频, `-vn` 同理
  * `-acodec copy` 直接复制内容,用户修改容器格式时, `-acodec copy` 同理
  * `-s 324x576` 修改大小
  * `-vcodec h264 -profile:v high -level 4.2`
    * iOS iPhone 5s 后兼容的最高 h264 压缩 [来源](https://trac.ffmpeg.org/wiki/Encode/H.264#iOS)
    * 查看 h264 相关信息 `ffmpeg -h encoder=libx264`
  * `-movflags +faststart`
    * 将部分信息添加到开头,以保证在 web 中未下载完成时也能播放
  * `-c:v libx265 -preset medium`
    * h265 压缩更好,但是目前设备支持有限
    * `-x265-params` 查看可行参数


```bash
# 查看支持的像素格式
ffmpeg -pix_fmts
# 查看编码选项
ffmpeg -h encoder=libvpx

# 视频捕捉
#   https://trac.ffmpeg.org/wiki/Capture/Webcam
#   https://trac.ffmpeg.org/wiki/Capture/Desktop
# 查看可使用设备和捕捉
# Windows
# vfwcap 已经被替换为 dshow
ffmpeg -y -f dshow -i list
ffmpeg -y -f dshow -r 25 -i 0 out.mp4
ffmpeg -f dshow -list_devices true -i dummy
ffmpeg -f dshow -list_optione true -i dummy

# Linux
# video4linux2 可简写为 v4l2
# 可使用 x11grab 抓取桌面
ffmpeg -f v4l2 -list_formats all -i /dev/video0
ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 output.mkv
# 也可以使用 v4l2 来查看
v4l2-ctl --list-devices
# 查看可控制的参数, 对比度,焦点,缩放等
v4l2-ctl -L
# 修改参数
v4l2-ctl -c <option>=<value>

# OS X
# 主要使用 avfoundation 来操作
ffmpeg -f avfoundation -list_devices true -i ""
ffmpeg -f avfoundation -i "" out.mpg
# 输入设备也可以指定 default,或名字例如 "Integrated" 或者设备索引例如 0
ffmpeg -f avfoundation -i "default" out.mpg
ffmpeg -f avfoundation -i "Integrated" out.mpg
ffmpeg -f avfoundation -i "2" out.mpg
ffmpeg -f avfoundation -video_device_index 2 -i "default" out.mpg
# ffmpeg -f avfoundation -i "<screen device index>:<audio device index>" out.mov
# 在 OS X 中可查看屏幕尺寸 system_profiler SPDisplaysDataType |grep Resolution
# 使用空白的音频,修改像素格式
ffmpeg -f avfoundation -pixel_format bgr0 -s 640x480 -r 30 -i "default:none" out.avi
# 无损捕捉
#   -qp 0 使用 x264 无损模式
#   -preset ultrafast 使用快速模式
ffmpeg -video_size 1920x1080 -framerate 30 -f avfoundation -video_device_index 1 -i "default" -c:v libx264 -qp 0 -preset ultrafast capture.mkv
# 上述快速无损捕捉后,可对其进行慢速的无损压缩,减少视频文件尺寸
ffmpeg -i capture.mkv -c:v libx264 -qp 0 -preset veryslow capture_smaller.mkv
# 同时也录制麦克风的声音
ffmpeg -video_size 1280x720 -framerate 30 -f avfoundation -i "0:0" -c:v libx264 -qp 0 -preset ultrafast -c:a aac  capture.mkv


# 音频视频合并
# 将音频重新编码为 aac
ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -strict experimental output.mp4
# 不对其进行编码
ffmpeg -i video.mp4 -i audio.wav -c copy output.mkv
# 替换音频流
ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 output.mp4


# Streaming
# http://trac.ffmpeg.org/wiki/StreamingGuide
```


__VP9 Live__

http://wiki.webmproject.org/adaptive-streaming/instructions-to-do-webm-live-streaming-via-dash

```bash
# 创建直播内容

VP9_LIVE_PARAMS="-speed 6 -tile-columns 4 -frame-parallel 1 -threads 8 -static-thresh 0 -max-intra-rate 300 -deadline realtime -lag-in-frames 0 -error-resilient 1"

# Linux
ffmpeg \
  -f v4l2 -input_format mjpeg -r 30 -s 1280x720 -i /dev/video0 \
  -f alsa -ar 44100 -ac 2 -i hw:2 \
  -map 0:0 \
  -pix_fmt yuv420p \
  -c:v libvpx-vp9 \
    -s 1280x720 -keyint_min 60 -g 60 ${VP9_LIVE_PARAMS} \
    -b:v 3000k \
  -f webm_chunk \
    -header "./glass_360.hdr" \
    -chunk_start_index 1 \
  ./glass_360_%d.chk \
  -map 1:0 \
  -c:a libvorbis \
    -b:a 128k -ar 44100 \
  -f webm_chunk \
    -audio_chunk_duration 2000 \
    -header ./glass_171.hdr \
    -chunk_start_index 1 \
  ./glass_171_%d.chk

# OS X
ffmpeg \
  -r 30 -s 1280x720 -ar 44100 -ac 2  -f avfoundation -i "2:0" -c:v mjpeg \
  -map 0:0 \
  -pix_fmt yuv420p \
  -c:v libvpx-vp9 \
    -s 1280x720 -keyint_min 60 -g 60 ${VP9_LIVE_PARAMS} \
    -b:v 3000k \
  -f webm_chunk \
    -header "./glass_360.hdr" \
    -chunk_start_index 1 \
  ./glass_360_%d.chk \
  -map 1:0 \
  -c:a libvorbis \
    -b:a 128k -ar 44100 \
  -f webm_chunk \
    -audio_chunk_duration 2000 \
    -header ./glass_171.hdr \
    -chunk_start_index 1 \
  ./glass_171_%d.chk

# 创建 DASH
ffmpeg \
  -f webm_dash_manifest -live 1 \
  -i ./glass_360.hdr \
  -f webm_dash_manifest -live 1 \
  -i ./glass_171.hdr \
  -c copy \
  -map 0 -map 1 \
  -f webm_dash_manifest -live 1 \
    -adaptation_sets "id=0,streams=0 id=1,streams=1" \
    -chunk_start_index 1 \
    -chunk_duration_ms 2000 \
    -time_shift_buffer_depth 7200 \
    -minimum_update_period 7200 \
  ./glass_live_manifest.mpd
```

### RTSP
```bash
ffmpeg -i space.mp4 -vcodec libx264 -tune zerolatency -crf 18 http://localhost:1234/feed1.ff
```

__ffserver.conf__
```
HTTPPort 1234
RTSPPort 1235

<Feed feed1.ffm>
        File /tmp/feed1.ffm
        FileMaxSize 2M
        ACL allow 127.0.0.1
</Feed>

<Stream test1.sdp>
    Feed feed1.ffm
    Format rtp
    Noaudio
    VideoCodec libx264
    AVOptionVideo flags +global_header
    AVOptionVideo me_range 16
    AVOptionVideo qdiff 4
    AVOptionVideo qmin 10
    AVOptionVideo qmax 51
    ACL allow 192.168.0.0 192.168.255.255
</Stream>
```

```bash
mpv rtsp://192.168.0.xxx:1235/test1.sdp
```



### ff* 通用选项

```
-L Show license.
-h, -?, -help, --help [long|full] [decoder|encoder|demuxer|muxer|filter]=name
  long 显示高级选项
  full 显示完整的选项列表包括公共的和私有的
-version Show version.

-formats,-devices,-codecs,-protocols,-filters,-pix_fmts,-sample_fmts,-layouts,-colors,-decoders,-encoders,-bsfs
  显示所有支持的格式,设备,编码,协议,过滤器,香色格式,颜色名字等...
  bsfs Show available bitstream filters.
  codes 更明确地说是 media bitstream format

```

### 视频尺寸和缩写

缩写 | 尺寸
----|----
ntsc | 720x480
pal | 720x576
qntsc | 352x240
qpal | 352x288
sntsc | 640x480
spal | 768x576
film | 352x240
ntsc-film | 352x240
sqcif | 128x96
qcif | 176x144
cif | 352x288
4cif | 704x576
16cif | 1408x1152
qqvga | 160x120
qvga | 320x240
vga | 640x480
svga | 800x600
xga | 1024x768
uxga | 1600x1200
qxga | 2048x1536
sxga | 1280x1024
qsxga | 2560x2048
hsxga | 5120x4096
wvga | 852x480
wxga | 1366x768
wsxga | 1600x1024
wuxga | 1920x1200
woxga | 2560x1600
wqsxga | 3200x2048
wquxga | 3840x2400
whsxga | 6400x4096
whuxga | 7680x4800
cga | 320x200
ega | 640x350
hd480 | 852x480
hd720 | 1280x720
hd1080 | 1920x1080
2k | 2048x1080
2kflat | 1998x1080
2kscope | 2048x858
4k | 4096x2160
4kflat | 3996x2160
4kscope | 4096x1716
nhd | 640x360
hqvga | 240x160
wqvga | 400x240
fwqvga | 432x240
hvga | 480x320
qhd | 960x540
2kdci | 2048x1080
4kdci | 4096x2160
uhd2160 | 3840x2160
uhd4320 | 7680x4320

### 视频速率和缩写

缩写 | 速率
----|----
ntsc | 30000/1001
pal | 25/1
qntsc | 30000/1001
qpal | 25/1
sntsc | 30000/1001
spal | 25/1
film | 24/1
ntsc-film | 24000/1001

## FAQ

### Invalid frame dimensions 0x0
出现这样的错误时,不必关心,一会儿过后就能正常播放了.

### tbr tbn tbc

FFMpeg 会使用三种不同的时间戳来做不同的工作.

* tbr
  * tbr is guessed from the video stream and is the value users want to see when they look for the video frame rate
  * 代表帧率,和 demuxer 相关
* tbn
  * the time base in AVStream that has come from the container  
  * 代表文件层(st)的时间精度，即1S=1200k，和duration相关；
* tbc
  * the time base in AVCodecContext for the codec used for a particular stream
  * tbc代表视频层(st->codec)的时间精度，即1S=50，和strem->duration和时间戳相关。

例如: `25 tbr 90k tbn 50 tbc`

当这几个值无法检测到时,其值可能为 `1000k tbr, 1000k tbn, 1000k tbc`

## Reference

https://trac.ffmpeg.org/wiki/EncodingForStreamingSites
https://trac.ffmpeg.org/wiki/Encode/AAC
