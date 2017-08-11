# gRPC

* [gRPC](https://github.com/grpc/)
* [gRPC Ecosystem](https://github.com/grpc-ecosystem)
* [Third-Party Add-ons for Protocol Buffers](https://github.com/google/protobuf/blob/master/docs/third_party.md)
* 服务端暂不支持 PHP
  * 可以跟踪该帖子 [Servers in PHP?](https://groups.google.com/forum/#!topic/grpc-io/F3IyYaI_6S0)
* google.protobuf
  * 默认定义
  * api.proto
    * 对服务的轻量级定义
* NOTES:
  * k8s 使用 go-to-protobuf 从 go 生成的 proto

https://github.com/grpc/grpc-proto
常用协议

* https://github.com/mwitkow/grpc-proxy
  * grpc 反向代理




https://github.com/improbable-eng/grpc-web
https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md
https://github.com/sourcegraph/prototools
https://goel.io/grpc-100/
https://github.com/mfornos/awesome-microservices
https://github.com/LogNet/grpc-spring-boot-starter
https://grpc.io/docs/guides/auth.html

## grpc-gateway
* [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway)
  * gRPC to JSON proxy generator
* 支持 googleapis 中的 http 定义
* Features
  * Generating JSON API handlers
  * Method parameters in request body
  * Method parameters in request path
  * Method parameters in query string
  * Enum fields in path parameter (including repeated enum fields).
  * Mapping streaming APIs to newline-delimited JSON streams
  * Mapping HTTP headers with Grpc-Metadata- prefix to gRPC metadata (prefixed with grpcgateway-)
  * Optionally emitting API definition for Swagger.
  * Setting gRPC timeouts through inbound HTTP Grpc-Timeout header.
* 可以只拷贝需要的导入文件
  * `google/api/annotations.proto`
  * `google/api/http.proto`
* 然后在 rpc 中添加 http 定义即可
```
rpc SayHello (HelloRequest) returns (HelloReply) {
  option (google.api.http) = {
      post:"/v1/greeter/hello"
      body:"*"
  };
}
```

```bash
# 安装
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
go get -u github.com/golang/protobuf/protoc-gen-go

# 生成 stub
protoc --go_out=plugins=grpc:. -I proto/ proto/hello.proto
# 生成反向代理
protoc --grpc-gateway_out=logtostderr=true:. -I proto/ proto/hello.proto
# 生成 swagger
protoc --swagger_out=logtostderr=true:. -I proto/ proto/hello.proto

# 拉取相关依赖
go get .

# 添加 main, 启动时调用注册
```


## 案例

### GCP
* [API Design Guide](https://cloud.google.com/apis/design/)
* [googleapis/googleapis](https://github.com/googleapis/googleapis)
* [googleapis/toolkit](https://github.com/googleapis/toolkit)
* [googleapis/artman](https://github.com/googleapis/artman)
* GAPIC
* selector
  * 逗号分隔
  * 可以使用 `*` 做匹配, 但是只能放在最后
    * 例如 `foo.*`, 但不能写 `foo.*b`, `foo.*.abc`
    * 可以使用 `*` 匹配所有

* 服务结构
  * api
    * 接口相关的定义
    * backend.proto
      * 定义服务的后端
    * service.proto
      * 对服务的定义
    * servicecontrol
      * 服务控制
      * 对服务的检查报告
    * servicemanagement
      * 服务管理
      * 对服务的 CRUD, 启用停用
  * appengine


```bash
# artman
# 包含了 grpc 生成个个语言的环境
docker pull googleapis/artman

docker run -it --rm -v $PWD/googleapis:/googleapis -v $PWD/artman:/artman -w /googleapis googleapis/artman
# artman --api pubsub --language python

```


#### Service Control
* [Google Service Control](https://cloud.google.com/service-control/overview)
* How to control access to your service.
* How to validate API keys.
* How to send logging and monitoring data to both consumers and producers.
* How to create and manage dashboards to visualize such data.
* How to scale the control plane components with your service.

![Architecture](https://cloud.google.com/service-control/images/arch.svg)

* Managed services
  * Google Service Management 管理每个服务和其配置, 用于定制化 Google Service Control 的行为. 服务配置也被用于 Google Cloud Platform Console 显示其配置, 启用/禁用 等.
  * For example:
    * Google Cloud Pub/Sub (pubsub.googleapis.com)
    * Google Cloud Vision (vision.googleapis.com)
    * Google Cloud Bigtable (bigtable.googleapis.com)
    * Google Cloud Datastore (datastore.googleapis.com)
* Operations
  * 表示被管理服务的活动, 例如接口调用或资源使用
  * 每个操作都关联一个被管理的服务,和调用者, 也包含调用的相关信息, 例如调用方法, 资源使用量等
* Check
  * Check if the consumer is still active.
  * Check if the consumer has enabled the service.
  * Check if the API key is still valid.
  * 对接口进行检测以保证更好的性能, 更高的可用性
* Report

#### Service Management
* Google [Service Management](https://cloud.google.com/service-management/overview)
* Service producer
  * 由谷歌开发者负责发布维护被管理的服务. 每个被管理的服务都由一个服务生产者所有
* Service consumers
  * 启用了接口调用的管理服务, 一个被管理的服务可以有很多服务消费者
* Service configurations
  * 每个被管理的服务都有自己的配置描述, 包括名字, 标题, RPC 接口定义, REST 接口定义, 文档, 授权等
* Service rollouts
  * 流量控制

## Note
* PB 附带了所有解析后的消息格式定义
* PB 3 增加了 java-util, 可以进行 JSON 序列化
  * `JsonFormat` 打印时需要使用 `com.google.protobuf.util.JsonFormat.TypeRegistry` 来反查具体类
* 优化模式
  * SPEED
    * Generate complete code for parsing, serialization, etc.
  * CODE_SIZE
    * Use ReflectionOps to implement these methods.
  * LITE_RUNTIME
    * Generate code using MessageLite and the lite runtime.
* 命名空间
  * 与 Java 命名空间的概念相似
  * 生成的类的包名可以不同于 proto 的包
  * 所有定义的消息都有自己的类型和命名空间
  * 因此 Any 消息才能根据一个 url 和数据来还原消息
  * 类型的引用也是基于该命名空间

### Java
* 服务端支持 Netty
* 客户端支持 OkHttp 和 Netty
* 传输层解析出请求的方法
  * 方法名实际包含了请求类 `foo.bar.Greeter/SayHello`
* 实际方法触发位置为 `io.grpc.ServerCall.Listener` 的不同实现
* `ServerServiceDefinition`
  * 服务定义
* `ServiceDescriptor`
  * 服务描述
* `MethodDescriptor`
  * 方法描述
  * 类型
    * UNARY - 请求 -> 响应
    * CLIENT_STREAMING -  流请求 -> 响应
    * SERVER_STREAMING -  请求 -> 流响应
    * BIDI_STREAMING - 流请求 -> 流响应
* `HandlerRegistry`
  * 服务注册中心
* `ServerInterceptor`
  * 服务端拦截器
  * 常见用例
    * 授权认证
    * 日志监控
    * 代理
* `ServerCallHandler`
  * 实际请求处理的方法
* `Stream`
  * 客户端和服务端的通讯流
* `io.grpc.Context`
  * 跨线程的处理上下文
* 速度优化
  * 会生成 `MethodHandlers`
  * 统一方法调用
  * 实现所有类型的方法调用接口
    * `io.grpc.stub.ServerCalls.UnaryMethod`
    * `io.grpc.stub.ServerCalls.ServerStreamingMethod`
    * `io.grpc.stub.ServerCalls.ClientStreamingMethod`
    * `io.grpc.stub.ServerCalls.BidiStreamingMethod`
  * 实际调用时使用 `switch` 和事先给定的方法 id 进行请求, 避免使用反射
* `io.grpc.Server`
  * 服务端
  * `InternalServer`
    * 用于不同链接层实现的接口
    * 建立新的链接时回调 `ServerListener#transportCreated`
* `io.grpc.Status`
  * 表达异常和状态
* 基础
  * `Stream`
  * `StreamListener`
  * 基本流程
    * 方法 -> Call -> Stream
    * 生成 Call 时会创建对应的 Feature
    * 同步请求是循环等待 Feature 完成
  * 完整方法名的命名规则为
    * `完整的服务名/方法名`
    * `wener.scel.v1.Scel/Search`
* 客户端
  * `ClientCall`
    * `ClientCall.Listener`
      * `onHeaders(Metadata)`
      * `onMessage(RespT)`
      * `onClose(Status,Metadata)`
    * 处理流程
    * 职责
  * `ManagedChannelBuilder`
  * `ClientTransport`
    * `ManagedClientTransport`
      * 有生命周期管理
      * `ConnectionClientTransport`
        * 基于链接
        * 有属性
  * `ClientStream`
  * `ClientStreamListener`
  * 生成的客户端分为三种类型
    * Stub
      * 有所有的方法
      * 响应均为 `io.grpc.stub.StreamObserver`
    * BlockingStub
      * 阻塞接口
      * 响应为直接的对象
      * 流响应为 Iterator
      * 不生成流请求
    * FeatureStub
      * 以 Feature 作为返回状态
* 服务端
  * `ServerCall`
    * 处理流程
      * `ServerStream` -> `ServerStreamListener`
      * `ServerStreamListener#messageRead`
        * 会对请求对象进行解析
      * `ServerCall.Listener#onMessage`
        * 拦截处理在这一层发生
        * `ServerCallHandler` 负责从 `ServerCall` 创建 `ServerCall.Listener`
        * 即实际的方法处理发生在这里
    * `ServerCalls`
      * 提供 `ServerCall` 到 `ServerCallHandler` 的适配
      * 主要用于简化实现
      * `ServerCall` -> `ServerCall.Listener`
      * 一个方法 `MethodDescriptor` 对应一个 `ServerCallHandler`
    * 职责
      * `ServerCall.Listener` 用于接收消息
      * `ServerCall` 用于发送和向客户端请求消息
      * `ServerCallHandler` 方法处理
  * `ServerBuilder`
  * `ServerTransport`
  * `ServerStream`
  * `ServerStreamListener`
* Netty
  * `NettyServerProvider`
  * `NettyChannelProvider`
  * `NettyServer`
  * `NettyServerHandler`
    * 服务端 GRPC 处理
    * 执行上下文
  * 服务端
    * `NettyServerTransport`
    * `NettyServerStream`
  * 客户端
    * `NettyClientTransport`
    * `NettyClientStream`



__protoc --help__

```
$ protoc --help
Usage: protoc [OPTION] PROTO_FILES
Parse PROTO_FILES and generate output based on the options given:
  -IPATH, --proto_path=PATH   Specify the directory in which to search for
                              imports.  May be specified multiple times;
                              directories will be searched in order.  If not
                              given, the current working directory is used.
  --version                   Show version info and exit.
  -h, --help                  Show this text and exit.
  --encode=MESSAGE_TYPE       Read a text-format message of the given type
                              from standard input and write it in binary
                              to standard output.  The message type must
                              be defined in PROTO_FILES or their imports.
  --decode=MESSAGE_TYPE       Read a binary message of the given type from
                              standard input and write it in text format
                              to standard output.  The message type must
                              be defined in PROTO_FILES or their imports.
  --decode_raw                Read an arbitrary protocol message from
                              standard input and write the raw tag/value
                              pairs in text format to standard output.  No
                              PROTO_FILES should be given when using this
                              flag.
  -oFILE,                     Writes a FileDescriptorSet (a protocol buffer,
    --descriptor_set_out=FILE defined in descriptor.proto) containing all of
                              the input files to FILE.
  --include_imports           When using --descriptor_set_out, also include
                              all dependencies of the input files in the
                              set, so that the set is self-contained.
  --include_source_info       When using --descriptor_set_out, do not strip
                              SourceCodeInfo from the FileDescriptorProto.
                              This results in vastly larger descriptors that
                              include information about the original
                              location of each decl in the source file as
                              well as surrounding comments.
  --dependency_out=FILE       Write a dependency output file in the format
                              expected by make. This writes the transitive
                              set of input file paths to FILE
  --error_format=FORMAT       Set the format in which to print errors.
                              FORMAT may be 'gcc' (the default) or 'msvs'
                              (Microsoft Visual Studio format).
  --print_free_field_numbers  Print the free field numbers of the messages
                              defined in the given proto files. Groups share
                              the same field number space with the parent
                              message. Extension ranges are counted as
                              occupied fields numbers.

  --plugin=EXECUTABLE         Specifies a plugin executable to use.
                              Normally, protoc searches the PATH for
                              plugins, but you may specify additional
                              executables not in the path using this flag.
                              Additionally, EXECUTABLE may be of the form
                              NAME=PATH, in which case the given plugin name
                              is mapped to the given executable even if
                              the executable's own name differs.
  --cpp_out=OUT_DIR           Generate C++ header and source.
  --csharp_out=OUT_DIR        Generate C# source file.
  --java_out=OUT_DIR          Generate Java source file.
  --javanano_out=OUT_DIR      Generate Java Nano source file.
  --js_out=OUT_DIR            Generate JavaScript source.
  --objc_out=OUT_DIR          Generate Objective C header and source.
  --php_out=OUT_DIR           Generate PHP source file.
  --python_out=OUT_DIR        Generate Python source file.
  --ruby_out=OUT_DIR          Generate Ruby source file.
```

### 聊天

```
syntax = "proto3";

// https://github.com/yafithekid/grpc-chat/blob/master/src/main/proto/rpcchat.proto
option java_package = "com.if4031.proto";
option objc_class_prefix = "HLW";

service ChatService {
    rpc join (JoinRequest) returns (Response);
    rpc leave (LeaveRequest) returns (Response);
    rpc send (SendRequest) returns (Response);
    rpc sendAll (SendAllRequest) returns (Response);
    rpc recvAll (RecvAllRequest) returns (ChatResponse);
}

message Message {
    string nickname = 1;
    string channel = 2;
    string content = 3;
    int64 timestamp = 4;
}

message Response {
    string status = 1;
    string message = 2;
}

message ChatResponse {
    string status = 1;
    string message = 2;
    repeated Message chats = 3;
}

message JoinRequest {
    string nickname = 1;
    string channel = 2;
}

message LeaveRequest {
    string nickname = 1;
    string channel = 2;
}

message SendRequest {
    string nickname = 1;
    string channel = 2;
    string message = 3;
}

message SendAllRequest {
    string nickname = 1;
    string message = 2;
}

message RecvAllRequest {
    string nickname = 1;
}
```


```
syntax = "proto3";

service Chat {
  rpc Authorize(RequestAuthorize) returns (ResponseAuthorize);
  rpc Connect(RequestConnect) returns (stream Event);
  rpc Say(CommandSay) returns (None);
}

message None {}

message RequestAuthorize {
  string name = 1;
}

message ResponseAuthorize {
  bytes session_id = 1;
}

message RequestConnect {
  bytes session_id = 1;
}

message CommandSay {
  bytes session_id = 1;
  string message = 2;
}

message Event {
  oneof event {
    EventNone none = 1;
    EventJoin join = 2;
    EventLeave leave = 3;
    EventLog log = 4;
  }
}

message EventNone {}

message EventJoin {
  string name = 1;
}

message EventLeave {
  string name = 1;
}

message EventLog {
  string name = 1;
  string message = 2;
}
```

```
syntax = "proto3";

option java_package = "com.chat";

package Chat;

service MyChat{
    rpc login (Username) returns (LoginSuccess){}
    rpc join (ChannelName) returns (IsSuccess){}
    rpc leave (ChannelName) returns (IsSuccess){}
    rpc sendMessage (Message) returns (IsSuccess) {}
    rpc broadcastMessage (BroadcastMsg) returns (IsSuccess) {}
    rpc getMessages (Username) returns (Messages) {}
}

message Username {
    string username = 1;
}

message LoginSuccess{
    bool success = 1;
    string username = 2;
}

message ChannelName {
    string username = 1;
    string channel = 2;
}

message IsSuccess {
    bool success = 1;
}

message Message {
    string username = 1;
    string channel = 2;
    string msg = 3;
}

message Messages {
    bool success = 1;
    repeated string messages = 2;
}

message BroadcastMsg {
    string username = 1;
    string msg = 2;
}
```
