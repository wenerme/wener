---
id: brew
title: Brew
---

# Brew

## Tips
* [Brew](http://brew.sh/) 是 OS X 下必不可少的软件包管理器.

> __⚠️__
> 1. 安装过程中可能会需要代理
> 2. 代理建议使用 https_proxy 进行设置或全局代理
> 3. 如果使用 https_proxy 建议使用 http 代理

```bash
# 安装
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 如果 XCode 安装失败可使用 xcode-select --install 安装

# 使用清华镜像，避免代理
# https://mirror.tuna.tsinghua.edu.cn/help/homebrew/
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git
brew update
# bottle/二进制 也使用镜像
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

## 基础的软件包

```bash
# 基础
brew tap caskroom/cask
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
brew install openssh autossh git mosh bash sshrc ssh-copy-id sshuttle tmux vim

# Linux/GNU 命令
# 这些 gnu 命令都没用 --with-default-names 参数,因此命令会推荐一个 g 前缀,例如 gawk
# 使用的时候添加 /usr/local/opt/coreutils/libexec/gnubin 该路径就可以了, 不需要 g 前缀
brew install less nano file-formula findutils coreutils binutils diffutils wget rsync unzip gzip wdiff
brew install gnu-{indent,sed,tar,which,units,time} gnutls gpatch grep
brew install bash-completion2

# 基本语言环境, 可选装
# 如果使用 nvm 则不安装 node
# python 默认为 3 可同时安装 python@2
brew install ruby python go node
# 补全
brew install {pip,ruby,gem,bundler,open,maven,brew-cask,apm-bash}-completion

# Java 环境
# 不建议通过 brew 安装 java 因为按住的是最新版，建议自行安装 LTS 版
# brew cask install java
# 最新 beta 版可安装 homebrew/cask-versions/java-beta
brew install maven
# 建议通过 toolbox 安装 jetbrain 的 ide
# brew cask install intellij-idea

# 数据库
# 可选 mongodb mysql mariadb postgresql
brew install sqlite

# 日常工具
brew cask install iterm2 google-chrome atom
# xtrafinder 在 10.11 中需要额外配置才能使用
# FinderPath 无法通过 cask 安装

# Java 环境
brew cask install java7 java
brew install maven
brew cask install intellij-idea

# OS X 下的常用工具
# 也可以用 AppleScript 提供的命令实现 https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-SW224
brew install terminal-notifier

# 在中国的基本工具
# 如果习惯苹果的输入法可以考虑不安装 搜狗
brew cask install qq sogouinput
open  /opt/homebrew-cask/Caskroom/sogouinput/*/安装搜狗输入法.app
# 也可以安装百度云 baiducloud
# brew cask install baiducloud

# 娱乐相关程序
brew install youtube-dl ffmpeg cmus
brew install mpv # 只是命令行启动,未关联文件, mpv --profile=pseudo-gui 可启动伪 UI
# mpv 的 app
brew cask install mpv

# 常用辅助工具
brew install di pv jlhonora/lsusb/lsusb

# 小工具
brew install archey cmatrix cowsay fortune screenfetch sl

# 小游戏
brew install c2048
```

### 更改默认 SHELL

OS X 自带的 Bash 是 3 的,有些功能不支持,使用 Brew 安装的是最新版的 Bash, 可通过以下方式修改操作系统默认 SHELL

```bash
echo /usr/local/bin/bash | sudo tee -a /etc/shells
chsh -s /usr/local/bin/bash
```

### Font
```bash
# 添加字体库
brew tap caskroom/fonts
# 搜索字体
# brew cask search /monoid/ # 支持 ligature 的编程字体
# brew cask search /noto/ # 谷歌的 noto 字体
# brew cask install font-noto-emoji font-noto-color-emoji font-noto-sans-cjk-sc
# fc-list : file family |grep \/Library # 查看安装的字体
```

### FUSE
[FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace) 是 [用户空间文件系统](https://zh.wikipedia.org/wiki/FUSE),比较常见的使用情况

* 将远程服务器通过 SFTP 或者 FTP 挂在到本地
* 添加操作系统不支持的文件系统类型支持
* 文件系统加密

```bash
# OS X 自身没有 FUSE 支持,需要额外安装 osxfuse
brew cask install osxfuse

# 添加 fuse 仓库
# 所有支持的 fs 可在 https://github.com/Homebrew/homebrew-fuse/tree/master/Formula 看到
brew tap homebrew/fuse

# 使用方式 sshfs HOST:/opt ~/mnt 将主机的 /opt 目录映射到本地的 ~/mnt
brew install sshfs

# 用于目录映射, OS X 下 HFS+ 有文件目录的硬链接,但只能是同磁盘
brew install bindfs
# 支持 MTP, 大多数是想操作手机文件的时候, OS X 无法直接操作, Windows 自带 MTP 支持
# simple-mtpfs --list-devices # 查看所有设备
# simple-mtpfs --device 1  ~/mnt/android/ # 挂载设备号为 1 的 mtp 到 ~/mnt/android/
brew install simple-mtpfs

# 加密的文件系统
# encfs ~/data/enc ~/mnt/enc # 将 ~/data/enc 作为加密数据的存储目录, ~/mnt/enc 为挂载点
# 第一次执行时选择 p 进入预置模式,然后输入密码,之后挂载的时候都需要输入密码
brew install encfs

# 将 zip 挂载为一个文件目录
# fuse-zip data.zip ~/mnt/zip/
brew install fuse-zip
# 将归档文件挂载为文件目录
brew install avfs
# 将 BT 种子挂载为目录
brew install btfs
```

### Tex
```bash
# 完整的 MacTex 相当大,可以只安装 BasicTex 然后通过 tlmgr 安装额外的包
# http://www.tug.org/mactex/morepackages.html
# export PATH="$PATH:/Library/TeX/texbin/"
# tlmgr update --self
# tlmgr install collection-fontsrecommended
brew cask install basictex
```

### PHP
* [homebrew-php](https://github.com/Homebrew/homebrew-php)

```bash
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php
# 安装需要的版本
brew install php56
```

多版本 PHP 可使用 [php-version](https://github.com/wilmoore/php-version) 控制

### 容器相关
如果想要使用例如 Docker 之类的容器技术,可安装下列软件包

```bash
# 基础 Docker 依赖
brew install docker docker-machine docker-machine-driver-xhyve docker-compose docker-swarm
brew cask install virtualbox vagrant

brew install {docker,docker-machine,docker-compose,vagrant}-completion docker-machine-completion
```

## Linuxbrew
[Linuxbrew](http://linuxbrew.sh/) 是 Brew 的 Linux 移植版, 支持大多的安装包.

```bash
# Ubuntu 依赖
sudo apt-get install build-essential curl git m4 python-setuptools ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev

# Centos 依赖
sudo yum groupinstall 'Development Tools' && sudo yum install curl git irb m4 python-setuptools ruby texinfo bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel

# 安装 Linuxbrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
```

## 使用 gcc 而不使用 clang

```bash
cd /usr/local/bin
VER=8
for v in gcc c++ g++ cpp; do ln -s $v-$VER $v; done

# 恢复
for v in gcc c++ g++ cpp; do unlink $v; done
```

## FAQ


### 缓存目录

* Homebrew
  * `~/Library/Caches/Homebrew`
  * `/usr/local/Hombrew`
* Cask
  * 早期存储于 `/opt/homebrew-cask/Caskroom/`
  * 后迁移至 `/usr/local/Caskroom/`
  * 再后来 `/usr/local/Hombrew/Cask`


### 手动下载未下载完成的安装包
```bash
cd /Library/Caches/Homebrew/
for f in `echo *.incomplete`; do
  echo Manual download ${f%.incomplete}
  aria2c -c -j 10 https://homebrew.bintray.com/bottles/${f%.incomplete} && rm $f
done
```

### xcode 版本检测错误
```bash
# 显示当前使用的版本
xcode-select -p
# 切换为另外的版本
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### dir_s_mkdir permission denied

* [#19789](https://github.com/Homebrew/homebrew-core/issues/19789)

```bash
brew link ruby -- dir_s_mkdir permission denied
find /usr/local -not -uid $(id -u)
find /usr/local -not -uid $(id -u) | xargs -n 1 sudo chown -R $(whoami)
```

### openjdk
```bash
sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
# export PATH="/usr/local/opt/openjdk/bin:$PATH"
```

### 迁移

```bash
brew list > formulas.txt

brew fetch $(cat formulas.txt)
brew unlink $(cat formulas.txt)
brew link --overwrite $(cat formulas.txt)
brew reinstall $(cat formulas.txt)

brew doctor check_for_stray_headers
brew doctor check_for_stray_headers 2>&1 | grep /protobuf | xargs rm
brew doctor check_for_stray_headers 2>&1 | grep '^  /' | xargs rm

brew doctor check_for_stray_static_libs
brew doctor check_for_stray_static_libs 2>&1 | grep '^  /' | xargs rm

brew doctor check_for_stray_dylibs
brew doctor check_for_stray_dylibs 2>&1 | grep '^  /' | xargs rm

brew prune
brew missing
```
