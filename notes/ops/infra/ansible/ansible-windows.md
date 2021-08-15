---
title: Ansible Windows
---

# Ansible Windows

- 可管理对象
  - 审计策略、规则
  - 证书
  - chocolatey - 包
  - domain - 域
  - 环境变量
  - 事件日志
  - Windows 特性
  - 文件
  - 防火墙
  - 用户、群组
  - IIS
  - 网络映射驱动
  - 安装包
  - 注册表
  - 静态路由
  - 定时任务
  - 安全策略
  - 共享
  - SNMP 服务
- 参考
  - [Setting up a Windows Host](https://docs.ansible.com/ansible/latest/user_guide/windows_setup.html)
  - [ConfigureRemotingForAnsible.ps1](https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1)
  - ansible [winrm](https://docs.ansible.com/ansible/latest/user_guide/windows_winrm.html)
  - Ansible 2.9 [Windows modules](https://docs.ansible.com/ansible/2.9/modules/list_of_windows_modules.html)
  - [Windows collection](https://docs.ansible.com/ansible/latest/collections/ansible/windows/index.html)
    - [ansible-collections/ansible.windows](https://github.com/ansible-collections/ansible.windows)

```yaml
win:
  ansible_host: 192.168.1.2
  ansible_user: LocalUsername
  ansible_password: Password
  ansible_connection: winrm
  # ansible_winrm_transport: basic
  ansible_winrm_transport: ntlm
```
