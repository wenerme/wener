---
title: macOS Code Sign
---

# Code Sign

```bash
# 查看所有证书
security find-identity -v -p codesigning
# 0 valid identities found - 说明没有

# 签名
codesign --deep --force --verify --verbose --sign "Your Developer ID" YourApp.app
codesign --verify --verbose YourApp.app # 验证
spctl --assess --verbose YourApp.app    # 检查 Gatekeeper 是否接受签名

# 使用 xcrun altool 上传应用进行公证
xcrun altool --notarize-app -f YourApp.zip --primary-bundle-id "com.yourcompany.yourapp" --username "your@apple.com" --password "app-specific-password"
# 将公证信息附加到 .app 文件上
xcrun stapler staple YourApp.app

# SelfSign
codesign --deep --force --verify --verbose --sign "SelfSignedDeveloper" YourApp.app
```
