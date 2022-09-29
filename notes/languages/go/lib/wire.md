---
title: wire
---

# wire

- [google/wire](https://github.com/google/wire)
  - Compile-time DI
  - 编译时生成 DI 逻辑
    - 逻辑清晰明确
  - 不是 IoC 容器
    - 透明 - IoC 容器是一个不透明的盒子

```bash
go install github.com/google/wire/cmd/wire@latest
```

```go title="main.go"
package main

func main() {
    e,err := InitializeEvent()
    if err != nil {
        fmt.Printf("failed to create event: %s\n", err)
        os.Exit(2)
    }
    e.Start()
}
```

```go title="wire.go"
//+build wireinject

func InitializeEvent() Event {
    wire.Build(NewEvent, NewGreeter, NewMessage)
    return Event{}
}
```

```go title="wire_gen.go"
// 生成的内容
func InitializeEvent() Event {
    message := NewMessage()
    greeter := NewGreeter(message)
    event := NewEvent(greeter)
    return event
}
```
