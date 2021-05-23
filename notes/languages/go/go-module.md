---
title: Golang 模块
---

# Golang 模块

- 注意
  - 不支持 Git 子目录 - [#34055](https://github.com/golang/go/issues/34055)
    - 已接受，实现中

```bash
# 依赖管理
go get -d github.com/path/to/module       # 添加、升级
go get -d github.com/dep/two/v2@v2.1.0    # 升级到版本
go get -d github.com/dep/commit@branch    # 使用分支
go get -d -u ./...                        # 升级全部

go get -d github.com/dep/legacy@none      # 移除依赖

# 模块操作
go mod init github.com/path/to/module     # 初始化模块
go mod tidy                               # 组织/清理 go.mod go.sum
go mod download                           # 下载依赖到缓存
go mod why -m github.com/path/to/module   # 依赖原因
go install github.com/path/to/bin@latest  # 安装
```

```go.mod
module github.com/wenerme/astgo
go 1.16
require (
  github.com/wenerme/gou v1.0.0
)
exclude github.com/dep/legacy v1.9.2
replace github.com/dep/one => github.com/fork/one
```

```html
<meta name="go-import" content="nhooyr.io/websocket git https://github.com/nhooyr/websocket mod" />
```

## GOPROXY

- [proxy.golang.org](https://proxy.golang.org/) - Go Module Mirror, Index, and Checksum Database
- GOPROXY
  - 默认 `proxy.golang.org,direct`
- GOPRIVATE = GONOPROXY
  - 逗号分割私有模块列表
- GOSUMDB='off' 可关闭 checksum
- direct
  - GET `https://{module or package name}?go-get=1`
  - `<meta name="go-import" content="git.example.com/golibs/logo git https://git.example.com/scm/golibs/logo.git"/>`
- [gomods/athens](https://github.com/gomods/athens) - Go module datastore and proxy
  - 实现代理协议，通过配置 netrc 来统一支持私有仓库
  - 支持 disk, mongo, gcs, s3, minio, 外部存储
- [goproxy.io](https://goproxy.io) - 全球代理
- [GoogleCloudPlatform/govanityurls](https://github.com/GoogleCloudPlatform/govanityurls)
  - 自定义域名作为导入路径

**gitlab**

- [Go proxy for GitLab](https://docs.gitlab.com/ee/user/packages/go_proxy/)

```bash
# GitLab
go env -w GOPROXY='https://gitlab.example.com/api/v4/projects/1234/packages/go,https://proxy.golang.org,direct'

# 需要关闭 SUM 因为私有项目无法被 SUM
go env -w GONOSUMDB='gitlab.com/my/project,<previous value>'
```

## 私有模块

```bash
# 指定 private repo
go env -w GOPRIVATE=github.com/myrepo
# git 添加授权信息
# 可以 SSH url."git@github.com".insteadOf "https://github.com"
# 可以 netrc
git config --global url."https://$USERNAME:$ACCESS_TOKEN@github.com".insteadOf "https://github.com"

# git 确认可以访问
git ls-remote -q https://github.com/myrepo/module.git
```

**~/.netrc**

```
machine <url> login <username> password <token>
```

**.gitconfig**

```ini
[url "ssh://git@git.example.com:7999"]
	insteadOf = https://git.example.com/scm
```
