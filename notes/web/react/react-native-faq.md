---
title: React Native FAQ
tags:
  - FAQ
---

# React Native FAQ

## boost/iterator/iterator_adaptor.hpp file not found

应该是三方依赖未下载好或者有问题

```bash
# 删除缓存
rm ~/.rncache
# 从新安装项目依赖
npm i
# 实际的安装脚本为
# node_modules/react-native/scripts/ios-install-third-party.sh
# 也可以尝试单独执行从新安装
```

## ":CFBundleIdentifier", Does Not Exist

所有的错误最后都会显示为该错误，把启动日志输出到文件，排查具体的错误

## XCode 10 还不支持

- [#19573](https://github.com/facebook/react-native/issues/19573) - Supporting Xcode 10 and the new Xcode build system
