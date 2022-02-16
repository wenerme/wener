---
title: Ansible FAQ
tags:
  - FAQ
---

# Ansible FAQ

## block & when

- when 会在每个步骤都检测 - 满足则退出

## 常用依赖组件

| module         | pip            |
| -------------- | -------------- |
| postgres       | psycopg2       |
| vault          | hvac           |
| docker         | docker         |
| docker-compose | docker-compose |
| libvirt        | libvirt-python |
| k8s            | openshift      |

```bash
# libvirt / CentOS / awx-task
yum install libvirt-devel gcc
pip3 install libvirt-python

# k8s / AlpineLinux
apk add py3-pip
pip3 install openshift
```

## The `lxml` module is not importable. Check the requirements.

```bash
apk add py3-lxml
```

## include_task vs import_task

- 建议
  - 需要 `when` 、循环、名字时是变量 使用 include
  - 除此之外都使用 import
- import
  - 在解析时处理 - 静态
  - 建议用于逻辑单元 - 例如拆分长 playbook
  - 不能循环
  - 能够 `--list-tags` 和 `--list-tasks`
  - 可以导入 playbook
  - 使用 `when` 条件会被应用到所有导入的 `tasks`，大多数时候都是不期望的，使用 `include`
- include
  - 在执行时处理 - 动态
  - 用于带条件的情况
  - 只有 include 才可以 `include_tasks: prerequisites_{{ ansible_os_family | lower }}.yml`
- 参考
  - [Reuse includes](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_includes.html)
  - [dynamic vs. static](https://docs.ansible.com/ansible/devel/user_guide/playbooks_reuse.html#dynamic-vs-static)
  - [Applying ‘when’ to roles, imports, and includes](https://docs.ansible.com/ansible/latest/user_guide/playbooks_conditionals.html#applying-when-to-roles-imports-and-includes)

## raw vs command vs shell

- shell - 由 `/bin/sh` 执行 - 因此能使用变量和一些语法
- command - 直接执行 - 因此不能使用 `<`,`>`,`|`,`;` 等
- raw - 由 ssh 直接执行，不依赖 python

## psycopg2 ld: library not found for -lssl

- 路径来自于 `pg_config --ldflags`

```bash
env LDFLAGS='-L/usr/local/lib -L/usr/local/opt/openssl/lib -L/usr/local/opt/readline/lib' $(brew --prefix ansible)/libexec/bin/pip install psycopg2
```

## winrm

```bash
$(brew --prefix ansible)/libexec/bin/pip install "pywinrm>=0.3.0"
```

## synchronize 不支持 ProxyCommand

- rsync 使用 jumphost 会有问题，可尝试 sshuttle 或者使用 copy
- copy 比 rsync 慢 - 不会做差分

```bash
rsync -azv -e 'ssh -o "ProxyCommand ssh -A PROXYHOST -W %h:%p"' foo/ dest:./foo/
# ssh 7.4+
rsync -azv -e 'ssh -A -J USER@PROXYHOST:PORT' foo/ dest:./foo/
```

```yaml
rsync_opts: '-e XXXXX'
```

## 使用 dotenv

- 更推荐使用变量或 vault

```bash
cat <<CONF > .env
export TENANT_NAME=test
CONF
# 注意使用 dotenv
# https://github.com/bkeepers/dotenv
dotenv ansible -m debug -a 'msg={{lookup("env","TENANT_NAME")}}' localhost
```

## 获取当前工作目录

- 角色等相关的目录都是相对于 playbook 的

```yaml
- set_fact:
    # 如果是 git
    awd: "{{ lookup('pipe', 'git rev-parse --show-toplevel') }}"
```

- [38771](https://github.com/ansible/ansible/issues/38771)

## json 文件作为变量

```yaml
- hosts: your_host
  vars:
    jsonVar: "{{ lookup('file', 'var.json') | from_json }}"
  tasks:
    - name: test loop
      with_dict: "{{ jsonVar['queue'] }}"
      shell: |
        if echo "blue" | grep -q "{{ item.value.color }}" ; then
            echo "success"
        fi
```

## gitlab - got an unexpected keyword argument 'email'

- [#65189](https://github.com/ansible/ansible/issues/65189)

```bash
$(brew --prefix ansible)/libexec/bin/pip uninstall python-gitlab
# 需要低版本
$(brew --prefix ansible)/libexec/bin/pip install -U 'python-gitlab<1.13'
```

## 测试 docker 模块

```bash
ansible -m docker_container -a 'name=test image=busybox' localhost

# 常规操作
pip uninstall docker-py
pip3 uninstall docker

pip3 install docker
```

## macOS 使用 hasi_vault 安装 hvac 问题

- 安装其他包也是一样 - 例如 docker

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

## objc: +[__NSCFConstantString initialize] may have been in progress in another thread when fork() was called.

```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
```

## 生成 UUID

```bash
ansible localhost -m shell -a 'uuidgen'
ansible localhost -m debug -a 'msg="{{ansible_date_time.iso8601_micro | to_uuid}}"'
```

## 快速获取地址

```bash
ansible -i hosts all -m setup
ansible -i k8s all -m debug -a 'msg={{ansible_default_ipv4.address}}'
```

## has no attribute 'ansible_default_ipv4', 'address'

此时需要从新收集主机信息,然后再继续之前操作

```bash
ansible -i hosts -m setup all
```

确保该操作成功,如果仍然还是出现没有`address` 的错误,那可能是由于 ansible 无法收集到默认地址,也需要确保 `ifconfig` 有地址.

Ansible 是使用 `ip -4 route get 8.8.8.8` (参考[这里](https://github.com/ansible/ansible/blob/837f3dd24d2a3f6acdfcd6184d4b1830af551100/lib/ansible/module_utils/facts.py#L1939))

- 解决办法 参考 [这里](http://stackoverflow.com/a/29496135/1870054)
  - 通过手动添加路由来尝试修改这个问题
  - 通过 set_facts 来覆盖配置
  - 通过定制 facts 来实现该配置

## Java 环境不正确或没有

因为安装部署是通过 SSH 进行操作,是非交互式的 SHELL, 可通过以下命令验证环境是否正确,

```bash
ssh user@host 'java -version'
```

可将所需的 JAVA 环境变量添加到 `~/.bashrc` 的 **最上面**. 因为非交互式的启动脚本执行路径可能有所不同.

## Aborting, target uses selinux but python bindings aren't installed!

在执行时可能遇到以下错误

```
TASK [es : My Task] *****************************************
fatal: [host-1]: FAILED! => {"changed": false, "checksum": "4bd3ef681e70faefe3a66c6eb3419b5d4a0e2714", "failed": true, "msg": "Aborting, target uses selinux but python bindings (libselinux-python) aren't installed!"}
```

是由于开启了 SELinux, 但没有安装 Python 绑定库导致的, 只需要安装该库即可.

```
yum install libselinux-python
```

## env 'python' no such file

```bash
# 是因为找不到 python - 可能是因为使用的 python3
env python
# 确保 python3 存在
env python3
# 创建软链接
ln -s `which python3` /usr/bin/python
```

## 拆分主机到多个文件

目录结构可以为

```
inventories/
  a.yaml
  b.yaml
  c.yaml
```

```bash
# 指向 inventories/ 作为仓库即可
ansible -i inventories/ all --list-hosts
# 需要的时候也可以单个指定
ansible -i inventories/a.yaml -i inventories/b.yaml all --list-hosts
```

目录结构也可以为 - 适用于不同环境区别较大的时候

```
inventories/
  a/
    hosts
  b/
    hosts
```
