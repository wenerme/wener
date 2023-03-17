---
title: filebrowser
---

# filebrowser

- [filebrowser/filebrowser](https://github.com/filebrowser/filebrowser) 是什么？
  - Apache-2.0, Vue
  - 简单的文件浏览器

:::caution

- 配置分为服务配置和系统设置 - 只有服务配置才能 JSON 传递
  - 系统配置在 db - 通过命令行修改
- 启动后 db 被锁定 - 无法通过命令行修改配置

:::

```bash
curl -LOC- https://github.com/filebrowser/filebrowser/releases/download/v2.17.2/linux-amd64-filebrowser.tar.gz
tar zxvf linux-amd64-filebrowser.tar.gz
chmod +x filebrowser
sudo mv filebrowser /usr/local/bin/

# 配置初始化
filebrowser config init
# 认证
# JSON - 默认
filebrowser config set --auth.method=json
# 反向代理头
filebrowser config set --auth.method=proxy --auth.header=X-My-Header
# 无授权
filebrowser config set --auth.method=noauth

filebrowser -a 0.0.0.0

# 自定义标题
# --branding.name "My Name" \
# --branding.files "/abs/path/to/my/dir" \
# --branding.disableExternal

# /srv
# /database.db
# /.filebrowser.json
docker run --rm -it -p 8080:80 filebrowser/filebrowser
```

**Docker 默认配置**

```json
{
  "port": 80,
  "baseURL": "",
  "address": "",
  "log": "stdout",
  "database": "/database.db",
  "root": "/srv"
}
```

**完整配置**

```json
{
  "settings": {
    "key": "",
    "signup": false,
    "createUserDir": false,
    "defaults": {
      "scope": ".",
      "locale": "en",
      "viewMode": "list",
      "sorting": {
        "by": "name",
        "asc": false
      },
      "perm": {
        "admin": false,
        "execute": true,
        "create": true,
        "rename": true,
        "modify": true,
        "delete": true,
        "share": true,
        "download": true
      },
      "commands": []
    },
    "authMethod": "noauth",
    "branding": {
      "name": "",
      "disableExternal": false,
      "files": "",
      "theme": ""
    },
    "commands": {
      "after_copy": [],
      "after_delete": [],
      "after_rename": [],
      "after_save": [],
      "after_upload": [],
      "before_copy": [],
      "before_delete": [],
      "before_rename": [],
      "before_save": [],
      "before_upload": []
    },
    "shell": [],
    "rules": []
  },
  "server": {
    "root": ".",
    "baseURL": "",
    "socket": "",
    "tlsKey": "",
    "tlsCert": "",
    "port": "8080",
    "address": "127.0.0.1",
    "log": "stdout",
    "enableThumbnails": false,
    "resizePreview": false,
    "enableExec": false
  },
  "auther": {}
}
```
