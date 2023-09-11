---
tags:
  - FAQ
---

# SSH FAQ

## tunning only user

**配置限制**

```
Match User tunning
  AllowTcpForwarding yes
  X11Forwarding no
  AllowAgentForwarding no
  ForceCommand /bin/false
```

**用户限制**

```bash
useradd sshtunnel -m -d /home/sshtunnel -s /bin/true
```

**authorized_keys**

```
from="192.168.1.10",command="/usr/bin/ls" ssh-rsa XXX
```

- https://unix.stackexchange.com/a/337445/47774

## sshuttle user

- https://github.com/sshuttle/sshuttle/issues/703

## key_load_public: No such file or directory

找不到 `~/.ssh/id_rsa.pub`，不影响使用

## channel 0: open failed: administratively prohibited: open failed - stdio forwarding failed

不允许 PortForward，需要开启

## 端口转发

- -L/LocalForward 本地转发
- -R/RemoteForward 远程转发

```bash
# 访问本地 80 会被转发到 SERVER:8080
ssh -L 8080:localhost:80 SERVER -o ExitOnForwardFailure=yes

# 访问 SERVER:80 会被转发到本地 8080 端口
# -g 允许外部访问
ssh -g -R 80:localhost:8080 SERVER -o ExitOnForwardFailure=yes
```

允许端口转发

**/etc/ssh/sshd_config**

```conf
AllowAgentForwarding yes
AllowTcpForwarding yes
# 允许 -g
GatewayPorts yes
```

## 不校验主机

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222

# 忽略 SSH Agent，测试 key
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o IdentityAgent=none -i /tmp/sshkey root@127.0.0.1 -p 2222
```

## no matching key exchange method found. Their offer: diffie-hellman-group1-sha1

**~/.ssh/config**

```
KexAlgorithms +diffie-hellman-group1-sha1
```

## no matching cipher found. Their offer: aes128-cbc,3des-cbc,aes256-cbc,twofish256-cbc,twofish-cbc,twofish128-cbc,blowfish-cbc

服务端提供的 cipher 客户端不支持

### 修改客户端支持 cipher

```
Host gitlab.com
     Ciphers aes256-ctc
```

### 修改服务端 cipher

**/etc/ssh/ssh_config**

添加 cipher

```
Ciphers aes128-ctr,aes192-ctr,aes256-ctr,aes128-cbc,3des-cbc,aes192-cbc,aes256-cbc
```

## 强制密码登陆

```bash
ssh user:@example.com
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no example.com
```

## 查看 pubkey 类型

```bash
find ~/.ssh/id_*.pub -exec ssh-keygen -l -f {} \;
```

## send_pubkey_test: no mutual signature algorithm

openssh 不再默认支持 ssh-rsa

```conf title="sshd_config"
PubkeyAcceptedKeyTypes +ssh-rsa
```

推荐使用 ECDSA,Ed25519

```bash
ssh-keygen -t ed25519 -C "a@b.com" -f $PWD
```

## ssh into tmux

```
Host example.org
	RemoteCommand tmux new -A -s default
```

## 不记录 localhost 的 host key

```
Host localhost
	UserKnownHostsFile /dev/null
	StrictHostKeyChecking no
```

## chmod ssh

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

chmod go-w ~

# restorecon -R -v /root/.ssh
```

## 公网密码探测账号

```bash
grep 'Failed password' /var/log/messages* | egrep -o 'invalid user \w+' | egrep -o '\w+$' | sort -u
```

```
1234
a
admin
ansadmin
ansible
apache
app
appuser
ark
arkserver
awsgui
bigdata
bitrix
bot
carlos
cassandra
centos
customer
data
deepspeed
demo
deploy
dev
developer
devops
docker
dockeradmin
dolphinscheduler
elastic
elasticsearch
elk
elsearch
emqx
engineer
es
esadmin
esroot
esuser
fa
ftp
ftpuser
gbase
git
gitlab
gmod
gpadmin
guest
hadoop
halo
hive
inspur
jenkins
jumpserver
jupyter
kubernetes
lighthouse
mail
mapr
mcserver
minecraft
mongodb
mysql
nexus
nginx
nvidia
odoo
odoo15
oracle
oscar
plex
posiflex
postgres
rancher
ranger
satisfactory
sftp
sftpuser
sonar
squid
steam
subbu
support
teamspeak
test
tester
testuser
tom
tomcat
ts
ubnt
ubuntu
uftp
user
user1
username
uucp
vagrant
vpn
www
x
zjw
```

## scp sudo

```bash
rsync -avz --rsync-path="sudo rsync" /tmp/test.txt svr:/tmp/
```

## ssh root forward agent

```bash
# -E 保留环境变量
sudo -E -s
```

- --preserve-env=SSH_AUTH_SOCK

## expecting SSH2_MSG_KEX_ECDH_REPLY
