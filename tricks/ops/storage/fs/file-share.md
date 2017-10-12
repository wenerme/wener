# File Share

## Tips

* [AFP vs. SMB and NFS file sharing for network clients](https://www.helios.de/web/EN/news/AFP_vs_SMB-NFS.html)

## NFS
* 允许本地访问远程文件
* 使用 C/S 结构在 \*nix 之间分析文件
* 两个机器之间不需要允许相同的操作系统
* 可使用 NSF 指定中心存储解决方案
* 用户不需要关系文件的物理位置
* 不需要手动刷新来显示文件
* 新版本的 NFS 也支持 ACL
* 可用过防火墙和 Kerberos 来保证安全
* 默认 2049 端口
* 使用 Kerberos 可使用密码进行验证

```bash
# 共享该目录
sudo mkdir -p /share
# 赋予当前用户共享目录权限
sudo chown $USER /share
# OS X
echo '/share -network 192.168.0.0 -mask 255.255.0.0' | sudo tee /etc/exports
# Linux
# echo '/nfsshare 192.168.0.101(rw,sync,no_root_squash)' | sudo tee /etc/exports

sudo nfsd enable
sudo nfsd start
sudo nfsd status
sudo nfsd checkexport

# 如果修改了 exports 文件
sudo nfsd update
showmount -e
# 查看共享目录
showmount -e 192.168.34.120

mount -t nfs 192.168.0.100:/share /mnt/nfsshare
umount 192.168.0.100:/share

# 关闭 nfs
sudo nfsd stop
sudo nfsd disable

# 如果 mac 下 mount 出现 Operation not permitted, 则添加 -o resvport
sudo mount -t nfs -o resvport 192.168.1.1:/ ~/mnt/alpine/

# 如果想让客户端非 root 访问服务端 root 信息, 则可以
# all_squash,anonuid=0,anongid=0
# 使所有用户都作为匿名用户,而匿名用户则默认为 root
# 也可以指定为特定的用户,例如 id asterisk
```

* showmount
  * `-e` 显示本地共享
  * `-e <server-ip or hostname>` 显示远程共享
  * `-d` 例举所有子目录
* exportfs
  * `-v` 例举共享的文件和选项
  * `-a` 导出所有 `/etc/exports` 中的共享配置
  * `-u` 取消共享 `/etc/exports` 中的配置
  * `-r` 在修改 `/etc/exports` 后刷新服务共享列表

* Alpine [NFS](https://wiki.alpinelinux.org/wiki/Setting_up_a_nfs-server)
* [/etc/exports](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Deployment_Guide/s1-nfs-server-config-exports.html)
* http://kodi.wiki/view/NFS


```
program vers proto   port
 100000    2   tcp    111  portmapper,rpcbind
 100000    2   udp    111  portmapper
 100005    1   udp    950  mountd
 100005    3   udp    950  mountd
 100005    1   tcp    884  mountd
 100005    3   tcp    884  mountd
 100003    2   udp   2049  nfs
 100003    3   udp   2049  nfs
 100003    2   tcp   2049  nfs
 100003    3   tcp   2049  nfs
 100024    1   udp    644  status
 100024    1   tcp    918  status
 100021    0   udp    630  nlockmgr
 100021    1   udp    630  nlockmgr
 100021    3   udp    630  nlockmgr
 100021    4   udp    630  nlockmgr
 100021    0   tcp    917  nlockmgr
 100021    1   tcp    917  nlockmgr
 100021    3   tcp    917  nlockmgr
 100021    4   tcp    917  nlockmgr
```

## Samba

* [Samba3 by Example](https://www.samba.org/samba/docs/Samba3-ByExample.pdf)
* [Samba3 How to](https://www.samba.org/samba/docs/Samba3-HOWTO.pdf)

### Tips
* 添加的用户名必须要先存在于系统中,即需要先 `useradd`
* 禁用打印机服务
```ini
load printers = no
printing = bsd
printcap name = /dev/null
```
* 允许访客登陆
  * `guest ok = yes`
  * `smbclient  //127.0.0.1/public -U guest`
* smb.conf
  * [Using samba ch06](https://www.samba.org/samba/docs/using_samba/ch06.html)
  * man [smb.conf](https://www.samba.org/samba/docs/man/manpages/smb.conf.5.html)
* 默认端口
  * TCP: 139, 445
  * UDP: 137, 138

### Quick start

```bash
# Debian: apt-get install samba samba-client

mkdir -p ~/temp/share && cd $_
mkdir public
# 新建用户, 密码不需要和系统密码相同
sudo smbpasswd -L -a wener
cat <<CONF > smbd.ini
[global]
log file = $PWD/smbd.log
idmap config * : backend = tdb

[public]
comment = Public share
path = $PWD/public
valid users = wener
read only = No
CONF
# 检测配置正确
testparm smbd.ini

# 启动服务
sudo smbd -s smbd.ini

# 例举所有共享
smbclient  -L //127.0.0.1/public -U wener
# 连接
smbclient  //127.0.0.1/public -U wener
# Linux: smb://<HOST_IP_OR_NAME>/<folder_name>/
# Windows: \\<HOST_IP_OR_NAME>\<folder_name>\

# 挂载 smb, 修改密码为之前输入的密码
mount -t smbfs //wener:wener@localhost/public ~/mnt/smb/
mount –t smbfs //localhost/public ~/mnt/smb/ –o username=wener
```


## FTP

* [pure-ftpd](http://www.pureftpd.org/project/pure-ftpd)
  * [Pure-FTPd:wikipedia](https://en.wikipedia.org/wiki/Pure-FTPd)
  * Pure-FTPd 非常简单的 FTP 服务, 只需要 `pure-ftpd &` 即可.
* [vsftpd](https://security.appspot.com/vsftpd.html)
  * [vsftpd:wikipedia](https://en.wikipedia.org/wiki/Vsftpd)
  * 相对较为安全并且迅速稳定.
* [ProFTPD](http://www.proftpd.org/)
  * [ProFTPD:wikipedia](https://en.wikipedia.org/wiki/ProFTPD)
  * 有较多的特性

### OS X
```bash
# 自带的 FTP 文件共享
sudo -s launchctl load -w /System/Library/LaunchDaemons/ftp.plist
ftp localhost
sftp localhost
# 关闭 FTP 服务
sudo -s launchctl unload -w /System/Library/LaunchDaemons/ftp.plist
```

### Pure-FTPd
```bash
# Create a group for Pure-FTPD.
# OS X http://serverfault.com/questions/20702
groupadd ftpgroup
# Add a user to the group (revoke the home directory and deny acces to shell login).
useradd -g ftpgroup -d /dev/null -s /etc ftpuser


# Create a directory for your ftp-files (you can also specify a specific user e.g.: /root/ftphome/bob).
mkdir /root/ftphome

# Create a ftp-user, in our example "bob" (again you can set "-d /root/ftphome/bob/" if you wish).
pure-pw useradd bob -u ftpuser -g ftpgroup -d /root/ftphome/


# Update the ftp database after adding our new user.
pure-pw mkdb

# This is optional, you can list the users in the database, and enumerate spesific users...
pure-pw list
pure-pw show bob

# We set symbolic links for some files.
ln -s /etc/pure-ftpd/pureftpd.passwd /etc/pureftpd.passwd
ln -s /etc/pure-ftpd/pureftpd.pdb /etc/pureftpd.pdb
ln -s /etc/pure-ftpd/conf/PureDB /etc/pure-ftpd/auth/PureDB

# The specified ftp directory (and all it's sub-direcotries) needs to be owned by "ftpuser".
chown -R ftpuser:ftpgroup /root/ftphome
# Finally we restart Pure-FTPD. You should now be able to log in with your created user account.
pure-ftpd restart
```

### vsftp
#### vsftpd.conf.example
```conf
# Example config file /etc/vsftpd.conf
#
# The default compiled in settings are fairly paranoid. This sample file
# loosens things up a bit, to make the ftp daemon more usable.
# Please see vsftpd.conf.5 for all compiled in defaults.
#
# READ THIS: This example file is NOT an exhaustive list of vsftpd options.
# Please read the vsftpd.conf.5 manual page to get a full idea of vsftpd's
# capabilities.
#
# Allow anonymous FTP? (Beware - allowed by default if you comment this out).
anonymous_enable=YES
#
# Uncomment this to allow local users to log in.
#local_enable=YES
#
# Uncomment this to enable any form of FTP write command.
#write_enable=YES
#
# Default umask for local users is 077. You may wish to change this to 022,
# if your users expect that (022 is used by most other ftpd's)
#local_umask=022
#
# Uncomment this to allow the anonymous FTP user to upload files. This only
# has an effect if the above global write enable is activated. Also, you will
# obviously need to create a directory writable by the FTP user.
#anon_upload_enable=YES
#
# Uncomment this if you want the anonymous FTP user to be able to create
# new directories.
#anon_mkdir_write_enable=YES
#
# Activate directory messages - messages given to remote users when they
# go into a certain directory.
dirmessage_enable=YES
#
# Activate logging of uploads/downloads.
xferlog_enable=YES
#
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES
#
# If you want, you can arrange for uploaded anonymous files to be owned by
# a different user. Note! Using "root" for uploaded files is not
# recommended!
#chown_uploads=YES
#chown_username=whoever
#
# You may override where the log file goes if you like. The default is shown
# below.
#xferlog_file=/var/log/vsftpd.log
#
# If you want, you can have your log file in standard ftpd xferlog format.
# Note that the default log file location is /var/log/xferlog in this case.
#xferlog_std_format=YES
#
# You may change the default value for timing out an idle session.
#idle_session_timeout=600
#
# You may change the default value for timing out a data connection.
#data_connection_timeout=120
#
# It is recommended that you define on your system a unique user which the
# ftp server can use as a totally isolated and unprivileged user.
#nopriv_user=ftpsecure
#
# Enable this and the server will recognise asynchronous ABOR requests. Not
# recommended for security (the code is non-trivial). Not enabling it,
# however, may confuse older FTP clients.
#async_abor_enable=YES
#
# By default the server will pretend to allow ASCII mode but in fact ignore
# the request. Turn on the below options to have the server actually do ASCII
# mangling on files when in ASCII mode.
# Beware that on some FTP servers, ASCII support allows a denial of service
# attack (DoS) via the command "SIZE /big/file" in ASCII mode. vsftpd
# predicted this attack and has always been safe, reporting the size of the
# raw file.
# ASCII mangling is a horrible feature of the protocol.
#ascii_upload_enable=YES
#ascii_download_enable=YES
#
# You may fully customise the login banner string:
#ftpd_banner=Welcome to blah FTP service.
#
# You may specify a file of disallowed anonymous e-mail addresses. Apparently
# useful for combatting certain DoS attacks.
#deny_email_enable=YES
# (default follows)
#banned_email_file=/etc/vsftpd.banned_emails
#
# You may specify an explicit list of local users to chroot() to their home
# directory. If chroot_local_user is YES, then this list becomes a list of
# users to NOT chroot().
# (Warning! chroot'ing can be very dangerous. If using chroot, make sure that
# the user does not have write access to the top level directory within the
# chroot)
#chroot_local_user=YES
#chroot_list_enable=YES
# (default follows)
#chroot_list_file=/etc/vsftpd.chroot_list
#
# You may activate the "-R" option to the builtin ls. This is disabled by
# default to avoid remote users being able to cause excessive I/O on large
# sites. However, some broken FTP clients such as "ncftp" and "mirror" assume
# the presence of the "-R" option, so there is a strong case for enabling it.
#ls_recurse_enable=YES
#
# When "listen" directive is enabled, vsftpd runs in standalone mode and
# listens on IPv4 sockets. This directive cannot be used in conjunction
# with the listen_ipv6 directive.
listen=YES
#
# This directive enables listening on IPv6 sockets. To listen on IPv4 and IPv6
# sockets, you must run two copies of vsftpd with two configuration files.
# Make sure, that one of the listen options is commented !!
#listen_ipv6=YES
```



## Share
* [ProjectSend](https://github.com/ignacionelson/ProjectSend)
  * Star < 100
* [SparkleShare](https://github.com/hbons/SparkleShare)
  * C#
  * Star 3k
* [Syncany](https://github.com/syncany/syncany)
  * Java
  * Star 1k
* [seafile](https://github.com/haiwen/seafile)
  * C++
  * Star 3k
* [ownCloud](https://github.com/owncloud/core)
  * PHP
  * Star 4k

## Syncany

```bash
brew install https://get.syncany.org/homebrew/syncany.rb
# http://syncany.readthedocs.org/en/latest/commands.html
sy init
sy status
sy down
sy up
```

## Tools
当操作物理设备时,会涉及到很多常用的工具

dd
fdisk
gdisk

