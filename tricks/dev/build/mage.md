---
id: mega
title: magefile
---

# mega

## Tips
* 优势
  * 有 Makefile 类似的语义
    * Target、依赖、文件变化检测
  * 通过 Go 编码
  * 可以使用任意库
  * 可以编译
  * 方便依赖其他地方的 Target
  * 可以不用安装，只需要 Go
* 劣势
  * 非静态编译则依赖 Go
  * 静态需要交叉编译多平台 - 其他的 task runner 由官方提供编译好的
* 场景
  * 例如 定义一个 Yaml 表示要做的 Task，通过 Go 解析然后执行会很容易
  * 复杂的自定义任务逻辑
  * 聚合其他包作为命令
    * 例如 shfmt、sprig - 类似于 busybox
  * 验证测试 Go 代码
  * 自定义命令工具
    * 类似于 cobra - 但可添加 go 自定义
* 注意
  * Target 不支持 flag
    * [magefile/mage#24](https://github.com/magefile/mage/issues/24)
* 参考
  * [ENVIRONMENT VARIABLES](https://magefile.org/environment/)

```bash
go get -u -d github.com/magefile/mage
cd $GOPATH/src/github.com/magefile/mage
git pull
go run bootstrap.go

mage -init
mage -l

# 编译为可执行文件 - 会忽略 GOOS GOARCH
# 使用 -goos -goarch 交叉编译
mage -compile ./builder
```

```go
// magefile 需要该 Tag
// +build mage

import "github.com/magefile/mage/mg"
import "github.com/magefile/mage/sh"
// Dir Glob Path
// import "github.com/magefile/mage/target"

var Default = Build
var Aliases = map[string]interface{} {
  "i":     Install,
  "build": Build,
  "ls":    List,
}

// 支持的 Target 函数签名
func Install(){}
func Deploy() error {return nil}
func List(context.Context)
func Build(context.Context) error {
  // 依赖
  mg.Deps(Install)
  return nil
}

// 命名空间
// mage build:site
type Build mg.Namespace
func (Build) Site() error {
  return nil
}
func (Build) Docs() {}


// 导入其他 Target
// 会忽略 default 和 alias
import (
  // 注释是必须的 - 导入到根命名空间
  // mage:import
  _ "example.com/me/foobar" 
  // 导入到 build 命名空间 - mage build:deploy
  // mage:import build
  "example.com/me/builder"
)

// 可直接使用 go build -tags mage 来编译 或 go run main.go -l 来执行
// +build ignore
package main
import (
	"os"
	"github.com/magefile/mage/mage"
)
func main() {
	os.Exit(mage.Main())
}
```
