---
title: gRPC CLI
tags:
  - Service
  - API
  - gRPC
  - CLI
---

# gRPC CLI

```bash
grpc_cli call localhost:50051 SayHello 'name: "john"'

# ServerReflection
grpc_cli ls localhost:50051 -l

grpc_cli ls localhost:50051 helloworld.Greeter.SayHello -l

grpc_cli type localhost:50051 helloworld.HelloRequest
```

- [Server Reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md)
- [Command Line Tool](https://github.com/grpc/grpc/blob/master/doc/command_line_tool.md)
- [grpc-node #79](https://github.com/grpc/grpc-node/issues/79)
- [reflection.proto](https://github.com/grpc/grpc/blob/master/src/proto/grpc/reflection/v1alpha/reflection.proto)
- [malijs/mali](https://github.com/malijs/mali) - A minimalistic gRPC microservice framework for Node.js
- [fullstorydev/grpcurl](https://github.com/fullstorydev/grpcurl)
