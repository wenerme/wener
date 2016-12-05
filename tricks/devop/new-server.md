# How

```bash
# 修改主机名
hostnamectl set-hostname myHostName
# 如果想要直接使用主机名,还需要在 /etc/hosts 里添加相关记录
# nano /etc/hostname
# nano /etc/hosts

# 生成中文
locale-gen zh_CN.UTF-8
# 基本更新
apt-get update
apt-get upgrade

# 出现 The following packages have been kept back 可考虑 dist-upgrade 或 install
# 当 /etc/apt/sources.list* 有其他仓库时使用 dist-upgrade 相对没那么安全

# 修改密码
passwd


# 创建用于部署的用户
useradd deploy
mkdir /home/deploy
mkdir /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
# 将需要使用该用户的公钥添加进去
vim /home/deploy/.ssh/authorized_keys

chmod 400 /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy -R

# 编辑 sudoers
visudo
# 将需要 sudo 的用户添加进去
# deploy  ALL=(ALL) ALL

# 修改 sshd 权限
vim /etc/ssh/sshd_config
# PermitRootLogin no # 不允许直接 root 登陆
# PasswordAuthentication no # 不允许密码登陆
# AllowUsers deploy@(your-ip) deploy@(another-ip-if-any) # 只允许指定地址的人登陆
# service ssh restart

# 防火墙设置
ufw allow 22
ufw allow 80
ufw allow 443
ufw default deny
ufw enable
```

* [How I spend my first 5 minutes on a server ](https://news.ycombinator.com/item?id=5316093)
* [10 Essential Steps for Configuring a New Server](https://www.upguard.com/blog/10-essential-steps-for-configuring-a-new-server)


## Tips
当有多台主机需要部署的时候,建议使用 sshrc, tmuxrc, 这样能快速的将所有的配置都带给服务器,能够快速方便的对多台进行安装部署.

### mosh-dev
由于 mosh 部分鼠标相关的功能需要最新版,所以建议直接安装 dev 版本

```bash
apt-get install software-properties-common
add-apt-repository ppa:keithw/mosh-dev
apt-get update
apt install mosh
```

## fail2ban
```bash
apt-get install fail2ban
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
# bantime = 3600 # ban 1 小时
# destemail = admin@admin # 发送警告的邮箱地址
# 将 ssh/ssh-ddos 等段落下的 enable 设置为 true 打开相应的 filter
```

## env
```bash
apt-get install software-properties-common
# 添加 Oracle Java 仓库
add-apt-repository ppa:webupd8team/java#
apt-get update
# 安装 Oracle Java 8 JDK
apt-get install oracle-java8-installer
# 如果有多个 Java 环境可调整配置
update-alternatives --config java
```
