---
title: juju
---

# juju

- 是什么？
  - Operator Lifecycle Manager (OLM) that provides model-driven application management and next-generation infrastructure-as-code
  - 由 Canonical 开发
- [Document](https://jujucharms.com/docs/stable/)

## Install

```bash
# Ubuntu 16
apt update
apt install juju zfsutils-linux

# Other
add-apt-repository ppa:juju/devel
apt update
apt install juju
```

## Tips

- juju 中使用到的路径 [juju/paths/paths.go](https://github.com/juju/juju/blob/master/juju/paths/paths.go)

```bash
# 启动
# 可使用 --show-log 和 --debug 查看日志
juju bootstrap testcloud manual/10.25.30.1
# 添加其他机器
juju add-machine ssh:root@10.25.30.2
```
