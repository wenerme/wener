---
title: Samba
---

# Samba

- [Samba3 by Example](https://www.samba.org/samba/docs/Samba3-ByExample.pdf)
- [Samba3 How to](https://www.samba.org/samba/docs/Samba3-HOWTO.pdf)
- [Server Message Block](https://en.wikipedia.org/wiki/Server_Message_Block)
- [CIFSD](https://en.wikipedia.org/wiki/CIFSD) - in-kernel CIFS/SMB server
  - [namjaejeon/cifsd](https://github.com/namjaejeon/cifsd)
- Wikipedia [Samba](<https://en.wikipedia.org/wiki/Samba_(software)>)
- 添加的用户名必须要先存在于系统中,即需要先 `useradd`
- 禁用打印机服务

```ini
load printers = no
printing = bsd
printcap name = /dev/null
```

- 允许访客登陆
  - `guest ok = yes`
  - `smbclient //127.0.0.1/public -U guest`
- smb.conf
  - [Using samba ch06](https://www.samba.org/samba/docs/using_samba/ch06.html)
  - man [smb.conf](https://www.samba.org/samba/docs/man/manpages/smb.conf.5.html)
- 默认端口
  - 137 netbios-ns NETBIOS Name Service
  - 138 netbios-dgm NETBIOS Datagram Service
  - 139/udp/tcp netbios-ssn NETBIOS Session Service
  - 445/tcp NetBIOS was moved to 445 after 2000 and beyond, (CIFS)
- 相关端口
  - 901 SWAT service (not related to client communication)
  - 445 microsoft-ds 域控
- 组件
  - smbd
  - nmbd
- 工具
  - smbstatus - 查看服务状态
    - 当前文件锁
  - eventlogadm
- samba-dc
  - samba-tool
  - samba - gpupdate dnsupdate downgrade_db kcc spnupdate upgradedns
- samba-winbind
  - winbindd

```bash
# 带 samba 的镜像
docker run --rm -it -p 139:139 -p 445:445 -v $PWD:/share -w /share wener/samba sh

# 或者 APK 安装
apk add samba samba-dc

# Linux
mount -t cifs -o username=username,password=password,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 //192.168.1.120/storage /mnt/storage
mount -t cifs -o credentials=/root/.the-creds-file,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 //192.168.1.120/storage /mnt/storage
# this-creds-file
# username=winuser
# password=winpass

# fstab
# //192.168.1.120/storage /mnt/storage        cifs    credentials=/root/.smbcredentials,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 0 0

# Windows
net use Z: \\computer_name\share_name /PERSISTENT:YES
# 断开连接
net use  Z: /delete

smbcontrol all reload-config
# killall -HUP smbd nmbd
```

## Quick start

- guest 需要 `map to guest = Bad User`

```bash
# Debian: apt-get install samba samba-client

mkdir -p ~/temp/share && cd $_
mkdir private state usershare public
chmod 755 public
cat <<CONF > smbd.ini
[global]
log file = $PWD/log.%m
idmap config * : backend = tdb
state directory = $PWD/state
usershare path = $PWD/usershare
private dir = $PWD/private
smb passwd file = $PWD/private/smbpasswd

[public]
comment = Public share
path = $PWD/public
valid users = wener
read only = No
CONF
# 新建用户, 密码不需要和系统密码相同, 但需要存在该用户
# -s /sbin/nologin -d /dev/null
# 默认 state 路径为 /var/lib/samba/ 后端默认为 tdb
adduser wener -DH
smbpasswd -L -c smbd.ini -a wener

# 检测配置正确
testparm smbd.ini
# 输出最终配置
testparm -v smbd.ini

# 启动服务
smbd -s smbd.ini

# 例举所有共享
smbclient  -L //127.0.0.1/public -U wener
# 连接
smbclient  //127.0.0.1/public -U wener
# Linux: smb://<HOST_IP_OR_NAME>/<folder_name>/
# Windows: \\<HOST_IP_OR_NAME>\<folder_name>\

# 挂载 smb, 修改密码为之前输入的密码
mount -t smbfs //wener:wener@localhost/public ~/mnt/smb/
mount –t smbfs //localhost/public ~/mnt/smb/ –o username=wener

mount -t cifs -o user=luke //192.168.1.1/share /mnt
```

https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html

## smb.conf

- [smb.conf.5](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)
- 特殊 section
  - global
    - 全局配置或默认配置
  - homes
    - 如果配置了，则支持自动创建 HOME 目录
    - `%S` 用户宏 `path = /data/users/%S`
  - printers
    - 类似于 homes，但是用于打印机

tdb (idmap_tdb(8)), tdb2 (idmap_tdb2(8)), ldap (idmap_ldap(8)), rid (idmap_rid(8)), hash (idmap_hash(8)), autorid (idmap_autorid(8)), ad (idmap_ad(8)), nss (idmap_nss(8)), and rfc2307 (idmap_rfc2307(8)).

idmap_tdb
Samba's idmap_tdb Backend for Winbind

The idmap_tdb plugin is the default backend used by winbindd for storing SID/uid/gid mapping tables.

In contrast to read only backends like idmap_rid, it is an allocating backend: This means that it needs to allocate new user and group IDs in order to create new mappings.

range = low - high
Defines the available matching uid and gid range for which the backend is authoritative.

idmap_tdb2 — Samba's idmap_tdb2 Backend for Winbind
The idmap_tdb2 plugin is a substitute for the default idmap_tdb backend used by winbindd for storing SID/uid/gid mapping tables in clustered environments with Samba and CTDB.

script
This option can be used to configure an external program for performing id mappings instead of using the tdb counter. The mappings are then stored int tdb2 idmap database. For details see the section on IDMAP SCRIPT below.

idmap config \* : script = /usr/local/samba/bin/idmap_script.sh

不建议使用 hash

The idmap_ad plugin provides a way for Winbind to read id mappings from an AD server that uses RFC2307/SFU schema extensions.

"map to guest = Bad User" will reject a user if that user is in the server's samba password database but has the wrong password. But if the client user name doesn't exist in the samba password database he is converted to the guest account and then it's up to a given share definition to determine if he can gain access.

"map to guest = Never" makes the exact same comparison to the database but if it doesn't find that user it doesn't convert the user to the guest account it just rejects him and that user isn't even allowed to view the share list.

Don't pass a username and the "map to guest" logic is never used at the browse level and that's what a Linux client does unless you force it..

Starting with v4.0, Samba is (or can be):

a file server
a DNS server
an LDAP server
a Kerberos server
an AD server

https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller

Create an Active Directory Infrastructure with Samba4 on Ubuntu
https://www.tecmint.com/install-samba4-active-directory-ubuntu/

Windows 7 Service Pack 1 (SP1) 远程服务器管理工具
https://www.microsoft.com/zh-cn/download/details.aspx?id=7887

Alpine Linux based container (aka Docker) for Samba 4 Active Directory
https://github.com/tkaefer/alpine-samba-ad-container

https://github.com/dperson/samba

https://github.com/cptactionhank/docker-netatalk

```ini
# 全局配置
# 其他 sestion 的默认配置
[global]
security = domain
workgroup = MAIN

state directory = ${prefix}/var/locks

usershare path = ${prefix}/var/locks/usershares

# 服务返回信息
server string = server %h
# 不起名匿名
map to guest = never

idmap config * : backend        = tdb
idmap config * : range          = 1000000-1999999

idmap config MAIN : backend     = rid
idmap config MAIN : range       = 5000000-5999999

idmap config TRUSTED : backend  = rid
idmap config TRUSTED : range    = 6000000-6999999

# 服务会在链接是创建主目录
[homes]
path = /data/pchome/%S

# 和 [homes] 类似, 但是针对打印机的
[printers]
path = /usr/spool/public
guest ok = yes
printable = yes

[foo]
# 备注
comment = Public share
# 路径
path = /data/share/public
# 用户
valid users = wener
# 是否只读
read only = No
```

socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=65536 SO_SNDBUF=65536

docker run --rm -it --cap-add SYS_ADMIN --cap-add DAC_READ_SEARCH -v $PWD:/share -w /share wener/samba sh

mount -t cifs //10.88.2.202/share $PWD/mnt -o user=user,password=pass

```ini
[global]
workgroup = MYGROUP
server string = Samba Server
server role = standalone server
log file = /usr/local/samba/var/log.%m
max log size = 50
dns proxy = no

idmap config * : backend = tdb

hosts allow = 192.168.0.

[public]
comment = Public share
path = /data/share
read only = No
valid users = share

browsable = yes
writable = yes
create mask = 0775
directory mask = 0755
```

## smbd --help

```
Usage: smbd [OPTION...]
  -D, --daemon                            Become a daemon (default)
  -i, --interactive                       Run interactive (not a daemon) and log to stdout
  -F, --foreground                        Run daemon in foreground (for daemontools, etc.)
      --no-process-group                  Don't create a new process group
  -S, --log-stdout                        Log to stdout
  -b, --build-options                     Print build options
  -p, --port=STRING                       Listen on the specified ports
  -P, --profiling-level=PROFILE_LEVEL     Set profiling level

Help options:
  -?, --help                              Show this help message
      --usage                             Display brief usage message

Common samba options:
  -d, --debuglevel=DEBUGLEVEL             Set debug level
  -s, --configfile=CONFIGFILE             Use alternate configuration file
  -l, --log-basename=LOGFILEBASE          Base name for log files
  -V, --version                           Print version
      --option=name=value                 Set smb.conf option from command line
```

## FAQ

### NT_STATUS_BAD_NETWORK_NAME

可能是因为目录没有权限

### MacOS 下无法使用

https://community.spiceworks.com/topic/2085366-can-samba-active-directory-and-afp-run-simultaneously

### NT_STATUS_INVALID_NETWORK_RESPONSE

可能是 min protocol 导致的
https://www.linuxquestions.org/questions/linux-networking-3/samba-min-protocol-%3D-smb2-causes-protocol-negotiation-failed-nt_status_invalid_network_response-4175597669/

## NTLMv1 NT_STATUS_WRONG_PASSWORD

- Samba 默认只允许 NTLMv2
  - 修改为允许 v1 `ntlm auth = ntlmv1-permitted`
- 或者 Windows 修改为使用 v2
  - `secpol.msc`
  - NTLMv2 response only/refuse LM and NTLM.
- Windows 7 开始默认 NTLMv2 但有可能开启共享时被配置成了 v1
