---
title: Ansible Kubernetes
tags:
  - DevOps
  - Ansible
  - Kubernetes
---

# Ansible Kubernetes

- [community.kubernetes](https://github.com/ansible-collections/community.kubernetes)

```bash
ansible-galaxy collection install community.kubernetes
```

```yaml
- name: kubectl
  hosts: localhost
  gather_facts: false

  tasks:
    - add_host:
        name: nextcloud
        ansible_connection: kubectl
        ansible_kubectl_context: default
        ansible_kubectl_namespace: default
        ansible_kubectl_pod: nextcloud-74fc895c6f-hxrq6
        groupname: pods

- hosts: pods
  gather_facts: false
  tasks:
    - raw: pwd
      register: raw_result
    - debug:
        msg: '{{raw_result.stdout_lines[0]}}'
```

```yaml
- name: kubectl
  hosts: localhost
  gather_facts: false
  connection: local
  collections:
    - community.kubernetes
  tasks:
    - k8s_exec:
        namespace: incos
        pod: nextcloud-74fc7f5c6f-hxrq6
        command: pwd
      register: raw_result
    - debug:
        msg: '{{raw_result.stdout_lines[0]}}'
```
