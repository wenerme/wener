---
tags:
  - Shell
---

# adb

- tcp:5037
- 参考
  - https://github.com/senzhk/ADBKeyBoard
- camellia
  - Redmi Note 10 5G
- `camellia-user 11 RP1A.200720.011 V12.22.1.13.EP.WOSQ.K19 release-keys`
  - RP1A.200720.011
    - AOSP
    - R: Android 11 - Red Velvet Cake
    - P1A - Pixel 1A - 源码分支
    - 200720 - 基础版本日期 2020年7月20日
- 参考
  - [appium/appium-adb](https://github.com/appium/appium-adb)
    - Apache-2.0, JS


```bash
# AlpineLinux
apk add android-tools
# macOS
brew install android-platform-tools
```

```bash
adb devices # 查看设备列表

adb logcat # 查看日志

# 发送短信
# ADB Shell 没有 READ_SMS 权限
adb shell service call isms 7 i32 1 s16 "com.android.mms" s16 "+6512345678" s16 "null" s16 'This is a test message from ADB.' s16 "null" s16 "null"

# 获取设备信息
adb shell getprop
adb shell getprop ro.build.version.release
adb shell getprop ro.build.version.sdk
adb shell getprop ro.build.version.security_patch
adb shell getprop ro.build.display.id
adb shell getprop ro.build.description

# 截屏到剪切板
imgpbcopy() {
  osascript -e "set the clipboard to (POSIX file \"$PWD/$1\")"
}

adb exec-out screencap -p > screenshot.png
imgpbcopy screenshot.png

# 写入剪切板
# Android 10+
# Android < 10 出现 /system/bin/sh: clipboard: inaccessible or not found
adb shell clipboard set-primary-clip "你想写入的文本内容"
pbpaste | adb shell clipboard get-primary-clip

# 输入文本
adb shell input text TEXT

adb shell service call clipboard 1

# 输入法
# ==================
adb shell ime list -s
# 切换为 搜狗 输入法
# com.sohu.inputmethod.sogou.xiaomi/.SogouIME
adb shell ime set com.sohu.inputmethod.sogou/.SogouIME

curl -LO https://github.com/senzhk/ADBKeyBoard/raw/refs/heads/master/ADBKeyboard.apk
adb install -r ADBKeyboard.apk

adb shell ime enable com.android.adbkeyboard/.AdbIME
adb shell ime set com.android.adbkeyboard/.AdbIME

# 有些不支持 UTF8
adb shell am broadcast -a ADB_INPUT_TEXT --es msg '你好'
# 使用 base64 workaround
adb shell am broadcast -a ADB_INPUT_B64 --es msg $(echo -n '你好' | base64)
adb shell am broadcast -a ADB_INPUT_B64 --es msg $(echo $(pbpaste) | base64)

# 重置输入法
adb shell ime reset

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

# 拉取所有照片
adb pull /mnt/sdcard/DCIM/

# 短信
# 数据库文件需要 root 权限
# /data/data/com.android.providers.telephony/databases/mmssms.db
# 可使用 APP 备份然后下载
# https://play.google.com/store/apps/details?id=com.riteshsahu.SMSBackupRestore
# 备份后拉取即可
adb pull /mnt/sdcard/SMSBackupRestore
```

- https://gist.github.com/Pulimet/5013acf2cd5b28e55036c82c91bd56d8

## Touch Event

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

**代码**

```java
java.util.logging.Logger.getLogger("org.apache.http.wire").setLevel(java.util.logging.Level.FINEST);
java.util.logging.Logger.getLogger("org.apache.http.headers").setLevel(java.util.logging.Level.FINEST);

System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
System.setProperty("org.apache.commons.logging.simplelog.log.httpclient.wire", "debug");
System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http", "debug");
System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.headers", "debug");
```

**命令行**

```bash
adb shell setprop log.tag.org.apache.http VERBOSE
adb shell setprop log.tag.org.apache.http.wire VERBOSE
adb shell setprop log.tag.org.apache.http.headers VERBOSE

adb logcat -s "org.apache.http.wire" -s "log.tag.org.apache.http.headers" -s "org.apache.http"
```
