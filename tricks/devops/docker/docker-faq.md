# Docker FAQ

## 非 root 绑定私有端口
* 一般来说添加 CAP_NET_BIND_SERVICE 即可，但是对非 root 无效
* 设置 sysctl `net.ipv4.ip_unprivileged_port_start=0` 即可
  * 需要 kernel 4.11+
  * ubuntu 18+
