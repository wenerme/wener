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
