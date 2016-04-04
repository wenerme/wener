
# MOSH

## Why
* 即便是 IP 改变也会保持连接
* 在待机或者网络恢复后,依然会保持连接
* 即使在网络延迟较高的时候也会立即响应本地行编辑操作,而不像 SSH 会先等待服务器响应.
* 安装运行只需要普通用户即可
* 与 SSH 相同的登陆方式
* 修正了 SSH 的一些编码异常,只支持 UTF-8
* MOSH 会优先响应 Ctrl-C
* 客户端预先显示的输出会在下面显示下划线

## Tips
* 远程服务器如果没有相应的 LC 可能会导致连接不上
  * `locale-gen zh_CN.UTF-8`

## 参考
* [mosh](https://mosh.mit.edu/)
* [mobile-shell/mosh](https://github.com/mobile-shell/mosh)
