---
id: share
title: Share
---

# File Share

- [AFP vs. SMB and NFS file sharing for network clients](https://www.helios.de/web/EN/news/AFP_vs_SMB-NFS.html)

## FTP

- [pure-ftpd](http://www.pureftpd.org/project/pure-ftpd)
  - [Pure-FTPd:wikipedia](https://en.wikipedia.org/wiki/Pure-FTPd)
  - Pure-FTPd 非常简单的 FTP 服务, 只需要 `pure-ftpd &` 即可.
- [vsftpd](https://security.appspot.com/vsftpd.html)
  - [vsftpd:wikipedia](https://en.wikipedia.org/wiki/Vsftpd)
  - 相对较为安全并且迅速稳定.
- [ProFTPD](http://www.proftpd.org/)
  - [ProFTPD:wikipedia](https://en.wikipedia.org/wiki/ProFTPD)
  - 有较多的特性

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

- [ProjectSend](https://github.com/ignacionelson/ProjectSend)
  - Star < 100
- [SparkleShare](https://github.com/hbons/SparkleShare)
  - C#
  - Star 3k
- [Syncany](https://github.com/syncany/syncany)
  - Java
  - Star 1k
- [seafile](https://github.com/haiwen/seafile)
  - C++
  - Star 3k
- [ownCloud](https://github.com/owncloud/core)
  - PHP
  - Star 4k

## Syncany

```bash
brew install https://get.syncany.org/homebrew/syncany.rb
# http://syncany.readthedocs.org/en/latest/commands.html
sy init
sy status
sy down
sy up
```
