---
title: Golang 模块
---

# Golang 模块

:::caution

- 不支持 Git 子目录 - [#34055](https://github.com/golang/go/issues/34055)
  - 已接受，实现中
- 私有模块目前不好使用 **Not Ready**
  - 本地开发 + CI/CD 都会遇到很多问题
  - 考虑 monorepo + replace
  - 考虑 vendor

:::

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

# 升级 go.mod
go mod tidy -go=1.17
# 用 1.6 选择逻辑 然后升级 1.7
go mod tidy -go=1.16 && go mod tidy -go=1.17
```

```go.mod
module github.com/wenerme/astgo
go 1.16
require (
  github.com/wenerme/gou v1.0.0
)
exclude github.com/dep/legacy v1.9.2
replace github.com/dep/one => github.com/fork/one

# use vendored
replace github.com/wenerme/go-wecom => ./modules/wecom
```

```html
<meta name="go-import" content="nhooyr.io/websocket git https://github.com/nhooyr/websocket mod" />
```

## 依赖更新

```bash
# 查看有更新的模块
go list -u -m all
# 查看直接依赖
# https://pkg.go.dev/cmd/go/internal/modinfo#ModulePublic
go list -u -m -f '{{.}}{{if .Indirect}} IAMINDIRECT{{end}}' all
# 只显示有更新的
go list -u -m -f '{{if .Update}}{{.}}{{end}}' all
# 只显示直接依赖
go list -u -m -f '{{if not .Indirect}}{{.}}{{end}}' all

# 更新 minor 和 patch
go get -u -v ./...
# 更新 patch
go get -u=patch -v ./...
# 更新测试依赖
go get -t -u ./...
```

## 查看模块所在位置

```bash
go list -f '{{.Dir}}' -m github.com/pkg/errors

# 模块缓存目录
go env GOMODCACHE
```

## 依赖管理

- [managing-dependencies](https://golang.org/doc/modules/managing-dependencies)

## go.work

- 多空间 - monorepo
- https://go.googlesource.com/proposal/+/master/design/45713-workspace.md

## go get

- [go-import](https://golang.org/cmd/go/#hdr-Remote_import_paths)
- [go-source](https://github.com/golang/gddo/wiki/Source-Code-Links)

## 自定义导入路径

- [GoogleCloudPlatform/govanityurls](https://github.com/GoogleCloudPlatform/govanityurls)
- [rsc/go-import-redirector](https://github.com/rsc/go-import-redirector)

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

:::caution

- 私有模块使用起来非常麻烦

:::

- https://github.com/golang/go/issues/29953

```bash
# 指定 private repo
go env -w GOPRIVATE=github.com/myrepo
# 整个组织
go env -w GOPRIVATE=gitlab.com/myorg/*

# git 添加授权信息 - 如果本地有 ssh-agent 应该可以直接访问
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

## vendor

- vendor/
  - modules.txt

## monorepo go mod tidy

```bash
ls **/*/go.mod | xargs dirname | xargs -I {} sh -c 'cd {}; go mod tidy'
```
