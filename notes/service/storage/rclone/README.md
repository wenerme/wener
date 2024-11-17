---
title: rclone
---

# rclone

- [rclone/rclone](https://github.com/rclone/rclone)
  - https://rclone.org/
- 默认配置文件 `~/.config/rclone/rclone.conf`

:::caution

- 不支持 watch [#249](https://github.com/rclone/rclone/issues/249)
  - minio 的 mc 支持 mirror - 双向 watch
    - `mc mirror --watch --overwrite --remove`
  - 可以用 mount
- 不支持 fs 属性同步 [#1202](https://github.com/rclone/rclone/issues/1202)
  - ACL 信息
  - `getfacl -R / >permissions.facl;setfacl --restore=permissions.facl`
  - `--metadata`
  - `--metadata-mapper`
  - `--refresh-times`

:::

| flag                                 | desc                    |
| ------------------------------------ | ----------------------- |
| -P,--progress                        | 显示进度                |
| `--transfers <n:=4>`                 | 并行 数量               |
| --create-empty-src-dirs              | copy 创建空目录         |
| `-f,--filter <patterns>`             |
| --ignore-case                        | filter 大小写不敏感     |
| `--include <pattern>`                |
| `--exclude <pattern>`                |
| `--files-from <file>`                |
| `--min-size <size>`                  |
| `--max-size <size>`                  |
| `--max-age <age>`                    |
| --stats-one-line                     | 只显示一行状态          |
| --track-renames                      | 跟踪 rename             |
| `--track-renames-strategy <s:=hash>` | hash,modtime,leaf       |
| --delete-after                       | 默认                    |
| --delete-before                      |
| --delete-during                      |
| --delete-excluded                    |
| -M, --metadata                       | copy 保留元数据         |
| -u, --update                         | 如果 dst 文件更新则忽略 |

| command |
| ------- | ---------------------------------- |
| ls      | size,path - 默认递归 `--max-depth` |
| lsl     | mtime,size,path                    |
| lsd     | 目录                               |
| lsf     | 文件+目录 - 便于应用解析的格式     |
| lsjson  |
| copy    | 复制目录                           |
| copyto  | 复制单个文件                       |
| sync    | 同步 - 会删除额外的文件            |
| bisync  | 双向同步 - 会对比 mtime            |

```bash
brew install rclone # macOS

# Linux 安装
curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64
cp rclone /usr/local/bin/
# cp rclone-*-linux-amd64/rclone ~/bin

# Commands
# ==========
rclone copy src:/src dst:/dst # 复制目录
rclone copyto                 # 复制单个文件

# 不创建配置的使用方式
rclone lsd --webdav-url http://192.168.1.1:8080 :webdav:
rclone lsd --sftp-host example.com :sftp:
rclone lsd --ftp-host 192.168.1.1 --ftp-port 21 --ftp-user anonymous --ftp-pass $(rclone obscure anonymous) :ftp:

rclone about gd:     # 使用情况
rclone reconnect gd: # Token 失效重连

rclone sync -P --stats-one-line --transfers 10 -M A B
```

- filter
  - https://rclone.org/filtering
  - `+ include-pattern`
  - `- exclude-pattern`
  - `!` - reset
- track-rename - [fs/sync/sync.go#L752-L789](https://github.com/rclone/rclone/blob/7a24c173f6669172d845221c7e37e5824fa13fb7/fs/sync/sync.go#L752-L789)
  - 先基于 size 找到可能 相同 的对象
  - 根据 hash 生成唯一 ID - 基于 ID 判断是否 相同 对象
  - track-renames-strategy 可指定多次
    - leaf 会要求只在相同目录下 rename - 添加 basedir 到 ID

## config

- 优先级
  - `remote,skip_links:`
  - `--skip-links`
  - `RCLONE_CONFIG_REMOTE_SKIP_LINKS`
  - `RCLONE_LOCAL_SKIP_LINKS`
  - `RCLONE_SKIP_LINKS`
  - 配置文件 `skip_links=true`
  - 默认值 - 不可以修改

| env                | for          |
| ------------------ | ------------ |
| RCLONE_CONFIG_PASS | 配置文件加密 |
| RCLONE_CONFIG_DIR  |
| USER               |
| LOGNAME            |
| HTTP_PROXY         |
| HTTPS_PROXY        |
| NO_PROXY           |

```bash
rclone version -vv

rclone config create svr s3 env_auth=true

rclone config create svr s3 provider=Minio endpoint=https://s3.example.com access_key_id=$USERNAME secret_access_key=$PASSWORD
cat ~/.config/rclone/rclone.conf
```

- remote 名字建议 `[a-z0-9][-a-z0-9_.]*`
- gcs
  - client_id
  - client_secret
  - project_number
- s3
  - access_key_id
  - secret_access_key
  - endpoint

**环境变量**

- 配置了环境变量可直接使用
- `RCLONE_CONFIG_<NAME>_TYPE=s3`
- `RCLONE_CONFIG_<NAME>_ACCESS_KEY_ID`
- `RCLONE_CONFIG_<NAME>_SECRET_ACCESS_KEY`
- `RCLONE_CONFIG_<NAME>_ENDPOINT`
- env_auth
  - s3
    - AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY
    - AWS_SECRET_ACCESS_KEY, AWS_SECRET_KEY
    - AWS_SESSION_TOKEN
    - AWS_PROFILE - ~/.aws/credentials
    - AWS_SHARED_CREDENTIALS_FILE

**路径**

- 本地
  - /path/to/dir
- 预定义后端
  - remote:path/to/dir
    - 基于配置的默认路径
    - ftp,sftp,dropbox 基于 HOME 相对路径
  - remote:/path/to/dir
- 动态后端
  - `:backend:path/to/dir`
  - `rclone lsd --http-url https://pub.rclone.org :http:`
- 链接字符串
  - `:backend:path/to/dir`
  - `:backend,parameter=value,parameter2=value2:path/to/dir`
  - `:sftp,host=example.com:path/to/dir`
  - `rclone lsd ":http,url='https://pub.rclone.org':"`
  - `remote,parameter=value,parameter2=value2:path/to/dir`
    - 修改部分参数

```bash
# 覆盖配置
rclone copy "gdrive,shared_with_me:shared-file.txt" gdrive:

# flag 默认 true
rclone lsd :s3,env_auth:
```

## sftp

- sudo
  - https://github.com/rclone/rclone/pull/4502
    - server_command=sudo /usr/lib/openssh/sftp-server

```bash
rclone config

# for agent-forward enter root
sudo -E -s
# --sftp-host
# /usr/lib/openssh/sftp-server
RCLONE_SFTP_USER=admin \
  RCLONE_SFTP_HOST="192.168.1.1" \
  RCLONE_SFTP_SERVER_COMMAND="sudo /usr/lib/ssh/sftp-server" \
  RCLONE_SFTP_MD5SUM_COMMAND="sudo md5sum" \
  RCLONE_SFTP_SH1SUM_COMMAND="sudo sh1sum"
rclone lsd :sftp:

# agent-forward 进入 root 保留 env
sudo -E -s
# 或者只保留 SSH_AUTH_SOCK
sudo --preserve-env=SSH_AUTH_SOCK -s
# or /etc/sudos Defaults    env_keep+=SSH_AUTH_SOCK
```

## Web UI

```bash
# 会下载 https://github.com/rclone/rclone-webui-react/releases/download/v2.0.5/currentbuild.zip
# 到 ~/.cache/rclone/webgui/v2.0.5.zip]
rclone rcd --rc-web-gui --rc-addr :5572
```

## google drive

```bash
rclone mount gd: /tmp/gd \
  -vv --stats 30s --read-only --allow-other --rc --umask 0222 --attr-timeout 1s \
  --dir-cache-time 672h --vfs-cache-max-age 675h \
  --vfs-read-chunk-size 8M \
  --buffer-size 0 \
  --poll-interval 1m0s \
  --drive-v2-download-min-size 0
```

- https://rclone.org/drive/#making-your-own-client-id
- [#3625](https://github.com/rclone/rclone/issues/3625) - Add gdrive file id support
- [donwa/gclone](https://github.com/donwa/gclone)
  - 基于 rclone，支持替换 sa
- [xyou365/AutoRclone](https://github.com/xyou365/AutoRclone)
  - 切换 sa 上传

## one drive

- [#4062](https://github.com/rclone/rclone/issues/4062) Implement OneDrive shared with me
- https://rclone.org/webdav/#sharepoint-online

## mount

```bash
rclone mount s3:bucket /mnt/path --use-server-modtime
```

## serve

- dlna
- docker
- ftp
- http
- nfs
- restic
- s3
- sftp
- webdav

| flag                                       | for |
| ------------------------------------------ | --- |
| **S3**                                     |
| --auth-key ACCESS_KEY_ID,SECRET_ACCESS_KEY |
| --no-cleanup                               |
