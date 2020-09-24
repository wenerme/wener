---
id: ansible-windows
title: Ansible Windows
---

# Ansible Windows
## Tips
* ansible [winrm](https://docs.ansible.com/ansible/latest/user_guide/windows_winrm.html)
* [Windows modules](https://docs.ansible.com/ansible/latest/modules/list_of_windows_modules.html)
* https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1
* https://docs.ansible.com/ansible/latest/user_guide/windows_setup.html#winrm-setup

```yaml
win:
  ansible_host: 192.168.1.2
  ansible_user: LocalUsername
  ansible_password: Password
  ansible_connection: winrm
  # ansible_winrm_transport: basic
  ansible_winrm_transport: ntlm
```

```bash

```
