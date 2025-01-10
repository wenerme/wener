---
tags:
- Python
---

# gRPC Python


```py title="server.py"
from concurrent import futures
import grpc
import example_pb2
import example_pb2_grpc

# 实现服务中的方法
class GreeterService(example_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        # 接收请求，返回响应
        return example_pb2.HelloReply(message=f"Hello, {request.name}!")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    example_pb2_grpc.add_GreeterServicer_to_server(GreeterService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Server is running on port 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
```

```py title="client.py"
import grpc
import example_pb2
import example_pb2_grpc

def run():
    # 创建 gRPC 通道
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = example_pb2_grpc.GreeterStub(channel)
        # 调用 SayHello 方法
        response = stub.SayHello(example_pb2.HelloRequest(name="World"))
        print(f"Server replied: {response.message}")

if __name__ == "__main__":
    run()
```
