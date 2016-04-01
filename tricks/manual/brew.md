# Brew
[Brew](http://brew.sh/) 是 OS X 下必不可少的软件包管理器.

```bash
# 安装
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 基础的软件包

```bash
# 基础
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew tap homebrew/versions
brew tap homebrew/dupes
brew tap homebrew/completions
brew tap homebrew/games
brew tap homebrew/command-not-found

# 先安装 Lantern 用作梯子
# 下面的部分软件包是安装不了的,必须需要梯子,在启动 lantern 后,可通过以下命令安装 google-chrome
# https_proxy=127.0.0.1:8787 brew cask install google-chrome
brew cask install lantern

# 基础程序
brew install openssh autossh git mosh bash ssh-copy-id sshuttle tmux vim

# 常用命令
# 这些 gnu 命令都没用 --with-default-names 参数
# 使用的时候添加 /usr/local/opt/coreutils/libexec/gnubin 该路径就可以了
brew install less nano file-formula findutils coreutils binutils diffutils wget rsync svn unzip gzip wdiff
brew install gnu-{indent,sed,tar,which,units,time} gnutls gnuplot gpatch grep
brew install bash-completion2

# 娱乐相关程序
brew install youtube-dl ffmpeg cmus
brew cask install mpv

# 基本语言环境
brew install ruby python python3 go nvm
nvm install node
nvm use node
brew install {pip,ruby,gem,bundler,open,maven,brew-cask,apm-bash}-completion
# 数据库
# 可选 mongodb mysql mariadb postgresql
brew install sqlite

# 日常工具
brew cask install iterm2 google-chrome xtrafinder atom
# xtrafinder 在 10.11 中需要额外配置才能使用

# Java 环境
brew cask install java7 java
brew install maven
brew cask install intellij-idea

# 在中国的基本工具
brew install qq sogouinput
# 也可以安装百度云 baiducloud
open  /opt/homebrew-cask/Caskroom/sogouinput/*/安装搜狗输入法.app


# 小工具
brew install archey cmatrix cowsay fortune screenfetch sl

brew install di pv jlhonora/lsusb/lsusb

# 小游戏
brew install c2048
```

### Container
```bash
# 基础 Docker 依赖
docker install docker docker-machine docker-machine-driver-xhyve docker-compose docker-swarm
brew cask install virtualbox vagrant

brew install {docker,docker-machine,docker-compose,vagrant}-completion docker-machine-completion
```

### 更改默认 SHELL

```bash
echo /usr/local/bin/bash >> /etc/shells
chsh -s /usr/local/bin/bash
```

## Linuxbrew
[Linuxbrew](http://linuxbrew.sh/) 是 Brew 的 Linux 移植版, 支持大多的安装包.

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
```

## 手动下载未下载完成的安装包
```bash
cd /Library/Caches/Homebrew/
for f in `echo *.incomplete`; do
  echo Manual download ${f%.incomplete}
  aria2c -c -j 10 https://homebrew.bintray.com/bottles/${f%.incomplete} && rm $f
done
```
