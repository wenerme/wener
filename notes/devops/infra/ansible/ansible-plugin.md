---
title: Ansible Plugins
tags:
  - DevOps
  - Ansible
  - Plugins
---

# Ansible Plugins

- [Inventory Plugins](https://docs.ansible.com/ansible/latest/plugins/inventory.html)
- [Kubernetes Inventory](https://docs.ansible.com/ansible/latest/plugins/inventory/k8s.html)
- [Script Inventory](https://docs.ansible.com/ansible/latest/plugins/inventory/script.html)
- [Tower Inventory](https://docs.ansible.com/ansible/latest/plugins/inventory/tower.html)

> Modules (also referred to as “task plugins” or “library plugins”) are discrete units of code that can be used from the command line or in a playbook task. Ansible executes each module, usually on the remote target node, and collects return values.

- [Ansible Plugins Guide](https://access.redhat.com/articles/3642632?extIdCarryOver=true&sc_cid=701f2000001OH6uAAG)

## Lookup

- [lookup](https://docs.ansible.com/ansible/latest/plugins/lookup.html) plugin
- 常用 - 所有 `ansible-doc -t lookup -l`
  - `env`
  - `file`
  - `password` - 生成密码到文件
  - `consul_kv`
  - `hashi_vault` - vault 中的数据 - 需要 hvac
  - `dig`
  - `dnstxt`
  - `fileglob`
  - `first_found`
  - `config` - 配置项 `ansible-config list`
  - `k8s`
  - `vars`
  - `varnames`
  - `dict`

```bash
ansible -m debug -a "msg={{lookup('env','HOME')}}" localhost
ansible -m debug -a "msg={{lookup('file',lookup('env','HOME')+'/.ssh/id_rsa.pub')}}" localhost
```

```yaml
- name: access env
  debug: msg={{lookup('env','HOME')}}
- name: access file
  debug: msg={{lookup('file',lookup('env','HOME')+'/.ssh/id_rsa.pub')}}
```
