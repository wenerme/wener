# Monitor

## Glances

- [Glances](https://github.com/nicolargo/glances) is a cross-platform curses-based system monitoring tool written in Python.

```bash
# Docker
# 终端模式
docker run -v /var/run/docker.sock:/var/run/docker.sock:ro --rm --name glances --pid host -it docker.io/nicolargo/glances
# Web 模式
docker run -d -p 61208:61208 -e GLANCES_OPT="-w" -v /var/run/docker.sock:/var/run/docker.sock:ro --pid host docker.io/nicolargo/glances

# 可直接安装使用
pip install glances
glances
```
