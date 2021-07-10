---
id: ansible
title: Ansible
---

# Ansible

- [ansible](https://github.com/ansible/ansible) 是什么？
  - GPL-3.0, Python
  - 自动化 服务开通、配置管理、应用部署 工具
  - 实现 Infrastructure as code - 基础设施即代码
  - 支持 Linux、Windows 及 网络设备
  - 包含大量的插件和三方集成
- 系统要求
  - 控制节点 - python linix/windows
  - 管理节点 - python sftp/scp
- 注意 ⚠️
  - 分组名包含 `-` 会告警
    - `force_valid_group_names=ignore` 可关闭
  - docker_container 模块网络有所调整 - 之后默认不会添加 default 网络 - 与 docker 保持一直
    - 建议 `networks_cli_compatible=yes` 提前与 docker 网络保持一致
  - 建议使用 yaml 写 inventory - 比 ini 的模式好管理 - 结构也更加清晰
  - 相同 set_fact 不能互相依赖 [#40239](https://github.com/ansible/ansible/issues/40239)
- 参考
  - [Ansible tutorial](https://github.com/leucos/ansible-tuto)
  - [List all modules](https://docs.ansible.com/ansible/latest/collections/index.html)
    - collection [ansible.builtin](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/index.html)
  - [ansible.cfg](https://raw.githubusercontent.com/ansible/ansible/devel/examples/ansible.cfg) 可用的 ansible.cfg 配置
  - 可用环境变量[列表](https://github.com/ansible/ansible/blob/devel/lib/ansible/constants.py)
  - [YAML Syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
- 学习
  - [geerlingguy/ansible-for-devops](https://github.com/geerlingguy/ansible-for-devops)
- 界面
  - [ansible-semaphore/semaphore](https://github.com/ansible-semaphore/semaphore)
    - Go 实现
    - 有 Web 界面 和 [API](https://ansible-semaphore.github.io/semaphore/)
  - [ansible/awx](https://github.com/ansible/awx) - Ansible Tower 上游开源项目
    - 可 Docker Compose 启动
- 环境变量
  - `ANSIBLE_INVENTORY` - 逗号分隔的仓库源
  - `DEFAULT_HOST_LIST` - 默认仓库源 - `inventory` 配置

```bash
# ping 所有节点
ansible all -m ping
# -i 指定仓库
ansible all -m ping -i hosts
# ping 本地 - 指定解释器
ansible localhost -m ping -e 'ansible_python_interpreter=/usr/bin/python3'
# 执行命令
ansible all -a date -i hosts

# ansible_facts 内容
ansible localhost -m setup

# 节点上本地设置的内容 - 文件为 ini 格式
# /etc/ansible/facts.d/preferences.fact
ansible hostname -m setup -a "filter=ansible_local"

# docker 启动环境
docker run --rm -it \
  -e TZ=Asia/Shanghai \
  -v $HOME/.ansible:/root/.ansible \
  -v $PWD:/host -w /host \
  --name ansible wener/ansible
```

| Command            | Desc                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| ansible            | 执行 AdHoc 命令                                                          |
| ansible-config     | 查看当前所有配置                                                         |
| ansible-connection | 连接到远程设备                                                           |
| ansible-console    | REPL 方式执行 Ansible Task                                               |
| ansible-doc        | 文档查询                                                                 |
| ansible-galaxy     | Role 和 Collection 依赖管理                                              |
| ansible-inventory  | 查询机器清单                                                             |
| ansible-playbook   | 执行 Playbook                                                            |
| ansible-pull       | 配合 cron 从 VSC 拉取 playbook 然后本地执行 - 适用于大规模周期性任务执行 |
| ansible-test       | Role 和 Collection 开发的测试工具                                        |
| ansible-vault      | Ansible 加密数据操作                                                     |

## 安装

- 2.10 需要先卸载 ansible 再安装
- [Installing Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

```bash
# macOS
CFLAGS=-Qunused-arguments CPPFLAGS=-Qunused-arguments pip install --user ansible

# 2.10
pip uninstall ansible
pip install ansible
```

## ansible.cfg

- [Ansible Configuration Settings](https://docs.ansible.com/ansible/latest/reference_appendices/config.html)
- 查找顺序
  - ANSIBLE_CONFIG
  - ansible.cfg
  - ~/.ansible.cfg
  - /etc/ansible/ansible.cfg

```ini
# 缓存 facts
[defaults]
gathering = smart
# 缓存时间 - 秒
fact_caching_timeout = 86400
# 缓存到 redis
# pip install redis
fact_caching = redis
# 缓存到 json 文件
fact_caching = jsonfile
fact_caching_connection = /path/to/cachedir

# 兼容 docker network - 如果指定了网络不添加默认网络
networks_cli_compatible=yes
# 不校验分组名字 允许包含 `-'
force_valid_group_names=ignore
```

- ansible_sudo_pass

## 变量查找路径

- [Variable precedence: Where should I put a variable?](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable)

## 最佳实践

- [Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)

## Tips

- 使用 merge [hash_behaviour](http://docs.ansible.com/ansible/intro_configuration.html#hash-behaviour) 可合并对象配置
