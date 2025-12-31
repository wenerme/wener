# React Native

## Tips

- 参考
  - [stevenpersia/tinder-react-native](https://github.com/stevenpersia/tinder-react-native)

## Get started

```bash
npm install -g react-native-cli

# 运行 iOS 虚拟机
react-native run-ios
# 运行安卓虚拟机
react-native run-android

# 构建 iOS 包
# https://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle
react-native bundle --entry-file index.ios.js --platform ios --bundle-output ios/main.jsbundle

# 构建 APK
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
# android/ directory open gradle.properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore MYAPP_RELEASE_KEY_ALIAS=my-key-alias MYAPP_RELEASE_STORE_PASSWORD=YOUR_KEY_PASSWORD
MYAPP_RELEASE_KEY_PASSWORD= YOUR_KEY_PASSWORD

Add the following in android/app/build.gradle:
android {
...
  signingConfigs {
    release {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
      }
  }
  buildTypes {
    release {
      ...
      signingConfig signingConfigs.release
    }
  }
}

react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

./gradlew assembleRelease
./gradlew installRelease
```

## 使用 underscore/lodash

```bash
npm i lodash --save
```

```js
import _ from 'lodash';
```

## Project Structure

```bash
.
├── android
│   ├── app
│   │   └── src
│   │   └── main
│   │   ├── java
│   │   │   └── com
│   │   │   └── reactnotes
│   │   └── res
│   │   ├── mipmap-hdpi
│   │   ├── mipmap-mdpi
│   │   ├── mipmap-xhdpi
│   │   ├── mipmap-xxhdpi
│   │   └── values
│   ├── gradle
│   │   └── wrapper
│   └── keystores
└── ios
├── ReactNotes
│   ├── Base.lproj
│   └── Images.xcassets
│   └── AppIcon.appiconset
├── ReactNotes.xcodeproj
│   └── xcshareddata
│   └── xcschemes
├── ReactNotesTests
└── build
```

## Relate

- Flux
  - [Github](https://github.com/facebook/flux) - [Homepage](http://facebook.github.io/flux/)
- Redux
  - [Github](https://github.com/rackt/redux/) - [Homepage](http://redux.js.org/)
  - [A Free Course by Its Creator](https://egghead.io/series/getting-started-with-redux)
- Reflux
  - [Github](https://github.com/reflux/refluxjs)
- Alt
  - [Github](https://github.com/goatslacker/alt) - [Homepage](http://alt.js.org/)
- Flummox
  - [Github](https://github.com/acdlite/flummox) - [Homepage](http://acdlite.github.io/flummox)
- Yahoo / Fluxible
  - [Github](https://github.com/yahoo/fluxible) - [Homepage](http://fluxible.io/)
- Nuclear-js
  - [Github](https://github.com/optimizely/nuclear-js) - [Homepage](https://optimizely.github.io/nuclear-js/)

## Flux

实现 MVC, 分离状态,动作和视图.

## Reflux

- 不需要单例的 dispatcher, 每个 action 都相当于一个 dispatcher
- 因为 action 是可监听的,stores 则监听 action.Stores 不需要一个大的 switch 来处理动作类型判断.
- Stores 可监听其他 stores;因此可以实现一个 stores 来聚合所有数据,类似于 map/reduce
- 不需要 Action creators,因为 Reflux 的 action 是函数
- waitFor 可用于实现串行或并行的数据流.用于聚合数据的 stores 可能串行监听其他 stores 并并行的监听其他数据流.

## 常用

- [react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)
- [react-native-webpack-server](https://github.com/mjohnston/react-native-webpack-server)
- [react-native-side-menu](https://github.com/react-native-fellowship/react-native-sidemenu)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-fellowship](https://github.com/react-native-fellowship)
- [react-native-fellowship/react-native-blur](https://github.com/react-native-fellowship/react-native-blur)
- [leecade/react-native-swiper](https://github.com/leecade/react-native-swiper)
- [aksonov/react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
- [microsoft/code-push](https://microsoft.github.io/code-push/)
- [ReactWindows/react-native](https://github.com/ReactWindows/react-native)
- [necolas/react-native-web](https://github.com/necolas/react-native-web)
- [gcanti/tcomb-form-native](https://github.com/gcanti/tcomb-form-native)

- [React Native Directory](https://js.coach/react-native)
- [React Discuss](https://discuss.reactjs.org/)
- [React Rocks](https://react.rocks/)

- [hapi](http://hapijs.com/) Server Framework for Node.js
- [Redux](http://redux.js.org/)
- [validatejs](http://validatejs.org/)
- [ParsePlatform](https://github.com/ParsePlatform)
- [facebook/rocksdb](https://github.com/facebook/rocksdb)

- [lelandrichardson/react-native-maps](https://github.com/lelandrichardson/react-native-maps)
- [FaridSafi/react-native-gifted-messenger](https://github.com/FaridSafi/react-native-gifted-messenger)
- [aerofs/react-native-auto-updater](https://github.com/aerofs/react-native-auto-updater)
- [jsdf/react-native-refreshable-listview](https://github.com/jsdf/react-native-refreshable-listview)

- [jsdf/ReactNativeHackerNews](https://github.com/jsdf/ReactNativeHackerNews)
- [touchstonejs/touchstonejs](https://github.com/touchstonejs/touchstonejs)
- [bartonhammond/snowflake](https://github.com/bartonhammond/snowflake)
- [realm/realm-js](https://github.com/realm/realm-js)
- [marcshilling/react-native-image-picker](https://github.com/marcshilling/react-native-image-picker)
- [oblador/react-native-animatable](https://github.com/oblador/react-native-animatable)
- [race604/react-native-viewpager](https://github.com/race604/react-native-viewpager)
- [lelandrichardson/react-native-parallax-view](https://github.com/lelandrichardson/react-native-parallax-view)
- [oblador/react-native-lightbox](https://github.com/oblador/react-native-lightbox)
- [rt2zz/redux-persist](https://github.com/rt2zz/redux-persist)
- [FaridSafi/react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form)
- [appintheair/react-native-looped-carousel](https://github.com/appintheair/react-native-looped-carousel)
- [rebeccahughes/react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)

- [aksonov/react-native-router-flux](https://github.com/aksonov/react-native-router-flux)

- [xgrommx/awesome-redux](https://github.com/xgrommx/awesome-redux)
- [yelouafi/redux-saga](https://github.com/yelouafi/redux-saga)

### Data server

- [Quora: Closest open source alternative to Firebase](https://www.quora.com/Whats-the-closest-open-source-alternative-to-Firebase)
- [HN: Firebase alternatives?](https://news.ycombinator.com/item?id=10733164)
- [HN: Open source alternative to Firebase?](https://news.ycombinator.com/item?id=8491026)
- [Top 5 Parse Alternatives](https://www.raywenderlich.com/126098/top-5-parse-alternatives)

- [meteor/meteor](https://github.com/meteor/meteor)
- [hoodiehq/hoodie](https://github.com/hoodiehq/hoodie)
- [Atmosphere/atmosphere](https://github.com/Atmosphere/atmosphere)
  - [Atmosphere/atmosphere-samples](https://github.com/Atmosphere/atmosphere-samples/)
- [amark/gun](https://github.com/amark/gun)
- [socket.io](http://socket.io/get-started/)
- [feathersjs/feathers](https://github.com/feathersjs/feathers)
- [RethinkDB](https://www.rethinkdb.com/)
- [paularmstrong/normalizr](https://github.com/paularmstrong/normalizr)

- [MongoClient](http://www.mongoclient.com/)
- [react-bootstrap/react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- [paralect/robomongo](https://github.com/paralect/robomongo)

- [reactjs/react-router](https://github.com/reactjs/react-router)
- [christianalfoni/formsy-react](https://github.com/christianalfoni/formsy-react)

- [React Native Fabric (UI-Layer Re-architecture)](https://github.com/react-native-community/discussions-and-proposals/issues/4)
