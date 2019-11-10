# Tools

便于开发运维的工具.

## direnv

[direnv](https://github.com/direnv/direnv) 可针对每个目录设置 .profile 文件, 如果经常在某个目录下面处理很多东西的时候,可以将常用的操作加到当前目录下的 .profile,当切换到该目录时会自动加载,切换出该目录时会卸载加载的内容.

```bash
# 初始化
eval "$(direnv hook bash)"

# 使用目录下的 .envrc, 需要 direnv allow 来允许
echo 'export PATH=$PATH:$PWD/bin' > .envrc
direnv allow
```

## tmux
* 分屏
* 多窗口
* iTerm2 [tmux Integration Best Practices](https://gitlab.com/gnachman/iterm2/wikis/tmux-Integration-Best-Practices)
  * iTerm2 支持非常好的 tmux 集成
  * 集成后和使用本地窗口无区别

## mosh
* 自动重连的 ssh
* 不支持内容滚动, 需要配合 tmux 更好

## et
* [Eternal Terminal](https://eternalterminal.dev/)
* 支持重连
* 支持远程 tmux
* 支持滚动
* 但需要启服务端

## sshrc
* [sshrc](https://github.com/Russell91/sshrc)
* 将本地的 dotfiles 和 vimrc 等通过 ssh 或 mosh 带到远程环境

## ttyd
* [ttyd](https://github.com/tsl0922/ttyd/)
  * [gotty](https://github.com/yudai/gotty) 的 fork
  * 支持 CJK
