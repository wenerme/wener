---
title: Go WASM
---

# Go WASM

- Go [WebAssembly](https://github.com/golang/go/wiki/WebAssembly)
- [tinygo-org/tinygo](https://github.com/tinygo-org/tinygo) - 可用于生成更小的 wasm

```bash
# 测试应用
cat <<GO > main.go
package main
import "fmt"

func main() {
	fmt.Println("Hello, WebAssembly!")
}
GO
# 编译 - 约 2.2m
GOOS=js GOARCH=wasm go build -o main.wasm

# 前端使用的执行 JS
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

cat <<HTML > index.html
<html>
	<head>
		<meta charset="utf-8"/>
    <!-- go env 下的 exec -->
		<script src="wasm_exec.js"></script>
		<script>
			const go = new Go();
			WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
				go.run(result.instance);
			});
		</script>
	</head>
	<body></body>
</html>
HTML

# NodeJS 执行
GOOS=js GOARCH=wasm go run -exec="$(go env GOROOT)/misc/wasm/go_js_wasm_exec" .
# 运行测试
GOOS=js GOARCH=wasm go test -exec="$(go env GOROOT)/misc/wasm/go_js_wasm_exec" .

# 将 go_js_wasm_exec 添加到 PATH 则可以直接 run
export PATH="$PATH:$(go env GOROOT)/misc/wasm"
GOOS=js GOARCH=wasm go run .
GOOS=js GOARCH=wasm go test .
```
