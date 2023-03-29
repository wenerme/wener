---
title: proxychains-ng
---

# proxychains-ng

- [rofl0r/proxychains-ng](https://github.com/rofl0r/proxychains-ng)
- 针对应用进行代理，通过 preload 来将运行时的网络请求进行动态代理。
- /usr/local/etc/proxychains.conf

```bash
# macOS
brew install proxychains-ng

# 网络请求会被代理
proxychains4 curl google.com
```
