---
title: Jetbrain IDE
---

# Intellij IDEA

| IDE            | for                 |
| -------------- | ------------------- |
| Intellij IDEA  | JVM, Java, Kotlin   |
| WebStorm       | Web, NodeJS, JS, TS |
| PyCharm        | Python              |
| GoLand         | Go                  |
| CLion          | C/C++               |
| Rider          | .NET                |
| DataGrip       | Database            |
| RubyMine       | Ruby                |
| AppCode        | iOS, macOS          |
| PHPStorm       | PHP                 |
| Android Studio | Android             |

:::info

- GRPC HTTP 客户端支持 Metadata [IDEA-287369](https://youtrack.jetbrains.com/issue/IDEA-287369)

:::

:::caution WebStorm

- NPM 工作空间补全有问题 [WEB-50806](https://youtrack.jetbrains.com/issue/WEB-50806)
- c8 Coverage [WEB-45069](https://youtrack.jetbrains.com/issue/WEB-45069)
- [AVA Test Run Configuration Generator](https://plugins.jetbrains.com/plugin/13835-ava-test-run-configuration-generator)
  - 推荐 vitest

:::

:::tip 插件

- [devkanro/intellij-protobuf-plugin](https://github.com/devkanro/intellij-protobuf-plugin)
  比官方 pb 插件功能更多
- 官方 gRPC 插件 [16889-grpc](https://plugins.jetbrains.com/plugin/16889-grpc)
- [JetBrains/intellij-plugins](https://github.com/JetBrains/intellij-plugins)
  - 官方内置插件源码

:::

**特殊正则替换语法**

| syntax | for                     |
| ------ | ----------------------- |
| \l     | 小写下一个字符          |
| \u     | 大写下一个字符          |
| \L     | 小写直到 \E 或 替换结束 |
| \U     | 大写直到 \E 或 替换结束 |
| \E     | \U, \L 结束标志         |

- https://www.jetbrains.com/help/idea/regular-expressions.html

## 实现自定义语言插件

- [Custom Language Support Tutorial](http://www.jetbrains.org/intellij/sdk/docs/tutorials/custom_language_support_tutorial.html)
- Language and File Type
- Syntax Highlighter and Color Settings Page
- Annotator
- Line Marker Provider
- Completion Contributor
- Reference Contributor
- Find Usages Provider
- Folding Builder
- Go To Symbol Contributor
- Structure View Factory
- Formatter
- Code Style Settings
- Commenter
- Quick Fix

## Grammar-Kit

- [JetBrains/Grammar-Kit](https://github.com/JetBrains/Grammar-Kit)
- BNF 基于 PEG
- 使用 JFlex 做词法解析
- Antlr 生成 Psi
  - [antlr/jetbrains](https://github.com/antlr/jetbrains)
    - 提供 Antlr 到 Psi 的适配
  - [antlr/intellij-plugin-v4](https://github.com/antlr/intellij-plugin-v4)
    - Antlr 的插件是基于 Antlr 实现的

## Diff

```bash
idea diff path1 path2 path3
```

## Status bar - Git branch

- View -> Apperance -> Status bar widgets -> Git Branch

## Index

```bash
DIR=$PWD/data
mkdir -p $DIR/{ide-system,ide-config,ide-log}

cp /Applications/apps/WebStorm/ch-0/231.9011.35/WebStorm.app/Contents/bin/idea.properties $DIR/ide.properties
cat << EOF >> $DIR/ide.properties
idea.system.path=$DIR/ide-system
idea.config.path=$DIR/ide-config
idea.log.path=$DIR/ide-log
EOF

export WEBSTORM_PROPERTIES=$DIR/ide.properties

# --compression=xz, gzip, plain
webstorm dump-shared-index project --output=$DIR/generate-output --tmp=$DIR/temp --project-dir=$HOME/gits/wenerme/wode --project-id=wode --commit=$(git -C ~/gits/wenerme/wode rev-parse HEAD)

ls $DIR/generate-output
# shared-index-project-<name>-<hash>.ijx.xz
# shared-index-project-<name>-<hash>.metadata.json
# shared-index-project-<name>-<hash>.sha256

# e.g. ~/indexes/project/<project name>/<VCS hash>/share
SHR=$HOME/temp/jb/indexes/project/wode/$(git -C ~/gits/wenerme/wode rev-parse HEAD)/share
mkdir -p $SHR/indexes
cp $DIR/generate-output/*{.ijx.xz,.metadata.json,.sha256} $SHR/indexes

./bin/cdn-layout-tool --indexes-dir=$SHR/indexes --url=http://127.0.0.1:8000/indexes
ls $SHR/indexes/project
cd $SHR

server
```

```yaml title="$PROJECT_DIR/intellij.yaml"
sharedIndex:
  project:
    - url: http://127.0.0.1:8000/indexes/
```

- https://www.jetbrains.com/help/webstorm/shared-indexes.html

## Perfoamce

- https://www.jetbrains.com/help/webstorm/how-to-improve-product-performance.html
- https://blog.jetbrains.com/kotlin/2021/06/simple-steps-for-improving-your-ide-performance/

## Code Vision hints evaluation

- 显示使用情况
- 占用更多 CPU
- https://www.jetbrains.com/help/rider/Code_Vision.html

## Cannot connect to already running IDE instance. Exception: Process 621 is still running

```bash
ls "$HOME/Library/Application Support/JetBrains/IntelliJIdea2023.2"

ls $HOME/Library/Application\ Support/JetBrains/*/.lock
rm $HOME/Library/Application\ Support/JetBrains/*/.lock
```
