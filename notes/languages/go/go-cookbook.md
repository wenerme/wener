---
tags:
  - Cookbook
---

# Go Cookbook

## http reverse proxy

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	u, _ := url.Parse("https://wener.me")
	proxy := httputil.NewSingleHostReverseProxy(u)

	proxy.Director = func(r *http.Request) {
		r.URL.Scheme = u.Scheme
		r.URL.Host = u.Host
		r.Host = u.Host
		dump, _ := httputil.DumpRequest(r, false)
		fmt.Println(string(dump))
	}
	http.Handle("/", proxy)
	log.Fatalln(http.ListenAndServe(":8088", http.DefaultServeMux))
}
```

```bash
curl 127.0.0.1:8088
```
