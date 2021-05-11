---
id: flutter
title: Flutter
---

# Flutter

- [Flutter](https://flutter.io)
- [flutter/flutter](https://github.com/flutter/flutter)
- Android/IOS 跨平台应用开发
- 不基于原生组件和 WebView
  - 自己实现组建和渲染
  - 提供一套 MD 组件
  - 提供部分 Cupertino(iOS 风格) 组件
  - [组件目录](https://flutter.io/widgets/)
- 主要语言为 Dart, Skia 作为 2D 渲染引擎, 底层引擎由 C++ 实现
  - 基本来说能运行所有未导入 `datr:mirrors` 和 `dart:html` 的代码
  - 暂不支持反射
- 支持 Android 4.1+, iOS 8+
- 目前最小的 APK 大约 7M, iOS 大约 20M
- NOTES
  - 开发环境推荐使用 Android Studio
  - gRPC 官方已经开始支持 Dart
    - [grpc/grpc-dart](https://github.com/grpc/grpc-dart)
    - [#22655](https://github.com/dart-lang/sdk/issues/22655)
    - [dart-lang/grpc-dart](https://github.com/dart-lang/grpc-dart)
- [hourliert/graphql_client](https://github.com/hourliert/graphql_client) - GraphQL Client
- [常见问题](./flutter-faq.md) 整理
- 参考
  - [在中国使用 Flutter](https://github.com/flutter/flutter/wiki/Using-Flutter-in-China)
  - [HTML/CSS 对应 Flutter](https://flutter.io/web-analogs)
  - [React Native 对应 Flutter](https://flutter.io/flutter-for-react-native)
  - [Android 对应 Flutter](https://flutter.io/flutter-for-android)
  - [Flutter System Architecture](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I)
  - [Flutter 样式和布局控件简析](https://segmentfault.com/a/1190000011949751)
  - [Flutter 中的布局绘制流程简析](https://segmentfault.com/a/1190000011912538)
- Effects
  - [Shimmer effect](https://medium.com/flutter-community/dbe7a1bfd980)

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
brew install --HEAD libimobiledevice
brew install ideviceinstaller
brew install ios-deploy
brew install cocoapods
pod setup
```

```bash
git clone -b beta https://github.com/flutter/flutter.git
export PATH=`pwd`/flutter/bin:$PATH

# 中国可设置使用
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

# 检测本地环境
flutter doctor
# 升级
flutter upgrade

# 构建 APK
flutter build apk
# 构建 iOS
flutter build ios
# 安装到链接的设备上
flutter install

# 创建项目
flutter create --org com.myapp -i swift -a kotlin --description 'My App' myapp


flutter packages get
flutter packages upgrade

# 分支切换
# =======
# 查看所有 channel
flutter channel
# 如果没有, 可先拉取
git fetch origin dev:dev
# 切换分支 - 一般推荐使用 beta 分支
flutter channel dev
```

## dart2
- [Trying the preview of Dart 2 in Flutter](https://github.com/flutter/flutter/wiki/Trying-the-preview-of-Dart-2-in-Flutter)
