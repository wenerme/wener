---
title: macOS Bundle
tags:
  - Bundle
---

## macOS Bundle

- Bundle
  - 应用、框架、插件
  - Info.plist
- UTI com.apple.bundle
- CFBundleIdentifier
  - https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids
  - https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier?language=objc
- CFBundlePackageType
  - APPL
  - FMWK - Framework
  - BNDL
- CF -> Core Foundation
- NS -> NeXTSTEP
- /System/Library/CoreServices/CoreTypes.bundle
- 参考
  - [Bundle Structures](https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFBundles/BundleTypes/BundleTypes.html)
  - wikipedia [Bundle](<https://en.wikipedia.org/wiki/Bundle_(macOS)>)

```bash
osascript -e 'id of app "Finder"'

curl https://itunes.apple.com/lookup?id=497799835 | jq
curl https://itunes.apple.com/lookup?id=497799835 -s | jq -r '.results[0].bundleId'

cat /Applications/iTerm.app/Contents/Info.plist | grep -A 1 'BundleIdentifier'
grep -a -A 1 'BundleIdentifier<' /Applications/*.app/Contents/Info.plist
```

## Structure

- Contents/
  - CodeResources
  - Info.plist - xml
  - PkgInfo - text
  - XPCServices/
    - `*.xpc/` - Bundle
      - Contents/
  - Frameworks/
    - `*.dynlib`
    - `*.framework/`
  - MacOS/
  - Resources/
  - \_CodeSignature/
    - CodeResources - plist xml - files, rules

## LaunchService

- ~/Library/Preferences/com.apple.LaunchServices/com.apple.LaunchServices.plist
- Core Services > [Launch Services](https://developer.apple.com/documentation/coreservices/launch_services)
- [Glossary](https://developer.apple.com/library/archive/documentation/Carbon/Conceptual/LaunchServicesConcepts/LSCGlossary/LSCGlossary.html)

```bash
# dump 注册信息
# https://ss64.com/osx/lsregister.html
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Versions/Current/Support/lsregister -dump
# 记录的信息
ls $TMPDIR/../0/com.apple.LaunchServices*.csstore
```

- claim id
  - bindings - 绑定的 schema 和 extension
    - 例如： sftp:, .pdf, application/pdf
- claimed schemes
- claimed UTIs

```
claim id:                   Plain text document (0x5920)
localizedNames:             "zh_CN" = "纯文本文稿"
rank:                       Alternate
bundle:                     Safari (0x1b00)
flags:                      apple-internal  doc-type  resolves-icloud-conflicts (0000000000000222)
roles:                      Viewer (0000000000000002)
bindings:                   .txt, .text, 'TEXT', text/plain
```

```
claim id:                   Web site location (0x592c)
localizedNames:             "en" = "Web site location" "zh_CN" = "网站地址"
rank:                       Default
bundle:                     Safari (0x1b00)
flags:                      apple-default  apple-internal  doc-type  resolves-icloud-conflicts (0000000000000223)
roles:                      Viewer (0000000000000002)
bindings:                   com.microsoft.internet-shortcut, .url, 'LINK'
```

- rank
  - Alternate
  - Default
  - None
  - Owner

## Info.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>English</string>
	<key>CFBundleDocumentTypes</key>
	<array>
  </array>
</dict>
```

- https://developer.apple.com/documentation/bundleresources/information_property_list

## Signature

- 签名数据
  - Contents/CodeResources
  - Contents/\_CodeSignature/CodeResources
