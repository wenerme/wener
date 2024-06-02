---
tags:
  - Security
---

# Linux 安全加固

- 参照 阿里云 ECS 加固
- [trimstray/the-practical-linux-hardening-guide](https://github.com/trimstray/the-practical-linux-hardening-guide)

## SSH服务配置

### 使用非root账号登陆实例

1. 创建新账号 ecs-user adduser ecs-user
2. 为新账户设置密码 passwd ecs-user
3. 确认ecs-user账户可正常登录使用
4. 给新帐号添加免密sudo权限 vim /etc/sudoers 在root ALL=(ALL) ALL 下面一行添加一行 ecs-user ALL=(ALL) NOPASSWD:ALL
5. 限制root 登陆 编辑SSH 的配置文件 /etc/ssh/sshd_config 找到 'PermitRootLogin' 配置项 设置为 'PermitRootLogin no' 若没有则手动新增

### 禁止SSH空密码用户登录

编辑文件/etc/ssh/sshd_config，将PermitEmptyPasswords配置为no:

```
PermitEmptyPasswords no
```

### 确保SSH MaxAuthTries设置为3到6之间

在/etc/ssh/sshd_config中取消MaxAuthTries注释符号#，设置最大密码尝试失败次数3-6，建议为4：

```
MaxAuthTries 4
```

## 服务配置

### 确保SSH LogLevel设置为INFO

编辑 /etc/ssh/sshd_config 文件以按如下方式设置参数(取消注释):

```
LogLevel INFO
```

### 设置SSH空闲超时退出时间

编辑/etc/ssh/sshd_config，将ClientAliveInterval 设置为300到900，即5-15分钟，将ClientAliveCountMax设置为0-3之间。

ClientAliveInterval 600
ClientAliveCountMax 2

## 身份鉴别

### 检查系统空密码账户

为用户设置一个非空密码，或者执行`passwd -l <username>`锁定用户

### 确保root是唯一的UID为0的帐户

除root以外其他UID为0的用户(查看命令`cat /etc/passwd | awk -F: '($3 == 0) { print $1 }'|grep -v '^root$'` )都应该删除，或者为其分配新的UID

### 密码复杂度检查

编辑/etc/security/pwquality.conf，把minlen（密码最小长度）设置为8-32位，把minclass（至少包含小写字母、大写字母、数字、特殊字符等4类字符中等3类或4类）设置为3或4。如：

```
minlen=10
minclass=3
```

### 确保密码到期警告天数为7或更多

在 /etc/login.defs 中将 PASS_WARN_AGE 参数设置为7-14之间，建议为7：

```
PASS_WARN_AGE 7
```

同时执行命令使root用户设置生效：

```bash
chage --warndays 7 root
```

### 检查密码重用是否受限制
在/etc/pam.d/password-auth和/etc/pam.d/system-auth中password sufficient pam_unix.so 这行的末尾配置remember参数为5-24之间，原来的内容不用更改，只在末尾加了remember=5。

### 设置密码失效时间
使用非密码登陆方式如密钥对，请忽略此项。在 /etc/login.defs 中将 PASS_MAX_DAYS 参数设置为 60-180之间，如:

PASS_MAX_DAYS 90
需同时执行命令设置root密码失效时间：

chage --maxdays 90 root

### 设置密码修改最小间隔时间
在 /etc/login.defs 中将 PASS_MIN_DAYS 参数设置为7-14之间,建议为7：

PASS_MIN_DAYS 7
需同时执行命令为root用户设置：

chage --mindays 7 root

## 安全审计

### 确保rsyslog服务已启用

运行以下命令启用rsyslog服务：

**systemd**

```bash
systemctl enable rsyslog
systemctl start rsyslog
```

## 文件权限

### 访问控制配置文件的权限设置

```bash
chown root:root /etc/hosts.allow
chown root:root /etc/hosts.deny
chmod 644 /etc/hosts.deny
chmod 644 /etc/hosts.allow
```

### 设置用户权限配置文件的权限

```bash
chown root:root /etc/passwd /etc/shadow /etc/group /etc/gshadow
chmod 0644 /etc/group
chmod 0644 /etc/passwd
chmod 0400 /etc/shadow
chmod 0400 /etc/gshadow
```
## 入侵防范
### 开启地址空间布局随机化

它将进程的内存空间地址随机化来增大入侵者预测目的地址难度，从而降低进程被成功入侵的风险

在/etc/sysctl.conf或/etc/sysctl.d/*文件中设置以下参数：

```
kernel.randomize_va_space = 2
```

执行命令：

```bash
sysctl -w kernel.randomize_va_space=2
```
