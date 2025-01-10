---
tags:
  - FAQ
---

# iOS FAQ

```bash
# idevicesyslog
brew install ideviceinstaller
brew install ios-deploy

ios-deploy --debug --bundle your_iPA_Path.app
ideviceinstaller -i myapp.ipa
cfgutil install-app myapp.ipa

# 如果是企业签名的，非越狱机器也可以直接安装了。
ideviceinstaller -i xxx.ipa

# 卸载应用，需要知道此应用的bundleID
ideviceinstaller -U bundleID

codesign -vv -d my.app

unzip myapp.ipa -d myapp
codesign -f -s "Your Developer Certificate" --entitlements Entitlements.plist Payload/YourAppName.app
zip -r YourApp_signed.ipa Payload
```

- .ipa
  - Payload/YourAppName.app/\_CodeSignature
- https://github.com/libimobiledevice/ideviceinstaller
- https://docs.fastlane.tools/

## Undo/Redo

> 撤销/重做

- 摇一摇 - Undo
- 三指
  - 左 <- 右 Undo
  - 左 -> 右 Redo
  - 点两次 - Undo
  - 按住打开菜 - 有 Undo 和 Redo
- 横屏 Notes 有 Undo 和 Redo
