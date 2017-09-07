# Dev

## Tips
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

## ARI
* [Asterisk Manager Interface](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817239)

## AMI
* 配置文件 `manager.conf`
* 默认端口 5038
* 服务端会主动发送头 `Asterisk Call Manager/3.2.0`


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
apk add asterisk-{curl,pgsql,sounds-en,sounds-moh,srtp}

# 
# 部分工具依赖 perl
apk add asterisk-dahdi dahdi-linux-hardened perl
apk add pciutils

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

