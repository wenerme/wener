---
title: Ansible Cookbook
---

# Ansible Cookbook

## 动态变量

```yaml
- name: Render deployment templates
  set_fact:
    '{{ item }}': "{{ lookup('template', item + '.yml.j2') }}"
  with_items:
    - 'configmap'
    - 'secret'
    - 'deployment'
    - 'supervisor'
    - 'launch_awx'
  no_log: true
```

## 批量模版

```yaml
- name: create x template
  template:
    src: '{{item}}'
    dest: /tmp/{{ item | basename | regex_replace('\.j2','') }}
  with_fileglob:
    - ../templates/*.j2
```

## 密码生成

- `lookup('password', 'credentials/db.passwd length=8 chars=digits')` - 读取或随机生成密码

```yaml
# 生成密码且不记录
- name: Generate broadcast websocket secret
  set_fact:
    broadcast_websocket_secret: "{{ lookup('password', '/dev/null length=128') }}"
  run_once: true
  no_log: true
  when: broadcast_websocket_secret is not defined
```

## 临时文件存储模板

```yaml
- name: Create Temporary Values File (Kubernetes)
  tempfile:
    state: file
    suffix: .yml
  register: values_file

- name: Populate Temporary Values File (Kubernetes)
  template:
    # 会直接使用模版目录下文件
    src: postgresql-values.yml.j2
    dest: '{{ values_file.path }}'
  no_log: true
```

## 等待命令成功

```yaml
- name: Wait for management pod to start
  shell: |
    {{ kubectl_or_oc }} -n {{ kubernetes_namespace }} \
      get pod ansible-tower-management -o jsonpath="{.status.phase}"
  register: result
  # 条件
  until: result.stdout == "Running"
  retries: 60
  delay: 10
```
