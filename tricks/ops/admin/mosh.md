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

## 使用鼠标滚动查看历史

因为 MOSH 是无法查看历史的输出内容的,所见内容只能有一屏高.可结合 tmux 实现滚动功能

* iTerm2 显示内容
* mosh 保持连接
* tmux 接受鼠标滚动和会话重连


首先需要修改 tmux 配置

__~/.tmux.conf__

```
# 确保 tmux a 总能打开一个会话
new-session
set-window-option -g mode-mouse on
set -g history-limit 30000
```

然后从源码从新编译 mosh, 确保鼠标滚动功能能够使用

```
brew install --HEAD mobile-shell
```

打开远程会话

```
mosh HOST -- tmux a  
```

> __TIPS__
>
> * 选中复制需要按住 Option
> * `C-b d` detach 会话, `C-b` 经常被重新绑定为 `C-a`

```bash
# 使用指定会话名创建一个新的会话
tmux new -s myname

# 如果配合 sshrc 使用,可先 sshrc 进入服务器,创建好相应会话
tmuxrc new -D -s cmd
tmuxrc new -D -s log
# 不允许直接执行 exit
tmux -S /tmp/extratmuxserver/tmuxserver send -t cmd "alias exit='echo Please do not exit,use [CTRL-A+D] to detach from this session, if you really want to exit, use [command exit] instead'" ENTER

# 然后再在本地进入到相应会话
mosh HOST -- tmux -S /tmp/extratmuxserver/tmuxserver a -t cmd
mosh HOST -- tmux -S /tmp/extratmuxserver/tmuxserver a -t log
```


* https://blog.filippo.io/my-remote-shell-session-setup/
* http://superuser.com/a/492285/242730
* https://gist.github.com/MohamedAlaa/2961058
* https://gist.github.com/andreyvit/2921703

## 参考
* [mosh](https://mosh.mit.edu/)
* [mobile-shell/mosh](https://github.com/mobile-shell/mosh)
