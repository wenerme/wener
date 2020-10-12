---
id: sshfs
title: SSHFS
---

# SSHFS

## Tips

```bash
# 常用配置
sshfs -o sshfs_sync,sync_readdir,reconnect,follow_symlinks,direct_io pi:/ pi

# macOS
# reconnect 重联
# ServerAliveInterval 检测间隔 - 15s
# ServerAliveCountMax 检测次数 - 3 超过后进行重连
# allow_other 允许其他人访问
# 如果远程不是 root，可以不用 sudo
sudo sshfs -o reconnect,ServerAliveInterval=15,ServerAliveCountMax=3,allow_other -f root@192.168.1.1:/data/media ~/mnt
```

## FAQ
### Socket is not connected
> mount_osxfusefs: failed to mount /@/dev/osxfuse0: Socket is not connected

确认挂载的路径是否存在.
