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

```
Match User admin
    AllowTcpForwarding yes
```

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
# 忽略 Host key 变化
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

## SNI Routing

```
Host *.ssh
  ProxyCommand openssl s_client -quiet -servername %h -connect gateway:443
```

**nginx**

```
stream {
    tcp_nodelay on;
    resolver 8.8.8.8;
    resolver_timeout 5s;
    map $ssl_server_name $srv_name {
        ~(.+)\.ssh $1:22;
        default unix:/run/nginx.sock;
    }
    server {
        listen 443 ssl;
        ssl_certificate     /path/to/your/cert;
        ssl_certificate_key /path/to/your/key;
        ssl_preread on;
        proxy_ssl off;
        proxy_pass $srv_name;
    }
}
```

- **double-encrypted**

## REMOTE HOST IDENTIFICATION HAS CHANGED

```bash
ssh-keygen -R HOSTNAME
```

## ssh dss

- 旧设备不可避免还是需要 DSA 算法
  - 例如 voip, 路由器
- OpenSSH 新版本移除 DSA 算法
- known_hosts 不支持 ssh-dss
- HostKeyAlgorithms +ssh-dss
  - 这个配置被移除
- 移除计划
  - 2015 后默认关闭, 需要手动启动 `HostKeyAlgorithms +ssh-dss`
  - 2024/06 后 ssh 编译时默认关闭 - 大多情况无法使用都是从这时候开始
  - 2025/01 默认关闭
  - DSA（Digital Signature Algorithm）
  - DSA 不安全，新版本已经移除
  - 160 bit private key, SHA1 digest
    - security level is <=80 bits symmetric equivalent
- 参考
  - https://lwn.net/Articles/958048/

## known_hosts

- ssh-dss
- ssh-rsa
- pgp-sign-rsa
- pgp-sign-dss

## ssh-agent

```bash
SSH_ENV="$HOME/.ssh/agent.env"
function start_agent {
    ssh-agent -s > "$SSH_ENV"
    . "$SSH_ENV" > /dev/null
}
if [ -f "$SSH_ENV" ]; then
    . "$SSH_ENV" > /dev/null
    if ! kill -0 "$SSH_AGENT_PID" 2>/dev/null; then
        start_agent
    fi
else
    start_agent
fi

unset SSH_ENV
unset -f start_agent
```
