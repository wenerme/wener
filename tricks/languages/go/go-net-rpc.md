---
id: go-pkg-net-rpc
title: Go net/rpc
---

# net/rpc
* [net/rpc](https://golang.org/pkg/net/rpc/)
* 支持方法 - `func (t *T) MethodName(argType T1, replyType *T2) error`
  * 方法类型已导出
  * 导出方法
  * 方法有两个参数 - 支持导出类型和内建类型
    * 支持 encoding/gob 序列化
  * 第二个参数为指针
  * 返回 error
* 默认处理 RPC 路径 `/_goRPC_`
* Debug 路径 `/debug/rpc`
* Server
  * hijack 链接进入 rpc 逻辑
  * 使用 gob 序列化
  * Request、Response 复用
  * Request ServerMethod，Seq
    * ServiceMethod 为 Service.Method 格式
    * 读取到 Request 后便读取请求对象
  * Response ServiceMethod，Seq，Error
* 支持使用 jsonrpc 就行编码
* HTTP CONNECT 请求
  * 然后转换为 Codec - 读写请求和响应
    * gob 和 json 实现
  * 读取 Reuqest、读取 Arg
  * 写入 Response，写入 Body
