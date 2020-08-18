
# Ansible Network
## Tips
* [网络模块](https://docs.ansible.com/ansible/latest/modules/list_of_network_modules.html)
* https://github.com/claytono/edgerouter-ansible

## EdgeRouter 配置

```bash
# 添加 ssh key
scp admin_rsa.pub admin@192.168.1.1:/tmp/key

ssh admin@192.168.1.1
configure
# key 需要有说明否则会说不合法
loadkey admin /tmp/key
commit
save
exit
```

```yaml
edgerouter:
  hosts:
    er-1:
      ansible_host: 192.168.1.1
      ansible_user: admin
      ansible_network_os: edgeos
      connection: network_cli
```

__net-facts.yaml__
```yaml
- name: Network facts
  connection: network_cli
  gather_facts: false
  hosts: edgerouter
  tasks:
    - name: Get facts
      edgeos_facts:
        gather_subset: all

    - name: Display the config
      debug:
        msg:
        - "Hostname : {{ansible_net_hostname}}"
        - "Model    : {{ansible_net_model}} v{{ ansible_net_version }}"
        - "Serial   : {{ansible_net_serialnum}}"
```

```bash
ansible -m ping edgerouter
ansible-playbook net-facts.yaml
```

### socket_path must be a value


