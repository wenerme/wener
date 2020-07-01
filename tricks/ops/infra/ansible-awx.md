---
id: ansible-awx
title: Ansible AWX
---

# Ansible AWX
* Ansible [AWX vs Tower](https://www.redhat.com/en/resources/awx-and-ansible-tower-datasheet)
  * AWX 是快速开发的上游
* 核心概念
  * Project - 项目
    * 需要存储 - Git、SVN、Mercurial、本地目录
      * 默认本地目录 `/var/lib/awx/projects`
    * Playbooks 的组合
  * Job Template - 任务模板
    * 配置好的可执行任务
    * 包含 playbook、inventory、变量 等
  * Job - 任务
    * 一次执行
  * Inventories - 仓库
    * 支持从项目 git 导入
    * 使用 ansible-inventory 工具
  * Credential - 凭证
    * 所有涉及到认证相关的信息
  * Orgnization - 组织
  * User - 用户
  * Team - 团队
  * Instance - 实例
* 参考
  * [用户手册](https://docs.ansible.com/ansible-tower/latest/html/userguide/overview.html)
  * [管理文档](https://docs.ansible.com/ansible-tower/latest/html/administration/index.html)

## 安装
* [安装文档](https://github.com/ansible/awx/blob/devel/INSTALL.md)
* 系统要求
  * 2 CPU 4G 内存 20G 硬盘
  * PostgreSQL 10+
* 支持安装方式
  * Docker Compose
    * ansible [playbook](https://github.com/ansible/awx/tree/devel/installer)
    * 会启动 PostgreSQL 和 Redis
    * 实际启动配置模板 [local_docker/templates](https://github.com/ansible/awx/tree/devel/installer/roles/local_docker/templates)
  * Kubernetes
    * PG 会部署为 sts
  * OpenShift
* 配置
  * pg_hostname - 如果使用外部 pg 则配置外部主机
  * docker_registry - 自定义镜像仓库

```bash
VER=$(curl https://api.github.com/repos/ansible/awx/tags -s | jq '.[0].name' -r)
curl -LC- -o ansible-awx-$VER.tar.gz https://github.com/ansible/awx/archive/$VER.tar.gz 
tar xvfz ansible-awx-$VER.tar.gz
# 安装
cd awx-$VER/installer

# 安装所需模块
pip3 install docker docker-compose

# 需要提前配置好 inventory
# 默认会存储到 ~/.awx
ansible-playbook -i inventory install.yml
# 确认安装日志
docker logs -f awx_task

# 命令行
pip3 install awxkit
```
