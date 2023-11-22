---
title: jumpserver
---

# jumpserver

- [jumpserver/jumpserver](https://github.com/jumpserver/jumpserver)
  - GPLv3, Python
  - Magnus 组件闭源
- 存储
- Helm
  - [jumpserver/helm-charts](https://github.com/jumpserver/helm-charts)
  - https://jumpserver.github.io/helm-charts
- 企业版功能
  - 角色管理
  - 工单
  - 权限 -  资产登录、连接方式
  - 账号收集、账号改密、账号备份
  - 组织管理、界面设置
  - Auth - SSO、OpenID、SAML2、

| port        | for                       |
| ----------- | ------------------------- |
| 22          | SSH, 安装升级
| 80          |
| 443         |
| 3306        |
| 6379        |
| 3389        | Razor, RDP Client         |
| 2222        | SSH Client for JumpServer |
| 33061       | Magnus MySQL Client       |
| 33062       | Magnus MariaDB Client     |
| 54320       | Magnus PostgreSQL Client  |
| 63709       | Magnus Redis Client       |
| 30000-30100 | Magnus Oracle Client      |

- 存储使用 MySQL+Redis
- 组件
  - core
    - JumpServer, Python, Django, Gunicorn, Celery, Beat, Flower, Daphne
      - Gunicorn - WSGI HTTP Server
      - Flower - Real-time monitor and web admin for Celery
      - Daphne - Django Channels HTTP/WebSocket server
  - Lina - WebUI - Vue, ElementUI
  - luna - Web Terminal - Angular
  - koko - Coco in Golang - SSH/SFTP/Web Terminal 服务端
  - Lion - Apache Guacamole
  - Magnus - **闭源**
  - Nginx

## OpenID

- https://docs.jumpserver.org/zh/master/admin-guide/authentication/openid

## Install

- https://jumpserver.github.io/helm-charts
- https://docs.jumpserver.org/zh/master/install/setup_by_fast/

## Conf

- https://docs.jumpserver.org/zh/master/admin-guide/env/
