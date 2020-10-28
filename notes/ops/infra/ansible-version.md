---
id: ansible-version
title: Ansible Version
---

# Ansible Version

## 2.10
* 将非 base 模块划分为小的 collection，由 galaxy 分发
  * collection 能够包含几乎所有的 ansible 扩展点 - roles, plugins, modules, playbooks
  * 替代之前 galaxy 的 role 分发模式
  * ansible-base 3 MB 安装后 14 MB
  * ansible 44 MB 安装后 334 MB
* 内置 [collection](https://docs.ansible.com/ansible/2.10/collections/index.html) 列表
* 新增 ansible-base 包
* [CHANGELOG-v2.10](https://github.com/ansible/ansible/blob/stable-2.10/changelogs/CHANGELOG-v2.10.rst)
* unvault - 新增 lookup 插件 - 读取加密文件内容
* 废弃 hash_behaviour
* 停止支持 Windows Server 2008
* fact 包含 ansible_processor_nproc

:::note

* 尚且无法执行 collection 中的 playbooks - [#67435](https://github.com/ansible/ansible/pull/67435)

:::

## 2.19
* 新增命令行补全

```bash
# 参数补全
python -m pip install argcomplete

# 启用补全
activate-global-python-argcomplete
# 或
eval $(register-python-argcomplete ansible)
eval $(register-python-argcomplete ansible-config)
eval $(register-python-argcomplete ansible-console)
eval $(register-python-argcomplete ansible-doc)
eval $(register-python-argcomplete ansible-galaxy)
eval $(register-python-argcomplete ansible-inventory)
eval $(register-python-argcomplete ansible-playbook)
eval $(register-python-argcomplete ansible-pull)
eval $(register-python-argcomplete ansible-vault)
```
