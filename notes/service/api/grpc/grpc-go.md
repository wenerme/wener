---
title: gRPC Go
---

# gRPC Go

- [A new Go API for Protocol Buffers](https://go.dev/blog/protobuf-apiv2)
  - 2020-03-02
  - 基于 reflect
  - APIv2 google.golang.org/protobuf
  - APIv1 github.com/golang/protobuf
    - 1.4 基于 APIv2 实现
- [planetscale/vtprotobuf](https://github.com/planetscale/vtprotobuf)
  - 基于 gogo
  - [A new Protocol Buffers generator for Go](https://vitess.io/blog/2021-06-03-a-new-protobuf-generator-for-go/)
- [srikrsna/protoc-gen-gotag](https://github.com/srikrsna/protoc-gen-gotag)
- [golang/protobuf#52](https://github.com/golang/protobuf/issues/52)
  - 不支持 struct tag
- [favadi/protoc-go-inject-tag](https://github.com/favadi/protoc-go-inject-tag)
- [protocolbuffers/protobuf-go](https://github.com/protocolbuffers/protobuf-go)

```bash
# debug
export GRPC_GO_LOG_VERBOSITY_LEVEL=99
export GRPC_GO_LOG_SEVERITY_LEVEL=info
```

## 实现

- method - `"/<service>/<method>"`

```go
type ClientConn interface {
  // 请求
	Invoke(ctx context.Context, method string, args interface{}, reply interface{}, opts ...CallOption) error
	NewStream(ctx context.Context, desc *StreamDesc, method string, opts ...CallOption) (ClientStream, error)
}

// 生成的 Stream 接口 - BiStream - Send+Recv
// <Service>_<Method>Client for Stream
type Service_MethodClient interface {
  // 根据 Stream 生成的 输入输出
  // ClientStream.SendMsg(m)
	Send(*ServerReflectionRequest) error
  // ClientStream.RecvMsg(m)
	Recv() (*ServerReflectionResponse, error)
	grpc.ClientStream
}
```

```go
// grpc.Server 暴露的服务信息
type ServiceInfo struct {
	Methods []MethodInfo
	// ServiceDesc
	Metadata interface{}
}
type MethodInfo struct {
	Name string
	IsClientStream bool
	IsServerStream bool
}

// 生成的 Desc 信息

type MethodDesc struct {
	MethodName string
	Handler    methodHandler
}
type ServiceDesc struct {
	ServiceName string
  // 指向 service 接口实现 - 检测接口是否匹配
	HandlerType interface{}
	Methods     []MethodDesc
	Streams     []StreamDesc
	Metadata    interface{}
}

type StreamHandler func(srv interface{}, stream ServerStream) error
type StreamDesc struct {
	// 注册时使用  同 Method 名字
	StreamName string
	Handler    StreamHandler

	// 用于 NewClientStream,ClientConn.NewStream
	ServerStreams bool
	ClientStreams bool
}

// 拦截处理
type UnaryClientInterceptor func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, invoker UnaryInvoker, opts ...CallOption) error

// 单次请求使用 clientStream 逻辑实现
var unaryStreamDesc = &StreamDesc{ServerStreams: false, ClientStreams: false}
func invoke(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, opts ...CallOption) error {
	cs, err := newClientStream(ctx, unaryStreamDesc, cc, method, opts...)
	if err != nil {
		return err
	}
	if err := cs.SendMsg(req); err != nil {
		return err
	}
	return cs.RecvMsg(reply)
}
```

### encoding

- google.golang.org/grpc/encoding
  - RegisterCompressor
    - gzip
  - RegisterCodec
    - proto
      - github.com/golang/protobuf/proto

```go
type Codec interface {
	Name() string
	Marshal(v interface{}) ([]byte, error)
	Unmarshal(data []byte, v interface{}) error
}

type Compressor interface {
	Name() string
	Compress(w io.Writer) (io.WriteCloser, error)
	Decompress(r io.Reader) (io.Reader, error)
  DecompressedSize(compressedBytes []byte) int // 可选实现
}

// proto

```
