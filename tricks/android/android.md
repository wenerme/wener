
## Tips

```bash
# Simulate fast tap
# /mnt/sdcard/events 是从 dev 中获取到的
adb shell "while true;do cat /mnt/sdcard/events > /dev/input/event1 && sleep 0.01; done;"


# 设备 ID
adb shell settings get secure android_id
# 查看当前 Activity 的名字
adb shell dumpsys activity | grep mFocusedActivity
# 串号
adb shell getprop ro.serialno
# 查看设备信息 Android < 5.0
adb shell dumpsys iphonesubinfo
# 通过 TCP 链接
adb tcpip 5555
adb connect 192.168.0.101:5555
adb shell ip -f inet addr show wlan0
# 恢复为 USB 链接
adb usb

# 服务调用
# http://ktnr74.blogspot.com/2014/09/calling-android-services-from-adb-shell.html
# 获取 IMEI
adb shell service call iphonesubinfo 1 | awk -F "'" '{print $2}' | sed 's/[^0-9A-F]*//g' | tr -d '\n' && echo
# 1  getDeviceId
# 2  getDeviceIdForSubscriber
# 3  getImeiForSubscriber
# 4  getDeviceSvn
# 5  getSubscriberId
# 6  getSubscriberIdForSubscriber
# 7  getGroupIdLevel1
# 8  getGroupIdLevel1ForSubscriber
# 9  getIccSerialNumber
# 10  getIccSerialNumberForSubscriber
# 11  getLine1Number
# 12  getLine1NumberForSubscriber
# 13  getLine1AlphaTag
# 14  getLine1AlphaTagForSubscriber
# 15  getMsisdn
# 16  getMsisdnForSubscriber
# 17  getVoiceMailNumber
# 18  getVoiceMailNumberForSubscriber
# 19  getCompleteVoiceMailNumber
# 20  getCompleteVoiceMailNumberForSubscriber
# 21  getVoiceMailAlphaTag
# 22  getVoiceMailAlphaTagForSubscriber
# 23  getIsimImpi
# 24  getIsimDomain
# 25  getIsimImpu
# 26  getIsimIst
# 27  getIsimPcscf
# 28  getIsimChallengeResponse
# 29  getIccSimChallengeResponse

# 获取屏幕上的颜色
# <bytes per pixel> 一般为4
# <pixel offset> = Y * width + X
# 需要 ROOT 权限
adb shell "dd if=/dev/graphics/fb0 bs=<bytes per pixel> count=1 skip=<pixel offset> 2>/dev/null | hd"
# 获取屏幕宽度
adb shell getprop ro.sf.lcd_density

```

### Touch Event
```bash
# 查看所有的设备,有 MT_TOUCH 为触摸设备
getevent -pl
# 假设 /dev/input/event1 为触摸设备
# 记录所有的操作, 需手动中断
cat /dev/input/event1 > event-dump
# 回放记录的操作
cat event-dump > /dev/input/event1
# 可命令行操作 tap
input tap 233 466
# 查看所有操作的事件
getevent -l
```
<!-- while true;do { cat tap-dump > /dev/input/event1; usleep 500; } done -->

## 将 HttpClient 的日志输出到 Logcat
__代码__
```java
java.util.logging.Logger.getLogger("org.apache.http.wire").setLevel(java.util.logging.Level.FINEST);
java.util.logging.Logger.getLogger("org.apache.http.headers").setLevel(java.util.logging.Level.FINEST);

System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
System.setProperty("org.apache.commons.logging.simplelog.log.httpclient.wire", "debug");
System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http", "debug");
System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.headers", "debug");
```

__命令行__
```bash
adb shell setprop log.tag.org.apache.http VERBOSE
adb shell setprop log.tag.org.apache.http.wire VERBOSE
adb shell setprop log.tag.org.apache.http.headers VERBOSE

adb logcat -s "org.apache.http.wire" -s "log.tag.org.apache.http.headers" -s "org.apache.http"
```

## 在 APK 中注入代码

* 工具准备
  * Android Studio
    * 安装 [SmaliIdea](https://github.com/JesusFreke/smali/wiki/smalidea) 插件
      * 只能通过下载安装
    * 安装 Java2Smali 插件 - 可在插件仓库中搜索到
    * 配合 ddms 可直接在 smali 中打断点进行调试
  * [APKTool](http://ibotpeaches.github.io/Apktool/documentation)
* 可选工具
  * [dex2jar](https://github.com/pxb1988/dex2jar)
    * 可将 dex 转为 jar, 然后在 idea 中查看的反编译内容,比 smali 直观
    * 可将转换后的 jar 添加到类路径,然后在书写注入类时就可以直接引用其他 smali 的类,否则只能使用反射来操作
      * Java 无法引用 smali 中的内容
    * 如果想要添加新的 jar 到项目,需要使用 dex2smali,然后将所有的 smali 添加到项目

__命令行操作流程__

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

__其它操作__

```bash
# 对 apk 解压可拿到代码文件
unzip my.apk -d apk # 代码为 apk/classes.dex
# 将 Dex 转为 jar - classes-dex2jar.jar
d2j-dex2jar classes.dex
# 将 classes-dex2jar.jar 添加到项目类路径则可以
```

### 代码注入

* 使用 Java 编写入口点类
* 将其转换为 Smali
* 在启动时挂载该入口

在 `./my/smali/my` 下添加 Extra 类作为注入入口

__Extra.java__

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

* 然后菜单 `Build -> Compile to smali`, 会在相同目录下生成 `Extra.smali`
* 在 `AndroidManifest.xml` 中找到主程序入口,标签为  `<application android:name="me.wener.hello.MainApplication">`
* 找到主程序的对应 smali 文件, 上例中的入口为 `smali/me/wener/hello/MainApplication.smali`
* 然后找到 `.method public onCreate()V` onCreate 方法,在下面添加 `invoke-static {}, Lmy/Extra;->init()V` 来调用我们的注入内容
  * 根据需要注入的内容不同,可选择不同的注入点: 构造函数,静态构造函数,onCreate 等
  * 需要在其他地方注入代码时操作也是一样的
* 然后参照上述命令行操作,重新将该项目构建为一个 APK 即可
* 使用 `adb logcat -s "Injected"` 来查看在注入代码中打印的日志
