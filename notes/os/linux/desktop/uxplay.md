---
title: uxplay
---

# uxplay

- [FDH2/UxPlay](https://github.com/FDH2/UxPlay)
  - GPLv3, C
  - AirPlay Unix mirroring server
- 参考
  - [postlund/pyatv](https://github.com/postlund/pyatv)
    - client library for Apple TV and AirPla
  - https://nto.github.io/AirPlay.html
    - Unofficial AirPlay Protocol Specification
  - https://developer.apple.com/streaming/fps/
    - FairPlay DRM

:::caution

- 不支持 DRM
  - Netflix, AppleTV+ 不可用

:::

```bash
apk add git gcc g++ make cmake openssl-dev avahi-daemon avahi-dev gstreamer-dev gst-plugins-base-dev gst-libav gst-plugins-good libplist-dev

service avahi-daemon start

git clone https://github.com/FDH2/UxPlay
cd UxPlay
mkdir build
cd build
cmake ..
make
./uxplay --help

# 注意 需要在 X Session 的 terminal/环境 里启动 - 或者通过设置 env 应该也可以
# -vs 测试可用 glimagesink, ximagesink
#   xvimagesink 没有内容输出，但似乎被默认选择
#   ximagesink CPU 占用比 glimagesink 低得多, 支持 -fs
./uxplay -n "tv@living-room" -nh -fps 18 -fs -vs ximagesink
```

## misc

```bash
#
addgroup $USER audio
addgroup $USER video

apk add inxi
inxi -A # audio

apk add pavucontrol
# 注意选择输出设备
pavucontrol

# pa
apk add pulseaudio pulseaudio-alsa alsa-plugins-pulse
# apk add pulseaudio-utils pipewire wireplumber pipewire-pulse
```

## help

```
UxPlay 1.68: An open-source AirPlay mirroring server.
=========== Website: https://github.com/FDH2/UxPlay ==========
Usage: ./uxplay [-n name] [-s wxh] [-p [n]] [(other options)]
Options:
-n name   Specify the network name of the AirPlay server
-nh       Do not add "@hostname" at the end of AirPlay server name
-pin[xxxx]Use a 4-digit pin code to control client access (default: no)
          default pin is random: optionally use fixed pin xxxx
-reg [fn] Keep a register in $HOME/.uxplay.register to verify returning
          client pin-registration; (option: use file "fn" for this)
-vsync [x]Mirror mode: sync audio to video using timestamps (default)
          x is optional audio delay: millisecs, decimal, can be neg.
-vsync no Switch off audio/(server)video timestamp synchronization
-async [x]Audio-Only mode: sync audio to client video (default: no)
-async no Switch off audio/(client)video timestamp synchronization
-db l[:h] Set minimum volume attenuation to l dB (decibels, negative);
          optional: set maximum to h dB (+ or -) default: -30.0:0.0 dB
-taper    Use a "tapered" AirPlay volume-control profile
-s wxh[@r]Set display resolution [refresh_rate] default 1920x1080[@60]
-o        Set display "overscanned" mode on (not usually needed)
-fs       Full-screen (only works with X11, Wayland and VAAPI)
-p        Use legacy ports UDP 6000:6001:7011 TCP 7000:7001:7100
-p n      Use TCP and UDP ports n,n+1,n+2. range 1024-65535
          use "-p n1,n2,n3" to set each port, "n1,n2" for n3 = n2+1
          "-p tcp n" or "-p udp n" sets TCP or UDP ports separately
-avdec    Force software h264 video decoding with libav decoder
-vp ...   Choose the GSteamer h264 parser: default "h264parse"
-vd ...   Choose the GStreamer h264 decoder; default "decodebin"
          choices: (software) avdec_h264; (hardware) v4l2h264dec,
          nvdec, nvh264dec, vaapih64dec, vtdec,etc.
          choices: avdec_h264,vaapih264dec,nvdec,nvh264dec,v4l2h264dec
-vc ...   Choose the GStreamer videoconverter; default "videoconvert"
          another choice when using v4l2h264dec: v4l2convert
-vs ...   Choose the GStreamer videosink; default "autovideosink"
          some choices: ximagesink,xvimagesink,vaapisink,glimagesink,
          gtksink,waylandsink,osxvideosink,kmssink,d3d11videosink etc.
-vs 0     Streamed audio only, with no video display window
-v4l2     Use Video4Linux2 for GPU hardware h264 decoding
-bt709    Sometimes needed for Raspberry Pi with GStreamer < 1.22
-as ...   Choose the GStreamer audiosink; default "autoaudiosink"
          some choices:pulsesink,alsasink,pipewiresink,jackaudiosink,
          osssink,oss4sink,osxaudiosink,wasapisink,directsoundsink.
-as 0     (or -a)  Turn audio off, streamed video only
-al x     Audio latency in seconds (default 0.25) reported to client.
-ca <fn>  In Airplay Audio (ALAC) mode, write cover-art to file <fn>
-reset n  Reset after 3n seconds client silence (default 5, 0=never)
-nc       do Not Close video window when client stops mirroring
-nohold   Drop current connection when new client connects.
-restrict Restrict clients to those specified by "-allow <deviceID>"
          UxPlay displays deviceID when a client attempts to connect
          Use "-restrict no" for no client restrictions (default)
-allow <i>Permit deviceID = <i> to connect if restrictions are imposed
-block <i>Always block connections from deviceID = <i>
-FPSdata  Show video-streaming performance reports sent by client.
-fps n    Set maximum allowed streaming framerate, default 30
-f {H|V|I}Horizontal|Vertical flip, or both=Inversion=rotate 180 deg
-r {R|L}  Rotate 90 degrees Right (cw) or Left (ccw)
-m [mac]  Set MAC address (also Device ID);use for concurrent UxPlays
          if mac xx:xx:xx:xx:xx:xx is not given, a random MAC is used
-key [fn] Store private key in $HOME/.uxplay.pem (or in file "fn")
-dacp [fn]Export client DACP information to file $HOME/.uxplay.dacp
          (option to use file "fn" instead); used for client remote
-vdmp [n] Dump h264 video output to "fn.h264"; fn="videodump",change
          with "-vdmp [n] filename". If [n] is given, file fn.x.h264
          x=1,2,.. opens whenever a new SPS/PPS NAL arrives, and <=n
          NAL units are dumped.
-admp [n] Dump audio output to "fn.x.fmt", fmt ={aac, alac, aud}, x
          =1,2,..; fn="audiodump"; change with "-admp [n] filename".
          x increases when audio format changes. If n is given, <= n
          audio packets are dumped. "aud"= unknown format.
-d        Enable debug logging
-v        Displays version information
-h        Displays this help
Startup options in $UXPLAYRC, ~/.uxplayrc, or ~/.config/uxplayrc are
applied first (command-line options may modify them): format is one
option per line, no initial "-"; lines starting with "#" are ignored.
```

# FAQ

```bash
apk add gstreamer-tools
gst-inspect-1.0 | tee

apk add gst-libav
```

## vaapi

```bash
apk add intel-media-driver gst-vaapi
```

```
GStreammer error: Internal error: could not render surface
```

- https://github.com/intel/libva/issues/745

## error: XDG_RUNTIME_DIR is invalid or not set in the environment

```bash
cat << 'EOF' >> ~/.profile
if [ -z "$XDG_RUNTIME_DIR" ]; then
	XDG_RUNTIME_DIR="/tmp/$(id -u)-runtime-dir"

	mkdir -pm 0700 "$XDG_RUNTIME_DIR"
	export XDG_RUNTIME_DIR
fi
EOF
```

- https://wiki.alpinelinux.org/wiki/Wayland

## libfusion segfault

- 启动环境不对，在 x 环境里启动
- directfb
- https://github.com/deniskropp/DirectFB

## gstreamer dropping frame due to qos

OK

## iPhone 可以，macOS 不可以

- macOS 投屏没有窗口
- https://github.com/FDH2/UxPlay/issues/73#issuecomment-1086178735
- https://github.com/FDH2/UxPlay/issues/264
