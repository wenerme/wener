---
title: athens
---

# athens

- Golang Module Proxy
- 支持 disk, mongo, gcs, s3, minio, 外部存储

```bash
# 使用本地磁盘存储
docker run -d --restart always \
  -v $PWD/data:/var/lib/athens \
  -e ATHENS_DISK_STORAGE_ROOT=/var/lib/athens \
  -e ATHENS_STORAGE_TYPE=disk \
  -p 3000:3000 \
  --name athens-proxy \
  gomods/athens:latest
```

## 配置
- [config.dev.toml](https://github.com/gomods/athens/blob/main/config.dev.toml)

```toml
# 避免 CHECKSUM 发送到上游
# ATHENS_GONOSUM_PATTERNS="github.com/mycompany/*,github.com/secret/*"
# 避免 go sum 失败
# export GONOSUMDB="github.com/mycompany/*,github.com/secret/*"
NoSumPatterns = ["github.com/mycompany/*", "github.com/secret/*"]
```

**下载模式配置文件**

- 使用下载模式配置文件
  - 通过 config.toml DownloadMode 指定
  - 通过 ATHENS_DOWNLOAD_MODE 指定
  - file:$FILE_PATH - 指定配置文件路径
  - custom:$BASE_64 - inline 配置
- sync - 默认模式 - go mod download - 下载完成返回
- async - 返回 404 异步下载
- none - 返回 404 - 可用于访问控制
- redirect - 重定向到上游 - 可减轻存储压力
- async_redirect - 重定向到上游且开始异步下载

```hcl
# 上游地址
downloadURL = "https://proxy.golang.org"

mode = "async_redirect"

download "github.com/gomods/*" {
    mode = "sync"
}

download "golang.org/x/*" {
    mode = "none"
}

download "github.com/pkg/*" {
    mode = "redirect"
    downloadURL = "https://gocenter.io"
}
```
