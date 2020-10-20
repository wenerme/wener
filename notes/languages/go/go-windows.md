---
id: go-windows
title: Golang Windows
---

# Golang Windows
## Tips
* 注意
  * `-ldflags="-H=windowsgui"` 可以避免显示控制台
* 参考
  * [golang使用execCommand调用的时候子进程如何杀掉处理方法](https://studygolang.com/articles/7497)
    * Linux 可以使用 Setpgid
  * [go-cmd/cmd](https://github.com/go-cmd/cmd)
  * [AllenDang/w32](https://github.com/AllenDang/w32)

```bash
# CGO 交叉编译
GOOS=windows GOARCH=amd64 CGO_ENABLED=1 CXX=x86_64-w64-mingw32-g++ CC=x86_64-w64-mingw32-gcc go build main.go

# ICON
# ==========
# 生成 syso
go get github.com/akavel/rsrc
# rsrc [-manifest FILE.exe.manifest] [-ico FILE.ico[,FILE2.ico...]] -o FILE.syso
rsrc -manifest main.exe.manifest -ico pkg/icon/icon.ico -o cmd/launcher/main.syso

# 支持版本等详细信息
go get github.com/josephspurrier/goversioninfo/cmd/goversioninfo
goversioninfo -icon=pkg/icon/icon.ico -manifest=main.exe.manifest -o cmd/launcher/main.syso
```

__main.exe.manifest__

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
<assemblyIdentity
    version="1.0.0.0"
    processorArchitecture="x86"
    name="controls"
    type="win32"
></assemblyIdentity>
<dependency>
    <dependentAssembly>
        <assemblyIdentity
            type="win32"
            name="Microsoft.Windows.Common-Controls"
            version="6.0.0.0"
            processorArchitecture="*"
            publicKeyToken="6595b64144ccf1df"
            language="*"
        ></assemblyIdentity>
    </dependentAssembly>
</dependency>
</assembly>
```

## code

```go
import "github.com/gonutz/ide/w32"

func hideConsole() {
    console := w32.GetConsoleWindow()
    if console == 0 {
        return // no console attached
    }
    // If this application is the process that created the console window, then
    // this program was not compiled with the -H=windowsgui flag and on start-up
    // it created a console along with the main application window. In this case
    // hide the console window.
    // See
    // http://stackoverflow.com/questions/9009333/how-to-check-if-the-program-is-run-from-a-console
    _, consoleProcID := w32.GetWindowThreadProcessId(console)
    if w32.GetCurrentProcessId() == consoleProcID {
        w32.ShowWindowAsync(console, w32.SW_HIDE)
    }
}
```

# FAQ
## is incompatible with i386:x86-64 output .rsrc merge failure: corrupt .rsrc section
* 添加 `-64` 参数

