---
title: Libvirt API
tags:
  - API
---

# Libvirt API

- [API Reference](https://libvirt.org/html/libvirt-libvirt-domain.html)
- [RPC Protocol](https://libvirt.org/internals/rpc.html)
  - 基于 XDR (External Data Representation) 序列化
  - SunRPC/ONCRPC 协议
- 客户端库
  - Go: [libvirt/libvirt-go](https://github.com/libvirt/libvirt-go) (CGO), [digitalocean/go-libvirt](https://github.com/digitalocean/go-libvirt) (纯 Go)
  - Java: [libvirt-java](https://libvirt.org/java.html)
  - Python: [libvirt-python](https://pypi.org/project/libvirt-python/)

## 核心概念

| 对象             | 说明                       |
| ---------------- | -------------------------- |
| `virConnectPtr`  | Hypervisor 连接            |
| `virDomainPtr`   | 虚拟机 (运行中或已定义)    |
| `virNetworkPtr`  | 虚拟网络                   |
| `virStoragePool` | 存储池                     |
| `virStorageVol`  | 存储卷                     |

## Go 示例

```go
package main

import (
	"fmt"
	"net"
	"time"

	"github.com/digitalocean/go-libvirt"
)

func main() {
	// Unix socket 连接
	c, err := net.DialTimeout("unix", "/var/run/libvirt/libvirt-sock", 2*time.Second)
	if err != nil {
		panic(err)
	}

	l := libvirt.New(c)
	if err := l.Connect(); err != nil {
		panic(err)
	}
	defer l.Disconnect()

	v, _ := l.Version()
	fmt.Println("Version:", v)

	domains, _, _ := l.ConnectListAllDomains(1, 0)
	for _, d := range domains {
		fmt.Printf("%d %s %x\n", d.ID, d.Name, d.UUID)
	}
}
```

## Java 示例

```java
import org.libvirt.Connect;
import org.libvirt.ConnectAuthDefault;

public class LibvirtExample {
    public static void main(String[] args) throws Exception {
        Connect conn = new Connect("qemu:///system", new ConnectAuthDefault(), 0);
        System.out.println("Hypervisor: " + conn.getType());
        System.out.println("Version: " + conn.getLibVirVersion());
    }
}
```

## 参考

- [libvirt/libvirt](https://github.com/libvirt/libvirt)
- [remote_protocol.x](https://github.com/libvirt/libvirt/blob/master/src/remote/remote_protocol.x) - RPC 协议定义
- [libosinfo](https://libosinfo.org/) - OS 信息库
