# uGFX

## Tips

```bash
# 所有的 SDK 版本
xcodebuild -sdk -version
# 当前版本信息
sw_vers

# OPT_CPU=x64 编译 x86_64 的, 因为安装的 SDL2 没有 i386 的
make GFXLIB=$HOME/gits/ugfx OSX_SDK=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk OSX_ARCH=-mmacosx-version-min=10.12 OPT_CPU=x64
```
