---
title: Flutter Plugin Development
tags:
  - Flutter
  - Plugin
---

# Flutter Plugin Development

## Creation

```bash
flutter create --org me.wener.drifter --template=plugin -i swift -a java drifter
```

## Build & Run

```bash
cd drifter/example
export ANDROID_SDK_ROOT=/usr/local/opt/android-sdk/
flutter build apk
flutter build ios --no-codesign

flutter run
```

## iOS

```bash
open hello/example/ios/Runner.xcworkspace
```

## Android

- `provided 'com.google.android.gms:play-services-ads-base:17.1.2'`
- [Support Library Packages](https://developer.android.com/topic/libraries/support-library/packages)

## Publishing

```bash
flutter packages pub publish --dry-run
```

## References

- [Accengage Documentation](https://docs.accengage.com/pages/viewpage.action?pageId=13861194)
