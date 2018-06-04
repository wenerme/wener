# Flutter

## Tips
* [Flutter](https://flutter.io)
* [flutter/flutter](https://github.com/flutter/flutter)
* Android/IOS 跨平台应用开发
* 不基于原生组件和 WebView
  * 自己实现组建和渲染
  * 提供一套 MD 组件
  * 提供部分 Cupertino(iOS 风格) 组件
  * [组件目录](https://flutter.io/widgets/)
* 主要语言为 Dart, Skia 作为 2D 渲染引擎, 底层引擎由 C++ 实现
  * 基本来说能运行所有未导入 `datr:mirrors` 和 `dart:html` 的代码
  * 暂不支持反射
* 支持 Android 4.1+, iOS 8+
* 目前最小的 APK 大约 7M, iOS 大约 20M
* NOTES
  * 开发环境推荐使用 Android Studio
  * gRPC 官方已经开始支持 Dart
    * [grpc/grpc-dart](https://github.com/grpc/grpc-dart)
    * [#22655](https://github.com/dart-lang/sdk/issues/22655)
    * [dart-lang/grpc-dart](https://github.com/dart-lang/grpc-dart)
* [hourliert/graphql_client](https://github.com/hourliert/graphql_client) - GraphQL Client
* [常见问题](./flutter-faq.md) 整理
* 参考
  * [在中国使用 Flutter](https://github.com/flutter/flutter/wiki/Using-Flutter-in-China)
  * [HTML/CSS 对应 Flutter](https://flutter.io/web-analogs)
  * [React Native 对应 Flutter](https://flutter.io/flutter-for-react-native)
  * [Android 对应 Flutter](https://flutter.io/flutter-for-android)


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

# 分支切换
# =======
# 查看所有 channel
flutter channel
# 如果没有, 可先拉取
git fetch origin dev:dev
# 切换分支 - 一般推荐使用 beta 分支
flutter channel dev
```



### dart2
* [Trying the preview of Dart 2 in Flutter](https://github.com/flutter/flutter/wiki/Trying-the-preview-of-Dart-2-in-Flutter)

### 图片和资源
https://flutter.io/assets-and-images/

### 自定义字体
https://flutter.io/custom-fonts


## flutter help
```
Manage your Flutter app development.

Common commands:

  flutter create <output directory>
    Create a new Flutter project in the specified directory.

  flutter run [options]
    Run your Flutter application on an attached device or in an emulator.

Usage: flutter <command> [arguments]

Global options:
-h, --help            Print this usage information.
-v, --verbose         Noisy logging, including all shell commands executed.
-d, --device-id       Target device id or name (prefixes allowed).
    --version         Reports the version of this tool.
    --bug-report      Captures a bug report file to submit to the Flutter team (contains local paths, device
                      identifiers, and log snippets).

    --flutter-root    The root directory of the Flutter repository (uses $FLUTTER_ROOT if set).

Available commands:
  analyze          Analyze the project's Dart code.
  build            Flutter build commands.
  channel          List or switch flutter channels.
  clean            Delete the build/ directory.
  config           Configure Flutter settings.
  create           Create a new Flutter project.
  devices          List all connected devices.
  doctor           Show information about the installed tooling.
  drive            Runs Flutter Driver tests for the current project.
  format           Format one or more dart files.
  fuchsia_reload   Hot reload on Fuchsia.
  help             Display help information for flutter.
  install          Install a Flutter app on an attached device.
  logs             Show log output for running Flutter apps.
  packages         Commands for managing Flutter packages.
  precache         Populates the Flutter tool's cache of binary artifacts.
  run              Run your Flutter app on an attached device.
  screenshot       Take a screenshot from a connected device.
  stop             Stop your Flutter app on an attached device.
  test             Run Flutter unit tests for the current project.
  trace            Start and stop tracing for a running Flutter app.
  upgrade          Upgrade your copy of Flutter.

Run "flutter help <command>" for more information about a command.
Run "flutter help -v" for verbose help output, including less commonly used options.
```
