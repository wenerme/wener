---
title: just
---

# just

:::caution

- just 能解决 Makefile 需要 escape `${}` 的问题
- just 需要处理 `{{`,`}}` 的 escape 问题 -> `{{{{}}}}`

:::

- [casey/just](https://github.com/casey/just)
  - CC0-1.0, Rust
  - command runner, **不是** 构建工具
    - 不需要 make 的 .PHONY
    - 不需要 文件依赖管理
  - 能接收 命令行参数
  - 会加载 .env
  - 支持自定义语言的 任务运行
  - 能够从子目录执行
- 参考
  - Jetbrains [Just](https://plugins.jetbrains.com/plugin/18658-just) 插件
  - VSC [Just](https://marketplace.visualstudio.com/items?itemName=nefrob.vscode-just-syntax) 插件
    - [nefrob/vscode-just](https://github.com/nefrob/vscode-just)

```bash
brew install just # macOS brew
apk add just      # AlpineLinux

curl -LO https://github.com/casey/just/releases/download/1.43.1/just-1.43.1-x86_64-unknown-linux-musl.tar.gz
tar -xzvf just-1.43.1-x86_64-unknown-linux-musl.tar.gz just
./just --version
sudo mv just /usr/local/bin/
just --version

just --list
just --list PATH # PATH 支持 :: 分割多个
just --summary   # 空格分割的所有 target

just os=bsd # 修改变量
just --set os bsd

just --choose # 选择 target - 依赖 fzf
# 调用其他目录
(cd foo && just build)
just foo/build
just foo/

just bar::b # 搜索 foo.just, foo/mod.just, foo/justfile, foo/.justfile

just --fmt --check --unstable
just --dump                                                  # --dump-format json
just --timestamp recipe --timestamp-format '%H:%M:%S%.3f %Z' # strftime
```

## justfile

- justfile, .justfile
- global - `just --global-justfile`, `just -g`
  - $XDG_CONFIG_HOME/just/justfile
  - $HOME/.config/just/justfile
  - $HOME/justfile
  - $HOME/.justfile

| opt      | for                                     |
| -------- | --------------------------------------- |
| quite    | 静默模式                                |
| fallback | 如果 recipe 不存在，尝试向上找 justfile |

```justfile
mod bar # 定义模块名字 - 作为子命令运行 just bar b
mod foo 'PATH' # 从给定的 path 加载模块 mod.just, justfile, .justfile
mod? foo

# 引入其他 justfile
import 'foo/bar.just'
import? 'foo/bar.just'

# for Node.js
export PATH := "./node_modules/.bin:" + env_var('PATH')

# 启用 unstable 特性
# JUST_UNSTABLE
# 例如 [script(COMMAND)]
set unstable

# 修改默认工作目录
set working-directory := 'bar'

alias b := build # 设置别名

set shell := ["bash", "-uc"]
set shell := ["zsh", "-cu"] # 修改 shell

[private]
default:
  @just --list --justfile {{justfile()}}

# 注释
js:
  #!/usr/bin/env node
  console.log('Greetings from JavaScript!')

# 这种方式也保证所有都在一个 shell 运行而不是一行一个 shell
sh:
  #!/usr/bin/env sh
  hello='Yo'
  echo "$hello from a shell script!"

# 默认文档内容
[doc('Say hello to someone.')]
hello name:
  @echo "Hello, {{name}}!"

[no-cd] # 避免 cd 到 justfile 所在目录
build name:
  @echo "Building {{name}}..."

# 会读取 TEST_NAME 环境变量
test $TEST_NAME="1":

# 依赖可以带参数
xbuild: (build "main")
# 透传参数，默认参数
push target=xyz: (build target)
# 复杂默认参数
test triple=(arch + "-unknown-unknown") input=(arch / "input.dat"):

# varidic 参数 / 可变参数
backup +FILES:
backup *FILES:

[working-directory: 'bar'] # 针对命令修改工作目录
@bar:

# 执行顺序是 a b c d
b: a && c d

[no-exit-message]
git *args:
    @git {{args}}
```

- recipe
  - private
    - 以 `_` 开头为 private
    - 者使用 `[private]` 标记为 private
    - 不会在 list 显示
  - quite
    - `set quiet`
    - `[no-quiet]` 取消 quite
    - `@line`
    - `@recipe:`
      - 默认 quiet,
      - 在行首加 `@` 取消 quiet
    - Shebang recipes 默认 quite
- 内置函数别名
  - `_directory` -> `_dir`
    - `home_directory()` -> ``home_dir()`
- 内置函数
  - arch, num_cpus, os, os_family
  - shell
  - env(key) / env_var(key), env(key, default) / env_var_or_default(key, default)
  - is_dependency() - 当前 recipe 作为依赖 运行
  - invocation_directory(), invocation_directory_native()
  - justfile(), justfile_directory()
  - source_file(), source_directory()
  - just_executable()
  - just_pid()
  - error
- 字符串函数、 case 转换函数、路径函数、随机、hash、日期、版本号、 XDG 目录
- console 颜色常量
- recipe 属性
  - confirm, doc, extension, group, no-cd, no-exit-message, no-quiet, private, script
  - working-directory
  - positional-arguments
  - linux, macos, unix, windows, openbsd
- 语法
  - if/else

```bash
# 确保是单个命令 - 以免把 serve 当成参数
just --one build serve
```
