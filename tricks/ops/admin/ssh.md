# SSH

* [sshd_config](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/sshd_config.5)

## Tips

* 将指定用户的端口转发使得外部都可见,可在 `/etc/ssh/sshd_config` 中添加,然后 `service sshd reload`


__常用配置__

```bash
# 配置使用的端口
Port 22

# 是否转发网关
GatewayPorts no
# 是否允许使用 root 登陆
PermitRootLogin yes
# 是否允许使用密码登陆
PasswordAuthentication yes

# 转发的端口允许外部访问
Match User dev
   GatewayPorts yes

# 可只对指定的接口对外暴露
# -R :8000:localhost:80
# GatewayPorts clientspecified

# 禁止部分用户使用 TTY
Match User player
  PermitTTY no
```

```bash
# 强制使用密码
ssh user:@example.com
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no example.com
```

## Tunnel
在工作中常常需要较多的代理和转发,为每个代理和转发都进行一次 SSH 未免太过麻烦,使用 `~/.ssh/config` 可以将常用的转发一次配置

```bash
Host tunnel
Hostname my.host.com
User myUser
Compression yes
ExitOnForwardFailure yes
ForwardAgent yes
DynamicForward 8888
RemoteForward 2222 127.0.0.1:22
LocalForward 16379 myInternalRedis:6379
LocalForward 13306 myInternalMySQL:3306
```

再配合 autossh 可大大减少工作量

```bash
autossh -M 8889  -vNg tunnel > ssh.log 2>&1 &
```

## SSHFS

#### Socket is not connected
> mount_osxfusefs: failed to mount /@/dev/osxfuse0: Socket is not connected

确认挂载的路径是否存在.
