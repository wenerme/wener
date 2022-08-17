---
title: Keycloak Legacy
---

# Keycloak Legacy

- Keycloak 17+ 为 Quakus, Docker 启动发生变化, 内部结构变化

## Keycloak 16 vs Keycloak 17+

- 环境变量
  - `DB_` -> `KC_DB_`
- `/auth` -> `/`
  - `--http-relative-path /auth` 恢复为之前配置

---

- https://www.keycloak.org/migration/migrating-to-quarkus

## Keycloak < 16 Docker

- /opt/jboss/keycloak/themes - 主题目录
- /opt/jboss/keycloak/standalone/deployments - 自定义 provider 目录
- /opt/jboss/startup-scripts - 启动运行脚本目录
- quay [keycloak/keycloak](https://quay.io/repository/keycloak/keycloak)
- dockerhub [jboss/keycloak](https://hub.docker.com/r/jboss/keycloak)

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
# 需要添加的用户会生成配置到 /opt/jboss/keycloak/standalone/configuration/keycloak-add-user.json
docker run --rm -it \
  -p 8080:8080 \
  -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -v $PWD/keycloak/data:/opt/jboss/keycloak/standalone/data \
  --name keycloak jboss/keycloak

docker run --rm -it --entrypoint bash \
  -e -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -v $PWD/keycloak:/opt/jboss/.keycloak \
  -v $PWD:/host -w /host \
  --name keycloak jboss/keycloak

# 配置文件
# $HOME/.keycloak/kcadm.config
docker run --rm -it --entrypoint bash \
  -v $PWD/keycloak:/opt/jboss/.keycloak \
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
