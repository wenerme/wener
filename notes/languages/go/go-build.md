---
title: Go Build
---

# Go Build

| flag                                | desc                     |
| ----------------------------------- | ------------------------ |
| -w                                  | disable DWARF generation |
| -s                                  | disable symbol table     |
| -X 'wener.me/gou/build.Version=123' | add definition           |

## 自定义常量

```go
package main

var Version = "dev"
var CommitTime = ""
var CommitID = ""
var BuildTime = ""
```

```bash
DEF_FLAGS="
-X 'wener.me/tools/build.Version=`git describe --tags --abbrev=0`'
-X 'wener.me/tools/build.CommitID=`git rev-parse --short HEAD`'
-X 'wener.me/tools/build.CommitTime=`git log -1 --format=%cd --date=iso8601`'
-X 'wener.me/tools/build.BuildTime=`date --iso-8601=seconds`'
"
go build -o bin/cli -ldflags "$DEF_FLAGS" ./cmd/cli
```

## 限定 Build Tag

```go
//+build tag

package main
```

```bash
go build -tags tag
```
