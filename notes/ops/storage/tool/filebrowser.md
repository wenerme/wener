
```bash
curl -LOC- https://github.com/filebrowser/filebrowser/releases/download/v2.9.0/linux-amd64-filebrowser.tar.gz

# JSON
filebrowser config set --auth.method=json
# 反向代理头
filebrowser config set --auth.method=proxy --auth.header=X-My-Header
# 无授权
filebrowser config set --auth.method=noauth
```
