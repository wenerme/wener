---
title: machinery
---

# machinery

- [RichardKnop/machinery](https://github.com/RichardKnop/machinery) 是什么？
  - 异步任务队列
  - Lock - Redis
  - Broker - AMQP, Redis
  - ResultBackend - Redis, Memcache, AMQP, MongoDB

```go
func Add(args ...int64) (int64, error) {
  sum := int64(0)
  for _, arg := range args {
    sum += arg
  }
  return sum, nil
}

func Multiply(args ...int64) (int64, error) {
  sum := int64(1)
  for _, arg := range args {
    sum *= arg
  }
  return sum, nil
}

func main(){
  server.RegisterTasks(map[string]interface{}{
    "add":      Add,
    "multiply": Multiply,
  })

  signature := &tasks.Signature{
    Name: "add",
    Args: []tasks.Arg{
      {
        Type:  "int64",
        Value: 1,
      },
      {
        Type:  "int64",
        Value: 1,
      },
    },
  }
  // 触发任务
  asyncResult, err := server.SendTask(signature)
}
```
