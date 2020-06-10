# Docker FAQ

## 非 root 绑定私有端口
* 一般来说添加 CAP_NET_BIND_SERVICE 即可，但是对非 root 无效
* 设置 sysctl `net.ipv4.ip_unprivileged_port_start=0` 即可
  * 需要 kernel 4.11+
  * ubuntu 18+

## 停止所有容器

```bash
docker stop $(docker ps -aq)
```

## No swap limit support
* 添加内核参数 `cgroup_enable=memory swapaccount=1`
* 牺牲 1% 的内容，10% 性能来支持内存和交换区审计
* 一般 `cgroup_enable=memory` 会开启，但 `swapaccount` 不开
* 参考
  * [Runtime options with Memory, CPUs, and GPUs](https://docs.docker.com/config/containers/resource_constraints/)
  * [Your kernel does not support cgroup swap limit capabilities](https://docs.docker.com/engine/install/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities)
