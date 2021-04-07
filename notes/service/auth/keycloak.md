---
id: keycloak
title: Keycloak
---

# Keycloak

- 通过 jgroups 实现集群
- vault 支持 K8S secrets
  - 挂载到 `$JBOSS_HOME/secrets`
- 参考
  - [Use mobile numbers for user authentication in Keycloak](https://developers.redhat.com/blog/2020/10/23/use-mobile-numbers-for-user-authentication-in-keycloak)
- 地址
  - /auth
  - /auth/console
  - `/auth/realms/${REALM}/protocol/openid-connect/auth`
  - `/auth/admin/${REALM}/console`

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

## LDAP

## group-ldap-mapper

- 分组映射
- 注意
  - 不能有同名组，会导致无法同步回 Keycloak
  - LDAP 无法识别同名组

| 选项                                 | 翻译                  | 说明                                                                      |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------- |
| LDAP Groups DN                       | 分组 DN               | 例如 `ou=groups,dc=wener,dc=me`                                           |
| Group Name LDAP Attribute            | LDAP 属性 -> 分组名字 |
| Group Object Classes                 | 对象类                | `groupOfNames` `groups`                                                   |
| Preserve Group Inheritance           | 保留层级              | 如果不保留，则同步后都是顶级<br/>如果保留，存在相同名字分组会导致同步异常 |
| Ignore Missing Groups                | 忽略缺少分组          |
| Membership LDAP Attribute            | 表示成员的 LDAP 属性  | 例如 `member`                                                             |
| Membership Attribute Type            | 成员属性类型          | DN UID                                                                    |
| Membership User LDAP Attribute       | 成员用户 LDAP 属性    | UID 模式则使用该字段表示，一般为 `uid`                                    |
| LDAP Filter                          | 过滤条件              |
| Mode                                 | 模式                  | LDAP_ONLY,IMPORT,READ_ONLY                                                |
| User Groups Retrieve Strategy        | 查询策略              |
| Member-Of LDAP Attribute             | memberOf 属性         |
| Mapped Group Attributes              | 映射属性              | 例如 `description,ou,o`                                                   |
| Drop non-existing groups during sync | 同步删除不存在分组    | LDAP 到 Keycloak 时候                                                     |
