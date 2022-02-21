---
title: gRPC Awesome
tags:
  - Awesome
---

# gRPC Awesome

- [grpc-ecosystem/awesome-grpc](https://github.com/grpc-ecosystem/awesome-grpc)

## 参考

- [wenerme/grpc-protos](https://github.com/wenerme/grpc-protos)
- [googleapis/googleapis](https://github.com/googleapis/googleapis)
- https://github.com/kubernetes/cri-api/blob/master/pkg/apis/runtime/v1/api.proto
- https://github.com/kubernetes/api/blob/master/core/v1/generated.proto
- https://github.com/tensorflow/serving/tree/master/tensorflow_serving/apis
- https://github.com/asim/go-micro/blob/master/api/proto/api.proto
- https://github.com/kubeflow/katib/tree/master/pkg/apis
- https://github.com/p4lang/p4runtime/tree/main/proto/p4/v1
- https://github.com/onosproject/onos-api/tree/master/proto
- https://github.com/thanos-io/thanos/search?p=1&q=in%3Apath+proto

<!-- -path:vendor  filename:*.proto -->

## 工具

- [Kong/insomnia](https://github.com/Kong/insomnia)
- [bloomrpc/bloomrpc](https://github.com/bloomrpc/bloomrpc)
- [envoyproxy/protoc-gen-validate](https://github.com/envoyproxy/protoc-gen-validate)
  - 生成校验规则
- [bufbuild/buf](https://github.com/bufbuild/buf)
- [uber/prototool](https://github.com/uber/prototool)
  - 工具集 - 不活跃 - 推荐使用 buf
  - lint, generate
- [improbable-eng/grpc-web](https://github.com/improbable-eng/grpc-web)
  - gRPC Web 实现
  - 支持 Websocket 模式
  - [improbable-eng/ts-protoc-gen](https://github.com/improbable-eng/ts-protoc-gen)
- [google/gnostic](https://github.com/google/gnostic)
  - JSON and YAML OpenAPI descriptions to and from equivalent Protocol Buffer representations
- [googleapis/api-linter](https://github.com/googleapis/api-linter)
- [tmc/grpcutil](https://github.com/tmc/grpcutil)
- [ktr0731/evans](https://github.com/ktr0731/evans)
  - expressive universal gRPC client
- [containerd/ttrpc](https://github.com/containerd/ttrpc)
  - 轻量 grpc
  - 非 grpc 协议

## GUI

- [uw-labs/bloomrpc](https://github.com/uw-labs/bloomrpc)
- [fullstorydev/grpcui](https://github.com/fullstorydev/grpcui)
- [rogchap/wombat](https://github.com/rogchap/wombat)
- [warmuuh/milkman](https://github.com/warmuuh/milkman)
- IntelliJ IDEA v2021.3+ HTTP Client 支持 gRPC

```
### helloworld
GRPC localhost:8888/helloworld.Greeter/SayHello

### health
GRPC localhost:8888/grpc.health.v1.Health/Check
```

## RPC

- [smallnest/rpcx](https://github.com/smallnest/rpcx)
  - 国内项目
- [twitchtv/twirp](https://github.com/twitchtv/twirp)
  - 使用 grpc 的服务定义和序列化

## gen

- protoc-gen-c
- protoc-gen-go
- protoc-gen-go-grpc
- protoc-gen-gofast
  - [gogo/protobuf](https://github.com/gogo/protobuf)
    - APIv2 发布后不再维护
- protoc-gen-grpc
- protoc-gen-grpc-gateway
- protoc-gen-grpc-java
- protoc-gen-grpc-web
- protoc-gen-slate
- protoc-gen-swagger
- protoc-gen-validate
- protoc-gen-go-vtproto
  - [planetscale/vtprotobuf](https://github.com/planetscale/vtprotobuf)
    - 优化基于 gogo - 使用 APIv2
    - 支持 Pool
    - 增加一些简单的辅助方法
- protoc-gen-gotag
- protoc-gen-go-drpc
  - [storj/drpc](https://github.com/storj/drpc)
    - 一个更加简单轻量的 RPC 协议
- [protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc)
- 参考
  - [lyft/protoc-gen-star](https://github.com/lyft/protoc-gen-star)
  - 辅助实现插件

```bash
go install github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc@latest
go install github.com/planetscale/vtprotobuf/cmd/protoc-gen-go-vtproto@latest
go install github.com/srikrsna/protoc-gen-gotag@latest
```

```proto
syntax = "proto3";

package acme.weather.v1;

option go_package = "github.com/acme/weather/gen/proto/go/acme/weather/v1;weatherv1";
option java_multiple_files = true;
option java_outer_classname = "WeatherProto";
option java_package = "com.acme.weather.v1";
```
