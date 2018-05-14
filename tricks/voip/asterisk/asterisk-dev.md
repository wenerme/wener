# Dev

## Tips
* https://github.com/ttacon/libphonenumber
* [Asterisk Architecture, The Big Picture](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Architecture%2C+The+Big+Picture)
* [Interface](https://wiki.asterisk.org/wiki/display/AST/Interfaces)
  * Asterisk Call Files
    * 基于纯文件的调用, 将调用文件放到 spool 即可
  * Asterisk Gateway Interface
    * pipes, stdin, stdout
    * Asterisk dialplan 与 外部程序
    * `main/manager.c`
      * 源文件中包含了事件和操作的定义
      * 部分其他的操作和事件在其他源文件中, 但定义的方式是一样的
  * Asterisk Management Interface
    * 管理类型的功能, PBX, 呼叫发起, 检测邮箱状态, 通道监控和队列, 命令执行
    * CS 模式, TCP
  * Asterisk REST Interface
    * 异步接口, 暴露内部原始对象, 通道, 桥接, 终端, 媒体等.
    * 通过 WebSocket 传输 JSON 事件
  * Calendaring
    * 对多各种标准的日历协议进行读写
    * 拨号计划可利用日历事件信息
  * Database Connectivity	
    * ODBC, MySQL, PostgreSQL
  * Distributed Device State	
    * 提供用于在多个实例之间状态分发的机制.
  * SNMP
    * 基本的 SNMP 支持
    * 活动监控
  * Speech Recognition API	
  * StatsD
    * 是一个拨号计划中的应用
    * 用于发送统计信息
* Doxygen [代码文档](http://doxygen.asterisk.org/)
* NOTES
  * 构建时生成的 xml 可以用于生成代码

* [corosync](http://www.corosync.org/)
  * 集群设备状态同步

```bash
# EXTERNALS_CACHE_DIR 可以指定下载文件的缓存目录
# NOTE: 编译的版本由于 pjproject 的 md5 检测构建代码有问题, 需要将最终的判断调整下绕过
EXTERNALS_CACHE_DIR=$PWD/cache ./configure

# 生成文档
make doc/core-en_US.xml
# 会使用 build_tools/post_process_documentation.py 进行后处理
# 合并 managerEventInstances managerEvent 节点参数
make doc/full-en_US.xml

# NOTE 生成文档中的 para/example 标签应该为 CDATA, 但是生成的 xml 中没有 <![CDATA[ ]]>, 需要手动替换, 否则部分解析器会解析失败
```

## Addon
https://github.com/zaf/Asterisk-eSpeak

## AMI
* 配置文件 `manager.conf`
* 默认端口 5038
* 服务端会主动发送头 `Asterisk Call Manager/3.2.0`
* 响应均为异步事件
* 包类型分为: 事件, 响应, 和发送的操作
* 格式类似于 HTTP 头
* Action,Response,Event 必须在第一行
* 请求通过 ActionID, 服务端返回 ActionID 来识别响应
* 一次请求除了会返回一个响应以外, 可能还会范围一列数据, 此时列数据是通过事件发送的, 没有 ActionID
  * 例如: 以 `EndpointDetail` 开始, 以 `EndpointDetailComplete` 结束

## ARI
* [Asterisk Manager Interface](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817239)
* [Asterisk REST Interface](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573)
* [asterisk/res/ari](https://github.com/asterisk/asterisk/tree/master/res/ari)
* https://github.com/asterisk/asterisk/tree/master/rest-api
* Swagger
  * http://localhost:8088/ari/api-docs/resources.json
  * https://raw.githubusercontent.com/asterisk/asterisk/master/rest-api/resources.json
* http://ari.asterisk.org/

## Experiment

```bash
# 实验数据目录
mkdir -p ~/data/asterisk
# 启动
docker run --rm -it --name ast wener/asterisk:edge asterisk -cvvvv
# 拷贝出配置文件
docker cp ast:/etc/asterisk/ ~/data/asterisk/etc/
# 停止之前的, 使用主机上的配置文件启动
docker run --rm -it --net=host -v $HOME/data/asterisk/etc/:/etc/asterisk --name ast wener/asterisk:edge asterisk -cvvvv
# 可以从另外一个终端执行命令
docker exec ast asterisk -rx 'sip reload'

# 在 Mac 下可能导致文件不同步, 那只能尝试别的办法了, 例如
rsync -avz -e ssh $HOME/data/asterisk/ root@192.168.1.1:/data/asterisk/

# 
docker run -d --restart=always \
   -e POSTGRES_USER=ast -e POSTGRES_PASSWORD=ast -p 5432:5432 -v /data/pg/data:/var/lib/postgresql/data --name ast-pg postgres:alpine
```

__sip.conf__
```conf
; 打开 tcp 和 ws
[general]
context=public               
allowoverlap=no  
udpbindaddr=0.0.0.0  
rtpbindaddr=0.0.0.0  
tcpenable=yes
tcpbindaddr=0.0.0.0
websocket_enabled = true
transport=tcp,ws,udp
srvlookup=yes

; 添加测试用户
[codecs](!)
allow=!all,ilbc,g729,gsm,g723,ulaw

[base](!,codecs)
type=friend
secret=0000

[9001](base)
[9002](base)
[9003](base)
[9004](base)
[9005](base)
```

__pjsip_wizard.conf__
```conf
[user-template](!)
type = wizard
accepts_registrations = yes
accepts_auth = yes
endpoint/context = default
endpoint/allow = !all,ulaw,gsm,g722
aor/max_contacts=5

[9001](user-template)
inbound_auth/username = 9001
inbound_auth/password = 9001

[9002](user-template)
inbound_auth/username = 9002
inbound_auth/password = 9002
```

## OS

```bash
# 基础
apk add openssh-client openssl curl busybox file nano grep 

apk add shadow bash
chsh root -s /bin/bash

# 扩展
apk add tmux htop docker rsync neofetch@testing
apk add sox alsa-utils

# 核心
apk add asterisk
apk add asterisk-{curl,pgsql,sounds-en,sounds-moh,srtp,chan-dongle,curl,alsa}
# apk add asterisk-sample-config

# 部分工具依赖 perl
apk add asterisk-dahdi dahdi-linux-hardened perl
apk add pciutils util-linux

# 会看到 Communication controller 这样的 PCI
lspci

# OpenVox 需要 wct4xxp
modprob dahdi
modprob wct4xxp

# 启动 dahdi 服务, 并且下次自动启动
rc-update add dahdi
rc-service dahdi start




# 生成配置
# /etc/dahdi/system.conf
# /etc/asterisk/dahdi-channels.conf
dahdi_genconf

# 配置正确的国家设置

# /etc/dahdi/system.conf
# loadzone = cn
# defaultzone = cn

# /etc/asterisk/indications.conf
# country=cn

# 导入配置
# 默认使用 /etc/dahdi/system.conf
# 可以修改使用的配置文件 -c /data/asterisk/dahdi/system.conf
dahdi_cfg -vvvvvv

# dahdi_monitor
# Monitors signal level on analog channel allows you to record audio from it
# Usage: dahdi_monitor <channel num> -v -m -o -p -l limit -f FILE -s FILE -r FILE1 -t FILE2 -F FILE -S FILE -R FILE1 -T FILE2
# example: dahdi_monitor 1 -vv
# note: extremly usefull, but otherwise not mentioned, that the raw format output is 8Khz 16bit signed. 
#   Use sox to convert to a wav. sox -r 8000 -s -w rx.raw rx.wav

# 导入配置
echo "#include dahdi-channels.conf" >> /etc/asterisk/chan_dahdi.conf


# 可选
# asterisk-{alsa,cdr-mysql,chan-dongle,curl,dahdi,dbg,dev,doc,fax,mobile,odbc,pgsql,sample-config,sounds-en,sounds-moh,speex,srtp,tds}
# 使用样例配置文件
# apk add sample-config

```



```bash
apk add --allow-untrusted ~/packages/main/x86_64/pjproject-2.5.5-r3.apk

until asterisk -gcvvvvv -C /data/asterisk/etc/asterisk.conf; do
    UNID=$(date +"%Y-%m-%d.%H-%M-%S")
    [ -e core ] && {
      echo "$UNID Server 'asterisk' crashed with exit code $?.  Respawning.." >> dump.log;
      mv core core.$UNID;
      mv /var/log/asterisk/full full.$UNID;
    }
    sleep 1
done
```

* [newt](https://pagure.io/newt/)
  * Redhat's Newt windowing toolkit development files
* [isdn4linux](https://www.isdn4linux.de/)
* [OSP Toolkit](https://sourceforge.net/projects/osp-toolkit/)
  * a client side implementation of the ETSI OSP VoIP Peering protocol (ETSI TS 101 321)


### asterisk ./configure --help
```
$ ./configure --help
`configure' configures asterisk trunk to adapt to many kinds of systems.

Usage: ./configure [OPTION]... [VAR=VALUE]...

To assign environment variables (e.g., CC, CFLAGS...), specify them as
VAR=VALUE.  See below for descriptions of some of the useful variables.

Defaults for the options are specified in brackets.

Configuration:
  -h, --help              display this help and exit
      --help=short        display options specific to this package
      --help=recursive    display the short help of all the included packages
  -V, --version           display version information and exit
  -q, --quiet, --silent   do not print `checking ...' messages
      --cache-file=FILE   cache test results in FILE [disabled]
  -C, --config-cache      alias for `--cache-file=config.cache'
  -n, --no-create         do not create output files
      --srcdir=DIR        find the sources in DIR [configure dir or `..']

Installation directories:
  --prefix=PREFIX         install architecture-independent files in PREFIX
                          [/usr/local]
  --exec-prefix=EPREFIX   install architecture-dependent files in EPREFIX
                          [PREFIX]

By default, `make install' will install all the files in
`/usr/local/bin', `/usr/local/lib' etc.  You can specify
an installation prefix other than `/usr/local' using `--prefix',
for instance `--prefix=$HOME'.

For better control, use the options below.

Fine tuning of the installation directories:
  --bindir=DIR            user executables [EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --libdir=DIR            object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header files for non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/asterisk]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]

System types:
  --build=BUILD     configure for building on BUILD [guessed]
  --host=HOST       cross-compile to build programs to run on HOST [BUILD]

Optional Features:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --enable-dev-mode       Turn on developer mode
  --enable-coverage       Turn on code coverage tracking (for gcov)
  --disable-xmldoc        Explicitly disable XML documentation
  --disable-largefile     omit support for large files
  --enable-internal-poll  Use Asterisk's poll implementation
  --disable-asteriskssl   Disable Asterisk's SSL wrapper library
  --disable-rpath         Disables rpath linker option checking

Optional Packages:
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-gnu-ld           assume the C compiler uses GNU ld [default=no]
  --with-sounds-cache=PATH
                          use cached sound tarfiles in PATH
  --with-externals-cache=PATH
                          use cached external module tarfiles in PATH
  --with-pjproject-bundled
                          Use bundled pjproject libraries
  --with-asound=PATH      use Advanced Linux Sound Architecture files in PATH
  --with-bfd=PATH         use Debug symbol decoding files in PATH
  --with-execinfo=PATH    use Stack Backtrace files in PATH
  --with-bluetooth=PATH   use Bluetooth files in PATH
  --with-cap=PATH         use POSIX 1.e capabilities files in PATH
  --with-cpg=PATH         use Corosync files in PATH
  --with-curses=PATH      use curses files in PATH
  --with-crypt=PATH       use password and data encryption files in PATH
  --with-crypto=PATH      use OpenSSL Cryptography files in PATH
  --with-dahdi=PATH       use DAHDI files in PATH
  --with-avcodec=PATH     use Ffmpeg and avcodec files in PATH
  --with-gsm=PATH         use External GSM files in PATH, use 'internal' GSM
                          otherwise
  --with-ilbc=PATH        use System iLBC files in PATH, use 'internal' iLBC
                          otherwise
  --with-gtk2=PATH        use gtk2 files in PATH
  --with-gmime=PATH       use GMime files in PATH
  --with-h323=PATH        use OpenH323 files in PATH
  --with-hoard=PATH       use Hoard Memory Allocator files in PATH
  --with-ical=PATH        use iCal files in PATH
  --with-iconv=PATH       use Iconv files in PATH
  --with-iksemel=PATH     use Iksemel Jabber files in PATH
  --with-imap=PATH        use UW IMAP Toolkit files in PATH
  --with-inotify=PATH     use inotify support files in PATH
  --with-iodbc=PATH       use iODBC files in PATH
  --with-isdnnet=PATH     use ISDN4Linux files in PATH
  --with-jack=PATH        use Jack Audio Connection Kit files in PATH
  --with-jansson=PATH     use Jansson JSON library files in PATH
  --with-uriparser=PATH   use uriparser library files in PATH
  --with-kqueue=PATH      use kqueue support files in PATH
  --with-ldap=PATH        use OpenLDAP files in PATH
  --with-libcurl=PREFIX   look for the curl library in PREFIX/lib and headers
                          in PREFIX/include
  --with-libedit=PATH     use NetBSD Editline library files in PATH, use
                          'internal' Editline otherwise
  --with-libxml2=PATH     use LibXML2 files in PATH
  --with-libxslt=PATH     use LibXSLT files in PATH
  --with-ltdl=PATH        use libtool files in PATH
  --with-lua=PATH         use Lua files in PATH
  --with-misdn=PATH       use mISDN user files in PATH
  --with-mysqlclient=PATH use MySQL client files in PATH
  --with-nbs=PATH         use Network Broadcast Sound files in PATH
  --with-ncurses=PATH     use ncurses files in PATH
  --with-neon=PATH        use neon files in PATH
  --with-neon29=PATH      use neon29 files in PATH
  --with-netsnmp=PATH     use Net-SNMP files in PATH
  --with-newt=PATH        use newt files in PATH
  --with-ogg=PATH         use OGG files in PATH
  --with-openr2=PATH      use MFR2 files in PATH
  --with-opus=PATH        use Opus files in PATH
  --with-osptk=PATH       use OSP Toolkit files in PATH
  --with-oss=PATH         use Open Sound System files in PATH
  --with-postgres=PATH    use PostgreSQL files in PATH
  --with-pjproject=PATH   use PJPROJECT files in PATH
  --with-popt=PATH        use popt files in PATH
  --with-portaudio=PATH   use PortAudio files in PATH
  --with-pri=PATH         use ISDN PRI files in PATH
  --with-pwlib=PATH       use PWlib files in PATH
  --with-radius=PATH      use Radius Client files in PATH
  --with-resample=PATH    use LIBRESAMPLE files in PATH
  --with-sdl=PATH         use Sdl files in PATH
  --with-SDL_image=PATH   use Sdl Image files in PATH
  --with-spandsp=PATH     use SPANDSP files in PATH
  --with-ss7=PATH         use ISDN SS7 files in PATH
  --with-speex=PATH       use Speex files in PATH
  --with-speex=PATH       use Speex preprocess routines files in PATH
  --with-speexdsp=PATH    use SpeexDSP files in PATH
  --with-sqlite=PATH      use SQLite files in PATH
  --with-sqlite3=PATH     use SQLite files in PATH
  --with-srtp=PATH        use Secure RTP files in PATH
  --with-ssl=PATH         use OpenSSL Secure Sockets Layer files in PATH
  --with-suppserv=PATH    use mISDN Supplemental Services files in PATH
  --with-tds=PATH         use FreeTDS files in PATH
  --with-termcap=PATH     use Termcap files in PATH
  --with-timerfd=PATH     use timerfd files in PATH
  --with-tinfo=PATH       use Term Info files in PATH
  --with-tonezone=PATH    use tonezone files in PATH
  --with-unbound=PATH     use unbound files in PATH
  --with-unixodbc=PATH    use unixODBC files in PATH
  --with-vorbis=PATH      use Vorbis files in PATH
  --with-vpb=PATH         use Voicetronix API files in PATH
  --with-x11=PATH         use X11 files in PATH
  --with-z=PATH           use zlib compression files in PATH

Some influential environment variables:
  CC          C compiler command
  CFLAGS      C compiler flags
  LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
              nonstandard directory <lib dir>
  LIBS        libraries to pass to the linker, e.g. -l<library>
  CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir> if
              you have headers in a nonstandard directory <include dir>
  CPP         C preprocessor
  CXX         C++ compiler command
  CXXFLAGS    C++ compiler flags
  CXXCPP      C++ preprocessor
  PJPROJECT_CONFIGURE_OPTS
              Additional configure options to pass to bundled pjproject
  PKG_CONFIG  path to pkg-config utility
  PKG_CONFIG_PATH
              directories to add to pkg-config's search path
  PKG_CONFIG_LIBDIR
              path overriding pkg-config's built-in search path
  ILBC_CFLAGS C compiler flags for ILBC, overriding pkg-config
  ILBC_LIBS   linker flags for ILBC, overriding pkg-config
  LIBEDIT_CFLAGS
              C compiler flags for LIBEDIT, overriding pkg-config
  LIBEDIT_LIBS
              linker flags for LIBEDIT, overriding pkg-config
  PJPROJECT_CFLAGS
              C compiler flags for PJPROJECT, overriding pkg-config
  PJPROJECT_LIBS
              linker flags for PJPROJECT, overriding pkg-config
  PYTHONDEV_CFLAGS
              C compiler flags for PYTHONDEV, overriding pkg-config
  PYTHONDEV_LIBS
              linker flags for PYTHONDEV, overriding pkg-config
  GMIME_CFLAGS
              C compiler flags for GMIME, overriding pkg-config
  GMIME_LIBS  linker flags for GMIME, overriding pkg-config
  GTK2_CFLAGS C compiler flags for GTK2, overriding pkg-config
  GTK2_LIBS   linker flags for GTK2, overriding pkg-config
  SYSTEMD_CFLAGS
              C compiler flags for SYSTEMD, overriding pkg-config
  SYSTEMD_LIBS
              linker flags for SYSTEMD, overriding pkg-config

Use these variables to override the choices made by `configure' or to help
it to find libraries and programs with nonstandard names/locations.

Report bugs to <https://issues.asterisk.org>.
```


### pjproject ./configure --help

```
$ ./configure --help
`configure' configures pjproject 2.x to adapt to many kinds of systems.

Usage: ./aconfigure [OPTION]... [VAR=VALUE]...

To assign environment variables (e.g., CC, CFLAGS...), specify them as
VAR=VALUE.  See below for descriptions of some of the useful variables.

Defaults for the options are specified in brackets.

Configuration:
  -h, --help              display this help and exit
      --help=short        display options specific to this package
      --help=recursive    display the short help of all the included packages
  -V, --version           display version information and exit
  -q, --quiet, --silent   do not print `checking ...' messages
      --cache-file=FILE   cache test results in FILE [disabled]
  -C, --config-cache      alias for `--cache-file=config.cache'
  -n, --no-create         do not create output files
      --srcdir=DIR        find the sources in DIR [configure dir or `..']

Installation directories:
  --prefix=PREFIX         install architecture-independent files in PREFIX
                          [/usr/local]
  --exec-prefix=EPREFIX   install architecture-dependent files in EPREFIX
                          [PREFIX]

By default, `make install' will install all the files in
`/usr/local/bin', `/usr/local/lib' etc.  You can specify
an installation prefix other than `/usr/local' using `--prefix',
for instance `--prefix=$HOME'.

For better control, use the options below.

Fine tuning of the installation directories:
  --bindir=DIR            user executables [EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --libdir=DIR            object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header files for non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/pjproject]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]

System types:
  --build=BUILD     configure for building on BUILD [guessed]
  --host=HOST       cross-compile to build programs to run on HOST [BUILD]
  --target=TARGET   configure for building compilers for TARGET [HOST]

Optional Features:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --disable-floating-point
                          Disable floating point where possible
  --enable-epoll          Use /dev/epoll ioqueue on Linux (experimental)
  --enable-shared         Build shared libraries
  --disable-resample      Disable resampling implementations
  --disable-sound         Exclude sound (i.e. use null sound)
  --disable-oss           Disable OSS audio (default: not disabled)
  --disable-video         Disable video feature
  --enable-ext-sound      PJMEDIA will not provide any sound device backend
  --disable-small-filter  Exclude small filter in resampling
  --disable-large-filter  Exclude large filter in resampling
  --disable-speex-aec     Exclude Speex Acoustic Echo Canceller/AEC
  --disable-g711-codec    Exclude G.711 codecs from the build
  --disable-l16-codec     Exclude Linear/L16 codec family from the build
  --disable-gsm-codec     Exclude GSM codec in the build
  --disable-g722-codec    Exclude G.722 codec in the build
  --disable-g7221-codec   Exclude G.7221 codec in the build
  --disable-speex-codec   Exclude Speex codecs in the build
  --disable-ilbc-codec    Exclude iLBC codec in the build
  --enable-libsamplerate  Link with libsamplerate when available.
  --enable-resample-dll   Build libresample as shared library
  --disable-sdl           Disable SDL (default: not disabled)
  --disable-ffmpeg        Disable ffmpeg (default: not disabled)
  --disable-v4l2          Disable Video4Linux2 (default: not disabled)
  --disable-openh264      Disable OpenH264 (default: not disabled)
  --enable-ipp            Enable Intel IPP support. Specify the Intel IPP
                          package and samples location using IPPROOT and
                          IPPSAMPLES env var or with --with-ipp and
                          --with-ipp-samples options
  --disable-ssl           Exclude SSL support the build (default: autodetect)

  --disable-opencore-amr  Exclude OpenCORE AMR support from the build
                          (default: autodetect)

  --disable-silk          Exclude SILK support from the build (default:
                          autodetect)

  --disable-opus          Exclude OPUS support from the build (default:
                          autodetect)

  --disable-libyuv        Exclude libyuv in the build
  --disable-libwebrtc     Exclude libwebrtc in the build

Optional Packages:
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-external-speex   Use external Speex development files, not the one in
                          "third_party" directory. When this option is set,
                          make sure that Speex is accessible to use (hint: use
                          CFLAGS and LDFLAGS env var to set the include/lib
                          paths)
  --with-external-gsm     Use external GSM codec library, not the one in
                          "third_party" directory. When this option is set,
                          make sure that the GSM include/lib files are
                          accessible to use (hint: use CFLAGS and LDFLAGS env
                          var to set the include/lib paths)
  --with-external-srtp    Use external SRTP development files, not the one in
                          "third_party" directory. When this option is set,
                          make sure that SRTP is accessible to use (hint: use
                          CFLAGS and LDFLAGS env var to set the include/lib
                          paths)
  --with-external-yuv     Use external libyuv development files, not the one
                          in "third_party" directory. When this option is set,
                          make sure that libyuv is accessible to use (hint:
                          use CFLAGS and LDFLAGS env var to set the
                          include/lib paths)
  --with-external-webrtc  Use external webrtc development files, not the one
                          in "third_party" directory. When this option is set,
                          make sure that webrtc is accessible to use (hint:
                          use CFLAGS and LDFLAGS env var to set the
                          include/lib paths)
  --with-external-pa      Use external PortAudio development files, not the
                          one in "third_party" directory. When this option is
                          set, make sure that PortAudio is accessible to use
                          (hint: use CFLAGS and LDFLAGS env var to set the
                          include/lib paths)
  --with-sdl=DIR          Specify alternate libSDL prefix
  --with-ffmpeg=DIR       Specify alternate FFMPEG prefix
  --with-openh264=DIR     Specify alternate OpenH264 prefix
  --with-ipp=DIR          Specify the Intel IPP location
  --with-ipp-samples=DIR  Specify the Intel IPP samples location
  --with-ipp-arch=ARCH    Specify the Intel IPP ARCH suffix, e.g. "64" or
                          "em64t. Default is blank for IA32"
  --with-ssl=DIR          Specify alternate libssl prefix
  --with-opencore-amrnb=DIR
                          This option is obsolete and replaced by
                          --with-opencore-amr=DIR
  --with-opencore-amr=DIR Specify alternate libopencore-amr prefix
  --with-opencore-amrwbenc=DIR
                          Specify alternate libvo-amrwbenc prefix
  --with-silk=DIR         Specify alternate SILK prefix
  --with-opus=DIR         Specify alternate OPUS prefix

Some influential environment variables:
  CC          C compiler command
  CFLAGS      C compiler flags
  LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
              nonstandard directory <lib dir>
  LIBS        libraries to pass to the linker, e.g. -l<library>
  CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir> if
              you have headers in a nonstandard directory <include dir>
  CXX         C++ compiler command
  CXXFLAGS    C++ compiler flags
  CPP         C preprocessor

Use these variables to override the choices made by `configure' or to help
it to find libraries and programs with nonstandard names/locations.

Report bugs to the package provider.
```


### Centos

```bash
# 建议先设置好 https_proxy 和 http_proxy 变量, 因为 wget 只支持 http 代理, 所以不能用 socks 代理

# 前置条件
yum install kernel-devel
yum install -y ncurses-devel curl-devel zlib-devel libedit-devel sqlite-devel postgresql-devel libuuid-devel uuid-devel lua-devel jansson-devel newt-devel openssl-devel

# DAHDi 驱动安装
# 如果使用的 OpenVox 则可以使用 OpenVox 的驱动
# wget http://downloads.openvox.cn/pub/drivers/dahdi-linux-complete/openvox_dahdi-linux-complete-current.tar.gz
wget http://downloads.asterisk.org/pub/telephony/dahdi-linux-complete/dahdi-linux-complete-current.tar.gz
tar -zxvf dahdi-linux-complete-*.tar.gz

cd dahdi-linux-complete-*
make
make install
make config

cd ..

# 安装 libpri
wget http://downloads.asterisk.org/pub/telephony/libpri/libpri-current.tar.gz
tar -zxvf libpri-current.tar.gz

cd libpri-*
make
make install

cd ..

# 安装 asterisk
AST_MAJOR_VER=14
wget http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-${AST_MAJOR_VER}-current.tar.gz
tar -zxvf asterisk-${AST_MAJOR_VER}-current.tar.gz

cd asterisk-${AST_MAJOR_VER}.*
# 15 后 --with-pjproject-bundled 为默认值
./configure \
  --with-pjproject-bundled --with-gnu-ld --with-libcurl --with-libedit \
  --with-gsm=internal \
  --without-x11 \
  --with-dahdi --with-pri --with-tonezone \
  --with-postgres --with-sqlite3
make
make install
make samples

# format_mp3
# Any rate but 8000hz mono is optimal
# 源码需要下载
contrib/scripts/get_mp3_source.sh
./menuselect/menuselect --enable format_mp3 menuselect.makeopts
make
make install

# codec_opus
# http://downloads.digium.com/pub/telephony/codec_opus/README
# https://wiki.asterisk.org/wiki/display/AST/Codec+Opus
# 使用官方二进制版可能会进行统计, 如果想要关闭, 可以在 dnsmasq 中添加 local=/stats.asterisk.org/ 或者在 hosts 中添加对应记录
# 二进制安装
# 支持 13,14,15 支持 x86_64,x86_32 的 linux
AST_MAJOR_VER="$(asterisk -V | sed -nr -e 's/.*([0-9]{2}).*/\1/p')"
# 当前最新版为 1.1.0
OPUS_VER=current
wget "http://downloads.digium.com/pub/telephony/codec_opus/asterisk-${AST_MAJOR_VER}.0/x86-64/codec_opus-${AST_MAJOR_VER}.0_${OPUS_VER}-$(uname -m).tar.gz"
tar zxvf codec_opus-*
cd codec_opus-*
cp codec_opus.so /usr/lib/asterisk/modules/
cp format_ogg_opus.so /usr/lib/asterisk/modules/
cp codec_opus_config-en_US.xml /var/lib/asterisk/documentation/thirdparty/

# 源码安装
# 依赖
yum install -y opus-devel
# 官方未释出源码
# 菜单项为 Codec Translators -> codec_opus
# 可参考源码 https://github.com/traud/asterisk-opus
# Debian 的 Asterisk 使用的改源码 https://anonscm.debian.org/git/pkg-voip/asterisk-opus.git
```

## 录音文件归档
* 录音文件归档建议使用 opus 压缩
  * 1453  wav 405M 压缩后为 91M
    * 其中有 764 个空白文件
  * 688   wav 402M 压缩后为 88M
* wav 空白文件为 44
* opus 空白文件为 872

```bash
# 删除空白文件
find . -size 44c -delete
# 时间范围
find . -type f -newermt 2017-9-28 ! -newermt 2017-9-29
# 15 分钟前到现在
find . -type f -mmin -15
# 删除这之前的数据
find . -type f ! -newermt 2017-9-29 -delete
```

## 性能调优
* [Asterisk at large](https://www.voip-info.org/wiki/view/Asterisk+at+large)
* [Asterisk dimensioning](https://www.voip-info.org/wiki/view/Asterisk+dimensioning)

```bash
# 将语言文件放到内存
# /var/lib/asterisk/sound
mkdir /mnt/ramdisk
mount -t tmpfs -o size=2g tmpfs /mnt/ramdisk
# /etc/fstab
# tmpfs /mnt/ramdisk tmpfs nodev,nosuid,noexec,nodiratime,size=2048M 0 0

# 保证最大文件数够大, 至少 131072
sysctl fs.file-max
# 刷新修改
sysctl -p /etc/sysctl.conf
sysctl -w fs.file-max=100000
sysctl --system

# 确保打开文件数勾搭, 至少 32768
ulimit -n
# 查看已经运行的
cat /proc/$(pidof asterisk)/limits | grep files
# https://superuser.com/a/441758/242730
prlimit --nofile -p $(pidof asterisk)

# 当前打开的文件数
lsof -p $(pidof asterisk) | wc -l
ls -l /proc/$(pidof asterisk)/fd | wc -l

# 当前所有的量
lsof | wc -l

# 查看内核的文件数限制
sysctl fs.file-nr
```
