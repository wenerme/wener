---
title: Android
---

# Android

- 安卓
- APK 下载
  - https://apkpure.com/
  - http://apk-dl.com/
  - http://www.apkmirror.com/
  - http://cn.jide.com/
- 版本
  - Play 2018.8 要求最低 API Level 26 - Android 8.0
    - [facebook/react-native#17287](https://github.com/facebook/react-native/issues/17287)
    - [Improving app security and performance on Google Play for years to come](https://android-developers.googleblog.com/2017/12/improving-app-security-and-performance.html)
- [Android version market share distribution among smartphone owners as of September 2018](https://www.statista.com/statistics/271774/share-of-android-platforms-on-mobile-devices-with-android-os/)
- Device Id
  - https://developer.android.com/training/articles/user-data-ids

```bash
brew install android-platform-tools # adb, fastboot, 通信

brew install android-commandlinetools # 管理和构建安卓应用开发环境
brew install android-sdk              # Android SDK
```

## 在 APK 中注入代码

- 工具准备
  - Android Studio
    - 安装 [SmaliIdea](https://github.com/JesusFreke/smali/wiki/smalidea) 插件
      - 只能通过下载安装
    - 安装 Java2Smali 插件 - 可在插件仓库中搜索到
    - 配合 ddms 可直接在 smali 中打断点进行调试
  - [APKTool](http://ibotpeaches.github.io/Apktool/documentation)
- 可选工具
  - [dex2jar](https://github.com/pxb1988/dex2jar)
    - 可将 dex 转为 jar, 然后在 idea 中查看的反编译内容,比 smali 直观
    - 可将转换后的 jar 添加到类路径,然后在书写注入类时就可以直接引用其他 smali 的类,否则只能使用反射来操作
      - Java 无法引用 smali 中的内容
    - 如果想要添加新的 jar 到项目,需要使用 dex2smali,然后将所有的 smali 添加到项目

**命令行操作流程**

```bash
# 将 APK 解压到 ./my
apktool d my.apk
# 将 ./my 导入到 idea
# 将 ./my/smali 设置为 源码目录

# 修改项目内容

# 构建修改后的项目,结果为 ./my/dist/my.apk
apktool b my

# 参考 https://developer.android.com/studio/publish/app-signing.html#signing-manually
# 如果没有 my-release-key.keystore 则需要执行下面这一步生成 keystore,如果有了,则可以跳过
# keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
# 签名后可使用 jarsigner -verify -verbose -certs my_application.apk 来验证签名

# 使用 my-release-key.keystore 对 APK 进行签名
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my/dist/my.apk alias_name
# 安装到设备
adb install -r my/dist/my.apk
```

**其它操作**

```bash
# 对 apk 解压可拿到代码文件
unzip my.apk -d apk # 代码为 apk/classes.dex
# 将 Dex 转为 jar - classes-dex2jar.jar
d2j-dex2jar classes.dex
# 将 classes-dex2jar.jar 添加到项目类路径则可以
```

### 代码注入

- 使用 Java 编写入口点类
- 将其转换为 Smali
- 在启动时挂载该入口

在 `./my/smali/my` 下添加 Extra 类作为注入入口

**Extra.java**

```java
package my;
import android.util.Log;
// 注入入口
public class Extra{
  public static void init(){
    Log.w("Injected", "Init");
  }
}
```

- 然后菜单 `Build -> Compile to smali`, 会在相同目录下生成 `Extra.smali`
- 在 `AndroidManifest.xml` 中找到主程序入口,标签为 `<application android:name="me.wener.hello.MainApplication">`
- 找到主程序的对应 smali 文件, 上例中的入口为 `smali/me/wener/hello/MainApplication.smali`
- 然后找到 `.method public onCreate()V` onCreate 方法,在下面添加 `invoke-static {}, Lmy/Extra;->init()V` 来调用我们的注入内容
  - 根据需要注入的内容不同,可选择不同的注入点: 构造函数,静态构造函数,onCreate 等
  - 需要在其他地方注入代码时操作也是一样的
- 然后参照上述命令行操作,重新将该项目构建为一个 APK 即可
- 使用 `adb logcat -s "Injected"` 来查看在注入代码中打印的日志

## java.io.FileNotFoundException: /data/system/theme_config/theme_compatibility.xml: open failed: ENOENT (No such file or directory)

- 不影响使用，可忽略
- uiautomator
- adb shell uiautomator dump

## 获取页面元素

```bash
adb exec-out uiautomator dump /dev/tty
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<hierarchy>
<node bounds="" text="" class="" hint="" resource-id="" content-desc="">
  <node>
  </node>
</node>
</hierarchy>
```
