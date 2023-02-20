---
title: phpenv
---

# phpenv

- [phpbrew/phpbrew](https://github.com/phpbrew/phpbrew)
- [phpenv/phpenv](https://github.com/phpenv/phpenv)
  - 不活跃、不推荐

```bash
curl -L -O https://github.com/phpbrew/phpbrew/releases/latest/download/phpbrew.phar
chmod +x phpbrew.phar

#
sudo mv phpbrew.phar /usr/local/bin/phpbrew


phpbrew init
# .bashrc
# [[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc
```

## macOS brew

```bash
# 7.4, 8.0, 8.1
brew install php php@7.4

# 更多版本
brew tap shivammathur/php
brew install shivammathur/php/php@7.4

# 替换默认
brew unlink php && brew link --overwrite --force php@7.4
```
