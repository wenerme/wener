---
title: sshd
---

# sshd

```bash
# 生成 /etc/ssh/ssh_host_*
ssh-keygen -A

# 生成 yaml
ls -d /etc/ssh/ssh_host_* | xargs -n 1 -I {} sh -c 'echo -e "$(basename {}): |"; cat {} | sed "s/^/  /"'
```
