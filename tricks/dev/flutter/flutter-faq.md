# Flutter Snippet

## 图标修改和生成

* 图标位于 `ios/Runner/Assets.xcassets/AppIcon.appiconset`
* 生成脚本依赖 imagemagic
  * svg 需要编译的时候添加了 librsvg 支持

```bash
# macOS 安装 imagemagick
brew install imagemagick --with-librsvg

# 使用指定的图像和目录
# 默认会使用 logo.svg 并输出到当前目录
mkdir out
./gen.sh logo.png out
```

__gen.sh__

```shell
#!/bin/sh

SIZES=${SIZES:-"20x1 20x2 20x3 29x1 29x2 29x3 40x1 40x2 40x3 60x2 60x3 76x1 76x2 83.5x2 1024x1"}
PREFIX=${PREFIX:-"Icon-App"}
source=${1:-logo.svg}
dst=${2:-.}
for s in $SIZES;do
  size=${s%x*}
  scale=${s##*x}
  resize=$(bc <<< ${size}*${scale} )
  out=$dst/"$PREFIX-${size}x${size}@${scale}x.png"
  echo Generate $out
  convert $CONVERT_EXTRA "$source" -resize ${resize}x${resize}     -unsharp 1x4 $out
done
```

## 闪屏修改
* 闪屏图片位于 `ios/Runner/Assets.xcassets/LaunchImage.imageset`
  * LaunchImage.png
  * LaunchImage@2x.png
  * LaunchImage@3x.png
* 可以直接替代图片
* 可以打开 `ios/Runner.xcworkspace` 在 xcode 中选择 `Runner/Assets.xcassets` 进行替换
* 闪屏不做全屏可以选择一个合适大小的白色或透明背景即可

```bash
# 通过 logo 生成闪屏资源
# -background none 暴露 svg 的透明
CONVERT_EXTRA="-background none" PREFIX=LaunchImage SIZES="120x1 120x2 120x3" ./gen.sh logo2.svg out/
# 拷贝生成的 LaunchImage*.png 到 ios/Runner/Assets.xcassets/LaunchImage.imageset
# 并修改 Contents.json 指向正确的文件
```

### 闪屏尺寸
* [IOS launch image sizes](https://stackoverflow.com/questions/16832459)
* [IOS launch images](https://stackoverflow.com/a/35213674/1870054)

类型 | 尺寸
------------------|-----
1x                | 320 x 480
2x                | 640 x 960
Retina 4          | 640 x 1136
Retina HD 5.5     | 1242 x 2208
Retina HD 4.7     | 750 x 1334
Retina HD 5.5     | 2208 x 1242   (landscape)
iPad 1x           | 768 x 1024
iPad 2x           | 1536 x 2048
iPad 1x           | 1024 x 768    (landscape)
iPad 2x           | 2048 x 1536   (landscape)

## 制作 Gif

https://github.com/flutter/flutter/wiki/Making-animated-GIFs-of-Flutter-apps


## TabBarView 内容图片会闪烁

* 可以考虑预加载图片

```dart
var localImageConfiguration = createLocalImageConfiguration(context);
new AssetImage('assets/slides/2.png').resolve(localImageConfiguration);
new AssetImage('assets/slides/3.png').resolve(localImageConfiguration);
```

## 滚动监听

1. 从 ScrollController 监听 ScrollPosition 来做这样的事, 或者直接监听 ScrollController 再获取 position 即可
2. 通过 [ScrollNotification](https://docs.flutter.io/flutter/widgets/ScrollNotification-class.html) 监听来进行布局调整会导致延迟, 因为接收到通知时已经渲染完毕.

## 嵌入 Web

* [dart-flitter/flutter_webview_plugin](https://github.com/dart-flitter/flutter_webview_plugin)
  * Plugin that allow Flutter to communicate with a native WebView.
* 要求整页为 Web

## 添加到现有应用
* [wiki/Add-Flutter-to-existing-apps](https://github.com/flutter/flutter/wiki/Add-Flutter-to-existing-apps)
* [#14821](https://github.com/flutter/flutter/issues/14821) Reduce friction encountered when adding Flutter to existing apps 

## Flutter 可以在网页上运行么
不能, 并且也不打算

### 图片和资源
https://flutter.io/assets-and-images/

### 自定义字体
https://flutter.io/custom-fonts

### Tips
```dart
// unfocus
// https://github.com/flutter/flutter/issues/7247
FocusScope.of(context).requestFocus(new FocusNode());

// 不滚动
ListView(
  physics: const NeverScrollableScrollPhysics()
)
```



## 音频
Plugin for recording audio
https://github.com/flutter/flutter/issues/10592

https://github.com/ZaraclaJ/audio_recorder
https://pub.dartlang.org/packages/audio_recorder

https://pub.dartlang.org/packages/medcorder_audio
https://github.com/evrone/flutter_audio

## 视频

## 照片
https://github.com/flutter/plugins/tree/master/packages/camera


## 自定义图标

http://fluttericon.com/
https://github.com/ilikerobots/polyicon
https://github.com/fontello/fontello

## 嵌套列表

嵌套的列表需要 shrinkWrap: true

## 固定头
https://github.com/fluttercommunity/flutter_sticky_headers

## 桌面端
非官方项目
https://github.com/google/flutter-desktop-embedding
https://flutter.io/faq/#can-i-use-flutter-to-build-desktop-apps

## Key
https://segmentfault.com/a/1190000011276853

https://docs.flutter.io/flutter/widgets/PageStorageKey-class.html
https://flutter.io/widgets-intro/#keys

## 光标不下移
Editing multiline text sometimes places cursor on the wrong line #15572
https://github.com/flutter/flutter/issues/15572

## 中英文混合输入
chinese font display not well on nexus 5x
https://github.com/flutter/flutter/issues/18665

## SVG
[Enhancement] Support SVG
https://github.com/flutter/flutter/issues/15501

## onLongPress 不会释放
* #17072
  * onTapUp 不会被触发
* onPointerUp 会触发

```dart
Listener(
    onPointerUp: (e) {
        print("onPointerUp");
    },
    child: GestureDetector(
        onTap: _onTap,
        onLongPress: _onLongPress,
        child: CircleAvatar(
            radius: 30.0,
            backgroundColor: Colors.white,
        ),
    ),
);
```

## 裁剪居中
https://stackoverflow.com/a/49523770/1870054

## 修改状态栏颜色
[Request: API for changing the color of status bar](https://github.com/flutter/flutter/issues/7347)

## 多个手势动作同时发生
https://stackoverflow.com/questions/50824208

## QR Code

https://pub.dartlang.org/packages/barcode_scan

https://github.com/apptreesoftware/flutter_barcode_reader

Android
https://github.com/dm77/barcodescanner
iOS
https://github.com/mikebuss/MTBBarcodeScanner

https://pub.dartlang.org/packages/qrcode_reader
https://github.com/bcko/flutter_qrcode_reader



https://github.com/zxing/zxing

https://pub.dartlang.org/packages/zxing
https://github.com/yohom/zxing-flutter

Is there a way to scan barcodes in Flutter?
https://stackoverflow.com/questions/49521283


## ImportError: cannot import name _remove_dead_weakref

```
Traceback (most recent call last):
  File "<input>", line 1, in <module>
  File "/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/copy.py", line 52, in <module>
    import weakref
  File "/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/weakref.py", line 14, in <module>
    from _weakref import (
ImportError: cannot import name _remove_dead_weakref
```

https://github.com/flutter/flutter/issues/17803

<!-- flutter/flutter#17803 -->

暂时只能通过卸载 python@2 解决
```bash
brew uninstall --ignore-dependencies python@2
```
