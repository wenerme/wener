# Golang HTTP2

* [golang.org/x/net/http2](https://pkg.go.dev/golang.org/x/net/http2)
* [HTTP/2 Cleartext (H2C) Client Example in Go](https://www.mailgun.com/blog/http-2-cleartext-h2c-client-example-go/)
* [h2c Smuggling: Request Smuggling Via HTTP/2 Cleartext (h2c)](https://labs.bishopfox.com/tech-blog/h2c-smuggling-request-smuggling-via-http/2-cleartext-h2c)
  * Upgrade h2c 安全性问题
* [fstab/h2c](https://github.com/fstab/h2c) - h2c 测试工具

```bash
# HTTP Upgrade
curl -v --http2 http://localhost:8000
# GET / HTTP/2
curl -v --http2-prior-knowledge http://localhost:8000

# GRPC
grpcurl grpc.server.com:443 my.custom.server.Service/Method
# no TLS
grpcurl -plaintext grpc.server.com:80 my.custom.server.Service/Method
```

```http
POST /grpc.reflection.v1alpha.ServerReflection/ServerReflectionInfo HTTP/2.0

Host: 127.0.0.1:8000
Content-Type: application/grpc
Te: trailers
User-Agent: grpc-go/1.30.0
```
