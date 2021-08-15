---
id: ansible-version
title: Ansible Version
---

# Ansible Version

- 参考
  - [Thoughts on Restructuring the Ansible Project](https://www.ansible.com/blog/thoughts-on-restructuring-the-ansible-project)
    - 拆分 ansible 和 ansible-base

| ver               | date       |
| ----------------- | ---------- |
| ansible 4.0       | 2021-05-11 |
| ansible-core 2.11 | 2021-04-27 |
| ansible 3.0       | 2021-02-09 |

## ansible 4.0

- ansible-core 2.11
- 参考
  - [CHANGELOG-v4](https://github.com/ansible-community/ansible-build-data/blob/main/4/CHANGELOG-v4.rst)

```bash
# 获取当前安装版本
python -c 'from ansible_collections.ansible_release import ansible_version; print(ansible_version)'
```

## ansible-core 2.11

- ansible-base 重命名为 ansible-core
- 可从 collection 执行 playbooks
- 可从本地安装 Ansible Collections
- reinstall collection 可升级
- 参考
  - [CHANGELOG-v2.11](https://github.com/ansible/ansible/blob/stable-2.11/changelogs/CHANGELOG-v2.11.rst)

```bash
# 从 collection 执行 playbook
ansible-playbook my_namespace.my_collection.playbook1 -i ./myinventory
```

```yaml
# collection 中的 playbook
- import_playbook: my_namespace.my_collection.playbookX
```

## ansible 3.0

- 基于 ansible-core 2.10
- all-in-one
  - core+[collections](https://github.com/ansible-community/ansible-build-data/blob/main/3/ansible-3.build)
- 参考
  - [CHANGELOG-v3](https://github.com/ansible-community/ansible-build-data/blob/main/3/CHANGELOG-v3.rst)
  - [Ansible 3.0.0 QA](https://www.ansible.com/blog/ansible-3.0.0-qa)
    - 每 3 周一个小版本
    - ansible-core 发布后会发布大版本 - 一般 6 个月

## ansible-base 2.10

- 将非 base 模块划分为小的 collection，由 galaxy 分发
  - collection 能够包含几乎所有的 ansible 扩展点 - roles, plugins, modules, playbooks
  - 替代之前 galaxy 的 role 分发模式
  - ansible-base 3 MB 安装后 14 MB
  - ansible 44 MB 安装后 334 MB
- 内置 [collection](https://docs.ansible.com/ansible/2.10/collections/index.html) 列表
- 新增 ansible-base 包
- [CHANGELOG-v2.10](https://github.com/ansible/ansible/blob/stable-2.10/changelogs/CHANGELOG-v2.10.rst)
- unvault - 新增 lookup 插件 - 读取加密文件内容
- 废弃 hash_behaviour
- 停止支持 Windows Server 2008
- fact 包含 ansible_processor_nproc

:::note

- 尚且无法执行 collection 中的 playbooks - [#67435](https://github.com/ansible/ansible/pull/67435)

:::

## 2.9

- 新增命令行补全

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
