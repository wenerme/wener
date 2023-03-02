---
title: Android Build
---

# Android Build

- AGP
- https://developer.android.com/studio/command-line
- https://github.com/alvr/alpine-android
- ANDROID_SDK_ROOT

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

## Dependant package with key emulator not found

- build-tools 29 emulator 无 arm64
- https://github.com/google/android-emulator-container-scripts/issues/192
- https://developer.android.com/studio/releases/emulator#emulator_for_arm64_hosts
