---
tags:
  - FAQ
---

# Rclone FAQ

## ReadFileHandle.Read error: low level retry 1/10: unexpected EOF

## Failed to copy: mkdir permission denied

注意存储目录是不是没对，local 目录在 web 和操作的时候不一样

## 常用操作

```bash
# 下载失败可能会创建空文件
# 查看实际占用空间
du -hs . --apparent-size

apk add findutils
# 删除空文件
find . -type f -empty -delete
# 删除空目录
find . -type d -empty -delete
```

## 通过 alias 给 s3 指定 bucket 和前缀

```bash
export RCLONE_CONFIG_SVR_TYPE=s3
export RCLONE_CONFIG_SVR_PROVIDER=Minio
export RCLONE_CONFIG_SVR_ACCESS_KEY_ID=deployer
export RCLONE_CONFIG_SVR_SECRET_ACCESS_KEY=
export RCLONE_CONFIG_SVR_ENDPOINT=https://

export RCLONE_CONFIG_DST_TYPE=alias
export RCLONE_CONFIG_DST_REMOTE=SVR:artifacts/sites

rclone lsd DST:
```

## base64 decode failed when revealing password

```bash
export RCLONE_CONFIG_MYSFTP_PASS=$(rclone obscure mypassword)
```

## fs attr

```bash
apk add acl
getfacl -R / > permissions.facl
setfacl --restore=permissions.facl
```
