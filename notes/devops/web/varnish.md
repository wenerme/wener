---
title: varnish
---

# varnish

- [varnishcache/varnish-cache](https://github.com/varnishcache/varnish-cache)
- 参考
  - [Varnish Documentation](https://varnish-cache.org/docs/index.html)
  - [S3 as a Backend](https://info.varnish-software.com/blog/using-varnish-cache-secured-aws-s3-gateway)
  - https://gist.github.com/fevangelou/84d2ce05896cab5f730a
- 管理
  - cli, telnet, web
  - child process mgmt
  - initializtion
  - vlc compiler -> c -> shared object -> child/cache
- child/cache
  - storage/hashing
  - log/stats
  - accep
  - backend comm
  - worker threads
  - object expiry
- CLI
  - varnishd - 主程序
  - varnishadm
  - varnishtest
  - varnish_reload_vcl
  - log
    - varnishlog
    - varnishstat
    - varnishhist
    - varnishtop
    - varnishncsa

```bash
# macOS
brew install varnish

varnishd -V # 查看版本
varnishd -x cli

uuidgen > varnish-secret
# github pages
# -f default.vcl
varnishd -a 127.0.0.1:8080 -b 185.199.109.153:80 -T 127.0.0.1:6082 -d -S $PWD/varnish-secret -s file,/tmp/varnish-storage,1G
varnishadm -S $PWD/varnish-secret -T 127.0.0.1:6082 start

curl -H 'Host: wener.me' 127.0.0.1:8080
curl -H 'Host: charts.wener.tech' 127.0.0.1:8080/index.yaml -sv > /dev/null

varnishadm -S $PWD/varnish-secret -T 127.0.0.1:6082 status -j

# docker
# VARNISH_SIZE
# VARNISH_HTTP_PORT=80
# VARNISH_PROXY_PORT=8443
# feature=+http2
docker run --rm -it \
  -p 8080:80 \
  -v $PWD/default.vcl:/etc/varnish/default.vcl:ro \
  --tmpfs /var/lib/varnish/varnishd:exec \
  --name varnish varnish:alpine
```

- `auth <response>`
- help
- vcl
  - `vcl.load <configname> <filename> [auto|cold|warm]`
  - vcl.list
  - `vcl.use <configname|label>`
  - `vcl.show [-v] [<configname>]`
  - vcl.deps
  - `vcl.discard <name_pattern>...`
  - `vcl.inline <configname> <quoted_VCLstring> [auto|cold|warm]`
  - `vcl.label <label> <configname>`
  - `vcl.state <configname> [auto|cold|warm]`
  - vcl.symtab
- backend
  - backend.list
  - backend.set_health
- `ban <field> <operator> <arg> [&& <field> <oper> <arg> ...]`
  - ban.list
- banner
- panic.clear
- panic.show
- `param.reset <param>`
- `param.set [-j] <param> <value>`
- `param.show [-l|-j] [<param>|changed]`
- `pid [-j]`
- `ping [-j] [<timestamp>]`
- quit
- start, stop
- `status [-j]`
- storage.list

| varnishd                   | for                                        |
| -------------------------- | ------------------------------------------ |
| -a                         | listen address                             |
| -b none                    | 无后端                                     |
| `-b [addr[:port]\|path]`   | backend - 默认 :80                         |
| `-f <vclfile>`             | VCL program                                |
| `-n <dir>`                 | Working directory                          |
| -F                         | foreground                                 |
| `-T address[:port]`        | CLI address                                |
| -M address:port            | reverse cli                                |
| -i identity                |
| -I clifile                 | Initialization cli                         |
| -E extension               | 加载扩展                                   |
| `-x <topic>`               | 文档 - parameter,vsl,cli,builtin,optstring |
| **Tuning**                 |
| -t TTL                     |
| -p param=value             |
| `-s [name=]kind[,options]` | 存储选项                                   |
| `-l <vsl>`                 | Size of shared memory log                  |
| **Security**               |
| `-r param[,param...]`      | parameters read-only from CLI              |
| `-S <secret-file>`         |
| `-j jail[,options]`        | unix, none                                 |
| **Advanced/Dev/Debug**     |
| -d                         | debug mode                                 |
| -C                         | Output VCL code compiled to C language     |
| -V                         | version                                    |
| `-h kind[,options]`        | Hash specification                         |
| -W waiter                  | Waiter implementation                      |

- storage
  - malloc
  - umem - libumem
  - file - `file,path[,size[,granularity[,advice]]]`
    - **重启缓存失效**
    - 长期运行会碎片化
    - mmap 作为 memory, 而非单个文件独立, 会预先 alloc 给定的 size
    - 单文件要能存入 虚拟内存 - ulimit -v
    - granularity 默认为 page size - 一般 4k
    - advice=random - normal, random, sequential
  - mse - 企业版

## 配置

- /etc/varnish/varnish.params
- /etc/varnish/default.vcl
  - macOS brew /usr/local/etc/varnish/default.vcl

## FAQ

- x-proxy-cache: MISS
- X-Varnish

## 多个 Storage

```bash
varnishd -s disk=file,/var/lib/varnish/storage,250G -s memory=malloc,32G
```

```vcl
sub backend_response {
    if(beresp.http.Content-Type ~ "^(image|video)/") {
        set beresp.storage = "file";
    } else {
        set beresp.storage = "memory";
    }
}
```
