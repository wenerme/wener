---
title: zentao
---

# zentao

- 禅道

```bash
docker run --rm -it \
  -p 8080:80 \
  -v $PWD/data/zentaopms:/www/zentaopms \
  -v $PWD/data/mysql:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123456
  --name zentao easysoft/zentao:18.3
```

- 容器内apache配置文件目录：/etc/apache2/
- 容器内禅道目录：/www/zentaopms
- 容器内mysql配置文件目录：/etc/mysql/
- 容器内php配置文件目录：/etc/php/7.0/apache2
- 参考
  - https://www.zentao.net/book/zentaopms/405.html
