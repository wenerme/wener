---
title: electron-builder
---

# electron-builder

- [electron-userland/electron-builder](https://github.com/electron-userland/electron-builder)
- 注意 .npmrc 或 .yarnrc 配置好 mirror

:::caution

- electron-builder 提供多平台打包，但不要期望能跨平台构建
  - node 部分包需要编译
  - dmg 只能在 mac 下才能签名

:::

```bash
# 使用镜像
export ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/

electron-builder build --publish never

# 构建 windows 单 exe - 默认 nsis 安装
electron-builder build --win portable
```

| flag                   | default              | mean               |
| ---------------------- | -------------------- | ------------------ |
| --mac,-m,-o,--macos    |
| --linux,-l             |
| --win,-w,--windows     |
| --x64                  |                      | x86_64             |
| --ia32                 |                      | x86                |
| --armv7l               |
| --arm64                |                      |
| --universal            |
| --dir                  |                      | 构建为目录，不打包 |
| --prepackaged, --pd    |
| --projectDir,--project | $PWD                 |
| --config,-c            | electron-builder.yml | 配置文件           |

```bash
electron-builder --linux deb tar.xz
electron-builder --win --ia32
electron-builder --win nsis-web --ia32
# 额外配置
electron-builder -c.extraMetadata.foo=bar
electron-builder --config.nsis.unicode=false
```

## 配置

- 会从 package.json 读取部分元信息
  - name
  - description
  - homepage
  - license
  - author: { name, email }
  - repository: string | { url }
  - build - 配置
- 配置方式
  - packages.son 中 build 字段
  - --config yaml-json5-toml-js
- 会读取 electron-builder.env 环境变量
- macOS - mac, mas(Mac Application Store),dmg,pkg
- windows - win,nsis, nsisWeb,appx,squirrelWindows
- linux - linux,deb,snap,appImage,pacman,rpm,freebsd,p5p,apk
- ${macro}
  - arch - x64, ia32, armv7l, arm64
  - os - mac,linux,win
  - platform - darwin,linux,win32 - Node process.platform
  - name - package.json name
  - productName
  - version - beta
  - channel
  - env.ENV_NAME
  - buildVersion, buildNumber - AppInfo
  - ext - exe - windows

```yaml
appId: me.wener.desk.DeskAssistant
# 包含的内容
# 可以自定义 { from, to, filter }
files: ['dist', 'node_modules', 'package.json']
directories:
  app: build/app
  buildResources: assets
  output: build/release
# macOS Contents/Resources 目录, Windows.Linux resource 目录
extraResources: ['./assets/**']
# macOS Contents 目录, Windows,Linux 根目录
extraFiles: []
publish:
  provider: github
  owner: electron-react-boilerplate
  repo: electron-react-boilerplate
afterSign: '.erb/scripts/notarize.js'
electronDownload:
```

### macOS

```yaml
mac:
mas:
dmg:
pkg:
```

### Windows

- 默认基于 appId 或 name 计算 guid
- 推荐使用 guid

```yaml
# Windows 构建配置
win:
  # nsis, nsis-web, portable, appx, msi, squirrel, 7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2, dir
  target:
    - nsis
    - target: nsis
      arch:
        - x64
        - ia32
  icon: build/icon.ico
  # legalTrademarks:
nsis:
  oneClick: true
  perMachine: false
  allowElevation: true
  allowToChangeInstallationDirectory: false

  # Install
  installerIcon: build/installerIcon.ico
  uninstallerIcon: build/uninstallerIcon.ico
  installerHeader: build/installerHeader.bmp
  installerHeaderIcon: build/installerHeaderIcon.ico
  # 164 × 314
  # ${NSISDIR}\\Contrib\\Graphics\\Wizard\\nsis3-metro.bmp
  installerSidebar: build/installerSidebar.bmp
  # build/installerSidebar.bmp
  # ${NSISDIR}\\Contrib\\Graphics\\Wizard\\nsis3-metro.bmp
  uninstallerSidebar: build/uninstallerSidebar.bmp
  uninstallDisplayName: ${productName} ${version}

  # Script
  include: build/installer.nsh
  script: build/installer.nsi
  # {license,eula}.{txt,html}
  # _zh,_en - 支持多语言
  license:
  artifactName: ${productName} Setup ${version}.${ext}
  # one-click 安装时是否卸载时删除 app 数据
  deleteAppDataOnUninstall: false
  # nsis-web
  differentialPackage: true

  # 正常 installer 语言配置
  displayLanguageSelector: false
  installerLanguages: []
  # https://msdn.microsoft.com/en-au/goglobal/bb964664.aspx
  # 1033 -> English - United States
  language: 1033
  multiLanguageInstaller:
  packElevateHelper: true
  preCompressedFileExtensions: ['.avi', '.mov', '.m4v', '.mp4', '.m4p', '.qt', '.mkv', '.webm', '.vmdk']
  unicode: true
  # 使用 GUID 而不是应用名字
  guid:
  warningsAsErrors: true
  runAfterFinish: true

  createDesktopShortcut: true
  createStartMenuShortcut: true
  menuCategory: false
  # 默认应用名字
  shortcutName:
nsisWeb:
  # 默认通过 publish 计算
  # 自定义 X-Arch 头
  appPackageUrl: https://example.com/download/latest
  artifactName: ${productName} Web Setup ${version}.${ext}
  portable:
  # user, highest, admin
  requestExecutionLevel: user
  # TEMP 目录名 - 默认 build uuid
  unpackDirName:
appx:
squirrelWindows:
```

### Publish

- provider
  - github - 默认
    - env GH_TOKEN, GITHUB_TOKEN
    - repo, owner, vPrefixedTagName=true, host=github.com, protocol=https, token, private, releaseType=draft
- PublishConfiguration
  - publishAutoUpdate=true
- --publish - 控制什么时候发布
  - onTag
  - onTagOrDraft
  - always
  - never

```yaml
publish:
  - provider: s3 # env AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
    bucket:
    endpoint: http://minio:3000
    channel: latest
    path: /
    # public-read | private | null
    acl: null
    storageClass: STANDARD
  - provider: generic
    url:
    channel: latest
    useMultipleRangeRequest: true
win:
  publish:
    - github
    - bintray
```

**s3 acl**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAppS3Releases",
      "Effect": "Allow",
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:ListMultipartUploadParts",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": ["arn:aws:s3:::release-bucket/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:ListBucketMultipartUploads"],
      "Resource": ["arn:aws:s3:::release-bucket"]
    }
  ]
}
```

## Icons

- 放在 buildResources 目录
- macOS
  - icon.icns, icon.png - 512x512
  - background.png, background@2x.png - DMG background
- Windows - NSIS
  - icon.ico, icon.png - 256x256
- Linux
  - 基于 Windows 或 macOS 生成或 build/icons 目录
  - build/icons/iconXxX.png - 16,32,48,64,128,256,512 - 或者只有 512

## 自动升级

- macOS DMG, Windows NSIS, Linux AppImage
- macOS 必须要签名

```js
// AppImageUpdater, MacUpdater, NsisUpdater
import { autoUpdater } from 'electron-updater';

export default class AppUpdater {
  constructor() {
    const log = require('electron-log');
    log.transports.file.level = 'debug';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// 内置 autoUpdater 功能更弱
// import { autoUpdater } from "electron"
```

## electron-updater vs autoUpdater

- autoUpdater
  - 内置
  - 支持 macOS 签名认证
- electron-updater
  - 三方
  - 不需要专门的 发布 服务器
  - 支持 Windows 和 macOS 签名认证
  - 自动生成所有元数据文件和升级文件
  - 所有平台支持下载进度和部分升级
  - 默认支持较多 provider - github release, s3, http
  - 配置简单

## blockmap

包内容列表，内容 hash 值，升级时用于对比。

- [electron-userland/electron-builder#2851](https://github.com/electron-userland/electron-builder/issues/2851)
  What is the purpose of blockmap file?
