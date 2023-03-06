---
title: Android Build
---

# Android Build

- AGP
  - com.android.tools.build:gradle
- https://developer.android.com/studio/command-line
- https://github.com/alvr/alpine-android
- ANDROID_SDK_ROOT

## SDK

```bash
# JDK 8
CMDLINE_VERSION="8.0"
SDK_TOOLS_VERSION="9123335"
#
CMDLINE_VERSION="9.0"
SDK_TOOLS_VERSION="9477386"

export ANDROID_SDK_ROOT=$PWD
export PATH=$PATH:${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/extras/google/instantapps

curl -Lo /tmp/tools.zip https://dl.google.com/android/repository/commandlinetools-linux-${SDK_TOOLS_VERSION}_latest.zip

unzip -qq /tmp/tools.zip -d cmdline-tools
mv cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}
rm /tmp/tools.zip

mkdir -p ~/.android/ && touch ~/.android/repositories.cfg

export JAVA_HOME=/usr/lib/jvm/java-11-openjdk/
sdkmanager --version
yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses
sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --install "platform-tools" "extras;google;instantapps"

# 28.0.3, 29.0.3, 30.0.3, 31.0.0, 32.0.0, 33.0.2
# 34.0.0-rc1
BUILD_TOOLS="30.0.3"
TARGET_SDK=$BUILD_TOOLS

BUILD_TOOLS="30.0.2"
TARGET_SDK=32

export PATH=$PATH:${ANDROID_SDK_ROOT}/build-tools/${BUILD_TOOLS}

sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --install "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}"

sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --uninstall emulator

sdkmanager "build-tools;29.0.2" # 无 arm64, 30.0.2 也 无
sdkmanager "build-tools;31.0.0" # 有 arm 64
```

```groovy
android {
    buildToolsVersion "33.0.1"
}
```

## NDK

- https://developer.android.com/ndk/downloads

## Build

```bash
export ANDROID_SDK_ROOT=/cache/opt/android/
export CMDLINE_VERSION="9.0"
export PATH=$PATH:${ANDROID_SDK_ROOT}/cmdline-tools/${CMDLINE_VERSION}/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/extras/google/instantapps
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk/
```

```bash
./gradlew assembleRelease
./gradlew assembleDebug
```

## Dependant package with key emulator not found

- build-tools 29 emulator 无 arm64
- https://github.com/google/android-emulator-container-scripts/issues/192
- https://developer.android.com/studio/releases/emulator#emulator_for_arm64_hosts

## Installed Build Tools revision 33.0.0 is corrupted. Remove and install again using the SDK Manager.

```bash
sdkmanager "build-tools;33.0.0"
sdkmanager "build-tools;31.0.0"

# 升级 AGP to 7.x 或 d8 -> dx
cd $ANDROID_SDK_ROOT/build-tools/33.0.0
cp d8 dx
cd lib
cp d8.jar dx.jar
```

- https://stackoverflow.com/questions/68387270
