[toc]

玩我的 CentOS / Play CentOS
===================

> 记录我玩 centos 的经历
> 很多时候需要 sudo 等 root 权限的时候需要自行判断.尽量不直接用root帐户.

> 我自己使用时的主要安装过程
> 
> 初始配置 -> 设置好 openssh-server -> 添加额外的 repo -> 安装 git
> 下载[我的dotfiles](https://github.com/wenerme/dotfiles)
> 其他步骤则按需进行


初始 minimal 配置
---------------
```
# 首先是打开网络咯
ifconfig eth0 up
dhclient
# 添加个帐号, 设置好密码
useradd wener
passwd wener
# 把 创建的帐号添加到 sudoers file 中
echo "wener ALL=(ALL) ALL" >> /etc/sudoers
# 更新一下先
yum update -y
# 因为是 minimal 版本, 先安装一些必要的东西
yum install man wget curl -y
# 登出,下面的操作不在root下操作了,安全点
logout
# 用之前创建的帐号登录
```

非 minimal 的准备
-------

```
# Download ISOs
# UNETBootin
# Install
# ===============
# Configuration
# ===============
# basic upgrade
su root
yum upgrade
```

添加其他的 repo
---------------
```
# add rpmforge
# fllow this http://wiki.centos.org/AdditionalResources/Repositories/RPMForge
rpm --import http://apt.sw.be/RPM-GPG-KEY.dag.txt
# 版本号可能有所不同,参见上面的链接
# 根据个人的系统构架`uname -i`选择 i686 或 x86_64
wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
rpm -K rpmforge-release-*.rpm
rpm -i rpmforge-release-*.rpm
yum upgrade
```

杂项
-----
```
# lscpi
yum install pciutils -y
# iwconfig 等无线工具
yum install wireless-tools -y

# 列出已安装的包
yum list installed

# 切换 TTY 的快捷键 <C-A-F1-6>

# sudo 附加到文件
echo BOOTPROTO=dhcp | sudo tee -a /etc/sysconfig/network-scripts/ifcfg-wlan0

# 挂载 vbox 的共享目录
mkdir ~/shared
sudo mount -t vboxsf shared ~/shared

# 使用sudo找不到命令的时候
# 可以考虑将 /usr/local/bin/:/usr/local/sbin/ 
# 添加到 /etc/sudoers 的 secure_path 中

# 判断远程某端口是否开启
timeout 1 bash -c 'cat < /dev/null > /dev/tcp/192.168.56.101/8087'
echo $?
```

CentOS 下 安装的wpa_supplicant 没有wpa_gui,可以参见 [这里](http://www.linuxfromscratch.org/blfs/view/svn/basicnet/wpa_supplicant.html),主要是因为 centos的wpa_supplicant 版本太老了,0.7的,现在最新的是2.1的,查看[官方主页](http://w1.fi/wpa_supplicant/)可下载.但是这个软件的依赖项对centos来说 版本太高了,安装起来非常复杂.

启动不带窗口的vbox
------------------
很多时候只需要让系统运行, 然后远程 ssh 访问, 同时也节约点内存.
```
# 方法一. 使用命令行
# 知道启动系统的名字或UUID
VBoxManager list vms
# 启动指定的系统
VBoxManager -s UUID
# 或
VBoxManager -s 系统名字
# 方法二. 在点启动按钮的时候,按住 Shift 即可
```

安装前提
--------

```
# 在进行下列安装的时候 假设已经设置好了 rpmforg 已经安装了开发tao#套件 groupinstall "Development tools" -y
```

Install 7z
-----------
```
# Install 7zip, centos can not uncompress some zip file.
yum install p7zip -y
```

安装 GUI, 只针对于 minimal 安装的
----------------------------------
```
yum -y groupinstall "X Window System" "Desktop" "Fonts" "General Purpose Desktop"
# 默认是没有火狐的,自己手动安装
yum -y firefox
```

安装virtual-box的附加扩展
--------------------------
一般直接安装扩展的时候安装主模块有可能失败.
```
# 参考 http://wiki.centos.org/HowTos/Virtualization/VirtualBox/CentOSguest
# 需要先配置好 rpmforge
yum -y install dkms
yum -y groupinstall "Development Tools"
yum -y install kernel-devel
```

安装 git
--------
```
# 因为 git 版本太低了,所以打算自己安装git
yum --enablerepo=updates clean metadata
yum install perl-devel -y
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel -y
# 可以考虑使用其他版本, 例如 https://github.com/git/git/archive/v1.9.4.zip
# 使用发布版稳定些
curl -L -o git.zip https://github.com/git/git/archive/master.zip
# 或
# wget -O git.zip https://github.com/git/git/archive/master.zip
unzip git*.zip
cd git*
make prefix=/usr/local all
make prefix=/usr/local install
# 这里可能和 在 Development tools 里的git冲突
# 可以移除安装的git 从新打开终端就好了
yum remove git
exit
# reopen an terminal
# 如果不想移除 git
# 清除下 git 的hash就好了
hash -d git
```


Intsall ntfs-3g
----------------
```
# Add ntfs filesystem support, because I install centos with win7
# fllow this http://wiki.centos.org/TipsAndTricks/NTFS
yum install ntfs-3g -y
```

Install iBus
--------------
```
# fllow this http://code.google.com/p/ibus/wiki/CentOS
# 1.Install necessary packages
yum install ibus ibus-gtk ibus-qt
yum install ibus-pinyin # or other engine(s) you want
yum install im-chooser 
# 2. Enable input method at System->Perferences->Input Method
# 3. Add input methods
# 4.Re-login
```

Install python2.7 for goagent
-----------------------------
```
# Setup Development tools 
yum groupinstall "Development tools" -y
# basic lib
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel -y

# Manualy install puthon2.7, not change the system's 2.6 version
# When I install python 2.7.x, the newest is 2.7.5
# go check at http://python.org/ftp/python/
# BTW, you can install 3.x python by this way
PYTHON_VERSION=2.7.5
mkdir ~/src && cd $_
wget http://python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tar.bz2
tar xf Python-${PYTHON_VERSION}.tar.bz2
cd Python-${PYTHON_VERSION}
./configure --prefix=/usr/local

# -j 8 for more quickly
# Notice, make install change to make altinstall
make -j 8 && make altinstall
```

Install python-openssl for python2.7
------------------------------------
```
# Install python-openssl for goagent
mkdir -p ~/src && cd $_
yum install openssl openssl-devel -y
wget --no-check-certificate https://pypi.python.org/packages/source/p/pyOpenSSL/pyOpenSSL-0.13.tar.gz
tar -xzfv pyOpenSSL-0.13.tar.gz
cd pyOpenSSL-0.13
# Notice, compile for python2.7
python2.7 setup.py build_ext -I /usr/local/include/python2.7/ -L /usr/local/lib/python2.7/
python2.7 setup.py build
python2.7 setup.py install
```

Install goagent
-----------------
```
# Download goagent and run it, because I have to install chrome
mkdir -p ~/app && cd $_
wget https://goagent.googlecode.com/archive/3.0.zip
7za x 3.0.zip
mv goagent-* goagent

# setup your gea
vim goagent/local/proxy.ini

# and run
python2.7  goagent/local/goagent-gtk.py &
```

Install chrome
--------------
```
# Setup wget proxy for download chrome
# append the proxy setting to '/etc/wgetrc'
# Reamove it, when you do not need this
https_proxy = http://127.0.0.1:8087/
http_proxy = http://127.0.0.1:8087/
ftp_proxy = http://127.0.0.1:8087/
use_proxy = on

# Install google-chrome
# fllow this http://chrome.richardlloyd.org.uk/
mkdir -p ~/app && cd $_
wget http://chrome.richardlloyd.org.uk/install_chrome.sh
chmod u+x install_chrome.sh
./install_chrome.sh
```

Install gvim7.4
---------------
```
mkdir -p ~/src && cd $_
wget ftp://ftp.vim.org/pub/vim/unix/vim-7.4.tar.bz2
tar -jxvf vim-7.4.tar.bz2
# 
yum install lua lua-devel -y
yum install libX11 libX11-devel libXt-devel libgtk2 libgtk2-devel -y
#
VIM_FLAG='--enable-luainterp=yes --enable-cscope --enable-multibyte --enable-fontset --enable-gui'
#
./configure $VIM_FLAG
make -j 8 && make test -j 8 && make install
```

Install vim
---------------
```
# 直接使用yum搜索到的 为了使用简单
yum install vim-enhanced -y

```

Install Nvidia-driver
----------------------
```
# find out you card info
lspic | grep VGA
# download form nvidia http://www.nvidia.in/Download/index.aspx

# prepare
yum update
yum clean all
yum groupinstall "Development Tools"
yum install kernel-devel kernel-headers gcc make

added the following line to /etc/modprobe.d/blacklist.conf file
```





Bully + Aircrack-ng + Reaver
-------------------

> [reaver](https://reaver-wps.googlecode.com/files/reaver-1.4.tar.gz)  
> [aircrack-ng-1.2-beta1](http://download.aircrack-ng.org/aircrack-ng-1.2-beta1.tar.gz) 
> reaver 的替代 [bully](https://github.com/bdpurcell/bully)

```
# 准备工作
yum install -y libpcap libpcap-devel openssl-devel sqlite sqlite-devel
# 这个libnl 是用来支持 netlink (nl80211) 的
yum install -y libnl libnl-devel

# 先搞好 bully
curl -L -o bully.zip https://github.com/bdpurcell/bully/archive/master.zip
7za x bully.zip
cd bully-master/src
make
make install
cd -

# 再搞 Aircrack-ng
# 我安装时 最高版本为 1.2-beta3
# 这里需要注意的是, aircrack-ng 被墙了,至少我下载的时候是的
# 我是放在共享目录里拷贝过来的
# 也可以从 github 下载
# https://github.com/aircrack-ng/aircrack-ng
wget -O aircrack-ng.tar.gz http://download.aircrack-ng.org/aircrack-ng-1.2-beta3.tar.gz
tar -xvf aircrack-ng.tar.gz
cd aircrack-ng-*
# 安装过程可以参考这里
# http://www.aircrack-ng.org/doku.php?id=install_aircrack#installing_aircrack-ng_from_source
make sqlite=true
sudo make install
# 更新 OUI
sudo airodump-ng-oui-update

# 安装 reaver, 虽然有bully,但是reaver还是蛮不错的
wget https://reaver-wps.googlecode.com/files/reaver-1.4.tar.gz
tar -xzvf reaver-*.tar.gz
cd reaver-*/src
./configure
make
make install
```

pin creack
----------

```bash
ifconfig wlan0 down
# 这里会提示一些有可能被影响的进程 dhclient 和 wpa_supplicant
# 可以考虑将这些进程关闭
airmon-ng start wlan0
bully -e 热点名字 -v3 mon0

# 使用 reaver 的方法
wash -i mon0
reaver -a -S -vv -i mon0 -b `MAC`
```

通过命令行连接无线网, 简单版
----------------------------
来自 [connect-to-a-wireless-network-via-command-line](http://www.ghacks.net/2009/04/14/connect-to-a-wireless-network-via-command-line/)

```
#! /bin/bash
ifconfig wlan0
iwconfig wlan0 essid NETWORK_ID key WIRELESS_KEY
dhclient wlan0
```
`NETWORK_ID` 为无线名  
`WIRELESS_KEY` 搞不清楚,应该是密码吧. 默认为 16 进制的值,可以用 `s:WIRELESS_KEY` 来使用ascii

通过命令行连接无线网
--------------------

来自 [how-to-connect-to-wpawpa2-wifi-network](http://linuxcommando.blogspot.com/2013/10/how-to-connect-to-wpawpa2-wifi-network.html)

需要使用的工具
`yum install wpa_supplicant wireless-tools -y`

```
# 1. 查看你的无线设备名
$iw dev
phy#0
	Interface wlan0
		ifindex 3
		type managed
# 2. 检查无线设备是否启用 里面需要有个UP
$ ip link show wlan0
3: wlan0: (BROADCAST,MULTICAST) mtu 1500 qdisc noop state DOWN mode DEFAULT qlen 1000
    link/ether 74:e5:43:a1:ce:65 brd ff:ff:ff:ff:ff:ff
# 启用无线设备
$ ip link set wlan0 up

# 检查无线设备是否启用 里面有个UP
$ ip link show wlan0
3: wlan0: (NO-CARRIER,BROADCAST,MULTICAST,UP) mtu 1500 qdisc mq state DOWN mode DEFAULT qlen 1000
    link/ether 74:e5:43:a1:ce:65 brd ff:ff:ff:ff:ff:ff

# 3. 检查连接状态
$ /sbin/iw wlan0 link
Not connected.

# 4. 扫描网络
$ sudo /sbin/iw wlan0 scan
BSS 00:14:d1:9c:1f:c8 (on wlan0)
        ... 略过 ...
	freq: 2412
	SSID: Touch-me
	RSN:	 * Version: 1
		 * Group cipher: CCMP
		 * Pairwise ciphers: CCMP
		 * Authentication suites: PSK
		 * Capabilities: (0x0000)
        ... 略过 ...

# 这里的 SSID 和 安全协议类型很重要
# 这里是 RSN, 即 wpa2

# 5. 连接到 WPA/WPA2 wifi

$ wpa_passphrase 无线名称 >> /etc/wpa_supplicant.conf 
无线密码

# 正确的应该是这样的
$ cat /etc/wpa_supplicant.conf 
# reading passphrase from stdin
network={
	ssid="gorilla"
	#psk="testtest"
	psk=4dfe1c985520d26a13e932bf0acb1d4580461dd854ed79ad1a88ec221a802061
}

# 连接
$ sudo wpa_supplicant -B -D wext -i wlan0 -c /etc/wpa_supplicant.conf
# -B 在后台运行
# -D 指定无线设为, wext为普通无线设备
# -c 配置文件路径

# 检查是否连接
$ /sbin/iw wlan0 link
Connected to 00:14:d1:9c:1f:c8 (on wlan0)
	SSID: gorilla
	freq: 2412
	RX: 63825 bytes (471 packets)
	TX: 1344 bytes (12 packets)
	signal: -27 dBm
	tx bitrate: 6.5 MBit/s MCS 0

	bss flags:	short-slot-time
	dtim period:	0
	beacon int:	100
# 6. 通过 DHCP 获取 IP地址
$ sudo dhclient wlan0
# 有时候无法获取 可以考虑 dhclient -x 关闭后从新获取

# 查看 IP 地址
$ ip addr show wlan0
3: wlan0:  mtu 1500 qdisc mq state UP qlen 1000
    link/ether 74:e5:43:a1:ce:65 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.113/24 brd 192.168.1.255 scope global wlan0
    inet6 fe80::76e5:43ff:fea1:ce65/64 scope link 
       valid_lft forever preferred_lft forever
	   
# 7. 添加默认路由规则(可略过)
$ ip route show
192.168.1.0/24 dev wlan0  proto kernel  scope link  src 192.168.1.113 

#  这条规则是转发 (192.168.1.*) 到 wlan0,如果你想添加其他的 可以用以下方法
$ sudo ip route add default via 192.168.1.254 dev wlan0
$ ip route show
default via 192.168.1.254 dev wlan0 
192.168.1.0/24 dev wlan0  proto kernel  scope link  src 192.168.1.113 

# 8. 测试是否正确连接
$ ping 8.8.8.8
```

自动连接无线的配置
-------------

参考官方的 [wpa_supplicant 配置](http://wiki.centos.org/HowTos/Laptops/WpaSupplicant)
这里没有提到给 wlan0 配置自动的 dhcp

感觉上 
`echo BOOTPROTO=dhcp | sudo tee -a /etc/sysconfig/network-scripts/ifcfg-wlan0`
这样就可以了~但是还是不行,还是要 `dhclient wlan0`

需要参考 [这个](http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-networkscripts-interfaces.html) 来配置.也可以参考[这个](http://www.linuxhomenetworking.com/wiki/index.php/Quick_HOWTO_:_Ch13_:_Linux_Wireless_Networking#.U0YCk_mSyR0)来配置.

```
# 调试
wp _supplicantwpaa_supplicant -iwlan0 -c/etc/wpa_supplicant/wpa_supplicant.conf -d
```

忘记密码
--------

在 `grub` 启动的时候, 中断自动启动, 看到选择列表的时候, 按 `a`, 删除 `rhgb quiet` 然后输入 `1` 回车, 即可进入单用户模式. 随后使用 passwd 修改完成密码后重启就可以回到多用户模式了.

参考 [ResetRootPassword](http://wiki.centos.org/TipsAndTricks/ResetRootPassword)

安装开发环境
=============

Install JDK
----
考虑需要安装的 jdk 发布商, 选择 openJDK 还是 oracle 的 jdk
可参考这里[webupd8](https://launchpad.net/~webupd8team/+archive/java) 来安装 oracle 的jdk.
或者参考[这个](http://d.stavrovski.net/blog/post/how-to-install-and-setup-oracle-java-jdk-in-centos-6)安装步骤,还可以参考[这里](https://wiki.powerfolder.com/display/PFS/Installing+Oracle+Java+on+Linux)
```
# 查看 repo 中支持的 jdk 版本, 一般 centos 的repo中只有 openjdk
yum search java-1
# 确保系统中没有 已经安装
rpm -qa | grep java-
# 如果有的话 则删除syum remove java-1.6.0-openjdkayn`
```
我选择的手[动下](http://www.oracle.com/technetwork/java/javase/downloads/index.html)载 oracle 的 jdk,毕竟 oracle 的jdk更稳定些.

我安装 JDK8 的下载地址
http://download.oracle.com/otn-pub/java/jdk/8u5-b13/jdk-8u5-linux-x64.rpm

```
wget --no-check-certificate --no-cookies \
    --header "Cookie: oraclelicense=accept-securebackup-cookie"\
    "http://download.oracle.com/otn-pub/java/jdk/8u5-b13/jdk-8u5-linux-x64.rpm"
rpm -Uvh jdk-*.rpm
```


Install nodejs
---------------
```
mkdir -p ~/src && cd $_
wget -e "http_proxy = http://127.0.0.1:8087/"  http://nodejs.org/dist/node-latest.tar.gz
tar zxvf node-latest.tar.gz
./configure
make && make install
# Already installed npm with nodejs source
```

Install nginx
-------------
```
# add nginx repo
cat > /etc/yum.repos.d/nginx.repo <<WEN
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
WEN
# check
yum repolist
# install
yum install nginx -y
```

Install php
------------
```
yum groupinstall 'PHP Support'
```
安装服务
=============

Install vsftpd
---------------

```
# 确定有
yum search vsftpd
```

Install openssh-server
-------------------
```
# 参考 http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-openssh-server-config.html
yum install openssh-server -y
# 配置文件为 /etc/ssh/sshd_config
# 启动
/sbin/service sshd start
# 从主机连接
# ssh 用户名@该linux机器的IP
```

Install tomcat
----------
```
tar -zxvf apache-tomcat*.tar.gz
mv apache-tomcat* /opt/tomcat
# 启动
/opt/tomcat/bin/startup.sh
# 配置 iptable, 使外部可以访问
# 查看目前的 IPTables 设置
iptables -nL --linenumber
# 确保插入在 REJECT any 前面, 5 为行号 根据个人的情况修改
iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 8080 -j ACCEPT -m comment --comment "Tomcat Server port"
service iptables save
```

Install hadoop
--------------
参考[这里](http://tecadmin.net/steps-to-install-hadoop-on-centosrhel-6/)

Install apache
--------------
[apache-inshttpd](https://www.centos.org/docs/5/html/Cluster_Administration/s1-apache-inshttpd-CA.html)
```
yum install httpd
# 完成后 需要在 /etc/httpd/conf/httpd.conf 中添加一句
# ServerName localhost
# 如果想要使用 apachectl status 命令 需要 elinks 和 mod_status
# 关于使用 status 出现错误的情况 参考
# http://www.mydigitallife.info/request-url-server-status-or-404-page-not-found-apache-error/
```
想要使用 apachectl status 在 httpd.conf 中添加如下配置
```
ExtendedStatus on
<IfModule mod_status.c>
    # Allow server status reports generated by mod_status,
    # with the URL of http://servername/server-status
    # Change the ".example.com" to match your domain to enable.
    #
    <Location /server-status>
        SetHandler server-status
        Order deny,allow
        Allow from all
    </Location>
</IfModule>
```

### 配置 mod_jk
```
# 使用的时候 只有 1.2.40 版本
# 可以查看其他版本 http://www.apache.org/dist/tomcat/tomcat-connectors/jk/
wget http://www.apache.org/dist/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.40-src.zip
unzip tomcat-connectors*.zip
cd tomcat-connectors*
cd native
# 这里有点扯淡的是 这些脚本都是dos 格式的 所以需要先 dos2unix
# 所以我直接换了个版本 使用的 1.2.39 的, 代码格没问题
yum install -y httpd-devel
./configure --with-apxs=/usr/sbin/apxs
make
make install
```

集群配置完成个可以通过刷新 http://cloud01/manager/status 这个页面, 观察 IP address 来判断是否成功.

Install MySQL
---------------
```
yum -y groupinstall 'MySQL Database server' 'MySQL Database client'
yum -y install php-mysql
#/sbin/service mysqld start
#/sbin/service mysqld stop
#/sbin/service mysqld restart
```
