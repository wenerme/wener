"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["42957"],{10062:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>r,default:()=>p,assets:()=>l,toc:()=>d,frontMatter:()=>o});var s=JSON.parse('{"id":"os/linux/desktop/uxplay","title":"uxplay","description":"- FDH2/UxPlay","source":"@site/../notes/os/linux/desktop/uxplay.md","sourceDirName":"os/linux/desktop","slug":"/os/linux/desktop/uxplay","permalink":"/notes/os/linux/desktop/uxplay","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/desktop/uxplay.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1705291463000,"frontMatter":{"title":"uxplay"},"sidebar":"docs","previous":{"title":"pulseaudio","permalink":"/notes/os/linux/desktop/pulseaudio"},"next":{"title":"VA-API","permalink":"/notes/os/linux/desktop/vaapi"}}'),t=i("52676"),a=i("79938");let o={title:"uxplay"},r="uxplay",l={},d=[{value:"misc",id:"misc",level:2},{value:"help",id:"help",level:2},{value:"vaapi",id:"vaapi",level:2},{value:"error: XDG_RUNTIME_DIR is invalid or not set in the environment",id:"error-xdg_runtime_dir-is-invalid-or-not-set-in-the-environment",level:2},{value:"libfusion segfault",id:"libfusion-segfault",level:2},{value:"gstreamer dropping frame due to qos",id:"gstreamer-dropping-frame-due-to-qos",level:2},{value:"iPhone \u53EF\u4EE5\uFF0CmacOS \u4E0D\u53EF\u4EE5",id:"iphone-\u53EF\u4EE5macos-\u4E0D\u53EF\u4EE5",level:2}];function c(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"uxplay",children:"uxplay"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/FDH2/UxPlay",children:"FDH2/UxPlay"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"GPLv3, C"}),"\n",(0,t.jsx)(n.li,{children:"AirPlay Unix mirroring server"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/postlund/pyatv",children:"postlund/pyatv"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"client library for Apple TV and AirPla"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://nto.github.io/AirPlay.html",children:"https://nto.github.io/AirPlay.html"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Unofficial AirPlay Protocol Specification"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://developer.apple.com/streaming/fps/",children:"https://developer.apple.com/streaming/fps/"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"FairPlay DRM"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 DRM\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Netflix, AppleTV+ \u4E0D\u53EF\u7528"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'apk add git gcc g++ make cmake openssl-dev avahi-daemon avahi-dev gstreamer-dev gst-plugins-base-dev gst-libav gst-plugins-good libplist-dev\n\nservice avahi-daemon start\n\ngit clone https://github.com/FDH2/UxPlay\ncd UxPlay\nmkdir build\ncd build\ncmake ..\nmake\n./uxplay --help\n\n# \u6CE8\u610F \u9700\u8981\u5728 X Session \u7684 terminal/\u73AF\u5883 \u91CC\u542F\u52A8 - \u6216\u8005\u901A\u8FC7\u8BBE\u7F6E env \u5E94\u8BE5\u4E5F\u53EF\u4EE5\n# -vs \u6D4B\u8BD5\u53EF\u7528 glimagesink, ximagesink\n#   xvimagesink \u6CA1\u6709\u5185\u5BB9\u8F93\u51FA\uFF0C\u4F46\u4F3C\u4E4E\u88AB\u9ED8\u8BA4\u9009\u62E9\n#   ximagesink CPU \u5360\u7528\u6BD4 glimagesink \u4F4E\u5F97\u591A, \u652F\u6301 -fs\n./uxplay -n "tv@living-room" -nh -fps 18 -fs -vs ximagesink\n'})}),"\n",(0,t.jsx)(n.h2,{id:"misc",children:"misc"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"#\naddgroup $USER audio\naddgroup $USER video\n\napk add inxi\ninxi -A # audio\n\napk add pavucontrol\n# \u6CE8\u610F\u9009\u62E9\u8F93\u51FA\u8BBE\u5907\npavucontrol\n\n# pa\napk add pulseaudio pulseaudio-alsa alsa-plugins-pulse\n# apk add pulseaudio-utils pipewire wireplumber pipewire-pulse\n"})}),"\n",(0,t.jsx)(n.h2,{id:"help",children:"help"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'UxPlay 1.68: An open-source AirPlay mirroring server.\n=========== Website: https://github.com/FDH2/UxPlay ==========\nUsage: ./uxplay [-n name] [-s wxh] [-p [n]] [(other options)]\nOptions:\n-n name   Specify the network name of the AirPlay server\n-nh       Do not add "@hostname" at the end of AirPlay server name\n-pin[xxxx]Use a 4-digit pin code to control client access (default: no)\n          default pin is random: optionally use fixed pin xxxx\n-reg [fn] Keep a register in $HOME/.uxplay.register to verify returning\n          client pin-registration; (option: use file "fn" for this)\n-vsync [x]Mirror mode: sync audio to video using timestamps (default)\n          x is optional audio delay: millisecs, decimal, can be neg.\n-vsync no Switch off audio/(server)video timestamp synchronization\n-async [x]Audio-Only mode: sync audio to client video (default: no)\n-async no Switch off audio/(client)video timestamp synchronization\n-db l[:h] Set minimum volume attenuation to l dB (decibels, negative);\n          optional: set maximum to h dB (+ or -) default: -30.0:0.0 dB\n-taper    Use a "tapered" AirPlay volume-control profile\n-s wxh[@r]Set display resolution [refresh_rate] default 1920x1080[@60]\n-o        Set display "overscanned" mode on (not usually needed)\n-fs       Full-screen (only works with X11, Wayland and VAAPI)\n-p        Use legacy ports UDP 6000:6001:7011 TCP 7000:7001:7100\n-p n      Use TCP and UDP ports n,n+1,n+2. range 1024-65535\n          use "-p n1,n2,n3" to set each port, "n1,n2" for n3 = n2+1\n          "-p tcp n" or "-p udp n" sets TCP or UDP ports separately\n-avdec    Force software h264 video decoding with libav decoder\n-vp ...   Choose the GSteamer h264 parser: default "h264parse"\n-vd ...   Choose the GStreamer h264 decoder; default "decodebin"\n          choices: (software) avdec_h264; (hardware) v4l2h264dec,\n          nvdec, nvh264dec, vaapih64dec, vtdec,etc.\n          choices: avdec_h264,vaapih264dec,nvdec,nvh264dec,v4l2h264dec\n-vc ...   Choose the GStreamer videoconverter; default "videoconvert"\n          another choice when using v4l2h264dec: v4l2convert\n-vs ...   Choose the GStreamer videosink; default "autovideosink"\n          some choices: ximagesink,xvimagesink,vaapisink,glimagesink,\n          gtksink,waylandsink,osxvideosink,kmssink,d3d11videosink etc.\n-vs 0     Streamed audio only, with no video display window\n-v4l2     Use Video4Linux2 for GPU hardware h264 decoding\n-bt709    Sometimes needed for Raspberry Pi with GStreamer < 1.22\n-as ...   Choose the GStreamer audiosink; default "autoaudiosink"\n          some choices:pulsesink,alsasink,pipewiresink,jackaudiosink,\n          osssink,oss4sink,osxaudiosink,wasapisink,directsoundsink.\n-as 0     (or -a)  Turn audio off, streamed video only\n-al x     Audio latency in seconds (default 0.25) reported to client.\n-ca <fn>  In Airplay Audio (ALAC) mode, write cover-art to file <fn>\n-reset n  Reset after 3n seconds client silence (default 5, 0=never)\n-nc       do Not Close video window when client stops mirroring\n-nohold   Drop current connection when new client connects.\n-restrict Restrict clients to those specified by "-allow <deviceID>"\n          UxPlay displays deviceID when a client attempts to connect\n          Use "-restrict no" for no client restrictions (default)\n-allow <i>Permit deviceID = <i> to connect if restrictions are imposed\n-block <i>Always block connections from deviceID = <i>\n-FPSdata  Show video-streaming performance reports sent by client.\n-fps n    Set maximum allowed streaming framerate, default 30\n-f {H|V|I}Horizontal|Vertical flip, or both=Inversion=rotate 180 deg\n-r {R|L}  Rotate 90 degrees Right (cw) or Left (ccw)\n-m [mac]  Set MAC address (also Device ID);use for concurrent UxPlays\n          if mac xx:xx:xx:xx:xx:xx is not given, a random MAC is used\n-key [fn] Store private key in $HOME/.uxplay.pem (or in file "fn")\n-dacp [fn]Export client DACP information to file $HOME/.uxplay.dacp\n          (option to use file "fn" instead); used for client remote\n-vdmp [n] Dump h264 video output to "fn.h264"; fn="videodump",change\n          with "-vdmp [n] filename". If [n] is given, file fn.x.h264\n          x=1,2,.. opens whenever a new SPS/PPS NAL arrives, and <=n\n          NAL units are dumped.\n-admp [n] Dump audio output to "fn.x.fmt", fmt ={aac, alac, aud}, x\n          =1,2,..; fn="audiodump"; change with "-admp [n] filename".\n          x increases when audio format changes. If n is given, <= n\n          audio packets are dumped. "aud"= unknown format.\n-d        Enable debug logging\n-v        Displays version information\n-h        Displays this help\nStartup options in $UXPLAYRC, ~/.uxplayrc, or ~/.config/uxplayrc are\napplied first (command-line options may modify them): format is one\noption per line, no initial "-"; lines starting with "#" are ignored.\n'})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"apk add gstreamer-tools\ngst-inspect-1.0 | tee\n\napk add gst-libav\n"})}),"\n",(0,t.jsx)(n.h2,{id:"vaapi",children:"vaapi"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"apk add intel-media-driver gst-vaapi\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"GStreammer error: Internal error: could not render surface\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/intel/libva/issues/745",children:"https://github.com/intel/libva/issues/745"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"error-xdg_runtime_dir-is-invalid-or-not-set-in-the-environment",children:"error: XDG_RUNTIME_DIR is invalid or not set in the environment"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'cat << \'EOF\' >> ~/.profile\nif [ -z "$XDG_RUNTIME_DIR" ]; then\n	XDG_RUNTIME_DIR="/tmp/$(id -u)-runtime-dir"\n\n	mkdir -pm 0700 "$XDG_RUNTIME_DIR"\n	export XDG_RUNTIME_DIR\nfi\nEOF\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://wiki.alpinelinux.org/wiki/Wayland",children:"https://wiki.alpinelinux.org/wiki/Wayland"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"libfusion-segfault",children:"libfusion segfault"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u542F\u52A8\u73AF\u5883\u4E0D\u5BF9\uFF0C\u5728 x \u73AF\u5883\u91CC\u542F\u52A8"}),"\n",(0,t.jsx)(n.li,{children:"directfb"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/deniskropp/DirectFB",children:"https://github.com/deniskropp/DirectFB"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"gstreamer-dropping-frame-due-to-qos",children:"gstreamer dropping frame due to qos"}),"\n",(0,t.jsx)(n.p,{children:"OK"}),"\n",(0,t.jsx)(n.h2,{id:"iphone-\u53EF\u4EE5macos-\u4E0D\u53EF\u4EE5",children:"iPhone \u53EF\u4EE5\uFF0CmacOS \u4E0D\u53EF\u4EE5"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"macOS \u6295\u5C4F\u6CA1\u6709\u7A97\u53E3"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/FDH2/UxPlay/issues/73#issuecomment-1086178735",children:"https://github.com/FDH2/UxPlay/issues/73#issuecomment-1086178735"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/FDH2/UxPlay/issues/264",children:"https://github.com/FDH2/UxPlay/issues/264"})}),"\n"]})]})}function p(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return r},a:function(){return o}});var s=i(75271);let t={},a=s.createContext(t);function o(e){let n=s.useContext(a);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);