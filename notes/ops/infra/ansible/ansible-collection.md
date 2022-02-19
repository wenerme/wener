---
title: Ansible Collection
---

# Ansible Collection

- Collection 是 Ansible Galaxy Role 的继承者
- 不只能包含 role，还能包含各种插件，文档，任务等
- 默认安装目录 `~/.ansible/collections` - COLLECTIONS_PATHS,
- 全局位置 /usr/share/ansible/collections
- 默认服务器 https://galaxy.ansible.com - GALAXY_SERVER
- server_list 或 GALAXY_SERVER_LIST 可指定一组服务
- 内建 collections 安装位置 `/usr/lib/python3.8/site-packages/ansible_collections`
- 参考
  - [使用文档](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html)

```bash
# namespace.collection
ansible-galaxy collection install wenerme.alpine
# 可以下载离线使用
ansible-galaxy collection download wenerme.alpine

# 可以直接安装 tar，可以指定目录
# 目录会添加 ansible_collections
ansible-galaxy collection install my_namespace-my_collection-1.0.0.tar.gz -p ./collections

# 可以限定版本
ansible-galaxy collection install 'my_namespace.my_collection:>=1.0.0,<2.0.0'

# 能从仓库安装
# 也方便使用私有 collection
ansible-galaxy collection install git+https://github.com/organization/repo_name.git,devel
ansible-galaxy collection install git@github.com:organization/repo_name.git
ansible-galaxy collection install git+file:///home/user/path/to/repo/.git

# 安装依赖
# 等同于 ansible-galaxy role install -r + ansible-galaxy collection install -r
ansible-galaxy install -r requirements.yml
# 可以下载所有依赖
ansible-galaxy collection download -r requirements.yml

# 查看已安装
ansible-galaxy collection list
# 查看目录下内容
ansible-galaxy collection list -p '/opt/ansible/collections:/etc/ansible/collections'
# 验证
ansible-galaxy collection verify wenerme.alpine -vvv
```

## dev
- [Developing collections](https://docs.ansible.com/ansible/latest/dev_guide/developing_collections.html)

```bash
ansible-galaxy collection init my_namespace.my_collection
```

## lint

```bash
# 查看所有规则
ansible-lint -L
# 只执行部分规则
ansible-lint --enable-list command-instead-of-shell

# auto lint
ansible-lint
```


## playbook

```yaml
# FQDN
- hosts: all
  tasks:
  - my_namespace.my_collection.mymodule:
      option1: value
  - import_role:
      name: my_namespace.my_collection.role1
  - debug:
      msg: '{{ lookup("my_namespace.my_collection.lookup1", 'param1')| my_namespace.my_collection.filter1 }}'
---
# use collections
- hosts: all
  collections:
  - my_namespace.my_collection
  tasks:
  - import_role:
      name: role1
  - mymodule:
      option1: value
  - debug:
      msg: '{{ lookup("my_namespace.my_collection.lookup1", 'param1')| my_namespace.my_collection.filter1 }}'
```

## requirements.yml

```yaml
# Ansible Galaxy 角色
roles:
  - name: geerlingguy.java
    version: 1.9.6

collections:
  # 名字
  - wenerme.alpine
  # 详细信息
  - name: https://github.com/organization/repo_name.git
    type: git
    version: devel

  - name: geerlingguy.php_roles
    version: 0.9.3
    source: https://galaxy.ansible.com
```

## ansible.cfg

```ini
[default]
# 安装到当前目录
# ./ansible_collections/<namespace>/<collection>
collections_paths = ./
# ./roles/<namespace>.<collection>
roles_path = ./roles

# 定义服务端
[galaxy]
server_list = automation_hub, my_org_hub, release_galaxy, test_galaxy

[galaxy_server.automation_hub]
# url, token, username, password, auth_url
# ANSIBLE_GALAXY_SERVER_{{ id }}_{{ key }}
url=https://cloud.redhat.com/api/automation-hub/
auth_url=https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token
token=my_ah_token

[galaxy_server.my_org_hub]
url=https://automation.my_org/
username=my_user
password=my_pass

[galaxy_server.release_galaxy]
url=https://galaxy.ansible.com/
token=my_token

[galaxy_server.test_galaxy]
url=https://galaxy-dev.ansible.com/
token=my_test_token
```

## 内置

- [Collection Index](https://docs.ansible.com/ansible/latest/collections/index.html)
  - [ansible.builtin](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/index.html)
