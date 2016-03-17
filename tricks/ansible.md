# Ansible

## 最佳实践

```
/roles
  /common 公共角色
    /defaults 默认变量
    /tasks 实际操作
    /handlers 处理器
    /files 相关文件
    /templates 模板
    /meta 依赖定义
  /database 数据库角色
group_vars 分组变量
  /all.yml 应用于所有分组
  /db.yml 应用于 db 分组
host_vars 主机变量
  /all.yml
  /host-1.yml 应用于 host-1 主机
/files
/templates
ansible.cfg 配置文件
hosts 主机配置文件,可以有多个,文件名可自定义
```

## Generate ansible directories

```
mkdir gourp_vars host_vars
for ROLE in "apache" "web";do mkdir -p roles/${ROLE}/{files,handlers,tasks}; done
```

## 变量加载顺序
* role defaults
* inventory vars
* inventory group_vars
* inventory host_vars
* playbook group_vars
* playbook host_vars
* host facts
* registered vars
* set_facts
* play vars
* play vars_prompt
* play vars_files
* role and include vars
* block vars (only for tasks in block)
* task vars (only for the task)
* extra vars (always win precedence)

## Name Default Description
Inventory Vars | Description
----|----
ansible_ssh_host | name of host Hostname or IP address to SSH to
ansible_ssh_port | 22 Port to SSH to
ansible_ssh_user | root User to SSH as
ansible_ssh_pass | none Password to use for SSH authentication
ansible_connection | smart How Ansible will connect to host (see below)
ansible_ssh_private_key_file | none SSH private key to use for SSH authentication
ansible_shell_type | sh Shell to use for commands (see below)
ansible_python_interpreter | /usr/bin/python Python interpreter on host (see below)
`ansible_*_interpreter` | none Like ansible_python_interpreter for other languages (see below)

> 在新版本中,变量中的 `ssh` 已经去掉了

Behavioral inventory parameter | ansible.cfg option
----|----
ansible_ssh_port | remote_port
ansible_ssh_user | remote_user
ansible_ssh_private_key_file | private_key_file
ansible_shell_type | executable (see the following paragraph)


### ansible-vault 命令
Command | Description
----|----
ansible-vault encrypt file.yml | Encrypt the plaintext file.yml file
ansible-vault decrypt file.yml | Decrypt the encrypted file.yml file
ansible-vault view file.yml | Print the contents of the encrypted file.yml file
ansible-vault create file.yml | Create a new encrypted file.yml file
ansible-vault edit file.yml | Edit an encrypted file.yml file
ansible-vault rekey file.yml | Change the password on an encrypted file.yml file

### SSH 多播选项
Option | Value
----|----
ControlMaster | auto
ControlPath | $HOME/.ansible/cp/ansible-ssh-%h-%p-%r
ControlPersist | 60s

### AnsibleModule 参数属性
Option | Description
----|----
required | If True, argument is required
default | Default value if argument is not required
choices | A list of possible values for the argument
aliases | Other names you can use as an alias for this argument
type | Argument type. Allowed values: 'str', 'list', 'dict', 'bool', 'int', 'float'

### AnsibleModule 初始化参数
Parameter Default | Description
----|----
argument_spec (none) | Dictionary that contains information about arguments
bypass_checks | False If true, don’t check any of the parameter constrains
no_log | False If true, don’t log the behavior of this module
check_invalid_arguments | True If true, return error if user passed an unknown argument
mutually_exclusive | None List of mutually exclusive arguments
required_together | None List of arguments that must appear together
required_one_of | None List of arguments where at least one must be present
add_file_common_args | False Supports the arguments of the file module
supports_check_mode | False If true, indicates module supports check mode


### 调用外部命令
在 Ansible 模块中使用 `run_command` 调用外部命令


Argument | Type | Default | Description
----|----|----|----
args (default) |string or list of strings|(none) The command to be executed (see the following section)
check_rc | Boolean | False | If true, will call fail_json if command returns a non-zero value.
close_fds | Boolean | True | Passes as close_fds argument to subprocess.Popen
executable | string (path to program)| None | Passes as executable argument to subprocess.Popen
data | string | None | Send to stdin if child process
binary_data | Boolean | False | If false and data is present, Ansible will send a newline to stdin after sending data
path_prefix | string (list of paths)| None| Colon-delimited list of paths to prepend to PATH environment variable
cwd |string (directory path)| None |If specified, Ansible will change to this directory before executing
use_unsafe_shell |Boolean |False |See the following section

### Documentation markup
Type | Syntax with example | When to use
----|----|----
URL | U(http://www.example.com) | URLs
Module | M(apt) | Module names
Italics | I(port) | Parameter names
Constant-width | C(/bin/bash) | File and option names


## Tips
* 使用 merge [hash_behaviour](http://docs.ansible.com/ansible/intro_configuration.html#hash-behaviour) 可合并对象配置



## 常见问题

### has no attribute 'ansible_default_ipv4'
此时需要从新收集主机信息,然后再继续之前操作

```
ansible -i hosts -m setup all
```

### 部署时 Java 版本和 SSH 进去时的版本不同
在部署时使用 Bash 的非交互式模式,因此加载的 profile 路径可能有所不同,此时可将相应的环境变量放到 `~/.bashrc` 配置文件的 __最上面__.


## Reference

* [Ansible tutorial](https://github.com/leucos/ansible-tuto)
* [List all modules](http://docs.ansible.com/ansible/list_of_all_modules.html)
* [ansible.cfg](https://raw.githubusercontent.com/ansible/ansible/devel/examples/ansible.cfg) 可用的ansible.cfg配置
* 可用环境变量[列表](https://github.com/ansible/ansible/blob/devel/lib/ansible/constants.py)
