---
title: HTTP 2
---

# HTTP 2

- [http2-explained](https://github.com/bagder/http2-explained)
- 有 PING 帧, 可以用于心跳检测 和 RTT 计算

## HTTP 2 Ping

```go
package main

import (
	"context"
	"crypto/tls"
	"flag"
	"fmt"
	"net"
	"time"

	"golang.org/x/net/http2"
)

type Stats struct {
	conn         net.Conn
	BytesRead    int64
	BytesWritten int64
}

func (t *Stats) Read(b []byte) (n int, err error) {
	n, err = t.conn.Read(b)
	t.BytesRead += int64(n)
	return
}

func (t *Stats) Write(b []byte) (n int, err error) {
	n, err = t.conn.Write(b)
	t.BytesWritten += int64(n)
	return
}

func (t *Stats) Close() error {
	return t.conn.Close()
}

func (t *Stats) LocalAddr() net.Addr {
	return t.conn.LocalAddr()
}

func (t *Stats) RemoteAddr() net.Addr {
	return t.conn.RemoteAddr()
}

func (t *Stats) SetDeadline(time time.Time) error {
	return t.conn.SetDeadline(time)
}

func (t *Stats) SetReadDeadline(time time.Time) error {
	return t.conn.SetReadDeadline(time)
}

func (t *Stats) SetWriteDeadline(time time.Time) error {
	return t.conn.SetWriteDeadline(time)
}

func NewStatsConn(conn net.Conn) *Stats {
	return &Stats{
		conn: conn,
	}
}

func main() {
	resolve := flag.String("resolve", "1.1.1.1", "")
	server := flag.String("server", "cloudflare.com", "ServerName is used to verify the hostname on the returned certificates unless InsecureSkipVerify is given. It is also included in the client's handshake to support virtual hosting unless it is an IP address.")
	port := flag.Uint("port", 443, "")

	flag.Parse()

	var address string
	if *resolve == "" {
		address = fmt.Sprintf("%s:%d", *server, *port)
	} else {
		address = fmt.Sprintf("%s:%d", *resolve, *port)
	}
	tcpConn, err := net.Dial("tcp", address)
	if err != nil {
		panic(err)
	}
	defer tcpConn.Close()

	statsConn := NewStatsConn(tcpConn)

	tlsConn := tls.Client(statsConn, &tls.Config{
		ServerName: *server,
		NextProtos: []string{"h2"},
	})

	tr := http2.Transport{}
	http2Conn, err := tr.NewClientConn(tlsConn)
	if err != nil {
		panic(err)
	}
	defer http2Conn.Close()

	for http2Conn.State().MaxConcurrentStreams == 0 {
		time.Sleep(time.Millisecond * 100)
	}

	fmt.Println("init", statsConn.BytesRead, statsConn.BytesWritten)

	r, w := statsConn.BytesRead, statsConn.BytesWritten

	for i := 0; i < 3; i++ {
		// https://github.com/zckevin/Clash.Meta/tree/b349b464acf0984553597cc95b0092d7866cbbc0/adapter/outboundgroup/http2ping
		start := time.Now()
		err = http2Conn.Ping(context.Background())
		rtt := time.Since(start)

		fmt.Println(*server, "index", i,
			"read", statsConn.BytesRead-r, "written", statsConn.BytesWritten-w,
			"rtt(ms)", uint(rtt.Milliseconds()))
		r, w = statsConn.BytesRead, statsConn.BytesWritten

		if err != nil {
			panic(err)
		}
		time.Sleep(time.Second)
	}
}
```

# FAQ

## Flow control

- 可能导致上传慢问题
- https://blog.cloudflare.com/delivering-http-2-upload-speed-improvements/
- nginx 默认用 http2_body_preread_size（64KB）作为每个请求的初始窗口。
- 在 200Mbps、40ms 时延下，HTTP/2 上传只有 HTTP/1.1 的一半左右。
- RFC 9113 §6.9：规定窗口初始值为 65,535 字节，接收方可以设成任意值，发送方必须遵守。
- [golang/net 906cda9](https://github.com/golang/net/commit/906cda9512f77671ab44f8c8563b13a8e707b230)：Go 的 HTTP/2 服务端原来固定 64KB 接收窗口，提交说明直接写了高 BDP 链路上传性能很差，改成默认 1MB 并可配置。
- [golang/go#47840](https://github.com/golang/go/issues/47840)：Go 的 HTTP/2 吞吐明显低于 HTTP/1.1 的讨论。
- [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/138898/http-2-upload-speed-issue-compared-to-http-1-1)：微软在自家服务上遇到同样的问题，也确认根因是默认 65535 的窗口。
- [gRPC-Go 性能改进](https://grpc.io/blog/grpc-go-perf-improvements/)：gRPC 用估算链路容量、动态调整窗口的办法，补上了高延迟网络下和 HTTP/1.1 的差距。
