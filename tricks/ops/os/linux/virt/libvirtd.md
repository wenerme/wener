---
id: libvirtd
title: Libvirt Daemon
---

# Libvirt Daemon

## Tips
* /var/run/libvirt/libvirt-sock
* 默认 tcp 端口 16509
* [Simple vsock setup for QEMU](https://gist.github.com/mcastelino/9a57d00ccf245b98de2129f0efe39857)
* `qemu:///session`
  * 避免使用，尽量使用 system

```bash
virsh -c unix:///var/run/libvirt/libvirt-sock list

# macOS
# ==========
brew install libvirt

# unix_sock_group = "staff"
# unix_sock_rw_perms = "0770"
nano /usr/local/etc/libvirt/libvirtd.conf

# 启动服务端
sudo libvirtd -v
# 或者使用 brew 进行服务管理
brew services start libvirt

# 客户端连接
virsh -c qemu:///system list
```
