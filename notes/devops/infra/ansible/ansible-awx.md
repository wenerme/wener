---
title: Ansible AWX
---

# Ansible AWX

- 是什么
  - 基于 Ansible 的 Web 管理平台、REST API
  - 提供任务执行引擎，项目管理，用户权限管理
  - AWX -> [AnsibleWorks](https://github.com/ansible/awx/commit/5c6895e6065a81f4483dfb6bc7650706f8866e1e)
- [ansible/awx](https://github.com/ansible/awx)
- 参考
  - [用户手册](https://docs.ansible.com/ansible-tower/latest/html/userguide/overview.html)
  - [管理文档](https://docs.ansible.com/ansible-tower/latest/html/administration/index.html)
  - Ansible [AWX vs Tower](https://www.redhat.com/en/resources/awx-and-ansible-tower-datasheet)
    - AWX 是快速开发的上游
  - [ansible/awx-operator](https://github.com/ansible/awx-operator)
- 注意
  - Ansible 也可以操作 Tower/AWX
  - 会自动下载 requirements.yml 中的依赖
- 特性
  - 支持外部授权 - LDAP、SAML 2.0、OAuth、RADIUS

## awxkit

- [AWX Command Line Interface](https://docs.ansible.com/ansible-tower/latest/html/towercli/index.html)
- [授权](https://docs.ansible.com/ansible-tower/latest/html/towercli/authentication.html)

```bash
pip3 install awxkit

# 直接使用账号密码
awx --conf.host https://awx.example.org \
    --conf.username joe --conf.password secret \
    --conf.insecure \
    users list

# 登陆
export TOWER_HOST=https://awx.example.org
# 会生成 token
$(TOWER_USERNAME=alice TOWER_PASSWORD=secret awx login -f human)
awx config
```

```bash
# 导入 ssh
awx credentials create --credential_type 'Machine' \
    --name 'My SSH Key' --user 'alice' \
    --inputs '{"username": "server-login", "ssh_key_data": "@~/.ssh/id_rsa"}'
```

## 安装

- [安装文档](https://github.com/ansible/awx/blob/devel/INSTALL.md)
- 系统要求
  - 2 CPU 4G 内存 20G 硬盘
  - PostgreSQL 10+
- 支持安装方式
  - Docker Compose
    - ansible [playbook](https://github.com/ansible/awx/tree/devel/installer)
    - 会启动 PostgreSQL 和 Redis
    - 实际启动配置模板 [local_docker/templates](https://github.com/ansible/awx/tree/devel/installer/roles/local_docker/templates)
  - Kubernetes
    - stable/postgresql
      - PG 会部署为 sts
  - HELM
    - [AdWerx/charts/awx](https://github.com/AdWerx/charts/tree/master/awx)
  - OpenShift
- 配置
  - pg_hostname - 如果使用外部 pg 则配置外部主机
  - docker_registry - 自定义镜像仓库

```bash
VER=$(curl https://api.github.com/repos/ansible/awx/tags -s | jq '.[0].name' -r)
curl -LC- -o ansible-awx-$VER.tar.gz https://github.com/ansible/awx/archive/$VER.tar.gz
tar xvfz ansible-awx-$VER.tar.gz
# 安装
cd awx-$VER/installer

# 安装所需模块
pip3 install docker docker-compose

# 需要提前配置好 inventory
code inventory
# 默认会存储到 ~/.awx
# 启动后可登陆 http://localhost/#/login
ansible-playbook -i inventory install.yml
# 确认安装日志
docker logs -f awx_task

# 命令行
pip3 install awxkit
```

**inventory**

```ini
# 管理员账号密码
admin_user=awx
admin_password=awx

# DB
pg_hostname=postgresql
pg_port=5432
pg_username=awx
pg_password=awx
pg_database=awx
pg_sslmode=prefer

# 创建展示用的数据
create_preload_data=True

# 用于加密授权信息的密钥
secret_key=00000000-0000-0000-0000-000000000000
broadcast_websocket_secret=00000000-0000-0000-0000-000000000000

# Kubernetes - 可选
kubernetes_context=default
kubernetes_namespace=awx
kubernetes_web_svc_type=ClusterIP
kubernetes_ingress_hostname=awx.example.com
# 自定义注解 - 启用 ACME
kubernetes_ingress_annotations={'cert-manager.io/cluster-issuer': 'letsencrypt'}
kubernetes_ingress_tls_secret=awx-ingress-cert
```

## 核心概念

- Project - 项目
  - 需要存储 - Git、SVN、Mercurial、本地目录
    - 默认本地目录 `/var/lib/awx/projects`
  - Playbooks 的组合
- Job Template - 任务模板
  - 配置好的可执行任务
  - 包含 playbook、inventory、变量 等
- Job - 任务
  - 一次执行
- Inventories - 仓库
  - 支持从项目 git 导入
  - 使用 ansible-inventory 工具
- Credential - 凭证
  - 所有涉及到认证相关的信息
- [Credential Type](https://docs.ansible.com/ansible-tower/latest/html/userguide/credential_types.html) - 凭证类型
  - 自定义凭证
  - 用于注入上下文信息
    - 环境变量
    - Ansible 额外变量
    - 文件模板 - 例如生成 `.ini` 或 `.conf`
  - 单个任务模版每种凭证类型只能有 **一个**
- Orgnization - 组织
- User - 用户
- Team - 团队
- Instance - 实例

### 自定义凭证类型

- 分为输入配置和注入配置

**输入配置**

```yaml
# 字段定义
fields:
  - type: string
    id: username
    label: Username
  - id: password
    # 类型
    type: string
    # string 支持 choices
    # "choices": ["A", "B", "C"]
    label: Password
    secret: true
# 必填字段
required:
  - username
  - password
```

**注入配置**

```yaml
# 文件模板
file:
  template: |-
    [mycloud]
    token={{ api_token }}
# 环境变量
env:
  THIRD_PARTY_CLOUD_API_TOKEN: '{{ api_token }}'
  # 文件的绝对路径
  MY_CLOUD_INI_FILE: '{{ tower.filename }}'
# Ansible 变量
extra_vars:
  some_extra_var: '{{ username }}:{{ password }}'

---
# 多个文件
file:
  template.cert_file: |-
    [mycert]
    {{ cert }}
  template.key_file: |-
    [mykey]
    {{ key }}
env:
  # 多个文件的路径
  MY_CERT_INI_FILE: '{{ tower.filename.cert_file }}'
  MY_KEY_INI_FILE: '{{ tower.filename.key_file }}'
```

#### Ansible 创建删除

```bash
pip install ansible-tower-cli
```

```yaml
- tower_credential_type:
    name: Nexus
    description: Credentials type for Nexus
    kind: cloud
    inputs: "{{ lookup('file', 'tower_credential_inputs_nexus.json') }}"
    injectors: { 'extra_vars': { 'nexus_credential': 'test' } }
    state: present
    validate_certs: false

- tower_credential_type:
    name: Nexus
    state: absent
```

## 执行环境

- [Execution Environments](https://docs.ansible.com/ansible-tower/latest/html/administration/external_execution_envs.html)
  - 实例组
    - 继承关系 Job Template > Inventory > Organization
    - 启动的 AWX 会关联到实例组
  - 容器组 - 临时运行环境
    - K8S Pod
- Docker 启动的 awx_task 是 CentOS
  - HOME=/var/lib/awx
    - projects/ - 项目目录
      - \_ID\_\_NAME/ - 项目目录 - 例如 git
  - /var/log/tower/ - 日志
    - callback_receiver.log
    - dispatcher.log
    - management_playbooks.log
    - rsyslog.err
    - task_system.log
    - tower.log
    - tower_rbac_migrations.log
    - tower_system_tracking_migrations.log
    - wsbroadcast.log
  - 日志使用 rsyslog - 可以聚合
- /api/v2/metrics - 指标监控
- 默认 venv - /var/lib/awx/venv/ansible
  - 可修改

## 最佳实践

- 建议 Job 隔离
- 输出的 Json `https://<tower server name>/api/v2/jobs/<job_id>/job_events/`
- 参考
  - [Security Best Practices](https://docs.ansible.com/ansible-tower/latest/html/administration/security_best_practices.html)
  - [Tower Tips and Tricks](https://docs.ansible.com/ansible-tower/latest/html/administration/tipsandtricks.html)
  - [凭证管理](https://docs.ansible.com/ansible-tower/3.7.3/html/userguide/credential_plugins.html)

```bash
# venv 安装时建议 umask 0022
source /var/lib/awx/venv/ansible/bin/activate
umask 0022
pip install --upgrade pywinrm
deactivate
```

## awx-manager

- https://docs.ansible.com/ansible-tower/latest/html/administration/tower-manage.html
