# Flutter Snippet

## 图标修改和生成

* 图标位于 `ios/Runner/Assets.xcassets/AppIcon.appiconset`
* 生成脚本依赖 imagemagic
  * svg 需要编译的时候添加了 librsvg 支持

```bash
# macOS 安装 imagemagick
brew info imagemagick --with-librsvg

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

0. 从 ScrollController 监听 ScrollPosition 来做这样的事, 或者直接监听 ScrollController 再获取 position 即可
0. 通过 [ScrollNotification](https://docs.flutter.io/flutter/widgets/ScrollNotification-class.html) 监听来进行布局调整会导致延迟, 因为接收到通知时已经渲染完毕.

## 嵌入 Web

* [dart-flitter/flutter_webview_plugin](https://github.com/dart-flitter/flutter_webview_plugin)
  * Plugin that allow Flutter to communicate with a native WebView.
* 要求整页为 Web

## 添加到现有应用
* [wiki/Add-Flutter-to-existing-apps](https://github.com/flutter/flutter/wiki/Add-Flutter-to-existing-apps)
* [#14821](https://github.com/flutter/flutter/issues/14821) Reduce friction encountered when adding Flutter to existing apps 
