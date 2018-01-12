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
  * Dart 暂不支持 GRPC
    * [#22655](https://github.com/dart-lang/sdk/issues/22655)
    * [dart-lang/grpc-dart](https://github.com/dart-lang/grpc-dart)
* https://github.com/hourliert/graphql_client

```bash
flutter build apk
```
