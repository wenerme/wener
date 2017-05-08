# Electron

## Tips
* [中文](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/project/README.md)
  * [文档](https://github.com/electron/electron/tree/master/docs-translations/zh-CN)
* 应用
  * [angular/angular-electron](https://github.com/angular/angular-electron)
  * [joaogarin/angular-electron](https://github.com/joaogarin/angular-electron)
    * 更新
  * [akveo/ng2-admin](https://github.com/akveo/ng2-admin)
    * Angular admin dashboard framework
* 参考
  * [AngularClass/awesome-angular](https://github.com/AngularClass/awesome-angular)

```bash
# 淘宝源开发依赖安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron --save-dev

# 淘宝源全局安装
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron -g
# 或者
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ yarn global add electron

# Mac 下需要 icns 作为图标, 如果安装了 libicns 可以使用命令转换
png2icns app-icon.icns favicon-16x16.png favicon-32x32.png

# 使用 app-icon-1024.png 生成个个尺寸的图标, 并生成 icns
mkdir app-icon.iconset
sips -z 16 16     app-icon-1024.png --out app-icon.iconset/icon_16x16.png
sips -z 32 32     app-icon-1024.png --out app-icon.iconset/icon_16x16@2x.png
sips -z 32 32     app-icon-1024.png --out app-icon.iconset/icon_32x32.png
sips -z 64 64     app-icon-1024.png --out app-icon.iconset/icon_32x32@2x.png
sips -z 128 128   app-icon-1024.png --out app-icon.iconset/icon_128x128.png
sips -z 256 256   app-icon-1024.png --out app-icon.iconset/icon_128x128@2x.png
sips -z 256 256   app-icon-1024.png --out app-icon.iconset/icon_256x256.png
sips -z 512 512   app-icon-1024.png --out app-icon.iconset/icon_256x256@2x.png
sips -z 512 512   app-icon-1024.png --out app-icon.iconset/icon_512x512.png
cp app-icon-1024.png app-icon.iconset/icon_512x512@2x.png
iconutil -c icns app-icon.iconset
rm -R app-icon.iconset
```
