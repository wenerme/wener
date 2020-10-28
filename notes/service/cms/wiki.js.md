# wikijs

## Tips
* [Requarks/wiki](https://github.com/Requarks/wiki)
  * AGPL-3.0
* 要求
  * 2 CPU 1G 内存
  * PostgreSQL - 下一个大版本可能只支持 PostgreSQL
* [授权](https://docs.requarks.io/auth)
  * CAS、LDAP/AD、SAML 2.0、Local

```bash
# Docker 安装
# https://docs.requarks.io/install/docker
docker run --rm -it \
  -p 8080:3000 \
  -v $PWD/wiki:/data \
  -e "DB_TYPE=sqlite" \
  -e "DB_FILEPATH=/data/wiki.sqlite" \
  --name wiki requarks/wiki:2

docker run -d --restart unless-stopped \
  -p 8080:3000 \
  -e "DB_TYPE=postgres"
  -e "DB_HOST=db"
  -e "DB_PORT=5432"
  -e "DB_USER=wikijs"
  -e "DB_PASS=wikijsrocks"
  -e "DB_NAME=wiki" \
  --name wiki requarks/wiki:2
```

## 配置
* [Configuration](https://docs.requarks.io/install/config)
