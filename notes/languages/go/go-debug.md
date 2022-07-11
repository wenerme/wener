---
title: Debugging
---

# Go Debug

- [go-delve/delve](https://github.com/go-delve/delve)

```bash
go install github.com/go-delve/delve/cmd/dlv@latest

# 仓库内运行 go.mod
dlv debug --headless --listen=:2345 --api-version=2 --accept-multiclient
# 编译后远程运行
go build -gcflags "all=-N -l" github.com/app/demo
dlv --listen=:2345 --headless=true --api-version=2 --accept-multiclient exec ./demo
```

## pprof

```go
var cpuprofile = flag.String("cpuprofile", "", "write cpu profile to file")

func main() {
    flag.Parse()
    if *cpuprofile != "" {
        f, err := os.Create(*cpuprofile)
        if err != nil {
            log.Fatal(err)
        }
        pprof.StartCPUProfile(f)
        defer pprof.StopCPUProfile()
    }
}
```

```bash
go build main.go
./main -cpuprofile=out.prof
go tool pprof main out.prof
```

## benchstat

```bash
go install golang.org/x/perf/cmd/benchstat@latest

# 测试然后输出统计
go test ./contextx/ -bench=BenchmarkCopy -benchmem -run=^$ -count=10 > out.txt
benchstat out.txt

# 对比
# delta 为 ~ 表示两次没有差异
benchstat old.txt new.txt
```

- https://pkg.go.dev/golang.org/x/perf/cmd/benchstat
