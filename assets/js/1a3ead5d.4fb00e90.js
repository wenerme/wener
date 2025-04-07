"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["18594"],{91366:function(n,t,e){e.r(t),e.d(t,{metadata:()=>r,contentTitle:()=>a,default:()=>p,assets:()=>c,toc:()=>l,frontMatter:()=>o});var r=JSON.parse('{"id":"service/network/spec/http/http2","title":"HTTP 2","description":"- http2-explained","source":"@site/../notes/service/network/spec/http/http2.md","sourceDirName":"service/network/spec/http","slug":"/service/network/spec/http/http2","permalink":"/notes/service/network/spec/http/http2","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/spec/http/http2.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1739157197000,"frontMatter":{"title":"HTTP 2"},"sidebar":"docs","previous":{"title":"HTTP Status","permalink":"/notes/service/network/spec/http/status"},"next":{"title":"HTTP 3","permalink":"/notes/service/network/spec/http/http3"}}'),s=e("52676"),i=e("79938");let o={title:"HTTP 2"},a="HTTP 2",c={},l=[{value:"HTTP 2 Ping",id:"http-2-ping",level:2}];function d(n){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"http-2",children:"HTTP 2"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/bagder/http2-explained",children:"http2-explained"})}),"\n",(0,s.jsx)(t.li,{children:"\u6709 PING \u5E27, \u53EF\u4EE5\u7528\u4E8E\u5FC3\u8DF3\u68C0\u6D4B \u548C RTT \u8BA1\u7B97"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"http-2-ping",children:"HTTP 2 Ping"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-go",children:'package main\n\nimport (\n	"context"\n	"crypto/tls"\n	"flag"\n	"fmt"\n	"net"\n	"time"\n\n	"golang.org/x/net/http2"\n)\n\ntype Stats struct {\n	conn         net.Conn\n	BytesRead    int64\n	BytesWritten int64\n}\n\nfunc (t *Stats) Read(b []byte) (n int, err error) {\n	n, err = t.conn.Read(b)\n	t.BytesRead += int64(n)\n	return\n}\n\nfunc (t *Stats) Write(b []byte) (n int, err error) {\n	n, err = t.conn.Write(b)\n	t.BytesWritten += int64(n)\n	return\n}\n\nfunc (t *Stats) Close() error {\n	return t.conn.Close()\n}\n\nfunc (t *Stats) LocalAddr() net.Addr {\n	return t.conn.LocalAddr()\n}\n\nfunc (t *Stats) RemoteAddr() net.Addr {\n	return t.conn.RemoteAddr()\n}\n\nfunc (t *Stats) SetDeadline(time time.Time) error {\n	return t.conn.SetDeadline(time)\n}\n\nfunc (t *Stats) SetReadDeadline(time time.Time) error {\n	return t.conn.SetReadDeadline(time)\n}\n\nfunc (t *Stats) SetWriteDeadline(time time.Time) error {\n	return t.conn.SetWriteDeadline(time)\n}\n\nfunc NewStatsConn(conn net.Conn) *Stats {\n	return &Stats{\n		conn: conn,\n	}\n}\n\nfunc main() {\n	resolve := flag.String("resolve", "1.1.1.1", "")\n	server := flag.String("server", "cloudflare.com", "ServerName is used to verify the hostname on the returned certificates unless InsecureSkipVerify is given. It is also included in the client\'s handshake to support virtual hosting unless it is an IP address.")\n	port := flag.Uint("port", 443, "")\n\n	flag.Parse()\n\n	var address string\n	if *resolve == "" {\n		address = fmt.Sprintf("%s:%d", *server, *port)\n	} else {\n		address = fmt.Sprintf("%s:%d", *resolve, *port)\n	}\n	tcpConn, err := net.Dial("tcp", address)\n	if err != nil {\n		panic(err)\n	}\n	defer tcpConn.Close()\n\n	statsConn := NewStatsConn(tcpConn)\n\n	tlsConn := tls.Client(statsConn, &tls.Config{\n		ServerName: *server,\n		NextProtos: []string{"h2"},\n	})\n\n	tr := http2.Transport{}\n	http2Conn, err := tr.NewClientConn(tlsConn)\n	if err != nil {\n		panic(err)\n	}\n	defer http2Conn.Close()\n\n	for http2Conn.State().MaxConcurrentStreams == 0 {\n		time.Sleep(time.Millisecond * 100)\n	}\n\n	fmt.Println("init", statsConn.BytesRead, statsConn.BytesWritten)\n\n	r, w := statsConn.BytesRead, statsConn.BytesWritten\n\n	for i := 0; i < 3; i++ {\n		// https://github.com/zckevin/Clash.Meta/tree/b349b464acf0984553597cc95b0092d7866cbbc0/adapter/outboundgroup/http2ping\n		start := time.Now()\n		err = http2Conn.Ping(context.Background())\n		rtt := time.Since(start)\n\n		fmt.Println(*server, "index", i,\n			"read", statsConn.BytesRead-r, "written", statsConn.BytesWritten-w,\n			"rtt(ms)", uint(rtt.Milliseconds()))\n		r, w = statsConn.BytesRead, statsConn.BytesWritten\n\n		if err != nil {\n			panic(err)\n		}\n		time.Sleep(time.Second)\n	}\n}\n'})})]})}function p(n={}){let{wrapper:t}={...(0,i.a)(),...n.components};return t?(0,s.jsx)(t,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},79938:function(n,t,e){e.d(t,{Z:function(){return a},a:function(){return o}});var r=e(75271);let s={},i=r.createContext(s);function o(n){let t=r.useContext(i);return r.useMemo(function(){return"function"==typeof n?n(t):{...t,...n}},[t,n])}function a(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:o(n.components),r.createElement(i.Provider,{value:t},n.children)}}}]);