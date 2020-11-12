---
title: FTP
---

# FTP
* 是什么？
  * 文件传输协议 - File Transfer Protocol
  * 分为控制通道和数据通道
* wikipedia [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol)
* active
  * 客户端监听数据端口，告诉服务端端口号，服务端连接客户端的 20 和 数据端口。
  * 如今已很少使用
* passive
  * 客户端直接连接控制端口，发送 PASV 命令，服务端返回数据通道的地址和端口号，客户端连接数据端口。
  * 不受防火墙影响
* [Comparison of FTP server software packages](https://en.wikipedia.org/wiki/Comparison_of_FTP_server_software_packages)
* [goftp/server](https://github.com/goftp/server)
  * A FTP server framework written by Golang
* [CrossFTP](http://www.crossftp.com/)
  * FTP & Amazon S3 Client
* [pkg/sftp](https://github.com/pkg/sftp)
* server
  * lftp
  * proftp
  * pure-ftp

## 530 User cannot log in, home directory inaccessible.

一般是权限问题


## busybox ftpd

__inetd.conf__

```conf
21 stream tcp nowait root ftpd ftpd /files/to/serve
```

```bash
tcpsvd -vE 0.0.0.0 21 ftpd /files/to/serve
```
