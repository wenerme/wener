---
id: keycloak
title: Keycloak
---

# Keycloak

# Tips

- [授权服务](https://www.keycloak.org/docs/latest/authorization_services/)
  - 访问控制方式
    - ABAC - Attribute-based access control - 基于属性
    - RBAC- Role-based access control - 基于角色
    - UBAC - User-based access control - 基于用户
    - CBAC - Context-based access control - 基于上下文
    - Rule-based access control - 基于规则
      - 可以使用 JavaScript
    - Time-based access control - 基于时间
    - 通过策略 SPI (Service Provider Interface) 自定义访问控制机制 (ACMs - access control mechanisms)
- 通过 jgroups 实现集群
- vault 支持 K8S secrets
  - 挂载到 `$JBOSS_HOME/secrets`

## Docker

- [jboss/keycloak](https://hub.docker.com/r/jboss/keycloak)
- /opt/jboss/keycloak/themes - 主题目录
- /opt/jboss/keycloak/standalone/deployments - 自定义 provider 目录
- /opt/jboss/startup-scripts - 启动运行脚本目录

| Env                      | Default  | Description                                             |
| ------------------------ | -------- | ------------------------------------------------------- |
| KEYCLOAK_USER            |          |
| KEYCLOAK_PASSWORD        |          |
| KEYCLOAK_USER_FILE       |          |
| KEYCLOAK_PASSWORD_FILE   |          |
| DB_VENDOR                |          | h2,postgres,mysql,mariadb,oracle,mssql<br/>默认自动检测 |
| DB_ADDR                  |
| DB_PORT                  |
| DB_DATABASE              |
| DB_SCHEMA                |
| DB_USER                  |
| DB_USER_FILE             |
| DB_PASSWORD              |
| DB_PASSWORD_FILE         |
| PROXY_ADDRESS_FORWARDING | false    | 在代理之后需要接受反向代理参数                          |
| KEYCLOAK_FRONTEND_URL    |          | 前端地址                                                |
| KEYCLOAK_LOGLEVEL        | INFO     | ALL, DEBUG, ERROR, FATAL, INFO, OFF, TRACE, WARN        |
| ROOT_LOGLEVEL            | INFO     |
| KEYCLOAK_STATISTICS      | db,http  | `/metrics` 暴露的信息                                   |
| KEYCLOAK_WELCOME_THEME   |          |
| KEYCLOAK_DEFAULT_THEME   | keycloak |
| KEYCLOAK_IMPORT          |          | 可指定一个 realm json 文件导入                          |

```bash
# 默认启动使用 H2
# 映射出数据可重复启动不丢配置
docker run --rm -it \
  -p 8080:8080 \
  -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -v $PWD/keycloak:/opt/jboss/keycloak/standalone/data \
  --name keycloak jboss/keycloak

docker run --rm -it --entrypoint bash \
  -e -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -v $PWD/.keycloak:/opt/jboss/.keycloak \
  -v $PWD:/host -w /host \
  --name keycloak jboss/keycloak

# 配置文件
# $HOME/.keycloak/kcadm.config
docker run --rm -it --entrypoint bash \
  -v $PWD/.keycloak:/opt/jboss/.keycloak \
  -v $PWD:/host -w /host \
  --name keycloak jboss/keycloak

export PATH=/opt/jboss/keycloak/bin:$PATH

# master 授权
kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin

# 授权信息
kcadm.sh config credentials --server http://localhost:8080/auth --realm demo --user admin --client admin
# 创建域
kcadm.sh create realms -s realm=demorealm -s enabled=true -o
# 创建 Client
CID=$(kcadm.sh create clients -r demorealm -s clientId=my_client -s 'redirectUris=["http://localhost:8980/myapp/*"]' -i)

# 获取 oidc 连接信息
kcadm.sh get clients/$CID/installation/providers/keycloak-oidc-keycloak-json
```

```bash
# H2 Console
jar="./modules/system/layers/base/com/h2database/h2/main/h2-*.jar"
url="jdbc:h2:./standalone/data/keycloak;AUTO_SERVER=TRUE"

java -cp $jar org.h2.tools.Console -url "$url" -user sa -password sa
```
