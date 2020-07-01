---
id: ansible-faq
titleL: Ansible FAQ
---

# Ansible FAQ

## 测试 docker 模块

```bash
ansible -m docker_container -a 'name=test image=busybox' localhost

# 常规操作
pip uninstall docker-py
pip3 uninstall docker

pip3 install docker
```

## macOS 使用 hasi_vault 安装 hvac 问题

* 安装其他包也是一样 - 例如 docker

```bash
# 当前使用的 python
ansible -m debug -a 'var=ansible_playbook_python' localhost
# 使用 ansible 下的 pip 安装
$(brew --prefix ansible)/libexec/bin/pip install hvac

# localhost | SUCCESS => {
#     "ansible_playbook_python": "/usr/local/Cellar/ansible/2.6.0/libexec/bin/python2.7"
# }
# source $(brew --prefix ansible)/libexec/bin/activate
# pip install hvac
```


## 2.9.0 使用 hashi_vault 返回结果结构不对

- [#41132](https://github.com/ansible/ansible/pull/41132)

```bash
# 因为返回了 metadata 和 data 还需要取需要的字段
ansible -m debug -a "msg={{lookup('hashi_vault', 'secret=secret/data/app:data').db_password}}" localhost
# consul 的 token
ansible -m debug -a "msg={{lookup('hashi_vault', 'secret=consul/creds/reader:token')}}" localhost
```

## objc[37519]: +[__NSCFConstantString initialize] may have been in progress in another thread when fork() was called.

```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
```

## 生成 UUID

```bash
ansible localhost -m shell -a 'uuidgen'
ansible localhost -m debug -a 'msg="{{ansible_date_time.iso8601_micro | to_uuid}}"'
```
