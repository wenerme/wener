---
title: Realm
---

# Realm

- [Realm](https://realm.io/)
  - 核心开源
    - [realm-object-store](https://github.com/realm/realm-object-store)
    - [realm-core](https://github.com/realm/realm-core)
  - 客户端开源
    - android/java
    - ios/swift/objc
    - react native/js
      - [Cordova / PhoneGap / Ionic Support](https://github.com/realm/realm-js/issues/261)
    - uwp/xamarin/dotnet
  - 平台闭源
    - 提供开发版
      - 没有的特性
        - Realm Functions: 3 Functions
        - API Bridging
        - Server-side Access
        - Data Integration API
        - Horizontal Scaling
    - [pricing](https://realm.io/pricing/)

```bash
# 使用 Docker 运行服务
docker run --rm -it -v /data/realmdb:/var/lib/realm/object-server -p 9080:9080 robertwtucker/realm-object-server
```

## 数据模型

- [The Realm Data Model](https://realm.io/docs/data-model/)
- 核心为一个嵌入式的 Realm Mobile Database
