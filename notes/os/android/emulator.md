# 模拟器

## Tips
* [Start the Emulator from the Command Line](https://developer.android.com/studio/run/emulator-commandline.html)
* tools
  * bin
    * apkanalyzer
    * archquery
    * avdmanager
    * jobb
    * lint
    * monkeyrunner
    * screenshot2
    * sdkmanager
    * uiautomatorviewer

```bash
emulator -list-avds
```

## FAQ

### Chrome 调试模拟器
* 浏览器打开 [chrome://inspect/#devices](chrome://inspect/#devices)
* 命令行执行 `adb devices`

### Failed to sync vcpu reg
* 确保没有别的虚拟机在运行, 例如 vbox, boot2docker, docker4mac

```bash
launchctl list | grep 'VirtualBox\|docker'
```
