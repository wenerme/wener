---
title: cygwin
---

# cygwin

- 在 Windows 下 提供 POSIX 环境

## Tools

- cygcheck
- cygpath - 模拟环境路径转 Windows 路径
- cygrunsrv - 注册管理 windows 服务
  - -I 安装 -R 移除 -S 启动 -E 停止 -Q 搜索 -L 显示列表
  - 支持本地服务和远程服务 - 远程 server/svc_name
- cygstart
- cygwin-console-helper

```bash
# -R 删除 service
cygrunsrv -R msys2_sshd
# -I 安装 service
# -d 显示名字 -p 应用路径 -a 参数 -y 依赖
cygrunsrv -I msys2_sshd -d "MSYS2 sshd" -p /usr/bin/sshd.exe -a "-D -e" -y tcpip

cygrunsrv -L
cygrunsrv -Q msys2_sshd
```
