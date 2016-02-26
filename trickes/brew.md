
## Linuxbrew
http://linuxbrew.sh/

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
```

## Basic suite
```
# Foundation
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew tap homebrew/versions
brew tap homebrew/dupes

# Basic command
brew install bash-completion2 less nano bash file-formula coreutils binutils diffutils wget rsync svn unzip gzip openssh --with-brewed-openssl wdiff --with-gettext

brew install gpatch grep --with-default-names gnutls --with-default-names gnu-which --with-default-names gnu-tar --with-default-names gnu-sed --with-default-names findutils --with-default-names gnu-indent --with-default-names

brew install ruby python --with-brewed-openssl go
brew install vim --override-system-vi zsh

# Basic tools
brew cask install iterm2 google-chrome xtrafinder
brew install macvim --override-system-vim --custom-system-icons

# Java dev
brew cask install java7 java intellij-idea-bundled-jdk
brew install maven

# Development
brew install git --with-brewed-curl --with-brewed-openssl --with-brewed-svn --with-gettext
brew cask install atom

# 在中国的基本工具
brew install qq sogouinput baiducloud
open  /opt/homebrew-cask/Caskroom/sogouinput/*/安装搜狗输入法.app

# Web development
brew install nvm

# Entertainment
brew cask install mpv
brew install cmus youtube-dl
```

__更改默认 SHELL__

```
echo /usr/local/bin/bash >> /etc/shells
chsh -s /usr/local/bin/bash
```

## Manual download incomplete formula
```
cd /Library/Caches/Homebrew/
for f in `echo *.incomplete`; do
  echo Manual download ${f%.incomplete}
  aria2c -c -j 10 https://homebrew.bintray.com/bottles/${f%.incomplete} && rm $f
done
```
