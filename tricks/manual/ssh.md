# SSH

* [sshd_config](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/sshd_config.5)

## Tips

* 将指定用户的端口转发使得外部都可见,可在 `/etc/ssh/sshd_config` 中添加,然后 `service sshd reload`
```
Match User dev
   GatewayPorts yes
```

__常用配置__

```bash
Port 22

# 是否转发网关
GatewayPorts no
# 是否允许使用 root 登陆
PermitRootLogin yes
# 是否允许使用密码登陆
PasswordAuthentication yes

```

## SSHFS

#### Socket is not connected
> mount_osxfusefs: failed to mount /@/dev/osxfuse0: Socket is not connected

确认挂载的路径是否存在.
