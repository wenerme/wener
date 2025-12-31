---
title: iLO
tags:
  - Ops
  - Hardware
  - iLO
  - HP
---

# iLO

- [Ansible: hponcfg_module](https://docs.ansible.com/ansible/latest/modules/hponcfg_module.html)
- [Ansible: hpilo_info_module](https://docs.ansible.com/ansible/latest/modules/hpilo_info_module.html)

```yaml
- hpilo_info:
    host: YOUR_ILO_ADDRESS
    login: YOUR_ILO_LOGIN
    password: YOUR_ILO_PASSWORD
  when: cmdb_hwmodel.startswith('HP ')
  delegate_to: localhost
  register: results

- fail:
    msg: 'CMDB serial ({{ cmdb_serialno }}) does not match hardware serial ({{ results.hw_system_serial }}) !'
  when: cmdb_serialno != results.hw_system_serial
```
