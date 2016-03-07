
## Generate ansible directories

```
mkdir gourp_vars host_vars
for ROLE in "apache" "web";do mkdir -p roles/${ROLE}/{files,handlers,tasks}; done
```

## Reference

* [Ansible tutorial](https://github.com/leucos/ansible-tuto)
* [List all modules](http://docs.ansible.com/ansible/list_of_all_modules.html)


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

Behavioral inventory parameter ansible.cfg option
ansible_ssh_port remote_port
ansible_ssh_user remote_user
ansible_ssh_private_key_file private_key_file
ansible_shell_type executable (see the following paragraph)


Table 7-1. ansible-vault commands
Command Description
ansible-vault encrypt file.yml Encrypt the plaintext file.yml file
ansible-vault decrypt file.yml Decrypt the encrypted file.yml file
ansible-vault view file.yml Print the contents of the encrypted file.yml file
ansible-vault create file.yml Create a new encrypted file.yml file
ansible-vault edit file.yml Edit an encrypted file.yml file
ansible-vault rekey file.yml Change the password on an encrypted file.yml file

Table 9-1. Ansible’s SSH multiplexing options
Option Value
ControlMaster auto
ControlPath $HOME/.ansible/cp/ansible-ssh-%h-%p-%r
ControlPersist 60s

Option Description
required If True, argument is required
default Default value if argument is not required
choices A list of possible values for the argument
aliases Other names you can use as an alias for this argument
type Argument type. Allowed values: 'str', 'list', 'dict', 'bool', 'int', 'float'

Table 10-2. AnsibleModule initializer arguments
Parameter Default Description
argument_spec (none) Dictionary that contains information about arguments
bypass_checks False If true, don’t check any of the parameter constrains
no_log False If true, don’t log the behavior of this module
check_invalid_arguments True If true, return error if user passed an unknown argument
mutually_exclusive None List of mutually exclusive arguments
required_together None List of arguments that must appear together
required_one_of None List of arguments where at least one must be present
add_file_common_args False Supports the arguments of the file module
supports_check_mode False If true, indicates module supports check mode


Table 10-3. run_command arguments
Argument Type Default Description
args (default) string or list of
strings
(none) The command to be executed (see the following section)
check_rc Boolean False If true, will call fail_json if command returns a non-zero value.
close_fds Boolean True Passes as close_fds argument to subprocess.Popen
executable string (path to
program)
None Passes as executable argument to subprocess.Popen
data string None Send to stdin if child process
binary_data Boolean False If false and data is present, Ansible will send a newline to stdin
after sending data
path_prefix string (list of paths) None Colon-delimited list of paths to prepend to PATH environment variable
cwd string (directory
path)
None If specified, Ansible will change to this directory before executing
use_unsafe_shell Boolean False See the following section

Table 10-4. Documentation markup
Type Syntax with example When to use
URL U(http://www.example.com) URLs
Module M(apt) Module names
Italics I(port) Parameter names
Constant-width C(/bin/bash) File and option names
