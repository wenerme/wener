---
title: Ansible Pull
---

# Ansible Pull

- 是什么？
  - 通过拉取仓库来执行 Playbook
  - 类似于 AWX
  - 实现 GitOps
- [ansible-pull](https://docs.ansible.com/ansible/latest/cli/ansible-pull.html)

```bash
apk add git samurai ansible-base -X https://mirrors.aliyun.com/alpine/edge/main/
# ~/.ansible/pull/localhost/
ansible-pull --only-if-changed -U https://gitlab.com/wenerme/ansible-pull-demo -i hosts
```

**crontab**

```conf
# 每5分钟执行
*/5 * * * * /usr/bin/ansible-pull --only-if-changed -U https://gitlab.com/wenerme/ansible-pull-demo -i hosts
```
