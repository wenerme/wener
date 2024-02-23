---
title: Debug
---

# PHP Debug

- https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc
  - Xdebug Helper
- PHP Storm [Configure Xdebug](https://www.jetbrains.com/help/phpstorm/2023.3/configuring-xdebug.html)
- https://xdebug.org/docs/all_settings#xdebug.mode

```bash
apk add php82-pecl-xdebug

# 不建议直接开启 xdebug.mode=debug
cat <<EOF > /etc/php82/conf.d/99_xdebug.ini
[xdebug]
zend_extension=xdebug.so
#xdebug.mode=debug
xdebug.client_host=127.0.0.1
xdebug.client_port=9003
xdebug.collect_return=true
xdebug.start_with_request=yes

# xdebug.idekey=PHPSTORM
EOF

# with Xdebug v3.3.1, Copyright (c) 2002-2023, by Derick Rethans
php --version

php -dxdebug.mode=debug -dxdebug.client_host=127.0.0.1 -dxdebug.client_port=9003 -dxdebug.start_with_request=yes start.php
# for Docker
php -dxdebug.mode=debug -dxdebug.client_host=host.docker.internal -dxdebug.client_port=9003 -dxdebug.start_with_request=yes start.php
XDEBUG_MODE=debug XDEBUG_SESSION=1 php start.php
```

- hyperf Proxy
  - runtime/container/proxy/

## Xdebug vs Zend Debugger

- Xdebug - 开源
- Zend Debugger - 商业
  - by Zend Technologies
  - for Zend Server, Zend Studio
