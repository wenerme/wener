---
id: dev
title: 开发
---

# Asterisk 开发

## Tips

- https://github.com/ttacon/libphonenumber
- [Asterisk Architecture, The Big Picture](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Architecture%2C+The+Big+Picture)
- [Interface](https://wiki.asterisk.org/wiki/display/AST/Interfaces)
  - Asterisk Call Files
    - 基于纯文件的调用, 将调用文件放到 spool 即可
  - Asterisk Gateway Interface
    - pipes, stdin, stdout
    - Asterisk dialplan 与 外部程序
    - `main/manager.c`
      - 源文件中包含了事件和操作的定义
      - 部分其他的操作和事件在其他源文件中, 但定义的方式是一样的
  - Asterisk Management Interface
    - 管理类型的功能, PBX, 呼叫发起, 检测邮箱状态, 通道监控和队列, 命令执行
    - CS 模式, TCP
  - Asterisk REST Interface
    - 异步接口, 暴露内部原始对象, 通道, 桥接, 终端, 媒体等.
    - 通过 WebSocket 传输 JSON 事件
  - Calendaring
    - 对多各种标准的日历协议进行读写
    - 拨号计划可利用日历事件信息
  - Database Connectivity
    - ODBC, MySQL, PostgreSQL
  - Distributed Device State
    - 提供用于在多个实例之间状态分发的机制.
  - SNMP
    - 基本的 SNMP 支持
    - 活动监控
  - Speech Recognition API
  - StatsD
    - 是一个拨号计划中的应用
    - 用于发送统计信息
- Doxygen [代码文档](http://doxygen.asterisk.org/)
- NOTES

  - 构建时生成的 xml 可以用于生成代码

- [corosync](http://www.corosync.org/)
  - 集群设备状态同步

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

## Tricks

https://www.voip-info.org/asterisk-tips-and-tricks

## Addon

https://github.com/zaf/Asterisk-eSpeak



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

**sip.conf**

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

**pjsip_wizard.conf**

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
modprobe dahdi
modprobe wct4xxp

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

- [newt](https://pagure.io/newt/)
  - Redhat's Newt windowing toolkit development files
- [isdn4linux](https://www.isdn4linux.de/)
- [OSP Toolkit](https://sourceforge.net/projects/osp-toolkit/)
  - a client side implementation of the ETSI OSP VoIP Peering protocol (ETSI TS 101 321)

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

- 录音文件归档建议使用 opus 压缩
  - 1453 wav 405M 压缩后为 91M
    - 其中有 764 个空白文件
  - 688 wav 402M 压缩后为 88M
- wav 空白文件为 44
- opus 空白文件为 872

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

## 自动拨号文件

/var/spool/asterisk/outgoing/

https://www.voip-info.org/asterisk-call-files
https://www.voip-info.org/asterisk-auto-dial-out

http://www.pycall.org/
a flexible python library for creating and using Asterisk call files.

- 使用场景
  - Prank call programs.
  - Wakeup call programs.
  - Telemarketing campaigns.
  - Automatic callback systems.
  - Emergency warning systems.
  - Advanced conferencing applications.

## 性能调优

- [Asterisk at large](https://www.voip-info.org/wiki/view/Asterisk+at+large)
- [Asterisk dimensioning](https://www.voip-info.org/wiki/view/Asterisk+dimensioning)

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

## debian

https://github.com/alpinelinux/aports/blob/master/main/asterisk/APKBUILD

```bash
apt install curl libedit-dev uuid-dev libjansson-dev libxml2-dev libsqlite3-dev

./configure \
		--prefix=/usr \
		--sysconfdir=/etc \
		--mandir=/usr/share/man \
		--infodir=/usr/share/info \
		--libdir=/usr/lib \
		--localstatedir=/var \
		--disable-xmldoc \
		--with-gsm=internal \
		--with-popt \
		--with-z \
		--with-newt \
		--with-unixodbc \
		--with-postgres \
		--with-tds \
		--with-dahdi \
		--with-pri \
		--with-tonezone \
		--with-resample \
		--with-sqlite3 \
		--with-speex \
		--with-asound \
		--without-x11 \
		--without-pjproject-bundled \
		--with-spandsp \
		--with-bluetooth \
		--with-libcurl \
		--with-libedit \
		--with-srtp \
		--with-imap=system

		--with-imap=system
--with-bluetooth
--with-tds
--with-unixodbc
--with-popt



./configure \
		--prefix=/usr \
		--sysconfdir=/etc \
		--mandir=/usr/share/man \
		--infodir=/usr/share/info \
		--libdir=/usr/lib \
		--localstatedir=/var \
		--disable-xmldoc \
		--with-gsm=internal \
		--with-z \
		--with-newt \
		--with-postgres \
		--with-dahdi \
		--with-pri \
		--with-tonezone \
		--with-resample \
		--with-sqlite3 \
		--with-speex \
		--with-asound \
		--without-x11 \
		--with-spandsp \
		--with-libcurl \
		--with-libedit \
		--with-srtp






./menuselect/menuselect \
		--enable chan_mobile \
		--enable app_meetme \
		--enable cdr_mysql \
		--disable BUILD_NATIVE \
		--enable IMAP_STORAGE \
		menuselect.makeopts

rm -f menuselect.makeopts
make menuselect.makeopts
./menuselect/menuselect \
		--enable app_meetme \
		menuselect.makeopts

make -j $(nproc)
```

libxml2-dev libncurses5-dev uuid-dev sqlite3 libsqlite3-dev pkg-config libjansson-dev

uuid-dev

xml2,sqlite3,jansson,asound2,newt,pq,pri,resample,spandsp,speex,speexdsp,srtp

dahdi

https://en.wikipedia.org/wiki/Newt_(programming_library)

tonezone

dahdi-source

configure: **_
configure: _** The ALSA installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-asound.

configure: **_
configure: _** The BLUETOOTH installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-bluetooth.

configure: **_
configure: _** The DAHDI installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-dahdi.

configure: **_
configure: _** The IMAP_TK installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-imap.

configure: **_
configure: _** The NEWT installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-newt.

configure: **_
configure: _** The PGSQL installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-postgres.

configure: **_
configure: _** The POPT installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-popt.

configure: **_
configure: _** The PRI installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-pri.

configure: **_
configure: _** The RESAMPLE installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-resample.

configure: **_
configure: _** The SPANDSP installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-spandsp.

configure: **_
configure: _** The SPEEX installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-speex.

configure: **_
configure: _** The SPEEX_PREPROCESS installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-speex.

configure: **_
configure: _** The SRTP installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-srtp.

configure: **_
configure: _** The FREETDS installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-tds.

configure: **_
configure: _** The TONEZONE installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-tonezone.

configure: **_
configure: _** The UNIXODBC installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-unixodbc.

configure: **_
configure: _** The ZLIB installation appears to be missing or broken.
configure: **_ Either correct the installation, or run configure
configure: _** including --without-z.

http://www.sailpbx.com/mediawiki/index.php/Debian_DAHDI

```bash
apt-get install dahdi-source
m-a a-i dahdi
```

## Ops

https://www.voip-info.org/asterisk-automatic-daily-restart/

```bash
until asterisk -gcv -C /data/asterisk/etc/asterisk.conf; do
    UNID=$(date +"%Y-%m-%d.%H-%M-%S")
    [ -e core ] && {
      echo "$UNID Server 'asterisk' crashed with exit code $?.  Respawning.." >> dump.log;
      mv core core.$UNID;
      mv /var/log/asterisk/full full.$UNID;
    }
    sleep 1;
done
```
